import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: there is no such thing as "registering a proprietorship" — it is not a
// separate entity, so there is nothing to register. What people actually need is
// the set of registrations that make one operational: GST, Udyam, a current
// account. Being straight about that is more useful than selling a certificate
// that does not exist, and it is what competitors obscure.

export default {
  slug: "proprietorship",
  category: "business-setup",
  title: "Proprietorship",
  h1: "Proprietorship Registration in Salem, Tamil Nadu",

  meta: {
    title: "Proprietorship Registration in Salem | ThinkOrange Consulting",
    description:
      "The registrations that make a sole proprietorship operational — GST, Udyam and current account documentation. Salem, Tamil Nadu.",
    keywords: [
      "proprietorship registration salem",
      "sole proprietorship registration tamil nadu",
      "proprietorship current account documents",
      "udyam registration proprietor",
      "proprietorship vs opc",
    ],
  },

  lede:
    "The fastest route to start trading — GST registration, Udyam registration and current account documentation, set up in your own name.",

  overview: [
    `A proprietorship is the simplest way to trade in India, and the first thing worth understanding is that there is no such thing as registering one. A proprietorship is not a separate legal entity — legally, the business is you. There is no certificate of incorporation, no registration number and no registrar. Anyone offering you a "proprietorship registration certificate" is selling you something that does not exist.`,

    `What you actually need is the set of registrations that make a proprietorship operational, and which ones depend on what you do. GST registration if your turnover crosses the threshold or you sell inter-state or online. Udyam registration to be recognised as an MSME, which brings priority lending, tender preferences and protection on delayed payments. A Shop and Establishment registration in many cases. And a current account, which banks will open in your trade name once you can show them the right combination of the above.`,

    `The consequence of being legally identical to your business is unlimited liability — a business debt is your personal debt, and a claim can reach your personal assets. That is the real reason to move to an OPC or a company as you grow, and it matters more than the tax position. For a small, low-risk business it is an acceptable trade for near-zero compliance; for anything carrying real exposure, it is not.`,
  ],

  whoNeedsThis: [
    "You want to start trading quickly with minimal cost and paperwork.",
    "You are a single owner and do not need a separate legal entity yet.",
    `Your turnover has crossed ${s("gstThresholdGoods")} for goods or ${s("gstThresholdServices")} for services and you now need GST registration.`,
    "You sell inter-state or through an e-commerce platform, which requires GST registration at any turnover.",
    "You need Udyam registration to access MSME benefits, tender preferences or priority sector lending.",
    "A bank has asked for business registration proof before opening a current account in your trade name.",
  ],

  included: [
    {
      title: "What you actually need, assessed",
      desc: "Which registrations your business genuinely requires, and which ones you can skip — rather than a bundle sold regardless of relevance.",
    },
    {
      title: "GST registration",
      desc: "Where you are liable or where voluntary registration helps you claim input credit and supply registered businesses.",
    },
    {
      title: "Udyam (MSME) registration",
      desc: "Registration on the Udyam portal, which unlocks priority sector lending, government tender preferences and delayed payment protection.",
    },
    {
      title: "Shop and Establishment registration",
      desc: "Where your premises and activity require it under Tamil Nadu rules.",
    },
    {
      title: "Current account documentation",
      desc: "The document set banks ask for to open a current account in your trade name, assembled so you are not sent away twice.",
    },
    {
      title: "Bookkeeping setup",
      desc: "Books established in Tally Prime or Zoho Books from the start, so the first year is not reconstructed later from bank statements.",
    },
    {
      title: "Compliance calendar",
      desc: "Your GST return dates and any TDS obligations set out, so nothing is missed in the first year.",
    },
    {
      title: "Conversion advice for later",
      desc: "When it is worth moving to an OPC or private limited company, and what that involves before it becomes urgent.",
    },
  ],

  documents: [
    {
      group: "Identity and address",
      items: [
        "PAN card of the proprietor",
        "Aadhaar card, linked to an active mobile number",
        "Passport-sized photograph",
      ],
    },
    {
      group: "Place of business",
      items: [
        "Latest electricity bill, property tax receipt or municipal khata for owned premises",
        "Rent agreement plus a No Objection Certificate from the owner for rented premises",
        "A residential address may be used as the place of business",
      ],
    },
    {
      group: "Banking",
      items: [
        "Existing bank statement or passbook",
        "Proposed trade name for the current account",
        "Any registration certificate obtained above, which the bank will ask to see",
      ],
    },
  ],

  documentsNote:
    "Banks vary in what they accept as business proof for a current account. Most want at least one government registration in the trade name — usually GST or Udyam — so if a current account is the goal, that is the registration to get first.",

  process: [
    {
      step: 1,
      title: "Work out what you need",
      desc: "We ask what you sell, to whom and where, then tell you which registrations apply and which do not.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Documents collected",
      desc: "Your identity, address and premises documents assembled and checked before anything is filed.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Registrations filed",
      desc: "GST, Udyam and Shop and Establishment applications filed as applicable, and tracked through to issue.",
      duration: "Varies by registration",
    },
    {
      step: 4,
      title: "Current account opened",
      desc: "Documentation prepared for your bank so the account opens in your trade name without repeat visits.",
      duration: "After registrations issue",
    },
    {
      step: 5,
      title: "Books and calendar set up",
      desc: "Accounting set up from day one and your compliance dates handed over in writing.",
      duration: "On completion",
    },
  ],

  timeline: [
    { stage: "Assessment of what applies", days: t("incorporationNameStage") },
    { stage: "Document collection", days: t("incorporationDocPrep") },
    { stage: "GST registration — standard approval", days: s("gstRegStandardDays") },
    { stage: "Udyam registration", days: "Usually immediate" },
    { stage: "Current account opening", days: "Bank dependent" },
  ],

  fees: null,

  faqs: [
    {
      q: "Is there a certificate for proprietorship registration?",
      a: "No, and this is worth being clear about. A proprietorship is not a separate legal entity, so there is no registrar, no registration number and no certificate. What exists are the registrations that make it operational — GST, Udyam, Shop and Establishment. Anyone selling a proprietorship certificate is selling nothing.",
    },
    {
      q: "What do I need to open a current account?",
      a: "Banks generally want at least one government registration in your trade name, most commonly GST or Udyam, plus your PAN, Aadhaar and premises proof. Requirements vary between banks, so it is worth confirming with yours before applying rather than after being turned away.",
    },
    {
      q: "Do I need GST registration as a proprietor?",
      a: `Only if you are liable. That means turnover above ${s("gstThresholdGoods")} for goods or ${s("gstThresholdServices")} for services, or any inter-state or e-commerce selling regardless of turnover. Below that you can register voluntarily to claim input credit, which suits some businesses and not others.`,
    },
    {
      q: "What is Udyam registration and is it worth doing?",
      a: "It is MSME recognition on the Udyam portal, and it is usually worth doing because it is free and quick. It gives access to priority sector lending, preference in government tenders, and protection under the MSMED Act against delayed payment by buyers.",
    },
    {
      q: "What is the liability risk of a proprietorship?",
      a: "Unlimited. Because the business is legally you, a business debt is your personal debt and a claim can reach your personal assets. For a small, low-risk business that is an acceptable trade for almost no compliance. For anything with real exposure, it is the reason to incorporate.",
    },
    {
      q: "When should I move to an OPC or a company?",
      a: "When liability starts to matter more than simplicity — you are taking on larger contracts, borrowing, hiring, or carrying stock and credit risk. Also when a client or platform will not deal with an unincorporated business. It is a risk decision more than a tax one.",
    },
    {
      q: "How is a proprietorship taxed?",
      a: "Business income is taxed as your personal income, at your applicable slab, and filed in your own return rather than a separate one for the business. The specific provisions and any presumptive scheme are being re-confirmed against the new income tax legislation, so we will advise on your figures.",
    },
  ],

  related: ["opc-registration", "msme-udyam", "gst-registration"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["gstThresholdGoods", "gstThresholdServices", "gstRegStandardDays"],
    notes:
      "Lowest statutory density of the batch — deliberately, since most of the page is structural explanation rather than statutory claims. Confirm: (1) that Shop and Establishment registration is described correctly for Tamil Nadu; (2) the MSMED Act delayed-payment protection claim; (3) the taxation FAQ defers presumptive-scheme detail to the new Income Tax Act 2025, which is correct given BLOCKERS.md §1 but should be completed once unblocked.",
  },
};
