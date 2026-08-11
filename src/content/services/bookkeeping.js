import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Low statutory density by design — bookkeeping is mostly a service description,
// not a legal obligation with thresholds. The one hard fact (books retention)
// is worth including because it answers a real question: "how long do I need
// to keep this?"

export default {
  slug: "bookkeeping",
  category: "accounting-audit",
  title: "Bookkeeping & Accounting",
  h1: "Bookkeeping & Accounting Services in Salem, Tamil Nadu",

  meta: {
    title: "Bookkeeping & Accounting Services in Salem | ThinkOrange",
    description:
      "Monthly bookkeeping, reconciliation and management reporting in Tally Prime or Zoho Books. Salem, Tamil Nadu, for clients across India.",
    keywords: [
      "bookkeeping services salem",
      "accounting services tamil nadu",
      "monthly bookkeeping outsourcing",
      "tally zoho books accounting",
      "bank reconciliation service",
    ],
  },

  lede:
    "Monthly bookkeeping, ledger maintenance and bank reconciliation — in Tally Prime, Zoho Books, or whatever system you already run.",

  overview: [
    `Accurate books are the foundation every other compliance activity sits on. A GST return, an income tax filing, an audit, a loan application — all of them are only as reliable as the books behind them. Get bookkeeping wrong and every downstream filing inherits the error, usually discovered at the worst possible moment.`,

    `We maintain books in Tally Prime or Zoho Books, or work inside whatever system you already use, and close them monthly rather than leaving reconciliation for year-end. That includes bank reconciliation, accounts payable and receivable tracking, and management reports that tell you what is actually happening in the business, not just what was invoiced.`,

    `Companies must retain books of account for ${s("booksRetentionCompanies")} under the Companies Act — a period worth knowing before you archive or discard anything. The equivalent income tax retention period is currently being re-confirmed given the transition to the new Income Tax Act, so we advise on that separately rather than stating a figure that may already be out of date.`,
  ],

  whoNeedsThis: [
    "You are running a business and need books maintained properly rather than reconstructed at year-end from bank statements.",
    "You want monthly management reports — cash position, receivables ageing, payables due — rather than only annual accounts.",
    "Your books need to be GST and income-tax filing-ready every period, not caught up in a rush before a deadline.",
    "You are switching accounting systems, or need an existing Tally or Zoho Books file cleaned up and reconciled.",
    "You need accounts prepared for a loan application, an audit, or investor due diligence.",
    "You are setting up a new proprietorship, firm or company and want books established correctly from day one.",
  ],

  included: [
    {
      title: "Monthly bookkeeping",
      desc: "Sales, purchases, expenses and journal entries recorded and classified correctly, closed every month rather than in arrears.",
    },
    {
      title: "Bank reconciliation",
      desc: "Every bank and cash account reconciled to the books each period, so discrepancies are caught while they are still recent enough to trace.",
    },
    {
      title: "Accounts payable and receivable management",
      desc: "Who owes you, who you owe, and how overdue each is — tracked as a live position, not discovered when someone asks.",
    },
    {
      title: "Financial statement preparation",
      desc: "Monthly, quarterly and annual statements — profit and loss, balance sheet and cash flow — prepared on a consistent basis you can compare period to period.",
    },
    {
      title: "System setup and migration",
      desc: "Tally Prime or Zoho Books set up correctly from the start, or an existing file audited and corrected if it was not.",
    },
    {
      title: "Management reporting",
      desc: "Reports built around what you actually need to see to run the business, not a generic template.",
    },
    {
      title: "Filing-ready handover",
      desc: "Books kept current enough that GST returns, TDS and annual filings are never waiting on bookkeeping to catch up.",
    },
  ],

  documents: [
    {
      group: "To get started",
      items: [
        "Bank statements for the period being taken on",
        "Sales invoices and purchase bills",
        "Existing accounting file, if any — Tally backup, Zoho Books export, or spreadsheets",
        "Payroll records, if you run one",
        "Loan or lease documents affecting the balance sheet",
      ],
    },
    {
      group: "Ongoing, each period",
      items: [
        "Bank and credit card statements",
        "Sales and purchase invoices for the period",
        "Expense receipts and vouchers",
        "Any new loan, asset purchase or disposal",
      ],
    },
  ],

  documentsNote:
    "The single biggest time cost in taking over an existing set of books is an unreconciled bank account from months earlier. If you have one, flag it upfront rather than partway through — it changes how the first engagement is scoped.",

  process: [
    {
      step: 1,
      title: "Books and systems review",
      desc: "We look at what exists — a live Tally file, a Zoho account, or nothing yet — and agree what needs fixing before ongoing bookkeeping starts.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "System setup or migration",
      desc: "Chart of accounts, opening balances and any historical catch-up handled before the first live month.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Monthly close",
      desc: "Each month's transactions recorded, reconciled and closed, with management reports issued.",
      duration: t("bookkeepingMonthlyClose"),
    },
    {
      step: 4,
      title: "Filing handover",
      desc: "Closed books handed to whoever files your GST returns and annual accounts — us, or your existing team — with nothing left to reconstruct.",
      duration: "Ongoing, monthly",
    },
  ],

  timeline: [
    { stage: "Books and systems review", days: t("incorporationNameStage") },
    { stage: "Setup or migration", days: t("incorporationDocPrep") },
    { stage: "Monthly close, ongoing", days: t("bookkeepingMonthlyClose") },
    { stage: "Books of account retention (companies)", days: s("booksRetentionCompanies") },
  ],

  fees: null,

  faqs: [
    {
      q: "Do you work with our existing Tally or Zoho Books file?",
      a: "Yes, and it is usually simpler than migrating. We review what is there first — most existing files have a few unreconciled periods that need clearing before ongoing bookkeeping can run cleanly on top of them.",
    },
    {
      q: "How long do we need to keep our books of account?",
      a: `Under the Companies Act, ${s("booksRetentionCompanies")}. The income tax retention period is separate and is currently being re-confirmed given the transition to the new Income Tax Act, so we will advise on that figure directly rather than risk stating one that has changed.`,
    },
    {
      q: "What is the difference between bookkeeping and an audit?",
      a: "Bookkeeping records and reconciles transactions as they happen. An audit independently examines books that already exist and expresses an opinion on whether they are accurate. You need bookkeeping continuously; an audit only where required or requested — and an audit is much harder to do well on books that were not kept properly in the first place.",
    },
    {
      q: "Can you prepare accounts for a bank loan or investor?",
      a: "Yes. Lenders and investors want to see clean, reconciled books and consistent statements, not a set produced specifically for the application. Where your books are already maintained on a monthly basis, this is a quick extract rather than a separate project.",
    },
    {
      q: "Do you handle payroll as part of bookkeeping?",
      a: "Payroll processing sits alongside bookkeeping rather than inside it by default, but the two need to reconcile with each other, so we coordinate closely where you run payroll separately. Ask us directly about your specific setup.",
    },
    {
      q: "What if our books have not been touched in over a year?",
      a: "This is common and recoverable, but it changes the scope of the first engagement — expect a catch-up phase before monthly bookkeeping begins properly. Tell us how far behind things are upfront so we can quote the clean-up realistically rather than discovering it partway through.",
    },
  ],

  related: ["internal-audit", "gst-return-filing", "itr-filing"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["booksRetentionCompanies"],
    notes:
      "Deliberately does not state an income-tax books-retention period — see BLOCKERS.md §1. The FAQ on payroll deliberately avoids specifics until the service scope is confirmed. Low statutory density is intentional; confirm nothing here implies a filing deadline that belongs on the GST or ITR pages instead.",
  },
};
