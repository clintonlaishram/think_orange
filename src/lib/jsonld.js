// Structured-data (JSON-LD) builders — CONTENT-PLAN.md §14.2, BUILD-PLAN.md
// Phase 9. Pure data builders, no JSX, no React import: they run identically
// inside a component (via the <JsonLd> wrapper in components/seo/JsonLd.jsx)
// and, if a future script ever needs one directly, under plain Node — same
// "relative import, explicit extension" discipline as src/content/*.js so
// nothing here breaks that path.
//
// Consolidates what were THREE separately hand-rolled FAQPage builders
// (ServiceLeaf.jsx, DscProduct.jsx, home/sections/Faqs.jsx) into one — see
// each call site's comment. One definition means a future schema.org field
// addition (e.g. `dateModified`) happens once, not three times with the risk
// of drifting between copies.
import { site } from "../content/nav.js";

const ORIGIN = `https://${site.domain}`;

export function absoluteUrl(path) {
  if (!path) return ORIGIN;
  return path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}

/** Sitewide identity — CONTENT-PLAN.md §14.2 "All" row. Rendered once per
 * page (RootLayout), not per-section, so every page is independently
 * verifiable by a crawler that only fetches that one URL. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${ORIGIN}/#organization`,
    name: site.legalName,
    alternateName: site.shortName,
    url: `${ORIGIN}/`,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "IN",
    },
    // No `logo`/`sameAs` yet — no hosted logo asset or confirmed social
    // profile URLs exist in the content layer (CONTENT-PLAN.md §1.1 hold
    // list discipline extends to schema, not just visible copy).
  };
}

/** Local-SEO half of CONTENT-PLAN.md §14.1 — "GST consultant Salem" etc.
 * Deliberately no `streetAddress` or `geo` coordinates: both are on the
 * §1.1 hold list. `areaServed` covers the national DSC/driver lane without
 * asserting a physical presence outside Salem. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${ORIGIN}/#localbusiness`,
    name: site.legalName,
    image: absoluteUrl("/images/home/home-hero.jpg"),
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "State", name: site.region },
      { "@type": "Country", name: "India" },
    ],
    url: `${ORIGIN}/`,
  };
}

/** BreadcrumbList from the same `trail` Breadcrumbs.jsx already renders —
 * built there, not here, so the visible trail and the structured data read
 * off one array and can never disagree (same discipline as the homepage
 * FAQ row's "select by reference" rule). */
export function breadcrumbListJsonLd(trail) {
  if (!trail || trail.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** FAQPage — CONTENT-PLAN.md §14.2 (T2 + T4) and §486 (homepage FAQ row).
 * The one FAQPage builder for the whole site; see file header. */
export function faqPageJsonLd(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** Service — T2 service leaves. `areaServed` mirrors LocalBusiness rather
 * than repeating a street address that doesn't exist in the content layer. */
export function serviceJsonLd({ name, description, path, categoryLabel }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${ORIGIN}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    ...(categoryLabel ? { serviceType: categoryLabel } : {}),
  };
}

/** CollectionPage — T3 category hubs, the top-level /services hub, and /dsc.
 * CONTENT-PLAN.md §14.2 pairs this with BreadcrumbList, which templates
 * already get for free by rendering <Breadcrumbs> via PageHero. */
export function collectionPageJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${ORIGIN}/#organization` },
  };
}

/** Product — T4 DSC products. No `offers`/price block: DSC pricing is
 * "on request" everywhere (same discipline as `fees: null`), and a Product
 * schema with no `offers` is valid — Rich Results simply won't show a price
 * snippet, which is correct here rather than a gap. */
export function productJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
    brand: { "@type": "Organization", name: site.shortName },
  };
}

/** HowTo — T5 driver install steps, CONTENT-PLAN.md §14.2's fastest-growing
 * lane (§14.1's "national" strategy). `step.desc` doubles as both the
 * visible copy and the schema text, so the two can't drift. */
export function howToJsonLd({ name, description, steps, path }) {
  if (!steps?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    step: steps.map((step) => ({
      "@type": "HowToStep",
      position: step.step,
      name: step.title,
      text: step.desc,
    })),
  };
}
