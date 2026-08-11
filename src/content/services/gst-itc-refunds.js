import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// STATUTORY CARE: this page cites Section 54(1)/(3) and Rules 89/90/91. Rule
// 91's 90% provisional-refund extension to inverted duty structure is recent
// (01-10-2025) — confirmed via research, not recall. The inverted-duty
// "input goods only" restriction is the single most consequential thing a
// reader needs to hear, since it is what most inflates client expectations.

export default {
  slug: "gst-itc-refunds",
  category: "gst",
  title: "ITC Refunds",
  h1: "GST Input Tax Credit Refunds in Salem, Tamil Nadu",

  meta: {
    title: "GST ITC Refund Filing in Salem | Inverted Duty & Export Refunds",
    description:
      "Input tax credit refund claims for exports, inverted duty structure and excess balance — reconciled and filed within the two-year window. Salem, Tamil Nadu.",
    keywords: [
      "gst itc refund salem",
      "inverted duty structure refund consultant",
      "gst export refund rfd-01",
      "input tax credit refund process",
      "gst refund consultant tamil nadu",
    ],
  },

  lede:
    "Refund applications for export credit, inverted duty structure and excess balance — reconciled properly and filed inside the two-year window.",

  overview: [
    `Input tax credit that cannot be used often can still be refunded — the two most common routes are zero-rated exports, where you sold without charging GST but still paid it on your inputs, and inverted duty structure, where your inputs are taxed at a higher rate than your output supply and credit accumulates because it cannot be fully offset.`,

    `Both routes run through the same application, ${s("itcRefundFormApplication")}, and both are subject to the same hard limit: ${s("itcRefundTimeLimit")}. The portal does not stop you from filing late by itself — it is entirely on you to track the relevant date for each claim and file inside the window, because once it closes the credit is not refundable at all.`,

    `The claim most often overstated is inverted duty structure. The refund is ${s("itcInvertedDutyRestriction")} — clients frequently assume every input qualifies and are surprised when the computed refund is lower than expected. Get the Rule 89(5) computation right upfront and there are no surprises later.`,
  ],

  whoNeedsThis: [
    "You export goods or services, or supply to an SEZ, and have unutilised input tax credit as a result of zero-rated supply.",
    "Your inputs are taxed at a higher GST rate than your output supply, and credit is accumulating that you cannot offset against output liability.",
    "You have an excess balance in your electronic cash ledger that you want refunded rather than left idle.",
    "You have a refund claim that was rejected or under-sanctioned and want it reviewed before the two-year window closes.",
    "You are unsure whether your business genuinely qualifies for an inverted duty structure refund, or by how much.",
  ],

  included: [
    {
      title: "Eligibility and relevant-date determination",
      desc: "Which refund category applies to you, and the exact relevant date that starts your two-year clock — the two things most claims get wrong before they even start.",
    },
    {
      title: "Credit reconciliation",
      desc: "Input and output tax reconciled against your returns and GSTR-2B, so the claimed amount is defensible under scrutiny rather than estimated.",
    },
    {
      title: `Refund computation (Rule 89 formulas)`,
      desc: "The correct formula applied for your refund type, with the inverted duty restriction to input goods factored in from the start rather than discovered at rejection.",
    },
    {
      title: `Application filing (${s("itcRefundFormApplication")})`,
      desc: "The application prepared and filed with full supporting statements and reconciliation annexed.",
    },
    {
      title: "Deficiency memo response",
      desc: "Where the department raises a deficiency memo rather than proceeding to sanction, a response drafted and resubmitted within the window.",
    },
    {
      title: "Provisional and final sanction tracking",
      desc: `Following the claim through provisional sanction — ${s("itcRefundProvisional")} — to final sanction, rather than treating provisional payment as the end of the matter.`,
    },
  ],

  documents: [
    {
      group: "Every refund application",
      items: [
        "GST returns for the periods the claim covers",
        "GSTR-2B for the same periods",
        "Statement of invoices supporting the claim, in the prescribed format",
        "Bank realisation certificates or FIRC, for export claims",
        "Copy of the LUT (Letter of Undertaking), for exports without payment of tax",
      ],
    },
    {
      group: "Inverted duty structure claims specifically",
      items: [
        "Purchase invoices for input goods, clearly distinguished from input services and capital goods",
        "Sales invoices showing the output GST rate",
        "Rule 89(5) computation working",
      ],
    },
    {
      group: "Export and SEZ supply claims specifically",
      items: [
        "Shipping bills, for goods exports",
        "SEZ endorsement, for supplies to an SEZ unit or developer",
        "Foreign Inward Remittance Certificate confirming payment receipt",
      ],
    },
  ],

  documentsNote:
    "Bank realisation certificates take time to obtain from your bank and are frequently the item that delays an export refund claim past its comfortable filing window. Request yours as soon as an export is complete, not when you sit down to file the refund.",

  process: [
    {
      step: 1,
      title: "Eligibility and reconciliation",
      desc: "We confirm which refund category applies, establish the relevant date, and reconcile the underlying credit against your returns and GSTR-2B.",
      duration: t("itcRefundPrep"),
    },
    {
      step: 2,
      title: "Computation",
      desc: "The refund amount computed under the correct Rule 89 formula for your claim type.",
      duration: "With reconciliation",
    },
    {
      step: 3,
      title: "Application filed",
      desc: `${s("itcRefundFormApplication")} filed with supporting statements, and an acknowledgement issued in RFD-02 once the application is complete.`,
      duration: s("itcRefundAcknowledgement"),
    },
    {
      step: 4,
      title: "Provisional sanction",
      desc: `Where applicable, ${s("itcRefundProvisional")} pending final scrutiny.`,
      duration: "After acknowledgement",
    },
    {
      step: 5,
      title: "Final sanction or deficiency response",
      desc: "The claim tracked through to final sanction, or a deficiency memo answered and resubmitted if one is raised.",
      duration: "Varies by case",
    },
  ],

  timeline: [
    { stage: "Time limit to file a refund claim", days: s("itcRefundTimeLimit") },
    { stage: "Acknowledgement of a complete application", days: s("itcRefundAcknowledgement") },
    { stage: "Provisional sanction (zero-rated and, since Oct 2025, inverted duty)", days: s("itcRefundProvisional") },
  ],

  fees: null,

  faqs: [
    {
      q: "How long do I have to claim a GST refund?",
      a: `${s("itcRefundTimeLimit")}, under Section 54(1). The portal will not stop you from missing this — tracking the relevant date for each claim and filing inside the window is entirely your responsibility, and once it closes the credit cannot be recovered.`,
    },
    {
      q: "Can I claim a refund on all my inputs under inverted duty structure?",
      a: `No, and this is the most common point of disappointment. The refund is ${s("itcInvertedDutyRestriction")}. Credit sitting on input services or capital goods does not qualify for this particular refund route, however genuinely it accumulated.`,
    },
    {
      q: "How quickly is a refund actually paid?",
      a: `A complete application is acknowledged within ${s("itcRefundAcknowledgement")}. For zero-rated supplies, and since October 2025 for inverted duty structure claims too, ${s("itcRefundProvisional")} — the balance follows after full scrutiny. The provisional portion is what most businesses see first.`,
    },
    {
      q: "What is a deficiency memo?",
      a: "A notice that your application is incomplete or has an issue that must be corrected before it can proceed to sanction. It restarts your filing clock for that submission, so respond to it as carefully as you would the original application, not as a formality.",
    },
    {
      q: "Can I claim a refund on an excess balance in my cash ledger?",
      a: "Yes — money sitting in your electronic cash ledger that you have not used can be refunded on application, separate from the export and inverted duty routes, and is generally the most straightforward of the refund categories.",
    },
    {
      q: "Why was my refund sanctioned for less than I claimed?",
      a: "Most commonly because part of the claimed credit fell outside the inverted duty restriction, or because invoices in your claim did not match your supplier's GSTR-2B reporting. A reconciliation before filing catches most of this; a rejection after filing is harder to unwind than a correction beforehand.",
    },
  ],

  related: ["gst-return-filing", "gst-notices-litigation", "gst-registration"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "itcRefundTimeLimit",
      "itcRefundFormApplication",
      "itcRefundAcknowledgement",
      "itcRefundProvisional",
      "itcInvertedDutyRestriction",
    ],
    notes:
      "HIGH STATUTORY DENSITY — confirm specifically: (1) the exact Rule 89(5) formula wording, which research returned with some inconsistency against Rule 89(4); (2) whether the 90% provisional sanction turnaround is 7 or 15 days, which sources stated differently; (3) that the October 2025 extension of provisional sanction to inverted duty claims is still in force. This page and gst-notices-litigation.js are the two most statutorily exposed pages on the site.",
  },
};
