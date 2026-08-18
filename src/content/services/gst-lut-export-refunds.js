import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// SCOPE NOTE: this page is the LUT/RFD-11 mechanics page, deliberately
// distinct from gst-itc-refunds.js. That file covers the general ITC refund
// process (export refund, inverted duty, excess cash ledger) and already owns
// itcRefundFormApplication/itcRefundTimeLimit/itcRefundAcknowledgement/
// itcRefundProvisional — reused here via s() wherever the refund route is
// mentioned, rather than re-derived. This page's own job is: LUT eligibility,
// annual renewal, Form GST RFD-11 filing mechanics, and the consequence
// timeline if a LUT-backed export/realisation deadline is missed (Rule 96A).
//
// STATUTORY CARE: Rule 96A(1)(b) sets the services realisation window at
// "1 year" from invoice date — this is the CGST Rules' own figure, separate
// from RBI/FEMA's general export-realisation window, which research found was
// extended from 9 to 15 months in late 2025. Whether Rule 96A(1)(b) has been
// amended to track that FEMA change, or still independently reads "1 year",
// needs CA confirmation before publishing — flagged in review.notes below.

export default {
  slug: "gst-lut-export-refunds",
  category: "gst",
  title: "LUT & Export Refunds",
  h1: "LUT for GST-Free Exports in Salem, Tamil Nadu",

  meta: {
    title: "LUT (Form RFD-11) Filing for Exporters in Salem | ThinkOrange",
    description:
      "File your Letter of Undertaking under Form GST RFD-11 so you can export goods and services without paying IGST upfront. Filed online from Salem, Tamil Nadu.",
    keywords: [
      "lut gst filing salem",
      "form rfd-11 filing",
      "export without payment of igst",
      "letter of undertaking gst",
      "gst lut for exporters tamil nadu",
    ],
  },

  lede:
    "A Letter of Undertaking lets you export goods and services, or supply to an SEZ, without paying IGST upfront — filed once a year, and tracked so the export window never lapses unnoticed.",

  overview: [
    `When you export, that supply is zero-rated — but by default you still pay Integrated GST (IGST) on it and claim the money back afterwards as a refund. A Letter of Undertaking (LUT) is the alternative: a declaration filed on ${s("lutFormNumber")} that lets you export without paying IGST in the first place, so cash is never tied up waiting on a refund. If you have already paid IGST on past exports instead, that is a separate process — see gst-itc-refunds — and the two are not mutually exclusive across your export history.`,

    `An LUT is filed entirely online and is valid for ${s("lutValidityPeriod")}. There is no automatic carry-forward: you file a fresh one before the new financial year starts, or you lose the no-payment facility from 1 April. Filing generates an Application Reference Number (ARN) immediately, and the application is deemed accepted if the jurisdictional officer takes no action within ${s("lutOfficerResponseWindow")} — no physical visit, and no separate CA or departmental attestation is required for acceptance.`,

    `Not every exporter qualifies. If you have been prosecuted for tax evasion of ${s("lutEligibilityThreshold")} or more under the CGST Act, the IGST Act or an earlier law, you cannot file an LUT and must furnish a bond instead, usually backed by a bank guarantee of ${s("lutBankGuaranteeCap")}. And an LUT is not unconditional once accepted: goods must actually leave India within ${s("lutGoodsExportWindow")} of the invoice, and payment for services must be realised within ${s("lutServicesRealisationWindow")} — miss either and IGST plus interest falls due.`,
  ],

  whoNeedsThis: [
    "You export goods or services, or supply to an SEZ unit or developer, and want to avoid paying IGST upfront and waiting on a refund.",
    "Your current LUT is from an earlier financial year and needs refiling before it lapses at the end of the financial year.",
    "You are a new exporter and are not sure whether you qualify for LUT or must furnish a bond with a bank guarantee instead.",
    "You have exported under LUT but the goods have not physically left India, or service payment has not been realised, within the required window.",
    "You have been exporting on payment of IGST and want to compare that route against filing an LUT going forward.",
  ],

  included: [
    {
      title: "Eligibility check — LUT or bond",
      desc: "We confirm whether you qualify for LUT or fall under the tax-evasion bar that requires a bond and bank guarantee instead.",
    },
    {
      title: `LUT drafting and filing (${s("lutFormNumber")})`,
      desc: "The declaration prepared and filed online with your GSTIN, witness details and authorised-signatory authentication, correctly the first time.",
    },
    {
      title: "ARN tracking and deemed-approval monitoring",
      desc: `We track your application through to acceptance rather than assuming it went through, including the ${s("lutOfficerResponseWindow")} deemed-approval window.`,
    },
    {
      title: "Annual renewal before each financial year",
      desc: "A reminder and refiling cycle so the facility is never allowed to lapse silently at the start of a new financial year.",
    },
    {
      title: "Export and realisation window tracking",
      desc: `We monitor invoice dates against the ${s("lutGoodsExportWindow")} goods / ${s("lutServicesRealisationWindow")} services deadlines, so a lapse is caught before it becomes a liability.`,
    },
    {
      title: "IGST-plus-interest computation, if a window is missed",
      desc: "If export or realisation genuinely did not happen in time, we compute what is due and file the payment inside the window that follows.",
    },
    {
      title: "LUT restoration after a lapse",
      desc: "Once the overdue tax and interest is paid, we confirm the facility is restored rather than leaving you exporting on payment of IGST indefinitely.",
    },
    {
      title: "Coordination with your refund claim, where relevant",
      desc: "If IGST was already paid on some exports instead of using LUT, we hand that claim across to the ITC refund process rather than starting it blind.",
    },
  ],

  documents: [
    {
      group: "Every LUT applicant",
      items: [
        "GSTIN and PAN of the business",
        "Import Export Code (IEC), where you hold one",
        "Name, occupation and address of two independent witnesses",
        "Authorised signatory's Digital Signature Certificate (mandatory for companies and LLPs) or Aadhaar-linked mobile/email for EVC authentication for other entity types",
        "Previous financial year's LUT acknowledgement (ARN), if this is a renewal",
      ],
    },
    {
      group: "If you are ineligible for LUT and must furnish a bond instead",
      items: [
        "Bond executed on non-judicial stamp paper for the estimated tax liability on likely exports",
        `Bank guarantee, normally up to ${s("lutBankGuaranteeCap")} unless the jurisdictional Commissioner agrees to waive or reduce it based on your track record`,
        "Supporting documentation for a bank guarantee waiver request, if you are asking for one",
      ],
    },
    {
      group: "Keep ready for each export, whichever route you use",
      items: [
        "Shipping bills or bill of export, for goods exports",
        "SEZ endorsement, for supply to an SEZ unit or developer",
        "Foreign Inward Remittance Certificate (FIRC) or bank realisation certificate once payment is received",
      ],
    },
  ],

  documentsNote:
    "The witnesses named on your LUT are the same two named on a running bond and bank guarantee, so keep their details consistent year to year rather than substituting names casually at renewal.",

  process: [
    {
      step: 1,
      title: "Eligibility check and document collection",
      desc: "We confirm whether LUT is open to you or whether the tax-evasion bar applies, and assemble what the filing needs.",
      duration: t("lutFilingPrep"),
    },
    {
      step: 2,
      title: `${s("lutFormNumber")} filed online`,
      desc: "The declaration is submitted with witness details and authenticated by DSC or EVC. An ARN is generated immediately on submission.",
      duration: "On submission",
    },
    {
      step: 3,
      title: "Deemed approval",
      desc: `If the jurisdictional officer takes no action within ${s("lutOfficerResponseWindow")}, the LUT is deemed accepted — no separate approval notice is issued.`,
      duration: s("lutOfficerResponseWindow"),
    },
    {
      step: 4,
      title: "Export and realisation tracked through the year",
      desc: `Invoice dates are monitored against the ${s("lutGoodsExportWindow")} (goods) / ${s("lutServicesRealisationWindow")} (services) windows so a lapse is caught early, not at year-end.`,
      duration: "Ongoing through the financial year",
    },
    {
      step: 5,
      title: "Renewal ahead of the next financial year",
      desc: "A fresh LUT is prepared and filed before the financial year closes, so the no-payment facility carries into the new year without a gap.",
      duration: t("lutAnnualRenewalPrep"),
    },
  ],

  timeline: [
    { stage: "LUT validity, once accepted", days: s("lutValidityPeriod") },
    { stage: "Officer review window before deemed approval", days: s("lutOfficerResponseWindow") },
    { stage: "Window to actually export goods under LUT", days: s("lutGoodsExportWindow") },
    { stage: "Window to realise payment for services under LUT", days: s("lutServicesRealisationWindow") },
    { stage: "Window to pay IGST plus interest after a missed deadline", days: s("lutPaymentWindow") },
  ],

  fees: null,

  faqs: [
    {
      q: "What is an LUT and why not just pay IGST and claim it back?",
      a: `An LUT (${s("lutFormNumber")}) is a declaration that lets you export without paying IGST at all, instead of paying it and reclaiming it through the refund process on gst-itc-refunds. It keeps cash free rather than sitting with the department pending a refund, which is why most regular exporters file one rather than exporting on payment.`,
    },
    {
      q: "How long is an LUT valid, and do I need to refile it?",
      a: `${s("lutValidityPeriod")}. There is no carry-forward — you must file a fresh LUT before the new financial year begins, or you lose the no-payment facility from the start of the new financial year until a new one is accepted. We treat this as an annual renewal, not a one-time filing.`,
    },
    {
      q: "Who is not eligible to file an LUT?",
      a: `You cannot file an LUT if you have been prosecuted for tax evasion of ${s("lutEligibilityThreshold")} or more under the CGST Act, the IGST Act or an earlier law. You must furnish a bond instead, generally backed by a bank guarantee of ${s("lutBankGuaranteeCap")}, though the jurisdictional Commissioner can waive or reduce that based on your track record.`,
    },
    {
      q: "What happens if I don't export within the required time after invoicing under LUT?",
      a: `For goods, you have ${s("lutGoodsExportWindow")} from the invoice date; for services, payment must be realised within ${s("lutServicesRealisationWindow")}. Miss either and you must pay the IGST due plus interest within ${s("lutPaymentWindow")} of the deadline expiring. Fail to pay and the LUT facility is deemed withdrawn until you do — it is restored once the amount is settled.`,
    },
    {
      q: "Do I need to visit the GST office or get an attestation to file an LUT?",
      a: `No. Filing is fully online through Form GST RFD-11, authenticated by DSC or EVC, with an ARN generated immediately on submission. There is no physical document submission and no separate departmental sign-off required — the application is deemed accepted if the officer takes no action within ${s("lutOfficerResponseWindow")}.`,
    },
    {
      q: "Does an LUT cover supplies to an SEZ unit or developer?",
      a: "Yes. Supply to a Special Economic Zone (SEZ) unit or developer is treated as a zero-rated supply in the same way as a physical export, so the same LUT covers both — you do not need a separate declaration for SEZ supplies.",
    },
    {
      q: "I already paid IGST on some exports instead of filing an LUT. Can I still get that back?",
      a: "Yes — that is a refund claim, not an LUT matter, and it runs on its own two-year time limit from the relevant date. See gst-itc-refunds for that process; filing an LUT going forward and claiming a refund on past IGST-paid exports are not mutually exclusive.",
    },
    {
      q: "What details does the RFD-11 form itself ask for?",
      a: "Your GSTIN and PAN, and the name, occupation and address of two independent witnesses — the same two named on a running bond and bank guarantee if you ever move to that route. Companies and LLPs authenticate with a Digital Signature Certificate; other entity types can use EVC.",
    },
  ],

  related: ["gst-itc-refunds", "gst-registration", "business-loan"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "lutFormNumber",
      "lutValidityPeriod",
      "lutEligibilityThreshold",
      "lutBankGuaranteeCap",
      "lutGoodsExportWindow",
      "lutServicesRealisationWindow",
      "lutPaymentWindow",
      "lutOfficerResponseWindow",
    ],
    notes:
      "CONFIRM SPECIFICALLY: (1) whether Rule 96A(1)(b)'s services realisation window is still a flat 1 year, or has been amended to track RBI/FEMA's late-2025 extension of the general export-realisation period from 9 to 15 months — the two are legally distinct (CGST Rules vs FEMA regulations) and research found no direct evidence Rule 96A itself was amended, but this needs a current-text check, not an inference; (2) the ₹2.5 crore LUT-ineligibility threshold and the 15% bank-guarantee cap are both sourced to Notification 37/2017-Central Tax and Circular 8/8/2017-GST respectively — confirm neither has been superseded; (3) the 3-working-day deemed-approval window (Circular 40/14/2018-GST) is still current practice on the portal.",
  },
};
