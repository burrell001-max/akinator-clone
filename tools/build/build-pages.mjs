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

/* Line endings are a checkout concern, not a content one: Windows checkouts are
   CRLF (core.autocrlf=true) while CI is LF. Build every page with LF so the
   block regexes can never leave a stray \r behind, then write the result back
   in the file's own convention. Rebuilding is then byte-for-byte idempotent and
   leaves no git diff on either platform. */
const toLF = (text) => text.replace(/\r\n/g, "\n");
const eolOf = (text) => (text.includes("\r\n") ? "\r\n" : "\n");
const withEol = (text, eol) => (eol === "\n" ? text : text.replace(/\n/g, eol));

/* The English one-line instructions are the source for the card copy; the
   translations already live in the arcade dictionaries, index-aligned to the
   slug list. Reading them here keeps generated pages in step with the games. */
const i18nSandbox = {};
for (const file of ["langs.js", "games/i18n-slugs.js", "games/i18n-data-a.js"]) {
  new Function("window", await readFile(join(ROOT, file), "utf8"))(i18nSandbox);
}
const SLUGS = i18nSandbox.MGI18N_SLUGS || [];
const LANGS = i18nSandbox.LANGS || [];
const HOWTO_EN = (i18nSandbox.MGI18N_DATA_A && i18nSandbox.MGI18N_DATA_A.howto && i18nSandbox.MGI18N_DATA_A.howto.en) || [];
const howto = (game) => HOWTO_EN[SLUGS.indexOf(game.slug)] || game.blurb;
const DIFFICULTY_KEY = { Easy: "easy", Medium: "medium", Hard: "hard", Expert: "expert" };

const HREFLANG_START = "<!-- mg-hreflang:start (generated) -->";
const HREFLANG_END = "<!-- mg-hreflang:end -->";

/* One alternate per supported language. The site keeps a single clean
   canonical URL per page; the language lives in ?lang=, which the runtime
   honours on load, so these point at real, equivalent documents. */
function hreflangBlock(pathname) {
  const clean = `${SITE}${pathname}`;
  const separator = pathname.includes("?") ? "&" : "?";
  const links = LANGS.map((lang) =>
    `  <link rel="alternate" hreflang="${lang.code}" href="${clean}${separator}lang=${lang.code}">`
  ).join("\n");
  return `${HREFLANG_START}\n${links}\n  <link rel="alternate" hreflang="x-default" href="${clean}">\n${HREFLANG_END}`;
}

function replaceHreflang(html, pathname) {
  const block = hreflangBlock(pathname);
  const existing = new RegExp(`\\n?[ \\t]*${escapeRe(HREFLANG_START)}[\\s\\S]*?${escapeRe(HREFLANG_END)}`, "g");
  const out = html.replace(existing, "");
  return out.includes("</head>") ? out.replace("</head>", `${block}\n</head>`) : out;
}

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
  return `    <a href="/games/#${key}"${currentAttr} data-mg-cat="${key}">${esc(cat.name)}</a>\n    <span class="mg-cat-sep" aria-hidden="true"></span>`;
}).join("\n").replace(/\n {4}<span class="mg-cat-sep" aria-hidden="true"><\/span>$/, "");

const ogImage = (name) => `${SITE}/${OG_DIR}/${name}.jpg`;

/* ── Category pages ──────────────────────────────────────────────────────── */

