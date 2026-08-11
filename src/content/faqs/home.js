// Homepage FAQ selection — CONTENT-PLAN.md §406's planned "shared FAQ pools".
//
// ⚠️ THE ONE RULE FOR THIS FILE: it selects BY REFERENCE, it never copies text.
// Every answer already exists in a written service leaf, where it was
// researched with a legal basis, interpolates its numbers through `s()` from
// statutory.js, and is queued for CA sign-off in CONTENT-REVIEW.md. Pasting an
// answer here would fork it: a CA correction to the leaf would silently leave
// the homepage asserting the superseded version. So each entry is a pointer,
// and `homeFaqs()` resolves the answer at call time.
//
// Consequence worth knowing: adding a homepage FAQ is not a writing task. Write
// it in the leaf first (where the schema validates word budget and the
// statutory scanner runs), then point at it from here.
//
// Selection criteria for this row, in order:
//   1. Broad enough that a first-time visitor actually asks it.
//   2. Spread across service families — GST, entity choice, DSC, accounting,
//      tenders — so the row reads as the whole practice, not just GST.
//   3. Nothing from an income-tax leaf. Those four leaves are unwritten and
//      blocked on BLOCKERS.md §1 (Income Tax Act 2025 renumbering), so there is
//      no reviewed answer to point at yet. Do not write one here to fill the gap.

import { serviceContent } from "../services/index.js";
import { findBySlug } from "../nav.js";

/**
 * Each entry: which leaf, and the EXACT question text to lift from it.
 * Matching on the question rather than an array index on purpose — a leaf's
 * faqs can be reordered during review without silently swapping what the
 * homepage shows.
 */
const SELECTION = [
  { slug: "gst-registration", q: "How long does GST registration take?" },
  { slug: "private-limited-company", q: "Should I choose a company or an LLP?" },
  { slug: "gst-notices-litigation", q: "What happens if I ignore a GST notice?" },
  {
    slug: "private-limited-company",
    q: "Do all directors need a Digital Signature Certificate?",
  },
  {
    slug: "bookkeeping",
    q: "Do you work with our existing Tally or Zoho Books file?",
  },
  { slug: "gem-registration", q: "Do I need Udyam registration to sell on GeM?" },
];

/**
 * Resolved homepage FAQs: [{ id, q, a, path, label }].
 *
 * Unresolvable entries are DROPPED rather than rendered blank — a leaf can be
 * rewritten or a question reworded, and a half-empty accordion row is worse
 * than a shorter list. Dev builds warn loudly so the drop is never silent.
 */
export function homeFaqs() {
  const resolved = [];
  const missing = [];

  SELECTION.forEach((pick, index) => {
    const leaf = serviceContent[pick.slug];
    const faq = leaf?.faqs?.find((f) => f.q === pick.q);
    const route = findBySlug(pick.slug);

    if (!leaf || !faq || !route) {
      missing.push(
        `${pick.slug} → "${pick.q}" (${!leaf ? "leaf not written" : !faq ? "question not found in leaf" : "no route in nav.js"})`,
      );
      return;
    }

    resolved.push({
      id: `${pick.slug}-${index}`,
      q: faq.q,
      a: faq.a,
      // Path comes from nav.js, never typed here — CLAUDE.md's keystone rule.
      path: route.path,
      label: route.label,
    });
  });

  if (import.meta.env?.DEV && missing.length > 0) {
    console.warn(
      `[home-faqs] ${missing.length} selection(s) did not resolve and were ` +
        `dropped from the homepage FAQ row:\n  ${missing.join("\n  ")}\n` +
        `Fix src/content/faqs/home.js — the leaf's question text is the key.`,
    );
  }

  return resolved;
}
