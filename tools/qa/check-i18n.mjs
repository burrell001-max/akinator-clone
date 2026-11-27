/* Localization checks.

   Fails when a supported language is missing UI keys, a game title, a game
   instruction or a category name; when a translated rules bullet drops a
   number, a difficulty label or an mg- storage key; when a page's
   data-i18n/data-mg-* hooks point at keys or slugs that do not exist; and when
   English text leaks into a non-Latin translation. It also audits the
   homepage dictionary in /i18n.js, which has its own key set.

   The coverage report at the end lists visible English UI text that has no
   translation hook yet. Those are warnings (a work queue), not failures;
   pass --strict-ui to make them fail.

   Run: node tools/qa/check-i18n.mjs [--strict-ui] */
import { readFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { ROOT } from "./lib.mjs";

const STRICT_UI = process.argv.includes("--strict-ui");
const problems = [];
const coverage = [];
const fail = (message) => problems.push(message);
const note = (message) => coverage.push(message);

/* ── Loading ───────────────────────────────────────────────────────────── */

const sandbox = {};
const load = async (...files) => {
  for (const file of files) {
    const source = await readFile(join(ROOT, file), "utf8");
    new Function("window", source)(sandbox);
  }
};
await load("langs.js", "i18n.js", "games/i18n-slugs.js");
await load(
  "games/i18n-data-a.js", "games/i18n-data-b.js", "games/i18n-data-c.js",
  "games/i18n-data-d.js", "games/i18n-data-e.js", "games/i18n-data-f.js",
  "games/i18n-data-g.js", "games/i18n-data-h.js", "games/i18n-data-i.js"
);
const LANGS = sandbox.LANGS || [];
const CODES = LANGS.map((lang) => lang.code);
/* One rules file per language, loaded on demand by the browser. */
for (const code of CODES) {
  const file = `games/i18n-guides-${code}.js`;
  try {
    await load(file);
  } catch {
    fail(`missing ${file}`);
  }
}

const SLUGS = sandbox.MGI18N_SLUGS || [];
const CATS = sandbox.MGI18N_CAT_ORDER || [];
const PARTS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((letter) => sandbox[`MGI18N_DATA_${letter}`] || {});
const GUIDE_OF = sandbox.MGI18N_GUIDE || {};
const FAMILIES = [...new Set(Object.values(GUIDE_OF))];
const GUIDE_POINTS = sandbox.MGI18N_GUIDE_POINTS || {};
const HOME = sandbox.I18N || {};

if (CODES.length !== 18) fail(`expected 18 languages, found ${CODES.length}`);
if (SLUGS.length !== 30) fail(`expected 30 game slugs, found ${SLUGS.length}`);
if (FAMILIES.length !== 13) fail(`expected 13 guide families, found ${FAMILIES.length}`);

/* Merge the per-part sections once: { ui: { code: {...} }, status: {...} } */
const section = (name) => {
  const merged = {};
  for (const part of PARTS) {
    const table = part[name];
    if (!table) continue;
    for (const code of Object.keys(table)) {
      const incoming = table[code];
      if (!incoming) continue;
      if (Array.isArray(incoming)) merged[code] = incoming;
      else merged[code] = Object.assign(merged[code] || {}, incoming);
    }
  }
  return merged;
};
const UI = section("ui");
const TITLES = section("titles");
const HOWTO = section("howto");
const CATS_BY_LANG = section("cats");
const HUB = section("hub");
const STATUS = section("status");
const GUIDES = section("guides");

const EN = {
  ui: UI.en || {},
  titles: TITLES.en || [],
  howto: HOWTO.en || [],
  cats: CATS_BY_LANG.en || [],
  hub: HUB.en || [],
  status: STATUS.en || {},
  guides: GUIDES.en || {}
};

/* ── Helpers ───────────────────────────────────────────────────────────── */

const text = (value) => (typeof value === "string" ? value : "");
const placeholders = (value) => (text(value).match(/\{\w+\}/g) || []).sort().join(",");
const stripTags = (value) => text(value).replace(/<[^>]+>/g, " ");
const fold = (value) => text(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* Numbers in any of the scripts the site translates into, as integers. */
const DIGIT_BASES = [
  [0x30, 0x39], [0x660, 0x669], [0x6f0, 0x6f9], [0x966, 0x96f],
  [0x9e6, 0x9ef], [0xe50, 0xe59], [0xff10, 0xff19]
];
const digitValue = (character) => {
  const point = character.codePointAt(0);
  for (const [start, end] of DIGIT_BASES) {
    if (point >= start && point <= end) return String(point - start);
  }
  return "";
};
const numbers = (value) => (text(value).match(/[\p{Nd}]+/gu) || [])
  .map((run) => Number([...run].map(digitValue).join("")))
  .filter((number) => Number.isFinite(number));

const storageKeys = (value) => [...new Set((text(value).match(/mg-[a-z0-9]+(?:-[a-z0-9]+)*/gi) || []).map((key) => key.toLowerCase()))].sort();

/* Brand names, platform terms and language-neutral loanwords are not leaks. */
const NEUTRAL = new Set(["MindGenie", "AI", "TV", "OK", "Enter", "localStorage", "Force", "the"]);
const latinWords = (value) => (stripTags(value)
  .replace(/\{\w+\}/g, " ")
  .replace(/mg-[a-z0-9-]*/gi, " ")
  .match(/[A-Za-z]{2,}/g) || [])
  .filter((word) => !NEUTRAL.has(word));

const NON_LATIN = ["ru", "ar", "he", "fa", "zh", "ja", "ko"];
/* Distinctive English function words: a translation containing these is
   almost certainly an untranslated line, not a coincidence. */
const ENGLISH_MARKERS = /\b(the|your|with|and|that|this|from|when|never|only|kept|stored|you)\b/i;

/* Values that are the same word in the target language. */
const SAME_OK = new Set(["Blog", "Start", "Level", "Expert", "Score", "Correct", "Tips", "Sudoku", "Nonogram", "Bingo", "Quiz", "Memory", "Puzzle", "TV", "AI", "Anime", "No", "no", "Set", "Question", "FAQ", "Contact", "Games", "Round"]);
const sameAsEnglish = (value) => SAME_OK.has(text(value).replace(/[^\p{L}\p{N} ]/gu, "").trim()) || !/[A-Za-z\u0400-\u04ff\u0600-\u06ff\u3040-\u30ff\u4e00-\u9fff]/.test(text(value));

/* Balanced brackets keep a translated sentence from being cut mid-clause. */
const unbalanced = (value) => {
  const pairs = [["(", ")"], ["[", "]"], ["«", "»"]];
  return pairs.some(([open, close]) => {
    const a = text(value).split(open).length;
    const b = text(value).split(close).length;
    return a !== b;
  });
};

/* ── Guide families: leads, bullets, numbers, difficulty, storage keys ─── */

const leadCount = (code, family) => (GUIDES[code] && GUIDES[code][family] ? GUIDES[code][family].filter((line) => !text(line).startsWith("- ")).length : 0);
const bulletCount = (code, family) => (GUIDE_POINTS[code] && GUIDE_POINTS[code][family] ? GUIDE_POINTS[code][family].length : 0);

const DIFFICULTY = ["easy", "medium", "hard", "expert"];
const englishDifficulty = (line) => DIFFICULTY.filter((key) => new RegExp(`\\b${key}\\b`, "i").test(line));
/* Difficulty bullets open with the label ("Легко:", "Facile :"), so a prefix
   test avoids matching an ordinary word that starts with the same stem. The
   stem covers inflections such as Italian Media/Medio and the Russian
   Легко/Лёгкий pair, while a short Vietnamese label is matched whole. */
const translatedDifficulty = (code, translated) => {
  const head = fold(translated).replace(/^[^\p{L}]+/u, "");
  return DIFFICULTY.filter((key) => {
    const label = fold((UI[code] || {})[key] || EN.ui[key]).trim();
    if (!label) return false;
    const core = label.length <= 3 ? label : label.slice(0, Math.max(3, label.length - 2));
    return head.startsWith(core);
  });
};

for (const code of CODES) {
  const guides = GUIDES[code] || {};
  for (const family of FAMILIES) {
    const paragraphs = guides[family];
    if (!paragraphs || !paragraphs.length) {
      fail(`${code}: missing guide for ${family}`);
      continue;
    }
    if (paragraphs.some((para) => text(para).length < 25)) fail(`${code}: thin guide paragraph in ${family}`);
    if (leadCount(code, family) !== leadCount("en", family)) fail(`${code}: ${family} has ${leadCount(code, family)} of ${leadCount("en", family)} guide paragraphs`);

    const bullets = (GUIDE_POINTS[code] || {})[family] || [];
    const expected = bulletCount("en", family);
    if (bullets.length !== expected) {
      fail(`${code}: ${family} has ${bullets.length} of ${expected} rules bullets`);
      continue;
    }
    if (bullets.some((line) => text(line).slice(0, 2) !== "- " || text(line).length < 15)) {
      fail(`${code}: malformed rules bullet in ${family}`);
    }

    (GUIDE_POINTS.en || {})[family].forEach((englishLine, index) => {
      const english = text(englishLine).slice(2);
      const translated = text(bullets[index]).slice(2);
      const where = `${code}: ${family} bullet ${index + 1}`;
      if (!translated) return fail(`${where} is empty`);
      if (code === "en") return;
      if (translated === english) fail(`${where} is still English`);

      /* A storage key is an API name: it must survive verbatim. */
      const keysEn = storageKeys(english).join(",");
      const keysTr = storageKeys(translated).join(",");
      if (keysEn !== keysTr) fail(`${where} storage keys ${keysTr || "(none)"} should be ${keysEn || "(none)"}`);

      /* Every number the English rule states must survive. */
      const missingNumbers = numbers(english).filter((number) => !numbers(translated).includes(number));
      if (missingNumbers.length) fail(`${where} drops the number ${missingNumbers.join(", ")}`);

      /* Difficulty names must map to that language's own labels. */
      const difficultyEn = englishDifficulty(english).join(",");
      const difficultyTr = translatedDifficulty(code, translated).join(",");
      if (difficultyEn && difficultyEn !== difficultyTr) {
        fail(`${where} difficulty ${difficultyTr || "(none)"} should be ${difficultyEn}`);
      }

      if (NON_LATIN.includes(code)) {
        const leaked = latinWords(translated);
        if (leaked.length) fail(`${where} leaks English (${leaked[0]})`);
      } else if (ENGLISH_MARKERS.test(translated)) {
        fail(`${where} reads like English`);
      }
      if (unbalanced(translated)) fail(`${where} has unbalanced brackets`);
    });

    /* A translated guide paragraph must not be the English one. */
    if (code !== "en") {
      (GUIDES.en[family] || []).forEach((englishPara, index) => {
        const translated = text((paragraphs || [])[index]);
        if (!translated || text(englishPara).startsWith("- ")) return;
        if (translated === englishPara) fail(`${code}: ${family} guide paragraph ${index + 1} is still English`);
        if (NON_LATIN.includes(code) && latinWords(translated).length) fail(`${code}: ${family} guide paragraph ${index + 1} leaks English (${latinWords(translated)[0]})`);
        if (!NON_LATIN.includes(code) && ENGLISH_MARKERS.test(translated)) fail(`${code}: ${family} guide paragraph ${index + 1} reads like English`);
        if (unbalanced(translated)) fail(`${code}: ${family} guide paragraph ${index + 1} has unbalanced brackets`);
      });
    }
  }
}

/* ── UI strings, titles, instructions, categories, hub headings ────────── */

const EN_UI_KEYS = Object.keys(EN.ui);

for (const code of CODES) {
  const table = UI[code] || {};
  const missing = EN_UI_KEYS.filter((key) => !text(table[key]).trim());
  if (missing.length) fail(`${code}: ${missing.length} missing UI key(s): ${missing.slice(0, 6).join(", ")}`);

  EN_UI_KEYS.forEach((key) => {
    const value = text(table[key]);
    if (!value) return;
    if (placeholders(value) !== placeholders(EN.ui[key])) fail(`${code}: ui.${key} has placeholders ${placeholders(value) || "(none)"}, English has ${placeholders(EN.ui[key]) || "(none)"}`);
    if (code !== "en" && value === EN.ui[key] && !sameAsEnglish(value)) fail(`${code}: ui.${key} is still English ("${value}")`);
    if (NON_LATIN.includes(code) && latinWords(value).length) fail(`${code}: ui.${key} leaks English (${latinWords(value)[0]})`);
    if (unbalanced(value)) fail(`${code}: ui.${key} has unbalanced brackets`);
  });

  const titles = TITLES[code] || [];
  if (titles.length !== SLUGS.length) fail(`${code}: ${titles.length} game titles, expected ${SLUGS.length}`);
  titles.forEach((value, index) => {
    if (!text(value).trim()) fail(`${code}: empty title for ${SLUGS[index]}`);
    else if (code !== "en" && value === (TITLES.en || [])[index] && !sameAsEnglish(value)) fail(`${code}: title for ${SLUGS[index]} is still English`);
    else if (NON_LATIN.includes(code) && latinWords(value).length) fail(`${code}: title for ${SLUGS[index]} leaks English (${latinWords(value)[0]})`);
  });

  const howto = HOWTO[code] || [];
  if (howto.length !== SLUGS.length) fail(`${code}: ${howto.length} instructions, expected ${SLUGS.length}`);
  howto.forEach((value, index) => {
    if (!text(value).trim()) fail(`${code}: empty instruction for ${SLUGS[index]}`);
    else if (code !== "en" && value === (HOWTO.en || [])[index] && !sameAsEnglish(value)) fail(`${code}: instruction for ${SLUGS[index]} is still English`);
    else if (NON_LATIN.includes(code) && latinWords(value).length) fail(`${code}: instruction for ${SLUGS[index]} leaks English (${latinWords(value)[0]})`);
  });

  const cats = CATS_BY_LANG[code] || [];
  if (cats.length !== CATS.length) fail(`${code}: ${cats.length} category names, expected ${CATS.length}`);
  cats.forEach((value, index) => {
    if (!text(value).trim()) fail(`${code}: empty category name for ${CATS[index]}`);
    else if (NON_LATIN.includes(code) && latinWords(value).length) fail(`${code}: category ${CATS[index]} leaks English (${latinWords(value)[0]})`);
  });

  const hub = HUB[code] || [];
  if (hub.length !== 8) fail(`${code}: ${hub.length} hub strings, expected 8`);
  hub.forEach((value, index) => {
    if (!text(value).trim()) fail(`${code}: empty hub string ${index}`);
    else if (NON_LATIN.includes(code) && latinWords(value).length) fail(`${code}: hub string ${index} leaks English (${latinWords(value)[0]})`);
  });

  /* Duplicate titles across languages usually mean a copy-paste slip. */
  if (code !== "en") {
    const same = titles.filter((value, index) => value === (TITLES.en || [])[index] && !sameAsEnglish(value)).length;
    if (same) fail(`${code}: ${same} game titles identical to English — check for untranslated entries`);
  }
}

/* ── Live status lines ─────────────────────────────────────────────────── */

const STATUS_KEYS = Object.keys(EN.status);
for (const code of CODES) {
  const table = STATUS[code] || {};
  const missing = STATUS_KEYS.filter((key) => !text(table[key]).trim());
  if (missing.length) fail(`${code}: ${missing.length} missing status line(s)`);
  STATUS_KEYS.forEach((key) => {
    const value = text(table[key]);
    if (!value) return;
    if (placeholders(value) !== placeholders(EN.status[key])) fail(`${code}: status "${key.slice(0, 32)}…" has wrong placeholders`);
    if (code !== "en" && value === EN.status[key] && !sameAsEnglish(value)) fail(`${code}: status "${key.slice(0, 32)}…" is still English`);
    if (NON_LATIN.includes(code) && latinWords(value).length) fail(`${code}: status "${key.slice(0, 32)}…" leaks English (${latinWords(value)[0]})`);
    const literalEn = numbers(EN.status[key]);
    if (literalEn.length) {
      /* Digits written into the English template are literal. */
      const missingLiteral = literalEn.filter((number) => !numbers(value).includes(number));
      if (missingLiteral.length) fail(`${code}: status "${key.slice(0, 32)}…" drops the literal ${missingLiteral.join(", ")}`);
    }
    if (unbalanced(value)) fail(`${code}: status "${key.slice(0, 32)}…" has unbalanced brackets`);
  });
}

/* ── Homepage dictionary (/i18n.js) ────────────────────────────────────── */

const HOME_EN_KEYS = Object.keys(HOME.en || {});
if (HOME_EN_KEYS.length < 60) fail(`i18n.js: only ${HOME_EN_KEYS.length} English keys`);
for (const code of CODES) {
  const table = HOME[code];
  if (!table) {
    fail(`i18n.js: no dictionary for ${code}`);
    continue;
  }
  const filled = (value) => typeof value === "string" ? value.trim().length > 0
    : Array.isArray(value) ? value.length > 0 && value.every((entry) => text(entry).trim())
    : value !== undefined && value !== null;
  const missing = HOME_EN_KEYS.filter((key) => key !== "q" && !filled(table[key]));
  if (missing.length) fail(`i18n.js ${code}: ${missing.length} missing key(s): ${missing.slice(0, 6).join(", ")}`);
  const extra = Object.keys(table).filter((key) => key !== "q" && !HOME_EN_KEYS.includes(key));
  if (extra.length) fail(`i18n.js ${code}: keys not in English: ${extra.join(", ")}`);

  HOME_EN_KEYS.forEach((key) => {
    if (key === "q") return;
    const value = text(table[key]);
    if (!value) return;
    if (placeholders(value) !== placeholders(HOME.en[key])) fail(`i18n.js ${code}: ${key} has wrong placeholders`);
    if (code !== "en" && value === HOME.en[key] && !sameAsEnglish(value)) fail(`i18n.js ${code}: ${key} is still English ("${value}")`);
    if (NON_LATIN.includes(code) && latinWords(value).length) fail(`i18n.js ${code}: ${key} leaks English (${latinWords(value)[0]})`);
    if (unbalanced(value)) fail(`i18n.js ${code}: ${key} has unbalanced brackets`);
  });

  const questions = table.q;
  if (code === "en") {
    /* The English question set lives in main.py; translations are the ones
       the page renders, so only they are checked here. */
  } else if (!Array.isArray(questions)) fail(`i18n.js ${code}: no question list`);
  else {
    if (questions.length !== 28) fail(`i18n.js ${code}: ${questions.length} questions, expected 28`);
    questions.forEach((question, index) => {
      if (!text(question).trim()) fail(`i18n.js ${code}: question ${index + 1} is empty`);
      else if (NON_LATIN.includes(code) && latinWords(question).length) fail(`i18n.js ${code}: question ${index + 1} leaks English (${latinWords(question)[0]})`);
    });
  }
}

/* The hero subtitle is a homepage string with its own markup hook: the authored
   English must match the dictionary, the element must be hooked, and every
   translation must stay short enough to sit on one or two lines on a phone. */
{
  const home = await readFile(join(ROOT, "index.html"), "utf8");
  const hero = home.match(/<span class="h1-sub"[^>]*>([^<]*)<\/span>/);
  if (!hero) fail("index.html: no .h1-sub hero subtitle");
  else {
    if (!/class="h1-sub"[^>]*data-i18n="subtitle"/.test(home)) fail('index.html: .h1-sub has no data-i18n="subtitle"');
    if (text(hero[1]) !== text(HOME.en.subtitle || "")) fail("index.html: .h1-sub text differs from i18n.js subtitle");
  }
  const visual = (value) => [...text(value)].reduce((total, character) =>
    total + (/\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Hangul}/u.test(character) ? 2 : 1), 0);
  CODES.forEach((code) => {
    const value = HOME[code] && HOME[code].subtitle;
    if (!value) return; /* the key-parity check above reports it */
    const width = visual(value);
    if (width > 50) fail(`i18n.js ${code}: subtitle is ${width} columns wide (max 50)`);
  });
}

/* ── Page hooks: every data-i18n and data-mg-* value must resolve ──────── */

const pages = [
  "games/index.html",
  ...SLUGS.map((slug) => `games/${slug}.html`),
  ...["brain-games", "daily-games", "number-games", "word-games", "crosswords", "sudoku", "memory-games", "sort-games", "math-games", "puzzle-games"].map((dir) => `games/${dir}/index.html`)
];

const HOOK_ATTRS = ["data-i18n", "data-i18n-html", "data-i18n-ph", "data-i18n-aria", "data-i18n-title"];
const readPage = async (page) => {
  try {
    return await readFile(join(ROOT, page), "utf8");
  } catch {
    fail(`missing page ${page}`);
    return "";
  }
};

for (const page of pages) {
  const html = await readPage(page);
  if (!html) continue;
  for (const asset of ["/langs.js", "/games/i18n-slugs.js", "/games/i18n-data-a.js", "/games/i18n-data-b.js", "/games/i18n-data-c.js", "/games/i18n-data-d.js", "/games/i18n-data-e.js", "/games/i18n-data-f.js", "/games/i18n-data-g.js", "/games/i18n-data-h.js", "/games/i18n-data-i.js", "/games/i18n.js"]) {
    if (!html.includes(asset)) fail(`${page}: missing ${asset}`);
  }
  if (!html.includes("/games/i18n.css")) fail(`${page}: missing /games/i18n.css`);
  if (!/data-mg-(title|cat|hub|howto)/.test(html)) fail(`${page}: no localization hooks`);

  for (const attr of HOOK_ATTRS) {
    const pattern = new RegExp(`${attr}="([^"]+)"`, "g");
    let match;
    while ((match = pattern.exec(html))) {
      if (!(match[1] in EN.ui)) fail(`${page}: ${attr}="${match[1]}" is not an English UI key`);
    }
  }

  /* Counters and labels that page scripts rewrite. The key must exist and a
     counter template must carry {n}, so a switch can re-render it. */
  for (const [, key] of html.matchAll(/data-mg-text="([^"]+)"/g)) {
    if (!(key in EN.ui)) fail(`${page}: data-mg-text="${key}" is not an English UI key`);
  }
  for (const [, key, attrs] of html.matchAll(/<[^>]*data-mg-count="([^"]+)"([^>]*)>/g)) {
    if (!(key in EN.ui)) fail(`${page}: data-mg-count="${key}" is not an English UI key`);
    else if (!/\{n\}/.test(EN.ui[key])) fail(`${page}: data-mg-count="${key}" has no {n} placeholder`);
    else if (/\{m\}/.test(EN.ui[key]) && !/data-mg-m=/.test(attrs)) fail(`${page}: data-mg-count="${key}" needs data-mg-m`);
  }

  /* Native selects cannot hold markup, so option text has to be a whole
     translated string; a dashed English description is not translatable. */
  for (const [, attrs, label] of html.matchAll(/<option([^>]*)>([^<]*)</g)) {
    const value = label.replace(/&[a-z#0-9]+;/gi, " ").trim();
    if (/—/.test(value)) fail(`${page}: <option> "${value}" carries an English description`);
    else if (/[A-Za-z]{2}/.test(value) && !/data-i18n=/.test(attrs)) fail(`${page}: <option> "${value}" has no data-i18n hook`);
  }

  /* data-i18n replaces textContent, so an element that wraps markup would
     silently lose it (and its live value) on the first translation pass. */
  for (const [, inner] of html.matchAll(/<([a-z0-9]+)[^>]*\bdata-i18n="[^"]+"[^>]*>([\s\S]*?)<\/\1>/gi)) {
    if (/<[a-z]/i.test(inner)) fail(`${page}: a data-i18n element wraps markup, which translation would erase`);
  }

  const slugHooks = [...html.matchAll(/data-mg-(title|howto)="([^"]+)"/g)];
  for (const [, attr, slug] of slugHooks) {
    if (!SLUGS.includes(slug)) fail(`${page}: data-mg-${attr}="${slug}" is not a game slug`);
  }
  for (const [, key] of html.matchAll(/data-mg-cat="([^"]+)"/g)) {
    if (!CATS.includes(key)) fail(`${page}: data-mg-cat="${key}" is not a category key`);
  }
  for (const [, index] of html.matchAll(/data-mg-hub="([^"]+)"/g)) {
    if (!/^[0-7]$/.test(index)) fail(`${page}: data-mg-hub="${index}" is outside 0–7`);
  }
  for (const [, slugOrFamily] of html.matchAll(/data-mg-guide="([^"]+)"/g)) {
    if (!SLUGS.includes(slugOrFamily) && !FAMILIES.includes(slugOrFamily)) fail(`${page}: data-mg-guide="${slugOrFamily}" is not a game slug or guide family`);
  }

  /* Game pages carry a guide; pocket-sudoku is a one-line pointer page. */
  const slug = page.startsWith("games/") ? page.slice(6, -5) : "";
  if (SLUGS.includes(slug) && slug !== "pocket-sudoku" && !html.includes("mg-guide-en")) {
    fail(`${page}: English guide is not wrapped for replacement`);
  }
  if (/freebuff/i.test(html)) fail(`${page}: contains "freebuff"`);
}

