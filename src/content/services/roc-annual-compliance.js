import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js and private-limited-company.js.
//
// Reuses private-limited-company.js's already-cited ROC keys wherever the
// same fact applies (aoc4Window, mgt7Window, inc20aWindow, llpForm8Due,
// llpForm11Due, llpLateFee, booksRetentionCompanies) rather than re-deriving
// them — this leaf is about the RECURRING annual filings, so it deliberately
// contrasts them against INC-20A's one-time window rather than repeating
// private-limited-company.js's incorporation-stage content.
//
// AOC-4's late-filing penalty amount is deliberately NOT stated here either,
// matching private-limited-company.js's own review note: research returned
// conflicting figures and that page already flags it as unconfirmed.

export default {
  slug: "roc-annual-compliance",
  category: "accounting-audit",
  title: "ROC & Annual Compliance",
  h1: "ROC & Annual Compliance for Companies and LLPs in Salem, Tamil Nadu",

  meta: {
    title: "ROC & Annual Compliance in Salem | ThinkOrange Consulting",
    description:
      "AOC-4, MGT-7 or MGT-7A, DIR-3 KYC and LLP Forms 8 and 11 — tracked and filed on time, every year. Salem, Tamil Nadu, for companies and LLPs anywhere.",
    keywords: [
      "roc annual compliance salem",
      "aoc-4 mgt-7 filing consultant",
      "dir-3 kyc filing tamil nadu",
      "llp form 8 form 11 filing",
      "annual return filing company",
    ],
  },

  lede:
    "The recurring Registrar of Companies filings for private limited companies and LLPs — AOC-4, MGT-7 or MGT-7A, DIR-3 KYC and LLP Forms 8 and 11 — tracked and filed before the date, not after.",

  overview: [
    "Incorporating a company or LLP is a one-time event; staying compliant with the Registrar of Companies afterward is not. Several of these obligations attach to the entity itself and keep recurring every year, whether the business is trading actively or sitting dormant — unlike GST or income tax, there is no revenue threshold that switches the obligation off.",

    `A private company files AOC-4 (financial statements) within ${s("aoc4Window")} and MGT-7 (annual return) within ${s("mgt7Window")} — the abridged MGT-7A instead of the full MGT-7 where it qualifies as a small company (${s("smallCompanyThreshold")}) or as an OPC. Every director also needs DIR-3 KYC filed by ${s("dir3KycDeadline")}, or the DIN is marked inactive until cleared with a ${s("dir3KycLateFee")}.`,

    `An LLP instead files Form 8 (statement of account and solvency) by ${s("llpForm8Due")} and Form 11 (annual return) by ${s("llpForm11Due")} — both every year regardless of turnover. Miss either and the late fee is ${s("llpLateFee")}, and unlike most company penalties this one is uncapped — a filing forgotten for months compounds the whole time.`,
  ],

  whoNeedsThis: [
    "You run a private limited company and need AOC-4 and MGT-7 (or MGT-7A) filed every year without missing the window after your AGM.",
    "You run an LLP and need Form 8 and Form 11 filed on their fixed calendar dates, whatever your LLP actually did that year.",
    "You, or another director, have not filed DIR-3 KYC and the DIN risks being marked inactive.",
    "Your company or LLP has gone quiet or dormant, and you assumed no activity meant no filing obligation.",
    "You are taking over a company or LLP's compliance from a previous accountant and want the annual calendar rebuilt correctly.",
    "You want one firm tracking the incorporation-era filings and the ongoing annual ones together, so nothing falls in the gap between them.",
  ],

  included: [
    {
      title: "Annual filing calendar",
      desc: "Every date that applies to your specific entity — company or LLP, big or small — set out and tracked, not left for you to remember.",
    },
    {
      title: "AOC-4 preparation and filing",
      desc: `Financial statements filed within ${s("aoc4Window")}, reconciled against your books before submission.`,
    },
    {
      title: "MGT-7 or MGT-7A filing",
      desc: `Your annual return filed within ${s("mgt7Window")} — the abridged MGT-7A where you qualify, the full MGT-7 otherwise.`,
    },
    {
      title: "DIR-3 KYC for every director",
      desc: `Filed for each director ahead of the ${s("dir3KycDeadline")} deadline, so no DIN is ever marked inactive on our watch.`,
    },
    {
      title: "LLP Form 8 and Form 11",
      desc: `Statement of account and solvency filed by ${s("llpForm8Due")}, and the annual return by ${s("llpForm11Due")}.`,
    },
    {
      title: "Dormant-entity filings",
      desc: "The same filings, handled just as carefully, for an entity that had no transactions in the year — dormant is not the same as exempt.",
    },
    {
      title: "Books handover coordination",
      desc: "Coordinated with whoever maintains your books, so the numbers going into AOC-4 are the same numbers in your actual accounts.",
    },
  ],

  documents: [
    {
      group: "For a company",
      items: [
        "Audited financial statements for the year",
        "Board resolution approving the financial statements",
        "AGM notice and minutes",
        "List of directors with DIN, and their DIR-3 KYC status",
        "Registers maintained under the Companies Act — members, directors, charges",
      ],
    },
    {
      group: "For an LLP",
      items: [
        "Statement of account and solvency, signed by the designated partners",
        "LLP agreement and any amendments made during the year",
        "Details of designated partners and any change during the year",
      ],
    },
  ],

  documentsNote: `Books of account must be retained for ${s("booksRetentionCompanies")} under the Companies Act — the same period the numbers going into AOC-4 need to survive an audit or a later query.`,

  process: [
    {
      step: 1,
      title: "Calendar built",
      desc: "We map every filing your specific entity owes this year, against its own AGM date, incorporation date or financial year.",
      duration: t("rocCalendarSetup"),
    },
    {
      step: 2,
      title: "Financials and registers reviewed",
      desc: "Audited statements, board resolutions and statutory registers checked before anything is filed.",
      duration: t("rocFilingPrep"),
    },
    {
      step: 3,
      title: "Filings submitted",
      desc: "AOC-4, MGT-7 or MGT-7A, DIR-3 KYC and, for an LLP, Forms 8 and 11, filed within their own windows.",
      duration: "Against each form's own window",
    },
    {
      step: 4,
      title: "Confirmation and next year's calendar",
      desc: "Filing acknowledgements handed over, and next year's dates already sitting on the calendar rather than starting from zero.",
      duration: "On filing",
    },
  ],

  timeline: [
    { stage: "Calendar and document review", days: t("rocFilingPrep") },
    { stage: "AOC-4 — financial statements", days: s("aoc4Window") },
    { stage: "MGT-7 / MGT-7A — annual return", days: s("mgt7Window") },
    { stage: "DIR-3 KYC", days: s("dir3KycDeadline") },
    { stage: "LLP Form 8", days: s("llpForm8Due") },
    { stage: "LLP Form 11", days: s("llpForm11Due") },
  ],

  fees: null,

  faqs: [
    {
      q: "What is the difference between AOC-4 and MGT-7?",
      a: `AOC-4 files your financial statements, within ${s("aoc4Window")}. MGT-7 (or the abridged MGT-7A) files your annual return — directors, shareholding and registers — within ${s("mgt7Window")}. Both are separate filings against the same AGM, and both are mandatory every year, regardless of activity.`,
    },
    {
      q: "Who can file MGT-7A instead of MGT-7?",
      a: `${s("mgt7aApplicability")} A company currently counts as small if it has ${s("smallCompanyThreshold")}, so most very small private companies qualify — but the classification is checked every year against that year's figures, not fixed at incorporation.`,
    },
    {
      q: "What is DIR-3 KYC and why does it matter?",
      a: `It is the annual identity confirmation every director holding a DIN must file, due by ${s("dir3KycDeadline")}. Miss it and the DIN is marked inactive, which blocks that person from signing any MCA filing until it is cleared with a ${s("dir3KycLateFee")}.`,
    },
    {
      q: "Do dormant companies and LLPs still need to file?",
      a: "Yes. A company or LLP with no transactions in the year still owes AOC-4, MGT-7 or MGT-7A, and DIR-3 KYC — or Forms 8 and 11 for an LLP. Dormant status under the Companies Act is a separate, formal filing of its own, not something that happens automatically from inactivity.",
    },
    {
      q: "What happens if an LLP misses Form 8 or Form 11?",
      a: `${s("llpLateFee")}, and unlike most company penalties this one is uncapped — a filing forgotten for months compounds the whole time. LLPs get less scrutiny than companies precisely because the penalty looks small per day; it rarely stays small.`,
    },
    {
      q: "Is INC-20A part of this service?",
      a: `No — INC-20A is filed once, within ${s("inc20aWindow")} of incorporation, to declare that the company has started business. This service picks up from there: the filings that recur every single year for as long as the entity exists.`,
    },
    {
      q: "Can you take over compliance for a company we did not incorporate?",
      a: "Yes, and it is a common starting point. We review what has and hasn't been filed to date, close any gap first, then bring the entity onto our regular annual calendar going forward.",
    },
  ],

  related: ["private-limited-company", "llp-registration", "bookkeeping"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "aoc4Window",
      "mgt7Window",
      "mgt7aApplicability",
      "smallCompanyThreshold",
      "dir3KycDeadline",
      "dir3KycLateFee",
      "llpForm8Due",
      "llpForm11Due",
      "llpLateFee",
      "booksRetentionCompanies",
      "inc20aWindow",
    ],
    notes:
      "Deliberately does not state the AOC-4/MGT-7 late-filing penalty amount — private-limited-company.js already flags this as unconfirmed (conflicting ₹100/day vs ₹1,000/day figures found in research) and this leaf follows the same discipline rather than resolving it independently. Confirm the current small-company thresholds (₹4 crore / ₹40 crore, effective 15-09-2022) are still current, and confirm DIR-3 KYC's due date and fee against the current MCA rules before publishing.",
  },
};
