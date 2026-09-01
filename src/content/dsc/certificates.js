// DSC CERTIFICATE CONTENT — the single source for what used to be five
// separate T4 product pages.
//
// ⛔ 02-09-2026 (Clinton): "for the dsc i do not need multiple page like
// class 3 - individual, class -3 organisation, like that so combine the 5
// pages in one." The five certificate routes — /dsc/class-3-individual,
// /dsc/class-3-organisation, /dsc/combo-dsc, /dsc/dgft-iec and
// /dsc/renewal-reissue — are GONE. Their content lives here and renders on
// /dsc itself. Structure and framing follow the two reference documents
// Clinton supplied (ThinkOrange_DSC_Hub_V7.html, ThinkOrange_DSC_Hub_V4.html),
// both of which set their canonical to /dsc and are written as one landing
// page rather than a hub over five children. The DESIGN of that page follows
// this site, not either mockup — neither was implemented visually.
//
// Every sentence below is either carried over verbatim from the five product
// files it replaces (already reviewed) or taken from the reference documents.
// The same disciplines apply as everywhere else in this repo:
//   - No fee, no rupee amount, no turnaround guarantee. The reference files
//     carry literal "₹[X]" / "[X hrs]" placeholders; those are placeholders,
//     not facts, and none of them were typed in. Pricing is "On request"
//     (fees: null discipline); timing comes from turnaround.js.
//   - No statutory citation that has not been researched. V7's "Class 2 was
//     discontinued by the CCA in January 2021" is a dated regulatory fact and
//     would need statutory.js with a source, so it is NOT asserted here — the
//     Class 2 FAQ states the practical position instead. Recorded in
//     MISSING-PAGES.md as a research item.
//
// ⛔ 02-09-2026, later the same day: THE USB TOKEN OFFER IS DELETED, on
// Clinton's instruction ("remove the pan-drive and content"). What used to be
// `content/dsc/products.js` — the "Buy DSC Tokens" product, its own document
// list, process and FAQs — is gone from the site entirely, not relocated. Its
// copy is recoverable from git history if it is ever wanted back.
//
// ⚠️ WHAT DELIBERATELY SURVIVES: every certificate's `tokenNote`, and the
// sentences saying a Class 3 certificate is issued on a FIPS-compliant USB
// token and cannot be held as a file. That is not the token product — it is
// how a Class 3 certificate works, and stripping it would leave the
// certificates section quietly wrong about what a buyer receives.
//
// ⚠️ `key` is what the finder, the icon map and the documents page all join
// on. They are the OLD route slugs, deliberately: six service leaves still
// carry them in `related`, the icon map is keyed by them, and keeping them
// means the retired URLs, the redirects and this content all agree on one
// identifier per certificate.

/**
 * The five certificates, merged. `bestFor` is the one-line answer the finder
 * and the comparison row show; `usedFor`, `documents`, `validityOptions`,
 * `tokenNote` and `verificationNote` are carried over unchanged from each
 * retired product file.
 */
