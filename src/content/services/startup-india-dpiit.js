import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// ⚠️ DELIBERATE RESTRAINT: the income-tax exemption available to recognised
// startups (historically under Section 80-IAC of the 1961 Act) sits squarely
// inside the Income Tax Act 2025 transition — see BLOCKERS.md §1. This page
// mentions that a tax benefit EXISTS, in general terms, without citing an old
// section number that may already be wrong, and without stating eligibility
// conditions (like the incorporation-date window) that are also under review.
// Do not "complete" this page by adding 80-IAC specifics until BLOCKERS.md §1
// is resolved — that is a trap, not a gap.

export default {
  slug: "startup-india-dpiit",
  category: "business-setup",
  title: "Startup India (DPIIT)",
  h1: "Startup India (DPIIT) Registration in Salem, Tamil Nadu",

  meta: {
    title: "Startup India DPIIT Recognition in Salem | ThinkOrange Consulting",
    description:
      "DPIIT startup recognition against the current 2026 eligibility criteria, with the application and supporting documentation handled. Salem, Tamil Nadu.",
    keywords: [
      "startup india registration salem",
      "dpiit recognition consultant tamil nadu",
      "dpiit eligibility criteria 2026",
      "startup india certificate",
      "dpiit registration process",
    ],
  },

  lede:
    "DPIIT recognition against the current eligibility criteria — the certificate that unlocks self-certification, easier procurement access and startup-specific schemes.",

  overview: [
    `DPIIT recognition is what "Startup India" actually means in practice — a certificate from the Department for Promotion of Industry and Internal Trade confirming your business meets the government's definition of a startup. It is not automatic just because you are new or small; it is a formal application against specific criteria.`,

    `The criteria were updated recently and are worth checking against the current notification rather than an older article. As it stands, your entity must be ${s("dpiitAgeLimit")}, with turnover not exceeding ${s("dpiitTurnoverCap")}, and structured as ${s("dpiitEligibleEntities")}. A sole proprietorship cannot be DPIIT-recognised — this is the single most common reason an otherwise-eligible business gets turned away, so structure needs to be settled before you apply.`,

    `Recognition brings genuine operational benefits — self-certification under certain labour and environmental laws, easier access to government tenders and GeM's startup provisions, and eligibility for startup-specific funding schemes. Income tax benefits are also available to recognised startups meeting further conditions, but those specific conditions sit inside the income tax law currently being re-codified, so we confirm your position on that separately rather than stating it here.`,
  ],

  whoNeedsThis: [
    `Your entity is ${s("dpiitAgeLimit")} and structured as ${s("dpiitEligibleEntities")}.`,
    `Your annual turnover has not exceeded ${s("dpiitTurnoverCap")} in any financial year since incorporation.`,
    "Your business is working towards innovation, improvement of products or processes, or a scalable business model with high potential for employment or wealth creation — the substantive test DPIIT applies beyond the formal criteria.",
    "You want access to GeM's startup-specific tender provisions and government procurement relaxations.",
    "You want to explore whether the income tax and capital gains benefits available to recognised startups apply to you.",
    "You are structured as a sole proprietorship and are considering converting specifically to become DPIIT-eligible.",
  ],

  included: [
    {
      title: "Eligibility assessment",
      desc: "Your entity type, age and turnover checked against the current criteria before you apply, so you are not rejected on a technical point.",
    },
    {
      title: "Application preparation",
      desc: "The recognition application prepared on the Startup India portal, with your business description framed against DPIIT's innovation and scalability test.",
    },
    {
      title: "Supporting documentation",
      desc: "Incorporation certificate, board resolutions and any required write-up assembled and submitted correctly the first time.",
    },
    {
      title: "Post-recognition guidance",
      desc: "What self-certification and procurement benefits actually apply once you are recognised, and how to use them.",
    },
    {
      title: "Income tax position, assessed separately",
      desc: "Whether the income tax benefits available to recognised startups apply to you, confirmed against current income tax law rather than assumed from older material.",
    },
    {
      title: "Entity conversion, where needed",
      desc: "If you are currently a sole proprietorship, converting to an eligible entity type as part of becoming DPIIT-ready.",
    },
  ],

  documents: [
    {
      group: "For DPIIT recognition",
      items: [
        "Certificate of Incorporation or Registration",
        "PAN of the entity",
        "Details of directors, partners or designated partners",
        "A brief write-up on how the business is working towards innovation or a scalable model",
        "Website, pitch deck or other material describing the product or service, where available",
      ],
    },
  ],

  documentsNote:
    "The written description of your business matters more than the document checklist. DPIIT recognition is not automatic for meeting the age and turnover criteria alone — the application is also assessed against whether the business genuinely reflects innovation or a scalable model, so this write-up is worth real effort rather than boilerplate.",

  process: [
    {
      step: 1,
      title: "Eligibility check",
      desc: "We confirm your entity type, age and turnover meet the current criteria before you apply.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Application and write-up prepared",
      desc: "The DPIIT application completed with supporting documents and a business description framed against the innovation and scalability test.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Submission and recognition",
      desc: "The application submitted on the Startup India portal and tracked through to the recognition certificate.",
      duration: "On submission",
    },
    {
      step: 4,
      title: "Income tax position confirmed separately",
      desc: "Whether startup-specific income tax benefits apply to you, assessed against current law once recognition is granted.",
      duration: "Following recognition",
    },
  ],

  timeline: [
    { stage: "Eligibility check", days: t("incorporationNameStage") },
    { stage: "Application preparation", days: t("incorporationDocPrep") },
    { stage: "Entity age limit for eligibility", days: s("dpiitAgeLimit") },
  ],

  fees: null,

  faqs: [
    {
      q: "Can a proprietorship get DPIIT recognition?",
      a: `No. Eligible structures are ${s("dpiitEligibleEntities")}. A sole proprietorship is specifically excluded, which surprises founders who started as a proprietorship and only later look into Startup India. Converting to an eligible structure first is a common, straightforward step.`,
    },
    {
      q: "What is the turnover limit for DPIIT recognition?",
      a: `${s("dpiitTurnoverCap")}, in any financial year since incorporation, under the current criteria. This was raised from an earlier, lower cap — confirm the figure against the current notification if you are relying on something you read some time ago.`,
    },
    {
      q: "How old can my company be and still qualify?",
      a: `${s("dpiitAgeLimit")}, measured from the date of incorporation on your registration certificate — not from when you actually started operating, which is often earlier and can catch founders out.`,
    },
    {
      q: "Is DPIIT recognition automatic if I meet the age and turnover criteria?",
      a: "No. DPIIT also assesses whether the business reflects genuine innovation, improvement of an existing product or process, or a scalable model with real potential for employment or wealth creation. Meeting the formal criteria gets you in the door; the substantive test is what is actually being evaluated.",
    },
    {
      q: "Does DPIIT recognition give me a tax exemption?",
      a: "Recognised startups meeting further conditions can access income tax benefits, but the specific conditions and the exemption mechanism sit within income tax law that is currently being re-codified under the new Income Tax Act. We assess your specific position separately once you are recognised, rather than quoting a general figure that may not hold.",
    },
    {
      q: "What can I actually do once I am DPIIT-recognised?",
      a: "Self-certify compliance under specified labour and environmental laws, access relaxed norms and startup-specific provisions on GeM and government tenders, and become eligible to apply for startup-specific government funding schemes. Which of these matter most depends on how your business actually operates.",
    },
  ],

  related: ["private-limited-company", "opc-registration", "gem-registration"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["dpiitAgeLimit", "dpiitTurnoverCap", "dpiitEligibleEntities"],
    notes:
      "DELIBERATELY INCOMPLETE ON INCOME TAX — do not add 80-IAC or any specific exemption section/percentage until BLOCKERS.md §1 (Income Tax Act 2025 transition) is resolved. The eligibility criteria cited here are dated 04-02-2026 (G.S.R. 108(E)) and are recent enough to double-check against the live notification before publishing, since a page built around 'the criteria just changed' looks bad if it then states superseded figures itself.",
  },
};
