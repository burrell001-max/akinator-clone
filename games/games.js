/* Shared helpers for the /games/ library.
   Plain ES5-compatible JavaScript, no dependencies, no network. */
(function () {
  "use strict";

  var MG = {};

  MG.shuffle = function (list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  MG.pick = function (list) {
    return list[Math.floor(Math.random() * list.length)];
  };

  MG.pad = function (n) {
    return (n < 10 ? "0" : "") + n;
  };

  MG.formatTime = function (totalSeconds) {
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    return MG.pad(m) + ":" + MG.pad(s);
  };

  /* localStorage can throw in private modes and be blocked by extensions. */
  MG.store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  MG.today = function () {
    var d = new Date();
    return d.getFullYear() + "-" + MG.pad(d.getMonth() + 1) + "-" + MG.pad(d.getDate());
  };

  MG.yesterday = function () {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + "-" + MG.pad(d.getMonth() + 1) + "-" + MG.pad(d.getDate());
  };

  /* Small seeded PRNG so a date always produces the same puzzle. */
  MG.seeded = function (seedString) {
    var h = 2166136261;
    for (var i = 0; i < seedString.length; i++) {
      h ^= seedString.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    var state = h >>> 0;
    return function () {
      state = (state + 0x6D2B79F5) >>> 0;
      var t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  MG.announce = function (el, message) {
    if (!el) return;
    el.textContent = message;
  };

  /* Hub category filtering. Runs only where [data-filter] chips exist. */
  function initFilters() {
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-cats]"));
    var empty = document.getElementById("filterEmpty");
    var count = document.getElementById("filterCount");
    if (!chips.length || !cards.length) return;

    function apply(filter, updateHash) {
      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.dataset.cats || "").split(/\s+/);
        var match = filter === "all" || cats.indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      chips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
      });
      if (empty) empty.hidden = shown !== 0;
      if (count) {
        count.textContent = shown === 1 ? "1 game" : shown + " games";
      }
      if (updateHash) {
        var hash = filter === "all" ? "" : "#" + filter;
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", window.location.pathname + hash);
        }
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () { apply(chip.dataset.filter, true); });
    });

    var start = (window.location.hash || "").replace("#", "");
    var known = chips.some(function (c) { return c.dataset.filter === start; });
    apply(known ? start : "all", false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFilters);
  } else {
    initFilters();
  }

  window.MG = MG;
})();
