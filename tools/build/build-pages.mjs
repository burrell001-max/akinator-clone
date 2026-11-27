#!/usr/bin/env node
/* Builds the derived arcade pages from tools/content/games-data.mjs:

     1. /games/<category>/index.html  — ten category landing pages
     2. a "More in this category" block on every game page
     3. unique og:image / twitter:image tags on every game and category page
     4. the category link row in the hub footer

   Re-runnable: every generated region is wrapped in an HTML comment marker, so
   a second run replaces it instead of duplicating it. The hand-written parts of
   each game page are never touched.

     node tools/build/build-pages.mjs
*/

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { ROOT } from "../qa/lib.mjs";
import { CATEGORIES, CATEGORY_ORDER, GAMES, NEIGHBOURS } from "../content/games-data.mjs";

const SITE = "https://mindgenieai.xyz";
const OG_DIR = "games/og";
const pagePath = (cat) => join(ROOT, "games", cat.slug, "index.html");

const bySlug = new Map(GAMES.map((game) => [game.slug, game]));
const inCategory = (key) => GAMES.filter((game) => game.cats.includes(key));
const esc = (text) => String(text)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const RIBBON = (current) => CATEGORY_ORDER.map((key) => {
  const cat = CATEGORIES[key];
  const currentAttr = key === current ? ' aria-current="page"' : "";
  return `    <a href="/games/#${key}"${currentAttr}>${esc(cat.name)}</a>\n    <span class="mg-cat-sep" aria-hidden="true"></span>`;
}).join("\n").replace(/\n {4}<span class="mg-cat-sep" aria-hidden="true"><\/span>$/, "");

const ogImage = (name) => `${SITE}/${OG_DIR}/${name}.jpg`;

/* ── Category pages ──────────────────────────────────────────────────────── */

function card(game, key) {
  return `      <a class="card cat-card" href="/games/${game.slug}.html">
        <span class="cat-card-glyph" aria-hidden="true">${game.glyph}</span>
        <h3>${esc(game.name)}</h3>
        <p>${esc(game.blurb)}</p>
        <span class="tag">${esc(game.difficulty)}</span>${game.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}
      </a>`;
}

function categoryPage(key) {
  const cat = CATEGORIES[key];
  const games = inCategory(key).sort((a, b) => {
    const primary = (game) => (game.cats[0] === key ? 0 : 1);
    return primary(a) - primary(b) || GAMES.indexOf(a) - GAMES.indexOf(b);
  });
  const canonical = `${SITE}/games/${cat.slug}/`;
  const image = ogImage(`category-${cat.slug}`);
  const others = CATEGORY_ORDER.filter((other) => other !== key);
  const count = games.length;

  const itemList = games.map((game, index) =>
    `      { "@type": "ListItem", "position": ${index + 1}, "url": "${SITE}/games/${game.slug}.html", "name": ${JSON.stringify(game.name)} }`
  ).join(",\n");

  const jsonLd = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": ${JSON.stringify(cat.name)},
      "description": ${JSON.stringify(cat.description)},
      "url": ${JSON.stringify(canonical)},
      "isPartOf": { "@type": "WebSite", "name": "MindGenie AI", "url": "${SITE}/" },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": ${count},
        "itemListElement": [
${itemList}
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/" },
        { "@type": "ListItem", "position": 2, "name": "Games", "item": "${SITE}/games/" },
        { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(cat.name)}, "item": ${JSON.stringify(canonical)} }
      ]
    }
  ]
}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(cat.title)}</title>
<meta name="description" content="${esc(cat.description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MindGenie AI">
<meta property="og:title" content="${esc(cat.title)}">
<meta property="og:description" content="${esc(cat.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(cat.name)} on MindGenieAI - free browser games">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(cat.title)}">
<meta name="twitter:description" content="${esc(cat.description.split(". ")[0])}.">
<meta name="twitter:image" content="${image}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0a101f">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="stylesheet" href="/games/games.css">
<link rel="stylesheet" href="/games/ribbon.css">
<script type="application/ld+json">
${jsonLd}
</script>
</head>
<body>
<div class="wrap wrap--wide">
  <div class="top">
    <a class="brand" href="/">MindGenie AI</a>
    <nav aria-label="Primary">
      <a href="/">Play the Genie</a>
      <a href="/games/" aria-current="page">Games</a>
      <a href="/games/${cat.slug}/">${esc(cat.name)}</a>
    </nav>
  </div>

  <nav class="mg-cat-ribbon mg-cat-ribbon--compact" aria-label="Game categories">
