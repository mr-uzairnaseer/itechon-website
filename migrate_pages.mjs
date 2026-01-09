import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const SOURCE_ROOT = path.resolve(__dirname, '../high/flutter-app-development/www.weblineindia.com');
const TARGET_PAGES_DIR = path.resolve(__dirname, 'src/pages');
const TARGET_ASSETS_DIR = path.resolve(__dirname, 'public/assets/migrated');

// Helper to ensure directory exists
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Helper to copy an image
const copyImage = (srcUrl, pageName) => {
    if (!srcUrl || srcUrl.startsWith('data:')) return null;

    // Clean up URL (remove query params, etc.)
    const cleanUrl = srcUrl.split('?')[0];
    const fileName = path.basename(cleanUrl);

    // Construct source path (assuming standardized /assets/img/ structure in source)
    // The source HTML uses /assets/img/... which maps to SOURCE_ROOT/assets/img/...
    let relativePath = cleanUrl;
    if (relativePath.startsWith('/')) relativePath = relativePath.slice(1);

    const sourcePath = path.resolve(SOURCE_ROOT, relativePath);

    // Construct target path
    const targetDir = path.join(TARGET_ASSETS_DIR, pageName);
    ensureDir(targetDir);
    const targetPath = path.join(targetDir, fileName);

    try {
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, targetPath);
            return `/assets/migrated/${pageName}/${fileName}`;
        } else {
            console.warn(`[WARN] Image not found: ${sourcePath}`);
            return null;
        }
    } catch (e) {
        console.error(`[ERR] Failed to copy image ${sourcePath}: ${e.message}`);
        return null;
    }
};

// Regex Patterns
const PATTERNS = {
    title: /<title>\s*(.*?)\s*<\/title>/i,
    description: /<meta\s+name="description"\s+content="(.*?)"/i,
    h1: /<h1[^>]*>\s*(.*?)\s*<\/h1>/i,
    // Hero Description: Text immediately after H1's closing tags (often in a p)
    heroDesc: /<div class="hero-data">.*?<\/h1>\s*<p[^>]*>\s*(.*?)\s*<\/p>/s,
    heroImage: /<div class="right-hero-img">.*?<img.*?src="(.*?)".*?>/s,

    // Service Cards (Grid)
    serviceCard: /<div class="card service-card">.*?<img.*?data-src="(.*?)".*?>\s*<h3.*?>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs,

    // Industry Cards
    industryCard: /<div class="card industry-card.*?">.*?<img.*?data-src="(.*?)".*?>\s*<h3.*?>(.*?)<\/h3>/gs,

    // Process/Benefit Cards
    processCard: /<div class="card process-card.*?">.*?<img.*?data-src="(.*?)".*?>\s*<div class="process-data.*?">\s*<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs,

    // Content Sections (Simple p tag extraction from wrappers)
    // This is harder with regex, we'll try to just grab the first valid text block in sections
    contentSection: /<section class="(?:gray|white)-wrapper.*?">.*?<h2>(.*?)<\/h2>\s*<p>(.*?)<\/p>/s
};