export const certificateVariants = [
  {
    key: "class-3-individual",
    label: "Class 3 — Individual",
    tagline: "In your own name",
    bestFor: "GST, income tax, MCA and trademark filings signed in your own name.",
    lede:
      "For individuals signing on the income tax portal, the GST portal, e-tendering platforms and MCA filings — issued through a licensed Certifying Authority.",
    usedFor: [
      "Income tax e-filing portal, for individuals required or choosing to sign digitally",
      "GST portal, for authorised signatories filing as individuals",
      "E-tendering and e-procurement portals requiring individual bidder signatures",
      "MCA21 filings, where an individual is a director or authorised signatory",
      "EPFO portal submissions",
    ],
    validityOptions: ["1 year", "2 years", "3 years"],
    tokenNote:
      "Issued on a FIPS-compliant USB crypto token — the certificate cannot be used without it, and the token ships as part of the certificate, not separately.",
    documents: [
      "PAN card",
      "Aadhaar card, with the mobile number currently linked to it",
      "Passport-sized photograph",
      "Active mobile number and email for video verification",
    ],
    verificationNote:
      "Issuance includes a video verification step — a short recorded call confirming your identity against your documents. This surprises people who expect a purely paper-based process; block ten minutes for it rather than assuming it can be skipped.",
  },

  {
    key: "class-3-organisation",
    label: "Class 3 — Organisation",
    tagline: "For a company, LLP or firm",
    bestFor:
      "Signing on behalf of a registered entity — ROC filings, company GST, EPFO and ICEGATE.",
    lede:
      "For authorised signatories acting on behalf of a company or LLP — corporate tender bidding, ROC filings and EPFO submissions.",
    usedFor: [
      "MCA21 ROC filings, where a Class 3 organisation certificate is required for the authorised signatory",
      "Corporate bidding on e-tendering and GeM as an organisation",
      "GST portal filings by the organisation's authorised signatory",
      "EPFO employer submissions",
      "Corporate income tax filings requiring an organisation-level certificate",
    ],
    validityOptions: ["1 year", "2 years", "3 years"],
    tokenNote:
      "Issued on a FIPS-compliant USB crypto token, in the organisation's name with the named signatory as the certificate holder.",
    documents: [
      "Certificate of Incorporation or registration certificate",
      "PAN of the organisation",
      "Board resolution or authorisation letter naming the signatory",
      "PAN, Aadhaar and photograph of the authorised signatory",
      "Active mobile number and email of the signatory, for video verification",
    ],
    verificationNote:
      "The authorisation letter or board resolution naming the signatory is the document most often missing or incorrectly worded on a first attempt — get the wording confirmed with us before your board or partners sign it. The entity name on the certificate must also match your portal registration exactly; \"Pvt Ltd\" and \"Private Limited\" are treated as different.",
  },

  {
    key: "combo-dsc",
    label: "Combo — Sign + Encrypt",
    tagline: "Where a portal wants both",
    bestFor:
      "GeM and e-tendering, where a bid must be signed and encrypted before submission.",
    lede:
      "For bidders on e-tendering and e-procurement portals that specifically ask for both a signing and an encryption certificate — issued together on one token, not two separate purchases.",
    usedFor: [
      "E-tendering and e-procurement portals whose technical requirements call for a separate encryption certificate alongside your signing certificate before a bid can be submitted",
      "Company filings on the MCA21 portal, using the signing half of the combo the same way a standard Class 3 certificate works",
      "GST and income tax portal filings for the organisation's authorised signatory",
      "Encrypted document exchange with any department or portal that specifically asks for an encryption certificate, not just a signature",
    ],
    validityOptions: ["2 years", "3 years"],
    tokenNote:
      "Issued as two certificates — one for signing, one for encryption — loaded onto the same FIPS-compliant USB token, so you carry one token rather than two.",
    documents: [
      "Certificate of Incorporation or registration certificate, for an organisation applicant",
      "PAN of the organisation",
      "Board resolution or authorisation letter naming the signatory",
      "PAN, Aadhaar and photograph of the authorised signatory",
      "Active mobile number and email of the signatory, for video verification",
    ],
    verificationNote:
      "Most bidders don't discover a tender wants an encryption certificate until a submission is rejected for missing one — check the specific tender's technical requirements before assuming a signing-only certificate is enough. An encryption certificate cannot be added onto an already-issued signing-only certificate afterward; it has to be issued as a combo from the start.",
  },

  {
    key: "dgft-iec",
    label: "DGFT (IEC)",
    tagline: "Import and export",
    bestFor: "DGFT and ICEGATE filings against an Import Export Code.",
    lede:
      "For importers and exporters using the DGFT and ICEGATE portals — required for IEC-linked transactions and licence applications.",
    usedFor: [
      "DGFT portal — IEC modification, licence applications and export incentive schemes",
      "ICEGATE portal — customs-related filings for importers and exporters",
      "Any IEC-linked transaction requiring digital signature under DGFT rules",
    ],
    validityOptions: ["1 year", "2 years", "3 years"],
    tokenNote:
      "Issued on a FIPS-compliant USB crypto token, registered against your IEC on the DGFT portal after issuance.",
    documents: [
      "Import Export Code (IEC) certificate",
      "PAN of the IEC holder — individual or organisation",
      "Organisation registration documents, where the IEC is held by a company or LLP",
      "Authorisation letter, where the certificate is for a signatory acting on behalf of the IEC holder",
      "Active mobile number and email for video verification",
    ],
    verificationNote:
      "The certificate must be registered against your IEC on the DGFT portal after it is issued — this is a separate step from issuance itself, and skipping it means the certificate will not actually work on DGFT services even though it is valid.",
  },

  {
    key: "dsc-renewal-reissue",
    label: "Renewal & re-issue",
    tagline: "Expiring, lost or damaged",
    bestFor:
      "Replacing a certificate before it lapses, or after a token is lost or damaged.",
    lede:
      "Renewing an existing certificate before it expires, or re-issuing a fresh one after loss, damage or expiry — sorted out before a filing deadline catches you without a working signature.",
    usedFor: [
      "Your current certificate is nearing expiry and you want to keep signing without a gap",
      "Your token is lost, stolen or physically damaged and your certificate needs replacing",
      "Your certificate has already expired and you need a fresh one issued",
      "You're switching certifying authority or token brand and need your certificate reissued accordingly",
    ],
    validityOptions: ["1 year", "2 years", "3 years"],
    tokenNote:
      "Renewing before expiry on a still-working token reuses that same token wherever the certifying authority allows it. A lost, damaged or already-expired case gets a fresh FIPS-compliant USB token.",
    documents: [
      "PAN and Aadhaar (individual), or organisation registration documents plus the authorised signatory's PAN and Aadhaar (organisation)",
      "Your existing certificate's details, if renewing before expiry on the same token",
      "A signed revocation request, if the token was lost, stolen or damaged",
      "Active mobile number and email for video verification",
    ],
    verificationNote:
      "Indian certifying authorities don't technically \"renew\" a certificate in the sense of extending its expiry — a fresh certificate is issued either way. What changes with timing is how much of the process repeats: apply before expiry and it moves faster with a working token you can reuse; wait until after expiry and it's treated as a brand-new application, full verification included, with no grace period once the old one has lapsed.",
  },
];

