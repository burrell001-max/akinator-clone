#!/usr/bin/env node
/* Static QA for mindgenieai.xyz: links, ids, scripts, category wiring and
   storage keys. Runs without a browser and without dependencies.

     node tools/qa/check-site.mjs

   Exits non-zero when a check fails. The browser half of the harness lives in
   win-paths.mjs; this half catches the mistakes that break a page before any
   JavaScript runs.
*/

import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { ROOT } from "./lib.mjs";
import { CATEGORIES, CATEGORY_ORDER, GAMES } from "../content/games-data.mjs";

const problems = [];
const notes = [];
const fail = (file, message) => problems.push(`${file}: ${message}`);

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const byPath = new Set(files.map((file) => file.replace(/\\/g, "/")));

const CATEGORY_KEYS = ["brain", "daily", "number", "word", "crossword", "sudoku", "memory", "sort", "math", "puzzle"];

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return match ? match[1] : "";
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
}

/* ── Every page: ids, links, scripts ─────────────────────────────────────── */
for (const file of htmlFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const html = await readFile(file, "utf8");
  const body = stripTags(html);

  const ids = [...body.matchAll(/\sid\s*=\s*"([^"]+)"/gi)].map((match) => match[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) fail(rel, `duplicate id "${id}"`);
    seen.add(id);
  }

  const refs = [...html.matchAll(/(?:href|src)\s*=\s*"([^"]+)"/gi)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(ref)) continue;
    const clean = ref.split("?")[0].split("#")[0];
    if (!clean) continue;
    const target = clean.startsWith("/") ? join(ROOT, clean) : join(file, "..", clean);
    const asFile = target.endsWith("/") ? join(target, "index.html") : target;
    if (!existsSync(asFile)) fail(rel, `missing local target "${ref}"`);
  }

  /* Inline scripts have to parse. node --check needs files, so keep it cheap:
     unbalanced braces and stray "</script" are the usual culprits. */
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  for (const source of scripts) {
    if (/<\/script/i.test(source)) fail(rel, "inline script contains a literal </script");
    const opens = (source.match(/\{/g) || []).length;
    const closes = (source.match(/\}/g) || []).length;
    if (opens !== closes) fail(rel, `inline script has ${opens} "{" and ${closes} "}"`);
  }
}

/* ── Games hub: category keys, cards and the ribbon ──────────────────────── */
const hubPath = join(ROOT, "games/index.html");
const hub = await readFile(hubPath, "utf8");

const pills = [...hub.matchAll(/data-filter="([^"]+)"/g)].map((match) => match[1]);
const expectedFilters = ["all", ...CATEGORY_KEYS];
for (const key of expectedFilters) {
  if (!pills.includes(key)) fail("games/index.html", `hub is missing the "${key}" filter pill`);
}
for (const key of pills) {
  if (!expectedFilters.includes(key)) fail("games/index.html", `unknown filter pill "${key}"`);
}

const cards = [...hub.matchAll(/<a class="game-card"[\s\S]*?<\/a>/g)].map((match) => match[0]);
if (cards.length !== 30) notes.push(`hub lists ${cards.length} game cards`);
for (const card of cards) {
  const href = attr(card, "href");
  const cats = attr(card, "data-cats").split(/\s+/).filter(Boolean);
  if (!existsSync(join(ROOT, href))) fail("games/index.html", `card target missing "${href}"`);
  if (!cats.length) fail("games/index.html", `card ${href} has no data-cats`);
  for (const cat of cats) {
    if (!CATEGORY_KEYS.includes(cat)) fail("games/index.html", `card ${href} uses unknown category "${cat}"`);
  }
}

/* The ribbon is the site-wide category nav: its targets must be real filters,
   otherwise a click lands on an unfiltered grid. */
