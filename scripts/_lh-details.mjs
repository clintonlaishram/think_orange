import fs from "node:fs";

const WANT = [
  "link-text",
  "color-contrast",
  "label-content-name-mismatch",
  "render-blocking-resources",
  "largest-contentful-paint-element",
  "unused-javascript",
  "uses-responsive-images",
  "modern-image-formats",
  "dom-size",
  "bootup-time",
  "mainthread-work-breakdown",
  "third-party-summary",
];

for (const name of ["home", "leaf", "driver", "contact"]) {
  const p = `scripts/_lh/${name}.json`;
  if (!fs.existsSync(p)) continue;
  const r = JSON.parse(fs.readFileSync(p, "utf-8"));
  console.log(`\n########## ${name} (${r.finalDisplayedUrl}) ##########`);
  console.log(
    "metrics:",
    ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"]
      .map((k) => `${k}=${r.audits[k]?.displayValue ?? "?"}`)
      .join("  ")
  );

  for (const id of WANT) {
    const a = r.audits[id];
    if (!a || a.score === 1 || a.scoreDisplayMode === "notApplicable") continue;
    console.log(`\n-- ${id}: ${a.displayValue ?? ""}`);
    const items = a.details?.items ?? [];
    for (const item of items.slice(0, 8)) {
      const bits = [];
      if (item.node?.snippet) bits.push(item.node.snippet.slice(0, 150));
      if (item.node?.explanation) bits.push(`(${item.node.explanation})`);
      if (item.url) bits.push(item.url.replace("http://localhost:4300", ""));
      if (item.text) bits.push(`text="${item.text}"`);
      if (item.wastedBytes) bits.push(`wasted=${Math.round(item.wastedBytes / 1024)}KB`);
      if (item.totalBytes) bits.push(`total=${Math.round(item.totalBytes / 1024)}KB`);
      if (item.wastedMs) bits.push(`wastedMs=${Math.round(item.wastedMs)}`);
      if (item.groupLabel) bits.push(`${item.groupLabel}=${Math.round(item.duration)}ms`);
      if (item.statistic) bits.push(`${item.statistic}: ${item.value?.value ?? item.value}`);
      if (bits.length) console.log("   *", bits.join("  "));
    }
  }
}
