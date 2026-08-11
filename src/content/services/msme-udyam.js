import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// STATUTORY CARE: the MSME classification limits were revised effective
// 01-04-2025 — investment limits raised 2.5x, turnover limits doubled. This is
// THE fact most competitor pages still get wrong (publishing the pre-2025
// figures), so it is the page's central differentiator. Confirmed via research.

export default {
  slug: "msme-udyam",
  category: "business-setup",
  title: "MSME / Udyam Registration",
  h1: "MSME / Udyam Registration in Salem, Tamil Nadu",

  meta: {
    title: "Udyam (MSME) Registration in Salem | Current 2025 Limits",
    description:
      "Udyam registration with the current classification limits, unlocking priority lending, tender preference and delayed-payment protection. Salem, Tamil Nadu.",
    keywords: [
      "udyam registration salem",
      "msme registration tamil nadu",
      "udyam classification limits 2025",
      "msme delayed payment protection",
      "udyam registration consultant",
    ],
  },

  lede:
    "Free, lifetime-valid MSME recognition — priority lending, tender preference and delayed-payment protection, registered against the current classification limits.",

  overview: [
    `Udyam is the government's registration for Micro, Small and Medium Enterprises, and it is free, done entirely online, and valid for the life of the business. What it unlocks is real: priority sector lending, collateral-free credit guarantee schemes, preference in government tenders, and — for many businesses the most valuable protection of all — a statutory 45-day payment deadline enforceable against your buyers.`,

    `The classification limits were revised with effect from 01-04-2025, and much of what is published online still states the older, now-superseded figures. Under the current limits, a Micro enterprise is one with ${s("udyamMicroLimit")}; Small is ${s("udyamSmallLimit")}; Medium is ${s("udyamMediumLimit")}. Both the investment and turnover conditions must be met — crossing either one moves you up a category.`,

    `Classification is not something you apply for separately each year. It is ${s("udyamReclassification")} — the portal checks your filed ITR and GST data and reclassifies you automatically, up or down, without a fresh application.`,
  ],

  whoNeedsThis: [
    "You run a manufacturing or service business and want access to priority sector lending and collateral-free credit guarantee schemes.",
    "You want tender preferences and EMD exemption on government procurement and GeM.",
    "You supply goods or services to larger businesses and want the MSMED Act's 45-day payment protection to apply.",
    "You are unsure which classification band you currently fall into under the revised 2025 limits.",
    "Your existing Udyam certificate has not been reviewed since the limits changed and you want to confirm it still reflects your position correctly.",
  ],

  included: [
    {
      title: "Classification assessment",
      desc: "Your investment and turnover checked against the current 2025 limits, so you register in the correct category rather than guessing.",
    },
    {
      title: "Udyam registration",
      desc: "The registration completed on the Udyam portal against your PAN and GST details.",
    },
    {
      title: "Existing certificate review",
      desc: "For businesses already registered, a check that the certificate still reflects the correct category under the revised limits.",
    },
    {
      title: "MSMED Act protection explained",
      desc: "What the 45-day payment rule actually means for your invoicing and how to invoke it if a buyer pays late.",
    },
    {
      title: "Linkage to GST and GeM",
      desc: "Making sure your Udyam registration matches your GST and, where relevant, GeM seller details exactly — the point where mismatches most often cause benefits to be denied later.",
    },
    {
      title: "Ongoing monitoring",
      desc: "Flagging when your figures are approaching a threshold, so reclassification does not surprise you.",
    },
  ],

  documents: [
    {
      group: "For registration",
      items: [
        "Aadhaar of the proprietor, managing partner or authorised signatory",
        "PAN of the business",
        "GST registration certificate, where applicable",
        "Bank account details",
        "Basic details of investment in plant, machinery or equipment, and annual turnover",
      ],
    },
  ],

  documentsNote:
    "Udyam registration pulls your investment and turnover figures from your PAN-linked ITR and GST filings rather than a document you upload, so accurate and current tax filings are what actually determines your classification — not paperwork submitted at the time of registration.",

  process: [
    {
      step: 1,
      title: "Classification check",
      desc: "We work out which band you fall into under the current limits before registering, so the certificate is correct from day one.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Registration",
      desc: "The Udyam application completed online against your PAN and GST details.",
      duration: "Usually immediate",
    },
    {
      step: 3,
      title: "Linkage check",
      desc: "Business name and details cross-checked against your GST registration and any GeM profile, to prevent later mismatches.",
      duration: t("incorporationDocPrep"),
    },
  ],

  timeline: [
    { stage: "Classification check", days: t("incorporationNameStage") },
    { stage: "Registration", days: "Usually immediate" },
    { stage: "Automatic reclassification", days: s("udyamReclassification") },
  ],

  fees: null,

  faqs: [
    {
      q: "What are the current MSME classification limits?",
      a: `Effective 01-04-2025: Micro is ${s("udyamMicroLimit")}; Small is ${s("udyamSmallLimit")}; Medium is ${s("udyamMediumLimit")}. Both investment and turnover conditions must be satisfied. Many websites still publish the older, lower limits — check the effective date on anything you read.`,
    },
    {
      q: "Does Udyam registration cost anything?",
      a: "No. Registration on the Udyam portal is free and does not expire — it is valid for the life of the business, subject to automatic reclassification if your figures change.",
    },
    {
      q: "How does reclassification work?",
      a: `Automatically. The portal reviews the ITR and GST data you file each year and moves you up or down a category if your investment or turnover crosses a threshold — ${s("udyamReclassification")}. You do not file a separate application for this.`,
    },
    {
      q: "What protection does Udyam registration give me against late-paying customers?",
      a: `A buyer must pay a registered MSME supplier within ${s("msmedPaymentWindow")}. Beyond that, ${s("msmedDelayedInterest")}, and this interest cannot be waived by contract and is not deductible for the buyer as a business expense. It is one of the strongest statutory protections available to a small supplier.`,
    },
    {
      q: "Can a proprietorship or partnership register on Udyam, or only companies?",
      a: "Any enterprise type — proprietorship, partnership, LLP, or company — can register on Udyam. The classification depends on your investment and turnover figures, not your legal structure.",
    },
    {
      q: "Does Udyam registration help with government tenders?",
      a: "Yes — it is the basis for the MSE benefits on GeM and other government procurement: EMD exemption and a price-matching preference where the lowest bidder is not an MSE. Both depend on the certificate being current at the time you bid.",
    },
  ],

  related: ["proprietorship", "gem-registration", "business-loan"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "udyamMicroLimit",
      "udyamSmallLimit",
      "udyamMediumLimit",
      "udyamReclassification",
      "msmedPaymentWindow",
      "msmedDelayedInterest",
    ],
    notes:
      "The revised 01-04-2025 classification limits are the page's central claim — confirm these precisely, as they are recent enough that secondary sources may not all have updated. The 45-day/interest claim is the strongest selling point on the page; confirm the 'non-deductible for the buyer' detail specifically, as it was sourced from a single article.",
  },
};
