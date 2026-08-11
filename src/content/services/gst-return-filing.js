import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js — see the notes at the top of that
// file before editing this one.
//
// The angle that makes this page useful rather than generic: most businesses
// already know they must file. What they get wrong is the QRMP quarterly-return
// /monthly-payment split, and the 3-year hard time bar that silently closes old
// periods and destroys the credit inside them. Lead with those.

export default {
  slug: "gst-return-filing",
  category: "gst",
  title: "GST Return Filing",
  h1: "GST Return Filing in Salem, Tamil Nadu",

  meta: {
    title: "GST Return Filing in Salem | GSTR-1, 3B, 9 & 9C | ThinkOrange",
    description:
      "Monthly, quarterly and annual GST returns filed on schedule, with GSTR-2B reconciliation so your input credit matches your books. Salem, Tamil Nadu.",
    keywords: [
      "gst return filing salem",
      "gstr 3b filing consultant tamil nadu",
      "gstr 1 due date",
      "qrmp scheme return filing",
      "gstr 9 annual return salem",
    ],
  },

  lede:
    "GSTR-1, 3B, 9 and 9C prepared and filed on schedule, with GSTR-2B reconciliation so the credit you claim matches the credit you can actually defend.",

  overview: [
    `Filing a GST return is not the hard part. Reconciling it is. Your GSTR-1 reports what you sold, your GSTR-3B carries the tax you pay, and your GSTR-2B lists the credit your suppliers have actually reported — and where those three disagree, the department notices before you do.`,

    `Which returns you file depends on your turnover. Above ${s("qrmpThreshold")} you file monthly: GSTR-1 by the ${s("gstr1DueMonthly")} and GSTR-3B by the ${s("gstr3bDueMonthly")}. At or below it you can opt into the QRMP scheme and file quarterly instead. QRMP catches people out, because quarterly filing does not mean quarterly paying — tax is still due every month through PMT-06 by the ${s("pmt06Due")}.`,

    `The deadline that matters most is not the monthly one. Under Section 39(11) a return more than ${s("gstReturnTimeBar")} past its due date can no longer be filed at all — the portal blocks it permanently and the input credit sitting in that period is gone for good. If you have old periods outstanding, that is the clock to worry about, not the late fee.`,
  ],

  whoNeedsThis: [
    "You hold a GSTIN. Filing is mandatory for every registered person, whether or not you traded in the period — a nil return still has to be filed.",
    `Your turnover is above ${s("qrmpThreshold")}, so you file GSTR-1 and GSTR-3B monthly.`,
    `Your turnover is at or below ${s("qrmpThreshold")} and you want the QRMP scheme's quarterly returns, with monthly payment through PMT-06.`,
    `Your aggregate turnover exceeds ${s("gstr9Threshold")} and you must file the GSTR-9 annual return, or exceeds ${s("gstr9cThreshold")} and also need the GSTR-9C reconciliation statement.`,
    "Your claimed input credit and your GSTR-2B do not agree, and you need the gap reconciled before it becomes a notice.",
    "You have returns outstanding from earlier periods and want them cleared before the three-year bar closes them.",
  ],

  included: [
    {
      title: "Monthly or quarterly return preparation",
      desc: "GSTR-1 and GSTR-3B prepared from your sales and purchase data, with outward supplies classified correctly by rate and place of supply.",
    },
    {
      title: "GSTR-2B and books reconciliation",
      desc: "We match the credit your suppliers reported against the credit you booked, and tell you which invoices are missing before you claim them.",
    },
    {
      title: "Invoice Management System handling",
      desc: "Accepting, rejecting or keeping invoices pending on the IMS, so your GSTR-2B reflects reality rather than whatever your suppliers filed.",
    },
    {
      title: "QRMP scheme assessment and PMT-06",
      desc: "Whether quarterly filing actually suits your cash flow, and the monthly payments managed so the quarterly return has nothing to catch up on.",
    },
    {
      title: `Annual return and reconciliation (GSTR-9, GSTR-9C)`,
      desc: "The annual return tied back to your audited books, with differences explained rather than absorbed.",
    },
    {
      title: "Credit ledger and liability review",
      desc: "Electronic credit and cash ledger reviewed each period, so blocked or ineligible credit is caught before it is utilised.",
    },
    {
      title: "Old period clean-up",
      desc: `Outstanding returns identified and prioritised by how close they are to the ${s("gstReturnTimeBar")} bar, worst first.`,
    },
    {
      title: "Late fee and interest computation",
      desc: "Where a period is already late, the exposure worked out precisely rather than estimated, so you know what closing it costs.",
    },
  ],

  documents: [
    {
      group: "Every period",
      items: [
        "Sales register or invoice-wise outward supply data for the period",
        "Purchase register with supplier GSTINs and invoice details",
        "Credit and debit notes issued or received",
        "Details of advances received and adjusted",
        "Export invoices with shipping bill details, where applicable",
        "Details of supplies attracting reverse charge",
      ],
    },
    {
      group: "First engagement",
      items: [
        "GST portal login credentials, or access granted to us as your authorised representative",
        "GST registration certificate (REG-06)",
        "Copies of returns already filed for the current financial year",
        "List of periods with returns outstanding, if any",
      ],
    },
    {
      group: "Annual return (GSTR-9 and 9C)",
      items: [
        "Audited financial statements for the financial year",
        "Trial balance and turnover reconciliation",
        "All returns filed during the year",
        "HSN-wise summary of outward supplies",
        "Details of any tax paid through DRC-03 during the year",
      ],
    },
  ],

  documentsNote:
    "The single most useful thing you can send us is a clean purchase register with correct supplier GSTINs. Almost every reconciliation problem we chase traces back to a supplier GSTIN typed wrong, which puts the credit somewhere neither of you can find it.",

  process: [
    {
      step: 1,
      title: "Data collection",
      desc: "You send the period's sales and purchase data, or we pull it from your accounting system directly if you use Tally Prime or Zoho Books.",
      duration: t("gstReturnFilingCutoff"),
    },
    {
      step: 2,
      title: "Reconciliation",
      desc: "We match your books against GSTR-2B and the IMS, and come back to you with any missing or mismatched invoices before anything is filed.",
      duration: t("gstReturnReconciliation"),
    },
    {
      step: 3,
      title: "Return preparation and your review",
      desc: "GSTR-1 and GSTR-3B prepared, with the liability and credit position summarised in plain terms for you to approve.",
      duration: "Before the due date",
    },
    {
      step: 4,
      title: "Filing and payment",
      desc: "Returns filed and the challan generated for payment. You get the filed acknowledgement, not just a confirmation that it was handled.",
      duration: "On or before the due date",
    },
    {
      step: 5,
      title: "Annual close",
      desc: `GSTR-9, and GSTR-9C where turnover requires it, reconciled against your audited accounts and filed by ${s("gstr9Due")}.`,
      duration: "Annually",
    },
  ],

  timeline: [
    { stage: "GSTR-1 — monthly filers", days: s("gstr1DueMonthly") },
    { stage: "GSTR-3B — monthly filers", days: s("gstr3bDueMonthly") },
    { stage: "GSTR-1 — QRMP quarterly filers", days: s("gstr1DueQuarterly") },
    { stage: "GSTR-3B — QRMP quarterly filers", days: s("gstr3bDueQuarterly") },
    { stage: "PMT-06 monthly payment under QRMP", days: s("pmt06Due") },
    { stage: "GSTR-9 and GSTR-9C annual", days: s("gstr9Due") },
  ],

  fees: null,

  faqs: [
    {
      q: "What are the GST return due dates?",
      a: `Monthly filers submit GSTR-1 by the ${s("gstr1DueMonthly")} and GSTR-3B by the ${s("gstr3bDueMonthly")}. Under QRMP, GSTR-1 is due ${s("gstr1DueQuarterly")} and GSTR-3B ${s("gstr3bDueQuarterly")} — but tax is still paid monthly through PMT-06 by the ${s("pmt06Due")}.`,
    },
    {
      q: "Do I have to file if I had no sales in the period?",
      a: "Yes. A nil return is still a return, and not filing one attracts a late fee just as a missed liability would. It also blocks the next period, because GST returns must be filed in sequence — one skipped nil return can stall an entire year.",
    },
    {
      q: "What is the QRMP scheme, and should I opt in?",
      a: `QRMP lets businesses with turnover up to ${s("qrmpThreshold")} file GSTR-1 and GSTR-3B quarterly instead of monthly. It cuts filing work, not tax outflow — payment stays monthly through PMT-06. It suits steady, predictable turnover; it suits lumpy turnover much less, because the quarterly reconciliation gets harder.`,
    },
    {
      q: "What is the late fee and interest for filing late?",
      a: `The late fee is ${s("gstLateFee")}, subject to a cap. Separately, interest runs at ${s("gstInterest")} on tax paid late, computed daily from the due date. The two are distinct — the fee is for the delay in filing, the interest is for the delay in paying.`,
    },
    {
      q: "Can I still file a return from two years ago?",
      a: `Yes, but not indefinitely. A return more than ${s("gstReturnTimeBar")} past its due date cannot be filed at all — the portal blocks it and the period closes permanently, taking the input credit in it with it. If you have old periods open, prioritise by which is closest to that bar.`,
    },
    {
      q: "Why does my input credit not match my books?",
      a: "Usually because a supplier has not filed their GSTR-1, has filed it with your GSTIN entered incorrectly, or has reported the invoice in a later period. Your GSTR-2B only shows what suppliers actually reported, so the gap is normally theirs to fix — but the consequence lands on you.",
    },
    {
      q: "Who has to file GSTR-9 and GSTR-9C?",
      a: `GSTR-9, the annual return, applies where aggregate turnover exceeds ${s("gstr9Threshold")}. GSTR-9C, a reconciliation between your returns and your audited accounts, applies above ${s("gstr9cThreshold")}. Both are due ${s("gstr9Due")}.`,
    },
    {
      q: "What is the Invoice Management System?",
      a: "The IMS lets you accept, reject or hold each inward invoice your suppliers report, and your GSTR-2B is built from those decisions. Used properly it stops wrong or duplicate invoices reaching your credit claim. Ignored, it defaults to accepting whatever was filed against your GSTIN.",
    },
  ],

  related: ["gst-registration", "gst-notices-litigation", "bookkeeping"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "qrmpThreshold",
      "gstr1DueMonthly",
      "gstr3bDueMonthly",
      "gstr1DueQuarterly",
      "gstr3bDueQuarterly",
      "pmt06Due",
      "gstr9Threshold",
      "gstr9cThreshold",
      "gstr9Due",
      "gstLateFee",
      "gstInterest",
      "gstReturnTimeBar",
    ],
    notes:
      "TWO ITEMS NEED SETTLING BEFORE PUBLICATION. (1) Whether Tamil Nadu is a QRMP Category X (22nd) or Category Y (24th) state — research did not settle it and the page currently states both. (2) The current cap on the GSTR-3B late fee, which has been revised by notification more than once. Also confirm the IMS description matches current portal behaviour.",
  },
};
