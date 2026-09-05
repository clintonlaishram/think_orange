// DSC FINDER — the wizard that replaces five certificate pages.
//
// ⛔ REBUILT 03-09-2026 against Clinton's `dsc-finder-preview.html`, which is
// the third and most decisive revision of this idea. Two things changed, and
// the first is the important one:
//
//  1. **Question one asks WHAT FOR, not WHICH PORTAL.** It used to list ten
//     portals; it now lists three purposes plus the foreign-national route,
//     as four peer cards (see the ⛔ note on that entry).
//     That is not a simplification for its own sake — it is the reference's
//     actual finding: the statutory portals (GST, income tax, MCA and ROC,
//     EPFO and ESIC, trademark) all take the SAME certificate, so asking which
//     of them you are on was a question whose answer never changed anything.
//  2. **Question two asks WHO SIGNS, with three answers, not two.**
//     Partnership/trust is now its own route because its answer differs from a
//     company's in whose name goes on the certificate.
//
// ⛔⛔ **UNRESOLVED CONTENT CONFLICT — READ BEFORE PUBLISHING ANOTHER WORD OF
// DSC COPY.** `filings|any` below states, in the reference's own wording, that
// ONE Class 3 Individual certificate covers GST, income tax, MCA/ROC, EPFO/ESIC
// and trademark "whether you are a proprietor, a company or an LLP", with no
// organisation documents needed. `portalGuide` in certificates.js — rendered
// further down the SAME page — says the opposite in two rows: GST needs an
// Organisation certificate for companies and LLPs, and for EPFO "a personal
// certificate will not work". Both cannot be true, and the page currently
// asserts both. The reference is newer and is Clinton's own, so it is what is
// implemented here; `portalGuide` was left untouched because correcting it is a
// factual call, not a formatting one. Logged in MISSING-PAGES.md.
//
// ⚠️ RESULTS SELECT BY REFERENCE. An answer names a `certificate` key and the
// component resolves the validity options, the verification note and the
// document checklist out of `certificates.js` at render time. Copying a
// checklist in here would fork it, and a correction to a certificate would
// leave the finder confidently showing the superseded version. What an answer
// owns is only what is specific to THAT route: whose name, what it covers, and
// the one thing that goes wrong.
//
// ⚠️ No fee, no timeline, no turnaround promise appears in any answer. The
// reference's own result cards carry "₹[X]" and "[X hrs]"; those are
// placeholders in the source, not facts, and none were carried over.

/** Question one. `pill` is the certificate this route leads to, shown up front. */
export const finderUses = [
  {
    key: "filings",
    label: "Statutory filings",
    desc: "GST, Income Tax, MCA and ROC, EPFO and ESIC, Trademark, IEC",
    pill: "Class 3 signature",
    icon: "file",
    // Skips question two: the answer is the same for every signer, which is
    // the whole point of collapsing five portals into this one card.
    skipsSigner: true,
  },
  {
    key: "tender",
    label: "Tenders and procurement",
    desc: "GeM, CPPP, Railways, State Tender Portals",
    pill: "Class 3 combo — sign and encrypt",
    icon: "gavel",
  },
  {
    key: "exim",
    label: "Import and export",
    desc: "DGFT Licences, ICEGATE, RCMC, EPCG",
    pill: "Class 3 organisation — Mapped to your IEC",
    icon: "ship",
  },
  // ⛔ 03-09-2026 (Clinton): "remove this show as 4 card no need to sperate."
  // The reference sets the foreign-national route below a labelled divider,
  // and it was built that way first — the argument being that it answers a
  // question about the APPLICANT rather than about the filing. Overruled, and
  // it is now the fourth peer card. Nothing else about the route changed: it
  // still skips question two and still hides the verification toggle.
  // ⚠️ Do NOT reinstate the divider. It is the reference's layout, not a
  // requirement of the data.
  {
    key: "foreign",
    label: "Foreign national",
    desc: "Passport-based verification, whether the applicant is in India or abroad",
    pill: "Class 3 signature — foreign applicant",
    icon: "globe",
    skipsSigner: true,
    // ⛔ No Aadhaar route exists here, so the verification toggle is hidden
    // rather than shown with one option disabled.
    noKyc: true,
  },
];

/** Question two, asked only where a use does not set `skipsSigner`. */
export const finderSigners = [
  { key: "individual", label: "Proprietor or individual" },
  { key: "company", label: "Company or LLP" },
  { key: "firm", label: "Partnership or trust" },
];

/**
 * The answers, keyed `use|signer`. `certificate` is the key the component
 * resolves documents, validity and the verification note against —
 * `heading` is what the reader is told they are buying, which is not always
 * the same string as the certificate's own catalogue label.
 */
