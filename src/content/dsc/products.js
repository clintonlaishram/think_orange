// T4 — DSC product pages. CONTENT-PLAN.md §9.
//
// Structure per product, matching the T4 template's 9 sections:
//   hero, usedFor, validity, documents, process, fees(null), driverLinks, faqs
//
// AUTHORITY NOTE (CONTENT-PLAN.md §9): lead every page with the eMudhra/SignX
// partnership — it's the strongest verifiable credential and answers the
// buyer's real question, "is this certificate genuine?"
//
// Pricing is "on request" everywhere, same discipline as service leaves —
// DSC pricing varies by validity, token bundling and partner/bulk rates, and
// publishing a number here would need the same confirmation fees:null does.

export const dscProducts = [
  {
    slug: "class-3-individual",
    label: "Class 3 DSC — Individual",
    h1: "Class 3 Digital Signature Certificate — Individual",
    meta: {
      title: "Class 3 DSC for Individuals in Salem | ThinkOrange Consulting",
      description:
        "Class 3 Digital Signature Certificate for individuals — income tax, GST, MCA and e-tendering portals. eMudhra and SignX partner, Salem, Tamil Nadu.",
      keywords: [
        "class 3 dsc individual salem",
        "digital signature certificate individual",
        "dsc for income tax filing",
        "dsc for gst portal",
      ],
    },
    lede:
      "For individuals signing on the income tax portal, the GST portal, e-tendering platforms and MCA filings — issued through our eMudhra and SignX partnership.",
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
      "Aadhaar card",
      "Passport-sized photograph",
      "Active mobile number and email for video verification",
    ],
    verificationNote:
      "Issuance includes a video verification step — a short recorded call confirming your identity against your documents. This surprises people who expect a purely paper-based process; block ten minutes for it rather than assuming it can be skipped.",
    process: [
      { step: 1, title: "Application and documents", desc: "PAN, Aadhaar and photograph submitted through the certifying authority's portal." },
      { step: 2, title: "Video verification", desc: "A short recorded verification call confirming your identity." },
      { step: 3, title: "Certificate issuance", desc: "The certificate is generated and loaded onto your token." },
      { step: 4, title: "Token handover", desc: "Token delivered or collected, tested, and driver installation confirmed working." },
    ],
    fees: null,
    driverSlugs: ["hyp2003", "epass-2003", "watchdata-proxkey", "mtoken"],
    faqs: [
      {
        q: "Is a Class 3 DSC the same everywhere, or does the issuer matter?",
        a: "The certificate itself follows the same CCA-mandated standard regardless of issuer, but genuineness and support afterward depend entirely on going through a properly authorised certifying authority. We issue through eMudhra and SignX, both licensed certifying authorities, not a reseller of unknown standing.",
      },
      {
        q: "What is the video verification step?",
        a: "A short recorded call where you confirm your identity against your submitted documents, required by the Controller of Certifying Authorities for all Class 3 issuance. It takes a few minutes and needs to happen before the certificate is generated, not after.",
      },
      {
        q: "Which validity period should I choose?",
        a: "A 2 or 3-year certificate costs less per year than repeatedly buying 1-year certificates, and is usually the better choice unless you have a specific reason to expect you will not need it beyond a year.",
      },
      {
        q: "What happens if I lose my token?",
        a: "The certificate on a lost token can be revoked to prevent misuse, and a new certificate issued on a new token — but this means going through issuance again, including video verification. Keep your token somewhere you would notice its absence quickly.",
      },
    ],
  },

  {
    slug: "class-3-organisation",
    label: "Class 3 DSC — Organisation",
    h1: "Class 3 Digital Signature Certificate — Organisation",
    meta: {
      title: "Class 3 DSC for Organisations in Salem | ThinkOrange Consulting",
      description:
        "Class 3 Digital Signature Certificate for companies and LLPs — corporate tender bidding, ROC filings and EPFO submissions. Salem, Tamil Nadu.",
      keywords: [
        "class 3 dsc organisation salem",
        "digital signature certificate company",
        "dsc for roc filing",
        "dsc for authorised signatory",
      ],
    },
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
      "The authorisation letter or board resolution naming the signatory is the document most often missing or incorrectly worded on a first attempt — get the wording confirmed with us before your board or partners sign it.",
    process: [
      { step: 1, title: "Authorisation confirmed", desc: "The board resolution or authorisation letter checked before anything else is submitted." },
      { step: 2, title: "Application and documents", desc: "Organisation and signatory documents submitted together." },
      { step: 3, title: "Video verification", desc: "The named signatory completes video verification." },
      { step: 4, title: "Certificate and token handover", desc: "Certificate issued in the organisation's name, token delivered and tested." },
    ],
    fees: null,
    driverSlugs: ["hyp2003", "epass-2003", "watchdata-proxkey", "mtoken"],
    faqs: [
      {
        q: "Whose name does the certificate carry — the company's or the signatory's?",
        a: "Both. It is issued to the organisation but carries the named signatory as the certificate holder, since a digital signature is legally tied to an individual acting in an authorised capacity, not to an entity in the abstract.",
      },
      {
        q: "What if our authorised signatory changes?",
        a: "The existing certificate stays valid for the original signatory until it expires, but a new organisation certificate is needed for a new signatory — the two are not transferable between people. Plan the timing around your existing certificate's expiry where possible.",
      },
      {
        q: "Do we need a board resolution even for a small private company?",
        a: "Yes — the authorisation requirement applies regardless of company size. A simple authorisation letter or board resolution is usually sufficient; we can confirm the wording that certifying authorities expect before you have it signed.",
      },
    ],
  },

  {
    slug: "dgft-iec",
    label: "DGFT (IEC) DSC",
    h1: "DGFT Digital Signature Certificate for IEC Holders",
    meta: {
      title: "DGFT DSC for IEC Holders in Salem | ThinkOrange Consulting",
      description:
        "Digital Signature Certificate for the DGFT and ICEGATE portals, for importers and exporters with an Import Export Code. Salem, Tamil Nadu.",
      keywords: [
        "dgft dsc salem",
        "iec digital signature certificate",
        "dsc for dgft portal",
        "icegate digital signature",
      ],
    },
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
    process: [
      { step: 1, title: "Application and documents", desc: "IEC and identity documents submitted together." },
      { step: 2, title: "Video verification", desc: "Identity verification completed for the certificate holder." },
      { step: 3, title: "Certificate issuance", desc: "The certificate is generated and loaded onto your token." },
      { step: 4, title: "DGFT portal registration", desc: "The certificate registered against your IEC on the DGFT portal — the step that makes it actually usable." },
    ],
    fees: null,
    driverSlugs: ["hyp2003", "epass-2003", "watchdata-proxkey", "mtoken"],
    faqs: [
      {
        q: "Is a DGFT DSC different from a regular Class 3 certificate?",
        a: "The underlying certificate is the same Class 3 standard — what differs is that it must be registered against your IEC on the DGFT portal after issuance before DGFT and ICEGATE will recognise it. That registration step is the part people most often miss.",
      },
      {
        q: "Can I use my existing Class 3 certificate for DGFT instead of getting a new one?",
        a: "You can register an existing valid Class 3 certificate against your IEC rather than necessarily buying a new one — ask us to check whether your current certificate qualifies before purchasing again.",
      },
      {
        q: "What happens if I import or export without registering my DSC on DGFT?",
        a: "Your DGFT and ICEGATE filings will not process correctly, since the portal checks for a certificate registered against your specific IEC. It is not enough to hold a valid certificate — it has to be linked.",
      },
    ],
  },

  {
    slug: "buy-tokens",
    label: "Buy DSC Tokens",
    h1: "Buy DSC USB Tokens",
    meta: {
      title: "Buy DSC USB Tokens in Salem | ThinkOrange Consulting",
      description:
        "FIPS-compliant HYP2003 USB tokens in stock, for new certificates or token replacement. Bulk pricing for professionals and partners. Salem, Tamil Nadu.",
      keywords: [
        "buy dsc token salem",
        "hyp2003 token price",
        "usb crypto token dsc",
        "dsc token replacement",
      ],
    },
    lede:
      "FIPS-compliant HYP2003 tokens in stock, for a new certificate or a straight token replacement. Bulk pricing available for professionals and partners.",
    usedFor: [
      "A new Class 3 or DGFT DSC being issued",
      "Replacing a lost, damaged or expired token while keeping your existing certificate where re-issuance permits it",
      "Stocking up as a channel partner or professional issuing certificates to your own clients",
    ],
    validityOptions: null,
    tokenNote:
      "HYP2003 tokens in stock, FIPS-compliant, compatible with Class 3 and DGFT certificate issuance. See the driver downloads for installation on your operating system once your token arrives.",
    documents: [
      "PAN of the purchaser, where the token is being linked to a new certificate",
      "No documents required for a token-only purchase without a certificate",
    ],
    verificationNote:
      "A blank token by itself does nothing — it needs a certificate loaded onto it, either a new one issued through us or a re-issuance onto a replacement token for an existing certificate.",
    process: [
      { step: 1, title: "Confirm what you need", desc: "Whether this is a new certificate with a token, or a standalone token purchase or replacement." },
      { step: 2, title: "Order and payment", desc: "Order confirmed on WhatsApp, with bulk pricing available for partners and professionals." },
      { step: 3, title: "Dispatch or collection", desc: "Token dispatched or available for collection in Salem." },
      { step: 4, title: "Driver installation", desc: "Driver installed and the token tested working before you rely on it." },
    ],
    fees: null,
    driverSlugs: ["hyp2003", "epass-2003", "watchdata-proxkey", "mtoken"],
    faqs: [
      {
        q: "Can I buy just the token without a certificate?",
        a: "Yes — for replacing a lost or damaged token, or for stocking up as a partner, a standalone token purchase is straightforward. A blank token on its own cannot sign anything until a certificate is loaded onto it.",
      },
      {
        q: "Do you offer bulk pricing?",
        a: "Yes, for chartered accountants, tax practitioners and channel partners ordering in volume. Message us on WhatsApp with your expected quantity for a bulk rate.",
      },
      {
        q: "Which token should I buy?",
        a: "HYP2003 tokens are what we stock directly and issue certificates onto as standard. If you need a different token brand for a specific reason, ask us — compatibility with your certificate and operating system matters more than the brand.",
      },
    ],
  },
];

export function getDscProduct(slug) {
  return dscProducts.find((p) => p.slug === slug);
}