export function certificateVariant(key) {
  return certificateVariants.find((variant) => variant.key === key);
}

/**
 * Signature / Encryption / Combo — what the certificate DOES, as distinct from
 * whose name it is in. Straight from V4's "DSC Types" section, which is the
 * distinction that reference file exists to make.
 */
export const certificateCapabilities = [
  {
    key: "signature",
    label: "Signature",
    desc:
      "Signs documents, applications and returns. This is what every statutory portal filing uses, and what most people mean by \"a DSC\".",
  },
  {
    key: "encryption",
    label: "Encryption",
    desc:
      "Encrypts a document so only the intended recipient can open it. Issued where a portal's technical requirements specifically call for it.",
  },
  {
    key: "combo",
    label: "Combo",
    desc:
      "Both capabilities, issued together onto one token. Required by most e-tendering platforms, which will not accept a bid that is signed but not encrypted.",
  },
];

/**
 * Which certificate each portal needs — V7's portal table, carried over. This
 * is the section that does the most work now that five pages are one: it is
 * the reference a reader scans instead of opening five tabs.
 */
export const portalGuide = [
  {
    portal: "GST portal",
    certificate: "Class 3 Signature",
    name: "Individual for proprietors; Organisation for companies and LLPs",
    note:
      "Mandatory for companies and LLPs. Others may use an electronic verification code instead. Encryption is not needed.",
  },
  {
    portal: "MCA / ROC",
    certificate: "Class 3 Signature",
    name: "Individual — the director's own name",
    note:
      "Directors sign in their personal capacity, so an Organisation certificate is usually unnecessary. The PAN on the certificate must match the DIN record.",
  },
  {
    portal: "Income tax",
    certificate: "Class 3 Signature",
    name: "Individual",
    note: "Mandatory for companies and audit cases; optional for most others.",
  },
  {
    portal: "GeM & e-tendering",
    certificate: "Class 3 Combo",
    name: "Whoever submits the bid",
    note:
      "Bids must be signed and encrypted. Encryption cannot be added to an existing certificate later.",
  },
  {
    portal: "DGFT",
    certificate: "Class 3 Organisation, or DGFT token",
    name: "Authorised person",
    note:
      "Validated against your IEC profile. Proprietors can use an Individual certificate. A dedicated DGFT token is optional, not compulsory.",
  },
  {
    portal: "ICEGATE / customs",
    certificate: "Class 3 Organisation",
    name: "Authorised person",
    note: "A DGFT certificate is generally accepted too. Covers eSanchit uploads.",
  },
  {
    portal: "EPFO / ESIC",
    certificate: "Class 3 Organisation",
    name: "Registered authorised signatory",
    note:
      "A personal certificate will not work — EPFO validates against the establishment record.",
  },
  {
    portal: "Trademark (IP India)",
    certificate: "Class 3 Signature",
    name: "Applicant or agent",
    note: "An Individual certificate is sufficient.",
  },
];

