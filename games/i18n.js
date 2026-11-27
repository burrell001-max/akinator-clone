/* Arcade localization.

   One module for /games/: the hub, the ten category pages and every game page.
   It shares the Genie's language list (window.LANGS from /langs.js), its
   storage key ("mindgenie_lang") and its switcher markup, so a language chosen
   anywhere on the site follows the visitor everywhere.

     MGi18n.lang                 current code, e.g. "es"
     MGi18n.t(key, vars)         UI string, English fallback, {n} interpolation
     MGi18n.game(slug, field)    per-game string: "title", "howto" or "blurb"
     MGi18n.cat(key)             category name for brain/daily/number/...
     MGi18n.hub(i)               hub heading strings (see i18n-data-c.js)
     MGi18n.setLang(code)        switch, persist, re-render, update ?lang=
     MGi18n.onChange(fn)         subscribe; returns an unsubscribe function
     MGi18n.apply(root)          re-render a subtree (default: document)

   Markup hooks (all optional, all idempotent):
     data-i18n="key"             textContent
     data-i18n-html="key"        innerHTML (strings that contain markup)
     data-i18n-ph="key"          placeholder
     data-i18n-aria="key"        aria-label
     data-i18n-title="key"       title attribute
     data-mg-title="slug"        the translated game name
     data-mg-howto="slug"        the translated one-line instruction
     data-mg-cat="brain"         translated category name
     data-mg-hub="0".."7"        hub / shelf heading strings
     data-mg-lang                where to mount the switcher (default .top)

   Page scripts can call MGi18n.t() themselves and re-render on the "mg:lang"
   event, which is dispatched on document after every switch. */
