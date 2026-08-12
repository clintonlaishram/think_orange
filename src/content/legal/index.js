// Relative imports with explicit extensions, not the "@/" alias — this file
// is now also imported (transitively, via src/lib/seo.js) by Phase 9's
// plain-Node prerender script, which cannot resolve "@/". Same discipline as
// every other file under src/content/ (see gst-registration.js's comment).
import { privacyPolicy } from "./privacy-policy.js";
import { termsAndConditions } from "./terms-and-conditions.js";
import { refundPolicy } from "./refund-policy.js";
import { shippingDeliveryPolicy } from "./shipping-delivery-policy.js";
import { disclaimer } from "./disclaimer.js";

// One content file per legal page (CONTENT-PLAN.md §12: "One prose renderer,
// five content files"), collected here so LegalPage.jsx can resolve any of
// the 5 routes by slug without importing each file by name — same
// "template never hardcodes content" discipline as getServiceContent.
const legalPagesBySlug = new Map(
  [privacyPolicy, termsAndConditions, refundPolicy, shippingDeliveryPolicy, disclaimer].map((page) => [
    page.slug,
    page,
  ])
);

export function getLegalContent(slug) {
  return legalPagesBySlug.get(slug);
}
