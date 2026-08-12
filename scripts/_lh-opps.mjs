import fs from "node:fs";

for (const name of ["home", "leaf"]) {
  const r = JSON.parse(fs.readFileSync(`scripts/_lh/${name}.json`, "utf-8"));
  console.log(`\n########## ${name} — perf ${Math.round(r.categories.performance.score * 100)} ##########`);

  // Weighted metric contributions: this is what actually makes the score.
  console.log("\nweighted metrics:");
  for (const ref of r.categories.performance.auditRefs.filter((a) => a.weight > 0)) {
    const a = r.audits[ref.id];
    console.log(
      `   weight ${String(ref.weight).padStart(2)}  score ${String(Math.round((a.score ?? 0) * 100)).padStart(3)}  ${a.id} = ${a.displayValue ?? ""}`
    );
  }

  console.log("\nopportunities / diagnostics with savings:");
  const rows = [];
  for (const ref of r.categories.performance.auditRefs) {
    const a = r.audits[ref.id];
    if (!a || a.score === 1 || a.score === null) continue;
    const ms = a.details?.overallSavingsMs ?? a.numericValue;
    const bytes = a.details?.overallSavingsBytes;
    if (a.details?.type === "opportunity" || bytes) {
      rows.push(`   ${a.id}: ${Math.round(ms ?? 0)}ms  ${bytes ? Math.round(bytes / 1024) + "KB" : ""}`);
    }
  }
  console.log(rows.join("\n") || "   (none)");

  const lcpPhases = r.audits["lcp-breakdown-insight"] ?? r.audits["largest-contentful-paint-element"];
  if (lcpPhases?.details?.items) {
    console.log("\nLCP breakdown:");
    console.log(JSON.stringify(lcpPhases.details.items).slice(0, 700));
  }
}
