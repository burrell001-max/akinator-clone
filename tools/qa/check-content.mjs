#!/usr/bin/env node
/* Content QA for mindgenieai.xyz: thin pages, duplicates and sitemap drift.

     node tools/qa/check-content.mjs            # exits 1 on any problem
     node tools/qa/check-content.mjs --report   # also list the shortest pages

   Why this exists: the audit that cleared this site for review found one page
   with 145 visible words and no prose at all, and no existing check noticed.
   check-site.mjs proves the links and markup are wired; this file proves each
   page actually says something, that two pages are not the same page, and
   that sitemap.xml lists real, canonical, non-duplicate URLs.

   The same checks are folded into check-site.mjs (contentChecks), so the
   committed CI step runs them without a second command.

   Word counts use readable prose only: scripts, styles, navigation, the
   footer and the generated "more in this category" block are removed first,
   so a page cannot look substantial because of its chrome.
*/

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { extname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./lib.mjs";
import { CATEGORIES, GAMES } from "../content/games-data.mjs";

/* Floors. A page under the soft floor is listed for review; under the hard
   floor it fails. 404.html is the one page allowed to be short: it explains a
   dead end, so it has nothing to be long about. */
const HARD_FLOOR = 200;
const SOFT_FLOOR = 300;
const SHORT_OK = new Map([["404.html", 70]]);

/* A game page and the category page that lists it are allowed to carry the
   same name: /games/sudoku.html is the board, /games/sudoku/ is the shelf of
   boards. They are different pages with different jobs, not a copy. */
const shelfGames = new Map();
for (const key of Object.keys(CATEGORIES)) {
  const shelf = `games/${CATEGORIES[key].slug}/index.html`;
  shelfGames.set(shelf, new Set(GAMES.filter((entry) => entry.cats.includes(key)).map((entry) => `games/${entry.slug}.html`)));
}
const isBoardAndShelf = (a, b) =>
  (shelfGames.get(a) || new Set()).has(b) || (shelfGames.get(b) || new Set()).has(a);

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

/* Remove everything between an opening and a closing marker, repeatedly. */
function cutBetween(text, open, close) {
  let out = "";
  let i = 0;
  for (;;) {
    const a = text.indexOf(open, i);
    if (a === -1) {
      out += text.slice(i);
      break;
    }
    out += text.slice(i, a);
    const b = text.indexOf(close, a + open.length);
    if (b === -1) break;
    i = b + close.length;
  }
  return out;
}

function stripTags(text) {
  let out = "";
  let i = 0;
  for (;;) {
    const lt = text.indexOf("<", i);
    if (lt === -1) {
      out += text.slice(i);
      break;
    }
    out += text.slice(i, lt) + " ";
    const gt = text.indexOf(">", lt);
    if (gt === -1) break;
    i = gt + 1;
  }
  return out.replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
}

/* Git history is the only record of when a file actually changed. A shallow
   clone (the CI default) has one commit, so asking it about a page would
   return the wrong date for every page, and a wrong date is worse than no
   date: the check reports that history is unavailable and leaves the
   page-printed date and the format checks to do the work. */
function gitProbe(root) {
  const run = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  try {
    run(["rev-parse", "--is-inside-work-tree"]);
  } catch {
    return { available: false, why: "no git repository in this checkout" };
  }
  try {
    if (run(["rev-parse", "--is-shallow-repository"]) === "true") {
      return { available: false, why: "shallow clone, so commit dates are not per-file" };
    }
  } catch {
    /* older git without the flag: fall through and try */
  }
  return {
    available: true,
    lastCommit(rel) {
      try {
        const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", rel], {
          cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"]
        }).trim();
        return date || "";
      } catch {
        return "";
      }
    }
  };
}

function proseOf(html) {
  let body = html;
  body = cutBetween(body, "<script", "</script>");
  body = cutBetween(body, "<style", "</style>");
  body = cutBetween(body, "<footer", "</footer>");
  body = cutBetween(body, "<nav", "</nav>");
  body = cutBetween(body, "<header", "</header>");
  body = cutBetween(body, "<select", "</select>");
  body = cutBetween(body, "<!-- mg-related:start", "<!-- mg-related:end -->");
  const main = body.indexOf("<main");
  if (main !== -1) {
    const open = body.indexOf(">", main);
    const close = body.indexOf("</main>", open);
    if (open !== -1 && close !== -1) body = body.slice(open + 1, close);
  }
  return stripTags(body);
}

const wordsIn = (text) => text.split(" ").filter((word) => word.length > 1);
const sentencesIn = (text) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim())
    .filter((sentence) => sentence.split(" ").length >= 8);

/* Returns { problems, notes, pages, entries, aliases, skipped, shortest }.
   Nothing is printed and nothing exits, so check-site.mjs can fold the same
   results into its own report. */
