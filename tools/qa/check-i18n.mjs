/* Localization checks.

   Fails when a supported language is missing UI keys, a game title, a game
   instruction or a category name, and when a page that should offer the
   switcher does not load it. Run: node tools/qa/check-i18n.mjs */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT } from "./lib.mjs";

const problems = [];
const warn = (message) => problems.push(message);

/* The data files are browser globals, so evaluate them in a bare sandbox. */
const sandbox = {};
const load = async (...files) => {
  for (const file of files) {
    const source = await readFile(join(ROOT, file), "utf8");
    new Function("window", source)(sandbox);
  }
};
await load(
  "langs.js", "games/i18n-slugs.js",
  "games/i18n-data-a.js", "games/i18n-data-b.js", "games/i18n-data-c.js",
  "games/i18n-data-d.js", "games/i18n-data-e.js", "games/i18n-data-f.js",
  "games/i18n-data-g.js", "games/i18n-data-h.js", "games/i18n-data-i.js",
  "games/i18n-guides.js"
);

const LANGS = sandbox.LANGS;
const SLUGS = sandbox.MGI18N_SLUGS;
const CATS = sandbox.MGI18N_CAT_ORDER;
const A = sandbox.MGI18N_DATA_A;
const B = sandbox.MGI18N_DATA_B;
const C = sandbox.MGI18N_DATA_C;
const D = sandbox.MGI18N_DATA_D;
const E = sandbox.MGI18N_DATA_E;
const F = sandbox.MGI18N_DATA_F;
const G = sandbox.MGI18N_DATA_G;
const H = sandbox.MGI18N_DATA_H;
const I = sandbox.MGI18N_DATA_I;
const GUIDE_OF = sandbox.MGI18N_GUIDE || {};
const FAMILIES = [...new Set(Object.values(GUIDE_OF))];

if (!LANGS || LANGS.length !== 18) warn(`expected 18 languages, found ${LANGS && LANGS.length}`);
if (!SLUGS || SLUGS.length !== 30) warn(`expected 30 game slugs, found ${SLUGS && SLUGS.length}`);

const ui = (code) => ({ ...(A.ui.en || {}), ...(A.ui[code] || {}), ...(B.ui[code] || {}) });
const titles = (code) => (A.titles[code] || B.titles[code] || []);
const howto = (code) => (A.howto[code] || B.howto[code] || []);
const cats = (code) => (C.cats[code] || []);
const hub = (code) => (C.hub[code] || []);

/* Status lines: every language must cover every English key, and keep its
   placeholders, or a translated line would print the wrong value. */
const statusParts = [D, G, H, I].map((part) => part.status);
const statusEn = Object.assign({}, ...statusParts.map((part) => part.en));
const statusKeys = Object.keys(statusEn);
const placeholders = (text) => (String(text).match(/\{\d+\}/g) || []).sort().join(",");
for (const { code } of LANGS) {
  const table = statusParts.reduce((merged, part) => Object.assign(merged, part[code] || {}), {});
  const missing = statusKeys.filter((key) => !table[key]);
  if (missing.length) warn(`${code}: ${missing.length} missing status line(s)`);
  const broken = statusKeys.filter((key) => table[key] && placeholders(table[key]) !== placeholders(statusEn[key]));
  if (broken.length) warn(`${code}: ${broken.length} status line(s) with wrong placeholders, e.g. ${broken[0]}`);
}

/* Guides: one entry per mechanic family in every language, plus the rules and
   scoring bullets the English pages list. */
const guideParts = [E, F].map((part) => part.guides);
const guidePoints = sandbox.MGI18N_GUIDE_POINTS || {};
const bulletCount = (code, family) => (guidePoints[code] && guidePoints[code][family] ? guidePoints[code][family].length : 0);
const expectedBullets = 4;
for (const { code } of LANGS) {
  const table = guideParts.reduce((merged, part) => Object.assign(merged, part[code] || {}), {});
  for (const family of FAMILIES) {
    const paragraphs = table[family];
    if (!paragraphs || !paragraphs.length) warn(`${code}: missing guide for ${family}`);
    else if (paragraphs.some((para) => !para || para.length < 25)) warn(`${code}: thin guide paragraph in ${family}`);

    const bullets = (guidePoints[code] && guidePoints[code][family]) || [];
    if (bullets.length < expectedBullets) warn(`${code}: ${family} has ${bullets.length} of ${expectedBullets} rules bullets`);
    else if (bullets.some((line) => typeof line !== "string" || line.slice(0, 2) !== "- " || line.length < 15)) {
      warn(`${code}: malformed rules bullet in ${family}`);
    }
    if (code !== "en" && bulletCount(code, family) !== bulletCount("en", family)) {
      warn(`${code}: ${family} rules bullets do not match the English count`);
    }
  }
}

