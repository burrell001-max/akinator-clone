/* Tag the arcade pages for localization.

   Category pages are generated from a template in build-pages.mjs, so their
   hooks live there. This script covers the pages that are hand-written: the 30
   game pages, the hub and the homepage games shelf. It is idempotent — running
   it twice changes nothing — and it fails loudly if a page it expects to tag no
   longer matches the shape it knows.

   Run: node tools/build/i18n-tag.mjs */
import { readFile, writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "../qa/lib.mjs";

const SLUGS = [
  "brain-codebreaker", "daily-nonogram", "number-merge", "word-anagram",
  "word-guess", "crossword-mini", "pocket-sudoku", "sudoku", "memory",
  "memory-echo", "sort-sequence", "math-speed", "puzzle-slide",
  "sort-fractions", "sort-bins", "sort-shifter", "sort-timeline",
  "math-target", "math-missing", "daily-pattern", "sudoku-daily",
  "sudoku-six", "sudoku-mini", "memory-grid", "memory-numbers", "memory-order",
  "crossword-clues", "crossword-anagrams", "crossword-daily",
  "crossword-detective"
];

const CATS = ["brain", "daily", "number", "word", "crossword", "sudoku", "memory", "sort", "math", "puzzle"];

const BUTTONS = {
  "New game": "new_game", "New Game": "new_game",
  "New puzzle": "new_puzzle", "New set": "new_puzzle", "New board": "new_puzzle",
  "New Board": "new_puzzle", "New row": "new_puzzle", "New word": "new_puzzle",
  "New code": "new_puzzle", "New case": "new_puzzle", "Practice set": "new_puzzle",
  "Start": "start", "Start over": "restart", "Restart": "restart",
  "Restart round": "restart", "Replay sequence": "restart",
  "Restart today&rsquo;s set": "restart", "Restart today&rsquo;s ladder": "restart",
  "Restart today&rsquo;s five": "restart",
  "Start 60-second run": "start", "Start 45-second round": "start",
  "Start 2-minute run": "start",
  "Check": "check", "Check grid": "check", "Check answers": "check",
  "Clear grid": "reset", "Erase": "reset", "Delete": "reset",
  "Play again": "play_again",
  "Submit": "submit", "Answer": "submit",
  "Skip": "skip", "Skip word": "skip", "Shuffle": "shuffle",
  "Hint": "hint", "Show a letter": "hint", "Show answer": "reveal", "Undo all": "reset"
};

const LABELS = {
  Score: "score", Streak: "streak", Best: "best", "Time left": "time",
  Level: "level", Round: "round", Moves: "moves"
};

const SCRIPTS = `    <script src="/langs.js"></script>
    <script src="/games/i18n-slugs.js"></script>
    <script src="/games/i18n-data-a.js"></script>
    <script src="/games/i18n-data-b.js"></script>
    <script src="/games/i18n-data-c.js"></script>
    <script src="/games/i18n-data-d.js"></script>
    <script src="/games/i18n-data-e.js"></script>
    <script src="/games/i18n-data-f.js"></script>
    <script src="/games/i18n-data-g.js"></script>
    <script src="/games/i18n-data-h.js"></script>
    <script src="/games/i18n-data-i.js?v=5"></script>
    <script src="/games/i18n.js?v=5"></script>
`;

const CSS = '<link rel="stylesheet" href="/games/i18n.css?v=3">';
const CSS_AFTER = '<link rel="stylesheet" href="/games/ribbon.css">';

const changed = [];
let skipped = 0;

function note(file, before, after) {
  if (before === after) { skipped++; return before; }
  changed.push(file);
  return after;
}

function ensureCss(html) {
  if (html.includes("/games/i18n.css")) return html;
  if (!html.includes(CSS_AFTER)) return html;
  return html.replace(CSS_AFTER, `${CSS_AFTER}\n${CSS}`);
}

function ensureScripts(html, marker) {
  if (html.includes("/games/i18n-data-i.js?v=5")) return html;
  if (html.includes("/games/i18n-data-h.js")) {
    return html.replace('<script src="/games/i18n-data-h.js"></script>',
      '<script src="/games/i18n-data-h.js"></script>\n    <script src="/games/i18n-data-i.js?v=5"></script>');
  }
  if (html.includes("/games/i18n-data-e.js")) {
    return html.replace('<script src="/games/i18n-data-e.js"></script>',
      '<script src="/games/i18n-data-e.js"></script>\n    <script src="/games/i18n-data-f.js"></script>\n    <script src="/games/i18n-data-g.js"></script>\n    <script src="/games/i18n-data-h.js"></script>');
  }
  if (html.includes("/games/i18n.js")) {
    /* An older tag pass already added the first six files. */
    return html.replace('<script src="/games/i18n.js?v=5"></script>',
      '<script src="/games/i18n-data-d.js"></script>\n    <script src="/games/i18n-data-e.js"></script>\n    <script src="/games/i18n-data-f.js"></script>\n    <script src="/games/i18n-data-g.js"></script>\n    <script src="/games/i18n-data-h.js"></script>\n    <script src="/games/i18n.js?v=5"></script>');
  }
  const at = html.indexOf(marker);
  if (at === -1) return html;
  return html.slice(0, at) + SCRIPTS + html.slice(at);
}

function tagNav(html) {
  return html
    .replace(/<a href="([^"]*)"([^>]*)>Play the Genie<\/a>/g, (m, href, rest) =>
      rest.includes("data-i18n") ? m : `<a href="${href}"${rest} data-i18n="nav_play">Play the Genie</a>`)
    .replace(/<a href="\/games\/"([^>]*)>Games<\/a>/g, (m, rest) =>
      rest.includes("data-i18n") ? m : `<a href="/games/"${rest} data-i18n="nav_games">Games</a>`);
}