export async function contentChecks(root = ROOT) {
  const problems = [];
  const notes = [];
  const fail = (file, message) => problems.push(`${file}: ${message}`);

  const files = await walk(root);
  const htmlFiles = files.filter((file) => extname(file) === ".html");

  const pages = [];
  const aliases = new Set();
  const skipped = [];

  for (const file of htmlFiles) {
    const rel = relative(root, file).split("\\").join("/");
    const html = await readFile(file, "utf8");

    /* Three kinds of file are not pages and are excluded by name, not by luck:
       the Search Console token and the OG-card render template have no body at
       all, and a meta-refresh alias is a redirect rather than content. */
    if (rel.startsWith("tools/") || rel.includes("googled") || !html.includes("<body")) {
      skipped.push(rel);
      continue;
    }
    if (html.includes('http-equiv="refresh"')) {
      aliases.add(rel);
      continue;
    }

    const prose = proseOf(html);
    const title = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "").trim();
    const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "").replace(/<[^>]*>/g, "").trim();
    pages.push({
      rel,
      words: wordsIn(prose).length,
      title,
      h1,
      paragraphs: html.split("<p").length - 1,
      sentences: sentencesIn(prose)
    });
  }

  /* ── Thin pages ────────────────────────────────────────────────────────── */
  for (const page of pages) {
    const floor = SHORT_OK.get(page.rel);
    if (floor !== undefined) {
      if (page.words < floor) fail(page.rel, `only ${page.words} words of prose, expected at least ${floor}`);
      continue;
    }
    if (page.words < HARD_FLOOR) {
      fail(page.rel, `thin page: ${page.words} words of prose, the floor is ${HARD_FLOOR}`);
    } else if (page.words < SOFT_FLOOR) {
      notes.push(`short page for review: ${page.rel} (${page.words} words)`);
    }
    if (page.paragraphs < 2) fail(page.rel, `has ${page.paragraphs} <p> element(s); a page needs prose, not just controls`);
  }

  /* ── Duplicate pages ───────────────────────────────────────────────────── */
  /* Two pages are "the same page" when most of their substantial sentences are
     identical. A shared one-line call to action is fine; a shared essay is not.

     Catalogue text is excluded from the comparison: every category page prints
     the same game blurbs for the games it cross-lists, so without this filter
     two shelves look like copies of each other while their prose is entirely
     different. A sentence found on three or more pages is generated metadata,
     not a page's own writing. */
  const sentenceOwners = new Map();
  for (const page of pages) {
    for (const sentence of new Set(page.sentences)) {
      if (!sentenceOwners.has(sentence)) sentenceOwners.set(sentence, []);
      sentenceOwners.get(sentence).push(page.rel);
    }
  }
  const ownSentences = (page) =>
    new Set(page.sentences.filter((sentence) => sentenceOwners.get(sentence).length < 3));

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i];
      const b = pages[j];
      if (isBoardAndShelf(a.rel, b.rel)) continue;
      const setA = ownSentences(a);
      const setB = ownSentences(b);
      if (setA.size < 3 || setB.size < 3) continue;
      let shared = 0;
      for (const sentence of setA) if (setB.has(sentence)) shared++;
      const ratio = shared / Math.min(setA.size, setB.size);
      if (ratio >= 0.5) fail(b.rel, `duplicates ${a.rel}: ${Math.round(ratio * 100)}% of its own sentences are identical`);
    }
  }

  const boilerplate = [...sentenceOwners].filter(([, owners]) => owners.length >= 4);
  if (boilerplate.length) {
    notes.push(`${boilerplate.length} sentence(s) repeat on four or more pages (shared call to action, not a duplicate page)`);
  }

  /* A page whose title and heading are both shared with another page is a copy
     with a new filename, however its sentences were reworded. */
  const byTitle = new Map();
  const byHeading = new Map();
  for (const page of pages) {
    if (page.title) {
      if (!byTitle.has(page.title)) byTitle.set(page.title, []);
      byTitle.get(page.title).push(page.rel);
    }
    if (page.h1) {
      if (!byHeading.has(page.h1)) byHeading.set(page.h1, []);
      byHeading.get(page.h1).push(page.rel);
    }
  }
  for (const [title, owners] of byTitle) {
    if (owners.length > 1 && !isBoardAndShelf(owners[0], owners[1])) {
      fail(owners[1], `shares its <title> with ${owners[0]}: "${title}"`);
    }
  }
  for (const [heading, owners] of byHeading) {
    if (owners.length > 1 && !isBoardAndShelf(owners[0], owners[1])) {
      fail(owners[1], `shares its <h1> with ${owners[0]}: "${heading}"`);
    }
  }

  /* ── Sitemap: real, canonical, unique, dated ───────────────────────────── */
  const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
    loc: (match[1].match(/<loc>([^<]+)<\/loc>/) || [])[1] || "",
    lastmod: (match[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || ""
  }));

  const seen = new Set();
  const today = new Date().toISOString().slice(0, 10);
  const listed = new Set();

  /* A <lastmod> is only worth having if it can be trusted, so it is checked
     against three things: its own format, the date the page itself prints, and
     the commit that last touched the file. The git half needs history: a
     shallow CI checkout reports nothing, so it is skipped with one note
     instead of failing every page. */
  const git = gitProbe(root);
  const visibleDate = (html) => {
    const dates = [...html.matchAll(/<time[^>]*datetime="(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
    return dates.length ? dates.sort().at(-1) : "";
  };

  for (const entry of entries) {
    if (!entry.loc) {
      fail("sitemap.xml", "an entry has no <loc>");
      continue;
    }
    if (seen.has(entry.loc)) fail("sitemap.xml", `lists ${entry.loc} more than once`);
    seen.add(entry.loc);

    if (entry.loc.includes("?") || entry.loc.includes("#")) {
      fail("sitemap.xml", `${entry.loc} carries a query string or fragment`);
    }
    if (!entry.loc.startsWith("https://mindgenieai.xyz/")) {
      fail("sitemap.xml", `${entry.loc} is not an absolute https URL on the canonical host`);
    }
    const path = entry.loc.replace("https://mindgenieai.xyz/", "");
    const target = path === "" || path.endsWith("/") ? join(root, path, "index.html") : join(root, path);
    if (!existsSync(target)) {
      fail("sitemap.xml", `${entry.loc} points at a file that does not exist`);
      continue;
    }
    const rel = relative(root, target).split("\\").join("/");
    if (aliases.has(rel)) fail("sitemap.xml", `${entry.loc} is a redirect alias, not a canonical page`);
    if (rel === "404.html") fail("sitemap.xml", "lists 404.html");
    if (!entry.lastmod) {
      fail("sitemap.xml", `${entry.loc} has no <lastmod>`);
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod)) {
      fail("sitemap.xml", `${entry.loc} has a malformed <lastmod> "${entry.lastmod}"`);
    } else {
      const bad = new Date(entry.lastmod);
      if (Number.isNaN(bad.getTime())) fail("sitemap.xml", `${entry.loc} has an impossible <lastmod> "${entry.lastmod}"`);
      if (entry.lastmod > today) fail("sitemap.xml", `${entry.loc} has a <lastmod> in the future ("${entry.lastmod}")`);

      const html = await readFile(target, "utf8");
      const printed = visibleDate(html);
      if (printed && printed !== entry.lastmod) {
        fail("sitemap.xml", `${entry.loc} says ${entry.lastmod} but the page prints ${printed}`);
      }
      /* When a page prints its own date, that date is the authority: a house
         style change (a footer link, an ad tag) is not a content change, and
         pushing lastmod forward for one would claim the page had changed.
         Pages with no printed date fall back to the commit that touched them. */
      if (git.available && !printed) {
        const changed = git.lastCommit(rel);
        if (changed && entry.lastmod < changed) {
          fail("sitemap.xml", `${entry.loc} is stale: lastmod ${entry.lastmod} is older than the last commit (${changed})`);
        }
      }
    }
    listed.add(rel);
  }

  /* Every real page belongs in the sitemap; aliases, 404 and tooling do not. */
  for (const page of pages) {
    if (page.rel === "404.html") continue;
    if (!listed.has(page.rel)) fail("sitemap.xml", `the page ${page.rel} is not listed`);
  }
  for (const alias of aliases) {
    if (listed.has(alias)) fail("sitemap.xml", `lists the alias ${alias}`);
  }

  if (!git.available) notes.push(`sitemap lastmod vs git: ${git.why}`);

  const shortest = [...pages].sort((a, b) => a.words - b.words).slice(0, 8);
  return { problems, notes, pages, aliases, skipped, entries, shortest };
}

async function main() {
  const report = process.argv.includes("--report");
  const { problems, notes, pages, aliases, skipped, entries, shortest } = await contentChecks();

  if (report) {
    console.log("shortest pages by prose words:");
    for (const page of shortest) console.log(`  ${String(page.words).padStart(5)}  ${page.rel}`);
    const sorted = [...pages].sort((a, b) => a.words - b.words);
    console.log(`\npages: ${pages.length} · aliases skipped: ${aliases.size} · non-pages skipped: ${skipped.length}`);
    console.log(`median prose words: ${sorted[Math.floor(sorted.length / 2)].words}`);
    console.log(`floor: ${HARD_FLOOR} words (fail), ${SOFT_FLOOR} words (review)`);
  }

  for (const note of notes) console.log(`note: ${note}`);
  for (const problem of problems) console.log(`FAIL: ${problem}`);
  console.log(`\n${pages.length} content pages · ${entries.length} sitemap URLs · ${aliases.size} aliases excluded`);
  console.log(`problems: ${problems.length}`);
  process.exit(problems.length ? 1 : 0);
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) await main();