/* The homepage shelf reads the same dictionaries through its own renderer. */
{
  const html = await readPage("index.html");
  if (html) {
    for (const asset of ["/langs.js", "/i18n.js", "/games/i18n-shelf.js", "/games/i18n-data-c.js"]) {
      if (!html.includes(asset)) fail(`index.html: missing ${asset}`);
    }
    for (const attr of HOOK_ATTRS) {
      const pattern = new RegExp(`${attr}="([^"]+)"`, "g");
      let match;
      while ((match = pattern.exec(html))) {
        if (!(match[1] in (HOME.en || {}))) fail(`index.html: ${attr}="${match[1]}" is not a homepage dictionary key`);
      }
    }
    const cards = (html.match(/data-mg-title="[a-z-]+"/g) || []).length;
    if (cards < 30) fail(`index.html: only ${cards} shelf cards carry data-mg-title`);
    if (/freebuff/i.test(html)) fail('index.html: contains "freebuff"');
  }
}

/* ── Languages declared once, used everywhere ──────────────────────────── */

for (const lang of LANGS) {
  const dicts = ["ui", "titles", "howto", "cats", "hub"].filter((name) => {
    const table = { ui: UI, titles: TITLES, howto: HOWTO, cats: CATS_BY_LANG, hub: HUB }[name][lang.code];
    return table && (Array.isArray(table) ? table.length : Object.keys(table).length);
  });
  if (dicts.length !== 5) fail(`langs.js: ${lang.code} is enabled but has no ${["ui", "titles", "howto", "cats", "hub"].filter((name) => !dicts.includes(name)).join("/")} dictionary`);
}
for (const code of ["ar", "he", "fa"]) {
  const meta = LANGS.find((lang) => lang.code === code);
  if (meta && !meta.rtl) fail(`langs.js: ${code} should be marked rtl`);
}
{
  const css = await readFile(join(ROOT, "games/i18n.css"), "utf8");
  if (!/\[dir="rtl"\]/.test(css)) fail("games/i18n.css: no [dir=\"rtl\"] rules");
}

