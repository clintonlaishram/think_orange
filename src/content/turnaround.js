// ============================================================================
// OPERATIONAL TURNAROUND — ThinkOrange's OWN service commitments.
//
// Deliberately separate from statutory.js, because the two are different kinds
// of claim and carry different risk:
//
//   statutory.js  — what the LAW says. "GST approval takes 7 working days."
//                   Verifiable against the Act. A CA signs it off.
//   turnaround.js — what THINKORANGE PROMISES. "We review your documents in
//                   1–2 working days." Not verifiable anywhere. It is a
//                   commitment to a client, and CONTENT-PLAN.md §1.1 lists
//                   turnaround-time guarantees as UNCONFIRMED — they must not
//                   appear on the site until Clinton confirms them.
//
// So every value here starts as `null`, exactly like `fees: null`. A null
// renders as a neutral phrase rather than a number, which is correct and not a
// gap. Fill these in once — and only once — the firm has decided what it can
// actually honour on a bad week, not a good one.
//
// HARD RULE: never type a ThinkOrange turnaround estimate into a leaf file.
// Add it here, leave it null until confirmed.
// ============================================================================

export const turnaround = {
  enquiryResponseTime: {
    value: null,
    label: "Our own response time to a new enquiry — homepage CTA band sub-line",
    fallback: "We respond fast",
  },
  gstRegDocumentReview: {
    value: null,
    label: "Our own document collection and review time, GST registration",
    fallback: "Confirm with us",
  },
  gstRegFilingAfterDocs: {
    value: null,
    label: "Our own filing time once documents are complete, GST registration",
    fallback: "Confirm with us",
  },
  gstReturnReconciliation: {
    value: null,
    label: "Our own GSTR-2B / books reconciliation turnaround, monthly return filing",
    fallback: "Confirm with us",
  },
  gstReturnFilingCutoff: {
    value: null,
    label: "Date each month by which we need your data to guarantee an on-time return",
    fallback: "Confirm with us",
  },
  gstNoticeInitialReview: {
    value: null,
    label: "Our own turnaround to assess a notice and advise on position",
    fallback: "Confirm with us",
  },
  incorporationDocPrep: {
    value: null,
    label: "Our own document preparation turnaround, entity incorporation",
    fallback: "Confirm with us",
  },
  incorporationNameStage: {
    value: null,
    label: "Our own turnaround to prepare and submit a name reservation",
    fallback: "Confirm with us",
  },
  bookkeepingMonthlyClose: {
    value: null,
    label: "Our own monthly books-close turnaround after receiving data",
    fallback: "Confirm with us",
  },
  auditFieldworkDuration: {
    value: null,
    label: "Our own typical fieldwork duration, internal or specialised audit",
    fallback: "Confirm with us",
  },
  itcRefundPrep: {
    value: null,
    label: "Our own turnaround to prepare and file a refund application once documents are complete",
    fallback: "Confirm with us",
  },
  loanCmaPrep: {
    value: null,
    label: "Our own turnaround to prepare CMA data and projections for a loan application",
    fallback: "Confirm with us",
  },
  dscIssuanceTurnaround: {
    value: null,
    label: "Our own DSC issuance turnaround once documents and video verification are complete",
    fallback: "Confirm with us",
  },

  // --- Added 18-08-2026, for the Registrations & Licences / GST LUT /
  // Trust-Society-Section8 / Accounting-Payroll-Audit / Personal Finance
  // leaves written this session. Same discipline as every entry above.
  lutFilingPrep: {
    value: null,
    label: "Our own turnaround to check eligibility and prepare an LUT filing once documents are complete",
    fallback: "Confirm with us",
  },
  lutAnnualRenewalPrep: {
    value: null,
    label: "Our own turnaround to prepare and refile a client's LUT ahead of each new financial year",
    fallback: "Confirm with us",
  },
  iecDocPrepTurnaround: {
    value: null,
    label: "Our own document preparation and application-filing turnaround, IEC registration",
    fallback: "Confirm with us",
  },
  iecFilingTurnaround: {
    value: null,
    label: "Our own filing turnaround once IEC documents are complete",
    fallback: "Confirm with us",
  },
  iecAnnualUpdateService: {
    value: null,
    label: "Our own turnaround to file a client's mandatory annual IEC update, once instructed",
    fallback: "Confirm with us",
  },
  icegateDocPrepTurnaround: {
    value: null,
    label: "Our own document preparation and role-registration filing turnaround, ICEGATE registration",
    fallback: "Confirm with us",
  },
  icegateBankCoordinationTurnaround: {
    value: null,
    label: "Our own turnaround to coordinate with a client's bank on the AD code letter",
    fallback: "Confirm with us",
  },
  tmSearchAndPrepTurnaround: {
    value: null,
    label: "Our own trademark search and application preparation turnaround",
    fallback: "Confirm with us",
  },
  tmFilingTurnaround: {
    value: null,
    label: "Our own filing turnaround once the mark and classes are confirmed",
    fallback: "Confirm with us",
  },
  ngoDarpanDocPrepTurnaround: {
    value: null,
    label: "Our own document preparation turnaround, NGO Darpan registration",
    fallback: "Confirm with us",
  },
  ngoDarpanFilingTurnaround: {
    value: null,
    label: "Our own portal-filing turnaround once NGO Darpan documents are complete",
    fallback: "Confirm with us",
  },
  nonprofitStructureAdvice: {
    value: null,
    label: "Our own turnaround to advise which of trust, society or Section 8 company fits, and confirm the choice",
    fallback: "Confirm with us",
  },
  nonprofitDocPrep: {
    value: null,
    label: "Our own turnaround to draft the trust deed, society memorandum & rules, or Section 8 MOA/AOA",
    fallback: "Confirm with us",
  },
  nonprofitRegistrationFiling: {
    value: null,
    label: "Our own turnaround to file the registration once drafting/documents are complete — trust deed, society application, or SPICe+ Section 8 filing",
    fallback: "Confirm with us",
  },
  pfEsiApplicabilityCheck: {
    value: null,
    label: "Our own turnaround to assess EPF/ESI applicability and confirm the liability date",
    fallback: "Confirm with us",
  },
  pfEsiDocPrep: {
    value: null,
    label: "Our own document collection and review turnaround, EPF/ESI registration",
    fallback: "Confirm with us",
  },
  payrollSetupReview: {
    value: null,
    label: "Our own turnaround to review employee master data and set up payroll before the first live run",
    fallback: "Confirm with us",
  },
  payrollMonthlyCutoff: {
    value: null,
    label: "Date each month by which we need payroll inputs to guarantee an on-time run",
    fallback: "Confirm with us",
  },
  payrollProcessingTurnaround: {
    value: null,
    label: "Our own turnaround to process payroll and file EPF/ESI/PT/TDS once monthly inputs are received",
    fallback: "Confirm with us",
  },
  rocCalendarSetup: {
    value: null,
    label: "Our own turnaround to build a company or LLP's annual ROC filing calendar",
    fallback: "Confirm with us",
  },
  rocFilingPrep: {
    value: null,
    label: "Our own turnaround to prepare ROC annual filings once financials and registers are ready",
    fallback: "Confirm with us",
  },
  itrDocumentReview: {
    value: null,
    label: "Our own document collection and review time, income tax return filing",
    fallback: "Confirm with us",
  },
  itrFilingAfterDocs: {
    value: null,
    label: "Our own filing time once documents and the computation are agreed, ITR filing",
    fallback: "Confirm with us",
  },
  tdsMonthlyCutoff: {
    value: null,
    label: "Date each month by which we need payment data to deposit TDS on time",
    fallback: "Confirm with us",
  },
  tdsQuarterlyStatementPrep: {
    value: null,
    label: "Our own preparation time for a quarterly TDS statement",
    fallback: "Confirm with us",
  },
  taxPlanningReviewSession: {
    value: null,
    label: "Our own turnaround for a tax planning review and written recommendation",
    fallback: "Confirm with us",
  },
  itNoticeInitialReview: {
    value: null,
    label: "Our own first-read turnaround on an income tax notice",
    fallback: "Confirm with us",
  },
  personalFinanceReview: {
    value: null,
    label: "Our own turnaround to review a client's income, obligations and credit report, personal finance service",
    fallback: "Confirm with us",
  },
  personalFinanceDocPrep: {
    value: null,
    label: "Our own turnaround to prepare personal loan/mortgage documentation once the financial review is complete",
    fallback: "Confirm with us",
  },
};

/**
 * Resolves an operational estimate. Returns the neutral fallback while the
 * value is unconfirmed, so an unfilled commitment can never render as a
 * number. Throws on an unknown key so typos fail at import time.
 */
export function t(key) {
  const entry = turnaround[key];
  if (!entry) throw new Error(`turnaround: unknown key "${key}"`);
  return entry.value ?? entry.fallback;
}

/** True while any commitment is still unconfirmed — used by the review doc. */
export const hasUnconfirmed = Object.values(turnaround).some((e) => e.value === null);
