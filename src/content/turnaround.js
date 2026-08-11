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
