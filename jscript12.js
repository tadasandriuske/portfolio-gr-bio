/* @license ! jQuery-mutate - v0.0.2 -
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 * Date: 2015-04-19 */
! function(t) {
    mutate_event_stack = [{
        name: "width",
        handler: function(a) {
            var e = t(a);
            return e.data("mutate-width") || e.data("mutate-width", e.width()), e.data("mutate-width") && e.width() != e.data("mutate-width") ? (e.data("mutate-width", e.width()), !0) : !1
        }
    }, {
        name: "height",
        handler: function(a) {
            var e = t(a);
            return e.data("mutate-height") || e.data("mutate-height", e.height()), e.data("mutate-height") && e.height() != e.data("mutate-height") ? (e.data("mutate-height", e.height()), !0) : void 0
        }
    }, {
        name: "top",
        handler: function(a) {
            var e = t(a);
            return e.data("mutate-top") || e.data("mutate-top", e.css("top")), e.data("mutate-top") && e.css("top") != e.data("mutate-top") ? (e.data("mutate-top", e.css("top")), !0) : void 0
        }
    }, {
        name: "bottom",
        handler: function(a) {
            var e = t(a);
            return e.data("mutate-bottom") || e.data("mutate-bottom", e.css("bottom")), e.data("mutate-bottom") && e.css("bottom") != e.data("mutate-bottom") ? (e.data("mutate-bottom", e.css("bottom")), !0) : void 0
        }
    }, {
        name: "right",
        handler: function(a) {
            var e = t(a);
            return e.data("mutate-right") || e.data("mutate-right", e.css("right")), e.data("mutate-right") && e.css("right") != e.data("mutate-right") ? (e.data("mutate-right", e.css("right")), !0) : void 0
        }
    }, {
        name: "left",
        handler: function(a) {
            var e = t(a);
            return e.data("mutate-left") || e.data("mutate-left", e.css("left")), e.data("mutate-left") && e.css("left") != e.data("mutate-left") ? (e.data("mutate-left", e.css("left")), !0) : void 0
        }
    }, {
        name: "hide",
        handler: function(a) {
            var e = t(a),
                r = e.is(":hidden"),
                d = void 0 == e.data("prev-hidden") ? r : e.data("prev-hidden");
            return e.data("prev-hidden", r), r && r != d ? !0 : void 0
        }
    }, {
        name: "show",
        handler: function(a) {
            var e = t(a),
                r = e.is(":visible"),
                d = void 0 == e.data("prev-visible") ? r : e.data("prev-visible");
            return e.data("prev-visible", r), r && r != d ? !0 : void 0
        }
    }, {
        name: "scrollHeight",
        handler: function(a) {
            var e = t(a);
            return e.data("prev-scrollHeight") || e.data("prev-scrollHeight", e[0].scrollHeight), e.data("prev-scrollHeight") && e[0].scrollHeight != e.data("prev-scrollHeight") ? (e.data("prev-scrollHeight", e[0].scrollHeight), !0) : void 0
        }
    }, {
        name: "scrollWidth",
        handler: function(a) {
            var e = t(a);
            return e.data("prev-scrollWidth") || e.data("prev-scrollWidth", e[0].scrollWidth), e.data("prev-scrollWidth") && e[0].scrollWidth != e.data("prev-scrollWidth") ? (e.data("prev-scrollWidth", e[0].scrollWidth), !0) : void 0
        }
    }, {
        name: "scrollTop",
        handler: function(a) {
            var e = t(a);
            return e.data("prev-scrollTop") || e.data("prev-scrollTop", e[0].scrollTop()), e.data("prev-scrollTop") && e[0].scrollTop() != e.data("prev-scrollTop") ? (e.data("prev-scrollTop", e[0].scrollTop()), !0) : void 0
        }
    }, {
        name: "scrollLeft",
        handler: function(a) {
            var e = t(a);
            return e.data("prev-scrollLeft") || e.data("prev-scrollLeft", e[0].scrollLeft()), e.data("prev-scrollLeft") && e[0].scrollLeft() != e.data("prev-scrollLeft") ? (e.data("prev-scrollLeft", e[0].scrollLeft()), !0) : void 0
        }
    }]
}(jQuery);