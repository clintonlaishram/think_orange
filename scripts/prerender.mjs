// Phase 9 — prerenders all 49 routes to static HTML, then emits sitemap.xml
// and robots.txt. Run via `npm run build` (wired as the `postbuild` script,
// which npm runs automatically once `vite build` finishes) — never run this
// directly against a stale or missing dist/.
//
// Approach (BUILD-PLAN.md §1's resolution — vite-react-ssg was ruled out
// early for pinning a react-router-dom@^6 peer range that conflicts with
// this project's locked v7 stack):
//   1. `vite build --ssr src/entry-server.jsx` compiles the app into a
//      Node-runnable SSR bundle (handles JSX/the "@/" alias/CSS imports —
//      none of which plain Node can do on its own).
//   2. Import that bundle's `render(path)` and call it once per route.
//   3. Splice the resulting body HTML and a route's resolved <head> tags
//      (src/lib/seo.js's resolveSeo — the SAME function useSeoHead() uses
//      client-side, so build-time and post-hydration <head> can't disagree)
//      into the dist/index.html template Vite already produced.
//   4. Write each route to dist/<path>/index.html (dist/index.html itself
//      for "/"), plus dist/404.html for the wildcard — the convention most
//      static hosts (Netlify, GitHub Pages, Cloudflare Pages) look for.
//
// JSON-LD needs no separate injection step here: every schema block (see
// src/components/seo/JsonLd.jsx call sites) is rendered as part of the React
// tree itself, so it's already inside the body HTML render() returns.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { site, sitemapPaths } from "../src/content/nav.js";
import { resolveSeo } from "../src/lib/seo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSR_OUT_DIR = "dist-server";
const SSR_OUT = path.join(ROOT, SSR_OUT_DIR);
const ORIGIN = `https://${site.domain}`;

// react-router needs a real, unmatched URL to exercise the "*" wildcard
// route — "*" itself isn't a fetchable path. resolveSeo("*") is still called
// with the literal "*" (that's the actual key nav.js's route table uses).
const NOT_FOUND_PROBE_PATH = "/__prerender_404_probe__";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildHeadBlock(seo) {
  const { title, description, canonical, robots, ogImage } = seo;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const lines = [
    "<!-- SEO:START -->",
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${robots}" />`,
  ];
  if (canonical) lines.push(`<link rel="canonical" href="${canonical}" />`);
  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.shortName)}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${canonical ?? `${ORIGIN}/`}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    "<!-- SEO:END -->"
  );
  return lines.join("\n    ");
}

function renderHtmlFor(template, bodyHtml, seo) {
  return template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, buildHeadBlock(seo))
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function outputFileFor(routePath) {
  if (routePath === "*") return path.join(DIST, "404.html");
  if (routePath === "/") return path.join(DIST, "index.html");
  return path.join(DIST, routePath, "index.html");
}

function writeSitemap(paths) {
  const urls = paths
    .map((p) => `  <url>\n    <loc>${ORIGIN}${p === "/" ? "/" : p}</loc>\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf-8");
}

function writeRobots() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
  writeFileSync(path.join(DIST, "robots.txt"), txt, "utf-8");
}

async function main() {
  if (!existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/index.html not found — run `vite build` before prerendering.");
  }

  console.log("[prerender] building SSR bundle...");
  execSync(`npx vite build --ssr src/entry-server.jsx --outDir ${SSR_OUT_DIR} --logLevel warn`, {
    cwd: ROOT,
    stdio: "inherit",
  });

  const { render } = await import(pathToFileURL(path.join(SSR_OUT, "entry-server.js")));
  const template = readFileSync(path.join(DIST, "index.html"), "utf-8");
  const paths = sitemapPaths(); // crawlable routes, excludes "*"

  for (const routePath of paths) {
    const bodyHtml = await render(routePath);
    const html = renderHtmlFor(template, bodyHtml, resolveSeo(routePath));
    const outFile = outputFileFor(routePath);
    mkdirSync(path.dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, "utf-8");
  }

  // 404 last, and separately: it renders off a probe path (see the constant
  // above) but its HEAD tags come from resolveSeo("*") — the real nav.js key.
  const notFoundBody = await render(NOT_FOUND_PROBE_PATH);
  const notFoundHtml = renderHtmlFor(template, notFoundBody, resolveSeo("*"));
  writeFileSync(outputFileFor("*"), notFoundHtml, "utf-8");

  writeSitemap(paths);
  writeRobots();

  rmSync(SSR_OUT, { recursive: true, force: true });

  console.log(`[prerender] wrote ${paths.length} routes + 404.html + sitemap.xml + robots.txt`);
}

main().catch((error) => {
  console.error("[prerender] failed:", error);
  process.exitCode = 1;
});
