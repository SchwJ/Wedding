function wpHotwordsEscRe(e) {
    return String(e).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
function wpRom(e, t) {
    var n = "undefined" != typeof window && window.wpHotwords && window.wpHotwords.replaceOnMaket || null;
    return n && null != n[e] && "" !== n[e] ? n[e] : t
}
function wpInvParseJsonMaybe(e) {
    if (null == e)
        return {};
    if ("object" == typeof e)
        return e;
    if ("string" == typeof e) {
        var t = String(e).trim();
        if (!t)
            return {};
        try {
            return JSON.parse(t)
        } catch (e) {
            return {}
        }
    }
    return {}
}
function wpInvSeatingBlocksFromGuests(e) {
    if (!e || "object" != typeof e)
        return e;
    if (e.block1 && String(e.block1).replace(/\s/g, "").length)
        return e;
    if (!e.guests || !e.guests.length)
        return e;
    var t = []
        , n = [];
    return e.guests.forEach((function(e) {
            if (e && e.name) {
                var o = e.alias && String(e.alias).trim() || String(e.name).trim();
                o && (2 === parseInt(e.col, 10) ? n.push(o) : t.push(o))
            }
        }
    )),
        e.block1 = t.join("\n"),
    n.length && (e.block2 = n.join("\n")),
        e
}
function wpHotwordsRoot() {
    return "undefined" != typeof window && window.wpHotwords || {}
}
function wpHotwordsDateFormat(e) {
    var t = wpHotwordsRoot();
    return t.dateFormat && String(t.dateFormat) || e || "DD.MM.YYYY"
}
function wpHotwordsBindings() {
    var e = wpHotwordsRoot();
    return e.bindings && "object" == typeof e.bindings ? e.bindings : {}
}
function wpHotwordsBindingField(e, t) {
    var n = wpHotwordsBindings();
    return null != n[e] && "" !== n[e] ? String(n[e]) : t
}
function wpHotwordsCookie(e) {
    if (!e || "undefined" == typeof $ || !$.cookie)
        return "";
    var t = $.cookie("var_" + e);
    return null != t ? String(t) : ""
}
function wpHotwordsResolveValue(e, t, n) {
    var o = wpHotwordsCookie(wpHotwordsBindingField(e, n));
    return "" !== o ? o : t && void 0 !== t ? t : wpHotwordsCookie(n)
}
function wpHotwordsMonths(e, t) {
    var n = wpHotwordsRoot();
    return n.months && n.months[e] && 12 === n.months[e].length ? n.months[e] : t
}
function wpHotwordsMonthToken(e, t) {
    var n = wpHotwordsRoot()
        , o = n.monthSearchTokens && "object" == typeof n.monthSearchTokens ? n.monthSearchTokens : null;
    return o && null != o[e] && "" !== o[e] ? String(o[e]) : t
}
function wpHotwordsDateMeta(e) {
    var t = wpHotwordsDateFormat("")
        , n = null;
    return "DD.MM.YYYY" === t && /\d{2}\.\d{2}\.\d{4}/.test(e) ? {
        parts: n = e.split("."),
        day: n[0],
        month: n[1],
        year: n[2],
        fullRe: /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/g
    } : "DD/MM/YYYY" === t && /\d{2}\/\d{2}\/\d{4}/.test(e) ? {
        parts: n = e.split("/"),
        day: n[0],
        month: n[1],
        year: n[2],
        fullRe: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g
    } : "MM/DD/YYYY" === t && /\d{2}\/\d{2}\/\d{4}/.test(e) ? {
        parts: n = e.split("/"),
        day: n[1],
        month: n[0],
        year: n[2],
        fullRe: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g
    } : /\d{2}\.\d{2}\.\d{4}/.test(e) ? {
        parts: n = e.split("."),
        day: n[0],
        month: n[1],
        year: n[2],
        fullRe: /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/g
    } : /\d{2}\/\d{2}\/\d{4}/.test(e) ? {
        parts: n = e.split("/"),
        day: n[1],
        month: n[0],
        year: n[2],
        fullRe: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g
    } : null
}
function wpHotwordsIsIsolatedNeighbor(e) {
    return "" === e || null == e || !/[0-9a-zA-Z\u0400-\u052F]/.test(e)
}
function wpHotwordsReplaceAllIsolated(e, t, n) {
    if (null == t || "" === t)
        return e;
    var o = String(t)
        , r = null == n ? "" : String(n);
    if (o === r)
        return e;
    for (var i = "", a = 0, s = e.length, l = o.length; a < s; ) {
        var d = e.indexOf(o, a);
        if (-1 === d) {
            i += e.slice(a);
            break
        }
        i += e.slice(a, d);
        var c = 0 === d ? "" : e.charAt(d - 1)
            , u = d + l
            , v = u >= s ? "" : e.charAt(u);
        wpHotwordsIsIsolatedNeighbor(c) && wpHotwordsIsIsolatedNeighbor(v) ? (i += r,
            a = d + l) : (i += e.charAt(d),
            a = d + 1)
    }
    return i
}
window._ttSvgCache = window._ttSvgCache || {},
    window._ttDefaultStroke = "1",
    window._ttParseIcon = function(e) {
        if (!e || "-1" === e)
            return null;
        if (/^https?:\/\//.test(e))
            return {
                type: "photo",
                url: e
            };
        if (/^data:image\//.test(e))
            return {
                type: "photo",
                url: e
            };
        if (/^em:/.test(e)) {
            var t = e.slice(3)
                , n = t.match(/\s+([\d.]+)$/);
            return {
                type: "emoji",
                char: n ? t.slice(0, t.length - n[0].length) : t,
                scale: n ? parseFloat(n[1]) : 1
            }
        }
        var o = e.match(/^lc:([\w-]+)\s+([\d.]+)\s+(#[0-9a-fA-F]{3,8})(?:\s+([\d.]+))?$/);
        if (o)
            return {
                type: "lc",
                name: o[1],
                color: o[3],
                scale: o[4] ? parseFloat(o[4]) : 1
            };
        var r = e.match(/^(\d+\.svg)\s+([\d.]+)\s+(#[0-9a-fA-F]{3,8})(?:\s+([\d.]+))?$/);
        return r ? {
            type: "svg",
            file: r[1],
            color: r[3],
            scale: r[4] ? parseFloat(r[4]) : 1
        } : /^\d+$/.test(String(e)) ? {
            type: "svg",
            file: String(e) + ".svg",
            color: window._ttDefaultIconColor || "#000000",
            scale: 1
        } : null
    }
    ,
    window._ttFormatIcon = function(e, t, n) {
        var o = n && Math.abs(parseFloat(n) - 1) > .01 ? " " + parseFloat(n).toFixed(2) : "";
        return e + " " + window._ttDefaultStroke + " " + t + o
    }
    ,
    window._ttIconWithColor = function(e, t) {
        if (!e || "-1" === e || !t)
            return e;
        var n = window._ttParseIcon(e);
        if (!n)
            return e;
        var o = window._ttNormalizeHexColor && window._ttNormalizeHexColor(t) || t;
        if ("svg" === n.type)
            return window._ttFormatIcon(n.file, o, n.scale);
        if ("lc" === n.type) {
            var r = n.scale && Math.abs(n.scale - 1) > .01 ? " " + n.scale.toFixed(2) : "";
            return "lc:" + n.name + " " + (window._ttDefaultStroke || "1") + " " + o + r
        }
        return e
    }
    ,
    window._ttEmojiToCodePoint = function(e) {
        if (!e)
            return "";
        if (/^[0-9a-f][0-9a-f-]*$/i.test(e))
            return e.toLowerCase();
        if ("undefined" != typeof twemoji && twemoji.convert && twemoji.convert.toCodePoint)
            try {
                return twemoji.convert.toCodePoint(e).toLowerCase()
            } catch (e) {}
        for (var t = [], n = 0, o = 0, r = 0; r < e.length; )
            n = e.charCodeAt(r++),
                o ? (t.push((65536 + (o - 55296 << 10) + (n - 56320)).toString(16)),
                    o = 0) : n >= 55296 && n <= 56319 ? o = n : t.push(n.toString(16));
        return t.join("-")
    }
    ,
    window._ttFormatEmoji = function(e, t) {
        var n = t && Math.abs(parseFloat(t) - 1) > .01 ? " " + parseFloat(t).toFixed(2) : "";
        return "em:" + (window._ttEmojiToCodePoint(e) || e) + n
    }
    ,
    window._ttNormalizeIconStr = function(e) {
        if (!e || "-1" === e)
            return "";
        var t = window._ttParseIcon(e);
        if (!t)
            return String(e);
        if ("photo" === t.type)
            return t.url;
        if ("emoji" === t.type)
            return window._ttFormatEmoji(t.char, t.scale);
        if ("svg" === t.type)
            return window._ttFormatIcon(t.file, t.color, t.scale);
        if ("lc" === t.type) {
            var n = t.scale && Math.abs(t.scale - 1) > .01 ? " " + t.scale.toFixed(2) : "";
            return "lc:" + t.name + " " + (window._ttDefaultStroke || "1") + " " + t.color + n
        }
        return String(e)
    }
    ,
    window._ttNormalizeHexColor = function(e) {
        if (!e)
            return "";
        if ("function" == typeof getHexColor)
            try {
                var t = getHexColor(e);
                if (t && /^#[0-9a-f]{3,8}$/i.test(t))
                    return t.toLowerCase()
            } catch (e) {}
        var n = String(e).trim().match(/#[0-9a-fA-F]{3,8}/);
        return n ? n[0].toLowerCase() : ""
    }
    ,
    window._ttDefaultIconColor = "#000000",
    window._ttNeutralIconColors = ["#000000", "#ffffff", "#888888"],
    window._ttCollectPaletteColors = function() {
        var e = {}
            , t = []
            , n = [];
        function o(t, n) {
            n && !e[n] && (e[n] = !0,
                t.push(n))
        }
        return (window._ttNeutralIconColors || []).forEach((function(e) {
                o(t, window._ttNormalizeHexColor(e) || e)
            }
        )),
            $(".elements[type=bg] a.ring:not(.hide)").each((function() {
                    var e = ($(this).attr("data-content") || "").trim();
                    /^#/.test(e) && o(t, window._ttNormalizeHexColor(e))
                }
            )),
            $('.fontover select.color optgroup[label="Палитра"] option.style-color').each((function() {
                    o(t, window._ttNormalizeHexColor(($(this).text() || "").trim()))
                }
            )),
        t.length || $(".fontover select.colorBackground option").each((function() {
                var e = ($(this).text() || $(this).val() || "").trim();
                o(t, window._ttNormalizeHexColor(e))
            }
        )),
            $("#colorModal .jscolor").each((function() {
                    var e = $(this).css("background-color");
                    e && "rgb(249, 249, 249)" !== e && "rgb(255, 255, 255)" !== e && "rgba(249, 249, 249, 0.3)" !== e && o(n, window._ttNormalizeHexColor(e))
                }
            )),
            $(".bigPalitra .colors .color:not(.hidden):not(.hide)").each((function() {
                    var e = $(this).attr("bg");
                    e && o(n, window._ttNormalizeHexColor(e))
                }
            )),
            {
                style: t,
                user: n,
                all: t.concat(n)
            }
    }
    ,
    window._ttDefaultPaletteColor = function() {
        return window._ttDefaultIconColor || "#000000"
    }
    ,
    window._ttRenderIconColorSwatches = function(e, t) {
        if (e && e.length) {
            var n = window._ttCollectPaletteColors().all
                , o = window._ttNormalizeHexColor(t) || window._ttDefaultPaletteColor()
                , r = e.find(".ttIconColorCustomBtn");
            e.find(".ttIconColorBtn").remove(),
                n.forEach((function(e) {
                        $('<button type="button" class="btn ttIconColorBtn"></button>').attr("data-color", e).css("background-color", e).toggleClass("active", e === o).toggleClass("ttIconColorBtn--light", window._ttIsLightIconColor && window._ttIsLightIconColor(e)).insertBefore(r)
                    }
                )),
                e.find("#ttIconColorNative").val(o)
        }
    }
    ,
    window._ttColorLuminance = function(e) {
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(4 === e.length ? "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3] : e);
        if (!t)
            return .5;
        var n = function(e) {
            return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
        };
        return .2126 * n(parseInt(t[1], 16)) + .7152 * n(parseInt(t[2], 16)) + .0722 * n(parseInt(t[3], 16))
    }
    ,
    window._ttGetContrastIconColor = function(e) {
        var t = window._ttNormalizeHexColor(e);
        return t && window._ttColorLuminance(t) < .179 ? "#ffffff" : "#222222"
    }
    ,
    window._ttIsLightIconColor = function(e) {
        var t = window._ttNormalizeHexColor(e);
        return !!t && window._ttColorLuminance(t) > .55
    }
    ,
    window._ttLoadWeddingSvg = function(e, t, n, o) {
        var r = "w:" + e + "|" + t + "|" + n;
        if (window._ttSvgCache[r])
            o(window._ttSvgCache[r]);
        else {
            var i = "/src/icons/wedding/tt/" + e;
            $.get(i, (function(e) {
                    var i = e.replace(/#222222/gi, t).replace(/stroke-width="[^"]*"/gi, "").replace(/<svg /i, '<svg stroke-width="' + n + '" ');
                    window._ttSvgCache[r] = i,
                        o(i)
                }
            ), "text").fail((function() {
                    o("")
                }
            ))
        }
    }
    ,
    window._ttLoadSvg = window._ttLoadWeddingSvg,
    window._ttLoadLcSvg = function(e, t, n, o) {
        var r = "lc:" + e + "|" + t + "|" + n;
        if (window._ttSvgCache[r])
            o(window._ttSvgCache[r]);
        else {
            var i = "https://unpkg.com/lucide-static/icons/" + e + ".svg";
            $.get(i, (function(e) {
                    var i = e.replace(/currentColor/gi, t).replace(/stroke-width="[^"]*"/gi, "").replace(/<svg /i, '<svg stroke="' + t + '" stroke-width="' + n + '" ');
                    window._ttSvgCache[r] = i,
                        o(i)
                }
            ), "text").fail((function() {
                    o("")
                }
            ))
        }
    }
    ,
    window._ttRenderTwemoji = function(e) {
        if (!e)
            return $('<span class="tt-icon-emoji"></span>');
        if (/^[0-9a-f][0-9a-f-]*$/i.test(e)) {
            var t = $('<img class="emoji" draggable="false">').attr("src", "https://twemoji.maxcdn.com/v/13.1.0/svg/" + e.toLowerCase() + ".svg").attr("alt", e);
            return $('<span class="tt-icon-emoji">').append(t)
        }
        var n = e;
        "undefined" != typeof twemoji && twemoji.parse && (n = twemoji.parse(e, {
            folder: "svg",
            ext: ".svg"
        }));
        var o = $('<span class="tt-icon-emoji">').html(n);
        return o.find("img.emoji").length ? o.find("img.emoji").attr("draggable", "false") : o.text(e),
            o
    }
    ,
    window._ttWaveAnchorIconApplied = function(e, t) {
        if (!e || !e.length)
            return !1;
        if ((e.data("tt-wave-icon") || "") !== t)
            return !1;
        var n = window._ttParseIcon && window._ttParseIcon(t);
        return !!n && ("emoji" === n.type ? e.find("img.emoji, .tt-icon-emoji").length > 0 : 1 === e.children("svg").length)
    }
    ,
    window._ttParseSvgMarkup = function(e) {
        if (!e)
            return $();
        var t = $(e)
            , n = t.filter("svg");
        return n.length || (n = t.find("svg")),
        !n.length && t.length && (n = t.first()),
            n.each((function() {
                    var e = (this.getAttribute("class") || "").split(/\s+/).filter(Boolean);
                    -1 === e.indexOf("tt-icon-svg") && e.push("tt-icon-svg"),
                        this.setAttribute("class", e.join(" "))
                }
            )),
            n.first()
    }
    ,
    window._ttIconKindClass = function(e) {
        return e ? "photo" === e.type ? "tt-icon-kind-photo" : "emoji" === e.type ? "tt-icon-kind-emoji" : "lc" === e.type ? "tt-icon-kind-lucide" : "svg" === e.type ? "tt-icon-kind-wedding" : "" : ""
    }
    ,
    window._ttClearIconKindClasses = function(e) {
        e && e.length && e.removeClass("tt-icon-kind-photo tt-icon-kind-wedding tt-icon-kind-lucide tt-icon-kind-emoji")
    }
    ,
    window._ttClearIconEl = function(e, t) {
        e && e.length && (t ? e.children("svg, .tt-icon-emoji, img.emoji").remove() : (e.find("svg").remove(),
            e.find(".tt-icon-emoji, img.emoji").remove()),
            e.removeClass("tt-icon"),
            window._ttClearIconKindClasses(e),
            (e.attr("class") || "").split(/\s+/).forEach((function(t) {
                    /^tt-icon--\d+$/.test(t) && e.removeClass(t)
                }
            )),
            e.css({
                "background-image": "",
                "background-size": "",
                "background-position": ""
            }))
    }
    ,
    window._ttApplyIcon = function(e, t) {
        if (e && e.length) {
            var n = e.hasClass("tt-wave-icon");
            if (n) {
                var o = e.closest("#timetablecontent")[0];
                if (o)
                    o._ttWaveDrawing = !0,
                        (window.requestAnimationFrame || function(e) {
                                return setTimeout(e, 16)
                            }
                        )((function() {
                                o._ttWaveDrawing = !1
                            }
                        ))
            }
            var r = (e.data("tt-icon-gen") || 0) + 1;
            e.data("tt-icon-gen", r),
                window._ttClearIconEl(e, n);
            var i = window._ttParseIcon(t);
            if (i) {
                var a = window._ttIconKindClass(i);
                a && e.addClass(a);
                var s = i.scale && Math.abs(i.scale - 1) > .01 ? i.scale : 1;
                if ("photo" !== i.type) {
                    if ("emoji" === i.type) {
                        var l = window._ttRenderTwemoji(i.char)
                            , d = l.find("img.emoji");
                        return l.css({
                            position: "absolute",
                            display: "block",
                            lineHeight: 1,
                            transformOrigin: "center center",
                            pointerEvents: "none"
                        }),
                            d.css({
                                width: "100%",
                                height: "100%",
                                display: "block",
                                objectFit: "contain"
                            }),
                        1 !== s && l.css("transform", "scale(" + s + ")"),
                            void e.append(l)
                    }
                    ("lc" === i.type ? function(e) {
                                window._ttLoadLcSvg(i.name, i.color, window._ttDefaultStroke, e)
                            }
                            : function(e) {
                                window._ttLoadWeddingSvg(i.file, i.color, window._ttDefaultStroke, e)
                            }
                    )((function(t) {
                            if (e.data("tt-icon-gen") === r && t) {
                                n ? e.children("svg").remove() : e.find("svg").remove();
                                var o = window._ttParseSvgMarkup(t);
                                o.length && (o.removeAttr("width").removeAttr("height"),
                                    o.css({
                                        display: "block",
                                        position: "absolute",
                                        transformOrigin: "center center",
                                        pointerEvents: "none"
                                    }),
                                1 !== s && o.css("transform", "scale(" + s + ")"),
                                    e.append(o))
                            }
                        }
                    ))
                } else
                    e.css({
                        "background-image": 'url("' + i.url.replace(/"/g, '\\"') + '")',
                        "background-size": "cover",
                        "background-position": "center"
                    })
            }
        }
    }
    ,
    window._ttInitIconPickerBtn = function(e, t) {
        var n = e.attr("data-icon");
        if (n && "-1" !== n && !/^em:/.test(n)) {
            var o = window._ttDefaultStroke
                , r = t || window._ttDefaultIconColor || "#000000";
            if (e.toggleClass("ttIconBtn--lightFg", window._ttIsLightIconColor(r)),
                /^lc:/.test(n)) {
                var i = n.replace(/^lc:/, "");
                window._ttLoadLcSvg(i, r, o, (function(t) {
                        t && e.html(window._ttParseSvgMarkup(t))
                    }
                ))
            } else
                /\.svg$/i.test(n) && window._ttLoadWeddingSvg(n, r, o, (function(t) {
                        t && e.html(window._ttParseSvgMarkup(t))
                    }
                ))
        }
    }
    ,
    window._ttDefaultHeartColor = "#7e1232",
    window._ttIsOverlayColor = function(e) {
        if (!e)
            return !0;
        var t = String(e).replace(/\s/g, "").toLowerCase();
        return "transparent" === t || "rgba(0,0,0,0)" === t || (!("#fff" !== t && "#ffffff" !== t && !/^rgba?\(255,255,255/.test(t)) || !!/^rgba?\(0,0,0,0\.(0[0-9]|1[0-9]|2[0-4])\)/.test(t))
    }
    ,
    window._ttExtractColorFromCssBackground = function(e) {
        if (!e)
            return "";
        var t = String(e).trim();
        if (!t || "none" === t)
            return "";
        if (-1 !== t.indexOf("gradient")) {
            if (window.getTimetableColorFromGradient) {
                var n = window.getTimetableColorFromGradient(t);
                if (n && !window._ttIsOverlayColor(n))
                    return n
            }
            var o = t.match(/(#(?:[0-9a-fA-F]{3}){1,2})|rgba?\([^)]+\)|hsla?\([^)]+\)/g);
            if (o)
                for (var r = 0; r < o.length; r++)
                    if (!window._ttIsOverlayColor(o[r]))
                        return o[r];
            return ""
        }
        var i = t.match(/#[0-9a-fA-F]{3,8}/);
        if (i && !window._ttIsOverlayColor(i[0]))
            return i[0];
        var a = t.match(/rgba?\([^)]+\)/);
        return a && !window._ttIsOverlayColor(a[0]) ? a[0] : ""
    }
    ,
    window._ttGetAgreeBtnColor = function() {
        var e = document.querySelector("#screen");
        if (!e)
            return "";
        var t = e.querySelector('.guestAgreement[action="agreebtn"]') || e.querySelector('a.guestAgreement.guestAgree[answer="1"]') || e.querySelector(".guestAgreement.guestAgree");
        if (!t)
            return "";
        var n = t.style.background || t.style.backgroundColor || ""
            , o = window._ttExtractColorFromCssBackground(n);
        if (o)
            return o;
        var r = window.getComputedStyle(t)
            , i = r.backgroundColor;
        if (i && !window._ttIsOverlayColor(i))
            return i;
        var a = window._ttExtractColorFromCssBackground(r.backgroundImage || "");
        return a || ""
    }
    ,
    window._ttGetAgreeBtnTextColor = function() {
        var e = document.querySelector("#screen");
        if (!e)
            return "";
        var t = e.querySelector('.guestAgreement[action="agreebtn"]') || e.querySelector('a.guestAgreement.guestAgree[answer="1"]') || e.querySelector(".guestAgreement.guestAgree");
        if (!t)
            return "";
        var n = t.style.color || "";
        return n || (window.getComputedStyle(t).color || "")
    }
    ,
    function() {
        "use strict";
        window.ttModules = window.ttModules || {};
        var e = {
            time: "timetabletext_date",
            title: "timetabletext_subtitle",
            address: "timetabletext_address",
            desc: "timetabletext_desc"
        }
            , t = ["fontFamily", "fontSize", "color", "lineHeight", "letterSpacing", "textAlign"]
            , n = {
            1: {
                time: "left",
                title: "left",
                address: "left",
                desc: "left"
            },
            2: {
                time: "center",
                title: "center",
                address: "center",
                desc: "center"
            },
            3: {
                time: "left",
                title: "left",
                address: "left",
                desc: "left"
            },
            4: {
                time: "center",
                title: "center",
                address: "center",
                desc: "center"
            },
            5: null
        };
        function o(t, o) {
            o = String(o || "1");
            var r = n[o];
            if (!r)
                return t || null;
            var i, a = t ? JSON.parse(JSON.stringify(t)) : {};
            for (i in e)
                e.hasOwnProperty(i) && (a[i] || (a[i] = {}),
                !a[i].textAlign && r[i] && (a[i].textAlign = r[i]));
            return a
        }
        function r(e) {
            return e.replace(/([A-Z])/g, "-$1").toLowerCase()
        }
        function i(e) {
            if (!e || !e.style)
                return null;
            var n, o, r, i, a = e.style, s = {
                gradient: e.getAttribute("data-font-gradient") || null
            }, l = !!s.gradient;
            for (n = 0; n < t.length; n++)
                !(r = a[o = t[n]]) && "fontFamily" === o && window.getComputedStyle && (i = window.getComputedStyle(e).fontFamily) && (r = i.split(",")[0].trim().replace(/['"]/g, "")),
                r && (s[o] = r,
                    l = !0);
            return l ? s : null
        }
        function a(e) {
            if (!e)
                return "";
            var t = e.getAttribute("data-font-gradient");
            if (t) {
                var n = window.ttShared.getTimetableColorFromGradient(t);
                if (n)
                    return window._ttNormalizeHexColor && window._ttNormalizeHexColor(n) || n
            }
            var o = e.style.color;
            if (o && "transparent" !== o)
                return window._ttNormalizeHexColor && window._ttNormalizeHexColor(o) || o;
            var r = window.getComputedStyle(e).color;
            return r && "transparent" !== r && "rgba(0, 0, 0, 0)" !== r ? window._ttNormalizeHexColor ? window._ttNormalizeHexColor(r) || "" : r : ""
        }
        function s(e, n) {
            if (e && n) {
                var o, i, a, s, l = e.style;
                for (o = 0; o < t.length; o++)
                    s = r(i = t[o]),
                        (a = n[i]) ? l.setProperty(s, a) : l.removeProperty(s);
                n.gradient ? (e.setAttribute("data-font-gradient", n.gradient),
                    e.style.setProperty("--text-gradient-base", n.gradient),
                    e.classList.add("text-gradient-font"),
                    e.style.setProperty("color", "transparent"),
                    e.style.removeProperty("background-image"),
                    e.style.removeProperty("background-size"),
                    e.style.removeProperty("background-repeat"),
                    e.style.removeProperty("background-position"),
                    e.style.removeProperty("-webkit-text-fill-color"),
                    e.style.removeProperty("background-clip")) : (e.removeAttribute("data-font-gradient"),
                    e.style.removeProperty("--text-gradient-base"),
                    e.classList.remove("text-gradient-font", "text-gradient-shine--anim", "text-shine--anim"),
                    e.style.removeProperty("-webkit-text-fill-color"),
                    e.style.removeProperty("background-clip"),
                    e.style.removeProperty("background-image"),
                    e.style.removeProperty("background-size"),
                    e.style.removeProperty("background-repeat"),
                    e.style.removeProperty("background-position"))
            }
        }
        function l() {
            return !(!document.getElementById("invent-mob-back") && !document.getElementById("autoGuestModal"))
        }
        function d(e) {
            return !(!e || !e.length) && e.closest("#timetablePaper").length > 0
        }
        function c(e) {
            if (!e)
                return window;
            for (var t = null, n = e; n && n !== document.body && n !== document.documentElement; ) {
                "screen" === n.id && (t = n);
                var o = window.getComputedStyle(n).overflowY;
                if ("auto" === o || "scroll" === o || "overlay" === o) {
                    if (n.scrollHeight > n.clientHeight)
                        return n;
                    if (!l() && "screen" === n.id)
                        return n
                }
                n = n.parentElement
            }
            if (t && !l()) {
                var r = window.getComputedStyle(t);
                if ("auto" === r.overflowY || "scroll" === r.overflowY || "overlay" === r.overflowY)
                    return t
            }
            return window
        }
        function u(e) {
            if (!e)
                return 1;
            var t = e.getBoundingClientRect();
            return t.width ? t.width / (e.offsetWidth || t.width) || 1 : e._ttWaveScale || 1
        }
        function v(e, t, n) {
            if (!e)
                return 0;
            var o = e.getBoundingClientRect();
            if (!o.height)
                return 0;
            var r, i = u(e);
            if (n = null != n ? n : .5,
            (t = t || window) === window)
                r = window.innerHeight * n;
            else {
                var a = t.getBoundingClientRect();
                r = a.top + a.height * n
            }
            return (r - o.top) / i
        }
        window.ttShared = {
            isGuest: l(),
            isGuestSite: l,
            isPaperTimetable: d,
            findScrollContainer: c,
            getContentScale: u,
            getViewportCenterY: v,
            cacheHeartGeometry: function(e) {
                e && (e._ttWaveScale = u(e))
            },
            refreshHeartScrollSetup: function(e) {
                e && (e._ttWaveScrollContainer = c(e),
                    e._ttWaveScale = u(e))
            },
            isScrolledToBottom: function(e) {
                if ((e = e || window) === window) {
                    var t = Math.max(document.documentElement.scrollHeight || 0, document.body.scrollHeight || 0);
                    return window.innerHeight + (window.pageYOffset || window.scrollY || 0) >= t - 4
                }
                return e.scrollTop + e.clientHeight >= e.scrollHeight - 4
            },
            smoothHeartY: function(e, t) {
                if (null == e._ttWaveCurrentY) {
                    if (parseFloat(window.getComputedStyle(e).opacity || "1") < .1) {
                        if (!e._ttWaitingForFadeIn) {
                            e._ttWaitingForFadeIn = !0;
                            var n = function(t) {
                                if (t.target === e) {
                                    e.removeEventListener("animationend", n),
                                        e._ttWaitingForFadeIn = !1;
                                    for (var o = e.querySelectorAll(".event.repeatLine.tt-revealed"), r = 0; r < o.length; r++)
                                        o[r].classList.remove("tt-revealed");
                                    e._ttScheduleHeartUpdate && e._ttScheduleHeartUpdate()
                                }
                            };
                            e.addEventListener("animationend", n)
                        }
                        return {
                            y: 0,
                            settled: !0
                        }
                    }
                    return e._ttWaveCurrentY = 0,
                        e._ttWaveInitialDone = !1,
                        {
                            y: 0,
                            settled: !1
                        }
                }
                if (e._ttWaveInitialDone)
                    return e._ttWaveCurrentY = t,
                        {
                            y: t,
                            settled: !0
                        };
                var o = e._ttWaveCurrentY
                    , r = t - o;
                if (Math.abs(r) < .5)
                    return e._ttWaveCurrentY = t,
                    t > 5 && (e._ttWaveInitialDone = !0),
                        {
                            y: t,
                            settled: !0
                        };
                var i = r > 0 ? 1 : -1
                    , a = .16 * r
                    , s = o + (Math.abs(a) > 7 ? 7 * i : a);
                return e._ttWaveCurrentY = s,
                    {
                        y: s,
                        settled: !1
                    }
            },
            resetHeartSmoothing: function(e) {
                e && (e._ttWaveCurrentY = null,
                    e._ttWaveInitialDone = !1,
                    e._ttWaitingForFadeIn = !1,
                    e._ttInitPassDone = !1,
                    e._ttFollow50Active = !1)
            },
            resolveHeartTargetY: function(e, t, n) {
                if (!e)
                    return 0;
                var o = v(e, t = t || window, .9);
                if (!n)
                    return o;
                var r = v(e, t, .5)
                    , i = e._ttWaveAnchorPoints
                    , a = i && i.length ? i[i.length - 1].y : 0;
                return !e._ttFollow50Active && r >= a - 1 && (e._ttFollow50Active = !0),
                    e._ttFollow50Active ? r : o
            },
            FIELD_MAP: e,
            STYLE_PROPS: t,
            VERSION_DEFAULT_ALIGN: n,
            ensureTextAlignDefaults: o,
            repeatControlHtml: '<div class="repeatControl"><i class="fa fa-long-arrow-up coloricon text-center upHTML"></i><i class="fa fa-close coloricon text-center delEvent"></i><i class="fa fa-edit coloricon text-center editEvent addEvent"></i><i class="fa fa-long-arrow-down coloricon text-center downHTML"></i></div>',
            tooltipBtnHtml: function() {
                return '<button class="tt-event__tooltip-btn" type="button" aria-label="i"><i class="fa fa-info-circle" aria-hidden="true"></i></button>'
            },
            titleIconHtml: function() {
                return '<div class="tt-event__title-icon"><div class="tt-event__photo-inner" elemplace="bgtimetablephoto"></div></div>'
            },
            bodyFieldsHtml: function(e) {
                var t, n = !1 !== (e = e || {}).withTooltip, o = e.tooltipBtn ? e.tooltipBtn : "", r = !!e.iconInTitleRow, i = r ? window.ttShared.titleIconHtml() : "";
                t = n && r && o ? '<div class="moveBox"><div class="subTextLine manual tt-event__title" action="timetabletext_subtitle"><span name="title"></span>' + o + "</div></div>" : '<div class="moveBox"><div class="subTextLine manual tt-event__title" action="timetabletext_subtitle" name="title"></div></div>';
                var a = '<div class="moveBox"><div class="subTextLine manual tt-event__address" action="timetabletext_address" name="address"></div></div><div class="moveBox"><div class="subTextLine manual tt-event__desc" action="timetabletext_desc"><div name="desc"></div></div></div>';
                return n && (a = '<div class="tt-event__tooltip">' + a + "</div>"),
                '<div class="moveBox"><div class="subTextLine manual tt-event__time" action="timetabletext_date"><span name="time"></span></div></div>' + (n ? '<div class="tt-event__title-row">' + i + t + (r ? "" : o) + "</div>" : '<div class="moveBox"><div class="subTextLine manual tt-event__title" action="timetabletext_subtitle" name="title"></div></div>') + a
            },
            ttEventShellHtml: function(e) {
                return '<div class="tt-event">' + (!!(e = e || {}).iconInTitleRow ? "" : '<div class="tt-event__photo"><div class="tt-event__photo-inner" elemplace="bgtimetablephoto"></div></div>') + '<div class="tt-event__connector"><div class="tt-event__line"></div></div><div class="tt-event__body">' + window.ttShared.bodyFieldsHtml(e) + "</div></div>"
            },
            getEventTitleColor: function(e) {
                if (!e || !e.length)
                    return "";
                var t = e.find('.subTextLine[action="timetabletext_subtitle"], .tt-event__title').first()
                    , n = e.find("[name=title]").first()
                    , o = "";
                return t.length && (o = a(t[0])),
                o || !n.length || t.length && n[0] === t[0] || (o = a(n[0])),
                    o
            },
            getTitleLineColor: function(e) {
                if (!e || !e.length)
                    return "";
                var t = e[0]
                    , n = e.find(".event.repeatLine:not(.hide)").first();
                if (n.length || (n = e.children(".event.repeatLine.hide").first()),
                    n.length) {
                    var o = window.ttShared.getEventTitleColor(n);
                    if (o && "transparent" !== o && "rgba(0, 0, 0, 0)" !== o)
                        return o
                }
                var r, i, a = ["--tt-v3-timeline-color", "--tt-v4-timeline-color", "--tt-wave-color"];
                for (r = 0; r < a.length; r++)
                    if (i = t.style.getPropertyValue(a[r]))
                        return i;
                return ""
            },
            ensureV4Photo: function(e) {
                if (e && e.length) {
                    var t = window.ttShared.ensureEventShell(e);
                    if (t.length) {
                        var n = t.children(".tt-event__photo").first();
                        n.length || (n = $('<div class="tt-event__photo"></div>'),
                            t.prepend(n)),
                        n.find(".tt-event__photo-inner").length || n.append($('<div class="tt-event__photo-inner" elemplace="bgtimetablephoto"></div>'))
                    }
                }
            },
            ensureV4IconInTitleRow: function(e) {
                if (e && e.length) {
                    var t = window.ttShared.ensureEventShell(e);
                    if (t.length) {
                        var n = t.find(".tt-event__title-row").first();
                        if (n.length) {
                            var o = n.children(".tt-event__title-icon").first();
                            o.length || (o = $(window.ttShared.titleIconHtml()),
                                n.prepend(o));
                            var r = o.find(".tt-event__photo-inner").first();
                            r.length || (r = $('<div class="tt-event__photo-inner" elemplace="bgtimetablephoto"></div>'),
                                o.append(r));
                            var i = t.children(".tt-event__photo").first();
                            if (i.length) {
                                var a = i.find(".tt-event__photo-inner").first();
                                a.length && a[0] !== r[0] && (a.children().appendTo(r),
                                a.attr("class") && r.attr("class", a.attr("class")),
                                a.attr("style") && r.attr("style", a.attr("style"))),
                                    i.remove()
                            }
                            window.ttShared.ensureV4TooltipInTitle(e)
                        }
                    }
                }
            },
            ensureV4TooltipInTitle: function(e) {
                if (e && e.length) {
                    var t = window.ttShared.ensureEventShell(e);
                    if (t.length) {
                        var n = t.find(".tt-event__title-row").first();
                        if (n.length) {
                            var o = n.find(".tt-event__title").first();
                            if (o.length) {
                                var r = o.find(".tt-event__tooltip-btn").first();
                                r.length || (r = n.children(".tt-event__tooltip-btn").first()),
                                r.length || (r = $(window.ttShared.tooltipBtnHtml()));
                                var i = o.children("[name=title]").first();
                                if (!i.length)
                                    if (o.is("[name=title]")) {
                                        var a = o.clone().children(".tt-event__tooltip-btn").remove().end().text().replace(/\s+/g, " ").trim();
                                        i = $('<span name="title"></span>').text(a),
                                            o.removeAttr("name"),
                                            o.empty().append(i)
                                    } else
                                        i = $('<span name="title"></span>'),
                                            o.prepend(i);
                                r.parent().is(o) || r.appendTo(o)
                            }
                        }
                    }
                }
            },
            readEventData: function(e) {
                var t, n, o, r, i, a, s = e.find(".tt-event").first();
                return a = e.attr("data-icon") || "",
                    s.length ? (t = s.find("[name=desc]").text().replace(/\s+/g, " ").trim(),
                        n = s.find(".tt-event__title[name=title], [name=title]").first().text().replace(/\s+/g, " ").trim(),
                        o = s.find(".tt-event__time [name=time], [name=time]").first().text().replace(/\s+/g, " ").trim(),
                        r = s.find(".tt-event__time [name=date], [name=date]").first().text().replace(/\s+/g, " ").trim(),
                        i = s.find(".tt-event__address[name=address], [name=address]").first().text().replace(/\s+/g, " ").trim()) : (t = e.find("[name=desc]").text().replace(/\s+/g, " ").trim(),
                        n = e.find("[name=title]").first().text().replace(/\s+/g, " ").trim(),
                        o = e.find("[name=time]").first().text().replace(/\s+/g, " ").trim(),
                        r = e.find("[name=date]").first().text().replace(/\s+/g, " ").trim(),
                        i = e.find("[name=address]").first().text().replace(/\s+/g, " ").trim()),
                    {
                        date: r,
                        time: o,
                        title: n,
                        address: i,
                        desc: t,
                        icon: a
                    }
            },
            renderEventFields: function(e, t) {
                t = t || {},
                    e.attr("data-icon", t.icon || ""),
                    e.find("[name=time]").text(t.time || ""),
                    e.find("[name=date]").text(t.date || ""),
                    e.find("[name=title]").text(t.title || ""),
                    e.find("[name=address]").text(t.address || ""),
                    e.find("[name=desc]").text(t.desc || ""),
                    window.ttShared.applyIcon(e, t.icon || "")
            },
            applyIcon: function(e, t) {
                if (window._ttApplyIcon) {
                    var n = e.closest(".element_tt").attr("version_tt") || "1";
                    if ("5" !== n) {
                        "4" === n && window.ttShared.ensureV4Photo(e);
                        var o = "4" === n ? e.find(".tt-event__photo > .tt-event__photo-inner").first() : e.find(".tt-event__photo-inner").first();
                        if (o.length)
                            return t && "-1" !== t ? void window._ttApplyIcon(o, t) : (o.find("svg.tt-icon-svg, .tt-icon-emoji, img.emoji").remove(),
                                o.css({
                                    "background-image": "",
                                    "background-size": "",
                                    "background-position": ""
                                }),
                                void (window._ttClearIconKindClasses && window._ttClearIconKindClasses(o)))
                    } else
                        window._ttRefreshWaveEventIcon && window._ttRefreshWaveEventIcon(e)
                }
            },
            ensureEventShell: function(e) {
                if (!e || !e.length)
                    return $();
                var t = e.children(".tt-event");
                if (t.length || (t = e.find(".tt-event").first()),
                    t.length)
                    return t;
                t = $('<div class="tt-event"></div>');
                var n = e.children(".repeatControl").last();
                if (n.length ? t.insertAfter(n) : e.prepend(t),
                    e.children().not(".repeatControl, .tt-wave-anchor, .tt-wave-icon, .tt-event").appendTo(t),
                    !t.children(".tt-event__body").length) {
                    var o = t.children().not(".tt-event__photo, .tt-event__connector");
                    if (o.length) {
                        var r = $('<div class="tt-event__body"></div>');
                        o.appendTo(r),
                            t.append(r)
                    }
                }
                return t
            },
            upgradeEventTooltipDom: function(e, t) {
                if (e && e.length) {
                    t = t || {};
                    var n = String(t.version || "1")
                        , o = null != t.withTooltipBtn ? t.withTooltipBtn : "4" === n
                        , r = null != t.withTooltipWrap ? t.withTooltipWrap : "4" === n
                        , i = window.ttShared.ensureEventShell(e);
                    if (i.length) {
                        var a = i.find(".tt-event__body").first();
                        if (a.length) {
                            var s = a.find(".tt-event__title").first();
                            if (s.length && !s.closest(".tt-event__title-row").length) {
                                var l = s.closest(".moveBox");
                                if (l.length) {
                                    var d = $('<div class="tt-event__title-row"></div>');
                                    l.before(d),
                                        d.append(l),
                                        o && "4" === n ? window.ttShared.ensureV4TooltipInTitle(e) : o && !d.find(".tt-event__tooltip-btn").length && $(window.ttShared.tooltipBtnHtml()).appendTo(d)
                                }
                            }
                            if (r && !a.find("> .tt-event__tooltip").length) {
                                var c = a.find(".tt-event__address").closest(".moveBox")
                                    , u = a.find(".tt-event__desc").closest(".moveBox");
                                if (c.length || u.length) {
                                    var v = $('<div class="tt-event__tooltip"></div>');
                                    (c.length ? c.first() : u.first()).before(v),
                                    c.length && v.append(c.first()),
                                    u.length && v.append(u.first())
                                }
                            }
                            "4" === n && window.ttShared.ensureV4IconInTitleRow(e)
                        }
                    }
                }
            },
            getTimetableColorFromGradient: function(e) {
                if (!e || -1 === e.indexOf("gradient"))
                    return "";
                var t = e.match(/(#(?:[0-9a-fA-F]{3}){1,2})|rgba?\([^)]+\)|hsla?\([^)]+\)/g);
                return t && t.length ? t[Math.floor(t.length / 2)] || t[0] : ""
            },
            readFieldStyles: function(t) {
                if (!t || !t.length)
                    return null;
                var n = t.closest(".element_tt")
                    , o = String(n.attr("version_tt") || "1")
                    , r = t.find(".event.repeatLine:not(.hide)").first();
                if (r.length || (r = t.children(".event.repeatLine.hide").first()),
                    !r.length)
                    return null;
                var a, s, l, d, c = {};
                for (a in e)
                    if (e.hasOwnProperty(a) && (s = e[a],
                    (l = r.find('.subTextLine[action="' + s + '"]').first()).length && (d = i(l[0])))) {
                        if ("4" === o && ("address" === a || "desc" === a) && d.color && (delete (d = JSON.parse(JSON.stringify(d))).color,
                        !d.gradient && 0 === Object.keys(d).length))
                            continue;
                        c[a] = d
                    }
                return Object.keys(c).length ? c : null
            },
            syncDefaultIconColor: function(e) {
                var t = window._ttGetAgreeBtnColor ? window._ttGetAgreeBtnColor() : "";
                if (t) {
                    var n = window._ttNormalizeHexColor ? window._ttNormalizeHexColor(t) : t;
                    n && (window._ttDefaultIconColor = n,
                    window._ttClearIconColorSession && window._ttClearIconColorSession())
                } else if (e && e.length) {
                    var o = e.find(".event.repeatLine:not(.hide)").first();
                    if (o.length || (o = e.children(".event.repeatLine.hide").first()),
                        o.length) {
                        var r = o.find('.subTextLine[action="timetabletext_date"]').first();
                        if (r.length) {
                            var i = a(r[0]);
                            if (i && "transparent" !== i && "rgba(0, 0, 0, 0)" !== i) {
                                var s = window._ttNormalizeHexColor ? window._ttNormalizeHexColor(i) : i;
                                s && (window._ttDefaultIconColor = s)
                            }
                        }
                    }
                }
            },
            syncDefaultIconColorFromTime: function(e) {
                return window.ttShared.syncDefaultIconColor(e)
            },
            applyFieldStyles: function(t, n) {
                if (t && t.length) {
                    var r = t.closest(".element_tt")
                        , i = String(r.attr("version_tt") || "1");
                    if (n = o(n, i)) {
                        var a, l;
                        for (a in e)
                            e.hasOwnProperty(a) && n[a] && (l = e[a],
                                t.find('.subTextLine[action="' + l + '"]').not(".tt-v4-date-badge").each((function() {
                                        s(this, n[a])
                                    }
                                )));
                        window.ttShared.syncDefaultIconColor(t),
                        r.length && (t.find(".event.repeatLine:not(.hide)").each((function() {
                                var e = $(this)
                                    , t = e.attr("data-icon") || "";
                                t && "-1" !== t && window.ttShared.applyIcon(e, t)
                            }
                        )),
                        window._ttSyncModalIconColorFromTitle && window.ttShared.getTitleLineColor && window._ttSyncModalIconColorFromTitle(window.ttShared.getTitleLineColor(t)))
                    }
                }
            },
            applyFieldStylesToEvent: function(t, n) {
                if (t && t.length) {
                    var r, i, a = t.closest(".element_tt"), l = String(a.attr("version_tt") || "1");
                    if (n = o(n, l))
                        for (r in e)
                            e.hasOwnProperty(r) && n[r] && (i = e[r],
                                t.find('.subTextLine[action="' + i + '"]').each((function() {
                                        s(this, n[r])
                                    }
                                )))
                }
            },
            saveFieldStyles: function(e) {
                if (e && e.length) {
                    var t = window.ttShared.readFieldStyles(e);
                    t && e.attr("data-tt-styles", JSON.stringify(t))
                }
            },
            loadFieldStyles: function(e) {
                if (!e || !e.length)
                    return null;
                var t = e.attr("data-tt-styles");
                if (!t)
                    return null;
                try {
                    return JSON.parse(t)
                } catch (e) {
                    return null
                }
            },
            fireEventShine: function(e, t) {
                if (e && e.length) {
                    t = t || {};
                    var n = e[0]
                        , o = [];
                    if (e.find("[data-font-gradient], .text-gradient-font").each((function() {
                            o.push(this)
                        }
                    )),
                        o.length) {
                        var r;
                        if (window.ttShared.isGuest) {
                            var i = e.find(".tt-event").first();
                            r = i.length ? i[0] : n
                        } else {
                            var a = e.find('.subTextLine[action^="timetabletext"][data-font-gradient], .subTextLine[action^="timetabletext"].text-gradient-font');
                            a.length || (a = e.find('.subTextLine[action^="timetabletext"]')),
                                r = a.length ? a[a.length - 1] : o[o.length - 1]
                        }
                        window.wpEntranceShineAfterAnim && window.wpEntranceShineAfterAnim(r, n, t.immediate)
                    }
                }
            },
            initScrollReveal: function(e) {
                if (e && e.length)
                    if (d(e)) {
                        var t = e.find("#timetablecontent");
                        t.length && (t.removeClass("tt-anim-ready tt-spine-ready"),
                            t.find(".event.repeatLine:not(.hide)").each((function() {
                                    this.style.removeProperty("--tt-anim-icon-delay"),
                                        this.style.removeProperty("--tt-anim-text-delay")
                                }
                            )))
                    } else {
                        var n = String(e.attr("version_tt") || "1")
                            , o = window.ttShared.isGuest
                            , r = o && ("4" === n || "5" === n);
                        if (!o || r) {
                            var i = e.find("#timetablecontent");
                            if (i.length) {
                                var a = i.data("ttScrollRevealObs");
                                a && (a.disconnect(),
                                    i.removeData("ttScrollRevealObs")),
                                    i.removeClass("tt-anim-ready tt-spine-ready tt-anim-pending"),
                                    i.find(".event.repeatLine:not(.hide)").each((function() {
                                            this.style.removeProperty("--tt-anim-icon-delay"),
                                                this.style.removeProperty("--tt-anim-text-delay")
                                        }
                                    )),
                                    i.addClass("tt-anim-pending");
                                var s = !1
                                    , l = !1
                                    , c = !1
                                    , u = 0;
                                if ("undefined" != typeof IntersectionObserver) {
                                    var v = new IntersectionObserver((function(e) {
                                            e.forEach((function(e) {
                                                    var t, n;
                                                    e.target === i[0] && (e.isIntersecting ? c || (c = !0,
                                                        r ? l || (l = !0,
                                                            p()) : s ? (t = !0,
                                                        (n = Date.now()) < u || (u = n + 1500,
                                                            i.find(".event.repeatLine:not(.hide)").each((function() {
                                                                    window.ttShared.fireEventShine($(this), {
                                                                        immediate: !!t
                                                                    })
                                                                }
                                                            )))) : (s = !0,
                                                            u = Date.now() + 1500,
                                                            m())) : c = !1)
                                                }
                                            ))
                                        }
                                    ),{
                                        root: null,
                                        rootMargin: "0px 0px -10% 0px",
                                        threshold: 0
                                    });
                                    i.data("ttScrollRevealObs", v),
                                        v.observe(i[0])
                                } else
                                    r ? p() : (s = !0,
                                        m())
                            }
                        }
                    }
                function m() {
                    if (i.removeClass("tt-anim-pending"),
                        i.find(".event.repeatLine:not(.hide)").each((function(e) {
                                this.style.setProperty("--tt-anim-icon-delay", 700 * e + "ms"),
                                    this.style.setProperty("--tt-anim-text-delay", 700 * e + 300 + "ms")
                            }
                        )),
                        i.addClass("tt-anim-ready"),
                    "5" === n && window.ttModules && window.ttModules[5]) {
                        var e = i[0] && i[0]._ttWavePathEl;
                        e && window.ttModules[5].maybeReplaySpineDraw && window.ttModules[5].maybeReplaySpineDraw(i[0], e)
                    }
                    i.find(".event.repeatLine:not(.hide)").each((function() {
                            window.ttShared.fireEventShine($(this))
                        }
                    ))
                }
                function p() {
                    if (i.removeClass("tt-anim-pending"),
                        i.addClass("tt-spine-ready"),
                    "5" === n && window.ttModules && window.ttModules[5]) {
                        var e = i[0] && i[0]._ttWavePathEl;
                        e && window.ttModules[5].maybeReplaySpineDraw && window.ttModules[5].maybeReplaySpineDraw(i[0], e)
                    }
                }
            }
        },
            window.getTimetableColorFromGradient = window.ttShared.getTimetableColorFromGradient,
            window.getTimetableTitleLineColor = window.ttShared.getTitleLineColor,
            window.ensureTimetableEventShell = window.ttShared.ensureEventShell
    }(),
    function(e) {
        "use strict";
        function t(e) {
            if (e && e.length) {
                var t = e.data("ttGuestRevealObs");
                t && (t.disconnect(),
                    e.removeData("ttGuestRevealObs"));
                var n = e.data("ttGuestRevealStaggerTimer");
                n && (clearTimeout(n),
                    e.removeData("ttGuestRevealStaggerTimer")),
                    e.removeData("ttGuestRevealQueue")
            }
        }
        function n(n) {
            if (window.ttShared && window.ttShared.isGuest) {
                var o = n.find("#timetablecontent");
                if (o.length)
                    if (t(o),
                        o.find(".event.repeatLine").each((function() {
                                this.classList.remove("tt-revealed")
                            }
                        )),
                    "undefined" != typeof IntersectionObserver) {
                        var r = []
                            , i = null
                            , a = 120
                            , s = new IntersectionObserver((function(e) {
                                e.forEach((function(e) {
                                        var t;
                                        e.isIntersecting && ((t = e.target).classList.contains("tt-revealed") || -1 === r.indexOf(t) && (r.push(t),
                                            o.data("ttGuestRevealQueue", r),
                                        i || (i = setTimeout(d, a),
                                            o.data("ttGuestRevealStaggerTimer", i))))
                                    }
                                ))
                            }
                        ),{
                            threshold: 0,
                            rootMargin: "0px 0px -10% 0px"
                        });
                        o.find(".event.repeatLine:not(.hide)").each((function() {
                                s.observe(this)
                            }
                        )),
                            o.data("ttGuestRevealObs", s)
                    } else
                        o.find(".event.repeatLine:not(.hide)").each((function() {
                                l(this)
                            }
                        ))
            }
            function l(t) {
                t.classList.contains("tt-revealed") || (t.classList.add("tt-revealed"),
                window.ttShared && window.ttShared.fireEventShine && window.ttShared.fireEventShine(e(t)))
            }
            function d() {
                if (!r.length)
                    return i = null,
                        void o.removeData("ttGuestRevealStaggerTimer");
                l(r.shift()),
                    i = setTimeout(d, a),
                    o.data("ttGuestRevealStaggerTimer", i)
            }
        }
        window.ttModules[1] = {
            version: "1",
            eventTemplate: function(e) {
                return '<div class="event repeatLine' + ((e = e || {}).hide ? " hide" : "") + '" data-icon="" style="position: relative;">' + window.ttShared.repeatControlHtml + '<div class="col-xs-3" style="position: absolute;"><div class="moveBox"><div action="timetabletext_date" class="subTextLine manual"><div name="time">12:00</div><div name="date"></div><div class="clearfix"></div></div></div><div class="tt-v1-icon-cell"><div class="tt-event__photo-inner" elemplace="bgtimetablephoto"></div></div></div><div class="col-xs-9 col-sm-offset-3s col-xs-offset-4"><div class="moveBox"><div action="timetabletext_subtitle" class="subTextLine manual" name="title">Торжественная регистрация брака</div></div><div class="moveBox"><div action="timetabletext_address" class="subTextLine manual" name="address">Английская набережная, 28</div></div><div class="moveBox"><div action="timetabletext_desc" class="subTextLine manual"><div name="desc"></div></div></div></div><div class="clearfix"></div></div>'
            },
            renderEvent: function(e, t) {
                e.attr("data-icon", t.icon || ""),
                    e.find("[name=time]").text(t.time || ""),
                    e.find("[name=date]").text(t.date || ""),
                    e.find("[name=title]").text(t.title || ""),
                    e.find("[name=address]").text(t.address || ""),
                    e.find("[name=desc]").text(t.desc || ""),
                    window.ttShared.applyIcon(e, t.icon || "")
            },
            init: function(t) {
                t.removeAttr("data-no-text-align"),
                    t.find(".tt-wave-line, .tt-wave-anchor, .tt-wave-svg, .tt-wave-diamond").remove(),
                    t.find("#timetablecontent .event.repeatLine:not(.hide)").each((function() {
                            var t = e(this);
                            window.ttShared.applyIcon(t, t.attr("data-icon") || "")
                        }
                    )),
                    n(t)
            },
            destroy: function(e) {
                t(e.find("#timetablecontent")),
                    e.find(".tt-wave-line, .tt-wave-anchor, .tt-wave-svg, .tt-wave-diamond").remove()
            }
        }
    }($),
    function(e) {
        "use strict";
        function t(e) {
            if (e && e.length) {
                var t = e.data("ttGuestRevealObs");
                t && (t.disconnect(),
                    e.removeData("ttGuestRevealObs"));
                var n = e.data("ttGuestRevealStaggerTimer");
                n && (clearTimeout(n),
                    e.removeData("ttGuestRevealStaggerTimer")),
                    e.removeData("ttGuestRevealQueue")
            }
        }
        function n(n) {
            if (window.ttShared && window.ttShared.isGuest) {
                var o = n.find("#timetablecontent");
                if (o.length)
                    if (t(o),
                        o.find(".event.repeatLine").each((function() {
                                this.classList.remove("tt-revealed")
                            }
                        )),
                    "undefined" != typeof IntersectionObserver) {
                        var r = []
                            , i = null
                            , a = 120
                            , s = new IntersectionObserver((function(e) {
                                e.forEach((function(e) {
                                        var t;
                                        e.isIntersecting && ((t = e.target).classList.contains("tt-revealed") || -1 === r.indexOf(t) && (r.push(t),
                                            o.data("ttGuestRevealQueue", r),
                                        i || (i = setTimeout(d, a),
                                            o.data("ttGuestRevealStaggerTimer", i))))
                                    }
                                ))
                            }
                        ),{
                            threshold: 0,
                            rootMargin: "0px 0px -10% 0px"
                        });
                        o.find(".event.repeatLine:not(.hide)").each((function() {
                                s.observe(this)
                            }
                        )),
                            o.data("ttGuestRevealObs", s)
                    } else
                        o.find(".event.repeatLine:not(.hide)").each((function() {
                                l(this)
                            }
                        ))
            }
            function l(t) {
                t.classList.contains("tt-revealed") || (t.classList.add("tt-revealed"),
                window.ttShared && window.ttShared.fireEventShine && window.ttShared.fireEventShine(e(t)))
            }
            function d() {
                if (!r.length)
                    return i = null,
                        void o.removeData("ttGuestRevealStaggerTimer");
                l(r.shift()),
                    i = setTimeout(d, a),
                    o.data("ttGuestRevealStaggerTimer", i)
            }
        }
        function o(t) {
            !function(t) {
                t.find("#timetablecontent .event.repeatLine:not(.hide)").each((function(t) {
                        var n = e(this);
                        n.toggleClass("tt-v2-left", t % 2 == 0),
                            n.toggleClass("tt-v2-right", t % 2 != 0),
                            n.toggleClass("tt-v2-first", 0 === t)
                    }
                ))
            }(t),
                t.find("#timetablecontent .event.repeatLine:not(.hide)").each((function() {
                        var t = e(this);
                        window.ttShared.applyIcon(t, t.attr("data-icon") || "")
                    }
                ))
        }
        window.ttModules[2] = {
            version: "2",
            eventTemplate: function(e) {
                return '<div class="event repeatLine' + ((e = e || {}).hide ? " hide" : "") + '" data-icon="">' + window.ttShared.repeatControlHtml + window.ttShared.ttEventShellHtml({
                    withTooltip: !1,
                    tooltipBtn: ""
                }) + "</div>"
            },
            renderEvent: function(e, t) {
                window.ttShared.renderEventFields(e, t)
            },
            init: function(e) {
                e.attr("data-no-text-align", ""),
                    e.find(".tt-wave-line, .tt-wave-anchor, .tt-wave-svg, .tt-wave-diamond").remove(),
                    o(e),
                    n(e)
            },
            destroy: function(e) {
                e.removeAttr("data-no-text-align"),
                    t(e.find("#timetablecontent")),
                    e.find(".tt-wave-line, .tt-wave-anchor, .tt-wave-svg, .tt-wave-diamond").remove()
            },
            afterEventChange: function(e) {
                o(e),
                    n(e)
            }
        }
    }($),
    function(e) {
        "use strict";
        var t = '<span class="tt-wave-heart tt-hide-on-groupedit" aria-hidden="true" style="position:absolute;top:0;left:0;width:22px;height:22px;max-width:22px;max-height:22px;pointer-events:none;z-index:4"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>'
            , n = 20
            , o = 66
            , r = 50;
        function i(e, t, n) {
            return (e.offsetWidth || t.width / (n || 1)) / 2
        }
        function a(e) {
            var t = e._ttWaveScrollContainer || window;
            return window.ttShared && window.ttShared.resolveHeartTargetY ? window.ttShared.resolveHeartTargetY(e, t, function(e, t) {
                if (e._ttInitPassDone)
                    return !0;
                var n = !1;
                if (window.ttShared && window.ttShared.isGuest) {
                    var o = e._ttWaveAnchorReveal;
                    n = !o || !o.length || o[o.length - 1].el.classList.contains("tt-revealed")
                } else {
                    var r = e._ttWaveAnchorPoints;
                    n = !r || !r.length || (window.ttShared && window.ttShared.getViewportCenterY ? window.ttShared.getViewportCenterY(e, t, .8) : 0) >= r[r.length - 1].y
                }
                return n && (e._ttInitPassDone = !0),
                    n
            }(e, t)) : 0
        }
        function s(e) {
            var t = e.getBoundingClientRect();
            if (t.width && t.height) {
                for (var n = e._ttWaveScale || 1, r = [], a = [], s = null, l = e.querySelectorAll(".event.repeatLine:not(.hide)"), d = 0; d < l.length; d++) {
                    var c = l[d]
                        , u = c.querySelector(".tt-event__photo");
                    if (u) {
                        var v = u.getBoundingClientRect()
                            , m = (v.left + v.width / 2 - t.left) / n
                            , p = (v.top + v.height / 2 - t.top) / n
                            , h = i(u, v, n);
                        null == s && (s = m),
                            r.push({
                                x: m,
                                y: p,
                                radius: h
                            }),
                        window.ttShared && window.ttShared.isGuest && a.push({
                            y: p,
                            el: c,
                            radius: h
                        })
                    }
                }
                e._ttV3LineX = null != s ? s : o,
                    e._ttInitPassDone = !1,
                    e._ttFollow50Active = !1,
                    e._ttWaveAnchorPoints = r,
                window.ttShared && window.ttShared.isGuest && (e._ttWaveAnchorReveal = a),
                    e._ttWaveAnchorNearState = new Array(r.length);
                for (var f = 0; f < r.length; f++)
                    e._ttWaveAnchorNearState[f] = !1
            }
        }
        function l(e, t, o) {
            if (t.radius)
                return function(e, t, n) {
                    var o = e.y - t.y
                        , i = t.radius || r;
                    return !(Math.abs(o) > i) && Math.abs(o) < n
                }(e, t, n);
            var i = e.x - t.x
                , a = e.y - t.y;
            return i * i + a * a <= o * o
        }
        function d(e) {
            if (e) {
                var t = !e._ttPulseIsA;
                e._ttPulseIsA = t,
                    e.classList.remove(t ? "tt-wave-heart--pulse-b" : "tt-wave-heart--pulse-a"),
                    e.classList.add(t ? "tt-wave-heart--pulse-a" : "tt-wave-heart--pulse-b"),
                e._ttWavePulseTimer && clearTimeout(e._ttWavePulseTimer),
                    e._ttWavePulseTimer = setTimeout((function() {
                            e.classList.remove("tt-wave-heart--pulse-a", "tt-wave-heart--pulse-b"),
                                e._ttWavePulseTimer = null
                        }
                    ), 1e3)
            }
        }
        function c(e) {
            var t = e.offsetHeight || e.scrollHeight
                , n = a(e);
            return n < 0 && (n = 0),
            n > t && (n = t),
                n
        }
        function u(t, i) {
            var a = t._ttWaveHeartEl;
            if (a) {
                var s = function(e, t) {
                    var n = null != e._ttV3LineX ? e._ttV3LineX : o
                        , i = e._ttWaveAnchorPoints;
                    if (i)
                        for (var a = 0; a < i.length; a++) {
                            var s = i[a]
                                , l = s.radius || r
                                , d = t - s.y;
                            if (Math.abs(d) <= l) {
                                var c = s.x - Math.sqrt(l * l - d * d);
                                c < n && (n = c)
                            }
                        }
                    return {
                        x: n,
                        y: t
                    }
                }(t, i);
                a.style.transform = "translate(" + s.x.toFixed(1) + "px, " + s.y.toFixed(1) + "px) translate(-50%, -100%)",
                    a.classList.add("tt-wave-heart--ready"),
                    function(e, t, o) {
                        var r = e._ttWaveAnchorPoints;
                        if (r && r.length && t && o) {
                            var i = e._ttWaveAnchorNearState;
                            if (!i || i.length !== r.length) {
                                i = new Array(r.length);
                                for (var a = 0; a < i.length; a++)
                                    i[a] = !1;
                                e._ttWaveAnchorNearState = i
                            }
                            for (var s = 0; s < r.length; s++) {
                                var c = l(t, r[s], n);
                                c && !i[s] && d(o),
                                    i[s] = c
                            }
                        }
                    }(t, s, a),
                    function(t, n) {
                        if (window.ttShared && window.ttShared.isGuest) {
                            var o = t._ttWaveAnchorReveal;
                            if (o && o.length) {
                                var i = t.offsetHeight || t.scrollHeight
                                    , a = n;
                                a < 0 && (a = 0),
                                a > i && (a = i);
                                for (var s = t._ttWaveScrollContainer || window, l = !(!window.ttShared || !window.ttShared.isScrolledToBottom) && window.ttShared.isScrolledToBottom(s), d = 0; d < o.length; d++) {
                                    if (l || a >= o[d].y - 1) {
                                        var c = o[d].el.classList.contains("tt-revealed");
                                        o[d].el.classList.add("tt-revealed"),
                                        !c && window.ttShared && window.ttShared.fireEventShine && window.ttShared.fireEventShine(e(o[d].el))
                                    }
                                    a >= o[d].y + (o[d].radius || r) && !o[d].el.classList.contains("tt-line-revealed") && o[d].el.classList.add("tt-line-revealed")
                                }
                            }
                        }
                    }(t, i)
            }
        }
        function v(e) {
            if (e && !e._ttWaveHeartFrame) {
                var t = window.requestAnimationFrame || function(e) {
                        return setTimeout(e, 16)
                    }
                ;
                e._ttWaveHeartFrame = t((function n() {
                        var o = c(e)
                            , r = window.ttShared && window.ttShared.isGuest && window.ttShared.smoothHeartY ? window.ttShared.smoothHeartY(e, o) : {
                            y: o,
                            settled: !0
                        };
                        u(e, r.y),
                            r.settled ? e._ttWaveHeartFrame = null : e._ttWaveHeartFrame = t(n)
                    }
                ))
            }
        }
        function m(e) {
            if (e && e._ttWaveHeartBound) {
                var t = e._ttWaveHeartScrollHandler
                    , n = e._ttWaveScrollContainer || window;
                if (t && (n === window ? window.removeEventListener("scroll", t) : n.removeEventListener("scroll", t)),
                    e._ttWaveHeartFrame)
                    (window.cancelAnimationFrame || clearTimeout)(e._ttWaveHeartFrame),
                        e._ttWaveHeartFrame = null;
                window.ttShared && window.ttShared.resetHeartSmoothing && window.ttShared.resetHeartSmoothing(e),
                    e._ttWaveHeartBound = !1,
                    e._ttWaveHeartScrollHandler = null,
                    e._ttWaveScrollContainer = null,
                    e._ttWaveHeartEl = null,
                    e._ttWaveAnchorPoints = null,
                    e._ttWaveAnchorReveal = null,
                    e._ttWaveAnchorNearState = null,
                    e._ttWaveScale = null,
                    e._ttV3LineX = null,
                e._ttV3ResizeObserver && (e._ttV3ResizeObserver.disconnect(),
                    e._ttV3ResizeObserver = null),
                e._ttV3ScreenObserver && (e._ttV3ScreenObserver.disconnect(),
                    e._ttV3ScreenObserver = null),
                e._ttV3ScaleRetryTimer && (clearTimeout(e._ttV3ScaleRetryTimer),
                    e._ttV3ScaleRetryTimer = null)
            }
        }
        function p(n) {
            var o = n.find("#timetablecontent");
            if (o.length) {
                var r = o[0];
                if (window.ttShared && window.ttShared.isPaperTimetable(n))
                    return m(r),
                        o.find(".tt-wave-heart").remove(),
                        void (r._ttWaveHeartEl = null);
                m(r),
                window.ttShared && window.ttShared.resetHeartSmoothing && window.ttShared.resetHeartSmoothing(r),
                    function(n) {
                        var o = n[0];
                        if (!o)
                            return null;
                        var r = o._ttWaveHeartEl;
                        r && o.contains(r) || (n.find(".tt-wave-heart").remove(),
                            r = e(t)[0],
                            n.append(r),
                            o._ttWaveHeartEl = r),
                            r.classList.add("tt-hide-on-groupedit")
                    }(o),
                    requestAnimationFrame((function() {
                            window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(r),
                                s(r),
                                function(t) {
                                    var n = t[0];
                                    if (n && !n._ttWaveHeartBound) {
                                        n._ttWaveHeartBound = !0,
                                        window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(n),
                                            n._ttScheduleHeartUpdate = function() {
                                                v(n)
                                            }
                                        ;
                                        var o = function() {
                                            v(n)
                                        };
                                        n._ttWaveHeartScrollHandler = o;
                                        var r = n._ttWaveScrollContainer;
                                        if (r === window ? window.addEventListener("scroll", o, {
                                            passive: !0
                                        }) : r.addEventListener("scroll", o, {
                                            passive: !0
                                        }),
                                        window._ttV3HeartGlobalResizeBound || (window._ttV3HeartGlobalResizeBound = !0,
                                            window.addEventListener("resize", (function() {
                                                    e('.element_tt[version_tt="3"] #timetablecontent').each((function() {
                                                            window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(this),
                                                                s(this),
                                                                v(this)
                                                        }
                                                    ))
                                                }
                                            ), {
                                                passive: !0
                                            })),
                                        window.ResizeObserver && !n._ttV3ResizeObserver) {
                                            var i = new ResizeObserver((function() {
                                                    window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(n),
                                                        s(n),
                                                        v(n)
                                                }
                                            ));
                                            i.observe(n),
                                                n._ttV3ResizeObserver = i
                                        }
                                        if (!n._ttV3ScreenObserver) {
                                            var a = document.getElementById("screen");
                                            if (a) {
                                                var l = new MutationObserver((function() {
                                                        n._ttV3ScaleRetryTimer && clearTimeout(n._ttV3ScaleRetryTimer),
                                                            n._ttV3ScaleRetryTimer = setTimeout((function() {
                                                                    n._ttV3ScaleRetryTimer = null,
                                                                    window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(n),
                                                                        s(n),
                                                                        v(n)
                                                                }
                                                            ), 350)
                                                    }
                                                ));
                                                l.observe(a, {
                                                    attributes: !0,
                                                    attributeFilter: ["style", "class"]
                                                }),
                                                    n._ttV3ScreenObserver = l
                                            }
                                        }
                                        v(n)
                                    }
                                }(o),
                                v(r),
                                setTimeout((function() {
                                        window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(r),
                                            s(r),
                                            v(r)
                                    }
                                ), 300)
                        }
                    ))
            }
        }
        function h(e, t) {
            if (e && e.length && "3" === e.attr("version_tt")) {
                var n = e.find("#timetablecontent");
                if (n.length) {
                    var o = t || (window.ttShared && window.ttShared.getTitleLineColor ? window.ttShared.getTitleLineColor(n) : "");
                    o && "transparent" !== o && n[0].style.setProperty("--tt-v3-timeline-color", o);
                    var r = window._ttGetAgreeBtnColor && window._ttGetAgreeBtnColor() || window._ttDefaultHeartColor || "#7e1232";
                    n[0].style.setProperty("--tt-wave-heart-color", r)
                }
            }
        }
        window.ttModules[3] = {
            version: "3",
            eventTemplate: function(e) {
                return '<div class="event repeatLine' + ((e = e || {}).hide ? " hide" : "") + '" data-icon="">' + window.ttShared.repeatControlHtml + window.ttShared.ttEventShellHtml({
                    withTooltip: !0,
                    tooltipBtn: ""
                }) + "</div>"
            },
            renderEvent: function(e, t) {
                window.ttShared.renderEventFields(e, t)
            },
            init: function(t) {
                if (t && t.length) {
                    var n = t.find("#timetablecontent");
                    if (n.length)
                        window.ttShared && window.ttShared.isGuest && n.find(".event.repeatLine").each((function() {
                                this.classList.remove("tt-revealed"),
                                    this.classList.remove("tt-line-revealed")
                            }
                        )),
                            !function(t) {
                                window.ttShared && window.ttShared.applyIcon && t.each((function() {
                                        var t = e(this)
                                            , n = window.ttShared.ensureEventShell(t);
                                        n.length && !n.children(".tt-event__photo").length && n.prepend('<div class="tt-event__photo"><div class="tt-event__photo-inner" elemplace="bgtimetablephoto"></div></div>'),
                                            window.ttShared.applyIcon(t, t.attr("data-icon") || "")
                                    }
                                ))
                            }(n.find(".event.repeatLine:not(.hide)")),
                            h(t),
                            p(t)
                }
            },
            destroy: function(e) {
                var t = e.find("#timetablecontent");
                t.length && (m(t[0]),
                    t.find(".tt-wave-heart").remove()),
                    e.find(".tt-wave-line, .tt-wave-anchor").remove()
            },
            afterEventChange: function(e) {
                this.init(e)
            },
            syncColor: h
        },
            window.initTimetableClassic = function(e) {
                e && e.length && "3" === String(e.attr("version_tt") || "1") && window.ttModules[3].init(e)
            }
            ,
            window.syncTimetableClassicColor = function(e, t) {
                e && e.length && "3" === String(e.attr("version_tt") || "1") && h(e, t)
            }
    }($),
    function(e) {
        "use strict";
        var t = '<span class="tt-wave-heart tt-hide-on-groupedit" aria-hidden="true" style="position:absolute;top:0;left:0;width:22px;height:22px;max-width:22px;max-height:22px;pointer-events:none;z-index:4"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>'
            , n = 20;
        function o(t) {
            t && t.length && t.find("#timetablecontent .event.repeatLine:not(.hide)").each((function() {
                    var t = e(this);
                    t.find("[name=desc]").text().replace(/\s+/g, " ").trim() ? t[0].classList.remove("tt-v4-no-desc") : t[0].classList.add("tt-v4-no-desc")
                }
            ))
        }
        function r(e) {
            var t = e._ttWaveScrollContainer || window;
            return window.ttShared && window.ttShared.resolveHeartTargetY ? window.ttShared.resolveHeartTargetY(e, t, function(e, t) {
                if (e._ttInitPassDone)
                    return !0;
                var n = !1;
                if (window.ttShared && window.ttShared.isGuest) {
                    var o = e._ttWaveAnchorReveal;
                    n = !o || !o.length || o[o.length - 1].el.classList.contains("tt-revealed")
                } else {
                    var r = e._ttWaveAnchorPoints;
                    if (r && r.length)
                        n = (window.ttShared && window.ttShared.getViewportCenterY ? window.ttShared.getViewportCenterY(e, t, .8) : 0) >= r[r.length - 1].y;
                    else
                        n = !0
                }
                n && (e._ttInitPassDone = !0);
                return n
            }(e, t)) : 0
        }
        function i(e, t) {
            var n = e._ttWaveMaxY;
            if (null == n || isNaN(n)) {
                var o = e._ttWaveAnchorPoints;
                o && o.length && (n = o[o.length - 1].y)
            }
            return null != n && !isNaN(n) && t > n && (t = n),
            t < 0 && (t = 0),
                t
        }
        function a(e) {
            var t = e.getBoundingClientRect();
            if (t.height) {
                for (var n = e._ttWaveScale || 1, o = e.offsetWidth / 2, r = [], i = [], a = e.querySelectorAll(".event.repeatLine:not(.hide)"), s = 0; s < a.length; s++) {
                    var l = a[s]
                        , d = l.querySelector(".tt-event__time") || l.querySelector('[action="timetabletext_date"]');
                    if (d) {
                        var c = d.getBoundingClientRect()
                            , u = (c.top + c.height / 2 - t.top) / n;
                        r.push({
                            x: o,
                            y: u
                        }),
                        window.ttShared && window.ttShared.isGuest && i.push({
                            y: u,
                            el: l
                        })
                    }
                }
                e._ttWaveAnchorPoints = r,
                    e._ttInitPassDone = !1,
                    e._ttFollow50Active = !1,
                window.ttShared && window.ttShared.isGuest && (e._ttWaveAnchorReveal = i),
                    e._ttWaveAnchorNearState = new Array(r.length);
                for (var v = 0; v < r.length; v++)
                    e._ttWaveAnchorNearState[v] = !1;
                r.length ? (e._ttWaveMaxY = r[r.length - 1].y,
                    e.style.setProperty("--tt-v4-spine-height", e._ttWaveMaxY + "px")) : (e._ttWaveMaxY = null,
                    e.style.removeProperty("--tt-v4-spine-height"))
            }
        }
        function s(e, t, n) {
            var o = e.x - t.x
                , r = e.y - t.y;
            return o * o + r * r <= n * n
        }
        function l(e) {
            if (e) {
                var t = !e._ttPulseIsA;
                e._ttPulseIsA = t,
                    e.classList.remove(t ? "tt-wave-heart--pulse-b" : "tt-wave-heart--pulse-a"),
                    e.classList.add(t ? "tt-wave-heart--pulse-a" : "tt-wave-heart--pulse-b"),
                e._ttWavePulseTimer && clearTimeout(e._ttWavePulseTimer),
                    e._ttWavePulseTimer = setTimeout((function() {
                            e.classList.remove("tt-wave-heart--pulse-a", "tt-wave-heart--pulse-b"),
                                e._ttWavePulseTimer = null
                        }
                    ), 1e3)
            }
        }
        function d(e) {
            var t = i(e, r(e))
                , n = e._ttWaveScrollContainer || window
                , o = e._ttWaveMaxY
                , s = !(!window.ttShared || !window.ttShared.isScrolledToBottom) && window.ttShared.isScrolledToBottom(n);
            return window.ttShared && window.ttShared.isGuest && !s && null != o && !isNaN(o) && t >= o - 1 && (window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(e),
                a(e),
                o = e._ttWaveMaxY,
                t = i(e, r(e))),
            null == o || isNaN(o) || !s || e._ttFollow50Active || (t = o),
                t
        }
        function c(t, o) {
            var r = t._ttWaveHeartEl;
            if (r) {
                var i = t.offsetWidth / 2
                    , a = t._ttWaveMaxY
                    , d = o;
                null != a && !isNaN(a) && d >= a && (d = a + 11);
                var c = {
                    x: i,
                    y: d
                };
                r.style.transform = "translate(" + c.x.toFixed(1) + "px, " + c.y.toFixed(1) + "px) translate(-50%, -150%)",
                    r.classList.add("tt-wave-heart--ready"),
                    function(e, t, o) {
                        var r = e._ttWaveAnchorPoints;
                        if (r && r.length && t && o) {
                            var i = e._ttWaveAnchorNearState;
                            if (!i || i.length !== r.length) {
                                i = new Array(r.length);
                                for (var a = 0; a < i.length; a++)
                                    i[a] = !1;
                                e._ttWaveAnchorNearState = i
                            }
                            for (var d = 0; d < r.length; d++) {
                                var c = s(t, r[d], n);
                                c && !i[d] && l(o),
                                    i[d] = c
                            }
                        }
                    }(t, {
                        x: i,
                        y: o
                    }, r),
                    function(t, n) {
                        if (window.ttShared && window.ttShared.isGuest) {
                            var o = t._ttWaveAnchorReveal;
                            if (o && o.length)
                                for (var r = t._ttWaveScrollContainer || window, i = !(!window.ttShared || !window.ttShared.isScrolledToBottom) && window.ttShared.isScrolledToBottom(r), a = 0; a < o.length; a++)
                                    if (i || n >= o[a].y - 1) {
                                        var s = o[a].el.classList.contains("tt-revealed");
                                        o[a].el.classList.add("tt-revealed"),
                                        !s && window.ttShared && window.ttShared.fireEventShine && window.ttShared.fireEventShine(e(o[a].el))
                                    }
                        }
                    }(t, o)
            }
        }
        function u(e) {
            if (e && !e._ttWaveHeartFrame) {
                var t = window.requestAnimationFrame || function(e) {
                        return setTimeout(e, 16)
                    }
                ;
                e._ttWaveHeartFrame = t((function n() {
                        var o = d(e)
                            , r = window.ttShared && window.ttShared.isGuest && window.ttShared.smoothHeartY ? window.ttShared.smoothHeartY(e, o) : {
                            y: o,
                            settled: !0
                        };
                        e._ttWaitingForFadeIn || c(e, r.y),
                            r.settled ? e._ttWaveHeartFrame = null : e._ttWaveHeartFrame = t(n)
                    }
                ))
            }
        }
        function v(e) {
            if (e && e._ttWaveHeartBound) {
                var t = e._ttWaveHeartScrollHandler
                    , n = e._ttWaveScrollContainer || window;
                if (t && (n === window ? window.removeEventListener("scroll", t) : n.removeEventListener("scroll", t)),
                    e._ttWaveHeartFrame)
                    (window.cancelAnimationFrame || clearTimeout)(e._ttWaveHeartFrame),
                        e._ttWaveHeartFrame = null;
                window.ttShared && window.ttShared.resetHeartSmoothing && window.ttShared.resetHeartSmoothing(e),
                e._ttV4ResizeObserver && (e._ttV4ResizeObserver.disconnect(),
                    e._ttV4ResizeObserver = null),
                    e._ttWaveHeartBound = !1,
                    e._ttWaveHeartScrollHandler = null,
                    e._ttWaveScrollContainer = null,
                    e._ttWaveHeartEl = null,
                    e._ttWaveAnchorPoints = null,
                    e._ttWaveAnchorNearState = null,
                    e._ttWaveScale = null
            }
        }
        function m(n) {
            var o = n.find("#timetablecontent");
            if (o.length) {
                if (window.ttShared && window.ttShared.isPaperTimetable(n))
                    return v(o[0]),
                        o.find(".tt-wave-heart").remove(),
                        void (o[0]._ttWaveHeartEl = null);
                v(o[0]),
                window.ttShared && window.ttShared.resetHeartSmoothing && window.ttShared.resetHeartSmoothing(o[0]),
                    function(n) {
                        var o = n[0];
                        if (!o)
                            return null;
                        var r = o._ttWaveHeartEl;
                        r && o.contains(r) || (n.find(".tt-wave-heart").remove(),
                            r = e(t)[0],
                            n.prepend(r),
                            o._ttWaveHeartEl = r),
                            r.classList.add("tt-hide-on-groupedit")
                    }(o),
                    function(t) {
                        var n = t[0];
                        if (n && !n._ttWaveHeartBound) {
                            n._ttWaveHeartBound = !0,
                            window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(n),
                                n._ttScheduleHeartUpdate = function() {
                                    u(n)
                                }
                            ;
                            var o = function() {
                                u(n)
                            };
                            n._ttWaveHeartScrollHandler = o;
                            var r = n._ttWaveScrollContainer;
                            if (r === window ? window.addEventListener("scroll", o, {
                                passive: !0
                            }) : r.addEventListener("scroll", o, {
                                passive: !0
                            }),
                            window._ttV4HeartGlobalResizeBound || (window._ttV4HeartGlobalResizeBound = !0,
                                window.addEventListener("resize", (function() {
                                        e('.element_tt[version_tt="4"] #timetablecontent').each((function() {
                                                window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(this),
                                                    a(this),
                                                    u(this)
                                            }
                                        ))
                                    }
                                ), {
                                    passive: !0
                                })),
                            window.ResizeObserver && !n._ttV4ResizeObserver) {
                                var i = new ResizeObserver((function() {
                                        var t = e(n).closest(".element_tt");
                                        t.length && (b(t),
                                        n.closest(".hoverborderGroup") || w(e(n), p())),
                                        window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(n),
                                            a(n),
                                            u(n)
                                    }
                                ));
                                i.observe(n),
                                    n._ttV4ResizeObserver = i
                            }
                            u(n)
                        }
                    }(o),
                    requestAnimationFrame((function() {
                            window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(o[0]),
                                a(o[0]),
                                u(o[0])
                        }
                    ))
            }
        }
        function p() {
            var t = "";
            if (window.ttShared && window.ttShared.isGuest && window._ttGuestWeddingDate && (t = String(window._ttGuestWeddingDate)),
                !t) {
                var n = e("#constructorContent input[name=date]");
                n.length && (t = n.val() || "")
            }
            return !t && "undefined" != typeof date && date && (t = String(date)),
            !t && void 0 !== e && e.cookie && (t = e.cookie("var_date") || ""),
                (t || "").replace(/\s+/g, " ").trim()
        }
        function h(e) {
            if (!e)
                return !0;
            var t = String(e).replace(/\s/g, "").toLowerCase();
            return "transparent" === t || "rgba(0,0,0,0)" === t || "rgba(0,0,0,0.0)" === t
        }
        function f(e) {
            if (e && e.length) {
                var t = e[0].querySelector(".tt-v4-date-badge");
                if (t) {
                    var n, o, r, i = window.ttShared && window.ttShared.loadFieldStyles ? (window.ttShared.loadFieldStyles(e) || {}).time : null, a = ["fontFamily", "fontSize", "fontWeight", "letterSpacing", "lineHeight"];
                    if (i)
                        for (n = 0; n < a.length; n++)
                            r = (o = a[n]).replace(/([A-Z])/g, "-$1").toLowerCase(),
                                i[o] ? t.style.setProperty(r, i[o]) : t.style.removeProperty(r);
                    var s = e[0].querySelector('.event.repeatLine:not(.hide) .tt-event__time, .event.repeatLine:not(.hide) [action="timetabletext_date"]');
                    if (s) {
                        var l = window.getComputedStyle(s);
                        i ? (!i.fontFamily && l.fontFamily && (t.style.fontFamily = l.fontFamily),
                        !i.fontSize && l.fontSize && (t.style.fontSize = l.fontSize),
                        !i.fontWeight && l.fontWeight && (t.style.fontWeight = l.fontWeight),
                        !i.letterSpacing && l.letterSpacing && (t.style.letterSpacing = l.letterSpacing),
                        !i.lineHeight && l.lineHeight && (t.style.lineHeight = l.lineHeight)) : (t.style.fontFamily = l.fontFamily,
                            t.style.fontSize = l.fontSize,
                            t.style.fontWeight = l.fontWeight,
                            t.style.letterSpacing = l.letterSpacing,
                            t.style.lineHeight = l.lineHeight)
                    }
                    var d = function(e, t) {
                        var n = "";
                        if (e && e.gradient && window.ttShared && window.ttShared.getTimetableColorFromGradient && (n = window.ttShared.getTimetableColorFromGradient(e.gradient) || ""),
                        !n && e && e.color && !h(e.color) && (n = e.color),
                        !n && t) {
                            var o = t.getAttribute("data-font-gradient");
                            if (o && window.ttShared && window.ttShared.getTimetableColorFromGradient && (n = window.ttShared.getTimetableColorFromGradient(o) || ""),
                                !n) {
                                var r = window.getComputedStyle(t).color;
                                h(r) || (n = r)
                            }
                        }
                        return n
                    }(i, s);
                    d ? t.style.setProperty("color", d) : t.style.removeProperty("color"),
                        t.classList.remove("text-gradient-font"),
                        t.removeAttribute("data-font-gradient"),
                        t.style.removeProperty("--text-gradient-base"),
                        t.style.removeProperty("background-image"),
                        t.style.removeProperty("-webkit-background-clip")
                }
            }
        }
        function w(t, n) {
            if (t && t.length) {
                var o = t[0];
                if (!(n = (n || "").replace(/\s+/g, " ").trim()))
                    return t.find(".tt-v4-date-badge").remove(),
                        void o.style.removeProperty("--tt-v4-badge-offset");
                var r = o.querySelector(".tt-v4-date-badge");
                if (r || (r = e('<div class="tt-v4-date-badge tt-hide-on-groupedit subTextLine" action="timetabletext_date" aria-hidden="true"></div>')[0],
                    t.prepend(r)),
                    r.classList.add("tt-hide-on-groupedit"),
                    r.textContent = n,
                    f(t),
                !o.closest(".hoverborderGroup") && !r.classList.contains("textLine")) {
                    var i = r.offsetHeight || r.getBoundingClientRect().height || 0;
                    o.style.setProperty("--tt-v4-badge-offset", (i > 0 ? Math.ceil(i) : 0) + "px")
                }
            }
        }
        function g(e, t) {
            if (e && e.length && "4" === e.attr("version_tt")) {
                var n = e.find("#timetablecontent");
                if (n.length) {
                    var o = t || (window.ttShared && window.ttShared.getTitleLineColor ? window.ttShared.getTitleLineColor(n) : "");
                    o && "transparent" !== o && n[0].style.setProperty("--tt-v4-timeline-color", o);
                    var r = window._ttGetAgreeBtnColor && window._ttGetAgreeBtnColor() || ""
                        , i = r || window._ttDefaultHeartColor || "#7e1232";
                    if (n[0].style.setProperty("--tt-wave-heart-color", i),
                    r && window._ttNormalizeHexColor) {
                        var a = window._ttNormalizeHexColor(r);
                        a && (window._ttDefaultIconColor = a)
                    }
                    var s = r || "#fff";
                    n[0].style.setProperty("--tt-v4-tooltip-bg", s);
                    var l = null
                        , d = "";
                    r ? (l = function(e) {
                        if (!e)
                            return null;
                        var t, n, o, r = String(e).replace(/\s/g, "").toLowerCase(), i = r.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/), a = r.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})(?:[0-9a-f]{2})?$/), s = r.match(/^rgba?\((\d+),(\d+),(\d+)/);
                        if (i)
                            t = parseInt(i[1] + i[1], 16),
                                n = parseInt(i[2] + i[2], 16),
                                o = parseInt(i[3] + i[3], 16);
                        else if (a)
                            t = parseInt(a[1], 16),
                                n = parseInt(a[2], 16),
                                o = parseInt(a[3], 16);
                        else {
                            if (!s)
                                return null;
                            t = parseInt(s[1], 10),
                                n = parseInt(s[2], 10),
                                o = parseInt(s[3], 10)
                        }
                        function l(e) {
                            var t = e / 255;
                            return t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
                        }
                        return .2126 * l(t) + .7152 * l(n) + .0722 * l(o)
                    }(r),
                    null !== l && (d = l < .5 ? "#fff" : "#000")) : d = "#000",
                        d ? n[0].style.setProperty("--tt-v4-tooltip-color", d) : n[0].style.removeProperty("--tt-v4-tooltip-color");
                    var c, u = n[0].querySelectorAll(".tt-event__address, .tt-event__desc");
                    for (c = 0; c < u.length; c++)
                        d ? u[c].style.color = d : u[c].style.removeProperty("color");
                    f(n)
                }
            }
        }
        function y(e) {
            var t = e.find("#timetablecontent");
            if (t.length) {
                var n = t[0]
                    , o = n.querySelectorAll(".event.repeatLine:not(.hide)");
                if (!o.length)
                    return n.style.removeProperty("--tt-v4-spine-height"),
                        void (n._ttWaveMaxY = null);
                var r = function(e, t) {
                    if (!e || !t)
                        return null;
                    var n = t.querySelector(".tt-event__time") || t.querySelector('[action="timetabletext_date"]') || t.querySelector(".tt-event__title");
                    if (!n)
                        return null;
                    var o = e.getBoundingClientRect()
                        , r = n.getBoundingClientRect();
                    return r.height ? r.top + r.height / 2 - o.top : null
                }(n, o[o.length - 1]);
                return null == r || isNaN(r) ? (n.style.removeProperty("--tt-v4-spine-height"),
                    void (n._ttWaveMaxY = null)) : (n._ttWaveMaxY = r,
                    n.style.setProperty("--tt-v4-spine-height", r + "px"),
                    r)
            }
        }
        function b(e) {
            if (e && e.length && "4" === e.attr("version_tt")) {
                !function(e) {
                    var t = e.find("#timetablecontent")[0];
                    if (t) {
                        var n, o = t.querySelectorAll(".event.repeatLine");
                        for (n = 0; n < o.length; n++)
                            o[n].classList.remove("tt-v4-last-visible");
                        var r = t.querySelectorAll(".event.repeatLine:not(.hide)");
                        r.length && r[r.length - 1].classList.add("tt-v4-last-visible")
                    }
                }(e);
                var t = e.find("#timetablecontent")[0]
                    , n = 1;
                if (t)
                    if (t._ttWaveScale)
                        n = t._ttWaveScale;
                    else {
                        var o = t.getBoundingClientRect();
                        o.width && t.offsetWidth && (n = o.width / t.offsetWidth)
                    }
                e.find("#timetablecontent .event.repeatLine:not(.hide)").each((function() {
                        var e = this
                            , t = e.querySelector(".tt-event__time") || e.querySelector('[action="timetabletext_date"]') || e.querySelector(".tt-event__title");
                        if (t) {
                            var o = e.getBoundingClientRect()
                                , r = t.getBoundingClientRect();
                            if (o.height) {
                                var i = (r.top + r.height / 2 - o.top) / n;
                                e.style.setProperty("--tt-v4-connector-top", i + "px")
                            } else
                                e.style.removeProperty("--tt-v4-connector-top")
                        } else
                            e.style.removeProperty("--tt-v4-connector-top")
                    }
                ))
            }
        }
        function _(e) {
            if (e && e.length && "4" === e.attr("version_tt") && !e.closest(".hoverborderGroup").length && !e.find("#timetablecontent").closest(".hoverborderGroup").length) {
                var t = e.find("#timetablecontent");
                requestAnimationFrame((function() {
                        e.closest(".hoverborderGroup").length || e.find("#timetablecontent").closest(".hoverborderGroup").length || (w(t, p()),
                            b(e),
                            y(e),
                        t.length && (window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(t[0]),
                            a(t[0]),
                            u(t[0])),
                            requestAnimationFrame((function() {
                                    e.closest(".hoverborderGroup").length || e.find("#timetablecontent").closest(".hoverborderGroup").length || (w(t, p()),
                                        b(e),
                                        y(e),
                                    t.length && (a(t[0]),
                                        u(t[0])))
                                }
                            )))
                    }
                ))
            }
        }
        window.ttModules[4] = {
            version: "4",
            eventTemplate: function(e) {
                return '<div class="event repeatLine' + ((e = e || {}).hide ? " hide" : "") + '" data-icon="">' + window.ttShared.repeatControlHtml + window.ttShared.ttEventShellHtml({
                    withTooltip: !0,
                    tooltipBtn: window.ttShared.tooltipBtnHtml(),
                    iconInTitleRow: !0
                }) + "</div>"
            },
            renderEvent: function(e, t) {
                window.ttShared.renderEventFields(e, t);
                var n = (t && t.desc || "").replace(/\s+/g, " ").trim();
                e[0].classList.toggle("tt-v4-no-desc", !n)
            },
            init: function(t) {
                t.attr("data-no-text-align", ""),
                window.ttShared && window.ttShared.isGuest && t.find("#timetablecontent .event.repeatLine").each((function() {
                        this.classList.remove("tt-revealed")
                    }
                )),
                    t.find(".tt-wave-line, .tt-wave-anchor, .tt-wave-svg, .tt-wave-diamond").remove(),
                    t.find(".tt-event").removeClass("tt-tooltip-open"),
                    function(t) {
                        t.find(".tt-event__tooltip-btn").each((function() {
                                var t = e(this);
                                t.find(".tt-event__tooltip-btn-icon").remove();
                                var n = t.find("i.fa");
                                n.hasClass("fa-info-circle") || (n.remove(),
                                    t.append('<i class="fa fa-info-circle" aria-hidden="true"></i>'),
                                    t.attr("aria-label", "i"))
                            }
                        ))
                    }(t),
                    o(t),
                    t.find("#timetablecontent .event.repeatLine:not(.hide)").each((function() {
                            var t = e(this);
                            window.ttShared.ensureV4Photo(t),
                                window.ttShared.ensureV4TooltipInTitle(t);
                            var n = t.attr("data-icon") || "";
                            n && "-1" !== n && window.ttShared.applyIcon(t, n)
                        }
                    )),
                    g(t),
                    w(t.find("#timetablecontent"), p()),
                    m(t),
                    window.ttShared && window.ttShared.isPaperTimetable(t) ? b(t) : requestAnimationFrame((function() {
                            b(t);
                            var e = t.find("#timetablecontent");
                            e.length && (a(e[0]),
                                u(e[0])),
                                requestAnimationFrame((function() {
                                        b(t),
                                        e.length && (a(e[0]),
                                            u(e[0]))
                                    }
                                ))
                        }
                    ))
            },
            destroy: function(e) {
                e.removeAttr("data-no-text-align");
                var t = e.find("#timetablecontent");
                t.length && (v(t[0]),
                    t.find(".tt-wave-heart").remove(),
                    t.find(".tt-v4-date-badge").remove(),
                    t[0].style.removeProperty("--tt-v4-badge-offset")),
                    e.find(".tt-event").removeClass("tt-tooltip-open"),
                    e.find(".tt-wave-line, .tt-wave-anchor").remove()
            },
            afterEventChange: function(e) {
                g(e),
                    o(e),
                    w(e.find("#timetablecontent"), p());
                var t = e.find("#timetablecontent");
                requestAnimationFrame((function() {
                        b(e),
                        t.length && (window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(t[0]),
                            a(t[0]),
                            u(t[0]))
                    }
                ))
            },
            syncColor: g,
            syncConnectorTop: b,
            scheduleLayoutSync: _,
            ensureDateBadge: function(e, t) {
                e && e.length && w(e.find("#timetablecontent"), null != t ? t : p())
            }
        },
            window.syncTimetableDualColor = function(e, t) {
                g(e, t)
            }
            ,
            window.syncTimetableDualTimelineColor = window.syncTimetableDualColor,
            window.syncTimetableDualConnectorTop = b,
            window.syncTimetableDualLayoutSync = _
    }($),
    function(e) {
        "use strict";
        function t(t) {
            t.each((function(t) {
                    var n = e(this)
                        , o = t % 2 == 0 ? "left" : "right";
                    n.removeClass("tt-wave-left tt-wave-right"),
                        n.addClass("left" === o ? "tt-wave-left" : "tt-wave-right"),
                        function(e, t) {
                            var n = "right" === t ? "right" : "left"
                                , o = "right" === t ? "flex-end" : "flex-start";
                            e.find('.tt-event__body, .moveBox, [action^="timetabletext"], .subTextLine').each((function() {
                                    this.style.setProperty("text-align", n),
                                        this.style.setProperty("align-items", o)
                                }
                            )),
                                e.children(".col-xs-3, .col-xs-9").each((function() {
                                        this.style.setProperty("text-align", n)
                                    }
                                ))
                        }(n, o)
                }
            ))
        }
        function n(t) {
            t.each((function() {
                    var t = e(this)
                        , n = t.children(".tt-wave-anchor");
                    n.length > 1 && n.slice(1).remove();
                    var o = t.children(".tt-wave-anchor").first();
                    o.length || (o = e('<span class="tt-wave-anchor tt-wave-anchor--empty" aria-hidden="true"></span>'),
                        t.append(o));
                    var r = t.children(".tt-wave-icon");
                    r.length > 1 && r.slice(1).remove();
                    var i = t.children(".tt-wave-icon").first();
                    i.length || (i = e('<span class="tt-wave-icon" aria-hidden="true"></span>'),
                        t.append(i)),
                    o.children("svg, .tt-icon-emoji").length && !i.children("svg, .tt-icon-emoji").length && o.children("svg, .tt-icon-emoji").appendTo(i),
                        o.addClass("tt-wave-anchor--empty"),
                        o.children("svg, .tt-icon-emoji, img.emoji").remove(),
                        o.css({
                            "background-image": "",
                            "background-size": "",
                            "background-position": "",
                            width: "",
                            height: ""
                        });
                    var a = t.attr("data-icon") || "";
                    if (window._ttNormalizeIconStr) {
                        var s = window._ttNormalizeIconStr(a);
                        s && s !== a && (a = s,
                            t.attr("data-icon", a))
                    }
                    var l = a && "-1" !== a
                        , d = i.data("tt-wave-icon") || "";
                    if (i.children("svg").length > 1 && i.children("svg").slice(1).remove(),
                        i.toggleClass("tt-wave-icon--empty", !l),
                    l && window._ttApplyIcon) {
                        if (window._ttWaveAnchorIconApplied && window._ttWaveAnchorIconApplied(i, a))
                            return;
                        i.data("tt-wave-icon", a),
                            window._ttApplyIcon(i, a)
                    } else
                        !l && d && (i.data("tt-wave-icon", ""),
                            i.children("svg, .tt-icon-emoji, img.emoji").remove(),
                            i.css({
                                "background-image": "",
                                "background-size": "",
                                "background-position": "",
                                width: "",
                                height: ""
                            }))
                }
            ))
        }
        function o(e) {
            return window.ttShared && window.ttShared.getTitleLineColor ? window.ttShared.getTitleLineColor(e) : ""
        }
        function r(t, n) {
            if (t && t.length && "5" === t.attr("version_tt")) {
                var r = t.find("#timetablecontent");
                if (r.length) {
                    var i = n || o(r);
                    i && "transparent" !== i && r[0].style.setProperty("--tt-wave-color", i);
                    var a = window._ttGetAgreeBtnColor && window._ttGetAgreeBtnColor() || window._ttDefaultHeartColor || "#7e1232";
                    r[0].style.setProperty("--tt-wave-heart-color", a);
                    var s = window._ttNormalizeHexColor ? window._ttNormalizeHexColor(a) : ""
                        , l = r[0];
                    l.getAttribute("data-tt-icon-heart") || "" || s && window._ttIconWithColor && (l.setAttribute("data-tt-icon-heart", s),
                        window._ttDefaultIconColor = s,
                    window._ttClearIconColorSession && window._ttClearIconColorSession(),
                        r.find(".event.repeatLine:not(.hide)").each((function() {
                                var t = e(this)
                                    , n = t.attr("data-icon") || "";
                                if (n && "-1" !== n) {
                                    var o = window._ttIconWithColor(n, s);
                                    if (o && o !== n) {
                                        t.attr("data-icon", o);
                                        var r = t.children(".tt-wave-icon").first();
                                        r.length && r.data("tt-wave-icon", "")
                                    }
                                }
                            }
                        )))
                }
            }
        }
        var i = '<span class="tt-wave-heart tt-hide-on-groupedit" aria-hidden="true" style="position:absolute;top:0;left:0;width:22px;height:22px;max-width:22px;max-height:22px;pointer-events:none;z-index:20"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>';
        function a(e, t) {
            var n = e.getTotalLength();
            if (n <= 0)
                return 0;
            var o = e.getPointAtLength(0)
                , r = e.getPointAtLength(n);
            if (t <= o.y)
                return 0;
            if (t >= r.y)
                return n;
            for (var i, a = 0, s = n, l = 0; l < 25; l++)
                i = (a + s) / 2,
                    e.getPointAtLength(i).y < t ? a = i : s = i;
            return (a + s) / 2
        }
        function s(e) {
            var t = e._ttWaveScrollContainer || window;
            return window.ttShared && window.ttShared.resolveHeartTargetY ? window.ttShared.resolveHeartTargetY(e, t, function(e, t) {
                if (e._ttInitPassDone)
                    return !0;
                var n = !1;
                if (window.ttShared && window.ttShared.isGuest) {
                    var o = e._ttWaveAnchorReveal;
                    n = !o || !o.length || o[o.length - 1].el.classList.contains("tt-revealed")
                } else {
                    var r = e._ttWaveAnchorPoints;
                    n = !r || !r.length || (window.ttShared && window.ttShared.getViewportCenterY ? window.ttShared.getViewportCenterY(e, t, .8) : 0) >= r[r.length - 1].y
                }
                return n && (e._ttInitPassDone = !0),
                    n
            }(e, t)) : 0
        }
        var l = 20;
        function d(e, t, n) {
            var o = e.x - t.x
                , r = e.y - t.y;
            return o * o + r * r <= n * n
        }
        function c(e) {
            if (e) {
                var t = !e._ttPulseIsA;
                e._ttPulseIsA = t,
                    e.classList.remove(t ? "tt-wave-heart--pulse-b" : "tt-wave-heart--pulse-a"),
                    e.classList.add(t ? "tt-wave-heart--pulse-a" : "tt-wave-heart--pulse-b"),
                e._ttWavePulseTimer && clearTimeout(e._ttWavePulseTimer),
                    e._ttWavePulseTimer = setTimeout((function() {
                            e.classList.remove("tt-wave-heart--pulse-a", "tt-wave-heart--pulse-b"),
                                e._ttWavePulseTimer = null
                        }
                    ), 1e3)
            }
        }
        function u(e) {
            if (e) {
                var t = e.querySelector(".tt-wave-anchor");
                t && !t.classList.contains("tt-wave-anchor--activated") && t.classList.add("tt-wave-anchor--activated")
            }
        }
        function v(t, n) {
            var o = t._ttWavePathEl
                , r = t._ttWaveHeartEl;
            if (o && r) {
                var i = function(e, t) {
                    var n = a(e, t);
                    return e.getTotalLength() ? e.getPointAtLength(n) : null
                }(o, n);
                i && (r.style.transform = "translate(" + i.x.toFixed(1) + "px, " + i.y.toFixed(1) + "px) translate(-50%, -50%)",
                    r.classList.add("tt-wave-heart--ready"),
                    function(e, t, n) {
                        var o = e._ttWaveTrailPathEl;
                        if (o && t) {
                            var r = t.getTotalLength();
                            if (r) {
                                var i = a(t, n);
                                o.style.strokeDashoffset = String(r - i)
                            }
                        }
                    }(t, o, n),
                    function(e, t, n) {
                        var o = e._ttWaveAnchorPoints;
                        if (o && o.length && t && n) {
                            var r = e._ttWaveAnchorNearState;
                            if (!r || r.length !== o.length) {
                                r = new Array(o.length);
                                for (var i = 0; i < r.length; i++)
                                    r[i] = !1;
                                e._ttWaveAnchorNearState = r
                            }
                            for (var a = 0; a < o.length; a++) {
                                var s = d(t, o[a], l);
                                s && !r[a] && c(n),
                                    r[a] = s
                            }
                        }
                    }(t, i, r),
                    function(e, t, n, o) {
                        var r = e._ttWaveAnchorReveal;
                        if (r && r.length && n && t)
                            for (var i = t.getTotalLength(), a = i > 0 ? t.getPointAtLength(i) : null, s = e._ttWaveScrollContainer || window, l = a && o >= a.y - .5 || window.ttShared && window.ttShared.isScrolledToBottom(s), d = 0; d < r.length; d++)
                                (l || n.y >= r[d].y - 1) && u(r[d].el)
                    }(t, o, i, n),
                    function(t, n, o, r) {
                        if (window.ttShared && window.ttShared.isGuest) {
                            var i = t._ttWaveAnchorReveal;
                            if (i && i.length && o)
                                for (var a = n.getTotalLength(), s = a > 0 ? n.getPointAtLength(a) : null, l = t._ttWaveScrollContainer || window, d = s && r >= s.y - .5 || window.ttShared && window.ttShared.isScrolledToBottom(l), c = 0; c < i.length; c++)
                                    if (d || o.y >= i[c].y - 1) {
                                        var u = i[c].el.classList.contains("tt-revealed");
                                        i[c].el.classList.add("tt-revealed"),
                                        !u && window.ttShared && window.ttShared.fireEventShine && window.ttShared.fireEventShine(e(i[c].el))
                                    }
                        }
                    }(t, o, i, n))
            }
        }
        function m(e) {
            if (e && !e._ttWaveHeartFrame) {
                var t = window.requestAnimationFrame || function(e) {
                        return setTimeout(e, 16)
                    }
                ;
                e._ttWaveHeartFrame = t((function n() {
                        var o = s(e)
                            , r = window.ttShared && window.ttShared.isGuest && window.ttShared.smoothHeartY ? window.ttShared.smoothHeartY(e, o) : {
                            y: o,
                            settled: !0
                        };
                        v(e, r.y),
                            r.settled ? e._ttWaveHeartFrame = null : e._ttWaveHeartFrame = t(n)
                    }
                ))
            }
        }
        function p(e) {
            if (e) {
                var t = e.getTotalLength();
                t && (e.style.setProperty("--tt-v5-path-len", String(t)),
                    e.style.setProperty("stroke-dasharray", String(t)),
                    e.style.removeProperty("stroke-dashoffset"),
                    e.classList.remove("tt-v5-spine-animate"),
                    e.classList.add("tt-v5-spine-hidden"))
            }
        }
        function h(e) {
            e && (p(e),
                e.getBoundingClientRect(),
                e.classList.remove("tt-v5-spine-hidden"),
                e.classList.add("tt-v5-spine-animate"))
        }
        function f(e, t) {
            e && t && ((e.classList.contains("tt-spine-ready") || e.classList.contains("tt-anim-ready")) && (e._ttSpineAnimPlayed ? function(e) {
                if (e) {
                    var t = e.getTotalLength();
                    t && (e.style.setProperty("--tt-v5-path-len", String(t)),
                        e.style.setProperty("stroke-dasharray", String(t)),
                        e.style.removeProperty("stroke-dashoffset"),
                        e.classList.remove("tt-v5-spine-hidden"),
                        e.classList.add("tt-v5-spine-animate"))
                }
            }(t) : (e._ttSpineAnimPlayed = !0,
                h(t))))
        }
        function w(e) {
            return !(!e || !e.classList) && (!(!e.classList.contains("tt-wave-heart") && !e.classList.contains("tt-wave-spine")) || (!(!e.closest || !e.closest(".tt-wave-heart, .tt-wave-spine")) || !(!e.classList.contains("text-shine--anim") && !e.classList.contains("block-shine--anim"))))
        }
        function g(t, n) {
            var o = t[0];
            if (n.length) {
                var r = []
                    , a = [];
                if (n.each((function() {
                        var t = e(this).children(".tt-wave-anchor")[0];
                        if (t && t.getClientRects().length) {
                            var n = function(e, t) {
                                var n = e.getBoundingClientRect()
                                    , o = t.getBoundingClientRect()
                                    , r = o.width / (t.offsetWidth || o.width) || 1;
                                return {
                                    x: (n.left + n.width / 2 - o.left) / r,
                                    y: (n.top + n.height / 2 - o.top) / r
                                }
                            }(t, o);
                            r.push(n),
                                a.push({
                                    y: n.y,
                                    el: this
                                })
                        }
                    }
                )),
                r.length && !(function(e, t) {
                    if (!e || !t || e.length !== t.length)
                        return !1;
                    var n;
                    for (n = 0; n < e.length; n++)
                        if (Math.abs(e[n].x - t[n].x) > .5 || Math.abs(e[n].y - t[n].y) > .5)
                            return !1;
                    return !0
                }(o._ttWaveAnchorPoints, r) && o._ttWavePathEl && o.contains(o._ttWavePathEl))) {
                    t.find(".tt-wave-spine").remove(),
                        o._ttWaveAnchorReveal = a,
                        o._ttWaveAnchorPoints = r.slice(),
                        o._ttInitPassDone = !1,
                        o._ttFollow50Active = !1,
                        o._ttWaveAnchorNearState = new Array(r.length);
                    for (var l = 0; l < r.length; l++)
                        o._ttWaveAnchorNearState[l] = !1;
                    var d = o.offsetWidth || o.clientWidth
                        , c = o.offsetHeight || o.scrollHeight
                        , u = function(e, t) {
                        if (!e.length)
                            return "";
                        if (1 === e.length)
                            return "M " + e[0].x.toFixed(1) + " " + e[0].y.toFixed(1);
                        for (var n = "M " + e[0].x.toFixed(1) + " " + e[0].y.toFixed(1), o = 1; o < e.length; o++) {
                            var r = e[o - 1]
                                , i = e[o]
                                , a = (r.y + i.y) / 2;
                            n += " C " + r.x.toFixed(1) + " " + a.toFixed(1),
                                n += ", " + i.x.toFixed(1) + " " + a.toFixed(1),
                                n += ", " + i.x.toFixed(1) + " " + i.y.toFixed(1)
                        }
                        return n
                    }(r)
                        , m = "http://www.w3.org/2000/svg"
                        , h = document.createElementNS(m, "svg");
                    h.setAttribute("class", "tt-wave-spine"),
                        h.setAttribute("aria-hidden", "true"),
                        h.setAttribute("viewBox", "0 0 " + d + " " + c),
                        h.style.width = d + "px",
                        h.style.height = c + "px";
                    var w = document.createElementNS(m, "path");
                    w.setAttribute("d", u),
                        h.appendChild(w);
                    var g = document.createElementNS(m, "path");
                    g.setAttribute("class", "tt-v5-spine-trail"),
                        g.setAttribute("d", u),
                        h.appendChild(g),
                        o.insertBefore(h, o.firstChild),
                        o._ttWavePathEl = w,
                        o._ttWaveTrailPathEl = g,
                        p(w),
                        function(e) {
                            if (e) {
                                var t = e.getTotalLength();
                                t && (e.style.setProperty("stroke-dasharray", String(t)),
                                    e.style.setProperty("stroke-dashoffset", String(t)))
                            }
                        }(g),
                        f(o, w);
                    var y = t.closest(".element_tt");
                    if (window.ttShared && window.ttShared.isPaperTimetable(y))
                        return t.find(".tt-wave-heart").remove(),
                            void (o._ttWaveHeartEl = null);
                    !function(t) {
                        var n = t[0];
                        if (!n)
                            return null;
                        var o = n._ttWaveHeartEl;
                        o && n.contains(o) || (t.find(".tt-wave-heart").remove(),
                            o = e(i)[0],
                            t.append(o),
                            n._ttWaveHeartEl = o),
                            o.classList.add("tt-hide-on-groupedit")
                    }(t),
                    window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(o),
                        function(e) {
                            e && (window.ttShared && window.ttShared.resetHeartSmoothing && window.ttShared.resetHeartSmoothing(e),
                                v(e, s(e)))
                        }(o)
                }
            }
        }
        function y(e) {
            e.each((function() {
                    var e = this.querySelector('[action="timetabletext_desc"], .tt-event__desc');
                    if (e) {
                        var t = e.querySelector("[name=desc]");
                        if (t) {
                            var n = t.offsetHeight;
                            if (!(n <= 0)) {
                                var o = parseFloat(window.getComputedStyle(t).lineHeight) || 0
                                    , r = o > 0 && n > 1.5 * o;
                                t.style.setProperty("--tt-v5-desc-shape-h", r ? n + "px" : "0px"),
                                    this.classList.toggle("tt-v5-desc-short", !r)
                            }
                        }
                    }
                }
            ))
        }
        function b(e) {
            if (e && e.length && "5" === e.attr("version_tt")) {
                var o = e.find("#timetablecontent");
                if (o.length) {
                    var i = o.find(".event.repeatLine:not(.hide)");
                    t(i),
                        n(i),
                        r(e);
                    var a, s = o[0];
                    (a = s)._ttWaveDrawing = !0,
                        (window.requestAnimationFrame || function(e) {
                                return setTimeout(e, 16)
                            }
                        )((function() {
                                a._ttWaveDrawing = !1
                            }
                        )),
                        e.find(".tt-wave-svg, .tt-wave-diamond, .tt-wave-line").remove(),
                        g(o, i),
                        function(e, t) {
                            var n = window.requestAnimationFrame || function(e) {
                                    return setTimeout(e, 16)
                                }
                            ;
                            n((function() {
                                    t && (t._ttWaveDrawing = !0),
                                        y(e),
                                        n((function() {
                                                t && (t._ttWaveDrawing = !0),
                                                    y(e),
                                                    n((function() {
                                                            t && (t._ttWaveDrawing = !1)
                                                        }
                                                    ))
                                            }
                                        ))
                                }
                            ))
                        }(i, s)
                }
            }
        }
        function _(e) {
            if (e && e.length) {
                var t = e[0];
                if (!t._ttWaveFrame) {
                    var n = window.requestAnimationFrame || function(e) {
                            return setTimeout(e, 16)
                        }
                    ;
                    t._ttWaveFrame = n((function() {
                            t._ttWaveFrame = null,
                                b(e)
                        }
                    ))
                }
            }
        }
        function S() {
            e('.element_tt[version_tt="5"]').each((function() {
                    _(e(this))
                }
            ))
        }
        function x(t, n) {
            var o = n[0];
            o && !o._ttWaveObserved && (o._ttWaveObserved = !0,
            window.ResizeObserver && (o._ttWaveResizeObserver = new ResizeObserver((function() {
                    o._ttWaveDrawing || _(t)
                }
            )),
                o._ttWaveResizeObserver.observe(o)),
            window.MutationObserver && (o._ttWaveMutationObserver = new MutationObserver((function(e) {
                    if (!o._ttWaveDrawing)
                        for (var n = 0; n < e.length; n++) {
                            if (!w(e[n].target))
                                return void _(t)
                        }
                }
            )),
                o._ttWaveMutationObserver.observe(o, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0,
                    attributeFilter: ["style", "data-event", "data-icon"]
                })),
            window.ttShared && window.ttShared.isPaperTimetable(t) || function(t) {
                var n = t[0];
                if (n && !n._ttWaveHeartBound) {
                    n._ttWaveHeartBound = !0,
                    window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(n),
                        n._ttScheduleHeartUpdate = function() {
                            m(n)
                        }
                    ;
                    var o = function() {
                        m(n)
                    };
                    n._ttWaveHeartScrollHandler = o;
                    var r = n._ttWaveScrollContainer;
                    r === window ? window.addEventListener("scroll", o, {
                        passive: !0
                    }) : r.addEventListener("scroll", o, {
                        passive: !0
                    }),
                    window._ttWaveHeartGlobalResizeBound || (window._ttWaveHeartGlobalResizeBound = !0,
                        window.addEventListener("resize", (function() {
                                e('.element_tt[version_tt="5"] #timetablecontent').each((function() {
                                        window.ttShared && window.ttShared.refreshHeartScrollSetup && window.ttShared.refreshHeartScrollSetup(this),
                                            m(this)
                                    }
                                ))
                            }
                        ), {
                            passive: !0
                        })),
                        m(n)
                }
            }(n),
            window._ttWaveGlobalListenersBound || (window._ttWaveGlobalListenersBound = !0,
                window.addEventListener("load", S),
                window.addEventListener("resize", S),
                window.addEventListener("orientationchange", S),
            document.fonts && document.fonts.ready.then(S)))
        }
        function C(e) {
            var t = e.find("#timetablecontent");
            if (t.length) {
                var n = t[0];
                if (n._ttWaveResizeObserver && (n._ttWaveResizeObserver.disconnect(),
                    n._ttWaveResizeObserver = null),
                n._ttWaveMutationObserver && (n._ttWaveMutationObserver.disconnect(),
                    n._ttWaveMutationObserver = null),
                    n._ttWaveObserved = !1,
                    n._ttSpineAnimPlayed = !1,
                    function(e) {
                        if (e && e._ttWaveHeartBound) {
                            var t = e._ttWaveHeartScrollHandler
                                , n = e._ttWaveScrollContainer || window;
                            t && (n === window ? window.removeEventListener("scroll", t) : n.removeEventListener("scroll", t)),
                            e._ttWaveHeartFrame && ((window.cancelAnimationFrame || clearTimeout)(e._ttWaveHeartFrame),
                                e._ttWaveHeartFrame = null),
                            window.ttShared && window.ttShared.resetHeartSmoothing && window.ttShared.resetHeartSmoothing(e),
                                e._ttWaveHeartBound = !1,
                                e._ttWaveHeartScrollHandler = null,
                                e._ttWaveScrollContainer = null,
                                e._ttWavePathEl = null,
                                e._ttWaveTrailPathEl = null,
                                e._ttWaveHeartEl = null,
                                e._ttWaveAnchorPoints = null,
                                e._ttWaveAnchorNearState = null,
                                e._ttWaveScale = null
                        }
                    }(n),
                    e[0]._ttWaveFrame)
                    (window.cancelAnimationFrame || clearTimeout)(e[0]._ttWaveFrame),
                        e[0]._ttWaveFrame = null
            }
        }
        window.ttModules[5] = {
            version: "5",
            eventTemplate: function(e) {
                return '<div class="event repeatLine' + ((e = e || {}).hide ? " hide" : "") + '" data-icon="">' + window.ttShared.repeatControlHtml + '<div class="tt-event"><div class="tt-event__body">' + window.ttShared.bodyFieldsHtml({
                    withTooltip: !1,
                    tooltipBtn: ""
                }) + '</div></div><span class="tt-wave-anchor tt-wave-anchor--empty" aria-hidden="true"></span><span class="tt-wave-icon tt-wave-icon--empty" aria-hidden="true"></span></div>'
            },
            renderEvent: function(e, t) {
                window.ttShared.renderEventFields(e, t)
            },
            init: function(e) {
                if (e && e.length) {
                    e.attr("data-no-text-align", "1");
                    var o = e.find("#timetablecontent");
                    if (o.length) {
                        o.find(".event.repeatLine").each((function() {
                                window.ttShared && window.ttShared.isGuest && this.classList.remove("tt-revealed");
                                var e = this.querySelector(".tt-wave-anchor");
                                e && e.classList.remove("tt-wave-anchor--activated")
                            }
                        ));
                        var r = o.find(".event.repeatLine:not(.hide)");
                        t(r),
                            function(e) {
                                e.each((function() {
                                        var e = this.querySelector("[name=desc]")
                                            , t = e && e.textContent.replace(/\s+/g, " ").trim().length > 0;
                                        this.classList.toggle("tt-v5-no-desc", !t)
                                    }
                                ))
                            }(r),
                            n(r),
                            x(e, o),
                            _(e)
                    }
                }
            },
            destroy: function(e) {
                C(e),
                    e.removeAttr("data-no-text-align"),
                    e.find(".tt-wave-spine, .tt-wave-line, .tt-wave-heart, .tt-wave-anchor, .tt-wave-icon, .tt-wave-svg, .tt-wave-diamond").remove()
            },
            afterEventChange: function(e) {
                this.init(e)
            },
            syncColor: r,
            scheduleDraw: _,
            replaySpineDraw: h,
            maybeReplaySpineDraw: f
        },
            window.initTimetableWave = function(e) {
                window.ttModules[5].init(e)
            }
            ,
            window.initGuestTimetableWave = window.initTimetableWave,
            window.scheduleAllGuestTimetableWaves = S,
            window.syncTimetableWaveColor = r,
            window.scheduleTimetableWaveDraw = _,
            window.getTimetableWaveColor = o,
            window._ttRefreshWaveEventIcon = function(e) {
                if (e && e.length) {
                    var t = e.closest(".element_tt");
                    "5" === t.attr("version_tt") && (e.children(".tt-wave-icon").data("tt-wave-icon", ""),
                        n(e),
                        _(t))
                }
            }
    }($),
    function(e) {
        "use strict";
        window.ttController = {
            getModule: function(e) {
                return window.ttModules[String(e || "1")]
            },
            readEventsFromDOM: function(t) {
                var n = t && t.length ? t : e("#screen #timetablecontent")
                    , o = [];
                return n.find(".event.repeatLine:not(.hide)").each((function() {
                        o.push(window.ttShared.readEventData(e(this)))
                    }
                )),
                    o
            },
            syncVersionButtons: function(t, n) {
                n = String(n || "1"),
                    t.find(".ttVersionBtn").removeClass("active"),
                    t.find('.ttVersionBtn[data-tt-version="' + n + '"]').addClass("active"),
                    e(".fontover .customcontrol .ttVersionBtn").removeClass("active"),
                    e('.fontover .customcontrol .ttVersionBtn[data-tt-version="' + n + '"]').addClass("active")
            },
            switchVersion: function(t, n) {
                if (t = String(t || "1"),
                n && n.length || (n = e("#screen #timetablecontent").closest(".element_tt")),
                    !n.length)
                    return !1;
                var o = String(n.attr("version_tt") || "1");
                if (o === t)
                    return this.syncVersionButtons(n, t),
                        !1;
                var r = this.getModule(o)
                    , i = this.getModule(t);
                if (!i)
                    return !1;
                var a = n.find("#timetablecontent");
                window.ttShared && window.ttShared.saveFieldStyles && window.ttShared.saveFieldStyles(a);
                var s = this.readEventsFromDOM(a);
                r && r.destroy && r.destroy(n),
                    a.children(".event.repeatLine:not(.hide)").remove(),
                    a.find(".tt-wave-anchor, .tt-wave-line, .tt-wave-svg, .tt-wave-diamond").remove();
                var l = a.children(".event.repeatLine.hide").first()
                    , d = i.eventTemplate({
                    hide: !0
                });
                if (l.length ? l.replaceWith(d) : a.append(d),
                    s.forEach((function(t, n) {
                            var o = e(i.eventTemplate({
                                hide: !1
                            }));
                            o.attr("data-event", n + 1),
                                i.renderEvent(o, t),
                                a.append(o)
                        }
                    )),
                    n.attr("version_tt", t),
                    this.syncVersionButtons(n, t),
                window.ttShared && window.ttShared.applyFieldStyles) {
                    var c = window.ttShared.loadFieldStyles ? window.ttShared.loadFieldStyles(a) : null;
                    !c && window.ttShared.readFieldStyles && (c = window.ttShared.readFieldStyles(a)),
                        window.ttShared.applyFieldStyles(a, c)
                }
                return i.init && i.init(n),
                window.ttShared && window.ttShared.initScrollReveal && window.ttShared.initScrollReveal(n),
                window.syncEventAddBtn && window.syncEventAddBtn(),
                    !0
            },
            initFromSaved: function(e) {
                if (e && e.length) {
                    var t = String(e.attr("version_tt") || "1")
                        , n = this.getModule(t);
                    n && n.init && n.init(e)
                }
            },
            upgradeHideTemplate: function(t) {
                if (t && t.length) {
                    var n = String(t.attr("version_tt") || "1");
                    t.attr("version_tt") || t.attr("version_tt", n);
                    var o = this.getModule(n)
                        , r = t.find("#timetablecontent");
                    if (r.length) {
                        var i = r.children(".event.repeatLine.hide").first();
                        if (i.length) {
                            var a = i.children(".col-xs-3").length
                                , s = i.children(".col-xs-9").length
                                , l = i.find(".tt-v1-icon-cell .tt-event__photo-inner").length
                                , d = i.children(".col-xs-9").find('[action="timetabletext_desc"]').length;
                            if (!("1" === n && a && s && l && d || "1" !== n && "5" !== n && i.children(".tt-event").length)) {
                                var c = null;
                                "1" === n && (c = {},
                                    ["timetabletext_date", "timetabletext_subtitle", "timetabletext_address", "timetabletext_desc"].forEach((function(e) {
                                            var t = i.find('.subTextLine[action="' + e + '"]').first();
                                            t.length && (c[e] = {
                                                style: t.attr("style") || "",
                                                gradient: t.attr("data-font-gradient") || ""
                                            })
                                        }
                                    )));
                                var u = e(o.eventTemplate({
                                    hide: !0
                                }));
                                "1" === n && c && Object.keys(c).forEach((function(e) {
                                        var t = c[e];
                                        if (t) {
                                            var n = u.find('.subTextLine[action="' + e + '"]').first();
                                            n.length && (t.style && n.attr("style", t.style),
                                            t.gradient && n.attr("data-font-gradient", t.gradient))
                                        }
                                    }
                                )),
                                    i.replaceWith(u)
                            }
                        }
                    }
                }
            },
            upgradeElementDom: function(t) {
                if (t && t.length && window.ttShared) {
                    var n = String(t.attr("version_tt") || "1")
                        , o = t.find("#timetablecontent");
                    o.length && ("5" === n && o.find(".tt-wave-line").remove(),
                    "1" !== n && o.find(".event.repeatLine").each((function() {
                            window.ttShared.upgradeEventTooltipDom(e(this), {
                                version: n
                            })
                        }
                    )))
                }
            },
            applySavedFieldStyles: function(e) {
                if (window.ttShared && e && e.length) {
                    var t = e.find("#timetablecontent");
                    if (t.length) {
                        var n = window.ttShared.loadFieldStyles(t);
                        !n && window.ttShared.readFieldStyles && (n = window.ttShared.readFieldStyles(t)),
                            window.ttShared.applyFieldStyles(t, n)
                    }
                }
            },
            refreshAllOnLoad: function() {
                window.ttShared && (e("#timetablecontent .tt-wave-heart, #timetablecontent .tt-wave-spine, #timetablecontent .tt-v4-date-badge").remove(),
                    e(".element_tt").each((function() {
                            var t = e(this);
                            if (t.find("#timetablecontent").length) {
                                if ((t.attr("version_tt") || "").length || t.attr("version_tt", "1"),
                                    window.ttController.upgradeHideTemplate(t),
                                    window.ttController.upgradeElementDom(t),
                                    window.ttController.initFromSaved(t),
                                    window.ttController.applySavedFieldStyles(t),
                                    window.ttShared.syncDefaultIconColor) {
                                    var n = t.find("#timetablecontent");
                                    window.ttShared.syncDefaultIconColor(n);
                                    var o = n.attr("data-tt-icon-heart") || ""
                                        , r = window._ttDefaultIconColor;
                                    !o && r && window._ttIconWithColor && (n.attr("data-tt-icon-heart", r),
                                        n.find(".event.repeatLine:not(.hide)").each((function() {
                                                var t = e(this)
                                                    , n = t.attr("data-icon") || "";
                                                if (n && "-1" !== n) {
                                                    var o = window._ttIconWithColor(n, r);
                                                    o && o !== n && t.attr("data-icon", o)
                                                }
                                            }
                                        ))),
                                        n.find(".event.repeatLine:not(.hide)").each((function() {
                                                var t = e(this)
                                                    , n = t.attr("data-icon") || "";
                                                n && "-1" !== n && window.ttShared.applyIcon(t, n)
                                            }
                                        ))
                                }
                                if ("4" === (t.attr("version_tt") || "")) {
                                    var i = window.ttController.getModule("4");
                                    i && i.syncColor && i.syncColor(t)
                                }
                                window.ttController.syncVersionButtons(t, t.attr("version_tt") || "1"),
                                window.ttShared && window.ttShared.initScrollReveal && window.ttShared.initScrollReveal(t)
                            }
                        }
                    )))
            },
            afterEventSaved: function(e) {
                if (e && e.length) {
                    var t = e.closest(".element_tt")
                        , n = t.find("#timetablecontent");
                    if (window.ttShared && window.ttShared.applyFieldStylesToEvent) {
                        var o = window.ttShared.loadFieldStyles ? window.ttShared.loadFieldStyles(n) : null;
                        !o && window.ttShared.readFieldStyles && (o = window.ttShared.readFieldStyles(n)),
                        o && window.ttShared.applyFieldStylesToEvent(e, o)
                    }
                    var r = window.ttController.getModule(t.attr("version_tt") || "1");
                    r && r.afterEventChange ? r.afterEventChange(t, e) : r && r.init && r.init(t)
                }
            }
        },
            window.refreshTimetableModulesOnLoad = function() {
                window.ttController.refreshAllOnLoad()
            }
            ,
            window.upgradeTimetableHideTemplate = function() {
                window.ttController && e(".element_tt").each((function() {
                        var t = e(this);
                        t.find("#timetablecontent").length && window.ttController.upgradeHideTemplate(t)
                    }
                ))
            }
            ,
            window.runGuestTimetableInit = function() {
                window.ttController && window.ttController.refreshAllOnLoad && window.ttController.refreshAllOnLoad()
            }
    }($),
    $(window).load((function() {}
    )),
"function" != typeof window.wpGetTimezoneDefault && (window.wpGetTimezoneDefault = function() {
        var e = "string" == typeof window.wpTimezoneDefault && window.wpTimezoneDefault ? window.wpTimezoneDefault : "";
        if (!e && "undefined" != typeof jQuery) {
            var t = jQuery(".wp-tz-dd input[name=timezone]").first();
            t.length && (e = t.attr("data-tz-default") || "")
        }
        return null != e ? String(e).trim() : ""
    }
),
"function" != typeof window.wpCountdownTarget && (window.wpCountdownTarget = function(e, t, n) {
        var o = String(e || "").split(".");
        if (3 !== o.length)
            return new Date(NaN);
        var r = parseInt(o[0], 10)
            , i = parseInt(o[1], 10)
            , a = parseInt(o[2], 10)
            , s = 0
            , l = 0
            , d = String(t || "").match(/^(\d{1,2}):(\d{2})/);
        d && (s = parseInt(d[1], 10),
            l = parseInt(d[2], 10));
        var c = "string" == typeof n ? n.trim() : "";
        if (!c)
            return new Date(a,i - 1,r,0,0,0);
        try {
            var u = new Intl.DateTimeFormat("en-CA",{
                timeZone: c,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: !1
            });
            function v(e) {
                var t = {};
                u.formatToParts(new Date(e)).forEach((function(e) {
                        t[e.type] = e.value
                    }
                ));
                var n = parseInt(t.hour, 10);
                return 24 === n && (n = 0),
                    {
                        y: parseInt(t.year, 10),
                        m: parseInt(t.month, 10),
                        d: parseInt(t.day, 10),
                        h: n,
                        i: parseInt(t.minute, 10)
                    }
            }
            function m(e) {
                return Date.UTC(e.y, e.m - 1, e.d, e.h, e.i, 0)
            }
            var p = Date.UTC(a, i - 1, r, s, l, 0)
                , h = p - (m(v(p)) - p)
                , f = v(h);
            if (f.y === a && f.m === i && f.d === r && f.h === s && f.i === l)
                return new Date(h);
            var w = p - (m(f) - h)
                , g = v(w);
            return g.y === a && g.m === i && g.d === r && g.h === s && g.i === l ? new Date(w) : new Date(h)
        } catch (y) {}
        return new Date(a,i - 1,r,0,0,0)
    }
),
"function" != typeof window.wpFireWeddingConfetti && (window.wpFireWeddingConfetti = function() {
        if ("function" == typeof confetti) {
            var e = navigator.userAgent || ""
                , t = /Mobi|Android/i.test(e)
                , n = t ? 3e4 : 6e4
                , o = t ? 4e3 : 8e3
                , r = t ? 11e3 : 22e3
                , i = t ? 2e4 : 4e4
                , a = t ? 28500 : 57e3
                , s = Date.now()
                , l = confetti
                , d = null
                , c = document.querySelector("#phoneviewBox") || document.querySelector(".phoneview")
                , u = "";
            if (c && "function" == typeof confetti.create) {
                var v = window.getComputedStyle(c).position;
                "static" === v && (u = c.style.position,
                    c.style.position = "relative"),
                    (d = document.createElement("canvas")).className = "wpWeddingConfettiCanvas",
                    d.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:9999;",
                    c.appendChild(d);
                try {
                    l = confetti.create(d, {
                        resize: !0,
                        useWorker: !0
                    })
                } catch (e) {
                    l = confetti
                }
                setTimeout((function() {
                        try {
                            "function" == typeof l.reset && l.reset()
                        } catch (e) {}
                        d && d.parentNode && d.parentNode.removeChild(d),
                        "static" === v && (c.style.position = u)
                    }
                ), n + 8e3)
            }
            var m = "function" == typeof confetti.shapeFromText
                , p = m ? confetti.shapeFromText({
                text: "❤️",
                scalar: 2
            }) : null
                , h = m ? confetti.shapeFromText({
                text: "★",
                scalar: 1.6
            }) : null
                , f = ["#f5d76e", "#ffffff", "#f5b1c1", "#d9376e", "#fff8e7", "#9b59b6", "#3498db"]
                , w = ["#ff5b8a", "#ff8fab", "#ffc1d4", "#ffffff", "#d9376e"]
                , g = {
                heartBurst: !1,
                fwScheduled: !1,
                finaleFired: !1
            };
            !function e() {
                var t = Date.now() - s;
                t >= n || (t < o ? (l({
                    particleCount: y(7),
                    angle: 315,
                    spread: 65,
                    startVelocity: 50,
                    origin: {
                        x: 0,
                        y: 0
                    },
                    colors: f
                }),
                    l({
                        particleCount: y(7),
                        angle: 225,
                        spread: 65,
                        startVelocity: 50,
                        origin: {
                            x: 1,
                            y: 0
                        },
                        colors: f
                    }),
                    l({
                        particleCount: y(7),
                        angle: 45,
                        spread: 65,
                        startVelocity: 50,
                        origin: {
                            x: 0,
                            y: 1
                        },
                        colors: f
                    }),
                    l({
                        particleCount: y(7),
                        angle: 135,
                        spread: 65,
                        startVelocity: 50,
                        origin: {
                            x: 1,
                            y: 1
                        },
                        colors: f
                    })) : t < r ? function() {
                    for (var e = y(5), t = 0; t < e; t++) {
                        var n, o, r, i = 4 * Math.random() | 0;
                        0 === i ? (n = Math.random(),
                            o = -.02,
                            r = b(250, 290)) : 1 === i ? (n = 1.02,
                            o = Math.random(),
                            r = b(160, 200)) : 2 === i ? (n = Math.random(),
                            o = 1.02,
                            r = b(70, 110)) : (n = -.02,
                            o = Math.random(),
                            r = b(340, 380)),
                            l({
                                particleCount: y(5),
                                angle: r,
                                spread: 75,
                                startVelocity: b(35, 55),
                                origin: {
                                    x: n,
                                    y: o
                                },
                                colors: f,
                                shapes: h ? ["circle", "square", h] : ["circle", "square"]
                            })
                    }
                }() : t < i ? function() {
                    g.heartBurst || (g.heartBurst = !0,
                        l({
                            particleCount: y(200),
                            spread: 360,
                            startVelocity: 30,
                            scalar: 1.8,
                            origin: {
                                x: .5,
                                y: .5
                            },
                            colors: w,
                            shapes: p ? [p] : ["circle"]
                        }));
                    var e, t, n, o = 4 * Math.random() | 0;
                    0 === o ? (e = Math.random(),
                        t = -.05,
                        n = b(250, 290)) : 1 === o ? (e = 1.05,
                        t = Math.random(),
                        n = b(160, 200)) : 2 === o ? (e = Math.random(),
                        t = 1.05,
                        n = b(70, 110)) : (e = -.05,
                        t = Math.random(),
                        n = b(340, 380)),
                        l({
                            particleCount: y(4),
                            angle: n,
                            spread: 25,
                            startVelocity: b(35, 50),
                            gravity: .4,
                            drift: b(-.3, .3),
                            scalar: 1.4,
                            ticks: 250,
                            origin: {
                                x: e,
                                y: t
                            },
                            colors: w,
                            shapes: p ? [p] : ["circle"]
                        })
                }() : t < a ? function() {
                    if (!g.fwScheduled) {
                        g.fwScheduled = !0;
                        var e = s + n;
                        !function t() {
                            if (!(Date.now() >= e)) {
                                var n = b(.15, .85)
                                    , o = b(.15, .55);
                                l({
                                    particleCount: y(0 | b(80, 140)),
                                    spread: b(70, 360),
                                    startVelocity: b(35, 55),
                                    gravity: 1,
                                    decay: .92,
                                    scalar: 1.2,
                                    ticks: 220,
                                    origin: {
                                        x: n,
                                        y: o
                                    },
                                    colors: f,
                                    shapes: h ? ["circle", h] : ["circle", "square"]
                                }),
                                Math.random() < .5 && l({
                                    particleCount: y(50),
                                    spread: 360,
                                    startVelocity: b(25, 40),
                                    gravity: .9,
                                    ticks: 180,
                                    origin: {
                                        x: n + b(-.1, .1),
                                        y: o + b(-.05, .05)
                                    },
                                    colors: f
                                }),
                                    setTimeout(t, b(450, 750))
                            }
                        }()
                    }
                }() : g.finaleFired || (g.finaleFired = !0,
                    l({
                        particleCount: y(350),
                        spread: 360,
                        startVelocity: 45,
                        scalar: 2.2,
                        gravity: .7,
                        ticks: 350,
                        origin: {
                            x: .5,
                            y: .5
                        },
                        colors: w,
                        shapes: p ? [p] : ["circle"]
                    }),
                    setTimeout((function() {
                            l({
                                particleCount: y(150),
                                spread: 360,
                                startVelocity: 35,
                                scalar: 1.9,
                                gravity: .7,
                                ticks: 320,
                                origin: {
                                    x: .25,
                                    y: .45
                                },
                                colors: w,
                                shapes: p ? [p] : ["circle"]
                            }),
                                l({
                                    particleCount: y(150),
                                    spread: 360,
                                    startVelocity: 35,
                                    scalar: 1.9,
                                    gravity: .7,
                                    ticks: 320,
                                    origin: {
                                        x: .75,
                                        y: .45
                                    },
                                    colors: w,
                                    shapes: p ? [p] : ["circle"]
                                })
                        }
                    ), 300)),
                    requestAnimationFrame(e))
            }()
        }
        function y(e) {
            return t ? Math.max(1, Math.round(e / 4)) : e
        }
        function b(e, t) {
            return e + Math.random() * (t - e)
        }
    }
),
    function(e, t) {
        var n = {
            baseUrl: function() {
                return String(e.location.origin || "").replace(/\/$/, "") + "/template/invent/calendar_event.php"
            },
            normGuest: function(e) {
                return null == e || "" === e || "undefined" === e ? "" : String(e)
            },
            calHref: function(e, t) {
                var n = this.normGuest(t)
                    , o = "user_id=" + encodeURIComponent(e) + "&guest=" + encodeURIComponent(n);
                return this.baseUrl() + "?" + o
            },
            detectTarget: function() {
                var e = navigator.userAgent || "";
                return /iPhone|iPod|iPad/i.test(e) || /Macintosh|Mac OS X/i.test(e) ? "apple" : /Android/i.test(e) ? "android-google" : /Windows/i.test(e) && !/Windows Phone/i.test(e) ? "windows-outlook" : "ics"
            },
            bind: function(e, t) {
                if (e && e.length && void 0 !== t) {
                    var n = t.user_id
                        , o = t.guest_id
                        , r = this.calHref(n, o)
                        , i = this;
                    e.off("click.wpCal").each((function() {
                            this.setAttribute("href", r)
                        }
                    )).on("click.wpCal", (function(e) {
                            e.preventDefault(),
                                i.open(n, o, i.detectTarget())
                        }
                    ))
                }
            },
            open: function(n, o, r) {
                var i = this
                    , a = i.normGuest(o)
                    , s = i.baseUrl() + "?format=meta&user_id=" + encodeURIComponent(n) + "&guest=" + encodeURIComponent(a);
                fetch(s).then((function(e) {
                        return e.json()
                    }
                )).then((function(a) {
                        if (a && "not_found" !== a.error)
                            if ("bad_date" !== a.error && a.icsRaw)
                                if ("android-google" === r && a.providerUrls && a.providerUrls.google && a.providerUrls.google.length < 1800)
                                    e.location.href = a.providerUrls.google;
                                else if ("windows-outlook" === r && a.providerUrls && a.providerUrls.outlook)
                                    e.location.href = a.providerUrls.outlook;
                                else {
                                    var s = new Blob([a.icsRaw],{
                                        type: "text/calendar;charset=utf-8"
                                    })
                                        , l = URL.createObjectURL(s)
                                        , d = t.createElement("a");
                                    d.href = l,
                                        d.download = a.filename || "weddingpost.ics",
                                        t.body.appendChild(d),
                                        d.click(),
                                        t.body.removeChild(d),
                                        URL.revokeObjectURL(l)
                                }
                            else
                                e.location.href = i.calHref(n, o);
                        else
                            e.location.href = i.calHref(n, o)
                    }
                )).catch((function() {
                        e.location.href = i.calHref(n, o)
                    }
                ))
            }
        };
        e.WPCalendar = n
    }(window, document);
var mydomain = "my-domain" + wpRom("domainPreview", "");
function ensureMymainScrollHintButton() {
    if (!document.body)
        return null;
    var e = document.querySelector(".group_fixed_view");
    return e || ((e = document.createElement("div")).className = "group_fixed_view",
        e.innerHTML = '<button class="mymain-scroll-hint-btn" type="button" aria-label="Прокрутить ниже"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="mymain-scroll-hint-arrow" d="M12 6v12m0 0-4.5-4.5M12 18l4.5-4.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
        document.body.appendChild(e),
        e)
}
function hideMymainScrollHint() {
    var e = document.querySelector(".group_fixed_view");
    e && e.classList.remove("is-visible")
}
function clearMymainScrollHintHideListeners(e, t) {
    e && e._mymainScrollHintHideEnd && (t && (t.removeEventListener("animationend", e._mymainScrollHintHideEnd),
        t.removeEventListener("webkitAnimationEnd", e._mymainScrollHintHideEnd)),
        e._mymainScrollHintHideEnd = null)
}
function restartMymainScrollHintInAnimation(e) {
    e && (e.style.animation = "none",
        e.offsetHeight,
        e.style.animation = "")
}
function showMymainScrollHintAnimated(e) {
    if (e && (!e.classList.contains("is-visible") || e.classList.contains("is-hiding"))) {
        var t = e.querySelector(".mymain-scroll-hint-btn");
        clearMymainScrollHintHideListeners(e, t),
        e._wasShownBefore && e.classList.add("is-reshown"),
            e._wasShownBefore = !0,
            e.classList.remove("is-hiding"),
            e.classList.add("is-visible"),
            restartMymainScrollHintInAnimation(t)
    }
}
function hideMymainScrollHintAnimated() {
    var e = document.querySelector(".group_fixed_view");
    if (e && e.classList.contains("is-visible") && !e.classList.contains("is-hiding")) {
        e.classList.add("is-hiding");
        var t = e.querySelector(".mymain-scroll-hint-btn");
        clearMymainScrollHintHideListeners(e, t),
            e._mymainScrollHintHideEnd = n,
            t ? (t.addEventListener("animationend", n),
                t.addEventListener("webkitAnimationEnd", n)) : (e.classList.remove("is-visible", "is-hiding"),
                e._mymainScrollHintHideEnd = null)
    }
    function n(o) {
        o && o.animationName && "groupFixedViewOut" !== o.animationName || (e.classList.remove("is-visible", "is-hiding"),
            e._mymainScrollHintHideEnd = null,
        t && (t.removeEventListener("animationend", n),
            t.removeEventListener("webkitAnimationEnd", n)))
    }
}
function shouldShowMymainScrollHint() {
    if (!document.body)
        return !1;
    if ("instant_electro" !== document.body.getAttribute("type"))
        return !1;
    var e = document.getElementById("mymain");
    if (!e)
        return !1;
    var t = window.innerHeight || document.documentElement.clientHeight || 0
        , n = e.getBoundingClientRect().bottom > t + 2 || e.scrollHeight > t + 2
        , o = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return n && o < 8
}
function updateMymainScrollHint() {
    var e = ensureMymainScrollHintButton();
    e && (shouldShowMymainScrollHint() ? showMymainScrollHintAnimated(e) : hideMymainScrollHintAnimated())
}
function initMymainScrollHint() {
    ensureMymainScrollHintButton(),
        updateMymainScrollHint(),
        $(window).off("resize.mymainScrollHint scroll.mymainScrollHint").on("resize.mymainScrollHint scroll.mymainScrollHint", (function() {
                updateMymainScrollHint()
            }
        )),
        $("body").off("click.mymainScrollHint").on("click.mymainScrollHint", ".mymain-scroll-hint-btn", (function(e) {
                e.preventDefault();
                var t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                    , n = document.querySelector("#mymain .element8 .textLine, #mymain .element8, .element8 .textLine, .element8");
                if (n) {
                    var o = n.getBoundingClientRect().top + t;
                    $("html, body").stop().animate({
                        scrollTop: Math.max(0, Math.round(o))
                    }, 1400, "swing")
                } else {
                    var r = Math.max(40, Math.round(.1 * (window.innerHeight || 0)));
                    $("html, body").stop().animate({
                        scrollTop: t + r
                    }, 1400, "swing")
                }
            }
        )),
        setTimeout(updateMymainScrollHint, 120),
        setTimeout(updateMymainScrollHint, 450)
}
var inventMobBackLastScrollTop = 0
    , inventMobBackScrollRevealed = !0;
function getInventMobBackScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}
function shouldShowInventMobBack() {
    if (!document.body)
        return !1;
    var e = getUrlVar().mode
        , t = document.body.getAttribute("type")
        , n = window.self === window.top
        , o = !!window.wpBanketScreenMode;
    if ("preview" !== e)
        return !1;
    if ("instant_electro" !== t)
        return !1;
    if (!n)
        return !1;
    if (o)
        return !1;
    try {
        if (!window.matchMedia("(max-width: 767px)").matches)
            return !1
    } catch (e) {
        if ((window.innerWidth || 0) > 767)
            return !1
    }
    return !0
}
function syncInventMobBackScrollState() {
    var e = getInventMobBackScrollTop()
        , t = e - inventMobBackLastScrollTop;
    e <= 8 ? inventMobBackScrollRevealed = !0 : Math.abs(t) >= 6 && (inventMobBackScrollRevealed = !(t > 0)),
        inventMobBackLastScrollTop = e
}
function applyInventMobBackDomState(e) {
    if (e) {
        if (!shouldShowInventMobBack())
            return e.classList.remove("is-mounted", "is-visible"),
                void e.setAttribute("aria-hidden", "true");
        e.classList.add("is-mounted"),
            inventMobBackScrollRevealed ? (e.classList.add("is-visible"),
                e.setAttribute("aria-hidden", "false")) : (e.classList.remove("is-visible"),
                e.setAttribute("aria-hidden", "true"))
    }
}
function updateInventMobBack() {
    var e = document.getElementById("invent-mob-back");
    if (e) {
        if (!shouldShowInventMobBack())
            return inventMobBackScrollRevealed = !0,
                inventMobBackLastScrollTop = getInventMobBackScrollTop(),
                void applyInventMobBackDomState(e);
        syncInventMobBackScrollState(),
            applyInventMobBackDomState(e)
    }
}
function initInventMobBack() {
    inventMobBackLastScrollTop = getInventMobBackScrollTop(),
        inventMobBackScrollRevealed = inventMobBackLastScrollTop <= 8,
        updateInventMobBack(),
        $(window).off("resize.inventMobBack scroll.inventMobBack").on("resize.inventMobBack", (function() {
                updateInventMobBack()
            }
        )).on("scroll.inventMobBack", (function() {
                shouldShowInventMobBack() && (syncInventMobBackScrollState(),
                    applyInventMobBackDomState(document.getElementById("invent-mob-back")))
            }
        )),
        setTimeout(updateInventMobBack, 120),
        setTimeout(updateInventMobBack, 450)
}
function applyElement8Compensation() {
    var e = $("#screen .element8");
    if (e.length || (e = $("#mymain .element8")),
        e.length)
        if ($(window).width() <= 560) {
            var t = -e[0].offsetHeight * (1 - .9);
            e.css("margin-bottom", t + "px")
        } else
            e.css("margin-bottom", "")
}
function applyBanketScreenMode() {
    window.wpBanketScreenMode && ($("body").addClass("wp-banket-screen"),
        $(".content .block:not(#mymain)").addClass("hide"),
        $("#menu, .group_fixed_view, .mymenu, .content_module_ss, #invent-mob-back").hide())
}
var applyElement8CompensationDebounced = function() {
    var e;
    return function() {
        clearTimeout(e),
            e = setTimeout(applyElement8Compensation, 150)
    }
}();
function getViewportScale() {
    var e = document.getElementById("screen");
    if (!e)
        return 1;
    var t = e.offsetWidth;
    return t ? e.getBoundingClientRect().width / t : 1
}
function setViewportScale() {
    if (document.body && "instant_electro" === document.body.getAttribute("type")) {
        var e, t = window.innerWidth || 0;
        e = t < 768 ? 1 : t < 795 ? 1 + (t - 768) / 27 * .03 : t < 834 ? 1.03 + (t - 795) / 39 * .02 : t < 1024 ? 1.05 + (t - 834) / 190 * .15 : t < 1366 ? 1.2 + (t - 1024) / 342 * .15 : t < 1536 ? 1.35 + (t - 1366) / 170 * .1 : t < 1920 ? 1.45 + (t - 1536) / 384 * .1 : t < 2560 ? 1.55 + (t - 1920) / 640 * .1 : 1.65,
            document.body.style.setProperty("--viewport-scale", e.toFixed(5))
    }
}
var setViewportScaleDebounced = function() {
    var e;
    return function() {
        clearTimeout(e),
            e = setTimeout(setViewportScale, 100)
    }
}();
function translite(e) {
    for (var t = new Array("Я","я","Ю","ю","Ч","ч","Ш","ш","Щ","щ","Ж","ж","А","а","Б","б","В","в","Г","г","Д","д","Е","е","Ё","ё","З","з","И","и","Й","й","К","к","Л","л","М","м","Н","н","О","о","П","п","Р","р","С","с","Т","т","У","у","Ф","ф","Х","х","Ц","ц","Ы","ы","Ь","ь","Ъ","ъ","Э","э"), n = new Array("Ya","ya","Yu","yu","Ch","ch","Sh","sh","Sh","sh","Zh","zh","A","a","B","b","V","v","G","g","D","d","E","e","E","e","Z","z","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","R","r","S","s","T","t","U","u","F","f","H","h","C","c","Y","y","","","","","E","e"), o = 0; o < t.length; o++) {
        var r = new RegExp(t[o],"g");
        e = e.replace(r, n[o])
    }
    return e
}
function textConfetty(e, t) {
    confetti({
        angle: -0,
        particleCount: 120,
        spread: 120,
        origin: {
            y: t,
            x: e
        },
        gravity: 1,
        scalar: .55,
        decay: .98,
        drift: 1,
        colors: ["#ffffff", "#ffbf00", "#a77b01", "#ffdb73"],
        startVelocity: 4
    })
}
function alignText(e, t) {
    if ("center" == t || "right" == t) {
        var n = $.cookie("textWidth");
        if ("center" == t)
            var o = (e.width() - n) / 2;
        else if ("right" == t)
            o = e.width() - n;
        var r = 100 * o / e.parent(".moveBox").parent(".textBox").width()
            , i = e.parent(".moveBox").get(0);
        if (!i || !i.style || null == i.style.left || "" === i.style.left)
            return;
        left_now = i.style.left.slice(0, -1),
            e.parent(".moveBox").css("left", left_now - 1 + 1 - r + "%")
    }
}
function replaceOnMaket(e, t, n, o) {
    str = e.html(),
        str = str.replace(/&gt;/g, ">"),
        str = str.replace(/&lt;/g, "<"),
        str = str.replace(/&amp;/g, "&");
    var r = ((e.text() || "").match(/[a-zA-Z\u0400-\u052F]/g) || []).length
        , i = wpRom("hotWord1", "")
        , a = wpRom("hotWord1Upper", "")
        , s = wpRom("shortHotWord1", "")
        , l = wpRom("shortHotWord1b", "")
        , d = wpRom("hotWord2", "")
        , c = wpRom("hotWord2Upper", "")
        , u = wpRom("shortHotWord2", "")
        , v = wpRom("shortHotWord2b", "")
        , m = !(!window.wpHotwords || "wedding" !== window.wpHotwords.eventType)
        , p = wpHotwordsResolveValue("varHotWord1", n, "he")
        , h = wpHotwordsResolveValue("varHotWord2", t, "she");
    if (p && void 0 !== p && i && (str.indexOf(i) + 1 || str.indexOf(s) + 1 || str.indexOf(l) + 1 || str.indexOf(a) + 1)) {
        var f = p.charAt(0).toUpperCase();
        1 === i.length ? str = wpHotwordsReplaceAllIsolated(str, i, p) : str = str.replace(new RegExp(wpHotwordsEscRe(i),"g"), p),
            a && 1 === a.length ? str = wpHotwordsReplaceAllIsolated(str, a, p.toUpperCase()) : a && (str = str.replace(new RegExp(wpHotwordsEscRe(a),"g"), p.toUpperCase())),
        s && f && (m && 1 === str.trim().length ? (str = str.replace(new RegExp(wpHotwordsEscRe(s),"g"), f),
        l && l !== s && (str = str.replace(new RegExp(wpHotwordsEscRe(l),"g"), f))) : 1 === s.length && r <= 5 && (str = wpHotwordsReplaceAllIsolated(str, s, f),
        l && l !== s && 1 === l.length && (str = wpHotwordsReplaceAllIsolated(str, l, f))))
    }
    if (h && void 0 !== h && d && (str.indexOf(d) + 1 || str.indexOf(u) + 1 || str.indexOf(v) + 1 || str.indexOf(c) + 1)) {
        var w = h.charAt(0).toUpperCase();
        1 === d.length ? str = wpHotwordsReplaceAllIsolated(str, d, h) : str = str.replace(new RegExp(wpHotwordsEscRe(d),"g"), h),
            c && 1 === c.length ? str = wpHotwordsReplaceAllIsolated(str, c, h.toUpperCase()) : c && (str = str.replace(new RegExp(wpHotwordsEscRe(c),"g"), h.toUpperCase())),
        u && w && (m && 1 === str.trim().length ? (str = str.replace(new RegExp(wpHotwordsEscRe(u),"g"), w),
        v && v !== u && (str = str.replace(new RegExp(wpHotwordsEscRe(v),"g"), w))) : 1 === u.length && r <= 5 && (str = wpHotwordsReplaceAllIsolated(str, u, w),
        v && v !== u && 1 === v.length && (str = wpHotwordsReplaceAllIsolated(str, v, w))))
    }
    if (o && void 0 !== o) {
        var g = wpHotwordsDateMeta(o)
            , y = wpHotwordsMonthToken("day", "28")
            , b = wpHotwordsMonthToken("month", "09")
            , _ = null;
        if (y && b) {
            var S = wpHotwordsDateFormat("")
                , x = wpHotwordsEscRe(y)
                , C = wpHotwordsEscRe(b);
            _ = "DD/MM/YYYY" === S ? new RegExp(x + "\\/" + C + "\\/[0-9]{4}","g") : "MM/DD/YYYY" === S ? new RegExp(C + "\\/" + x + "\\/[0-9]{4}","g") : new RegExp(x + "\\." + C + "\\.[0-9]{4}","g")
        }
        if (g && _ && (str = str.replace(_, o)),
        g && /[0-9]{4}/g.test(str)) {
            var A = g.year;
            str = str.replace(/[0-9]{4}/g, (function(e, t) {
                    var n = 0 === t ? "" : str.charAt(t - 1)
                        , o = t + 4 >= str.length ? "" : str.charAt(t + 4);
                    return !(("." === n || "/" === n) && t >= 3 && /[0-9]{2}/.test(str.slice(t - 3, t - 1))) && wpHotwordsIsIsolatedNeighbor(n) && wpHotwordsIsIsolatedNeighbor(o) ? A : e
                }
            ))
        }
        var k = wpHotwordsMonthToken("base", "сентябрь")
            , T = wpHotwordsMonthToken("gen", "сентября")
            , L = wpHotwordsMonthToken("baseUpper", "Сентябрь")
            , H = wpHotwordsMonthToken("genUpper", "Сентября")
            , I = wpHotwordsMonthToken("day", "28");
        if (g) {
            var P = Number(g.month).toString()
                , E = new Array("","январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь")
                , M = new Array("","января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря")
                , B = wpHotwordsMonths("base", [])
                , F = wpHotwordsMonths("gen", [])
                , W = 12 === B.length ? B[Number(P) - 1] : E[P]
                , R = 12 === F.length ? F[Number(P) - 1] : M[P];
            str = str.replace(new RegExp(wpHotwordsEscRe(H),"g"), String(R).toUpperCase()),
                str = str.replace(new RegExp(wpHotwordsEscRe(L),"g"), String(W).toUpperCase()),
                str = str.replace(new RegExp(wpHotwordsEscRe(T),"g"), R),
                str = str.replace(new RegExp(wpHotwordsEscRe(k),"g"), W),
            I && (str = wpHotwordsReplaceAllIsolated(str, I, g.day))
        }
    }
    $.cookie("textWidth", e.width());
    var O = e.css("text-align");
    e.html(str);
    var G = wpHotwordsBindingField("varHotWord1", "he")
        , q = wpHotwordsBindingField("varHotWord2", "she")
        , D = {};
    D[G] = p || "",
        D[q] = h || "",
    null != D.he && "" !== D.he || (D.he = p || ""),
    null != D.she && "" !== D.she || (D.she = h || "");
    var V = e.find("[var]");
    e.is("[var]") && (V = V.add(e)),
        V.each((function() {
                var e = ($(this).attr("var") || "").trim();
                e && null != D[e] && "" !== D[e] && $(this).text(D[e])
            }
        ));
    var z = e.find("[varname]");
    e.is("[varname]") && (z = z.add(e)),
        z.each((function() {
                var e = ($(this).attr("varname") || "").trim();
                e && null != D[e] && "" !== D[e] && $(this).text(D[e])
            }
        )),
        alignText(e, O)
}
function changeIframe(e, t, n, o) {
    if (o || (o = 0),
    window.wpHotwordsOverrideBindings && window.wpHotwordsOverrideBindings.bindings && (window.wpHotwords = window.wpHotwords || {},
    window.wpHotwordsOverrideBindings.eventType && (window.wpHotwords.eventType = window.wpHotwordsOverrideBindings.eventType),
        window.wpHotwords.bindings = window.wpHotwordsOverrideBindings.bindings,
        window.wpHotwordsOverrideBindings.replaceOnMaket)) {
        window.wpHotwords.replaceOnMaket = window.wpHotwords.replaceOnMaket || {};
        var r = window.wpHotwordsOverrideBindings.replaceOnMaket;
        for (var i in r)
            r.hasOwnProperty(i) && "" !== r[i] && (window.wpHotwords.replaceOnMaket[i] = r[i])
    }
    setTimeout((function() {
            confetti.reset(),
                textConfetty(.2, .2),
                textConfetty(.1, .3),
                textConfetty(.1, .1),
                $("#mymain .textBox .moveBox:not([type=img]) .textLine, #mainInv .textBox .moveBox:not([type=img]) .textLine, #myinv .textBox .moveBox:not([type=img]) .textLine, #mymain text_opros, #mainInv text_opros, #myinv text_opros").each((function(o, r) {
                        replaceOnMaket($(this), e, t, n)
                    }
                )),
            $.cookie("var_she") && $.cookie("var_he") && $(".screenshot_iphone .domain strong").text(translite($.cookie("var_he")).toLowerCase() + "-i-" + translite($.cookie("var_she")).toLowerCase() + wpRom("domainPreview", ""));
            var o = $(".iFrame iframe").get(0)
                , r = o && o.contentWindow ? o.contentWindow : null;
            r && "function" == typeof r.changeIframe && (r.wpHotwordsOverrideBindings = {
                eventType: window.wpHotwords && window.wpHotwords.eventType || "",
                bindings: window.wpHotwords && window.wpHotwords.bindings || {},
                replaceOnMaket: window.wpHotwords && window.wpHotwords.replaceOnMaket || {}
            },
                r.changeIframe(e, t, n, 2e3))
        }
    ), o)
}
$(window).on("resize.userinventElement8", applyElement8CompensationDebounced),
    $(window).on("resize.userinventViewportScale", setViewportScaleDebounced),
    setTimeout(applyElement8Compensation, 100),
    setTimeout(applyElement8Compensation, 500);
var WP_FONT_PROPS = ["font-family", "font-size", "font-weight", "font-style", "font-variant", "line-height", "letter-spacing", "text-transform", "-webkit-font-smoothing"];
function applyFontVarsFromEl(e, t, n) {
    if (e && t) {
        var o = getComputedStyle(e);
        WP_FONT_PROPS.forEach((function(e) {
                var r = o.getPropertyValue(e);
                r && "normal" !== r && "none" !== r && "0px" !== r && t.style.setProperty("--ag-" + n + "-" + e, r)
            }
        ))
    }
}
function wpParseRgbColor(e) {
    if (!e || "transparent" === e)
        return null;
    var t = String(e).match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return t ? {
        r: +t[1],
        g: +t[2],
        b: +t[3]
    } : null
}
function wpColorLuminance(e) {
    var t = [e.r, e.g, e.b].map((function(e) {
            return (e /= 255) <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
        }
    ));
    return .2126 * t[0] + .7152 * t[1] + .0722 * t[2]
}
function wpColorContrastRatio(e, t) {
    var n = wpColorLuminance(e)
        , o = wpColorLuminance(t);
    return (Math.max(n, o) + .05) / (Math.min(n, o) + .05)
}
function wpAutoGuestReadableTextColor(e) {
    var t = wpParseRgbColor(e);
    if (!t)
        return "rgb(255, 255, 255)";
    return wpColorContrastRatio(t, {
        r: 255,
        g: 255,
        b: 255
    }) >= wpColorContrastRatio(t, {
        r: 0,
        g: 0,
        b: 0
    }) ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"
}
function wpClearAutoGuestCardBg(e) {
    e && (e.style.backgroundImage = "",
        e.style.backgroundSize = "",
        e.style.backgroundRepeat = "")
}
function applyAutoGuestCardTheme(e) {
    if (e) {
        var t = document.querySelector("#screen")
            , n = t && t.querySelector("#opros")
            , o = t && (t.querySelector('#opros [action="questiontxt"]') || t.querySelector('#opros [name="question"]'))
            , r = t && t.querySelector('#opros [action="varianttxt"]')
            , i = "rgb(167, 179, 216)"
            , a = "rgb(0, 0, 0)"
            , s = ""
            , l = ""
            , d = ""
            , c = "";
        if (n) {
            var u = getComputedStyle(n)
                , v = u.backgroundColor;
            v && "transparent" !== v && (i = v);
            var m = u.backgroundImage;
            m && "none" !== m && -1 !== m.indexOf("url(") && (l = m,
                d = u.backgroundSize || "",
                c = u.backgroundRepeat || "")
        }
        if (o) {
            var p = getComputedStyle(o).color;
            if (p && "transparent" !== p)
                a = p;
            else {
                var h = o.getAttribute("data-font-gradient") || o.style.getPropertyValue("--text-gradient-base").trim();
                if (h) {
                    s = h;
                    var f = h.match(/(#(?:[0-9a-fA-F]{3,6}))|rgba?\([^)]+\)|hsla?\([^)]+\)/g);
                    f && f.length && (a = f[Math.floor(f.length / 2)] || f[0])
                }
            }
        }
        e.style.setProperty("--ag-bg", i),
            e.style.setProperty("--ag-color", a),
            s ? (e.style.setProperty("--ag-text-gradient", s),
                e.style.setProperty("--ag-text-color", "transparent")) : (e.style.removeProperty("--ag-text-gradient"),
                e.style.removeProperty("--ag-text-color")),
            l ? (e.style.backgroundImage = l,
                e.style.backgroundSize = d,
                e.style.backgroundRepeat = c) : wpClearAutoGuestCardBg(e),
            applyFontVarsFromEl(o, e, "title"),
            applyFontVarsFromEl(r, e, "label")
    }
}
function applyGuestAgreementStylesToSubmit(e) {
    if (!e)
        return !1;
    var t = document.querySelector("#screen");
    if (!t)
        return !1;
    var n = t.querySelector('.guestAgreement[action="agreebtn"]') || t.querySelector('a.guestAgreement.guestAgree[answer="1"]') || t.querySelector(".guestAgreement.guestAgree");
    if (!n)
        return !1;
    for (var o = getComputedStyle(n), r = n.querySelector('.subTextLine[action="agree_text"]') || n.querySelector('[action="agree_text"]'), i = r ? getComputedStyle(r) : o, a = ["background-color", "background-image", "background-size", "background-repeat", "background-position", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-radius", "box-shadow", "text-decoration", "padding-top", "padding-right", "padding-bottom", "padding-left", "transition", "transform"], s = 0; s < a.length; s++) {
        var l = a[s];
        e.style.setProperty(l, o.getPropertyValue(l))
    }
    for (var d = ["color", "font-family", "font-size", "font-weight", "font-style", "letter-spacing", "line-height", "text-shadow", "text-transform", "font-variant", "-webkit-font-smoothing"], c = 0; c < d.length; c++) {
        var u = d[c];
        e.style.setProperty(u, i.getPropertyValue(u))
    }
    return e.style.setProperty("width", "100%"),
        e.style.setProperty("max-width", "100%"),
        e.style.setProperty("box-sizing", "border-box"),
        e.style.setProperty("margin", "0"),
        e.style.setProperty("display", "flex"),
        e.style.setProperty("align-items", "center"),
        e.style.setProperty("justify-content", "center"),
        e.style.setProperty("cursor", "pointer"),
        e.style.setProperty("text-align", "center"),
        e.style.setProperty("-webkit-appearance", "none"),
        e.style.setProperty("appearance", "none"),
        !0
}
function wpAutoGuestTagText(e) {
    var t = document.querySelector("auto_guest_msg " + e);
    return t && t.textContent ? String(t.textContent).trim() : ""
}
function wpAutoGuestSubmitLabelText() {
    var e = document.querySelector('#screen .guestAgreement[action="agreebtn"] btn_agree') || document.querySelector("#screen a.guestAgreement.guestAgree btn_agree") || document.querySelector("#screen btn_agree");
    if (e && e.textContent) {
        var t = String(e.textContent).trim();
        if (t)
            return t
    }
    return "Подтвердить"
}
function wpAutoGuestInitialCountry() {
    var e = "string" == typeof window.wpTelIso ? window.wpTelIso : document.documentElement.getAttribute("lang") || "";
    if (2 === (e = String(e).trim().toLowerCase().split("-")[0].replace(/[^a-z]/g, "")).length)
        return e;
    return {
        ru: "ru",
        kz: "kz",
        br: "br",
        en: "us",
        in: "in",
        fr: "fr",
        de: "de"
    }[e] || "us"
}
function wpDestroyAutoGuestPhoneIti(e) {
    if (e && window.intlTelInput && "function" == typeof window.intlTelInput.getInstance)
        try {
            var t = window.intlTelInput.getInstance(e);
            t && "function" == typeof t.destroy && t.destroy()
        } catch (e) {}
}
function wpNormalizeTelE164(e) {
    var t = String(e || "").replace(/\D/g, "");
    return t ? "+" + t : ""
}
function wpAutoGuestTelFromIti(e) {
    if (!e || "function" != typeof e.getNumber)
        return "";
    var t = wpNormalizeTelE164(e.getNumber()).replace(/\D/g, "");
    if (!t)
        return "";
    var n = "";
    if ("function" == typeof e.getSelectedCountryData) {
        var o = e.getSelectedCountryData();
        n = o && null != o.dialCode ? String(o.dialCode).replace(/\D/g, "") : ""
    }
    return n && 0 !== t.indexOf(n) && (t = n + t),
    "+" + t
}
function wpInitAutoGuestPhoneIti(e) {
    if (!e || !window.intlTelInput)
        return null;
    wpDestroyAutoGuestPhoneIti(e);
    var t = document.getElementById("autoGuestModal")
        , n = {
        initialCountry: wpAutoGuestInitialCountry(),
        separateDialCode: !0,
        preferredCountries: ["ru", "kz", "br", "us", "in"],
        formatOnDisplay: !0
    };
    t && (n.dropdownContainer = t);
    try {
        return window.intlTelInput(e, n)
    } catch (e) {
        return null
    }
}
function openAutoGuestModal(e, t, n) {
    var o = $("#autoGuestModal");
    if (o.length) {
        var r = o.find(".modal-card")
            , i = o.find(".modal-card__submit");
        applyAutoGuestCardTheme(r[0]),
            o.find(".modal-card__title").text(e.guestNameText),
            o.find(".field--firstName .field__label").text(e.firstNameLabel || "Имя"),
            o.find(".field--lastName .field__label").text(e.lastNameLabel || "Фамилия");
        var a = (e.phoneText || "").replace(/:\s*$/, "");
        o.find(".field--phone .field__label").text(a),
            i.removeAttr("style");
        var s = i.find(".modal-card__submit-label");
        s.length ? s.text(wpAutoGuestSubmitLabelText()) : i.text(wpAutoGuestSubmitLabelText()),
        applyGuestAgreementStylesToSubmit(i[0]) || i.removeAttr("style");
        var l = $("#autoGuestFirstName")
            , d = $("#autoGuestLastName")
            , c = $("#autoGuestPhone");
        l.attr("placeholder", e.firstNameLabel || "Имя"),
            d.attr("placeholder", e.lastNameLabel || "Фамилия"),
            wpDestroyAutoGuestPhoneIti(c[0]),
            l.val(""),
            d.val(""),
            c.val(""),
            o.find(".field").removeClass("is-error"),
            o.find(".field__error").text(""),
            o.find(".modal-card__form").off(".autoGuest"),
            o.find(".modal-card__close").off(".autoGuest"),
            $(document).off("keydown.autoGuest"),
            o.find(".modal-card__form").on("submit.autoGuest", (function(n) {
                    n.preventDefault();
                    var r = $.trim(l.val())
                        , i = $.trim(d.val())
                        , a = (r + " " + i).replace(/\s+/g, " ").trim();
                    o.find(".field").removeClass("is-error"),
                        o.find(".field__error").text("");
                    var s = !1;
                    r || (l.closest(".field").addClass("is-error").find(".field__error").text(e.emptyNameText),
                        s = !0),
                    i || (d.closest(".field").addClass("is-error").find(".field__error").text(e.emptyLastNameText || "Введите свою фамилию"),
                        s = !0);
                    var v = c[0]
                        , m = v && window.intlTelInput && "function" == typeof window.intlTelInput.getInstance ? window.intlTelInput.getInstance(v) : null
                        , p = "";
                    if ((p = m && "function" == typeof m.getNumber ? wpAutoGuestTelFromIti(m) : wpNormalizeTelE164($.trim(c.val()))).replace(/\D/g, "").length >= 7 || (c.closest(".field").addClass("is-error").find(".field__error").text(e.invalidPhoneText),
                        s = !0),
                        !s) {
                        var h = (r + " " + i).replace(/\s+/g, " ").trim()
                            , f = e.redirectText.replace("{Name}", h);
                        "undefined" != typeof toastr && toastr.success && toastr.success(f),
                            u(),
                        "function" == typeof t && t(a, p)
                    }
                }
            )),
            o.find(".modal-card__close").on("click.autoGuest", (function() {
                    u(),
                    "function" == typeof n && n()
                }
            )),
            $(document).on("keydown.autoGuest", (function(e) {
                    27 === e.keyCode && (u(),
                    "function" == typeof n && n())
                }
            )),
            o.addClass("is-open"),
            wpInitAutoGuestPhoneIti(c[0]),
            setTimeout((function() {
                    l.trigger("focus")
                }
            ), 50)
    } else
        "function" == typeof n && n();
    function u() {
        wpDestroyAutoGuestPhoneIti(c[0]),
            o.removeClass("is-open"),
            o.find(".modal-card__submit").removeAttr("style"),
            wpClearAutoGuestCardBg(r[0]),
            o.find(".modal-card__form").off(".autoGuest"),
            o.find(".modal-card__close").off(".autoGuest"),
            $(document).off("keydown.autoGuest")
    }
}
function isGuestOprosActive() {
    var e = $("#opros");
    return !!e.length && ("1" == $(".guestAgree[answer=1]").attr("data-opros") && e.is(":visible"))
}
function syncGuestCommentPlacement() {
    var e = $("#comment");
    e.length && (isGuestOprosActive() ? e.appendTo("#opros") : $("#agree").length && $("#textAgree").length && e.insertBefore("#textAgree"))
}
function openGuestCommentForm() {
    if ($(".addComment").length && $(".commentBox").length && $(".commentYes").hasClass("hide") && (!$(".commentBox").is(":visible") || $(".commentBox").hasClass("hide"))) {
        $(".addComment").css("visibility", "hidden"),
            $(".commentBox").removeClass("hide").fadeIn(),
            initWithMoneyDefault();
        var e = $(".commentBox textarea").get(0);
        e && autoTextarea(e, 2)
    }
}
function openGuestCommentFormIfOpros() {
    isGuestOprosActive() && openGuestCommentForm()
}
function showOprosGuestAnim() {
    var e = $("#opros");
    if (e.length && !window._oprosGuestAnimLock) {
        window._oprosGuestAnimLock = !0;
        var t = e[0];
        t.style.animation = "",
            t.style.opacity = "0",
            t.style.transformOrigin = "center center",
            t.style.display = "block",
            t.offsetHeight,
            requestAnimationFrame((function() {
                    t.style.animation = "appearHeart 0.9s 1 cubic-bezier(0.215, 0.61, 0.355, 1) 0s both",
                        window.dispatchEvent(new Event("scroll"))
                }
            )),
            e.off("animationend.oprosEnter webkitAnimationEnd.oprosEnter").one("animationend.oprosEnter webkitAnimationEnd.oprosEnter", (function(e) {
                    var t = e.originalEvent ? e.originalEvent.animationName : "";
                    t && "appearHeart" !== t || (window._oprosGuestAnimLock = !1)
                }
            )),
            $("#screen").scrollTo("#opros"),
            showQRGuestsBlock(),
            syncGuestCommentPlacement(),
            openGuestCommentFormIfOpros()
    }
}
function showTextAgreeAnim() {
    var e = document.getElementById("textAgree");
    e && (e.classList.remove("hide"),
        e.style.animation = "",
        e.style.opacity = "0",
        e.style.transformOrigin = "center center",
        e.offsetHeight,
        requestAnimationFrame((function() {
                e.style.animation = "appearHeart 0.9s 1 cubic-bezier(0.215, 0.61, 0.355, 1) 0s both"
            }
        )))
}
function wpResolveGuestId() {
    var e = getUrlVar() && getUrlVar().guest;
    return String(guest_id || e || "").replace(/\?\d+$/, "")
}
function wpHideTextAgreeBlock() {
    var e = document.getElementById("textAgree");
    e && (e.classList.add("hide"),
        e.style.animation = "",
        e.style.opacity = ""),
        $(".iAgree").addClass("hide")
}
function acceptInvite(e) {
    var t = Date.now()
        , n = wpResolveGuestId();
    if (!(acceptInvite._dedupe && String(acceptInvite._dedupe.answer) === String(e) && t - acceptInvite._dedupe.t < 150)) {
        if (acceptInvite._dedupe = {
            answer: e,
            t: t
        },
        !n || "1" == n) {
            var o = {};
            if (document.querySelector("auto_guest_msg")) {
                o.guestNameText = document.querySelector("auto_guest_msg autoguest_name").textContent,
                    o.emptyNameText = document.querySelector("auto_guest_msg autoguest_empty_name").textContent,
                    o.needFullNameText = document.querySelector("auto_guest_msg autoguest_need_fullname").textContent,
                    o.phoneText = document.querySelector("auto_guest_msg autoguest_phone").textContent,
                    o.invalidPhoneText = document.querySelector("auto_guest_msg autoguest_invalid_phone").textContent,
                    o.redirectText = document.querySelector("auto_guest_msg autoguest_redirect").textContent;
                var r = "undefined" != typeof window && window.wpAutoGuestLabels || {};
                o.firstNameLabel = wpAutoGuestTagText("autoguest_label_first") || r.first || "Имя",
                    o.lastNameLabel = wpAutoGuestTagText("autoguest_label_last") || r.last || "Фамилия",
                    o.emptyLastNameText = wpAutoGuestTagText("autoguest_empty_lastname") || "Введите свою фамилию"
            } else {
                o.guestNameText = "Подтверждение приглашения",
                    o.emptyNameText = "Введите свое имя",
                    o.needFullNameText = "Необходимо указать вашу фамилию и имя",
                    o.phoneText = "Введите ваш номер телефона:",
                    o.invalidPhoneText = "Введите корректный номер телефона",
                    o.redirectText = "{Name}, перенаправляем на персональную страницу приглашения";
                var i = "undefined" != typeof window && window.wpAutoGuestLabels || {};
                o.firstNameLabel = i.first || "Имя",
                    o.lastNameLabel = i.last || "Фамилия",
                    o.emptyLastNameText = "Введите свою фамилию"
            }
            return openAutoGuestModal(o, (function(e, t) {
                    e && $.ajax({
                        url: "template/invent/userinvent.php",
                        data: {
                            Action: "autoGuestSave",
                            user_id: user_id,
                            electro: 1,
                            paper: 0,
                            user_phone: t,
                            user_name: e
                        },
                        type: "post",
                        success: function(e) {
                            if (e) {
                                if (window.location.href.includes("/template/invent/?user="))
                                    var t = window.location.href + "&guest=" + e + "&from=QR";
                                else
                                    t = window.location.href.replace(/\?\d+$/, "") + "/" + e + "?from=QR";
                                window.location.href = t
                            } else
                                toastr.error("Error add new guest")
                        }
                    })
                }
            ), (function() {}
            )),
                !1
        }
        if (1 == e) {
            function a(e, t) {
                return Math.random() * (t - e) + e
            }
            var s;
            confetti({
                angle: a(55, 125),
                spread: a(50, 70),
                particleCount: a(50, 100),
                origin: {
                    y: .6
                }
            }),
                s = $(document).width() < 500 ? 2 : 8;
            var l = Date.now() + 1e3 * s
                , d = [];
            $(".colors .color").each((function(e, t) {
                    void 0 !== $(this).attr("bg") && d.push($(this).attr("bg"))
                }
            )),
            d[0] && function e() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 40,
                    origin: {
                        x: 0
                    },
                    colors: d
                }),
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 40,
                        origin: {
                            x: 1
                        },
                        colors: d
                    }),
                Date.now() < l && requestAnimationFrame(e)
            }(),
            1 == $(".guestAgree[answer=1]").attr("data-opros") && showOprosGuestAnim(),
                $(".guestAgree[answer=1]").addClass("hide"),
                showTextAgreeAnim(),
                $(".cancelLink").removeClass("hide"),
                $(".acceptLink").addClass("hide"),
            "1" != $(".guestAgree[answer=1]").attr("data-opros") && syncGuestCommentPlacement()
        } else if (0 == e) {
            if (1 == $(".guestAgree[answer=1]").attr("data-opros")) {
                var c = $("#opros");
                window._oprosGuestAnimLock = !1,
                    c.removeClass("opros-entering"),
                    c.fadeOut((function() {
                            syncGuestCommentPlacement()
                        }
                    )),
                    $("#weddingOpros label i").removeClass("fa-check-circle").addClass("fa-circle-o"),
                    $("#weddingOpros input").removeAttr("checked")
            }
            $(".cancelLink").addClass("hide"),
                $(".acceptLink").removeClass("hide"),
                $(".guestAgree[answer=1]").removeClass("hide"),
                wpHideTextAgreeBlock(),
                $(".commentBox").show(),
                $(".addComment").css("visibility", "hidden"),
                showMoneyBox(),
                $(".commentBox textarea").addClass("errorInput1px"),
                syncGuestCommentPlacement()
        } else
            $(".guestAgree").addClass("hide"),
                showTextAgreeAnim(),
                e = 1;
        n && "1" != n && $.ajax({
            url: "template/invent/userinvent.php",
            data: {
                Action: "guestAgree",
                answer: e,
                guest: n
            },
            type: "post",
            success: function(e) {}
        })
    }
}
function nl2br(e) {
    return e.replace(/([^>])\n/g, "$1<br/>")
}
function br2nl(e) {
    return e.replace(/<br>/g, "\n")
}
function replaceYou(e, t) {
    return "tu" == t ? e.replace(/Вас/g, "тебя").replace(/Вам/g, "тебе").replace(/Вы/g, "ты") : e.replace(/тебя/g, "Вас").replace(/тебе/g, "Вам").replace(/ ты/g, " Вы")
}
function wpFitTextToEl(e, t) {
    if (e)
        for (var n = (t || 8) * (96 / 72), o = parseFloat(window.getComputedStyle(e).fontSize); e.scrollWidth > e.offsetWidth && o > n; )
            o -= 1,
                e.style.fontSize = o + "px"
}
function getQR(e, t, n, o) {
    var r = o || "https://wdpst.ru/" + t + "/" + n
        , i = $(e + " .backQR, " + e + " .backqr")
        , a = $(e + " .frontQR, " + e + " .frontqr")
        , s = i.get(0)
        , l = a.get(0);
    s && l && (Bcolor = i.attr("Bcolor"),
    Bcolor && "undefined" != typeof Bcolor || (vallColor = s.style.background,
    vallColor || (vallColor = s.style.backgroundColor),
        Bcolor = getHexColor(vallColor).slice(1),
        i.attr("Bcolor", Bcolor),
        i.css("background", "")),
        vallColor = l.style.background,
    vallColor || (vallColor = l.style.backgroundColor),
        Fcolor = getHexColor(vallColor).slice(1),
        a.hide(),
        i.css("background-image", "url(https://wdpst.store/QRgen.php?user_id=" + t + "&guest=" + n + "&backQR=" + Bcolor + "&frontQR=" + Fcolor + "&link=" + r + ")"),
        $(e + " qr_link").text(r))
}
function getHexColor(e) {
    if ((e = e.replace(/\s/g, "")).indexOf("rgba") + 1) {
        var t = e.lastIndexOf(",") - e.length;
        e = "rgb(" + e.slice(0, t).substr(5) + ")"
    }
    var n = e.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    colorHEX = "";
    for (var o = 1; o <= 3; o++)
        colorHEX += Math.round(("%" == n[o][n[o].length - 1] ? 2.55 : 1) * parseInt(n[o])).toString(16).replace(/^(.)$/, "0$1");
    return "#" + colorHEX
}
function makeDearGuest() {
    var e = $("#mainInv .back dear_guest").parent(".textLine");
    if (void 0 !== e.attr("font")) {
        var t = e.attr("font")
            , n = parseFloat(t);
        if (isNaN(n))
            e.css("font-size", t);
        else {
            var o = t.replace(n, "") || "px";
            e.css("font-size", .75 * n + o)
        }
    }
    if (void 0 !== e.attr("line")) {
        var r = e.attr("line")
            , i = parseFloat(r);
        if (isNaN(i))
            e.css("line-height", r);
        else {
            var a = r.replace(i, "") || "px";
            e.css("line-height", .75 * i + a)
        }
    }
    var s = e.css("line-height").slice(0, -2)
        , l = 2 * parseInt(s) + 4
        , d = e.css("height").slice(0, -2);
    e.css("transition", "none");
    for (var c = .05; d > l; ) {
        var u = e.css("font-size").slice(0, -2)
            , v = e.css("line-height").slice(0, -2);
        e.css("font-size", .96 * u + "px").css("line-height", .95 * v + "px"),
            d = e.height(),
            c = .05 + c
    }
}
function showComment(e, t, n, o) {
    $(".commentBox").addClass("hide"),
        $(".addComment").css("visibility", "hidden"),
        $(".commentYes .andGift").addClass("hide"),
        $(".commentYes").removeClass("hide"),
        $(".commentYes .commentFromGuest span").html(nl2br(t)),
        $(".commentYes .author").html(e),
    ($("input[name=withMoney]").is(":checked") || void 0 !== n && "0" != n && n) && ($(".commentYes .andGift").removeClass("hide"),
        $(".commentYes .andGift div").text(n)),
    void 0 === o && (o = "Только что"),
        $(".commentYes .time").text(o)
}
if (getUrlVar().user || getUrlVar().style_id || void 0 === getUrlVar().mydomain && (window.location.origin.indexOf("weddingpost.ru") + 1 !== 0 || window.location.origin.indexOf("localhost") + 1))
    if (void 0 !== getUrlVar().user || getUrlVar().style_id)
        user_id = getUrlVar().user,
            guest_id = getUrlVar().guest;
    else {
        var user_id = (path = document.location.pathname.match(/\/[^\D]+/g))[0].slice(1);
        if (path[1])
            var guest_id = path[1].slice(1);
        else
            guest_id = 1
    }
else if (!(window.location.origin.indexOf("localhost") + 1 || window.location.origin.indexOf(":3000") + 1) && (mydomain = void 0 !== getUrlVar().mydomain ? getUrlVar().mydomain : window.location.hostname,
    (function() {
        var _xhr = new XMLHttpRequest();
        _xhr.open("GET", "template/invent/userinvent.php", false);
        _xhr.send();
        if (_xhr.status === 200) {
            var _data = JSON.parse(_xhr.responseText);
            _data && _data.user_id ? user_id = _data.user_id : window.location.href = "https://weddingpost.ru/404.html";
        } else {
            window.location.href = "https://weddingpost.ru/404.html";
        }
    })(),
document.location.pathname.length > 1))
    var path, guest_id = (path = document.location.pathname.match(/\/[^\D]+/g))[0].slice(1);
user_id = ("" + (user_id || "")).replace(/\?\d+$/, ""),
    guest_id = ("" + (guest_id || "")).replace(/\?\d+$/, "");
var invOtherGuests = [];
function getQrGuestConfirmHtml() {
    var e = document.querySelector("#screen qr_confirm_other_guests");
    return e && null != e.innerHTML && "" !== String(e.innerHTML).replace(/\s/g, "") ? e.innerHTML : "В вашем приглашении еще есть гости.<br> Хотите подтвердить их присутствие?"
}
function getQrGuestConfirmedTitle() {
    var e = document.querySelector("#screen qr_confirmed_guests_title");
    return e && null != e.textContent && "" !== e.textContent.trim() ? e.textContent.trim() : "Гости, которые уже подтвердили:"
}
function showQRGuestsBlock() {
    if ("QR" === getUrlVar().from && invOtherGuests && 0 !== invOtherGuests.length && $("#opros").length && !$("#qrOtherGuests").length) {
        var e = window.location.origin
            , t = -1 !== window.location.href.indexOf("/template/invent/?user=")
            , n = []
            , o = [];
        invOtherGuests.forEach((function(e) {
                var t = null != e.electro_status ? Number(e.electro_status) : NaN;
                4 === t || 8 === t ? o.push(e) : n.push(e)
            }
        ));
        var r = $("<div>", {
            id: "qrOtherGuests",
            class: "qr-other-guests-wrap"
        });
        if (n.length) {
            r.append($("<p>", {
                class: "qr-other-guests-title"
            }).html(getQrGuestConfirmHtml()));
            var i = $("<div>", {
                class: "qr-other-guests-pills"
            });
            n.forEach((function(e) {
                    i.append($("<a>", {
                        href: s(e.id),
                        class: "qr-guest-pill"
                    }).text(e.name || ""))
                }
            )),
                r.append(i)
        }
        if (o.length) {
            r.append($("<p>", {
                class: "qr-confirmed-section-title",
                text: getQrGuestConfirmedTitle()
            }));
            var a = $("<div>", {
                class: "qr-other-guests-pills"
            });
            o.forEach((function(e) {
                    var t = 4 === Number(e.electro_status)
                        , n = t ? "qr-guest-pill qr-guest-pill--confirmed" : "qr-guest-pill qr-guest-pill--declined"
                        , o = t ? "fa fa-check" : "fa fa-times"
                        , r = $("<a>", {
                        href: s(e.id),
                        class: n
                    });
                    r.append($("<i>", {
                        class: "qr-pill-icon " + o
                    }));
                    var i = e.name || "";
                    i && r.append($("<span>", {
                        class: "qr-pill-name",
                        text: i
                    })),
                        a.append(r)
                }
            )),
                r.append(a)
        }
        $("#opros").append(r),
            applyQRGuestsTheme(r[0])
    }
    function s(n) {
        return n = null != n ? n : "",
            t ? e + "/template/invent/?user=" + user_id + "&guest=" + n + "&from=QR" : e + "/" + user_id + "/" + n + "?from=QR"
    }
}
function applyQRGuestsTheme(e) {
    if (e) {
        var t = document.querySelector("#screen");
        if (t) {
            for (var n = t.querySelector('#opros [action="questiontxt"]') || t.querySelector('#opros [name="question"]'), o = e.querySelectorAll(".qr-other-guests-title, .qr-confirmed-section-title"), r = 0; r < o.length; r++) {
                var i = o[r];
                if (i && n) {
                    var a = getComputedStyle(n)
                        , s = a.color;
                    s && "transparent" !== s || (s = "rgb(0, 0, 0)"),
                        i.style.setProperty("color", s),
                        WP_FONT_PROPS.forEach((function(e) {
                                var t = a.getPropertyValue(e);
                                t && "normal" !== t && "none" !== t && "0px" !== t && i.style.setProperty(e, t)
                            }
                        ))
                }
            }
            var l = t.querySelector('.guestAgreement[action="agreebtn"]') || t.querySelector('a.guestAgreement.guestAgree[answer="1"]') || t.querySelector(".guestAgreement.guestAgree")
                , d = e.querySelectorAll("a.qr-guest-pill:not(.qr-guest-pill--confirmed):not(.qr-guest-pill--declined)");
            if (l && d.length)
                for (var c = l.querySelector('.subTextLine[action="agree_text"]') || l.querySelector('[action="agree_text"]'), u = getComputedStyle(l), v = c ? getComputedStyle(c) : u, m = ["background-color", "background-image", "background-size", "background-repeat", "background-position", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-radius", "box-shadow", "text-decoration", "padding-top", "padding-right", "padding-bottom", "padding-left", "transition", "transform"], p = ["color", "font-family", "font-size", "font-weight", "font-style", "letter-spacing", "line-height", "text-shadow", "text-transform", "font-variant", "-webkit-font-smoothing"], h = 0; h < d.length; h++) {
                    for (var f = d[h], w = 0; w < m.length; w++) {
                        var g = m[w];
                        f.style.setProperty(g, u.getPropertyValue(g))
                    }
                    for (var y = 0; y < p.length; y++) {
                        var b = p[y];
                        f.style.setProperty(b, v.getPropertyValue(b))
                    }
                    f.style.setProperty("display", "inline-flex"),
                        f.style.setProperty("align-items", "center"),
                        f.style.setProperty("gap", "7px"),
                        f.style.setProperty("justify-content", "center"),
                        f.style.setProperty("text-align", "center"),
                        f.style.setProperty("cursor", "pointer"),
                        f.style.setProperty("box-sizing", "border-box"),
                        f.style.setProperty("margin", "0"),
                        f.style.setProperty("border-radius", "50px")
                }
        }
    }
}
function typePaper(e) {
    var t = $(".sheet .back dear_guest").parent()
        , n = t.css("color");
    if (n = void 0 !== n ? n.indexOf("rgba") + 1 ? n.slice(0, -4).substr(5) : n.slice(0, -1).substr(4) : "#000",
        t.parent().children("span").remove(),
        t.parent().append("<span style='bottom:10px; position:relative; display:block; border-bottom:2px solid rgb(" + n + ")'></span>"),
    "noname" == e || 1 == e) {
        t.html();
        t.parent().children("span").removeClass("hide"),
            t.css("opacity", 0)
    } else
        t.parent().children("span").addClass("hide"),
            t.css("opacity", 100)
}
function makeSexWords(e, t) {
    var n = e.match(/([^\s,]+\|[^\s,]+\|[^\s,]+)/g);
    return t && n && $.each(n, (function(n, o) {
            switch (t) {
                case "he":
                    var r = o.split("|")[0];
                    break;
                case "she":
                    r = o.split("|")[1];
                    break;
                case "they":
                    r = o.split("|")[2]
            }
            e = e.replace(o, r)
        }
    )),
        e
}
function makeHotwords(e, t) {
    (e = e.replace(new RegExp("Имя<br>гостя","g"), "<ГОСТЬ>")).indexOf("<img") + 1 == 0 && e.indexOf("<a") + 1 == 0 && e.indexOf("<iframe") + 1 == 0 && e.indexOf("<ГОСТЬ>") + 1 == 0 && (getUrlVar().paper,
        getUrlVar().paper,
        getUrlVar().paper),
        e = (e = (e = (e = e.replace(new RegExp("/&gt;/i","g"), ">")).replace(new RegExp("/&lt;/i","g"), "<")).replace(new RegExp("<ЖЕНИХ>","g"), "Жених")).replace(new RegExp("<НЕВЕСТА>","g"), "Невеста");
    return $.each({
        date: "<ДАТА>",
        time: "<ВРЕМЯ>",
        he: "Жених",
        she: "Невеста",
        place: "<МЕСТО>",
        address: "<АДРЕС>",
        guest: "<ГОСТЬ>"
    }, (function(n, o) {
            if (e.indexOf(o) + 1) {
                if (t)
                    var r = t[n];
                else
                    r = $("#constructorContent input[name=" + n + "]").val();
                "__.__.____" != r && "__:__" != r || (r = ""),
                "" == r && (r = "&ensp;"),
                    e = e.replace(new RegExp(o,"g"), r)
            }
        }
    )),
        e
}
function autoTextarea(e, t) {
    for (var n = e.value, o = n.match(/^.*(\r\n|\n|$)/gim), r = !1, i = 0; i < o.length; i++)
        r += (n = o[i].replace(/\r|\n/g, "")).length ? Math.ceil(n.length / 35) : 1;
    t && r < t && (r = t),
        e.rows = r
}
function getUrlVar() {
    var e = []
        , t = []
        , n = [];
    if ("" == (e = window.location.search.substr(1).split("&"))[0])
        return !1;
    for (i = 0; i < e.length; i++)
        n[(t = e[i].split("="))[0]] = t[1];
    return n
}
function wpInvIsPartyProduct(e) {
    if (!e)
        return !1;
    var t = e.wp_party_product;
    return 1 === t || "1" === t || !0 === t
}
var user_coord = "";
function applyStylePreviewForceGuestUi() {
    if (window.wpStylePreviewForceGuestUi) {
        var e = document.getElementById("opros");
        e && e.style.setProperty("display", "block", "important"),
            $(".commentBox").show().removeClass("hide"),
            showMoneyBox(),
            $(".addComment").css("visibility", "hidden"),
            syncGuestCommentPlacement(),
        window._wpStylePreviewAgreeLockBound || (window._wpStylePreviewAgreeLockBound = !0,
            document.addEventListener("click", (function(e) {
                    window.wpStylePreviewForceGuestUi && $(e.target).closest(".guestAgreement[action=agreebtn]").length && (e.preventDefault(),
                        e.stopImmediatePropagation())
                }
            ), !0))
    }
}
function startPreviewAutoScroll() {
    var e = getUrlVar();
    if (e && "mobile_preview" == e.mode) {
        var t = String(e.autoscroll || "").toLowerCase();
        "1" !== t && "yes" !== t || (n(),
            window._previewAutoScrollStartTimer = setTimeout((function() {
                    window._previewAutoScrollStartTimer = null;
                    var e = window.innerHeight || document.documentElement.clientHeight || 0
                        , t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight)
                        , o = Math.max(0, t - e);
                    if (!(o < 8)) {
                        var r = Math.min(2e4, Math.max(8e3, Math.round(7.5 * o)))
                            , i = Math.max(1, Math.round(r / 2));
                        $(window).on("wheel.previewAutoScroll touchstart.previewAutoScroll", n);
                        var a = !1;
                        $("html, body").stop(!0, !1).animate({
                            scrollTop: o
                        }, r, "swing", (function() {
                                a || (a = !0,
                                    $("html, body").stop(!0, !1).animate({
                                        scrollTop: 0
                                    }, i, "swing", (function() {
                                            $(window).off(".previewAutoScroll"),
                                                $("html, body").scrollTop(0)
                                        }
                                    )))
                            }
                        ))
                    }
                }
            ), 7e3))
    }
    function n() {
        $("html, body").stop(!0, !1),
            $(window).off(".previewAutoScroll"),
        window._previewAutoScrollStartTimer && (clearTimeout(window._previewAutoScrollStartTimer),
            window._previewAutoScrollStartTimer = null)
    }
}
function getInvs(e, t, n) {
    var o;
    o = "simulate" === getUrlVar().mode || "preview" === getUrlVar().mode ? getUrlVar().paper && "underfined" != getUrlVar().paper ? getUrlVar().paper : 0 : getUrlVar().mode ? getUrlVar().mode : getUrlVar().paper && "underfined" != getUrlVar().paper ? getUrlVar().paper : 0,
        fetch("template/invent/userinvent.php").then((function(e) { return e.json() })).then((function(t) {
            successCallback_local(t, n, e);
        })).catch((function(e) {
            console.error("Failed to load userinvent.php:", e);
        }));
    function successCallback_local(t, n, e) {
        var _completeFn = function() {
                getUrlVar().opros_result || getUrlVar().show_comment || "electro" != n || (window.self === window.top && (document.body.setAttribute("type", "instant_electro"),
                    updateInventMobBack()),
                    requestAnimationFrame((function() {
                            requestAnimationFrame((function() {
                                    requestAnimationFrame((function() {
                                            mapsInit()
                                        }
                                    ))
                                }
                            ))
                        }
                    )))
        };
                if (invOtherGuests = t.inv_other_guests && Array.isArray(t.inv_other_guests) ? t.inv_other_guests : [],
                "" != t.userdata) {
                    usercontent = JSON.parse(t.userdata),
                    t.guest_name || (t.guest_name = "Гость"),
                    t.guest_sex || (t.guest_sex = "he"),
                        t.domain ? t.domain = JSON.parse(t.domain)[1].domain : t.domain = "weddingpost.ru/" + t.user_id;
                    var o = {
                        date: usercontent.timing.date,
                        time: usercontent.timing.time,
                        he: usercontent.he,
                        she: usercontent.she,
                        place: usercontent.timing.place,
                        address: usercontent.timing.address,
                        guest: t.guest_name,
                        sex: t.guest_sex,
                        money: usercontent.money,
                        money_provider: usercontent.money_provider || "yoomoney",
                        money_link: usercontent.money_link || ""
                    }
                }
                if ("electro" == n) {
                    $(".content").html(t.electro_content),
                        setTimeout((function() {
                                window.runGuestTimetableInit && window.runGuestTimetableInit()
                            }
                        ), 0);
                    var r = t.startscreen && !t.pay_id && "QR" != getUrlVar().from && 1 != getUrlVar().opros_result && 1 != getUrlVar().show_comment || 1 != getUrlVar().opros_result && 1 != getUrlVar().show_comment && "QR" != getUrlVar().from && t.startscreen && t.pay_id && ("eAllSMSPalitraOrder" == t.eorder || "eAllSMSMoneyOrder" == t.eorder || "eAllSMSMoneyOrder-paper" == t.eorder || "eAllDesignOrder" == t.eorder || "eAllDesignOrder-paper" == t.eorder);
                    window.wpBanketScreenMode && (r = !1),
                    r || (window._shineInit && window._shineInit(),
                        setTimeout((function() {
                                window._shineScrollRepeatInit && window._shineScrollRepeatInit()
                            }
                        ), 4e3)),
                    r && ($(".content").addClass("hide"),
                        fetch(window.location.origin + "/template/invent/startscreen/startscreen.php?user_id=" + e).then((e => e.text())).then((e => {
                                const t = (new DOMParser).parseFromString(e, "text/html").body.innerHTML;
                                $("body").append(t);
                                document.querySelector('script[src="/Wedding/template/invent/startscreen/startscreen.js"]') || setTimeout(( () => {
                                        const e = document.createElement("script");
                                        e.src = "/template/invent/startscreen/startscreen.js",
                                            document.body.appendChild(e)
                                    }
                                ), 0)
                            }
                        )),
                        $(document).on("click", "#openContent_ss", (function() {
                                $(t.electro_content).filter("#screen").contents();
                                $(".content").removeClass("hide"),
                                window.initMymainAnim && window.initMymainAnim({
                                    restart: !0
                                }),
                                window._shineInit && window._shineInit(),
                                    setTimeout((function() {
                                            window._shineScrollRepeatInit && window._shineScrollRepeatInit()
                                        }
                                    ), 4e3),
                                window.initGuestBelowMymainAnimations && window.initGuestBelowMymainAnimations(),
                                    requestAnimationFrame((function() {
                                            requestAnimationFrame((function() {
                                                    requestAnimationFrame((function() {
                                                            mapsInit()
                                                        }
                                                    ))
                                                }
                                            ))
                                        }
                                    ));
                                const e = $("body .content_module_ss");
                                e.css("pointer-events", "none"),
                                    e.fadeOut(300, (function() {
                                            e.remove(),
                                                $("body").css({
                                                    overflow: "",
                                                    transform: ""
                                                })
                                        }
                                    ));
                                const n = $(".content #mymain .element6")
                                    , o = n.find(".plate_box").clone(!0)
                                    , r = n.find(".element_txt").clone(!0);
                                r.prependTo(n),
                                    o.insertBefore(r),
                                    n.find(".plate_box:not(:first), .element_txt:not(:first)").remove();
                                const i = document.getElementById("audioPlayer")
                                    , a = document.getElementById("playPauseIcon");
                                i && a && (a.classList.replace("fa-play", "fa-music"),
                                    i.play().catch((e => {}
                                    ))),
                                    setTimeout(initMymainScrollHint, 80)
                            }
                        )));
                    var i = $(".plate_box .element1[action=plate]")
                        , a = i.css("background");
                    if (a && a.indexOf("/plate/") + 1 && !a.indexOf("/plate/all/none.png") + 1 && i.parent().addClass("plate-design"),
                    "mobile_preview" == getUrlVar().mode && ($(window).width() < 750 && ($("#menu").css("padding-top", "12px").css("height", "73px"),
                        $("#mymain").css("padding-top", "12px")),
                        startPreviewAutoScroll()),
                        t.guest_comment) {
                        var s = JSON.parse(t.guest_comment);
                        showComment(t.guest_name, s.text, s.moneyText, t.guest_commenttime)
                    } else
                        $(".commentBox").hide()
                } else
                    "paper" == n && ($(".content").html(t.paper_content),
                    window._shineInit && window._shineInit(),
                        setTimeout((function() {
                                window._shineScrollRepeatInit && window._shineScrollRepeatInit()
                            }
                        ), 4e3),
                    window._scrollAnimInit && window._scrollAnimInit(),
                        $(".content").attr("id", ""),
                        $(".sheetview").children("div").removeClass("bottomPaperFade"),
                        $(".textLine").css("transition", "none"));
                if ($("[var=she]").html(o.she),
                    $("[var=he]").html(o.he),
                "Гость" != o.guest && $("[var=guest]").html(o.guest),
                t.guest_title && $("dear_guest").html(t.guest_title),
                    o.money) {
                    var l = o.money_provider || "yoomoney"
                        , d = "";
                    d = o.money_link ? o.money_link : "yoomoney" === l ? "https://yoomoney.ru/to/" + o.money + "/" : "tinkoff" === l ? "https://www.tinkoff.ru/cf/" + o.money : "sber" === l ? "https://sber.me/" + o.money : "vtb" === l ? o.money : "paypal" === l ? "https://paypal.me/" + o.money + "/" : "wise" === l ? "https://wise.com/pay/me/" + o.money : "https://yoomoney.ru/to/" + o.money + "/",
                        $(".withMoney").attr("link", d).attr("provider", l)
                }
                if (initWithMoneyDefault(),
                    $(".content .sheet").css("display", "block").css("marginTop", "0px"),
                    $(".sheetview").css("margin-left", "0px", "important").css("margin-top", "0px", "important"),
                    $(".allsheet").css("margin-top", "0px", "important"),
                "QR" == getUrlVar().from && (setTimeout((function() {
                        $("html,body").stop().animate({
                            scrollTop: $("#agree").offset().top - 100
                        }, 1e3)
                    }
                ), 3e3),
                    setTimeout((function() {
                            acceptInvite(1)
                        }
                    ), 4200)),
                1 == getUrlVar().screenshot && "PDF" != getUrlVar().for && getUrlVar().paper && 777 != getUrlVar().paper && 772 != getUrlVar().paper && 771 != getUrlVar().paper && 999 != getUrlVar().paper && 888 != getUrlVar().paper) {
                    51 == getUrlVar().paper || 52 == getUrlVar().paper ? AA = "A4" : AA = "A6";
                    var c = "template/invent/?user=" + getUrlVar().user + "&screenshot=1&for=PDF&paper=" + getUrlVar().paper + "&guest=" + getUrlVar().guest + "&table=" + getUrlVar().table;
                    return $(".content").html('<div class="PDFgen ' + AA + '"><iframe style="border:0px;" width = "100%" height = "100%" src = "' + window.location.origin + "/" + c + '"></iframe></div></div>'),
                        !1
                }
                if ("PDF" == getUrlVar().for && $(".content").addClass("PDFcontainer"),
                2 == getUrlVar().paper) {
                    if ($(".moveBox[type=QR]").css("visibility", "hidden"),
                        guest_id && 0 != guest_id && 1 != guest_id ? (typePaper("name"),
                            makeDearGuest(),
                        $(".sheet#mainInv .back .moveBox[type=QR]:not([delete])").length && (getQR(".sheet#mainInv .back", e, guest_id),
                            $(".moveBox[type=QR]").css("visibility", "visible"))) : typePaper("noname"),
                        $(".sheet").addClass("hide"),
                        $(".sheet#mainInv").removeClass("hide"),
                        $(".sheet#mainInv .front").addClass("hidden"),
                        $(".sheet#mainInv .back").removeClass("hidden").css("transform", "none"),
                        JSON.parse(t.PDFattr)) {
                        var u = JSON.parse(t.PDFattr);
                        "v2" == u.maket ? $("#mainInv .back").addClass("maket_v2") : "v3" == u.maket ? $("#mainInv .back").addClass("maket_v3") : "v4" == u.maket && $("#mainInv .back").addClass("maket_v4")
                    }
                    $("#mainInv .textBox .textLine").each((function(e, t) {
                            var n = $(this).html();
                            "tu" == u.for ? $(this).html(n.replace(/(Вас|Вы|Вам)([.!;\-, ]|$)/g, (function(e, t, n, o) {
                                    return replaceYou(e, "tu")
                                }
                            ))) : $(this).html(n.replace(/(тебя|ты|тебе)([.!;\-, ]|$)/g, (function(e, t, n, o) {
                                    return replaceYou(e, "voce")
                                }
                            )))
                        }
                    ))
                } else if (1 == getUrlVar().paper)
                    $(".sheet").addClass("hide"),
                        $(".sheet#mainInv").removeClass("hide"),
                        $(".sheet#mainInv .back").addClass("hidden"),
                        $(".sheet#mainInv .front").removeClass("hidden").css("transform", "none");
                else if (3 == getUrlVar().paper) {
                    if ($(".sheet").addClass("hide"),
                        !wpInvIsPartyProduct(t))
                        $(".sheet#palitraPaper").removeClass("hide"),
                            v = (v = $(".sheet#palitraPaper").clone()).get(0).outerHTML,
                            $(".allsheet").append(v)
                } else if (30 == getUrlVar().paper) {
                    if ($(".sheet").addClass("hide"),
                        !wpInvIsPartyProduct(t)) {
                        $(".sheet#palitraPaper").removeClass("hide");
                        var v = $(".sheet#palitraPaper").clone()
                    }
                } else if (4 == getUrlVar().paper)
                    $(".sheet").addClass("hide"),
                    wpInvIsPartyProduct(t) || $(".sheet#timetablePaper").removeClass("hide");
                else if (50 == getUrlVar().paper)
                    $(".sheet").addClass("hide"),
                        $(".sheet#envelope").removeClass("hide"),
                        $(".sheet#envelope .front").addClass("hidden"),
                        $(".sheet#envelope .back").removeClass("hidden").css("transform", "none").css("overflow", "initial"),
                        $(".sheet#envelope .sheetview").css("marginTop", "168px");
                else if (5 == getUrlVar().paper)
                    $(".sheet").addClass("hide"),
                        $(".sheet#envelope").removeClass("hide"),
                        $(".sheet#envelope .back").addClass("hidden"),
                        $(".sheet#envelope .front").removeClass("hidden").css("transform", "none");
                else if (51 == getUrlVar().paper) {
                    $(".sheet").addClass("hide"),
                        $(".sheet#envelope").removeClass("hide"),
                        $(".sheet#envelope .back").addClass("hidden"),
                        $(".sheet#envelope .front").removeClass("hidden").css("left", "1.5%").css("top", "172%").addClass("envelope51"),
                        $(".envelope_canvas").css("transform", "rotate(315deg) scale(1.47)"),
                        $(".sheet#envelope .front, .sheet#envelope .plate_box, .sheet#envelope .element6").css("overflow", "initial"),
                        $(".sheet#envelope .front").clone(!0).appendTo(".allsheet").addClass("envelope_A4").removeAttr("style").removeClass("front"),
                        $(".envelope_A4 [elemplace=envelopePattern]").html("<div></div>"),
                        "cover" == $(".envelope_A4 [elemplace=envelopePattern]").css("background-size") ? $(".sheet#envelope .front [elemplace=envelopeBg], .envelope_A4 [elemplace=envelopePattern]").css("background", "none") : $(".sheet#envelope .front [elemplace=envelopeBg], .sheet#envelope .front [elemplace=envelopePattern]").css("background", "none"),
                        $(".allsheet").css("marginTop", "-250px"),
                        $(".envelope_A4").css("background", "none");
                    var m = $(".envelope_A4 [elemplace=envelopeBg]").css("background-image");
                    $(".envelope_A4").css("background-image", m);
                    var p = $(".envelope_A4 [elemplace=envelopeBg]").css("background-size");
                    $(".envelope_A4").css("background-size", p);
                    var h = $(".envelope_A4 [elemplace=envelopeBg]").css("background-color");
                    $(".envelope_A4").css("background-color", h)
                } else if (52 == getUrlVar().paper) {
                    $(".sheet").addClass("hide"),
                        $(".sheet#envelope .front").clone(!0).appendTo(".allsheet").addClass("envelope_A4").removeAttr("style").removeClass("front"),
                        $(".envelope_A4 [elemplace=envelopePattern]").html('<div class="envelope_cutting"></div>');
                    m = $(".sheet#envelope .back [elemplace=envelopeInBg]").css("background-image");
                    $(".envelope_A4 [elemplace=envelopeBg]").css("background-image", m);
                    p = $(".sheet#envelope .back [elemplace=envelopeInBg]").css("background-size");
                    $(".envelope_A4 [elemplace=envelopeBg]").css("background-size", 1.47 * p.slice(0, -2) + "px");
                    h = $(".sheet#envelope .back [elemplace=envelopeInBg]").css("background-color");
                    $(".envelope_A4 [elemplace=envelopeBg]").css("background-color", h);
                    var f = $(".sheet#envelope .back [elemplace=envelopeInPattern]").css("background-image");
                    $(".envelope_A4 [elemplace=envelopePattern]").css("background-image", f);
                    var w = $(".sheet#envelope .back [elemplace=envelopeInPattern]").css("backgroundSize");
                    $(".envelope_A4 [elemplace=envelopePattern]").css("backgroundSize", w),
                        $(".envelope_A4 .envelope_cutting").css("transform", "rotateY(180deg)")
                } else if (777 == getUrlVar().paper)
                    getUrlVar().bg && $("body").css("background", "#" + getUrlVar().bg),
                        $(".sheet").addClass("hide"),
                    $(".allsheet .sheet").length < 2 && (contentHTML = $(".content").html(),
                        $(".content").html('<div class="allsheet" textplace="module_text" style="margin-top: 0px;">' + contentHTML + "</div>"),
                        $(".allsheet .sheet").attr("id", "mainInv")),
                        $("body").css("transform", "scale(0.75)").css("overflow", "hidden"),
                        $(".allsheet").append('<div class="screenshot_wood"></div>'),
                        c = getUrlVar().style_id ? "template/invent/?style_id=" + getUrlVar().style_id + "&screenshot=1&mode=mobile_preview&autoscroll=1" : "backup_view" === getUrlVar().mode && getUrlVar().backup_id ? "template/invent/?user=" + e + "&mode=backup_view&backup_id=" + encodeURIComponent(getUrlVar().backup_id) + "&screenshot=1&autoscroll=1" : "template/invent/?user=" + e + "&screenshot=1&mode=mobile_preview&autoscroll=1",
                        $(".allsheet").prepend('<div class="screenshot_iphone screenshoter"><div class="domain"><strong>' + mydomain + '</strong></div><div class="iFrame" style="-webkit-transform-origin-x: 0;"><div class="brow"></div><iframe style="border:0px;"  width = "100%" height = "100%" src = "' + window.location.origin + "/" + c + '"></iframe></div><div class="secretButton phoneBtn"></div><div class="upButton phoneBtn"></div><div class="downButton phoneBtn"></div></div>'),
                        $(".screenshot_iphone").css("right", "0%"),
                        $(".iFrame").css("-webkit-transform:", "scale(0.95)"),
                    getUrlVar().user && t.domain && $(".screenshot_iphone .domain strong").text(t.domain),
                        $(".sheet#mainInv").removeClass("hide").css("position", "absolute"),
                        $(".sheet#mainInv").addClass("screenshot_mainInv").css("transform", "rotate(0deg)"),
                        $(".sheet#mainInv .front").removeClass("hidden").addClass("screenshoter").css("transform", "rotate(0deg)").css("z-index", 1).addClass("clickTo").attr("to", "/cabinet/constructor/paper"),
                        $(".sheet#mainInv .back").removeClass("hidden").addClass("screenshoter").addClass("screenshot_mainInv").addClass("screenshot_mainInv_back").css("transform", "rotate(0deg)").css("z-index", 0).css("backface-visibility", "inherit").addClass("clickTo").attr("to", "/cabinet/constructor/paper#sheet2"),
                    wpInvIsPartyProduct(t) || ($(".sheet#palitraPaper").removeClass("hide").addClass("screenshoter").addClass("screenshot_palitraPaper").css("transform", "rotate(0deg)").addClass("clickTo").attr("to", "/cabinet/constructor/paper#palitraPaper_control"),
                        $(".sheet#timetablePaper").removeClass("hide").addClass("screenshoter").addClass("screenshot_timetablePaper").css("transform", "rotate(0deg)").addClass("clickTo").attr("to", "/cabinet/constructor/paper#timetablePaper_control")),
                        $(".sheet#envelope .front").removeClass("hidden").css("transform", "rotateY(0deg)"),
                        $(".sheet#envelope").addClass("screenshoter").removeClass("hide").addClass("screenshot_envelope").addClass("clickTo").attr("to", "/cabinet/constructor/paper#envelope_control"),
                    $("*").is(".sheet#envelope [action=envelope_text1]") && (fontSize = $(".sheet#envelope [action=envelope_text1]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text1]").css("fontSize", 1.416 * fontSize)),
                    $("*").is(".sheet#envelope [action=envelope_text2]") && (fontSize = $(".sheet#envelope [action=envelope_text2]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text2]").css("fontSize", 1.416 * fontSize)),
                    $("*").is(".sheet#envelope [action=envelope_text3]") && (fontSize = $(".sheet#envelope [action=envelope_text3]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text3]").css("fontSize", 1.416 * fontSize)),
                        $(".sheet#envelope .back").addClass("hidden"),
                        $(".sheet#mainInv .back .background").prepend("<div class=plate_box></div>"),
                        $(".plate_box").css("background-size", "cover").css("background-position-y", "center").addClass("gradient_shadow"),
                        $("#envelope .plate_box").addClass("gradient_shadow");
                else if (771 == getUrlVar().paper)
                    getUrlVar().bg && $("body").css("background", "#" + getUrlVar().bg),
                        $(".sheet").addClass("hide"),
                        $("body").css("transform", "scale(0.75)").css("overflow", "hidden"),
                        $(".allsheet").append('<div class="screenshot_wood"></div>'),
                        c = getUrlVar().style_id ? "template/invent/?style_id=" + getUrlVar().style_id + "&screenshot=1&mode=mobile_preview&autoscroll=1" : "template/invent/?user=" + e + "&screenshot=1&mode=mobile_preview&autoscroll=1",
                        $(".allsheet").prepend('<div class="screenshot_iphone screenshot_iphone_for_view screenshoter"><div class="domain"><strong>' + mydomain + '</strong></div><div class="iFrame" style="-webkit-transform-origin-x: 0;"><div class="brow"></div><iframe style="border:0px;"  width = "100%" height = "100%" src = "' + window.location.origin + "/" + c + '"></iframe></div><div class="secretButton phoneBtn"></div><div class="upButton phoneBtn"></div><div class="downButton phoneBtn"></div></div>'),
                        $(".iFrame").css("-webkit-transform:", "scale(0.95)");
                else if (772 == getUrlVar().paper)
                    getUrlVar().bg && $("body").css("background", "#" + getUrlVar().bg),
                        $(".sheet").addClass("hide"),
                        $("body").css("transform", "scale(0.75)").css("overflow", "hidden"),
                        $(".allsheet").append('<div class="screenshot_wood"></div>'),
                        $(".sheet#mainInv").removeClass("hide").css("position", "absolute"),
                        $(".sheet#mainInv").addClass("screenshot_mainInv").css("transform", "rotate(0deg)"),
                        $(".sheet#mainInv .front").removeClass("hidden").addClass("screenshoter").css("transform", "rotate(0deg)").css("z-index", 1).addClass("clickTo").attr("to", "/cabinet/constructor/paper"),
                        $(".sheet#mainInv .back").removeClass("hidden").addClass("screenshoter").addClass("screenshot_mainInv").addClass("screenshot_mainInv_back").css("transform", "rotate(0deg)").css("z-index", 0).css("backface-visibility", "inherit").addClass("clickTo").attr("to", "/cabinet/constructor/paper#sheet2"),
                    wpInvIsPartyProduct(t) || ($(".sheet#palitraPaper").removeClass("hide").addClass("screenshoter").addClass("screenshot_palitraPaper").css("transform", "rotate(0deg)").addClass("clickTo").attr("to", "/cabinet/constructor/paper#palitraPaper_control"),
                        $(".sheet#timetablePaper").removeClass("hide").addClass("screenshoter").addClass("screenshot_timetablePaper").css("transform", "rotate(0deg)").addClass("clickTo").attr("to", "/cabinet/constructor/paper#timetablePaper_control")),
                        $(".sheet#envelope .front").removeClass("hidden").css("transform", "rotateY(0deg)"),
                        $(".sheet#envelope").addClass("screenshoter").removeClass("hide").addClass("screenshot_envelope").addClass("clickTo").attr("to", "/cabinet/constructor/paper#envelope_control"),
                    $("*").is(".sheet#envelope [action=envelope_text1]") && (fontSize = $(".sheet#envelope [action=envelope_text1]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text1]").css("fontSize", 1.416 * fontSize)),
                    $("*").is(".sheet#envelope [action=envelope_text2]") && (fontSize = $(".sheet#envelope [action=envelope_text2]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text2]").css("fontSize", 1.416 * fontSize)),
                    $("*").is(".sheet#envelope [action=envelope_text3]") && (fontSize = $(".sheet#envelope [action=envelope_text3]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text3]").css("fontSize", 1.416 * fontSize)),
                        $(".sheet#envelope .back").addClass("hidden"),
                        $(".sheet#mainInv .back .background").prepend("<div class=plate_box></div>"),
                        $(".plate_box").css("background-size", "cover").css("background-position-y", "center").addClass("gradient_shadow"),
                        $("#envelope .plate_box").addClass("gradient_shadow");
                else if (999 == getUrlVar().paper) {
                    if ($(".sheet").addClass("hide"),
                    $(".allsheet .sheet").length < 2 && (contentHTML = $(".content").html(),
                        $(".content").html('<div class="allsheet" textplace="module_text" style="margin-top: 0px;">' + contentHTML + "</div>"),
                        $(".allsheet .sheet").attr("id", "mainInv")),
                    $(".allsheet .sheet").length < 7 && $(".allsheet").html('<a to="/cabinet/constructor/paper/#seatingCard_control" class="clickTo getTableCardonFinish">Сгенерируйте комплекты карточек для банкета, перейдя на страницу конструктора.<br><a>Перейти в конструктор</a></a>'),
                        $("body").css("transform", "scale(0.75)").css("overflow", "hidden"),
                        $(".allsheet").append('<div class="screenshot_seating"></div><div class="clips_seating"></div><div class="spoon_seating"></div>'),
                        !wpInvIsPartyProduct(t)) {
                        $(".sheet#tableCard").removeClass("hide").addClass("screenshoter").addClass("screenshot_tableCard").css("transform", "rotate(2deg) scale(0.8)").addClass("clickTo").attr("to", "/cabinet/constructor/paper#tableCard_control"),
                            $(".sheet#seatingCard").removeClass("hide").addClass("screenshoter").addClass("screenshot_seatingCard").css("transform", "rotate(2deg) scale(0.9)").addClass("clickTo").attr("to", "/cabinet/constructor/paper#seatingCard_control"),
                            $(".sheet#seatingPlan").removeClass("hide").addClass("screenshoter").addClass("screenshot_seatingPlan").css("transform", "rotate(2deg) scale(0.96)").css("right", "0px").addClass("clickTo").attr("to", "/cabinet/constructor/paper#seatingPlan_control"),
                        1 == getUrlVar().iframe && ($(".sheet#seatingPlan").css("right", "0px"),
                            $(".sheet#seatingCard").css("left", "161px"));
                        var g = $(".sheet#seatingCard .textLine[action=guest_name]");
                        g.length ? g.text("Иванов Иван") : $(".sheet#seatingCard .textLine").first().text("Иванов Иван"),
                            $(".sheet#seatingPlan [action=seatingplan_text]").text("Иванов Иван<br>Иванов Сергей<br>Сергеева Ольга<br>Романов Мирон<br>Миронова Анна<br>Антонов Семен<br>")
                    }
                    $(".plate_box").css("background-size", "cover").css("background-position-y", "center"),
                        $("#seatingCard .plate_box, #tableCard .plate_box").addClass("gradient_shadow")
                } else if (9 == getUrlVar().paper) {
                    if ($("body").css("background", "none"),
                        $(".sheet").addClass("hide"),
                        !wpInvIsPartyProduct(t)) {
                        $(".sheet#seatingPlan").removeClass("hide"),
                            $(".sheet#seatingPlan .sheetview").css("margin-top", "0px"),
                            getUrlVar().table ? tbl = getUrlVar().table : tbl = 1,
                            $(".element_plan [action=seatingplan_number]").text(tbl),
                            $(".element_plan").css("top", "2%");
                        var y = getUrlVar();
                        if (y && "1" == y.preview_canvas) {
                            $(".sheet#seatingPlan").attr("data-pc-applied") || ($(".sheet#seatingPlan [action=seatingplan_text]").not(".Block2").first().html(""),
                                $(".sheet#seatingPlan [action=seatingplan_text].Block2").remove());
                            try {
                                window.parent && window.parent !== window && window.parent.postMessage({
                                    type: "wpSeatingPreviewReady"
                                }, "*")
                            } catch (e) {}
                        } else
                            $(".sheet#seatingPlan [action=seatingplan_text]").text("Иванов Иван<br>Иванов Сергей<br>Сергеева Ольга<br>Романов Мирон<br>Миронова Анна<br>Антонов Семен<br>"),
                                $.ajax({
                                    url: "template/invent/userinvent.php",
                                    data: {
                                        Action: "seatingPlan",
                                        table: tbl,
                                        user: e
                                    },
                                    type: "post",
                                    dataType: "text",
                                    success: function(e) {
                                        blocks = wpInvParseJsonMaybe(e),
                                            blocks = wpInvSeatingBlocksFromGuests(blocks),
                                            $.each(blocks, (function(e, t) {
                                                    "block1" == e ? $("#seatingPlan [action=seatingplan_text]").html(nl2br(t)) : "block2" == e && "" != t && ($("#seatingPlan [action=seatingplan_text]").clone(!0).addClass("Block2").html(nl2br(t)).appendTo($("#seatingPlan [action=seatingplan_text]").parent()),
                                                        $("#seatingPlan [action=seatingplan_text]").parent().addClass("plan2block"))
                                                }
                                            ))
                                    }
                                })
                    }
                } else if (95 == getUrlVar().paper) {
                    if ($("body").css("background", "none"),
                        $(".sheet").addClass("hide"),
                        !wpInvIsPartyProduct(t)) {
                        $(".sheet#seatingPlan").removeClass("hide"),
                            $(".sheet#seatingPlan .sheetview").css("margin-top", "0px");
                        var b = $(".element_plan [action=seatingplan_number]")[0]
                            , _ = b ? parseFloat(window.getComputedStyle(b).lineHeight) : null;
                        $(".element_plan [action=seatingplan_number]").text("Банкетный"),
                            wpFitTextToEl(b, 8),
                        b && _ && !isNaN(_) && (b.style.lineHeight = _ + "px"),
                            $(".element_plan [action=seatingplan_title]").text("навигатор"),
                            $(".element_plan").css("top", "2%");
                        var S = "https://wdpst.ru/" + e + "?from=banket_navigation";
                        $("#seatingPlan [action=seatingplan_text]").html('<div class="bnav-qr-wrap"><div class="backQR" style="background:#ffffff; width:120px; height:120px; border-radius:10px; background-size:cover; background-repeat:no-repeat; background-position:center; margin:0 auto 8px; display:block;"><div class="frontQR" style="background:#000000;"></div></div><div class="bnav-qr-hint">Узнай свой стол — просто отсканируй этот QR-код</div></div>'),
                            getQR("#seatingPlan [action=seatingplan_text]", e, e, S)
                    }
                } else if (91 == getUrlVar().paper) {
                    var x = $("#seatingCard .textLine[action=guest_name]");
                    x.length ? x.html(nl2br(t.guest_name)) : $("#seatingCard .textLine").first().html(nl2br(t.guest_name)),
                        $("body").css("background", "none"),
                        $(".sheet").addClass("hide"),
                        $(".sheet#seatingCard").removeClass("hide").css("border-bottom", "1px solid #ccc").css("border-top", "1px solid #ccc"),
                        $(".sheet#seatingCard .sheetview").css("margin-top", "0px");
                    var C = $(".sheet#seatingCard");
                    if (C.length) {
                        var A = (v = C.clone().addClass("oborot")).get(0);
                        A && $(".allsheet").prepend(A.outerHTML)
                    }
                    $(".oborot").css("transform", "rotate(180deg)").css("border", "0px solid #ccc");
                    var k = $(".oborot .textLine[action=guest_name]");
                    k.length || (k = $(".oborot .textLine").first()),
                    (T = k.get(0)) && T.style && T.style.top && k.css("top", parseFloat(T.style.top.slice(0, -1)) - 1 + 9 + "%")
                } else if (92 == getUrlVar().paper)
                    $("body").css("background", "#fff"),
                        $(".sheet").addClass("hide"),
                        $(".sheet#timetablePaper").removeClass("hide").html('<div style="-webkit-transform-origin-x: 0; -webkit-transform: scale(1.00); height:100%; width:100%"><iframe style="border:0px;"  width = "100%" height = "100%" src = "' + window.location.origin + "/template/invent/?user=" + e + "&screenshot=1&opros_result=1&guest=" + guest_id + '&print=1"></iframe></div>');
                else if (93 == getUrlVar().paper) {
                    $("body").css("background", "none"),
                        $(".sheet").addClass("hide"),
                        getUrlVar().table ? tbl = getUrlVar().table : tbl = 1,
                        $(".element_tcard [action=tablecard_number]").text(tbl),
                        $(".element_tcard").css("top", "2%"),
                        $(".sheet#tableCard").removeClass("hide"),
                        $(".sheet#tableCard .sheetview").css("margin-top", "0px");
                    var T, L = $(".sheet#tableCard");
                    if (L.length)
                        (T = (v = L.clone().addClass("oborot")).get(0)) && $(".allsheet").prepend(T.outerHTML);
                    $(".oborot").css("transform", "scale(1.0) rotate(180deg)").css("border", "0px solid #ccc");
                    var H = $(".oborot h2").get(0);
                    H && H.style && H.style.top && $(".oborot h2").css("top", parseFloat(H.style.top.slice(0, -1)) - 1 + 9 + "%")
                } else
                    6 == getUrlVar().paper ? ($("body").css("background", "none"),
                        $(".sheet").addClass("hide"),
                        $(".dazzle").css("height", "0%"),
                        $(".allsheet").prepend('<div class="screenshot_iphone_only"><div class="iFrame" style="-webkit-transform-origin-x: 0;"><iframe style="border:0px;" scrolling="no"  width = "408px" height = "723px" src = "' + window.location.origin + "/template/invent/?user=" + e + '&screenshot=1"></iframe></div></div>')) : 888 == getUrlVar().paper && ($(".sheet").addClass("hide"),
                        $("body").css("background", "none"),
                        $("body").css("transform", "scale(0.9)").css("overflow", "hidden"),
                        $(".dazzle").css("height", "0%"),
                        $(".allsheet").append('<div class="screenshot_wood"></div>'),
                    1 == getUrlVar().wood && $(".screenshot_wood").css("background-image", "url(/src/img/finish_fon.jpg)"),
                        $(".allsheet").prepend('<div class="screenshot_iphone screenshoter"><div class="domain"><strong>' + mydomain + '</strong></div><div class="iFrame" style="-webkit-transform-origin-x: 0;"><div class="brow"></div><iframe style="border:0px;"  width = "100%" height = "100%" src = "' + window.location.origin + "/" + c + '"></iframe></div><div class="secretButton phoneBtn"></div><div class="upButton phoneBtn"></div><div class="downButton phoneBtn"></div></div>'),
                        $(".screenshot_iphone").css("-webkit-transform", "rotate(0deg) scale(0.9)"),
                        $(".sheet#mainInv").removeClass("hide").css("position", "absolute"),
                        $(".sheet#mainInv").addClass("screenshot_mainInv").css("transform", "rotate(1deg)"),
                        $(".sheet#mainInv .front").removeClass("hidden").addClass("screenshoter").css("transform", "rotate(0deg)").css("z-index", 1),
                        $(".sheet#mainInv .back").removeClass("hidden").addClass("screenshoter").addClass("screenshot_mainInv").addClass("screenshot_mainInv_back").css("transform", "rotate(7deg)").css("z-index", 0).css("backface-visibility", "inherit"),
                        $(".sheet#palitraPaper").removeClass("hide").addClass("screenshoter").addClass("screenshot_palitraPaper").css("transform", "rotate(4deg)"),
                        $(".sheet#timetablePaper").removeClass("hide").addClass("screenshoter").addClass("screenshot_timetablePaper").css("transform", "rotate(-4deg)"),
                        $(".sheet#envelope .front").removeClass("hidden").css("transform", "rotate(0deg)"),
                        $(".sheet#envelope").addClass("screenshoter").removeClass("hide").addClass("screenshot_envelope").css("width", "518px").css("height", "365px").css("transform", "rotate(0deg)"),
                        fontSize = $(".sheet#envelope [action=envelope_text1]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text1]").css("fontSize", 1.416 * fontSize),
                        fontSize = $(".sheet#envelope [action=envelope_text2]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text2]").css("fontSize", 1.416 * fontSize),
                        fontSize = $(".sheet#envelope [action=envelope_text3]").css("fontSize").slice(0, -2),
                        $(".sheet#envelope [action=envelope_text3]").css("fontSize", 1.416 * fontSize),
                        $(".sheet#envelope .back").addClass("hidden"),
                        $(".sheet#mainInv .back .background").prepend("<div class=plate_box></div>"),
                        $(".plate_box").css("background-size", "cover").css("background-position-y", "center"),
                        $("#envelope .plate_box").addClass("gradient_shadow"));
                if (getUrlVar().opros_result || getUrlVar().show_comment || "electro" !== n || window.self !== window.top || document.body.setAttribute("type", "instant_electro"),
                    $(".content").html($(".content #screen").html()),
                window.initMymainAnim && window.initMymainAnim({
                    restart: !1
                }),
                    initMymainScrollHint(),
                    initInventMobBack(),
                    applyBanketScreenMode(),
                getUrlVar().paper || $(".content").css("overflow", "hidden"),
                getUrlVar().style_id || t.pay_id || getUrlVar().screenshot && 0 != getUrlVar().screenshot)
                    I = 0;
                else {
                    $(".dazzle").css("height", "100vh");
                    var I = 1
                }
                if (t.pay_id && ($.cookie("user_type", "buyer", {
                    path: "/"
                }),
                    $(".dazzle").css("height", "0%")),
                    $(".atc_event").addClass("hide"),
                    $(".atcb-list").addClass("hide"),
                    getUrlVar().opros_result) {
                    var P = $("#opros").clone();
                    P = P.get(0).outerHTML,
                        $(".content").addClass("oprosPage").html(P),
                        $("#opros").fadeIn(),
                        $(".alert-warning").addClass("hide"),
                        $(".header_opros").removeClass("hide"),
                        $(".goSummary a").attr("href", "?user=" + e + "&opros_result=1"),
                        $("#opros").css("max-width", "1128px"),
                        $(".hideFromBuild").first().after('<div class="commentYes" style="max-width: 1128px; margin: 20px;"><b>Опрос выключен в конструкторе</b><br> Чтобы гости могли проходить опрос <a style="text-decoration: underline;" href="/cabinet/constructor/electro/">перейдите в конструктор</a> и включите модуль Опрос.</div>'),
                        $.ajax({
                            url: "template/invent/userinvent.php",
                            data: {
                                Action: "getResultOpros",
                                guest: guest_id,
                                user: e
                            },
                            type: "post",
                            success: function(t) {
                                (t = JSON.parse(t)).prev_guest && $(".goLeft a").attr("href", "?user=" + e + "&opros_result=1&guest=" + t.prev_guest.id),
                                t.next_guest && $(".goRight a").attr("href", "?user=" + e + "&opros_result=1&guest=" + t.next_guest.id),
                                guest_id || $.each(t.opros, (function(e, t) {
                                        0 == t.count ? isgrey = "grey" : isgrey = "",
                                            0 == t.percent ? isnone = "hide" : isnone = "",
                                            $("#weddingOpros [for=" + e + "]").append(' <div class="point ' + isgrey + '">' + t.count + '</div><div class="per ' + isnone + '">' + t.percent + "%</div>")
                                    }
                                ))
                            }
                        })
                }
                if (getUrlVar().show_comment) {
                    var E = $(".commentYes").removeClass("hide").clone();
                    return E = E.get(0).outerHTML,
                        $(".content").html(E),
                        $(".editComment").remove(),
                    "" == $(".commentFromGuest span").text() && $(".commentFromGuest span").text("Комментария от гостя пока нет"),
                        $(".commentYes .time").text(""),
                        $(".commentYes").css("max-width", "1128px").css("margin", "20px"),
                    $(".andGift").hasClass("hide") || $(".content").append('<div class="disclamer"><div class=icon><i class="fa fa-question-circle"></i></div>Обратите внимание, что денежная транзакция проводится ЮМани (ex Яндекс.Деньгами) (ПАО Сбербанк), поэтому мы ничего не знаем об его успешности и завершенности, а лишь отображаем выбор гостя, который планировал перевод.</div>'),
                        !1
                }
                if (t.palitra || I || $("#palitra").addClass("hide"),
                t.eorder && ($(".content [hideOrder]").removeClass("hide"),
                    $(".content [hideOrder*=" + t.eorder + "]").addClass("hide")),
                getUrlVar().opros_result || ("eAllSMSOrder" == t.eorder || "eAllOrder" == t.eorder ? $("#opros").remove() : $("#opros").css("display", "none")),
                    syncGuestCommentPlacement(),
                    window.wpStylePreviewForceGuestUi ? applyStylePreviewForceGuestUi() : initWithMoneyDefault(),
                    $("#map").html(""),
                    $(".module").css("border", "0px solid #fff"),
                    $(".hoverborder").css("border", "0px solid rgba(0, 0, 0, 0)"),
                getUrlVar().admin || $("palitra_text, text_opros, btn_agree, comment, wedding_timetable").removeAttr("contenteditable"),
                    $(".textLine").each((function(e, t) {
                            $(this).removeAttr("contenteditable"),
                                str = $(this).html(),
                                str = str.replace(/&gt;/g, ">"),
                                str = str.replace(/&lt;/g, "<"),
                                str = makeHotwords(str, o),
                                str = makeSexWords(str, o.sex),
                                $(this).html(str)
                        }
                    )),
                    $(".calendarMonth, .calendarWeekday").removeAttr("contenteditable"),
                t.guest_agree && ($(".guestAgree[answer=1]").addClass("hide"),
                    $(".iAgree").removeClass("hide"),
                    $(".cancelLink").removeClass("hide"),
                    $(".acceptLink").addClass("hide"),
                    1 == $(".guestAgree[answer=1]").attr("data-opros") ? showOprosGuestAnim() : syncGuestCommentPlacement()),
                t.guest_opros && (answer = t.guest_opros.split(", "),
                    $.each(answer, (function(e, t) {
                            $("label[for=" + t + "] i").addClass("fa-check-circle").removeClass("fa-circle-o"),
                                $("input[id=" + t + "]").attr("checked", "checked")
                        }
                    ))),
                    getUrlVar().print)
                    if (t.guest_opros) {
                        var M = $(".header_opros .name b").text();
                        $(".header_opros").remove(),
                            $("#screen #opros").css("background", "#fff"),
                            $("#screen").css("background", "#fff"),
                            $("#opros #weddingOpros [name=question], #opros #weddingOpros [name=variants]").css("color", "#000"),
                            $("#opros #weddingOpros .fa-check-circle").parent().addClass("noHide"),
                            $("#opros #weddingOpros [action=varianttxt] label:not(.noHide)").remove(),
                            $("#opros #weddingOpros").attr("style", "transform: scale(0.6); width: 170%; margin-left: -35%; margin-top: -26%; line-height: 0.6;"),
                            $("body").css("background", "#fff"),
                            $("#opros #weddingOpros").prepend('<b style="color:#888"><i style="font-weight: normal; text-align: right; display: block; color: #ccc">Создано на weddingpost.ru</i>Ответы на опрос<h3 style="color:#000">' + M + "</h3></b>")
                    } else
                        $("#screen").html("");
                if (JSON.parse(t.userdata).timing.city && (addr = JSON.parse(t.userdata).timing.city + " " + JSON.parse(t.userdata).timing.address),
                JSON.parse(t.userdata).timing.coord_x && JSON.parse(t.userdata).timing.coord_y && "underfined" != JSON.parse(t.userdata).timing.coord_y && "underfined" != JSON.parse(t.userdata).timing.coord_x && (user_coord = JSON.parse(t.userdata).timing.coord_x + "," + JSON.parse(t.userdata).timing.coord_y),
                    JSON.parse(t.userdata).timing.date) {
                    var B = JSON.parse(t.userdata);
                    window._ttGuestWeddingDate = B.timing.date;
                    var F = B.timing.datecheck;
                    if ("electro" === n && (void 0 !== window.wpInventCountdownSimulate && window.wpInventCountdownSimulate || "simulate" === getUrlVar().mode)) {
                        var W = $(".countdown");
                        if (void 0 !== W.data("countdown-instance"))
                            try {
                                W.countdown("remove")
                            } catch (e) {}
                        W.off("finish.countdown").removeClass("wednow").removeClass("wedyet");
                        var R = $(".count.weddatecontent").html()
                            , O = new Date(Date.now() + 5e3);
                        W.countdown(O, (function(e) {
                                $(this).html(e.strftime(R))
                            }
                        )).on("finish.countdown", (function() {
                                $(".weddatecontent").addClass("hide"),
                                    $(this).removeClass("wedyet").addClass("wednow").html($(".now.weddatecontent").html()),
                                "function" == typeof wpFireWeddingConfetti && wpFireWeddingConfetti()
                            }
                        ))
                    } else if ("wednow" == F)
                        $(".weddatecontent").addClass("hide"),
                            $(".countdown").removeClass("wedyet").addClass("wednow").html($(".now.weddatecontent").html());
                    else if (F)
                        $(".weddatecontent").addClass("hide"),
                            $(".yet.weddatecontent b strong").text(Math.round(F)),
                            $(".countdown").removeClass("wednow").addClass("wedyet").html($(".yet.weddatecontent").html());
                    else {
                        var G = JSON.parse(t.userdata)
                            , q = G.timing.date;
                        $(".weddingdate").html(q);
                        var D = G.timing.time || ""
                            , V = G.timing && G.timing.timezone ? String(G.timing.timezone).trim() : ""
                            , z = window.wpCountdownTarget(q, D, V)
                            , N = $(".count.weddatecontent").html();
                        $(".countdown").countdown(z, (function(e) {
                                $(this).html(e.strftime(N))
                            }
                        )).on("finish.countdown", (function() {
                                $(".weddatecontent").addClass("hide"),
                                    $(this).removeClass("wedyet").addClass("wednow").html($(".now.weddatecontent").html()),
                                "function" == typeof wpFireWeddingConfetti && wpFireWeddingConfetti()
                            }
                        ))
                    }
                }
                !getUrlVar().screenshot && window.WPCalendar && window.WPCalendar.bind($(".addtocalendar a"), {
                    user_id: e,
                    guest_id: guest_id
                }),
                "electro" !== n || $(".content").hasClass("hide") || window.initGuestBelowMymainAnimations && window.initGuestBelowMymainAnimations(),
            _completeFn();
    }
}
function buildMoneyGiftLink(e, t, n) {
    var o = e || ""
        , r = n || "";
    return o ? -1 !== o.indexOf("{amount}") ? o.replace("{amount}", r) : "yoomoney" === t ? o + r : o : ""
}
function getMoneyLink() {
    var e = $(".moneyList a.active").attr("val") || "";
    return buildMoneyGiftLink($(".withMoney").attr("link") || "", $(".withMoney").attr("provider") || "yoomoney", e)
}
function applyMoneyLink() {
    if (!$(".withMoney").hasClass("stopSendMoney")) {
        var e = getMoneyLink();
        e && $(".sendComment").attr("href", e).attr("target", "_blank")
    }
}
function showMoneyBox() {
    $("input[name=withMoney]").prop("checked", !0),
        $(".moneyBox").removeClass("hide"),
        applyMoneyLink()
}
function hideMoneyBox() {
    $(".moneyBox").addClass("hide"),
        $(".sendComment").removeAttr("href").removeAttr("target")
}
function mapsInit() {
    if (!document.querySelector(".content.hide")) {
        var e = document.querySelector('.customLine[customname="map"]');
        if (e) {
            var t = e.querySelector('.module[module="map"]');
            if (t) {
                var n = usercontent && usercontent.timing && usercontent.timing.map ? usercontent.timing.map : function() {
                    try {
                        return localStorage.getItem("user_map_preference") || "yandex"
                    } catch (e) {
                        return "yandex"
                    }
                }()
                    , o = "google" === n ? "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9YPp6l-auQHb7gwG1yNQq0FRfrBh-ud4" : "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=f7393900-ecea-41b7-9e99-f3573c484280";
                if ("google" === n && "undefined" != typeof google && google.maps && "function" == typeof google.maps.Map)
                    initMapByProvider(n, t);
                else if ("google" === n || "undefined" == typeof ymaps) {
                    var r = document.createElement("script");
                    r.src = o,
                        r.onload = function() {
                            initMapByProvider(n, t)
                        }
                        ,
                        document.head.appendChild(r)
                } else
                    initMapByProvider(n, t)
            }
        }
    }
}
function initMapByProvider(e, t) {
    var n = t.closest('.customLine[customname="map"]') || t
        , o = document.getElementById("gmap");
    o || ((o = document.createElement("div")).id = "gmap",
        o.setAttribute("module", "gmap"),
        o.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;display:none;z-index:6000;",
        t.parentNode.insertBefore(o, t.nextSibling));
    var r = t.parentNode;
    if (r && "static" === getComputedStyle(r).position && (r.style.position = "relative"),
        o.style.width = "100%",
        o.style.height = "100%",
    "google" === e) {
        if (t.style.visibility = "hidden",
            t.style.opacity = "0",
            t.style.pointerEvents = "none",
            t.style.display = "block",
            o.style.position = "absolute",
            o.style.top = "0",
            o.style.left = "0",
            o.style.zIndex = "6000",
            o.style.pointerEvents = "auto",
            o.style.display = "block",
            user_coord) {
            var i = {
                lat: +user_coord.split(",")[0],
                lng: +user_coord.split(",")[1]
            }
                , a = new google.maps.Map(o,{
                zoom: 16,
                center: i,
                mapTypeControl: !1,
                streetViewControl: !1,
                fullscreenControl: !1,
                scaleControl: !1,
                rotateControl: !1,
                zoomControl: !0,
                gestureHandling: "cooperative"
            })
                , s = new google.maps.Marker({
                position: i,
                map: a
            });
            a.setCenter(s.getPosition())
        } else {
            var l = "55.753994,37.622093".split(",").map(Number)
                , d = {
                lat: l[0],
                lng: l[1]
            };
            new google.maps.Map(o,{
                zoom: 4,
                center: d,
                mapTypeControl: !1,
                streetViewControl: !1,
                fullscreenControl: !1,
                scaleControl: !1,
                rotateControl: !1,
                zoomControl: !0,
                gestureHandling: "cooperative"
            })
        }
        window._guestObserveEntranceAnim && !n.dataset.mapEntranceObserved && (n.dataset.mapEntranceObserved = "1",
            window._guestObserveEntranceAnim(n, "photo", {
                observeEl: t,
                reveal: "bottom"
            }))
    } else
        o.style.display = "none",
            t.style.visibility = "",
            t.style.opacity = "",
            t.style.pointerEvents = "",
            ymaps.ready((function() {
                    var e = new ymaps.Map("map",{
                        center: "55.753994,37.622093".split(",").map(Number),
                        zoom: 4
                    });
                    if (e.behaviors.disable("scrollZoom"),
                        e.behaviors.enable("multiTouch"),
                        e.geoObjects.events.add("click", (function(e) {
                                e.preventDefault()
                            }
                        )),
                        user_coord) {
                        var o = user_coord.split(",")
                            , r = new ymaps.Placemark([o[0], o[1]]);
                        e.geoObjects.add(r),
                            e.setCenter([o[0], o[1]], 16),
                            e.behaviors.disable("scrollZoom")
                    }
                    $(window).width() < 750 && (e.behaviors.disable("drag"),
                        e.behaviors.disable("scrollZoom")),
                    window._guestObserveEntranceAnim && !n.dataset.mapEntranceObserved && (n.dataset.mapEntranceObserved = "1",
                        window._guestObserveEntranceAnim(n, "photo", {
                            observeEl: t,
                            reveal: "bottom"
                        }))
                }
            ))
}
function resetGuestBelowMymainAnimElements() {
    var e = document.querySelector(".content") || document.body;
    if (e) {
        e.querySelectorAll(".block:not(#mymain) .textBox .textLine, #screen .block:not(#mymain) .textBox .textLine").forEach((function(e) {
                e.closest("#myinv") || e.closest(".element_tt") || (delete e.dataset.scrollAnimDone,
                    e.style.animation = "",
                    e.style.opacity = "")
            }
        )),
            e.querySelectorAll('[data-guest-module-anim-done="1"]').forEach((function(e) {
                    delete e.dataset.guestModuleAnimDone,
                        e.style.animation = "",
                        e.style.opacity = ""
                }
            ));
        var t = e.querySelector('.customLine[customname="map"]');
        t && delete t.dataset.mapEntranceObserved,
            e.querySelectorAll('#myinv .textBox .textLine, #myinv [textplace="back_text"] .textLine').forEach((function(e) {
                    delete e.dataset.myinvRevealDone,
                        e.classList.remove("myinv-revealed", "myinv-reveal-pending", "myinv-reveal--text", "myinv-reveal--img"),
                        e.style.animationDelay = "",
                        e.style.opacity = ""
                }
            ))
    }
}
$(document).ready((function() {
        setViewportScale(),
            $("#screen").on("click", ".acceptLink", (function(e) {
                    e.preventDefault();
                    var t = $(".guestAgree[answer=1]").first();
                    return t.length && acceptInvite(t.attr("answer")),
                        !1
                }
            )),
            $("#screen").on("click", ".cancelLink", (function(e) {
                    return e.preventDefault(),
                        acceptInvite(0),
                        !1
                }
            )),
            $("#screen").on("click", ".dropdownMenubox [module*=comment]", (function() {
                    return $(".addComment").click(),
                        !0
                }
            )),
            $("#screen").on("click", ".addComment", (function() {
                    openGuestCommentForm()
                }
            )),
            $("#screen").on("input keyup paste", ".commentBox textarea", (function() {
                    (this.value || "").trim().length && $(this).removeClass("errorInput1px"),
                        autoTextarea(this, 2)
                }
            )),
            $("#screen").on("click", ".sendComment", (function() {
                    var e = $(".commentBox textarea").val();
                    if (e) {
                        var t = $(".moneyBox:not(.hide) a span").text()
                            , n = 0;
                        $(".moneyBox").hasClass("hide") || (n = $(".moneyList a.oneMoney.active").attr("val"));
                        var o = {
                            money: n,
                            moneyText: t,
                            text: e,
                            time: new Date
                        };
                        if (!guest_id) {
                            var r = {};
                            if (document.querySelector("auto_guest_msg")) {
                                r.guestNameText = document.querySelector("auto_guest_msg autoguest_name").textContent,
                                    r.emptyNameText = document.querySelector("auto_guest_msg autoguest_empty_name").textContent,
                                    r.needFullNameText = document.querySelector("auto_guest_msg autoguest_need_fullname").textContent,
                                    r.phoneText = document.querySelector("auto_guest_msg autoguest_phone").textContent,
                                    r.invalidPhoneText = document.querySelector("auto_guest_msg autoguest_invalid_phone").textContent,
                                    r.redirectText = document.querySelector("auto_guest_msg autoguest_redirect").textContent;
                                var i = "undefined" != typeof window && window.wpAutoGuestLabels || {};
                                r.firstNameLabel = wpAutoGuestTagText("autoguest_label_first") || i.first || "Имя",
                                    r.lastNameLabel = wpAutoGuestTagText("autoguest_label_last") || i.last || "Фамилия",
                                    r.emptyLastNameText = wpAutoGuestTagText("autoguest_empty_lastname") || "Введите свою фамилию"
                            } else {
                                r.guestNameText = "Подтверждение приглашения",
                                    r.emptyNameText = "Введите свое имя",
                                    r.needFullNameText = "Необходимо указать вашу фамилию и имя",
                                    r.phoneText = "Введите ваш номер телефона:",
                                    r.invalidPhoneText = "Введите корректный номер телефона",
                                    r.redirectText = "{Name}, перенаправляем на персональную страницу приглашения";
                                var a = "undefined" != typeof window && window.wpAutoGuestLabels || {};
                                r.firstNameLabel = a.first || "Имя",
                                    r.lastNameLabel = a.last || "Фамилия",
                                    r.emptyLastNameText = "Введите свою фамилию"
                            }
                            return void openAutoGuestModal(r, (function(e, t) {
                                    e && $.ajax({
                                        url: "template/invent/userinvent.php",
                                        data: {
                                            Action: "autoGuestSave",
                                            user_id: user_id,
                                            electro: 1,
                                            paper: 0,
                                            user_phone: t,
                                            user_name: e
                                        },
                                        type: "post",
                                        success: function(e) {
                                            e ? $.ajax({
                                                url: "template/invent/userinvent.php",
                                                data: {
                                                    Action: "saveComment",
                                                    guest: e,
                                                    comment: JSON.stringify(o)
                                                },
                                                type: "post",
                                                success: function() {
                                                    var t;
                                                    t = window.location.href.includes("/template/invent/?user=") ? window.location.href + "&guest=" + e + "&from=QR" : window.location.href.replace(/\?\d+$/, "") + "/" + e + "?from=QR",
                                                        window.location.href = t
                                                }
                                            }) : toastr.error("Сообщение отправляется на персональных страницах приглашений гостей")
                                        }
                                    })
                                }
                            ), (function() {}
                            ))
                        }
                        $.ajax({
                            url: "template/invent/userinvent.php",
                            data: {
                                Action: "saveComment",
                                guest: guest_id,
                                comment: JSON.stringify(o)
                            },
                            type: "post",
                            success: function(n) {
                                var o = $("[var=guest]").text();
                                toastr.success("Спасибо, ваш ответ сохранен"),
                                    showComment(o, e, t)
                            }
                        })
                    } else
                        $(".commentBox textarea").addClass("errorInput1px")
                }
            )),
            $("#screen").on("click", ".editComment", (function() {
                    $(".commentBox").removeClass("hide"),
                        $(".commentYes").addClass("hide"),
                        $(".commentBox textarea").val(br2nl($(".commentYes .commentFromGuest span").html())).change().keyup();
                    var e = $(".andGift div").text();
                    $(".selectedMoney span").text(e);
                    var t = e.replace(/[^\d]/g, "");
                    $(".moneyList .oneMoney").removeClass("active"),
                        $(".moneyList .oneMoney[val=" + t + "]").addClass("active"),
                        $(".withMoney").addClass("stopSendMoney"),
                    $(".commentYes .andGift").hasClass("hide") || $("input[name=withMoney]").prop("checked") || ($("input[name=withMoney]").prop("checked", !0),
                        $(".moneyBox").removeClass("hide"))
                }
            )),
            window.initWithMoneyDefault = function() {
                syncGuestCommentPlacement(),
                $("input[name=withMoney]").length && $(".commentBox").length && $(".commentYes .andGift").hasClass("hide") && showMoneyBox()
            }
            ,
            $("#screen").on("click", ".moneyList a.oneMoney", (function() {
                    $(".moneyList a").removeClass("active"),
                        $(this).addClass("active"),
                        $(this).closest(".moneyBox").find(".selectedMoney span").text($(this).text()),
                        $(".withMoney").removeClass("stopSendMoney"),
                        applyMoneyLink()
                }
            )),
            $("#screen").on("click", ".menuNav", (function() {
                    $(".dropdownMenubox").toggleClass("hide"),
                        $(".menuNav > .menuNavIcon").toggleClass("fa-bars"),
                        $(".menuNav > .menuNavIcon").toggleClass("fa-close")
                }
            )),
            $("#screen").on("change", "input[name=withMoney]", (function() {
                    $(this).is(":checked") ? ($(".moneyBox").removeClass("hide"),
                        applyMoneyLink()) : hideMoneyBox()
                }
            )),
            $("body").on("click", '[href*="#"]', (function(e) {
                    $("html,body").stop().animate({
                        scrollTop: $(this.hash).offset().top - 60
                    }, 1e3),
                        e.preventDefault()
                }
            )),
            $("#screen").on("click", ".form-check-input", (function() {
                    if (guest_id && !getUrlVar().opros_result) {
                        opros = $(this).parent("div").parent("div").parent("div").attr("data-opros"),
                            idi = $(this).attr("id"),
                            $(this).prop("checked") ? $("label[for=" + idi + "] i").addClass("fa-check-circle").removeClass("fa-circle-o") : $("label[for=" + idi + "] i").removeClass("fa-check-circle").addClass("fa-circle-o");
                        var e = "";
                        $(".opros div div label").children("i.fa-check-circle").each((function(t, n) {
                                quest = $(n).parent("label").attr("for"),
                                    e = e ? e + ", " + quest : e = quest
                            }
                        )),
                            $.ajax({
                                url: "template/invent/userinvent.php",
                                data: {
                                    Action: "guestOpros",
                                    guest: guest_id,
                                    content: e
                                },
                                type: "post",
                                success: function(e) {
                                    guest = $("[var=guest]").text(),
                                        313 == user_id ? toastr.success("Спасибо, ваш ответ сохранен и отправлен Ярославу и родителям") : toastr.success("Спасибо, ваш ответ сохранен и отправлен организатору")
                                }
                            })
                    } else
                        toastr.info("Ответы опроса выбираются и сохраняются только на персонализированной странице гостя")
                }
            ));
        var e = getUrlVar().paper;
        getInvs(user_id, guest_id, e ? "paper" : "electro"),
            $("#screen").on("click", ".guestAgree", (function(e) {
                    e.preventDefault(),
                        e.stopImmediatePropagation(),
                        acceptInvite($(this).attr("answer"))
                }
            )),
            $(".atc_event").addClass("hide")
    }
)),
    function() {
        var e = {
            right: {
                angle: "90deg",
                from: -40,
                to: 140
            },
            left: {
                angle: "90deg",
                from: 140,
                to: -40
            },
            down: {
                angle: "180deg",
                from: -40,
                to: 140
            },
            up: {
                angle: "180deg",
                from: 140,
                to: -40
            },
            yes: {
                angle: "90deg",
                from: -40,
                to: 140
            }
        }
            , t = new WeakSet
            , n = new WeakMap;
        function o(e) {
            return !!e && (!(!e.classList || !(e.classList.contains("BGPlace") || e.classList.contains("element_countdown") || e.classList.contains("plate_box") || e.classList.contains("calendarWrap"))) || (!(!e.tagName || "img" !== e.tagName.toLowerCase()) || (e.hasAttribute("module") || e.querySelector && (e.querySelector("img.BGPlace") || e.querySelector(".element_countdown") || e.querySelector(".plate_box") || e.classList.contains("plate_box") || e.classList.contains("element_countdown")))))
        }
        function r(e) {
            if (!e)
                return [];
            var t = e.classList && e.classList.contains("element_countdown") ? e : e.querySelector && e.querySelector(".element_countdown");
            return t ? t.querySelectorAll(".countdown, .weddatecontent, [action=countdowntext]") : []
        }
        function i(e) {
            e.removeAttribute("data-font-gradient"),
                e.removeAttribute("data-shine-base"),
                e.style.removeProperty("--text-gradient-base"),
                e.classList.remove("text-gradient-font", "text-gradient-shine--anim", "text-shine--anim")
        }
        function a(e) {
            (e && e.querySelectorAll ? e : document).querySelectorAll(".element_countdown, .moveBox[module], .BGPlace").forEach((function(e) {
                    var t = e.getAttribute("data-font-gradient")
                        , n = e.classList.contains("text-gradient-font");
                    if (t || n)
                        if (t || !n) {
                            var a = r(e);
                            !a.length && o(e) && (a = e.querySelectorAll(".textLine, .subTextLine")),
                            a.length && (i(e),
                                a.forEach((function(e) {
                                        !function(e, t) {
                                            e.setAttribute("data-font-gradient", t),
                                                e.style.setProperty("--text-gradient-base", t),
                                                e.classList.add("text-gradient-font")
                                        }(e, t)
                                    }
                                )))
                        } else
                            i(e)
                }
            ))
        }
        function s(e) {
            return !!e && (!!e.hasAttribute("data-font-gradient") || !!(e.getAttribute("data-shine") && e.closest && e.closest("#mymain")))
        }
        function l(t, n) {
            if (s(t)) {
                n = n || t.getAttribute("data-shine") || "right";
                var r = e[n] || e.right
                    , i = o(t)
                    , a = i ? "block-shine--anim" : "text-shine--anim"
                    , l = !i && !!t.getAttribute("data-shine") && !t.hasAttribute("data-font-gradient");
                if (t.classList.remove("text-shine--anim", "block-shine--anim"),
                    t.style.setProperty("--tg-shine-pos", r.from + "%"),
                    t.style.setProperty("--tg-shine-angle", r.angle),
                    !i) {
                    var d = t.style.getPropertyValue("--text-gradient-base").trim();
                    if (!d) {
                        var c = t.style.color || window.getComputedStyle(t).color;
                        c && "rgba(0, 0, 0, 0)" !== c && "transparent" !== c || (c = "#000000"),
                            d = "linear-gradient(" + c + ", " + c + ")"
                    }
                    t.style.setProperty("--tg-shine-base", d),
                    l && !t.classList.contains("text-gradient-font") && (t.style.setProperty("--text-gradient-base", d),
                        t.setAttribute("data-shine-base", "1"),
                        t.classList.add("text-gradient-font"))
                }
                t.classList.add(a);
                var u = null
                    , v = r.to - r.from;
                requestAnimationFrame((function e(n) {
                        u || (u = n);
                        var o = Math.min((n - u) / 1500, 1);
                        t.style.setProperty("--tg-shine-pos", (r.from + v * function(e) {
                            return 1 - Math.pow(1 - e, 3)
                        }(o)).toFixed(1) + "%"),
                            o < 1 ? requestAnimationFrame(e) : (t.classList.remove("text-shine--anim", "block-shine--anim"),
                                t.style.removeProperty("--tg-shine-pos"),
                                t.style.removeProperty("--tg-shine-angle"),
                                t.style.removeProperty("--tg-shine-base"),
                            l && t.hasAttribute("data-shine-base") && (t.classList.remove("text-gradient-font"),
                                t.removeAttribute("data-shine-base"),
                                t.style.removeProperty("--text-gradient-base")))
                    }
                ))
            }
        }
        window.wpEntranceShineAfterAnim = function(e, n, i) {
            if (e && (!e.closest || !e.closest("#mymain"))) {
                var a = function(e) {
                    var t = []
                        , n = new Set;
                    function i(e) {
                        e && !n.has(e) && function(e) {
                            return !!e && (e.hasAttribute("data-font-gradient") || e.classList.contains("text-gradient-font"))
                        }(e) && (n.add(e),
                            t.push(e))
                    }
                    if (!e)
                        return t;
                    if (o(e)) {
                        var a = r(e);
                        return a.length ? (a.forEach(i),
                            t) : (e.querySelectorAll(".textLine, .subTextLine").forEach(i),
                            t)
                    }
                    return i(e),
                        e.querySelectorAll("[data-font-gradient], .text-gradient-font").forEach(i),
                        t
                }(n = n || e);
                if (a.length) {
                    a.forEach((function(e) {
                            t.add(e)
                        }
                    ));
                    var s = !1;
                    if (i)
                        requestAnimationFrame((function() {
                                requestAnimationFrame(p)
                            }
                        ));
                    else {
                        var d = window.getComputedStyle(e)
                            , c = parseFloat(d.animationDuration) || 0
                            , u = parseFloat(d.animationDelay) || 0
                            , v = Math.max.apply(null, (d.transitionDuration || "0s").split(",").map((function(e) {
                                return parseFloat(e) || 0
                            }
                        )))
                            , m = Math.max.apply(null, (d.transitionDelay || "0s").split(",").map((function(e) {
                                return parseFloat(e) || 0
                            }
                        )));
                        c > 0 ? (e.addEventListener("animationend", (function t(n) {
                                n.target === e && (e.removeEventListener("animationend", t),
                                    p())
                            }
                        )),
                            setTimeout(p, 1e3 * (c + u) + 400)) : v > 0 && "none" !== d.transitionProperty ? (e.addEventListener("transitionend", (function t(n) {
                                n.target === e && (e.removeEventListener("transitionend", t),
                                    p())
                            }
                        )),
                            setTimeout(p, 1e3 * (v + m) + 400)) : requestAnimationFrame((function() {
                                requestAnimationFrame(p)
                            }
                        ))
                    }
                }
            }
            function p() {
                s || (s = !0,
                    requestAnimationFrame((function() {
                            a.forEach((function(e) {
                                    l(e, "right")
                                }
                            ))
                        }
                    )))
            }
        }
            ,
            window._resetGradientShineSeen = function() {
                t = new WeakSet
            }
            ,
            window.repairBlockGradientOnGuest = a,
            window._shineInit = function() {
                a(document.getElementById("mymain") || document),
                    requestAnimationFrame((function() {
                            requestAnimationFrame((function() {
                                    var e = new Set;
                                    document.querySelectorAll("[data-shine]").forEach((function(t, o) {
                                            if (!e.has(t) && s(t)) {
                                                e.add(t);
                                                var r = t.getAttribute("data-shine") || "right"
                                                    , i = !1
                                                    , a = window.getComputedStyle(t)
                                                    , d = parseFloat(a.animationDuration) || 0
                                                    , c = parseFloat(a.animationDelay) || 0;
                                                d > 0 ? (t.addEventListener("animationend", (function e(n) {
                                                        n.target === t && (t.removeEventListener("animationend", e),
                                                            setTimeout(u, 200))
                                                    }
                                                )),
                                                    setTimeout(u, 1e3 * (d + c) + 400)) : setTimeout(u, 500 + 150 * o)
                                            }
                                            function u() {
                                                i || (i = !0,
                                                    n.set(t, Date.now()),
                                                    l(t, r))
                                            }
                                        }
                                    ))
                                }
                            ))
                        }
                    ))
            }
            ,
            window._shineScrollRepeatInit = function() {
                if ("undefined" != typeof IntersectionObserver) {
                    window._shineScrollRepeatObs && (window._shineScrollRepeatObs.disconnect(),
                        window._shineScrollRepeatObs = null);
                    var e = new WeakMap
                        , t = new IntersectionObserver((function(t) {
                            t.forEach((function(t) {
                                    if (t.isIntersecting) {
                                        var o = t.target
                                            , r = Date.now();
                                        if (!(r - (n.get(o) || 0) < 5500))
                                            if (!(r - (e.get(o) || 0) < 1500)) {
                                                e.set(o, r);
                                                var i = o.getAttribute("data-shine") || "right";
                                                l(o, i)
                                            }
                                    }
                                }
                            ))
                        }
                    ),{
                        root: null,
                        rootMargin: "0px 0px -50% 0px",
                        threshold: 0
                    });
                    document.querySelectorAll("[data-font-gradient], .text-gradient-font").forEach((function(e) {
                            t.observe(e)
                        }
                    )),
                        window._shineScrollRepeatObs = t
                }
            }
    }(),
    window.initMymainAnim = function(e) {
        e = e || {};
        var t = document.querySelector("#mymain");
        if (t && (t.querySelectorAll(".calendarWrap").forEach((function(e) {
                var t = e.querySelector(".calendarLine");
                t && (e.classList.contains("text-gradient-font") && e.hasAttribute("data-shine-base") && (e.classList.remove("text-gradient-font"),
                    e.removeAttribute("data-shine-base"),
                    e.style.removeProperty("--text-gradient-base")),
                    ["data-anim-type", "data-anim-delay", "data-shine"].forEach((function(n) {
                            var o = t.getAttribute(n);
                            null === o || e.hasAttribute(n) || (e.setAttribute(n, o),
                                t.removeAttribute(n))
                        }
                    )))
            }
        )),
            t.querySelectorAll(".textBox .textLine").forEach((function(e) {
                    var t = (e.style.transform || "").match(/scale\(([\d.]+)\)/);
                    t && e.style.setProperty("--tl-scale", parseFloat(t[1]))
                }
            )),
            document.querySelectorAll("#mymain .textBox .textLine[data-anim-delay], #mymain [module][data-anim-delay], #mymain .plate_box[data-anim-delay], #mymain .element_countdown[data-anim-delay]").forEach((function(e) {
                    var t = parseFloat(e.getAttribute("data-anim-delay"));
                    isNaN(t) || (e.style.animationDelay = t + "s")
                }
            )),
            e.restart)) {
            var n = function() {
                t.querySelectorAll(".textBox .textLine, .plate_box, [module]").forEach((function(e) {
                        if ("none" !== e.getAttribute("data-anim-type")) {
                            var t = e.style.animationDelay;
                            e.style.animation = "none",
                                e.offsetWidth,
                                e.style.removeProperty("animation"),
                            t && (e.style.animationDelay = t);
                            var n = function() {
                                parseFloat(window.getComputedStyle(e).opacity) < .05 && (e.style.opacity = "1")
                            };
                            e.addEventListener("animationend", (function t(o) {
                                    o.target === e && (e.removeEventListener("animationend", t),
                                        n())
                                }
                            ));
                            var o = window.getComputedStyle(e)
                                , r = (parseFloat(o.animationDuration) || 0) + (parseFloat(o.animationDelay) || 0);
                            setTimeout(n, 1e3 * r + 300)
                        }
                    }
                ))
            };
            requestAnimationFrame((function() {
                    requestAnimationFrame(n)
                }
            ))
        }
    }
    ,
    function() {
        var e = null
            , t = null
            , n = [];
        window.initMyinvScrollReveal = function() {
            if (1 != getUrlVar().screenshot) {
                e && (e.disconnect(),
                    e = null),
                t && (window.removeEventListener("scroll", t),
                    window.removeEventListener("resize", t),
                    t = null),
                    n.forEach((function(e) {
                            clearTimeout(e)
                        }
                    )),
                    n = [];
                var o = document.querySelectorAll('#myinv .textBox .moveBox .textLine, #myinv [textplace="back_text"] .moveBox .textLine')
                    , r = [];
                if (o.forEach((function(e) {
                        if (function(e) {
                            return !(!e || !e.closest("#myinv") || e.closest(".customLine") || "none" === e.getAttribute("data-anim-type") || !e.closest('#myinv .textBox .moveBox, #myinv [textplace="back_text"] .moveBox'))
                        }(e)) {
                            e.classList.remove("myinv-revealed"),
                                delete e.dataset.myinvRevealDone,
                                delete e.dataset.myinvRevealPending,
                                e.style.animationDelay = "";
                            var t = function(e) {
                                if (e.classList.contains("calendarWrap"))
                                    return "img";
                                var t = e.closest(".moveBox");
                                return t && "img" === t.getAttribute("type") || e.querySelector("img.BGPlace") && !e.hasAttribute("contenteditable") ? "img" : "text"
                            }(e);
                            e.classList.add("myinv-reveal-pending", "myinv-reveal--" + t),
                                r.push(e)
                        } else
                            "none" === e.getAttribute("data-anim-type") && function(e) {
                                e.dataset.myinvRevealDone || (e.dataset.myinvRevealDone = "1",
                                    e.classList.remove("myinv-reveal-pending", "myinv-reveal--text", "myinv-reveal--img"),
                                    e.style.opacity = "")
                            }(e)
                    }
                )),
                    r.length) {
                    var i = !1;
                    t = function() {
                        i || (i = !0,
                            requestAnimationFrame((function() {
                                    i = !1,
                                        s()
                                }
                            )))
                    }
                        ,
                        "undefined" != typeof IntersectionObserver ? (e = new IntersectionObserver((function(e) {
                                e.forEach((function(e) {
                                        e.isIntersecting && a(e.target)
                                    }
                                ))
                            }
                        ),{
                            root: null,
                            rootMargin: "0px",
                            threshold: 0
                        }),
                            requestAnimationFrame((function() {
                                    r.forEach((function(t) {
                                            e.observe(t)
                                        }
                                    )),
                                        s()
                                }
                            ))) : s(),
                        window.addEventListener("scroll", t, {
                            passive: !0
                        }),
                        window.addEventListener("resize", t, {
                            passive: !0
                        })
                }
            }
            function a(t) {
                if (!t.dataset.myinvRevealDone && !t.dataset.myinvRevealPending) {
                    e && e.unobserve(t),
                        t.dataset.myinvRevealPending = "1";
                    var o = setTimeout((function() {
                            var e = n.indexOf(o);
                            e >= 0 && n.splice(e, 1),
                                delete t.dataset.myinvRevealPending,
                                function(e) {
                                    if (!e.dataset.myinvRevealDone) {
                                        e.dataset.myinvRevealDone = "1",
                                            e.classList.remove("myinv-reveal-pending"),
                                            e.classList.add("myinv-revealed");
                                        var t = parseFloat(e.getAttribute("data-anim-delay"));
                                        isNaN(t) || (e.style.animationDelay = t + "s"),
                                        window.wpEntranceShineAfterAnim && window.wpEntranceShineAfterAnim(e)
                                    }
                                }(t)
                        }
                    ), 300);
                    n.push(o)
                }
            }
            function s() {
                var e = window.innerHeight
                    , t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                    , n = Math.max(document.documentElement.scrollHeight || 0, document.body.scrollHeight || 0)
                    , o = e + t >= n - 8;
                r.forEach((function(t) {
                        if (!t.dataset.myinvRevealDone && !t.dataset.myinvRevealPending) {
                            var n = t.getBoundingClientRect();
                            (n.height || n.width) && (!o && (n.bottom <= 0 || n.top >= e) || a(t))
                        }
                    }
                ))
            }
        }
    }(),
    function() {
        var e = "cubic-bezier(0.16, 1, 0.3, 1)"
            , t = 1.1
            , n = {
            "zoom-in": "appearPhoto",
            fade: "appearColor",
            "from-left": "appearFromLeft",
            "from-right": "appearFromRight",
            "from-bottom": "appearFromBottom",
            "from-top": "appearFromTop"
        };
        function o(e) {
            return "heart" === e ? "appearHeart" : "photo" === e ? "appearPhoto" : "fromTop" === e ? "appearFromTop" : "fromBottom" === e ? "appearFromBottom" : "fromLeft" === e ? "appearFromLeft" : "fromRight" === e ? "appearFromRight" : "appearColor"
        }
        var r = []
            , i = [];
        function a(n) {
            var a = n.observe || n.items[0] && n.items[0].el;
            if (a) {
                n.items.forEach((function(e) {
                        (e.el && (e.el.style.animation = "",
                        e.children || (e.el.style.opacity = "0")),
                            e.children) && (Array.isArray(e.children) ? e.children : [e.children]).forEach((function(t) {
                                e.el.querySelectorAll(t.selector).forEach((function(e) {
                                        e.style.animation = "",
                                            e.style.opacity = "0"
                                    }
                                ))
                            }
                        ))
                    }
                ));
                var s = !1
                    , l = !1
                    , d = null;
                window.addEventListener("scroll", m, {
                    passive: !0
                }),
                    window.addEventListener("resize", m, {
                        passive: !0
                    }),
                    r.push((function() {
                            s = !0,
                            d && (clearTimeout(d),
                                d = null),
                                window.removeEventListener("scroll", m),
                                window.removeEventListener("resize", m)
                        }
                    )),
                    i.push(u),
                    v()
            }
            function c() {
                if (!s) {
                    s = !0,
                        window.removeEventListener("scroll", m),
                        window.removeEventListener("resize", m);
                    var r = i.indexOf(u);
                    r >= 0 && i.splice(r, 1),
                        n.items.forEach((function(n) {
                                n.children || function(n) {
                                    var r = n.el;
                                    if (r && !r.dataset.guestModuleAnimDone) {
                                        r.dataset.guestModuleAnimDone = "1",
                                            r.style.animation = "",
                                            r.style.opacity = "0";
                                        var i = o(n.anim)
                                            , a = n.stagger || 0;
                                        requestAnimationFrame((function() {
                                                var n = i + " " + t + "s 1 " + e + " " + a + "s both";
                                                r.style.animation = n,
                                                window.wpEntranceShineAfterAnim && window.wpEntranceShineAfterAnim(r)
                                            }
                                        ))
                                    }
                                }(n),
                                    function(t) {
                                        var n = t.children;
                                        n && (Array.isArray(n) || (n = [n]),
                                            n.forEach((function(n) {
                                                    var r = n.delay || 0;
                                                    t.el.querySelectorAll(n.selector).forEach((function(i, a) {
                                                            if (!i.dataset.guestModuleAnimDone) {
                                                                i.dataset.guestModuleAnimDone = "1",
                                                                    i.style.animation = "",
                                                                    i.style.opacity = "0";
                                                                var s = o(n.anim);
                                                                "appearHeart" === s && "strokes" === (t.el.getAttribute("data-palitra-view") || "") ? s = "appearColor" : "appearHeart" === s && (i.style.transformOrigin = "center center");
                                                                var l = r + (n.stagger || 0) * a;
                                                                requestAnimationFrame((function() {
                                                                        i.style.animation = s + " 0.9s 1 " + e + " " + l + "s both",
                                                                        window.wpEntranceShineAfterAnim && window.wpEntranceShineAfterAnim(i)
                                                                    }
                                                                ))
                                                            }
                                                        }
                                                    ))
                                                }
                                            )))
                                    }(n)
                            }
                        ))
                }
            }
            function u() {
                s || (d && (clearTimeout(d),
                    d = null),
                    c())
            }
            function v() {
                if (!s) {
                    var e = a.getBoundingClientRect()
                        , t = window.innerHeight;
                    if (e.height || e.width) {
                        var o = t;
                        "half" === n.reveal && (o = .9 * t),
                        e.top >= o || e.bottom <= 0 || s || d || (d = setTimeout((function() {
                                d = null,
                                    c()
                            }
                        ), 300))
                    }
                }
            }
            function m() {
                l || (l = !0,
                    requestAnimationFrame((function() {
                            l = !1,
                                v()
                        }
                    )))
            }
        }
        window._runGuestAnimCleanups = function() {
            r.forEach((function(e) {
                    try {
                        e()
                    } catch (e) {}
                }
            )),
                r = [],
                i = [],
            window._resetGradientShineSeen && window._resetGradientShineSeen()
        }
            ,
            window._guestObserveEntranceAnim = function(e, t, n) {
                e && a({
                    observe: (n = n || {}).observeEl || e,
                    items: [{
                        el: e,
                        anim: t
                    }],
                    reveal: n.reveal
                })
            }
            ,
            window._scrollAnimInit = function() {
                if (1 != getUrlVar().screenshot) {
                    var o = document.querySelectorAll(".content .block:not(#mymain), .screen .block:not(#mymain), #screen .block:not(#mymain)")
                        , i = [];
                    o.forEach((function(e) {
                            e.querySelectorAll(".textBox .textLine").forEach((function(e, t) {
                                    e.closest("#myinv") || e.closest(".element_tt") || "none" !== e.getAttribute("data-anim-type") && i.push({
                                        el: e,
                                        idx: t
                                    })
                                }
                            ))
                        }
                    )),
                    i.length && (window.IntersectionObserver ? requestAnimationFrame((function() {
                            i.forEach((function(e) {
                                    e.el.style.opacity = "0"
                                }
                            ));
                            var o = [];
                            function a(r, i) {
                                var a = setTimeout((function() {
                                        var s = o.indexOf(a);
                                        s >= 0 && o.splice(s, 1),
                                            function(o, r) {
                                                if (!o.dataset.scrollAnimDone) {
                                                    o.dataset.scrollAnimDone = "1";
                                                    var i = o.getAttribute("data-anim-type") || "fade"
                                                        , a = "none" === i ? null : n[i] || "appearColor";
                                                    if (a) {
                                                        var s = o.hasAttribute("data-anim-delay") ? parseFloat(o.getAttribute("data-anim-delay")) : .12 * r;
                                                        o.style.animation = a + " " + t + "s 1 " + e + " " + s + "s both",
                                                        window.wpEntranceShineAfterAnim && window.wpEntranceShineAfterAnim(o)
                                                    } else
                                                        o.style.opacity = "1"
                                                }
                                            }(r, i)
                                    }
                                ), 300);
                                o.push(a)
                            }
                            var s = new IntersectionObserver((function(e) {
                                    e.forEach((function(e) {
                                            if (e.isIntersecting) {
                                                var t = i.findIndex((function(t) {
                                                        return t.el === e.target
                                                    }
                                                ));
                                                a(e.target, t >= 0 ? i[t].idx : 0),
                                                    s.unobserve(e.target)
                                            }
                                        }
                                    ))
                                }
                            ),{
                                root: null,
                                threshold: 0
                            });
                            r.push((function() {
                                    s.disconnect(),
                                        o.forEach((function(e) {
                                                clearTimeout(e)
                                            }
                                        )),
                                        o.length = 0
                                }
                            )),
                                i.forEach((function(e) {
                                        var t, n;
                                        null !== e.el.offsetParent && (t = e.el,
                                        (n = t.getBoundingClientRect()).top < window.innerHeight && n.bottom > 0) ? a(e.el, e.idx) : s.observe(e.el)
                                    }
                                ))
                        }
                    )) : i.forEach((function(e) {
                            e.el.style.opacity = ""
                        }
                    )))
                }
            }
            ,
            window._moduleEntranceAnimInit = function() {
                if (1 != getUrlVar().screenshot) {
                    var e = document.querySelector('#agree .guestAgreement[action="agreebtn"]') || document.querySelector('.content .guestAgreement[action="agreebtn"]') || document.querySelector('.guestAgreement[action="agreebtn"]') || document.querySelector('#agree a[action="agreebtn"]')
                        , t = e ? e.querySelector('[action="agree_text"]') : null
                        , n = document.querySelector('.customLine[customname="palitra"]')
                        , o = document.querySelector("#footer")
                        , s = o ? o.querySelector(".logo") : null
                        , l = o ? o.querySelector(".slogan") : null
                        , d = [];
                    if (e) {
                        var c = [{
                            el: e,
                            anim: "photo"
                        }];
                        t && c.push({
                            el: t,
                            anim: "text",
                            stagger: .3
                        }),
                            d.push({
                                observe: e,
                                items: c,
                                reveal: "bottom"
                            })
                    }
                    n && d.push({
                        observe: n,
                        items: [{
                            el: n,
                            anim: "photo",
                            children: [{
                                selector: '.subTextLine[action="palitra_text"]',
                                anim: "text",
                                delay: 0,
                                stagger: 0
                            }, {
                                selector: ".colors .color:not(.hidden)",
                                anim: "heart",
                                delay: 0,
                                stagger: .06
                            }]
                        }]
                    });
                    var u = document.querySelector('[customname="contacts_calendar"]');
                    u && d.push({
                        observe: u,
                        items: [{
                            el: u,
                            anim: "photo"
                        }]
                    });
                    var v = document.querySelector(".addComment");
                    v && d.push({
                        observe: v,
                        items: [{
                            el: v,
                            anim: "photo"
                        }]
                    });
                    var m = document.querySelectorAll("#opros .opros.repeatLine:not(.hide)");
                    if (m.length) {
                        var p = [];
                        m.forEach((function(e, t) {
                                var n = e.querySelector('[action="questiontxt"]')
                                    , o = e.querySelectorAll("label.form-check-label")
                                    , r = .5 * t;
                                n && p.push({
                                    el: n,
                                    anim: "text",
                                    stagger: r
                                }),
                                    o.forEach((function(e, t) {
                                            p.push({
                                                el: e,
                                                anim: "text",
                                                stagger: r + .3 + .1 * t
                                            })
                                        }
                                    ))
                            }
                        )),
                        p.length && d.push({
                            observe: m[0],
                            items: p,
                            reveal: "bottom"
                        })
                    }
                    if (o && (s || l)) {
                        var h = [];
                        s && h.push({
                            el: s,
                            anim: "photo"
                        }),
                        l && h.push({
                            el: l,
                            anim: "text",
                            stagger: .3
                        }),
                            d.push({
                                observe: o,
                                items: h,
                                reveal: "bottom"
                            })
                    }
                    var f = document.querySelector(".element_tt");
                    if (f) {
                        var w = f.querySelector("wedding_timetable")
                            , g = w ? w.closest(".textLine") : null
                            , y = f.querySelector("#timetablecontent")
                            , b = [{
                            el: f,
                            anim: "text"
                        }];
                        g && b.push({
                            el: g,
                            anim: "fromTop",
                            stagger: .4
                        }),
                        y && b.push({
                            el: y,
                            anim: "text",
                            stagger: .8
                        }),
                            d.push({
                                observe: f,
                                items: b,
                                reveal: "half"
                            })
                    }
                    d.forEach(a);
                    var _ = !1;
                    window.addEventListener("scroll", S, {
                        passive: !0
                    }),
                        r.push((function() {
                                window.removeEventListener("scroll", S)
                            }
                        ))
                }
                function S() {
                    if (!_ && i.length) {
                        var e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                        window.pageYOffset + window.innerHeight >= e - 60 && (_ = !0,
                            i.slice().forEach((function(e) {
                                    e()
                                }
                            )))
                    }
                }
            }
    }(),
    window.initGuestBelowMymainAnimations = function() {
        requestAnimationFrame((function() {
                requestAnimationFrame((function() {
                        window._runGuestAnimCleanups && window._runGuestAnimCleanups(),
                            resetGuestBelowMymainAnimElements(),
                        window._scrollAnimInit && window._scrollAnimInit(),
                        window.initMyinvScrollReveal && window.initMyinvScrollReveal(),
                        window._moduleEntranceAnimInit && window._moduleEntranceAnimInit(),
                            setTimeout((function() {
                                    window._shineScrollRepeatInit && window._shineScrollRepeatInit()
                                }
                            ), 4e3)
                    }
                ))
            }
        ))
    }
    ,
    $(document).on("click", '.element_tt[version_tt="4"] .tt-event__tooltip-btn', (function(e) {
            e.preventDefault(),
                e.stopPropagation();
            var t = $(this).closest(".tt-event")
                , n = t.hasClass("tt-tooltip-open");
            $(".tt-event").removeClass("tt-tooltip-open"),
            n || t.addClass("tt-tooltip-open")
        }
    )),
    $(document).on("click", (function(e) {
            $(e.target).closest(".tt-event__tooltip, .tt-event__tooltip-btn").length || $(".tt-event").removeClass("tt-tooltip-open")
        }
    )),
    $(document).ready((function() {
            $(".element_tt").each((function() {
                    $(this).attr("version_tt") || $(this).attr("version_tt", "1")
                }
            )),
                setTimeout((function() {
                        window.runGuestTimetableInit && window.runGuestTimetableInit()
                    }
                ), 500)
        }
    ));
