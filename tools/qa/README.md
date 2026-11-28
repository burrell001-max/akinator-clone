# QA harness

Two scripts that check the site end to end. Both are committed so the checks
are repeatable instead of living in someone's scratch folder, and neither adds
a dependency to the site: the pages stay plain HTML/CSS/JS with no build step.

| Command | What it checks |
| --- | --- |
| `node tools/qa/check-site.mjs` | Static: duplicate ids, missing local links/assets, unbalanced inline scripts, hub cards and category keys, ribbon presence and targets, sitemap entries and arcade coverage, category pages and their game lists, generated related-game blocks, unique `og:image` files that exist on disk, `localStorage` key naming, and the five-game floor in every category |
| `node tools/qa/check-content.mjs` | Content: a prose-word floor per page (with `404.html` the one allowed short page), duplicate pages (shared sentences after generated catalogue text is filtered out, shared `<title>` or `<h1>`), and sitemap integrity (no duplicates, no query strings, no alias or 404 entries, every `<lastmod>` well formed and not in the future, every real page listed and every listed file present) |
| `node tools/qa/check-i18n.mjs` | Localization: key/title/instruction/category parity, status placeholders, rules-bullet numbers, difficulty labels and `mg-` keys, page `data-i18n`/`data-mg-*` bindings (including live counters and script-written labels), `<option>` text, the homepage dictionary in `/i18n.js`, English leaks into non-Latin translations, banned-brand leftovers, the hero subtitle's hook, dictionary text and width, and a coverage report of visible English with no translation hook (`--strict-ui` makes that report fail) |
| `node tools/qa/win-paths.mjs` | Browser: every arcade game played from its initial state to a win, then the stored record and the reset path; plus the hub's category links |
| `node tools/qa/check-mobile.mjs` | 360px sweep: 47 pages (home, hub, ten shelves, ten games, guides, blog, character pages, legal pages, five `?lang=` views) with no document wider than the viewport, no control clipped by its own box, no broken or collapsed image, and no console error; deliberate horizontal scrollers and the fixed, clipped starfield are exempt |
| `node tools/qa/check-lang.mjs` | Language contract: all 18 languages carry the 30 hub/category prose strings, `de`/`pt` cover every UI key, title, instruction, category and hub string without falling back to English, every key page has 18 hreflang alternates plus `x-default`, and `?lang=` on the homepage, hub, category and game pages sets `<html lang/dir>`, `localStorage`, the localized description and `og:locale`; unknown codes fall back, and both switchers write the query string back |
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
node tools/qa/check-content.mjs       # exits 1 on a thin or duplicate page
node tools/qa/check-content.mjs --report   # also prints the shortest pages
node tools/qa/check-i18n.mjs          # exits 1 on a localization defect
node tools/qa/check-i18n.mjs --strict-ui   # also fail on the coverage notes
node tools/qa/win-paths.mjs           # exits 1 if any scenario fails
node tools/qa/win-paths.mjs --only=memory,memory-echo,sudoku
node tools/qa/check-lang.mjs          # language contract, standfirsts and ?lang= links
node tools/qa/check-mobile.mjs        # 360px overflow sweep over 47 pages
node tools/qa/check-mobile.mjs --only=/games/,/faq.html