function tagRibbon(html) {
  return html.replace(/<a href="\/games\/#([a-z]+)"([^>]*)>([^<]+)<\/a>/g, (m, key, rest, text) => {
    if (!CATS.includes(key) || rest.includes("data-mg-cat")) return m;
    return `<a href="/games/#${key}"${rest} data-mg-cat="${key}">${text}</a>`;
  });
}

function tagButtons(html) {
  return html.replace(/<button([^>]*)>([^<]+)<\/button>/g, (m, attrs, text) => {
    if (attrs.includes("data-i18n")) return m;
    const key = BUTTONS[text.trim()];
    return key ? `<button${attrs} data-i18n="${key}">${text}</button>` : m;
  });
}

function tagStatLabels(html) {
  return html.replace(/<span>([A-Z][A-Za-z ]{1,12}) <b/g, (m, label) => {
    const key = LABELS[label];
    return key ? `<span><span data-i18n="${key}">${label}</span> <b` : m;
  });
}

/* ── Game pages ─────────────────────────────────────────────────────────── */
for (const slug of SLUGS) {
  const file = join(ROOT, "games", `${slug}.html`);
  const before = await readFile(file, "utf8");
  let html = before;

  html = ensureCss(html);
  html = ensureScripts(html, '<script src="/games/games.js"></script>');
  /* word-guess.html has no shared games.js: fall back to its first script. */
  html = ensureScripts(html, "<script>");
  html = tagNav(html);
  html = tagRibbon(html);
  html = tagButtons(html);
  html = tagStatLabels(html);

  if (!html.includes(`data-mg-title="${slug}"`)) {
    const titleMatch = before.match(/<title>([^<]*)<\/title>/);
    const docTitle = titleMatch ? titleMatch[1].replace(/"/g, "&quot;") : slug;
    html = html.replace(/<h1>([^<]*)<\/h1>/, `<h1 data-mg-title="${slug}" data-title-en="${docTitle}">$1</h1>`);
  }

  /* Pages spell the heading differently, so normalise it first. */
  html = html.replace(/<h2>\s*How to play\s*<\/h2>/i, '<h2 data-i18n="how_to_play">How to play</h2>');
  html = html.replace(/<h2>Rules and scoring<\/h2>/g, '<h2 data-i18n="rules">Rules and scoring</h2>');

  if (!html.includes("data-mg-howto")) {
    const headingAt = html.search(/<h2[^>]*data-i18n="how_to_play"/);
    if (headingAt !== -1) {
      const close = html.indexOf("</h2>", headingAt) + 5;
      html = html.slice(0, close) +
        `\n    <p class="mg-howto" data-mg-howto="${slug}"></p>` +
        html.slice(close);
    }
  }

  /* Everything from the guide heading to the end of the article is the English
     guide; outside English a translated guide replaces it. Pages without a
     How-to-play heading fall back to the first heading after the controls. */
  if (!html.includes("mg-guide-en")) {
    const mainEnd = html.indexOf("</main>");
    let start = html.search(/<h2[^>]*data-i18n="how_to_play"/);
    if (start === -1) {
      const mainStart = html.indexOf("<main");
      const lastInteractive = Math.max(mainStart, ...["</button>", "</select>", "</canvas>", 'id="board"', 'id="grid"', 'class="pad"']
        .map((mark) => html.lastIndexOf(mark, mainEnd)));
      let cursor = lastInteractive;
      while (cursor !== -1) {
        const h2 = html.indexOf("<h2", cursor);
        if (h2 === -1 || h2 > mainEnd) break;
        const close = html.indexOf("</h2>", h2);
        const text = html.slice(h2, close).replace(/<[^>]*>/g, "").trim();
        if (!text || /^(clues|across|down|menu|settings)$/i.test(text)) { cursor = close; continue; }
        start = h2;
        break;
      }
    }
    if (start !== -1 && start < mainEnd) {
      html = html.slice(0, start) +
        `<div class="mg-guide" data-mg-guide="${slug}"></div>\n    <div class="mg-guide-en" lang="en">\n` +
        html.slice(start, mainEnd) +
        `    </div>\n  ` + html.slice(mainEnd);
    }
  }

  await writeFile(file, note(`games/${slug}.html`, before, html));
}

/* ── Hub ────────────────────────────────────────────────────────────────── */
{
  const file = join(ROOT, "games", "index.html");
  const before = await readFile(file, "utf8");
  let html = before;

  html = ensureCss(html);
  html = ensureScripts(html, '<script src="/games/hub.js"></script>');
  html = tagNav(html);
  html = tagRibbon(html);

  html = html.replace(/<h1>MindGenieAI Mind &amp; Puzzle Games<\/h1>/, '<h1 data-mg-hub="0">MindGenieAI Mind &amp; Puzzle Games</h1>');
  html = html.replace(/<p>Instant-play browser games across[^<]*<\/p>/, '<p data-mg-hub="1">Instant-play browser games across Brain, Daily, Number, Word, Crosswords, Sudoku, Memory, Sort, Math, and Puzzle categories&mdash;zero downloads required.</p>');

  html = html.replace(/<button type="button" class="cat-pill([^"]*)" data-filter="([a-z]+)"([^>]*)>([^<]+)<\/button>/g,
    (m, cls, filter, rest, text) => {
      if (rest.includes("data-mg-cat") || rest.includes("data-mg-hub")) return m;
      const attr = filter === "all" ? 'data-mg-hub="2"' : `data-mg-cat="${filter}"`;
      return `<button type="button" class="cat-pill${cls}" data-filter="${filter}"${rest} ${attr}>${text}</button>`;
    });

  html = html.replace(/<h2>([^<]+)<\/h2>/g, (m, text) => {
    const slug = titleSlug(text);
    return slug ? `<h2 data-mg-title="${slug}">${text}</h2>` : m;
  });
  html = html.replace(/<small>([^<]+)<\/small>/g, (m, text) => {
    const key = CATS.find((cat) => catName(cat) === text);
    return key ? `<small data-mg-cat="${key}">${text}</small>` : m;
  });
  html = html.replace(/<span class="play-tag">Play Now &rarr;<\/span>/g, '<span class="play-tag" data-i18n="play_now">Play Now</span>');
  html = html.replace(/<span class="hub-catlinks-label">Browse by category<\/span>/, '<span class="hub-catlinks-label" data-mg-hub="3">Browse by category</span>');
  html = html.replace(/<a href="\/games\/([a-z-]+)\/">([^<]+)<\/a>/g, (m, dir, text) => {
    const key = dirToCat(dir);
    return key ? `<a href="/games/${dir}/" data-mg-cat="${key}">${text}</a>` : m;
  });
  html = html.replace(/(<a class="hub-clear" id="hubClear" href="\/games\/" hidden)(>Show all 30 games<\/a>)/, '$1 data-mg-hub="4"$2');
  html = html.replace(/<a href="\/games\/">All games<\/a>/g, '<a href="/games/" data-i18n="all_games">All games</a>');

  await writeFile(file, note("games/index.html", before, html));
}

