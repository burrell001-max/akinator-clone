#!/usr/bin/env node
/* Win-path QA for the MindGenieAI arcade.

     node tools/qa/win-paths.mjs            # every scenario
     node tools/qa/win-paths.mjs --only=echo,memory

   Each scenario loads a game in headless Chrome, plays it from the initial
   state to its winning condition through the real controls, then checks the
   win message, what was written to localStorage, and that the replay/reset
   path leaves a clean board. Data the page hides from the player (a crossword
   answer, a Sudoku solution) is read from the page's own source or from the
   documented QA snapshot rather than hard-coded here.
*/

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Chrome, ROOT, serve, runScenario } from "./lib.mjs";

const source = (path) => readFile(join(ROOT, path), "utf8");

/* ── Facts read out of the pages, so the suite never drifts from them ─────── */
const wordGuessHtml = await source("games/word-guess.html");
const WORDS = (wordGuessHtml.match(/var WORDS = \("([^"]+)"\)\.split\(" "\)/) || [])[1].split(" ");
const guessAnswer = WORDS[Math.floor(0.5 * WORDS.length)];

function pairsFrom(html, pattern) {
  const out = {};
  for (const match of html.matchAll(pattern)) out[match[1]] = match[2];
  return out;
}

const crosswordClues = pairsFrom(await source("games/crossword-clues.html"), /\{ clue: "([^"]+)", answer: "([A-Z]+)" \}/g);
const crosswordAnagrams = pairsFrom(await source("games/crossword-anagrams.html"), /\{ clue: "([^"]+)", answer: "([A-Z]+)" \}/g);
const crosswordDaily = pairsFrom(await source("games/crossword-daily.html"), /\{ clue: "([^"]+)", answer: "([A-Z]+)" \}/g);

const miniSolution = JSON.parse(
  "[" + (await source("games/crossword-mini.html")).match(/var SOLUTION = \[([\s\S]*?)\];/)[1] + "]"
);
const detectiveWords = [...(await source("games/crossword-detective.html"))
  .matchAll(/\{ answer: "([A-Z]+)", clue: "/g)].map((match) => match[1]);

const timelineYears = {};
for (const match of (await source("games/sort-timeline.html"))
  .matchAll(/\{ name: "([^"]+)", year: (\d+), theme: "/g)) {
  timelineYears[match[1]] = Number(match[2]);
}

const anagramByLetters = {};
for (const match of (await source("games/word-anagram.html")).matchAll(/\{ w: "([a-z]+)", c: "/g)) {
  const letters = match[1].split("").sort().join("");
  if (anagramByLetters[letters]) {
    throw new Error(`Word Anagram has two answers for ${letters}: ${anagramByLetters[letters]} and ${match[1]}`);
  }
  anagramByLetters[letters] = match[1];
}

/* ── Page-side helpers reused by several scenarios ────────────────────────── */
const MATH_HELPERS = `
function evalExpr(text) {
  const parts = text.replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/")
    .replace(/=/, " ").trim().split(" ").filter(Boolean);
  if (parts.length !== 3) return null;
  const a = Number(parts[0]), b = Number(parts[2]);
  if (!isFinite(a) || !isFinite(b)) return null;
  if (parts[1] === "+") return a + b;
  if (parts[1] === "-") return a - b;
  if (parts[1] === "*") return a * b;
  if (parts[1] === "/") return a / b;
  return null;
}
function solveEquation(text) {
  const parts = text.replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/")
    .trim().split(" ").filter(Boolean);
  if (parts.length !== 5 || parts[3] !== "=") return null;
  const a = parts[0] === "?" ? null : Number(parts[0]);
  const b = parts[2] === "?" ? null : Number(parts[2]);
  const c = parts[4] === "?" ? null : Number(parts[4]);
  const op = parts[1];
  if (op === "+") { if (a === null) return c - b; if (b === null) return c - a; return a + b; }
  if (op === "-") { if (a === null) return c + b; if (b === null) return a - c; return a - b; }
  if (op === "*") { if (a === null) return c / b; if (b === null) return c / a; return a * b; }
  if (op === "/") { if (a === null) return c * b; if (b === null) return a / c; return a / b; }
  return null;
}
`;

const scenarios = [];
const add = (scenario) => scenarios.push(scenario);

/* ── Hub: the ribbon has to land on a filtered view ──────────────────────── */
add({
  id: "hub-links",
  name: "Hub: ribbon and pill category links",
  path: "/games/",
  drive: () => `
  const q = __qa;
  const cards = q.qa(".game-card");
  const visible = () => q.qa(".game-card").filter((card) => card.offsetParent !== null).length;
  const expected = (key) => cards.filter((card) => card.dataset.cats.split(" ").indexOf(key) !== -1).length;
  const initial = { all: visible(), count: q.txt("#hubCount"), clearHidden: q.q("#hubClear").hidden };
  const steps = {};
  for (const key of ["memory", "sudoku", "word", "puzzle"]) {
    q.clickSel('.mg-cat-ribbon a[href="/games/#' + key + '"]');
    await q.until(() => location.hash === "#" + key && q.q('.cat-pill[data-filter="' + key + '"]').getAttribute("aria-pressed") === "true", "filter " + key);
    await q.sleep(60);
    steps[key] = {
      visible: visible(),
      expected: expected(key),
      count: q.txt("#hubCount"),
      clearVisible: !q.q("#hubClear").hidden,
      ribbonCurrent: q.q('.mg-cat-ribbon a[aria-current="page"]') ? q.q('.mg-cat-ribbon a[aria-current="page"]').getAttribute("href") : null
    };
  }
  q.clickSel('.cat-pill[data-filter="all"]');
  await q.sleep(60);
  const reset = { all: visible(), hash: location.hash, clearHidden: q.q("#hubClear").hidden };
  const ok = initial.all === 30 && initial.count === "30 games" && initial.clearHidden
    && Object.keys(steps).every((key) => steps[key].visible === steps[key].expected
      && steps[key].visible > 0 && steps[key].visible < 30
      && steps[key].count === steps[key].visible + " games"
      && steps[key].clearVisible
      && steps[key].ribbonCurrent === "/games/#" + key)
    && reset.all === 30 && reset.hash === "" && reset.clearHidden;
  return { ok, initial, steps, reset };
`
});

add({
  id: "hub-hash",
  name: "Hub: arriving on /games/#crossword",
  path: "/games/",
  query: "#crossword",
  drive: () => `
  const q = __qa;
  const cards = q.qa(".game-card");
  const visible = cards.filter((card) => card.offsetParent !== null).length;
  const expected = cards.filter((card) => card.dataset.cats.split(" ").indexOf("crossword") !== -1).length;
  return {
    ok: visible === expected && visible === 5 && q.txt("#hubCount") === "5 games"
      && q.q('.cat-pill[data-filter="crossword"]').getAttribute("aria-pressed") === "true"
      && !q.q("#hubClear").hidden,
    visible, expected, count: q.txt("#hubCount")
  };
`
});

add({
  id: "hub-query",
  name: "Hub: arriving on ?cat=Word%20Games",
  path: "/games/",
  query: "?cat=Word%20Games",
  drive: () => `
  const q = __qa;
  const cards = q.qa(".game-card");
  const visible = cards.filter((card) => card.offsetParent !== null).length;
  const expected = cards.filter((card) => card.dataset.cats.split(" ").indexOf("word") !== -1).length;
  return {
    ok: visible === expected && q.q('.cat-pill[data-filter="word"]').getAttribute("aria-pressed") === "true",
    visible, expected, count: q.txt("#hubCount")
  };
`
});

/* ── Memory family ───────────────────────────────────────────────────────── */
add({
  id: "memory",
  name: "Memory Match: clear all six pairs",
  path: "/games/memory.html",
  drive: () => `
  const q = __qa;
  const cards = q.qa("#board .card");
  if (cards.length !== 12) return { ok: false, why: "expected 12 cards, found " + cards.length };
  const groups = {};
  cards.forEach((card) => { (groups[card.dataset.symbol] = groups[card.dataset.symbol] || []).push(card); });
  const symbols = Object.keys(groups);
  if (symbols.length !== 6) return { ok: false, why: "expected 6 symbols, found " + symbols.length };
  for (const symbol of symbols) {
    groups[symbol][0].click();
    groups[symbol][1].click();
  }
  const status = q.txt("#status");
  const best = q.ls("mg-memory-best");
  const timerBefore = q.txt("#timer");
  await q.sleep(1200);
  const timerAfter = q.txt("#timer");
  q.clickSel("#restart");
  await q.sleep(60);
  const after = {
    moves: q.txt("#moves"),
    pairs: q.txt("#pairs"),
    status: q.txt("#status"),
    cards: q.qa("#board .card").length,
    matched: q.qa("#board .card.matched").length,
    best: q.txt("#best")
  };
  const ok = status.indexOf("Cleared in 6 moves") === 0
    && best === "6"
    && timerBefore === timerAfter
    && after.moves === "Moves: 0" && after.pairs === "Pairs: 0 / 6"
    && after.status === "" && after.cards === 12 && after.matched === 0
    && after.best === "Best: 6 moves";
  return { ok, status, best, timerBefore, timerAfter, after };
`
});

add({
  id: "memory-echo",
  name: "Pattern Echo: clear three rounds, replay cleanly",
  path: "/games/memory-echo.html",
  drive: () => `
  const q = __qa;
  async function readSequence(length) {
    const seen = [];
    let previous = 0;
    const started = Date.now();
    while (seen.length < length && Date.now() - started < 20000) {
      const lit = q.qa("#pads .pad.lit");
      if (lit.length === 1 && previous === 0) seen.push(Number(lit[0].dataset.pad));
      previous = lit.length;
      await q.sleep(15);
    }
    if (seen.length !== length) throw new Error("saw " + seen.length + " of " + length + " flashes");
    return seen;
  }
  q.clickSel("#start");
  const levels = [];
  for (let level = 1; level <= 3; level++) {
    const sequence = await readSequence(level);
    await q.until(() => !q.q("#pads .pad").disabled, "pads enabled");
    for (const pad of sequence) {
      q.qa("#pads .pad")[pad].click();
      await q.sleep(20);
    }
    levels.push(q.txt("#level"));
    if (level < 3) await q.sleep(950);
  }
  const best = q.ls("mg-echo-best");
  const status = q.txt("#status");
  q.clickSel("#start");
  await q.sleep(1500);
  const after = { level: q.txt("#level"), disabled: q.qa("#pads .pad").every((pad) => pad.disabled), status: q.txt("#status") };
  return {
    ok: best === "3" && levels.join(",") === "1,2,3" && status.indexOf("3 steps") !== -1 && after.level === "1",
    levels, best, status, after
  };
`
});

add({
  id: "memory-grid",
  name: "Grid Flash: clear two levels, restart mid-round",
  path: "/games/memory-grid.html",
  drive: () => `
  const q = __qa;
  async function play() {
    const lit = await q.until(() => {
      const on = q.qa(".tile.is-lit");
      return on.length ? on.map((tile) => tile.dataset.index) : null;
    }, "lit squares", 5000);
    await q.until(() => q.qa(".tile.is-lit").length === 0 && !q.q(".tile").disabled, "clickable", 8000);
    for (const index of lit) {
      q.qa(".tile")[Number(index)].click();
      await q.sleep(10);
    }
    return lit.length;
  }
  q.clickSel("#start");
  const cleared = [await play()];
  await q.sleep(1000);
  cleared.push(await play());
  const best = q.ls("mg-gridflash-best");
  const status = q.txt("#status");
  q.clickSel("#start");
  await q.sleep(1400);
  const after = { level: q.txt("#level"), count: q.txt("#count"), best: q.txt("#best") };
  return {
    ok: cleared.join(",") === "3,4" && best === "2" && after.level === "1" && after.count === "3",
    cleared, best, status, after
  };
`
});

add({
  id: "memory-numbers",
  name: "Digit Echo: three correct strings",
  path: "/games/memory-numbers.html",
  drive: () => `
  const q = __qa;
  const lengths = [];
  q.clickSel("#start");
  for (let round = 0; round < 3; round++) {
    const digits = await q.until(() => {
      const shown = q.qa("#digits .digit:not(.is-hidden)");
      return shown.length ? shown.map((node) => node.textContent).join("") : null;
    }, "digits shown", 8000);
    await q.until(() => !q.q("#answer").disabled, "answer enabled", 9000);
    q.set("#answer", digits);
    q.clickSel("#submit");
    lengths.push(digits.length);
    await q.sleep(round === 2 ? 120 : 900);
  }
  const best = q.ls("mg-digitecho-best");
  const streak = q.ls("mg-digitecho-streak");
  q.clickSel("#start");
  await q.sleep(1200);
  const after = { round: q.txt("#round"), length: q.txt("#length"), best: q.txt("#best") };
  return {
    ok: lengths.join(",") === "3,4,5" && best === "5" && Number(streak) >= 3
      && after.round === "1" && after.length === "3",
    lengths, best, streak, after
  };
`
});

add({
  id: "memory-order",
  name: "Order Recall: clear three rounds",
  path: "/games/memory-order.html",
  drive: () => `
  const q = __qa;
  const rounds = [];
  q.clickSel("#start");
  for (let round = 1; round <= 3; round++) {
    const order = await q.until(() => {
      const items = q.qa("#lane .item");
      return items.length >= 4 ? items.map((item) => item.textContent.replace(/^\\s*\\d+\\s*/, "")) : null;
    }, "shapes shown", 8000);
    await q.until(() => q.qa("#lane .item.is-clickable").length >= 4, "scattered", 12000);
    for (const glyph of order) {
      const tile = q.qa("#lane .item.is-clickable").filter((node) => !node.disabled && node.textContent.trim() === glyph)[0];
      if (!tile) throw new Error("no scattered tile for " + glyph);
      tile.click();
      await q.sleep(15);
    }
    rounds.push(q.txt("#round"));
    await q.sleep(1000);
  }
  const best = q.ls("mg-orderrecall-best");
  const status = q.txt("#status");
  return { ok: best === "6" && rounds.join(",") === "1,2,3", rounds, best, status };
`
});

/* ── Puzzle, word and crossword games ───────────────────────────────────── */
add({
  id: "puzzle-slide",
  name: "Slide Fifteen: solve a 3x3 board",
  path: "/games/puzzle-slide.html",
  drive: () => `
  const q = __qa;
  const goalKey = "123456780";
  function boardState() {
    return Array.from(q.q("#board").children).map((child) =>
      child.classList.contains("tile") ? Number(child.textContent) : 0
    ).join("");
  }
  function solve(start) {
    const goal = "123456780";
    if (start === goal) return [];
    const parent = new Map([[start, null]]);
    const via = new Map();
    const queue = [start];
    for (let head = 0; head < queue.length; head++) {
      const state = queue[head];
      const blank = state.indexOf("0");
      const row = Math.floor(blank / 3), col = blank % 3;
      const next = [];
      if (row > 0) next.push(blank - 3);
      if (row < 2) next.push(blank + 3);
      if (col > 0) next.push(blank - 1);
      if (col < 2) next.push(blank + 1);
      for (const index of next) {
        const cells = state.split("");
        cells[blank] = cells[index];
        cells[index] = "0";
        const joined = cells.join("");
        if (parent.has(joined)) continue;
        parent.set(joined, state);
        via.set(joined, index);
        if (joined === goal) {
          const path = [];
          let cursor = joined;
          while (parent.get(cursor) !== null) {
            path.push(via.get(cursor));
            cursor = parent.get(cursor);
          }
          return path.reverse();
        }
        queue.push(joined);
      }
    }
    return null;
  }
  const start = boardState();
  const path = solve(start);
  if (!path) return { ok: false, why: "unsolvable board " + start };
  for (const index of path) {
    const tile = q.q('#board button.tile[data-index="' + index + '"]');
    if (!tile) throw new Error("missing tile at " + index);
    tile.click();
    await q.sleep(4);
  }
  const status = q.txt("#status");
  const moves = q.txt("#moves");
  const best = q.ls("mg-slide-best-3");
  q.clickSel("#restart");
  await q.sleep(60);
  const after = { moves: q.txt("#moves"), status: q.txt("#status"), home: q.txt("#home"), best: q.txt("#best") };
  return {
    ok: status.indexOf("Solved in " + path.length) === 0 && moves === String(path.length)
      && best === String(path.length) && after.moves === "0" && after.status === "",
    path: path.length, moves, status, best, after, goalKey
  };
`
});

add({
  id: "word-guess",
  name: "Word Guess: answer on the first guess",
  path: "/games/word-guess.html",
  preload: "Math.random = () => 0.5;",
  params: { answer: guessAnswer },
  drive: (params) => `
  const q = __qa;
  const answer = ${JSON.stringify(params.answer)};
  for (const letter of answer) q.key(letter);
  q.key("Enter");
  const status = await q.until(() => {
    const text = q.txt("#status");
    return text.indexOf("Got it") === 0 ? text : null;
  }, "win message", 5000);
  for (let i = 0; i < 6; i++) q.key("a");
  q.key("Enter");
  await q.sleep(150);
  const rows = q.qa(".row").map((row) => Array.from(row.children).map((cell) => cell.textContent).join(""));
  const filledRows = rows.filter((row) => row.length > 0).length;
  return {
    ok: status.indexOf("Got it in 1 guess") === 0 && filledRows === 1 && rows[1] === "",
    answer, status, filledRows, rows
  };
`
});

add({
  id: "crossword-mini",
  name: "Mini Crossword: fill the word square",
  path: "/games/crossword-mini.html",
  params: { solution: miniSolution },
  drive: (params) => `
  const q = __qa;
  const solution = ${JSON.stringify(params.solution)};
  const cells = q.qa("#grid input.xcell");
  if (cells.length !== 36) return { ok: false, why: "expected 36 cells, found " + cells.length };
  cells.forEach((cell, index) => {
    const letter = solution[Math.floor(index / 6)][index % 6];
    cell.focus();
    cell.value = letter;
    cell.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const status = q.txt("#status");
  const best = q.ls("mg-word-square-best");
  const filled = q.txt("#filled");
  const replayLabel = q.txt("#clear");
  q.clickSel("#clear");
  await q.sleep(60);
  const after = {
    empty: q.qa("#grid input.xcell").filter((cell) => cell.value !== "").length,
    status: q.txt("#status"),
    cleared: q.q("#grid input.xcell").disabled
  };
  return {
    ok: status.indexOf("Solved in") === 0 && best !== null && filled === "36/36"
      && replayLabel === "Play again" && after.empty === 0 && after.status === "" && !after.cleared,
    status, best, filled, replayLabel, after
  };
`
});

add({
  id: "crossword-detective",
  name: "Crossword Detective: repair the tampered grid",
  path: "/games/crossword-detective.html",
  params: { words: detectiveWords },
  drive: (params) => `
  const q = __qa;
  const words = ${JSON.stringify(params.words)};
  const cells = q.qa("#grid input.cell");
  if (cells.length !== 25) return { ok: false, why: "expected 25 cells, found " + cells.length };
  cells.forEach((cell, index) => {
    cell.focus();
    cell.value = words[Math.floor(index / 5)][index % 5];
    cell.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const status = q.txt("#status");
  const best = q.ls("mg-detective-best");
  q.clickSel("#newCase");
  await q.sleep(60);
  const after = { checks: q.txt("#checks"), wrong: q.txt("#wrong"), status: q.txt("#status") };
  return {
    ok: status.indexOf("Case closed in") === 0 && best !== null && after.checks === "0"
      && after.wrong === "?" && after.status.indexOf("Four letters are wrong") === 0,
    status, best, after
  };
`
});

add({
  id: "crossword-clues",
  name: "Clue Cards: solve all ten clues",
  path: "/games/crossword-clues.html",
  params: { answers: crosswordClues },
  drive: (params) => `
  const q = __qa;
  const answers = ${JSON.stringify(params.answers)};
  q.clickSel("#start");
  let answered = 0;
  for (let i = 0; i < 14; i++) {
    if (q.q("#submit").disabled) break;
    const clue = q.txt("#clueText");
    const answer = answers[clue];
    if (!answer) throw new Error("no answer for clue: " + clue);
    q.set("#answer", answer);
    q.clickSel("#submit");
    answered++;
    await q.sleep(15);
  }
  const status = q.txt("#status");
  const best = q.ls("mg-clueclues-best");
  const score = q.txt("#score");
  return {
    ok: answered === 10 && score === "100" && best === "100" && status.indexOf("Final score: 100") === 0,
    answered, score, best, status
  };
`
});

add({
  id: "crossword-anagrams",
  name: "Clue Anagrams: solve all eight clues",
  path: "/games/crossword-anagrams.html",
  params: { answers: crosswordAnagrams },
  drive: (params) => `
  const q = __qa;
  const answers = ${JSON.stringify(params.answers)};
  q.clickSel("#start");
  let answered = 0;
  for (let i = 0; i < 12; i++) {
    if (q.q("#submit").disabled) break;
    const clue = q.txt("#clueText");
    const answer = answers[clue];
    if (!answer) throw new Error("no answer for clue: " + clue);
    q.set("#answer", answer);
    q.clickSel("#submit");
    answered++;
    await q.sleep(15);
  }
  const status = q.txt("#status");
  const best = q.ls("mg-clueanagram-best");
  return {
    ok: answered === 8 && q.txt("#score") === "8" && best === "8" && status.indexOf("Final score: 8") === 0,
    answered, best, status
  };
`
});

add({
  id: "crossword-daily",
  name: "Daily Clues: answer all five",
  path: "/games/crossword-daily.html",
  params: { answers: crosswordDaily },
  drive: (params) => `
  const q = __qa;
  const answers = ${JSON.stringify(params.answers)};
  for (let i = 0; i < 5; i++) {
    const clue = q.txt("#clueText");
    const answer = answers[clue];
    if (!answer) throw new Error("no answer for clue: " + clue);
    q.set("#answer", answer);
    q.clickSel("#submit");
    await q.sleep(15);
  }
  const status = q.txt("#status");
  const best = q.ls("mg-crossword-daily-best");
  const streak = JSON.parse(q.ls("mg-crossword-daily-streak") || "null");
  return {
    ok: best === "5" && streak && streak.count === 1
      && status.indexOf("Today's set finished: 5 of 5") === 0
      && q.txt("#correct") === "5" && q.q("#answer").disabled,
    best, streak, status
  };
`
});

add({
  id: "daily-pattern",
  name: "Daily Sequence: answer all five terms",
  path: "/games/daily-pattern.html",
  drive: () => `
  const q = __qa;
  function nextTerm(terms) {
    const n = terms.length;
    const diffs = terms.slice(1).map((value, index) => value - terms[index]);
    if (diffs.every((step) => step === diffs[0])) return terms[n - 1] + diffs[0];
    const ratios = terms.slice(1).map((value, index) => value / terms[index]);
    if (ratios.every((ratio) => Math.abs(ratio - ratios[0]) < 1e-9)) return terms[n - 1] * ratios[0];
    if (terms.every((value) => value > 0 && Number.isInteger(Math.sqrt(value)))) {
      return Math.pow(Math.sqrt(terms[n - 1]) + 1, 2);
    }
    const adds = terms.slice(1).map((value, index) => value - terms[index] * 2);
    if (adds.every((add) => add === adds[0])) return terms[n - 1] * 2 + adds[0];
    const first = terms[1] - terms[0];
    const second = terms[2] - terms[1];
    let alternating = true;
    for (let i = 1; i < n; i++) {
      const expected = i % 2 === 1 ? first : second;
      if (terms[i] - terms[i - 1] !== expected) alternating = false;
    }
    if (alternating) return terms[n - 1] + (n % 2 === 1 ? first : second);
    return null;
  }
  const answered = [];
  for (let i = 0; i < 5; i++) {
    const terms = q.qa("#series .term").filter((node) => !node.classList.contains("is-missing"))
      .map((node) => Number(node.textContent));
    const value = nextTerm(terms);
    if (value === null) throw new Error("unknown sequence " + terms.join(","));
    answered.push(value);
    q.set("#answer", String(value));
    q.clickSel("#submit");
    await q.sleep(25);
  }
  const status = q.txt("#status");
  const best = q.ls("mg-pattern-best");
  const streak = JSON.parse(q.ls("mg-pattern-streak") || "null");
  return {
    ok: best === "5" && streak && streak.count === 1 && q.txt("#correct") === "5"
      && status.indexOf("Today's set finished: 5 of 5") === 0,
    answered, best, streak, status
  };
`
});

add({
  id: "daily-nonogram",
  name: "Daily Nonogram: solve from the clues",
  path: "/games/daily-nonogram.html",
  drive: () => `
  const q = __qa;
  const runs = (line) => {
    const out = [];
    let run = 0;
    for (const value of line) {
      if (value) run++;
      else if (run) { out.push(run); run = 0; }
    }
    if (run) out.push(run);
    return out.length ? out : [0];
  };
  const same = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
  const patterns = (clue, size) => {
    const out = [];
    for (let mask = 0; mask < (1 << size); mask++) {
      const line = [];
      for (let bit = 0; bit < size; bit++) line.push((mask >> bit) & 1);
      if (same(runs(line), clue)) out.push(line);
    }
    return out;
  };
  const rowClues = q.qa("#board th.rowclue").map((th) => th.textContent.trim().split(/\\s+/).filter(Boolean).map(Number));
  const colClues = q.qa("#board th.colclue").map((th) => Array.from(th.children).map((span) => Number(span.textContent)));
  if (rowClues.length !== 6 || colClues.length !== 6) return { ok: false, why: "clue grid is not 6x6" };
  const rows = rowClues.map((clue) => patterns(clue, 6));
  const cols = colClues.map((clue) => patterns(clue, 6));
  function solve(placed) {
    if (placed.length === 6) return placed;
    for (const row of rows[placed.length]) {
      const next = placed.concat([row]);
      const viable = cols.every((options, column) =>
        options.some((option) => next.every((value, index) => value[column] === option[index]))
      );
      if (viable) {
        const done = solve(next);
        if (done) return done;
      }
    }
    return null;
  }
  const grid = solve([]);
  if (!grid) return { ok: false, why: "no solution from the clues" };
  const cells = q.qa("#board .cell");
  for (let index = 0; index < 36; index++) {
    if (grid[Math.floor(index / 6)][index % 6]) cells[index].click();
  }
  await q.sleep(40);
  const status = q.txt("#status");
  const solved = JSON.parse(q.ls("mg-nonogram-solved") || "[]");
  return {
    ok: status.indexOf("Solved.") === 0 && solved.length === 1 && q.txt("#todayState") === "yes",
    status, solved, filled: q.txt("#filledCount")
  };
`
});

/* ── Math games ──────────────────────────────────────────────────────────── */
add({
  id: "math-speed",
  name: "Quick Sums: play a full round",
  path: "/games/math-speed.html",
  preload: `(function () {
    var realSetInterval = window.setInterval;
    window.setInterval = function (fn, delay) {
      var args = Array.prototype.slice.call(arguments, 2);
      return realSetInterval.apply(window, [fn, Math.max(8, Math.round((delay || 0) / 12))].concat(args));
    };
  })();`,
  drive: () => `
  const q = __qa;
  ${MATH_HELPERS}
  q.clickSel("#restart");
  let answered = 0;
  const started = Date.now();
  while (!q.q("#answer").disabled && Date.now() - started < 25000) {
    const value = evalExpr(q.txt("#question"));
    if (value !== null) {
      q.set("#answer", String(value));
      q.clickSel("#submit");
      answered++;
    }
    await q.sleep(5);
  }
  const status = q.txt("#status");
  const best = Object.keys(q.storage()).filter((key) => key.indexOf("mg-math-best") === 0);
  return {
    ok: answered >= 3 && status.indexOf("Round over:") === 0 && best.length === 1
      && Number(q.txt("#score")) > 0 && q.q("#answer").disabled,
    answered, score: q.txt("#score"), status, best
  };
`
});

add({
  id: "math-missing",
  name: "Missing Number: play a full round",
  path: "/games/math-missing.html",
  preload: `(function () {
    var realSetInterval = window.setInterval;
    window.setInterval = function (fn, delay) {
      var args = Array.prototype.slice.call(arguments, 2);
      return realSetInterval.apply(window, [fn, Math.max(8, Math.round((delay || 0) / 12))].concat(args));
    };
  })();`,
  drive: () => `
  const q = __qa;
  ${MATH_HELPERS}
  q.clickSel("#start");
  let answered = 0;
  const started = Date.now();
  while (!q.q("#answer").disabled && Date.now() - started < 25000) {
    const value = solveEquation(q.txt("#eq"));
    if (value !== null) {
      q.set("#answer", String(value));
      q.clickSel("#submit");
      answered++;
    }
    await q.sleep(5);
  }
  const status = q.txt("#status");
  return {
    ok: answered >= 3 && status.indexOf("Round over:") === 0 && Number(q.txt("#score")) > 0
      && q.q("#answer").disabled && q.ls("mg-missing-best") !== null,
    answered, score: q.txt("#score"), status, best: q.ls("mg-missing-best")
  };
`
});

add({
  id: "math-target",
  name: "Equation Forge: solve a puzzle",
  path: "/games/math-target.html",
  drive: () => `
  const q = __qa;
  const numbers = q.qa(".eq-num").map((node) => Number(node.textContent));
  const goal = Number(q.txt(".eq-total").replace("=", "").trim());
  const ops = ["+", "−", "×", "÷"];
  function apply(a, op, b) {
    if (op === "+") return a + b;
    if (op === "−") return a - b;
    if (op === "×") return a * b;
    if (op === "÷") return b !== 0 && a % b === 0 ? a / b : null;
    return null;
  }
  let answer = null;
  for (const first of ops) for (const second of ops) for (const third of ops) {
    if (answer) continue;
    let total = apply(numbers[0], first, numbers[1]);
    if (total === null) continue;
    total = apply(total, second, numbers[2]);
    if (total === null) continue;
    total = apply(total, third, numbers[3]);
    if (total === null) continue;
    if (total === goal) answer = [first, second, third];
  }
  if (!answer) return { ok: false, why: "no operator row reaches " + goal };
  for (const op of answer) {
    q.clickSel('#ops button[data-op="' + op + '"]');
    await q.sleep(15);
  }
  const status = q.txt("#status");
  return {
    ok: status.indexOf("New puzzle dealt.") !== -1 && q.txt("#solved") === "1"
      && q.ls("mg-forge-best") === "1",
    numbers, goal, answer, status, solved: q.txt("#solved"), best: q.ls("mg-forge-best")
  };
`
});

/* ── Sort games ──────────────────────────────────────────────────────────── */
add({
  id: "sort-sequence",
  name: "Sort Sprint: order the set",
  path: "/games/sort-sequence.html",
  drive: () => `
  const q = __qa;
  const mode = q.q("#mode").value;
  const items = q.qa("#pool button").map((button) => button.textContent.trim());
  const ordered = items.slice().sort((a, b) =>
    mode === "numbers" ? Number(a) - Number(b) : a.localeCompare(b)
  );
  for (const label of ordered) {
    const button = q.qa("#pool button").filter((node) => node.textContent.trim() === label)[0];
    if (!button) throw new Error("missing item " + label);
    button.click();
    await q.sleep(8);
  }
  const status = q.txt("#status");
  const best = Object.keys(q.storage()).filter((key) => key.indexOf("mg-sort-best") === 0);
  return {
    ok: status.indexOf("Sorted in") === 0 && best.length === 1 && q.txt("#progress") === ordered.length + "/" + ordered.length,
    mode, ordered, status, best, errors: q.txt("#errors")
  };
`
});

add({
  id: "sort-fractions",
  name: "Fraction Ladder: place all eight",
  path: "/games/sort-fractions.html",
  drive: () => `
  const q = __qa;
  const parse = (text, note) => {
    const fraction = (value) => {
      const parts = value.trim().split("/").map(Number);
      return parts.length === 2 ? parts[0] / parts[1] : Number(value);
    };
    if (note === "percentage") return parseFloat(text) / 100;
    if (note === "decimal") return parseFloat(text);
    if (note === "mixed number") {
      const parts = text.trim().split(/\\s+/);
      return Number(parts[0]) + (parts[1] ? fraction(parts[1]) : 0);
    }
    return fraction(text);
  };
  const placed = [];
  for (let step = 0; step < 8; step++) {
    const cards = q.qa("#ladder .value-card").filter((card) => !card.disabled);
    const scored = cards.map((card) => {
      const parts = card.getAttribute("aria-label").split(", ");
      return { card, value: parse(parts[0], parts[1]), label: parts[0] };
    }).sort((a, b) => a.value - b.value);
    if (!scored.length) break;
    placed.push(scored[0].label);
    scored[0].card.click();
    await q.sleep(12);
  }
  const status = q.txt("#status");
  return {
    ok: status.indexOf("Ladder complete in") === 0 && placed.length === 8 && q.txt("#placed") === "8/8"
      && q.ls("mg-ladder-best") !== null,
    placed, status, best: q.ls("mg-ladder-best")
  };
`
});

add({
  id: "sort-shifter",
  name: "Shift Sort: swap the row into order",
  path: "/games/sort-shifter.html",
  drive: () => `
  const q = __qa;
  for (let target = 0; target < 7; target++) {
    const values = q.qa("#tiles .tile").map((tile) => Number(tile.textContent));
    const sorted = values.slice().sort((a, b) => a - b);
    if (values[target] === sorted[target]) continue;
    const from = values.indexOf(sorted[target]);
    q.qa("#tiles .tile")[from].click();
    await q.sleep(15);
    q.qa("#tiles .tile")[target].click();
    await q.sleep(20);
  }
  const status = q.txt("#status");
  return {
    ok: status.indexOf("Sorted in") === 0 && q.txt("#wrong") === "0"
      && q.ls("mg-shift-best") !== null && q.q("#tiles .tile").disabled === false,
    status, wrong: q.txt("#wrong"), moves: q.txt("#moves"), best: q.ls("mg-shift-best")
  };
`
});

add({
  id: "sort-bins",
  name: "Sort Bins: complete a round",
  path: "/games/sort-bins.html",
  preload: `(function () {
    var realSetInterval = window.setInterval;
    window.setInterval = function (fn, delay) {
      var args = Array.prototype.slice.call(arguments, 2);
      return realSetInterval.apply(window, [fn, Math.max(8, Math.round((delay || 0) / 12))].concat(args));
    };
  })();`,
  drive: () => `
  const q = __qa;
  q.clickSel("#start");
  const rule = q.txt("#ruleName");
  const isPrime = (n) => {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  };
  const classify = (n) => {
    if (rule.indexOf("even versus odd") !== -1) return n % 2 === 0 ? 0 : (n % 3 === 0 ? 1 : 2);
    if (rule.indexOf("multiples of 5") !== -1) return n % 5 === 0 ? 0 : (n % 3 === 0 ? 1 : 2);
    if (rule.indexOf("primes, squares") !== -1) {
      if (isPrime(n)) return 0;
      const root = Math.round(Math.sqrt(n));
      return root * root === n ? 1 : 2;
    }
    return n % 4 === 0 ? 0 : (n % 3 === 0 ? 1 : 2);
  };
  let sorted = 0;
  const started = Date.now();
  while (!q.q("#bins .bin").disabled && Date.now() - started < 25000) {
    const value = Number(q.txt("#number"));
    if (!value) break;
    q.qa("#bins .bin")[classify(value)].click();
    sorted++;
    await q.sleep(4);
  }
  const status = q.txt("#status");
  return {
    ok: sorted >= 5 && status.indexOf("Round over:") === 0 && Number(q.txt("#score")) > 0
      && q.ls("mg-bins-best") !== null && q.qa("#bins .bin").every((bin) => bin.disabled),
    sorted, score: q.txt("#score"), rule, status, best: q.ls("mg-bins-best")
  };
`
});

add({
  id: "sort-timeline",
  name: "Timeline: order three rounds of events",
  path: "/games/sort-timeline.html",
  params: { years: timelineYears },
  drive: (params) => `
  const q = __qa;
  const years = ${JSON.stringify(params.years)};
  const names = Object.keys(years);
  const yearOf = (button) => {
    const label = button.getAttribute("aria-label");
    const name = names.filter((candidate) => label.indexOf(candidate) === 0)[0];
    return name ? years[name] : null;
  };
  for (let round = 0; round < 3; round++) {
    for (let step = 0; step < 6; step++) {
      const events = q.qa("#events .event").filter((button) => !button.disabled);
      events.sort((a, b) => yearOf(a) - yearOf(b));
      if (!events.length) break;
      events[0].click();
      await q.sleep(8);
    }
    await q.sleep(30);
  }
  const status = q.txt("#status");
  return {
    ok: status.indexOf("Session complete: 0 mistakes") === 0 && q.ls("mg-timeline-best") === "0"
      && q.q("#events").children.length > 0,
    status, best: q.ls("mg-timeline-best")
  };
`
});

/* ── Remaining games ─────────────────────────────────────────────────────── */
add({
  id: "brain-codebreaker",
  name: "Codebreaker: crack an easy code from feedback",
  path: "/games/brain-codebreaker.html",
  drive: () => `
  const q = __qa;
  q.select("#level", "easy");
  await q.sleep(30);
  const digits = [1, 2, 3, 4, 5];
  let remaining = [];
  for (const a of digits) for (const b of digits) for (const c of digits) {
    if (a !== b && b !== c && a !== c) remaining.push("" + a + b + c);
  }
  function score(guess, code) {
    let exact = 0, near = 0;
    const codeCounts = {}, guessCounts = {};
    for (let i = 0; i < code.length; i++) {
      if (guess[i] === code[i]) exact++;
      else {
        codeCounts[code[i]] = (codeCounts[code[i]] || 0) + 1;
        guessCounts[guess[i]] = (guessCounts[guess[i]] || 0) + 1;
      }
    }
    Object.keys(guessCounts).forEach((digit) => {
      near += Math.min(guessCounts[digit], codeCounts[digit] || 0);
    });
    return { exact, near };
  }
  let attempts = 0;
  let status = "";
  while (attempts < 8) {
    const guess = remaining[0];
    for (const digit of guess) {
      q.qa('#pad button[data-digit="' + digit + '"]')[0].click();
    }
    q.qa('#pad button[data-action="enter"]')[0].click();
    attempts++;
    const rows = q.qa("#board .guess-row");
    const last = rows[rows.length - 1];
    const exact = Number(last.querySelector(".exact").textContent.split(" ")[0]);
    const near = Number(last.querySelector(".near").textContent.split(" ")[0]);
    status = q.txt("#status");
    if (exact === 3) break;
    remaining = remaining.filter((code) => {
      const result = score(guess, code);
      return result.exact === exact && result.near === near;
    });
    if (!remaining.length) throw new Error("no candidate codes left");
  }
  const best = q.ls("mg-codebreaker-best-easy");
  /* The guess counter is localized, so read its stored value rather than the
     rendered text: data-mg-n survives a language switch. */
  const counter = q.qa("#guessProgress")[0];
  return {
    ok: status.indexOf("Cracked in") === 0 && best === String(attempts) &&
      counter.getAttribute("data-mg-n") === String(Math.min(attempts + 1, 8)),
    attempts, status, best, counter: counter.textContent
  };
`
});

add({
  id: "number-merge",
  name: "Merge Up: score, best and reset (2048 not driven)",
  path: "/games/number-merge.html",
  partial: true,
  drive: () => `
  const q = __qa;
  const dirs = ["down", "left", "right", "up"];
  let moves = 0;
  for (let step = 0; step < 900; step++) {
    let moved = false;
    for (const dir of dirs) {
      const before = q.qa("#board .tile").map((tile) => tile.textContent).join(",");
      q.clickSel('[data-dir="' + dir + '"]');
      const after = q.qa("#board .tile").map((tile) => tile.textContent).join(",");
      if (after !== before) { moved = true; moves++; break; }
    }
    if (!moved) break;
  }
  const score = Number(q.txt("#score"));
  const top = Number(q.txt("#topTile"));
  const best = Number(q.ls("mg-merge-best"));
  q.clickSel("#restart");
  await q.sleep(40);
  const after = { score: q.txt("#score"), top: q.txt("#topTile"), best: q.txt("#best") };
  // A fresh board deals two random tiles, so the highest can be 2 or 4.
  const afterTop = Number(after.top);
  return {
    ok: moves > 20 && score > 0 && best === score && after.score === "0" && (afterTop === 2 || afterTop === 4),
    moves, score, top, best, after, note: "the 2048 banner needs a much longer game than a QA run allows"
  };
`
});

add({
  id: "word-anagram",
  name: "Anagram Hunt: solve all ten rounds",
  path: "/games/word-anagram.html",
  params: { byLetters: anagramByLetters },
  drive: (params) => `
  const q = __qa;
  const byLetters = ${JSON.stringify(params.byLetters)};
  const solved = [];
  for (let round = 0; round < 10; round++) {
    const letters = q.qa("#letters .letter").map((node) => node.textContent).join("").toLowerCase();
    const word = byLetters[letters.split("").sort().join("")];
    if (!word) throw new Error("no word matches " + letters);
    solved.push(word);
    q.set("#input", word);
    q.clickSel("#submit");
    await q.sleep(620);
  }
  const status = q.txt("#status");
  return {
    ok: status.indexOf("Game over: 1000 points") === 0 && q.ls("mg-anagram-best") === "1000"
      && q.q("#input").disabled,
    solved, status, best: q.ls("mg-anagram-best")
  };
`
});

/* ── Sudoku family: solution read from the core's QA snapshot ────────────── */
function sudokuScenario({ id, name, path, grid, pad, status = "status", storage, note }) {
  add({
    id,
    name,
    path,
    drive: () => `
    const q = __qa;
    const api = window.MGSudoku && window.MGSudoku.last;
    if (!api) return { ok: false, why: "MGSudoku.last is missing" };
    const snapshot = api.snapshot();
    const size = snapshot.size;
    const cells = q.qa("#${grid} .sudoku-cell");
    const padButtons = q.qa("#${pad} button");
    if (cells.length !== size * size) return { ok: false, why: "expected " + (size * size) + " cells, found " + cells.length };
    let placed = 0;
    let slept = false;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (snapshot.fixed[r][c]) continue;
        cells[r * size + c].click();
        const digit = String(snapshot.solution[r][c]);
        const button = padButtons.filter((node) => node.textContent.trim() === digit)[0];
        if (!button) throw new Error("no pad button for " + digit);
        button.click();
        placed++;
        if (!slept && placed === 1) {
          await q.sleep(1100);
          slept = true;
        }
      }
    }
    await q.sleep(40);
    const after = api.snapshot();
    const message = q.txt("#${status}");
    const stored = ${storage ? `q.ls(${JSON.stringify(storage)})` : "null"};
    return {
      ok: after.finished && after.values.every((row, r) => row.every((value, c) => value === snapshot.solution[r][c]))
        && q.qa("#${grid} .sudoku-cell.is-solved").length === size * size
        && placed === size * size - snapshot.fixed.flat().filter(Boolean).length
        && message.indexOf("Solved in") === 0
        && ${storage ? "stored !== null" : "true"},
      size, placed, message, stored, finished: after.finished, note: ${JSON.stringify(note || "")}
    };
  `
  });
}

sudokuScenario({
  id: "sudoku",
  name: "Sudoku: solve a 9x9 grid",
  path: "/games/sudoku.html",
  grid: "board",
  pad: "pad",
  note: "sudoku.html keeps no best/wins key, so the check is the solved state and message"
});

sudokuScenario({
  id: "pocket-sudoku",
  name: "Pocket Sudoku: solve and count the win",
  path: "/games/pocket-sudoku.html",
  grid: "grid",
  pad: "numpad",
  status: "msg",
  storage: "mg-pocket-sudoku-solved"
});

sudokuScenario({
  id: "sudoku-mini",
  name: "Sudoku Mini: solve and count the win",
  path: "/games/sudoku-mini.html",
  grid: "grid",
  pad: "numpad",
  storage: "mg-sudoku-mini-wins"
});

sudokuScenario({
  id: "sudoku-six",
  name: "Sudoku Six: solve and count the win",
  path: "/games/sudoku-six.html",
  grid: "grid",
  pad: "numpad",
  storage: "mg-sudoku-six-wins"
});

sudokuScenario({
  id: "sudoku-daily",
  name: "Daily Sudoku: solve today's grid",
  path: "/games/sudoku-daily.html",
  grid: "grid",
  pad: "numpad",
  storage: "mg-sudoku-daily-streak"
});

/* ── Runner ─────────────────────────────────────────────────────────────── */
const only = process.argv.find((arg) => arg.startsWith("--only="));
const filter = only ? only.slice("--only=".length).split(",").map((value) => value.trim()) : null;
const selected = filter ? scenarios.filter((scenario) => filter.includes(scenario.id)) : scenarios;

const server = await serve(ROOT);
const chrome = await Chrome.launch();
const results = [];

try {
  for (const scenario of selected) {
    const result = await runScenario(chrome, server.origin, scenario);
    results.push(result);
    const label = result.ok ? "PASS" : "FAIL";
    const tag = scenario.partial ? " (partial)" : "";
    console.log(`${label}  ${result.name}${tag}  [${result.ms} ms]`);
    console.log(`      ${JSON.stringify(result.result || { error: result.failure })}`);
    if (result.errors.length) console.log(`      console errors: ${result.errors.join(" | ")}`);
  }
} finally {
  await chrome.close();
  await server.close();
}

const passed = results.filter((result) => result.ok).length;
console.log(`\n${passed}/${results.length} scenarios passed`);
const failed = results.filter((result) => !result.ok);
if (failed.length) {
  console.log("failed: " + failed.map((result) => result.id).join(", "));
  process.exit(1);
}