/* ── English leftovers outside the dictionaries ───────────────────────── */

let tracked = [];
try {
  tracked = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean);
} catch {
  tracked = [];
}
const siteFiles = tracked.filter((file) =>
  /\.(html|css|js|mjs|py|xml|txt)$/i.test(file) &&
  !file.startsWith("tools/") &&
  !file.startsWith(".freebuff/") &&
  !file.startsWith("build/") &&
  !file.startsWith("site/") &&
  !file.startsWith("patches/") &&
  !file.startsWith("screenshots/") &&
  !file.startsWith("yesnowheel-updated/")
);
for (const file of siteFiles) {
  const source = await readFile(join(ROOT, file), "utf8");
  if (/freebuff/i.test(source)) fail(`${file}: mentions "freebuff"`);
}

/* ── Coverage report: visible English with no translation hook ─────────── */

const untranslated = new Map();
const withUntranslated = new Set();
const gamePages = (await readdir(join(ROOT, "games"))).filter((file) => file.endsWith(".html"));
for (const file of gamePages) {
  let html = await readFile(join(ROOT, "games", file), "utf8");
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  /* Drop the English essay that non-English languages replace. */
  const start = html.indexOf('class="mg-guide-en"');
  if (start > -1) {
    const begin = html.lastIndexOf("<div", start);
    let depth = 0;
    let cursor = begin;
    while (cursor < html.length) {
      const open = html.indexOf("<div", cursor);
      const close = html.indexOf("</div>", cursor);
      if (close === -1) break;
      if (open !== -1 && open < close) {
        depth += 1;
        cursor = open + 4;
      } else {
        depth -= 1;
        cursor = close + 6;
        if (depth === 0) break;
      }
    }
    html = html.slice(0, begin) + html.slice(cursor);
  }
  html = html
    .replace(/<!-- mg-related:start[\s\S]*?<!-- mg-related:end -->/g, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");

  const pattern = /<([a-z0-9]+)([^>]*)>([^<]+)</gi;
  let match;
  while ((match = pattern.exec(html))) {
    const [, tag, attrs, raw] = match;
    const value = raw.replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
    if (!/[A-Za-z]{2}/.test(value)) continue;
    if (/data-(i18n|mg-)/.test(attrs)) continue;
    /* Runtime-translated status/meta text, the English standfirsts and the
       generated tag chips are reported separately (see the notes below). */
    if (/class="(status|hint|meta|clue-text|mg-|sr-|updated|tag)/.test(attrs)) continue;
    if (["title", "h1", "a", "script", "style"].includes(tag)) continue;
    if (/^[▲◀▼▶✕×←→↑↓\d\s]+$/.test(value)) continue;
    if (!untranslated.has(value)) untranslated.set(value, new Set());
    untranslated.get(value).add(file);
    withUntranslated.add(file);
  }
}
if (untranslated.size) {
  const short = [...untranslated.entries()].filter(([value]) => value.length <= 40 && value.split(/\s+/).length <= 4);
  const where = (files) => [...files].map((file) => file.replace(/\.html$/, "")).join(", ");
  const top = short.sort((a, b) => b[1].size - a[1].size).slice(0, 12)
    .map(([value, files]) => `"${value}" (${where(files)})`).join(", ");
  const longPages = [...untranslated.entries()].filter(([value]) => !short.some(([label]) => label === value))
    .flatMap(([, files]) => [...files]);
  const longWhere = [...new Set(longPages)].map((file) => file.replace(/\.html$/, "")).join(", ");
  note(`ui coverage: ${short.length} short English label(s) and ${untranslated.size - short.length} English paragraph(s) have no hook, across ${withUntranslated.size} game page(s)${top ? ": " + top : ""}`);
  if (longWhere) note(`ui coverage: English paragraph(s) on ${longWhere}`);
}
{
  const html = await Promise.all(gamePages.map((file) => readFile(join(ROOT, "games", file), "utf8")));
  const withUpdated = html.filter((page) => /class="updated"/.test(page)).length;
  if (withUpdated) note(`ui coverage: ${withUpdated} game page(s) show an English standfirst (\`.updated\`) in every language`);
  const withRelated = html.filter((page) => /<!-- mg-related:start/.test(page)).length;
  if (withRelated) note(`ui coverage: ${withRelated} game page(s) carry a generated "More in …" block in English only`);
  const tagCount = html.reduce((total, page) => total + (page.match(/class="tag"/g) || []).length, 0);
  if (tagCount) note(`ui coverage: ${tagCount} generated tag chip(s) on game and category cards are English metadata`);
}

/* ── Report ───────────────────────────────────────────────────────────── */

if (STRICT_UI) problems.push(...coverage);
const counts = `${CODES.length} languages · ${SLUGS.length} game slugs · ${FAMILIES.length} guide families · ${pages.length + 1} pages · ${STATUS_KEYS.length} status lines · ${EN_UI_KEYS.length} UI keys`;
console.log(counts);
for (const problem of problems) console.log(`  ✗ ${problem}`);
if (coverage.length && !STRICT_UI) {
  console.log(`\ncoverage notes (${coverage.length}):`);
  for (const entry of coverage) console.log(`  · ${entry}`);
}
console.log(problems.length ? `\nproblems: ${problems.length}` : "\nlocalization: ok");
process.exit(problems.length ? 1 : 0);
