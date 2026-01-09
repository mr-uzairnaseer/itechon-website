import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  experimental: {
    viewTransitions: true
  },
  site: 'https://itechon.com',
  integrations: [tailwind(), compress(), sitemap()]
});