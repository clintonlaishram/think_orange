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
    slug: "combo-dsc",
    label: "Combo DSC (Sign + Encrypt)",
    h1: "Combo Digital Signature Certificate — Sign + Encrypt",
    meta: {
      title: "Combo DSC (Sign + Encrypt) in Salem | ThinkOrange Consulting",
      description:
        "Signing and encryption certificates issued together on one token, for e-tendering portals that require both. eMudhra and SignX partner, Salem, Tamil Nadu.",
      keywords: [
        "combo dsc sign encrypt salem",
        "dual certificate dsc e-tendering",
        "encryption certificate digital signature",
        "dsc for e-tendering portal",
      ],
    },
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
    process: [
      { step: 1, title: "Confirm the tender needs both certificates", desc: "We check the specific portal's technical requirements so you're not buying a combo you don't need, or a signing-only certificate that gets rejected." },
      { step: 2, title: "Application and documents", desc: "Organisation and signatory documents submitted together." },
      { step: 3, title: "Video verification", desc: "The named signatory completes video verification, same as any Class 3 issuance." },
      { step: 4, title: "Certificates and token handover", desc: "Both certificates issued onto one token, delivered and tested working before you rely on it for a submission." },
    ],
    fees: null,
    driverSlugs: ["hyp2003", "epass-2003", "watchdata-proxkey", "mtoken"],
    faqs: [
      {
        q: "What's the difference between this and a regular Class 3 certificate?",
        a: "A standard Class 3 certificate — individual or organisation — gives you a signing certificate only. A combo adds a second, separate encryption certificate on the same token, needed specifically where a portal's technical requirements call for one, most often on e-tendering platforms.",
      },
      {
        q: "How do I know if my tender actually needs a combo certificate?",
        a: "Check the specific tender or portal's document requirements before you buy — not every e-tendering platform asks for encryption, but many still do, and a signing-only certificate will be rejected at submission if the portal expects both. We can check this against your specific tender before you order.",
      },
      {
        q: "Can individuals buy a combo certificate, or is it only for organisations?",
        a: "Individual bidders who face the same dual-certificate requirement can also get a combo — it isn't restricted to companies. Most demand for it comes from organisations bidding on tenders, but the certificate itself works the same way either way.",
      },
      {
        q: "Do I need to buy a separate token for the encryption certificate?",
        a: "No — both certificates are issued onto the same FIPS-compliant USB token you already carry for signing, not a second piece of hardware.",
      },
    ],
  },

  {
    slug: "dsc-renewal-reissue",
    label: "Renewal & Re-issue",
    h1: "DSC Renewal & Re-issue",
    meta: {
      title: "DSC Renewal & Re-issue in Salem | ThinkOrange Consulting",
      description:
        "Renew a Class 3 certificate before it expires, or re-issue one after loss, damage or expiry — sorted before a filing deadline catches you without a working signature.",
      keywords: [
        "dsc renewal salem",
        "digital signature certificate reissue",
        "renew class 3 dsc",
        "lost dsc token replacement",
      ],
    },
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
    process: [
      { step: 1, title: "Confirm what you're dealing with", desc: "Renewal before expiry and replacement after loss, damage or expiry follow different paths — we confirm which applies before starting." },
      { step: 2, title: "Documents, and revocation if needed", desc: "Renewal documents gathered, or a lost/damaged token revoked immediately to prevent misuse." },
      { step: 3, title: "Video verification", desc: "Completed again regardless of route — every issuance needs it, renewal included." },
      { step: 4, title: "Certificate and token", desc: "Issued onto your existing token where reuse is allowed, or a fresh token where it isn't." },
    ],
    fees: null,
    driverSlugs: ["hyp2003", "epass-2003", "watchdata-proxkey", "mtoken"],
    faqs: [
      {
        q: "Can I actually \"renew\" a DSC, or is it always a new certificate?",
        a: "It's always a fresh certificate — Indian certifying authorities don't extend an existing one's expiry. \"Renewal\" describes doing this before your current certificate lapses, which usually lets you reuse a working token and moves faster since less has changed since your last verification.",
      },
      {
        q: "How early should I start the renewal process?",
        a: "Well before expiry, rather than close to it — a certificate simply stops signing the moment it lapses, with no grace period, and once that happens you're back to a full fresh application regardless of how close you were to renewing in time.",
      },
      {
        q: "My token is lost — is my old certificate still usable by whoever finds it?",
        a: "Only until it's revoked, which is why we treat this as urgent rather than something to batch with other paperwork. Revoking adds your certificate to the Certificate Revocation List immediately, after which it can no longer be used to sign anything, even by someone holding the physical token.",
      },
      {
        q: "Does renewing reset my validity period, or extend what was left of the old one?",
        a: "It resets. You choose a fresh 1, 2 or 3-year term starting from the new issuance date — it doesn't add on to whatever time was left on the certificate being replaced.",
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
  {
    slug: "aadhaar-esign",
    label: "Aadhaar eSign",
    h1: "Aadhaar eSign — Sign Documents Online with Aadhaar",
    meta: {
      title: "Aadhaar eSign in Salem | ThinkOrange Consulting",
      description:
        "Sign contracts and agreements online using Aadhaar OTP or biometric authentication — no USB token, no software. Not a substitute for statutory portal DSC filings.",
      keywords: [
        "aadhaar esign salem",
        "aadhaar based electronic signature",
        "esign document online india",
        "esign vs digital signature certificate",
      ],
    },
    lede:
      "Sign contracts and agreements online in minutes using your Aadhaar and a mobile OTP — no USB token, no software to install, and no certificate to keep track of afterward.",
    usedFor: [
      "Employment offer letters, appointment letters and HR onboarding paperwork",
      "Vendor, NDA and client agreements where the other party accepts an Aadhaar-based signature",
      "Loan and lending agreements where the lender's own platform accepts Aadhaar eSign",
      "Any document both parties agree can be signed this way, rather than with a certificate on a token",
    ],
    validityOptions: null,
    documents: [
      "Aadhaar number, linked to an active mobile number for OTP authentication at the moment of signing",
      "The specific document you need signed, finalised — eSign authenticates a signature on that exact document, not a certificate you hold in advance for future use",
      "Email address, for the signed document and its audit trail to be delivered to",
    ],
    verificationNote:
      "Aadhaar eSign does not replace a Class 3 DSC for statutory portal filings. The income tax e-filing portal, the GST portal, MCA21/ROC filings and e-tendering/GeM all specifically require a Class 3 certificate on a token, and will not accept an Aadhaar eSign in its place. This is for contracts and agreements where the other party accepts it, not for government filings.",
    process: [
      { step: 1, title: "Confirm eSign fits your document", desc: "Not every use case accepts it — we check that before setting anything up, since statutory portal filings need a Class 3 DSC instead." },
      { step: 2, title: "Aadhaar-linked mobile confirmed", desc: "The number your OTP will be sent to, through our eMudhra/SignX partner's eSign service." },
      { step: 3, title: "Document routed for signing", desc: "The signer receives a secure link, authenticates with Aadhaar OTP (or biometric where offered), and signs." },
      { step: 4, title: "Signed document and audit trail", desc: "Delivered with a tamper-evident signature embedded — evidence of who signed and when, tied to that document." },
    ],
    fees: null,
    driverSlugs: [],
    faqs: [
      {
        q: "Is an Aadhaar eSign legally valid?",
        a: "Yes. Section 3A of the Information Technology Act 2000 recognises an electronic signature made using an authentication technique notified in the Act's Second Schedule, and Aadhaar eSign is one of those — it carries the same legal standing as a Class 3 digital signature for the documents it's used on.",
      },
      {
        q: "Can I use this instead of a Class 3 DSC for GST or income tax filing?",
        a: "No. Statutory portals — income tax e-filing, the GST portal, MCA21/ROC and e-tendering/GeM — specifically require a Class 3 certificate on a token and don't accept Aadhaar eSign as an alternative. Use eSign for contracts and agreements instead.",
      },
      {
        q: "Do I need a USB token for this?",
        a: "No — that's the main difference from every other certificate we issue. Verification happens by Aadhaar OTP or biometric at the moment you sign, rather than through hardware you keep and maintain.",
      },
      {
        q: "How long is the signature valid for?",
        a: "It doesn't expire the way a DSC does. The signature and its audit trail are permanently tied to that one signed document, rather than sitting on a certificate you hold for future use — there's no renewal to think about afterward.",
      },
      {
        q: "What if my Aadhaar-linked mobile number has changed?",
        a: "The OTP goes to whichever number is currently linked to your Aadhaar in UIDAI's own records. If that's changed or you no longer have access to it, update it with UIDAI first — eSign can't authenticate to a number Aadhaar itself doesn't recognise.",
      },
    ],
  },
];

export function getDscProduct(slug) {
  return dscProducts.find((p) => p.slug === slug);
}