(function () {
  "use strict";

  var STORAGE_KEY = "mindgenie_lang";
  var SLUGS = window.MGI18N_SLUGS || [];
  var GUIDE_OF = window.MGI18N_GUIDE || {};
  var CAT_ORDER = window.MGI18N_CAT_ORDER || [];
  var PARTS = [
    window.MGI18N_DATA_A, window.MGI18N_DATA_B, window.MGI18N_DATA_C,
    window.MGI18N_DATA_D, window.MGI18N_DATA_E, window.MGI18N_DATA_F,
    window.MGI18N_DATA_G, window.MGI18N_DATA_H, window.MGI18N_DATA_I
  ];
  var LANGS = window.LANGS || [{ code: "en", name: "English" }];
  var listeners = [];
  var current = "en";

  /* Merge the three data files into one {ui, titles, howto, cats, hub}. */
  var DATA = { ui: {}, titles: {}, howto: {}, cats: {}, hub: {}, status: {}, guides: {} };
  PARTS.forEach(function (part) {
    if (!part) return;
    Object.keys(part).forEach(function (section) {
      var table = part[section];
      if (!table) return;
      Object.keys(table).forEach(function (code) {
        var incoming = table[code];
        var existing = DATA[section][code];
        var bothObjects = incoming && existing &&
          typeof incoming === "object" && typeof existing === "object" &&
          !Array.isArray(incoming) && !Array.isArray(existing);
        if (!existing) DATA[section][code] = incoming;
        else if (bothObjects) Object.assign(existing, incoming);
      });
    });
  });

  function langMeta(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i];
    return null;
  }

  function t(key, vars, code) {
    var lang = code || current;
    var value = (DATA.ui[lang] || {})[key];
    if (value === undefined) value = DATA.ui.en[key];
    if (value === undefined) {
      if (window.console && console.warn) console.warn("[i18n] missing key:", key);
      return key;
    }
    if (vars) {
      value = String(value).replace(/\{(\w+)\}/g, function (match, name) {
        return vars[name] === undefined ? match : String(vars[name]);
      });
    }
    return value;
  }

  /* Titles, instructions and blurbs are index-aligned arrays. */
  function game(slug, field) {
    var table = DATA[field === "title" ? "titles" : field];
    if (!table) return slug;
    var index = SLUGS.indexOf(slug);
    if (index === -1) return slug;
    var list = table[current] || table.en || [];
    if (list[index] !== undefined) return list[index];
    var english = table.en || [];
    return english[index] !== undefined ? english[index] : slug;
  }

  function cat(key) {
    var index = CAT_ORDER.indexOf(key);
    if (index === -1) return key;
    var list = DATA.cats[current] || DATA.cats.en || [];
    return list[index] !== undefined ? list[index] : (DATA.cats.en || [])[index] || key;
  }

  function hub(index) {
    var list = DATA.hub[current] || DATA.hub.en || [];
    return list[index] !== undefined ? list[index] : (DATA.hub.en || [])[index] || "";
  }

  /* Status lines are written by the games in English. Numbers, times and the
     odd shouted word are replaced with {0}, {1}… so one key covers every run. */
  function normaliseStatus(text) {
    var values = [];
    var key = String(text)
      /* A run of digits such as a guessed code or an echoed string is one value. */
      .replace(/\b\d+(?:\s+\d+)+\b/g, function (match) {
        values.push(match);
        return "{" + (values.length - 1) + "}";
      })
      .replace(/\b\d+(?::\d+)?\b|\b[A-Z][A-Z0-9]{2,}\b/g, function (match) {
      values.push(match);
      return "{" + (values.length - 1) + "}";
    });
    return { key: key.replace(/\s+/g, " ").trim(), values: values };
  }

  function fillPlaceholders(template, values) {
    return String(template).replace(/\{(\d+)\}/g, function (match, index) {
      return values[Number(index)] === undefined ? match : values[Number(index)];
    });
  }

  /* One line at a time: undefined when the dictionary does not know it. */
  function translateLine(text) {
    var parts = normaliseStatus(text);
    if (!parts.values.length && !/[A-Za-z]/.test(parts.key)) return text;
    var table = DATA.status[current] || {};
    var template = table[parts.key];
    if (template === undefined) template = (DATA.status.en || {})[parts.key];
    if (template === undefined) return undefined;
    return fillPlaceholders(template, parts.values);
  }

  /* Scores are often two sentences joined in the page script, so a whole line
     the dictionary has never seen can still translate sentence by sentence. */
  function splitSentences(text) {
    var parts = [];
    var start = 0;
    for (var i = 0; i < text.length; i++) {
      if (".!?…".indexOf(text.charAt(i)) === -1) continue;
      if (text.charAt(i + 1) !== " ") continue;
      parts.push(text.slice(start, i + 1));
      start = i + 2;
      i++;
    }
    if (start < text.length) parts.push(text.slice(start));
    return parts;
  }

  function status(text) {
    var line = translateLine(text);
    if (line !== undefined) return line;

    var sentences = splitSentences(text);
    if (sentences.length > 1) {
      var translated = false;
      var joined = sentences.map(function (sentence) {
        var out = translateLine(sentence);
        if (out === undefined) return sentence;
        translated = true;
        return out;
      }).join(" ");
      if (translated) return joined;
    }

    if (current !== "en" && window.console && console.warn) {
      console.warn("[i18n] untranslated status:", normaliseStatus(text).key);
    }
    return text;
  }

  /* The translated guide for a game's mechanic, as an array of paragraphs. */
  function guide(slug) {
    var family = GUIDE_OF[slug];
    if (!family) return [];
    var table = DATA.guides[current] || DATA.guides.en || {};
    if (!table[family]) table = DATA.guides.en || {};
    return table[family] || [];
  }

  function fromQuery() {
    try {
      var code = new URLSearchParams(window.location.search).get("lang");
      return code && langMeta(code) ? code : "";
    } catch (error) {
      return "";
    }
  }

  function detect() {
    var query = fromQuery();
    if (query) return query;
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && langMeta(saved)) return saved;
    } catch (error) { /* storage can be blocked */ }
    var prefs = (navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"]).map(function (tag) {
        return String(tag).slice(0, 2).toLowerCase();
      });
    for (var i = 0; i < prefs.length; i++) if (langMeta(prefs[i])) return prefs[i];
    return "en";
  }

  /* ── Switcher: the same .lang / .lang-btn / .lang-menu component as the Genie ── */
  function mountSwitcher() {
    if (document.querySelector(".mg-lang")) return;
    var host = document.querySelector("[data-mg-lang]") ||
      document.querySelector(".top") ||
      document.querySelector(".hub-topbar");
    if (!host) return;

    var wrap = document.createElement("div");
    wrap.className = "lang mg-lang";
    wrap.innerHTML =
      '<button type="button" class="lang-btn" aria-haspopup="true" aria-expanded="false" aria-controls="mgLangMenu">' +
      '<span class="mg-lang-cur">English</span> \u25be</button>' +
      '<ul class="lang-menu mg-lang-menu" id="mgLangMenu" hidden></ul>';
    host.appendChild(wrap);

    var button = wrap.querySelector(".lang-btn");
    var menu = wrap.querySelector(".lang-menu");

    function close() {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    }

    LANGS.forEach(function (meta) {
      var li = document.createElement("li");
      var item = document.createElement("button");
      item.type = "button";
      item.textContent = meta.name;
      item.lang = meta.code;
      item.setAttribute("data-lang-code", meta.code);
      item.addEventListener("click", function () {
        setLang(meta.code);
        close();
      });
      li.appendChild(item);
      menu.appendChild(li);
    });

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
      button.setAttribute("aria-expanded", menu.hidden ? "false" : "true");
    });
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  function paintSwitcher() {
    var label = document.querySelector(".mg-lang-cur");
    if (label) label.textContent = (langMeta(current) || { name: "English" }).name;
    var items = document.querySelectorAll(".mg-lang-menu [data-lang-code]");
    for (var i = 0; i < items.length; i++) {
      if (items[i].getAttribute("data-lang-code") === current) items[i].setAttribute("aria-current", "true");
      else items[i].removeAttribute("aria-current");
    }
  }

  function each(scope, selector, fn) {
    var nodes = scope.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) fn(nodes[i]);
  }

  /* ── Live status lines ──
     Games keep writing English. We remember the English in data-mg-src, show
     the translation, and ignore the mutation that our own write caused. */
  var STATUS_SELECTOR = ".status, [role='status'], .hint, .meta span";

  function renderStatusEl(el, force) {
    if (el.children.length) return;
    var shown = el.getAttribute("data-mg-out");
    var text = el.textContent;

    if (force) {
      var src = el.getAttribute("data-mg-src");
      if (src === null) return;
      var fresh = status(src);
      if (fresh !== text) el.textContent = fresh;
      el.setAttribute("data-mg-out", fresh);
      return;
    }

    if (text === shown) return;
    if (!text.trim()) {
      el.setAttribute("data-mg-src", "");
      el.setAttribute("data-mg-out", "");
      return;
    }
    el.setAttribute("data-mg-src", text);
    var out = status(text);
    if (out !== text) el.textContent = out;
    el.setAttribute("data-mg-out", out);
  }

  function watchStatuses() {
    each(document, STATUS_SELECTOR, function (el) {
      if (el.__mgWatched) return;
      el.__mgWatched = true;
      renderStatusEl(el, false);
      if (window.MutationObserver) {
        new MutationObserver(function () { renderStatusEl(el, false); })
          .observe(el, { childList: true, characterData: true, subtree: true });
      }
    });
  }

  /* ── Page rendering ── */
  function apply(root) {
    var scope = root || document;
    var meta = langMeta(current) || { name: "English" };
    var html = document.documentElement;
    html.lang = current;
    html.dir = meta.rtl ? "rtl" : "ltr";
    html.setAttribute("data-lang", current);

    /* English keeps each page's own wording: the dictionary is a translation,
       not a rewrite of the hand-written labels. */
    each(scope, "[data-i18n]", function (el) {
      if (current === "en" && el.hasAttribute("data-en")) {
        el.textContent = el.getAttribute("data-en");
      } else {
        el.textContent = t(el.getAttribute("data-i18n"));
      }
    });
    each(scope, "[data-i18n-html]", function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    each(scope, "[data-i18n-ph]", function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    each(scope, "[data-i18n-aria]", function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    each(scope, "[data-i18n-title]", function (el) {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });
    each(scope, "[data-mg-title]", function (el) {
      el.textContent = game(el.getAttribute("data-mg-title"), "title");
    });
    each(scope, "[data-mg-howto]", function (el) {
      el.textContent = game(el.getAttribute("data-mg-howto"), "howto");
    });
    each(scope, "[data-mg-cat]", function (el) {
      el.textContent = cat(el.getAttribute("data-mg-cat"));
    });
    each(scope, "[data-mg-hub]", function (el) {
      var text = current === "en" && el.hasAttribute("data-en")
        ? el.getAttribute("data-en")
        : hub(Number(el.getAttribute("data-mg-hub")));
      if (text) el.textContent = text;
    });

    /* The page title follows the translated game or category heading. */
    var h1 = document.querySelector("h1[data-mg-title]");
    if (h1) {
      document.title = current === "en"
        ? h1.getAttribute("data-title-en") || document.title
        : game(h1.getAttribute("data-mg-title"), "title") + " \u00b7 MindGenie AI";
    } else {
      var catH1 = document.querySelector("h1[data-mg-cat]");
      if (catH1) {
        document.title = current === "en"
          ? catH1.getAttribute("data-title-en") || document.title
          : cat(catH1.getAttribute("data-mg-cat")) + " \u00b7 MindGenie AI";
      }
    }

    /* The translated guide replaces the English essays outside English. */
    each(scope, "[data-mg-guide]", function (el) {
      var paragraphs = guide(el.getAttribute("data-mg-guide"));
      if (current === "en" || !paragraphs.length) {
        el.hidden = true;
        el.textContent = "";
        return;
      }
      el.hidden = false;
      el.textContent = "";
      paragraphs.forEach(function (text) {
        var para = document.createElement("p");
        para.textContent = text;
        el.appendChild(para);
      });
    });

    each(document, STATUS_SELECTOR, function (el) { renderStatusEl(el, true); });
    paintSwitcher();

    var event;
    try {
      event = new CustomEvent("mg:lang", { detail: { lang: current } });
    } catch (error) {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent("mg:lang", false, false, { lang: current });
    }
    document.dispatchEvent(event);
  }

  function setLang(code) {
    if (!langMeta(code)) return;
    current = code;
    try { window.localStorage.setItem(STORAGE_KEY, code); } catch (error) { /* blocked */ }
    try {
      var url = new URL(window.location.href);
      if (code === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", code);
      window.history.replaceState(null, "", url.toString());
    } catch (error) { /* older browser */ }
    apply(document);
    for (var i = 0; i < listeners.length; i++) listeners[i](code);
  }

  function onChange(fn) {
    listeners.push(fn);
    return function () {
      var index = listeners.indexOf(fn);
      if (index !== -1) listeners.splice(index, 1);
    };
  }

  current = detect();

  function boot() {
    /* A shared ?lang= link should keep its language after the next click. */
    if (fromQuery()) {
      try { window.localStorage.setItem(STORAGE_KEY, current); } catch (error) { /* blocked */ }
    }
    /* Remember the authored English before the first translation pass. */
    each(document, "[data-i18n], [data-mg-hub]", function (el) {
      if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.textContent);
    });
    mountSwitcher();
    apply(document);
    watchStatuses();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.MGi18n = {
    LANGS: LANGS,
    STORAGE_KEY: STORAGE_KEY,
    get lang() { return current; },
    t: t,
    game: game,
    cat: cat,
    hub: hub,
    status: status,
    guide: guide,
    setLang: setLang,
    onChange: onChange,
    apply: apply
  };
})();
