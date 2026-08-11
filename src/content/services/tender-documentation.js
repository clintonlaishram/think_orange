import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: complements gem-registration.js rather than repeating it — this page
// is about winning and executing a SPECIFIC tender once you are already
// registered, not the registration step itself. Cross-link rather than
// duplicate the EMD/MSE content.

export default {
  slug: "tender-documentation",
  category: "government-tenders",
  title: "Tender Documentation Support",
  h1: "Tender Documentation Support in Salem, Tamil Nadu",

  meta: {
    title: "Tender Documentation Support in Salem | ThinkOrange Consulting",
    description:
      "Document preparation, eligibility checks and e-tendering portal support for a specific bid. Salem, Tamil Nadu, for clients across India.",
    keywords: [
      "tender documentation support salem",
      "e tendering consultant tamil nadu",
      "bid document preparation",
      "emd bid security guidance",
      "government tender eligibility check",
    ],
  },

  lede:
    "Document preparation, eligibility checks and e-tendering portal support — for the tender in front of you, prepared so a technical rejection never happens.",

  overview: [
    `Registering on GeM or an e-tendering portal gets you access. Winning a specific tender is a different job — reading the tender document precisely, meeting every eligibility and technical qualification exactly as worded, and submitting a bid that cannot be rejected on a technicality before it is even evaluated on price.`,

    `That last point accounts for more lost bids than price ever does. Tenders are rejected at the technical evaluation stage for missing a signature, an expired certificate, a document in the wrong format, or a declaration that was not worded the way the tender required — none of which have anything to do with whether the bidder could actually do the work.`,

    `If your Udyam registration is current, Micro and Small Enterprises are ${s("gemEmdExemption")} under government procurement policy — the same exemption that applies on GeM, and one that is worth checking on every individual tender rather than assuming it carries over automatically.`,
  ],

  whoNeedsThis: [
    "You have identified a specific government or PSU tender and need the bid documentation prepared correctly.",
    "You are unsure whether you meet a tender's eligibility criteria as worded and want that checked before committing time to a bid.",
    "You need help navigating an e-tendering portal you have not used before.",
    "You want your MSE status correctly claimed for EMD exemption on a specific tender.",
    "A previous bid was rejected on a technicality and you want the next one prepared so it is not.",
  ],

  included: [
    {
      title: "Tender document review",
      desc: "The full tender read against your actual capability, so you know before you commit whether you genuinely qualify.",
    },
    {
      title: "Eligibility check",
      desc: "Technical and financial qualification criteria checked line by line against your documents, not assumed from a general sense of fit.",
    },
    {
      title: "Bid document preparation",
      desc: "Every required document assembled, formatted and signed exactly as the tender specifies — the stage where most rejections happen.",
    },
    {
      title: "EMD and bid security guidance",
      desc: "Confirming whether your MSE status exempts you from Earnest Money Deposit on this specific tender, and preparing bid security correctly where it does not.",
    },
    {
      title: "E-tendering portal submission",
      desc: "Submission handled on the relevant portal, with confirmation that it registered correctly rather than assuming an upload succeeded.",
    },
    {
      title: "Query and clarification response",
      desc: "Where the tendering authority raises a query during evaluation, a response drafted and submitted within the window given.",
    },
  ],

  documents: [
    {
      group: "Standard bid documents",
      items: [
        "Company registration and incorporation documents",
        "GST registration certificate",
        "Udyam registration certificate, where MSE benefits are being claimed",
        "PAN and latest income tax returns",
        "Audited financial statements for the years the tender requires",
        "Experience certificates or completion certificates for similar past work",
      ],
    },
    {
      group: "Tender-specific",
      items: [
        "Technical specifications compliance statement",
        "Power of attorney or authorisation for the person signing the bid",
        "EMD or bid security instrument, where applicable",
        "Any declaration or affidavit the specific tender requires",
      ],
    },
  ],

  documentsNote:
    "Read the eligibility criteria before assembling anything. Tenders regularly specify turnover, experience or certification requirements worded precisely — 'similar work' can mean a specific sector, not just a comparable value — and it is far better to learn you do not qualify before spending time on documents than after submission.",

  process: [
    {
      step: 1,
      title: "Tender review and eligibility check",
      desc: "We read the tender against your actual documents and tell you honestly whether you qualify before you commit further.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Document preparation",
      desc: "The full bid document set assembled, formatted and signed to the tender's exact requirements.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "EMD and submission",
      desc: "Bid security confirmed or arranged, and the bid submitted on the relevant e-tendering portal within the deadline.",
      duration: "Before the tender deadline",
    },
    {
      step: 4,
      title: "Query response",
      desc: "Any clarification the tendering authority raises during evaluation answered within its window.",
      duration: "As raised",
    },
  ],

  timeline: [
    { stage: "Tender review and eligibility check", days: t("incorporationNameStage") },
    { stage: "Document preparation", days: t("incorporationDocPrep") },
    { stage: "Submission", days: "Before the tender deadline" },
  ],

  fees: null,

  faqs: [
    {
      q: "Why do tenders get rejected before price is even considered?",
      a: "Almost always a technical or eligibility failure — a missing signature, an expired certificate, a document in the wrong format, or a declaration not worded as required. Tenders are evaluated in stages, and a technical rejection means the price bid is never opened at all.",
    },
    {
      q: "Am I exempt from Earnest Money Deposit as a small business?",
      a: `Yes — if you hold a current Udyam registration as a Micro or Small Enterprise, you are ${s("gemEmdExemption")} under government procurement policy, the same exemption GeM applies. It is worth confirming on each individual tender rather than assuming it is automatic, since the exemption depends on your certificate being current at the time of that specific bid.`,
    },
    {
      q: "How do I know if I actually qualify for a tender?",
      a: "Read the eligibility criteria literally, not generously. 'Experience in similar work' is often defined precisely by the tendering authority — a specific sector, a minimum contract value, or a certification you may not hold. We check this against your actual documents before you commit time to a full bid.",
    },
    {
      q: "What happens if the tendering authority raises a query on my bid?",
      a: "You get a window, usually short, to respond. Missing it is treated the same as not answering at all, so a query needs a fast, precise response — which is easier when your original bid documentation was organised properly to begin with.",
    },
    {
      q: "Do you help with tenders outside Tamil Nadu?",
      a: "Yes. E-tendering portals and GeM operate nationally, so the tender itself can be issued by any state or central department, PSU or municipal body, and our support is not limited to Salem or Tamil Nadu-based opportunities. Distance from our office has no bearing on how a bid is prepared or submitted.",
    },
  ],

  related: ["gem-registration", "msme-udyam", "business-loan"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["gemEmdExemption"],
    notes:
      "Confirm the EMD exemption applies uniformly across state and central e-tendering portals, not only GeM — this page generalises the GeM-sourced fact to government procurement more broadly, which should be checked against the specific portals ThinkOrange actually supports.",
  },
};
