// Phase 10 — reduced-motion completeness + screen-reader semantics on nav and forms.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const execPath = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find((p) => fs.existsSync(p));

const BASE = "http://localhost:4300";
const browser = await puppeteer.launch({
  executablePath: execPath,
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});

// ================= REDUCED MOTION =================
console.log("=== REDUCED MOTION (prefers-reduced-motion: reduce, via CDP) ===\n");
for (const route of ["/", "/services/gst/registration", "/contact"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const client = await page.createCDPSession();
  await client.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await page.goto(BASE + route, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  const report = await page.evaluate(() => {
    // Anything still running a CSS animation/transition of real duration.
    const moving = [];
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      const dur = (s) => Math.max(0, ...String(s).split(",").map((v) => parseFloat(v) || 0));
      const animDur = dur(cs.animationDuration);
      const animName = cs.animationName;
      if (animName !== "none" && animDur > 0.05) {
        moving.push({
          kind: "css-animation",
          name: animName,
          dur: animDur,
          tag: el.tagName.toLowerCase(),
          cls: (typeof el.className === "string" ? el.className : "").slice(0, 55),
        });
      }
    }
    // Any element left mid-reveal (a stuck Reveal would sit at opacity < 1).
    const stuck = [...document.querySelectorAll("[style*='opacity']")]
      .filter((el) => {
        const o = parseFloat(getComputedStyle(el).opacity);
        const r = el.getBoundingClientRect();
        return o > 0 && o < 0.95 && r.width > 0 && r.height > 0 && r.top < window.innerHeight && r.bottom > 0;
      })
      .map((el) => ({
        opacity: getComputedStyle(el).opacity,
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 55),
      }));
    return {
      moving,
      stuck,
      canvasCount: document.querySelectorAll("canvas").length,
    };
  });

  console.log(`${route}`);
  console.log(`   css animations still running: ${report.moving.length}`);
  const byName = new Map();
  for (const m of report.moving) byName.set(`${m.name} (${m.dur}s)`, (byName.get(`${m.name} (${m.dur}s)`) ?? 0) + 1);
  for (const [k, v] of byName) console.log(`      ${k} x${v}`);
  console.log(`   elements stuck mid-opacity: ${report.stuck.length}`);
  for (const s of report.stuck.slice(0, 5)) console.log(`      ${s.opacity} <${s.tag}> ${s.cls}`);

  // WebGL shader: is it still repainting frames under reduced motion?
  if (report.canvasCount) {
    const frames = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const canvas = document.querySelector("canvas");
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          if (!gl) return resolve("no gl context");
          const read = () => {
            const px = new Uint8Array(4 * 64);
            gl.readPixels(canvas.width >> 1, canvas.height >> 2, 8, 8, gl.RGBA, gl.UNSIGNED_BYTE, px);
            return px.join(",");
          };
          const a = read();
          setTimeout(() => resolve(a === read() ? "STATIC (good)" : "STILL ANIMATING"), 900);
        })
    );
    console.log(`   webgl canvas: ${frames}`);
  }
  console.log();
  await page.close();
}

