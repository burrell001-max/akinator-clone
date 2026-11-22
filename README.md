# MindGenie AI (`akinator-clone-main`) GitHub Repo Fix Pack

1. **Replace `sitemap.xml`:** Drop the included `sitemap.xml` into your repo root (excludes duplicate `blog/` copies so each article has one canonical URL).
2. **Fix Heading Hierarchy & HTML Ratio in `index.html`:**
   - Ensure `index.html` has exactly one `<h1>` (main title), followed by `<h2>` and `<h3>` in sequential order without skipping levels.
   - Move any bulky inline `<style>` or inline `<script>`/data blocks out of `index.html` (currently ~109 KB) into external `.css` / `.js` files to raise the Content-to-HTML ratio.
3. **Update `<head>` & Links in `index.html`:**
   - Verify `<head>` tags against `index-head-snippet.html`.
   - Paste `index-links-snippet.html` into `index.html` to add an authoritative outbound link alongside internal links.
4. **Delete Duplicate / Clutter Files from Repo:**
   - `mindgenie-updated.zip` (407 KB nested archive)
   - `blog/50-characters-that-stump-the-genie.html`
   - `blog/history-of-20-questions-games.html`
   - `blog/how-ai-guessing-games-work.html`
