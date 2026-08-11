import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: the internet is full of the OLD OPC rules. The ₹50 lakh / ₹2 crore
// mandatory conversion thresholds were removed in 2021, and the residency test
// dropped from 182 to 120 days. Competitors' pages still state the old figures.
// Getting this right is a genuine differentiator, so say so plainly.

export default {
  slug: "opc-registration",
  category: "business-setup",
  title: "One Person Company",
  h1: "One Person Company (OPC) Registration in Salem, Tamil Nadu",

  meta: {
    title: "One Person Company (OPC) Registration in Salem | ThinkOrange",
    description:
      "OPC incorporation for solo founders — limited liability with a single member, current rules on residency and conversion. Salem, Tamil Nadu.",
    keywords: [
      "opc registration salem",
      "one person company registration tamil nadu",
      "opc turnover limit",
      "opc vs proprietorship",
      "one person company nominee requirement",
    ],
  },

  lede:
    "Limited liability for a single founder — corporate standing without needing a second shareholder, and without the conversion ceiling that used to apply.",

  overview: [
    `A One Person Company gives a solo founder what a proprietorship cannot: a separate legal entity and limited liability, without having to find a second shareholder. It needs ${s("opcStructure")}. The nominee is the distinctive requirement — a person you name who takes over membership if you die or become incapacitated, which is also the feature that makes an OPC more robust than a proprietorship.`,

    `Two rules changed in 2021 and much of what is published online is still out of date. First, conversion: ${s("opcMandatoryConversion").toLowerCase()}. The ceilings of ${s("opcRepealedConversionThresholds")} that once forced an OPC to become a private limited company were removed, so an OPC can now operate at any scale indefinitely and convert voluntarily whenever it suits. Second, residency: the test is now ${s("opcResidency")}, reduced from 182 days, and non-resident Indian citizens may incorporate an OPC.`,

    `The honest trade-off is compliance. An OPC is a company, so it carries audited accounts, an appointed auditor and annual ROC filings — considerably more than a proprietorship. Choose it when limited liability or corporate standing genuinely matters to you, not to look more established than you are.`,
  ],

  whoNeedsThis: [
    "You are a single founder who wants limited liability, so business risk does not reach your personal assets.",
    "You want a corporate identity and a CIN, because clients or platforms will not contract with a proprietorship.",
    "You have outgrown a proprietorship but have no second shareholder to bring in.",
    "You want the business to survive you — the nominee structure means it does not simply end.",
    `You are an Indian citizen meeting the ${s("opcResidency")} residency test, or a non-resident Indian citizen.`,
    "You expect to convert to a private limited company later and want to start with corporate structure in place.",
  ],

  included: [
    {
      title: "Structure advice",
      desc: "Whether an OPC is genuinely better for you than a proprietorship or a two-shareholder company, with the annual compliance cost of each.",
    },
    {
      title: "Nominee selection guidance",
      desc: "Who can act as nominee, what they are agreeing to, and the consent that must be recorded — the part founders usually treat too lightly.",
    },
    {
      title: "Name reservation",
      desc: "Name checked and reserved, with the required OPC suffix applied correctly.",
    },
    {
      title: "DIN and Digital Signature Certificate",
      desc: "Director Identification Number obtained and a Class 3 DSC issued. We issue certificates ourselves.",
    },
    {
      title: "Incorporation through SPICe+",
      desc: `MOA and AOA drafted for a single member, and the application filed covering ${s("spicePlusScope")}.`,
    },
    {
      title: "Post-incorporation setup",
      desc: `Auditor appointment, bank account documentation and the INC-20A declaration within its ${s("inc20aWindow")} window.`,
    },
    {
      title: "Annual compliance",
      desc: `Audited accounts, AOC-4 within ${s("aoc4Window")} and the annual return, with the dates handed to you.`,
    },
    {
      title: "Conversion when you are ready",
      desc: "Voluntary conversion to a private limited company at any point — no waiting period and no turnover trigger to wait for.",
    },
  ],

  documents: [
    {
      group: "From the member and director",
      items: [
        "PAN card",
        "Aadhaar card",
        "Passport-sized photograph",
        "Identity proof — passport, driving licence or voter ID",
        "Address proof no older than two months",
        "Email address and mobile number",
      ],
    },
    {
      group: "From the nominee",
      items: [
        "PAN and Aadhaar",
        "Written consent to act as nominee",
        "Confirmation that the nominee is an Indian citizen and resident",
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
  ],

  documentsNote:
    "The nominee's consent is a real undertaking, not a formality — they are agreeing to take over the company. Have the conversation properly before naming someone, and tell them they can be replaced later if circumstances change.",

  process: [
    {
      step: 1,
      title: "Structure, name and nominee",
      desc: "We confirm an OPC suits you, reserve the name, and settle who the nominee will be with their consent recorded.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Documents and DSC",
      desc: "Your documents and the nominee's collected and verified, and a Class 3 Digital Signature Certificate issued.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Incorporation filed",
      desc: `MOA and AOA drafted for a single member and the SPICe+ application submitted, covering ${s("spicePlusScope")}.`,
      duration: "On document completion",
    },
    {
      step: 4,
      title: "Certificate issued",
      desc: "Certificate of Incorporation with your CIN, plus PAN and TAN.",
      duration: "On approval",
    },
    {
      step: 5,
      title: "First-year compliance set up",
      desc: `Auditor appointed, bank account opened, and INC-20A filed inside its ${s("inc20aWindow")} window.`,
      duration: s("inc20aWindow"),
    },
  ],

  timeline: [
    { stage: "Name reservation and nominee consent", days: t("incorporationNameStage") },
    { stage: "Document collection and DSC issue", days: t("incorporationDocPrep") },
    { stage: "INC-20A — declaration of commencement of business", days: s("inc20aWindow") },
    { stage: "AOC-4 — financial statements, annually", days: s("aoc4Window") },
  ],

  fees: null,

  faqs: [
    {
      q: "Is there a turnover limit above which an OPC must convert?",
      a: `No. ${s("opcMandatoryConversion")}. The ceilings of ${s("opcRepealedConversionThresholds")} were removed by the Companies (Incorporation) Second Amendment Rules 2021. Many websites still state them. An OPC can operate at any scale indefinitely and convert voluntarily whenever it chooses.`,
    },
    {
      q: "Who can incorporate an OPC?",
      a: `A natural person who is an Indian citizen. The residency test is ${s("opcResidency")}, reduced from 182 days in 2021, and non-resident Indian citizens may now incorporate one too. One person can hold only one OPC at a time.`,
    },
    {
      q: "Why does an OPC need a nominee?",
      a: "Because a company must be able to continue when its only member cannot. The nominee steps into membership on your death or incapacity, which is precisely what a proprietorship cannot do. They must be an Indian citizen and resident, must consent in writing, and can be changed later.",
    },
    {
      q: "How is an OPC different from a proprietorship?",
      a: "An OPC is a separate legal entity with limited liability; a proprietorship is legally you. That protection is the main reason to choose an OPC. The cost is compliance — audited accounts, an auditor and annual ROC filings, none of which a proprietorship carries.",
    },
    {
      q: "Should I start with an OPC or a private limited company?",
      a: "An OPC if you genuinely have no second shareholder and want to start now. A private limited company if you have or expect a co-founder or investor, since investors cannot hold shares in an OPC. Converting later is straightforward, so starting as an OPC is not a trap.",
    },
    {
      q: "What annual compliance does an OPC carry?",
      a: `Audited accounts, an appointed auditor, AOC-4 within ${s("aoc4Window")} and an annual return. Lighter than a private limited company in some respects — an OPC is exempt from holding an annual general meeting — but far heavier than a proprietorship. Budget for it before incorporating.`,
    },
    {
      q: "Can I convert my OPC to a private limited company later?",
      a: "Yes, voluntarily and at any time — there is no waiting period and no turnover threshold to reach first. You will need to bring in at least one more shareholder and a second director, and the conversion is filed with the Registrar.",
    },
  ],

  related: ["private-limited-company", "proprietorship", "llp-registration"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "opcStructure",
      "opcResidency",
      "opcMandatoryConversion",
      "opcRepealedConversionThresholds",
      "spicePlusScope",
      "inc20aWindow",
      "aoc4Window",
    ],
    notes:
      "HIGH VALUE IF CORRECT, EMBARRASSING IF NOT — this page's main selling point is that competitors publish the superseded ₹50 lakh/₹2 crore conversion thresholds. Confirm specifically: (1) that mandatory conversion thresholds remain removed; (2) the 120-day residency test and NRI eligibility; (3) that OPCs are exempt from holding an AGM, as the compliance FAQ states; (4) the one-OPC-per-person restriction. If any of these have moved back, the page's angle collapses.",
  },
};
