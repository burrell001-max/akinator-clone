/* Shared plumbing for the MindGenieAI QA harness.

   Zero dependencies on purpose: the site is a static HTML/CSS/JS project with
   no build step, so the tooling that checks it should not need one either.
   Node 22+ (global WebSocket) and an installed Chrome or Edge are the only
   requirements.

   Two pieces live here:
     serve()  — a small static file server so pages run on http://127.0.0.1
                (localStorage is blocked on file:// in Chrome).
     Chrome   — launches a headless browser and speaks the DevTools protocol
                directly, so a page can be driven and inspected with no
                Playwright/Puppeteer install.
*/

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

export async function serve(root = ROOT, port = 0) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      let path = decodeURIComponent(url.pathname);
      if (path.endsWith("/")) path += "index.html";
      const file = normalize(join(root, path));
      if (!file.startsWith(root)) {
        res.writeHead(403).end("forbidden");
        return;
      }
      const info = await stat(file).catch(() => null);
      if (!info || info.isDirectory()) {
        res.writeHead(404, { "content-type": "text/plain" }).end("not found");
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, {
        "content-type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store"
      });
      res.end(body);
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain" }).end(String(error));
    }
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  return {
    origin,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

const BROWSERS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
];

function findBrowser() {
  for (const candidate of BROWSERS) {
    if (candidate && existsSync(candidate)) return candidate;
  }
  throw new Error("No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.");
}

export class Chrome {
  static async launch() {
    const binary = findBrowser();
    const profile = await mkdtemp(join(tmpdir(), "mg-qa-"));
    const proc = spawn(binary, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-component-update",
      "--mute-audio",
      `--user-data-dir=${profile}`,
      "--remote-debugging-port=0",
      "about:blank"
    ], { stdio: ["ignore", "ignore", "pipe"] });

    const endpoint = await new Promise((resolve, reject) => {
      let buffer = "";
      const timer = setTimeout(() => reject(new Error("Browser did not start in 20s")), 20000);
      proc.stderr.on("data", (chunk) => {
        buffer += chunk.toString();
        const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
        if (match) {
          clearTimeout(timer);
          resolve(match[1]);
        }
      });
      proc.on("exit", (code) => {
        clearTimeout(timer);
        reject(new Error(`Browser exited early (code ${code})`));
      });
    });

    const ws = new WebSocket(endpoint);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });

    return new Chrome(ws, proc, profile);
  }

  constructor(ws, proc, profile) {
    this.ws = ws;
    this.proc = proc;
    this.profile = profile;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Set();
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(`${message.error.message} (${message.error.code})`));
        else resolve(message.result);
        return;
      }
      for (const listener of this.listeners) listener(message);
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }

  on(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async newPage({ url, preload = "", viewport = { width: 1280, height: 900 } } = {}) {
    const { targetId } = await this.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await this.send("Target.attachToTarget", { targetId, flatten: true });
    const page = new Page(this, sessionId, targetId);

    await page.send("Page.enable");
    await page.send("Runtime.enable");
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.width < 600
    });
    if (preload) {
      await page.send("Page.addScriptToEvaluateOnNewDocument", { source: preload });
    }
    if (url) await page.goto(url);
    return page;
  }

  async close() {
    try {
      this.ws.close();
    } catch (error) { /* already gone */ }
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(this.proc.pid), "/T", "/F"], { stdio: "ignore" });
      } else {
        this.proc.kill("SIGTERM");
      }
    } catch (error) { /* best effort */ }
    await rm(this.profile, { recursive: true, force: true }).catch(() => {});
  }
}

export class Page {
  constructor(chrome, sessionId, targetId) {
    this.chrome = chrome;
    this.sessionId = sessionId;
    this.targetId = targetId;
    this.errors = [];
    this.chrome.on((message) => {
      if (message.sessionId !== this.sessionId) return;
      if (message.method === "Runtime.exceptionThrown") {
        const details = message.params.exceptionDetails;
        const text = details.exception?.description || details.text || "uncaught exception";
        this.errors.push(text.split("\n")[0]);
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        const text = message.params.args.map((arg) => arg.value ?? arg.description ?? "").join(" ");
        this.errors.push(text || "console.error");
      }
    });
  }

  send(method, params = {}) {
    return this.chrome.send(method, params, this.sessionId);
  }

  async goto(url) {
    await this.send("Page.navigate", { url });
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      const ready = await this.evaluate("document.readyState", 2000).catch(() => "");
      if (ready === "complete") return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error(`Page did not finish loading: ${url}`);
  }

  async evaluate(expression, timeout = 60000) {
    const call = this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true
    }).then((result) => {
      if (result.exceptionDetails) {
        const details = result.exceptionDetails;
        const description = details.exception?.description || details.text;
        throw new Error(String(description).split("\n").slice(0, 3).join(" | "));
      }
      return result.result.value;
    });
    if (!timeout) return call;
    return Promise.race([
      call,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`Evaluation timed out after ${timeout}ms`)), timeout))
    ]);
  }

  async close() {
    await this.chrome.send("Target.closeTarget", { targetId: this.targetId }).catch(() => {});
  }
}

/* Installed into every page before (or right after) load. Scenario code uses
   these helpers instead of repeating DOM boilerplate. */
export const PRELUDE = `
window.__qa = {
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  async until(check, label, timeout = 6000, step = 30) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
      let value;
      try { value = check(); } catch (error) { value = null; }
      if (value) return value;
      await this.sleep(step);
    }
    throw new Error("timed out waiting for " + label);
  },
  q: (selector) => document.querySelector(selector),
  qa: (selector) => Array.from(document.querySelectorAll(selector)),
  txt: (selector) => {
    const node = document.querySelector(selector);
    return node ? node.textContent.replace(/\\s+/g, " ").trim() : "";
  },
  click: (node) => {
    if (!node) throw new Error("click on a missing element");
    node.click();
  },
  clickSel: (selector) => __qa.click(document.querySelector(selector)),
  set: (selector, value) => {
    const node = document.querySelector(selector);
    node.focus();
    node.value = value;
    node.dispatchEvent(new Event("input", { bubbles: true }));
    node.dispatchEvent(new Event("change", { bubbles: true }));
    return node;
  },
  select: (selector, value) => {
    const node = document.querySelector(selector);
    node.value = value;
    node.dispatchEvent(new Event("change", { bubbles: true }));
    return node;
  },
  key: (key, target) => (target || document).dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })
  ),
  ls: (key) => localStorage.getItem(key),
  storage: () => {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      out[key] = localStorage.getItem(key);
    }
    return out;
  }
};
true;
`;

/* Runs one scenario in a freshly loaded page. Resolves to
   { ok, result, errors } and never throws for a game-level failure. */
export async function runScenario(chrome, base, scenario) {
  const preload = `try { localStorage.clear(); } catch (error) {}
${scenario.preload || ""}
`;
  const page = await chrome.newPage({
    url: base + scenario.path + (scenario.query || ""),
    preload
  });
  const started = Date.now();
  let result = null;
  let failure = null;
  try {
    await page.evaluate(PRELUDE);
    result = await page.evaluate(`(async () => { ${scenario.drive(scenario.params || {})} })()`, scenario.timeout || 90000);
  } catch (error) {
    failure = error.message;
  }
  const errors = page.errors.slice(0, 6);
  await page.close();
  return {
    id: scenario.id,
    name: scenario.name,
    ok: !failure && !!(result && result.ok),
    failure,
    result,
    errors,
    ms: Date.now() - started
  };
}
