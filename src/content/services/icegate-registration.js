// Relative import with an explicit extension, not the "@/" alias — see
// gst-registration.js's header comment.
import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written against gst-registration.js as the exemplar. Registrations &
// Licences category, 17-08-2026 restructure — see MISSING-PAGES.md.
//
// ICEGATE is the step AFTER an IEC, not a substitute for one — the two leaves
// cross-link deliberately (`related`) rather than repeating each other's
// content.
// ============================================================================

export default {
  slug: "icegate-registration",
  category: "registrations-licences",
  title: "ICEGATE Registration",
  h1: "ICEGATE Registration & AD Code",

  meta: {
    title: "ICEGATE Registration & AD Code in Salem, Tamil Nadu | ThinkOrange Consulting",
    description:
      "Register on ICEGATE and link your bank's AD code so customs will clear your shipment — process, documents and DSC requirements explained.",
    keywords: [
      "icegate registration salem",
      "ad code registration bank",
      "icegate registration consultant",
      "ad code icegate customs clearance",
      "icegate dsc registration",
    ],
  },

  lede:
    "The customs-side registration that turns a valid IEC into a shipment customs will actually clear — including the AD code your bank issues and where people commonly get it wrong.",

  overview: [
    "ICEGATE is the Indian Customs EDI System — the portal the Central Board of Indirect Taxes and Customs (CBIC) uses to receive shipping bills, bills of entry and every other electronic customs filing. Holding an IEC gets you the right to trade; registering on ICEGATE is what lets you actually file the documents customs needs to release your cargo. You can't skip straight to shipping — without this registration, a shipping bill simply cannot be filed against your IEC.",

    `Alongside ICEGATE registration itself, you need to register an AD (Authorised Dealer) Code — a ${s("icegateAdCodeLength")} number your bank issues once you hold a current account with them, confirming they'll handle the foreign exchange side of your trade. ${s("icegateAdCodeScope")}.`,

    "The two most common ways this goes wrong: registering with the wrong role on ICEGATE for what you actually do (importer, exporter, or customs broker are different roles with different document requirements), and assuming the AD code covers everything a port needs — it doesn't. Duty refunds and IGST credits are still routed by your bank branch's own IFSC code, which has to be registered separately at each port you actually export from.",
  ],

  whoNeedsThis: [
    "You've just received your IEC and need to file your first shipping bill or bill of entry.",
    "Your bank has issued an AD code letter and it now needs to be registered on ICEGATE against your IEC.",
    "You're switching your current account to a new bank and need the AD code re-linked before your next shipment.",
    "You're a customs house agent or freight forwarder setting up ICEGATE access for client filings.",
    "Customs or your CHA has told you a shipping bill can't be filed because your ICEGATE or AD code registration is missing or incomplete.",
  ],

  included: [
    {
      title: "Role and eligibility check",
      desc: "We confirm the correct ICEGATE role for what you actually do — importer, exporter or customs broker — before anything is filed.",
    },
    {
      title: "Document preparation and verification",
      desc: "We assemble the IEC, GSTIN, PAN and authorisation documents ICEGATE asks for, checked against the portal's current format before submission.",
    },
    {
      title: "Digital Signature Certificate coordination",
      desc: "We arrange the Class 3 DSC your registration needs, mapped correctly to your ICEGATE account rather than left to fail at the signing step.",
    },
    {
      title: "AD code coordination with your bank",
      desc: "We liaise with your bank for the AD code letter and register it on ICEGATE, so this doesn't sit as an open item between two counters.",
    },
    {
      title: "Registration filing and follow-up",
      desc: "We file the role registration form and follow up until customs validation is complete, rather than waiting for the portal to update on its own.",
    },
    {
      title: "Port-wise IFSC registration guidance",
      desc: "We tell you exactly which additional, port-specific registration you still need for duty refunds — the step most businesses miss.",
    },
  ],

  documents: [
    {
      group: "ICEGATE registration",
      items: [
        "Import Export Code (IEC), already issued by DGFT",
        "GSTIN, where the business is GST-registered",
        "PAN of the business or proprietor",
        "Address proof of the applicant — Aadhaar, voter ID, driving licence or passport",
        "Authorisation letter naming the person who will operate the ICEGATE account",
        "Class 3 Digital Signature Certificate of the authorised signatory",
      ],
    },
    {
      group: "AD Code registration",
      items: [
        "AD Code letter issued by your bank on its own letterhead, addressed to Customs",
        "Bank certificate or the AD code letter confirming your current account number and IFSC",
        "IEC and GSTIN of the business",
        "Board resolution or authorisation letter, for a company or LLP",
      ],
    },
  ],

  documentsNote:
    "The AD code letter has to come from the bank branch where you hold the current account used for trade — a letter from any other branch or a different account is routinely rejected at the registration stage.",

  process: [
    {
      step: 1,
      title: "Role and document check",
      desc: "We confirm your ICEGATE role and the exact documents your entity type needs, including whether your DSC is already mapped for customs use.",
      duration: t("icegateDocPrepTurnaround"),
    },
    {
      step: 2,
      title: "AD code obtained from your bank",
      desc: `We coordinate directly with your bank for the AD code letter — a ${s("icegateAdCodeLength")} number confirming they'll handle your trade's foreign exchange.`,
      duration: t("icegateBankCoordinationTurnaround"),
    },
    {
      step: 3,
      title: "ICEGATE registration filed",
      desc: "The role registration form is submitted with your IEC, GSTIN and documents, digitally signed with your Class 3 DSC.",
      duration: t("icegateDocPrepTurnaround"),
    },
    {
      step: 4,
      title: "Customs validation and AD code linking",
      desc: `Customs validates the registration and the AD code is linked to your IEC. ${s("icegateAdCodeScope")}`,
      duration: s("icegateProcessingTime"),
    },
  ],

  timeline: [
    { stage: "Document and DSC check", days: t("icegateDocPrepTurnaround") },
    { stage: "AD code letter from your bank", days: t("icegateBankCoordinationTurnaround") },
    { stage: "ICEGATE registration filed", days: t("icegateDocPrepTurnaround") },
    { stage: "Customs validation", days: s("icegateProcessingTime") },
  ],

  // NEVER a number. Renders "On request" — that is correct, not a gap.
  fees: null,

  faqs: [
    {
      q: "Is ICEGATE registration different from getting an IEC?",
      a: "Yes, and you need both. The IEC is DGFT's registration confirming you can trade; ICEGATE is CBIC's customs portal, and registering on it is what lets you actually file a shipping bill or bill of entry against that IEC. One doesn't substitute for the other.",
    },
    {
      q: "What is an AD code and why does customs ask for it?",
      a: `An AD (Authorised Dealer) Code is a ${s("icegateAdCodeLength")} number your bank issues, confirming it's authorised to handle the foreign exchange for your import or export. Customs links it to your IEC so export incentives and duty refunds are credited to the right account, and won't process a shipping bill without it.`,
    },
    {
      q: "Do I need to register my AD code separately at every port?",
      a: `No — ${s("icegateAdCodeScope")} What still has to be done port-by-port is registering your bank branch's IFSC code, specifically for receiving duty refunds and IGST credits at each port you export from. That distinction trips up more businesses than the AD code itself.`,
    },
    {
      q: "Is there a government fee for ICEGATE or AD code registration?",
      a: `${s("icegateGovtFee")}. Your bank may charge its own processing fee for issuing the AD code letter, and a Class 3 DSC has its own issuance cost — neither of those is a government charge, but budget for both.`,
    },
    {
      q: "Do I need a Digital Signature Certificate for ICEGATE?",
      a: "Yes — ICEGATE registration and most of the filings that follow it (shipping bills, bills of entry) require a Class 3 DSC mapped to your account. We issue Class 3 certificates ourselves, so this doesn't become a separate errand before you can even register.",
    },
    {
      q: "How long does the whole process take?",
      a: `Once your AD code letter is in hand and your documents are ready, customs typically validates the ICEGATE registration in ${s("icegateProcessingTime")}. The AD code letter itself usually takes the longest, since it depends on your bank's own internal process, not on us or on customs.`,
    },
    {
      q: "We changed our bank account — does the AD code need updating?",
      a: "Yes. An AD code is tied to a specific bank account, so switching accounts or banks means getting a fresh AD code letter and re-registering it on ICEGATE against your IEC before your next shipment — the old registration doesn't carry over automatically.",
    },
  ],

  related: ["iec-registration", "dgft-iec", "gst-lut-export-refunds"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "icegateAdCodeLength",
      "icegateAdCodeScope",
      "icegateGovtFee",
      "icegateProcessingTime",
    ],
    notes:
      "The pan-India AD code registration rule (one registration valid at every port under the same IEC) reflects a recent ICEGATE 2.0 procedural change — confirm it is still current, and confirm the port-wise IFSC registration requirement for duty refunds against the live portal before publishing, since customs procedural circulars change without much notice.",
  },
};