/**
 * How issuance works. Same four beats every retired product page described,
 * generalised — the differences between certificates were in the DOCUMENTS,
 * not in the process, which is part of why five pages could become one.
 * Rendered through `StepFlow`, the site's one step treatment.
 */
export const dscProcess = [
  {
    step: 1,
    title: "Send your documents",
    desc:
      "PAN, Aadhaar or address proof, and organisation documents where they apply. We check them against the certifying authority's requirements before anything is submitted, rather than after a rejection.",
  },
  {
    step: 2,
    title: "Complete verification",
    desc:
      "Identity is confirmed against your documents, followed by a short recorded video verification from your own phone. It is required for every Class 3 certificate and cannot be skipped.",
  },
  {
    step: 3,
    title: "Receive the certificate",
    desc:
      "The certificate is generated and loaded onto a FIPS-compliant USB token, which is delivered or collected and tested working before you rely on it.",
  },
  {
    step: 4,
    title: "Register it on the portal",
    desc:
      "A certificate does nothing until it is mapped to your account — against your GSTIN, your MCA profile, your EPFO establishment or your IEC. We complete this step with you.",
  },
];

/**
 * V7's "the part most people get stuck on". Kept because it is the honest
 * answer to what happens after issuance, and because two of the four items
 * are the reason the driver pages exist at all.
 */
export const afterIssue = [
  {
    label: "First",
    title: "Install the token driver",
    desc:
      "Your certificate lives on a USB token that needs its driver installed before any portal can see it. This is where most support calls come from, usually after a system update removes the driver. We install it with you, and the driver pages stay on this site for later.",
  },
  {
    label: "Then",
    title: "Register it on the portal",
    desc:
      "A certificate does not work until it is mapped to your account, and the details must match exactly. We complete this registration as part of the job rather than leaving you to work it out.",
  },
  {
    label: "Later",
    title: "Renewal",
    desc:
      "Certificates are not extended — a fresh one is issued, usually onto the same token where the certifying authority allows it. Start before expiry rather than after: there is no grace period once a certificate lapses.",
  },
  {
    label: "If it goes wrong",
    title: "Lost, damaged or locked token",
    desc:
      "Tokens lock permanently after a set number of wrong password attempts, and a certificate cannot be recovered from a lost token. Either way it is a fresh certificate on a new token — and a lost token should be revoked immediately rather than batched with other paperwork. If you are close to the attempt limit, stop and call us.",
  },
];

/**
 * The merged FAQ set. Sourced from V7's own list plus the FAQs of the five
 * retired product pages, deduplicated — a reader who would have opened three
 * pages to find three answers now has them in one accordion.
 */
