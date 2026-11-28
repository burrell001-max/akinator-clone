#!/usr/bin/env node
/* Language contract test.

   Static half: every supported language carries the full prose set, the shell
   pages load the prose dictionaries, and every key page advertises all 18
   hreflang alternates plus x-default.

   Browser half: a shared ?lang= link opens the homepage, hub, a category page
   and a game page in that language, persists it to localStorage, sets
   <html lang/dir>, localizes the head metadata, and the switcher writes the
   query string back. An unknown code falls back to the saved preference or
   English.

     node tools/qa/check-lang.mjs

   Plain Node plus the headless Chrome the other browser checks already use.
   No network access and no dependencies. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, serve, Chrome } from "./lib.mjs";

const problems = [];
const fail = (message) => problems.push(message);
const pass = (message) => console.log(`ok   ${message}`);

/* ── Static: dictionaries, scripts, hreflang ─────────────────────────────── */

const sandbox = {};
for (const file of ["langs.js", "games/i18n-slugs.js", "games/i18n-data-a.js", "games/i18n-data-b.js", "games/i18n-data-c.js", "games/i18n-data-j.js", "games/i18n-prose.js", "games/i18n-prose-b.js", "games/i18n-prose-c.js", "games/i18n-prose-d.js"]) {
  new Function("window", await readFile(join(ROOT, file), "utf8"))(sandbox);
}
const LANGS = sandbox.LANGS || [];
const sandboxParts = ["A", "B", "C", "J"].map((letter) => sandbox[`MGI18N_DATA_${letter}`] || {});
const CODES = LANGS.map((lang) => lang.code);
const PROSE = {};
for (const part of sandbox.MGI18N_PROSE_PARTS || []) {
  for (const [code, table] of Object.entries(part)) PROSE[code] = Object.assign(PROSE[code] || {}, table);
}
const CATS = sandbox.MGI18N_CAT_ORDER || [];
const KINDS = ["catLede", "catOverview", "catTrains"];

if (CODES.length !== 18) fail(`expected 18 languages, found ${CODES.length}`);
if (CATS.length !== 10) fail(`expected 10 categories, found ${CATS.length}`);

for (const code of CODES) {
  for (const kind of KINDS) {
    for (const key of CATS) {
      const value = PROSE[code] && PROSE[code][kind] && PROSE[code][kind][key];
      if (typeof value !== "string" || value.trim().length < 8) {
        fail(`prose ${code}.${kind}.${key} is missing or too short`);
      }
    }
  }
}
if (!problems.length) pass("all 18 languages carry 30 prose strings (lede, overview, training)");

/* DE and PT are the two locales the editorial pass covers directly. Fail if a
   key disappears or silently falls back to English; brand names and loanwords
   are the only values allowed to match English exactly. */
const section = (name) => {
  const merged = {};
  for (const part of sandboxParts) {
    const table = part[name];
    if (!table) continue;
    for (const [code, value] of Object.entries(table)) {
      merged[code] = Array.isArray(value) ? value : Object.assign(merged[code] || {}, value);
    }
  }
  return merged;
};
const EN_UI = section("ui").en || {};
const UI = section("ui");
const TITLES = section("titles");
const HOWTO = section("howto");
const CAT_NAMES = section("cats");
const HUB_STRINGS = section("hub");
const ALLOW_SAME_UI = new Set(["nav_blog", "start", "level"]);

for (const code of ["de", "pt"]) {
  for (const key of Object.keys(EN_UI)) {
    const value = UI[code] && UI[code][key];
    if (typeof value !== "string" || !value.trim()) fail(`${code}: UI key ${key} is missing`);
    else if (value === EN_UI[key] && !ALLOW_SAME_UI.has(key)) fail(`${code}: UI key ${key} is still English`);
  }
  for (const [name, table] of [["title", TITLES], ["howto", HOWTO], ["category", CAT_NAMES], ["hub", HUB_STRINGS]]) {
    const english = table.en || [];
    const translated = table[code] || [];
    if (translated.length < english.length) fail(`${code}: ${name} list has ${translated.length} of ${english.length} entries`);
    english.forEach((value, index) => {
      const actual = translated[index];
      if (typeof actual !== "string" || !actual.trim()) fail(`${code}: ${name}[${index}] is missing`);
      else if (actual === value && value !== "Sudoku") fail(`${code}: ${name}[${index}] is still English (${value})`);
    });
  }
}
if (!problems.length) pass("de/pt cover every UI key, title, instruction, category and hub string");

