import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: incorporation is the easy part and everyone sells it. What actually
// costs clients money is the post-incorporation compliance nobody warned them
// about — INC-20A, the auditor, the annual filings. Lead the overview with the
// structure decision, and make the obligations impossible to miss.

export default {
  slug: "private-limited-company",
  category: "business-setup",
  title: "Private Limited Company",
  h1: "Private Limited Company Registration in Salem, Tamil Nadu",

  meta: {
    title: "Private Limited Company Registration in Salem | ThinkOrange",
    description:
      "Company incorporation through SPICe+ with DIN, PAN and TAN, plus the first-year compliance set up properly. Salem, Tamil Nadu, for clients across India.",
    keywords: [
      "private limited company registration salem",
      "company incorporation consultant tamil nadu",
      "pvt ltd registration documents required",
      "spice plus incorporation process",
      "company registration salem",
    ],
  },

  lede:
    "Name approval, incorporation, share capital structuring, DIN and DSC for directors — and the first-year compliance calendar set up before it becomes a backlog.",

  overview: [
    `A Private Limited Company gives you a separate legal identity, limited liability for its shareholders, and the structure investors expect. It is the right choice if you intend to raise funding, bring in partners on defined equity, or sign contracts that outlive any one individual. It is the wrong choice if you want minimal paperwork — a company carries the heaviest ongoing compliance of any Indian structure.`,

    `The requirements are lighter than most people expect. You need ${s("pvtLtdMinMembers")}, up to a maximum of ${s("pvtLtdMaxShareholders")} shareholders, and one person can be both a director and a shareholder — so two people are enough. On capital: ${s("companyMinCapital").toLowerCase()}. The belief that ₹1 lakh is required has been wrong since 2015, and it still puts people off incorporating.`,

    `Incorporation itself runs through SPICe+, which covers ${s("spicePlusScope")} in a single application. The part that catches people out comes after. You must file INC-20A, the declaration of commencement of business, within ${s("inc20aWindow")} — and until you do, the company cannot legally begin trading or borrow. Add the auditor appointment and the annual AOC-4 and MGT-7 filings, and a company that was incorporated cheaply becomes expensive if nobody is tracking the dates.`,
  ],

  whoNeedsThis: [
    "You want limited liability, so business debts do not reach your personal assets.",
    "You intend to raise external funding — most investors will only put money into a company, not a firm or LLP.",
    "You are going into business with others and want shareholding, roles and exits defined on paper rather than by understanding.",
    "You need a structure that survives a change of people, for long-term contracts or tenders.",
    "You are bidding for work where the counterparty requires an incorporated entity with a CIN.",
    "You have an existing proprietorship or partnership that has outgrown its structure and want to convert.",
  ],

  included: [
    {
      title: "Structure advice before you commit",
      desc: "Whether a company is actually right for you compared with an LLP or OPC, and what the ongoing compliance will realistically cost each year.",
    },
    {
      title: "Name reservation",
      desc: "Name availability checked against existing companies and registered trademarks, then reserved — the stage where most rejections happen.",
    },
    {
      title: "DIN and Digital Signature Certificates",
      desc: "Director Identification Numbers obtained through the incorporation application, and Class 3 DSCs issued for each director. We issue certificates ourselves.",
    },
    {
      title: "Share capital structuring",
      desc: "Authorised and paid-up capital set sensibly, and the initial shareholding split recorded correctly so later changes are clean.",
    },
    {
      title: "Incorporation filing through SPICe+",
      desc: `MOA and AOA drafted, and the application filed covering ${s("spicePlusScope")}.`,
    },
    {
      title: "Certificate of Incorporation and CIN",
      desc: "Your incorporation certificate, PAN and TAN handed over, with the CIN and what it must appear on explained.",
    },
    {
      title: "Post-incorporation compliance setup",
      desc: `First board meeting, auditor appointment, bank account documentation and the INC-20A declaration within its ${s("inc20aWindow")} window.`,
    },
    {
      title: "Annual compliance calendar",
      desc: `AOC-4 within ${s("aoc4Window")} and MGT-7 within ${s("mgt7Window")}, with the dates handed to you rather than kept in our file.`,
    },
  ],

  documents: [
    {
      group: "From every director and shareholder",
      items: [
        "PAN card",
        "Aadhaar card",
        "Passport-sized photograph",
        "Identity proof — passport, driving licence or voter ID",
        "Address proof no older than two months — bank statement, or electricity, telephone or mobile bill",
        "Email address and mobile number for DIN and DSC",
      ],
    },
    {
      group: "For the registered office",
      items: [
        "Latest electricity bill, property tax receipt or municipal khata for the premises",
        "Rent agreement, where the premises are rented",
        "No Objection Certificate from the owner",
      ],
    },
    {
      group: "For foreign nationals or NRI directors",
      items: [
        "Passport, apostilled or notarised as applicable",
        "Address proof, apostilled or notarised",
        "Documents must be in English, or accompanied by a certified translation",
      ],
    },
  ],

  documentsNote:
    "Address proof for directors must be recent — anything more than about two months old is usually rejected, and it is the most common reason an otherwise complete application comes back. Send the newest bill you have, not the one you happen to have filed.",

  process: [
    {
      step: 1,
      title: "Structure and name",
      desc: "We confirm a company is the right vehicle, then check and reserve a name that is clear of existing companies and trademarks.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Documents and DSC",
      desc: "Director documents collected and verified, and Class 3 Digital Signature Certificates issued for each signatory.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Incorporation filed",
      desc: `MOA and AOA drafted and the SPICe+ application submitted, covering ${s("spicePlusScope")}.`,
      duration: "On document completion",
    },
    {
      step: 4,
      title: "Certificate issued",
      desc: "The Registrar issues the Certificate of Incorporation with your CIN, together with PAN and TAN.",
      duration: "On approval",
    },
    {
      step: 5,
      title: "First-year compliance set up",
      desc: `Board meeting, auditor appointed, bank account opened, and INC-20A filed inside its ${s("inc20aWindow")} window.`,
      duration: s("inc20aWindow"),
    },
  ],

  timeline: [
    { stage: "Name reservation", days: t("incorporationNameStage") },
    { stage: "Document collection and DSC issue", days: t("incorporationDocPrep") },
    { stage: "INC-20A — declaration of commencement of business", days: s("inc20aWindow") },
    { stage: "AOC-4 — financial statements, annually", days: s("aoc4Window") },
    { stage: "MGT-7 — annual return", days: s("mgt7Window") },
  ],

  fees: null,

  faqs: [
    {
      q: "How much capital do I need to start a private limited company?",
      a: `${s("companyMinCapital")}. You declare an authorised share capital, but there is no floor you must actually bring in. The old ₹1 lakh requirement was removed by the Companies (Amendment) Act 2015 and still puts people off unnecessarily.`,
    },
    {
      q: "How many people do I need?",
      a: `${s("pvtLtdMinMembers")}, and the same person can hold both roles — so two people are enough to incorporate. The maximum is ${s("pvtLtdMaxShareholders")} shareholders, not counting employees holding shares under an ESOP. Directors must be individuals, not other companies.`,
    },
    {
      q: "What is INC-20A and why does it matter so much?",
      a: `It is the declaration that your company has commenced business, and it must be filed within ${s("inc20aWindow")}. Until it is filed the company cannot legally trade or borrow. It is the single most commonly missed post-incorporation step, and the consequences are disproportionate to how small the filing is.`,
    },
    {
      q: "Should I choose a company or an LLP?",
      a: "A company if you want outside investment, defined equity or a structure investors recognise. An LLP if you want limited liability with materially lighter annual compliance and no plans to raise funding. The compliance difference is the real deciding factor, not the incorporation cost.",
    },
    {
      q: "What ongoing compliance does a company carry?",
      a: `An annual general meeting, audited accounts, an appointed auditor, AOC-4 within ${s("aoc4Window")}, MGT-7 within ${s("mgt7Window")}, board meetings through the year, and director KYC. This is real, recurring work — budget for it before incorporating rather than discovering it later.`,
    },
    {
      q: "Do all directors need a Digital Signature Certificate?",
      a: "Every director signing the incorporation application needs a Class 3 DSC, and directors who sign later filings need to keep one current. We issue Class 3 certificates ourselves, so it stays part of the same engagement rather than a separate errand.",
    },
    {
      q: "Can I register the company at my home address?",
      a: "Yes. A residential address is acceptable as the registered office, provided you can produce ownership or rent proof and the owner's No Objection Certificate. You can change the registered office later, though a change between states is a longer process than a change within one.",
    },
    {
      q: "Can I convert my existing proprietorship or partnership into a company?",
      a: "Yes, and it is common once turnover or risk grows. Conversion is more involved than a fresh incorporation because assets, contracts and registrations have to move across, and the tax treatment of the transfer needs planning before you start rather than after.",
    },
  ],

  related: ["llp-registration", "opc-registration", "class-3-organisation"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "pvtLtdMinMembers",
      "pvtLtdMaxShareholders",
      "companyMinCapital",
      "spicePlusScope",
      "inc20aWindow",
      "aoc4Window",
      "mgt7Window",
    ],
    notes:
      "Deliberately omitted pending confirmation: (1) AOC-4 and MGT-7 late-filing penalty amounts — research returned conflicting figures (₹100/day vs ₹1,000/day, probably additional fee vs penalty); (2) AGM timing rules, including the first-AGM window; (3) the auditor appointment deadline; (4) DIR-3 KYC date; (5) MCA government fees, which vary with authorised capital. Confirm the two-month recency rule for director address proof, which is practice rather than a stated rule.",
  },
};
