// Generates CONTENT-REVIEW.md — the sign-off checklist for ThinkOrange's CA.
// Run: npm run content:review
//
// The point: auditing tax content by re-reading 21 pages of marketing prose is
// a slog nobody completes properly. Auditing an enumerated table of ~60 claims,
// each with its legal basis and the pages it appears on, is an afternoon.
// Every claim traces back to exactly one definition in statutory.js.

import { writeFile } from "node:fs/promises";
import { statutory, asOf } from "../src/content/statutory.js";
import { turnaround } from "../src/content/turnaround.js";
import { writtenLeaves } from "../src/content/services/index.js";
import { serviceLeavesBySlug } from "../src/content/nav.js";
import { complianceCalendar } from "../src/content/compliance-calendar.js";

// Which pages use which statutory fact.
//
// Two sources of usage, not one — this file originally only scanned
// `writtenLeaves`, which silently dropped compliance-calendar.js's two
// TDS/advance-tax facts into the "not yet used" bucket even though they are
// genuinely live (referenced via `sourceKey`, rendered on the homepage
// calendar once Phase 5/6 build it). A live claim invisible to the CA
// checklist is exactly the bug this whole file exists to prevent — same
// category as the opcRepealedConversionThresholds gap caught earlier. If a
// third content source starts citing statutory.js, it needs a line here too.
const usage = new Map(Object.keys(statutory).map((key) => [key, []]));
for (const leaf of writtenLeaves) {
  for (const key of leaf.review?.statutoryKeys ?? []) {
    usage.get(key)?.push(leaf.title);
  }
}
for (const entry of complianceCalendar) {
  usage.get(entry.sourceKey)?.push(`Compliance Calendar (${entry.label})`);
}

const inUse = Object.entries(statutory).filter(([key]) => usage.get(key).length > 0);
const unused = Object.entries(statutory).filter(([key]) => usage.get(key).length === 0);

// Repealed values are cited on the site in order to say they NO LONGER apply.
// They get their own table, because the question asked of the CA is the
// opposite one: "is this still repealed?" rather than "is this correct?".
// Mixing them into the main table would read as though the site asserts them.
const used = inUse.filter(([, fact]) => !fact.repealed);
const repealed = inUse.filter(([, fact]) => fact.repealed);

const esc = (text) => String(text).replace(/\|/g, "\\|");

const rows = used
  .map(([key, fact]) => {
    const pages = usage.get(key).join(", ");
    return `| \`${key}\` | ${esc(fact.value)} | ${esc(fact.label)} | ${esc(fact.basis)} | ${esc(pages)} | ☐ |`;
  })
  .join("\n");

const notesRows = used
  .filter(([, fact]) => fact.note)
  .map(([key, fact]) => `- **\`${key}\`** — ${fact.note}`)
  .join("\n");

const sourceRows = used
  .map(([key, fact]) => `- \`${key}\` — ${fact.source}`)
  .join("\n");

const leafRows = writtenLeaves
  .map((leaf) => {
    const claims = (leaf.review?.statutoryKeys ?? []).length;
    const faqs = leaf.faqs?.length ?? 0;
    const docGroups = leaf.documents?.length ?? 0;
    return `| ${esc(leaf.title)} | ${claims} | ${faqs} | ${docGroups} | ${leaf.fees === null ? "On request ✓" : "⚠️ " + leaf.fees} | ☐ |`;
  })
  .join("\n");

const perLeafNotes = writtenLeaves
  .filter((leaf) => leaf.review?.notes)
  .map((leaf) => `- **${leaf.title}** — ${leaf.review.notes}`)
  .join("\n");