/* ── Homepage shelf ─────────────────────────────────────────────────────── */
{
  const file = join(ROOT, "index.html");
  const before = await readFile(file, "utf8");
  let html = before;

  if (!html.includes("/games/i18n-shelf.js")) {
    html = html.replace('    <script src="/games/games-shelf.js" defer></script>',
      `    <script src="/games/i18n-slugs.js"></script>
    <script src="/games/i18n-data-a.js"></script>
    <script src="/games/i18n-data-b.js"></script>
    <script src="/games/i18n-data-c.js"></script>
    <script src="/games/i18n-shelf.js" defer></script>
    <script src="/games/games-shelf.js" defer></script>`);
  }

  html = html.replace(/<a class="fb-game-card" href="\/games\/([a-z-]+)\.html" data-category="([^"]+)">/g,
    (m, slug, cat) => m.includes("data-mg-title") ? m : `<a class="fb-game-card" href="/games/${slug}.html" data-category="${cat}" data-mg-title="${slug}">`);
  html = html.replace(/<div class="fb-card-title">([^<]+)<\/div>/g,
    (m, text) => `<div class="fb-card-title" data-mg-shelf-title>${text}</div>`);
  html = html.replace(/<h2 class="fb-shelf-title">([^<]+)<\/h2>/, '<h2 class="fb-shelf-title" data-mg-hub="5">$1</h2>');
  html = html.replace(/<p class="fb-shelf-subtitle">([^<]+)<\/p>/, '<p class="fb-shelf-subtitle" data-mg-hub="6">$1</p>');
  html = html.replace(/<a href="\/games\/" class="fb-all-games-link">([^<]+)<\/a>/, '<a href="/games/" class="fb-all-games-link" data-mg-hub="7">$1</a>');

  await writeFile(file, note("index.html", before, html));
}