/* The main switcher must honour ?lang= and keep storage/URL in step. */
const runtime = await readFile(join(ROOT, "games/i18n.js"), "utf8");
for (const needle of ['URLSearchParams(window.location.search).get("lang")', "localStorage.setItem(STORAGE_KEY", "searchParams.set(\"lang\"", "html.lang"]) {
  if (!runtime.includes(needle)) fail(`games/i18n.js: missing ${needle}`);
}
const home = await readFile(join(ROOT, "index.html"), "utf8");
for (const needle of ["langFromQuery", "syncLangUrl", "mindgenie_lang"]) {
  if (!home.includes(needle)) fail(`index.html: missing ${needle}`);
}
if (!problems.length) pass("homepage and arcade switchers implement the ?lang= contract");

/* hreflang: every key page advertises every language, plus x-default. */
const pages = [
  "index.html",
  "games/index.html",
  ...["brain-games", "daily-games", "number-games", "word-games", "crosswords", "sudoku", "memory-games", "sort-games", "math-games", "puzzle-games"].map((dir) => `games/${dir}/index.html`),
  "games/sudoku.html",
  "games/word-anagram.html",
  "games/puzzle-slide.html"
];
for (const page of pages) {
  const html = await readFile(join(ROOT, page), "utf8");
  const links = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)];
  const codes = links.map((match) => match[1]);
  for (const code of [...CODES, "x-default"]) {
    if (!codes.includes(code)) fail(`${page}: missing hreflang="${code}"`);
  }
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)">/) || [])[1];
  const xDefault = (links.find((match) => match[1] === "x-default") || [])[2];
  if (!canonical) fail(`${page}: missing canonical`);
  else if (xDefault !== canonical) fail(`${page}: x-default (${xDefault}) does not match canonical (${canonical})`);
  for (const [, code, href] of links) {
    if (!href.startsWith("https://mindgenieai.xyz/")) fail(`${page}: hreflang ${code} is not absolute`);
    if (code !== "x-default" && !new RegExp(`[?&]lang=${code}$`).test(href)) fail(`${page}: hreflang ${code} does not select the language`);
  }
  if (!/property="og:locale"/.test(html)) fail(`${page}: missing og:locale`);
  if (!/name="twitter:description"/.test(html)) fail(`${page}: missing twitter:description`);
}
if (!problems.length) pass("hreflang, canonical and social metadata are complete");

/* ── Browser: shared links, persistence and the switcher ────────────────── */

const server = await serve();
const chrome = await Chrome.launch();
const base = server.origin;

/* A fresh profile per case. Clearing storage through a preload would also run
   in the page's same-origin ad frames and wipe the key after boot, so open a
   neutral page, clear, then navigate to the shared link. */
async function fresh(path) {
  const page = await chrome.newPage({ url: base + "/" });
  await page.evaluate(`localStorage.clear()`);
  await page.goto(base + path);
  return page;
}

async function state(page) {
  return page.evaluate(`(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    stored: localStorage.getItem("mindgenie_lang"),
    search: location.search,
    desc: (document.querySelector('meta[name="description"]') || {}).content || "",
    locale: (document.querySelector('meta[property="og:locale"]') || {}).content || "",
    h1: (document.querySelector("h1") || {}).textContent || "",
    lede: (document.querySelector(".lede") || {}).textContent || "",
    card: (document.querySelector(".game-card p, .cat-card p") || {}).textContent || ""
  }))()`);
}

const cases = [
  { path: "/?lang=de", code: "de", label: "homepage", english: /Hello, I am MindGenie/, locale: "de_DE" },
  { path: "/games/?lang=pt", code: "pt", label: "hub", english: /Mind & Puzzle Games|Instant-play browser games/, locale: "pt_PT" },
  { path: "/games/brain-games/?lang=de", code: "de", label: "category", english: /Brain Games|The widest shelf/, locale: "de_DE" },
  { path: "/games/word-anagram.html?lang=pt", code: "pt", label: "game", english: /^Anagram Hunt$/, locale: "pt_PT" }
];

for (const test of cases) {
  const page = await fresh(test.path);
  const s = await state(page);
  const translated = s.h1 && !test.english.test(s.h1.trim());
  const descTranslated = s.desc && !/free|Thirty|Think of/i.test(s.desc);
  if (s.lang !== test.code) fail(`${test.label}: ?lang=${test.code} left html lang as ${s.lang}`);
  if (s.stored !== test.code) fail(`${test.label}: ?lang=${test.code} did not persist to localStorage`);
  if (!translated) fail(`${test.label}: ?lang=${test.code} did not translate the heading (${s.h1})`);
  if (!descTranslated) fail(`${test.label}: ?lang=${test.code} did not localize the description (${s.desc})`);
  if (s.locale !== test.locale) fail(`${test.label}: og:locale is ${s.locale}, expected ${test.locale}`);
  if (test.label === "homepage") {
    const shelf = await page.evaluate(`({
      title: (document.querySelector(".fb-card-title") || {}).textContent || "",
      pill: (document.querySelector(".fb-cat-btn") || {}).textContent || ""
    })`);
    if (shelf.title === "Codebreaker") fail(`homepage shelf title is still English (${shelf.title})`);
    if (shelf.pill === "All Games") fail(`homepage shelf filter is still English (${shelf.pill})`);
  }
  if (!problems.length) pass(`${test.label}: ?lang=${test.code} opens translated and persists`);
  await page.close();
}

