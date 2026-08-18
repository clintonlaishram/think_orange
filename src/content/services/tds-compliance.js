import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written 19-08-2026, clearing BLOCKERS.md §1 for this leaf.
//
// This is the leaf the blocker hit hardest. Under the 1961 Act, TDS lived
// across 60-plus sections (192 to 194T) and four form numbers every Indian
// business could recite: 24Q, 26Q, 27Q, 27EQ. From 01-04-2026 all of that is
// gone: two charging sections (392 salary, 393 everything else, the latter
// using payment CODES rather than separate sections), one compliance section
// (397), and renumbered forms — 138, 140, 144, 143 for the statements, and
// 130 / 131 for the certificates people still call Form 16 and 16A.
//
// A page written from recall would have been wrong in every form number and
// every section reference while looking completely confident. Everything
// below is interpolated from statutory.js, researched 19-08-2026.
//
// DELIBERATE OMISSIONS, because they were not confirmable to the standard
// this file requires: individual TDS rates and threshold amounts per payment
// type, and the payment-code numbers under Section 393. Rates carried over
// substantively unchanged, but "substantively" is not good enough to publish
// a rate table a client might deduct on. The page says what the mechanism is
// and that the rate depends on the payment; it never asserts a percentage.
// ============================================================================

export default {
  slug: "tds-compliance",
  category: "income-tax",
  title: "TDS Compliance",
  h1: "TDS Compliance and Return Filing in Salem, Tamil Nadu",

  meta: {
    title: "TDS Compliance & Quarterly Return Filing in Salem | ThinkOrange",
    description:
      "TDS deduction, deposit and quarterly statements under the Income Tax Act 2025 — Forms 138, 140 and 144, certificates, corrections and default notices.",
    keywords: [
      "tds return filing salem",
      "tds compliance consultant tamil nadu",
      "form 138 tds return",
      "tds return filing income tax act 2025",
      "tan registration salem",
    ],
  },

  lede:
    `Monthly deduction and deposit, quarterly statements and certificates handled on one calendar — under the renumbered sections and forms that took effect on ${s("incomeTaxAct2025Commencement")}.`,

  overview: [
    `Tax deducted at source makes you a collecting agent for the government. If you pay salaries, rent, contractor bills, professional fees, commission or interest above the prescribed limits, you must deduct tax before paying, deposit it by the due date, report it in a quarterly statement and issue a certificate to the person you deducted from. Four separate obligations, each with its own deadline, and the penalty structure treats them separately too.`,

    `Everything about how this is cited changed on ${s("incomeTaxAct2025Commencement")}. The Income Tax Act, 2025 collapsed the old maze of sections into two: ${s("tdsSalarySection")} for salary and ${s("tdsNonSalarySection")} for every other payment, the latter using payment codes in a single table instead of a separate section per payment type. Compliance — your TAN, the quarterly statements and the certificates — sits under ${s("tdsComplianceSection")}. The forms were renumbered with it: the salary statement is now ${s("tdsFormSalaryStatement")}, resident non-salary is ${s("tdsFormNonSalaryStatement")}, and payments to non-residents are ${s("tdsFormNonResidentStatement")}.`,

    `The cost of getting it wrong falls on you, not on the person you paid. Deposit late and interest runs at ${s("tdsLateDepositInterest")}. File the statement late and the fee is ${s("tdsLateStatementFee")} under Section 427. Worse, a deductee whose credit does not appear in their Form 26AS cannot claim it — so a filing error of yours becomes their problem, and then your dispute.`,
  ],

  whoNeedsThis: [
    "You employ staff on salaries above the taxable limit and must deduct tax each month.",
    "You pay contractors, professionals, commission agents or brokers on business account.",
    "You pay rent for premises or equipment above the prescribed threshold.",
    "You have received a default notice or a short-deduction demand from the TDS reconciliation system.",
    "You need a TAN, or you hold one and have never filed against it.",
    "Your deductees are telling you the credit is not showing in their Form 26AS.",
  ],

  included: [
    {
      title: "TAN registration and portal setup",
      desc: `A Tax Deduction Account Number is required before you can deposit anything under ${s("tdsComplianceSection")}. We obtain it and set up your access to the reporting portal.`,
    },
    {
      title: "Applicability and rate determination",
      desc: `Which of your payments attract deduction, at what rate, and under which payment code of ${s("tdsNonSalarySection")} — decided per payment type rather than applied as one blanket rate.`,
    },
    {
      title: "Monthly computation and deposit",
      desc: `Deduction computed on the month's payments and deposited by ${s("tdsPaymentDue")}, with the challan preserved against the statement.`,
    },
    {
      title: "Salary TDS computation for employees",
      desc: `Each employee's liability projected across the year under ${s("tdsSalarySection")}, with their declarations and regime choice taken into account so deduction is even rather than lumped into March.`,
    },
    {
      title: "Quarterly statement filing",
      desc: `${s("tdsFormSalaryStatement")}, ${s("tdsFormNonSalaryStatement")} and ${s("tdsFormNonResidentStatement")} prepared, validated and filed by ${s("tdsQuarterlyStatementDues")}.`,
    },
    {
      title: "Certificate generation and issue",
      desc: `${s("tdsCertificateSalary")} for salary and ${s("tdsCertificateNonSalary")} for other payments, downloaded and issued within ${s("tdsCertificateIssueWindow")}.`,
    },
    {
      title: "Correction statements",
      desc: "Wrong PAN, wrong challan, wrong section or a missing deductee — corrected by revised statement so the credit reaches the right person's account.",
    },
    {
      title: "Default and demand resolution",
      desc: "Short deduction, short payment, late payment and late filing demands reconciled against your challans and answered, rather than left accumulating interest.",
    },
  ],

  documents: [
    {
      group: "To register or take over compliance",
      items: [
        "PAN of the business and of the authorised signatory",
        "TAN, if you already hold one, along with portal credentials",
        "Certificate of incorporation, partnership deed or proprietorship proof",
        "Digital Signature Certificate of the authorised signatory, where the entity type requires one",
        "Any past statements filed and default notices received",
      ],
    },
    {
      group: "Every month",
      items: [
        "Payment register or ledger for the month, by payee and payment type",
        "PAN of every payee — a missing or invalid PAN triggers deduction at a higher rate",
        "Invoices for contractor, professional and commission payments",
        "Rent agreements for premises and equipment",
        "Challans for tax already deposited, if any deposit was made without us",
      ],
    },
    {
      group: "For salary deduction",
      items: [
        "Salary structure for each employee, with allowances broken out",
        "Each employee's regime choice for the year, in writing",
        "Investment and rent declarations, and proof at year end where the old regime is chosen",
        "Details of previous employment during the year, for employees who joined mid-year",
      ],
    },
    {
      group: "For non-resident payments",
      items: [
        "Tax residency certificate of the payee",
        "Form 10F and the no permanent establishment declaration, where relied on",
        "The agreement or invoice describing the nature of the payment",
        "Details of any lower or nil deduction certificate obtained",
      ],
    },
  ],

  documentsNote:
    "Send the payee's PAN before the payment goes out, not after. Deducting at the higher no-PAN rate is correctable only with difficulty, and recovering the excess from a vendor who has already been paid is a commercial conversation rather than a compliance one.",

  process: [
    {
      step: 1,
      title: "Map your payments",
      desc: `We go through your payment types once and record which attract deduction, at what rate, and under which code of ${s("tdsNonSalarySection")}. That map then runs every month without being re-decided.`,
      duration: "One-time setup",
    },
    {
      step: 2,
      title: "Monthly deduction and deposit",
      desc: `You send the month's payment data by the agreed cut-off; we compute, deduct and deposit by ${s("tdsPaymentDue")}, and file the challan against your records.`,
      duration: t("tdsMonthlyCutoff"),
    },
    {
      step: 3,
      title: "Quarterly statement",
      desc: "Deductee-wise data validated against the challans, mismatches resolved before filing rather than after, and the statement filed within the quarter's window.",
      duration: t("tdsQuarterlyStatementPrep"),
    },
    {
      step: 4,
      title: "Certificates to deductees",
      desc: `Certificates downloaded and issued within ${s("tdsCertificateIssueWindow")}, so your employees and vendors can claim the credit in their own returns.`,
      duration: s("tdsCertificateIssueWindow"),
    },
    {
      step: 5,
      title: "Defaults and corrections",
      desc: "Any default raised after processing is reconciled against the challan data and answered by correction statement or reply, with the demand closed rather than parked.",
      duration: "As raised",
    },
  ],

  timeline: [
    { stage: "Deposit of tax deducted", days: s("tdsPaymentDue") },
    { stage: "Quarterly statement filing (Q1 to Q4)", days: s("tdsQuarterlyStatementDues") },
    { stage: "Issue of certificates to deductees", days: s("tdsCertificateIssueWindow") },
    { stage: "Interest on late deposit", days: s("tdsLateDepositInterest") },
    { stage: "Late fee on a statement filed after its due date", days: s("tdsLateStatementFee") },
  ],

  faqs: [
    {
      q: "Form 24Q and 26Q have disappeared from the portal. What replaced them?",
      a: `The forms were renumbered when the Income Tax Act 2025 took effect on ${s("incomeTaxAct2025Commencement")}. Salary statements moved from 24Q to ${s("tdsFormSalaryStatement")}, resident non-salary from 26Q to ${s("tdsFormNonSalaryStatement")}, non-resident payments from 27Q to ${s("tdsFormNonResidentStatement")}, and the TCS statement from 27EQ to ${s("tcsFormStatement")}. The due dates did not move — ${s("tdsQuarterlyStatementDues")}.`,
    },
    {
      q: "Which section do I deduct under now?",
      a: `Two, instead of the sixty-odd there used to be. ${s("tdsSalarySection")} covers salary. ${s("tdsNonSalarySection")} covers everything else — contractors, professionals, rent, commission, e-commerce and the rest — through one table of payment codes. What you are deducting for now shows up as a code rather than as its own section number.`,
    },
    {
      q: "What does it cost me if I deposit or file late?",
      a: `Late deposit runs interest at ${s("tdsLateDepositInterest")}, calculated from the date you deducted. A statement filed late attracts ${s("tdsLateStatementFee")} under Section 427 — the cap means the fee cannot exceed the tax itself, but a small deduction filed months late can reach that cap easily.`,
    },
    {
      q: "My vendor says the credit is not showing in their Form 26AS. What went wrong?",
      a: "Almost always the deductee data in the quarterly statement: a wrong PAN, the wrong quarter, or a challan that does not match. The tax has usually been paid — it just landed unattributed. A correction statement fixes it, and the credit appears against the right PAN after processing.",
    },
    {
      q: "Do I need a TAN if I only make one or two payments a year?",
      a: `Yes, if any of those payments attract deduction. TAN is required to deposit deducted tax under ${s("tdsComplianceSection")}, and it is separate from your PAN. Holding a TAN and never filing against it also generates its own notices, so it should be either used properly or surrendered.`,
    },
    {
      q: "What if the payee gives me a lower deduction certificate?",
      a: "Then you deduct at the certificate's rate for the payments and period it covers, and report it in the statement so the reduced rate reconciles. Keep the certificate on file — it is the only defence against a short-deduction demand raised later on those payments.",
    },
    {
      q: "Can I recover TDS I forgot to deduct from a vendor I have already paid?",
      a: "Commercially, that is a negotiation. Legally, the liability sits with you as the deductor: you owe the tax with interest whether or not the vendor reimburses you. It is why the payment map matters — deciding deduction before the payment goes out is much cheaper than deciding after.",
    },
    {
      q: "We deduct for our staff. Does the regime they choose change our deduction?",
      a: `Yes. Deduction under ${s("tdsSalarySection")} is computed on the employee's projected annual liability, and that depends on whether they are on the new or old regime. Collect the choice in writing at the start of the year, or the deduction is either short all year or lumped into March.`,
    },
  ],

  fees: null,

  related: ["itr-filing", "payroll-processing-returns", "notices-assessments"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "incomeTaxAct2025Commencement",
      "tdsSalarySection",
      "tdsNonSalarySection",
      "tdsComplianceSection",
      "tdsFormSalaryStatement",
      "tdsFormNonSalaryStatement",
      "tdsFormNonResidentStatement",
      "tcsFormStatement",
      "tdsCertificateSalary",
      "tdsCertificateNonSalary",
      "tdsQuarterlyStatementDues",
      "tdsCertificateIssueWindow",
      "tdsPaymentDue",
      "tdsLateDepositInterest",
      "tdsLateStatementFee",
    ],
    notes:
      "Confirm before publishing: (1) every renumbered form (138 / 140 / 144 / 143 and certificates 130 / 131) against the Income-tax Rules 2026 as notified, not against a secondary summary; (2) that the deposit date and quarterly statement dates genuinely carried over unchanged; (3) the certificate issue window of 15 days from the statement due date; (4) the interest rate for late DEDUCTION, which this page deliberately does not state — only late deposit is stated. No rate table and no threshold amounts appear anywhere on this page by design; if the CA wants them, they go into statutory.js first, per payment code.",
  },
};
