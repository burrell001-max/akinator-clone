# QA harness

Two scripts that check the site end to end. Both are committed so the checks
are repeatable instead of living in someone's scratch folder, and neither adds
a dependency to the site: the pages stay plain HTML/CSS/JS with no build step.

| Command | What it checks |
| --- | --- |
| `node tools/qa/check-site.mjs` | Static: duplicate ids, missing local links/assets, unbalanced inline scripts, hub cards and category keys, ribbon presence and targets, sitemap entries and arcade coverage, category pages and their game lists, generated related-game blocks, unique `og:image` files that exist on disk, `localStorage` key naming |
| `node tools/qa/win-paths.mjs` | Browser: every arcade game played from its initial state to a win, then the stored record and the reset path; plus the hub's category links |
| `node tools/build/build-pages.mjs` | Regenerates `/games/<category>/` pages, the "more in this category" blocks and every game's social tags from `tools/content/games-data.mjs` |
| `node tools/build/make-og.mjs` | Renders the 41 `og:image` cards into `games/og/` with headless Chrome |

## Requirements

- Node 22 or newer (the driver uses the built-in `WebSocket`).
- Chrome, Edge, Chromium, or any Chromium build pointed at by `CHROME_PATH`.
  Playwright and Puppeteer are **not** used: `tools/qa/lib.mjs` speaks the
  DevTools protocol directly and launches a headless browser itself.

## Running

```bash
node tools/qa/check-site.mjs          # exits 1 on any problem
node tools/qa/win-paths.mjs           # exits 1 if any scenario fails
node tools/qa/win-paths.mjs --only=memory,memory-echo,sudoku

# Only after editing tools/content/games-data.mjs: rebuild what it generates.
node tools/build/build-pages.mjs      # category pages, related blocks, social tags
node tools/build/make-og.mjs          # re-render games/og/*.jpg (needs Chrome)
```

`win-paths.mjs` starts its own static server on a loopback port (localStorage
is unavailable on `file://`), launches headless Chrome, clears `localStorage`
before each scenario, prints one line per scenario with its assertions, and
closes the browser and server afterwards. No network access is used.

## What the win-path scenarios assert

Each scenario covers the same four things, so a regression in any of them shows
up as a failing line:

1. **The win itself** — the game is played through its real controls (clicks,
   keys, pads) to its winning condition, and the win message is checked.
2. **The record** — the `mg-` key the page documents holds the expected value
   (a best time, a win counter, a daily streak, a solved date list).
3. **The reset** — New game / Shuffle / Play again clears the board, counters
   and message without breaking the stored record.
4. **Edge cases** — a restart fired inside the "next round" delay, extra input
   after a win, the final move of a board, and timer-driven rounds.

Data the page deliberately hides (a crossword answer, a Sudoku solution, a
historical year) is read from the page's own source or from the documented
`MGSudoku.last.snapshot()` API rather than being duplicated in the harness, so
the tests follow the games when their content changes.

Timed games (Quick Sums, Missing Number, Sort Bins) run with `setInterval`
accelerated by 12× for the scenario only — the game code is untouched.

## CI

`.github/workflows/qa.yml` runs both halves on every push to `main` and every
pull request, in two jobs:

- **static** — `check-site.mjs`, then `build-pages.mjs` with
  `git diff --exit-code`, so a hand edit that drifts from `games-data.mjs` fails
  the build instead of shipping. It also asserts the OG cards are present.
- **browser** — `win-paths.mjs` against the Chrome already installed on the
  `ubuntu-latest` image (`CHROME_PATH=/usr/bin/google-chrome`).

No dependencies are installed, no browser is downloaded and no service is
called, so the workflow costs nothing beyond the runner minutes.

## Generated content

The ten category pages (`/games/memory-games/` and friends), the related-game
block on every game page, and each page's `og:image` come from
`tools/content/games-data.mjs`. Edit that file, not the generated HTML, then run
`build-pages.mjs`; `check-site.mjs` compares the output back to the data.

## Known gaps

- **Merge Up**: score growth, best record and reset are covered, but reaching
  2048 needs a far longer game than a test run allows, so that banner is
  reviewed by hand rather than driven.
- The scenarios drive headless Chrome at 1280×900. Layout and touch behaviour
  are checked by eye, not here.
- A scenario passing means the game's logic and storage are correct; it is not
  a substitute for playing the game.

## Adding a scenario

Add an entry to `scenarios` in `win-paths.mjs`:

```js
add({
  id: "my-game",
  name: "My Game: description of the win",
  path: "/games/my-game.html",
  drive: () => `
  const q = __qa;
  // play the game with q.clickSel / q.key / q.set
  return { ok: theWinHappened && storageMatches, detail: "..." };
`
});
```

`drive` returns the body of an async function evaluated inside the page. The
`__qa` helper (in `lib.mjs`) provides `sleep`, `until`, `q`, `qa`, `txt`,
`click`, `clickSel`, `set`, `select`, `key`, `ls` and `storage`.