/* Standfirsts: the line under a game heading is filled from
   games/i18n-standfirsts.js, so it must translate rather than fall back to the
   English sentence, and the longer translations must still fit a 360px phone. */
{
  const before = problems.length;
  for (const code of ["de", "pt", "ja", "ar", "ru"]) {
    const page = await chrome.newPage({
      url: base + `/games/sudoku-mini.html?lang=${code}`,
      viewport: { width: 360, height: 780 }
    });
    const seen = await page.evaluate(`(() => {
      const el = document.querySelector("[data-mg-standfirst]");
      return {
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        text: el ? el.textContent.trim() : "",
        english: el ? (el.getAttribute("data-en") || "").trim() : "",
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      };
    })()`);
    if (seen.lang !== code) fail(`standfirst: ?lang=${code} left html lang as ${seen.lang}`);
    if (!seen.text) fail(`standfirst: empty in ${code}`);
    else if (!seen.english || seen.text === seen.english) fail(`standfirst: still the English sentence in ${code}`);
    if (seen.overflow) fail(`standfirst: ${code} overflows the 360px viewport`);
    if (code === "ar" && seen.dir !== "rtl") fail("standfirst: Arabic did not set dir=rtl");
    await page.close();
  }
  /* English must be untouched: the runtime restores the page's own wording
     from data-en, so a rewrite here would ship silently to the default view. */
  {
    const page = await fresh("/games/sudoku-mini.html");
    const text = await page.evaluate("((document.querySelector('[data-mg-standfirst]') || {}).textContent || '').trim()");
    if (!/four-by-four|Four by four/i.test(text)) fail(`standfirst: English lost its own wording ("${text}")`);
    await page.close();
  }
  if (problems.length === before) pass("standfirsts translate and fit a 360px phone");
}

/* Unknown code: saved preference wins; with nothing saved, English. */
{
  const page = await fresh("/games/?lang=zz");
  const s = await state(page);
  if (s.lang !== "en") fail(`invalid ?lang=zz should fall back to English, got ${s.lang}`);
  else pass("invalid ?lang= falls back to the saved language or English");
  await page.close();
}

/* RTL language flips direction. */
{
  const page = await fresh("/games/?lang=ar");
  const s = await state(page);
  if (s.lang !== "ar" || s.dir !== "rtl") fail(`Arabic should be ar/rtl, got ${s.lang}/${s.dir}`);
  else pass("Arabic sets lang=ar and dir=rtl");
  await page.close();
}

/* Arcade switcher updates html lang, storage and the query string. */
{
  const page = await fresh("/games/?lang=de");
  await page.evaluate(`(() => {
    const btn = document.querySelector(".mg-lang .lang-btn");
    btn.click();
    const item = Array.from(document.querySelectorAll(".mg-lang-menu [data-lang-code]")).find(b => b.getAttribute("data-lang-code") === "pt");
    item.click();
  })()`);
  const s = await state(page);
  if (s.lang !== "pt") fail(`arcade switcher left html lang as ${s.lang}`);
  if (s.stored !== "pt") fail(`arcade switcher left storage as ${s.stored}`);
  if (!/[?&]lang=pt/.test(s.search)) fail(`arcade switcher did not update the URL (${s.search})`);
  if (!/Trinta|jogos|Jogos/.test(s.desc)) fail(`arcade switcher did not localize the description (${s.desc})`);
  if (!problems.length) pass("arcade switcher syncs language, storage and ?lang=");
  await page.close();
}

/* Homepage switcher does the same. */
{
  const page = await fresh("/");
  await page.evaluate(`(() => {
    document.getElementById("langBtn").click();
    const item = Array.from(document.querySelectorAll("#langMenu button")).find(b => b.textContent === "Deutsch");
    item.click();
  })()`);
  const s = await state(page);
  if (s.lang !== "de") fail(`homepage switcher left html lang as ${s.lang}`);
  if (s.stored !== "de") fail(`homepage switcher left storage as ${s.stored}`);
  if (!/[?&]lang=de/.test(s.search)) fail(`homepage switcher did not update the URL (${s.search})`);
  if (!/Dschinn|Figur/.test(s.desc)) fail(`homepage switcher did not localize the description (${s.desc})`);
  if (!problems.length) pass("homepage switcher syncs language, storage and ?lang=");
  await page.close();
}

await chrome.close();
await server.close();

if (problems.length) {
  for (const problem of problems) console.log(`FAIL ${problem}`);
  console.log(`\n${problems.length} language problem(s)`);
  process.exit(1);
}
console.log("\nlanguage contract: ok");
