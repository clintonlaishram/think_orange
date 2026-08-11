import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: this is advisory/facilitation, not lending — ThinkOrange is not a
// bank or NBFC and does not sanction credit. The page must never read as if
// approval is guaranteed; CGTMSE affects what the BANK can offer, not what
// ThinkOrange promises.

export default {
  slug: "business-loan",
  category: "loans-finance",
  title: "Business Loan & Financing",
  h1: "Business Loan & Financing Support in Salem, Tamil Nadu",

  meta: {
    title: "Business Loan Facilitation in Salem | ThinkOrange Consulting",
    description:
      "Financial statement preparation, CMA data and lender coordination for working capital and term loan applications. Salem, Tamil Nadu.",
    keywords: [
      "business loan consultant salem",
      "cma data preparation tamil nadu",
      "cgtmse collateral free loan",
      "msme loan facilitation",
      "working capital loan documentation",
    ],
  },

  lede:
    "Financial statements, projections and CMA data prepared properly, with lenders identified and the application coordinated — so your file is judged on the business, not the paperwork.",

  overview: [
    `A loan application is rarely rejected because the business is a bad risk. More often it is rejected, delayed or under-sanctioned because the financials presented do not let a credit officer see what they need to see — projections that do not tie back to actual performance, CMA data prepared inconsistently with the audited accounts, or a lender approached who was never going to fund this kind of business in the first place.`,

    `We do not lend money and we do not guarantee approval — no one honestly can. What we do is prepare the case properly: financial statements and projections that hold together, CMA data in the format banks actually expect, and a realistic view of which lenders and which schemes suit your situation before you spend weeks with the wrong one.`,

    `For collateral-free working capital, the Credit Guarantee Fund Trust for Micro and Small Enterprises scheme is worth understanding regardless of which bank you approach. It backs loans up to ${s("cgtmseLimit")}, with the trust covering ${s("cgtmseCoverage")} of the lender's loss on default — cover that is offered by the bank under the scheme, not something ThinkOrange arranges directly, but worth knowing about before you agree to pledge collateral you did not need to.`,
  ],

  whoNeedsThis: [
    "You need working capital or a term loan and want your financial case prepared properly before approaching a bank.",
    "A lender has asked for CMA data and you want it prepared consistently with your audited accounts, not as a separate exercise.",
    "You are a Micro or Small Enterprise that may qualify for collateral-free lending under the CGTMSE scheme.",
    "You have been declined or under-sanctioned by one lender and want a second application prepared properly rather than repeating the same mistake.",
    "You need a personal loan or mortgage application documented alongside your business financials.",
  ],

  included: [
    {
      title: "Financial statement preparation",
      desc: "Statements prepared or reviewed so they present the business accurately and consistently with what has actually been filed elsewhere — a mismatch with your GST or income tax filings is a fast way to lose credibility with a lender.",
    },
    {
      title: "CMA data preparation",
      desc: "Credit Monitoring Arrangement data prepared in the structure banks expect, built from your real numbers rather than reverse-engineered to a target.",
    },
    {
      title: "Business projections",
      desc: "Realistic projected cash flow and financials that a credit officer can defend internally, not optimistic figures that invite scrutiny.",
    },
    {
      title: "Lender identification",
      desc: "Which banks, NBFCs or schemes actually suit your size, sector and requirement, rather than a generic approach to whoever is nearest.",
    },
    {
      title: "CGTMSE and scheme eligibility",
      desc: "Whether collateral-free options under CGTMSE or other MSME schemes apply to your situation.",
    },
    {
      title: "Application coordination",
      desc: "Liaison with the lender through processing, so queries are answered promptly rather than sitting unanswered while a file goes cold.",
    },
    {
      title: "Personal loan and mortgage documentation",
      desc: "Supporting documentation assistance where personal borrowing needs to be presented alongside business financials.",
    },
  ],

  documents: [
    {
      group: "Financial",
      items: [
        "Audited financial statements for the last two to three years",
        "GST returns for the last twelve months",
        "Income tax returns for the last two to three years",
        "Bank statements for the last six to twelve months, all operating accounts",
      ],
    },
    {
      group: "Business",
      items: [
        "Certificate of incorporation or registration, and PAN",
        "Udyam registration, where applicable",
        "Details of existing loans or credit facilities",
        "Project report or business plan, for a new facility or expansion",
      ],
    },
    {
      group: "Security and personal, where relevant",
      items: [
        "Property or asset documents, where collateral is being offered",
        "KYC and financial documents of proprietors, partners or directors",
        "Guarantor documents, where a personal guarantee is required",
      ],
    },
  ],

  documentsNote:
    "Bank statements and GST returns are cross-checked by lenders against your declared turnover as a matter of course. Reconcile these yourself before submission — a mismatch a credit officer finds themselves is far more damaging than the same mismatch explained upfront.",

  process: [
    {
      step: 1,
      title: "Requirement and eligibility review",
      desc: "What you actually need the facility for, how much, and which lenders or schemes realistically fit before any document work starts.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "CMA data and projections prepared",
      desc: "Financials, CMA data and projections built consistently with your filed accounts and returns.",
      duration: t("loanCmaPrep"),
    },
    {
      step: 3,
      title: "Lender approach",
      desc: "The application submitted to the identified lender or lenders, with the full document set.",
      duration: "After preparation",
    },
    {
      step: 4,
      title: "Processing and query handling",
      desc: "Queries from the lender's credit team answered as they arise, rather than left to accumulate.",
      duration: "Lender dependent",
    },
    {
      step: 5,
      title: "Sanction and documentation",
      desc: "Sanction letter and loan documentation reviewed before you sign, so the terms match what was actually discussed.",
      duration: "On sanction",
    },
  ],

  timeline: [
    { stage: "Requirement and eligibility review", days: t("incorporationNameStage") },
    { stage: "CMA data and projections", days: t("loanCmaPrep") },
    { stage: "Lender processing", days: "Lender dependent" },
  ],

  fees: null,

  faqs: [
    {
      q: "Do you lend money directly, or arrange the loan?",
      a: "Neither, and it is worth being clear about this. We are not a bank or NBFC and do not sanction credit. What we provide is preparation and facilitation — financial statements, CMA data, projections and lender coordination — so your application is judged fairly. The lending decision is always the bank's or NBFC's.",
    },
    {
      q: "What is CMA data and why does it matter so much?",
      a: "Credit Monitoring Arrangement data is a standardised financial presentation banks use to assess and monitor a borrower. Lenders read it closely, and if it does not tie back cleanly to your audited accounts and tax filings, it raises questions before anyone even looks at whether your business is a good risk.",
    },
    {
      q: "What is CGTMSE and can I get a loan without collateral?",
      a: `The Credit Guarantee Fund Trust for Micro and Small Enterprises backs eligible loans up to ${s("cgtmseLimit")} without collateral, with the trust covering ${s("cgtmseCoverage")} of the lender's loss if you default. Whether a specific bank offers it under the scheme, and on what terms, is confirmed with that lender — it is not automatic on every loan.`,
    },
    {
      q: "Can you guarantee my loan will be approved?",
      a: "No, and be wary of anyone who says they can. What proper preparation does is remove the reasons an application gets rejected on presentation rather than substance — inconsistent figures, missing documents, an unrealistic projection. The underlying creditworthiness of the business is not something we can change, only present accurately.",
    },
    {
      q: "How far back do my financials need to go?",
      a: "Most lenders want two to three years of audited financials and tax returns, plus recent bank statements, though this varies by loan size and lender. A newer business without that history is not disqualified, but the application is built differently, usually leaning more heavily on projections and the promoter's own track record.",
    },
    {
      q: "Do you help with personal loans too?",
      a: "Yes, particularly where personal borrowing needs to be presented alongside business financials — a promoter guarantee, or a mortgage taken partly against business income. Ask us directly about your specific situation.",
    },
  ],

  related: ["msme-udyam", "bookkeeping", "tender-documentation"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["cgtmseLimit", "cgtmseCoverage"],
    notes:
      "This page describes ThinkOrange's role as facilitation, not lending — confirm this framing is legally accurate and does not inadvertently suggest ThinkOrange acts as a loan agent requiring separate regulatory registration. Confirm the CGTMSE annual guarantee fee is not stated anywhere as a client-facing cost, since it is charged to the lender, not the borrower directly, and stating it without that context would mislead.",
  },
};
