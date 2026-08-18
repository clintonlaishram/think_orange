// Relative import with an explicit extension, not the "@/" alias — see
// gst-registration.js's header comment.
import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written against gst-registration.js as the exemplar. Registrations &
// Licences category, 17-08-2026 restructure — see MISSING-PAGES.md.
//
// Trade Marks Act 1999 / Trade Marks Rules 2017 are NOT part of the Income
// Tax Act 2025 recodification blocked by BLOCKERS.md §1 — a different
// statute entirely, researched and cited normally.
// ============================================================================

export default {
  slug: "trademark-registration",
  category: "registrations-licences",
  title: "Trademark Registration",
  h1: "Trademark Registration in India",

  meta: {
    title: "Trademark Registration in Salem, Tamil Nadu | ThinkOrange Consulting",
    description:
      "Register your business name or logo as a trademark — classes, fees, the opposition window and realistic timelines explained. Filed from Salem, pan-India.",
    keywords: [
      "trademark registration salem",
      "trademark registration india cost",
      "tm-a filing consultant",
      "trademark classes india",
      "trademark opposition india",
    ],
  },

  lede:
    "Your business name, logo or tagline registered as your own — filed correctly under the right classes, with the realistic timeline explained rather than the marketing version of it.",

  overview: [
    `A registered trademark gives you the exclusive right to use your mark for the goods or services you've registered it under, and the standing to stop someone else from trading under something confusingly similar. You apply on Form ${s("tmFormApplication")} through the IP India portal, choosing from ${s("tmClassesTotal")} covering every category of goods and service — one class per type of product or service you actually trade in, not one blanket filing for the whole business.`,

    `The government fee is ${s("tmFeeStandardApplicant")} for individuals, proprietors and MSME or DPIIT-recognised startup applicants filing online, and ${s("tmFeeOtherApplicant")} for partnerships, LLPs and companies without that status — per class, so filing in three classes multiplies the fee by three. Filing through an agent additionally needs a Power of Attorney on Form ${s("tmFormPowerOfAttorney")}.`,

    `Once accepted, your mark is published in the Trade Marks Journal, opening a ${s("tmOppositionWindow")} for anyone to oppose it. If nobody does, registration follows; if someone does, it becomes a contested proceeding with its own timeline. Once registered, protection runs for ${s("tmValidityPeriod")}, renewable indefinitely — there's no cap on how many times you can renew, only a deadline each time.`,
  ],

  whoNeedsThis: [
    "You've settled on a business name, logo or tagline and want to stop a competitor from trading under something confusingly similar.",
    "You're about to spend real money on branding, packaging or a storefront and want that investment legally protected before it's public.",
    "A supplier, franchisee or marketplace is asking you to prove trademark ownership before they'll list or work with you.",
    "You've discovered another business using a name close to yours and want to know where you actually stand.",
    "You're expanding into new products or services and need to check whether your existing mark still covers them.",
  ],

  included: [
    {
      title: "Trademark search",
      desc: "We search the IP India register for identical or confusingly similar marks in your classes before you spend anything on filing.",
    },
    {
      title: "Class selection",
      desc: "We identify every class your actual goods or services fall under, so your registration isn't narrower than your business.",
    },
    {
      title: `Application filing (${s("tmFormApplication")})`,
      desc: "Your application is prepared and digitally signed for e-filing, with your logo, business details and goods/services description drafted correctly.",
    },
    {
      title: "Digital Signature Certificate coordination",
      desc: "We arrange the Class 3 DSC every e-filed application needs — IP India will not accept a submission without one mapped to the applicant's account.",
    },
    {
      title: "Examination report response",
      desc: "If the examiner raises an objection, we draft and file the reply within the window given, rather than letting it lapse by default.",
    },
    {
      title: "Opposition monitoring",
      desc: "We track the Trade Marks Journal for your mark's publication and flag the opposition window, so you're never caught unaware if someone files against it.",
    },
    {
      title: "Registration certificate handover",
      desc: "Once granted, we hand over your certificate and set a reminder well ahead of the ten-year renewal deadline.",
    },
  ],

  documents: [
    {
      group: "Every applicant",
      items: [
        "Clear image of the logo or wordmark you're registering (JPEG/PNG, minimum size as prescribed by the portal)",
        "Identity proof of the individual, proprietor, partner, director or authorised signatory",
        "Address proof of the same person",
        "A plain description of the goods or services you actually trade in, to identify the correct classes",
        "Class 3 Digital Signature Certificate of the applicant or authorised signatory, for e-filing",
        "Power of Attorney (Form TM-48), signed in favour of whoever files on your behalf",
      ],
    },
    {
      group: "Business applicants",
      items: [
        "PAN of the business",
        "Certificate of Incorporation, partnership deed, or GST registration — whichever proves the entity exists",
        "Udyam registration or DPIIT recognition certificate, if claiming the reduced individual/MSME/startup fee",
      ],
    },
    {
      group: "Where prior use is claimed",
      items: [
        "An affidavit of use, stating the date from which the mark has actually been used and the goods or services it was used for",
        "Supporting evidence of that use — invoices, packaging, advertisements or dated screenshots",
      ],
    },
  ],

  documentsNote:
    "A trademark search doesn't need any of the above — only the filing itself does. We run the search first precisely so you don't assemble this whole set for a mark that's likely to be refused or opposed.",

  process: [
    {
      step: 1,
      title: "Search and class selection",
      desc: "We search the register for conflicts and identify every class your business actually needs, before any fee is paid.",
      duration: t("tmSearchAndPrepTurnaround"),
    },
    {
      step: 2,
      title: "Application filed",
      desc: `${s("tmFormApplication")} is filed online, digitally signed, with the government fee — ${s("tmFeeStandardApplicant")} or ${s("tmFeeOtherApplicant")} per class depending on applicant type — paid on submission.`,
      duration: t("tmFilingTurnaround"),
    },
    {
      step: 3,
      title: "Examination",
      desc: "An examiner reviews the application and either accepts it for publication or raises an objection, which we respond to within the window given.",
      duration: "Varies with Registry workload",
    },
    {
      step: 4,
      title: "Publication and opposition window",
      desc: `Your mark is published in the Trade Marks Journal, opening a ${s("tmOppositionWindow")}. We monitor this and act immediately if an opposition is filed.`,
      duration: s("tmOppositionWindow"),
    },
    {
      step: 5,
      title: "Registration",
      desc: `If unopposed, the mark proceeds to registration, valid for ${s("tmValidityPeriod")} and renewable from there.`,
      duration: "On acceptance",
    },
  ],

  timeline: [
    { stage: "Search and application preparation", days: t("tmSearchAndPrepTurnaround") },
    { stage: "Filing", days: t("tmFilingTurnaround") },
    { stage: "Examination to publication", days: "Varies with Registry workload" },
    { stage: "Opposition window", days: s("tmOppositionWindow") },
    { stage: "Registration validity, once granted", days: s("tmValidityPeriod") },
  ],

  // NEVER a number. Renders "On request" — that is correct, not a gap.
  fees: null,

  faqs: [
    {
      q: "How long does trademark registration actually take?",
      a: `Realistically, months rather than weeks — examination alone can take some time depending on Registry workload, and an unopposed mark still has to clear the full ${s("tmOppositionWindow")} before registration follows. Anyone promising a firm number in weeks is describing the filing step, not the registration.`,
    },
    {
      q: "What are trademark classes, and do I need more than one?",
      a: `India uses ${s("tmClassesTotal")} to categorise every kind of goods and service. You need a separate class — and pay a separate fee — for each distinct category you trade in. A clothing brand that also sells accessories typically needs two classes, not one.`,
    },
    {
      q: "What does trademark registration cost in government fees?",
      a: `${s("tmFeeStandardApplicant")} if you're an individual, proprietor, or hold a valid Udyam or DPIIT certificate; ${s("tmFeeOtherApplicant")} otherwise — per class, e-filed. A company registering one mark in two classes without that status pays the higher rate twice.`,
    },
    {
      q: "What happens if someone opposes my trademark application?",
      a: `Anyone can file an opposition within the ${s("tmOppositionWindow")} after publication — a fixed window that cannot be extended. You then file a counter-statement, and it becomes a contested proceeding before the Registrar, with its own evidence stages on both sides. It adds real time, and sometimes real cost.`,
    },
    {
      q: "How long does a trademark registration last, and can it lapse?",
      a: `${s("tmValidityPeriod")}, renewable indefinitely — there's no limit on renewals. Miss the renewal deadline and there's ${s("tmRenewalGracePeriod")} to restore it before it's removed from the register altogether. After that, you'd have to reapply from scratch, losing your original filing date.`,
    },
    {
      q: "Do I need a Digital Signature Certificate to register a trademark?",
      a: "Yes — every e-filed application has to be digitally signed with a Class 3 DSC mapped to the applicant's IP India account; a scanned or physical signature isn't accepted online. We issue Class 3 certificates ourselves, so this doesn't become a separate errand before you can file.",
    },
    {
      q: "Should I trademark my logo, my business name, or both?",
      a: "Both, if you can — they protect different things. A wordmark protects the name however it's styled; a logo (device) mark protects the specific visual design. Many businesses register the name first, since that's usually what a competitor copies first, and add the logo later.",
    },
  ],

  related: ["private-limited-company", "class-3-individual", "startup-india-dpiit"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "tmFormApplication",
      "tmClassesTotal",
      "tmFeeStandardApplicant",
      "tmFeeOtherApplicant",
      "tmFormPowerOfAttorney",
      "tmOppositionWindow",
      "tmValidityPeriod",
      "tmRenewalGracePeriod",
    ],
    notes:
      "A registered trademark agent or IP attorney should confirm the current examination-to-publication timeline before it's quoted in any form on the site — sources disagree widely (a few months to well over a year), which is why this page deliberately avoids stating a specific figure for that stage. The counter-statement window and opposition evidence stages were researched but deliberately kept out of this leaf's own timeline table, since they only apply once a mark is actually opposed.",
  },
};
