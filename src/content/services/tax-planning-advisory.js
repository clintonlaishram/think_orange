import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written 19-08-2026, clearing BLOCKERS.md §1 for this leaf.
//
// THE RISK ON THIS PAGE IS DIFFERENT FROM THE OTHER THREE. Filing, TDS and
// notices are procedural — they go wrong by citing a repealed section. A
// planning page goes wrong by drifting into advice: a page that says "choose
// the new regime" or "invest here to save tax" is giving personalised
// financial advice to a reader whose numbers it has never seen. So this page
// states the MECHANISMS and what the comparison depends on, and every
// recommendation is explicitly deferred to a review of the client's actual
// figures. No worked example, no "you could save X", no product named.
//
// Slab rates, the standard deduction and the rebate are the most frequently
// changed facts on the site — every Finance Act can move them. They live in
// statutory.js with a note saying exactly that, and are interpolated here so
// one edit updates the page.
//
// The rebate line carries TWO caveats that must never be dropped in a rewrite:
// the ₹12 lakh figure is taxable income AFTER the standard deduction, and the
// rebate does not extend to income taxed at special rates. A page stating the
// headline without them is the single most misread number in Indian tax.
// ============================================================================

export default {
  slug: "tax-planning-advisory",
  category: "income-tax",
  title: "Tax Planning & Advisory",
  h1: "Tax Planning and Advisory in Salem, Tamil Nadu",

  meta: {
    title: "Tax Planning & Advisory in Salem, Tamil Nadu | ThinkOrange",
    description:
      "Regime comparison, advance tax, capital gains timing and business structure reviewed on your actual numbers under the Income Tax Act 2025 — before the year ends.",
    keywords: [
      "tax planning salem",
      "tax advisory consultant tamil nadu",
      "new vs old tax regime comparison",
      "advance tax planning salem",
      "business tax planning income tax act 2025",
    ],
  },

  lede:
    "Decisions taken while the year is still running — regime choice, advance tax, capital gains timing and how your business is structured — rather than a scramble at filing time.",

  overview: [
    `Tax planning is not what happens in March. By then almost every decision that affects your liability has already been made: how the business is structured, when an asset was sold, whether income sits in one hand or several, whether advance tax was paid on schedule. Planning is choosing those things deliberately, with the tax consequence known in advance, and doing it while there is still time to act differently.`,

    `The framework itself changed on ${s("incomeTaxAct2025Commencement")}, when the Income Tax Act, 2025 replaced the 1961 Act and abolished "Assessment Year" in favour of a single ${s("taxYearConcept")}. Rates for individuals still run on two regimes. The new regime is ${s("newRegimeSlabs")}, with a standard deduction of ${s("standardDeductionNewRegime")} on salary and pension. The old regime is ${s("oldRegimeSlabs")}, with a standard deduction of ${s("standardDeductionOldRegime")} but access to the deductions the new regime gives up.`,

    `Which is better is arithmetic on your numbers, not a general truth — and it changes as a home loan, rent or investments change. Under ${s("rebateSection")}, the new regime carries a rebate of ${s("rebateNewRegime")}, but that threshold is taxable income after the standard deduction, and it does not apply to income taxed at special rates such as capital gains. That last point is the most misread number in Indian tax, and it is why this page compares rather than recommends.`,
  ],

  whoNeedsThis: [
    "You are deciding between the new and old regime and want the comparison run on your actual figures.",
    "Your income has changed materially this year — a raise, a new business, a property sale or a windfall.",
    "You are paying advance tax and want the instalments right rather than paying interest at year end.",
    "You are planning to sell property, shares or mutual funds and the timing is still yours to choose.",
    "Your business is growing and the structure it started in may no longer be the efficient one.",
    "You have been filing without ever reviewing whether the way your income is arranged still makes sense.",
  ],

  included: [
    {
      title: "Regime comparison on your numbers",
      desc: "Liability computed under both regimes on your actual income and deductions, with the working shown — repeated each year, because the answer moves as your circumstances do.",
    },
    {
      title: "Advance tax projection and scheduling",
      desc: `Liability projected across the year and instalments planned to ${s("advanceTaxInstalments")}, so you are not paying interest at ${s("advanceTaxShortfallInterest")} for a shortfall you could have seen coming.`,
    },
    {
      title: "Deduction and exemption review",
      desc: "What you are actually entitled to claim under your chosen regime, what you are claiming without support, and what you are entitled to and missing.",
    },
    {
      title: "Capital gains planning",
      desc: "Holding periods, loss set-off and the timing of a sale reviewed before the transaction, since almost nothing about a capital gain can be improved after the deed is signed.",
    },
    {
      title: "Salary structure review for employers",
      desc: "How a package is composed changes what it costs the employee, and it is decided at offer stage. We review structures for the employer and the effect on deduction under salary TDS.",
    },
    {
      title: "Business structure review",
      desc: "Whether a proprietorship, partnership, LLP or company is the appropriate form for the scale you are at now, taking the compliance cost of each into account, not just the rate.",
    },
    {
      title: "Presumptive taxation assessment",
      desc: `Whether the presumptive schemes under ${s("presumptiveTaxationSection")} are open to you and whether they are actually advantageous, including the audit consequence of declaring below the presumptive rate.`,
    },
    {
      title: "Written recommendation you can act on",
      desc: "The review ends in a written note setting out the options, what each one implies and what we recommend — not a conversation you have to reconstruct later.",
    },
  ],

  documents: [
    {
      group: "For an individual review",
      items: [
        "Last two years' returns with their computations",
        "Salary slips and the current year's projected package, for salaried clients",
        "Home loan statement showing principal and interest split",
        "Rent paid and the landlord's PAN, where house rent allowance is in play",
        "Details of existing investments, insurance and retirement contributions",
        "Bank and broker statements for interest, dividend and capital gains",
      ],
    },
    {
      group: "For a business review",
      items: [
        "Financial statements for the last two years, with the audit report where one applies",
        "Current year's management accounts or trial balance to date",
        "GST returns filed for the year, for turnover context",
        "Partnership deed, LLP agreement or memorandum and articles, as applicable",
        "Details of loans, directors' or partners' remuneration and related party transactions",
        "Fixed asset register, with additions planned for the year",
      ],
    },
    {
      group: "Where a transaction is planned",
      items: [
        "Purchase deed and improvement cost records for property being sold",
        "Contract notes and holding statements for shares and mutual funds",
        "Draft agreement or term sheet, where a sale or restructuring is being negotiated",
        "Details of losses carried forward from earlier years",
      ],
    },
  ],

  documentsNote:
    "The most useful thing you can send is early, not complete. A review run in the first half of the year can change decisions; the same review run in March can only describe them. Send what you have and we will tell you what is missing.",

  process: [
    {
      step: 1,
      title: "Understand the position",
      desc: "We read your last two years' filings and your current-year position, so the advice starts from what you have actually been doing rather than from a template.",
      duration: t("itrDocumentReview"),
    },
    {
      step: 2,
      title: "Model the options",
      desc: "Both regimes computed, advance tax projected, and any planned transaction modelled for its tax effect — as numbers, side by side.",
      duration: t("taxPlanningReviewSession"),
    },
    {
      step: 3,
      title: "Discuss and decide",
      desc: "We take you through what each option means, including the non-tax consequences. The decision is yours; our job is that you make it knowing the cost of each.",
      duration: "One session",
    },
    {
      step: 4,
      title: "Written recommendation",
      desc: "A note recording the options, the recommendation and the actions with their deadlines — so nothing depends on either side remembering the conversation.",
      duration: t("taxPlanningReviewSession"),
    },
    {
      step: 5,
      title: "Implement and review through the year",
      desc: `Advance tax paid to schedule, decisions revisited when your circumstances change, and the position confirmed before the ${s("itrDueDateIndividuals")} filing season rather than during it.`,
      duration: "Through the year",
    },
  ],

  timeline: [
    { stage: "Advance tax instalments", days: s("advanceTaxInstalments") },
    { stage: "Interest if advance tax falls short", days: s("advanceTaxShortfallInterest") },
    { stage: "Best window for planning to change anything", days: "First half of the tax year" },
    { stage: "Return due date — salaried and simple income", days: s("itrDueDateIndividuals") },
    { stage: "Return due date — audit cases", days: s("itrDueDateAudit") },
  ],

  fees: null,

  faqs: [
    {
      q: "Which regime should I choose?",
      a: `It depends on your numbers, and the honest answer is that nobody can tell you without them. The new regime runs ${s("newRegimeSlabs")}; the old one keeps the deductions the new one gives up. Broadly the old regime can still win where a home loan, rent and long-standing investments stack up. We compute both and show you the figures.`,
    },
    {
      q: "Is it true the new regime means no tax at all for most salaried people?",
      a: `Under the new regime, ${s("rebateSection")} gives a rebate of ${s("rebateNewRegime")}. Two caveats decide whether it applies to you: that is taxable income after the standard deduction, and the rebate does not extend to income taxed at special rates, such as capital gains. Both are routinely missed, and both change the answer.`,
    },
    {
      q: "Can I change regime every year?",
      a: "The flexibility differs between salaried individuals and those with business income, and choosing a regime with business income has consequences for later years. This is exactly the sort of point worth confirming for your own case before you commit, rather than after a return has been filed on the assumption.",
    },
    {
      q: "When should tax planning happen?",
      a: "Early in the year, while decisions are still open. By March the only remaining lever is usually a last-minute investment, which is the weakest form of planning and often a poor investment decision as well. Structure, timing and advance tax all have to be handled while there is a year left to run.",
    },
    {
      q: "What happens if I underpay advance tax?",
      a: `Interest at ${s("advanceTaxShortfallInterest")} under Section 424, the successor to Section 234B. The instalment schedule is ${s("advanceTaxInstalments")}. For anyone with variable income the practical answer is to project quarterly rather than annually, because the interest accrues on the shortfall at each stage, not just at year end.`,
    },
    {
      q: "Would incorporating a company save me tax?",
      a: "Sometimes, and sometimes it costs more than it saves once audit, filing and ROC compliance are counted. The rate is only one input; how you take money out of the company matters as much. We look at the full picture for your scale rather than comparing headline rates.",
    },
    {
      q: "Do you recommend specific investments?",
      a: "No. We tell you the tax effect of a category of investment and how it interacts with your regime choice, so you can decide with your financial adviser. Recommending products is regulated advice and a different service from tax planning — treat anyone offering both as one thing with caution.",
    },
    {
      q: "Is tax planning the same as tax avoidance?",
      a: "No. Planning means arranging genuine affairs to use reliefs the law provides — choosing a regime, timing a sale, structuring a business. Arrangements that exist only to create a tax result are a different thing and attract anti-avoidance scrutiny. We work on the first side of that line and will say so when a suggestion crosses it.",
    },
  ],

  related: ["itr-filing", "tds-compliance", "personal-finance"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "incomeTaxAct2025Commencement",
      "taxYearConcept",
      "newRegimeSlabs",
      "oldRegimeSlabs",
      "standardDeductionNewRegime",
      "standardDeductionOldRegime",
      "rebateSection",
      "rebateNewRegime",
      "advanceTaxInstalments",
      "advanceTaxShortfallInterest",
      "presumptiveTaxationSection",
      "itrDueDateIndividuals",
      "itrDueDateAudit",
    ],
    notes:
      "Confirm before publishing: (1) the slab tables for BOTH regimes against the Finance Act in force for the current tax year — these change more often than anything else on the site; (2) both standard deduction figures; (3) the rebate amount and, critically, that this page's two caveats on it are correctly stated; (4) the advance tax instalment schedule, which carries a CONFIRM note in statutory.js from an earlier phase and has not been re-verified against the 2025 Act's own numbering. Also confirm the page reads as comparison rather than personalised financial advice — it deliberately names no investment product, gives no worked example and quantifies no saving, and that restraint should survive review. The regime-switching FAQ deliberately does not state the rule; if the CA wants it stated, it needs a statutory key.",
  },
};
