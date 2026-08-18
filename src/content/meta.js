// SEO meta for standalone routes that have no other natural content-file
// home — CONTENT-PLAN.md §14, BUILD-PLAN.md Phase 9. Everything else pulls
// its meta from where it already lives: service leaves and DSC
// products/drivers carry their own `meta`, category hubs carry it in
// category-content.js / dsc/hub-content.js, About/Partner-With-Us carry it
// in their own content files, and legal pages carry `metaDescription`
// directly (see each file). Consumed by src/lib/seo.js — the single
// resolver every route (client-side head sync AND the Phase 9 prerender
// script) goes through.
//
// Relative imports only, no JSX — plain-Node-importable, same discipline as
// every other file under src/content/ (see gst-registration.js's comment).
export const meta = {
  "/": {
    title: "ThinkOrange Consulting | GST, Income Tax & Compliance Advisory — Salem",
    description:
      "ThinkOrange Consulting Private Limited — GST, income tax, business setup, accounting & audit, government tenders, and Digital Signature Certificates. Salem, Tamil Nadu, serving clients pan-India.",
  },
  "/services": {
    title: "All Services | ThinkOrange Consulting",
    description:
      "Six practice areas, thirty-one services — GST, income tax, business setup, registrations & licences, accounting & payroll, and tenders & finance. Salem, Tamil Nadu.",
  },
  "/insights": {
    title: "Insights | ThinkOrange Consulting",
    description:
      "Plain explanations of GST registration, entity choice, Digital Signature Certificates and government tendering — written for business owners, not for other accountants.",
  },
  "/contact": {
    title: "Contact Us | ThinkOrange Consulting, Salem",
    description:
      "Reach ThinkOrange Consulting by phone, WhatsApp or email, or send us your enquiry directly — GST, income tax, business setup, accounting, audit and DSC services from Salem, Tamil Nadu.",
  },
  "*": {
    title: "Page Not Found | ThinkOrange Consulting",
    description: "The page you're looking for doesn't exist. Find your way back to ThinkOrange Consulting's services, DSC pages or contact details.",
  },
};

/** Generic fallback for a route this map and every other content file miss —
 * should not normally be hit, but resolveSeo() needs to never throw. */
export const defaultMeta = {
  title: "ThinkOrange Consulting | Salem, Tamil Nadu",
  description:
    "ThinkOrange Consulting Private Limited — GST, income tax, business setup, accounting & audit, government tenders, and Digital Signature Certificates.",
};