const enKeys = Object.keys(A.ui.en);
for (const { code } of LANGS) {
  const table = ui(code);
  const missingKeys = enKeys.filter((key) => !table[key]);
  if (missingKeys.length) warn(`${code}: ${missingKeys.length} missing UI key(s): ${missingKeys.slice(0, 6).join(", ")}`);

  const t = titles(code);
  if (t.length !== SLUGS.length) warn(`${code}: ${t.length} game titles, expected ${SLUGS.length}`);
  t.forEach((value, index) => { if (!value) warn(`${code}: empty title for ${SLUGS[index]}`); });

  const h = howto(code);
  if (h.length !== SLUGS.length) warn(`${code}: ${h.length} instructions, expected ${SLUGS.length}`);
  h.forEach((value, index) => { if (!value) warn(`${code}: empty instruction for ${SLUGS[index]}`); });

  const c = cats(code);
  if (c.length !== CATS.length) warn(`${code}: ${c.length} category names, expected ${CATS.length}`);
  if (hub(code).length !== 8) warn(`${code}: ${hub(code).length} hub strings, expected 8`);

  /* Duplicate titles across languages usually mean a copy-paste slip. */
  const englishTitles = titles("en");
  const same = t.filter((value, index) => value === englishTitles[index]).length;
  if (code !== "en" && same > 12) warn(`${code}: ${same}/30 titles identical to English — check for untranslated entries`);
}

/* Pages that must carry the switcher and the shared dictionaries. */
const pages = [
  "games/index.html",
  ...SLUGS.map((slug) => `games/${slug}.html`),
  ...["brain-games", "daily-games", "number-games", "word-games", "crosswords", "sudoku", "memory-games", "sort-games", "math-games", "puzzle-games"].map((dir) => `games/${dir}/index.html`)
];
for (const page of pages) {
  const html = await readFile(join(ROOT, page), "utf8");
  for (const asset of ["/langs.js", "/games/i18n-slugs.js", "/games/i18n-data-a.js", "/games/i18n-data-b.js", "/games/i18n-data-c.js", "/games/i18n-data-d.js", "/games/i18n-data-e.js", "/games/i18n-data-f.js", "/games/i18n-data-g.js", "/games/i18n-data-h.js", "/games/i18n-data-i.js", "/games/i18n.js"]) {
    if (!html.includes(asset)) warn(`${page}: missing ${asset}`);
  }
  if (!html.includes("/games/i18n.css")) warn(`${page}: missing /games/i18n.css`);
  if (!/data-mg-(title|cat|hub|howto)/.test(html)) warn(`${page}: no localization hooks`);
  /* Game pages carry a guide; pocket-sudoku is a one-line pointer page. */
  const slug = page.startsWith("games/") ? page.slice(6, -5) : "";
  if (SLUGS.includes(slug) && slug !== "pocket-sudoku" && !html.includes("mg-guide-en")) {
    warn(`${page}: English guide is not wrapped for replacement`);
  }
  if (/freebuff/i.test(html)) warn(`${page}: contains "freebuff"`);
}

/* The homepage shelf reads the same dictionaries through its own renderer. */
{
  const html = await readFile(join(ROOT, "index.html"), "utf8");
  for (const asset of ["/langs.js", "/games/i18n-shelf.js", "/games/i18n-data-c.js"]) {
    if (!html.includes(asset)) warn(`index.html: missing ${asset}`);
  }
  const cards = (html.match(/data-mg-title="[a-z-]+"/g) || []).length;
  if (cards < 30) warn(`index.html: only ${cards} shelf cards carry data-mg-title`);
  if (/freebuff/i.test(html)) warn('index.html: contains "freebuff"');
}

console.log(`languages: ${LANGS.length}  slugs: ${SLUGS.length}  pages checked: ${pages.length + 1}`);
for (const problem of problems) console.log(`  ✗ ${problem}`);
console.log(problems.length ? `\nproblems: ${problems.length}` : "\nlocalization: ok");
process.exit(problems.length ? 1 : 0);