export const certificateFaqs = [
  {
    q: "Which certificate do I need — Individual or Organisation?",
    a: "Individual, if you are signing in your own personal capacity: income tax filing, trademark filing, or acting as a director on MCA where directors sign as officers rather than on behalf of the entity. Organisation, if you are signing on behalf of a company or LLP — ROC filings by an authorised signatory, corporate tender bidding, company GST or EPFO submissions. If you are not sure which applies to you, use the finder above or message us before you order.",
  },
  {
    q: "I'm a director. Do I need an Organisation certificate for MCA filings?",
    a: "Usually not. Directors sign MCA forms in their personal capacity as officers of the company, so a Class 3 Individual certificate in your own name is normally sufficient — and it costs less. One thing to check: the PAN on your certificate must match the PAN in your DIN record, including how your name is spelled. Mismatches there are the most common reason association fails on the portal.",
  },
  {
    q: "Which certificate do I need for GeM and government tenders?",
    a: "A Class 3 Combo, which carries both signing and encryption. Most procurement portals require bids to be signed and encrypted before submission. Encryption cannot be added to a signing certificate afterwards, so buying signature-only and discovering the requirement on the closing day means losing the tender rather than delaying it. Send us the tender document and we will confirm what it asks for before you order.",
  },
  {
    q: "Do I need a dedicated DGFT certificate?",
    a: "Not necessarily, and this is where exporters most often overspend. The DGFT portal validates against your IEC profile. For a proprietorship, a Class 3 Individual or Organisation certificate works where it matches the PAN in that profile. For companies and LLPs, a Class 3 Organisation certificate works where the organisation name matches the PAN database name. A dedicated DGFT token with the IEC embedded is a third option, useful in some cases but not compulsory. Whichever you use has to be registered against your IEC on the DGFT portal before it is recognised there.",
  },
  {
    q: "Can one certificate be used on more than one portal?",
    a: "Yes, and most people should. A single Class 3 Individual certificate covers income tax, GST, MCA and trademark filings. You would need a separate Organisation certificate only where you sign on behalf of an entity, and a Combo only where a portal requires encryption. Tell us everything you file on and we will work out the smallest number of certificates that covers it.",
  },
  {
    q: "What is the video verification step, and can it be skipped?",
    a: "It is a short recorded call confirming your identity against your submitted documents, required by the Controller of Certifying Authorities for all Class 3 issuance. It applies to every certificate type — individual, organisation, combo, DGFT and renewals alike — and it cannot be skipped. It takes a few minutes on your own phone and has to happen before the certificate is generated, not after.",
  },
  {
    q: "Whose name does an organisation certificate carry — the company's or the signatory's?",
    a: "Both. It is issued to the organisation but carries the named signatory as the certificate holder, since a digital signature is legally tied to an individual acting in an authorised capacity, not to an entity in the abstract. If your authorised signatory changes, the existing certificate stays valid for the original signatory until it expires, but a new one is needed for the new signatory — they are not transferable between people.",
  },
  {
    q: "Can I actually \"renew\" a certificate, or is it always a new one?",
    a: "It is always a fresh certificate — Indian certifying authorities do not extend an existing one's expiry. \"Renewal\" describes doing this before your current certificate lapses, which usually lets you reuse a working token and moves faster since less has changed since your last verification. Renewing also resets the validity period rather than adding to what was left.",
  },
  {
    q: "Do I need a USB token?",
    a: "Yes. A Class 3 certificate must be stored on a compliant USB crypto token and cannot be held as a file on a computer. The token itself does not expire and can usually be reused when the certificate is renewed. If you already have one, send us the model and we will confirm whether it can be reused.",
  },
  {
    q: "Can a foreign national get an Indian DSC without Aadhaar?",
    a: "Yes. Foreign applicants use a passport-based route with attested supporting documents rather than Aadhaar. The whole process can be completed from outside India and the token couriered internationally. The attestation route depends on your country — apostille where it is party to the Hague Convention, otherwise attestation by the Indian Embassy or Consulate — so confirm which applies before preparing anything, because getting it wrong means doing it twice.",
  },
  {
    q: "Is a Class 3 certificate the same everywhere, or does the issuer matter?",
    a: "The certificate follows the same standard regardless of issuer, but genuineness and the support you get afterwards depend entirely on going through a properly authorised certifying authority. We issue through a licensed Certifying Authority rather than reselling from an issuer of unknown standing. Class 3 is also the only class still issued — if you are being offered a choice of class, that tells you something about how closely the vendor follows this business.",
  },
  {
    q: "Do I have to visit your office?",
    a: "No. Everything is done online, including the verification, which takes a few minutes on your own phone. The token is couriered to you. We work with clients across India and outside it.",
  },
];
