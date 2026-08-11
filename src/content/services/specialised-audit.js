import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: this is a B2B service — banks and NBFCs commissioning stock/channel
// audits, not a business owner searching for it directly. Almost no statutory
// citations belong here; these are lender-driven engagement types defined by
// bank policy and RBI guidance, not a specific Act section. Write it as
// practice description, not law.

export default {
  slug: "specialised-audit",
  category: "accounting-audit",
  title: "Specialised Audit",
  h1: "Specialised Audit Services in Salem, Tamil Nadu",

  meta: {
    title: "Specialised Audit Services in Salem | Stock & Concurrent Audit",
    description:
      "Stock audits, channel-finance audits and concurrent audits for banks and NBFCs, plus due diligence support for CAs. Salem, Tamil Nadu.",
    keywords: [
      "stock audit services salem",
      "concurrent audit consultant tamil nadu",
      "channel finance audit",
      "bank empanelled auditor",
      "due diligence support ca",
    ],
  },

  lede:
    "Stock audits, channel-finance audits and concurrent audits for banks and NBFCs, plus due diligence support for chartered accountants.",

  overview: [
    `Banks and NBFCs commission specialised audits to verify what a borrower's financial statements alone cannot show — that stock actually exists where it is claimed, that a channel financing arrangement is being used as intended, or that a branch's day-to-day transactions are being processed correctly as they happen rather than caught at year-end.`,

    `These are engagement types defined by lender policy and regulatory guidance rather than a single statutory provision, so the scope varies by assignment. A stock audit for a working capital facility looks different from a concurrent audit of a bank branch, which looks different again from due diligence support for another CA's client. What stays constant is the standard: findings have to be verifiable, not asserted.`,

    `Most local firms do not offer this range, because it requires being comfortable in a lender's or regulator's frame of reference rather than a client's. It sits alongside our other audit and accounting work as a distinct practice area for banks, NBFCs and fellow professionals.`,
  ],

  whoNeedsThis: [
    "You are a bank or NBFC needing a stock audit on a borrower's working capital facility.",
    "You run a channel financing programme and need the arrangement audited for compliance with its terms.",
    "You are a bank branch requiring a concurrent audit under your empanelled auditor arrangement.",
    "You are a chartered accountant who needs due diligence support on a client engagement.",
    "You need an independent verification of stock, receivables or a specific financial arrangement for a lender or investor.",
  ],

  included: [
    {
      title: "Stock audits",
      desc: "Physical verification of inventory against book records, valuation checks, and reporting in the format your lender requires.",
    },
    {
      title: "Channel-finance audits",
      desc: "Verification that a dealer or distributor financing arrangement is operating within its sanctioned terms, with drawdown and repayment patterns checked against the facility.",
    },
    {
      title: "Concurrent audits",
      desc: "Ongoing, near-real-time review of branch transactions against process and regulatory requirements, rather than a retrospective annual check.",
    },
    {
      title: "Due diligence support for CAs",
      desc: "Working as an extension of another chartered accountant's team on a specific engagement, under their direction and to their scope.",
    },
    {
      title: "Reporting in the lender's format",
      desc: "Findings delivered in the structure your bank or NBFC actually requires, not a generic report that then needs reformatting.",
    },
  ],

  documents: [
    {
      group: "For a stock audit",
      items: [
        "Latest stock statement submitted to the lender",
        "Stock register or inventory management system access",
        "Purchase and sales records for the period",
        "Insurance policy covering the stock",
      ],
    },
    {
      group: "For a channel-finance audit",
      items: [
        "The financing agreement and sanctioned terms",
        "Drawdown and repayment records",
        "Dealer or distributor account statements",
      ],
    },
    {
      group: "For a concurrent audit",
      items: [
        "Branch transaction records for the period under review",
        "Applicable process manuals and regulatory circulars",
        "Access to the core banking system as authorised by the branch",
      ],
    },
  ],

  documentsNote:
    "Scope and reporting format are agreed with the commissioning bank, NBFC or CA before fieldwork starts — these engagements follow the commissioning party's requirements rather than a fixed ThinkOrange template.",

  process: [
    {
      step: 1,
      title: "Scope agreed with the commissioning party",
      desc: "The bank, NBFC or CA sets the terms of reference, and we confirm the reporting format required.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Fieldwork",
      desc: "Physical verification, transaction testing or process review carried out against the agreed scope.",
      duration: t("auditFieldworkDuration"),
    },
    {
      step: 3,
      title: "Reporting",
      desc: "Findings delivered in the required format, with any discrepancies flagged clearly rather than buried in narrative.",
      duration: "On completion of fieldwork",
    },
  ],

  timeline: [
    { stage: "Scope agreement", days: t("incorporationNameStage") },
    { stage: "Fieldwork", days: t("auditFieldworkDuration") },
  ],

  fees: null,

  faqs: [
    {
      q: "Who commissions a specialised audit — the business or the bank?",
      a: "Usually the lender — a bank or NBFC commissions a stock or channel-finance audit on a borrower as a condition of the facility. Concurrent audits are commissioned by the bank itself under its empanelled auditor arrangements. A business does not typically request one of itself.",
    },
    {
      q: "What does a stock audit actually check?",
      a: "Whether the inventory a borrower has declared to the lender physically exists, is valued reasonably, and is insured. It is a verification exercise, not an accounting opinion, and is usually required periodically for working capital facilities above a certain size.",
    },
    {
      q: "What is a concurrent audit?",
      a: "An audit that runs alongside a bank branch's operations rather than after the fact — reviewing transactions close to when they happen so errors or breaches surface quickly rather than at year-end. It is a distinct engagement from a bank's annual statutory audit.",
    },
    {
      q: "Can you support another CA's engagement rather than working directly with the client?",
      a: "Yes. We regularly work as an extension of another chartered accountant's team on a specific piece of due diligence, under their direction and reporting to them rather than the end client directly.",
    },
    {
      q: "Are you empanelled with banks for these audits?",
      a: "Empanelment varies by bank and is confirmed on a case-by-case basis — get in touch with the specific engagement in mind and we will confirm our standing with that institution.",
    },
  ],

  related: ["internal-audit", "bookkeeping", "business-loan"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [],
    notes:
      "No statutory citations by design — these are lender-defined and RBI-guidance-driven engagement types, not a single Act provision. Confirm the empanelment claim is accurate before publishing, and confirm the description of concurrent audit scope against current RBI guidance for banks, which is outside this firm's usual GST/company-law domain.",
  },
};
