/* Games hub: category filtering, catalogue order and sorting.
   Standalone — the game pages do not use this file. */
(function () {
  "use strict";

  var grid = document.getElementById("gameGrid");
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-cats]"));
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var empty = document.getElementById("filterEmpty");
  var count = document.getElementById("filterCount");
  var sortEl = document.getElementById("sort");

  if (!cards.length) return;

  /* Remember the hand-written order so "Catalogue order" is restorable. */
  cards.forEach(function (card, i) { card.dataset.order = String(i); });

  var filter = "all";

  function matches(card) {
    if (filter === "all") return true;
    return (card.dataset.cats || "").split(/\s+/).indexOf(filter) !== -1;
  }

  function sorted(list) {
    var mode = sortEl ? sortEl.value : "catalogue";
    var copy = list.slice();
    if (mode === "az") {
      copy.sort(function (a, b) {
        return a.dataset.title.toLowerCase().localeCompare(b.dataset.title.toLowerCase());
      });
    } else if (mode === "category") {
      copy.sort(function (a, b) {
        var c = a.dataset.cat.localeCompare(b.dataset.cat);
        if (c !== 0) return c;
        return a.dataset.title.localeCompare(b.dataset.title);
      });
    } else {
      copy.sort(function (a, b) { return Number(a.dataset.order) - Number(b.dataset.order); });
    }
    return copy;
  }

  function render() {
    var visible = cards.filter(matches);
    var ordered = sorted(visible);

    /* Reordering the DOM renumbers the CSS counters as well. */
    ordered.forEach(function (card) {
      card.hidden = false;
      grid.appendChild(card);
    });
    cards.forEach(function (card) {
      if (visible.indexOf(card) === -1) card.hidden = true;
    });

    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
    });

    if (empty) empty.hidden = visible.length !== 0;
    if (count) count.textContent = visible.length === 1 ? "1 game" : visible.length + " games";
  }

  function setFilter(next, updateHash) {
    filter = next;
    render();
    if (updateHash && window.history && window.history.replaceState) {
      var hash = next === "all" ? "" : "#" + next;
      window.history.replaceState(null, "", window.location.pathname + hash);
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { setFilter(chip.dataset.filter, true); });
  });

  if (sortEl) {
    sortEl.addEventListener("change", function () { render(); });
  }

  /* Category links elsewhere on the site use readable labels (?cat=Word%20Games);
     the rail speaks in short keys, so translate before falling back to the hash. */
  var LABELS = {
    "brain games": "brain",
    "daily games": "daily",
    "number games": "number",
    "word games": "word",
    "crosswords": "crossword",
    "sudoku": "sudoku",
    "memory games": "memory",
    "sort games": "sort",
    "math games": "math",
    "puzzle games": "puzzle"
  };

  var requested = "";
  try {
    requested = (new URLSearchParams(window.location.search).get("cat") || "").trim().toLowerCase();
  } catch (e) {
    requested = "";
  }
  var fromQuery = LABELS[requested] || requested;
  var fromHash = (window.location.hash || "").replace("#", "");
  var wanted = fromQuery || fromHash;
  var known = chips.some(function (chip) { return chip.dataset.filter === wanted; });
  setFilter(known ? wanted : "all", false);
})();