${RIBBON(key)}
  </nav>

  <main>
    <p class="eyebrow">Category &middot; ${count} ${count === 1 ? "game" : "games"}</p>
    <h1>${esc(cat.name)}</h1>
    <p class="lede">${esc(cat.lede)}</p>
    <p class="updated">Free to play in the browser &middot; no account &middot; scores saved on this device</p>

    <div class="toolbar">
      <a class="btn" href="/games/">All 30 games</a>
      <a class="btn ghost" href="/games/#${key}">Filter the hub to ${esc(cat.name)}</a>
    </div>

    <section aria-labelledby="cat-games">
      <div class="section-head">
        <h2 id="cat-games">Games in this category</h2>
        <span class="filter-note">${count} playable &middot; this shelf's own games first</span>
      </div>
      <div class="grid cat-grid">
${games.map((game) => card(game, key)).join("\n")}
      </div>
    </section>

    <section aria-labelledby="cat-overview">
      <h2 id="cat-overview">What ${esc(cat.name.toLowerCase())} are</h2>
${cat.overview.map((para) => `      <p>${esc(para)}</p>`).join("\n")}
      <h3>What they train</h3>
      <p>${esc(cat.trains)}</p>
    </section>

    <section aria-labelledby="cat-howto">
      <h2 id="cat-howto">How to play</h2>
${cat.howto.map((para) => `      <p>${esc(para)}</p>`).join("\n")}
      <div class="note">
        <strong>No setup required.</strong> Every game opens straight into a board. Progress is stored in your own browser under <code>mg-</code> keys &mdash; clearing site data resets it.
      </div>
    </section>

    <section aria-labelledby="cat-tips">
      <h2 id="cat-tips">Tips that actually help</h2>
      <ul>
${cat.tips.map((tip) => `        <li>${esc(tip)}</li>`).join("\n")}
      </ul>
    </section>

    <section aria-labelledby="cat-other">
      <h2 id="cat-other">Other shelves in the arcade</h2>
      <p class="filter-note">Ten categories, thirty games, one page each.</p>
      <div class="chips">
${others.map((other) => `        <a class="chip" href="/games/${CATEGORIES[other].slug}/">${esc(CATEGORIES[other].name)}</a>`).join("\n")}
      </div>
    </section>
  </main>

  <footer>
    <a href="/games/">All games</a>
    <a href="/">MindGenie AI</a>
    <a href="/blog.html">Blog</a>
    <a href="/privacy-policy.html">Privacy Policy</a>
  </footer>
</div>
</body>
</html>
`;
}

/* ── Game pages: og:image and the related block ──────────────────────────── */

const RELATED_START = "<!-- mg-related:start (generated by tools/build/build-pages.mjs) -->";
const RELATED_END = "<!-- mg-related:end -->";

function rewriteImage(html, image, alt) {
  const imageBlock = [
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${alt}">`,
    `<meta name="twitter:image" content="${image}">`
  ].join("\n");

  let out = html
    .replace(/[ \t]*<meta property="og:image"[^>]*>\r?\n?/g, "")
    .replace(/[ \t]*<meta property="og:image:(?:width|height|alt)"[^>]*>\r?\n?/g, "")
    .replace(/[ \t]*<meta name="twitter:image"[^>]*>\r?\n?/g, "");

  if (out.includes('<meta name="robots"')) {
    out = out.replace(/[ \t]*<meta name="robots"/, `${imageBlock}\n<meta name="robots"`);
  } else if (out.includes("</head>")) {
    out = out.replace("</head>", `${imageBlock}\n</head>`);
  }
  return out;
}