function card(game, key) {
  const diffKey = DIFFICULTY_KEY[game.difficulty] || "medium";
  return `      <a class="card cat-card" href="/games/${game.slug}.html">
        <span class="cat-card-glyph" aria-hidden="true">${game.glyph}</span>
        <h3 data-mg-title="${game.slug}">${esc(game.name)}</h3>
        <p data-mg-howto="${game.slug}">${esc(howto(game))}</p>
        <span class="tag" data-mg-text="${diffKey}">${esc(game.difficulty)}</span>
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
<meta property="og:locale" content="en_US">
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
<link rel="stylesheet" href="/games/i18n.css?v=3">
${hreflangBlock(`/games/${cat.slug}/`)}
<script type="application/ld+json">
${jsonLd}
</script>
</head>
<body>
<div class="wrap wrap--wide">
  <div class="top">
    <a class="brand" href="/">MindGenie AI</a>
    <nav aria-label="Primary">
      <a href="/" data-i18n="nav_play">Play the Genie</a>
      <a href="/games/" aria-current="page" data-i18n="nav_games">Games</a>
      <a href="/games/${cat.slug}/" data-mg-cat="${key}">${esc(cat.name)}</a>
    </nav>
  </div>

  <nav class="mg-cat-ribbon mg-cat-ribbon--compact" aria-label="Game categories">
${RIBBON(key)}
  </nav>

  <main>
    <p class="eyebrow" data-mg-count="category_count" data-mg-n="${count}">${count} games in this category</p>
    <h1 data-mg-cat="${key}" data-title-en="${esc(cat.title)}">${esc(cat.name)}</h1>
    <p class="lede" data-mg-prose="catLede:${key}">${esc(cat.lede)}</p>
    <p class="updated" data-mg-text="arcade_note">Free to play in the browser &middot; no account &middot; scores saved on this device</p>

    <div class="toolbar">
      <a class="btn" href="/games/" data-i18n="all_games">All 30 games</a>
      <a class="btn ghost" href="/games/#${key}"><span data-i18n="filter_hub">Filter the hub to</span> <span data-mg-cat="${key}">${esc(cat.name)}</span></a>
    </div>

    <section aria-labelledby="cat-games">
      <div class="section-head">
        <h2 id="cat-games" data-i18n="games_in_category">Games in this category</h2>
        <span class="filter-note" data-mg-count="category_count" data-mg-n="${count}">${count} games in this category</span>
      </div>
      <div class="grid cat-grid">
${games.map((game) => card(game, key)).join("\n")}
      </div>
    </section>

    <section aria-labelledby="cat-overview">
      <h2 id="cat-overview" data-i18n="about_category">About this category</h2>
      <p data-mg-prose="catOverview:${key}">${esc(cat.overview[0])}</p>
      <h3 data-i18n="what_they_train">What they train</h3>
      <p data-mg-prose="catTrains:${key}">${esc(cat.trains)}</p>
    </section>

    <section aria-labelledby="cat-howto">
      <h2 id="cat-howto" data-i18n="how_to_play">How to play</h2>
      <p data-mg-text="category_howto">Every game opens straight into its board. Tap, click or use the arrow keys; each card above explains the goal in one line.</p>
      <ul class="cat-howto-list">
${games.map((game) => `        <li><strong data-mg-title="${game.slug}">${esc(game.name)}</strong> &mdash; <span data-mg-howto="${game.slug}">${esc(howto(game))}</span></li>`).join("\n")}
      </ul>
      <div class="note">
        <strong data-mg-text="no_setup">No setup required.</strong> <span data-mg-text="progress_note">Progress is stored in your own browser under mg- keys &mdash; clearing site data resets it.</span>
      </div>
    </section>

    <section aria-labelledby="cat-other">
      <h2 id="cat-other" data-i18n="other_shelves">Other shelves in the arcade</h2>
      <p class="filter-note" data-mg-text="other_shelves_note">Ten categories, thirty games, one page each.</p>
      <div class="chips">
${others.map((other) => `        <a class="chip" href="/games/${CATEGORIES[other].slug}/" data-mg-cat="${other}">${esc(CATEGORIES[other].name)}</a>`).join("\n")}
      </div>
    </section>
  </main>

  <footer>
    <a href="/games/" data-i18n="all_games">All games</a>
    <a href="/">MindGenie AI</a>
    <a href="/blog.html" data-i18n="nav_blog">Blog</a>
    <a href="/privacy-policy.html" data-i18n="nav_privacy">Privacy Policy</a>
  </footer>
</div>
<script src="/langs.js"></script>
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
<script src="/games/i18n-data-j.js?v=1"></script>
<script src="/games/i18n-prose.js?v=1"></script>
<script src="/games/i18n-prose-b.js?v=1"></script>
<script src="/games/i18n-prose-c.js?v=1"></script>
<script src="/games/i18n-prose-d.js?v=1"></script>
<script src="/games/i18n.js?v=7"></script>
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

  if (!out.includes('property="og:locale"')) {
    out = out.replace(
      '<meta property="og:site_name" content="MindGenie AI">',
      '<meta property="og:site_name" content="MindGenie AI">\n<meta property="og:locale" content="en_US">'
    );
  }

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
  const existing = new RegExp(`\\n?[ \\t]*${escapeRe(RELATED_START)}[\\s\\S]*?${escapeRe(RELATED_END)}`, "g");
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
  /* Trim both sides before writing, so a rebuild replaces the block byte for
     byte instead of accumulating blank lines (CI diffs the result). */
  const head = out.slice(0, insertAt).replace(/\s+$/, "");
  const tail = out.slice(insertAt).replace(/^\n+/, "");
  out = `${head}\n\n${block}\n\n${tail}`;

  const cat = CATEGORIES[game.cats[0]];
  out = rewriteImage(out, ogImage(game.slug), `${game.name} - ${cat.name} on MindGenieAI`);
  out = replaceHreflang(out, `/games/${game.slug}.html`);
  return out;
}

/* ── Hub footer category row ─────────────────────────────────────────────── */

const HUB_START = "<!-- hub-catlinks:start (generated) -->";
const HUB_END = "<!-- hub-catlinks:end -->";

const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function patchHub(html) {
  let out = html.replace(new RegExp(`\\n?[ \\t]*${escapeRe(HUB_START)}[\\s\\S]*?${escapeRe(HUB_END)}`, "g"), "");
  const row = `${HUB_START}
  <nav class="hub-catlinks" aria-label="Category pages">
    <span class="hub-catlinks-label" data-mg-hub="3">Browse by category</span>
${CATEGORY_ORDER.map((key) => `    <a href="/games/${CATEGORIES[key].slug}/">${esc(CATEGORIES[key].name)}</a>`).join("\n")}
  </nav>
  ${HUB_END}`;
  out = replaceHreflang(out, "/games/");
  if (!out.includes('property="og:locale"')) {
    out = out.replace('<meta property="og:site_name" content="MindGenie AI">', '<meta property="og:site_name" content="MindGenie AI">\n<meta property="og:locale" content="en_US">');
  }
  const at = out.indexOf('<footer class="hub-footer">');
  if (at === -1) throw new Error("games/index.html: hub footer not found");
  const anchor = out.lastIndexOf("\n", at) + 1;
  const head = out.slice(0, anchor).replace(/\s+$/, "");
  const tail = out.slice(anchor).replace(/^\n+/, "");
  return `${head}\n\n${row}\n\n${tail}`;
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

const hubFile = join(ROOT, "games", "index.html");
const hubRaw = await readFile(hubFile, "utf8");
const hubEol = eolOf(hubRaw);

let pages = 0;
for (const key of CATEGORY_ORDER) {
  const cat = CATEGORIES[key];
  const file = pagePath(cat);
  await mkdir(join(ROOT, "games", cat.slug), { recursive: true });
  let existing = null;
  try {
    existing = await readFile(file, "utf8");
  } catch {
    /* First build: adopt the checkout's convention from an existing page. */
  }
  const eol = existing === null ? hubEol : eolOf(existing);
  const next = withEol(categoryPage(key), eol);
  if (next !== existing) await writeFile(file, next, "utf8");
  pages++;
}

let patched = 0;
for (const game of GAMES) {
  const file = join(ROOT, "games", `${game.slug}.html`);
  const raw = await readFile(file, "utf8");
  const before = toLF(raw);
  const after = patchGamePage(before, game);
  if (after !== before) await writeFile(file, withEol(after, eolOf(raw)), "utf8");
  patched++;
}

const hubBefore = toLF(hubRaw);
const hubAfter = patchHub(hubBefore);
if (hubAfter !== hubBefore) await writeFile(hubFile, withEol(hubAfter, hubEol), "utf8");

console.log(`category pages: ${pages}`);
console.log(`game pages patched: ${patched}`);
console.log(`hub category row: ${hubAfter !== hubBefore ? "written" : "unchanged"}`);
console.log(`og images expected: ${GAMES.length + CATEGORY_ORDER.length}`);
