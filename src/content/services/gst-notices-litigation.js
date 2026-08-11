import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// This is the highest-stakes page on the site. The visitor has a notice in hand,
// a reply window running, and is frightened. So: no marketing warmth, no
// reassurance that isn't earned. Tell them what the form they are holding
// actually is, how long they have, and what happens if they ignore it.
//
// STATUTORY CARE: Section 74A (Finance (No. 2) Act 2024) unified the old
// 73/74 fraud/non-fraud split from FY 2024-25. Sections 73 and 74 still govern
// periods up to FY 2023-24. BOTH frameworks are live at once, depending on the
// year under demand — describing only one would be wrong for half of clients.

export default {
  slug: "gst-notices-litigation",
  category: "gst",
  title: "GST Notices & Litigation",
  h1: "GST Notices and Litigation Support in Salem, Tamil Nadu",

  meta: {
    title: "GST Notice Reply & Litigation Support in Salem | ThinkOrange",
    description:
      "Scrutiny notices, show cause notices, demands and appeals — reconciled, drafted and represented. Salem, Tamil Nadu, for clients across India.",
    keywords: [
      "gst notice reply salem",
      "asmt-10 reply consultant",
      "drc-01 show cause notice gst",
      "gst appeal apl-01 tamil nadu",
      "gst litigation consultant salem",
    ],
  },

  lede:
    "Scrutiny queries, show cause notices, demands and first appeals — reconciled, drafted and represented, within the window you have left.",

  overview: [
    `A GST notice is not a verdict. It is the department putting a discrepancy to you and asking you to explain it, and most of the notices we see are answerable — a credit mismatch caused by a supplier's filing, a place-of-supply classification the officer read differently, a return reconciled against the wrong period.`,

    `What the notice is called tells you how serious it is and how long you have. ${s("gstFormScrutiny")} is a scrutiny notice under Section 61 — a discrepancy in a return, with ${s("gstFormScrutinyReply")} to reply. ${s("gstFormPreNotice")} is an intimation before any formal notice, and often the cheapest moment to close a matter. ${s("gstFormShowCause")} is the formal show cause notice raising a demand. ${s("gstFormDemandOrder")} is the order after adjudication, and the point at which the only route left is appeal.`,

    `The limitation framework changed recently, and which one applies depends on the year under demand. For periods up to FY 2023-24, Sections 73 and 74 still govern — ${s("gstDemandLegacyNonFraud")} for ordinary cases, ${s("gstDemandLegacyFraud")} where fraud or wilful misstatement is alleged. From FY 2024-25, Section 74A replaced both with a single ${s("gstDemandUnifiedLimitation")} limitation. Read your notice against the right one, because an out-of-time demand is contestable on that ground alone.`,
  ],

  whoNeedsThis: [
    `You have received an ${s("gstFormScrutiny")} scrutiny notice and the ${s("gstFormScrutinyReply")} window is running.`,
    `You have a ${s("gstFormPreNotice")} intimation or a ${s("gstFormShowCause")} show cause notice raising a demand for tax, interest and penalty.`,
    `A ${s("gstFormDemandOrder")} order has been passed against you and you are considering a first appeal.`,
    "Your input credit has been questioned because suppliers did not file, and you are being asked to reverse credit you legitimately paid for.",
    "Your electronic credit ledger has been blocked, or a provisional attachment has been made on your bank account.",
    "Registration cancellation proceedings have started, or your registration has been cancelled and you need revocation.",
  ],

  included: [
    {
      title: "Notice assessment and position advice",
      desc: "What the notice actually alleges, how strong it is, what the exposure is, and whether it is worth contesting or closing.",
    },
    {
      title: "Limitation check",
      desc: "Whether the demand is within time under the framework applicable to that financial year — the first thing worth testing, and often decisive.",
    },
    {
      title: "Reconciliation and evidence assembly",
      desc: "The underlying returns, ledgers and invoices reconciled so the reply rests on documents rather than assertion.",
    },
    {
      title: `Drafting and filing replies (${s("gstFormScrutinyReply")}, ${s("gstFormShowCause")} responses)`,
      desc: "Replies drafted to the specific allegation, filed within the window, with supporting annexures indexed.",
    },
    {
      title: "Departmental representation",
      desc: "Personal hearings attended and the matter argued before the adjudicating authority, so you are not explaining your own books under pressure.",
    },
    {
      title: `Voluntary closure where it is cheaper (${s("gstFormVoluntaryPayment")})`,
      desc: "Where the department is right, paying early through DRC-03 to limit interest and penalty is advice too — not every notice should be fought.",
    },
    {
      title: `First appeals (${s("gstFormAppeal")})`,
      desc: `Grounds of appeal drafted, ${s("gstAppealPreDeposit")} pre-deposit computed, and the appeal filed within the ${s("gstAppealWindow")} window.`,
    },
    {
      title: "Attachment and cancellation matters",
      desc: "Credit ledger unblocking, provisional attachment representations, and registration revocation applications.",
    },
  ],

  documents: [
    {
      group: "Send these first — before anything else",
      items: [
        "The notice or order itself, complete with all annexures",
        "The date it was served, and the reply deadline stated on it",
        "The financial year and tax periods it covers",
        "Any earlier correspondence on the same matter",
      ],
    },
    {
      group: "For the reply",
      items: [
        "All GST returns filed for the periods under dispute",
        "Electronic credit and cash ledger extracts for those periods",
        "GSTR-2B for the periods where input credit is questioned",
        "Purchase invoices and proof of payment for disputed credit",
        "Sales invoices, e-way bills and delivery evidence for disputed supplies",
        "Audited financial statements and reconciliation for the years concerned",
      ],
    },
    {
      group: "For an appeal",
      items: [
        `The ${s("gstFormDemandOrder")} order being appealed`,
        "The complete reply and annexures filed at adjudication stage",
        "Record of the personal hearing, if one was held",
        "Proof of pre-deposit payment",
        "Board resolution or authorisation for the signatory, for companies and LLPs",
      ],
    },
  ],

  documentsNote:
    "Send the notice the day you receive it, even if you cannot gather anything else yet. Reply windows run from service, not from when you got around to reading it, and the single most common reason a good case becomes a bad one is a window that closed while documents were being collected.",

  process: [
    {
      step: 1,
      title: "Read the notice and fix the deadline",
      desc: "We identify what has been issued, under which section, for which periods, and exactly how many days remain. You get that in writing before anything else happens.",
      duration: t("gstNoticeInitialReview"),
    },
    {
      step: 2,
      title: "Test limitation and merits",
      desc: "Whether the demand is in time for that financial year, and whether the underlying allegation survives reconciliation. Sometimes the answer is that the department is right.",
      duration: "With the assessment",
    },
    {
      step: 3,
      title: "Agree the strategy",
      desc: `Contest, part-concede, or close it voluntarily through ${s("gstFormVoluntaryPayment")}. We put the options and the likely cost of each to you, and you choose.`,
      duration: "Before drafting",
    },
    {
      step: 4,
      title: "Draft, file and appear",
      desc: "Reply drafted and filed within the window, with the personal hearing attended and the matter argued.",
      duration: "Within the reply window",
    },
    {
      step: 5,
      title: "Appeal if the order goes against you",
      desc: `Grounds drafted and ${s("gstFormAppeal")} filed with the ${s("gstAppealPreDeposit")} pre-deposit, inside the ${s("gstAppealWindow")} window.`,
      duration: s("gstAppealWindow"),
    },
  ],

  timeline: [
    { stage: `Reply to ${s("gstFormScrutiny")} scrutiny notice`, days: s("gstFormScrutinyReply") },
    { stage: "Reply to a show cause notice", days: "As stated on the notice" },
    { stage: `First appeal against a ${s("gstFormDemandOrder")} order`, days: s("gstAppealWindow") },
    { stage: "Demand limitation — periods up to FY 2023-24, ordinary cases", days: s("gstDemandLegacyNonFraud") },
    { stage: "Demand limitation — periods up to FY 2023-24, fraud alleged", days: s("gstDemandLegacyFraud") },
    { stage: "Demand limitation — FY 2024-25 onwards, unified", days: s("gstDemandUnifiedLimitation") },
  ],

  fees: null,

  faqs: [
    {
      q: "I have received an ASMT-10. What is it and how long do I have?",
      a: `${s("gstFormScrutiny")} is a scrutiny notice under Section 61. The officer has compared your returns and found a discrepancy, and wants an explanation. You reply in ${s("gstFormScrutinyReply")}. It is the least severe stage and the cheapest to resolve — answered properly, it usually ends there.`,
    },
    {
      q: "What happens if I ignore a GST notice?",
      a: "The matter proceeds without your side of it. A scrutiny notice escalates to a show cause notice, a show cause notice becomes an adjudication order assessing tax on the department's figures, and your only remaining route is an appeal that costs a pre-deposit. Ignoring it removes options; it does not remove the demand.",
    },
    {
      q: "How long does the department have to raise a demand?",
      a: `It depends on the year. For periods up to FY 2023-24, ${s("gstDemandLegacyNonFraud")} for ordinary cases and ${s("gstDemandLegacyFraud")} where fraud is alleged, under Sections 73 and 74. From FY 2024-25, Section 74A applies a single ${s("gstDemandUnifiedLimitation")} limitation. A demand issued outside the applicable period is contestable on that ground alone.`,
    },
    {
      q: "What changed with Section 74A?",
      a: `Section 74A, inserted by the Finance (No. 2) Act 2024, replaced the separate fraud and non-fraud demand routes with one framework from FY 2024-25. The limitation became a uniform ${s("gstDemandUnifiedLimitation")} — longer than the old non-fraud period, shorter than the old fraud one. Penalty still turns on whether fraud is established.`,
    },
    {
      q: "The department says my input credit is wrong because my supplier did not file. Is that my problem?",
      a: "In practice, yes, which is unfair but is how it operates — your GSTR-2B only shows what suppliers reported. The answer is evidential: invoices, proof of payment, and evidence the supply happened. Cases like these are winnable, but on documents, not on the argument that it was not your fault.",
    },
    {
      q: "Should I just pay rather than fight it?",
      a: `Sometimes, and we will say so. Where the department is right, paying early through ${s("gstFormVoluntaryPayment")} limits interest and penalty and closes the matter. Contesting a demand you will lose costs fees, a ${s("gstAppealPreDeposit")} pre-deposit and years. The judgement is which situation you are actually in.`,
    },
    {
      q: "What does filing an appeal cost me upfront?",
      a: `A pre-deposit of ${s("gstAppealPreDeposit")}, paid before the appeal is admitted, plus the appeal must be filed within ${s("gstAppealWindow")}. The pre-deposit is not a penalty — it is refundable if you succeed — but it is real cash that must be found at the point of filing.`,
    },
    {
      q: "My registration has been cancelled. Can it be restored?",
      a: "Often, yes. Cancellation for non-filing can usually be revoked once the outstanding returns and dues are cleared, provided you apply within the prescribed window. The urgent part is the window, so treat a cancellation order as time-critical rather than something to resolve eventually.",
    },
  ],

  related: ["gst-return-filing", "gst-itc-refunds", "gst-registration"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "gstFormScrutiny",
      "gstFormScrutinyReply",
      "gstFormPreNotice",
      "gstFormShowCause",
      "gstFormVoluntaryPayment",
      "gstFormDemandOrder",
      "gstFormAppeal",
      "gstAppealWindow",
      "gstAppealPreDeposit",
      "gstDemandUnifiedLimitation",
      "gstDemandLegacyNonFraud",
      "gstDemandLegacyFraud",
    ],
    notes:
      "HIGHEST-RISK PAGE ON THE SITE — a visitor may act on this while a reply window is running. Confirm specifically: (1) that Section 74A applies from FY 2024-25 and 73/74 still govern up to FY 2023-24, as stated; (2) the condonation position on the 3-month appeal window; (3) whether the GST Appellate Tribunal route should be described, which the page currently omits; (4) that nothing here reads as a guarantee of outcome. Also confirm this page complies with the advertising restrictions on your registrations, since litigation support is the most sensitive service to advertise.",
  },
};
