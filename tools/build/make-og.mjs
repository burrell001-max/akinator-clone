#!/usr/bin/env node
/* Renders the Open Graph cards in /games/og/ with the headless browser the QA
   harness already uses — no image library, no service, no build step.

     node tools/build/make-og.mjs            # all cards
     node tools/build/make-og.mjs memory     # just names containing "memory"

   Output: games/og/<game-slug>.jpg and games/og/category-<category-slug>.jpg,
   1200x630 JPEGs around 60-90 KB each. Re-runnable; the build is deterministic
   apart from font rasterisation.
*/

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Chrome, serve, ROOT } from "../qa/lib.mjs";
import { CATEGORIES, CATEGORY_ORDER, GAMES } from "../content/games-data.mjs";

const GRADIENTS = {
  brain: "#4f46e5,#7c3aed",
  daily: "#0d9488,#0284c7",
  number: "#2563eb,#4f46e5",
  word: "#d97706,#dc2626",
  cross: "#059669,#10b981",
  sudoku: "#7c2d12,#ea580c",
  memory: "#db2777,#9333ea",
  sort: "#c026d3,#e11d48",
  math: "#1d4ed8,#0891b2",
  puzzle: "#4338ca,#be185d"
};

const OUT = join(ROOT, "games", "og");
const CARD = pathToFileURL(join(ROOT, "tools/build/og-card.html")).href;

function shorten(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ") > 40 ? cut.lastIndexOf(" ") : cut.length) + "…";
}

const cards = [
  {
    name: "hub",
    label: "Games hub",
    title: "30 Mind & Puzzle Games",
    sub: "Ten categories of instant-play browser games. No account, no download.",
    tags: ["30 games", "10 categories"],
    glyph: "🎮",
    gradient: "#5b21b6,#be185d"
  },
  ...GAMES.map((game) => {
    const cat = CATEGORIES[game.cats[0]];
    return {
      name: game.slug,
      label: cat.name,
      title: game.name,
      sub: shorten(game.blurb, 96),
      tags: [game.difficulty, game.tags[0]].filter(Boolean),
      glyph: game.glyph,
      gradient: GRADIENTS[game.tone] || GRADIENTS.brain
    };
  }),
  ...CATEGORY_ORDER.map((key) => {
    const cat = CATEGORIES[key];
    const count = GAMES.filter((game) => game.cats.includes(key)).length;
    return {
      name: `category-${cat.slug}`,
      label: "Category",
      title: cat.name,
      sub: cat.ogSub || shorten(cat.lede, 96),
      tags: [`${count} games`],
      glyph: cat.glyph,
      gradient: GRADIENTS[cat.tone] || GRADIENTS.brain
    };
  })
];

const filter = process.argv[2];
const wanted = filter ? cards.filter((card) => card.name.includes(filter)) : cards;

await mkdir(OUT, { recursive: true });
const server = await serve(ROOT);
const chrome = await Chrome.launch();
let written = 0;

try {
  const page = await chrome.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [index, card] of wanted.entries()) {
    const payload = encodeURIComponent(JSON.stringify(card));
    /* The query string changes per card: a hash-only navigation would not
       reload the template, and every card would capture the first one. */
    await page.goto(`${CARD}?card=${index}#${payload}`);
    await page.evaluate(`(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let i = 0; i < 100 && document.documentElement.dataset.ready !== "1"; i++) await wait(30);
      await wait(150);
      return true;
    })()`);
    const image = await page.screenshot({
      clip: { x: 0, y: 0, width: 1200, height: 630 },
      format: "jpeg",
      quality: 88
    });
    await writeFile(join(OUT, `${card.name}.jpg`), image);
    written++;
    process.stdout.write(`.${written % 40 === 0 ? "\n" : ""}`);
  }
  await page.close();
  console.log(`\n${written} cards written to games/og/`);
} finally {
  await chrome.close();
  await server.close();
}
