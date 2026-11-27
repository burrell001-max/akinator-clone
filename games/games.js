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

  /* ── Best score and daily streak, shared by every game in the library ── */
  MG.getBest = function (key, fallback) {
    var value = MG.store.get(key, fallback === undefined ? 0 : fallback);
    return typeof value === "number" ? value : (fallback === undefined ? 0 : fallback);
  };

  /* Returns true when the value beats what was stored, and only then writes. */
  MG.saveBest = function (key, value, higherIsBetter) {
    var better = higherIsBetter === false ? value < MG.getBest(key, Infinity) : value > MG.getBest(key, 0);
    if (better) MG.store.set(key, value);
    return better;
  };

  /* Daily games store one record: { last: "YYYY-MM-DD", count: n }. */
  MG.getStreak = function (key) {
    var rec = MG.store.get(key, null);
    if (!rec || typeof rec !== "object") return { last: "", count: 0 };
    return { last: String(rec.last || ""), count: Number(rec.count) || 0 };
  };

  /* Called once when today's puzzle is solved; a missed day resets to one. */
  MG.bumpStreak = function (key) {
    var today = MG.today();
    var rec = MG.getStreak(key);
    if (rec.last === today) return rec.count;
    var next = { last: today, count: rec.last === MG.yesterday() ? rec.count + 1 : 1 };
    MG.store.set(key, next);
    return next.count;
  };

  /* ── Sudoku generator: any size, unique solution guaranteed ──
     Fills a grid by randomised backtracking, then digs holes one cell at a
     time and keeps a hole only while the puzzle still has exactly one
     solution. Returns { solution, puzzle } as arrays of rows. */
  MG.sudoku = function (size, boxH, boxW, givens, rng) {
    var random = rng || Math.random;
    var i, j;

    /* Shuffle with the supplied random source, so passing MG.seeded(...)
       really does deal the same grid twice. MG.shuffle() uses Math.random()
       and would quietly make a "daily" puzzle different on every load. */
    function shuffleWith(list) {
      var a = list.slice();
      for (var k = a.length - 1; k > 0; k--) {
        var pick = Math.floor(random() * (k + 1));
        var t = a[k]; a[k] = a[pick]; a[pick] = t;
      }
      return a;
    }

    function blank() {
      var g = [];
      for (i = 0; i < size; i++) g.push(new Array(size).fill(0));
      return g;
    }

    function allowed(g, r, c, v) {
      for (i = 0; i < size; i++) {
        if (g[r][i] === v || g[i][c] === v) return false;
      }
      var r0 = Math.floor(r / boxH) * boxH;
      var c0 = Math.floor(c / boxW) * boxW;
      for (i = 0; i < boxH; i++) {
        for (j = 0; j < boxW; j++) {
          if (g[r0 + i][c0 + j] === v) return false;
        }
      }
      return true;
    }

    var digits = [];
    for (i = 1; i <= size; i++) digits.push(i);

    function fill(g) {
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          if (g[r][c] !== 0) continue;
          var order = shuffleWith(digits);
          for (var k = 0; k < order.length; k++) {
            if (!allowed(g, r, c, order[k])) continue;
            g[r][c] = order[k];
            if (fill(g)) return true;
            g[r][c] = 0;
          }
          return false;
        }
      }
      return true;
    }

    function countSolutions(g, limit) {
      var found = 0;
      function search() {
        var bestR = -1, bestC = -1, bestOpen = 99;
        for (var r = 0; r < size; r++) {
          for (var c = 0; c < size; c++) {
            if (g[r][c] !== 0) continue;
            var open = 0;
            for (var v = 1; v <= size; v++) {
              if (allowed(g, r, c, v)) open++;
            }
            if (open < bestOpen) { bestOpen = open; bestR = r; bestC = c; }
            if (open === 0) { bestR = r; bestC = c; bestOpen = -1; break; }
          }
          if (bestOpen === -1) break;
        }
        if (bestR === -1) { found++; return found >= limit; }
        for (var val = 1; val <= size; val++) {
          if (!allowed(g, bestR, bestC, val)) continue;
          g[bestR][bestC] = val;
          if (search()) { g[bestR][bestC] = 0; return true; }
          g[bestR][bestC] = 0;
        }
        return false;
      }
      search();
      return found;
    }

    var solution = blank();
    fill(solution);

    var puzzle = solution.map(function (row) { return row.slice(); });
    var cells = [];
    for (i = 0; i < size * size; i++) cells.push(i);
    cells = shuffleWith(cells);

    var target = Math.max(size, Math.min(size * size, givens));
    var filled = size * size;
    for (var n = 0; n < cells.length && filled > target; n++) {
      var idx = cells[n];
      var r = Math.floor(idx / size);
      var c = idx % size;
      if (puzzle[r][c] === 0) continue;
      var keep = puzzle[r][c];
      puzzle[r][c] = 0;
      var probe = puzzle.map(function (row) { return row.slice(); });
      if (countSolutions(probe, 2) !== 1) {
        puzzle[r][c] = keep;
      } else {
        filled--;
      }
    }

    return { solution: solution, puzzle: puzzle };
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
