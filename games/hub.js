/* Games hub: category pills, live result count and #key / ?cat= deep links.
   The cards carry space-separated keys in data-cats, so a game can sit in more
   than one category (Sudoku is also a number game, the crossword also a word
   game). Pills, and the top ribbon's links, use the same keys.

   The ribbon links to /games/#memory and friends. Clicking one while already on
   the hub only fires hashchange — it does not reload the page — so the filter
   has to follow the hash, not just read it once at load. */
(function () {
  "use strict";

  var bar = document.getElementById("hubCatBar");
  var grid = document.getElementById("hubGamesGrid");
  if (!bar || !grid) return;

  var pills = Array.prototype.slice.call(bar.querySelectorAll(".cat-pill"));
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".game-card"));
  var countEl = document.getElementById("hubCount");
  var clearEl = document.getElementById("hubClear");
  var ribbonLinks = Array.prototype.slice.call(
    document.querySelectorAll(".mg-cat-ribbon a[href*='#']")
  );

  /* Accept the readable labels too, so links elsewhere can say ?cat=Word%20Games. */
  var LABELS = {
    "all categories": "all",
    "all": "all",
    "all games": "all",
    "brain": "brain",
    "brain games": "brain",
    "daily": "daily",
    "daily games": "daily",
    "number": "number",
    "number games": "number",
    "word": "word",
    "word games": "word",
    "crossword": "crossword",
    "crosswords": "crossword",
    "sudoku": "sudoku",
    "memory": "memory",
    "memory games": "memory",
    "sort": "sort",
    "sort games": "sort",
    "sorting": "sort",
    "math": "math",
    "maths": "math",
    "math games": "math",
    "puzzle": "puzzle",
    "puzzle games": "puzzle"
  };

  function isKnown(key) {
    return pills.some(function (pill) { return pill.dataset.filter === key; });
  }

  function normalise(raw) {
    var key = String(raw || "").trim().toLowerCase().replace(/\+/g, " ");
    return LABELS[key] || key;
  }

  function hashKey() {
    return normalise((window.location.hash || "").replace("#", ""));
  }

  function queryKey() {
    var params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (e) {
      return "";
    }
    return normalise(params.get("cat") || params.get("category") || "");
  }

  function apply(key, remember) {
    pills.forEach(function (pill) {
      var on = pill.dataset.filter === key;
      pill.classList.toggle("is-active", on);
      pill.setAttribute("aria-pressed", String(on));
    });

    var shown = 0;
    cards.forEach(function (card) {
      var cats = (card.dataset.cats || "").split(/\s+/);
      var match = key === "all" || cats.indexOf(key) !== -1;
      card.classList.toggle("is-hidden", !match);
      if (match) shown++;
    });

    if (countEl) countEl.textContent = shown === 1 ? "1 game" : shown + " games";
    if (clearEl) clearEl.hidden = key === "all";

    /* The ribbon is on this page too, so keep its pressed state in step. */
    ribbonLinks.forEach(function (link) {
      var target = normalise((link.getAttribute("href") || "").split("#")[1]);
      if (target === key && key !== "all") link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    if (remember && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + (key === "all" ? "" : "#" + key));
    }
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () { apply(pill.dataset.filter, true); });
  });

  /* A same-page #category click arrives here instead of reloading. */
  window.addEventListener("hashchange", function () {
    var key = hashKey();
    apply(isKnown(key) ? key : "all", false);
  });

  var requested = hashKey() || queryKey();
  apply(isKnown(requested) ? requested : "all", false);
})();
