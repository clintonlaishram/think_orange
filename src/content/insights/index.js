// INSIGHTS INDEX (T10) — CONTENT-PLAN.md §6 row 12's own bar: "Omit from v1.
// An empty or thin blog is worse than no blog. Reserve the route and add at 4+
// articles." Four real articles now exist, so the section is live.
//
// ⚠️ THIS FILE IS THE INDEX ONLY — no article prose lives here, and that split
// is load-bearing, not tidiness. `nav.js` imports this module to build the
// /insights routes, and nav.js is in the always-eager main chunk; article
// bodies therefore live in ./bodies.js, which only the article template (its
// own lazy route chunk) imports. Put a body back in here and every page on the
// site downloads all four articles before its own first paint — the same class
// of regression Phase 7 and Phase 9 both had to undo.
//
// Content discipline is identical to a service leaf (see CLAUDE.md):
//   - No fee, no turnaround promise, no client count, no invented statistic.
//   - Every statutory value comes through `s()` from statutory.js, so a CA
//     correction there propagates into the articles automatically. Nothing
//     statutory is typed as a literal in ./bodies.js.
//   - Nothing sourced from income-tax territory: the Income Tax Act 2025
//     renumbering (BLOCKERS.md §1) is unreviewed here as much as it is in the
//     four blocked service leaves, so no article touches it.
//
// `confirmed: true` means "this points at a real, published article on a route
// that exists" — the flag Insights.jsx and content-check.mjs both read. It is
// NOT a claim that a CA has reviewed the prose; that's what `review` is for on
// a service leaf, and these four carry the same statutory keys their source
// leaves already carry into CONTENT-REVIEW.md.

/** Published date for all four — the day they were written. Not backdated to
 *  imply a longer-running editorial than exists. */
const PUBLISHED = "2026-08-19";

export const insights = [
  {
    slug: "private-limited-vs-llp-vs-opc",
    title: "Private Limited, LLP or OPC: picking a structure you won't have to unwind",
    excerpt:
      "The three structures most Salem founders choose between, and the compliance each one commits you to long after incorporation day.",
    category: "Business Setup",
    readMinutes: 6,
    published: PUBLISHED,
    // Service pages this article should hand the reader on to. Slugs, resolved
    // against nav.js at render time — never hardcoded paths.
    related: ["private-limited-company", "llp-registration", "opc-registration"],
    meta: {
      title: "Private Limited vs LLP vs OPC — How to Choose | ThinkOrange Consulting",
      description:
        "A plain comparison of Private Limited Company, LLP and One Person Company for Indian founders — ownership, annual compliance and what each structure costs you in filings.",
    },
    confirmed: true,
  },
  // ⛔ eSign PAUSED — 21-08-2026, Clinton: "for now comment out all content and
  // pages about esign". This article is a page about eSign, so it goes with the
  // rest of the family — its route disappears from `insightArticlePages`
  // automatically, since that export is derived from this array.
  //
  // ⚠️ TWO CONSEQUENCES, BOTH INTENTIONAL AND BOTH REVERSED BY UNCOMMENTING:
  //   1. `insights` drops to 3, below `MIN_ARTICLES_TO_SHOW` (4), so the
  //      HOMEPAGE INSIGHTS SECTION NOW RENDERS NOTHING. The threshold is left
  //      at 4 deliberately — the section is a feature-plus-three layout, and
  //      lowering it to 3 would render a feature plus TWO, which is the thin
  //      editorial row that threshold exists to prevent.
  //   2. An article page's "More insights" row now offers 2 cards, not 3.
  // Restore either by uncommenting this entry, or by writing a fourth
  // non-eSign article.
  // {
  //   slug: "class-3-dsc-or-aadhaar-esign",
  //   title: "Class 3 DSC or Aadhaar eSign: which signature your filing actually accepts",
  //   excerpt:
  //     "Both are legally valid signatures. Only one of them is accepted on the income tax, GST, MCA and e-tendering portals — and picking wrong costs you a deadline.",
  //   category: "Digital Signatures",
  //   readMinutes: 5,
  //   published: PUBLISHED,
  //   related: ["class-3-individual", "class-3-organisation", "aadhaar-esign"],
  //   meta: {
  //     title: "Class 3 DSC or Aadhaar eSign — Which Do You Need? | ThinkOrange Consulting",
  //     description:
  //       "When a Class 3 Digital Signature Certificate is mandatory, when Aadhaar eSign is enough, and why government portals accept only one of the two.",
  //   },
  //   confirmed: true,
  // },
  {
    slug: "when-gst-registration-stops-being-optional",
    title: "When GST registration stops being optional",
    excerpt:
      "Turnover is only one of the triggers. Several businesses have to register from their first invoice, whatever they turn over.",
    category: "GST",
    readMinutes: 6,
    published: PUBLISHED,
    related: ["gst-registration", "gst-return-filing", "gst-lut-export-refunds"],
    meta: {
      title: "When GST Registration Becomes Mandatory | ThinkOrange Consulting",
      description:
        "The turnover thresholds, the compulsory-registration cases that ignore them, and what the application itself needs — GST registration explained without the jargon.",
    },
    confirmed: true,
  },
  {
    slug: "gem-registration-tender-readiness",
    title: "Selling to government buyers: what GeM registration actually asks of you",
    excerpt:
      "Registering on GeM is the easy half. Being ready to bid — documents, certificates and a signature that works — is where most first attempts stall.",
    category: "Tenders",
    readMinutes: 6,
    published: PUBLISHED,
    related: ["gem-registration", "tender-documentation", "msme-udyam"],
    meta: {
      title: "GeM Registration & Tender Readiness — What to Prepare | ThinkOrange Consulting",
      description:
        "What GeM registration involves for a seller, the documents a live bid needs, and the MSME benefits that apply on government tenders.",
    },
    confirmed: true,
  },
];

export const MIN_ARTICLES_TO_SHOW = 4;

/** Entries still awaiting a real route + real content — surfaced by content:check. */
export function unconfirmedInsights() {
  return insights.filter((article) => !article.confirmed);
}

export function getInsight(slug) {
  return insights.find((article) => article.slug === slug);
}