export const finderAnswers = {
  "filings|any": {
    certificate: "class-3-individual",
    heading: "Class 3 Signature — Individual",
    name: "The authorised signatory, in their own name",
    covers: "GST, Income Tax, MCA and ROC, EPFO and ESIC, Trademark, IEC",
    warn:
      "One certificate covers all of these, whether you are a proprietor, a company or an LLP — these portals verify the signatory, not the entity, so no organisation documents are needed. The PAN on the certificate must match the PAN registered as signatory on each portal.",
  },
  "foreign|any": {
    certificate: "class-3-individual",
    heading: "Class 3 Signature — Individual",
    name: "The applicant, exactly as the name appears on the passport",
    covers:
      "The same portals a domestic certificate covers — GST, Income Tax, MCA and ROC, Tenders, DGFT",
    warn:
      "Identity is verified against the passport, so this route takes longer than a domestic certificate. Send us the documents before you order — attestation requirements differ depending on whether the applicant is in India at the time of application.",
    // The one answer that carries its own checklist: a passport route is not
    // one of the five certificates, so there is nothing to resolve against.
    documents: [
      "Applicant's photograph",
      "Scanned copy of the original passport",
      "Address proof — driving licence, latest utility bill (electricity, telephone) not older than 3 months, or latest bank statement not older than 3 months",
      "Email ID of the applicant",
      "Mobile or phone number of the applicant",
    ],
    documentNotes: [
      "All documents must be clear, colour-scanned copies.",
      "Documents must be in English.",
      "Anything not in English must be translated into English and notarised by the local competent authority.",
      "Illegible scans are the commonest cause of delay in verification.",
    ],
  },
  "tender|individual": {
    certificate: "combo-dsc",
    heading: "Class 3 Combo — sign and encrypt",
    name: "Whoever submits the bid",
    covers: "GeM, CPPP, Railways, State Tender Portals",
    warn:
      "Encryption cannot be added to a signing-only certificate afterwards. If you buy signature-only now, a rejected bid means buying again from scratch.",
  },
  "tender|company": {
    certificate: "combo-dsc",
    heading: "Class 3 Combo — sign and encrypt",
    name: "The authorised signatory, with the organisation name on the certificate",
    covers: "GeM, CPPP, Railways, State Tender Portals",
    warn:
      "Encryption cannot be added to a signing-only certificate afterwards. Check the specific tender document too — a few portals still name the signatory rather than the entity.",
  },
  "tender|firm": {
    certificate: "combo-dsc",
    heading: "Class 3 Combo — sign and encrypt",
    name: "The authorised partner or trustee, with the entity name on the certificate",
    covers: "GeM, CPPP, Railways, State Tender Portals",
    warn: "Encryption cannot be added to a signing-only certificate afterwards.",
  },
  "exim|individual": {
    certificate: "dgft-iec",
    heading: "Class 3 — Individual or Organisation",
    name: "The proprietor who holds the IEC",
    covers: "DGFT, IEC, ICEGATE, RCMC, EPCG",
    warn:
      "Proprietors can use either. DGFT validates the certificate against the PAN recorded in your IEC profile, so the PAN has to be the one on the IEC — not a second PAN you also hold.",
    link: { slug: "iec-registration", label: "We can handle the IEC too" },
  },
  "exim|company": {
    certificate: "dgft-iec",
    heading: "Class 3 Signature — Organisation",
    name: "The authorised signatory, with the organisation name on the certificate",
    covers: "DGFT, IEC, ICEGATE, RCMC, EPCG",
    warn:
      "The organisation name on the certificate must match the PAN database name in your IEC profile exactly. This is the commonest reason a DGFT certificate is rejected after issue. Encryption is not required.",
    link: { slug: "iec-registration", label: "Need an IEC first?" },
  },
  "exim|firm": {
    certificate: "dgft-iec",
    heading: "Class 3 Signature — Organisation",
    name: "The authorised partner or trustee, with the entity name on the certificate",
    covers: "DGFT, IEC, ICEGATE, RCMC, EPCG",
    warn:
      "The entity name on the certificate must match the PAN database name in your IEC profile exactly. Encryption is not required.",
    link: { slug: "icegate-registration", label: "ICEGATE registration" },
  },
};

export function finderAnswer(useKey, signerKey) {
  return finderAnswers[`${useKey}|${signerKey}`];
}

export function finderUse(key) {
  return finderUses.find((use) => use.key === key);
}

/**
 * The escape hatches under question one — for readers whose situation is not
 * a first purchase at all. Paths are built by the component from nav.js so a
 * section id cannot be typed wrong here.
 */
export const finderAltLinks = [
  { key: "renewal", label: "Renewing or replacing" },
  { key: "drivers", label: "Token drivers and downloads" },
  { key: "contact", label: "Not sure — ask us" },
];