// Function to process a single file
const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath, '.html');
    // If filename is index, use parent dir name
    const pageName = filename === 'index' ? path.basename(path.dirname(filePath)) : filename;

    console.log(`Processing: ${pageName} (${filePath})`);

    // Extract Metadata
    const titleMatch = content.match(PATTERNS.title);
    const title = titleMatch ? titleMatch[1] : `${pageName.replace(/-/g, ' ')} | ITECHON`;

    const descMatch = content.match(PATTERNS.description);
    const description = descMatch ? descMatch[1] : `Learn more about our ${pageName.replace(/-/g, ' ')} services.`;

    // Extract Hero
    const h1Match = content.match(PATTERNS.h1);
    const heroTitle = h1Match ? h1Match[1] : pageName.replace(/-/g, ' ').toUpperCase();

    const heroDescMatch = content.match(PATTERNS.heroDesc);
    const heroDesc = heroDescMatch ? heroDescMatch[1].replace(/\s+/g, ' ').trim() : '';

    const heroImgMatch = content.match(PATTERNS.heroImage);
    const heroImgRaw = heroImgMatch ? heroImgMatch[1] : null;
    const heroImg = copyImage(heroImgRaw, pageName) || '/assets/itechon.png';

    // Extract Services
    const services = [];
    let serviceMatch;
    while ((serviceMatch = PATTERNS.serviceCard.exec(content)) !== null) {
        const [_, iconRaw, title, desc] = serviceMatch;
        // We prefer SVG content for the component, but we have file paths.
        // For now, let's just use the features grid which accepts an icon string (html).
        // We will create an <img src> string for the icon.
        const iconPath = copyImage(iconRaw, pageName);
        if (iconPath) {
            services.push({
                title: title.trim(),
                description: desc.trim(),
                icon: `<img src="${iconPath}" alt="${title}" class="w-12 h-12" />`
            });
        }
    }

    // Extract Benefits (from Process Cards)
    const benefits = [];
    let benefitMatch;
    while ((benefitMatch = PATTERNS.processCard.exec(content)) !== null) {
        const [_, iconRaw, title, desc] = benefitMatch;
        const iconPath = copyImage(iconRaw, pageName);
        if (iconPath) {
            benefits.push({
                title: title.trim(),
                description: desc.trim(),
                icon: `<img src="${iconPath}" alt="${title}" class="w-12 h-12" />`
            });
        }
    }

    // Extract Industries (Just titles)
    const industries = [];
    let industryMatch;
    while ((industryMatch = PATTERNS.industryCard.exec(content)) !== null) {
        const [_, iconRaw, title] = industryMatch;
        const iconPath = copyImage(iconRaw, pageName);
        if (iconPath) {
            industries.push({
                title: title.trim(),
                description: '',
                icon: `<img src="${iconPath}" alt="${title}" class="w-12 h-12" />`
            });
        }
    }

    // Generate Astro Content
    const astroContent = `---
import Layout from '../layouts/Layout.astro';
import PageHero from '../components/shared/PageHero.astro';
import ContentSection from '../components/shared/ContentSection.astro';
import FeatureGrid from '../components/shared/FeatureGrid.astro';
import Cta from '../components/home/Cta.astro';
import Testimonials from '../components/home/Testimonials.astro';

const services = ${JSON.stringify(services, null, 2)};
const benefits = ${JSON.stringify(benefits, null, 2)};
const industries = ${JSON.stringify(industries, null, 2)};
---

<Layout
  title="${title}"
  description="${description}"
>
  <PageHero 
    title="${heroTitle}"
    description="${heroDesc}"
    backgroundImage="${heroImg}"
    ctaText="Get a Free Consultation"
    ctaLink="/contact"
  />

  <ContentSection title="Overview" darkBackground>
    <p class="text-lg text-primary-200/80 leading-relaxed">
      ${heroDesc} 
      <!-- TODO: More specific intro content extraction if needed -->
    </p>
  </ContentSection>

  {services.length > 0 && (
    <FeatureGrid 
      title="Our Services"
      description="We offer a comprehensive range of services tailored to your needs."
      features={services}
      columns={3}
    />
  )}

  {benefits.length > 0 && (
    <FeatureGrid 
      title="Why Choose Us"
      description="Experience the difference with our expert team."
      features={benefits}
      columns={2}
    />
  )}

  {industries.length > 0 && (
    <FeatureGrid 
      title="Industries We Serve"
      description="We have experience across a wide range of industries."
      features={industries}
      columns={4}
    />
  )}

  <Cta />
  <Testimonials />

</Layout>
`;

    // Write File
    fs.writeFileSync(path.join(TARGET_PAGES_DIR, `${pageName}.astro`), astroContent);
    console.log(`Created ${pageName}.astro`);
};

// Main Execution
const main = () => {
    // 1. Process files in root of SOURCE_ROOT
    const rootFiles = fs.readdirSync(SOURCE_ROOT).filter(f => f.endsWith('.html'));
    rootFiles.forEach(f => {
        // Skip the ones likely already done or index
        if (f === 'index.html' || f === 'mobile-app-development.html') return;
        try {
            processFile(path.join(SOURCE_ROOT, f));
        } catch (e) {
            console.error(`[ERR] Failed to process ${f}: ${e.message}`);
        }
    });

    // 2. Process subdirectories (agentic-ai, etc.)
    const dirs = fs.readdirSync(SOURCE_ROOT, { withFileTypes: true })
        .filter(d => d.isDirectory() && ['agentic-ai-development', 'n8n-automation'].includes(d.name));

    dirs.forEach(d => {
        const indexPath = path.join(SOURCE_ROOT, d.name, 'index.html');
        if (fs.existsSync(indexPath)) {
            try {
                processFile(indexPath);
            } catch (e) {
                console.error(`[ERR] Failed to process ${d.name}/index.html: ${e.message}`);
            }
        }
    });
};

main();
