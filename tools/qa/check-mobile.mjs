#!/usr/bin/env node
/* 360px sweep for mindgenieai.xyz: overflow, clipped controls, broken images.

     node tools/qa/check-mobile.mjs            # exits 1 on any problem
     node tools/qa/check-mobile.mjs --only=/games/,/faq.html

   Why 360: that is the width of a small phone at 100% zoom, and it is the
   narrowest layout the site claims to support. A page that scrolls sideways
   at 360px drags every section out of alignment on a real device, so the test
   is deliberately blunt — the document must not be wider than the viewport,
   and nothing outside a deliberate horizontal scroller may stick out.

   Runs against the same local server and headless Chrome as the rest of the
   harness (no network, no page changes), so it can be run before every push.
*/

import { Chrome, serve } from "./lib.mjs";

const VIEWPORT = { width: 360, height: 780 };
const TOLERANCE = 1;

const CATEGORIES = [
  "brain-games", "daily-games", "number-games", "word-games", "crosswords",
  "sudoku", "memory-games", "sort-games", "math-games", "puzzle-games"
];

const PAGES = [
  "/",
  "/games/",
  ...CATEGORIES.map((slug) => `/games/${slug}/`),
  "/games/sudoku.html",
  "/games/memory.html",
  "/games/word-guess.html",
  "/games/crossword-daily.html",
  "/games/math-speed.html",
  "/games/sort-timeline.html",
  "/games/puzzle-slide.html",
  "/games/pocket-sudoku.html",
  "/games/number-merge.html",
  "/games/memory-echo.html",
  "/faq.html",
  "/how-to-play.html",
  "/history.html",
  "/blog.html",
  "/blog/probably-vs-dont-know.html",
  "/blog/why-characters-are-hard-to-guess.html",
  "/guide-inside-a-round.html",
  "/guide-playing-with-friends.html",
  "/guide-choosing-a-character.html",
  "/batman.html",
  "/harry-potter.html",
  "/sherlock-holmes.html",
  "/goku.html",
  "/about.html",
  "/contact.html",
  "/privacy-policy.html",
  "/cookie-policy.html",
  "/404.html",
  "/?lang=de",
  "/?lang=ar",
  "/?lang=ja",
  "/games/?lang=pt",
  "/games/sudoku.html?lang=ko",
  "/games/memory.html?lang=ar",
  "/games/pocket-sudoku.html?lang=fr"
];

/* Everything a 360px viewport must satisfy, measured in the page. */
const PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const name = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string"
    ? "." + el.className.split(" ").filter(Boolean)[0]
    : "");
  const ignored = (el) => {
    for (let node = el; node && node !== document.body; node = node.parentElement) {
      const id = (node.id || "") + " " + (typeof node.className === "string" ? node.className : "");
      if (/aswift|adsbygoogle|google-auto-placed|google_ads/.test(id)) return true;
      const style = getComputedStyle(node);
      /* Inside a deliberate scroller the content is meant to run past the edge. */
      if (/(auto|scroll)/.test(style.overflowX)) return true;
      /* Decoration that is clipped by its own container or cannot be tapped
         (the fixed starfield behind the homepage) cannot push the layout. */
      const root = node === document.documentElement || node === document.body;
      if (!root && /(hidden|clip)/.test(style.overflowX)) return true;
      if (style.pointerEvents === "none") return true;
      if (style.position === "fixed" && node.getBoundingClientRect().left < -1000) return true;
    }
    return false;
  };
  const wide = [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > vw + ${TOLERANCE})
    .filter((el) => !ignored(el))
    .slice(0, 4)
    .map(name);
  const clipped = [...document.querySelectorAll("button, .btn, .tag, .pill, .play-tag, select")]
    .filter((el) => el.getBoundingClientRect().width > 0 && el.scrollWidth > el.clientWidth + ${TOLERANCE})
    .slice(0, 4)
    .map(name);
  const broken = [...document.images]
    .filter((img) => img.complete && img.naturalWidth === 0)
    .map((img) => (img.getAttribute("src") || "").split("/").pop());
  const collapsed = [...document.images]
    .filter((img) => { const box = img.getBoundingClientRect(); return box.width < 1 || box.height < 1; })
    .length;
  return {
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    wide,
    clipped,
    broken,
    collapsed,
    lang: document.documentElement.lang,
    dir: document.documentElement.dir
  };
})()`;

const only = process.argv.find((arg) => arg.startsWith("--only="));
const paths = only ? only.slice("--only=".length).split(",").filter(Boolean) : PAGES;

const server = await serve();
const chrome = await Chrome.launch();
const failures = [];

try {
  for (const path of paths) {
    const page = await chrome.newPage({ url: server.origin + path, viewport: VIEWPORT });
    await page.evaluate("new Promise((resolve) => setTimeout(resolve, 350))", 10000).catch(() => {});
    let report;
    try {
      report = await page.evaluate(PROBE);
    } catch (error) {
      failures.push(`${path}: could not be measured (${error.message})`);
      console.log(`FAIL ${path} · measurement failed: ${error.message}`);
      await page.close();
      continue;
    }
    const errors = page.errors.slice(0, 3);
    const overflow = report.scrollWidth > report.viewport + TOLERANCE;
    const bad = overflow || report.wide.length || report.clipped.length || report.broken.length || errors.length;
    const detail = [
      `${report.viewport}x${VIEWPORT.height}`,
      overflow ? `scrollWidth ${report.scrollWidth}` : "no overflow",
      report.wide.length ? `outside: ${report.wide.join(", ")}` : "",
      report.clipped.length ? `clipped: ${report.clipped.join(", ")}` : "",
      report.broken.length ? `broken images: ${report.broken.join(", ")}` : "",
      report.collapsed ? `${report.collapsed} collapsed image(s)` : "",
      errors.length ? `errors: ${errors.join(" | ")}` : ""
    ].filter(Boolean).join(" · ");
    console.log(`${bad ? "FAIL" : "ok  "} ${path} · ${detail}`);
    if (bad) failures.push(`${path}: ${detail}`);
    await page.close();
  }
} finally {
  await chrome.close();
  await server.close();
}

console.log(`\n${paths.length} pages at ${VIEWPORT.width}px · ${failures.length} failure(s)`);
for (const failure of failures) console.log(`FAIL: ${failure}`);
process.exit(failures.length ? 1 : 0);
