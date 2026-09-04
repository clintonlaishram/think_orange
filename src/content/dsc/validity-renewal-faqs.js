// T5 — Validity, Renewal & FAQs (`/dsc/validity-renewal-faqs`). Added
// 18-08-2026 as part of the DSC & eSign menu restructure's writing backlog
// (see MISSING-PAGES.md). A reference/knowledge-base page, not a sales
// page — the "Tokens & Resources" nav column it sits in is reference
// material (Documents Required, Driver Downloads, this page), while the
// actual renewal/re-issue SERVICE lives on its own T4 page
// (`dsc-renewal-reissue` in products.js). This file deliberately does not
// duplicate that page's own process steps or FAQs; it covers broader
// reference questions instead and links across to the service page for
// anyone ready to act.
//
// The per-certificate validity table on this page is NOT duplicated here —
// `UtilityPage.jsx` reads `validityOptions` straight off `dscProducts`
// (`content/dsc/products.js`), same "select by reference" discipline as the
// homepage FAQ row and the Documents Required page. A future validity change
// on any product automatically stays correct here with zero edits to this
// file.
export const dscValidityRenewalContent = {
  meta: {
    title: "DSC Validity, Renewal & FAQs | ThinkOrange Consulting",
    description:
      "How long a Digital Signature Certificate lasts, what renewal actually means in India, and answers to the questions that come up most before and after issuance.",
  },
  heroLede:
    "How long a certificate actually lasts, what renewal and re-issue really mean, and what happens if a certificate lapses or a token goes missing.",

  renewalGuidance: [
    "A Digital Signature Certificate is never technically \"extended\" — every certifying authority issues a brand-new certificate each time, with a fresh serial number and a fresh validity period you choose again (1, 2 or 3 years, depending on the certificate type). \"Renewal\" is the industry's name for doing this before your current certificate expires, not a different mechanism.",
    "Timing changes how much of the process repeats, not whether it happens. Apply before expiry and you can usually keep your existing token and move faster, since less has changed since your last verification. Wait until after expiry and there is no grace period — the certificate simply stops signing, and getting a new one is treated as a fresh application with full verification again.",
    "A lost, stolen or damaged token is a different situation from an expiring certificate, and needs revocation, not renewal. Revoking adds the certificate to the certifying authority's Certificate Revocation List, so it can no longer be used to sign anything — even by someone holding the physical token. This should happen immediately, not whenever it's convenient to deal with the paperwork.",
  ],

  // ⛔ RENDERED FORM — 04-09-2026 (Clinton: "in dsc faq page, Renewal &
  // re-issue section reduce the content make as point"). `renewalGuidance`
  // above is THREE dense paragraphs; this is the same four facts as points.
  //
  // ⚠️ `renewalGuidance` is DELIBERATELY KEPT and still exported, unreferenced
  // — same discipline as `portalGuide` / `afterIssue` / `tokenProduct.explainers`
  // elsewhere in this tree. Restoring the prose version is render-only. Do NOT
  // prune it on a tidy-up pass.
  //
  // ⚠️ Nothing here is a new claim: every point is a condensation of a
  // sentence already in `renewalGuidance`. No day count, no grace period
  // length, no fee — "no grace period" is the absence of one, which is the
  // fact itself, not an estimate.
  renewalPoints: [
    {
      label: "Renewal is a brand-new certificate",
      detail:
        "No certifying authority extends an existing one. Each time, you get a fresh serial number and choose the validity term again. \"Renewal\" is only the industry's name for doing it before the current certificate expires.",
    },
    {
      label: "Starting before expiry repeats less",
      detail:
        "Apply while the certificate is still valid and you can usually keep your existing token and move faster, because less has changed since your last verification.",
    },
    {
      label: "There is no grace period",
      detail:
        "The moment a certificate expires it stops signing. A new one is then treated as a fresh application, with full verification again.",
    },
    {
      label: "A lost or damaged token needs revocation, not renewal",
      detail:
        "Revoking adds the certificate to the certifying authority's Certificate Revocation List, so it cannot sign anything again — even for someone holding the physical token. This should happen immediately, not once the paperwork is convenient.",
    },
  ],

  faqs: [
    {
      q: "How long does a Digital Signature Certificate last?",
      a: "It depends on the certificate type and the term you choose at issuance — most of our certificates offer a 1, 2 or 3-year term, and a combo (sign + encrypt) certificate is offered at 2 or 3 years. The certificate types section above lists the options for each.",
    },
    {
      q: "Can I have more than one DSC at the same time?",
      a: "Yes — an individual can hold a personal certificate and an organisation certificate simultaneously if they act in both capacities, and a business can hold separate certificates for different authorised signatories. Each certificate is independent of the others.",
    },
    {
      q: "What actually happens the moment a certificate expires?",
      a: "It stops working immediately, with no grace period — any portal or software checking the certificate will reject it from that point on. There's no partial or reduced functionality; it's valid one moment and unusable the next.",
    },
    {
      q: "Does revoking a certificate undo documents I already signed with it?",
      a: "No. A signature made while the certificate was valid stays valid for that document — revocation only stops the certificate from being used to sign anything new from that point forward. This is exactly why revoking promptly after a loss matters: it can't undo past signatures, but it does stop future misuse.",
    },
    {
      q: "What is a Certificate Revocation List?",
      a: "It's the certifying authority's public record of every certificate that's been revoked before its natural expiry, checked automatically by portals and signing software before they'll accept a signature. It's how a lost or compromised certificate is actually blocked from further use, rather than just being reported as lost somewhere informal.",
    },
    {
      q: "I changed my name, address or organisation details — does my existing certificate still work?",
      a: "The certificate itself keeps working exactly as issued, since it was generated against the details verified at the time. But it will no longer reflect your current details accurately, so it's worth having it re-issued against your updated documents rather than continuing to sign with certificate details that no longer match reality.",
    },
    {
      q: "Can I renew early, well before my certificate is close to expiring?",
      a: "Most certifying authorities allow this, though it means paying for a new validity term that overlaps with time still left on your current one. It can be worth it if you'd rather not track a renewal date closely, but for most people renewing closer to — but still comfortably before — expiry makes better use of what you've already paid for.",
    },
  ],
};
