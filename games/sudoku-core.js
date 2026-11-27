/* Shared Sudoku engine for every Sudoku page under /games/.

   Five pages used to carry their own copy of the same board code: build a grid
   of cells, wire clicks and arrow keys, mark duplicates, run a number pad,
   time the solve and count the wins. The copies had drifted apart — Pocket
   Sudoku, for instance, hid digits from a shuffled base grid with no
   uniqueness check, so a second valid solution was marked wrong by Check.

   This module owns all of that. Puzzles come from MG.sudoku() in games.js,
   which only removes a given when the grid still has exactly one solution.
   Each page keeps its own heading, copy, controls and storage keys.

   Usage:
     var game = MGSudoku.create({
       size: 9, boxH: 3, boxW: 3, givens: 46,
       grid: boardEl, pad: padEl, status: statusEl,
       time: timerEl, filled: progressEl,
       best: { key: "mg-sudoku-best", el: bestEl },
       wins: { key: "mg-sudoku-wins", el: winsEl },
       streak: { key: "mg-sudoku-streak", el: streakEl },
       mistakes: { el: mistakesEl }
     });
     game.newPuzzle(); game.check(); game.clearEntries();
*/
(function (global) {
  "use strict";

  var MG = global.MG;
  if (!MG || !MG.sudoku) throw new Error("sudoku-core.js needs games.js loaded first");

  function formatTime(seconds) {
    return MG.formatTime ? MG.formatTime(seconds) : seconds + "s";
  }

  function create(opts) {
    opts = opts || {};
    var size = opts.size || 9;
    var boxH = opts.boxH || 3;
    var boxW = opts.boxW || 3;
    var defaultGivens = opts.givens == null ? Math.round(size * size * 0.55) : opts.givens;

    var gridEl = opts.grid;
    var padEl = opts.pad || null;
    var statusEl = opts.status || null;
    var timeEl = opts.time || null;
    var filledEl = opts.filled || null;
    var padCols = opts.padCols || size;
    var eraseSpan = opts.eraseSpan || padCols;
    var messages = opts.messages || {};
    var hooks = opts.on || {};

    var solution = [];
    var values = [];
    var fixed = [];
    var cells = [];
    var selected = { r: 0, c: 0 };
    var mistakes = 0;
    var finished = false;
    var started = 0;
    var ticker = null;
    var seconds = 0;

    gridEl.classList.add("sudoku-grid");
    gridEl.setAttribute("data-size", String(size));
    if (opts.theme) gridEl.setAttribute("data-theme", opts.theme);
    gridEl.style.setProperty("--sg-cols", String(size));
    gridEl.setAttribute("role", "grid");
    gridEl.tabIndex = 0;

    function say(text) {
      if (statusEl) statusEl.textContent = text;
    }

    function hook(name, payload) {
      if (typeof hooks[name] === "function") hooks[name](payload);
    }

    function readStat(read, fallback) {
      try { return read(); } catch (e) { return fallback; }
    }

    function syncStats() {
      if (opts.best && opts.best.el) {
        var best = readStat(function () { return MG.getBest(opts.best.key, 0); }, 0);
        opts.best.el.textContent = best ? formatTime(best) : "—";
      }
      if (opts.wins && opts.wins.el) {
        var wins = readStat(function () { return MG.getBest(opts.wins.key, 0); }, 0);
        opts.wins.el.textContent = String(wins);
      }
      if (opts.streak && opts.streak.el) {
        var streak = readStat(function () { return MG.getStreak(opts.streak.key); }, null);
        opts.streak.el.textContent = String(streak && streak.count ? streak.count : 0);
      }
    }

    function formatClock(value) {
      return formatTime(value);
    }

    function stopClock() {
      if (ticker) { global.clearInterval(ticker); ticker = null; }
    }

    function resetClock() {
      stopClock();
      started = 0;
      seconds = 0;
      if (timeEl) timeEl.textContent = formatClock(0);
    }

    function startClock() {
      if (finished) return;
      if (!started) started = Date.now();
      if (!timeEl || ticker) return;
      ticker = global.setInterval(function () {
        seconds = Math.floor((Date.now() - started) / 1000);
        timeEl.textContent = formatClock(seconds);
      }, 500);
    }

    function elapsed() {
      if (!started) return 0;
      return Math.floor((Date.now() - started) / 1000);
    }

    function isPeer(r, c, sr, sc) {
      return r === sr || c === sc ||
        (Math.floor(r / boxH) === Math.floor(sr / boxH) &&
         Math.floor(c / boxW) === Math.floor(sc / boxW));
    }

    function buildGrid() {
      gridEl.innerHTML = "";
      cells = [];
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          var cell = document.createElement("button");
          cell.type = "button";
          cell.className = "sudoku-cell";
          cell.tabIndex = -1;               // the grid itself is the single tab stop
          cell.setAttribute("role", "gridcell");
          cell.dataset.r = String(r);
          cell.dataset.c = String(c);
          if ((c + 1) % boxW === 0 && c < size - 1) cell.classList.add("is-box-right");
          if ((r + 1) % boxH === 0 && r < size - 1) cell.classList.add("is-box-bottom");
          gridEl.appendChild(cell);
          cells.push(cell);
        }
      }
      gridEl.addEventListener("click", onGridClick);
      gridEl.addEventListener("keydown", onKeyDown);
    }

    function onGridClick(event) {
      var cell = event.target.closest ? event.target.closest(".sudoku-cell") : null;
      if (!cell) return;
      select(Number(cell.dataset.r), Number(cell.dataset.c));
    }

    function select(r, c) {
      selected = { r: r, c: c };
      paint();
      if (fixed[r] && fixed[r][c]) say(messages.given || "That digit is a given. Pick an empty cell.");
      gridEl.focus();
    }

    function paint() {
      var sr = selected ? selected.r : -1;
      var sc = selected ? selected.c : -1;
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          var cell = cells[r * size + c];
          if (!cell) continue;
          var value = values[r][c];
          cell.textContent = value ? String(value) : "";
          cell.classList.toggle("is-given", !!fixed[r][c]);
          cell.classList.toggle("is-selected", r === sr && c === sc);
          cell.classList.toggle("is-peer", !(r === sr && c === sc) && sr >= 0 && isPeer(r, c, sr, sc));
          cell.setAttribute("aria-label", "Row " + (r + 1) + ", column " + (c + 1) +
            (value ? ", " + value : ", empty") + (fixed[r][c] ? ", given" : ""));
        }
      }
      markConflicts();
      paintFilled();
    }

    /* Two of the same digit in one row, column or box: a conflict, shown in red
       as soon as it appears. */
    function markConflicts() {
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          var cell = cells[r * size + c];
          if (!cell) continue;
          cell.classList.remove("is-conflict");
          var value = values[r][c];
          if (!value) continue;
          var bad = false;
          var i;
          for (i = 0; i < size && !bad; i++) {
            if (i !== c && values[r][i] === value) bad = true;
            if (i !== r && values[i][c] === value) bad = true;
          }
          var r0 = Math.floor(r / boxH) * boxH;
          var c0 = Math.floor(c / boxW) * boxW;
          for (var br = r0; br < r0 + boxH && !bad; br++) {
            for (var bc = c0; bc < c0 + boxW && !bad; bc++) {
              if ((br !== r || bc !== c) && values[br][bc] === value) bad = true;
            }
          }
          if (bad) cell.classList.add("is-conflict");
        }
      }
    }

    function paintFilled() {
      if (!filledEl) return;
      var filled = 0;
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) if (values[r][c]) filled++;
      }
      filledEl.textContent = opts.filledFormat
        ? opts.filledFormat(filled, size * size)
        : filled + "/" + (size * size);
    }

    function place(digit) {
      if (finished || !selected) return;
      var r = selected.r, c = selected.c;
      if (fixed[r][c]) {
        say(messages.given || "That digit is a given. Pick an empty cell.");
        return;
      }
      values[r][c] = digit;
      startClock();
      paint();
      hook("place", { r: r, c: c, digit: digit });
      maybeFinish();
    }

    function erase() {
      if (finished || !selected) return;
      var r = selected.r, c = selected.c;
      if (fixed[r][c]) return;
      values[r][c] = 0;
      paint();
    }

    function check() {
      if (!solution.length) return 0;
      var wrong = 0;
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          var cell = cells[r * size + c];
          if (!cell) continue;
          cell.classList.remove("is-wrong");
          if (values[r][c] && values[r][c] !== solution[r][c]) {
            cell.classList.add("is-wrong");
            wrong++;
          }
        }
      }
      if (wrong && opts.mistakes) {
        mistakes += wrong;
        if (opts.mistakes.el) opts.mistakes.el.textContent = String(mistakes);
      }
      if (!wrong) {
        say(messages.checkOk || "Nothing wrong so far. Keep going.");
      } else if (opts.mistakes) {
        say(wrong + (wrong === 1 ? " digit is" : " digits are") + " in the wrong place (marked red).");
      } else {
        say(wrong + " wrong so far, marked red.");
      }
      hook("check", { wrong: wrong, mistakes: mistakes });
      return wrong;
    }

    function maybeFinish() {
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          if (values[r][c] !== solution[r][c]) return;
        }
      }
      finished = true;
      seconds = elapsed();
      stopClock();
      if (timeEl) timeEl.textContent = formatClock(seconds);

      var improved = false;
      if (opts.best && opts.best.key && seconds > 0) {
        improved = MG.saveBest(opts.best.key, seconds, false);
        syncStats();
      }
      var wins = 0;
      if (opts.wins && opts.wins.key) {
        var stored = readStat(function () { return MG.getBest(opts.wins.key, 0); }, 0);
        wins = (Number(stored) || 0) + 1;
        MG.store.set(opts.wins.key, wins);
        if (opts.wins.el) opts.wins.el.textContent = String(wins);
      }
      var streak = 0;
      if (opts.streak && opts.streak.key) {
        streak = MG.bumpStreak(opts.streak.key);
        if (opts.streak.el) opts.streak.el.textContent = String(streak);
      }

      for (var i = 0; i < cells.length; i++) cells[i].classList.add("is-solved");

      var text = (typeof messages.solved === "function")
        ? messages.solved({ seconds: seconds, mistakes: mistakes, wins: wins, streak: streak, improved: improved })
        : "Solved in " + formatClock(seconds) + "." +
          (improved ? " Your fastest yet." : "") +
          (wins ? " Grids solved here: " + wins + "." : "") +
          (streak ? " Daily streak: " + streak + "." : "");
      say(text);
      hook("solve", { seconds: seconds, mistakes: mistakes, wins: wins, streak: streak, improved: improved });
    }

    function onKeyDown(event) {
      if (!selected) return;
      var r = selected.r, c = selected.c;
      var handled = true;
      if (event.key === "ArrowUp") select(Math.max(0, r - 1), c);
      else if (event.key === "ArrowDown") select(Math.min(size - 1, r + 1), c);
      else if (event.key === "ArrowLeft") select(r, Math.max(0, c - 1));
      else if (event.key === "ArrowRight") select(r, Math.min(size - 1, c + 1));
      else if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") erase();
      else if (/^[1-9]$/.test(event.key) && Number(event.key) <= size) place(Number(event.key));
      else handled = false;
      if (handled) event.preventDefault();
    }

    function buildPad() {
      if (!padEl) return;
      padEl.classList.add("sudoku-pad");
      if (opts.theme) padEl.setAttribute("data-theme", opts.theme);
      padEl.style.setProperty("--sg-pad-cols", String(padCols));
      padEl.style.setProperty("--sg-erase-span", String(eraseSpan));

      if (padEl.querySelector("button")) {          // page supplied its own buttons
        Array.prototype.forEach.call(padEl.querySelectorAll("button"), function (btn) {
          var n = Number(btn.getAttribute("data-n"));
          btn.addEventListener("click", function () { n ? place(n) : erase(); });
        });
        return;
      }

      padEl.innerHTML = "";
      for (var d = 1; d <= size; d++) {
        (function (digit) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = String(digit);
          btn.setAttribute("aria-label", "Enter " + digit);
          btn.addEventListener("click", function () { place(digit); });
          padEl.appendChild(btn);
        })(d);
      }
      var clear = document.createElement("button");
      clear.type = "button";
      clear.className = "is-erase";
      clear.textContent = opts.eraseLabel || "Erase";
      clear.setAttribute("aria-label", "Erase the selected cell");
      clear.addEventListener("click", erase);
      padEl.appendChild(clear);
    }

    function newPuzzle(options) {
      options = options || {};
      var givens = options.givens == null ? defaultGivens : options.givens;
      var seed = options.seed || (typeof opts.seed === "function" ? opts.seed() : undefined);
      var made = MG.sudoku(size, boxH, boxW, givens, seed);

      solution = made.solution;
      values = made.puzzle.map(function (row) { return row.slice(); });
      fixed = made.puzzle.map(function (row) {
        return row.map(function (v) { return v !== 0; });
      });
      selected = { r: 0, c: 0 };
      mistakes = 0;
      finished = false;
      for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove("is-wrong", "is-solved");
      }
      resetClock();
      if (opts.mistakes && opts.mistakes.el) opts.mistakes.el.textContent = "0";
      paint();
      syncStats();
      say(messages.start || "Pick a cell, then a digit.");
      hook("newPuzzle", { givens: givens });
      return made;
    }

    function clearEntries() {
      for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
          if (!fixed[r][c]) values[r][c] = 0;
        }
      }
      finished = false;
      for (var i = 0; i < cells.length; i++) cells[i].classList.remove("is-wrong", "is-solved");
      resetClock();
      paint();
      say(messages.cleared || "Your entries are cleared. The givens stay.");
    }

    buildGrid();
    buildPad();

    newPuzzle();

    var api = {
      newPuzzle: newPuzzle,
      clearEntries: clearEntries,
      check: check,
      erase: erase,
      select: select,
      place: place,
      focus: function () { gridEl.focus(); },
      /* Used by the QA harness and handy from the console. */
      snapshot: function () {
        return {
          size: size,
          values: values.map(function (row) { return row.slice(); }),
          solution: solution.map(function (row) { return row.slice(); }),
          fixed: fixed.map(function (row) { return row.slice(); }),
          selected: { r: selected.r, c: selected.c },
          mistakes: mistakes,
          finished: finished,
          seconds: finished ? seconds : elapsed()
        };
      }
    };

    /* The last board created on the page, so a console or a QA harness can
       read the solution and drive the grid without guessing. */
    global.MGSudoku.last = api;
    return api;
  }

  global.MGSudoku = { create: create };
})(window);
