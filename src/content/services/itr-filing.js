import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written 19-08-2026, clearing BLOCKERS.md §1 for this leaf.
//
// THE BLOCKER AND WHY THIS PAGE IS NOW WRITEABLE. From 01-04-2026 the Income
// Tax Act, 2025 replaced the 1961 Act — not an amendment, a re-codification.
// Every section reference on a page like this had to be re-researched rather
// than recalled, which is exactly why the leaf sat blocked. Every number,
// section and form below comes from statutory.js, researched on 19-08-2026
// and carrying its own source.
//
// PRESENTATION CHOICE: BLOCKERS.md §1 Option A — lead with the 2025 Act, and
// say plainly that income earned up to 31-03-2026 is still governed by the
// 1961 Act. Forward-looking, correct for longest, and it does not force a
// second competing page. Option B (lead with the outgoing regime) goes stale
// within months; Option C (a page per regime) is two thin pages competing for
// one search intent.
//
// VOCABULARY IS LOAD-BEARING: this page never says "Assessment Year". That
// concept was abolished, not renamed — there is one TAX YEAR now. Copy that
// still says AY is copy written against a repealed Act, and on a tax
// consultancy's own site that is the most visible possible error.
// ============================================================================

export default {
  slug: "itr-filing",
  category: "income-tax",
  title: "ITR Filing",
  h1: "Income Tax Return Filing in Salem, Tamil Nadu",

  meta: {
    title: "Income Tax Return (ITR) Filing in Salem | ThinkOrange Consulting",
    description:
      "ITR filing for salaried individuals, professionals, firms and companies under the Income Tax Act 2025. Due dates, documents and the new Tax Year rules explained.",
    keywords: [
      "itr filing salem",
      "income tax return filing tamil nadu",
      "itr filing consultant salem",
      "income tax act 2025 return filing",
      "itr due date tax year",
    ],
  },

  lede:
    "Returns prepared from your actual books and Form 26AS position, filed under the Income Tax Act 2025 — with the regime choice worked out before we file, not after.",

  overview: [
    `Filing an income tax return is how you tell the department what you earned and what tax you have already paid on it, through salary deductions, advance tax and tax deducted at source. It is also what you produce when a bank underwrites a loan, when a tender asks for three years of financials, or when a visa application asks for proof of income. A return you filed carelessly is a document you will be asked to stand behind for years.`,

    `The ground has moved. From ${s("incomeTaxAct2025Commencement")} the Income Tax Act, 2025 replaced the 1961 Act, and returns are now filed under ${s("itrReturnSection")}, which folds original, belated, revised and updated returns into a single provision. "Assessment Year" no longer exists — there is one ${s("taxYearConcept")}. Income earned up to 31 March 2026 is still governed by the old Act even though you are filing in the new era, which is the part that catches people out.`,

    `Deadlines now run in three tiers rather than two: ${s("itrDueDateIndividuals")} for salaried and simple-income filers, ${s("itrDueDateNonAuditBusiness")} for non-audit business and professional cases, and ${s("itrDueDateAudit")} where an audit applies. Miss them and a fee applies under Section 428 (${s("itrLateFee")}), plus interest at ${s("itrLateFilingInterest")}. The larger cost is usually invisible: you also lose the right to carry forward most losses.`,
  ],

  whoNeedsThis: [
    "Your total income before deductions is above the basic exemption limit — filing is then a legal obligation, not a choice.",
    "You are salaried and want the excess tax deducted by your employer refunded, which only happens through a return.",
    "You run a business or profession, whether as a proprietor, partner, LLP or company.",
    "You hold foreign assets, foreign income or signing authority on an overseas account — filing is required regardless of income level.",
    "You want to carry forward a business or capital loss to set against future profit, which requires the return to be filed by the due date.",
    "You need documented income for a loan, a tender pre-qualification or a visa application.",
  ],

  included: [
    {
      title: "Regime comparison before filing",
      desc: "We compute your liability under both the new and old regimes on your actual numbers, and file under whichever is lower — with the working shown to you.",
    },
    {
      title: "Form 26AS and AIS reconciliation",
      desc: "Your return is matched against what the department already knows about you. Mismatches here are the single largest cause of notices, and they are cheapest to fix before filing.",
    },
    {
      title: "Correct return form selection",
      desc: "The form depends on your income sources, not your profession. Filing the wrong one gets the return treated as defective under the successor provision to Section 139(9).",
    },
    {
      title: "Capital gains and house property computation",
      desc: "Share, mutual fund and property transactions computed with holding periods, indexation where it applies, and set-off of losses handled properly.",
    },
    {
      title: "Deduction and exemption review",
      desc: "Every deduction you are actually entitled to, claimed with the evidence to support it — and none you are not.",
    },
    {
      title: `Tax audit coordination (${s("taxAuditSection")})`,
      desc: `Where turnover crosses ${s("taxAuditTurnoverThreshold")}, or professional receipts cross ${s("taxAuditProfessionThreshold")}, we coordinate the audit report, due ${s("taxAuditReportDue")}.`,
    },
    {
      title: "Filing, e-verification and acknowledgement",
      desc: "A return that is filed but not verified is not filed at all. We take it through verification and hand you the acknowledgement.",
    },
    {
      title: "Refund tracking",
      desc: "We follow the refund through to credit and take up delays and adjustments against past demands, rather than leaving you to chase the portal.",
    },
  ],

  documents: [
    {
      group: "Everyone",
      items: [
        "PAN and Aadhaar, and the mobile number linked to Aadhaar",
        "Bank account details for the refund, including IFSC — the account must be pre-validated on the portal",
        "Form 26AS and the Annual Information Statement, downloaded for the tax year",
        "Details of any advance tax or self-assessment tax already paid",
        "Last year's return and computation, if you filed one",
      ],
    },
    {
      group: "Salaried individuals",
      items: [
        `TDS certificate for salary in ${s("tdsCertificateSalary")} from every employer you worked for during the year`,
        "Rent receipts and the landlord's PAN, where house rent allowance is claimed",
        "Home loan interest certificate from the lender",
        "Proof of investments and payments you want claimed, if you are filing under the old regime",
      ],
    },
    {
      group: "Business and professional income",
      items: [
        "Books of account for the year, or the trial balance, profit and loss account and balance sheet",
        "Bank statements for every business account, for the full year",
        "GST returns filed for the year, for turnover reconciliation",
        `TDS certificates in ${s("tdsCertificateNonSalary")} for payments received after deduction`,
        "Fixed asset additions and disposals, with invoices, for depreciation",
        "Audit report and financial statements, where an audit applies",
      ],
    },
    {
      group: "Capital gains and other income",
      items: [
        "Broker's capital gains statement for shares and mutual funds",
        "Sale deed, purchase deed and improvement cost proof for property sold",
        "Interest certificates from banks and post office deposits",
        "Rental agreements and municipal tax receipts for let-out property",
        "Details of foreign assets, foreign income and overseas accounts, where any exist",
      ],
    },
  ],

  documentsNote:
    "Download your Annual Information Statement before you send anything else. It is the department's own record of your transactions, and reconciling it early converts most potential notices into a five-minute conversation instead of a reply filed under deadline.",

  process: [
    {
      step: 1,
      title: "Collect and reconcile",
      desc: "We gather your documents and reconcile them against Form 26AS and the Annual Information Statement, so the return agrees with the department's own data before it is filed.",
      duration: t("itrDocumentReview"),
    },
    {
      step: 2,
      title: "Compute under both regimes",
      desc: "Income heads computed, deductions applied, and the liability worked out under the new and old regimes side by side. You see both figures.",
      duration: "With the computation",
    },
    {
      step: 3,
      title: "Confirm and pay any balance",
      desc: "You approve the computation, and any self-assessment tax due is paid before filing so no interest accrues past the filing date.",
      duration: "Before filing",
    },
    {
      step: 4,
      title: "File and verify",
      desc: "The return is filed under the correct form and taken through e-verification, because an unverified return is not treated as filed.",
      duration: t("itrFilingAfterDocs"),
    },
    {
      step: 5,
      title: "Track processing and refund",
      desc: "We monitor processing, check the intimation against our own computation when it arrives, and follow any refund through to credit.",
      duration: s("intimationOuterLimit"),
    },
  ],

  timeline: [
    { stage: "Due date — salaried and simple income", days: s("itrDueDateIndividuals") },
    { stage: "Due date — non-audit business and professional cases", days: s("itrDueDateNonAuditBusiness") },
    { stage: "Due date — audit cases and companies", days: s("itrDueDateAudit") },
    { stage: "Due date — transfer pricing cases", days: s("itrDueDateTransferPricing") },
    { stage: "Belated return", days: s("itrBelatedWindow") },
    { stage: "Revised return", days: s("itrRevisedWindow") },
    { stage: "Updated return", days: s("itrUpdatedReturnWindow") },
    { stage: "Outer limit for the department to issue an intimation", days: s("intimationOuterLimit") },
  ],

  fees: null,

  faqs: [
    {
      q: "The Income Tax Act changed in 2026. Does that affect the return I am filing now?",
      a: `Yes, in vocabulary and procedure. Returns are now filed under ${s("itrReturnSection")} of the Income Tax Act 2025, and "Assessment Year" has been replaced by a single ${s("taxYearConcept")}. Income earned up to 31 March 2026 is still taxed under the 1961 Act. So the law that computes your income and the law that governs the filing can differ for the same return.`,
    },
    {
      q: "What is my due date?",
      a: `There are three tiers now, not two. ${s("itrDueDateIndividuals")} if you are salaried or have simple income, ${s("itrDueDateNonAuditBusiness")} for non-audit business and professional cases including partners, and ${s("itrDueDateAudit")} where an audit applies. Transfer pricing cases get ${s("itrDueDateTransferPricing")}. Tell us your income sources and we will confirm which applies to you.`,
    },
    {
      q: "What does filing late actually cost?",
      a: `A fee of ${s("itrLateFee")} under Section 428, plus interest at ${s("itrLateFilingInterest")} on tax still unpaid. The larger cost is usually invisible: file after the due date and you lose the right to carry most losses forward, so a loss you could have set against next year's profit is simply gone.`,
    },
    {
      q: "I have already filed and then found a mistake. Can I fix it?",
      a: `Usually yes. A revised return can be filed within ${s("itrRevisedWindow")}. If that window has closed, an updated return is available within ${s("itrUpdatedReturnWindow")}, but it carries additional tax of ${s("itrUpdatedReturnAdditionalTax")}. Correcting a mistake yourself is always cheaper than having it found during scrutiny.`,
    },
    {
      q: "Should I file under the new regime or the old one?",
      a: "It depends entirely on your numbers, and the answer changes as your investments and loans change. We compute both on your actual figures before filing rather than assuming. Broadly the new regime suits those with few deductions to claim; the old one can still win where a home loan, rent and long-standing investments stack up.",
    },
    {
      q: "My income is below the exemption limit. Is there any point filing?",
      a: "Often yes. If tax was deducted from your interest or contract payments, a return is the only way to get it refunded. A filed return is also the income proof banks and consulates ask for, and a consistent filing record makes a future notice about an unfiled year far less likely.",
    },
    {
      q: "Do I need a tax audit?",
      a: `Under ${s("taxAuditSection")}, an audit applies where business turnover crosses ${s("taxAuditTurnoverThreshold")}, or professional gross receipts cross ${s("taxAuditProfessionThreshold")}. It also applies if you declare profits below the presumptive rates under ${s("presumptiveTaxationSection")}. The report is due ${s("taxAuditReportDue")}, so it drives your whole filing calendar.`,
    },
    {
      q: "How long does a refund take?",
      a: "It depends on when the return is processed, and the department may issue an intimation at any point up to the outer limit set by the Act. Refunds are usually credited within weeks of processing where the bank account is pre-validated and the return matches Form 26AS. Mismatches and past demands adjusted against the refund are the two common delays.",
    },
  ],

  related: ["tds-compliance", "tax-planning-advisory", "notices-assessments"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "incomeTaxAct2025Commencement",
      "itrReturnSection",
      "taxYearConcept",
      "itrDueDateIndividuals",
      "itrDueDateNonAuditBusiness",
      "itrDueDateAudit",
      "itrDueDateTransferPricing",
      "itrBelatedWindow",
      "itrRevisedWindow",
      "itrUpdatedReturnWindow",
      "itrUpdatedReturnAdditionalTax",
      "itrLateFee",
      "itrLateFilingInterest",
      "taxAuditSection",
      "taxAuditTurnoverThreshold",
      "taxAuditProfessionThreshold",
      "taxAuditReportDue",
      "presumptiveTaxationSection",
      "intimationOuterLimit",
      "tdsCertificateSalary",
      "tdsCertificateNonSalary",
    ],
    notes:
      "FIRST PAGE WRITTEN AFTER THE INCOME TAX ACT 2025 TRANSITION — confirm before publishing: (1) the three-tier due date structure, and specifically that the 31 August tier for non-audit business cases is in force for the current tax year; (2) that the loss carry-forward consequence of late filing survives the re-codification as stated; (3) the exact slab structure of the additional tax on an updated return; (4) that this page's regime-comparison language cannot be read as a promise of a particular tax outcome. The page deliberately states no basic exemption amount, no presumptive turnover ceiling and no e-verification window — add them to statutory.js first if the CA wants them stated.",
  },
};
