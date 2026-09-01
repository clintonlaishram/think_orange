// DSC HUB CONTENT (T3, for /dsc) — CONTENT-PLAN.md §9's authority note applies
// sitewide to every DSC page: lead with the certifying-authority partnership,
// it's the strongest verifiable credential and answers the buyer's real
// question — "is this certificate genuine?"
//
// Same discipline as category-content.js: no invented numbers, no turnaround
// promises, no rupee amounts. Pricing is "on request" on every product page
// (fees: null in products.js) — this hub never states otherwise.

export const dscHubContent = {
  meta: {
    title: "Digital Signature Certificates (DSC) in Salem | ThinkOrange Consulting",
    description:
      // ⛔ eSign PAUSED — 21-08-2026. Original ended "…USB tokens and Aadhaar
      // eSign — issued through…"; restore that clause with the rest of eSign.
      "Class 3 DSCs for individuals and organisations, combo (sign + encrypt) certificates, DGFT certificates and renewals — issued through a licensed Certifying Authority. Salem, Tamil Nadu.",
  },
  heroLede:
    // ⛔ eSign PAUSED — 21-08-2026. Original: "…renewals, USB tokens and Aadhaar
    // eSign — issued through…".
    "Class 3 Digital Signature Certificates for individuals and organisations, combo certificates for e-tendering, DGFT certificates for importers and exporters, and renewals — issued through a licensed Certifying Authority.",
  intro: [
    "A Digital Signature Certificate is what lets you sign legally on the income tax portal, the GST portal, MCA21, e-tendering platforms, EPFO and DGFT/ICEGATE — anywhere a physical signature isn't possible. Getting the wrong class, the wrong validity, or a certificate from an improperly authorised issuer causes more lost time than almost anything else in this line of work.",
    // ⛔ eSign PAUSED — 21-08-2026. Original had, after "running out.":
    // "Aadhaar eSign is below that, for contracts that don't need a certificate
    // at all, followed by tokens, document checklists and driver downloads — or
    // start from Documents Required…".
    "We issue every certificate through a licensed Certifying Authority, so genuineness is never a question mark. Answer two questions in the finder and it names the certificate you need. Document checklists, the portal-by-portal guide, token drivers and renewal all live in DSC Resources, so this page stays about the decision.",
  ],
  // 20-08-2026 — the hero panel's list. NOT new content: these are exactly
  // the portals already named in `intro[0]` above, as a list instead of
  // prose, so the premium hero can show them above the fold. Kept in THIS
  // file, adjacent to the paragraph they come from, so the two cannot quietly
  // disagree — if a portal is added or removed, change both. The footnote is
  // the same assertion the "Can Aadhaar eSign replace a DSC?" FAQ below makes,
  // and the same one `aadhaar-esign`'s own verificationNote and the
  // eSign-or-DSC comparison table make: it is the single most important
  // correction in the DSC tree, so it is stated wherever a reader might stop.
  heroHighlights: {
    heading: "Where a certificate is accepted",
    items: [
      "Income tax portal",
      "GST portal",
      "MCA21 / ROC filings",
      "e-Tendering platforms",
      "EPFO",
      "DGFT / ICEGATE",
    ],
    // ⛔ eSign PAUSED — 21-08-2026. Original footnote: "Aadhaar eSign is for
    // contracts and agreements — statutory portals mandate a Class 3
    // certificate." Restore it with eSign; the panel keeps its list either way.
    footnote:
      "Every one of these mandates a Class 3 certificate specifically.",
  },
  // ⛔ 02-09-2026: this hub's own five-FAQ list is GONE, replaced by
  // `certificateFaqs` in certificates.js plus `dscValidityRenewalContent.faqs`
  // — the merged set from V7 and from the five retired product pages. Keeping
  // a second list here would have put two overlapping FAQ sets on one page,
  // which is exactly the duplication the merge exists to remove.
  whyUs: [
    "Issued through a licensed Certifying Authority — not a reseller of unknown standing.",
    "One point of contact for the certificate, the token and the driver — not three different places to chase when something doesn't work.",
    "Bulk pricing available for chartered accountants, tax practitioners and channel partners buying in volume.",
  ],
};

// ⛔ 02-09-2026: `dscDocumentsMeta` is gone with /dsc/documents-required
// itself. That page is now the `#documents` section of /dsc, which is covered
// by `meta` above; a separate meta object with no page to attach to is a trap
// for whoever reads this next.

// ⛔ 02-09-2026: `dscResourcesMeta` is gone — that page became the Buy Token
// page and its meta now lives with the product it describes, in
// content/dsc/token.js.
