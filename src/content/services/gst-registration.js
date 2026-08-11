// Relative import with an explicit extension, not the "@/" alias, on purpose:
// everything under src/content/ must be importable by PLAIN NODE as well as by
// Vite — the review scripts and Phase 9's sitemap/prerender generator all read
// this directory outside the bundler. Node ESM cannot resolve "@/".
import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// THE EXEMPLAR — CONTENT-PLAN.md §7.1.
//
// Every other service leaf is written against this file. When briefing a later
// batch, reference it by name: "follow the pattern in gst-registration.js".
//
// Three things to copy, beyond the field shape:
//   1. VOICE (§16). Second person, active, present tense. Lead with the
//      reader's problem, not the firm's capability. Explain every acronym on
//      first use — the reader is a business owner, not a practitioner.
//   2. NO INVENTED FACTS. Every statutory number comes from statutory.js via
//      s(). Nothing numeric is typed inline. `fees` is null.
//   3. DOCUMENTS IS THE MOST VALUABLE SECTION (§7). It is what people search
//      for and what earns links. Make it exact, grouped, and printable — not
//      a vague summary.
// ============================================================================

export default {
  slug: "gst-registration",
  category: "gst",
  title: "GST Registration",
  h1: "GST Registration in Salem, Tamil Nadu",

  meta: {
    title: "GST Registration in Salem, Tamil Nadu | ThinkOrange Consulting",
    description:
      "New GST registration, amendments and multi-state registration, handled end to end from Salem. Documents, thresholds and timelines explained plainly.",
    keywords: [
      "gst registration salem",
      "gst registration consultant tamil nadu",
      "gst registration documents required",
      "new gst registration process",
      "gst registration salem tamil nadu",
    ],
  },

  lede:
    "New registration, amendments, additional place of business and multi-state registration — prepared correctly the first time, so you avoid queries and rejection.",

  overview: [
    `Goods and Services Tax (GST) registration gives your business a GSTIN, a ${s("gstinLength")} identifier tied to your PAN and your state. Once you hold one you can charge GST on your invoices, claim input tax credit on your purchases, and trade with the many businesses that will not deal with an unregistered supplier.`,

    `Above certain limits it is not optional. If your aggregate turnover crosses ${s("gstThresholdGoods")} for goods or ${s("gstThresholdServices")} for services in a financial year, you must register — and turnover is counted across India on a single PAN, not state by state. Several situations require registration whatever your turnover: supplying to a customer in another state, selling through an e-commerce platform, or operating as a casual taxable person at an exhibition or seasonal site.`,

    `Trading unregistered when you were liable is expensive. Under Section 122 of the CGST Act the penalty is ${s("gstNonRegistrationPenalty")}, and you still owe the tax you should have collected across the whole unregistered period, plus interest. Most cases we see are not deliberate — a business crossed the threshold mid-year and nobody was watching the number.`,
  ],

  whoNeedsThis: [
    `Your aggregate turnover has crossed ${s("gstThresholdGoods")} for goods or ${s("gstThresholdServices")} for services in a financial year, counted across India on one PAN.`,
    "You supply goods or services to a customer in another state — inter-state supply requires registration at any turnover.",
    "You sell through an e-commerce platform, or take online payments through your own site.",
    "You are liable to pay GST under reverse charge on purchases from unregistered suppliers or on specified services.",
    "You operate as a casual taxable person — an exhibition stall, a seasonal site, or a short project in another state.",
    "You are below the threshold but want to register voluntarily, to claim input tax credit or to qualify as a supplier to registered businesses.",
  ],

  included: [
    {
      title: "Eligibility and threshold check",
      desc: "We confirm whether you are actually liable, and from what date — including whether the Rule 14A simplified route is open to you.",
    },
    {
      title: "Document preparation and verification",
      desc: "We assemble the full set for your entity type and check each one before filing, which is where most rejections are avoided.",
    },
    {
      title: `Application filing (${s("gstFormApplication")})`,
      desc: "Part A and Part B prepared and submitted, with your business activities and HSN or SAC codes classified correctly.",
    },
    {
      title: "Aadhaar and biometric authentication support",
      desc: "We walk you through authentication and, where biometric verification is required, what to carry to the GST Suvidha Kendra.",
    },
    {
      title: "ARN tracking and departmental follow-up",
      desc: "We monitor the Application Reference Number and chase the file rather than waiting for the portal to update.",
    },
    {
      title: `Clarification and query response (${s("gstFormQuery")} to ${s("gstFormQueryReply")})`,
      desc: "If the officer raises a query we draft and file the reply within the window, with supporting documents.",
    },
    {
      title: `GSTIN certificate handover (${s("gstFormCertificate")})`,
      desc: "Your registration certificate, explained — what it says, where it must be displayed, and what it commits you to.",
    },
    {
      title: "Post-registration compliance setup",
      desc: "Invoice format, return calendar and the first filing, so registration does not quietly become a compliance backlog.",
    },
  ],

  documents: [
    {
      group: "Every applicant",
      items: [
        "PAN of the business or the proprietor",
        "Aadhaar of the proprietor, partners or authorised signatory, linked to an active mobile number",
        "Passport-sized photograph of the proprietor, partners or authorised signatory",
        "Proof of principal place of business — latest electricity bill, property tax receipt or municipal khata for owned premises; rent agreement plus a No Objection Certificate from the owner for rented premises",
        "Bank account proof — cancelled cheque, bank statement or the first page of the passbook showing name, account number and IFSC",
        "Mobile number and email address for the authorised signatory (OTP is sent to both)",
      ],
    },
    {
      group: "Proprietorship",
      items: [
        "PAN and Aadhaar of the proprietor",
        "A residential address may be used as the principal place of business",
        "A personal bank account is acceptable where the name matches the PAN",
      ],
    },
    {
      group: "Partnership firm",
      items: [
        "PAN of the firm",
        "Partnership deed",
        "PAN and Aadhaar of all partners",
        "Photograph of all partners",
        "Proof of appointment of the authorised signatory",
        "Registration certificate of the firm, if registered",
      ],
    },
    {
      group: "Limited Liability Partnership (LLP)",
      items: [
        "PAN of the LLP",
        "Certificate of Incorporation issued by the Ministry of Corporate Affairs",
        "LLP agreement",
        "PAN and Aadhaar of all designated partners",
        "Board resolution or equivalent authorising the signatory",
        "Class 3 Digital Signature Certificate of a designated partner",
      ],
    },
    {
      group: "Private Limited Company",
      items: [
        "PAN of the company",
        "Certificate of Incorporation issued by the Registrar of Companies",
        "Memorandum and Articles of Association",
        "PAN, Aadhaar and photograph of all directors",
        "Board resolution authorising the signatory",
        "Class 3 Digital Signature Certificate of a director",
      ],
    },
  ],

  documentsNote: `Companies and LLPs cannot sign the application with Aadhaar OTP — a Class 3 Digital Signature Certificate is mandatory. Portal uploads are limited to ${s("gstDocUploadLimit")}, so scans usually need compressing before they will attach.`,

  process: [
    {
      step: 1,
      title: "Eligibility and document check",
      desc: "We confirm the date your liability arose, pick the right registration type, and list exactly what you need to send.",
      duration: t("gstRegDocumentReview"),
    },
    {
      step: 2,
      title: "Application filed",
      desc: `${s("gstFormApplication")} Part A validates your PAN, mobile and email; Part B carries your business details, place of business and documents. An ARN is generated on submission.`,
      duration: t("gstRegFilingAfterDocs"),
    },
    {
      step: 3,
      title: "Aadhaar or biometric authentication",
      desc: `Authentication is completed online, or in person at a GST Suvidha Kendra where biometric verification is required. This must happen within ${s("gstBiometricWindow")} of submitting Part B.`,
      duration: `Within ${s("gstBiometricWindow")}`,
    },
    {
      step: 4,
      title: "Departmental review",
      desc: `The officer either approves or issues a ${s("gstFormQuery")} notice seeking clarification. We draft and file the ${s("gstFormQueryReply")} reply if one arrives.`,
      duration: "Varies with the query",
    },
    {
      step: 5,
      title: "GSTIN issued",
      desc: `Your ${s("gstFormCertificate")} certificate is issued with the GSTIN. We hand it over with your invoice format and return calendar set up.`,
      duration: "On approval",
    },
  ],

  timeline: [
    { stage: "Document collection and review", days: t("gstRegDocumentReview") },
    { stage: "Application filing and ARN generation", days: t("gstRegFilingAfterDocs") },
    { stage: `Approval — Rule 14A simplified route, if eligible`, days: s("gstRule14ADays") },
    { stage: "Approval — standard, Aadhaar-authenticated", days: s("gstRegStandardDays") },
    { stage: "Approval — no Aadhaar authentication or physical verification ordered", days: s("gstRegNoAadhaarDays") },
  ],

  // NEVER a number. Renders "On request" — that is correct, not a gap.
  fees: null,

  faqs: [
    {
      q: "How long does GST registration take?",
      a: `Where Aadhaar authentication is completed and no physical verification is ordered, ${s("gstRegStandardDays")}. Small businesses eligible for the Rule 14A simplified scheme can be approved in ${s("gstRule14ADays")}. Without Aadhaar authentication, or where the officer orders physical verification of your premises, allow ${s("gstRegNoAadhaarDays")}.`,
    },
    {
      q: "What is the turnover threshold in Tamil Nadu?",
      a: `Tamil Nadu is a normal category state, so the thresholds are ${s("gstThresholdGoods")} of aggregate turnover for goods and ${s("gstThresholdServices")} for services. The lower special-category figures do not apply here. Aggregate turnover is measured across India on one PAN, so branches in other states count towards the same limit.`,
    },
    {
      q: "By when must I apply after crossing the threshold?",
      a: `Within ${s("gstRegApplyWindow")} of becoming liable, under Section 25(1). The timing matters beyond the deadline itself: apply inside the window and your registration is effective from the date liability arose, so the period is clean. Apply late and it takes effect only from the date of grant, leaving the gap exposed.`,
    },
    {
      q: "What happens if my application is rejected?",
      a: `Rejection almost always follows an unanswered ${s("gstFormQuery")} notice or a mismatch between your documents and the application — an address proof that does not match the premises, or a signatory who is not authorised. You can reapply. We would rather fix the cause first, because a second rejection on the same ground draws closer scrutiny.`,
    },
    {
      q: "Do I need a separate registration for each state?",
      a: "Yes. GST is state-specific, so you register separately in every state or union territory from which you make taxable supplies, even under one PAN and one business name. A single registration does not cover a branch, warehouse or site in another state.",
    },
    {
      q: "Can I register voluntarily if I am below the threshold?",
      a: "Yes, and it is often worth it. Voluntary registration lets you claim input tax credit on purchases and makes you a viable supplier to registered businesses that need the credit. The trade-off is real, though: once registered you carry the full return-filing obligation whatever your turnover.",
    },
    {
      q: "What happens if I trade without registering when I was liable?",
      a: `The penalty under Section 122 is ${s("gstNonRegistrationPenalty")}. On top of that you owe the tax you should have collected for the entire unregistered period, plus interest, and you cannot claim input credit for that period. Wilful evasion is treated far more harshly than a missed threshold.`,
    },
    {
      q: "Do I need a Digital Signature Certificate?",
      a: "Companies and LLPs do — a Class 3 DSC is mandatory, as they cannot sign with Aadhaar OTP. Proprietorships and partnership firms can normally authenticate with Aadhaar OTP instead. We issue Class 3 certificates ourselves, so this does not have to become a separate errand.",
    },
  ],

  related: ["gst-return-filing", "bookkeeping", "class-3-organisation"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "gstinLength",
      "gstThresholdGoods",
      "gstThresholdServices",
      "gstRegApplyWindow",
      "gstRegStandardDays",
      "gstRegNoAadhaarDays",
      "gstRule14ADays",
      "gstBiometricWindow",
      "gstNonRegistrationPenalty",
      "gstFormApplication",
      "gstFormQuery",
      "gstFormQueryReply",
      "gstFormCertificate",
      "gstDocUploadLimit",
    ],
    notes:
      "Document lists per entity type also need CA confirmation — they are practice-based rather than a single statutory list, and the GST portal's requirements shift without notification.",
  },
};
