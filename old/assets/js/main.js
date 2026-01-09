(() => {
    var e = {
            96: (e, t, n) => {
                var i, o, r;

                function s(e) {
                    return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, s(e)
                }
                o = [n(470)], void 0 === (r = "function" == typeof(i = function(e) {
                    e.extend(e.fn, {
                        validate: function(t) {
                            if (this.length) {
                                var n = e.data(this[0], "validator");
                                return n || (this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), e.data(this[0], "validator", n), n.settings.onsubmit && (this.on("click.validate", ":submit", (function(t) {
                                    n.settings.submitHandler && (n.submitButton = t.target), e(this).hasClass("cancel") && (n.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (n.cancelSubmit = !0)
                                })), this.on("submit.validate", (function(t) {
                                    function i() {
                                        var i, o;
                                        return !n.settings.submitHandler || (n.submitButton && (i = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)), o = n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && i.remove(), void 0 !== o && o)
                                    }
                                    return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, i()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : i() : (n.focusInvalid(), !1)
                                }))), n)
                            }
                            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
                        },
                        valid: function() {
                            var t, n, i;
                            return e(this[0]).is("form") ? t = this.validate().form() : (i = [], t = !0, n = e(this[0].form).validate(), this.each((function() {
                                (t = n.element(this) && t) || (i = i.concat(n.errorList))
                            })), n.errorList = i), t
                        },
                        rules: function(t, n) {
                            var i, o, r, s, a, l, c = this[0];
                            if (null != c && null != c.form) {
                                if (t) switch (i = e.data(c.form, "validator").settings, o = i.rules, r = e.validator.staticRules(c), t) {
                                    case "add":
                                        e.extend(r, e.validator.normalizeRule(n)), delete r.messages, o[c.name] = r, n.messages && (i.messages[c.name] = e.extend(i.messages[c.name], n.messages));
                                        break;
                                    case "remove":
                                        return n ? (l = {}, e.each(n.split(/\s/), (function(t, n) {
                                            l[n] = r[n], delete r[n], "required" === n && e(c).removeAttr("aria-required")
                                        })), l) : (delete o[c.name], r)
                                }
                                return (s = e.validator.normalizeRules(e.extend({}, e.validator.classRules(c), e.validator.attributeRules(c), e.validator.dataRules(c), e.validator.staticRules(c)), c)).required && (a = s.required, delete s.required, s = e.extend({
                                    required: a
                                }, s), e(c).attr("aria-required", "true")), s.remote && (a = s.remote, delete s.remote, s = e.extend(s, {
                                    remote: a
                                })), s
                            }
                        }
                    }), e.extend(e.expr.pseudos || e.expr[":"], {
                        blank: function(t) {
                            return !e.trim("" + e(t).val())
                        },
                        filled: function(t) {
                            var n = e(t).val();
                            return null !== n && !!e.trim("" + n)
                        },
                        unchecked: function(t) {
                            return !e(t).prop("checked")
                        }
                    }), e.validator = function(t, n) {
                        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, this.init()
                    }, e.validator.format = function(t, n) {
                        return 1 === arguments.length ? function() {
                            var n = e.makeArray(arguments);
                            return n.unshift(t), e.validator.format.apply(this, n)
                        } : (void 0 === n || (arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), e.each(n, (function(e, n) {
                            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), (function() {
                                return n
                            }))
                        }))), t)
                    }, e.extend(e.validator, {
                        defaults: {
                            messages: {},
                            groups: {},
                            rules: {},
                            errorClass: "error",
                            pendingClass: "pending",
                            validClass: "valid",
                            errorElement: "label",
                            focusCleanup: !1,
                            focusInvalid: !0,
                            errorContainer: e([]),
                            errorLabelContainer: e([]),
                            onsubmit: !0,
                            ignore: ":hidden",
                            ignoreTitle: !1,
                            onfocusin: function(e) {
                                this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
                            },
                            onfocusout: function(e) {
                                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
                            },
                            onkeyup: function(t, n) {
                                var i = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                                9 === n.which && "" === this.elementValue(t) || -1 !== e.inArray(n.keyCode, i) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
                            },
                            onclick: function(e) {
                                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                            },
                            highlight: function(t, n, i) {
                                "radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(i) : e(t).addClass(n).removeClass(i)
                            },
                            unhighlight: function(t, n, i) {
                                "radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(i) : e(t).removeClass(n).addClass(i)
                            }
                        },
                        setDefaults: function(t) {
                            e.extend(e.validator.defaults, t)
                        },
                        messages: {
                            required: "This field is required.",
                            remote: "Please fix this field.",
                            email: "Please enter a valid email address.",
                            url: "Please enter a valid URL.",
                            date: "Please enter a valid date.",
                            dateISO: "Please enter a valid date (ISO).",
                            number: "Please enter a valid number.",
                            digits: "Please enter only digits.",
                            equalTo: "Please enter the same value again.",
                            maxlength: e.validator.format("Please enter no more than {0} characters."),
                            minlength: e.validator.format("Please enter at least {0} characters."),
                            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
                            range: e.validator.format("Please enter a value between {0} and {1}."),
                            max: e.validator.format("Please enter a value less than or equal to {0}."),
                            min: e.validator.format("Please enter a value greater than or equal to {0}."),
                            step: e.validator.format("Please enter a multiple of {0}.")
                        },
                        autoCreateRanges: !1,
                        prototype: {
                            init: function() {
                                function t(t) {
                                    !this.form && this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]);
                                    var n = e.data(this.form, "validator"),
                                        i = "on" + t.type.replace(/^validate/, ""),
                                        o = n.settings;
                                    o[i] && !e(this).is(o.ignore) && o[i].call(n, this, t)
                                }
                                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                                var n, i = this.groups = {};
                                e.each(this.settings.groups, (function(t, n) {
                                    "string" == typeof n && (n = n.split(/\s/)), e.each(n, (function(e, n) {
                                        i[n] = t
                                    }))
                                })), n = this.settings.rules, e.each(n, (function(t, i) {
                                    n[t] = e.validator.normalizeRule(i)
                                })), e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                            },
                            form: function() {
                                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                            },
                            checkForm: function() {
                                this.prepareForm();
                                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                                return this.valid()
                            },
                            element: function(t) {
                                var n, i, o = this.clean(t),
                                    r = this.validationTargetFor(o),
                                    s = this,
                                    a = !0;
                                return void 0 === r ? delete this.invalid[o.name] : (this.prepareElement(r), this.currentElements = e(r), (i = this.groups[r.name]) && e.each(this.groups, (function(e, t) {
                                    t === i && e !== r.name && (o = s.validationTargetFor(s.clean(s.findByName(e)))) && o.name in s.invalid && (s.currentElements.push(o), a = s.check(o) && a)
                                })), n = !1 !== this.check(r), a = a && n, this.invalid[r.name] = !n, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !n)), a
                            },
                            showErrors: function(t) {
                                if (t) {
                                    var n = this;
                                    e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, (function(e, t) {
                                        return {
                                            message: e,
                                            element: n.findByName(t)[0]
                                        }
                                    })), this.successList = e.grep(this.successList, (function(e) {
                                        return !(e.name in t)
                                    }))
                                }
                                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                            },
                            resetForm: function() {
                                e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                                this.resetElements(t)
                            },
                            resetElements: function(e) {
                                var t;
                                if (this.settings.unhighlight)
                                    for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                                else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
                            },
                            numberOfInvalids: function() {
                                return this.objectLength(this.invalid)
                            },
                            objectLength: function(e) {
                                var t, n = 0;
                                for (t in e) e[t] && n++;
                                return n
                            },
                            hideErrors: function() {
                                this.hideThese(this.toHide)
                            },
                            hideThese: function(e) {
                                e.not(this.containers).text(""), this.addWrapper(e).hide()
                            },
                            valid: function() {
                                return 0 === this.size()
                            },
                            size: function() {
                                return this.errorList.length
                            },
                            focusInvalid: function() {
                                if (this.settings.focusInvalid) try {
                                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                                } catch (e) {}
                            },
                            findLastActive: function() {
                                var t = this.lastActive;
                                return t && 1 === e.grep(this.errorList, (function(e) {
                                    return e.element.name === t.name
                                })).length && t
                            },
                            elements: function() {
                                var t = this,
                                    n = {};
                                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter((function() {
                                    var i = this.name || e(this).attr("name");
                                    return !i && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]), !(i in n || !t.objectLength(e(this).rules()) || (n[i] = !0, 0))
                                }))
                            },
                            clean: function(t) {
                                return e(t)[0]
                            },
                            errors: function() {
                                var t = this.settings.errorClass.split(" ").join(".");
                                return e(this.settings.errorElement + "." + t, this.errorContext)
                            },
                            resetInternals: function() {
                                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
                            },
                            reset: function() {
                                this.resetInternals(), this.currentElements = e([])
                            },
                            prepareForm: function() {
                                this.reset(), this.toHide = this.errors().add(this.containers)
                            },
                            prepareElement: function(e) {
                                this.reset(), this.toHide = this.errorsFor(e)
                            },
                            elementValue: function(t) {
                                var n, i, o = e(t),
                                    r = t.type;
                                return "radio" === r || "checkbox" === r ? this.findByName(t.name).filter(":checked").val() : "number" === r && void 0 !== t.validity ? t.validity.badInput ? "NaN" : o.val() : (n = t.hasAttribute("contenteditable") ? o.text() : o.val(), "file" === r ? "C:\\fakepath\\" === n.substr(0, 12) ? n.substr(12) : (i = n.lastIndexOf("/")) >= 0 || (i = n.lastIndexOf("\\")) >= 0 ? n.substr(i + 1) : n : "string" == typeof n ? n.replace(/\r/g, "") : n)
                            },
                            check: function(t) {
                                t = this.validationTargetFor(this.clean(t));
                                var n, i, o, r = e(t).rules(),
                                    s = e.map(r, (function(e, t) {
                                        return t
                                    })).length,
                                    a = !1,
                                    l = this.elementValue(t);
                                if ("function" == typeof r.normalizer) {
                                    if ("string" != typeof(l = r.normalizer.call(t, l))) throw new TypeError("The normalizer should return a string value.");
                                    delete r.normalizer
                                }
                                for (i in r) {
                                    o = {
                                        method: i,
                                        parameters: r[i]
                                    };
                                    try {
                                        if ("dependency-mismatch" === (n = e.validator.methods[i].call(this, l, t, o.parameters)) && 1 === s) {
                                            a = !0;
                                            continue
                                        }
                                        if (a = !1, "pending" === n) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                                        if (!n) return this.formatAndAdd(t, o), !1
                                    } catch (e) {
                                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + o.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + o.method + "' method."), e
                                    }
                                }
                                if (!a) return this.objectLength(r) && this.successList.push(t), !0
                            },
                            customDataMessage: function(t, n) {
                                return e(t).data("msg" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()) || e(t).data("msg")
                            },
                            customMessage: function(e, t) {
                                var n = this.settings.messages[e];
                                return n && (n.constructor === String ? n : n[t])
                            },
                            findDefined: function() {
                                for (var e = 0; e < arguments.length; e++)
                                    if (void 0 !== arguments[e]) return arguments[e]
                            },
                            defaultMessage: function(t, n) {
                                "string" == typeof n && (n = {
                                    method: n
                                });
                                var i = this.findDefined(this.customMessage(t.name, n.method), this.customDataMessage(t, n.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                                    o = /\$?\{(\d+)\}/g;
                                return "function" == typeof i ? i = i.call(this, n.parameters, t) : o.test(i) && (i = e.validator.format(i.replace(o, "{$1}"), n.parameters)), i
                            },
                            formatAndAdd: function(e, t) {
                                var n = this.defaultMessage(e, t);
                                this.errorList.push({
                                    message: n,
                                    element: e,
                                    method: t.method
                                }), this.errorMap[e.name] = n, this.submitted[e.name] = n
                            },
                            addWrapper: function(e) {
                                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
                            },
                            defaultShowErrors: function() {
                                var e, t, n;
                                for (e = 0; this.errorList[e]; e++) n = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message);
                                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                                if (this.settings.unhighlight)
                                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                            },
                            validElements: function() {
                                return this.currentElements.not(this.invalidElements())
                            },
                            invalidElements: function() {
                                return e(this.errorList).map((function() {
                                    return this.element
                                }))
                            },
                            showLabel: function(t, n) {
                                var i, o, r, s, a = this.errorsFor(t),
                                    l = this.idOrName(t),
                                    c = e(t).attr("aria-describedby");
                                a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(n)) : (i = a = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (i = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, i, e(t)) : i.insertAfter(t), a.is("label") ? a.attr("for", l) : 0 === a.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (r = a.attr("id"), c ? c.match(new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")) || (c += " " + r) : c = r, e(t).attr("aria-describedby", c), (o = this.groups[t.name]) && (s = this, e.each(s.groups, (function(t, n) {
                                    n === o && e("[name='" + s.escapeCssMeta(t) + "']", s.currentForm).attr("aria-describedby", a.attr("id"))
                                }))))), !n && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, t)), this.toShow = this.toShow.add(a)
                            },
                            errorsFor: function(t) {
                                var n = this.escapeCssMeta(this.idOrName(t)),
                                    i = e(t).attr("aria-describedby"),
                                    o = "label[for='" + n + "'], label[for='" + n + "'] *";
                                return i && (o = o + ", #" + this.escapeCssMeta(i).replace(/\s+/g, ", #")), this.errors().filter(o)
                            },
                            escapeCssMeta: function(e) {
                                return e.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
                            },
                            idOrName: function(e) {
                                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
                            },
                            validationTargetFor: function(t) {
                                return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
                            },
                            checkable: function(e) {
                                return /radio|checkbox/i.test(e.type)
                            },
                            findByName: function(t) {
                                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
                            },
                            getLength: function(t, n) {
                                switch (n.nodeName.toLowerCase()) {
                                    case "select":
                                        return e("option:selected", n).length;
                                    case "input":
                                        if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                                }
                                return t.length
                            },
                            depend: function(e, t) {
                                return !this.dependTypes[s(e)] || this.dependTypes[s(e)](e, t)
                            },
                            dependTypes: {
                                boolean: function(e) {
                                    return e
                                },
                                string: function(t, n) {
                                    return !!e(t, n.form).length
                                },
                                function: function(e, t) {
                                    return e(t)
                                }
                            },
                            optional: function(t) {
                                var n = this.elementValue(t);
                                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch"
                            },
                            startRequest: function(t) {
                                this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
                            },
                            stopRequest: function(t, n) {
                                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !n && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                            },
                            previousValue: function(t, n) {
                                return n = "string" == typeof n && n || "remote", e.data(t, "previousValue") || e.data(t, "previousValue", {
                                    old: null,
                                    valid: !0,
                                    message: this.defaultMessage(t, {
                                        method: n
                                    })
                                })
                            },
                            destroy: function() {
                                this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
                            }
                        },
                        classRuleSettings: {
                            required: {
                                required: !0
                            },
                            email: {
                                email: !0
                            },
                            url: {
                                url: !0
                            },
                            date: {
                                date: !0
                            },
                            dateISO: {
                                dateISO: !0
                            },
                            number: {
                                number: !0
                            },
                            digits: {
                                digits: !0
                            },
                            creditcard: {
                                creditcard: !0
                            }
                        },
                        addClassRules: function(t, n) {
                            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t)
                        },
                        classRules: function(t) {
                            var n = {},
                                i = e(t).attr("class");
                            return i && e.each(i.split(" "), (function() {
                                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this])
                            })), n
                        },
                        normalizeAttributeRule: function(e, t, n, i) {
                            /min|max|step/.test(n) && (null === t || /number|range|text/.test(t)) && (i = Number(i), isNaN(i) && (i = void 0)), i || 0 === i ? e[n] = i : t === n && "range" !== t && (e[n] = !0)
                        },
                        attributeRules: function(t) {
                            var n, i, o = {},
                                r = e(t),
                                s = t.getAttribute("type");
                            for (n in e.validator.methods) "required" === n ? ("" === (i = t.getAttribute(n)) && (i = !0), i = !!i) : i = r.attr(n), this.normalizeAttributeRule(o, s, n, i);
                            return o.maxlength && /-1|2147483647|524288/.test(o.maxlength) && delete o.maxlength, o
                        },
                        dataRules: function(t) {
                            var n, i, o = {},
                                r = e(t),
                                s = t.getAttribute("type");
                            for (n in e.validator.methods) i = r.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()), this.normalizeAttributeRule(o, s, n, i);
                            return o
                        },
                        staticRules: function(t) {
                            var n = {},
                                i = e.data(t.form, "validator");
                            return i.settings.rules && (n = e.validator.normalizeRule(i.settings.rules[t.name]) || {}), n
                        },
                        normalizeRules: function(t, n) {
                            return e.each(t, (function(i, o) {
                                if (!1 !== o) {
                                    if (o.param || o.depends) {
                                        var r = !0;
                                        switch (s(o.depends)) {
                                            case "string":
                                                r = !!e(o.depends, n.form).length;
                                                break;
                                            case "function":
                                                r = o.depends.call(n, n)
                                        }
                                        r ? t[i] = void 0 === o.param || o.param : (e.data(n.form, "validator").resetElements(e(n)), delete t[i])
                                    }
                                } else delete t[i]
                            })), e.each(t, (function(i, o) {
                                t[i] = e.isFunction(o) && "normalizer" !== i ? o(n) : o
                            })), e.each(["minlength", "maxlength"], (function() {
                                t[this] && (t[this] = Number(t[this]))
                            })), e.each(["rangelength", "range"], (function() {
                                var n;
                                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (n = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
                            })), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
                        },
                        normalizeRule: function(t) {
                            if ("string" == typeof t) {
                                var n = {};
                                e.each(t.split(/\s/), (function() {
                                    n[this] = !0
                                })), t = n
                            }
                            return t
                        },
                        addMethod: function(t, n, i) {
                            e.validator.methods[t] = n, e.validator.messages[t] = void 0 !== i ? i : e.validator.messages[t], n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
                        },
                        methods: {
                            required: function(t, n, i) {
                                if (!this.depend(i, n)) return "dependency-mismatch";
                                if ("select" === n.nodeName.toLowerCase()) {
                                    var o = e(n).val();
                                    return o && o.length > 0
                                }
                                return this.checkable(n) ? this.getLength(t, n) > 0 : t.length > 0
                            },
                            email: function(e, t) {
                                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                            },
                            url: function(e, t) {
                                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
                            },
                            date: function(e, t) {
                                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
                            },
                            dateISO: function(e, t) {
                                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
                            },
                            number: function(e, t) {
                                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
                            },
                            digits: function(e, t) {
                                return this.optional(t) || /^\d+$/.test(e)
                            },
                            minlength: function(t, n, i) {
                                var o = e.isArray(t) ? t.length : this.getLength(t, n);
                                return this.optional(n) || o >= i
                            },
                            maxlength: function(t, n, i) {
                                var o = e.isArray(t) ? t.length : this.getLength(t, n);
                                return this.optional(n) || o <= i
                            },
                            rangelength: function(t, n, i) {
                                var o = e.isArray(t) ? t.length : this.getLength(t, n);
                                return this.optional(n) || o >= i[0] && o <= i[1]
                            },
                            min: function(e, t, n) {
                                return this.optional(t) || e >= n
                            },
                            max: function(e, t, n) {
                                return this.optional(t) || e <= n
                            },
                            range: function(e, t, n) {
                                return this.optional(t) || e >= n[0] && e <= n[1]
                            },
                            step: function(t, n, i) {
                                var o, r = e(n).attr("type"),
                                    s = "Step attribute on input type " + r + " is not supported.",
                                    a = ["text", "number", "range"],
                                    l = new RegExp("\\b" + r + "\\b"),
                                    c = function(e) {
                                        var t = ("" + e).match(/(?:\.(\d+))?$/);
                                        return t && t[1] ? t[1].length : 0
                                    },
                                    d = function(e) {
                                        return Math.round(e * Math.pow(10, o))
                                    },
                                    u = !0;
                                if (r && !l.test(a.join())) throw new Error(s);
                                return o = c(i), (c(t) > o || d(t) % d(i) != 0) && (u = !1), this.optional(n) || u
                            },
                            equalTo: function(t, n, i) {
                                var o = e(i);
                                return this.settings.onfocusout && o.not(".validate-equalTo-blur").length && o.addClass("validate-equalTo-blur").on("blur.validate-equalTo", (function() {
                                    e(n).valid()
                                })), t === o.val()
                            },
                            remote: function(t, n, i, o) {
                                if (this.optional(n)) return "dependency-mismatch";
                                o = "string" == typeof o && o || "remote";
                                var r, s, a, l = this.previousValue(n, o);
                                return this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[n.name][o], this.settings.messages[n.name][o] = l.message, i = "string" == typeof i && {
                                    url: i
                                } || i, a = e.param(e.extend({
                                    data: t
                                }, i.data)), l.old === a ? l.valid : (l.old = a, r = this, this.startRequest(n), (s = {})[n.name] = t, e.ajax(e.extend(!0, {
                                    mode: "abort",
                                    port: "validate" + n.name,
                                    dataType: "json",
                                    data: s,
                                    context: r.currentForm,
                                    success: function(e) {
                                        var i, s, a, c = !0 === e || "true" === e;
                                        r.settings.messages[n.name][o] = l.originalMessage, c ? (a = r.formSubmitted, r.resetInternals(), r.toHide = r.errorsFor(n), r.formSubmitted = a, r.successList.push(n), r.invalid[n.name] = !1, r.showErrors()) : (i = {}, s = e || r.defaultMessage(n, {
                                            method: o,
                                            parameters: t
                                        }), i[n.name] = l.message = s, r.invalid[n.name] = !0, r.showErrors(i)), l.valid = c, r.stopRequest(n, c)
                                    }
                                }, i)), "pending")
                            }
                        }
                    });
                    var t, n = {};
                    return e.ajaxPrefilter ? e.ajaxPrefilter((function(e, t, i) {
                        var o = e.port;
                        "abort" === e.mode && (n[o] && n[o].abort(), n[o] = i)
                    })) : (t = e.ajax, e.ajax = function(i) {
                        var o = ("mode" in i ? i : e.ajaxSettings).mode,
                            r = ("port" in i ? i : e.ajaxSettings).port;
                        return "abort" === o ? (n[r] && n[r].abort(), n[r] = t.apply(this, arguments), n[r]) : t.apply(this, arguments)
                    }), e
                }) ? i.apply(t, o) : i) || (e.exports = r)
            },
            394: (e, t, n) => {
                function i(e) {
                    return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, i(e)
                }
                var o, r;
                e = n.nmd(e), o = "undefined" != typeof window ? window : {}, r = function(e, t) {
                    "use strict";
                    var n, i;
                    if (function() {
                            var t, n = {
                                lazyClass: "lazyload",
                                loadedClass: "lazyloaded",
                                loadingClass: "lazyloading",
                                preloadClass: "lazypreload",
                                errorClass: "lazyerror",
                                autosizesClass: "lazyautosizes",
                                srcAttr: "data-src",
                                srcsetAttr: "data-srcset",
                                sizesAttr: "data-sizes",
                                minSize: 40,
                                customMedia: {},
                                init: !0,
                                expFactor: 1.5,
                                hFac: .8,
                                loadMode: 2,
                                loadHidden: !0,
                                ricTimeout: 0,
                                throttleDelay: 125
                            };
                            for (t in i = e.lazySizesConfig || e.lazysizesConfig || {}, n) t in i || (i[t] = n[t])
                        }(), !t || !t.getElementsByClassName) return {
                        init: function() {},
                        cfg: i,
                        noSupport: !0
                    };
                    var o = t.documentElement,
                        r = e.Date,
                        s = e.HTMLPictureElement,
                        a = "addEventListener",
                        l = "getAttribute",
                        c = e[a],
                        d = e.setTimeout,
                        u = e.requestAnimationFrame || d,
                        p = e.requestIdleCallback,
                        f = /^picture$/i,
                        h = ["load", "error", "lazyincluded", "_lazyloaded"],
                        g = {},
                        m = Array.prototype.forEach,
                        v = function(e, t) {
                            return g[t] || (g[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), g[t].test(e[l]("class") || "") && g[t]
                        },
                        y = function(e, t) {
                            v(e, t) || e.setAttribute("class", (e[l]("class") || "").trim() + " " + t)
                        },
                        b = function(e, t) {
                            var n;
                            (n = v(e, t)) && e.setAttribute("class", (e[l]("class") || "").replace(n, " "))
                        },
                        w = function e(t, n, i) {
                            var o = i ? a : "removeEventListener";
                            i && e(t, n), h.forEach((function(e) {
                                t[o](e, n)
                            }))
                        },
                        T = function(e, i, o, r, s) {
                            var a = t.createEvent("Event");
                            return o || (o = {}), o.instance = n, a.initEvent(i, !r, !s), a.detail = o, e.dispatchEvent(a), a
                        },
                        x = function(t, n) {
                            var o;
                            !s && (o = e.picturefill || i.pf) ? (n && n.src && !t[l]("srcset") && t.setAttribute("srcset", n.src), o({
                                reevaluate: !0,
                                elements: [t]
                            })) : n && n.src && (t.src = n.src)
                        },
                        S = function(e, t) {
                            return (getComputedStyle(e, null) || {})[t]
                        },
                        C = function(e, t, n) {
                            for (n = n || e.offsetWidth; n < i.minSize && t && !e._lazysizesWidth;) n = t.offsetWidth, t = t.parentNode;
                            return n
                        },
                        _ = function() {
                            var e, n, i = [],
                                o = [],
                                r = i,
                                s = function() {
                                    var t = r;
                                    for (r = i.length ? o : i, e = !0, n = !1; t.length;) t.shift()();
                                    e = !1
                                },
                                a = function(i, o) {
                                    e && !o ? i.apply(this, arguments) : (r.push(i), n || (n = !0, (t.hidden ? d : u)(s)))
                                };
                            return a._lsFlush = s, a
                        }(),
                        k = function(e, t) {
                            return t ? function() {
                                _(e)
                            } : function() {
                                var t = this,
                                    n = arguments;
                                _((function() {
                                    e.apply(t, n)
                                }))
                            }
                        },
                        E = function(e) {
                            var t, n = 0,
                                o = i.throttleDelay,
                                s = i.ricTimeout,
                                a = function() {
                                    t = !1, n = r.now(), e()
                                },
                                l = p && s > 49 ? function() {
                                    p(a, {
                                        timeout: s
                                    }), s !== i.ricTimeout && (s = i.ricTimeout)
                                } : k((function() {
                                    d(a)
                                }), !0);
                            return function(e) {
                                var i;
                                (e = !0 === e) && (s = 33), t || (t = !0, (i = o - (r.now() - n)) < 0 && (i = 0), e || i < 9 ? l() : d(l, i))
                            }
                        },
                        A = function(e) {
                            var t, n, i = 99,
                                o = function() {
                                    t = null, e()
                                },
                                s = function e() {
                                    var t = r.now() - n;
                                    t < i ? d(e, i - t) : (p || o)(o)
                                };
                            return function() {
                                n = r.now(), t || (t = d(s, i))
                            }
                        },
                        D = function() {
                            var s, u, p, h, g, C, D, I, O, L, $, H, P = /^img$/i,
                                j = /^iframe$/i,
                                F = "onscroll" in e && !/(gle|ing)bot/.test(navigator.userAgent),
                                M = 0,
                                R = 0,
                                z = 0,
                                q = -1,
                                W = function(e) {
                                    z--, (!e || z < 0 || !e.target) && (z = 0)
                                },
                                B = function(e) {
                                    return null == H && (H = "hidden" == S(t.body, "visibility")), H || "hidden" != S(e.parentNode, "visibility") && "hidden" != S(e, "visibility")
                                },
                                U = function(e, n) {
                                    var i, r = e,
                                        s = B(e);
                                    for (I -= n, $ += n, O -= n, L += n; s && (r = r.offsetParent) && r != t.body && r != o;)(s = (S(r, "opacity") || 1) > 0) && "visible" != S(r, "overflow") && (i = r.getBoundingClientRect(), s = L > i.left && O < i.right && $ > i.top - 1 && I < i.bottom + 1);
                                    return s
                                },
                                Y = function() {
                                    var e, r, a, c, d, p, f, g, m, v, y, b, w = n.elements;
                                    if ((h = i.loadMode) && z < 8 && (e = w.length)) {
                                        for (r = 0, q++; r < e; r++)
                                            if (w[r] && !w[r]._lazyRace)
                                                if (!F || n.prematureUnveil && n.prematureUnveil(w[r])) ee(w[r]);
                                                else if ((g = w[r][l]("data-expand")) && (p = 1 * g) || (p = R), v || (v = !i.expand || i.expand < 1 ? o.clientHeight > 500 && o.clientWidth > 500 ? 500 : 370 : i.expand, n._defEx = v, y = v * i.expFactor, b = i.hFac, H = null, R < y && z < 1 && q > 2 && h > 2 && !t.hidden ? (R = y, q = 0) : R = h > 1 && q > 1 && z < 6 ? v : M), m !== p && (C = innerWidth + p * b, D = innerHeight + p, f = -1 * p, m = p), a = w[r].getBoundingClientRect(), ($ = a.bottom) >= f && (I = a.top) <= D && (L = a.right) >= f * b && (O = a.left) <= C && ($ || L || O || I) && (i.loadHidden || B(w[r])) && (u && z < 3 && !g && (h < 3 || q < 4) || U(w[r], p))) {
                                            if (ee(w[r]), d = !0, z > 9) break
                                        } else !d && u && !c && z < 4 && q < 4 && h > 2 && (s[0] || i.preloadAfterLoad) && (s[0] || !g && ($ || L || O || I || "auto" != w[r][l](i.sizesAttr))) && (c = s[0] || w[r]);
                                        c && !d && ee(c)
                                    }
                                },
                                K = E(Y),
                                V = function(e) {
                                    var t = e.target;
                                    t._lazyCache ? delete t._lazyCache : (W(e), y(t, i.loadedClass), b(t, i.loadingClass), w(t, X), T(t, "lazyloaded"))
                                },
                                Q = k(V),
                                X = function(e) {
                                    Q({
                                        target: e.target
                                    })
                                },
                                J = function(e, t) {
                                    try {
                                        e.contentWindow.location.replace(t)
                                    } catch (n) {
                                        e.src = t
                                    }
                                },
                                G = function(e) {
                                    var t, n = e[l](i.srcsetAttr);
                                    (t = i.customMedia[e[l]("data-media") || e[l]("media")]) && e.setAttribute("media", t), n && e.setAttribute("srcset", n)
                                },
                                Z = k((function(e, t, n, o, r) {
                                    var s, a, c, u, h, g;
                                    (h = T(e, "lazybeforeunveil", t)).defaultPrevented || (o && (n ? y(e, i.autosizesClass) : e.setAttribute("sizes", o)), a = e[l](i.srcsetAttr), s = e[l](i.srcAttr), r && (u = (c = e.parentNode) && f.test(c.nodeName || "")), g = t.firesLoad || "src" in e && (a || s || u), h = {
                                        target: e
                                    }, y(e, i.loadingClass), g && (clearTimeout(p), p = d(W, 2500), w(e, X, !0)), u && m.call(c.getElementsByTagName("source"), G), a ? e.setAttribute("srcset", a) : s && !u && (j.test(e.nodeName) ? J(e, s) : e.src = s), r && (a || u) && x(e, {
                                        src: s
                                    })), e._lazyRace && delete e._lazyRace, b(e, i.lazyClass), _((function() {
                                        var t = e.complete && e.naturalWidth > 1;
                                        g && !t || (t && y(e, "ls-is-cached"), V(h), e._lazyCache = !0, d((function() {
                                            "_lazyCache" in e && delete e._lazyCache
                                        }), 9)), "lazy" == e.loading && z--
                                    }), !0)
                                })),
                                ee = function(e) {
                                    if (!e._lazyRace) {
                                        var t, n = P.test(e.nodeName),
                                            o = n && (e[l](i.sizesAttr) || e[l]("sizes")),
                                            r = "auto" == o;
                                        (!r && u || !n || !e[l]("src") && !e.srcset || e.complete || v(e, i.errorClass) || !v(e, i.lazyClass)) && (t = T(e, "lazyunveilread").detail, r && N.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, z++, Z(e, t, r, o, n))
                                    }
                                },
                                te = A((function() {
                                    i.loadMode = 3, K()
                                })),
                                ne = function() {
                                    3 == i.loadMode && (i.loadMode = 2), te()
                                },
                                ie = function e() {
                                    if (!u) {
                                        if (r.now() - g < 999) return void d(e, 999);
                                        u = !0, i.loadMode = 3, K(), c("scroll", ne, !0)
                                    }
                                };
                            return {
                                _: function() {
                                    g = r.now(), n.elements = t.getElementsByClassName(i.lazyClass), s = t.getElementsByClassName(i.lazyClass + " " + i.preloadClass), c("scroll", K, !0), c("resize", K, !0), e.MutationObserver ? new MutationObserver(K).observe(o, {
                                        childList: !0,
                                        subtree: !0,
                                        attributes: !0
                                    }) : (o[a]("DOMNodeInserted", K, !0), o[a]("DOMAttrModified", K, !0), setInterval(K, 999)), c("hashchange", K, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(e) {
                                        t[a](e, K, !0)
                                    })), /d$|^c/.test(t.readyState) ? ie() : (c("load", ie), t[a]("DOMContentLoaded", K), d(ie, 2e4)), n.elements.length ? (Y(), _._lsFlush()) : K()
                                },
                                checkElems: K,
                                unveil: ee,
                                _aLSL: ne
                            }
                        }(),
                        N = function() {
                            var e, n = k((function(e, t, n, i) {
                                    var o, r, s;
                                    if (e._lazysizesWidth = i, i += "px", e.setAttribute("sizes", i), f.test(t.nodeName || ""))
                                        for (r = 0, s = (o = t.getElementsByTagName("source")).length; r < s; r++) o[r].setAttribute("sizes", i);
                                    n.detail.dataAttr || x(e, n.detail)
                                })),
                                o = function(e, t, i) {
                                    var o, r = e.parentNode;
                                    r && (i = C(e, r, i), o = T(e, "lazybeforesizes", {
                                        width: i,
                                        dataAttr: !!t
                                    }), o.defaultPrevented || (i = o.detail.width) && i !== e._lazysizesWidth && n(e, r, o, i))
                                },
                                r = function() {
                                    var t, n = e.length;
                                    if (n)
                                        for (t = 0; t < n; t++) o(e[t])
                                },
                                s = A(r);
                            return {
                                _: function() {
                                    e = t.getElementsByClassName(i.autosizesClass), c("resize", s)
                                },
                                checkElems: s,
                                updateElem: o
                            }
                        }(),
                        I = function e() {
                            !e.i && t.getElementsByClassName && (e.i = !0, N._(), D._())
                        };
                    return d((function() {
                        i.init && I()
                    })), n = {
                        cfg: i,
                        autoSizer: N,
                        loader: D,
                        init: I,
                        uP: x,
                        aC: y,
                        rC: b,
                        hC: v,
                        fire: T,
                        gW: C,
                        rAF: _
                    }
                }(o, o.document), o.lazySizes = r, "object" == i(e) && e.exports && (e.exports = r)
            },
            410: function(e, t, n) {
                var i, o, r;

                function s(e) {
                    return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, s(e)
                }
                r = function() {
                    "use strict";

                    function e(e) {
                        return e && "[object Function]" === {}.toString.call(e)
                    }

                    function t(e, t) {
                        if (1 !== e.nodeType) return [];
                        var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
                        return t ? n[t] : n
                    }

                    function i(e) {
                        return "HTML" === e.nodeName ? e : e.parentNode || e.host
                    }

                    function o(e) {
                        if (!e) return document.body;
                        switch (e.nodeName) {
                            case "HTML":
                            case "BODY":
                                return e.ownerDocument.body;
                            case "#document":
                                return e.body
                        }
                        var n = t(e),
                            r = n.overflow,
                            s = n.overflowX,
                            a = n.overflowY;
                        return /(auto|scroll|overlay)/.test(r + a + s) ? e : o(i(e))
                    }

                    function r(e) {
                        return 11 === e ? G : 10 === e ? Z : G || Z
                    }

                    function s(e) {
                        if (!e) return document.documentElement;
                        for (var n = r(10) ? document.body : null, i = e.offsetParent || null; i === n && e.nextElementSibling;) i = (e = e.nextElementSibling).offsetParent;
                        var o = i && i.nodeName;
                        return o && "BODY" !== o && "HTML" !== o ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === t(i, "position") ? s(i) : i : e ? e.ownerDocument.documentElement : document.documentElement
                    }

                    function a(e) {
                        return null === e.parentNode ? e : a(e.parentNode)
                    }

                    function l(e, t) {
                        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
                        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                            i = n ? e : t,
                            o = n ? t : e,
                            r = document.createRange();
                        r.setStart(i, 0), r.setEnd(o, 0);
                        var c = r.commonAncestorContainer;
                        if (e !== c && t !== c || i.contains(o)) return function(e) {
                            var t = e.nodeName;
                            return "BODY" !== t && ("HTML" === t || s(e.firstElementChild) === e)
                        }(c) ? c : s(c);
                        var d = a(e);
                        return d.host ? l(d.host, t) : l(e, a(t).host)
                    }

                    function c(e) {
                        var t = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
                            n = e.nodeName;
                        if ("BODY" === n || "HTML" === n) {
                            var i = e.ownerDocument.documentElement;
                            return (e.ownerDocument.scrollingElement || i)[t]
                        }
                        return e[t]
                    }

                    function d(e, t) {
                        var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                            i = c(t, "top"),
                            o = c(t, "left"),
                            r = n ? -1 : 1;
                        return e.top += i * r, e.bottom += i * r, e.left += o * r, e.right += o * r, e
                    }

                    function u(e, t) {
                        var n = "x" === t ? "Left" : "Top",
                            i = "Left" == n ? "Right" : "Bottom";
                        return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10)
                    }

                    function p(e, t, n, i) {
                        return Y(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], r(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
                    }

                    function f(e) {
                        var t = e.body,
                            n = e.documentElement,
                            i = r(10) && getComputedStyle(n);
                        return {
                            height: p("Height", t, n, i),
                            width: p("Width", t, n, i)
                        }
                    }

                    function h(e) {
                        return ne({}, e, {
                            right: e.left + e.width,
                            bottom: e.top + e.height
                        })
                    }

                    function g(e) {
                        var n = {};
                        try {
                            if (r(10)) {
                                n = e.getBoundingClientRect();
                                var i = c(e, "top"),
                                    o = c(e, "left");
                                n.top += i, n.left += o, n.bottom += i, n.right += o
                            } else n = e.getBoundingClientRect()
                        } catch (e) {}
                        var s = {
                                left: n.left,
                                top: n.top,
                                width: n.right - n.left,
                                height: n.bottom - n.top
                            },
                            a = "HTML" === e.nodeName ? f(e.ownerDocument) : {},
                            l = a.width || e.clientWidth || s.right - s.left,
                            d = a.height || e.clientHeight || s.bottom - s.top,
                            p = e.offsetWidth - l,
                            g = e.offsetHeight - d;
                        if (p || g) {
                            var m = t(e);
                            p -= u(m, "x"), g -= u(m, "y"), s.width -= p, s.height -= g
                        }
                        return h(s)
                    }

                    function m(e, n) {
                        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                            s = r(10),
                            a = "HTML" === n.nodeName,
                            l = g(e),
                            c = g(n),
                            u = o(e),
                            p = t(n),
                            f = parseFloat(p.borderTopWidth, 10),
                            m = parseFloat(p.borderLeftWidth, 10);
                        i && a && (c.top = Y(c.top, 0), c.left = Y(c.left, 0));
                        var v = h({
                            top: l.top - c.top - f,
                            left: l.left - c.left - m,
                            width: l.width,
                            height: l.height
                        });
                        if (v.marginTop = 0, v.marginLeft = 0, !s && a) {
                            var y = parseFloat(p.marginTop, 10),
                                b = parseFloat(p.marginLeft, 10);
                            v.top -= f - y, v.bottom -= f - y, v.left -= m - b, v.right -= m - b, v.marginTop = y, v.marginLeft = b
                        }
                        return (s && !i ? n.contains(u) : n === u && "BODY" !== u.nodeName) && (v = d(v, n)), v
                    }

                    function v(e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                            n = e.ownerDocument.documentElement,
                            i = m(e, n),
                            o = Y(n.clientWidth, window.innerWidth || 0),
                            r = Y(n.clientHeight, window.innerHeight || 0),
                            s = t ? 0 : c(n),
                            a = t ? 0 : c(n, "left");
                        return h({
                            top: s - i.top + i.marginTop,
                            left: a - i.left + i.marginLeft,
                            width: o,
                            height: r
                        })
                    }

                    function y(e) {
                        var n = e.nodeName;
                        if ("BODY" === n || "HTML" === n) return !1;
                        if ("fixed" === t(e, "position")) return !0;
                        var o = i(e);
                        return !!o && y(o)
                    }

                    function b(e) {
                        if (!e || !e.parentElement || r()) return document.documentElement;
                        for (var n = e.parentElement; n && "none" === t(n, "transform");) n = n.parentElement;
                        return n || document.documentElement
                    }

                    function w(e, t, n, r) {
                        var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
                            a = {
                                top: 0,
                                left: 0
                            },
                            c = s ? b(e) : l(e, t);
                        if ("viewport" === r) a = v(c, s);
                        else {
                            var d;
                            "scrollParent" === r ? "BODY" === (d = o(i(t))).nodeName && (d = e.ownerDocument.documentElement) : d = "window" === r ? e.ownerDocument.documentElement : r;
                            var u = m(d, c, s);
                            if ("HTML" !== d.nodeName || y(c)) a = u;
                            else {
                                var p = f(e.ownerDocument),
                                    h = p.height,
                                    g = p.width;
                                a.top += u.top - u.marginTop, a.bottom = h + u.top, a.left += u.left - u.marginLeft, a.right = g + u.left
                            }
                        }
                        var w = "number" == typeof(n = n || 0);
                        return a.left += w ? n : n.left || 0, a.top += w ? n : n.top || 0, a.right -= w ? n : n.right || 0, a.bottom -= w ? n : n.bottom || 0, a
                    }

                    function T(e) {
                        return e.width * e.height
                    }

                    function x(e, t, n, i, o) {
                        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
                        if (-1 === e.indexOf("auto")) return e;
                        var s = w(n, i, r, o),
                            a = {
                                top: {
                                    width: s.width,
                                    height: t.top - s.top
                                },
                                right: {
                                    width: s.right - t.right,
                                    height: s.height
                                },
                                bottom: {
                                    width: s.width,
                                    height: s.bottom - t.bottom
                                },
                                left: {
                                    width: t.left - s.left,
                                    height: s.height
                                }
                            },
                            l = Object.keys(a).map((function(e) {
                                return ne({
                                    key: e
                                }, a[e], {
                                    area: T(a[e])
                                })
                            })).sort((function(e, t) {
                                return t.area - e.area
                            })),
                            c = l.filter((function(e) {
                                var t = e.width,
                                    i = e.height;
                                return t >= n.clientWidth && i >= n.clientHeight
                            })),
                            d = 0 < c.length ? c[0].key : l[0].key,
                            u = e.split("-")[1];
                        return d + (u ? "-" + u : "")
                    }

                    function S(e, t, n) {
                        var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                        return m(n, i ? b(t) : l(t, n), i)
                    }

                    function C(e) {
                        var t = e.ownerDocument.defaultView.getComputedStyle(e),
                            n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
                            i = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
                        return {
                            width: e.offsetWidth + i,
                            height: e.offsetHeight + n
                        }
                    }

                    function _(e) {
                        var t = {
                            left: "right",
                            right: "left",
                            bottom: "top",
                            top: "bottom"
                        };
                        return e.replace(/left|right|bottom|top/g, (function(e) {
                            return t[e]
                        }))
                    }

                    function k(e, t, n) {
                        n = n.split("-")[0];
                        var i = C(e),
                            o = {
                                width: i.width,
                                height: i.height
                            },
                            r = -1 !== ["right", "left"].indexOf(n),
                            s = r ? "top" : "left",
                            a = r ? "left" : "top",
                            l = r ? "height" : "width",
                            c = r ? "width" : "height";
                        return o[s] = t[s] + t[l] / 2 - i[l] / 2, o[a] = n === a ? t[a] - i[c] : t[_(a)], o
                    }

                    function E(e, t) {
                        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
                    }

                    function A(t, n, i) {
                        var o = void 0 === i ? t : t.slice(0, function(e, t, n) {
                            if (Array.prototype.findIndex) return e.findIndex((function(e) {
                                return e[t] === n
                            }));
                            var i = E(e, (function(e) {
                                return e[t] === n
                            }));
                            return e.indexOf(i)
                        }(t, "name", i));
                        return o.forEach((function(t) {
                            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                            var i = t.function || t.fn;
                            t.enabled && e(i) && (n.offsets.popper = h(n.offsets.popper), n.offsets.reference = h(n.offsets.reference), n = i(n, t))
                        })), n
                    }

                    function D() {
                        if (!this.state.isDestroyed) {
                            var e = {
                                instance: this,
                                styles: {},
                                arrowStyles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            e.offsets.reference = S(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = x(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = k(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = A(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                        }
                    }

                    function N(e, t) {
                        return e.some((function(e) {
                            var n = e.name;
                            return e.enabled && n === t
                        }))
                    }

                    function I(e) {
                        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
                            var o = t[i],
                                r = o ? "" + o + n : e;
                            if (void 0 !== document.body.style[r]) return r
                        }
                        return null
                    }

                    function O() {
                        return this.state.isDestroyed = !0, N(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[I("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }

                    function L(e) {
                        var t = e.ownerDocument;
                        return t ? t.defaultView : window
                    }

                    function $(e, t, n, i) {
                        var r = "BODY" === e.nodeName,
                            s = r ? e.ownerDocument.defaultView : e;
                        s.addEventListener(t, n, {
                            passive: !0
                        }), r || $(o(s.parentNode), t, n, i), i.push(s)
                    }

                    function H(e, t, n, i) {
                        n.updateBound = i, L(e).addEventListener("resize", n.updateBound, {
                            passive: !0
                        });
                        var r = o(e);
                        return $(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
                    }

                    function P() {
                        this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate))
                    }

                    function j() {
                        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = function(e, t) {
                            return L(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach((function(e) {
                                e.removeEventListener("scroll", t.updateBound)
                            })), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
                        }(this.reference, this.state))
                    }

                    function F(e) {
                        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
                    }

                    function M(e, t) {
                        Object.keys(t).forEach((function(n) {
                            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && F(t[n]) && (i = "px"), e.style[n] = t[n] + i
                        }))
                    }

                    function R(e, t, n) {
                        var i = E(e, (function(e) {
                                return e.name === t
                            })),
                            o = !!i && e.some((function(e) {
                                return e.name === n && e.enabled && e.order < i.order
                            }));
                        if (!o) {
                            var r = "`" + t + "`";
                            console.warn("`" + n + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
                        }
                        return o
                    }

                    function z(e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                            n = re.indexOf(e),
                            i = re.slice(n + 1).concat(re.slice(0, n));
                        return t ? i.reverse() : i
                    }

                    function q(e, t, n, i) {
                        var o = [0, 0],
                            r = -1 !== ["right", "left"].indexOf(i),
                            s = e.split(/(\+|\-)/).map((function(e) {
                                return e.trim()
                            })),
                            a = s.indexOf(E(s, (function(e) {
                                return -1 !== e.search(/,|\s/)
                            })));
                        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                        var l = /\s*,\s*|\s+/,
                            c = -1 === a ? [s] : [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))];
                        return c = c.map((function(e, i) {
                            var o = (1 === i ? !r : r) ? "height" : "width",
                                s = !1;
                            return e.reduce((function(e, t) {
                                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
                            }), []).map((function(e) {
                                return function(e, t, n, i) {
                                    var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                        r = +o[1],
                                        s = o[2];
                                    return r ? 0 === s.indexOf("%") ? h("%p" === s ? n : i)[t] / 100 * r : "vh" === s || "vw" === s ? ("vh" === s ? Y(document.documentElement.clientHeight, window.innerHeight || 0) : Y(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r : e
                                }(e, o, t, n)
                            }))
                        })), c.forEach((function(e, t) {
                            e.forEach((function(n, i) {
                                F(n) && (o[t] += n * ("-" === e[i - 1] ? -1 : 1))
                            }))
                        })), o
                    }
                    for (var W = Math.min, B = Math.floor, U = Math.round, Y = Math.max, K = "undefined" != typeof window && "undefined" != typeof document, V = ["Edge", "Trident", "Firefox"], Q = 0, X = 0; X < V.length; X += 1)
                        if (K && 0 <= navigator.userAgent.indexOf(V[X])) {
                            Q = 1;
                            break
                        }
                    var J = K && window.Promise ? function(e) {
                            var t = !1;
                            return function() {
                                t || (t = !0, window.Promise.resolve().then((function() {
                                    t = !1, e()
                                })))
                            }
                        } : function(e) {
                            var t = !1;
                            return function() {
                                t || (t = !0, setTimeout((function() {
                                    t = !1, e()
                                }), Q))
                            }
                        },
                        G = K && !(!window.MSInputMethodContext || !document.documentMode),
                        Z = K && /MSIE 10/.test(navigator.userAgent),
                        ee = function() {
                            function e(e, t) {
                                for (var n, i = 0; i < t.length; i++)(n = t[i]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                            }
                            return function(t, n, i) {
                                return n && e(t.prototype, n), i && e(t, i), t
                            }
                        }(),
                        te = function(e, t, n) {
                            return t in e ? Object.defineProperty(e, t, {
                                value: n,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : e[t] = n, e
                        },
                        ne = Object.assign || function(e) {
                            for (var t, n = 1; n < arguments.length; n++)
                                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                            return e
                        },
                        ie = K && /Firefox/i.test(navigator.userAgent),
                        oe = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
                        re = oe.slice(3),
                        se = "flip",
                        ae = "clockwise",
                        le = "counterclockwise",
                        ce = function() {
                            function t(n, i) {
                                var o = this,
                                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                                (function(e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                })(this, t), this.scheduleUpdate = function() {
                                    return requestAnimationFrame(o.update)
                                }, this.update = J(this.update.bind(this)), this.options = ne({}, t.Defaults, r), this.state = {
                                    isDestroyed: !1,
                                    isCreated: !1,
                                    scrollParents: []
                                }, this.reference = n && n.jquery ? n[0] : n, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(ne({}, t.Defaults.modifiers, r.modifiers)).forEach((function(e) {
                                    o.options.modifiers[e] = ne({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                                })), this.modifiers = Object.keys(this.options.modifiers).map((function(e) {
                                    return ne({
                                        name: e
                                    }, o.options.modifiers[e])
                                })).sort((function(e, t) {
                                    return e.order - t.order
                                })), this.modifiers.forEach((function(t) {
                                    t.enabled && e(t.onLoad) && t.onLoad(o.reference, o.popper, o.options, t, o.state)
                                })), this.update();
                                var s = this.options.eventsEnabled;
                                s && this.enableEventListeners(), this.state.eventsEnabled = s
                            }
                            return ee(t, [{
                                key: "update",
                                value: function() {
                                    return D.call(this)
                                }
                            }, {
                                key: "destroy",
                                value: function() {
                                    return O.call(this)
                                }
                            }, {
                                key: "enableEventListeners",
                                value: function() {
                                    return P.call(this)
                                }
                            }, {
                                key: "disableEventListeners",
                                value: function() {
                                    return j.call(this)
                                }
                            }]), t
                        }();
                    return ce.Utils = ("undefined" == typeof window ? n.g : window).PopperUtils, ce.placements = oe, ce.Defaults = {
                        placement: "bottom",
                        positionFixed: !1,
                        eventsEnabled: !0,
                        removeOnDestroy: !1,
                        onCreate: function() {},
                        onUpdate: function() {},
                        modifiers: {
                            shift: {
                                order: 100,
                                enabled: !0,
                                fn: function(e) {
                                    var t = e.placement,
                                        n = t.split("-")[0],
                                        i = t.split("-")[1];
                                    if (i) {
                                        var o = e.offsets,
                                            r = o.reference,
                                            s = o.popper,
                                            a = -1 !== ["bottom", "top"].indexOf(n),
                                            l = a ? "left" : "top",
                                            c = a ? "width" : "height",
                                            d = {
                                                start: te({}, l, r[l]),
                                                end: te({}, l, r[l] + r[c] - s[c])
                                            };
                                        e.offsets.popper = ne({}, s, d[i])
                                    }
                                    return e
                                }
                            },
                            offset: {
                                order: 200,
                                enabled: !0,
                                fn: function(e, t) {
                                    var n, i = t.offset,
                                        o = e.placement,
                                        r = e.offsets,
                                        s = r.popper,
                                        a = r.reference,
                                        l = o.split("-")[0];
                                    return n = F(+i) ? [+i, 0] : q(i, s, a, l), "left" === l ? (s.top += n[0], s.left -= n[1]) : "right" === l ? (s.top += n[0], s.left += n[1]) : "top" === l ? (s.left += n[0], s.top -= n[1]) : "bottom" === l && (s.left += n[0], s.top += n[1]), e.popper = s, e
                                },
                                offset: 0
                            },
                            preventOverflow: {
                                order: 300,
                                enabled: !0,
                                fn: function(e, t) {
                                    var n = t.boundariesElement || s(e.instance.popper);
                                    e.instance.reference === n && (n = s(n));
                                    var i = I("transform"),
                                        o = e.instance.popper.style,
                                        r = o.top,
                                        a = o.left,
                                        l = o[i];
                                    o.top = "", o.left = "", o[i] = "";
                                    var c = w(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
                                    o.top = r, o.left = a, o[i] = l, t.boundaries = c;
                                    var d = t.priority,
                                        u = e.offsets.popper,
                                        p = {
                                            primary: function(e) {
                                                var n = u[e];
                                                return u[e] < c[e] && !t.escapeWithReference && (n = Y(u[e], c[e])), te({}, e, n)
                                            },
                                            secondary: function(e) {
                                                var n = "right" === e ? "left" : "top",
                                                    i = u[n];
                                                return u[e] > c[e] && !t.escapeWithReference && (i = W(u[n], c[e] - ("right" === e ? u.width : u.height))), te({}, n, i)
                                            }
                                        };
                                    return d.forEach((function(e) {
                                        var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                                        u = ne({}, u, p[t](e))
                                    })), e.offsets.popper = u, e
                                },
                                priority: ["left", "right", "top", "bottom"],
                                padding: 5,
                                boundariesElement: "scrollParent"
                            },
                            keepTogether: {
                                order: 400,
                                enabled: !0,
                                fn: function(e) {
                                    var t = e.offsets,
                                        n = t.popper,
                                        i = t.reference,
                                        o = e.placement.split("-")[0],
                                        r = B,
                                        s = -1 !== ["top", "bottom"].indexOf(o),
                                        a = s ? "right" : "bottom",
                                        l = s ? "left" : "top",
                                        c = s ? "width" : "height";
                                    return n[a] < r(i[l]) && (e.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (e.offsets.popper[l] = r(i[a])), e
                                }
                            },
                            arrow: {
                                order: 500,
                                enabled: !0,
                                fn: function(e, n) {
                                    var i;
                                    if (!R(e.instance.modifiers, "arrow", "keepTogether")) return e;
                                    var o = n.element;
                                    if ("string" == typeof o) {
                                        if (!(o = e.instance.popper.querySelector(o))) return e
                                    } else if (!e.instance.popper.contains(o)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                                    var r = e.placement.split("-")[0],
                                        s = e.offsets,
                                        a = s.popper,
                                        l = s.reference,
                                        c = -1 !== ["left", "right"].indexOf(r),
                                        d = c ? "height" : "width",
                                        u = c ? "Top" : "Left",
                                        p = u.toLowerCase(),
                                        f = c ? "left" : "top",
                                        g = c ? "bottom" : "right",
                                        m = C(o)[d];
                                    l[g] - m < a[p] && (e.offsets.popper[p] -= a[p] - (l[g] - m)), l[p] + m > a[g] && (e.offsets.popper[p] += l[p] + m - a[g]), e.offsets.popper = h(e.offsets.popper);
                                    var v = l[p] + l[d] / 2 - m / 2,
                                        y = t(e.instance.popper),
                                        b = parseFloat(y["margin" + u], 10),
                                        w = parseFloat(y["border" + u + "Width"], 10),
                                        T = v - e.offsets.popper[p] - b - w;
                                    return T = Y(W(a[d] - m, T), 0), e.arrowElement = o, e.offsets.arrow = (te(i = {}, p, U(T)), te(i, f, ""), i), e
                                },
                                element: "[x-arrow]"
                            },
                            flip: {
                                order: 600,
                                enabled: !0,
                                fn: function(e, t) {
                                    if (N(e.instance.modifiers, "inner")) return e;
                                    if (e.flipped && e.placement === e.originalPlacement) return e;
                                    var n = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                                        i = e.placement.split("-")[0],
                                        o = _(i),
                                        r = e.placement.split("-")[1] || "",
                                        s = [];
                                    switch (t.behavior) {
                                        case se:
                                            s = [i, o];
                                            break;
                                        case ae:
                                            s = z(i);
                                            break;
                                        case le:
                                            s = z(i, !0);
                                            break;
                                        default:
                                            s = t.behavior
                                    }
                                    return s.forEach((function(a, l) {
                                        if (i !== a || s.length === l + 1) return e;
                                        i = e.placement.split("-")[0], o = _(i);
                                        var c = e.offsets.popper,
                                            d = e.offsets.reference,
                                            u = B,
                                            p = "left" === i && u(c.right) > u(d.left) || "right" === i && u(c.left) < u(d.right) || "top" === i && u(c.bottom) > u(d.top) || "bottom" === i && u(c.top) < u(d.bottom),
                                            f = u(c.left) < u(n.left),
                                            h = u(c.right) > u(n.right),
                                            g = u(c.top) < u(n.top),
                                            m = u(c.bottom) > u(n.bottom),
                                            v = "left" === i && f || "right" === i && h || "top" === i && g || "bottom" === i && m,
                                            y = -1 !== ["top", "bottom"].indexOf(i),
                                            b = !!t.flipVariations && (y && "start" === r && f || y && "end" === r && h || !y && "start" === r && g || !y && "end" === r && m);
                                        (p || v || b) && (e.flipped = !0, (p || v) && (i = s[l + 1]), b && (r = function(e) {
                                            return "end" === e ? "start" : "start" === e ? "end" : e
                                        }(r)), e.placement = i + (r ? "-" + r : ""), e.offsets.popper = ne({}, e.offsets.popper, k(e.instance.popper, e.offsets.reference, e.placement)), e = A(e.instance.modifiers, e, "flip"))
                                    })), e
                                },
                                behavior: "flip",
                                padding: 5,
                                boundariesElement: "viewport"
                            },
                            inner: {
                                order: 700,
                                enabled: !1,
                                fn: function(e) {
                                    var t = e.placement,
                                        n = t.split("-")[0],
                                        i = e.offsets,
                                        o = i.popper,
                                        r = i.reference,
                                        s = -1 !== ["left", "right"].indexOf(n),
                                        a = -1 === ["top", "left"].indexOf(n);
                                    return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), e.placement = _(t), e.offsets.popper = h(o), e
                                }
                            },
                            hide: {
                                order: 800,
                                enabled: !0,
                                fn: function(e) {
                                    if (!R(e.instance.modifiers, "hide", "preventOverflow")) return e;
                                    var t = e.offsets.reference,
                                        n = E(e.instance.modifiers, (function(e) {
                                            return "preventOverflow" === e.name
                                        })).boundaries;
                                    if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                                        if (!0 === e.hide) return e;
                                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                                    } else {
                                        if (!1 === e.hide) return e;
                                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                                    }
                                    return e
                                }
                            },
                            computeStyle: {
                                order: 850,
                                enabled: !0,
                                fn: function(e, t) {
                                    var n = t.x,
                                        i = t.y,
                                        o = e.offsets.popper,
                                        r = E(e.instance.modifiers, (function(e) {
                                            return "applyStyle" === e.name
                                        })).gpuAcceleration;
                                    void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                                    var a, l, c = void 0 === r ? t.gpuAcceleration : r,
                                        d = s(e.instance.popper),
                                        u = g(d),
                                        p = {
                                            position: o.position
                                        },
                                        f = function(e, t) {
                                            var n = e.offsets,
                                                i = n.popper,
                                                o = n.reference,
                                                r = U,
                                                s = function(e) {
                                                    return e
                                                },
                                                a = r(o.width),
                                                l = r(i.width),
                                                c = -1 !== ["left", "right"].indexOf(e.placement),
                                                d = -1 !== e.placement.indexOf("-"),
                                                u = t ? c || d || a % 2 == l % 2 ? r : B : s,
                                                p = t ? r : s;
                                            return {
                                                left: u(1 == a % 2 && 1 == l % 2 && !d && t ? i.left - 1 : i.left),
                                                top: p(i.top),
                                                bottom: p(i.bottom),
                                                right: u(i.right)
                                            }
                                        }(e, 2 > window.devicePixelRatio || !ie),
                                        h = "bottom" === n ? "top" : "bottom",
                                        m = "right" === i ? "left" : "right",
                                        v = I("transform");
                                    if (l = "bottom" == h ? "HTML" === d.nodeName ? -d.clientHeight + f.bottom : -u.height + f.bottom : f.top, a = "right" == m ? "HTML" === d.nodeName ? -d.clientWidth + f.right : -u.width + f.right : f.left, c && v) p[v] = "translate3d(" + a + "px, " + l + "px, 0)", p[h] = 0, p[m] = 0, p.willChange = "transform";
                                    else {
                                        var y = "bottom" == h ? -1 : 1,
                                            b = "right" == m ? -1 : 1;
                                        p[h] = l * y, p[m] = a * b, p.willChange = h + ", " + m
                                    }
                                    var w = {
                                        "x-placement": e.placement
                                    };
                                    return e.attributes = ne({}, w, e.attributes), e.styles = ne({}, p, e.styles), e.arrowStyles = ne({}, e.offsets.arrow, e.arrowStyles), e
                                },
                                gpuAcceleration: !0,
                                x: "bottom",
                                y: "right"
                            },
                            applyStyle: {
                                order: 900,
                                enabled: !0,
                                fn: function(e) {
                                    return M(e.instance.popper, e.styles),
                                        function(e, t) {
                                            Object.keys(t).forEach((function(n) {
                                                !1 === t[n] ? e.removeAttribute(n) : e.setAttribute(n, t[n])
                                            }))
                                        }(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && M(e.arrowElement, e.arrowStyles), e
                                },
                                onLoad: function(e, t, n, i, o) {
                                    var r = S(o, t, e, n.positionFixed),
                                        s = x(n.placement, r, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                                    return t.setAttribute("x-placement", s), M(t, {
                                        position: n.positionFixed ? "fixed" : "absolute"
                                    }), n
                                },
                                gpuAcceleration: void 0
                            }
                        }
                    }, ce
                }, "object" == s(t) ? e.exports = r() : void 0 === (o = "function" == typeof(i = r) ? i.call(t, n, t, e) : i) || (e.exports = o)
            },
            470: function(e, t, n) {
                var i, o, r;

                function s(e) {
                    return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, s(e)
                }
                e = n.nmd(e), o = "undefined" != typeof window ? window : this, r = function(n, o) {
                    var r = [],
                        a = n.document,
                        l = r.slice,
                        c = r.concat,
                        d = r.push,
                        u = r.indexOf,
                        p = {},
                        f = p.toString,
                        h = p.hasOwnProperty,
                        g = {},
                        m = "2.2.4",
                        v = function e(t, n) {
                            return new e.fn.init(t, n)
                        },
                        y = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                        b = /^-ms-/,
                        w = /-([\da-z])/gi,
                        T = function(e, t) {
                            return t.toUpperCase()
                        };

                    function x(e) {
                        var t = !!e && "length" in e && e.length,
                            n = v.type(e);
                        return "function" !== n && !v.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                    }
                    v.fn = v.prototype = {
                        jquery: m,
                        constructor: v,
                        selector: "",
                        length: 0,
                        toArray: function() {
                            return l.call(this)
                        },
                        get: function(e) {
                            return null != e ? 0 > e ? this[e + this.length] : this[e] : l.call(this)
                        },
                        pushStack: function(e) {
                            var t = v.merge(this.constructor(), e);
                            return t.prevObject = this, t.context = this.context, t
                        },
                        each: function(e) {
                            return v.each(this, e)
                        },
                        map: function(e) {
                            return this.pushStack(v.map(this, (function(t, n) {
                                return e.call(t, n, t)
                            })))
                        },
                        slice: function() {
                            return this.pushStack(l.apply(this, arguments))
                        },
                        first: function() {
                            return this.eq(0)
                        },
                        last: function() {
                            return this.eq(-1)
                        },
                        eq: function(e) {
                            var t = this.length,
                                n = +e + (0 > e ? t : 0);
                            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                        },
                        end: function() {
                            return this.prevObject || this.constructor()
                        },
                        push: d,
                        sort: r.sort,
                        splice: r.splice
                    }, v.extend = v.fn.extend = function() {
                        var e, t, n, i, o, r, a = arguments[0] || {},
                            l = 1,
                            c = arguments.length,
                            d = !1;
                        for ("boolean" == typeof a && (d = a, a = arguments[l] || {}, l++), "object" == s(a) || v.isFunction(a) || (a = {}), l === c && (a = this, l--); c > l; l++)
                            if (null != (e = arguments[l]))
                                for (t in e) n = a[t], a !== (i = e[t]) && (d && i && (v.isPlainObject(i) || (o = v.isArray(i))) ? (o ? (o = !1, r = n && v.isArray(n) ? n : []) : r = n && v.isPlainObject(n) ? n : {}, a[t] = v.extend(d, r, i)) : void 0 !== i && (a[t] = i));
                        return a
                    }, v.extend({
                        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function(e) {
                            throw new Error(e)
                        },
                        noop: function() {},
                        isFunction: function(e) {
                            return "function" === v.type(e)
                        },
                        isArray: Array.isArray,
                        isWindow: function(e) {
                            return null != e && e === e.window
                        },
                        isNumeric: function(e) {
                            var t = e && e.toString();
                            return !v.isArray(e) && t - parseFloat(t) + 1 >= 0
                        },
                        isPlainObject: function(e) {
                            var t;
                            if ("object" !== v.type(e) || e.nodeType || v.isWindow(e)) return !1;
                            if (e.constructor && !h.call(e, "constructor") && !h.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
                            for (t in e);
                            return void 0 === t || h.call(e, t)
                        },
                        isEmptyObject: function(e) {
                            var t;
                            for (t in e) return !1;
                            return !0
                        },
                        type: function(e) {
                            return null == e ? e + "" : "object" == s(e) || "function" == typeof e ? p[f.call(e)] || "object" : s(e)
                        },
                        globalEval: function(e) {
                            var t, n = eval;
                            (e = v.trim(e)) && (1 === e.indexOf("use strict") ? ((t = a.createElement("script")).text = e, a.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                        },
                        camelCase: function(e) {
                            return e.replace(b, "ms-").replace(w, T)
                        },
                        nodeName: function(e, t) {
                            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                        },
                        each: function(e, t) {
                            var n, i = 0;
                            if (x(e))
                                for (n = e.length; n > i && !1 !== t.call(e[i], i, e[i]); i++);
                            else
                                for (i in e)
                                    if (!1 === t.call(e[i], i, e[i])) break;
                            return e
                        },
                        trim: function(e) {
                            return null == e ? "" : (e + "").replace(y, "")
                        },
                        makeArray: function(e, t) {
                            var n = t || [];
                            return null != e && (x(Object(e)) ? v.merge(n, "string" == typeof e ? [e] : e) : d.call(n, e)), n
                        },
                        inArray: function(e, t, n) {
                            return null == t ? -1 : u.call(t, e, n)
                        },
                        merge: function(e, t) {
                            for (var n = +t.length, i = 0, o = e.length; n > i; i++) e[o++] = t[i];
                            return e.length = o, e
                        },
                        grep: function(e, t, n) {
                            for (var i = [], o = 0, r = e.length, s = !n; r > o; o++) !t(e[o], o) !== s && i.push(e[o]);
                            return i
                        },
                        map: function(e, t, n) {
                            var i, o, r = 0,
                                s = [];
                            if (x(e))
                                for (i = e.length; i > r; r++) null != (o = t(e[r], r, n)) && s.push(o);
                            else
                                for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
                            return c.apply([], s)
                        },
                        guid: 1,
                        proxy: function(e, t) {
                            var n, i, o;
                            return "string" == typeof t && (n = e[t], t = e, e = n), v.isFunction(e) ? (i = l.call(arguments, 2), o = function() {
                                return e.apply(t || this, i.concat(l.call(arguments)))
                            }, o.guid = e.guid = e.guid || v.guid++, o) : void 0
                        },
                        now: Date.now,
                        support: g
                    }), "function" == typeof Symbol && (v.fn[Symbol.iterator] = r[Symbol.iterator]), v.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                        p["[object " + t + "]"] = t.toLowerCase()
                    }));
                    var S = function(e) {
                        var t, n, i, o, r, s, a, l, c, d, u, p, f, h, g, m, v, y, b, w = "sizzle" + 1 * new Date,
                            T = e.document,
                            x = 0,
                            S = 0,
                            C = re(),
                            _ = re(),
                            k = re(),
                            E = function(e, t) {
                                return e === t && (u = !0), 0
                            },
                            A = 1 << 31,
                            D = {}.hasOwnProperty,
                            N = [],
                            I = N.pop,
                            O = N.push,
                            L = N.push,
                            $ = N.slice,
                            H = function(e, t) {
                                for (var n = 0, i = e.length; i > n; n++)
                                    if (e[n] === t) return n;
                                return -1
                            },
                            P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            j = "[\\x20\\t\\r\\n\\f]",
                            F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                            M = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + j + "*\\]",
                            R = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
                            z = new RegExp(j + "+", "g"),
                            q = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
                            W = new RegExp("^" + j + "*," + j + "*"),
                            B = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
                            U = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"),
                            Y = new RegExp(R),
                            K = new RegExp("^" + F + "$"),
                            V = {
                                ID: new RegExp("^#(" + F + ")"),
                                CLASS: new RegExp("^\\.(" + F + ")"),
                                TAG: new RegExp("^(" + F + "|[*])"),
                                ATTR: new RegExp("^" + M),
                                PSEUDO: new RegExp("^" + R),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                                bool: new RegExp("^(?:" + P + ")$", "i"),
                                needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
                            },
                            Q = /^(?:input|select|textarea|button)$/i,
                            X = /^h\d$/i,
                            J = /^[^{]+\{\s*\[native \w/,
                            G = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            Z = /[+~]/,
                            ee = /'|\\/g,
                            te = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"),
                            ne = function(e, t, n) {
                                var i = "0x" + t - 65536;
                                return i != i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                            },
                            ie = function() {
                                p()
                            };
                        try {
                            L.apply(N = $.call(T.childNodes), T.childNodes), N[T.childNodes.length].nodeType
                        } catch (e) {
                            L = {
                                apply: N.length ? function(e, t) {
                                    O.apply(e, $.call(t))
                                } : function(e, t) {
                                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                                    e.length = n - 1
                                }
                            }
                        }

                        function oe(e, t, i, o) {
                            var r, a, c, d, u, h, v, y, x = t && t.ownerDocument,
                                S = t ? t.nodeType : 9;
                            if (i = i || [], "string" != typeof e || !e || 1 !== S && 9 !== S && 11 !== S) return i;
                            if (!o && ((t ? t.ownerDocument || t : T) !== f && p(t), t = t || f, g)) {
                                if (11 !== S && (h = G.exec(e)))
                                    if (r = h[1]) {
                                        if (9 === S) {
                                            if (!(c = t.getElementById(r))) return i;
                                            if (c.id === r) return i.push(c), i
                                        } else if (x && (c = x.getElementById(r)) && b(t, c) && c.id === r) return i.push(c), i
                                    } else {
                                        if (h[2]) return L.apply(i, t.getElementsByTagName(e)), i;
                                        if ((r = h[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(i, t.getElementsByClassName(r)), i
                                    }
                                if (n.qsa && !k[e + " "] && (!m || !m.test(e))) {
                                    if (1 !== S) x = t, y = e;
                                    else if ("object" !== t.nodeName.toLowerCase()) {
                                        for ((d = t.getAttribute("id")) ? d = d.replace(ee, "\\$&") : t.setAttribute("id", d = w), a = (v = s(e)).length, u = K.test(d) ? "#" + d : "[id='" + d + "']"; a--;) v[a] = u + " " + ge(v[a]);
                                        y = v.join(","), x = Z.test(e) && fe(t.parentNode) || t
                                    }
                                    if (y) try {
                                        return L.apply(i, x.querySelectorAll(y)), i
                                    } catch (e) {} finally {
                                        d === w && t.removeAttribute("id")
                                    }
                                }
                            }
                            return l(e.replace(q, "$1"), t, i, o)
                        }

                        function re() {
                            var e = [];
                            return function t(n, o) {
                                return e.push(n + " ") > i.cacheLength && delete t[e.shift()], t[n + " "] = o
                            }
                        }

                        function se(e) {
                            return e[w] = !0, e
                        }

                        function ae(e) {
                            var t = f.createElement("div");
                            try {
                                return !!e(t)
                            } catch (e) {
                                return !1
                            } finally {
                                t.parentNode && t.parentNode.removeChild(t), t = null
                            }
                        }

                        function le(e, t) {
                            for (var n = e.split("|"), o = n.length; o--;) i.attrHandle[n[o]] = t
                        }

                        function ce(e, t) {
                            var n = t && e,
                                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || A) - (~e.sourceIndex || A);
                            if (i) return i;
                            if (n)
                                for (; n = n.nextSibling;)
                                    if (n === t) return -1;
                            return e ? 1 : -1
                        }

                        function de(e) {
                            return function(t) {
                                return "input" === t.nodeName.toLowerCase() && t.type === e
                            }
                        }

                        function ue(e) {
                            return function(t) {
                                var n = t.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && t.type === e
                            }
                        }

                        function pe(e) {
                            return se((function(t) {
                                return t = +t, se((function(n, i) {
                                    for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                                }))
                            }))
                        }

                        function fe(e) {
                            return e && void 0 !== e.getElementsByTagName && e
                        }
                        for (t in n = oe.support = {}, r = oe.isXML = function(e) {
                                var t = e && (e.ownerDocument || e).documentElement;
                                return !!t && "HTML" !== t.nodeName
                            }, p = oe.setDocument = function(e) {
                                var t, o, s = e ? e.ownerDocument || e : T;
                                return s !== f && 9 === s.nodeType && s.documentElement ? (h = (f = s).documentElement, g = !r(f), (o = f.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", ie, !1) : o.attachEvent && o.attachEvent("onunload", ie)), n.attributes = ae((function(e) {
                                    return e.className = "i", !e.getAttribute("className")
                                })), n.getElementsByTagName = ae((function(e) {
                                    return e.appendChild(f.createComment("")), !e.getElementsByTagName("*").length
                                })), n.getElementsByClassName = J.test(f.getElementsByClassName), n.getById = ae((function(e) {
                                    return h.appendChild(e).id = w, !f.getElementsByName || !f.getElementsByName(w).length
                                })), n.getById ? (i.find.ID = function(e, t) {
                                    if (void 0 !== t.getElementById && g) {
                                        var n = t.getElementById(e);
                                        return n ? [n] : []
                                    }
                                }, i.filter.ID = function(e) {
                                    var t = e.replace(te, ne);
                                    return function(e) {
                                        return e.getAttribute("id") === t
                                    }
                                }) : (delete i.find.ID, i.filter.ID = function(e) {
                                    var t = e.replace(te, ne);
                                    return function(e) {
                                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                        return n && n.value === t
                                    }
                                }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
                                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                                } : function(e, t) {
                                    var n, i = [],
                                        o = 0,
                                        r = t.getElementsByTagName(e);
                                    if ("*" === e) {
                                        for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                                        return i
                                    }
                                    return r
                                }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
                                    return void 0 !== t.getElementsByClassName && g ? t.getElementsByClassName(e) : void 0
                                }, v = [], m = [], (n.qsa = J.test(f.querySelectorAll)) && (ae((function(e) {
                                    h.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
                                })), ae((function(e) {
                                    var t = f.createElement("input");
                                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                                }))), (n.matchesSelector = J.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ae((function(e) {
                                    n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), v.push("!=", R)
                                })), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = J.test(h.compareDocumentPosition), b = t || J.test(h.contains) ? function(e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        i = t && t.parentNode;
                                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                                } : function(e, t) {
                                    if (t)
                                        for (; t = t.parentNode;)
                                            if (t === e) return !0;
                                    return !1
                                }, E = t ? function(e, t) {
                                    if (e === t) return u = !0, 0;
                                    var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                    return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === i ? e === f || e.ownerDocument === T && b(T, e) ? -1 : t === f || t.ownerDocument === T && b(T, t) ? 1 : d ? H(d, e) - H(d, t) : 0 : 4 & i ? -1 : 1)
                                } : function(e, t) {
                                    if (e === t) return u = !0, 0;
                                    var n, i = 0,
                                        o = e.parentNode,
                                        r = t.parentNode,
                                        s = [e],
                                        a = [t];
                                    if (!o || !r) return e === f ? -1 : t === f ? 1 : o ? -1 : r ? 1 : d ? H(d, e) - H(d, t) : 0;
                                    if (o === r) return ce(e, t);
                                    for (n = e; n = n.parentNode;) s.unshift(n);
                                    for (n = t; n = n.parentNode;) a.unshift(n);
                                    for (; s[i] === a[i];) i++;
                                    return i ? ce(s[i], a[i]) : s[i] === T ? -1 : a[i] === T ? 1 : 0
                                }, f) : f
                            }, oe.matches = function(e, t) {
                                return oe(e, null, null, t)
                            }, oe.matchesSelector = function(e, t) {
                                if ((e.ownerDocument || e) !== f && p(e), t = t.replace(U, "='$1']"), n.matchesSelector && g && !k[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) try {
                                    var i = y.call(e, t);
                                    if (i || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                                } catch (e) {}
                                return oe(t, f, null, [e]).length > 0
                            }, oe.contains = function(e, t) {
                                return (e.ownerDocument || e) !== f && p(e), b(e, t)
                            }, oe.attr = function(e, t) {
                                (e.ownerDocument || e) !== f && p(e);
                                var o = i.attrHandle[t.toLowerCase()],
                                    r = o && D.call(i.attrHandle, t.toLowerCase()) ? o(e, t, !g) : void 0;
                                return void 0 !== r ? r : n.attributes || !g ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                            }, oe.error = function(e) {
                                throw new Error("Syntax error, unrecognized expression: " + e)
                            }, oe.uniqueSort = function(e) {
                                var t, i = [],
                                    o = 0,
                                    r = 0;
                                if (u = !n.detectDuplicates, d = !n.sortStable && e.slice(0), e.sort(E), u) {
                                    for (; t = e[r++];) t === e[r] && (o = i.push(r));
                                    for (; o--;) e.splice(i[o], 1)
                                }
                                return d = null, e
                            }, o = oe.getText = function(e) {
                                var t, n = "",
                                    i = 0,
                                    r = e.nodeType;
                                if (r) {
                                    if (1 === r || 9 === r || 11 === r) {
                                        if ("string" == typeof e.textContent) return e.textContent;
                                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                                    } else if (3 === r || 4 === r) return e.nodeValue
                                } else
                                    for (; t = e[i++];) n += o(t);
                                return n
                            }, i = oe.selectors = {
                                cacheLength: 50,
                                createPseudo: se,
                                match: V,
                                attrHandle: {},
                                find: {},
                                relative: {
                                    ">": {
                                        dir: "parentNode",
                                        first: !0
                                    },
                                    " ": {
                                        dir: "parentNode"
                                    },
                                    "+": {
                                        dir: "previousSibling",
                                        first: !0
                                    },
                                    "~": {
                                        dir: "previousSibling"
                                    }
                                },
                                preFilter: {
                                    ATTR: function(e) {
                                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                    },
                                    CHILD: function(e) {
                                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                                    },
                                    PSEUDO: function(e) {
                                        var t, n = !e[6] && e[2];
                                        return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && Y.test(n) && (t = s(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                    }
                                },
                                filter: {
                                    TAG: function(e) {
                                        var t = e.replace(te, ne).toLowerCase();
                                        return "*" === e ? function() {
                                            return !0
                                        } : function(e) {
                                            return e.nodeName && e.nodeName.toLowerCase() === t
                                        }
                                    },
                                    CLASS: function(e) {
                                        var t = C[e + " "];
                                        return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && C(e, (function(e) {
                                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                        }))
                                    },
                                    ATTR: function(e, t, n) {
                                        return function(i) {
                                            var o = oe.attr(i, e);
                                            return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && o.indexOf(n) > -1 : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? (" " + o.replace(z, " ") + " ").indexOf(n) > -1 : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"))
                                        }
                                    },
                                    CHILD: function(e, t, n, i, o) {
                                        var r = "nth" !== e.slice(0, 3),
                                            s = "last" !== e.slice(-4),
                                            a = "of-type" === t;
                                        return 1 === i && 0 === o ? function(e) {
                                            return !!e.parentNode
                                        } : function(t, n, l) {
                                            var c, d, u, p, f, h, g = r !== s ? "nextSibling" : "previousSibling",
                                                m = t.parentNode,
                                                v = a && t.nodeName.toLowerCase(),
                                                y = !l && !a,
                                                b = !1;
                                            if (m) {
                                                if (r) {
                                                    for (; g;) {
                                                        for (p = t; p = p[g];)
                                                            if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                                        h = g = "only" === e && !h && "nextSibling"
                                                    }
                                                    return !0
                                                }
                                                if (h = [s ? m.firstChild : m.lastChild], s && y) {
                                                    for (b = (f = (c = (d = (u = (p = m)[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === x && c[1]) && c[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (b = f = 0) || h.pop();)
                                                        if (1 === p.nodeType && ++b && p === t) {
                                                            d[e] = [x, f, b];
                                                            break
                                                        }
                                                } else if (y && (b = f = (c = (d = (u = (p = t)[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === x && c[1]), !1 === b)
                                                    for (;
                                                        (p = ++f && p && p[g] || (b = f = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && ((d = (u = p[w] || (p[w] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] = [x, b]), p !== t)););
                                                return (b -= o) === i || b % i == 0 && b / i >= 0
                                            }
                                        }
                                    },
                                    PSEUDO: function(e, t) {
                                        var n, o = i.pseudos[e] || i.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                                        return o[w] ? o(t) : o.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? se((function(e, n) {
                                            for (var i, r = o(e, t), s = r.length; s--;) e[i = H(e, r[s])] = !(n[i] = r[s])
                                        })) : function(e) {
                                            return o(e, 0, n)
                                        }) : o
                                    }
                                },
                                pseudos: {
                                    not: se((function(e) {
                                        var t = [],
                                            n = [],
                                            i = a(e.replace(q, "$1"));
                                        return i[w] ? se((function(e, t, n, o) {
                                            for (var r, s = i(e, null, o, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                                        })) : function(e, o, r) {
                                            return t[0] = e, i(t, null, r, n), t[0] = null, !n.pop()
                                        }
                                    })),
                                    has: se((function(e) {
                                        return function(t) {
                                            return oe(e, t).length > 0
                                        }
                                    })),
                                    contains: se((function(e) {
                                        return e = e.replace(te, ne),
                                            function(t) {
                                                return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
                                            }
                                    })),
                                    lang: se((function(e) {
                                        return K.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                                            function(t) {
                                                var n;
                                                do {
                                                    if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                                return !1
                                            }
                                    })),
                                    target: function(t) {
                                        var n = e.location && e.location.hash;
                                        return n && n.slice(1) === t.id
                                    },
                                    root: function(e) {
                                        return e === h
                                    },
                                    focus: function(e) {
                                        return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                    },
                                    enabled: function(e) {
                                        return !1 === e.disabled
                                    },
                                    disabled: function(e) {
                                        return !0 === e.disabled
                                    },
                                    checked: function(e) {
                                        var t = e.nodeName.toLowerCase();
                                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                                    },
                                    selected: function(e) {
                                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                                    },
                                    empty: function(e) {
                                        for (e = e.firstChild; e; e = e.nextSibling)
                                            if (e.nodeType < 6) return !1;
                                        return !0
                                    },
                                    parent: function(e) {
                                        return !i.pseudos.empty(e)
                                    },
                                    header: function(e) {
                                        return X.test(e.nodeName)
                                    },
                                    input: function(e) {
                                        return Q.test(e.nodeName)
                                    },
                                    button: function(e) {
                                        var t = e.nodeName.toLowerCase();
                                        return "input" === t && "button" === e.type || "button" === t
                                    },
                                    text: function(e) {
                                        var t;
                                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                    },
                                    first: pe((function() {
                                        return [0]
                                    })),
                                    last: pe((function(e, t) {
                                        return [t - 1]
                                    })),
                                    eq: pe((function(e, t, n) {
                                        return [0 > n ? n + t : n]
                                    })),
                                    even: pe((function(e, t) {
                                        for (var n = 0; t > n; n += 2) e.push(n);
                                        return e
                                    })),
                                    odd: pe((function(e, t) {
                                        for (var n = 1; t > n; n += 2) e.push(n);
                                        return e
                                    })),
                                    lt: pe((function(e, t, n) {
                                        for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                                        return e
                                    })),
                                    gt: pe((function(e, t, n) {
                                        for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                                        return e
                                    }))
                                }
                            }, i.pseudos.nth = i.pseudos.eq, {
                                radio: !0,
                                checkbox: !0,
                                file: !0,
                                password: !0,
                                image: !0
                            }) i.pseudos[t] = de(t);
                        for (t in {
                                submit: !0,
                                reset: !0
                            }) i.pseudos[t] = ue(t);

                        function he() {}

                        function ge(e) {
                            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                            return i
                        }

                        function me(e, t, n) {
                            var i = t.dir,
                                o = n && "parentNode" === i,
                                r = S++;
                            return t.first ? function(t, n, r) {
                                for (; t = t[i];)
                                    if (1 === t.nodeType || o) return e(t, n, r)
                            } : function(t, n, s) {
                                var a, l, c, d = [x, r];
                                if (s) {
                                    for (; t = t[i];)
                                        if ((1 === t.nodeType || o) && e(t, n, s)) return !0
                                } else
                                    for (; t = t[i];)
                                        if (1 === t.nodeType || o) {
                                            if ((a = (l = (c = t[w] || (t[w] = {}))[t.uniqueID] || (c[t.uniqueID] = {}))[i]) && a[0] === x && a[1] === r) return d[2] = a[2];
                                            if (l[i] = d, d[2] = e(t, n, s)) return !0
                                        }
                            }
                        }

                        function ve(e) {
                            return e.length > 1 ? function(t, n, i) {
                                for (var o = e.length; o--;)
                                    if (!e[o](t, n, i)) return !1;
                                return !0
                            } : e[0]
                        }

                        function ye(e, t, n, i, o) {
                            for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), c && t.push(a)));
                            return s
                        }

                        function be(e, t, n, i, o, r) {
                            return i && !i[w] && (i = be(i)), o && !o[w] && (o = be(o, r)), se((function(r, s, a, l) {
                                var c, d, u, p = [],
                                    f = [],
                                    h = s.length,
                                    g = r || function(e, t, n) {
                                        for (var i = 0, o = t.length; o > i; i++) oe(e, t[i], n);
                                        return n
                                    }(t || "*", a.nodeType ? [a] : a, []),
                                    m = !e || !r && t ? g : ye(g, p, e, a, l),
                                    v = n ? o || (r ? e : h || i) ? [] : s : m;
                                if (n && n(m, v, a, l), i)
                                    for (c = ye(v, f), i(c, [], a, l), d = c.length; d--;)(u = c[d]) && (v[f[d]] = !(m[f[d]] = u));
                                if (r) {
                                    if (o || e) {
                                        if (o) {
                                            for (c = [], d = v.length; d--;)(u = v[d]) && c.push(m[d] = u);
                                            o(null, v = [], c, l)
                                        }
                                        for (d = v.length; d--;)(u = v[d]) && (c = o ? H(r, u) : p[d]) > -1 && (r[c] = !(s[c] = u))
                                    }
                                } else v = ye(v === s ? v.splice(h, v.length) : v), o ? o(null, s, v, l) : L.apply(s, v)
                            }))
                        }

                        function we(e) {
                            for (var t, n, o, r = e.length, s = i.relative[e[0].type], a = s || i.relative[" "], l = s ? 1 : 0, d = me((function(e) {
                                    return e === t
                                }), a, !0), u = me((function(e) {
                                    return H(t, e) > -1
                                }), a, !0), p = [function(e, n, i) {
                                    var o = !s && (i || n !== c) || ((t = n).nodeType ? d(e, n, i) : u(e, n, i));
                                    return t = null, o
                                }]; r > l; l++)
                                if (n = i.relative[e[l].type]) p = [me(ve(p), n)];
                                else {
                                    if ((n = i.filter[e[l].type].apply(null, e[l].matches))[w]) {
                                        for (o = ++l; r > o && !i.relative[e[o].type]; o++);
                                        return be(l > 1 && ve(p), l > 1 && ge(e.slice(0, l - 1).concat({
                                            value: " " === e[l - 2].type ? "*" : ""
                                        })).replace(q, "$1"), n, o > l && we(e.slice(l, o)), r > o && we(e = e.slice(o)), r > o && ge(e))
                                    }
                                    p.push(n)
                                }
                            return ve(p)
                        }

                        function Te(e, t) {
                            var n = t.length > 0,
                                o = e.length > 0,
                                r = function(r, s, a, l, d) {
                                    var u, h, m, v = 0,
                                        y = "0",
                                        b = r && [],
                                        w = [],
                                        T = c,
                                        S = r || o && i.find.TAG("*", d),
                                        C = x += null == T ? 1 : Math.random() || .1,
                                        _ = S.length;
                                    for (d && (c = s === f || s || d); y !== _ && null != (u = S[y]); y++) {
                                        if (o && u) {
                                            for (h = 0, s || u.ownerDocument === f || (p(u), a = !g); m = e[h++];)
                                                if (m(u, s || f, a)) {
                                                    l.push(u);
                                                    break
                                                }
                                            d && (x = C)
                                        }
                                        n && ((u = !m && u) && v--, r && b.push(u))
                                    }
                                    if (v += y, n && y !== v) {
                                        for (h = 0; m = t[h++];) m(b, w, s, a);
                                        if (r) {
                                            if (v > 0)
                                                for (; y--;) b[y] || w[y] || (w[y] = I.call(l));
                                            w = ye(w)
                                        }
                                        L.apply(l, w), d && !r && w.length > 0 && v + t.length > 1 && oe.uniqueSort(l)
                                    }
                                    return d && (x = C, c = T), b
                                };
                            return n ? se(r) : r
                        }
                        return he.prototype = i.filters = i.pseudos, i.setFilters = new he, s = oe.tokenize = function(e, t) {
                            var n, o, r, s, a, l, c, d = _[e + " "];
                            if (d) return t ? 0 : d.slice(0);
                            for (a = e, l = [], c = i.preFilter; a;) {
                                for (s in n && !(o = W.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), n = !1, (o = B.exec(a)) && (n = o.shift(), r.push({
                                        value: n,
                                        type: o[0].replace(q, " ")
                                    }), a = a.slice(n.length)), i.filter) !(o = V[s].exec(a)) || c[s] && !(o = c[s](o)) || (n = o.shift(), r.push({
                                    value: n,
                                    type: s,
                                    matches: o
                                }), a = a.slice(n.length));
                                if (!n) break
                            }
                            return t ? a.length : a ? oe.error(e) : _(e, l).slice(0)
                        }, a = oe.compile = function(e, t) {
                            var n, i = [],
                                o = [],
                                r = k[e + " "];
                            if (!r) {
                                for (t || (t = s(e)), n = t.length; n--;)(r = we(t[n]))[w] ? i.push(r) : o.push(r);
                                (r = k(e, Te(o, i))).selector = e
                            }
                            return r
                        }, l = oe.select = function(e, t, o, r) {
                            var l, c, d, u, p, f = "function" == typeof e && e,
                                h = !r && s(e = f.selector || e);
                            if (o = o || [], 1 === h.length) {
                                if ((c = h[0] = h[0].slice(0)).length > 2 && "ID" === (d = c[0]).type && n.getById && 9 === t.nodeType && g && i.relative[c[1].type]) {
                                    if (!(t = (i.find.ID(d.matches[0].replace(te, ne), t) || [])[0])) return o;
                                    f && (t = t.parentNode), e = e.slice(c.shift().value.length)
                                }
                                for (l = V.needsContext.test(e) ? 0 : c.length; l-- && (d = c[l], !i.relative[u = d.type]);)
                                    if ((p = i.find[u]) && (r = p(d.matches[0].replace(te, ne), Z.test(c[0].type) && fe(t.parentNode) || t))) {
                                        if (c.splice(l, 1), !(e = r.length && ge(c))) return L.apply(o, r), o;
                                        break
                                    }
                            }
                            return (f || a(e, h))(r, t, !g, o, !t || Z.test(e) && fe(t.parentNode) || t), o
                        }, n.sortStable = w.split("").sort(E).join("") === w, n.detectDuplicates = !!u, p(), n.sortDetached = ae((function(e) {
                            return 1 & e.compareDocumentPosition(f.createElement("div"))
                        })), ae((function(e) {
                            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                        })) || le("type|href|height|width", (function(e, t, n) {
                            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                        })), n.attributes && ae((function(e) {
                            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                        })) || le("value", (function(e, t, n) {
                            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                        })), ae((function(e) {
                            return null == e.getAttribute("disabled")
                        })) || le(P, (function(e, t, n) {
                            var i;
                            return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                        })), oe
                    }(n);
                    v.find = S, (v.expr = S.selectors)[":"] = v.expr.pseudos, v.uniqueSort = v.unique = S.uniqueSort, v.text = S.getText, v.isXMLDoc = S.isXML, v.contains = S.contains;
                    var C = function(e, t, n) {
                            for (var i = [], o = void 0 !== n;
                                (e = e[t]) && 9 !== e.nodeType;)
                                if (1 === e.nodeType) {
                                    if (o && v(e).is(n)) break;
                                    i.push(e)
                                }
                            return i
                        },
                        _ = function(e, t) {
                            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                            return n
                        },
                        k = v.expr.match.needsContext,
                        E = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                        A = /^.[^:#\[\.,]*$/;

                    function D(e, t, n) {
                        if (v.isFunction(t)) return v.grep(e, (function(e, i) {
                            return !!t.call(e, i, e) !== n
                        }));
                        if (t.nodeType) return v.grep(e, (function(e) {
                            return e === t !== n
                        }));
                        if ("string" == typeof t) {
                            if (A.test(t)) return v.filter(t, e, n);
                            t = v.filter(t, e)
                        }
                        return v.grep(e, (function(e) {
                            return u.call(t, e) > -1 !== n
                        }))
                    }
                    v.filter = function(e, t, n) {
                        var i = t[0];
                        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? v.find.matchesSelector(i, e) ? [i] : [] : v.find.matches(e, v.grep(t, (function(e) {
                            return 1 === e.nodeType
                        })))
                    }, v.fn.extend({
                        find: function(e) {
                            var t, n = this.length,
                                i = [],
                                o = this;
                            if ("string" != typeof e) return this.pushStack(v(e).filter((function() {
                                for (t = 0; n > t; t++)
                                    if (v.contains(o[t], this)) return !0
                            })));
                            for (t = 0; n > t; t++) v.find(e, o[t], i);
                            return (i = this.pushStack(n > 1 ? v.unique(i) : i)).selector = this.selector ? this.selector + " " + e : e, i
                        },
                        filter: function(e) {
                            return this.pushStack(D(this, e || [], !1))
                        },
                        not: function(e) {
                            return this.pushStack(D(this, e || [], !0))
                        },
                        is: function(e) {
                            return !!D(this, "string" == typeof e && k.test(e) ? v(e) : e || [], !1).length
                        }
                    });
                    var N, I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                        O = v.fn.init = function(e, t, n) {
                            var i, o;
                            if (!e) return this;
                            if (n = n || N, "string" == typeof e) {
                                if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : I.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                                if (i[1]) {
                                    if (t = t instanceof v ? t[0] : t, v.merge(this, v.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : a, !0)), E.test(i[1]) && v.isPlainObject(t))
                                        for (i in t) v.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                                    return this
                                }
                                return (o = a.getElementById(i[2])) && o.parentNode && (this.length = 1, this[0] = o), this.context = a, this.selector = e, this
                            }
                            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : v.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(v) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
                        };
                    O.prototype = v.fn, N = v(a);
                    var L = /^(?:parents|prev(?:Until|All))/,
                        $ = {
                            children: !0,
                            contents: !0,
                            next: !0,
                            prev: !0
                        };

                    function H(e, t) {
                        for (;
                            (e = e[t]) && 1 !== e.nodeType;);
                        return e
                    }
                    v.fn.extend({
                        has: function(e) {
                            var t = v(e, this),
                                n = t.length;
                            return this.filter((function() {
                                for (var e = 0; n > e; e++)
                                    if (v.contains(this, t[e])) return !0
                            }))
                        },
                        closest: function(e, t) {
                            for (var n, i = 0, o = this.length, r = [], s = k.test(e) || "string" != typeof e ? v(e, t || this.context) : 0; o > i; i++)
                                for (n = this[i]; n && n !== t; n = n.parentNode)
                                    if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && v.find.matchesSelector(n, e))) {
                                        r.push(n);
                                        break
                                    }
                            return this.pushStack(r.length > 1 ? v.uniqueSort(r) : r)
                        },
                        index: function(e) {
                            return e ? "string" == typeof e ? u.call(v(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                        },
                        add: function(e, t) {
                            return this.pushStack(v.uniqueSort(v.merge(this.get(), v(e, t))))
                        },
                        addBack: function(e) {
                            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                        }
                    }), v.each({
                        parent: function(e) {
                            var t = e.parentNode;
                            return t && 11 !== t.nodeType ? t : null
                        },
                        parents: function(e) {
                            return C(e, "parentNode")
                        },
                        parentsUntil: function(e, t, n) {
                            return C(e, "parentNode", n)
                        },
                        next: function(e) {
                            return H(e, "nextSibling")
                        },
                        prev: function(e) {
                            return H(e, "previousSibling")
                        },
                        nextAll: function(e) {
                            return C(e, "nextSibling")
                        },
                        prevAll: function(e) {
                            return C(e, "previousSibling")
                        },
                        nextUntil: function(e, t, n) {
                            return C(e, "nextSibling", n)
                        },
                        prevUntil: function(e, t, n) {
                            return C(e, "previousSibling", n)
                        },
                        siblings: function(e) {
                            return _((e.parentNode || {}).firstChild, e)
                        },
                        children: function(e) {
                            return _(e.firstChild)
                        },
                        contents: function(e) {
                            return e.contentDocument || v.merge([], e.childNodes)
                        }
                    }, (function(e, t) {
                        v.fn[e] = function(n, i) {
                            var o = v.map(this, t, n);
                            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = v.filter(i, o)), this.length > 1 && ($[e] || v.uniqueSort(o), L.test(e) && o.reverse()), this.pushStack(o)
                        }
                    }));
                    var P, j = /\S+/g;

                    function F() {
                        a.removeEventListener("DOMContentLoaded", F), n.removeEventListener("load", F), v.ready()
                    }
                    v.Callbacks = function(e) {
                        e = "string" == typeof e ? function(e) {
                            var t = {};
                            return v.each(e.match(j) || [], (function(e, n) {
                                t[n] = !0
                            })), t
                        }(e) : v.extend({}, e);
                        var t, n, i, o, r = [],
                            s = [],
                            a = -1,
                            l = function() {
                                for (o = e.once, i = t = !0; s.length; a = -1)
                                    for (n = s.shift(); ++a < r.length;) !1 === r[a].apply(n[0], n[1]) && e.stopOnFalse && (a = r.length, n = !1);
                                e.memory || (n = !1), t = !1, o && (r = n ? [] : "")
                            },
                            c = {
                                add: function() {
                                    return r && (n && !t && (a = r.length - 1, s.push(n)), function t(n) {
                                        v.each(n, (function(n, i) {
                                            v.isFunction(i) ? e.unique && c.has(i) || r.push(i) : i && i.length && "string" !== v.type(i) && t(i)
                                        }))
                                    }(arguments), n && !t && l()), this
                                },
                                remove: function() {
                                    return v.each(arguments, (function(e, t) {
                                        for (var n;
                                            (n = v.inArray(t, r, n)) > -1;) r.splice(n, 1), a >= n && a--
                                    })), this
                                },
                                has: function(e) {
                                    return e ? v.inArray(e, r) > -1 : r.length > 0
                                },
                                empty: function() {
                                    return r && (r = []), this
                                },
                                disable: function() {
                                    return o = s = [], r = n = "", this
                                },
                                disabled: function() {
                                    return !r
                                },
                                lock: function() {
                                    return o = s = [], n || (r = n = ""), this
                                },
                                locked: function() {
                                    return !!o
                                },
                                fireWith: function(e, n) {
                                    return o || (n = [e, (n = n || []).slice ? n.slice() : n], s.push(n), t || l()), this
                                },
                                fire: function() {
                                    return c.fireWith(this, arguments), this
                                },
                                fired: function() {
                                    return !!i
                                }
                            };
                        return c
                    }, v.extend({
                        Deferred: function(e) {
                            var t = [
                                    ["resolve", "done", v.Callbacks("once memory"), "resolved"],
                                    ["reject", "fail", v.Callbacks("once memory"), "rejected"],
                                    ["notify", "progress", v.Callbacks("memory")]
                                ],
                                n = "pending",
                                i = {
                                    state: function() {
                                        return n
                                    },
                                    always: function() {
                                        return o.done(arguments).fail(arguments), this
                                    },
                                    then: function() {
                                        var e = arguments;
                                        return v.Deferred((function(n) {
                                            v.each(t, (function(t, r) {
                                                var s = v.isFunction(e[t]) && e[t];
                                                o[r[1]]((function() {
                                                    var e = s && s.apply(this, arguments);
                                                    e && v.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                                                }))
                                            })), e = null
                                        })).promise()
                                    },
                                    promise: function(e) {
                                        return null != e ? v.extend(e, i) : i
                                    }
                                },
                                o = {};
                            return i.pipe = i.then, v.each(t, (function(e, r) {
                                var s = r[2],
                                    a = r[3];
                                i[r[1]] = s.add, a && s.add((function() {
                                    n = a
                                }), t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
                                    return o[r[0] + "With"](this === o ? i : this, arguments), this
                                }, o[r[0] + "With"] = s.fireWith
                            })), i.promise(o), e && e.call(o, o), o
                        },
                        when: function(e) {
                            var t, n, i, o = 0,
                                r = l.call(arguments),
                                s = r.length,
                                a = 1 !== s || e && v.isFunction(e.promise) ? s : 0,
                                c = 1 === a ? e : v.Deferred(),
                                d = function(e, n, i) {
                                    return function(o) {
                                        n[e] = this, i[e] = arguments.length > 1 ? l.call(arguments) : o, i === t ? c.notifyWith(n, i) : --a || c.resolveWith(n, i)
                                    }
                                };
                            if (s > 1)
                                for (t = new Array(s), n = new Array(s), i = new Array(s); s > o; o++) r[o] && v.isFunction(r[o].promise) ? r[o].promise().progress(d(o, n, t)).done(d(o, i, r)).fail(c.reject) : --a;
                            return a || c.resolveWith(i, r), c.promise()
                        }
                    }), v.fn.ready = function(e) {
                        return v.ready.promise().done(e), this
                    }, v.extend({
                        isReady: !1,
                        readyWait: 1,
                        holdReady: function(e) {
                            e ? v.readyWait++ : v.ready(!0)
                        },
                        ready: function(e) {
                            (!0 === e ? --v.readyWait : v.isReady) || (v.isReady = !0, !0 !== e && --v.readyWait > 0 || (P.resolveWith(a, [v]), v.fn.triggerHandler && (v(a).triggerHandler("ready"), v(a).off("ready"))))
                        }
                    }), v.ready.promise = function(e) {
                        return P || (P = v.Deferred(), "complete" === a.readyState || "loading" !== a.readyState && !a.documentElement.doScroll ? n.setTimeout(v.ready) : (a.addEventListener("DOMContentLoaded", F), n.addEventListener("load", F))), P.promise(e)
                    }, v.ready.promise();
                    var M = function e(t, n, i, o, r, s, a) {
                            var l = 0,
                                c = t.length,
                                d = null == i;
                            if ("object" === v.type(i))
                                for (l in r = !0, i) e(t, n, l, i[l], !0, s, a);
                            else if (void 0 !== o && (r = !0, v.isFunction(o) || (a = !0), d && (a ? (n.call(t, o), n = null) : (d = n, n = function(e, t, n) {
                                    return d.call(v(e), n)
                                })), n))
                                for (; c > l; l++) n(t[l], i, a ? o : o.call(t[l], l, n(t[l], i)));
                            return r ? t : d ? n.call(t) : c ? n(t[0], i) : s
                        },
                        R = function(e) {
                            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                        };

                    function z() {
                        this.expando = v.expando + z.uid++
                    }
                    z.uid = 1, z.prototype = {
                        register: function(e, t) {
                            var n = t || {};
                            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                                value: n,
                                writable: !0,
                                configurable: !0
                            }), e[this.expando]
                        },
                        cache: function(e) {
                            if (!R(e)) return {};
                            var t = e[this.expando];
                            return t || (t = {}, R(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                                value: t,
                                configurable: !0
                            }))), t
                        },
                        set: function(e, t, n) {
                            var i, o = this.cache(e);
                            if ("string" == typeof t) o[t] = n;
                            else
                                for (i in t) o[i] = t[i];
                            return o
                        },
                        get: function(e, t) {
                            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
                        },
                        access: function(e, t, n) {
                            var i;
                            return void 0 === t || t && "string" == typeof t && void 0 === n ? void 0 !== (i = this.get(e, t)) ? i : this.get(e, v.camelCase(t)) : (this.set(e, t, n), void 0 !== n ? n : t)
                        },
                        remove: function(e, t) {
                            var n, i, o, r = e[this.expando];
                            if (void 0 !== r) {
                                if (void 0 === t) this.register(e);
                                else {
                                    v.isArray(t) ? i = t.concat(t.map(v.camelCase)) : (o = v.camelCase(t), i = t in r ? [t, o] : (i = o) in r ? [i] : i.match(j) || []), n = i.length;
                                    for (; n--;) delete r[i[n]]
                                }(void 0 === t || v.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                            }
                        },
                        hasData: function(e) {
                            var t = e[this.expando];
                            return void 0 !== t && !v.isEmptyObject(t)
                        }
                    };
                    var q = new z,
                        W = new z,
                        B = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                        U = /[A-Z]/g;

                    function Y(e, t, n) {
                        var i;
                        if (void 0 === n && 1 === e.nodeType)
                            if (i = "data-" + t.replace(U, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                                try {
                                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : B.test(n) ? v.parseJSON(n) : n)
                                } catch (e) {}
                                W.set(e, t, n)
                            } else n = void 0;
                        return n
                    }
                    v.extend({
                        hasData: function(e) {
                            return W.hasData(e) || q.hasData(e)
                        },
                        data: function(e, t, n) {
                            return W.access(e, t, n)
                        },
                        removeData: function(e, t) {
                            W.remove(e, t)
                        },
                        _data: function(e, t, n) {
                            return q.access(e, t, n)
                        },
                        _removeData: function(e, t) {
                            q.remove(e, t)
                        }
                    }), v.fn.extend({
                        data: function(e, t) {
                            var n, i, o, r = this[0],
                                a = r && r.attributes;
                            if (void 0 === e) {
                                if (this.length && (o = W.get(r), 1 === r.nodeType && !q.get(r, "hasDataAttrs"))) {
                                    for (n = a.length; n--;) a[n] && 0 === (i = a[n].name).indexOf("data-") && (i = v.camelCase(i.slice(5)), Y(r, i, o[i]));
                                    q.set(r, "hasDataAttrs", !0)
                                }
                                return o
                            }
                            return "object" == s(e) ? this.each((function() {
                                W.set(this, e)
                            })) : M(this, (function(t) {
                                var n, i;
                                if (r && void 0 === t) {
                                    if (void 0 !== (n = W.get(r, e) || W.get(r, e.replace(U, "-$&").toLowerCase()))) return n;
                                    if (i = v.camelCase(e), void 0 !== (n = W.get(r, i))) return n;
                                    if (void 0 !== (n = Y(r, i, void 0))) return n
                                } else i = v.camelCase(e), this.each((function() {
                                    var n = W.get(this, i);
                                    W.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && W.set(this, e, t)
                                }))
                            }), null, t, arguments.length > 1, null, !0)
                        },
                        removeData: function(e) {
                            return this.each((function() {
                                W.remove(this, e)
                            }))
                        }
                    }), v.extend({
                        queue: function(e, t, n) {
                            var i;
                            return e ? (t = (t || "fx") + "queue", i = q.get(e, t), n && (!i || v.isArray(n) ? i = q.access(e, t, v.makeArray(n)) : i.push(n)), i || []) : void 0
                        },
                        dequeue: function(e, t) {
                            var n = v.queue(e, t = t || "fx"),
                                i = n.length,
                                o = n.shift(),
                                r = v._queueHooks(e, t);
                            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, (function() {
                                v.dequeue(e, t)
                            }), r)), !i && r && r.empty.fire()
                        },
                        _queueHooks: function(e, t) {
                            var n = t + "queueHooks";
                            return q.get(e, n) || q.access(e, n, {
                                empty: v.Callbacks("once memory").add((function() {
                                    q.remove(e, [t + "queue", n])
                                }))
                            })
                        }
                    }), v.fn.extend({
                        queue: function(e, t) {
                            var n = 2;
                            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? v.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                                var n = v.queue(this, e, t);
                                v._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && v.dequeue(this, e)
                            }))
                        },
                        dequeue: function(e) {
                            return this.each((function() {
                                v.dequeue(this, e)
                            }))
                        },
                        clearQueue: function(e) {
                            return this.queue(e || "fx", [])
                        },
                        promise: function(e, t) {
                            var n, i = 1,
                                o = v.Deferred(),
                                r = this,
                                s = this.length,
                                a = function() {
                                    --i || o.resolveWith(r, [r])
                                };
                            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = q.get(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                            return a(), o.promise(t)
                        }
                    });
                    var K = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        V = new RegExp("^(?:([+-])=|)(" + K + ")([a-z%]*)$", "i"),
                        Q = ["Top", "Right", "Bottom", "Left"],
                        X = function(e, t) {
                            return "none" === v.css(e = t || e, "display") || !v.contains(e.ownerDocument, e)
                        };

                    function J(e, t, n, i) {
                        var o, r = 1,
                            s = 20,
                            a = i ? function() {
                                return i.cur()
                            } : function() {
                                return v.css(e, t, "")
                            },
                            l = a(),
                            c = n && n[3] || (v.cssNumber[t] ? "" : "px"),
                            d = (v.cssNumber[t] || "px" !== c && +l) && V.exec(v.css(e, t));
                        if (d && d[3] !== c) {
                            c = c || d[3], n = n || [], d = +l || 1;
                            do {
                                v.style(e, t, (d /= r = r || ".5") + c)
                            } while (r !== (r = a() / l) && 1 !== r && --s)
                        }
                        return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = o)), o
                    }
                    var G = /^(?:checkbox|radio)$/i,
                        Z = /<([\w:-]+)/,
                        ee = /^$|\/(?:java|ecma)script/i,
                        te = {
                            option: [1, "<select multiple='multiple'>", "</select>"],
                            thead: [1, "<table>", "</table>"],
                            col: [2, "<table><colgroup>", "</colgroup></table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            _default: [0, "", ""]
                        };

                    function ne(e, t) {
                        var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                        return void 0 === t || t && v.nodeName(e, t) ? v.merge([e], n) : n
                    }

                    function ie(e, t) {
                        for (var n = 0, i = e.length; i > n; n++) q.set(e[n], "globalEval", !t || q.get(t[n], "globalEval"))
                    }
                    te.optgroup = te.option, te.tbody = te.tfoot = te.colgroup = te.caption = te.thead, te.th = te.td;
                    var oe = /<|&#?\w+;/;

                    function re(e, t, n, i, o) {
                        for (var r, s, a, l, c, d, u = t.createDocumentFragment(), p = [], f = 0, h = e.length; h > f; f++)
                            if ((r = e[f]) || 0 === r)
                                if ("object" === v.type(r)) v.merge(p, r.nodeType ? [r] : r);
                                else if (oe.test(r)) {
                            for (s = s || u.appendChild(t.createElement("div")), a = (Z.exec(r) || ["", ""])[1].toLowerCase(), l = te[a] || te._default, s.innerHTML = l[1] + v.htmlPrefilter(r) + l[2], d = l[0]; d--;) s = s.lastChild;
                            v.merge(p, s.childNodes), (s = u.firstChild).textContent = ""
                        } else p.push(t.createTextNode(r));
                        for (u.textContent = "", f = 0; r = p[f++];)
                            if (i && v.inArray(r, i) > -1) o && o.push(r);
                            else if (c = v.contains(r.ownerDocument, r), s = ne(u.appendChild(r), "script"), c && ie(s), n)
                            for (d = 0; r = s[d++];) ee.test(r.type || "") && n.push(r);
                        return u
                    }! function() {
                        var e = a.createDocumentFragment().appendChild(a.createElement("div")),
                            t = a.createElement("input");
                        t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), g.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", g.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
                    }();
                    var se = /^key/,
                        ae = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                        le = /^([^.]*)(?:\.(.+)|)/;

                    function ce() {
                        return !0
                    }

                    function de() {
                        return !1
                    }

                    function ue() {
                        try {
                            return a.activeElement
                        } catch (e) {}
                    }

                    function pe(e, t, n, i, o, r) {
                        var a, l;
                        if ("object" == s(t)) {
                            for (l in "string" != typeof n && (i = i || n, n = void 0), t) pe(e, l, n, i, t[l], r);
                            return e
                        }
                        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = de;
                        else if (!o) return e;
                        return 1 === r && (a = o, o = function(e) {
                            return v().off(e), a.apply(this, arguments)
                        }, o.guid = a.guid || (a.guid = v.guid++)), e.each((function() {
                            v.event.add(this, t, o, i, n)
                        }))
                    }
                    v.event = {
                        global: {},
                        add: function(e, t, n, i, o) {
                            var r, s, a, l, c, d, u, p, f, h, g, m = q.get(e);
                            if (m)
                                for (n.handler && (n = (r = n).handler, o = r.selector), n.guid || (n.guid = v.guid++), (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function(t) {
                                        return void 0 !== v && v.event.triggered !== t.type ? v.event.dispatch.apply(e, arguments) : void 0
                                    }), c = (t = (t || "").match(j) || [""]).length; c--;) f = g = (a = le.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (u = v.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = v.event.special[f] || {}, d = v.extend({
                                    type: f,
                                    origType: g,
                                    data: i,
                                    handler: n,
                                    guid: n.guid,
                                    selector: o,
                                    needsContext: o && v.expr.match.needsContext.test(o),
                                    namespace: h.join(".")
                                }, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, s) || e.addEventListener && e.addEventListener(f, s)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), v.event.global[f] = !0)
                        },
                        remove: function(e, t, n, i, o) {
                            var r, s, a, l, c, d, u, p, f, h, g, m = q.hasData(e) && q.get(e);
                            if (m && (l = m.events)) {
                                for (c = (t = (t || "").match(j) || [""]).length; c--;)
                                    if (f = g = (a = le.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
                                        for (u = v.event.special[f] || {}, p = l[f = (i ? u.delegateType : u.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) d = p[r], !o && g !== d.origType || n && n.guid !== d.guid || a && !a.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (p.splice(r, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                                        s && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, m.handle) || v.removeEvent(e, f, m.handle), delete l[f])
                                    } else
                                        for (f in l) v.event.remove(e, f + t[c], n, i, !0);
                                v.isEmptyObject(l) && q.remove(e, "handle events")
                            }
                        },
                        dispatch: function(e) {
                            e = v.event.fix(e);
                            var t, n, i, o, r, s = [],
                                a = l.call(arguments),
                                c = (q.get(this, "events") || {})[e.type] || [],
                                d = v.event.special[e.type] || {};
                            if (a[0] = e, e.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, e)) {
                                for (s = v.event.handlers.call(this, e, c), t = 0;
                                    (o = s[t++]) && !e.isPropagationStopped();)
                                    for (e.currentTarget = o.elem, n = 0;
                                        (r = o.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, e.data = r.data, void 0 !== (i = ((v.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                                return d.postDispatch && d.postDispatch.call(this, e), e.result
                            }
                        },
                        handlers: function(e, t) {
                            var n, i, o, r, s = [],
                                a = t.delegateCount,
                                l = e.target;
                            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                                for (; l !== this; l = l.parentNode || this)
                                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                                        for (i = [], n = 0; a > n; n++) void 0 === i[o = (r = t[n]).selector + " "] && (i[o] = r.needsContext ? v(o, this).index(l) > -1 : v.find(o, this, null, [l]).length), i[o] && i.push(r);
                                        i.length && s.push({
                                            elem: l,
                                            handlers: i
                                        })
                                    }
                            return a < t.length && s.push({
                                elem: this,
                                handlers: t.slice(a)
                            }), s
                        },
                        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                        fixHooks: {},
                        keyHooks: {
                            props: "char charCode key keyCode".split(" "),
                            filter: function(e, t) {
                                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                            }
                        },
                        mouseHooks: {
                            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                            filter: function(e, t) {
                                var n, i, o, r = t.button;
                                return null == e.pageX && null != t.clientX && (i = (n = e.target.ownerDocument || a).documentElement, o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
                            }
                        },
                        fix: function(e) {
                            if (e[v.expando]) return e;
                            var t, n, i, o = e.type,
                                r = e,
                                s = this.fixHooks[o];
                            for (s || (this.fixHooks[o] = s = ae.test(o) ? this.mouseHooks : se.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new v.Event(r), t = i.length; t--;) e[n = i[t]] = r[n];
                            return e.target || (e.target = a), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, r) : e
                        },
                        special: {
                            load: {
                                noBubble: !0
                            },
                            focus: {
                                trigger: function() {
                                    return this !== ue() && this.focus ? (this.focus(), !1) : void 0
                                },
                                delegateType: "focusin"
                            },
                            blur: {
                                trigger: function() {
                                    return this === ue() && this.blur ? (this.blur(), !1) : void 0
                                },
                                delegateType: "focusout"
                            },
                            click: {
                                trigger: function() {
                                    return "checkbox" === this.type && this.click && v.nodeName(this, "input") ? (this.click(), !1) : void 0
                                },
                                _default: function(e) {
                                    return v.nodeName(e.target, "a")
                                }
                            },
                            beforeunload: {
                                postDispatch: function(e) {
                                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                                }
                            }
                        }
                    }, v.removeEvent = function(e, t, n) {
                        e.removeEventListener && e.removeEventListener(t, n)
                    }, v.Event = function(e, t) {
                        return this instanceof v.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ce : de) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), void(this[v.expando] = !0)) : new v.Event(e, t)
                    }, v.Event.prototype = {
                        constructor: v.Event,
                        isDefaultPrevented: de,
                        isPropagationStopped: de,
                        isImmediatePropagationStopped: de,
                        isSimulated: !1,
                        preventDefault: function() {
                            var e = this.originalEvent;
                            this.isDefaultPrevented = ce, e && !this.isSimulated && e.preventDefault()
                        },
                        stopPropagation: function() {
                            var e = this.originalEvent;
                            this.isPropagationStopped = ce, e && !this.isSimulated && e.stopPropagation()
                        },
                        stopImmediatePropagation: function() {
                            var e = this.originalEvent;
                            this.isImmediatePropagationStopped = ce, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                        }
                    }, v.each({
                        mouseenter: "mouseover",
                        mouseleave: "mouseout",
                        pointerenter: "pointerover",
                        pointerleave: "pointerout"
                    }, (function(e, t) {
                        v.event.special[e] = {
                            delegateType: t,
                            bindType: t,
                            handle: function(e) {
                                var n, i = e.relatedTarget,
                                    o = e.handleObj;
                                return i && (i === this || v.contains(this, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                            }
                        }
                    })), v.fn.extend({
                        on: function(e, t, n, i) {
                            return pe(this, e, t, n, i)
                        },
                        one: function(e, t, n, i) {
                            return pe(this, e, t, n, i, 1)
                        },
                        off: function(e, t, n) {
                            var i, o;
                            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                            if ("object" == s(e)) {
                                for (o in e) this.off(o, t, e[o]);
                                return this
                            }
                            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = de), this.each((function() {
                                v.event.remove(this, e, n, t)
                            }))
                        }
                    });
                    var fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                        he = /<script|<style|<link/i,
                        ge = /checked\s*(?:[^=]|=\s*.checked.)/i,
                        me = /^true\/(.*)/,
                        ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                    function ye(e, t) {
                        return v.nodeName(e, "table") && v.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
                    }

                    function be(e) {
                        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                    }

                    function we(e) {
                        var t = me.exec(e.type);
                        return t ? e.type = t[1] : e.removeAttribute("type"), e
                    }

                    function Te(e, t) {
                        var n, i, o, r, s, a, l, c;
                        if (1 === t.nodeType) {
                            if (q.hasData(e) && (r = q.access(e), s = q.set(t, r), c = r.events))
                                for (o in delete s.handle, s.events = {}, c)
                                    for (n = 0, i = c[o].length; i > n; n++) v.event.add(t, o, c[o][n]);
                            W.hasData(e) && (a = W.access(e), l = v.extend({}, a), W.set(t, l))
                        }
                    }

                    function xe(e, t) {
                        var n = t.nodeName.toLowerCase();
                        "input" === n && G.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                    }

                    function Se(e, t, n, i) {
                        t = c.apply([], t);
                        var o, r, s, a, l, d, u = 0,
                            p = e.length,
                            f = p - 1,
                            h = t[0],
                            m = v.isFunction(h);
                        if (m || p > 1 && "string" == typeof h && !g.checkClone && ge.test(h)) return e.each((function(o) {
                            var r = e.eq(o);
                            m && (t[0] = h.call(this, o, r.html())), Se(r, t, n, i)
                        }));
                        if (p && (r = (o = re(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
                            for (a = (s = v.map(ne(o, "script"), be)).length; p > u; u++) l = o, u !== f && (l = v.clone(l, !0, !0), a && v.merge(s, ne(l, "script"))), n.call(e[u], l, u);
                            if (a)
                                for (d = s[s.length - 1].ownerDocument, v.map(s, we), u = 0; a > u; u++) l = s[u], ee.test(l.type || "") && !q.access(l, "globalEval") && v.contains(d, l) && (l.src ? v._evalUrl && v._evalUrl(l.src) : v.globalEval(l.textContent.replace(ve, "")))
                        }
                        return e
                    }

                    function Ce(e, t, n) {
                        for (var i, o = t ? v.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || v.cleanData(ne(i)), i.parentNode && (n && v.contains(i.ownerDocument, i) && ie(ne(i, "script")), i.parentNode.removeChild(i));
                        return e
                    }
                    v.extend({
                        htmlPrefilter: function(e) {
                            return e.replace(fe, "<$1></$2>")
                        },
                        clone: function(e, t, n) {
                            var i, o, r, s, a = e.cloneNode(!0),
                                l = v.contains(e.ownerDocument, e);
                            if (!(g.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || v.isXMLDoc(e)))
                                for (s = ne(a), i = 0, o = (r = ne(e)).length; o > i; i++) xe(r[i], s[i]);
                            if (t)
                                if (n)
                                    for (r = r || ne(e), s = s || ne(a), i = 0, o = r.length; o > i; i++) Te(r[i], s[i]);
                                else Te(e, a);
                            return (s = ne(a, "script")).length > 0 && ie(s, !l && ne(e, "script")), a
                        },
                        cleanData: function(e) {
                            for (var t, n, i, o = v.event.special, r = 0; void 0 !== (n = e[r]); r++)
                                if (R(n)) {
                                    if (t = n[q.expando]) {
                                        if (t.events)
                                            for (i in t.events) o[i] ? v.event.remove(n, i) : v.removeEvent(n, i, t.handle);
                                        n[q.expando] = void 0
                                    }
                                    n[W.expando] && (n[W.expando] = void 0)
                                }
                        }
                    }), v.fn.extend({
                        domManip: Se,
                        detach: function(e) {
                            return Ce(this, e, !0)
                        },
                        remove: function(e) {
                            return Ce(this, e)
                        },
                        text: function(e) {
                            return M(this, (function(e) {
                                return void 0 === e ? v.text(this) : this.empty().each((function() {
                                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                                }))
                            }), null, e, arguments.length)
                        },
                        append: function() {
                            return Se(this, arguments, (function(e) {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ye(this, e).appendChild(e)
                            }))
                        },
                        prepend: function() {
                            return Se(this, arguments, (function(e) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var t = ye(this, e);
                                    t.insertBefore(e, t.firstChild)
                                }
                            }))
                        },
                        before: function() {
                            return Se(this, arguments, (function(e) {
                                this.parentNode && this.parentNode.insertBefore(e, this)
                            }))
                        },
                        after: function() {
                            return Se(this, arguments, (function(e) {
                                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                            }))
                        },
                        empty: function() {
                            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (v.cleanData(ne(e, !1)), e.textContent = "");
                            return this
                        },
                        clone: function(e, t) {
                            return e = null != e && e, t = null == t ? e : t, this.map((function() {
                                return v.clone(this, e, t)
                            }))
                        },
                        html: function(e) {
                            return M(this, (function(e) {
                                var t = this[0] || {},
                                    n = 0,
                                    i = this.length;
                                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                                if ("string" == typeof e && !he.test(e) && !te[(Z.exec(e) || ["", ""])[1].toLowerCase()]) {
                                    e = v.htmlPrefilter(e);
                                    try {
                                        for (; i > n; n++) 1 === (t = this[n] || {}).nodeType && (v.cleanData(ne(t, !1)), t.innerHTML = e);
                                        t = 0
                                    } catch (e) {}
                                }
                                t && this.empty().append(e)
                            }), null, e, arguments.length)
                        },
                        replaceWith: function() {
                            var e = [];
                            return Se(this, arguments, (function(t) {
                                var n = this.parentNode;
                                v.inArray(this, e) < 0 && (v.cleanData(ne(this)), n && n.replaceChild(t, this))
                            }), e)
                        }
                    }), v.each({
                        appendTo: "append",
                        prependTo: "prepend",
                        insertBefore: "before",
                        insertAfter: "after",
                        replaceAll: "replaceWith"
                    }, (function(e, t) {
                        v.fn[e] = function(e) {
                            for (var n, i = [], o = v(e), r = o.length - 1, s = 0; r >= s; s++) n = s === r ? this : this.clone(!0), v(o[s])[t](n), d.apply(i, n.get());
                            return this.pushStack(i)
                        }
                    }));
                    var _e, ke = {
                        HTML: "block",
                        BODY: "block"
                    };

                    function Ee(e, t) {
                        var n = v(t.createElement(e)).appendTo(t.body),
                            i = v.css(n[0], "display");
                        return n.detach(), i
                    }

                    function Ae(e) {
                        var t = a,
                            n = ke[e];
                        return n || ("none" !== (n = Ee(e, t)) && n || ((t = (_e = (_e || v("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), n = Ee(e, t), _e.detach()), ke[e] = n), n
                    }
                    var De = /^margin/,
                        Ne = new RegExp("^(" + K + ")(?!px)[a-z%]+$", "i"),
                        Ie = function(e) {
                            var t = e.ownerDocument.defaultView;
                            return t && t.opener || (t = n), t.getComputedStyle(e)
                        },
                        Oe = function(e, t, n, i) {
                            var o, r, s = {};
                            for (r in t) s[r] = e.style[r], e.style[r] = t[r];
                            for (r in o = n.apply(e, i || []), t) e.style[r] = s[r];
                            return o
                        },
                        Le = a.documentElement;

                    function $e(e, t, n) {
                        var i, o, r, s, a = e.style;
                        return "" !== (s = (n = n || Ie(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== s || v.contains(e.ownerDocument, e) || (s = v.style(e, t)), n && !g.pixelMarginRight() && Ne.test(s) && De.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r), void 0 !== s ? s + "" : s
                    }

                    function He(e, t) {
                        return {
                            get: function() {
                                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                            }
                        }
                    }! function() {
                        var e, t, i, o, r = a.createElement("div"),
                            s = a.createElement("div");
                        if (s.style) {
                            var l = function() {
                                s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Le.appendChild(r);
                                var a = n.getComputedStyle(s);
                                e = "1%" !== a.top, o = "2px" === a.marginLeft, t = "4px" === a.width, s.style.marginRight = "50%", i = "4px" === a.marginRight, Le.removeChild(r)
                            };
                            s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", g.clearCloneStyle = "content-box" === s.style.backgroundClip, r.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", r.appendChild(s), v.extend(g, {
                                pixelPosition: function() {
                                    return l(), e
                                },
                                boxSizingReliable: function() {
                                    return null == t && l(), t
                                },
                                pixelMarginRight: function() {
                                    return null == t && l(), i
                                },
                                reliableMarginLeft: function() {
                                    return null == t && l(), o
                                },
                                reliableMarginRight: function() {
                                    var e, t = s.appendChild(a.createElement("div"));
                                    return t.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", s.style.width = "1px", Le.appendChild(r), e = !parseFloat(n.getComputedStyle(t).marginRight), Le.removeChild(r), s.removeChild(t), e
                                }
                            })
                        }
                    }();
                    var Pe = /^(none|table(?!-c[ea]).+)/,
                        je = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        Fe = {
                            letterSpacing: "0",
                            fontWeight: "400"
                        },
                        Me = ["Webkit", "O", "Moz", "ms"],
                        Re = a.createElement("div").style;

                    function ze(e) {
                        if (e in Re) return e;
                        for (var t = e[0].toUpperCase() + e.slice(1), n = Me.length; n--;)
                            if ((e = Me[n] + t) in Re) return e
                    }

                    function qe(e, t, n) {
                        var i = V.exec(t);
                        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
                    }

                    function We(e, t, n, i, o) {
                        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += v.css(e, n + Q[r], !0, o)), i ? ("content" === n && (s -= v.css(e, "padding" + Q[r], !0, o)), "margin" !== n && (s -= v.css(e, "border" + Q[r] + "Width", !0, o))) : (s += v.css(e, "padding" + Q[r], !0, o), "padding" !== n && (s += v.css(e, "border" + Q[r] + "Width", !0, o)));
                        return s
                    }

                    function Be(e, t, n) {
                        var i = !0,
                            o = "width" === t ? e.offsetWidth : e.offsetHeight,
                            r = Ie(e),
                            s = "border-box" === v.css(e, "boxSizing", !1, r);
                        if (0 >= o || null == o) {
                            if ((0 > (o = $e(e, t, r)) || null == o) && (o = e.style[t]), Ne.test(o)) return o;
                            i = s && (g.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
                        }
                        return o + We(e, t, n || (s ? "border" : "content"), i, r) + "px"
                    }

                    function Ue(e, t) {
                        for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++)(i = e[s]).style && (r[s] = q.get(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && X(i) && (r[s] = q.access(i, "olddisplay", Ae(i.nodeName)))) : (o = X(i), "none" === n && o || q.set(i, "olddisplay", o ? n : v.css(i, "display"))));
                        for (s = 0; a > s; s++)(i = e[s]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
                        return e
                    }

                    function Ye(e, t, n, i, o) {
                        return new Ye.prototype.init(e, t, n, i, o)
                    }
                    v.extend({
                        cssHooks: {
                            opacity: {
                                get: function(e, t) {
                                    if (t) {
                                        var n = $e(e, "opacity");
                                        return "" === n ? "1" : n
                                    }
                                }
                            }
                        },
                        cssNumber: {
                            animationIterationCount: !0,
                            columnCount: !0,
                            fillOpacity: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0
                        },
                        cssProps: {
                            float: "cssFloat"
                        },
                        style: function(e, t, n, i) {
                            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                                var o, r, a, l = v.camelCase(t),
                                    c = e.style;
                                return t = v.cssProps[l] || (v.cssProps[l] = ze(l) || l), a = v.cssHooks[t] || v.cssHooks[l], void 0 === n ? a && "get" in a && void 0 !== (o = a.get(e, !1, i)) ? o : c[t] : ("string" === (r = s(n)) && (o = V.exec(n)) && o[1] && (n = J(e, t, o), r = "number"), void(null != n && n == n && ("number" === r && (n += o && o[3] || (v.cssNumber[l] ? "" : "px")), g.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (c[t] = n))))
                            }
                        },
                        css: function(e, t, n, i) {
                            var o, r, s, a = v.camelCase(t);
                            return t = v.cssProps[a] || (v.cssProps[a] = ze(a) || a), (s = v.cssHooks[t] || v.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = $e(e, t, i)), "normal" === o && t in Fe && (o = Fe[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
                        }
                    }), v.each(["height", "width"], (function(e, t) {
                        v.cssHooks[t] = {
                            get: function(e, n, i) {
                                return n ? Pe.test(v.css(e, "display")) && 0 === e.offsetWidth ? Oe(e, je, (function() {
                                    return Be(e, t, i)
                                })) : Be(e, t, i) : void 0
                            },
                            set: function(e, n, i) {
                                var o, r = i && Ie(e),
                                    s = i && We(e, t, i, "border-box" === v.css(e, "boxSizing", !1, r), r);
                                return s && (o = V.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = v.css(e, t)), qe(0, n, s)
                            }
                        }
                    })), v.cssHooks.marginLeft = He(g.reliableMarginLeft, (function(e, t) {
                        return t ? (parseFloat($e(e, "marginLeft")) || e.getBoundingClientRect().left - Oe(e, {
                            marginLeft: 0
                        }, (function() {
                            return e.getBoundingClientRect().left
                        }))) + "px" : void 0
                    })), v.cssHooks.marginRight = He(g.reliableMarginRight, (function(e, t) {
                        return t ? Oe(e, {
                            display: "inline-block"
                        }, $e, [e, "marginRight"]) : void 0
                    })), v.each({
                        margin: "",
                        padding: "",
                        border: "Width"
                    }, (function(e, t) {
                        v.cssHooks[e + t] = {
                            expand: function(n) {
                                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + Q[i] + t] = r[i] || r[i - 2] || r[0];
                                return o
                            }
                        }, De.test(e) || (v.cssHooks[e + t].set = qe)
                    })), v.fn.extend({
                        css: function(e, t) {
                            return M(this, (function(e, t, n) {
                                var i, o, r = {},
                                    s = 0;
                                if (v.isArray(t)) {
                                    for (i = Ie(e), o = t.length; o > s; s++) r[t[s]] = v.css(e, t[s], !1, i);
                                    return r
                                }
                                return void 0 !== n ? v.style(e, t, n) : v.css(e, t)
                            }), e, t, arguments.length > 1)
                        },
                        show: function() {
                            return Ue(this, !0)
                        },
                        hide: function() {
                            return Ue(this)
                        },
                        toggle: function(e) {
                            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                                X(this) ? v(this).show() : v(this).hide()
                            }))
                        }
                    }), v.Tween = Ye, Ye.prototype = {
                        constructor: Ye,
                        init: function(e, t, n, i, o, r) {
                            this.elem = e, this.prop = n, this.easing = o || v.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (v.cssNumber[n] ? "" : "px")
                        },
                        cur: function() {
                            var e = Ye.propHooks[this.prop];
                            return e && e.get ? e.get(this) : Ye.propHooks._default.get(this)
                        },
                        run: function(e) {
                            var t, n = Ye.propHooks[this.prop];
                            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ye.propHooks._default.set(this), this
                        }
                    }, Ye.prototype.init.prototype = Ye.prototype, Ye.propHooks = {
                        _default: {
                            get: function(e) {
                                var t;
                                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = v.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                            },
                            set: function(e) {
                                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[v.cssProps[e.prop]] && !v.cssHooks[e.prop] ? e.elem[e.prop] = e.now : v.style(e.elem, e.prop, e.now + e.unit)
                            }
                        }
                    }, Ye.propHooks.scrollTop = Ye.propHooks.scrollLeft = {
                        set: function(e) {
                            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                        }
                    }, v.easing = {
                        linear: function(e) {
                            return e
                        },
                        swing: function(e) {
                            return .5 - Math.cos(e * Math.PI) / 2
                        },
                        _default: "swing"
                    }, (v.fx = Ye.prototype.init).step = {};
                    var Ke, Ve, Qe = /^(?:toggle|show|hide)$/,
                        Xe = /queueHooks$/;

                    function Je() {
                        return n.setTimeout((function() {
                            Ke = void 0
                        })), Ke = v.now()
                    }

                    function Ge(e, t) {
                        var n, i = 0,
                            o = {
                                height: e
                            };
                        for (t = t ? 1 : 0; 4 > i; i += 2 - t) o["margin" + (n = Q[i])] = o["padding" + n] = e;
                        return t && (o.opacity = o.width = e), o
                    }

                    function Ze(e, t, n) {
                        for (var i, o = (et.tweeners[t] || []).concat(et.tweeners["*"]), r = 0, s = o.length; s > r; r++)
                            if (i = o[r].call(n, t, e)) return i
                    }

                    function et(e, t, n) {
                        var i, o, r = 0,
                            s = et.prefilters.length,
                            a = v.Deferred().always((function() {
                                delete l.elem
                            })),
                            l = function() {
                                if (o) return !1;
                                for (var t = Ke || Je(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; s > r; r++) c.tweens[r].run(i);
                                return a.notifyWith(e, [c, i, n]), 1 > i && s ? n : (a.resolveWith(e, [c]), !1)
                            },
                            c = a.promise({
                                elem: e,
                                props: v.extend({}, t),
                                opts: v.extend(!0, {
                                    specialEasing: {},
                                    easing: v.easing._default
                                }, n),
                                originalProperties: t,
                                originalOptions: n,
                                startTime: Ke || Je(),
                                duration: n.duration,
                                tweens: [],
                                createTween: function(t, n) {
                                    var i = v.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                                    return c.tweens.push(i), i
                                },
                                stop: function(t) {
                                    var n = 0,
                                        i = t ? c.tweens.length : 0;
                                    if (o) return this;
                                    for (o = !0; i > n; n++) c.tweens[n].run(1);
                                    return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                                }
                            }),
                            d = c.props;
                        for (function(e, t) {
                                var n, i, o, r, s;
                                for (n in e)
                                    if (o = t[i = v.camelCase(n)], r = e[n], v.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = v.cssHooks[i]) && "expand" in s)
                                        for (n in r = s.expand(r), delete e[i], r) n in e || (e[n] = r[n], t[n] = o);
                                    else t[i] = o
                            }(d, c.opts.specialEasing); s > r; r++)
                            if (i = et.prefilters[r].call(c, e, d, c.opts)) return v.isFunction(i.stop) && (v._queueHooks(c.elem, c.opts.queue).stop = v.proxy(i.stop, i)), i;
                        return v.map(d, Ze, c), v.isFunction(c.opts.start) && c.opts.start.call(e, c), v.fx.timer(v.extend(l, {
                            elem: e,
                            anim: c,
                            queue: c.opts.queue
                        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
                    }
                    v.Animation = v.extend(et, {
                            tweeners: {
                                "*": [function(e, t) {
                                    var n = this.createTween(e, t);
                                    return J(n.elem, e, V.exec(t), n), n
                                }]
                            },
                            tweener: function(e, t) {
                                v.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(j);
                                for (var n, i = 0, o = e.length; o > i; i++) n = e[i], et.tweeners[n] = et.tweeners[n] || [], et.tweeners[n].unshift(t)
                            },
                            prefilters: [function(e, t, n) {
                                var i, o, r, s, a, l, c, d = this,
                                    u = {},
                                    p = e.style,
                                    f = e.nodeType && X(e),
                                    h = q.get(e, "fxshow");
                                for (i in n.queue || (null == (a = v._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                                        a.unqueued || l()
                                    }), a.unqueued++, d.always((function() {
                                        d.always((function() {
                                            a.unqueued--, v.queue(e, "fx").length || a.empty.fire()
                                        }))
                                    }))), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (c = v.css(e, "display")) ? q.get(e, "olddisplay") || Ae(e.nodeName) : c) && "none" === v.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always((function() {
                                        p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                                    }))), t)
                                    if (o = t[i], Qe.exec(o)) {
                                        if (delete t[i], r = r || "toggle" === o, o === (f ? "hide" : "show")) {
                                            if ("show" !== o || !h || void 0 === h[i]) continue;
                                            f = !0
                                        }
                                        u[i] = h && h[i] || v.style(e, i)
                                    } else c = void 0;
                                if (v.isEmptyObject(u)) "inline" === ("none" === c ? Ae(e.nodeName) : c) && (p.display = c);
                                else
                                    for (i in h ? "hidden" in h && (f = h.hidden) : h = q.access(e, "fxshow", {}), r && (h.hidden = !f), f ? v(e).show() : d.done((function() {
                                            v(e).hide()
                                        })), d.done((function() {
                                            var t;
                                            for (t in q.remove(e, "fxshow"), u) v.style(e, t, u[t])
                                        })), u) s = Ze(f ? h[i] : 0, i, d), i in h || (h[i] = s.start, f && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
                            }],
                            prefilter: function(e, t) {
                                t ? et.prefilters.unshift(e) : et.prefilters.push(e)
                            }
                        }), v.speed = function(e, t, n) {
                            var i = e && "object" == s(e) ? v.extend({}, e) : {
                                complete: n || !n && t || v.isFunction(e) && e,
                                duration: e,
                                easing: n && t || t && !v.isFunction(t) && t
                            };
                            return i.duration = v.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in v.fx.speeds ? v.fx.speeds[i.duration] : v.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                                v.isFunction(i.old) && i.old.call(this), i.queue && v.dequeue(this, i.queue)
                            }, i
                        }, v.fn.extend({
                            fadeTo: function(e, t, n, i) {
                                return this.filter(X).css("opacity", 0).show().end().animate({
                                    opacity: t
                                }, e, n, i)
                            },
                            animate: function(e, t, n, i) {
                                var o = v.isEmptyObject(e),
                                    r = v.speed(t, n, i),
                                    s = function() {
                                        var t = et(this, v.extend({}, e), r);
                                        (o || q.get(this, "finish")) && t.stop(!0)
                                    };
                                return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
                            },
                            stop: function(e, t, n) {
                                var i = function(e) {
                                    var t = e.stop;
                                    delete e.stop, t(n)
                                };
                                return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each((function() {
                                    var t = !0,
                                        o = null != e && e + "queueHooks",
                                        r = v.timers,
                                        s = q.get(this);
                                    if (o) s[o] && s[o].stop && i(s[o]);
                                    else
                                        for (o in s) s[o] && s[o].stop && Xe.test(o) && i(s[o]);
                                    for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                                    !t && n || v.dequeue(this, e)
                                }))
                            },
                            finish: function(e) {
                                return !1 !== e && (e = e || "fx"), this.each((function() {
                                    var t, n = q.get(this),
                                        i = n[e + "queue"],
                                        o = n[e + "queueHooks"],
                                        r = v.timers,
                                        s = i ? i.length : 0;
                                    for (n.finish = !0, v.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                                    for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                                    delete n.finish
                                }))
                            }
                        }), v.each(["toggle", "show", "hide"], (function(e, t) {
                            var n = v.fn[t];
                            v.fn[t] = function(e, i, o) {
                                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Ge(t, !0), e, i, o)
                            }
                        })), v.each({
                            slideDown: Ge("show"),
                            slideUp: Ge("hide"),
                            slideToggle: Ge("toggle"),
                            fadeIn: {
                                opacity: "show"
                            },
                            fadeOut: {
                                opacity: "hide"
                            },
                            fadeToggle: {
                                opacity: "toggle"
                            }
                        }, (function(e, t) {
                            v.fn[e] = function(e, n, i) {
                                return this.animate(t, e, n, i)
                            }
                        })), v.timers = [], v.fx.tick = function() {
                            var e, t = 0,
                                n = v.timers;
                            for (Ke = v.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                            n.length || v.fx.stop(), Ke = void 0
                        }, v.fx.timer = function(e) {
                            v.timers.push(e), e() ? v.fx.start() : v.timers.pop()
                        }, v.fx.interval = 13, v.fx.start = function() {
                            Ve || (Ve = n.setInterval(v.fx.tick, v.fx.interval))
                        }, v.fx.stop = function() {
                            n.clearInterval(Ve), Ve = null
                        }, v.fx.speeds = {
                            slow: 600,
                            fast: 200,
                            _default: 400
                        }, v.fn.delay = function(e, t) {
                            return e = v.fx && v.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, i) {
                                var o = n.setTimeout(t, e);
                                i.stop = function() {
                                    n.clearTimeout(o)
                                }
                            }))
                        },
                        function() {
                            var e = a.createElement("input"),
                                t = a.createElement("select"),
                                n = t.appendChild(a.createElement("option"));
                            e.type = "checkbox", g.checkOn = "" !== e.value, g.optSelected = n.selected, t.disabled = !0, g.optDisabled = !n.disabled, (e = a.createElement("input")).value = "t", e.type = "radio", g.radioValue = "t" === e.value
                        }();
                    var tt, nt = v.expr.attrHandle;
                    v.fn.extend({
                        attr: function(e, t) {
                            return M(this, v.attr, e, t, arguments.length > 1)
                        },
                        removeAttr: function(e) {
                            return this.each((function() {
                                v.removeAttr(this, e)
                            }))
                        }
                    }), v.extend({
                        attr: function(e, t, n) {
                            var i, o, r = e.nodeType;
                            if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? v.prop(e, t, n) : (1 === r && v.isXMLDoc(e) || (t = t.toLowerCase(), o = v.attrHooks[t] || (v.expr.match.bool.test(t) ? tt : void 0)), void 0 !== n ? null === n ? void v.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = v.find.attr(e, t)) ? void 0 : i)
                        },
                        attrHooks: {
                            type: {
                                set: function(e, t) {
                                    if (!g.radioValue && "radio" === t && v.nodeName(e, "input")) {
                                        var n = e.value;
                                        return e.setAttribute("type", t), n && (e.value = n), t
                                    }
                                }
                            }
                        },
                        removeAttr: function(e, t) {
                            var n, i, o = 0,
                                r = t && t.match(j);
                            if (r && 1 === e.nodeType)
                                for (; n = r[o++];) i = v.propFix[n] || n, v.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
                        }
                    }), tt = {
                        set: function(e, t, n) {
                            return !1 === t ? v.removeAttr(e, n) : e.setAttribute(n, n), n
                        }
                    }, v.each(v.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                        var n = nt[t] || v.find.attr;
                        nt[t] = function(e, t, i) {
                            var o, r;
                            return i || (r = nt[t], nt[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, nt[t] = r), o
                        }
                    }));
                    var it = /^(?:input|select|textarea|button)$/i,
                        ot = /^(?:a|area)$/i;
                    v.fn.extend({
                        prop: function(e, t) {
                            return M(this, v.prop, e, t, arguments.length > 1)
                        },
                        removeProp: function(e) {
                            return this.each((function() {
                                delete this[v.propFix[e] || e]
                            }))
                        }
                    }), v.extend({
                        prop: function(e, t, n) {
                            var i, o, r = e.nodeType;
                            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && v.isXMLDoc(e) || (t = v.propFix[t] || t, o = v.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
                        },
                        propHooks: {
                            tabIndex: {
                                get: function(e) {
                                    var t = v.find.attr(e, "tabindex");
                                    return t ? parseInt(t, 10) : it.test(e.nodeName) || ot.test(e.nodeName) && e.href ? 0 : -1
                                }
                            }
                        },
                        propFix: {
                            for: "htmlFor",
                            class: "className"
                        }
                    }), g.optSelected || (v.propHooks.selected = {
                        get: function(e) {
                            var t = e.parentNode;
                            return t && t.parentNode && t.parentNode.selectedIndex, null
                        },
                        set: function(e) {
                            var t = e.parentNode;
                            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                        }
                    }), v.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                        v.propFix[this.toLowerCase()] = this
                    }));
                    var rt = /[\t\r\n\f]/g;

                    function st(e) {
                        return e.getAttribute && e.getAttribute("class") || ""
                    }
                    v.fn.extend({
                        addClass: function(e) {
                            var t, n, i, o, r, s, a, l = 0;
                            if (v.isFunction(e)) return this.each((function(t) {
                                v(this).addClass(e.call(this, t, st(this)))
                            }));
                            if ("string" == typeof e && e)
                                for (t = e.match(j) || []; n = this[l++];)
                                    if (o = st(n), i = 1 === n.nodeType && (" " + o + " ").replace(rt, " ")) {
                                        for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                                        o !== (a = v.trim(i)) && n.setAttribute("class", a)
                                    }
                            return this
                        },
                        removeClass: function(e) {
                            var t, n, i, o, r, s, a, l = 0;
                            if (v.isFunction(e)) return this.each((function(t) {
                                v(this).removeClass(e.call(this, t, st(this)))
                            }));
                            if (!arguments.length) return this.attr("class", "");
                            if ("string" == typeof e && e)
                                for (t = e.match(j) || []; n = this[l++];)
                                    if (o = st(n), i = 1 === n.nodeType && (" " + o + " ").replace(rt, " ")) {
                                        for (s = 0; r = t[s++];)
                                            for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
                                        o !== (a = v.trim(i)) && n.setAttribute("class", a)
                                    }
                            return this
                        },
                        toggleClass: function(e, t) {
                            var n = s(e);
                            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : v.isFunction(e) ? this.each((function(n) {
                                v(this).toggleClass(e.call(this, n, st(this), t), t)
                            })) : this.each((function() {
                                var t, i, o, r;
                                if ("string" === n)
                                    for (i = 0, o = v(this), r = e.match(j) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                                else void 0 !== e && "boolean" !== n || ((t = st(this)) && q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : q.get(this, "__className__") || ""))
                            }))
                        },
                        hasClass: function(e) {
                            var t, n, i = 0;
                            for (t = " " + e + " "; n = this[i++];)
                                if (1 === n.nodeType && (" " + st(n) + " ").replace(rt, " ").indexOf(t) > -1) return !0;
                            return !1
                        }
                    });
                    var at = /\r/g,
                        lt = /[\x20\t\r\n\f]+/g;
                    v.fn.extend({
                        val: function(e) {
                            var t, n, i, o = this[0];
                            return arguments.length ? (i = v.isFunction(e), this.each((function(n) {
                                var o;
                                1 === this.nodeType && (null == (o = i ? e.call(this, n, v(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : v.isArray(o) && (o = v.map(o, (function(e) {
                                    return null == e ? "" : e + ""
                                }))), (t = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                            }))) : o ? (t = v.valHooks[o.type] || v.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(at, "") : null == n ? "" : n : void 0
                        }
                    }), v.extend({
                        valHooks: {
                            option: {
                                get: function(e) {
                                    var t = v.find.attr(e, "value");
                                    return null != t ? t : v.trim(v.text(e)).replace(lt, " ")
                                }
                            },
                            select: {
                                get: function(e) {
                                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++)
                                        if (((n = i[l]).selected || l === o) && (g.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                                            if (t = v(n).val(), r) return t;
                                            s.push(t)
                                        }
                                    return s
                                },
                                set: function(e, t) {
                                    for (var n, i, o = e.options, r = v.makeArray(t), s = o.length; s--;)((i = o[s]).selected = v.inArray(v.valHooks.option.get(i), r) > -1) && (n = !0);
                                    return n || (e.selectedIndex = -1), r
                                }
                            }
                        }
                    }), v.each(["radio", "checkbox"], (function() {
                        v.valHooks[this] = {
                            set: function(e, t) {
                                return v.isArray(t) ? e.checked = v.inArray(v(e).val(), t) > -1 : void 0
                            }
                        }, g.checkOn || (v.valHooks[this].get = function(e) {
                            return null === e.getAttribute("value") ? "on" : e.value
                        })
                    }));
                    var ct = /^(?:focusinfocus|focusoutblur)$/;
                    v.extend(v.event, {
                        trigger: function(e, t, i, o) {
                            var r, l, c, d, u, p, f, g = [i || a],
                                m = h.call(e, "type") ? e.type : e,
                                y = h.call(e, "namespace") ? e.namespace.split(".") : [];
                            if (l = c = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !ct.test(m + v.event.triggered) && (m.indexOf(".") > -1 && (y = m.split("."), m = y.shift(), y.sort()), u = m.indexOf(":") < 0 && "on" + m, (e = e[v.expando] ? e : new v.Event(m, "object" == s(e) && e)).isTrigger = o ? 2 : 3, e.namespace = y.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), t = null == t ? [e] : v.makeArray(t, [e]), f = v.event.special[m] || {}, o || !f.trigger || !1 !== f.trigger.apply(i, t))) {
                                if (!o && !f.noBubble && !v.isWindow(i)) {
                                    for (d = f.delegateType || m, ct.test(d + m) || (l = l.parentNode); l; l = l.parentNode) g.push(l), c = l;
                                    c === (i.ownerDocument || a) && g.push(c.defaultView || c.parentWindow || n)
                                }
                                for (r = 0;
                                    (l = g[r++]) && !e.isPropagationStopped();) e.type = r > 1 ? d : f.bindType || m, (p = (q.get(l, "events") || {})[e.type] && q.get(l, "handle")) && p.apply(l, t), (p = u && l[u]) && p.apply && R(l) && (e.result = p.apply(l, t), !1 === e.result && e.preventDefault());
                                return e.type = m, o || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(g.pop(), t) || !R(i) || u && v.isFunction(i[m]) && !v.isWindow(i) && ((c = i[u]) && (i[u] = null), v.event.triggered = m, i[m](), v.event.triggered = void 0, c && (i[u] = c)), e.result
                            }
                        },
                        simulate: function(e, t, n) {
                            var i = v.extend(new v.Event, n, {
                                type: e,
                                isSimulated: !0
                            });
                            v.event.trigger(i, null, t)
                        }
                    }), v.fn.extend({
                        trigger: function(e, t) {
                            return this.each((function() {
                                v.event.trigger(e, t, this)
                            }))
                        },
                        triggerHandler: function(e, t) {
                            var n = this[0];
                            return n ? v.event.trigger(e, t, n, !0) : void 0
                        }
                    }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), (function(e, t) {
                        v.fn[t] = function(e, n) {
                            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                        }
                    })), v.fn.extend({
                        hover: function(e, t) {
                            return this.mouseenter(e).mouseleave(t || e)
                        }
                    }), g.focusin = "onfocusin" in n, g.focusin || v.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, (function(e, t) {
                        var n = function(e) {
                            v.event.simulate(t, e.target, v.event.fix(e))
                        };
                        v.event.special[t] = {
                            setup: function() {
                                var i = this.ownerDocument || this,
                                    o = q.access(i, t);
                                o || i.addEventListener(e, n, !0), q.access(i, t, (o || 0) + 1)
                            },
                            teardown: function() {
                                var i = this.ownerDocument || this,
                                    o = q.access(i, t) - 1;
                                o ? q.access(i, t, o) : (i.removeEventListener(e, n, !0), q.remove(i, t))
                            }
                        }
                    }));
                    var dt = n.location,
                        ut = v.now(),
                        pt = /\?/;
                    v.parseJSON = function(e) {
                        return JSON.parse(e + "")
                    }, v.parseXML = function(e) {
                        var t;
                        if (!e || "string" != typeof e) return null;
                        try {
                            t = (new n.DOMParser).parseFromString(e, "text/xml")
                        } catch (e) {
                            t = void 0
                        }
                        return t && !t.getElementsByTagName("parsererror").length || v.error("Invalid XML: " + e), t
                    };
                    var ft = /#.*$/,
                        ht = /([?&])_=[^&]*/,
                        gt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                        mt = /^(?:GET|HEAD)$/,
                        vt = /^\/\//,
                        yt = {},
                        bt = {},
                        wt = "*/".concat("*"),
                        Tt = a.createElement("a");

                    function xt(e) {
                        return function(t, n) {
                            "string" != typeof t && (n = t, t = "*");
                            var i, o = 0,
                                r = t.toLowerCase().match(j) || [];
                            if (v.isFunction(n))
                                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                        }
                    }

                    function St(e, t, n, i) {
                        var o = {},
                            r = e === bt;

                        function s(a) {
                            var l;
                            return o[a] = !0, v.each(e[a] || [], (function(e, a) {
                                var c = a(t, n, i);
                                return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (t.dataTypes.unshift(c), s(c), !1)
                            })), l
                        }
                        return s(t.dataTypes[0]) || !o["*"] && s("*")
                    }

                    function Ct(e, t) {
                        var n, i, o = v.ajaxSettings.flatOptions || {};
                        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
                        return i && v.extend(!0, e, i), e
                    }
                    Tt.href = dt.href, v.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: dt.href,
                            type: "GET",
                            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(dt.protocol),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: {
                                "*": wt,
                                text: "text/plain",
                                html: "text/html",
                                xml: "application/xml, text/xml",
                                json: "application/json, text/javascript"
                            },
                            contents: {
                                xml: /\bxml\b/,
                                html: /\bhtml/,
                                json: /\bjson\b/
                            },
                            responseFields: {
                                xml: "responseXML",
                                text: "responseText",
                                json: "responseJSON"
                            },
                            converters: {
                                "* text": String,
                                "text html": !0,
                                "text json": v.parseJSON,
                                "text xml": v.parseXML
                            },
                            flatOptions: {
                                url: !0,
                                context: !0
                            }
                        },
                        ajaxSetup: function(e, t) {
                            return t ? Ct(Ct(e, v.ajaxSettings), t) : Ct(v.ajaxSettings, e)
                        },
                        ajaxPrefilter: xt(yt),
                        ajaxTransport: xt(bt),
                        ajax: function(e, t) {
                            "object" == s(e) && (t = e, e = void 0);
                            var i, o, r, l, c, d, u, p, f = v.ajaxSetup({}, t = t || {}),
                                h = f.context || f,
                                g = f.context && (h.nodeType || h.jquery) ? v(h) : v.event,
                                m = v.Deferred(),
                                y = v.Callbacks("once memory"),
                                b = f.statusCode || {},
                                w = {},
                                T = {},
                                x = 0,
                                S = "canceled",
                                C = {
                                    readyState: 0,
                                    getResponseHeader: function(e) {
                                        var t;
                                        if (2 === x) {
                                            if (!l)
                                                for (l = {}; t = gt.exec(r);) l[t[1].toLowerCase()] = t[2];
                                            t = l[e.toLowerCase()]
                                        }
                                        return null == t ? null : t
                                    },
                                    getAllResponseHeaders: function() {
                                        return 2 === x ? r : null
                                    },
                                    setRequestHeader: function(e, t) {
                                        var n = e.toLowerCase();
                                        return x || (e = T[n] = T[n] || e, w[e] = t), this
                                    },
                                    overrideMimeType: function(e) {
                                        return x || (f.mimeType = e), this
                                    },
                                    statusCode: function(e) {
                                        var t;
                                        if (e)
                                            if (2 > x)
                                                for (t in e) b[t] = [b[t], e[t]];
                                            else C.always(e[C.status]);
                                        return this
                                    },
                                    abort: function(e) {
                                        var t = e || S;
                                        return i && i.abort(t), _(0, t), this
                                    }
                                };
                            if (m.promise(C).complete = y.add, C.success = C.done, C.error = C.fail, f.url = ((e || f.url || dt.href) + "").replace(ft, "").replace(vt, dt.protocol + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = v.trim(f.dataType || "*").toLowerCase().match(j) || [""], null == f.crossDomain) {
                                d = a.createElement("a");
                                try {
                                    d.href = f.url, d.href = d.href, f.crossDomain = Tt.protocol + "//" + Tt.host != d.protocol + "//" + d.host
                                } catch (e) {
                                    f.crossDomain = !0
                                }
                            }
                            if (f.data && f.processData && "string" != typeof f.data && (f.data = v.param(f.data, f.traditional)), St(yt, f, t, C), 2 === x) return C;
                            for (p in (u = v.event && f.global) && 0 == v.active++ && v.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !mt.test(f.type), o = f.url, f.hasContent || (f.data && (o = f.url += (pt.test(o) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (f.url = ht.test(o) ? o.replace(ht, "$1_=" + ut++) : o + (pt.test(o) ? "&" : "?") + "_=" + ut++)), f.ifModified && (v.lastModified[o] && C.setRequestHeader("If-Modified-Since", v.lastModified[o]), v.etag[o] && C.setRequestHeader("If-None-Match", v.etag[o])), (f.data && f.hasContent && !1 !== f.contentType || t.contentType) && C.setRequestHeader("Content-Type", f.contentType), C.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + wt + "; q=0.01" : "") : f.accepts["*"]), f.headers) C.setRequestHeader(p, f.headers[p]);
                            if (f.beforeSend && (!1 === f.beforeSend.call(h, C, f) || 2 === x)) return C.abort();
                            for (p in S = "abort", {
                                    success: 1,
                                    error: 1,
                                    complete: 1
                                }) C[p](f[p]);
                            if (i = St(bt, f, t, C)) {
                                if (C.readyState = 1, u && g.trigger("ajaxSend", [C, f]), 2 === x) return C;
                                f.async && f.timeout > 0 && (c = n.setTimeout((function() {
                                    C.abort("timeout")
                                }), f.timeout));
                                try {
                                    x = 1, i.send(w, _)
                                } catch (e) {
                                    if (!(2 > x)) throw e;
                                    _(-1, e)
                                }
                            } else _(-1, "No Transport");

                            function _(e, t, s, a) {
                                var l, d, p, w, T, S = t;
                                2 !== x && (x = 2, c && n.clearTimeout(c), i = void 0, r = a || "", C.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, s && (w = function(e, t, n) {
                                    for (var i, o, r, s, a = e.contents, l = e.dataTypes;
                                        "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                                    if (i)
                                        for (o in a)
                                            if (a[o] && a[o].test(i)) {
                                                l.unshift(o);
                                                break
                                            }
                                    if (l[0] in n) r = l[0];
                                    else {
                                        for (o in n) {
                                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                                r = o;
                                                break
                                            }
                                            s || (s = o)
                                        }
                                        r = r || s
                                    }
                                    return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
                                }(f, C, s)), w = function(e, t, n, i) {
                                    var o, r, s, a, l, c = {},
                                        d = e.dataTypes.slice();
                                    if (d[1])
                                        for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                                    for (r = d.shift(); r;)
                                        if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
                                            if ("*" === r) r = l;
                                            else if ("*" !== l && l !== r) {
                                        if (!(s = c[l + " " + r] || c["* " + r]))
                                            for (o in c)
                                                if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                                    !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
                                                    break
                                                }
                                        if (!0 !== s)
                                            if (s && e.throws) t = s(t);
                                            else try {
                                                t = s(t)
                                            } catch (e) {
                                                return {
                                                    state: "parsererror",
                                                    error: s ? e : "No conversion from " + l + " to " + r
                                                }
                                            }
                                    }
                                    return {
                                        state: "success",
                                        data: t
                                    }
                                }(f, w, C, l), l ? (f.ifModified && ((T = C.getResponseHeader("Last-Modified")) && (v.lastModified[o] = T), (T = C.getResponseHeader("etag")) && (v.etag[o] = T)), 204 === e || "HEAD" === f.type ? S = "nocontent" : 304 === e ? S = "notmodified" : (S = w.state, d = w.data, l = !(p = w.error))) : (p = S, !e && S || (S = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (t || S) + "", l ? m.resolveWith(h, [d, S, C]) : m.rejectWith(h, [C, S, p]), C.statusCode(b), b = void 0, u && g.trigger(l ? "ajaxSuccess" : "ajaxError", [C, f, l ? d : p]), y.fireWith(h, [C, S]), u && (g.trigger("ajaxComplete", [C, f]), --v.active || v.event.trigger("ajaxStop")))
                            }
                            return C
                        },
                        getJSON: function(e, t, n) {
                            return v.get(e, t, n, "json")
                        },
                        getScript: function(e, t) {
                            return v.get(e, void 0, t, "script")
                        }
                    }), v.each(["get", "post"], (function(e, t) {
                        v[t] = function(e, n, i, o) {
                            return v.isFunction(n) && (o = o || i, i = n, n = void 0), v.ajax(v.extend({
                                url: e,
                                type: t,
                                dataType: o,
                                data: n,
                                success: i
                            }, v.isPlainObject(e) && e))
                        }
                    })), v._evalUrl = function(e) {
                        return v.ajax({
                            url: e,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            throws: !0
                        })
                    }, v.fn.extend({
                        wrapAll: function(e) {
                            var t;
                            return v.isFunction(e) ? this.each((function(t) {
                                v(this).wrapAll(e.call(this, t))
                            })) : (this[0] && (t = v(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                                return e
                            })).append(this)), this)
                        },
                        wrapInner: function(e) {
                            return v.isFunction(e) ? this.each((function(t) {
                                v(this).wrapInner(e.call(this, t))
                            })) : this.each((function() {
                                var t = v(this),
                                    n = t.contents();
                                n.length ? n.wrapAll(e) : t.append(e)
                            }))
                        },
                        wrap: function(e) {
                            var t = v.isFunction(e);
                            return this.each((function(n) {
                                v(this).wrapAll(t ? e.call(this, n) : e)
                            }))
                        },
                        unwrap: function() {
                            return this.parent().each((function() {
                                v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
                            })).end()
                        }
                    }), v.expr.filters.hidden = function(e) {
                        return !v.expr.filters.visible(e)
                    }, v.expr.filters.visible = function(e) {
                        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
                    };
                    var _t = /%20/g,
                        kt = /\[\]$/,
                        Et = /\r?\n/g,
                        At = /^(?:submit|button|image|reset|file)$/i,
                        Dt = /^(?:input|select|textarea|keygen)/i;

                    function Nt(e, t, n, i) {
                        var o;
                        if (v.isArray(t)) v.each(t, (function(t, o) {
                            n || kt.test(e) ? i(e, o) : Nt(e + "[" + ("object" == s(o) && null != o ? t : "") + "]", o, n, i)
                        }));
                        else if (n || "object" !== v.type(t)) i(e, t);
                        else
                            for (o in t) Nt(e + "[" + o + "]", t[o], n, i)
                    }
                    v.param = function(e, t) {
                        var n, i = [],
                            o = function(e, t) {
                                t = v.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                            };
                        if (void 0 === t && (t = v.ajaxSettings && v.ajaxSettings.traditional), v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, (function() {
                            o(this.name, this.value)
                        }));
                        else
                            for (n in e) Nt(n, e[n], t, o);
                        return i.join("&").replace(_t, "+")
                    }, v.fn.extend({
                        serialize: function() {
                            return v.param(this.serializeArray())
                        },
                        serializeArray: function() {
                            return this.map((function() {
                                var e = v.prop(this, "elements");
                                return e ? v.makeArray(e) : this
                            })).filter((function() {
                                var e = this.type;
                                return this.name && !v(this).is(":disabled") && Dt.test(this.nodeName) && !At.test(e) && (this.checked || !G.test(e))
                            })).map((function(e, t) {
                                var n = v(this).val();
                                return null == n ? null : v.isArray(n) ? v.map(n, (function(e) {
                                    return {
                                        name: t.name,
                                        value: e.replace(Et, "\r\n")
                                    }
                                })) : {
                                    name: t.name,
                                    value: n.replace(Et, "\r\n")
                                }
                            })).get()
                        }
                    }), v.ajaxSettings.xhr = function() {
                        try {
                            return new n.XMLHttpRequest
                        } catch (e) {}
                    };
                    var It = {
                            0: 200,
                            1223: 204
                        },
                        Ot = v.ajaxSettings.xhr();
                    g.cors = !!Ot && "withCredentials" in Ot, g.ajax = Ot = !!Ot, v.ajaxTransport((function(e) {
                        var t, i;
                        return g.cors || Ot && !e.crossDomain ? {
                            send: function(o, r) {
                                var s, a = e.xhr();
                                if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                    for (s in e.xhrFields) a[s] = e.xhrFields[s];
                                for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) a.setRequestHeader(s, o[s]);
                                t = function(e) {
                                    return function() {
                                        t && (t = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(It[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                            binary: a.response
                                        } : {
                                            text: a.responseText
                                        }, a.getAllResponseHeaders()))
                                    }
                                }, a.onload = t(), i = a.onerror = t("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function() {
                                    4 === a.readyState && n.setTimeout((function() {
                                        t && i()
                                    }))
                                }, t = t("abort");
                                try {
                                    a.send(e.hasContent && e.data || null)
                                } catch (e) {
                                    if (t) throw e
                                }
                            },
                            abort: function() {
                                t && t()
                            }
                        } : void 0
                    })), v.ajaxSetup({
                        accepts: {
                            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                        },
                        contents: {
                            script: /\b(?:java|ecma)script\b/
                        },
                        converters: {
                            "text script": function(e) {
                                return v.globalEval(e), e
                            }
                        }
                    }), v.ajaxPrefilter("script", (function(e) {
                        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                    })), v.ajaxTransport("script", (function(e) {
                        var t, n;
                        if (e.crossDomain) return {
                            send: function(i, o) {
                                t = v("<script>").prop({
                                    charset: e.scriptCharset,
                                    src: e.url
                                }).on("load error", n = function(e) {
                                    t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                                }), a.head.appendChild(t[0])
                            },
                            abort: function() {
                                n && n()
                            }
                        }
                    }));
                    var Lt = [],
                        $t = /(=)\?(?=&|$)|\?\?/;
                    v.ajaxSetup({
                        jsonp: "callback",
                        jsonpCallback: function() {
                            var e = Lt.pop() || v.expando + "_" + ut++;
                            return this[e] = !0, e
                        }
                    }), v.ajaxPrefilter("json jsonp", (function(e, t, i) {
                        var o, r, s, a = !1 !== e.jsonp && ($t.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && $t.test(e.data) && "data");
                        return a || "jsonp" === e.dataTypes[0] ? (o = e.jsonpCallback = v.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace($t, "$1" + o) : !1 !== e.jsonp && (e.url += (pt.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
                            return s || v.error(o + " was not called"), s[0]
                        }, e.dataTypes[0] = "json", r = n[o], n[o] = function() {
                            s = arguments
                        }, i.always((function() {
                            void 0 === r ? v(n).removeProp(o) : n[o] = r, e[o] && (e.jsonpCallback = t.jsonpCallback, Lt.push(o)), s && v.isFunction(r) && r(s[0]), s = r = void 0
                        })), "script") : void 0
                    })), v.parseHTML = function(e, t, n) {
                        if (!e || "string" != typeof e) return null;
                        "boolean" == typeof t && (n = t, t = !1), t = t || a;
                        var i = E.exec(e),
                            o = !n && [];
                        return i ? [t.createElement(i[1])] : (i = re([e], t, o), o && o.length && v(o).remove(), v.merge([], i.childNodes))
                    };
                    var Ht = v.fn.load;

                    function Pt(e) {
                        return v.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
                    }
                    v.fn.load = function(e, t, n) {
                        if ("string" != typeof e && Ht) return Ht.apply(this, arguments);
                        var i, o, r, a = this,
                            l = e.indexOf(" ");
                        return l > -1 && (i = v.trim(e.slice(l)), e = e.slice(0, l)), v.isFunction(t) ? (n = t, t = void 0) : t && "object" == s(t) && (o = "POST"), a.length > 0 && v.ajax({
                            url: e,
                            type: o || "GET",
                            dataType: "html",
                            data: t
                        }).done((function(e) {
                            r = arguments, a.html(i ? v("<div>").append(v.parseHTML(e)).find(i) : e)
                        })).always(n && function(e, t) {
                            a.each((function() {
                                n.apply(this, r || [e.responseText, t, e])
                            }))
                        }), this
                    }, v.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
                        v.fn[t] = function(e) {
                            return this.on(t, e)
                        }
                    })), v.expr.filters.animated = function(e) {
                        return v.grep(v.timers, (function(t) {
                            return e === t.elem
                        })).length
                    }, v.offset = {
                        setOffset: function(e, t, n) {
                            var i, o, r, s, a, l, c = v.css(e, "position"),
                                d = v(e),
                                u = {};
                            "static" === c && (e.style.position = "relative"), a = d.offset(), r = v.css(e, "top"), l = v.css(e, "left"), ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1 ? (s = (i = d.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), v.isFunction(t) && (t = t.call(e, n, v.extend({}, a))), null != t.top && (u.top = t.top - a.top + s), null != t.left && (u.left = t.left - a.left + o), "using" in t ? t.using.call(e, u) : d.css(u)
                        }
                    }, v.fn.extend({
                        offset: function(e) {
                            if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                                v.offset.setOffset(this, e, t)
                            }));
                            var t, n, i = this[0],
                                o = {
                                    top: 0,
                                    left: 0
                                },
                                r = i && i.ownerDocument;
                            return r ? (t = r.documentElement, v.contains(t, i) ? (o = i.getBoundingClientRect(), n = Pt(r), {
                                top: o.top + n.pageYOffset - t.clientTop,
                                left: o.left + n.pageXOffset - t.clientLeft
                            }) : o) : void 0
                        },
                        position: function() {
                            if (this[0]) {
                                var e, t, n = this[0],
                                    i = {
                                        top: 0,
                                        left: 0
                                    };
                                return "fixed" === v.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), v.nodeName(e[0], "html") || (i = e.offset()), i.top += v.css(e[0], "borderTopWidth", !0), i.left += v.css(e[0], "borderLeftWidth", !0)), {
                                    top: t.top - i.top - v.css(n, "marginTop", !0),
                                    left: t.left - i.left - v.css(n, "marginLeft", !0)
                                }
                            }
                        },
                        offsetParent: function() {
                            return this.map((function() {
                                for (var e = this.offsetParent; e && "static" === v.css(e, "position");) e = e.offsetParent;
                                return e || Le
                            }))
                        }
                    }), v.each({
                        scrollLeft: "pageXOffset",
                        scrollTop: "pageYOffset"
                    }, (function(e, t) {
                        var n = "pageYOffset" === t;
                        v.fn[e] = function(i) {
                            return M(this, (function(e, i, o) {
                                var r = Pt(e);
                                return void 0 === o ? r ? r[t] : e[i] : void(r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o)
                            }), e, i, arguments.length)
                        }
                    })), v.each(["top", "left"], (function(e, t) {
                        v.cssHooks[t] = He(g.pixelPosition, (function(e, n) {
                            return n ? (n = $e(e, t), Ne.test(n) ? v(e).position()[t] + "px" : n) : void 0
                        }))
                    })), v.each({
                        Height: "height",
                        Width: "width"
                    }, (function(e, t) {
                        v.each({
                            padding: "inner" + e,
                            content: t,
                            "": "outer" + e
                        }, (function(n, i) {
                            v.fn[i] = function(i, o) {
                                var r = arguments.length && (n || "boolean" != typeof i),
                                    s = n || (!0 === i || !0 === o ? "margin" : "border");
                                return M(this, (function(t, n, i) {
                                    var o;
                                    return v.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? v.css(t, n, s) : v.style(t, n, i, s)
                                }), t, r ? i : void 0, r, null)
                            }
                        }))
                    })), v.fn.extend({
                        bind: function(e, t, n) {
                            return this.on(e, null, t, n)
                        },
                        unbind: function(e, t) {
                            return this.off(e, null, t)
                        },
                        delegate: function(e, t, n, i) {
                            return this.on(t, e, n, i)
                        },
                        undelegate: function(e, t, n) {
                            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                        },
                        size: function() {
                            return this.length
                        }
                    }), v.fn.andSelf = v.fn.addBack, void 0 === (i = function() {
                        return v
                    }.apply(t, [])) || (e.exports = i);
                    var jt = n.jQuery,
                        Ft = n.$;
                    return v.noConflict = function(e) {
                        return n.$ === v && (n.$ = Ft), e && n.jQuery === v && (n.jQuery = jt), v
                    }, o || (n.jQuery = n.$ = v), v
                }, "object" == s(e) && "object" == s(e.exports) ? e.exports = o.document ? r(o, !0) : function(e) {
                    if (!e.document) throw new Error("jQuery requires a window with a document");
                    return r(e)
                } : r(o)
            },
            583: (e, t, n) => {
                var i = n(470),
                    o = n(470),
                    r = window.location.origin + "/wp-admin/admin-ajax.php";
                i(document).on("ready", (function() {
                    i(window).width() < 992 && (i(".dd-arrow, .nav-item.dropdown > .nav-link").click((function(e) {
                        if (e.preventDefault(), i(this).is(".nav-item.dropdown > .nav-link")) "#" === i(this).attr("href") ? i(this).siblings(".dd-arrow").trigger("click") : window.location.href = i(this).attr("href");
                        else {
                            var t = i(this).siblings(".dropdown-menu");
                            i(this).toggleClass("active"), t.toggleClass("active")
                        }
                    })), i(".nav-heading-no-link").click((function(e) {
                        return i(this).next(".nav-section").toggleClass("active"), i(this).toggleClass("active"), !1
                    }))), i(".collapse.show").each((function() {
                        i(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus")
                    })), i(".collapse").on("show.bs.collapse", (function() {
                        i(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus")
                    })).on("hide.bs.collapse", (function() {
                        i(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus")
                    })), window.matchMedia("(max-width: 767px)").matches && i(".whywebline-slider").slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: !0,
                        autoplay: !1,
                        cssEase: "ease-in-out",
                        fade: !0,
                        speed: 1e3,
                        adaptiveHeight: !0
                    }), i(".industry-slider").slick({
                        infinite: !0,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: !0,
                        autoplay: !1,
                        speed: 1e3,
                        responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                infinite: !0,
                                dots: !0
                            }
                        }, {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }]
                    });
                    (t = (e = window.location.href).split("/")).filter((function(e) {
                        return null != e && "" != e
                    })).length, t[3], e.split("/").length, e.indexOf("http://");
                    o(".subscribeBtn").click((function() {
                        var e = o(this).closest("div.subscribeform_js");
                        email = o(".txtEmail", e).val(), page_history = i("#pageHistory", e).val(), landing_pageReferrer = i("#landingPageReferrer", e).val();
                        var t = grecaptcha.getResponse();
                        return g_recaptcha_response = t, website = o(".website", e).val(), 0 == o.trim(email).length ? (o(".errorMsg", e).html("Please Enter Valid Email ID."), !1) : function(e) {
                            return !!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e)
                        }(email) ? (o.ajax({
                            type: "POST",
                            url: r,
                            data: {
                                action: "subscribe_newsletter",
                                email,
                                website,
                                g_recaptcha_response,
                                pageHistory: page_history,
                                landingPageReferrer: landing_pageReferrer
                            },
                            beforeSend: function() {
                                o(".nbw_loader", e).show()
                            },
                            success: function(t, n, i) {
                                o(".errorMsg", e).html(""), o(".successMsg", e).html("");
                                var r = o.parseJSON(t);
                                1 == r.flag ? o(".formin", e).fadeOut(600, (function() {
                                    o(".successMsg", e).html(r.msg).show()
                                })) : o(".errorMsg", e).html(r.msg), o(".nbw_loader", e).hide()
                            },
                            error: function() {
                                o(".errorMsg", e).html(""), o(".successMsg", e).html(""), o(".errorMsg".container).html("Something went wrong. Please try again."), o(".nbw_loader", e).hide()
                            }
                        }), !1) : (o(".errorMsg", e).html("Invalid Email ID."), !1)
                    }));
                    var e, t;
                    (t = (e = window.location.href).split("/"))[3], e.split("/").length, e.indexOf("http://");
                    i("#casestudy_downloadform").validate({
                        rules: {
                            txtname: {
                                required: !0
                            },
                            txtemail: {
                                required: !0,
                                email: !0
                            }
                        },
                        required: function() {
                            return "" == grecaptcha.getResponse()
                        },
                        submitHandler: function(e) {
                            var t = i("#download-casestudy");
                            i(".errorMsg_cs", t).html(""), i(".successMsg_cs", t).html("");
                            var n = grecaptcha.getResponse();
                            return user_name = i("#txtname", t).val(), user_email = i("#txtemail", t).val(), page_history = i("#pageHistory", t).val(), landing_pageReferrer = i("#landingPageReferrer", t).val(), checkSubscribe = i("#checkSubscribe", t).prop("checked"), post_id = i(".postid", t).val(), website = i(".website").val(), g_recaptcha_response = n, i.ajax({
                                type: "POST",
                                url: "/wp-admin/admin-ajax.php",
                                data: {
                                    action: "download_casestudy",
                                    name: user_name,
                                    email: user_email,
                                    subscribe: checkSubscribe,
                                    website,
                                    g_recaptcha_response,
                                    postID: post_id,
                                    pageHistory: page_history,
                                    landingPageReferrer: landing_pageReferrer
                                },
                                success: function(e, n, o) {
                                    var r = i.parseJSON(e);
                                    1 == r.status ? (i(".successMsg_cs", t).html(r.message), i("#casestudy_downloadform", t).hide()) : i(".errorMsg_cs", t).html(r.message)
                                },
                                error: function() {}
                            }), !1
                        }
                    }), i("form#contact").length > 0 && i("form#contact")[0].reset(), i.validator.addMethod("nocyrillic", (function(e, t) {
                        return !new RegExp(/[\u0400-\u04FF]/).test(e)
                    }), "Please enter latin characters only."), i.validator.addMethod("validate_email", (function(e, t) {
                        return this.optional(t) || /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e)
                    }), "Please enter a valid email address."), i.validator.addMethod("customPattern", (function(e, t) {
                        return this.optional(t) || /^[0-9()+\-\s]*$/.test(e)
                    }), "Invalid phone number format."), i("#contact").validate({
                        rules: {
                            name: {
                                required: !0,
                                maxlength: 100,
                                normalizer: function(e) {
                                    return i.trim(e)
                                },
                                nocyrillic: !0
                            },
                            w_email: {
                                required: !0,
                                validate_email: !0,
                                normalizer: function(e) {
                                    return i.trim(e)
                                }
                            },
                            phone: {
                                minlength: 10,
                                maxlength: 20,
                                normalizer: function(e) {
                                    return i.trim(e)
                                },
                                customPattern: !0
                            },
                            projdescription: {
                                required: !0,
                                maxlength: 1e3,
                                normalizer: function(e) {
                                    return i.trim(e)
                                },
                                nocyrillic: !0
                            }
                        },
                        errorPlacement: function(e, t) {
                            return !0
                        },
                        highlight: function(e) {
                            i(e).parent("div").addClass("error")
                        },
                        unhighlight: function(e) {
                            i(e).parent("div").removeClass("error")
                        },
                        onfocusout: function(e) {
                            return tmpval = i(e).val().trim(), "" == tmpval ? i(e).siblings(".formlabel").removeClass("labelup") : i(e).siblings(".formlabel").addClass("labelup"), !0
                        }
                    });
                    var n = i(".wli-sticky-sidebar .widget_custom_html");
                    n.length > 0 && n.each((function(e) {
                        if (0 == e) {
                            var t = i(n[e]),
                                o = n[e + 1],
                                r = i("#header").outerHeight(!0);
                            t.scrollToFixed({
                                marginTop: r + 30,
                                limit: function() {
                                    var e = 0;
                                    return e = o ? i(o).offset().top - i(this).outerHeight(!0) : i(".wli-sticky-sidebar-stop").offset().top - i(this).outerHeight(!0) - 30, e
                                },
                                zIndex: 999
                            })
                        }
                    })), i(window).scroll((function() {
                        i(this).scrollTop() ? i("#toTop").fadeIn() : i("#toTop").fadeOut()
                    })), i("#toTop").click((function(e) {
                        e.preventDefault(), i("html, body").animate({
                            scrollTop: 0
                        }, 800)
                    })), i(".accordian-title").click((function() {
                        i(this).children("i").toggleClass("fa-plus fa-minus"), i(this).parent().parent().siblings().find(".accordian-title").children("i").removeClass("fa-minus").addClass("fa-plus")
                    })), i(".applyNow").length > 0 && i(".applyNow").click((function() {
                        i("html,body").animate({
                            scrollTop: i("#jobsSection").offset().top - 70
                        }, "slow")
                    })), i(".client-logo").length > 0 && i(".client-logo").slick({
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        variableWidth: !0,
                        autoplay: !0,
                        autoplaySpeed: 0,
                        arrows: !1,
                        speed: 2e3,
                        dots: !1,
                        draggable: !1,
                        touchMove: !1,
                        swipeToSlide: !1,
                        swipe: !1,
                        pauseOnHover: !1,
                        cssEase: "linear",
                        infinite: !0,
                        rtl: !0,
                        responsive: [{
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 6,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 520,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        }]
                    }), i(".team-photos-left").length > 0 && i(".team-photos-left").slick({
                        slidesToShow: 20,
                        slidesToScroll: 1,
                        autoplay: !0,
                        autoplaySpeed: 0,
                        arrows: !1,
                        speed: 3e3,
                        dots: !1,
                        draggable: !1,
                        touchMove: !1,
                        swipeToSlide: !1,
                        swipe: !1,
                        pauseOnHover: !1,
                        cssEase: "linear",
                        infinite: !0,
                        rtl: !0,
                        responsive: [{
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 6,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 520,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        }]
                    }), i(".team-photos-right").length > 0 && i(".team-photos-right").slick({
                        slidesToShow: 20,
                        slidesToScroll: 1,
                        autoplay: !0,
                        autoplaySpeed: 0,
                        arrows: !1,
                        speed: 3e3,
                        dots: !1,
                        draggable: !1,
                        touchMove: !1,
                        swipeToSlide: !1,
                        swipe: !1,
                        pauseOnHover: !1,
                        cssEase: "linear",
                        infinite: !0,
                        rtl: !1,
                        responsive: [{
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 6,
                                slidesToScroll: 1
                            }
                        }, {
                            breakpoint: 520,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        }]
                    })
                })), document.getElementById("copyrightyear").appendChild(document.createTextNode((new Date).getFullYear())), i((function() {
                    i('[data-toggle="tooltip"]').tooltip()
                })), document.addEventListener("lazybeforeunveil", (function(e) {
                    var t = o(e.target).data("lazyaction");
                    "case-studies" == t ? (window.ensureSwiper = function() {
                        return window.Swiper ? Promise.resolve(window.Swiper) : new Promise((function(e, t) {
                            var n = document.querySelector("script[data-swiper-loader]");
                            n ? (n.addEventListener("load", (function() {
                                return e(window.Swiper)
                            }), {
                                once: !0
                            }), n.addEventListener("error", (function() {
                                return t(new Error("Failed to load Swiper"))
                            }), {
                                once: !0
                            })) : ((n = document.createElement("script")).src = "/assets/js/swiper-bundle.min.js", n.defer = !0, n.setAttribute("data-swiper-loader", "1"), n.onload = function() {
                                e(window.Swiper)
                            }, n.onerror = function() {
                                t(new Error("Failed to load Swiper"))
                            }, document.head.appendChild(n))
                        }))
                    }, i(".success-stories-section").each((function() {
                        var e = o(this),
                            t = e.data("limit"),
                            n = e.data("id");
                        o.ajax({
                            url: r,
                            type: "post",
                            data: {
                                action: "get_portfolio_casestudy_slider_custom_new",
                                limit: t,
                                tech_ids: n
                            },
                            beforeSend: function() {
                                e.html('<div class="loading-image mb-4 text-center"><img src="/assets/img/ajax-loader.gif" width="32" height="32" alt="Loading Portfolios"></div>')
                            },
                            success: function(t) {
                                e.html(t), window.initCaseStudySlider && window.initCaseStudySlider(e[0])
                            },
                            complete: function() {
                                e.find(".loading-image").hide()
                            }
                        })
                    }))) : "recent-blog" == t && i(".recent-post-wrapper").each((function() {
                        var e = i(this),
                            t = e.data("limit"),
                            n = e.data("id");
                        o.ajax({
                            url: r,
                            type: "post",
                            data: {
                                action: "get_blogs_slider",
                                limit: t,
                                tech_ids: n
                            },
                            beforeSend: function() {
                                e.html('<div class="loading-image mb-4 text-center"><img data-src="/assets/img/ajax-loader.gif" width="32" height="32" alt="Loading Portfolios" class="lazyload"></div>'), e.find(".loading-image").show()
                            },
                            complete: function() {
                                e.find(".loading-image").hide()
                            },
                            success: function(t) {
                                e.html(t)
                            }
                        })
                    }))
                })), window.initCaseStudySlider = function(e) {
                    var t, n, i;
                    if (e) {
                        var o = e.querySelector(".case-study-slider-wrapper");
                        if (o) {
                            var r = JSON.parse(o.getAttribute("data-bullets") || "[]");
                            (o.getAttribute("data-lang") || "en").toLowerCase(), (o.getAttribute("dir") || document.documentElement.dir || "").toLowerCase();
                            (null !== (t = null === (n = (i = window).ensureSwiperCSS) || void 0 === n ? void 0 : n.call(i)) && void 0 !== t ? t : Promise.resolve()).then((function() {
                                return window.ensureSwiper()
                            })).then((function() {
                                var e = o.querySelector(".case-studySwiper");
                                if (e) new window.Swiper(e, {
                                    loop: !0,
                                    direction: "horizontal",
                                    pagination: {
                                        el: o.querySelector(".swiper-pagination"),
                                        clickable: !0,
                                        renderBullet: function(e, t) {
                                            var n = e % r.length,
                                                i = (n + 1).toString().padStart(2, "0"),
                                                o = r[n] || "";
                                            return '<div class="'.concat(t, '"><span class="num">').concat(i, '</span><span class="title">').concat(o, "</span></div>")
                                        }
                                    },
                                    navigation: {
                                        nextEl: o.querySelector(".swiper-button-next"),
                                        prevEl: o.querySelector(".swiper-button-prev")
                                    },
                                    on: {
                                        init: function() {
                                            t(this), n(e)
                                        },
                                        slideChange: function() {
                                            t(this)
                                        },
                                        resize: function() {
                                            n(e)
                                        }
                                    }
                                });

                                function t(e) {
                                    var t = r.length,
                                        n = e.realIndex,
                                        i = (n - 1 + t) % t,
                                        s = (n + 1) % t,
                                        a = o.querySelector(".swiper-button-prev .arrow-title"),
                                        l = o.querySelector(".swiper-button-next .arrow-title");
                                    a && (a.textContent = r[i] || ""), l && (l.textContent = r[s] || "")
                                }

                                function n(e) {
                                    var t = e.querySelectorAll(".swiper-slide");
                                    if (t.length && (t.forEach((function(e) {
                                            return e.style.height = ""
                                        })), window.innerWidth <= 992)) {
                                        var n = 0;
                                        t.forEach((function(e) {
                                            n = Math.max(n, e.offsetHeight)
                                        })), t.forEach((function(e) {
                                            e.style.height = n + "px"
                                        }))
                                    }
                                }
                            })).catch(console.error)
                        }
                    }
                }, document.addEventListener("click", (function(e) {
                    var t = e.target.closest(".mobile-more-toggle");
                    if (t) {
                        var n = t.closest(".tech-tags");
                        if (n) {
                            n.querySelectorAll(".hidden-mobile-term").forEach((function(e) {
                                e.classList.remove("d-none"), e.classList.remove("hidden-mobile-term")
                            }));
                            var i = n.closest(".case-study-slider-wrapper");
                            i && i.classList.add("csw-autoheight"), t.remove()
                        }
                    }
                })), document.addEventListener("lazybeforeunveil", (function(e) {
                    var t = o(e.target).data("lazyaction");
                    "titbits" == t && i(".titbits-items").each((function() {
                        var e = i(this),
                            t = e.data("limit"),
                            n = e.data("tech");
                        o.ajax({
                            url: r,
                            type: "post",
                            data: {
                                action: "get_titbits_slider",
                                limit: t,
                                tech_ids: n
                            },
                            beforeSend: function() {
                                e.html('<span class="text-center">Loading...</span>')
                            },
                            complete: function() {
                                i(".titbits-items").slick({
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: !0,
                                    autoplaySpeed: 0,
                                    speed: 35e3,
                                    cssEase: "linear",
                                    infinite: !0,
                                    variableWidth: !0,
                                    arrows: !1,
                                    swipe: !0,
                                    pauseOnHover: !1
                                })
                            },
                            success: function(t) {
                                e.html(t)
                            }
                        })
                    })), "industries" == t && i(".industry-section").each((function() {
                        var e = i(this),
                            t = e.data("limit"),
                            n = e.data("tech"),
                            s = (document.documentElement.lang || "en").split("-")[0].toLowerCase();
                        o.ajax({
                            url: r,
                            type: "post",
                            data: {
                                action: "get_industries",
                                limit: t,
                                tech_ids: n,
                                lang: s
                            },
                            beforeSend: function() {
                                e.html('<span class="text-center">Loading...</span>')
                            },
                            success: function(t) {
                                e.html(t)
                            }
                        })
                    }))
                }));
                var s = i("#header").height() + i("#stickytypeheader").height() + 40,
                    a = i("#header").height() + i("#stickytypeheader").height();
                i(document).ready((function() {
                    if (i(".scrollspy-nav").length) {
                        i(document).on("scroll", (function(e) {
                            var t = i(document).scrollTop();
                            i(".scrollspy-nav a").each((function() {
                                var e = i(this),
                                    n = i(e.attr("href"));
                                n.position().top <= t + s && n.position().top + n.height() > t + s ? (i(".scrollspy-nav a").removeClass("active"), e.addClass("active")) : e.removeClass("active")
                            }))
                        })), i('.scrollspy-nav a[href^="#"]').on("click", (function(e) {
                            e.preventDefault(), i(".scrollspy-nav a").each((function() {
                                i(this).removeClass("active")
                            })), i(this).addClass("active");
                            var t = this.hash;
                            $target = i(t), i("html, body").stop().animate({
                                scrollTop: $target.offset().top - a
                            }, 500, "swing", (function() {}))
                        }));
                        var e = i(".scrollspy-nav "),
                            t = e.position();
                        i(window).scroll((function() {
                            i(window).scrollTop() >= t.top ? e.addClass("fixed-header") : e.removeClass("fixed-header")
                        }))
                    }
                    if (i(".wli-social-btns a").length > 0) {
                        var n = window.location.href;
                        i(".wli-social-btns a").each((function() {
                            var e = i(this).attr("href");
                            e = e.replace("[URL]", n), i(this).attr("href", e)
                        }))
                    }
                    i.fn.headingList = function(e) {
                        "use strict";
                        e = i.extend({
                            target: "body",
                            scrollSpeed: 500,
                            prefix: "&nbsp;&nbsp;"
                        }, e);
                        var t = i(e.target + " h2," + e.target + " h3," + e.target + " h4," + e.target + " h5," + e.target + " h6"),
                            n = "wli-heading-",
                            o = "<ul>",
                            r = 1;
                        return t.each((function() {
                            var t = parseInt(i(this).prop("tagName").slice(1)),
                                s = n + r;
                            i(this).attr("id", s), o += '<li class="li-depth-' + (t - 1) + '"><a href="#' + s + '">', i.each(new Array(t - 1), (function(t) {
                                o += e.prefix
                            })), o += i(this).html(), o += "</a></li>", r++
                        })), o += "</ul>", this.html(o), this.find('a[href^="#' + n + '"]').click((function() {
                            var t = i(this).attr("href"),
                                n = i("#" === t || "" === t ? "html" : t).offset().top - 100;
                            return i("body,html").animate({
                                scrollTop: n
                            }, e.scrollSpeed, "swing"), !1
                        })), this
                    }, i("#wli-heading-list").length > 0 && i("#wli-heading-list").headingList({
                        target: ".post-details",
                        scrollSpeed: 500,
                        prefix: ""
                    }), i(window).scroll((function() {
                        i("#wli-heading-list a").removeClass("active");
                        var e = i(window).scrollTop();
                        i(".post-details").find("h2, h3, h4, h5, h6").each((function(t) {
                            i(this).position().top <= e && (i("#wli-heading-list a.active").removeClass("active"), i("#wli-heading-list a").eq(t).addClass("active"))
                        }))
                    })).scroll()
                }));

                function l(e, t) {
                    document.cookie = e + "=" + t + "; path=/; expires=0"
                }

                function c(e) {
                    for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
                        for (var o = n[i];
                            " " === o.charAt(0);) o = o.substring(1, o.length);
                        if (0 === o.indexOf(t)) return o.substring(t.length, o.length)
                    }
                    return null
                }

                function d() {
                    if (!document.querySelector(".glass")) {
                        var e = document.createElement("div");
                        e.className = "glass", Object.assign(e.style, {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backdropFilter: "blur(4px)",
                            background: "rgba(255, 255, 255, 0.1)",
                            zIndex: 999,
                            pointerEvents: "none"
                        }), document.body.appendChild(e)
                    }
                }

                function u() {
                    var e = document.querySelector(".glass");
                    e && e.remove()
                }

                function p() {
                    if (window.innerWidth < 767) {
                        var e = document.querySelectorAll(".home-slider-section .carousel-item"),
                            t = 0;
                        e.forEach((function(e) {
                            var n = e.getBoundingClientRect().height;
                            n > t && (t = n)
                        })), e.forEach((function(e) {
                            e.style.height = t + "px"
                        }))
                    } else document.querySelectorAll(".home-slider-section .carousel-item").forEach((function(e) {
                        return e.style.height = ""
                    }))
                }
                i(".carousel").on("touchstart", (function(e) {
                        var t = e.originalEvent.touches[0].pageX;
                        i(this).one("touchmove", (function(e) {
                            var n = e.originalEvent.touches[0].pageX;
                            Math.floor(t - n) > 5 ? i(this).carousel("next") : Math.floor(t - n) < -5 && i(this).carousel("prev")
                        })), i(this).on("touchend", (function() {
                            i(this).off("touchmove")
                        }))
                    })),
                    function() {
                        var e = JSON.parse(c("pageHistory") || "[]"),
                            t = window.location.href;
                        e.includes(t) || (e.push(t), l("pageHistory", JSON.stringify(e)));
                        var n = c("landingPageReferrer");
                        n || (n = document.referrer || "direct", l("landingPageReferrer", JSON.stringify(n)))
                    }(), document.getElementById("pageHistory") && (document.getElementById("pageHistory").value = c("pageHistory")), document.getElementById("landingPageReferrer") && (document.getElementById("landingPageReferrer").value = c("landingPageReferrer")), i(window).on("load", (function() {
                        var e = function(e, t) {
                            var n, o;
                            n = e, o = "true", document.cookie = "".concat(n, "=").concat(o, "; path=/"), i(t).modal("hide")
                        };
                        [{
                            key: "modalDismissed",
                            modalId: "#exit-intent-modal-general",
                            buttonClass: ".btn-general"
                        }, {
                            key: "modalDismissedOne",
                            modalId: "#exit-intent-modal-one",
                            buttonClass: ".btn-one"
                        }, {
                            key: "modalDismissedTwo",
                            modalId: "#exit-intent-modal-two",
                            buttonClass: ".btn-two"
                        }, {
                            key: "modalDismissedThree",
                            modalId: "#exit-intent-modal-three",
                            buttonClass: ".btn-three"
                        }].forEach((function(t) {
                            var n, o, r = t.key,
                                s = t.modalId,
                                a = t.buttonClass;
                            n = r, 2 === (o = "; ".concat(document.cookie).split("; ".concat(n, "="))).length && o.pop().split(";").shift() || setTimeout((function() {
                                ! function(e) {
                                    i(e).modal("show")
                                }(s)
                            }), 15e3), i(s).on("click", ".close, ".concat(a), (function() {
                                e(r, s)
                            }))
                        }))
                    })), i(window).on("load", (function() {
                        var e = document.getElementById("okay-btn"),
                            t = document.getElementById("cookie-banner");

                        function n(e) {
                            return document.cookie.includes("".concat(e, "=true"))
                        }
                        e && e.addEventListener("click", (function() {
                            t.classList.replace("d-flex", "d-none");
                            var e = new Date;
                            e.setFullYear(e.getFullYear() + 1), document.cookie = "cookiesAccepted=true; expires=" + e.toUTCString() + "; path=/"
                        })), t && (n("cookiesAccepted") ? t.classList.replace("d-flex", "d-none") : t.classList.replace("d-none", "d-flex"));
                        var i = document.getElementById("cookie-icon"),
                            o = document.getElementById("cookie-banner-icon"),
                            r = document.getElementById("okay-btn-icon");
                        i && i.addEventListener("click", (function() {
                            i.style.display = "none", o.classList.replace("d-none", "d-flex")
                        })), r && r.addEventListener("click", (function() {
                            o.classList.replace("d-flex", "d-none");
                            var e = new Date;
                            e.setFullYear(e.getFullYear() + 1), document.cookie = "cookiesAccepted=true; expires=" + e.toUTCString() + "; path=/"
                        })), i && (n("cookiesAccepted") ? i.style.display = "none" : i.style.display = "flex")
                    })), document.getElementById("continue_discovery_process") && document.getElementById("continue_discovery_process").addEventListener("click", (function(e) {
                        var t, n;
                        e.preventDefault();
                        var i = null === (t = document.querySelector('input[name="techBackground"]:checked')) || void 0 === t || null === (t = t.nextElementSibling) || void 0 === t ? void 0 : t.innerText,
                            o = null === (n = document.querySelector('input[name="estimationType"]:checked')) || void 0 === n || null === (n = n.nextElementSibling) || void 0 === n ? void 0 : n.innerText,
                            r = document.getElementById("business").value,
                            s = document.getElementById("pageHistory").value,
                            a = document.getElementById("landingPageReferrer").value;
                        if (i && o && r.trim()) {
                            var l = {
                                    techBackground: i,
                                    estimationType: o,
                                    project_desc: r,
                                    page_history: s,
                                    landing_page_referrer: a
                                },
                                c = JSON.stringify(l),
                                d = btoa(unescape(encodeURIComponent(c)));
                            window.location.href = "https://wpe.weblineindia.com/?data=" + d
                        } else document.querySelectorAll(".required").forEach((function(e) {
                            return e.classList.remove("d-none")
                        }))
                    })), i(window).on("load", (function() {
                        var e = (document.documentElement.lang || "en").split("-")[0].toLowerCase();
                        e = {
                            nb: "no"
                        }[e] || e;
                        var t = document.querySelectorAll('link[rel="alternate"][hreflang]'),
                            n = new Map;
                        t.forEach((function(e) {
                            var t = e.getAttribute("hreflang"),
                                i = e.getAttribute("href");
                            "x-default" !== t.toLowerCase() && (location.hostname.includes("wli") && (i = i.replace(/^https:/, "http:")), n.has(t) || n.set(t, i))
                        }));
                        var i = document.getElementById("currentLangDisplay"),
                            o = document.getElementById("langOptions"),
                            r = document.getElementById("customLangDropdown");
                        i.textContent = e.toUpperCase(), i.classList.add("lang-".concat(e));
                        var s = !1;
                        n.size > 0 && n.forEach((function(t, n) {
                            var i = n.split("-")[0].toLowerCase();
                            if (i !== e) {
                                var r = document.createElement("li"),
                                    a = document.createElement("a");
                                a.href = t, a.textContent = i.toUpperCase(), a.classList.add("lang-".concat(i)), r.appendChild(a), o.appendChild(r), s = !0
                            }
                        })), r.style.opacity = "1", s && (r.addEventListener("mouseenter", (function() {
                            o.classList.remove("d-none")
                        })), r.addEventListener("mouseleave", (function() {
                            o.classList.add("d-none")
                        })))
                    })), document.querySelectorAll("li.nav-item.dropdown, .call-block, .custom-lang-dropdown").forEach((function(e) {
                        e.addEventListener("mouseenter", d), e.addEventListener("mouseleave", u), e.addEventListener("focus", d, !0), e.addEventListener("blur", u, !0), e.addEventListener("touchstart", d), e.addEventListener("touchend", u)
                    })), i(window).on("load", (function() {
                        var e = document.querySelector(".success-stories-data"),
                            t = document.querySelector(".success-stories-nav");
                        if (e && t) {
                            var n = e.getAttribute("data-id");
                            n && t.setAttribute("data-id", n)
                        }
                    })), window.addEventListener("load", p), window.addEventListener("resize", p)
            },
            654: (e, t, n) => {
                function i(e) {
                    return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, i(e)
                }
                var o, r, s;
                e = n.nmd(e), o = window, r = function(e, t, n) {
                    "use strict";

                    function i(e, n) {
                        if (!s[e]) {
                            var i = t.createElement(n ? "link" : "script"),
                                o = t.getElementsByTagName("script")[0];
                            n ? (i.rel = "stylesheet", i.href = e) : i.src = e, s[e] = !0, s[i.src || i.href] = !0, o.parentNode.insertBefore(i, o)
                        }
                    }
                    var o, r, s = {};
                    t.addEventListener && (r = /\(|\)|\s|'/, o = function(e, n) {
                        var i = t.createElement("img");
                        i.onload = function() {
                            i.onload = null, i.onerror = null, i = null, n()
                        }, i.onerror = i.onload, i.src = e, i && i.complete && i.onload && i.onload()
                    }, addEventListener("lazybeforeunveil", (function(e) {
                        var t, s, a;
                        e.detail.instance == n && (e.defaultPrevented || ("none" == e.target.preload && (e.target.preload = "auto"), (t = e.target.getAttribute("data-link")) && i(t, !0), (t = e.target.getAttribute("data-script")) && i(t), (t = e.target.getAttribute("data-require")) && (n.cfg.requireJs ? n.cfg.requireJs([t]) : i(t)), (s = e.target.getAttribute("data-bg")) && (e.detail.firesLoad = !0, o(s, (function() {
                            e.target.style.backgroundImage = "url(" + (r.test(s) ? JSON.stringify(s) : s) + ")", e.detail.firesLoad = !1, n.fire(e.target, "_lazyloaded", {}, !0, !0)
                        }))), (a = e.target.getAttribute("data-poster")) && (e.detail.firesLoad = !0, o(a, (function() {
                            e.target.poster = a, e.detail.firesLoad = !1, n.fire(e.target, "_lazyloaded", {}, !0, !0)
                        })))))
                    }), !1))
                }, s = function e() {
                    r(o.lazySizes), o.removeEventListener("lazyunveilread", e, !0)
                }, r = r.bind(null, o, o.document), "object" == i(e) && e.exports ? r(n(394)) : o.lazySizes ? s() : o.addEventListener("lazyunveilread", s, !0)
            },
            712: function(e, t, n) {
                var i, o, r, s;

                function a(e) {
                    return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, a(e)
                }
                s = function(e, t, n) {
                    "use strict";

                    function i(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }

                    function o(e, t, n) {
                        return t && i(e.prototype, t), n && i(e, n), e
                    }

                    function r() {
                        return (r = Object.assign || function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                            }
                            return e
                        }).apply(this, arguments)
                    }
                    t = t && t.hasOwnProperty("default") ? t.default : t, n = n && n.hasOwnProperty("default") ? n.default : n;
                    var s, l, c, d, u, p, f, h, g, m, v, y, b, w, T, x, S, C, _ = function(e) {
                            var t = !1,
                                n = {
                                    TRANSITION_END: "bsTransitionEnd",
                                    getUID: function(e) {
                                        do {
                                            e += ~~(1e6 * Math.random())
                                        } while (document.getElementById(e));
                                        return e
                                    },
                                    getSelectorFromElement: function(t) {
                                        var n, i = t.getAttribute("data-target");
                                        i && "#" !== i || (i = t.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof e.escapeSelector ? e.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                                        try {
                                            return e(document).find(i).length > 0 ? i : null
                                        } catch (e) {
                                            return null
                                        }
                                    },
                                    reflow: function(e) {
                                        return e.offsetHeight
                                    },
                                    triggerTransitionEnd: function(n) {
                                        e(n).trigger(t.end)
                                    },
                                    supportsTransitionEnd: function() {
                                        return Boolean(t)
                                    },
                                    isElement: function(e) {
                                        return (e[0] || e).nodeType
                                    },
                                    typeCheckConfig: function(e, t, i) {
                                        for (var o in i)
                                            if (Object.prototype.hasOwnProperty.call(i, o)) {
                                                var r = i[o],
                                                    s = t[o],
                                                    a = s && n.isElement(s) ? "element" : (l = s, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                                                if (!new RegExp(r).test(a)) throw new Error(e.toUpperCase() + ': Option "' + o + '" provided type "' + a + '" but expected type "' + r + '".')
                                            }
                                        var l
                                    }
                                };
                            return t = ("undefined" == typeof window || !window.QUnit) && {
                                end: "transitionend"
                            }, e.fn.emulateTransitionEnd = function(t) {
                                var i = this,
                                    o = !1;
                                return e(this).one(n.TRANSITION_END, (function() {
                                    o = !0
                                })), setTimeout((function() {
                                    o || n.triggerTransitionEnd(i)
                                }), t), this
                            }, n.supportsTransitionEnd() && (e.event.special[n.TRANSITION_END] = {
                                bindType: t.end,
                                delegateType: t.end,
                                handle: function(t) {
                                    if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
                                }
                            }), n
                        }(t),
                        k = (l = "alert", d = "." + (c = "bs.alert"), u = (s = t).fn[l], p = {
                            CLOSE: "close" + d,
                            CLOSED: "closed" + d,
                            CLICK_DATA_API: "click" + d + ".data-api"
                        }, f = function() {
                            function e(e) {
                                this._element = e
                            }
                            var t = e.prototype;
                            return t.close = function(e) {
                                e = e || this._element;
                                var t = this._getRootElement(e);
                                this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
                            }, t.dispose = function() {
                                s.removeData(this._element, c), this._element = null
                            }, t._getRootElement = function(e) {
                                var t = _.getSelectorFromElement(e),
                                    n = !1;
                                return t && (n = s(t)[0]), n || (n = s(e).closest(".alert")[0]), n
                            }, t._triggerCloseEvent = function(e) {
                                var t = s.Event(p.CLOSE);
                                return s(e).trigger(t), t
                            }, t._removeElement = function(e) {
                                var t = this;
                                s(e).removeClass("show"), _.supportsTransitionEnd() && s(e).hasClass("fade") ? s(e).one(_.TRANSITION_END, (function(n) {
                                    return t._destroyElement(e, n)
                                })).emulateTransitionEnd(150) : this._destroyElement(e)
                            }, t._destroyElement = function(e) {
                                s(e).detach().trigger(p.CLOSED).remove()
                            }, e._jQueryInterface = function(t) {
                                return this.each((function() {
                                    var n = s(this),
                                        i = n.data(c);
                                    i || (i = new e(this), n.data(c, i)), "close" === t && i[t](this)
                                }))
                            }, e._handleDismiss = function(e) {
                                return function(t) {
                                    t && t.preventDefault(), e.close(this)
                                }
                            }, o(e, null, [{
                                key: "VERSION",
                                get: function() {
                                    return "4.0.0"
                                }
                            }]), e
                        }(), s(document).on(p.CLICK_DATA_API, '[data-dismiss="alert"]', f._handleDismiss(new f)), s.fn[l] = f._jQueryInterface, s.fn[l].Constructor = f, s.fn[l].noConflict = function() {
                            return s.fn[l] = u, f._jQueryInterface
                        }, f),
                        E = (g = "button", v = "." + (m = "bs.button"), y = ".data-api", b = (h = t).fn[g], w = "active", T = '[data-toggle^="button"]', x = ".btn", S = {
                            CLICK_DATA_API: "click" + v + y,
                            FOCUS_BLUR_DATA_API: "focus" + v + y + " blur" + v + y
                        }, C = function() {
                            function e(e) {
                                this._element = e
                            }
                            var t = e.prototype;
                            return t.toggle = function() {
                                var e = !0,
                                    t = !0,
                                    n = h(this._element).closest('[data-toggle="buttons"]')[0];
                                if (n) {
                                    var i = h(this._element).find("input")[0];
                                    if (i) {
                                        if ("radio" === i.type)
                                            if (i.checked && h(this._element).hasClass(w)) e = !1;
                                            else {
                                                var o = h(n).find(".active")[0];
                                                o && h(o).removeClass(w)
                                            }
                                        if (e) {
                                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                                            i.checked = !h(this._element).hasClass(w), h(i).trigger("change")
                                        }
                                        i.focus(), t = !1
                                    }
                                }
                                t && this._element.setAttribute("aria-pressed", !h(this._element).hasClass(w)), e && h(this._element).toggleClass(w)
                            }, t.dispose = function() {
                                h.removeData(this._element, m), this._element = null
                            }, e._jQueryInterface = function(t) {
                                return this.each((function() {
                                    var n = h(this).data(m);
                                    n || (n = new e(this), h(this).data(m, n)), "toggle" === t && n[t]()
                                }))
                            }, o(e, null, [{
                                key: "VERSION",
                                get: function() {
                                    return "4.0.0"
                                }
                            }]), e
                        }(), h(document).on(S.CLICK_DATA_API, T, (function(e) {
                            e.preventDefault();
                            var t = e.target;
                            h(t).hasClass("btn") || (t = h(t).closest(x)), C._jQueryInterface.call(h(t), "toggle")
                        })).on(S.FOCUS_BLUR_DATA_API, T, (function(e) {
                            var t = h(e.target).closest(x)[0];
                            h(t).toggleClass("focus", /^focus(in)?$/.test(e.type))
                        })), h.fn[g] = C._jQueryInterface, h.fn[g].Constructor = C, h.fn[g].noConflict = function() {
                            return h.fn[g] = b, C._jQueryInterface
                        }, C),
                        A = function(e) {
                            var t = "carousel",
                                n = "bs.carousel",
                                i = "." + n,
                                s = e.fn[t],
                                l = {
                                    interval: 5e3,
                                    keyboard: !0,
                                    slide: !1,
                                    pause: "hover",
                                    wrap: !0
                                },
                                c = {
                                    interval: "(number|boolean)",
                                    keyboard: "boolean",
                                    slide: "(boolean|string)",
                                    pause: "(string|boolean)",
                                    wrap: "boolean"
                                },
                                d = "next",
                                u = "prev",
                                p = {
                                    SLIDE: "slide" + i,
                                    SLID: "slid" + i,
                                    KEYDOWN: "keydown" + i,
                                    MOUSEENTER: "mouseenter" + i,
                                    MOUSELEAVE: "mouseleave" + i,
                                    TOUCHEND: "touchend" + i,
                                    LOAD_DATA_API: "load" + i + ".data-api",
                                    CLICK_DATA_API: "click" + i + ".data-api"
                                },
                                f = "active",
                                h = ".active",
                                g = ".active.carousel-item",
                                m = ".carousel-item",
                                v = ".carousel-item-next, .carousel-item-prev",
                                y = ".carousel-indicators",
                                b = "[data-slide], [data-slide-to]",
                                w = '[data-ride="carousel"]',
                                T = function() {
                                    function s(t, n) {
                                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = e(t)[0], this._indicatorsElement = e(this._element).find(y)[0], this._addEventListeners()
                                    }
                                    var b = s.prototype;
                                    return b.next = function() {
                                        this._isSliding || this._slide(d)
                                    }, b.nextWhenVisible = function() {
                                        !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
                                    }, b.prev = function() {
                                        this._isSliding || this._slide(u)
                                    }, b.pause = function(t) {
                                        t || (this._isPaused = !0), e(this._element).find(v)[0] && _.supportsTransitionEnd() && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                                    }, b.cycle = function(e) {
                                        e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                                    }, b.to = function(t) {
                                        var n = this;
                                        this._activeElement = e(this._element).find(g)[0];
                                        var i = this._getItemIndex(this._activeElement);
                                        if (!(t > this._items.length - 1 || t < 0))
                                            if (this._isSliding) e(this._element).one(p.SLID, (function() {
                                                return n.to(t)
                                            }));
                                            else {
                                                if (i === t) return this.pause(), void this.cycle();
                                                var o = t > i ? d : u;
                                                this._slide(o, this._items[t])
                                            }
                                    }, b.dispose = function() {
                                        e(this._element).off(i), e.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                                    }, b._getConfig = function(e) {
                                        return e = r({}, l, e), _.typeCheckConfig(t, e, c), e
                                    }, b._addEventListeners = function() {
                                        var t = this;
                                        this._config.keyboard && e(this._element).on(p.KEYDOWN, (function(e) {
                                            return t._keydown(e)
                                        })), "hover" === this._config.pause && (e(this._element).on(p.MOUSEENTER, (function(e) {
                                            return t.pause(e)
                                        })).on(p.MOUSELEAVE, (function(e) {
                                            return t.cycle(e)
                                        })), "ontouchstart" in document.documentElement && e(this._element).on(p.TOUCHEND, (function() {
                                            t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout((function(e) {
                                                return t.cycle(e)
                                            }), 500 + t._config.interval)
                                        })))
                                    }, b._keydown = function(e) {
                                        if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                                            case 37:
                                                e.preventDefault(), this.prev();
                                                break;
                                            case 39:
                                                e.preventDefault(), this.next()
                                        }
                                    }, b._getItemIndex = function(t) {
                                        return this._items = e.makeArray(e(t).parent().find(m)), this._items.indexOf(t)
                                    }, b._getItemByDirection = function(e, t) {
                                        var n = e === d,
                                            i = e === u,
                                            o = this._getItemIndex(t),
                                            r = this._items.length - 1;
                                        if ((i && 0 === o || n && o === r) && !this._config.wrap) return t;
                                        var s = (o + (e === u ? -1 : 1)) % this._items.length;
                                        return -1 === s ? this._items[this._items.length - 1] : this._items[s]
                                    }, b._triggerSlideEvent = function(t, n) {
                                        var i = this._getItemIndex(t),
                                            o = this._getItemIndex(e(this._element).find(g)[0]),
                                            r = e.Event(p.SLIDE, {
                                                relatedTarget: t,
                                                direction: n,
                                                from: o,
                                                to: i
                                            });
                                        return e(this._element).trigger(r), r
                                    }, b._setActiveIndicatorElement = function(t) {
                                        if (this._indicatorsElement) {
                                            e(this._indicatorsElement).find(h).removeClass(f);
                                            var n = this._indicatorsElement.children[this._getItemIndex(t)];
                                            n && e(n).addClass(f)
                                        }
                                    }, b._slide = function(t, n) {
                                        var i, o, r, s = this,
                                            a = e(this._element).find(g)[0],
                                            l = this._getItemIndex(a),
                                            c = n || a && this._getItemByDirection(t, a),
                                            u = this._getItemIndex(c),
                                            h = Boolean(this._interval);
                                        if (t === d ? (i = "carousel-item-left", o = "carousel-item-next", r = "left") : (i = "carousel-item-right", o = "carousel-item-prev", r = "right"), c && e(c).hasClass(f)) this._isSliding = !1;
                                        else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
                                            this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(c);
                                            var m = e.Event(p.SLID, {
                                                relatedTarget: c,
                                                direction: r,
                                                from: l,
                                                to: u
                                            });
                                            _.supportsTransitionEnd() && e(this._element).hasClass("slide") ? (e(c).addClass(o), _.reflow(c), e(a).addClass(i), e(c).addClass(i), e(a).one(_.TRANSITION_END, (function() {
                                                e(c).removeClass(i + " " + o).addClass(f), e(a).removeClass(f + " " + o + " " + i), s._isSliding = !1, setTimeout((function() {
                                                    return e(s._element).trigger(m)
                                                }), 0)
                                            })).emulateTransitionEnd(600)) : (e(a).removeClass(f), e(c).addClass(f), this._isSliding = !1, e(this._element).trigger(m)), h && this.cycle()
                                        }
                                    }, s._jQueryInterface = function(t) {
                                        return this.each((function() {
                                            var i = e(this).data(n),
                                                o = r({}, l, e(this).data());
                                            "object" == a(t) && (o = r({}, o, t));
                                            var c = "string" == typeof t ? t : o.slide;
                                            if (i || (i = new s(this, o), e(this).data(n, i)), "number" == typeof t) i.to(t);
                                            else if ("string" == typeof c) {
                                                if (void 0 === i[c]) throw new TypeError('No method named "' + c + '"');
                                                i[c]()
                                            } else o.interval && (i.pause(), i.cycle())
                                        }))
                                    }, s._dataApiClickHandler = function(t) {
                                        var i = _.getSelectorFromElement(this);
                                        if (i) {
                                            var o = e(i)[0];
                                            if (o && e(o).hasClass("carousel")) {
                                                var a = r({}, e(o).data(), e(this).data()),
                                                    l = this.getAttribute("data-slide-to");
                                                l && (a.interval = !1), s._jQueryInterface.call(e(o), a), l && e(o).data(n).to(l), t.preventDefault()
                                            }
                                        }
                                    }, o(s, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return l
                                        }
                                    }]), s
                                }();
                            return e(document).on(p.CLICK_DATA_API, b, T._dataApiClickHandler), e(window).on(p.LOAD_DATA_API, (function() {
                                e(w).each((function() {
                                    var t = e(this);
                                    T._jQueryInterface.call(t, t.data())
                                }))
                            })), e.fn[t] = T._jQueryInterface, e.fn[t].Constructor = T, e.fn[t].noConflict = function() {
                                return e.fn[t] = s, T._jQueryInterface
                            }, T
                        }(t),
                        D = function(e) {
                            var t = "collapse",
                                n = "bs.collapse",
                                i = "." + n,
                                s = e.fn[t],
                                l = {
                                    toggle: !0,
                                    parent: ""
                                },
                                c = {
                                    toggle: "boolean",
                                    parent: "(string|element)"
                                },
                                d = {
                                    SHOW: "show" + i,
                                    SHOWN: "shown" + i,
                                    HIDE: "hide" + i,
                                    HIDDEN: "hidden" + i,
                                    CLICK_DATA_API: "click" + i + ".data-api"
                                },
                                u = "show",
                                p = "collapse",
                                f = "collapsing",
                                h = "collapsed",
                                g = "width",
                                m = ".show, .collapsing",
                                v = '[data-toggle="collapse"]',
                                y = function() {
                                    function i(t, n) {
                                        this._isTransitioning = !1, this._element = t, this._config = this._getConfig(n), this._triggerArray = e.makeArray(e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                                        for (var i = e(v), o = 0; o < i.length; o++) {
                                            var r = i[o],
                                                s = _.getSelectorFromElement(r);
                                            null !== s && e(s).filter(t).length > 0 && (this._selector = s, this._triggerArray.push(r))
                                        }
                                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                                    }
                                    var s = i.prototype;
                                    return s.toggle = function() {
                                        e(this._element).hasClass(u) ? this.hide() : this.show()
                                    }, s.show = function() {
                                        var t, o, r = this;
                                        if (!(this._isTransitioning || e(this._element).hasClass(u) || (this._parent && 0 === (t = e.makeArray(e(this._parent).find(m).filter('[data-parent="' + this._config.parent + '"]'))).length && (t = null), t && (o = e(t).not(this._selector).data(n)) && o._isTransitioning))) {
                                            var s = e.Event(d.SHOW);
                                            if (e(this._element).trigger(s), !s.isDefaultPrevented()) {
                                                t && (i._jQueryInterface.call(e(t).not(this._selector), "hide"), o || e(t).data(n, null));
                                                var a = this._getDimension();
                                                e(this._element).removeClass(p).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && e(this._triggerArray).removeClass(h).attr("aria-expanded", !0), this.setTransitioning(!0);
                                                var l = function() {
                                                    e(r._element).removeClass(f).addClass(p).addClass(u), r._element.style[a] = "", r.setTransitioning(!1), e(r._element).trigger(d.SHOWN)
                                                };
                                                if (_.supportsTransitionEnd()) {
                                                    var c = "scroll" + (a[0].toUpperCase() + a.slice(1));
                                                    e(this._element).one(_.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[c] + "px"
                                                } else l()
                                            }
                                        }
                                    }, s.hide = function() {
                                        var t = this;
                                        if (!this._isTransitioning && e(this._element).hasClass(u)) {
                                            var n = e.Event(d.HIDE);
                                            if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                                                var i = this._getDimension();
                                                if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", _.reflow(this._element), e(this._element).addClass(f).removeClass(p).removeClass(u), this._triggerArray.length > 0)
                                                    for (var o = 0; o < this._triggerArray.length; o++) {
                                                        var r = this._triggerArray[o],
                                                            s = _.getSelectorFromElement(r);
                                                        null !== s && (e(s).hasClass(u) || e(r).addClass(h).attr("aria-expanded", !1))
                                                    }
                                                this.setTransitioning(!0);
                                                var a = function() {
                                                    t.setTransitioning(!1), e(t._element).removeClass(f).addClass(p).trigger(d.HIDDEN)
                                                };
                                                this._element.style[i] = "", _.supportsTransitionEnd() ? e(this._element).one(_.TRANSITION_END, a).emulateTransitionEnd(600) : a()
                                            }
                                        }
                                    }, s.setTransitioning = function(e) {
                                        this._isTransitioning = e
                                    }, s.dispose = function() {
                                        e.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                                    }, s._getConfig = function(e) {
                                        return (e = r({}, l, e)).toggle = Boolean(e.toggle), _.typeCheckConfig(t, e, c), e
                                    }, s._getDimension = function() {
                                        return e(this._element).hasClass(g) ? g : "height"
                                    }, s._getParent = function() {
                                        var t = this,
                                            n = null;
                                        _.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = e(this._config.parent)[0];
                                        var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                                        return e(n).find(o).each((function(e, n) {
                                            t._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n])
                                        })), n
                                    }, s._addAriaAndCollapsedClass = function(t, n) {
                                        if (t) {
                                            var i = e(t).hasClass(u);
                                            n.length > 0 && e(n).toggleClass(h, !i).attr("aria-expanded", i)
                                        }
                                    }, i._getTargetFromElement = function(t) {
                                        var n = _.getSelectorFromElement(t);
                                        return n ? e(n)[0] : null
                                    }, i._jQueryInterface = function(t) {
                                        return this.each((function() {
                                            var o = e(this),
                                                s = o.data(n),
                                                c = r({}, l, o.data(), "object" == a(t) && t);
                                            if (!s && c.toggle && /show|hide/.test(t) && (c.toggle = !1), s || (s = new i(this, c), o.data(n, s)), "string" == typeof t) {
                                                if (void 0 === s[t]) throw new TypeError('No method named "' + t + '"');
                                                s[t]()
                                            }
                                        }))
                                    }, o(i, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return l
                                        }
                                    }]), i
                                }();
                            return e(document).on(d.CLICK_DATA_API, v, (function(t) {
                                "A" === t.currentTarget.tagName && t.preventDefault();
                                var i = e(this),
                                    o = _.getSelectorFromElement(this);
                                e(o).each((function() {
                                    var t = e(this),
                                        o = t.data(n) ? "toggle" : i.data();
                                    y._jQueryInterface.call(t, o)
                                }))
                            })), e.fn[t] = y._jQueryInterface, e.fn[t].Constructor = y, e.fn[t].noConflict = function() {
                                return e.fn[t] = s, y._jQueryInterface
                            }, y
                        }(t),
                        N = function(e) {
                            var t = "dropdown",
                                i = "bs.dropdown",
                                s = "." + i,
                                l = ".data-api",
                                c = e.fn[t],
                                d = new RegExp("38|40|27"),
                                u = {
                                    HIDE: "hide" + s,
                                    HIDDEN: "hidden" + s,
                                    SHOW: "show" + s,
                                    SHOWN: "shown" + s,
                                    CLICK: "click" + s,
                                    CLICK_DATA_API: "click" + s + l,
                                    KEYDOWN_DATA_API: "keydown" + s + l,
                                    KEYUP_DATA_API: "keyup" + s + l
                                },
                                p = "disabled",
                                f = "show",
                                h = "dropup",
                                g = "dropdown-menu-right",
                                m = '[data-toggle="dropdown"]',
                                v = ".dropdown-menu",
                                y = {
                                    offset: 0,
                                    flip: !0,
                                    boundary: "scrollParent"
                                },
                                b = {
                                    offset: "(number|string|function)",
                                    flip: "boolean",
                                    boundary: "(string|element)"
                                },
                                w = function() {
                                    function l(e, t) {
                                        this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                                    }
                                    var c = l.prototype;
                                    return c.toggle = function() {
                                        if (!this._element.disabled && !e(this._element).hasClass(p)) {
                                            var t = l._getParentFromElement(this._element),
                                                i = e(this._menu).hasClass(f);
                                            if (l._clearMenus(), !i) {
                                                var o = {
                                                        relatedTarget: this._element
                                                    },
                                                    r = e.Event(u.SHOW, o);
                                                if (e(t).trigger(r), !r.isDefaultPrevented()) {
                                                    if (!this._inNavbar) {
                                                        if (void 0 === n) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                                        var s = this._element;
                                                        e(t).hasClass(h) && (e(this._menu).hasClass("dropdown-menu-left") || e(this._menu).hasClass(g)) && (s = t), "scrollParent" !== this._config.boundary && e(t).addClass("position-static"), this._popper = new n(s, this._menu, this._getPopperConfig())
                                                    }
                                                    "ontouchstart" in document.documentElement && 0 === e(t).closest(".navbar-nav").length && e("body").children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(f), e(t).toggleClass(f).trigger(e.Event(u.SHOWN, o))
                                                }
                                            }
                                        }
                                    }, c.dispose = function() {
                                        e.removeData(this._element, i), e(this._element).off(s), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                                    }, c.update = function() {
                                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                                    }, c._addEventListeners = function() {
                                        var t = this;
                                        e(this._element).on(u.CLICK, (function(e) {
                                            e.preventDefault(), e.stopPropagation(), t.toggle()
                                        }))
                                    }, c._getConfig = function(n) {
                                        return n = r({}, this.constructor.Default, e(this._element).data(), n), _.typeCheckConfig(t, n, this.constructor.DefaultType), n
                                    }, c._getMenuElement = function() {
                                        if (!this._menu) {
                                            var t = l._getParentFromElement(this._element);
                                            this._menu = e(t).find(v)[0]
                                        }
                                        return this._menu
                                    }, c._getPlacement = function() {
                                        var t = e(this._element).parent(),
                                            n = "bottom-start";
                                        return t.hasClass(h) ? (n = "top-start", e(this._menu).hasClass(g) && (n = "top-end")) : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : e(this._menu).hasClass(g) && (n = "bottom-end"), n
                                    }, c._detectNavbar = function() {
                                        return e(this._element).closest(".navbar").length > 0
                                    }, c._getPopperConfig = function() {
                                        var e = this,
                                            t = {};
                                        return "function" == typeof this._config.offset ? t.fn = function(t) {
                                            return t.offsets = r({}, t.offsets, e._config.offset(t.offsets) || {}), t
                                        } : t.offset = this._config.offset, {
                                            placement: this._getPlacement(),
                                            modifiers: {
                                                offset: t,
                                                flip: {
                                                    enabled: this._config.flip
                                                },
                                                preventOverflow: {
                                                    boundariesElement: this._config.boundary
                                                }
                                            }
                                        }
                                    }, l._jQueryInterface = function(t) {
                                        return this.each((function() {
                                            var n = e(this).data(i);
                                            if (n || (n = new l(this, "object" == a(t) ? t : null), e(this).data(i, n)), "string" == typeof t) {
                                                if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                                                n[t]()
                                            }
                                        }))
                                    }, l._clearMenus = function(t) {
                                        if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                                            for (var n = e.makeArray(e(m)), o = 0; o < n.length; o++) {
                                                var r = l._getParentFromElement(n[o]),
                                                    s = e(n[o]).data(i),
                                                    a = {
                                                        relatedTarget: n[o]
                                                    };
                                                if (s) {
                                                    var c = s._menu;
                                                    if (e(r).hasClass(f) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && e.contains(r, t.target))) {
                                                        var d = e.Event(u.HIDE, a);
                                                        e(r).trigger(d), d.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e("body").children().off("mouseover", null, e.noop), n[o].setAttribute("aria-expanded", "false"), e(c).removeClass(f), e(r).removeClass(f).trigger(e.Event(u.HIDDEN, a)))
                                                    }
                                                }
                                            }
                                    }, l._getParentFromElement = function(t) {
                                        var n, i = _.getSelectorFromElement(t);
                                        return i && (n = e(i)[0]), n || t.parentNode
                                    }, l._dataApiKeydownHandler = function(t) {
                                        if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || e(t.target).closest(v).length)) : d.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !e(this).hasClass(p))) {
                                            var n = l._getParentFromElement(this),
                                                i = e(n).hasClass(f);
                                            if ((i || 27 === t.which && 32 === t.which) && (!i || 27 !== t.which && 32 !== t.which)) {
                                                var o = e(n).find(".dropdown-menu .dropdown-item:not(.disabled)").get();
                                                if (0 !== o.length) {
                                                    var r = o.indexOf(t.target);
                                                    38 === t.which && r > 0 && r--, 40 === t.which && r < o.length - 1 && r++, r < 0 && (r = 0), o[r].focus()
                                                }
                                            } else {
                                                if (27 === t.which) {
                                                    var s = e(n).find(m)[0];
                                                    e(s).trigger("focus")
                                                }
                                                e(this).trigger("click")
                                            }
                                        }
                                    }, o(l, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return y
                                        }
                                    }, {
                                        key: "DefaultType",
                                        get: function() {
                                            return b
                                        }
                                    }]), l
                                }();
                            return e(document).on(u.KEYDOWN_DATA_API, m, w._dataApiKeydownHandler).on(u.KEYDOWN_DATA_API, v, w._dataApiKeydownHandler).on(u.CLICK_DATA_API + " " + u.KEYUP_DATA_API, w._clearMenus).on(u.CLICK_DATA_API, m, (function(t) {
                                t.preventDefault(), t.stopPropagation(), w._jQueryInterface.call(e(this), "toggle")
                            })).on(u.CLICK_DATA_API, ".dropdown form", (function(e) {
                                e.stopPropagation()
                            })), e.fn[t] = w._jQueryInterface, e.fn[t].Constructor = w, e.fn[t].noConflict = function() {
                                return e.fn[t] = c, w._jQueryInterface
                            }, w
                        }(t),
                        I = function(e) {
                            var t = "bs.modal",
                                n = "." + t,
                                i = e.fn.modal,
                                s = {
                                    backdrop: !0,
                                    keyboard: !0,
                                    focus: !0,
                                    show: !0
                                },
                                l = {
                                    backdrop: "(boolean|string)",
                                    keyboard: "boolean",
                                    focus: "boolean",
                                    show: "boolean"
                                },
                                c = {
                                    HIDE: "hide" + n,
                                    HIDDEN: "hidden" + n,
                                    SHOW: "show" + n,
                                    SHOWN: "shown" + n,
                                    FOCUSIN: "focusin" + n,
                                    RESIZE: "resize" + n,
                                    CLICK_DISMISS: "click.dismiss" + n,
                                    KEYDOWN_DISMISS: "keydown.dismiss" + n,
                                    MOUSEUP_DISMISS: "mouseup.dismiss" + n,
                                    MOUSEDOWN_DISMISS: "mousedown.dismiss" + n,
                                    CLICK_DATA_API: "click" + n + ".data-api"
                                },
                                d = "modal-open",
                                u = "fade",
                                p = "show",
                                f = ".modal-dialog",
                                h = '[data-toggle="modal"]',
                                g = '[data-dismiss="modal"]',
                                m = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                                v = ".sticky-top",
                                y = ".navbar-toggler",
                                b = function() {
                                    function i(t, n) {
                                        this._config = this._getConfig(n), this._element = t, this._dialog = e(t).find(f)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                                    }
                                    var h = i.prototype;
                                    return h.toggle = function(e) {
                                        return this._isShown ? this.hide() : this.show(e)
                                    }, h.show = function(t) {
                                        var n = this;
                                        if (!this._isTransitioning && !this._isShown) {
                                            _.supportsTransitionEnd() && e(this._element).hasClass(u) && (this._isTransitioning = !0);
                                            var i = e.Event(c.SHOW, {
                                                relatedTarget: t
                                            });
                                            e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), e(document.body).addClass(d), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(c.CLICK_DISMISS, g, (function(e) {
                                                return n.hide(e)
                                            })), e(this._dialog).on(c.MOUSEDOWN_DISMISS, (function() {
                                                e(n._element).one(c.MOUSEUP_DISMISS, (function(t) {
                                                    e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                                }))
                                            })), this._showBackdrop((function() {
                                                return n._showElement(t)
                                            })))
                                        }
                                    }, h.hide = function(t) {
                                        var n = this;
                                        if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                                            var i = e.Event(c.HIDE);
                                            if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                                                this._isShown = !1;
                                                var o = _.supportsTransitionEnd() && e(this._element).hasClass(u);
                                                o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(c.FOCUSIN), e(this._element).removeClass(p), e(this._element).off(c.CLICK_DISMISS), e(this._dialog).off(c.MOUSEDOWN_DISMISS), o ? e(this._element).one(_.TRANSITION_END, (function(e) {
                                                    return n._hideModal(e)
                                                })).emulateTransitionEnd(300) : this._hideModal()
                                            }
                                        }
                                    }, h.dispose = function() {
                                        e.removeData(this._element, t), e(window, document, this._element, this._backdrop).off(n), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                                    }, h.handleUpdate = function() {
                                        this._adjustDialog()
                                    }, h._getConfig = function(e) {
                                        return e = r({}, s, e), _.typeCheckConfig("modal", e, l), e
                                    }, h._showElement = function(t) {
                                        var n = this,
                                            i = _.supportsTransitionEnd() && e(this._element).hasClass(u);
                                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && _.reflow(this._element), e(this._element).addClass(p), this._config.focus && this._enforceFocus();
                                        var o = e.Event(c.SHOWN, {
                                                relatedTarget: t
                                            }),
                                            r = function() {
                                                n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o)
                                            };
                                        i ? e(this._dialog).one(_.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                                    }, h._enforceFocus = function() {
                                        var t = this;
                                        e(document).off(c.FOCUSIN).on(c.FOCUSIN, (function(n) {
                                            document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                                        }))
                                    }, h._setEscapeEvent = function() {
                                        var t = this;
                                        this._isShown && this._config.keyboard ? e(this._element).on(c.KEYDOWN_DISMISS, (function(e) {
                                            27 === e.which && (e.preventDefault(), t.hide())
                                        })) : this._isShown || e(this._element).off(c.KEYDOWN_DISMISS)
                                    }, h._setResizeEvent = function() {
                                        var t = this;
                                        this._isShown ? e(window).on(c.RESIZE, (function(e) {
                                            return t.handleUpdate(e)
                                        })) : e(window).off(c.RESIZE)
                                    }, h._hideModal = function() {
                                        var t = this;
                                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop((function() {
                                            e(document.body).removeClass(d), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(c.HIDDEN)
                                        }))
                                    }, h._removeBackdrop = function() {
                                        this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
                                    }, h._showBackdrop = function(t) {
                                        var n = this,
                                            i = e(this._element).hasClass(u) ? u : "";
                                        if (this._isShown && this._config.backdrop) {
                                            var o = _.supportsTransitionEnd() && i;
                                            if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && e(this._backdrop).addClass(i), e(this._backdrop).appendTo(document.body), e(this._element).on(c.CLICK_DISMISS, (function(e) {
                                                    n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                                                })), o && _.reflow(this._backdrop), e(this._backdrop).addClass(p), !t) return;
                                            if (!o) return void t();
                                            e(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(150)
                                        } else if (!this._isShown && this._backdrop) {
                                            e(this._backdrop).removeClass(p);
                                            var r = function() {
                                                n._removeBackdrop(), t && t()
                                            };
                                            _.supportsTransitionEnd() && e(this._element).hasClass(u) ? e(this._backdrop).one(_.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                                        } else t && t()
                                    }, h._adjustDialog = function() {
                                        var e = this._element.scrollHeight > document.documentElement.clientHeight;
                                        !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                                    }, h._resetAdjustments = function() {
                                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                                    }, h._checkScrollbar = function() {
                                        var e = document.body.getBoundingClientRect();
                                        this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                                    }, h._setScrollbar = function() {
                                        var t = this;
                                        if (this._isBodyOverflowing) {
                                            e(m).each((function(n, i) {
                                                var o = e(i)[0].style.paddingRight,
                                                    r = e(i).css("padding-right");
                                                e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
                                            })), e(v).each((function(n, i) {
                                                var o = e(i)[0].style.marginRight,
                                                    r = e(i).css("margin-right");
                                                e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
                                            })), e(y).each((function(n, i) {
                                                var o = e(i)[0].style.marginRight,
                                                    r = e(i).css("margin-right");
                                                e(i).data("margin-right", o).css("margin-right", parseFloat(r) + t._scrollbarWidth + "px")
                                            }));
                                            var n = document.body.style.paddingRight,
                                                i = e("body").css("padding-right");
                                            e("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                                        }
                                    }, h._resetScrollbar = function() {
                                        e(m).each((function(t, n) {
                                            var i = e(n).data("padding-right");
                                            void 0 !== i && e(n).css("padding-right", i).removeData("padding-right")
                                        })), e(v + ", " + y).each((function(t, n) {
                                            var i = e(n).data("margin-right");
                                            void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                                        }));
                                        var t = e("body").data("padding-right");
                                        void 0 !== t && e("body").css("padding-right", t).removeData("padding-right")
                                    }, h._getScrollbarWidth = function() {
                                        var e = document.createElement("div");
                                        e.className = "modal-scrollbar-measure", document.body.appendChild(e);
                                        var t = e.getBoundingClientRect().width - e.clientWidth;
                                        return document.body.removeChild(e), t
                                    }, i._jQueryInterface = function(n, o) {
                                        return this.each((function() {
                                            var s = e(this).data(t),
                                                l = r({}, i.Default, e(this).data(), "object" == a(n) && n);
                                            if (s || (s = new i(this, l), e(this).data(t, s)), "string" == typeof n) {
                                                if (void 0 === s[n]) throw new TypeError('No method named "' + n + '"');
                                                s[n](o)
                                            } else l.show && s.show(o)
                                        }))
                                    }, o(i, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return s
                                        }
                                    }]), i
                                }();
                            return e(document).on(c.CLICK_DATA_API, h, (function(n) {
                                var i, o = this,
                                    s = _.getSelectorFromElement(this);
                                s && (i = e(s)[0]);
                                var a = e(i).data(t) ? "toggle" : r({}, e(i).data(), e(this).data());
                                "A" !== this.tagName && "AREA" !== this.tagName || n.preventDefault();
                                var l = e(i).one(c.SHOW, (function(t) {
                                    t.isDefaultPrevented() || l.one(c.HIDDEN, (function() {
                                        e(o).is(":visible") && o.focus()
                                    }))
                                }));
                                b._jQueryInterface.call(e(i), a, this)
                            })), e.fn.modal = b._jQueryInterface, e.fn.modal.Constructor = b, e.fn.modal.noConflict = function() {
                                return e.fn.modal = i, b._jQueryInterface
                            }, b
                        }(t),
                        O = function(e) {
                            var t = "tooltip",
                                i = "bs.tooltip",
                                s = "." + i,
                                l = e.fn[t],
                                c = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                                d = {
                                    animation: "boolean",
                                    template: "string",
                                    title: "(string|element|function)",
                                    trigger: "string",
                                    delay: "(number|object)",
                                    html: "boolean",
                                    selector: "(string|boolean)",
                                    placement: "(string|function)",
                                    offset: "(number|string)",
                                    container: "(string|element|boolean)",
                                    fallbackPlacement: "(string|array)",
                                    boundary: "(string|element)"
                                },
                                u = {
                                    AUTO: "auto",
                                    TOP: "top",
                                    RIGHT: "right",
                                    BOTTOM: "bottom",
                                    LEFT: "left"
                                },
                                p = {
                                    animation: !0,
                                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                                    trigger: "hover focus",
                                    title: "",
                                    delay: 0,
                                    html: !1,
                                    selector: !1,
                                    placement: "top",
                                    offset: 0,
                                    container: !1,
                                    fallbackPlacement: "flip",
                                    boundary: "scrollParent"
                                },
                                f = "show",
                                h = "out",
                                g = {
                                    HIDE: "hide" + s,
                                    HIDDEN: "hidden" + s,
                                    SHOW: "show" + s,
                                    SHOWN: "shown" + s,
                                    INSERTED: "inserted" + s,
                                    CLICK: "click" + s,
                                    FOCUSIN: "focusin" + s,
                                    FOCUSOUT: "focusout" + s,
                                    MOUSEENTER: "mouseenter" + s,
                                    MOUSELEAVE: "mouseleave" + s
                                },
                                m = "fade",
                                v = "show",
                                y = "hover",
                                b = "focus",
                                w = function() {
                                    function l(e, t) {
                                        if (void 0 === n) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                                        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
                                    }
                                    var w = l.prototype;
                                    return w.enable = function() {
                                        this._isEnabled = !0
                                    }, w.disable = function() {
                                        this._isEnabled = !1
                                    }, w.toggleEnabled = function() {
                                        this._isEnabled = !this._isEnabled
                                    }, w.toggle = function(t) {
                                        if (this._isEnabled)
                                            if (t) {
                                                var n = this.constructor.DATA_KEY,
                                                    i = e(t.currentTarget).data(n);
                                                i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                                            } else {
                                                if (e(this.getTipElement()).hasClass(v)) return void this._leave(null, this);
                                                this._enter(null, this)
                                            }
                                    }, w.dispose = function() {
                                        clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                                    }, w.show = function() {
                                        var t = this;
                                        if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                                        var i = e.Event(this.constructor.Event.SHOW);
                                        if (this.isWithContent() && this._isEnabled) {
                                            e(this.element).trigger(i);
                                            var o = e.contains(this.element.ownerDocument.documentElement, this.element);
                                            if (i.isDefaultPrevented() || !o) return;
                                            var r = this.getTipElement(),
                                                s = _.getUID(this.constructor.NAME);
                                            r.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && e(r).addClass(m);
                                            var a = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                                c = this._getAttachment(a);
                                            this.addAttachmentClass(c);
                                            var d = !1 === this.config.container ? document.body : e(this.config.container);
                                            e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(d), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
                                                placement: c,
                                                modifiers: {
                                                    offset: {
                                                        offset: this.config.offset
                                                    },
                                                    flip: {
                                                        behavior: this.config.fallbackPlacement
                                                    },
                                                    arrow: {
                                                        element: ".arrow"
                                                    },
                                                    preventOverflow: {
                                                        boundariesElement: this.config.boundary
                                                    }
                                                },
                                                onCreate: function(e) {
                                                    e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                                                },
                                                onUpdate: function(e) {
                                                    t._handlePopperPlacementChange(e)
                                                }
                                            }), e(r).addClass(v), "ontouchstart" in document.documentElement && e("body").children().on("mouseover", null, e.noop);
                                            var u = function() {
                                                t.config.animation && t._fixTransition();
                                                var n = t._hoverState;
                                                t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === h && t._leave(null, t)
                                            };
                                            _.supportsTransitionEnd() && e(this.tip).hasClass(m) ? e(this.tip).one(_.TRANSITION_END, u).emulateTransitionEnd(l._TRANSITION_DURATION) : u()
                                        }
                                    }, w.hide = function(t) {
                                        var n = this,
                                            i = this.getTipElement(),
                                            o = e.Event(this.constructor.Event.HIDE),
                                            r = function() {
                                                n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                                            };
                                        e(this.element).trigger(o), o.isDefaultPrevented() || (e(i).removeClass(v), "ontouchstart" in document.documentElement && e("body").children().off("mouseover", null, e.noop), this._activeTrigger.click = !1, this._activeTrigger[b] = !1, this._activeTrigger[y] = !1, _.supportsTransitionEnd() && e(this.tip).hasClass(m) ? e(i).one(_.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
                                    }, w.update = function() {
                                        null !== this._popper && this._popper.scheduleUpdate()
                                    }, w.isWithContent = function() {
                                        return Boolean(this.getTitle())
                                    }, w.addAttachmentClass = function(t) {
                                        e(this.getTipElement()).addClass("bs-tooltip-" + t)
                                    }, w.getTipElement = function() {
                                        return this.tip = this.tip || e(this.config.template)[0], this.tip
                                    }, w.setContent = function() {
                                        var t = e(this.getTipElement());
                                        this.setElementContent(t.find(".tooltip-inner"), this.getTitle()), t.removeClass(m + " " + v)
                                    }, w.setElementContent = function(t, n) {
                                        var i = this.config.html;
                                        "object" == a(n) && (n.nodeType || n.jquery) ? i ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text()) : t[i ? "html" : "text"](n)
                                    }, w.getTitle = function() {
                                        var e = this.element.getAttribute("data-original-title");
                                        return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
                                    }, w._getAttachment = function(e) {
                                        return u[e.toUpperCase()]
                                    }, w._setListeners = function() {
                                        var t = this;
                                        this.config.trigger.split(" ").forEach((function(n) {
                                            if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, (function(e) {
                                                return t.toggle(e)
                                            }));
                                            else if ("manual" !== n) {
                                                var i = n === y ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                                                    o = n === y ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                                                e(t.element).on(i, t.config.selector, (function(e) {
                                                    return t._enter(e)
                                                })).on(o, t.config.selector, (function(e) {
                                                    return t._leave(e)
                                                }))
                                            }
                                            e(t.element).closest(".modal").on("hide.bs.modal", (function() {
                                                return t.hide()
                                            }))
                                        })), this.config.selector ? this.config = r({}, this.config, {
                                            trigger: "manual",
                                            selector: ""
                                        }) : this._fixTitle()
                                    }, w._fixTitle = function() {
                                        var e = a(this.element.getAttribute("data-original-title"));
                                        (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                                    }, w._enter = function(t, n) {
                                        var i = this.constructor.DATA_KEY;
                                        (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? b : y] = !0), e(n.getTipElement()).hasClass(v) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout((function() {
                                            n._hoverState === f && n.show()
                                        }), n.config.delay.show) : n.show())
                                    }, w._leave = function(t, n) {
                                        var i = this.constructor.DATA_KEY;
                                        (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? b : y] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = h, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout((function() {
                                            n._hoverState === h && n.hide()
                                        }), n.config.delay.hide) : n.hide())
                                    }, w._isWithActiveTrigger = function() {
                                        for (var e in this._activeTrigger)
                                            if (this._activeTrigger[e]) return !0;
                                        return !1
                                    }, w._getConfig = function(n) {
                                        return "number" == typeof(n = r({}, this.constructor.Default, e(this.element).data(), n)).delay && (n.delay = {
                                            show: n.delay,
                                            hide: n.delay
                                        }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), _.typeCheckConfig(t, n, this.constructor.DefaultType), n
                                    }, w._getDelegateConfig = function() {
                                        var e = {};
                                        if (this.config)
                                            for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                                        return e
                                    }, w._cleanTipClass = function() {
                                        var t = e(this.getTipElement()),
                                            n = t.attr("class").match(c);
                                        null !== n && n.length > 0 && t.removeClass(n.join(""))
                                    }, w._handlePopperPlacementChange = function(e) {
                                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
                                    }, w._fixTransition = function() {
                                        var t = this.getTipElement(),
                                            n = this.config.animation;
                                        null === t.getAttribute("x-placement") && (e(t).removeClass(m), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                                    }, l._jQueryInterface = function(t) {
                                        return this.each((function() {
                                            var n = e(this).data(i),
                                                o = "object" == a(t) && t;
                                            if ((n || !/dispose|hide/.test(t)) && (n || (n = new l(this, o), e(this).data(i, n)), "string" == typeof t)) {
                                                if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                                                n[t]()
                                            }
                                        }))
                                    }, o(l, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return p
                                        }
                                    }, {
                                        key: "NAME",
                                        get: function() {
                                            return t
                                        }
                                    }, {
                                        key: "DATA_KEY",
                                        get: function() {
                                            return i
                                        }
                                    }, {
                                        key: "Event",
                                        get: function() {
                                            return g
                                        }
                                    }, {
                                        key: "EVENT_KEY",
                                        get: function() {
                                            return s
                                        }
                                    }, {
                                        key: "DefaultType",
                                        get: function() {
                                            return d
                                        }
                                    }]), l
                                }();
                            return e.fn[t] = w._jQueryInterface, e.fn[t].Constructor = w, e.fn[t].noConflict = function() {
                                return e.fn[t] = l, w._jQueryInterface
                            }, w
                        }(t),
                        L = function(e) {
                            var t = "popover",
                                n = "bs.popover",
                                i = "." + n,
                                s = e.fn[t],
                                l = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                                c = r({}, O.Default, {
                                    placement: "right",
                                    trigger: "click",
                                    content: "",
                                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                                }),
                                d = r({}, O.DefaultType, {
                                    content: "(string|element|function)"
                                }),
                                u = {
                                    HIDE: "hide" + i,
                                    HIDDEN: "hidden" + i,
                                    SHOW: "show" + i,
                                    SHOWN: "shown" + i,
                                    INSERTED: "inserted" + i,
                                    CLICK: "click" + i,
                                    FOCUSIN: "focusin" + i,
                                    FOCUSOUT: "focusout" + i,
                                    MOUSEENTER: "mouseenter" + i,
                                    MOUSELEAVE: "mouseleave" + i
                                },
                                p = function(r) {
                                    var s, p;

                                    function f() {
                                        return r.apply(this, arguments) || this
                                    }
                                    p = r, (s = f).prototype = Object.create(p.prototype), s.prototype.constructor = s, s.__proto__ = p;
                                    var h = f.prototype;
                                    return h.isWithContent = function() {
                                        return this.getTitle() || this._getContent()
                                    }, h.addAttachmentClass = function(t) {
                                        e(this.getTipElement()).addClass("bs-popover-" + t)
                                    }, h.getTipElement = function() {
                                        return this.tip = this.tip || e(this.config.template)[0], this.tip
                                    }, h.setContent = function() {
                                        var t = e(this.getTipElement());
                                        this.setElementContent(t.find(".popover-header"), this.getTitle());
                                        var n = this._getContent();
                                        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(".popover-body"), n), t.removeClass("fade show")
                                    }, h._getContent = function() {
                                        return this.element.getAttribute("data-content") || this.config.content
                                    }, h._cleanTipClass = function() {
                                        var t = e(this.getTipElement()),
                                            n = t.attr("class").match(l);
                                        null !== n && n.length > 0 && t.removeClass(n.join(""))
                                    }, f._jQueryInterface = function(t) {
                                        return this.each((function() {
                                            var i = e(this).data(n),
                                                o = "object" == a(t) ? t : null;
                                            if ((i || !/destroy|hide/.test(t)) && (i || (i = new f(this, o), e(this).data(n, i)), "string" == typeof t)) {
                                                if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                                                i[t]()
                                            }
                                        }))
                                    }, o(f, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return c
                                        }
                                    }, {
                                        key: "NAME",
                                        get: function() {
                                            return t
                                        }
                                    }, {
                                        key: "DATA_KEY",
                                        get: function() {
                                            return n
                                        }
                                    }, {
                                        key: "Event",
                                        get: function() {
                                            return u
                                        }
                                    }, {
                                        key: "EVENT_KEY",
                                        get: function() {
                                            return i
                                        }
                                    }, {
                                        key: "DefaultType",
                                        get: function() {
                                            return d
                                        }
                                    }]), f
                                }(O);
                            return e.fn[t] = p._jQueryInterface, e.fn[t].Constructor = p, e.fn[t].noConflict = function() {
                                return e.fn[t] = s, p._jQueryInterface
                            }, p
                        }(t),
                        $ = function(e) {
                            var t = "scrollspy",
                                n = "bs.scrollspy",
                                i = "." + n,
                                s = e.fn[t],
                                l = {
                                    offset: 10,
                                    method: "auto",
                                    target: ""
                                },
                                c = {
                                    offset: "number",
                                    method: "string",
                                    target: "(string|element)"
                                },
                                d = {
                                    ACTIVATE: "activate" + i,
                                    SCROLL: "scroll" + i,
                                    LOAD_DATA_API: "load" + i + ".data-api"
                                },
                                u = "active",
                                p = '[data-spy="scroll"]',
                                f = ".active",
                                h = ".nav, .list-group",
                                g = ".nav-link",
                                m = ".nav-item",
                                v = ".list-group-item",
                                y = ".dropdown",
                                b = ".dropdown-item",
                                w = ".dropdown-toggle",
                                T = "position",
                                x = function() {
                                    function s(t, n) {
                                        var i = this;
                                        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + g + "," + this._config.target + " " + v + "," + this._config.target + " " + b, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(d.SCROLL, (function(e) {
                                            return i._process(e)
                                        })), this.refresh(), this._process()
                                    }
                                    var p = s.prototype;
                                    return p.refresh = function() {
                                        var t = this,
                                            n = this._scrollElement === this._scrollElement.window ? "offset" : T,
                                            i = "auto" === this._config.method ? n : this._config.method,
                                            o = i === T ? this._getScrollTop() : 0;
                                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), e.makeArray(e(this._selector)).map((function(t) {
                                            var n, r = _.getSelectorFromElement(t);
                                            if (r && (n = e(r)[0]), n) {
                                                var s = n.getBoundingClientRect();
                                                if (s.width || s.height) return [e(n)[i]().top + o, r]
                                            }
                                            return null
                                        })).filter((function(e) {
                                            return e
                                        })).sort((function(e, t) {
                                            return e[0] - t[0]
                                        })).forEach((function(e) {
                                            t._offsets.push(e[0]), t._targets.push(e[1])
                                        }))
                                    }, p.dispose = function() {
                                        e.removeData(this._element, n), e(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                                    }, p._getConfig = function(n) {
                                        if ("string" != typeof(n = r({}, l, n)).target) {
                                            var i = e(n.target).attr("id");
                                            i || (i = _.getUID(t), e(n.target).attr("id", i)), n.target = "#" + i
                                        }
                                        return _.typeCheckConfig(t, n, c), n
                                    }, p._getScrollTop = function() {
                                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                                    }, p._getScrollHeight = function() {
                                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                                    }, p._getOffsetHeight = function() {
                                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                                    }, p._process = function() {
                                        var e = this._getScrollTop() + this._config.offset,
                                            t = this._getScrollHeight(),
                                            n = this._config.offset + t - this._getOffsetHeight();
                                        if (this._scrollHeight !== t && this.refresh(), e >= n) {
                                            var i = this._targets[this._targets.length - 1];
                                            this._activeTarget !== i && this._activate(i)
                                        } else {
                                            if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                                            for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && e >= this._offsets[o] && (void 0 === this._offsets[o + 1] || e < this._offsets[o + 1]) && this._activate(this._targets[o])
                                        }
                                    }, p._activate = function(t) {
                                        this._activeTarget = t, this._clear();
                                        var n = this._selector.split(",");
                                        n = n.map((function(e) {
                                            return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                                        }));
                                        var i = e(n.join(","));
                                        i.hasClass("dropdown-item") ? (i.closest(y).find(w).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(h).prev(g + ", " + v).addClass(u), i.parents(h).prev(m).children(g).addClass(u)), e(this._scrollElement).trigger(d.ACTIVATE, {
                                            relatedTarget: t
                                        })
                                    }, p._clear = function() {
                                        e(this._selector).filter(f).removeClass(u)
                                    }, s._jQueryInterface = function(t) {
                                        return this.each((function() {
                                            var i = e(this).data(n);
                                            if (i || (i = new s(this, "object" == a(t) && t), e(this).data(n, i)), "string" == typeof t) {
                                                if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                                                i[t]()
                                            }
                                        }))
                                    }, o(s, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }, {
                                        key: "Default",
                                        get: function() {
                                            return l
                                        }
                                    }]), s
                                }();
                            return e(window).on(d.LOAD_DATA_API, (function() {
                                for (var t = e.makeArray(e(p)), n = t.length; n--;) {
                                    var i = e(t[n]);
                                    x._jQueryInterface.call(i, i.data())
                                }
                            })), e.fn[t] = x._jQueryInterface, e.fn[t].Constructor = x, e.fn[t].noConflict = function() {
                                return e.fn[t] = s, x._jQueryInterface
                            }, x
                        }(t),
                        H = function(e) {
                            var t = "bs.tab",
                                n = "." + t,
                                i = e.fn.tab,
                                r = {
                                    HIDE: "hide" + n,
                                    HIDDEN: "hidden" + n,
                                    SHOW: "show" + n,
                                    SHOWN: "shown" + n,
                                    CLICK_DATA_API: "click.bs.tab.data-api"
                                },
                                s = "active",
                                a = "show",
                                l = ".active",
                                c = "> li > .active",
                                d = function() {
                                    function n(e) {
                                        this._element = e
                                    }
                                    var i = n.prototype;
                                    return i.show = function() {
                                        var t = this;
                                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(s) || e(this._element).hasClass("disabled"))) {
                                            var n, i, o = e(this._element).closest(".nav, .list-group")[0],
                                                a = _.getSelectorFromElement(this._element);
                                            if (o) {
                                                var d = "UL" === o.nodeName ? c : l;
                                                i = (i = e.makeArray(e(o).find(d)))[i.length - 1]
                                            }
                                            var u = e.Event(r.HIDE, {
                                                    relatedTarget: this._element
                                                }),
                                                p = e.Event(r.SHOW, {
                                                    relatedTarget: i
                                                });
                                            if (i && e(i).trigger(u), e(this._element).trigger(p), !p.isDefaultPrevented() && !u.isDefaultPrevented()) {
                                                a && (n = e(a)[0]), this._activate(this._element, o);
                                                var f = function() {
                                                    var n = e.Event(r.HIDDEN, {
                                                            relatedTarget: t._element
                                                        }),
                                                        o = e.Event(r.SHOWN, {
                                                            relatedTarget: i
                                                        });
                                                    e(i).trigger(n), e(t._element).trigger(o)
                                                };
                                                n ? this._activate(n, n.parentNode, f) : f()
                                            }
                                        }
                                    }, i.dispose = function() {
                                        e.removeData(this._element, t), this._element = null
                                    }, i._activate = function(t, n, i) {
                                        var o = this,
                                            r = ("UL" === n.nodeName ? e(n).find(c) : e(n).children(l))[0],
                                            s = i && _.supportsTransitionEnd() && r && e(r).hasClass("fade"),
                                            a = function() {
                                                return o._transitionComplete(t, r, i)
                                            };
                                        r && s ? e(r).one(_.TRANSITION_END, a).emulateTransitionEnd(150) : a()
                                    }, i._transitionComplete = function(t, n, i) {
                                        if (n) {
                                            e(n).removeClass(a + " " + s);
                                            var o = e(n.parentNode).find("> .dropdown-menu .active")[0];
                                            o && e(o).removeClass(s), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                                        }
                                        if (e(t).addClass(s), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), e(t).addClass(a), t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
                                            var r = e(t).closest(".dropdown")[0];
                                            r && e(r).find(".dropdown-toggle").addClass(s), t.setAttribute("aria-expanded", !0)
                                        }
                                        i && i()
                                    }, n._jQueryInterface = function(i) {
                                        return this.each((function() {
                                            var o = e(this),
                                                r = o.data(t);
                                            if (r || (r = new n(this), o.data(t, r)), "string" == typeof i) {
                                                if (void 0 === r[i]) throw new TypeError('No method named "' + i + '"');
                                                r[i]()
                                            }
                                        }))
                                    }, o(n, null, [{
                                        key: "VERSION",
                                        get: function() {
                                            return "4.0.0"
                                        }
                                    }]), n
                                }();
                            return e(document).on(r.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', (function(t) {
                                t.preventDefault(), d._jQueryInterface.call(e(this), "show")
                            })), e.fn.tab = d._jQueryInterface, e.fn.tab.Constructor = d, e.fn.tab.noConflict = function() {
                                return e.fn.tab = i, d._jQueryInterface
                            }, d
                        }(t);
                    ! function(e) {
                        if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                        var t = e.fn.jquery.split(" ")[0].split(".");
                        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
                    }(t), e.Util = _, e.Alert = k, e.Button = E, e.Carousel = A, e.Collapse = D, e.Dropdown = N, e.Modal = I, e.Popover = L, e.Scrollspy = $, e.Tab = H, e.Tooltip = O, Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }, "object" == a(t) ? s(t, n(470), n(410)) : (o = [t, n(470), n(410)], void 0 === (r = "function" == typeof(i = s) ? i.apply(t, o) : i) || (e.exports = r))
            },
            865: (e, t, n) => {
                var i = n(470);
                if (document.getElementById("fullscreen-bg"))
                    if (window.matchMedia("(max-width: 750px)").matches) document.getElementById("fullscreen-bg").innerHTML = "";
                    else {
                        document.getElementById("fullscreen-bg").innerHTML = '<video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" class="lazyload fullscreen-bg__video"><source src="../assets/img/contact-us/wli-business-trip.mp4" type="video/mp4"></video>'
                    }
                document.getElementById("fullscreen-bg") && document.getElementById("copyrightyear1").appendChild(document.createTextNode((new Date).getFullYear())), i(".btncontact").click((function() {
                    i("html, body").animate({
                        scrollTop: i(".contact-form-wrapper").offset().top - 20
                    }, 800)
                }))
            },
            906: (e, t, n) => {
                var i, o, r;

                function s(e) {
                    return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, s(e)
                }! function() {
                    "use strict";
                    o = [n(470)], i = function(e) {
                        var t = window.Slick || {};
                        (t = function() {
                            var t = 0;
                            return function(n, i) {
                                var o, r = this;
                                r.defaults = {
                                    accessibility: !0,
                                    adaptiveHeight: !1,
                                    appendArrows: e(n),
                                    appendDots: e(n),
                                    arrows: !0,
                                    asNavFor: null,
                                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                                    autoplay: !1,
                                    autoplaySpeed: 3e3,
                                    centerMode: !1,
                                    centerPadding: "50px",
                                    cssEase: "ease",
                                    customPaging: function(t, n) {
                                        return e('<button type="button" />').text(n + 1)
                                    },
                                    dots: !1,
                                    dotsClass: "slick-dots",
                                    draggable: !0,
                                    easing: "linear",
                                    edgeFriction: .35,
                                    fade: !1,
                                    focusOnSelect: !1,
                                    focusOnChange: !1,
                                    infinite: !0,
                                    initialSlide: 0,
                                    lazyLoad: "ondemand",
                                    mobileFirst: !1,
                                    pauseOnHover: !0,
                                    pauseOnFocus: !0,
                                    pauseOnDotsHover: !1,
                                    respondTo: "window",
                                    responsive: null,
                                    rows: 1,
                                    rtl: !1,
                                    slide: "",
                                    slidesPerRow: 1,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    speed: 500,
                                    swipe: !0,
                                    swipeToSlide: !1,
                                    touchMove: !0,
                                    touchThreshold: 5,
                                    useCSS: !0,
                                    useTransform: !0,
                                    variableWidth: !1,
                                    vertical: !1,
                                    verticalSwiping: !1,
                                    waitForAnimate: !0,
                                    zIndex: 1e3
                                }, r.initials = {
                                    animating: !1,
                                    dragging: !1,
                                    autoPlayTimer: null,
                                    currentDirection: 0,
                                    currentLeft: null,
                                    currentSlide: 0,
                                    direction: 1,
                                    $dots: null,
                                    listWidth: null,
                                    listHeight: null,
                                    loadIndex: 0,
                                    $nextArrow: null,
                                    $prevArrow: null,
                                    scrolling: !1,
                                    slideCount: null,
                                    slideWidth: null,
                                    $slideTrack: null,
                                    $slides: null,
                                    sliding: !1,
                                    slideOffset: 0,
                                    swipeLeft: null,
                                    swiping: !1,
                                    $list: null,
                                    touchObject: {},
                                    transformsEnabled: !1,
                                    unslicked: !1
                                }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(n), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(n).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = t++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
                            }
                        }()).prototype.activateADA = function() {
                            this.$slideTrack.find(".slick-active").attr({
                                "aria-hidden": "false"
                            }).find("a, input, button, select").attr({
                                tabindex: "0"
                            })
                        }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
                            var o = this;
                            if ("boolean" == typeof n) i = n, n = null;
                            else if (n < 0 || n >= o.slideCount) return !1;
                            o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : !0 === i ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each((function(t, n) {
                                e(n).attr("data-slick-index", t)
                            })), o.$slidesCache = o.$slides, o.reinit()
                        }, t.prototype.animateHeight = function() {
                            var e = this;
                            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                                e.$list.animate({
                                    height: t
                                }, e.options.speed)
                            }
                        }, t.prototype.animateSlide = function(t, n) {
                            var i = {},
                                o = this;
                            o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
                                left: t
                            }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
                                top: t
                            }, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({
                                animStart: o.currentLeft
                            }).animate({
                                animStart: t
                            }, {
                                duration: o.options.speed,
                                easing: o.options.easing,
                                step: function(e) {
                                    e = Math.ceil(e), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
                                },
                                complete: function() {
                                    n && n.call()
                                }
                            })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout((function() {
                                o.disableTransition(), n.call()
                            }), o.options.speed))
                        }, t.prototype.getNavTarget = function() {
                            var t = this,
                                n = t.options.asNavFor;
                            return n && null !== n && (n = e(n).not(t.$slider)), n
                        }, t.prototype.asNavFor = function(t) {
                            var n = this.getNavTarget();
                            null !== n && "object" == s(n) && n.each((function() {
                                var n = e(this).slick("getSlick");
                                n.unslicked || n.slideHandler(t, !0)
                            }))
                        }, t.prototype.applyTransition = function(e) {
                            var t = this,
                                n = {};
                            !1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
                        }, t.prototype.autoPlay = function() {
                            var e = this;
                            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
                        }, t.prototype.autoPlayClear = function() {
                            var e = this;
                            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
                        }, t.prototype.autoPlayIterator = function() {
                            var e = this,
                                t = e.currentSlide + e.options.slidesToScroll;
                            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
                        }, t.prototype.buildArrows = function() {
                            var t = this;
                            !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                                "aria-disabled": "true",
                                tabindex: "-1"
                            }))
                        }, t.prototype.buildDots = function() {
                            var t, n, i = this;
                            if (!0 === i.options.dots) {
                                for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
                                i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
                            }
                        }, t.prototype.buildOut = function() {
                            var t = this;
                            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each((function(t, n) {
                                e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
                            })), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
                        }, t.prototype.buildRows = function() {
                            var e, t, n, i, o, r, s, a = this;
                            if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 1) {
                                for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
                                    var l = document.createElement("div");
                                    for (t = 0; t < a.options.rows; t++) {
                                        var c = document.createElement("div");
                                        for (n = 0; n < a.options.slidesPerRow; n++) {
                                            var d = e * s + (t * a.options.slidesPerRow + n);
                                            r.get(d) && c.appendChild(r.get(d))
                                        }
                                        l.appendChild(c)
                                    }
                                    i.appendChild(l)
                                }
                                a.$slider.empty().append(i), a.$slider.children().children().children().css({
                                    width: 100 / a.options.slidesPerRow + "%",
                                    display: "inline-block"
                                })
                            }
                        }, t.prototype.checkResponsive = function(t, n) {
                            var i, o, r, s = this,
                                a = !1,
                                l = s.$slider.width(),
                                c = window.innerWidth || e(window).width();
                            if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
                                for (i in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
                                null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), a = o), t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
                            }
                        }, t.prototype.changeSlide = function(t, n) {
                            var i, o, r = this,
                                s = e(t.currentTarget);
                            switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), i = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
                                case "previous":
                                    o = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, n);
                                    break;
                                case "next":
                                    o = 0 === i ? r.options.slidesToScroll : i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, n);
                                    break;
                                case "index":
                                    var a = 0 === t.data.index ? 0 : t.data.index || s.index() * r.options.slidesToScroll;
                                    r.slideHandler(r.checkNavigable(a), !1, n), s.children().trigger("focus");
                                    break;
                                default:
                                    return
                            }
                        }, t.prototype.checkNavigable = function(e) {
                            var t, n;
                            if (n = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
                            else
                                for (var i in t) {
                                    if (e < t[i]) {
                                        e = n;
                                        break
                                    }
                                    n = t[i]
                                }
                            return e
                        }, t.prototype.cleanUpEvents = function() {
                            var t = this;
                            t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
                        }, t.prototype.cleanUpSlideEvents = function() {
                            var t = this;
                            t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
                        }, t.prototype.cleanUpRows = function() {
                            var e, t = this;
                            t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
                        }, t.prototype.clickHandler = function(e) {
                            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
                        }, t.prototype.destroy = function(t) {
                            var n = this;
                            n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function() {
                                e(this).attr("style", e(this).data("originalStyling"))
                            })), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
                        }, t.prototype.disableTransition = function(e) {
                            var t = this,
                                n = {};
                            n[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
                        }, t.prototype.fadeSlide = function(e, t) {
                            var n = this;
                            !1 === n.cssTransitions ? (n.$slides.eq(e).css({
                                zIndex: n.options.zIndex
                            }), n.$slides.eq(e).animate({
                                opacity: 1
                            }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
                                opacity: 1,
                                zIndex: n.options.zIndex
                            }), t && setTimeout((function() {
                                n.disableTransition(e), t.call()
                            }), n.options.speed))
                        }, t.prototype.fadeSlideOut = function(e) {
                            var t = this;
                            !1 === t.cssTransitions ? t.$slides.eq(e).animate({
                                opacity: 0,
                                zIndex: t.options.zIndex - 2
                            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                                opacity: 0,
                                zIndex: t.options.zIndex - 2
                            }))
                        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
                            var t = this;
                            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
                        }, t.prototype.focusHandler = function() {
                            var t = this;
                            t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function(n) {
                                n.stopImmediatePropagation();
                                var i = e(this);
                                setTimeout((function() {
                                    t.options.pauseOnFocus && (t.focussed = i.is(":focus"), t.autoPlay())
                                }), 0)
                            }))
                        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
                            return this.currentSlide
                        }, t.prototype.getDotCount = function() {
                            var e = this,
                                t = 0,
                                n = 0,
                                i = 0;
                            if (!0 === e.options.infinite)
                                if (e.slideCount <= e.options.slidesToShow) ++i;
                                else
                                    for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                            else if (!0 === e.options.centerMode) i = e.slideCount;
                            else if (e.options.asNavFor)
                                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                            else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
                            return i - 1
                        }, t.prototype.getLeft = function(e) {
                            var t, n, i, o, r = this,
                                s = 0;
                            return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
                        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
                            return this.options[e]
                        }, t.prototype.getNavigableIndexes = function() {
                            var e, t = this,
                                n = 0,
                                i = 0,
                                o = [];
                            for (!1 === t.options.infinite ? e = t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                            return o
                        }, t.prototype.getSlick = function() {
                            return this
                        }, t.prototype.getSlideCount = function() {
                            var t, n, i = this;
                            return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each((function(o, r) {
                                if (r.offsetLeft - n + e(r).outerWidth() / 2 > -1 * i.swipeLeft) return t = r, !1
                            })), Math.abs(e(t).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
                        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
                            this.changeSlide({
                                data: {
                                    message: "index",
                                    index: parseInt(e)
                                }
                            }, t)
                        }, t.prototype.init = function(t) {
                            var n = this;
                            e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
                        }, t.prototype.initADA = function() {
                            var t = this,
                                n = Math.ceil(t.slideCount / t.options.slidesToShow),
                                i = t.getNavigableIndexes().filter((function(e) {
                                    return e >= 0 && e < t.slideCount
                                }));
                            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                                "aria-hidden": "true",
                                tabindex: "-1"
                            }).find("a, input, button, select").attr({
                                tabindex: "-1"
                            }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each((function(n) {
                                var o = i.indexOf(n);
                                e(this).attr({
                                    role: "tabpanel",
                                    id: "slick-slide" + t.instanceUid + n,
                                    tabindex: -1
                                }), -1 !== o && e(this).attr({
                                    "aria-describedby": "slick-slide-control" + t.instanceUid + o
                                })
                            })), t.$dots.attr("role", "tablist").find("li").each((function(o) {
                                var r = i[o];
                                e(this).attr({
                                    role: "presentation"
                                }), e(this).find("button").first().attr({
                                    role: "tab",
                                    id: "slick-slide-control" + t.instanceUid + o,
                                    "aria-controls": "slick-slide" + t.instanceUid + r,
                                    "aria-label": o + 1 + " of " + n,
                                    "aria-selected": null,
                                    tabindex: "-1"
                                })
                            })).eq(t.currentSlide).find("button").attr({
                                "aria-selected": "true",
                                tabindex: "0"
                            }).end());
                            for (var o = t.currentSlide, r = o + t.options.slidesToShow; o < r; o++) t.$slides.eq(o).attr("tabindex", 0);
                            t.activateADA()
                        }, t.prototype.initArrowEvents = function() {
                            var e = this;
                            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                                message: "previous"
                            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                                message: "next"
                            }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
                        }, t.prototype.initDotEvents = function() {
                            var t = this;
                            !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {
                                message: "index"
                            }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
                        }, t.prototype.initSlideEvents = function() {
                            var t = this;
                            t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
                        }, t.prototype.initializeEvents = function() {
                            var t = this;
                            t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
                                action: "start"
                            }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
                                action: "move"
                            }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
                                action: "end"
                            }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
                                action: "end"
                            }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
                        }, t.prototype.initUI = function() {
                            var e = this;
                            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
                        }, t.prototype.keyHandler = function(e) {
                            var t = this;
                            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
                                data: {
                                    message: !0 === t.options.rtl ? "next" : "previous"
                                }
                            }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
                                data: {
                                    message: !0 === t.options.rtl ? "previous" : "next"
                                }
                            }))
                        }, t.prototype.lazyLoad = function() {
                            function t(t) {
                                e("img[data-lazy]", t).each((function() {
                                    var t = e(this),
                                        n = e(this).attr("data-lazy"),
                                        i = e(this).attr("data-srcset"),
                                        o = e(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                                        s = document.createElement("img");
                                    s.onload = function() {
                                        t.animate({
                                            opacity: 0
                                        }, 100, (function() {
                                            i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).animate({
                                                opacity: 1
                                            }, 200, (function() {
                                                t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                            })), r.$slider.trigger("lazyLoaded", [r, t, n])
                                        }))
                                    }, s.onerror = function() {
                                        t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, n])
                                    }, s.src = n
                                }))
                            }
                            var n, i, o, r = this;
                            if (!0 === r.options.centerMode ? !0 === r.options.infinite ? o = (i = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), o = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, o = Math.ceil(i + r.options.slidesToShow), !0 === r.options.fade && (i > 0 && i--, o <= r.slideCount && o++)), n = r.$slider.find(".slick-slide").slice(i, o), "anticipated" === r.options.lazyLoad)
                                for (var s = i - 1, a = o, l = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) s < 0 && (s = r.slideCount - 1), n = (n = n.add(l.eq(s))).add(l.eq(a)), s--, a++;
                            t(n), r.slideCount <= r.options.slidesToShow ? t(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? t(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && t(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
                        }, t.prototype.loadSlider = function() {
                            var e = this;
                            e.setPosition(), e.$slideTrack.css({
                                opacity: 1
                            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
                        }, t.prototype.next = t.prototype.slickNext = function() {
                            this.changeSlide({
                                data: {
                                    message: "next"
                                }
                            })
                        }, t.prototype.orientationChange = function() {
                            var e = this;
                            e.checkResponsive(), e.setPosition()
                        }, t.prototype.pause = t.prototype.slickPause = function() {
                            var e = this;
                            e.autoPlayClear(), e.paused = !0
                        }, t.prototype.play = t.prototype.slickPlay = function() {
                            var e = this;
                            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
                        }, t.prototype.postSlide = function(t) {
                            var n = this;
                            n.unslicked || (n.$slider.trigger("afterChange", [n, t]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange && e(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()))
                        }, t.prototype.prev = t.prototype.slickPrev = function() {
                            this.changeSlide({
                                data: {
                                    message: "previous"
                                }
                            })
                        }, t.prototype.preventDefault = function(e) {
                            e.preventDefault()
                        }, t.prototype.progressiveLazyLoad = function(t) {
                            t = t || 1;
                            var n, i, o, r, s, a = this,
                                l = e("img[data-lazy]", a.$slider);
                            l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
                                o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad()
                            }, s.onerror = function() {
                                t < 3 ? setTimeout((function() {
                                    a.progressiveLazyLoad(t + 1)
                                }), 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad())
                            }, s.src = i) : a.$slider.trigger("allImagesLoaded", [a])
                        }, t.prototype.refresh = function(t) {
                            var n, i, o = this;
                            i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
                                currentSlide: n
                            }), o.init(), t || o.changeSlide({
                                data: {
                                    message: "index",
                                    index: n
                                }
                            }, !1)
                        }, t.prototype.registerBreakpoints = function() {
                            var t, n, i, o = this,
                                r = o.options.responsive || null;
                            if ("array" === e.type(r) && r.length) {
                                for (t in o.respondTo = o.options.respondTo || "window", r)
                                    if (i = o.breakpoints.length - 1, r.hasOwnProperty(t)) {
                                        for (n = r[t].breakpoint; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
                                        o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
                                    }
                                o.breakpoints.sort((function(e, t) {
                                    return o.options.mobileFirst ? e - t : t - e
                                }))
                            }
                        }, t.prototype.reinit = function() {
                            var t = this;
                            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
                        }, t.prototype.resize = function() {
                            var t = this;
                            e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout((function() {
                                t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
                            }), 50))
                        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
                            var i = this;
                            if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : i.slideCount - 1 : !0 === t ? --e : e, i.slideCount < 1 || e < 0 || e > i.slideCount - 1) return !1;
                            i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
                        }, t.prototype.setCSS = function(e) {
                            var t, n, i = this,
                                o = {};
                            !0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
                        }, t.prototype.setDimensions = function() {
                            var e = this;
                            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                                padding: "0px " + e.options.centerPadding
                            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                                padding: e.options.centerPadding + " 0px"
                            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
                            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
                            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
                        }, t.prototype.setFade = function() {
                            var t, n = this;
                            n.$slides.each((function(i, o) {
                                t = n.slideWidth * i * -1, !0 === n.options.rtl ? e(o).css({
                                    position: "relative",
                                    right: t,
                                    top: 0,
                                    zIndex: n.options.zIndex - 2,
                                    opacity: 0
                                }) : e(o).css({
                                    position: "relative",
                                    left: t,
                                    top: 0,
                                    zIndex: n.options.zIndex - 2,
                                    opacity: 0
                                })
                            })), n.$slides.eq(n.currentSlide).css({
                                zIndex: n.options.zIndex - 1,
                                opacity: 1
                            })
                        }, t.prototype.setHeight = function() {
                            var e = this;
                            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                                e.$list.css("height", t)
                            }
                        }, t.prototype.setOption = t.prototype.slickSetOption = function() {
                            var t, n, i, o, r, s = this,
                                a = !1;
                            if ("object" === e.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[i] = o;
                            else if ("multiple" === r) e.each(i, (function(e, t) {
                                s.options[e] = t
                            }));
                            else if ("responsive" === r)
                                for (n in o)
                                    if ("array" !== e.type(s.options.responsive)) s.options.responsive = [o[n]];
                                    else {
                                        for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === o[n].breakpoint && s.options.responsive.splice(t, 1), t--;
                                        s.options.responsive.push(o[n])
                                    }
                            a && (s.unload(), s.reinit())
                        }, t.prototype.setPosition = function() {
                            var e = this;
                            e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
                        }, t.prototype.setProps = function() {
                            var e = this,
                                t = document.body.style;
                            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
                        }, t.prototype.setSlideClasses = function(e) {
                            var t, n, i, o, r = this;
                            if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
                                var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
                                t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
                            } else e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                            "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
                        }, t.prototype.setupInfinite = function() {
                            var t, n, i, o = this;
                            if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
                                for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                                for (t = 0; t < i + o.slideCount; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                                o.$slideTrack.find(".slick-cloned").find("[id]").each((function() {
                                    e(this).attr("id", "")
                                }))
                            }
                        }, t.prototype.interrupt = function(e) {
                            var t = this;
                            e || t.autoPlay(), t.interrupted = e
                        }, t.prototype.selectHandler = function(t) {
                            var n = this,
                                i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
                                o = parseInt(i.attr("data-slick-index"));
                            o || (o = 0), n.slideCount <= n.options.slidesToShow ? n.slideHandler(o, !1, !0) : n.slideHandler(o)
                        }, t.prototype.slideHandler = function(e, t, n) {
                            var i, o, r, s, a, l = null,
                                c = this;
                            if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e))
                                if (!1 === t && c.asNavFor(e), i = e, l = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, (function() {
                                    c.postSlide(i)
                                })) : c.postSlide(i));
                                else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, (function() {
                                c.postSlide(i)
                            })) : c.postSlide(i));
                            else {
                                if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, (function() {
                                    c.postSlide(o)
                                }))) : c.postSlide(o), void c.animateHeight();
                                !0 !== n ? c.animateSlide(l, (function() {
                                    c.postSlide(o)
                                })) : c.postSlide(o)
                            }
                        }, t.prototype.startLoad = function() {
                            var e = this;
                            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
                        }, t.prototype.swipeDirection = function() {
                            var e, t, n, i, o = this;
                            return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 || i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
                        }, t.prototype.swipeEnd = function(e) {
                            var t, n, i = this;
                            if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
                            if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
                            if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
                                switch (n = i.swipeDirection()) {
                                    case "left":
                                    case "down":
                                        t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                                        break;
                                    case "right":
                                    case "up":
                                        t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
                                }
                                "vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
                            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
                        }, t.prototype.swipeHandler = function(e) {
                            var t = this;
                            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                                case "start":
                                    t.swipeStart(e);
                                    break;
                                case "move":
                                    t.swipeMove(e);
                                    break;
                                case "end":
                                    t.swipeEnd(e)
                            }
                        }, t.prototype.swipeMove = function(e) {
                            var t, n, i, o, r, s, a = this;
                            return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
                        }, t.prototype.swipeStart = function(e) {
                            var t, n = this;
                            if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return n.touchObject = {}, !1;
                            void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, n.dragging = !0
                        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
                            var e = this;
                            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
                        }, t.prototype.unload = function() {
                            var t = this;
                            e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
                        }, t.prototype.unslick = function(e) {
                            var t = this;
                            t.$slider.trigger("unslick", [t, e]), t.destroy()
                        }, t.prototype.updateArrows = function() {
                            var e = this;
                            Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode || e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode) && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
                        }, t.prototype.updateDots = function() {
                            var e = this;
                            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
                        }, t.prototype.visibility = function() {
                            var e = this;
                            e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
                        }, e.fn.slick = function() {
                            var e, n, i = this,
                                o = arguments[0],
                                r = Array.prototype.slice.call(arguments, 1),
                                a = i.length;
                            for (e = 0; e < a; e++)
                                if ("object" == s(o) || void 0 === o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), void 0 !== n) return n;
                            return i
                        }
                    }, void 0 === (r = "function" == typeof i ? i.apply(t, o) : i) || (e.exports = r)
                }()
            },
            950: (e, t, n) => {
                var i, o = n(470);
                (i = o).isScrollToFixed = function(e) {
                    return !!i(e).data("ScrollToFixed")
                }, i.ScrollToFixed = function(e, t) {
                    var n = this;
                    n.$el = i(e), n.el = e, n.$el.data("ScrollToFixed", n);
                    var o, r, s, a, l = !1,
                        c = n.$el,
                        d = 0,
                        u = 0,
                        p = -1,
                        f = -1,
                        h = null;

                    function g() {
                        var e = n.options.limit;
                        return e ? "function" == typeof e ? e.apply(c) : e : 0
                    }

                    function m() {
                        return "fixed" === o
                    }

                    function v() {
                        return "absolute" === o
                    }

                    function y() {
                        return !(m() || v())
                    }

                    function b() {
                        if (!m()) {
                            var e = c[0].getBoundingClientRect();
                            h.css({
                                display: c.css("display"),
                                width: e.width,
                                height: e.height,
                                float: c.css("float")
                            }), cssOptions = {
                                "z-index": n.options.zIndex,
                                position: "fixed",
                                top: -1 == n.options.bottom ? S() : "",
                                bottom: -1 == n.options.bottom ? "" : n.options.bottom,
                                "margin-left": "0px"
                            }, n.options.dontSetWidth || (cssOptions.width = c.css("width")), c.css(cssOptions), c.addClass(n.options.baseClassName), n.options.className && c.addClass(n.options.className), o = "fixed"
                        }
                    }

                    function w() {
                        var e = g(),
                            t = u;
                        n.options.removeOffsets && (t = "", e -= d), cssOptions = {
                            position: "absolute",
                            top: e,
                            left: t,
                            "margin-left": "0px",
                            bottom: ""
                        }, n.options.dontSetWidth || (cssOptions.width = c.css("width")), c.css(cssOptions), o = "absolute"
                    }

                    function T() {
                        y() || (f = -1, h.css("display", "none"), c.css({
                            "z-index": a,
                            width: "",
                            position: r,
                            left: "",
                            top: s,
                            "margin-left": ""
                        }), c.removeClass("scroll-to-fixed-fixed"), n.options.className && c.removeClass(n.options.className), o = null)
                    }

                    function x(e) {
                        e != f && (c.css("left", u - e), f = e)
                    }

                    function S() {
                        var e = n.options.marginTop;
                        return e ? "function" == typeof e ? e.apply(c) : e : 0
                    }

                    function C() {
                        if (i.isScrollToFixed(c) && !c.is(":hidden")) {
                            var e = l,
                                t = y();
                            l ? y() && (d = c.offset().top, u = c.offset().left) : (c.trigger("preUnfixed.ScrollToFixed"), T(), c.trigger("unfixed.ScrollToFixed"), f = -1, d = c.offset().top, u = c.offset().left, n.options.offsets && (u += c.offset().left - c.position().left), -1 == p && (p = u), o = c.css("position"), l = !0, -1 != n.options.bottom && (c.trigger("preFixed.ScrollToFixed"), b(), c.trigger("fixed.ScrollToFixed")));
                            var s = i(window).scrollLeft(),
                                a = i(window).scrollTop(),
                                h = g();
                            n.options.minWidth && i(window).width() < n.options.minWidth || n.options.maxWidth && i(window).width() > n.options.maxWidth ? y() && e || (_(), c.trigger("preUnfixed.ScrollToFixed"), T(), c.trigger("unfixed.ScrollToFixed")) : -1 == n.options.bottom ? h > 0 && a >= h - S() ? t || v() && e || (_(), c.trigger("preAbsolute.ScrollToFixed"), w(), c.trigger("unfixed.ScrollToFixed")) : a >= d - S() ? (m() && e || (_(), c.trigger("preFixed.ScrollToFixed"), b(), f = -1, c.trigger("fixed.ScrollToFixed")), x(s)) : y() && e || (_(), c.trigger("preUnfixed.ScrollToFixed"), T(), c.trigger("unfixed.ScrollToFixed")) : h > 0 ? a + i(window).height() - c.outerHeight(!0) >= h - (S() || -(n.options.bottom ? n.options.bottom : 0)) ? m() && (_(), c.trigger("preUnfixed.ScrollToFixed"), "absolute" === r ? w() : T(), c.trigger("unfixed.ScrollToFixed")) : (m() || (_(), c.trigger("preFixed.ScrollToFixed"), b()), x(s), c.trigger("fixed.ScrollToFixed")) : x(s)
                        }
                    }

                    function _() {
                        var e = c.css("position");
                        "absolute" == e ? c.trigger("postAbsolute.ScrollToFixed") : "fixed" == e ? c.trigger("postFixed.ScrollToFixed") : c.trigger("postUnfixed.ScrollToFixed")
                    }
                    var k = function(e) {
                            c.is(":visible") ? (l = !1, C()) : T()
                        },
                        E = function(e) {
                            window.requestAnimationFrame ? requestAnimationFrame(C) : C()
                        };
                    n.init = function() {
                        n.options = i.extend({}, i.ScrollToFixed.defaultOptions, t), a = c.css("z-index"), n.$el.css("z-index", n.options.zIndex), h = i("<div />"), o = c.css("position"), r = c.css("position"), c.css("float"), s = c.css("top"), y() && n.$el.after(h), i(window).bind("resize.ScrollToFixed", k), i(window).bind("scroll.ScrollToFixed", E), "ontouchmove" in window && i(window).bind("touchmove.ScrollToFixed", C), n.options.preFixed && c.bind("preFixed.ScrollToFixed", n.options.preFixed), n.options.postFixed && c.bind("postFixed.ScrollToFixed", n.options.postFixed), n.options.preUnfixed && c.bind("preUnfixed.ScrollToFixed", n.options.preUnfixed), n.options.postUnfixed && c.bind("postUnfixed.ScrollToFixed", n.options.postUnfixed), n.options.preAbsolute && c.bind("preAbsolute.ScrollToFixed", n.options.preAbsolute), n.options.postAbsolute && c.bind("postAbsolute.ScrollToFixed", n.options.postAbsolute), n.options.fixed && c.bind("fixed.ScrollToFixed", n.options.fixed), n.options.unfixed && c.bind("unfixed.ScrollToFixed", n.options.unfixed), n.options.spacerClass && h.addClass(n.options.spacerClass), c.bind("resize.ScrollToFixed", (function() {
                            h.height(c.height())
                        })), c.bind("scroll.ScrollToFixed", (function() {
                            c.trigger("preUnfixed.ScrollToFixed"), T(), c.trigger("unfixed.ScrollToFixed"), C()
                        })), c.bind("detach.ScrollToFixed", (function(e) {
                            ! function(e) {
                                (e = e || window.event).preventDefault && e.preventDefault(), e.returnValue = !1
                            }(e), c.trigger("preUnfixed.ScrollToFixed"), T(), c.trigger("unfixed.ScrollToFixed"), i(window).unbind("resize.ScrollToFixed", k), i(window).unbind("scroll.ScrollToFixed", E), c.unbind(".ScrollToFixed"), h.remove(), n.$el.removeData("ScrollToFixed")
                        })), k()
                    }, n.init()
                }, i.ScrollToFixed.defaultOptions = {
                    marginTop: 0,
                    limit: 0,
                    bottom: -1,
                    zIndex: 1e3,
                    baseClassName: "scroll-to-fixed-fixed"
                }, i.fn.scrollToFixed = function(e) {
                    return this.each((function() {
                        new i.ScrollToFixed(this, e)
                    }))
                }
            }
        },
        t = {};

    function n(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var r = t[i] = {
            id: i,
            loaded: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n), r.loaded = !0, r.exports
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t
    }, n.d = (e, t) => {
        for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.nmd = e => (e.paths = [], e.children || (e.children = []), e), (() => {
        "use strict";
        n(470), n(410), n(712), n(654), n(394), n(906), n(96), n(950), n(583), n(865)
    })()
})();
//# sourceMappingURL=main.js.map