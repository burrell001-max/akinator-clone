#!/usr/bin/env node
import { serve, Chrome } from "./lib.mjs";

const server = await serve();
const chrome = await Chrome.launch();
const base = server.origin;
const problems = [];
const ok = (label, condition, got) => {
  if (!condition) problems.push(`${label}: ${JSON.stringify(got)}`);
  console.log(`${condition ? "ok  " : "FAIL"} ${label}${condition ? "" : " -> " + JSON.stringify(got)}`);
};

async function inspect(path, code) {
  const page = await chrome.newPage({ url: base + path });
  const state = await page.evaluate(`(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    stored: localStorage.getItem("mindgenie_lang"),
    desc: (document.querySelector('meta[name="description"]') || {}).content,
    locale: (document.querySelector('meta[property="og:locale"]') || {}).content,
    title: document.title,
    h1: (document.querySelector("h1") || {}).textContent,
    lede: (document.querySelector(".lede") || {}).textContent,
    overview: (document.querySelector('[data-mg-prose^="catOverview"]') || {}).textContent,
    card: (document.querySelector(".game-card p, .cat-card p") || {}).textContent
  }))()`);
  await page.close();
  return state;
}

let s = await inspect("/?lang=de", "de");
ok("home de lang", s.lang === "de", s.lang);
ok("home de stored", s.stored === "de", s.stored);
ok("home de h1", /MindGenie/.test(s.h1) && !/Hello, I am/.test(s.h1), s.h1);
ok("home de meta", /Dschinn/.test(s.desc || ""), s.desc);
ok("home de locale", s.locale === "de_DE", s.locale);

s = await inspect("/games/?lang=pt", "pt");
ok("hub pt lang", s.lang === "pt", s.lang);
ok("hub pt h1", /Jogos|engenho/i.test(s.h1 || ""), s.h1);
ok("hub pt card", /Adivinha|Desliza|Preenche|Encontra|Junta|Ordena|Resolve|Descobre|Repete|Clica|Coloca|Repara|Escreve|Fixe|Vira|Sobe|Combina/i.test(s.card || ""), s.card);
ok("hub pt meta", /Génio|jogo/i.test(s.desc || "") && !/Thirty free/.test(s.desc || ""), s.desc);
ok("hub pt locale", s.locale === "pt_PT", s.locale);

s = await inspect("/games/brain-games/?lang=de", "de");
ok("cat de lang", s.lang === "de", s.lang);
ok("cat de lede", /Arcade/.test(s.lede || "") && !/widest shelf/.test(s.lede || ""), s.lede);
ok("cat de overview", /Gewohnheiten/.test(s.overview || ""), s.overview);
ok("cat de card", /Errate|Fülle|Schiebe|Sortiere|Finde|Decke|Wiederhole|Bringe|Beantworte|Repariere|Klicke|Setze|Erkenne|Löse|Tippe|Ordne|Beantworte|Lege|Schreibe/i.test(s.card || ""), s.card);

s = await inspect("/games/sudoku.html?lang=pt", "pt");
ok("game pt lang", s.lang === "pt", s.lang);
ok("game pt title", /Sudoku/.test(s.title) && s.title !== "Sudoku: Free Sudoku Puzzle | MindGenie AI", s.title);
ok("game pt meta", /grelha|Preenche/i.test(s.desc || ""), s.desc);

s = await inspect("/?lang=zz", "zz");
ok("invalid falls back", s.lang === "en", s.lang);

s = await inspect("/games/?lang=ar", "ar");
ok("hub ar rtl", s.lang === "ar" && s.dir === "rtl", `${s.lang}/${s.dir}`);

/* Switcher on the hub: clicking a language must update URL, storage and html. */
{
  const page = await chrome.newPage({ url: base + "/games/?lang=de" });
  const before = await page.evaluate(`document.documentElement.lang`);
  await page.evaluate(`(() => {
    const btn = document.querySelector(".mg-lang .lang-btn");
    btn.click();
    const item = Array.from(document.querySelectorAll(".mg-lang-menu [data-lang-code]")).find(b => b.getAttribute("data-lang-code") === "pt");
    item.click();
  })()`);
  const after = await page.evaluate(`({ lang: document.documentElement.lang, stored: localStorage.getItem("mindgenie_lang"), url: location.search, title: document.title })`);
  ok("hub switch lang", before === "de" && after.lang === "pt", after);
  ok("hub switch url", /lang=pt/.test(after.url), after.url);
  ok("hub switch stored", after.stored === "pt", after.stored);
  await page.close();
}

/* Homepage switcher syncs the query string too. */
{
  const page = await chrome.newPage({ url: base + "/" });
  await page.evaluate(`(() => {
    document.getElementById("langBtn").click();
    const item = Array.from(document.querySelectorAll("#langMenu button")).find(b => b.textContent === "Deutsch");
    item.click();
  })()`);
  const after = await page.evaluate(`({ lang: document.documentElement.lang, stored: localStorage.getItem("mindgenie_lang"), url: location.search })`);
  ok("home switch lang", after.lang === "de", after);
  ok("home switch url", /lang=de/.test(after.url), after.url);
  await page.close();
}

await chrome.close();
await server.close();
console.log(problems.length ? `\n${problems.length} problem(s)` : "\n?lang= contract holds");
process.exit(problems.length ? 1 : 0);
