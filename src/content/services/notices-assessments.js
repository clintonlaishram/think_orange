import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written 19-08-2026, clearing BLOCKERS.md §1 for this leaf — the fourth
// Income Tax leaf, added to the category by the 17-08-2026 menu restructure
// and blocked for the same reason as the other three.
//
// EVERY SECTION NUMBER ON THIS PAGE MOVED ON 01-04-2026. The numbers an
// Indian business owner has heard for thirty years — 143(1), 143(2), 148,
// 144 — are all repealed citations now: assessment is Section 270, best
// judgment is 271, faceless is 273, reassessment notice is 280. The page
// gives the OLD number in brackets exactly once per concept, because a
// reader arriving with a notice in hand searched for the old number and
// needs to recognise where they are. That is orientation, not the citation.
//
// SECOND-HIGHEST-RISK PAGE ON THE SITE, after gst-notices-litigation, and for
// the same reason: someone may act on it while a reply window is running.
// Same discipline applied — no outcome is promised anywhere, and the page
// says plainly that sometimes the department is right.
// ============================================================================

export default {
  slug: "notices-assessments",
  category: "income-tax",
  title: "Notices & Assessments",
  h1: "Income Tax Notices and Assessments in Salem, Tamil Nadu",

  meta: {
    title: "Income Tax Notice & Assessment Support in Salem | ThinkOrange",
    description:
      "Replies to income tax notices, scrutiny and faceless assessments, reassessment and first appeals under the Income Tax Act 2025 — handled to the deadline.",
    keywords: [
      "income tax notice reply salem",
      "scrutiny assessment consultant tamil nadu",
      "faceless assessment support",
      "income tax notice section 270",
      "reassessment notice section 280",
    ],
  },

  lede:
    "From a processing intimation to a faceless scrutiny or a reassessment notice — read properly, answered on evidence, and filed inside the window.",

  overview: [
    `Most income tax notices are not accusations. The department now cross-checks every return against the data it already holds from banks, employers, registrars and stock exchanges, and a mismatch generates a communication automatically. What determines how it ends is almost never the strength of your case at the start — it is whether the reply went in on time, and whether it was supported by documents rather than explanation.`,

    `The framework was re-codified on ${s("incomeTaxAct2025Commencement")}. Processing of a return and scrutiny both sit under ${s("assessmentSection")} of the Income Tax Act 2025, the successor to the old Section 143. An intimation on a processed return cannot be issued after ${s("intimationOuterLimit")}, and a scrutiny notice must be served within ${s("scrutinyNoticeWindow")}. Where income is alleged to have escaped assessment, the notice comes under ${s("reassessmentNoticeSection")}, replacing the notice everyone knew as Section 148.`,

    `Assessment is now faceless by default under ${s("facelessAssessmentSection")} — conducted electronically through the National Faceless Assessment Centre, with no officer to visit and no relationship to rely on. That cuts both ways. It removes discretion, and it means a reply that is not complete and self-explanatory on the page has nothing else supporting it. Ignore the process entirely and the officer proceeds to a best judgment assessment under ${s("bestJudgmentAssessmentSection")}, on their figures rather than yours.`,
  ],

  whoNeedsThis: [
    "You have received an intimation and the tax computed does not match the return you filed.",
    "A scrutiny notice has been issued and you have a faceless assessment to respond to.",
    "A notice has arrived alleging income escaped assessment for an earlier year.",
    "Your return was treated as defective and you have been asked to correct it.",
    "A demand is showing on the portal for a year you thought was closed, or a refund has been adjusted against it.",
    "An assessment order has gone against you and you are deciding whether to appeal.",
  ],

  included: [
    {
      title: "Notice reading and deadline fixing",
      desc: "What has been issued, under which provision, for which tax year, and exactly how many days remain. You get that in writing before anything else happens.",
    },
    {
      title: "Validity and limitation check",
      desc: `Whether the notice is in time — a scrutiny notice served outside ${s("scrutinyNoticeWindow")}, or an intimation after ${s("intimationOuterLimit")}, is contestable on that ground alone.`,
    },
    {
      title: "Reconciliation against the department's data",
      desc: "Your return matched line by line against Form 26AS, the Annual Information Statement and the bank data the notice relies on, so the reply addresses the actual mismatch.",
    },
    {
      title: `Faceless assessment response (${s("facelessAssessmentSection")})`,
      desc: "Submissions drafted and uploaded through the e-proceedings facility, with documents indexed so the assessing unit can follow the evidence without asking again.",
    },
    {
      title: "Defective return correction",
      desc: `Returns flagged under ${s("itrDefectiveReturnProvision")} corrected and refiled inside the window, before the return is treated as never having been filed.`,
    },
    {
      title: `Reassessment representation (${s("reassessmentNoticeSection")})`,
      desc: "Response to income-escaping notices, including whether the information relied on actually supports reopening that year.",
    },
    {
      title: "Demand and rectification handling",
      desc: "Arithmetical and credit errors taken up by rectification rather than appeal, which is faster and cheaper where that is genuinely the problem.",
    },
    {
      title: "First appeal",
      desc: `Where an order is wrong and worth contesting, grounds drafted and the appeal filed within ${s("appealFirstLevelWindow")}.`,
    },
  ],

  documents: [
    {
      group: "Send these first — before anything else",
      items: [
        "The notice or order itself, with every annexure, as received",
        "The date it was served, and the response deadline stated on it",
        "The tax year it relates to",
        "Your e-filing portal login, or the ability to view the e-proceedings tab",
        "Any earlier correspondence on the same matter",
      ],
    },
    {
      group: "For the reply",
      items: [
        "The return filed for the year, with its computation and acknowledgement",
        "Form 26AS and the Annual Information Statement for that year",
        "Bank statements for every account, for the full year in question",
        "Books of account, financial statements and the audit report where one applies",
        "Documentary proof for whatever the notice questions — invoices, agreements, deeds, confirmations",
        "Challans for tax already paid for that year",
      ],
    },
    {
      group: "Where the notice concerns a specific transaction",
      items: [
        "Sale and purchase deeds for property, with proof of payment routing",
        "Broker statements and contract notes for shares and mutual funds",
        "Loan agreements and lender confirmations for amounts treated as unexplained",
        "Gift deeds, and the donor's identity and capacity evidence, for amounts received",
        "Source-of-funds trail for any large cash deposit",
      ],
    },
    {
      group: "For an appeal",
      items: [
        "The assessment or penalty order being appealed",
        "The complete submission and annexures filed during assessment",
        "Record of the hearing, where one took place",
        "Proof of tax paid on the returned income",
        "Board resolution or authorisation for the signatory, for companies and LLPs",
      ],
    },
  ],

  documentsNote:
    "Send the notice the day you receive it, even if you can gather nothing else yet. Response windows run from the date of service, not from when you opened the portal, and the most common way a good case becomes a bad one is a window that closed while documents were being collected.",

  process: [
    {
      step: 1,
      title: "Read it and fix the deadline",
      desc: "We identify what has been issued, under which provision, for which tax year, and how long you actually have. Nothing else is decided before this is clear.",
      duration: t("itNoticeInitialReview"),
    },
    {
      step: 2,
      title: "Test validity, then merits",
      desc: "Whether the notice is within its limitation window, and separately whether the underlying point survives reconciliation. Sometimes the answer is that the department is right, and we will say so.",
      duration: "With the review",
    },
    {
      step: 3,
      title: "Agree the position",
      desc: "Contest, part-concede or correct and pay. We set out the options and the likely cost of each, and you decide before anything is filed in your name.",
      duration: "Before drafting",
    },
    {
      step: 4,
      title: "Draft, upload and follow through",
      desc: "The submission is drafted with its evidence indexed, uploaded through e-proceedings inside the window, and any further query answered until the proceeding closes.",
      duration: "Within the response window",
    },
    {
      step: 5,
      title: "Appeal if the order is wrong",
      desc: `Where the order does not hold, grounds drafted and the first appeal filed within ${s("appealFirstLevelWindow")}, then the appeal carried through the faceless process.`,
      duration: s("appealFirstLevelWindow"),
    },
  ],

  timeline: [
    { stage: "Outer limit for an intimation on a processed return", days: s("intimationOuterLimit") },
    { stage: "Time limit to serve a scrutiny notice", days: s("scrutinyNoticeWindow") },
    { stage: "Filing a first appeal against an order", days: s("appealFirstLevelWindow") },
    { stage: "Indicative disposal of a first appeal", days: s("appealDisposalTimeline") },
    { stage: "Correcting a defective return", days: "As stated on the notice" },
  ],

  fees: null,

  faqs: [
    {
      q: "I got a notice quoting a section number I do not recognise. Has something changed?",
      a: `Yes. The Income Tax Act 2025 renumbered everything from ${s("incomeTaxAct2025Commencement")}. What used to be Section 143 is now ${s("assessmentSection")}, best judgment assessment is ${s("bestJudgmentAssessmentSection")}, and the reassessment notice formerly under Section 148 is now ${s("reassessmentNoticeSection")}. The provisions largely do the same work; the citations moved. Send us the notice and we will tell you what stage you are at.`,
    },
    {
      q: "Is an intimation a notice? Do I need to do anything?",
      a: "An intimation is the result of your return being processed. If it agrees with your computation, nothing is needed. If it shows extra tax, something did not match — often a TDS credit, an arithmetical adjustment or a deduction disallowed as apparent from the return. It has a response window, so it should not be left.",
    },
    {
      q: "What is a faceless assessment, and can I meet the officer?",
      a: `Assessment is conducted electronically under ${s("facelessAssessmentSection")} through the National Faceless Assessment Centre, with no assigned local officer. Everything happens through e-proceedings. A video hearing can be requested in the prescribed circumstances, but the written submission carries the case — it must be complete and self-explanatory on its own.`,
    },
    {
      q: "How long does the department have to open a scrutiny?",
      a: `A scrutiny notice must be served within ${s("scrutinyNoticeWindow")} under ${s("assessmentSection")}. Reassessment for income alleged to have escaped assessment runs on a different and longer footing under ${s("reassessmentNoticeSection")}, and depends on the information relied on. A notice outside its window is challengeable on that basis alone.`,
    },
    {
      q: "What happens if I just ignore it?",
      a: `The proceeding continues without your side of it. The officer can complete a best judgment assessment under ${s("bestJudgmentAssessmentSection")} on the material available, which means their figures rather than yours, and a demand follows. Ignoring a notice removes your options; it does not remove the liability.`,
    },
    {
      q: "Should I pay the demand or fight it?",
      a: "Sometimes paying is right, and we will say so. Where the department has it correct, paying early stops interest and closes the matter. Where it is an arithmetical or credit error, rectification is faster and cheaper than an appeal. Contesting is for orders that are actually wrong, not for demands that are merely unwelcome.",
    },
    {
      q: "What does filing an appeal involve?",
      a: `A first appeal is filed within ${s("appealFirstLevelWindow")}, electronically, with tax on the returned income paid. Appeals are heard faceless through the National Faceless Appeal Centre. The Act directs that appeals be decided ${s("appealDisposalTimeline")} — that is a direction to the authority, not a timeline you can hold anyone to.`,
    },
    {
      q: "The notice is about a year my previous accountant handled. Can you still take it?",
      a: "Yes, and it is common. We work from the return, the portal record and your bank data rather than from whatever files were handed over. Where the earlier position is indefensible we will tell you plainly, because the reply is filed in your name and has to be one you can stand behind.",
    },
  ],

  related: ["itr-filing", "tds-compliance", "gst-notices-litigation"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "incomeTaxAct2025Commencement",
      "assessmentSection",
      "intimationOuterLimit",
      "scrutinyNoticeWindow",
      "inquiryBeforeAssessmentSection",
      "bestJudgmentAssessmentSection",
      "facelessAssessmentSection",
      "reassessmentNoticeSection",
      "itrDefectiveReturnProvision",
      "appealFirstLevelWindow",
      "appealDisposalTimeline",
    ],
    notes:
      "SECOND-HIGHEST-RISK PAGE ON THE SITE — a visitor may act on it while a response window is running. Confirm specifically: (1) every renumbered section against the Act as passed, not a secondary summary; (2) the reassessment limitation periods, which this page deliberately does NOT state — it says only that they are longer and depend on the information relied on; (3) whether the first appeal lies to the Joint Commissioner (Appeals) under Section 356 or to the Commissioner (Appeals) in the cases this page's readers will typically face, since the page avoids naming the authority for that reason; (4) the pre-deposit position on a first appeal, stated here only as tax on the returned income; (5) that nothing here reads as a guarantee of outcome. The appeal FORM number is deliberately omitted — one secondary source reports Form 99 replacing Form 35 from April 2026 and that was not corroborated.",
  },
};
