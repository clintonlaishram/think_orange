// Validates every written service leaf against the T2 schema.
// Run: npm run content:check
//
// This is BUILD-PLAN.md's Phase 3 done-when criterion made executable:
// "all 21 leaves validate against the schema, fees is null everywhere, and no
// statistic or price appears anywhere."

import { writtenLeaves } from "../src/content/services/index.js";
import { validateAll } from "../src/content/services/_schema.js";
import { serviceLeavesBySlug } from "../src/content/nav.js";
import { statutory } from "../src/content/statutory.js";
import { unconfirmedHeroStats } from "../src/content/home-hero.js";

const { ok, problems } = validateAll(writtenLeaves);

// Cross-check against nav.js: a leaf whose slug is not in the IA is orphaned
// and will never render.
const orphaned = writtenLeaves
  .filter((leaf) => !serviceLeavesBySlug.has(leaf.slug))
  .map((leaf) => `${leaf.slug}: not a service leaf slug in nav.js`);

// Cross-check that every statutoryKey a leaf declares actually exists.
const badKeys = writtenLeaves.flatMap((leaf) =>
  (leaf.review?.statutoryKeys ?? [])
    .filter((key) => !statutory[key])
    .map((key) => `${leaf.slug}: review.statutoryKeys references unknown statutory key "${key}"`)
);

// Catch statutory-looking values typed directly into prose instead of coming
// from statutory.js. Not exhaustive — a lint, not a proof — but it catches the
// common cases (bare rupee amounts, "N working days", GST form codes).
// What actually needs policing is NUMBERS, not form names.
//
// A form name ("GSTR-1", "REG-06", "ASMT-10") is stable terminology — the same
// kind of word as "invoice". It does not change with a Finance Act and a CA has
// nothing to verify about it. An earlier version of this check flagged them and
// produced 19 false positives on prose like "your GSTR-1 reports what you sold",
// which is correct writing.
//
// A form's DUE DATE, THRESHOLD, RATE or PENALTY is a different thing entirely:
// verifiable, change-prone, and exactly what must live in statutory.js. Form
// codes are still declared in each leaf's review.statutoryKeys, so they still
// appear in CONTENT-REVIEW.md for sign-off — only the lint enforcement changed.
const INLINE_PATTERNS = [
  { re: /₹\s?[\d,]+(\.\d+)?\s?(lakh|crore|cr\b)?/gi, what: "rupee amount" },
  { re: /\b\d+(\.\d+)?\s?%/g, what: "percentage" },
  { re: /\b\d+\s?(working\s+)?(days?|months?|years?)\b/gi, what: "duration" },
  { re: /\b\d{1,2}(st|nd|rd|th)\s+of\s+(the\s+)?(following|each|next)\b/gi, what: "recurring due date" },
  {
    re: /\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
    what: "calendar due date",
  },
];

const PROSE_FIELDS = ["lede", "overview", "whoNeedsThis", "documentsNote"];

const inlineFacts = [];
const undeclaredKeys = [];
for (const leaf of writtenLeaves) {
  // Read the raw source, because by the time we import it the s() calls have
  // already been interpolated — we cannot tell a literal from a resolved value
  // at runtime. Only the source text reveals which is which.
  const url = new URL(`../src/content/services/${leaf.slug}.js`, import.meta.url);
  const fullSrc = await import("node:fs/promises").then((fs) => fs.readFile(url, "utf8"));

  // Scan only the PUBLISHED content, not the `review` block. Review notes are
  // internal metadata addressed to the CA and routinely quote figures in order
  // to question them ("research returned ₹100/day vs ₹1,000/day — confirm").
  // Policing those produced false positives on exactly the notes that exist to
  // flag uncertainty. Relies on `review` being the last field in the schema,
  // which _schema.js's REQUIRED order enforces by convention.
  const reviewAt = fullSrc.indexOf("\n  review: {");
  const src = reviewAt === -1 ? fullSrc : fullSrc.slice(0, reviewAt);

  // Every s("key") actually used in the published content must be declared in
  // review.statutoryKeys. This is the dangerous direction of drift: an
  // undeclared key still RENDERS correctly on the page, but silently never
  // reaches CONTENT-REVIEW.md, so a live statutory claim goes to publication
  // without anyone being asked to confirm it. Caught this way after
  // opcRepealedConversionThresholds escaped the review table.
  const declared = new Set(leaf.review?.statutoryKeys ?? []);
  const usedInSource = new Set([...src.matchAll(/\bs\(\s*"([^"]+)"\s*\)/g)].map((m) => m[1]));
  for (const key of usedInSource) {
    if (!declared.has(key)) {
      undeclaredKeys.push(
        `${leaf.slug}: uses s("${key}") but does not list it in review.statutoryKeys — it would never reach the CA review checklist`
      );
    }
  }

  for (const line of src.split("\n")) {
    // Skip comments and any line that already uses s(), which is the correct form.
    // Skip comments, and any line already using s() for a statutory value or
    // t() for a ThinkOrange turnaround estimate — those are the correct forms.
    const trimmed = line.trim();
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("*") ||
      line.includes("s(") ||
      line.includes("t(")
    ) {
      continue;
    }
    for (const { re, what } of INLINE_PATTERNS) {
      const found = line.match(re);
      if (found) {
        inlineFacts.push(`${leaf.slug}: hardcoded ${what} ${JSON.stringify(found[0])} — move it into statutory.js and use s()`);
      }
    }
  }
}

const all = [...problems, ...orphaned, ...badKeys, ...undeclaredKeys, ...inlineFacts];

console.log(`\ncontent:check — ${writtenLeaves.length} leaf file(s) written of 21\n`);

// Hero stat placeholders. A WARNING, not a failure: these were added
// deliberately to evaluate the hero layout, so failing the build would just
// be noise during design work. But client count and years of experience are
// both on CONTENT-PLAN.md §1.1's hold list, so they must not reach production
// silently — this prints every run until they're confirmed or deleted.
const unconfirmed = unconfirmedHeroStats();
if (unconfirmed.length > 0) {
  console.log("  ⚠ UNCONFIRMED HERO STATS — must not ship (src/content/home-hero.js):");
  for (const stat of unconfirmed) {
    console.log(`      ${stat.id}: "${stat.value}" (${stat.label}) — placeholder, needs founder sign-off`);
  }
  console.log("");
}

if (all.length === 0) {
  console.log("  ✓ all checks passed");
  console.log(`  ✓ fees is null on every leaf`);
  console.log(`  ✓ no statutory values hardcoded outside statutory.js\n`);
  process.exit(0);
}

for (const problem of all) console.log(`  ✗ ${problem}`);
console.log(`\n${all.length} problem(s)\n`);
process.exit(1);
