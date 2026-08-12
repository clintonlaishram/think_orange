// Phase 10 gate: Lighthouse mobile, >=95 on Performance / Accessibility /
// Best Practices / SEO for four representative routes (BUILD-PLAN.md Phase 10).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:4300";
const ROUTES = [
  ["home", "/"],
  ["leaf", "/services/gst/registration"],
  ["driver", "/dsc/drivers/hyp2003"],
  ["contact", "/contact"],
];

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
process.env.CHROME_PATH = CHROME_PATHS.find((p) => fs.existsSync(p));

const outDir = "scripts/_lh";
fs.mkdirSync(outDir, { recursive: true });

const results = [];
for (const [name, route] of ROUTES) {
  const outPath = path.join(outDir, `${name}.json`);
  console.log(`\n[lighthouse] ${route} ...`);
  try {
    execFileSync(
      "npx",
      [
        "--yes",
        "lighthouse",
        `${BASE}${route}`,
        "--only-categories=performance,accessibility,best-practices,seo",
        "--form-factor=mobile",
        "--output=json",
        `--output-path=${outPath}`,
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu --ignore-certificate-errors',
        "--quiet",
        "--no-update-notifier",
      ],
      { stdio: ["ignore", "pipe", "pipe"], shell: true, timeout: 300000 }
    );
    const report = JSON.parse(fs.readFileSync(outPath, "utf-8"));
    const c = report.categories;
    const row = {
      route,
      perf: Math.round(c.performance.score * 100),
      a11y: Math.round(c.accessibility.score * 100),
      bp: Math.round(c["best-practices"].score * 100),
      seo: Math.round(c.seo.score * 100),
    };
    results.push(row);
    console.log(
      `  perf=${row.perf} a11y=${row.a11y} best-practices=${row.bp} seo=${row.seo}`
    );

    // Surface every failing audit so the fixes are actionable, not just a score.
    for (const [catKey, cat] of Object.entries(c)) {
      const failing = cat.auditRefs
        .map((ref) => report.audits[ref.id])
        .filter(
          (a) =>
            a &&
            a.score !== null &&
            a.score < 1 &&
            a.scoreDisplayMode !== "informative" &&
            a.scoreDisplayMode !== "notApplicable"
        );
      if (failing.length) {
        console.log(`  -- ${catKey} failing audits:`);
        for (const a of failing) {
          console.log(`     [${a.score}] ${a.id}: ${a.title}`);
        }
      }
    }
  } catch (error) {
    console.log(`  FAILED: ${error.message.split("\n")[0]}`);
    results.push({ route, error: true });
  }
}

console.log("\n=== SUMMARY (gate: all >= 95) ===");
for (const r of results) {
  if (r.error) {
    console.log(`${r.route.padEnd(32)} ERRORED`);
    continue;
  }
  const pass = r.perf >= 95 && r.a11y >= 95 && r.bp >= 95 && r.seo >= 95;
  console.log(
    `${pass ? "PASS" : "FAIL"} ${r.route.padEnd(32)} perf=${r.perf} a11y=${r.a11y} bp=${r.bp} seo=${r.seo}`
  );
}