# Only after editing tools/content/games-data.mjs: rebuild what it generates.
node tools/build/build-pages.mjs      # category pages, related blocks, social tags
node tools/build/make-og.mjs          # re-render games/og/*.jpg (needs Chrome)
```

`check-i18n.mjs` loads the dictionaries in a bare `new Function("window", …)`
sandbox, so it does not need a browser. Beyond missing keys it checks that
every number in an English rules bullet survives in the translation (digits are
normalised across Arabic-Indic, Persian, Devanagari and full-width numerals),
that each difficulty label maps to that language's own word, that every
`mg-…` storage key is copied verbatim, and that `{0}`-style placeholders match
the English status template. It also validates every `data-i18n` and
`data-mg-*` value a page uses against the dictionaries, which catches a typo
key that would otherwise render as a raw key on the page. The homepage has a
separate dictionary in `/i18n.js` with its own key set and 28-question list;
that is checked too.

`check-content.mjs` is the page-quality guard. It counts the readable prose on
each page after scripts, styles, navigation, footer and the generated "More in
this category" block are removed, so a page cannot look substantial because of
its chrome. Anything under 200 words (after a small allowance for `404.html`)
fails, anything under 300 is listed for review, and a page needs at least two
paragraphs. Two pages count as the same page when half of their own sentences
match — sentences that appear on three or more pages are generated catalogue
text and are ignored, which is what separates two shelves listing the same
games from two copies of one article. A game page and the category page that
lists it may share the game's name. The sitemap half is a strict contract: no
duplicate `<loc>`, no query strings, no redirect alias and no `404.html`, a
`<lastmod>` in `YYYY-MM-DD` that is not in the future, every real page listed,
and every listed file present on disk. The `<lastmod>` half is checked three
ways: the format, the date the page itself prints (a page with a visible
"last updated" date must carry that date in the sitemap), and — when a full
clone is present — the commit that last touched the file, so a page edited
without a lastmod bump fails. A shallow CI checkout has no per-file history,
so that half is skipped with a note instead of failing every page.
`check-site.mjs` imports the same
`contentChecks()` function, so the CI step that already runs on every push
covers these checks; run this file directly when you want the word-count
report.



`check-lang.mjs` is the repeatable language test. It reads the same
dictionaries in a bare sandbox to prove every language has its own hub and
category prose, then launches headless Chrome (no Playwright, no packages) to
open `/?lang=de`, `/games/?lang=pt`, a category page and a game page, checking
`<html lang/dir>`, the stored preference, the translated heading and the
localized `<meta name="description">` / `og:locale`. It also checks that DE and PT cover every UI key, title, instruction,
category and hub string (allowing only brands and loanwords to match English),
then exercises both language switchers (URL, storage and `html lang`), `?lang=zz` fallback and the
Arabic RTL direction. A shared `?lang=` link therefore cannot regress without
the browser job failing. It runs locally in roughly 20 seconds.

`check-i18n.mjs` is also a CI step: `.github/workflows/qa.yml` runs it on every
push to `main` and every pull request next to `check-site.mjs`, so a missing key,
an English leak, an altered number or a broken hook fails the build. It is plain
Node with no install step and finishes in about a second — the same command runs
locally.

The coverage notes at the end are a work queue, not failures: they list visible
English content that has no hook yet. UI labels and live counters (stat rows,
"Restart"/"Play again", clue and guess counters, keypad words) are localized, so
the notes now cover the generated "More in …" blocks, the hub's hand-written
game blurbs, and the English tag chips (`class="tag"`). Run with `--strict-ui`
when you want new untranslated UI to fail the build.

The one-line standfirst under a game heading is no longer English-only. Each
page carries `<p class="updated" data-mg-standfirst="slug">`, and
`games/i18n.js` paints it from `games/i18n-standfirsts.js`, which holds the 30
sentences in all 18 languages. `check-i18n.mjs` fails on a missing or empty
entry, on a non-English entry that is still the English sentence, and on Latin
characters in a non-Latin script; `check-lang.mjs` opens the page in five
languages at 360px and asserts the line translated, still fits, and that
English kept its own wording.

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

- **static** — `check-site.mjs` (which now includes the thin-page, duplicate
  and sitemap checks from `check-content.mjs`), `check-i18n.mjs`, then
  `build-pages.mjs` with
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

- **Localization numbers**: the mechanical audit compares numerals, not number
  words, because compound numerals (`vingt-six`, `sechsundzwanzig`) and
  inflected forms do not tokenise reliably across 17 languages. Bullets that
  spell a number out (`six tries`, `ten clues`) are still checked by hand; the
  digit, difficulty and `mg-`-key checks are automated.
- **Remaining English content**: the generated "More in …" blocks, the hub's
  game blurbs and the `class="tag"` chips are English in every language, as are
  the guide and blog articles by design (the localized surface is the homepage,
  the hub, the ten shelves and the 30 game pages). They are reported as
  coverage notes; labels, counters, standfirsts and script-written button text
  are localized and checked.
- **Status lines**: games still write status messages in English and rely on the
  status dictionary. A new English status line with no matching key is logged
  as `[i18n] untranslated status:` in the console, but `check-i18n.mjs` only
  checks keys that already exist, so add the key when you add a message.
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