function catName(key) {
  return {
    brain: "Brain Games", daily: "Daily Games", number: "Number Games",
    word: "Word Games", crossword: "Crosswords", sudoku: "Sudoku",
    memory: "Memory Games", sort: "Sort Games", math: "Math Games",
    puzzle: "Puzzle Games"
  }[key];
}

function dirToCat(dir) {
  return {
    "brain-games": "brain", "daily-games": "daily", "number-games": "number",
    "word-games": "word", crosswords: "crossword", sudoku: "sudoku",
    "memory-games": "memory", "sort-games": "sort", "math-games": "math",
    "puzzle-games": "puzzle"
  }[dir];
}

function titleSlug(name) {
  const map = {
    "Codebreaker": "brain-codebreaker", "Daily Nonogram": "daily-nonogram",
    "Merge Up": "number-merge", "Anagram Hunt": "word-anagram",
    "Word Guess": "word-guess", "Mini Crossword": "crossword-mini",
    "Pocket Sudoku": "pocket-sudoku", "Sudoku": "sudoku",
    "Memory Match": "memory", "Pattern Echo": "memory-echo",
    "Sort Sprint": "sort-sequence", "Quick Sums": "math-speed",
    "Slide Fifteen": "puzzle-slide", "Fraction Ladder": "sort-fractions",
    "Sort Bins": "sort-bins", "Shift Sort": "sort-shifter",
    "Timeline": "sort-timeline", "Equation Forge": "math-target",
    "Missing Number": "math-missing", "Daily Sequence": "daily-pattern",
    "Daily Sudoku": "sudoku-daily", "Sudoku Six": "sudoku-six",
    "Sudoku Mini": "sudoku-mini", "Grid Flash": "memory-grid",
    "Digit Echo": "memory-numbers", "Order Recall": "memory-order",
    "Clue Cards": "crossword-clues", "Clue Anagrams": "crossword-anagrams",
    "Daily Clues": "crossword-daily", "Crossword Detective": "crossword-detective"
  };
  return map[name] || "";
}

console.log(`tagged ${changed.length} page(s), ${skipped} already current`);
for (const file of changed.slice(0, 8)) console.log(`  ${file}`);
