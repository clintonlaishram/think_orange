import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: most visitors landing here fall into two very different groups — one
// that is LEGALLY REQUIRED to have an internal audit (crossed the Section 138
// thresholds) and one that WANTS one voluntarily for control reasons. Serve
// both without assuming which one the reader is.

export default {
  slug: "internal-audit",
  category: "accounting-audit",
  title: "Internal Audit",
  h1: "Internal Audit Services in Salem, Tamil Nadu",

  meta: {
    title: "Internal Audit Services in Salem | ThinkOrange Consulting",
    description:
      "Process reviews, control testing and risk assessment for companies and BFSI clients — mandatory or voluntary. Salem, Tamil Nadu.",
    keywords: [
      "internal audit services salem",
      "internal audit consultant tamil nadu",
      "section 138 internal audit applicability",
      "internal audit company",
      "risk assessment audit",
    ],
  },

  lede:
    "Process reviews, control testing and risk assessment — for companies where it is mandatory, and for anyone who wants to know where money and compliance are actually leaking.",

  overview: [
    `Internal audit is mandatory for some companies and optional for everyone else, and the two groups need different things from it. Under Section 138 of the Companies Act, a private company must appoint an internal auditor once turnover reaches ${s("internalAuditTurnoverThreshold")} or outstanding borrowings reach ${s("internalAuditBorrowingThreshold")} — checked against any point in the preceding financial year, not just year-end. Listed companies require it regardless of size.`,

    `Where it is not mandatory, businesses still commission internal audits voluntarily, usually once they have grown past the point where the owner can personally see every transaction. The value is the same either way: independent testing of whether your controls actually work, rather than assuming they do because a process document says they should.`,

    `We work with corporate and BFSI clients on process reviews, control testing and risk assessment, reporting findings in terms a board or management team can act on rather than a generic checklist. The output that matters is not the report — it is what changes afterward.`,
  ],

  whoNeedsThis: [
    `Your private company's turnover has reached ${s("internalAuditTurnoverThreshold")} in the preceding financial year — internal audit is now mandatory under Section 138.`,
    `Your outstanding borrowings from banks or financial institutions have reached ${s("internalAuditBorrowingThreshold")} at any point in the preceding year.`,
    "Your company is listed, where internal audit is mandatory regardless of size.",
    "You suspect controls are being bypassed but cannot see where without an independent review.",
    "You have grown to a size where the owner or promoter can no longer personally oversee every transaction.",
    "A bank, investor or board member has asked for an independent control review.",
  ],

  included: [
    {
      title: "Applicability assessment",
      desc: "Whether Section 138 actually requires you to have an internal audit yet, based on your real turnover and borrowing figures — not assumed.",
    },
    {
      title: "Process and control review",
      desc: "Purchase, sales, payroll, inventory and cash cycles reviewed for where controls exist on paper but not in practice.",
    },
    {
      title: "Control testing",
      desc: "Sample transactions tested against the stated process, so findings are evidenced rather than asserted.",
    },
    {
      title: "Risk assessment",
      desc: "Where the business is exposed — fraud risk, process breakdown, or compliance gaps that would surface badly in a statutory audit.",
    },
    {
      title: "Findings and reporting",
      desc: "A report written for action — what was found, what it exposes you to, and what to fix first — not a document that restates the obvious.",
    },
    {
      title: "Follow-up review",
      desc: "Checking that agreed corrective actions were actually implemented, not just accepted in a management response.",
    },
  ],

  documents: [
    {
      group: "To scope the engagement",
      items: [
        "Latest audited financial statements",
        "Organisation chart and key process owners",
        "Existing process documentation or SOPs, if any",
        "Prior internal or statutory audit reports",
      ],
    },
    {
      group: "For fieldwork",
      items: [
        "Access to the accounting system for the period under review",
        "Sample transaction documentation as requested during testing",
        "Bank statements and reconciliations for the period",
        "Payroll and vendor master records where relevant to scope",
      ],
    },
  ],

  documentsNote:
    "Access matters more than paperwork here. The single biggest delay in an internal audit is waiting on system access or a process owner's time — settle both before fieldwork starts, not during it.",

  process: [
    {
      step: 1,
      title: "Scoping",
      desc: "We agree which processes and periods are in scope, based on risk and, where applicable, the Section 138 requirement.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Fieldwork",
      desc: "Process walkthroughs, control testing and sample checks carried out against the agreed scope.",
      duration: t("auditFieldworkDuration"),
    },
    {
      step: 3,
      title: "Findings discussed",
      desc: "Draft findings shared with process owners before the report is finalised, so nothing lands as a surprise.",
      duration: "Before the final report",
    },
    {
      step: 4,
      title: "Report and presentation",
      desc: "Final report issued and presented to management or the audit committee, with findings ranked by what to fix first.",
      duration: "On completion of fieldwork",
    },
    {
      step: 5,
      title: "Follow-up",
      desc: "A later check that agreed actions were actually implemented, not just noted.",
      duration: "Agreed separately",
    },
  ],

  timeline: [
    { stage: "Scoping", days: t("incorporationNameStage") },
    { stage: "Fieldwork", days: t("auditFieldworkDuration") },
    { stage: "Mandatory audit trigger — turnover", days: s("internalAuditTurnoverThreshold") },
    { stage: "Mandatory audit trigger — borrowings", days: s("internalAuditBorrowingThreshold") },
  ],

  fees: null,

  faqs: [
    {
      q: "Is internal audit mandatory for my company?",
      a: `For a private company, yes once turnover reaches ${s("internalAuditTurnoverThreshold")} or outstanding borrowings reach ${s("internalAuditBorrowingThreshold")}, under Section 138 of the Companies Act. Listed companies require it regardless of size. Below those thresholds it is optional, though often still worthwhile.`,
    },
    {
      q: "How is the threshold measured — at year-end or during the year?",
      a: `At any point during the preceding financial year for the borrowing threshold, not only at year-end. A company that briefly crossed ${s("internalAuditBorrowingThreshold")} in borrowings mid-year and repaid it before year-end can still trigger the requirement.`,
    },
    {
      q: "What is the difference between internal audit and statutory audit?",
      a: "A statutory audit expresses an opinion on whether your financial statements are true and fair, for shareholders and regulators. Internal audit examines whether your operational controls and processes actually work, for management's own benefit. They serve different purposes and a good internal audit often makes the statutory audit smoother.",
    },
    {
      q: "Who can be appointed as internal auditor?",
      a: "A chartered accountant, cost accountant, or another professional as the board decides, and the internal auditor may be an employee or an external firm. Independence from the processes being reviewed matters more than the specific qualification.",
    },
    {
      q: "How often should internal audit be carried out?",
      a: "The Companies Act requires the audit committee or board to formulate the scope and periodicity — commonly annual for smaller companies, more frequent for higher-risk areas or larger operations. It is a decision for your board, tailored to your actual risk profile rather than a fixed rule.",
    },
    {
      q: "What happens with the findings?",
      a: "They go to the audit committee or board, along with management's response and an action plan. The findings are internal — they do not get filed with the Registrar the way statutory audit reports do — but ignoring them repeatedly is itself a governance failure that a statutory auditor may eventually flag.",
    },
  ],

  related: ["specialised-audit", "bookkeeping", "private-limited-company"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["internalAuditTurnoverThreshold", "internalAuditBorrowingThreshold"],
    notes:
      "Confirm the periodicity and qualification requirements stated in the FAQ against the current Companies (Accounts) Rules, and confirm whether any recent amendment has changed the ₹200 crore / ₹100 crore thresholds.",
  },
};
