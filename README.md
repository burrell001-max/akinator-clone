# MindGenie AI — mindgenieai.xyz

The 50-character guessing game, its character guides, and the engine that answers a round.

## Layout

- `index.html` and the other `.html` files — the static site, published by GitHub Pages from `main`
- `site-theme.css`, `guide.css`, `i18n.js` — shared styling and the language menu
- `main.py`, `feedback.py` — the guessing engine and its JSON endpoints (`/start-game`, `/submit-answer`, `/feedback`), deployed separately using `Procfile` and `requirements.txt`; the browser calls it at `https://akinator-clone-0uf6.onrender.com`
- `sitemap.xml`, `robots.txt`, `ads.txt`, `llms.txt` — crawler and ad-serving files

## Renamed character guides

Four guides were renamed in November 2026:

| Old address | New page | Redirect rule expression |
| --- | --- | --- |
| `/spongebob.html` | `/spongebob-squarepants.html` | `(http.request.uri.path eq "/spongebob.html")` |
| `/eleven.html` | `/eleven-stranger-things.html` | `(http.request.uri.path eq "/eleven.html")` |
| `/elsa.html` | `/elsa-frozen.html` | `(http.request.uri.path eq "/elsa.html")` |
| `/trinity.html` | `/trinity-the-matrix.html` | `(http.request.uri.path eq "/trinity.html")` |

Each old path has to answer **301**, which GitHub Pages cannot do, so the zone
runs through Cloudflare with its DNS records proxied and one **Single Redirect**
per row: static target `https://mindgenieai.xyz/<new page>`, status `301`,
*Preserve query string* on. Redirect rules are evaluated before the request
reaches GitHub Pages, so the stub never answers a visitor.

The old file names also stay in the repo as `noindex` meta-refresh stubs. They
are the fallback for requests that reach GitHub Pages directly (Cloudflare record
switched to DNS-only) and are kept out of `sitemap.xml`.

`_redirects` repeats the same four rules for hosts that honour that file
(Cloudflare Pages, Netlify). GitHub Pages does not publish underscore-prefixed
files, so the file is inert there.
