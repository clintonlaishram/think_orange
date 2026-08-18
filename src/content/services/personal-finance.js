import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js, tonally closest to
// business-loan.js (facilitation/documentation, not lending or advisory in
// the regulated sense).
//
// Angle: this is a SERVICE-DESCRIPTION page for individuals, not personalised
// financial or investment advice. ThinkOrange is not a bank, NBFC, or SEBI-
// registered investment adviser — the page describes what the firm helps
// with (documentation, structuring, coordination) and how, never a specific
// recommendation ("invest in X", "your score will hit Y", "take this loan").
// This leaf is deliberately lighter on statutory citation than most others on
// the site — there is no single "Personal Finance Act" to cite against. The
// two facts that ARE genuinely researchable (the four RBI-licensed credit
// bureaus, and the 300–900 score scale they use) are sourced via s(); nothing
// else statutory-shaped is forced in artificially.

export default {
  slug: "personal-finance",
  category: "tenders-finance",
  title: "Personal Finance & Debt Management",
  h1: "Personal Finance & Debt Management Support in Salem, Tamil Nadu",

  meta: {
    title: "Personal Finance & Debt Management in Salem | ThinkOrange Consulting",
    description:
      "Personal loan and mortgage documentation, credit report review and structured debt and budgeting guidance for individuals. Salem, Tamil Nadu.",
    keywords: [
      "personal loan documentation salem",
      "mortgage documentation support tamil nadu",
      "debt management consultant salem",
      "personal finance planning salem",
      "credit report review india",
    ],
  },

  lede:
    "Personal loan and mortgage paperwork prepared properly, your credit report reviewed honestly, and a structured plan for existing debt — so your finances are organised, not guessed at.",

  overview: [
    "A personal loan or a home loan application is judged on much the same kind of paperwork a business loan is — income proof, bank statements, existing obligations and a credit report that tells the lender who you are as a borrower. We are not a bank or NBFC and we do not lend money or tell you where to invest; what we do is prepare that paperwork properly and give you an honest, organised picture of where your finances actually stand.",

    `India has ${s("rbiCreditInformationCompanies")} RBI-licensed credit information companies — TransUnion CIBIL, Experian, Equifax and CRIF High Mark — each scoring borrowers on a ${s("creditScoreRange")} scale. Lenders pull from whichever bureau they use, and the reports do not always agree with each other. We review your credit report before you apply and flag anything that looks wrong or outdated, rather than promising to raise your score, which nobody honestly can.`,

    "Debt management here means structure, not negotiation on your behalf: listing every loan, card and outstanding due against its actual interest cost, ordering repayment so the most expensive debt gets tackled first, and building a monthly budget around your real income rather than a template. Most households juggling a home loan, a vehicle loan and a couple of cards are not in trouble because of any one debt — they are paying more in interest than they need to simply because nobody has laid the whole picture out in one place.",
  ],

  whoNeedsThis: [
    "You're applying for a personal loan or a home loan and want the application, income proof and bank statements assembled and checked before you submit them.",
    "You've been declined or offered a smaller loan than you expected and want to understand why before you try again.",
    "You're carrying more than one loan or credit card and want a clear, ordered picture of what you owe and what it's actually costing you.",
    "You want your credit report reviewed for errors or outdated entries that could be dragging your score down without your knowledge.",
    "You're planning a large purchase — a home, a vehicle — and want your finances organised and your documentation ready before you start looking.",
    "You want a realistic monthly budget built around your actual income and existing obligations, not a generic spreadsheet template.",
  ],

  included: [
    {
      title: "Personal loan and mortgage documentation",
      desc: "Income proof, bank statements, KYC and the specific paperwork your lender's application actually asks for — assembled and checked before you submit, not after a query comes back.",
    },
    {
      title: "Credit report review",
      desc: `We go through your report from whichever of the ${s("rbiCreditInformationCompanies")} bureaus your lender uses and flag anything that looks wrong, outdated or worth formally disputing.`,
    },
    {
      title: "Debt inventory and structuring",
      desc: "Every loan, card and outstanding due listed against its real interest cost, so you can see at a glance which debt is actually the expensive one.",
    },
    {
      title: "Repayment planning",
      desc: "A realistic order to clear debts in, built against your actual income and obligations rather than a generic rule of thumb.",
    },
    {
      title: "Budgeting support",
      desc: "A monthly budget built around what you actually earn and owe, not a spreadsheet template you're left to adapt yourself.",
    },
    {
      title: "Lender coordination",
      desc: "We stay in touch with the lender while your application is being processed, so a document query gets answered promptly rather than sitting unread.",
    },
  ],

  documents: [
    {
      group: "Personal loan application",
      items: [
        "PAN and Aadhaar",
        "Latest salary slips — the exact number of months is set by the lender — or recent income tax returns if self-employed",
        "Recent bank statements for your salary or primary account, however many months the specific lender asks for",
        "Address proof",
        "Passport-sized photograph",
      ],
    },
    {
      group: "Home loan or mortgage, additionally",
      items: [
        "Sale agreement or allotment letter for the property",
        "Title deed and encumbrance certificate",
        "Approved building plan, where applicable",
        "Latest property tax receipt",
      ],
    },
    {
      group: "Existing debt review",
      items: [
        "Loan statements or sanction letters for every existing loan",
        "Recent credit card statements for every card you hold",
        "A copy of your credit report, if you already have one",
      ],
    },
  ],

  documentsNote:
    "Self-employed applicants are usually asked for more — profit and loss statements, GST returns where applicable — since income can't be verified against a salary slip. We'll confirm exactly what your specific lender wants once we know which one you're approaching.",

  process: [
    {
      step: 1,
      title: "Financial review",
      desc: "We go through your income, existing obligations and, where relevant, your credit report to understand where you actually stand before any document work starts.",
      duration: t("personalFinanceReview"),
    },
    {
      step: 2,
      title: "Documentation prepared",
      desc: "Income proof, bank statements and the rest of your lender's checklist assembled and checked for the mismatches that usually trigger a query.",
      duration: t("personalFinanceDocPrep"),
    },
    {
      step: 3,
      title: "Application submitted",
      desc: "The complete file goes to your chosen lender, with nothing missing that would bounce it back.",
      duration: "After preparation",
    },
    {
      step: 4,
      title: "Query handling",
      desc: "Any documentation query from the lender is answered as it comes up, rather than left to stall the file.",
      duration: "Lender dependent",
    },
    {
      step: 5,
      title: "Debt and budget plan, where requested",
      desc: "A structured repayment order and a monthly budget, built around your real numbers rather than a generic template.",
      duration: "Ongoing",
    },
  ],

  timeline: [
    { stage: "Financial review", days: t("personalFinanceReview") },
    { stage: "Documentation preparation", days: t("personalFinanceDocPrep") },
    { stage: "Lender processing", days: "Lender dependent" },
  ],

  fees: null,

  faqs: [
    {
      q: "Do you lend money or tell me what to invest in?",
      a: "No, and it's worth being clear about that. We are not a bank, NBFC or investment adviser. What we do is prepare your loan or mortgage documentation properly and help you organise and structure your existing finances — the lending decision and any investment choice are always yours to make.",
    },
    {
      q: "What is a credit score and how is it calculated in India?",
      a: `India has ${s("rbiCreditInformationCompanies")} RBI-licensed credit information companies — TransUnion CIBIL, Experian, Equifax and CRIF High Mark — each of which scores borrowers on a ${s("creditScoreRange")} scale using your repayment history and credit usage. Lenders don't all pull from the same bureau, so your score can read slightly differently depending on who's checking.`,
    },
    {
      q: "Can you guarantee my loan will be approved, or that my score will improve?",
      a: "No — be wary of anyone who claims they can. What proper documentation and an accurate credit report do is remove the reasons an application gets rejected or delayed on presentation rather than substance. The lender's own assessment of your creditworthiness is not something we can change, only present accurately.",
    },
    {
      q: "Do you negotiate with my lender or credit card company on my behalf?",
      a: "We coordinate with your lender while an application is being processed — chasing a query, clarifying a document — but we don't act as a settlement or negotiation agent with your existing creditors. Debt structuring here means organising what you owe and planning around it, not renegotiating it for you.",
    },
    {
      q: "How is this different from your business loan service?",
      a: "Business Loan & Financing covers CMA data, projections and lender coordination for a company or firm's own borrowing. This service is for you personally — a home loan, a personal loan, or your own household debt and budgeting — and the two are often used together where a promoter's personal finances sit alongside the business's.",
    },
    {
      q: "Do I need a good credit score already to use this service?",
      a: "No. A credit report review is often most useful precisely when your score is lower than you expected — it's where we find the errors, old defaults or utilisation issues that are actually holding it down, rather than something wrong with your history that can't be explained.",
    },
    {
      q: "Is my financial information kept confidential?",
      a: "Yes. Your income, bank statements, loan details and credit report are used only to prepare your application and plan, and shared only with the specific lender you're applying to — never with anyone else without your knowledge.",
    },
    {
      q: "What if I'm self-employed rather than salaried?",
      a: "The documentation shifts to income tax returns, profit and loss statements and bank statements over a longer period, since there's no salary slip to verify against. It takes a little longer to assemble but it's a normal, well-understood file for most lenders.",
    },
  ],

  related: ["business-loan", "itr-filing", "bookkeeping"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["rbiCreditInformationCompanies", "creditScoreRange"],
    notes:
      "This page is deliberately light on statutory citation — there is no single Personal Finance Act to cite against, so most of the page describes the service (what's included, how the process works) rather than the law. The two cited facts (four RBI-licensed credit bureaus, 300–900 score scale) should be re-verified against RBI's current CIC list, since a bureau's licence status can change. Confirm the framing throughout reads as documentation/structuring facilitation, not investment advice or debt settlement/negotiation — the FAQ on negotiating with creditors is written to draw that line explicitly and should get a compliance read given SEBI investment-adviser and debt-settlement-adjacent regulatory sensitivities.",
  },
};
