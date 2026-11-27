/* Homepage shelf localization.

   The homepage keeps its own long-standing i18n (window.I18N) for the Genie and
   its own switcher. The arcade shelf borrows the arcade dictionaries instead:
   this file reads the same "mindgenie_lang" key the Genie writes, translates
   the shelf cards, category buttons and headings, and re-runs whenever the
   Genie's menu is used. It never touches <html lang/dir> — the Genie owns that. */
(function () {
  "use strict";

  var STORAGE_KEY = "mindgenie_lang";
  var SLUGS = window.MGI18N_SLUGS || [];
  var CAT_ORDER = window.MGI18N_CAT_ORDER || [];
  var LANGS = window.LANGS || [];
  var PARTS = [window.MGI18N_DATA_A, window.MGI18N_DATA_B, window.MGI18N_DATA_C]
    .filter(Boolean);

  function langKnown(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return true;
    return false;
  }

  /* <html lang> is what the Genie's applyLang sets, so it leads; the stored
     key covers the moment before that runs and the first paint. */
  function readLang() {
    var live = document.documentElement.lang;
    if (live && langKnown(live)) return live;
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && langKnown(saved)) return saved;
    } catch (error) { /* storage can be blocked */ }
    return "en";
  }

  /* Walk the data files until one has this language (and falls back to English). */
  function list(section, code) {
    for (var i = 0; i < PARTS.length; i++) {
      if (PARTS[i][section] && PARTS[i][section][code]) return PARTS[i][section][code];
    }
    for (var j = 0; j < PARTS.length; j++) {
      if (PARTS[j][section] && PARTS[j][section].en) return PARTS[j][section].en;
    }
    return null;
  }

  function entry(section, code, index) {
    var values = list(section, code);
    return values && values[index] !== undefined ? values[index] : "";
  }

  function ui(key, code) {
    for (var i = 0; i < PARTS.length; i++) {
      var table = PARTS[i].ui && PARTS[i].ui[code];
      if (table && table[key] !== undefined) return table[key];
    }
    for (var j = 0; j < PARTS.length; j++) {
      var english = PARTS[j].ui && PARTS[j].ui.en;
      if (english && english[key] !== undefined) return english[key];
    }
    return "";
  }

  function render() {
    var code = readLang();
    var shelf = document.getElementById("mg-games-shelf");
    if (!shelf) return;

    var cards = shelf.querySelectorAll(".fb-game-card");
    for (var c = 0; c < cards.length; c++) {
      var slug = (cards[c].getAttribute("href") || "").replace(/^.*\/games\//, "").replace(/\.html.*$/, "");
      var index = SLUGS.indexOf(slug);
      var label = cards[c].querySelector(".fb-card-title");
      if (label && index !== -1) label.textContent = entry("titles", code, index);

      var small = cards[c].querySelector(".fb-card-art small");
      var catKey = (cards[c].getAttribute("data-category") || "").toLowerCase().replace(/ games$/, "");
      var catIndex = CAT_ORDER.indexOf(catKey);
      if (small && catIndex !== -1) small.textContent = entry("cats", code, catIndex);
    }

    var buttons = shelf.querySelectorAll(".fb-cat-btn");
    for (var b = 0; b < buttons.length; b++) {
      var raw = (buttons[b].getAttribute("data-category") || "").toLowerCase().replace(/ games$/, "");
      if (raw === "all") {
        buttons[b].textContent = ui("all_games", code) || buttons[b].textContent;
      } else {
        var pill = CAT_ORDER.indexOf(raw);
        if (pill !== -1) buttons[b].textContent = entry("cats", code, pill);
      }
    }

    var heading = shelf.querySelector(".fb-shelf-title");
    var sub = shelf.querySelector(".fb-shelf-subtitle");
    var allLink = shelf.querySelector(".fb-all-games-link");
    if (heading) heading.textContent = entry("hub", code, 5);
    if (sub) sub.textContent = entry("hub", code, 6);
    if (allLink) allLink.textContent = entry("hub", code, 7) + " \u2192";
  }

  /* The Genie owns the switcher: follow its <html lang> change rather than
     relying on its menu's click handlers, which stop propagation. */
  if (window.MutationObserver) {
    var timer = null;
    new MutationObserver(function () {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function () { timer = null; render(); }, 0);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  document.addEventListener("click", function (event) {
    if (event.target.closest && event.target.closest("#langMenu")) {
      window.setTimeout(render, 0);
    }
  });
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) render();
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();

  window.MGI18nShelf = { render: render, lang: readLang };
})();