function relatedBlock(game) {
  const home = game.cats[0];
  const cat = CATEGORIES[home];
  const siblings = inCategory(home).filter((other) => other.slug !== game.slug).slice(0, 4);
  /* One representative from each adjacent shelf: a game whose *home* is that
     category, so "also try" crosses shelves instead of repeating siblings. */
  const alsoTry = NEIGHBOURS[home]
    .map((key) => inCategory(key).find((other) => other.cats[0] === key && other.slug !== game.slug))
    .filter(Boolean);

  return `${RELATED_START}
    <section class="mg-related" aria-labelledby="mg-related-title">
      <div class="section-head">
        <h2 id="mg-related-title">More in ${esc(cat.name)}</h2>
        <a class="mg-related-all" href="/games/${cat.slug}/">All ${inCategory(home).length} ${esc(cat.name.toLowerCase())} &rarr;</a>
      </div>
      <div class="grid mg-related-grid">
${siblings.map((other) => `        <a class="card" href="/games/${other.slug}.html">
          <span class="cat-card-glyph" aria-hidden="true">${other.glyph}</span>
          <h3>${esc(other.name)}</h3>
          <p>${esc(other.blurb)}</p>
          <span class="tag">${esc(other.difficulty)}</span>
        </a>`).join("\n")}
      </div>
      <p class="mg-related-alt">Also try:
${alsoTry.map((other) => `        <a href="/games/${other.slug}.html">${esc(other.name)}</a> <span class="mg-dot" aria-hidden="true">&middot;</span>`).join("\n")}
        <a href="/games/">the full hub</a>
      </p>
    </section>
    ${RELATED_END}`;
}

function patchGamePage(html, game) {
  let out = html;

  // Drop an earlier generated block, then insert a fresh one before the footer.
  const existing = new RegExp(`\\n?[ \\t]*${RELATED_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${RELATED_END}`);
  out = out.replace(existing, "");

  const block = relatedBlock(game);
  /* Most pages close with a footer inside .wrap. Pocket Sudoku is the compact
     layout with no footer at all, so fall back to the line holding the last
     closing </div>, which is the .wrap element both layouts share. */
  let insertAt = out.search(/\n\s*<footer[\s>]/);
  if (insertAt === -1) {
    const close = out.lastIndexOf("</div>");
    insertAt = close === -1 ? -1 : out.lastIndexOf("\n", close);
  }
  if (insertAt === -1) throw new Error(`${game.slug}: no footer or wrap close to anchor the related block`);
  out = out.slice(0, insertAt) + "\n\n" + block + out.slice(insertAt);

  const cat = CATEGORIES[game.cats[0]];
  out = rewriteImage(out, ogImage(game.slug), `${game.name} - ${cat.name} on MindGenieAI`);
  return out;
}

/* ── Hub footer category row ─────────────────────────────────────────────── */

const HUB_START = "<!-- hub-catlinks:start (generated) -->";
const HUB_END = "<!-- hub-catlinks:end -->";

const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function patchHub(html) {
  let out = html.replace(new RegExp(`\\s*${escapeRe(HUB_START)}[\\s\\S]*?${escapeRe(HUB_END)}`, "g"), "");
  const row = `${HUB_START}
  <nav class="hub-catlinks" aria-label="Category pages">
    <span class="hub-catlinks-label">Browse by category</span>
${CATEGORY_ORDER.map((key) => `    <a href="/games/${CATEGORIES[key].slug}/">${esc(CATEGORIES[key].name)}</a>`).join("\n")}
  </nav>
  ${HUB_END}`;
  const anchor = out.indexOf('  <footer class="hub-footer">');
  if (anchor === -1) throw new Error("games/index.html: hub footer not found");
  return out.slice(0, anchor) + row + "\n\n" + out.slice(anchor);
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

let pages = 0;
for (const key of CATEGORY_ORDER) {
  const cat = CATEGORIES[key];
  await mkdir(join(ROOT, "games", cat.slug), { recursive: true });
  await writeFile(pagePath(cat), categoryPage(key), "utf8");
  pages++;
}

let patched = 0;
for (const game of GAMES) {
  const file = join(ROOT, "games", `${game.slug}.html`);
  const before = await readFile(file, "utf8");
  const after = patchGamePage(before, game);
  if (after !== before) await writeFile(file, after, "utf8");
  patched++;
}

const hubFile = join(ROOT, "games", "index.html");
const hubBefore = await readFile(hubFile, "utf8");
const hubAfter = patchHub(hubBefore);
if (hubAfter !== hubBefore) await writeFile(hubFile, hubAfter, "utf8");

console.log(`category pages: ${pages}`);
console.log(`game pages patched: ${patched}`);
console.log(`hub category row: ${hubAfter !== hubBefore ? "written" : "unchanged"}`);
console.log(`og images expected: ${GAMES.length + CATEGORY_ORDER.length}`);
