import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: registration of a partnership firm is OPTIONAL, which sounds like good
// news and is actually the trap — an unregistered firm cannot sue to enforce its
// own contracts. That single consequence is the most useful thing this page can
// tell someone, so it leads.

export default {
  slug: "partnership-firm",
  category: "business-setup",
  title: "Partnership Firm",
  h1: "Partnership Firm Registration in Salem, Tamil Nadu",

  meta: {
    title: "Partnership Firm Registration in Salem | ThinkOrange Consulting",
    description:
      "Partnership deed drafting and firm registration under the Indian Partnership Act 1932, with PAN and TAN. Salem, Tamil Nadu.",
    keywords: [
      "partnership firm registration salem",
      "partnership deed drafting tamil nadu",
      "partnership firm registration process",
      "unregistered partnership firm consequences",
      "partnership vs llp",
    ],
  },

  lede:
    "Deed drafting, firm registration and PAN and TAN — the simplest way for two or more people to trade together, done so it holds up later.",

  overview: [
    `A partnership firm is the least formal way for two or more people to run a business together. It is governed by the ${s("partnershipStatute")}, needs no minimum capital, and carries almost no annual filing. The whole arrangement rests on one document: the partnership deed.`,

    `Registration of the firm is optional under the Act, which sounds convenient and is the most misunderstood point in this area. An unregistered firm can trade perfectly legally — but it cannot file a suit to enforce a contract against a third party, and a partner cannot sue the firm or the other partners to enforce rights under the deed. You keep the option of doing business and lose the option of enforcing it. That asymmetry only becomes visible when something has already gone wrong.`,

    `The trade-off against an LLP is liability. Partners in a firm carry unlimited joint liability, so a partner's business debts can reach every partner's personal assets. If that concerns you and the lighter compliance is not decisive, an LLP gives you the same flexibility with liability contained.`,
  ],

  whoNeedsThis: [
    "Two or more people want to run a business together with minimal formality and cost.",
    "You want a written record of profit sharing, capital contribution and responsibilities before disagreements arise.",
    "You need a firm PAN to open a current account or apply for GST registration.",
    "You are trading as an informal partnership already and want the arrangement documented properly.",
    "You want the ability to enforce your contracts in court, which requires the firm to be registered.",
    "You accept unlimited liability, or you want to compare a firm against an LLP before committing.",
  ],

  included: [
    {
      title: "Structure advice",
      desc: "Whether a firm or an LLP suits you, with the liability difference explained in concrete terms rather than as a formality.",
    },
    {
      title: "Partnership deed drafting",
      desc: "Capital contribution, profit and loss sharing, roles, decision rights, admission and retirement of partners, and dispute resolution — drafted around your actual arrangement.",
    },
    {
      title: "Stamping and execution",
      desc: "The deed stamped at the applicable value and executed correctly, so it is admissible if it is ever needed.",
    },
    {
      title: "Firm registration",
      desc: `Registration with the Registrar of Firms under the ${s("partnershipStatute")}, so the firm retains the right to enforce its contracts.`,
    },
    {
      title: "PAN and TAN",
      desc: "Firm PAN and TAN applications, which you will need for a current account, GST registration and any TDS obligations.",
    },
    {
      title: "Bank account documentation",
      desc: "The document set banks ask for when opening a current account in the firm's name.",
    },
    {
      title: "Deed amendments",
      desc: "Changes on admission, retirement or death of a partner, or a change in profit sharing, drafted and recorded properly.",
    },
    {
      title: "Conversion to an LLP",
      desc: "Where liability becomes the deciding factor later, conversion handled rather than starting again.",
    },
  ],

  documents: [
    {
      group: "From every partner",
      items: [
        "PAN card",
        "Aadhaar card",
        "Passport-sized photograph",
        "Address proof — passport, driving licence, voter ID or a recent utility bill",
      ],
    },
    {
      group: "For the firm",
      items: [
        "Proposed firm name",
        "Proof of the firm's place of business — electricity bill, property tax receipt or municipal khata",
        "Rent agreement and No Objection Certificate, where the premises are rented",
      ],
    },
    {
      group: "For the deed",
      items: [
        "Capital contributed by each partner",
        "Profit and loss sharing ratio",
        "Roles and responsibilities of each partner",
        "Whether the partnership is at will or for a fixed term",
        "How a partner may be admitted, retire or be removed",
        "How disputes will be resolved",
      ],
    },
  ],

  documentsNote:
    "Stamp duty on a partnership deed is a state matter and varies with capital, so the figure for a Tamil Nadu firm is confirmed at drafting rather than quoted upfront. Spend the time on the deed inputs — it is the entire legal basis of the arrangement.",

  process: [
    {
      step: 1,
      title: "Structure and terms",
      desc: "We confirm a firm suits you rather than an LLP, and work through the commercial terms the deed needs to capture.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Deed drafted and reviewed",
      desc: "The deed drafted around your arrangement and sent for your review, with anything ambiguous flagged before signature.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Stamping and execution",
      desc: "The deed stamped at the applicable value and executed by all partners.",
      duration: "On approval of the draft",
    },
    {
      step: 4,
      title: "Registration with the Registrar of Firms",
      desc: "The application filed so the firm is registered and retains the right to enforce its contracts.",
      duration: "After execution",
    },
    {
      step: 5,
      title: "PAN, TAN and bank account",
      desc: "Firm PAN and TAN applied for and the current account documentation prepared.",
      duration: "Alongside registration",
    },
  ],

  timeline: [
    { stage: "Terms discussion and deed drafting", days: t("incorporationDocPrep") },
    { stage: "Stamping and execution", days: "On approval of the draft" },
    { stage: "Registration with the Registrar of Firms", days: "Varies by office" },
    { stage: "PAN and TAN issue", days: "Varies" },
  ],

  fees: null,

  faqs: [
    {
      q: "Is registering a partnership firm compulsory?",
      a: `No — registration is optional under the ${s("partnershipStatute")}. But an unregistered firm cannot sue to enforce a contract against a third party, and partners cannot sue each other to enforce the deed. You can trade unregistered; you cannot enforce. That is why we recommend registering.`,
    },
    {
      q: "What is the difference between a partnership firm and an LLP?",
      a: "Liability. Partners in a firm carry unlimited joint liability, so business debts can reach personal assets. In an LLP, liability is limited to each partner's contribution. A firm has lighter compliance; an LLP has annual filings but contains the risk.",
    },
    {
      q: "How many partners can a firm have?",
      a: "A minimum of two. The maximum is prescribed and differs for certain professions, so confirm it with us for your case. There is no minimum capital requirement, and contributions need not be equal.",
    },
    {
      q: "What should the partnership deed cover?",
      a: "Capital contribution, profit and loss sharing, each partner's role and authority, whether the partnership is at will or fixed-term, how partners are admitted or retire, and how disputes are settled. Silence on any of these means the Act's defaults apply instead.",
    },
    {
      q: "What is the stamp duty on a partnership deed?",
      a: "Stamp duty is a state subject and varies with the capital contributed, so the figure for a Tamil Nadu firm is confirmed when the deed is drafted rather than quoted in advance. Under-stamping is worth avoiding, since it affects whether the deed is admissible in evidence.",
    },
    {
      q: "Does a partnership firm need an audit?",
      a: "Not under partnership law itself. An audit may be required under income tax provisions once turnover crosses the applicable threshold. Those thresholds are currently being re-confirmed against the new income tax legislation, so we will advise on your specific figures.",
    },
    {
      q: "Can a partnership firm be converted into an LLP or a company?",
      a: "Yes, both are established routes and common once liability or funding becomes a concern. Conversion moves assets, contracts and registrations across, so the tax treatment of the transfer is worth planning before you begin rather than afterwards.",
    },
  ],

  related: ["llp-registration", "proprietorship", "private-limited-company"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["partnershipStatute"],
    notes:
      "Deliberately omitted pending confirmation: (1) the maximum number of partners, which the FAQ acknowledges without stating; (2) Tamil Nadu stamp duty rates for a partnership deed; (3) the income tax audit threshold for firms, which the FAQ explicitly defers because it depends on the new Income Tax Act 2025 — see BLOCKERS.md §1. Confirm the enforceability consequences of non-registration are stated accurately, as that is the page's central claim.",
  },
};
