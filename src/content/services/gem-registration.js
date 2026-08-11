import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: the EMD exemption and price-matching preference are the two facts
// that actually move a business owner to register — lead with the money, not
// the process.

export default {
  slug: "gem-registration",
  category: "government-tenders",
  title: "GeM Registration",
  h1: "GeM Registration in Salem, Tamil Nadu",

  meta: {
    title: "GeM Registration in Salem | Government e-Marketplace Seller Setup",
    description:
      "Seller registration on the Government e-Marketplace, with Udyam-linked MSE benefits set up correctly from the start. Salem, Tamil Nadu.",
    keywords: [
      "gem registration salem",
      "government e marketplace seller registration",
      "gem registration consultant tamil nadu",
      "gem emd exemption msme",
      "gem vendor assessment",
    ],
  },

  lede:
    "Seller registration on the Government e-Marketplace, with your product catalogue, Udyam linkage and vendor assessment set up so the MSE benefits actually apply.",

  overview: [
    `Government procurement is a large, underused opportunity for Indian SMEs, and the barrier is usually paperwork rather than capability — a business that could easily supply a government department simply never gets registered to bid. GeM is the government's own e-marketplace for goods and services procurement, and registering as a seller is the entry point.`,

    `The benefit that actually changes the economics is the MSE exemption. If your Udyam registration is current, you are ${s("gemEmdExemption")} on GeM bids — normally 2 to 5 percent of the bid value that would otherwise sit locked as working capital. You also get a price-matching preference: where the lowest bidder is not an MSE, registered MSEs ${s("gemMsePriceMatching")}.`,

    `Both benefits depend on your Udyam certificate being current and the registered business name matching your GeM seller profile exactly — a mismatch, even a minor one, is the most common reason these benefits get denied at the point of bidding rather than at registration.`,
  ],

  whoNeedsThis: [
    "You manufacture or supply goods or services that government departments and PSUs procure.",
    "You are Udyam-registered as a Micro or Small Enterprise and want the EMD exemption and price-matching preference GeM offers MSEs.",
    "You have been asked by a government buyer to register as a GeM seller before they can place an order.",
    "You want access to a procurement channel that does not depend on private-sector relationships or tendering relationships you do not yet have.",
    "You are DPIIT-recognised as a startup and want to access startup-specific tender provisions.",
  ],

  included: [
    {
      title: "Eligibility and Udyam linkage check",
      desc: "Confirming your Udyam registration is current and correctly linked, since the MSE benefits depend entirely on this being right.",
    },
    {
      title: "Seller registration on GeM",
      desc: "The registration application prepared and submitted, with your business name matched exactly to your Udyam certificate.",
    },
    {
      title: "Product or service catalogue setup",
      desc: "Your offerings listed correctly under the right category and specifications, so buyers can actually find and compare you.",
    },
    {
      title: "Vendor assessment support",
      desc: "Preparing for and navigating the vendor assessment process GeM applies to certain categories before a seller can bid.",
    },
    {
      title: "MSE benefit configuration",
      desc: `Confirming your profile correctly reflects the ${s("gemEmdExemption")} entitlement and the price-matching preference, rather than assuming the portal applies it automatically.`,
    },
    {
      title: "Ongoing catalogue and compliance support",
      desc: "Keeping your Udyam certificate current and your catalogue updated, since an expired certificate silently forfeits the EMD exemption.",
    },
  ],

  documents: [
    {
      group: "For seller registration",
      items: [
        "PAN of the business",
        "Udyam registration certificate, current and not expired",
        "GST registration certificate",
        "Bank account details for the business",
        "Aadhaar of the authorised signatory",
        "Business address proof",
      ],
    },
    {
      group: "For the product or service catalogue",
      items: [
        "Product specifications and category classification",
        "Pricing for each listed item or service",
        "Quality certifications applicable to your category, where required",
        "Sample images or technical literature, where the category requires them",
      ],
    },
  ],

  documentsNote:
    "Check that your business name is spelled identically on your Udyam certificate, GST registration and GeM profile before you submit anything. GeM and Udyam records are cross-verified, and a name that does not match exactly is the single most common cause of a rejected MSE benefit claim.",

  process: [
    {
      step: 1,
      title: "Eligibility and Udyam check",
      desc: "We confirm your Udyam status is current and matches your other registrations before starting the GeM application.",
      duration: t("incorporationNameStage"),
    },
    {
      step: 2,
      title: "Seller registration",
      desc: "The GeM seller application submitted with your documents.",
      duration: t("incorporationDocPrep"),
    },
    {
      step: 3,
      title: "Catalogue setup",
      desc: "Your products or services listed under the correct categories with complete specifications.",
      duration: "After registration is approved",
    },
    {
      step: 4,
      title: "Vendor assessment, where applicable",
      desc: "Support through the assessment process GeM requires for certain categories before you can bid.",
      duration: "Category dependent",
    },
  ],

  timeline: [
    { stage: "Eligibility and Udyam check", days: t("incorporationNameStage") },
    { stage: "Seller registration", days: t("incorporationDocPrep") },
    { stage: "Catalogue setup", days: "After approval" },
  ],

  fees: null,

  faqs: [
    {
      q: "Do I need Udyam registration to sell on GeM?",
      a: "You can register on GeM without it, but you lose the benefits that make GeM worthwhile for a small business — the EMD exemption, price-matching preference and MSE-specific tender access all require a current Udyam certificate. Register for Udyam first if you do not already have it.",
    },
    {
      q: "What is the EMD exemption actually worth?",
      a: `Udyam-registered Micro and Small Enterprises are ${s("gemEmdExemption")} on GeM bids. Earnest Money Deposit is typically 2 to 5 percent of the bid value, so the exemption is real working capital freed up on every bid you place, not a minor administrative saving.`,
    },
    {
      q: "What is MSE price-matching?",
      a: `Where the lowest bidder on a tender is not an MSE, registered MSEs ${s("gemMsePriceMatching")}. It exists specifically to give small enterprises a route into contracts they would otherwise lose purely on price to larger bidders.`,
    },
    {
      q: "Why would my MSE benefit claim be rejected?",
      a: "Almost always because the Udyam certificate has expired, or because the business name on Udyam does not exactly match the GeM seller profile. Both are checked at the point of bidding, not at registration, so an issue can sit invisible for months before it costs you a benefit on an actual bid.",
    },
    {
      q: "What is vendor assessment on GeM?",
      a: "An additional verification step GeM applies to certain product and service categories before a seller is allowed to bid, checking capability and quality beyond basic registration. Not every category requires it — we will confirm whether yours does.",
    },
    {
      q: "Can a startup access special provisions on GeM?",
      a: "Yes, DPIIT-recognised startups have access to startup-specific tender provisions on GeM, including relaxed experience and turnover criteria in some cases. This runs alongside, not instead of, the MSE benefits if you also hold Udyam registration.",
    },
  ],

  related: ["msme-udyam", "tender-documentation", "startup-india-dpiit"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: ["gemEmdExemption", "gemMsePriceMatching"],
    notes:
      "Confirm current GeM vendor assessment category list, which changes periodically and was not verifiable to a primary source in this research pass. Confirm the startup-specific tender provisions claim against current GeM policy before publishing, as this area has seen frequent portal-level changes.",
  },
};
