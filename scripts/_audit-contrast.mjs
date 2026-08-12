// Phase 10 — contrast audit against DESIGN.md §4.5, with specific attention to
// orange-on-white body text (ember-400 on canvas is 3.06:1 and fails AA for
// body; only ember-600 at 5.11:1 is allowed for orange text on light).
//
// Method: walk every element that owns a non-empty text node, resolve its
// effective background by climbing ancestors until an opaque colour is found,
// and compute the WCAG ratio. Elements sitting over a gradient, image or
// <canvas> (the hero's DarkVeil shader) can't be resolved this way and are
// reported separately — those need pixel sampling, which earlier phases did.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const execPath = EDGE_PATHS.find((p) => fs.existsSync(p));

const BASE = "http://localhost:4300";
const ROUTES = [
  "/",
  "/services",
  "/services/gst",
  "/services/gst/registration",
  "/dsc",
  "/dsc/class-3-individual",
  "/dsc/drivers",
  "/dsc/drivers/hyp2003",
  "/dsc/documents-required",
  "/about",
  "/partner-with-us",
  "/contact",
  "/privacy-policy",
];

const audit = () => {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(",").map((v) => parseFloat(v.trim()));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a);
    const l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const hex = ({ r, g, b }) =>
    "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

  const results = [];
  const unresolved = [];

  for (const el of document.querySelectorAll("body *")) {
    // Only elements that directly own visible text.
    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();
    if (!ownText) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const fgRaw = parse(cs.color);
    if (!fgRaw) continue;

    // Climb for an opaque background; bail if we hit a gradient/image/canvas.
    let node = el;
    let bg = null;
    let painted = null;
    while (node && node !== document.documentElement.parentNode) {
      const ncs = getComputedStyle(node);
      if (ncs.backgroundImage && ncs.backgroundImage !== "none") {
        painted = ncs.backgroundImage.slice(0, 40);
        break;
      }
      const c = parse(ncs.backgroundColor);
      if (c && c.a === 1) {
        bg = c;
        break;
      }
      if (c && c.a > 0) {
        // Semi-transparent surface: keep climbing but remember we're layered.
        painted = painted ?? `translucent ${ncs.backgroundColor}`;
      }
      node = node.parentElement;
    }

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = isLarge ? 3.0 : 4.5;

    const info = {
      text: ownText.slice(0, 60),
      tag: el.tagName.toLowerCase(),
      cls: (el.className && typeof el.className === "string" ? el.className : "").slice(0, 70),
      color: hex(fgRaw),
      size,
      weight,
      isLarge,
      required,
    };

    if (!bg) {
      unresolved.push({ ...info, reason: painted ?? "no opaque ancestor" });
      continue;
    }

    const fg = fgRaw.a < 1 ? over(fgRaw, bg) : fgRaw;
    const r = ratio(fg, bg);
    if (r < required) {
      results.push({ ...info, bg: hex(bg), ratio: Math.round(r * 100) / 100, layered: painted });
    }
  }

  return { failures: results, unresolved };
};

const browser = await puppeteer.launch({
  executablePath: execPath,
  headless: true,
  args: ["--force-device-scale-factor=1"],
});

const allFailures = [];
const allUnresolved = [];

for (const viewport of [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: viewport.width, height: viewport.height });

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 20000 });
    // Reveal-wrapped sections stay at opacity 0 until scrolled into view in
    // headless Chrome — walk the page first or most content never renders.
    await page.evaluate(async () => {
      const step = 600;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
    });

    const { failures, unresolved } = await page.evaluate(audit);
    failures.forEach((f) => allFailures.push({ ...f, route, viewport: viewport.name }));
    unresolved.forEach((u) => allUnresolved.push({ ...u, route, viewport: viewport.name }));
  }
  await page.close();
}

await browser.close();

// Collapse duplicates: the same component repeated across routes is one bug.
const key = (f) => `${f.color}|${f.bg}|${f.size}|${f.weight}|${f.cls}`;
const grouped = new Map();
for (const f of allFailures) {
  const k = key(f);
  if (!grouped.has(k)) grouped.set(k, { ...f, routes: new Set(), samples: new Set() });
  grouped.get(k).routes.add(f.route);
  grouped.get(k).samples.add(f.text);
}

console.log(`=== CONTRAST FAILURES (${grouped.size} distinct, ${allFailures.length} instances) ===\n`);
for (const g of [...grouped.values()].sort((a, b) => a.ratio - b.ratio)) {
  console.log(
    `${g.ratio}:1 (needs ${g.required}) ${g.color} on ${g.bg} — ${g.size}px/${g.weight}${g.isLarge ? " large" : ""}`
  );
  console.log(`   <${g.tag} class="${g.cls}">`);
  console.log(`   text: ${[...g.samples].slice(0, 2).join(" | ")}`);
  console.log(`   routes: ${[...g.routes].slice(0, 5).join(", ")}${g.routes.size > 5 ? ` +${g.routes.size - 5}` : ""}`);
  if (g.layered) console.log(`   NOTE layered over: ${g.layered}`);
  console.log();
}

const unresolvedKey = (u) => `${u.color}|${u.cls}|${u.reason}`;
const ug = new Map();
for (const u of allUnresolved) {
  if (!ug.has(unresolvedKey(u))) ug.set(unresolvedKey(u), { ...u, routes: new Set() });
  ug.get(unresolvedKey(u)).routes.add(u.route);
}
console.log(`=== UNRESOLVED (over gradient/image/canvas — need pixel sampling): ${ug.size} distinct ===`);
for (const u of ug.values()) {
  console.log(`   ${u.color} ${u.size}px/${u.weight} <${u.tag} class="${u.cls}"> over ${u.reason}`);
  console.log(`      text: ${u.text}`);
  console.log(`      routes: ${[...u.routes].slice(0, 4).join(", ")}`);
}