const ribbonPages = files.filter((file) => extname(file) === ".html");
let ribbonCount = 0;
for (const file of ribbonPages) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const html = await readFile(file, "utf8");
  if (!html.includes("mg-cat-ribbon")) continue;
  ribbonCount++;
  const links = [...html.matchAll(/class="mg-cat-ribbon[^"]*"[\s\S]*?<\/nav>/g)]
    .flatMap((match) => [...match[0].matchAll(/href="\/games\/#([^"]+)"/g)].map((link) => link[1]));
  if (links.length !== CATEGORY_KEYS.length) {
    fail(rel, `ribbon has ${links.length} category links, expected ${CATEGORY_KEYS.length}`);
  }
  for (const key of links) {
    if (!CATEGORY_KEYS.includes(key)) fail(rel, `ribbon links to unknown category "#${key}"`);
  }
  if (!/<link rel="stylesheet" href="\/games\/ribbon\.css">/.test(html)) {
    fail(rel, "ribbon markup without the ribbon.css stylesheet");
  }
}
notes.push(`${ribbonCount} pages carry the category ribbon`);

/* ── Category pages, related blocks and social cards ─────────────────────── */
/* The category pages, the related-game blocks and every og:image are produced
   by tools/build/build-pages.mjs from tools/content/games-data.mjs. These
   checks compare the output back against that data, so a hand edit that drifts
   from the source of truth fails here instead of shipping. */

const hubCardCats = new Map();
for (const card of cards) {
  const slug = attr(card, "href").replace("/games/", "").replace(".html", "");
  hubCardCats.set(slug, attr(card, "data-cats").split(/\s+/).filter(Boolean));
}
for (const game of GAMES) {
  const cats = hubCardCats.get(game.slug);
  if (!cats) fail("games/index.html", `no hub card for ${game.slug}`);
  else if (cats.join(" ") !== game.cats.join(" ")) {
    fail("games/index.html", `card ${game.slug} says "${cats.join(" ")}", games-data.mjs says "${game.cats.join(" ")}"`);
  }
}

const ogTitles = new Map();
const ogImages = new Map();
const listedOn = new Map();
const localFile = (url) => join(ROOT, url.replace("https://mindgenieai.xyz/", ""));

function social(rel, html) {
  const title = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1];
  const image = (html.match(/<meta property="og:image" content="([^"]*)"/) || [])[1];
  const twitter = (html.match(/<meta name="twitter:image" content="([^"]*)"/) || [])[1];
  if (!title) fail(rel, "no og:title");
  else {
    if (ogTitles.has(title)) fail(rel, `og:title duplicates ${ogTitles.get(title)}`);
    else ogTitles.set(title, rel);
  }
  if (!image) fail(rel, "no og:image");
  else {
    if (!image.startsWith("https://mindgenieai.xyz/")) fail(rel, `og:image is not absolute: ${image}`);
    else {
      const file = localFile(image);
      if (!existsSync(file)) fail(rel, `og:image points at a missing file: ${image}`);
      if (ogImages.has(image)) fail(rel, `og:image duplicates ${ogImages.get(image)}`);
      else ogImages.set(image, rel);
    }
    if (twitter !== image) fail(rel, "twitter:image differs from og:image");
  }
}

for (const key of CATEGORY_ORDER) {
  const cat = CATEGORIES[key];
  const rel = `games/${cat.slug}/index.html`;
  const file = join(ROOT, rel);
  if (!existsSync(file)) {
    fail(rel, "category page missing (run node tools/build/build-pages.mjs)");
    continue;
  }
  const html = await readFile(file, "utf8");
  const expected = GAMES.filter((game) => game.cats.includes(key));

  if (!html.includes(`<h1>${cat.name}</h1>`)) fail(rel, `h1 is not "${cat.name}"`);
  if (!html.includes('href="/games/games.css"')) fail(rel, "does not load games.css");
  if (!html.includes('href="/games/ribbon.css"')) fail(rel, "does not load ribbon.css");
  if (!html.includes('href="/games/"')) fail(rel, "does not link back to the hub");
  if (!html.includes(`<link rel="canonical" href="https://mindgenieai.xyz/games/${cat.slug}/">`)) {
    fail(rel, "canonical is not the clean category URL");
  }
  for (const other of CATEGORY_ORDER) {
    if (other === key) continue;
    if (!html.includes(`href="/games/${CATEGORIES[other].slug}/"`)) fail(rel, `does not cross-link /games/${CATEGORIES[other].slug}/`);
  }
  for (const game of expected) {
    if (!html.includes(`href="/games/${game.slug}.html"`)) fail(rel, `is missing ${game.slug}`);
    listedOn.set(game.slug, (listedOn.get(game.slug) || 0) + 1);
  }
  social(rel, html);
}

