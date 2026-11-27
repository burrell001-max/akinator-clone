# MindGenie AI — mindgenieai.xyz

The 50-character guessing game, its character guides, and the engine that answers a round.

## Layout

- `index.html` and the other `.html` files — the static site, published by GitHub Pages from `main`
- `site-theme.css`, `guide.css`, `i18n.js` — shared styling and the language menu
- `main.py`, `feedback.py` — the guessing engine and its JSON endpoints (`/start-game`, `/submit-answer`, `/feedback`), deployed separately using `Procfile` and `requirements.txt`; the browser calls it at `https://akinator-clone-0uf6.onrender.com`
- `sitemap.xml`, `robots.txt`, `ads.txt`, `llms.txt` — crawler and ad-serving files

## Renamed character guides

Four guides were renamed in November 2026:

| Old address | New page |
| --- | --- |
| `/spongebob.html` | `/spongebob-squarepants.html` |
| `/eleven.html` | `/eleven-stranger-things.html` |
| `/elsa.html` | `/elsa-frozen.html` |
| `/trinity.html` | `/trinity-the-matrix.html` |

The old file names stay in place as `noindex` meta-refresh stubs. GitHub Pages cannot answer a renamed path with a status code, so the stub is the redirect: it carries the canonical URL of the new page and is kept out of `sitemap.xml`.
