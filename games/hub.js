/* Games hub: category pills, live result count and ?cat=/#key deep links.
   The cards carry space-separated keys in data-cats, so a game can sit in more
   than one category (Sudoku is also a number game, the crossword also a word
   game). Pills use the same keys in data-filter. */
(function () {
  "use strict";

  var bar = document.getElementById("hubCatBar");
  var grid = document.getElementById("hubGamesGrid");
  if (!bar || !grid) return;

  var pills = Array.prototype.slice.call(bar.querySelectorAll(".cat-pill"));
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".game-card"));
  var countEl = document.getElementById("hubCount");

  /* Readable labels so links elsewhere can say ?cat=Word%20Games. */
  var LABELS = {
    "all categories": "all",
    "all": "all",
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

    if (remember && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + (key === "all" ? "" : "#" + key));
    }
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () { apply(pill.dataset.filter, true); });
  });

  var requested = "";
  try {
    requested = (new URLSearchParams(window.location.search).get("cat") || "").trim().toLowerCase();
  } catch (e) {
    requested = "";
  }
  var key = LABELS[requested] || requested;
  if (!key) key = (window.location.hash || "").replace("#", "").toLowerCase();

  var known = pills.some(function (pill) { return pill.dataset.filter === key; });
  apply(known ? key : "all", false);
})();
