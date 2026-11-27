/* Ad-hoc live verification after the category pages deploy (deleted after run). */
const ORIGIN = "https://mindgenieai.xyz";
const failures = [];
const get = async (url) => {
  const res = await fetch(url, { redirect: "follow", headers: { "cache-control": "no-cache" } });
  return { status: res.status, body: await res.text(), type: res.headers.get("content-type") || "" };
};

const sitemap = await get(`${ORIGIN}/sitemap.xml`);
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
let ok = 0;
for (const url of urls) {
  const { status } = await get(url);
  if (status === 200) ok++;
  else failures.push(`${status} ${url}`);
}
console.log(`sitemap: ${urls.length} urls, ${ok} x 200`);

const cats = ["brain-games", "daily-games", "number-games", "word-games", "crosswords", "sudoku", "memory-games", "sort-games", "math-games", "puzzle-games"];
let catOk = 0, catGames = 0;
for (const slug of cats) {
  const { status, body } = await get(`${ORIGIN}/games/${slug}/`);
  if (status !== 200) { failures.push(`${status} /games/${slug}/`); continue; }
  catOk++;
  const links = [...body.matchAll(/href="\/games\/([a-z0-9-]+)\.html"/g)].map((m) => m[1]);
  catGames += new Set(links).size;
  if (!body.includes('<h1>')) failures.push(`/games/${slug}/ has no h1`);
  if (!body.includes('href="/games/"')) failures.push(`/games/${slug}/ does not link the hub`);
  if (!body.includes('og:image')) failures.push(`/games/${slug}/ has no og:image`);
}
console.log(`category pages: ${catOk}/10 x 200, ${catGames} distinct game links`);

const games = ["brain-codebreaker", "daily-nonogram", "number-merge", "word-anagram", "word-guess", "crossword-mini", "pocket-sudoku", "sudoku", "memory", "memory-echo",
  "sort-sequence", "math-speed", "puzzle-slide", "sort-fractions", "sort-bins", "sort-shifter", "sort-timeline", "math-target", "math-missing", "daily-pattern",
  "sudoku-daily", "sudoku-six", "sudoku-mini", "memory-grid", "memory-numbers", "memory-order", "crossword-clues", "crossword-anagrams", "crossword-daily", "crossword-detective"];
const og = [...games.map((g) => `${g}.jpg`), ...cats.map((c) => `category-${c}.jpg`), "hub.jpg"];
let ogOk = 0;
const ogTypes = new Set();
for (const name of og) {
  const res = await fetch(`${ORIGIN}/games/og/${name}`, { method: "GET" });
  ogTypes.add(res.headers.get("content-type"));
  if (res.status === 200) ogOk++;
  else failures.push(`${res.status} /games/og/${name}`);
}
console.log(`og images: ${ogOk}/${og.length} x 200, types: ${[...ogTypes].join(", ")}`);

let relatedOk = 0;
for (const slug of games) {
  const { body } = await get(`${ORIGIN}/games/${slug}.html`);
  if (body.includes("mg-related:start") && body.includes(`og:image" content="${ORIGIN}/games/og/${slug}.jpg`)) relatedOk++;
  else failures.push(`/games/${slug}.html missing related block or per-game og:image`);
}
console.log(`game pages with related block + own og:image: ${relatedOk}/30`);

const hub = await get(`${ORIGIN}/games/`);
const hubCats = [...hub.body.matchAll(/href="\/games\/([a-z-]+)\/"/g)].map((m) => m[1]);
console.log(`hub category links: ${new Set(hubCats).size} (${hub.body.includes("hub-catlinks") ? "row present" : "ROW MISSING"})`);

const home = await get(`${ORIGIN}/`);
console.log(`homepage: ${home.status}, shelf cards ${(home.body.match(/class="fb-game-card/g) || []).length}, freebuff mentions ${(home.body.match(/freebuff/gi) || []).length}`);

console.log(`\nFAILURES: ${failures.length}`);
failures.slice(0, 20).forEach((item) => console.log("  " + item));