// ================= SCREEN-READER SEMANTICS =================
console.log("\n=== SCREEN-READER: landmarks, headings, nav, forms ===\n");
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const route of ["/", "/contact", "/partner-with-us", "/services/gst/registration", "/dsc/drivers/hyp2003"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle0" });
    const r = await page.evaluate(() => {
      const landmarks = [...document.querySelectorAll("header,nav,main,footer,aside,[role]")]
        .filter((el) => ["header", "nav", "main", "footer", "aside"].includes(el.tagName.toLowerCase()) || ["banner", "navigation", "main", "contentinfo", "complementary", "search", "region", "dialog"].includes(el.getAttribute("role")))
        .map((el) => `${el.tagName.toLowerCase()}${el.getAttribute("role") ? `[role=${el.getAttribute("role")}]` : ""}${el.getAttribute("aria-label") ? `="${el.getAttribute("aria-label")}"` : ""}`);

      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
        level: +h.tagName[1],
        text: h.innerText.trim().slice(0, 45),
      }));
      const jumps = [];
      let prev = 0;
      for (const h of headings) {
        if (prev && h.level > prev + 1) jumps.push(`h${prev} -> h${h.level} at "${h.text}"`);
        prev = h.level;
      }

      // Form controls without an accessible name.
      const unlabelled = [];
      for (const el of document.querySelectorAll("input, select, textarea")) {
        if (el.type === "hidden") continue;
        const id = el.id;
        const hasLabel = id && document.querySelector(`label[for="${CSS.escape(id)}"]`);
        const wrapped = el.closest("label");
        const aria = el.getAttribute("aria-label") || el.getAttribute("aria-labelledby");
        if (!hasLabel && !wrapped && !aria) {
          unlabelled.push(`${el.tagName.toLowerCase()}[name=${el.name || "?"}]`);
        }
      }

      // Required fields not conveyed programmatically.
      const reqMismatch = [];
      for (const el of document.querySelectorAll("input, select, textarea")) {
        if (el.type === "hidden") continue;
        const id = el.id;
        const label = (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)?.innerText) || "";
        const looksRequired = label.includes("*");
        if (looksRequired && !el.required && el.getAttribute("aria-required") !== "true") {
          reqMismatch.push(`${el.name || el.id}: label marked * but no required/aria-required`);
        }
      }

      // Links whose accessible name is non-descriptive out of context.
      const vague = new Set(["learn more", "read more", "click here", "more", "here", "view", "details"]);
      const vagueLinks = [...document.querySelectorAll("a[href]")]
        .map((a) => ({
          name: (a.getAttribute("aria-label") || a.innerText || "").trim().toLowerCase(),
          href: a.getAttribute("href"),
        }))
        .filter((a) => vague.has(a.name));

      // Images without alt.
      const noAlt = [...document.querySelectorAll("img")].filter((i) => i.getAttribute("alt") === null).length;

      // Icon-only controls with no accessible name.
      const namelessControls = [...document.querySelectorAll("button, a[href]")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0) return false;
          const name = (el.getAttribute("aria-label") || el.innerText || el.getAttribute("title") || "").trim();
          return !name;
        })
        .map((el) => `<${el.tagName.toLowerCase()} class="${(typeof el.className === "string" ? el.className : "").slice(0, 40)}">`);

      return {
        landmarks,
        h1Count: headings.filter((h) => h.level === 1).length,
        jumps,
        unlabelled,
        reqMismatch,
        vagueLinks: vagueLinks.map((v) => `${v.name} -> ${v.href}`),
        noAlt,
        namelessControls,
        mainCount: document.querySelectorAll("main").length,
      };
    });

    console.log(`--- ${route}`);
    console.log(`   landmarks: ${r.landmarks.join(", ")}`);
    console.log(`   <main> count: ${r.mainCount}, <h1> count: ${r.h1Count}`);
    if (r.jumps.length) console.log(`   HEADING LEVEL JUMPS: ${r.jumps.join(" | ")}`);
    if (r.unlabelled.length) console.log(`   UNLABELLED CONTROLS: ${r.unlabelled.join(", ")}`);
    if (r.reqMismatch.length) console.log(`   REQUIRED MISMATCH: ${r.reqMismatch.join(" | ")}`);
    if (r.vagueLinks.length) console.log(`   VAGUE LINK TEXT (${r.vagueLinks.length}): ${[...new Set(r.vagueLinks)].join(", ")}`);
    if (r.noAlt) console.log(`   IMAGES WITHOUT alt: ${r.noAlt}`);
    if (r.namelessControls.length) console.log(`   CONTROLS WITH NO ACCESSIBLE NAME: ${r.namelessControls.join(", ")}`);
    console.log();
  }
  await page.close();
}

await browser.close();
