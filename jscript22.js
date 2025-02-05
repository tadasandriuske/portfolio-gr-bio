/*! dialogs-manager v4.9.1 | (c) Kobi Zaltzberg | https://github.com/kobizz/dialogs-manager/blob/master/LICENSE.txt
 2023-01-11 16:45 */
! function(p, t) {
    "use strict";
    var y = {
        widgetsTypes: {},
        createWidgetType: function(t, e, n) {
            n = n || this.Widget;

            function i() {
                n.apply(this, arguments)
            }
            var o = i.prototype = new n(t);
            return o.types = o.types.concat([t]), p.extend(o, e), (o.constructor = i).extend = function(t, e) {
                return y.createWidgetType(t, e, i)
            }, i
        },
        addWidgetType: function(t, e, n) {
            return e && e.prototype instanceof this.Widget ? this.widgetsTypes[t] = e : this.widgetsTypes[t] = this.createWidgetType(t, e, n)
        },
        getWidgetType: function(t) {
            return this.widgetsTypes[t]
        }
    };
    y.Instance = function() {
        var n = this,
            e = {};
        this.createWidget = function(t, e) {
            t = new(y.getWidgetType(t))(t);
            return t.init(n, e = e || {}), t
        }, this.getSettings = function(t) {
            return t ? e[t] : Object.create(e)
        }, this.init = function(t) {
            return p.extend(e, {
                classPrefix: "dialog",
                effects: {
                    show: "fadeIn",
                    hide: "fadeOut"
                }
            }, t), p("body"), n
        }, n.init()
    }, y.Widget = function(n) {
        function e(t, e) {
            var t = a.effects[t],
                n = d.widget;
            if (p.isFunction(t)) t.apply(n, e);
            else {
                if (!n[t]) throw "Reference Error: The effect " + t + " not found";
                n[t].apply(n, e)
            }
        }

        function i(t) {
            if (!f(t)) {
                if (a.hide.onClick) {
                    if (p(t.target).closest(a.selectors.preventClose).length) return
                } else if (t.target !== this) return;
                c.hide()
            }
        }

        function o(t) {
            f(t) || p(t.target).closest(d.widget).length || g(t) || c.hide()
        }

        function s(t, e) {
            t = p.extend(!0, {}, t.getSettings()), a = {
                headerMessage: "",
                message: "",
                effects: t.effects,
                classes: {
                    globalPrefix: t.classPrefix,
                    prefix: t.classPrefix + "-" + n,
                    preventScroll: t.classPrefix + "-prevent-scroll"
                },
                selectors: {
                    preventClose: "." + t.classPrefix + "-prevent-close"
                },
                container: "body",
                preventScroll: !1,
                iframe: null,
                closeButton: !1,
                closeButtonOptions: {
                    iconClass: t.classPrefix + "-close-button-icon",
                    attributes: {
                        role: "button",
                        tabindex: 0,
                        "aria-label": "Close",
                        href: "#"
                    },
                    iconElement: "<i>"
                },
                position: {
                    element: "widget",
                    my: "center",
                    at: "center",
                    enable: !0,
                    autoRefresh: !1
                },
                hide: {
                    auto: !1,
                    autoDelay: 5e3,
                    onClick: !1,
                    onOutsideClick: !0,
                    onOutsideContextMenu: !1,
                    onBackgroundClick: !0,
                    onEscKeyPress: !0,
                    ignore: ""
                }
            }, p.extend(!0, a, c.getDefaultSettings(), e), p.each(a, function(t) {
                t = t.match(/^on([A-Z].*)/);
                t && (t = t[1].charAt(0).toLowerCase() + t[1].slice(1), c.on(t, this))
            })
        }

        function r(t) {
            27 === t.which && c.hide()
        }

        function t() {
            var t = [d.window];
            d.iframe && t.push(jQuery(d.iframe[0].contentWindow)), t.forEach(function(t) {
                a.hide.onEscKeyPress && t.off("keyup", r), a.hide.onOutsideClick && t[0].removeEventListener("click", o, !0), a.hide.onOutsideContextMenu && t[0].removeEventListener("contextmenu", o, !0), a.position.autoRefresh && t.off("resize", c.refreshPosition)
            }), (a.hide.onClick || a.hide.onBackgroundClick) && d.widget.off("click", i)
        }
        var c = this,
            a = {},
            u = {},
            d = {},
            l = 0,
            h = ["refreshPosition"],
            g = function(t) {
                return !!a.hide.ignore && !!p(t.target).closest(a.hide.ignore).length
            },
            f = function(t) {
                return "click" === t.type && 2 === t.button
            };
        this.addElement = function(t, e, n) {
            e = d[t] = p(e || "<div>"), t = t.replace(/([a-z])([A-Z])/g, function() {
                return arguments[1] + "-" + arguments[2].toLowerCase()
            });
            return n = n ? n + " " : "", n = (n += a.classes.globalPrefix + "-" + t) + (" " + a.classes.prefix + "-" + t), e.addClass(n), e
        }, this.destroy = function() {
            return t(), d.widget.remove(), c.trigger("destroy"), c
        }, this.getElements = function(t) {
            return t ? d[t] : d
        }, this.getSettings = function(t) {
            var e = Object.create(a);
            return t ? e[t] : e
        }, this.hide = function() {
            if (c.isVisible()) return clearTimeout(l), e("hide", arguments), t(), a.preventScroll && c.getElements("body").removeClass(a.classes.preventScroll), c.trigger("hide"), c
        }, this.init = function(t, e) {
            var n, i, o;
            if (t instanceof y.Instance) return n = h.concat(c.getClosureMethods()), p.each(n, function() {
                var t = c[this];
                c[this] = function() {
                    t.apply(c, arguments)
                }
            }), c.trigger("init", e), s(t, e), c.addElement("widget"), c.addElement("header"), c.addElement("message"), c.addElement("window", window), c.addElement("body", document.body), c.addElement("container", a.container), a.iframe && c.addElement("iframe", a.iframe), a.closeButton && (a.closeButtonClass && (a.closeButtonOptions.iconClass = a.closeButtonClass), n = p("<a>", a.closeButtonOptions.attributes), i = p(a.closeButtonOptions.iconElement).addClass(a.closeButtonOptions.iconClass), n.append(i), c.addElement("closeButton", n)), (i = c.getSettings("id")) && c.setID(i), o = [], p.each(c.types, function() {
                o.push(a.classes.globalPrefix + "-type-" + this)
            }), o.push(c.getSettings("className")), d.widget.addClass(o.join(" ")).attr({
                "aria-modal": !0,
                role: "document",
                tabindex: 0
            }), c.buildWidget(), c.attachEvents(), c.trigger("ready"), c;
            throw "The " + c.widgetName + " must to be initialized from an instance of DialogsManager.Instance"
        }, this.isVisible = function() {
            return d.widget.is(":visible")
        }, this.on = function(t, e) {
            return "object" == typeof t ? p.each(t, function(t) {
                c.on(t, this)
            }) : t.split(" ").forEach(function(t) {
                u[t] || (u[t] = []), u[t].push(e)
            }), c
        }, this.off = function(t, e) {
            return u[t] && (e ? -1 !== (e = u[t].indexOf(e)) && u[t].splice(e, 1) : delete u[t]), c
        }, this.refreshPosition = function() {
            var t, e, n, i, o, s, r;
            a.position.enable && (t = p.extend({}, a.position), d[t.of] && (t.of = d[t.of]), t.of || (t.of = window), a.iframe && (e = t).my && (n = /([+-]\d+)?$/, i = d.iframe.offset(), o = d.iframe[0].contentWindow, s = e.my.split(" "), r = [], 1 === s.length && (/left|right/.test(s[0]) ? s.push("center") : s.unshift("center")), s.forEach(function(t, e) {
                t = t.replace(n, function(t) {
                    return t = +t || 0, t = 0 <= (t += e ? i.top - o.scrollY : i.left - o.scrollX) ? "+" + t : t
                });
                r.push(t)
            }), e.my = r.join(" ")), d[t.element].position(t))
        }, this.setID = function(t) {
            return d.widget.attr("id", t), c
        }, this.setHeaderMessage = function(t) {
            return c.getElements("header").html(t), c
        }, this.setMessage = function(t) {
            return d.message.html(t), c
        }, this.setSettings = function(t, e) {
            return jQuery.isPlainObject(e) ? p.extend(!0, a[t], e) : a[t] = e, c
        }, this.show = function() {
            var t;
            return clearTimeout(l), d.widget.appendTo(d.container).hide(), e("show", arguments), c.refreshPosition(), a.hide.auto && (l = setTimeout(c.hide, a.hide.autoDelay)), t = [d.window], d.iframe && t.push(jQuery(d.iframe[0].contentWindow)), t.forEach(function(t) {
                a.hide.onEscKeyPress && t.on("keyup", r), a.hide.onOutsideClick && t[0].addEventListener("click", o, !0), a.hide.onOutsideContextMenu && t[0].addEventListener("contextmenu", o, !0), a.position.autoRefresh && t.on("resize", c.refreshPosition)
            }), (a.hide.onClick || a.hide.onBackgroundClick) && d.widget.on("click", i), a.preventScroll && c.getElements("body").addClass(a.classes.preventScroll), c.trigger("show"), c
        }, this.trigger = function(t, n) {
            var e = "on" + t[0].toUpperCase() + t.slice(1),
                e = (c[e] && c[e](n), u[t]);
            if (e) return p.each(e, function(t, e) {
                e.call(c, n)
            }), c
        }
    }, y.Widget.prototype.types = [], y.Widget.prototype.buildWidget = function() {
        var t = this.getElements(),
            e = this.getSettings();
        t.widget.append(t.header, t.message), this.setHeaderMessage(e.headerMessage), this.setMessage(e.message), this.getSettings("closeButton") && t.widget.prepend(t.closeButton)
    }, y.Widget.prototype.attachEvents = function() {
        var e = this;
        e.getSettings("closeButton") && e.getElements("closeButton").on("click", function(t) {
            t.preventDefault(), e.hide()
        })
    }, y.Widget.prototype.getDefaultSettings = function() {
        return {}
    }, y.Widget.prototype.getClosureMethods = function() {
        return []
    }, y.Widget.prototype.onHide = function() {}, y.Widget.prototype.onShow = function() {}, y.Widget.prototype.onInit = function() {}, y.Widget.prototype.onReady = function() {}, y.widgetsTypes.simple = y.Widget, y.addWidgetType("buttons", {
        activeKeyUp: function(t) {
            9 === t.which && t.preventDefault(), this.hotKeys[t.which] && this.hotKeys[t.which](this)
        },
        activeKeyDown: function(t) {
            var e, n;
            this.focusedButton && 9 === t.which && (t.preventDefault(), e = this.focusedButton.index(), t.shiftKey ? (n = e - 1) < 0 && (n = this.buttons.length - 1) : (n = e + 1) >= this.buttons.length && (n = 0), this.focusedButton = this.buttons[n].focus())
        },
        addButton: function(t) {
            function e() {
                i.hide.onButtonClick && n.hide(), p.isFunction(t.callback) && t.callback.call(this, n)
            }
            var n = this,
                i = n.getSettings(),
                o = jQuery.extend(i.button, t),
                s = t.classes ? t.classes + " " : "",
                o = (s += i.classes.globalPrefix + "-button", n.addElement(t.name, p("<" + o.tag + ">").html(t.text), s));
            n.buttons.push(o);
            return o.on("click", e), t.hotKey && (this.hotKeys[t.hotKey] = e), this.getElements("buttonsWrapper").append(o), t.focus && (this.focusedButton = o), n
        },
        bindHotKeys: function() {
            this.getElements("window").on({
                keyup: this.activeKeyUp,
                keydown: this.activeKeyDown
            })
        },
        buildWidget: function() {
            y.Widget.prototype.buildWidget.apply(this, arguments);
            var t = this.addElement("buttonsWrapper");
            this.getElements("widget").append(t)
        },
        getClosureMethods: function() {
            return ["activeKeyUp", "activeKeyDown"]
        },
        getDefaultSettings: function() {
            return {
                hide: {
                    onButtonClick: !0
                },
                button: {
                    tag: "button"
                }
            }
        },
        onHide: function() {
            this.unbindHotKeys()
        },
        onInit: function() {
            this.buttons = [], this.hotKeys = {}, this.focusedButton = null
        },
        onShow: function() {
            this.bindHotKeys(), this.focusedButton || (this.focusedButton = this.buttons[0]), this.focusedButton && this.focusedButton.focus()
        },
        unbindHotKeys: function() {
            this.getElements("window").off({
                keyup: this.activeKeyUp,
                keydown: this.activeKeyDown
            })
        }
    }), y.addWidgetType("lightbox", y.getWidgetType("buttons").extend("lightbox", {
        getDefaultSettings: function() {
            var t = y.getWidgetType("buttons").prototype.getDefaultSettings.apply(this, arguments);
            return p.extend(!0, t, {
                contentWidth: "auto",
                contentHeight: "auto",
                position: {
                    element: "widgetContent",
                    of: "widget",
                    autoRefresh: !0
                }
            })
        },
        buildWidget: function() {
            y.getWidgetType("buttons").prototype.buildWidget.apply(this, arguments);
            var t = this.addElement("widgetContent"),
                e = this.getElements();
            t.append(e.header, e.message, e.buttonsWrapper), e.widget.html(t), e.closeButton && t.prepend(e.closeButton)
        },
        onReady: function() {
            var t = this.getElements(),
                e = this.getSettings();
            "auto" !== e.contentWidth && t.message.width(e.contentWidth), "auto" !== e.contentHeight && t.message.height(e.contentHeight)
        }
    })), y.addWidgetType("confirm", y.getWidgetType("lightbox").extend("confirm", {
        onReady: function() {
            y.getWidgetType("lightbox").prototype.onReady.apply(this, arguments);
            var t = this.getSettings("strings"),
                e = "cancel" === this.getSettings("defaultOption");
            this.addButton({
                name: "cancel",
                text: t.cancel,
                callback: function(t) {
                    t.trigger("cancel")
                },
                focus: e
            }), this.addButton({
                name: "ok",
                text: t.confirm,
                callback: function(t) {
                    t.trigger("confirm")
                },
                focus: !e
            })
        },
        getDefaultSettings: function() {
            var t = y.getWidgetType("lightbox").prototype.getDefaultSettings.apply(this, arguments);
            return t.strings = {
                confirm: "OK",
                cancel: "Cancel"
            }, t.defaultOption = "cancel", t
        }
    })), y.addWidgetType("alert", y.getWidgetType("lightbox").extend("alert", {
        onReady: function() {
            y.getWidgetType("lightbox").prototype.onReady.apply(this, arguments);
            var t = this.getSettings("strings");
            this.addButton({
                name: "ok",
                text: t.confirm,
                callback: function(t) {
                    t.trigger("confirm")
                }
            })
        },
        getDefaultSettings: function() {
            var t = y.getWidgetType("lightbox").prototype.getDefaultSettings.apply(this, arguments);
            return t.strings = {
                confirm: "OK"
            }, t
        }
    })), t.DialogsManager = y
}("undefined" != typeof jQuery ? jQuery : "function" == typeof require && require("jquery"), "undefined" != typeof module && void 0 !== module.exports ? module.exports : window);