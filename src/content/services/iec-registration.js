// Relative import with an explicit extension, not the "@/" alias, on purpose —
// see gst-registration.js's header comment for why (Node ESM, outside Vite,
// reads this directory directly for review/prerender scripts).
import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written against gst-registration.js as the exemplar (voice, field shape,
// statutory-fact discipline). Part of the Registrations & Licences category
// added in the 17-08-2026 nav.js restructure — see MISSING-PAGES.md.
//
// Cross-links: `dgft-iec` (a DSC product) exists specifically because most
// DGFT/ICEGATE filings for a company or LLP need a Class 3 DSC issued for
// that purpose — mentioned in prose and in `related`, not invented here.
// ============================================================================

export default {
  slug: "iec-registration",
  category: "registrations-licences",
  title: "IEC Registration",
  h1: "Import Export Code (IEC) Registration",

  meta: {
    title: "Import Export Code (IEC) Registration in Salem, Tamil Nadu | ThinkOrange Consulting",
    description:
      "Apply for your Import Export Code with DGFT — documents, fee and the mandatory annual update explained plainly. Handled end to end from Salem.",
    keywords: [
      "iec registration salem",
      "import export code registration india",
      "iec code apply online",
      "dgft iec registration consultant",
      "iec annual update deadline",
    ],
  },

  lede:
    "The DGFT registration every importer and exporter needs before the first shipment moves — plus the annual update that keeps it active, which most businesses forget until it's overdue.",

  overview: [
    `An Import Export Code (IEC) is the registration the Directorate General of Foreign Trade (DGFT) issues before a business can import or export goods or services commercially. DGFT allows ${s("iecOnePerPan")}, and the number itself is your business's PAN — a separate numbering series stopped once every trade registration was linked to PAN. You apply on the DGFT portal using ${s("iecFormApplication")}, and the government fee is ${s("iecGovtFee")}.`,

    `Most commercial importers and exporters need one; a few categories don't, including ${s("iecExemptCategories")}. If you're outside those categories and you plan to import or export for trade, an IEC is the entry ticket — customs will not clear a commercial shipment without one, and a bank will not process an inward or outward foreign remittance tied to trade without it either.`,

    `An IEC is ${s("iecValidity")} — you never file a renewal application. But it is not "set and forget": every IEC holder must complete an online update between ${s("iecAnnualUpdateWindow")} each year, even if nothing about the business has changed. Miss the window and DGFT deactivates the code, no notice given — which is the single most common way a business discovers its IEC has stopped working, usually at the worst possible moment, mid-shipment.`,
  ],

  whoNeedsThis: [
    "You're about to import goods or raw materials into India for your business, for the first time.",
    "You've won an export order and need to ship against it — customs will not clear the shipment without an IEC.",
    "You're setting up a new company, LLP or proprietorship that will trade internationally and want the IEC ready before the first order.",
    "Your existing IEC has been deactivated because the annual update window was missed, and you need it reactivated.",
    "You import or export services and need the IEC to receive or make the related foreign currency payment through your bank.",
  ],

  included: [
    {
      title: "Eligibility and PAN check",
      desc: "We confirm your entity qualifies and that no IEC already exists against your PAN — DGFT will not issue a second one.",
    },
    {
      title: "Document preparation and verification",
      desc: "We assemble the full set for your entity type and check each one against the DGFT portal's format requirements before filing.",
    },
    {
      title: `Application filing (${s("iecFormApplication")})`,
      desc: "Your business, bank and signatory details are filed correctly the first time, with the government fee paid on submission.",
    },
    {
      title: "Digital signature or Aadhaar authentication support",
      desc: "We arrange whichever signing method your entity type needs, so the application isn't held up waiting on this alone.",
    },
    {
      title: "IEC certificate handover",
      desc: "Your e-IEC, explained — what it says, and what to hand your bank and freight forwarder so they can act on it immediately.",
    },
    {
      title: "Annual update reminder and filing",
      desc: "We flag the update window before it opens and file it on your behalf, so a forgotten update never deactivates your code.",
    },
  ],

  documents: [
    {
      group: "Every applicant",
      items: [
        "PAN of the business or the proprietor",
        "Proof of the business's principal place of business — electricity bill, property tax receipt or rent agreement",
        "Cancelled cheque or bank certificate showing account name, number and IFSC, for the current account used for trade",
        "Aadhaar or another valid photo ID of the proprietor, partner, director or authorised signatory",
        "Active mobile number and email address for the authorised signatory (OTP is sent to both)",
        "Digital photograph of the applicant or authorised signatory",
      ],
    },
    {
      group: "Proprietorship",
      items: [
        "PAN and Aadhaar of the proprietor",
        "A personal current account is acceptable where the name matches the PAN",
      ],
    },
    {
      group: "Partnership firm",
      items: [
        "PAN of the firm",
        "Partnership deed",
        "Authorisation naming the partner who will sign the application",
      ],
    },
    {
      group: "LLP and Private Limited Company",
      items: [
        "PAN of the entity",
        "Certificate of Incorporation",
        "Board resolution or equivalent authorising the signatory",
        "Class 3 Digital Signature Certificate of the authorised signatory, where Aadhaar-based signing is not used",
      ],
    },
  ],

  documentsNote:
    "An IEC on its own does not clear a shipment through customs — you'll also need to register on ICEGATE and link an AD code from your bank, which is a separate step we cover under ICEGATE Registration.",

  process: [
    {
      step: 1,
      title: "Eligibility and document check",
      desc: "We confirm your entity type, the right signing method, and list exactly what you need to send.",
      duration: t("iecDocPrepTurnaround"),
    },
    {
      step: 2,
      title: "Application filed",
      desc: `${s("iecFormApplication")} is filed on the DGFT portal with your business, bank and signatory details, and the government fee of ${s("iecGovtFee")} is paid on submission.`,
      duration: t("iecFilingTurnaround"),
    },
    {
      step: 3,
      title: "DGFT processing",
      desc: "The application is processed and the e-IEC generated once the details are validated against your PAN and bank record.",
      duration: s("iecProcessingTime"),
    },
    {
      step: 4,
      title: "Certificate handover",
      desc: "We hand over your e-IEC along with what your bank and freight forwarder will need from it.",
      duration: "On approval",
    },
    {
      step: 5,
      title: "Annual update, every year",
      desc: `Filed between ${s("iecAnnualUpdateWindow")}, whether or not anything about the business has changed.`,
      duration: t("iecAnnualUpdateService"),
    },
  ],

  timeline: [
    { stage: "Document collection and review", days: t("iecDocPrepTurnaround") },
    { stage: "Application filing", days: t("iecFilingTurnaround") },
    { stage: "DGFT processing and e-IEC issued", days: s("iecProcessingTime") },
    { stage: "Mandatory annual update (recurring)", days: s("iecAnnualUpdateWindow") },
  ],

  // NEVER a number. Renders "On request" — that is correct, not a gap.
  fees: null,

  faqs: [
    {
      q: "How long does IEC registration take?",
      a: `Once your documents are ready and correctly signed, DGFT typically processes a fresh application in ${s("iecProcessingTime")}. Most delays come from a mismatch between the application and your PAN or bank record, not from the DGFT queue itself — which is exactly what we check before filing.`,
    },
    {
      q: "Does my IEC expire, and do I need to renew it?",
      a: `No — an IEC is ${s("iecValidity")}. There is no renewal application, ever. What you do have to do is complete a separate annual update between ${s("iecAnnualUpdateWindow")}, confirming your details are still correct. It's a different obligation from renewal, and skipping it has real consequences.`,
    },
    {
      q: "What happens if I miss the annual update window?",
      a: `Your IEC is ${s("iecDeactivationConsequence")}. You find out the hard way, usually when a shipment or a bank remittance stalls. Reactivation is automatic and free the moment the overdue update is filed — but that can still cost you days on a live shipment, which is why we file it proactively for clients.`,
    },
    {
      q: "Can one business or PAN hold more than one IEC?",
      a: `No. DGFT permits ${s("iecOnePerPan")}. If your business already has one — even from years ago, unused — you cannot apply for a fresh one; you update the existing code instead. We check this before filing to avoid a rejected duplicate application.`,
    },
    {
      q: "Is an IEC compulsory for every import or export?",
      a: `For commercial trade, yes, with narrow exceptions — ${s("iecExemptCategories")}. If you're importing a personal item once, you're outside the IEC requirement; if you're a business bringing in stock to sell, you're not.`,
    },
    {
      q: "What's the government fee for IEC registration?",
      a: `${s("iecGovtFee")}, paid online on the DGFT portal at the time of filing ${s("iecFormApplication")}. There's no separate fee for the certificate itself once issued — only the annual update, which DGFT does not charge for at all.`,
    },
    {
      q: "What do I need to do after I receive my IEC?",
      a: "An IEC alone doesn't clear customs. You'll still need to register on ICEGATE, India's customs portal, and register an AD code from your bank against your IEC before your first shipment can move — a separate, short process we handle under ICEGATE Registration.",
    },
  ],

  related: ["icegate-registration", "dgft-iec", "gst-lut-export-refunds"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "iecOnePerPan",
      "iecFormApplication",
      "iecGovtFee",
      "iecExemptCategories",
      "iecValidity",
      "iecAnnualUpdateWindow",
      "iecDeactivationConsequence",
      "iecProcessingTime",
    ],
    notes:
      "Document list for companies/LLPs (DSC vs Aadhaar signing) is practice-based and should be checked against the current DGFT portal flow, which has changed its signing options more than once. The IEC exemption list (Para 2.07, Handbook of Procedures) should be checked against the current HBP edition before publishing.",
  },
};
