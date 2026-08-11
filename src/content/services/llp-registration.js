import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: the LLP's selling point is lighter compliance than a company — but its
// late fee has NO CAP, which is the one genuinely nasty feature and the thing
// clients are never told. Make that the memorable fact on the page.

export default {
  slug: "llp-registration",
  category: "business-setup",
  title: "LLP Registration",
  h1: "LLP Registration in Salem, Tamil Nadu",

  meta: {
    title: "LLP Registration in Salem, Tamil Nadu | ThinkOrange Consulting",
    description:
      "Limited Liability Partnership formation, LLP agreement drafting and annual Form 8 and Form 11 compliance. Salem, Tamil Nadu, for clients across India.",
    keywords: [
      "llp registration salem",
      "llp registration consultant tamil nadu",
      "limited liability partnership formation",
      "llp agreement drafting",
      "llp annual compliance form 8 form 11",
    ],
  },

  lede:
    "Formation, LLP agreement drafting and annual compliance — limited liability without the full weight of company obligations.",

  overview: [
    `A Limited Liability Partnership sits between a partnership firm and a company. Partners get limited liability, so one partner's mistake does not reach another's personal assets, but the structure avoids much of the machinery a company carries — no board meetings, no company secretary, and materially lighter annual filing.`,

    `You need ${s("llpMinPartners")}. There is no minimum capital contribution. The document that matters most is the LLP agreement, which sets out profit sharing, decision rights, what happens when a partner leaves and how disputes are settled — and it must be filed in Form 3 within ${s("llpAgreementWindow")}. Where partners skip drafting it properly, the default provisions of the LLP Act apply instead, and those are rarely what anyone actually wanted.`,

    `One feature deserves emphasis, because it is the LLP's genuine trap. Annual filings are Form 11 by ${s("llpForm11Due")} and Form 8 by ${s("llpForm8Due")}, and the late fee is ${s("llpLateFee")}. No cap. A dormant LLP that nobody filed for can accumulate a penalty larger than anything the business ever earned — and unlike a company, there is no ceiling to stop it. If you register an LLP, the filings are not optional even in a year with no activity.`,
  ],

  whoNeedsThis: [
    "You are going into business with partners and want limited liability without a company's compliance load.",
    "You are a professional firm — consultants, architects, designers — where partners want liability separated from each other.",
    "You want a structure where profit sharing can be defined flexibly by agreement rather than strictly by shareholding.",
    "You have no plans to raise equity funding, which an LLP is poorly suited to.",
    "You are converting an existing partnership firm and want the liability protection without becoming a company.",
    "You want a legal entity that continues regardless of changes in partners.",
  ],

  included: [
    {
      title: "Structure advice",
      desc: "Whether an LLP genuinely suits you against a company or partnership firm, with the annual compliance cost of each set out honestly.",
    },
    {
      title: "Name reservation",
      desc: "Name checked against existing LLPs, companies and trademarks, then reserved.",
    },
    {
      title: "DPIN and Digital Signature Certificates",
      desc: "Designated Partner Identification Numbers obtained, and Class 3 DSCs issued for each designated partner.",
    },
    {
      title: "Incorporation through FiLLiP",
      desc: "The incorporation application prepared and filed, with PAN and TAN applications alongside.",
    },
    {
      title: "LLP agreement drafting",
      desc: `The agreement drafted around how you actually intend to operate — contribution, profit share, decision rights, exit and dispute resolution — and filed in Form 3 within ${s("llpAgreementWindow")}.`,
    },
    {
      title: "Annual compliance",
      desc: `Form 11 by ${s("llpForm11Due")} and Form 8 by ${s("llpForm8Due")}, filed on time because the late fee has no ceiling.`,
    },
    {
      title: "Partner changes",
      desc: "Admission, resignation and change of designated partners, with the agreement amended and filed rather than left inconsistent.",
    },
    {
      title: "Conversion support",
      desc: "Converting an existing partnership firm into an LLP, or an LLP into a company if you later need to raise equity.",
    },
  ],

  documents: [
    {
      group: "From every partner",
      items: [
        "PAN card",
        "Aadhaar card",
        "Passport-sized photograph",
        "Identity proof — passport, driving licence or voter ID",
        "Address proof no older than two months — bank statement, or electricity, telephone or mobile bill",
        "Email address and mobile number",
      ],
    },
    {
      group: "For the registered office",
      items: [
        "Latest electricity bill, property tax receipt or municipal khata",
        "Rent agreement, where the premises are rented",
        "No Objection Certificate from the owner",
      ],
    },
    {
      group: "For the LLP agreement",
      items: [
        "Capital contribution by each partner, and in what form",
        "Profit and loss sharing ratio",
        "Which decisions need unanimous consent and which do not",
        "How a partner may exit, and how their contribution is valued",
        "Who among the partners will be designated partners",
      ],
    },
  ],

  documentsNote:
    "The LLP agreement inputs are worth real thought rather than accepting a template. Almost every LLP dispute we see traces back to an agreement that copied standard clauses and never addressed how these particular partners intended to make decisions or part company.",

  process: [
    {
      step: 1,
      title: "Structure and name",
      desc: "We confirm an LLP fits, then check and reserve a name clear of existing LLPs, companies and trademarks.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Documents and DSC",
      desc: "Partner documents collected and verified, and Class 3 Digital Signature Certificates issued for designated partners.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Incorporation filed",
      desc: "The FiLLiP application submitted, with DPIN allotment and PAN and TAN applications alongside.",
      duration: "On document completion",
    },
    {
      step: 4,
      title: "Certificate and agreement",
      desc: `The Certificate of Incorporation issued, then the LLP agreement drafted and filed in Form 3 within ${s("llpAgreementWindow")}.`,
      duration: s("llpAgreementWindow"),
    },
    {
      step: 5,
      title: "Annual compliance handed over",
      desc: `Your Form 11 and Form 8 dates set out in writing, with the uncapped late fee explained so nobody treats them as optional.`,
      duration: "Annually",
    },
  ],

  timeline: [
    { stage: "Name reservation", days: t("incorporationNameStage") },
    { stage: "Document collection and DSC issue", days: t("incorporationDocPrep") },
    { stage: "LLP agreement filing in Form 3", days: s("llpAgreementWindow") },
    { stage: "Form 11 — annual return", days: s("llpForm11Due") },
    { stage: "Form 8 — statement of account and solvency", days: s("llpForm8Due") },
  ],

  fees: null,

  faqs: [
    {
      q: "How many partners do I need for an LLP?",
      a: `${s("llpMinPartners")}. There is no upper limit on the number of partners, and no minimum capital contribution. Designated partners carry the compliance responsibility, so who takes that role is worth deciding deliberately rather than by default.`,
    },
    {
      q: "What are the LLP annual filing deadlines?",
      a: `Form 11, the annual return, by ${s("llpForm11Due")}. Form 8, the statement of account and solvency, by ${s("llpForm8Due")}. Both are due every year regardless of whether the LLP traded, and both are filed with designated partners' digital signatures.`,
    },
    {
      q: "What happens if I miss an LLP filing?",
      a: `The late fee is ${s("llpLateFee")} — and the absence of a cap is the problem. A dormant LLP left unfiled for a few years can accumulate a penalty far larger than the business ever earned. This is the single strongest argument for keeping an LLP filed even when inactive.`,
    },
    {
      q: "Should I choose an LLP or a private limited company?",
      a: "An LLP for lighter annual compliance and flexible profit sharing. A company if you want outside investment, since investors generally will not take equity in an LLP. Decide on the funding question first — it settles the answer more often than anything else.",
    },
    {
      q: "How important is the LLP agreement?",
      a: `It governs everything about how the LLP operates, and must be filed within ${s("llpAgreementWindow")}. Without a properly drafted one, the LLP Act's default provisions apply, and those split profits and decision rights in ways partners rarely intend. Treat it as the main deliverable, not paperwork.`,
    },
    {
      q: "Can an LLP be converted into a company later?",
      a: "Yes, and it is a common path once a business needs equity funding. Conversion is a formal process rather than a switch, and assets, contracts and registrations all have to be moved across, so it is worth planning the tax treatment before you begin.",
    },
    {
      q: "Does an LLP need an audit?",
      a: "Only above prescribed turnover and contribution limits — below those, accounts must still be maintained and Form 8 filed, but a statutory audit is not required. Confirm the current limits with us for your figures, as they determine a meaningful part of your annual cost.",
    },
  ],

  related: ["private-limited-company", "partnership-firm", "class-3-organisation"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "llpMinPartners",
      "llpAgreementWindow",
      "llpForm11Due",
      "llpForm8Due",
      "llpLateFee",
    ],
    notes:
      "Deliberately omitted pending confirmation: the LLP audit turnover and contribution thresholds — the FAQ acknowledges the limits exist without stating figures, which is honest but should be completed once confirmed. Also confirm that Form 8 and Form 11 due dates are fixed calendar dates rather than derived from the financial year end, and confirm the uncapped nature of the ₹100/day fee, which is the strongest claim on the page.",
  },
};