for (const game of GAMES) {
  const rel = `games/${game.slug}.html`;
  const html = await readFile(join(ROOT, rel), "utf8");

  const starts = (html.match(/mg-related:start/g) || []).length;
  if (starts !== 1) fail(rel, `expected exactly one generated related block, found ${starts}`);
  const from = html.indexOf("mg-related:start");
  const to = html.indexOf("mg-related:end");
  if (from !== -1 && to > from) {
    const block = html.slice(from, to);
    const links = [...block.matchAll(/href="\/games\/([a-z0-9-]+)\.html"/g)].map((match) => match[1]);
    if (links.length < 3) fail(rel, `related block links ${links.length} games, expected at least 3`);
    if (links.includes(game.slug)) fail(rel, "related block links to the page itself");
    if (!block.includes(`/games/${CATEGORIES[game.cats[0]].slug}/`)) fail(rel, "related block does not link its category page");
  }
  if (!listedOn.has(game.slug)) fail(rel, "appears on no category page (orphan)");
  social(rel, html);
}

const hubHtml = await readFile(hubPath, "utf8");
const hubRows = (hubHtml.match(/hub-catlinks:start/g) || []).length;
if (hubRows !== 1) fail("games/index.html", `expected exactly one category link row, found ${hubRows}`);
for (const key of CATEGORY_ORDER) {
  if (!hubHtml.includes(`href="/games/${CATEGORIES[key].slug}/"`)) {
    fail("games/index.html", `hub does not link the ${CATEGORIES[key].name} category page`);
  }
}
social("games/index.html", hubHtml);
notes.push(`${ogImages.size} social images referenced`);

/* ── Storage keys ────────────────────────────────────────────────────────── */
const storageKeys = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1]).join("\n");
  for (const match of scripts.matchAll(/"(mg-[a-z0-9-]+)"/g)) {
    const key = match[1];
    if (!storageKeys.has(key)) storageKeys.set(key, new Set());
    storageKeys.get(key).add(rel);
  }
}
for (const [key, users] of storageKeys) {
  if (!/^mg-[a-z0-9-]+$/.test(key)) fail("storage", `key "${key}" is not kebab-case`);
  if (users.size > 3) notes.push(`key ${key} is used by ${users.size} pages`);
}
notes.push(`${storageKeys.size} localStorage keys declared`);

/* ── Sitemap ─────────────────────────────────────────────────────────────── */
const sitemap = await readFile(join(ROOT, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()));

/* Every sitemap entry must point at something that exists. */
for (const url of sitemapUrls) {
  const path = url.replace(/^https:\/\/mindgenieai\.xyz\//, "").split("?")[0].split("#")[0];
  const target = path === "" || path.endsWith("/") ? join(ROOT, path, "index.html") : join(ROOT, path);
  if (!existsSync(target)) fail("sitemap.xml", `entry points at a missing file: ${url}`);
}

/* The arcade is the part that must never drop out of the sitemap. */
for (const file of htmlFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (!rel.startsWith("games/")) continue;
  if (rel === "games/index.html") {
    if (!sitemapUrls.has("https://mindgenieai.xyz/games/")) fail("sitemap.xml", "missing the hub: /games/");
    continue;
  }
  /* Directory pages are published at the clean URL, without index.html. */
  const url = `https://mindgenieai.xyz/${rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel}`;
  if (!sitemapUrls.has(url)) fail("sitemap.xml", `missing game page ${url}`);
}

const unlisted = htmlFiles.filter((file) => {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (rel.startsWith("tools/")) return false;
  const clean = rel === "index.html" ? "" : rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
  return !sitemapUrls.has(`https://mindgenieai.xyz/${clean}`);
});
if (unlisted.length) notes.push(`${unlisted.length} pages are intentionally absent from the sitemap (aliases, 404, verification files)`);

/* ── Report ──────────────────────────────────────────────────────────────── */
const summary = [
  `${htmlFiles.length} HTML pages`,
  `${files.length} files`,
  `${sitemapUrls.size} sitemap URLs`,
  `${cards.length} hub cards`,
  `${pills.length} filter pills`,
  `${CATEGORY_ORDER.length} category pages`
].join(" · ");

for (const note of notes) console.log(`note: ${note}`);
for (const problem of problems) console.log(`FAIL: ${problem}`);
console.log(`\n${summary}`);
console.log(`problems: ${problems.length}`);
process.exit(problems.length ? 1 : 0);
