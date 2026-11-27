"""AdSense-readiness audit for mindgenieai.xyz.

Local-only checks (no network beyond optional external-link sampling):
titles, descriptions, canonicals, headings, word counts, JSON-LD, ad code,
internal links, anchors, images, sitemap/robots coverage, stub handling.
"""
import json
import os
import re
import sys
from collections import Counter, defaultdict
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
BASE = "https://mindgenieai.xyz"

PAGES = sorted([f for f in os.listdir(ROOT) if f.endswith(".html")])
BLOG = sorted(["blog/" + f for f in os.listdir(os.path.join(ROOT, "blog")) if f.endswith(".html")])

issues = defaultdict(list)


def note(kind, page, msg):
    issues[kind].append(f"{page}: {msg}")


class Scan(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self._in_title = False
        self.metas = []
        self.links = []
        self.headings = []
        self._in_heading = None
        self.text = []
        self.images = []
        self.jsonld = []
        self._in_jsonld = False
        self._buf = []
        self.scripts = []
        self._in_script = False
        self._script_src = None
        self.html_lang = None
        self.ids = set()
        self.inline_styles = 0
        self.rel_links = []
        self.tags_without_alt = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.html_lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            self.metas.append(a)
        elif tag == "link":
            self.links.append(a)
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._in_heading = tag
            self.headings.append([tag, ""])
        elif tag == "a":
            self.rel_links.append(a)
        elif tag == "img":
            self.images.append(a)
        elif tag == "script":
            self._in_script = True
            self._script_src = a.get("src") or ""
            if (a.get("type") or "").lower() == "application/ld+json":
                self._in_jsonld = True
                self._buf = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._in_heading = None
        elif tag == "script":
            if self._in_jsonld:
                self.jsonld.append("".join(self._buf))
                self._in_jsonld = False
            self._in_script = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        elif self._in_heading:
            self.headings[-1][1] += data
        elif self._in_jsonld:
            self._buf.append(data)
        elif self._in_script:
            self.scripts.append(self._script_src or "")
        else:
            self.text.append(data)


def meta(scan, key, attr="name"):
    for m in scan.metas:
        if (m.get(attr) or "").lower() == key.lower():
            return (m.get("content") or "").strip()
    return ""


def load(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        raw = fh.read()
    s = Scan()
    s.feed(raw)
    return raw, s


def words(text):
    return len([w for w in re.split(r"\s+", text.strip()) if re.search(r"[A-Za-z0-9]", w)])


pages = {rel: load(rel) for rel in PAGES + BLOG}
titles = Counter()
descs = Counter()
canonicals = Counter()

STUB_MARK = "http-equiv=\"refresh\""

for rel, (raw, s) in pages.items():
    stub = STUB_MARK in raw
    name = os.path.basename(rel)
    title = s.title.strip()
    desc = meta(s, "description")
    canon = ""
    for l in s.links:
        if (l.get("rel") or "").lower() == "canonical":
            canon = (l.get("href") or "").strip()
    robots = meta(s, "robots").lower()
    expects_noindex = stub or name == "404.html" or rel.startswith("blog/") and False
    body_words = words(" ".join(s.text))

    if not s.html_lang:
        note("lang", rel, "missing <html lang>")
    if not meta(s, "viewport"):
        note("viewport", rel, "missing viewport meta")

    if stub:
        if "noindex" not in robots:
            note("stub", rel, "redirect stub without noindex")
        if not canon:
            note("stub", rel, "redirect stub without canonical")
        continue

    titles[title] += 1
    descs[desc] += 1
    if canon:
        canonicals[canon] += 1

    if not title:
        note("title", rel, "missing title")
    elif len(title) > 65:
        note("title", rel, f"title {len(title)} chars (>65)")
    elif len(title) < 15:
        note("title", rel, f"title {len(title)} chars (<15)")

    if not desc:
        note("desc", rel, "missing meta description")
    elif not (110 <= len(desc) <= 165):
        note("desc", rel, f"description {len(desc)} chars (want 110-165)")

    if name == "404.html":
        if "noindex" not in robots:
            note("noindex", rel, "404 page should be noindex")
    else:
        expected = f"{BASE}/{rel}" if not rel.startswith("blog/") else f"{BASE}/{rel}"
        if rel == "index.html":
            expected = f"{BASE}/"
        if not canon:
            note("canonical", rel, "missing canonical")
        elif canon.rstrip("/") != expected.rstrip("/"):
            note("canonical", rel, f"canonical {canon} != {expected}")

    h1s = [t for tag, t in s.headings if tag == "h1"]
    if len(h1s) != 1:
        note("h1", rel, f"{len(h1s)} h1 tags")
    if body_words < 600 and name not in ("index.html",):
        note("thin", rel, f"{body_words} words")

    if "adsbygoogle" not in raw and name not in ("404.html",):
        note("ads", rel, "no AdSense unit")
    if "ca-pub-5783852883880667" not in raw and name not in ("404.html",):
        note("pubid", rel, "publisher id missing")

    for block in s.jsonld:
        try:
            json.loads(block)
        except Exception as exc:
            note("jsonld", rel, f"invalid JSON-LD: {exc}")

    missing_alt = [i for i in s.images if "alt" not in i]
    if missing_alt:
        note("imgalt", rel, f"{len(missing_alt)} image(s) without alt")

    # internal links
    for a in s.rel_links:
        href = (a.get("href") or "").strip()
        if not href or href.startswith(("mailto:", "tel:", "javascript:", "#")):
            if href == "#":
                note("link", rel, "placeholder href='#'")
            continue
        p = urlparse(href)
        if p.scheme in ("http", "https") and p.netloc not in ("mindgenieai.xyz", "www.mindgenieai.xyz"):
            if p.scheme == "http":
                note("extlink", rel, f"http external link {href}")
            continue
        path = unquote(p.path.lstrip("/"))
        if not path:
            continue
        if path.startswith("blog/"):
            target = path
        else:
            target = path
        if not target.endswith(".html") and path != "":
            # extensionless links would 404 on GitHub Pages
            if target and not os.path.isdir(os.path.join(ROOT, target)):
                note("link", rel, f"extensionless internal link {href}")
            continue
        if not os.path.exists(os.path.join(ROOT, target)):
            note("link", rel, f"broken internal link {href}")
        elif p.fragment and target in pages:
            if p.fragment not in pages[target][1].ids:
                note("anchor", rel, f"missing anchor {href}")

for t, n in titles.items():
    if n > 1 and t:
        note("dupe-title", "-", f"{n} pages share title: {t}")
for d, n in descs.items():
    if n > 1 and d:
        note("dupe-desc", "-", f"{n} pages share description: {d}")

# sitemap coverage
sm = open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
sm_urls = set(re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm))
sm_paths = set()
for u in sm_urls:
    path = urlparse(u).path.lstrip("/")
    sm_paths.add(path or "index.html")
real_pages = set()
for rel, (raw, s) in pages.items():
    if STUB_MARK in raw:
        continue
    if os.path.basename(rel) == "404.html":
        continue
    real_pages.add(rel)
for rel in sorted(real_pages - sm_paths):
    note("sitemap", rel, "not in sitemap.xml")
for rel in sorted(sm_paths - set(pages.keys())):
    note("sitemap", rel, "sitemap URL has no file")

# robots sanity
rb = open(os.path.join(ROOT, "robots.txt"), encoding="utf-8").read()
if "Sitemap:" not in rb:
    note("robots", "-", "no Sitemap directive")

# required policy pages
for need in ("privacy-policy.html", "terms.html", "about.html", "contact.html", "cookie-policy.html"):
    if need not in pages:
        note("policy", "-", f"missing {need}")

total = sum(len(v) for v in issues.values())
for kind in sorted(issues):
    print(f"\n[{kind}] {len(issues[kind])}")
    for line in issues[kind][:40]:
        print("  -", line)
print(f"\nPages checked: {len(PAGES)} root + {len(BLOG)} blog")
print(f"Total findings: {total}")