const doc = `# Content Review Checklist — statutory claims

**Generated** by \`npm run content:review\` · **do not edit by hand**, edits are overwritten.
**Statutory values last researched** ${asOf}
**Coverage** ${writtenLeaves.length} of 21 service leaves written

---

## Why you are being asked to review this

Every factual claim this website makes about Indian tax law is listed below,
with its legal basis and the pages it appears on. The values were researched
from public sources on ${asOf} — **not** recalled from an AI model's training
data, which predates the current financial year. They still need a practising
CA to confirm them against the Act, the Rules and current notifications before
the site goes live.

Two things to know about how this is built:

1. Each value is defined **once**, in \`src/content/statutory.js\`. Correcting a
   figure here updates every page that mentions it — there is no second copy to
   miss.
2. No page states a **fee**. \`fees: null\` renders "On request" everywhere, by
   design, until a pricing model is confirmed. See CONTENT-PLAN.md §11.7 on
   whether publishing fixed fees is advisable for your registrations at all.

---

## 1. Statutory claims to confirm

Tick each once you have confirmed the value and the basis.

| Key | Value as published | What it is | Stated basis | Appears on | ✓ |
|---|---|---|---|---|---|
${rows}

### Caveats already flagged in the source

${notesRows || "_None._"}

${
  repealed.length
    ? `### Repealed provisions cited on the site

These are **not** claims that the site asserts as current law. Each is quoted in
order to state that it **no longer applies**, because competitors still publish
them as live. The question here is the opposite one: confirm each is still
repealed.

| Key | Former value | What it was | Repealed by | Cited on | Still repealed? |
|---|---|---|---|---|---|
${repealed
  .map(
    ([key, fact]) =>
      `| \`${key}\` | ${esc(fact.value)} | ${esc(fact.label)} | ${esc(fact.basis)} | ${esc(usage.get(key).join(", "))} | ☐ |`
  )
  .join("\n")}

`
    : ""
}---

## 2. Operational commitments — for ThinkOrange, not the CA

These are **our own turnaround promises**, not statutory facts. No CA can verify
them; only the firm can decide what it can honour on a bad week. They are on
CONTENT-PLAN.md §1.1's unconfirmed list, so each currently renders as a neutral
phrase instead of a number. Fill in the ones you are willing to commit to, in
\`src/content/turnaround.js\`, and leave the rest.

| Key | What it is | Currently renders as | Your commitment |
|---|---|---|---|
${Object.entries(turnaround)
  .map(
    ([key, entry]) =>
      `| \`${key}\` | ${esc(entry.label)} | ${entry.value === null ? `_${esc(entry.fallback)}_ (unconfirmed)` : esc(entry.value)} | ____________ |`
  )
  .join("\n")}

---

## 3. Per-page review

| Page | Statutory claims | FAQs | Document groups | Fees | ✓ |
|---|---|---|---|---|---|
${leafRows}

### Page-specific notes

${perLeafNotes || "_None._"}

---

## 4. Beyond the numbers

These are not mechanically checkable and need a professional eye:

- **Document lists per entity type.** Practice-based rather than a single
  statutory list, and the GST portal's requirements change without
  notification. Confirm each grouping.
- **Procedural descriptions.** The order of steps, what triggers a query
  notice, and what happens on rejection.
- **Anything implying a guarantee.** Timelines are published as indicative.
  Confirm none of the wording reads as a commitment you cannot honour.
- **Advertising norms.** Confirm the whole site complies with the advertising
  restrictions applicable to your professional registrations.

---

## 5. Sources used

Where each value was researched from. Secondary sources — confirm against the
bare Act and Rules, not these.

${sourceRows}

${unused.length ? `---\n\n## 6. Defined but not yet used\n\nIn \`statutory.js\` but not referenced by any written page yet. Will come into use as the remaining leaves are written.\n\n${unused.map(([key, fact]) => `- \`${key}\` — ${esc(fact.value)} (${esc(fact.label)})`).join("\n")}\n` : ""}
---

## Sign-off

| | Name | Date | Signature |
|---|---|---|---|
| Reviewed by (CA) | | | |
| Approved for publication | | | |

**Until this is signed, the site must not go live.** Unreviewed statutory
content on a compliance firm's own website is the single highest-consequence
risk in this build — see BUILD-PLAN.md §6.
`;

await writeFile(new URL("../CONTENT-REVIEW.md", import.meta.url), doc, "utf8");

console.log(`\ncontent:review — wrote CONTENT-REVIEW.md`);
console.log(`  ${used.length} statutory claim(s) in use across ${writtenLeaves.length} page(s)`);
if (unused.length) console.log(`  ${unused.length} defined but not yet used`);
console.log("");
