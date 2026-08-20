// DSC HUB CONTENT (T3, for /dsc) — CONTENT-PLAN.md §9's authority note applies
// sitewide to every DSC page: lead with the eMudhra/SignX partnership, since
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
      "Class 3 DSCs for individuals and organisations, combo (sign + encrypt) certificates, DGFT certificates, renewals and USB tokens — issued through our eMudhra and SignX partnership. Salem, Tamil Nadu.",
  },
  heroLede:
    // ⛔ eSign PAUSED — 21-08-2026. Original: "…renewals, USB tokens and Aadhaar
    // eSign — issued through…".
    "Class 3 Digital Signature Certificates for individuals and organisations, combo certificates for e-tendering, DGFT certificates for importers and exporters, renewals and USB tokens — issued through our eMudhra and SignX partnership.",
  intro: [
    "A Digital Signature Certificate is what lets you sign legally on the income tax portal, the GST portal, MCA21, e-tendering platforms, EPFO and DGFT/ICEGATE — anywhere a physical signature isn't possible. Getting the wrong class, the wrong validity, or a certificate from an improperly authorised issuer causes more lost time than almost anything else in this line of work.",
    // ⛔ eSign PAUSED — 21-08-2026. Original had, after "running out.":
    // "Aadhaar eSign is below that, for contracts that don't need a certificate
    // at all, followed by tokens, document checklists and driver downloads — or
    // start from Documents Required…".
    "We issue every certificate through eMudhra and SignX, both licensed certifying authorities, so genuineness is never a question mark. Choose individual or organisation Class 3, a combo certificate if a portal asks for encryption alongside signing, DGFT for import-export, or a renewal if your current certificate is running out. Below that are tokens, document checklists and driver downloads — or start from Documents Required if you're not sure which certificate you need.",
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
  faqs: [
    {
      q: "Which Class 3 certificate do I need — individual or organisation?",
      a: "Individual, if you're signing in your own personal capacity — income tax filing, or acting as an authorised signatory in your own name on a portal that accepts that. Organisation, if you're signing on behalf of a company or LLP for ROC filings, corporate tender bidding or an organisation-level GST or EPFO submission. If you're unsure which applies, message us and we'll confirm before you order.",
    },
    {
      q: "Do I need a DGFT certificate specifically, or will my existing Class 3 work?",
      a: "A DGFT certificate must be registered against your Import Export Code on the DGFT portal before it's recognised there — an existing Class 3 certificate can sometimes be registered against your IEC instead of buying a new one. See the DGFT (IEC) DSC page for what actually differs.",
    },
    {
      q: "What is the video verification step, and can it be skipped?",
      a: "It's a short recorded call confirming your identity against your submitted documents, required by the Controller of Certifying Authorities for all Class 3 issuance — it cannot be skipped for any certificate type, individual or organisation.",
    },
    {
      q: "What does a combo certificate add over a standard Class 3?",
      a: "A combo certificate carries both a signing certificate and an encryption certificate on one token, issued together rather than bought twice. You need it where a portal's technical requirements specifically ask for an encryption certificate alongside your signing certificate before a bid can be submitted — common on e-tendering and e-procurement platforms. For income tax, GST and MCA filings a standard Class 3 signing certificate is what's used.",
    },
    // ⛔ eSign PAUSED — 21-08-2026. This FAQ is the single most important
    // correction in the DSC tree, so it comes straight back with eSign.
    // {
    //   q: "Can Aadhaar eSign replace a Digital Signature Certificate?",
    //   a: "Not on statutory portals. The income tax portal, the GST portal, MCA21 and e-tendering platforms mandate a Class 3 certificate specifically, and an Aadhaar-based eSign will not be accepted there. eSign is for contracts and agreements — offer letters, NDAs, vendor and client agreements — where the other party accepts an Aadhaar-based signature and nobody wants to wait for a token. See eSign or DSC for a side-by-side comparison.",
    // },
    {
      q: "My token isn't being detected — where do I find driver help?",
      a: "Every certificate ships on a USB token that needs its own driver installed first. See Token Driver Downloads for HYP2003, ePass 2003, Watchdata Proxkey and mToken — each driver page has installation steps and a troubleshooting section.",
    },
  ],
  whyUs: [
    "Issued through eMudhra and SignX — both licensed certifying authorities, not a reseller of unknown standing.",
    "One point of contact for the certificate, the token and the driver — not three different places to chase when something doesn't work.",
    "Bulk pricing available for chartered accountants, tax practitioners and channel partners buying in volume.",
  ],
};

// /dsc/documents-required (T5) has no content file of its own — it derives
// its checklist straight from dscProducts (see UtilityPage.jsx's
// DocumentsRequired). Meta lives here rather than being invented in seo.js,
// since this file is already the DSC-tree's home for hub-level copy.
export const dscDocumentsMeta = {
  title: "Documents Required for a DSC | ThinkOrange Consulting",
  description:
    "What to have ready before applying for a Digital Signature Certificate, grouped by certificate type — individual, organisation, DGFT and token purchase.",
};
