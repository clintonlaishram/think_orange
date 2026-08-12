import fs from "node:fs";

for (const name of ["home", "leaf"]) {
  const r = JSON.parse(fs.readFileSync(`scripts/_lh/${name}.json`, "utf-8"));
  console.log(`\n########## ${name} ##########`);

  const lcpEl = r.audits["largest-contentful-paint-element"];
  console.log("LCP element:", JSON.stringify(lcpEl?.details?.items?.[0]?.items?.[0]?.node?.snippet ?? lcpEl?.details?.items?.[0]?.node?.snippet ?? "?").slice(0, 200));

  const chain = r.audits["network-requests"]?.details?.items ?? [];
  console.log("\nnetwork requests (top 15 by end time):");
  for (const item of chain.slice(0, 15)) {
    console.log(
      `   ${String(Math.round(item.networkRequestTime)).padStart(6)}ms -> ${String(Math.round(item.networkEndTime)).padStart(6)}ms  ${String(Math.round((item.transferSize ?? 0) / 1024)).padStart(5)}KB  ${item.resourceType ?? ""}  ${(item.url ?? "").replace("http://localhost:4300", "")}`
    );
  }

  const insight = r.audits["network-dependency-tree-insight"];
  if (insight?.details) {
    console.log("\ncritical path insight:", JSON.stringify(insight.details).slice(0, 900));
  }

  console.log("\nkey timings:");
  for (const k of ["first-contentful-paint", "largest-contentful-paint", "server-response-time", "total-blocking-time"]) {
    console.log(`   ${k}: ${r.audits[k]?.displayValue ?? "?"} (numeric ${Math.round(r.audits[k]?.numericValue ?? 0)})`);
  }
}
