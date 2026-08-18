// ============================================================================
// THE KEYSTONE (CONTENT-PLAN.md §13). Single source of truth for:
//   1. the Services + DSC mega panels        5. related-service resolution
//   2. the mobile accordion                  6. the contact form's service select
//   3. the footer sitemap                    7. the router's route table
//   4. breadcrumbs                           8. the XML sitemap (Phase 9)
//
// Change a service name here and every surface updates. Nothing downstream
// may hardcode a path or a label.
//
// IA authority: CONTENT-PLAN.md §4 (49 routes). DESIGN.md §10 describes the
// PRESENTATION of these panels; where the two disagreed on category names,
// CONTENT-PLAN.md won and DESIGN.md's diagrams were corrected to match.
// ============================================================================

// Index only — article prose lives in content/insights/bodies.js and must stay
// out of this module's import graph: nav.js is in the always-eager main chunk.
import { insights } from "./insights/index.js";

// --- Confirmed facts only (CONTENT-PLAN.md §1) -----------------------------
// Anything not listed here is on the §1.1 hold list and MUST NOT be rendered:
// CIN, GSTIN, street address, year established, office hours, client count,
// years of experience, team names, any fee. Do not add them speculatively.
export const site = {
  legalName: "ThinkOrange Consulting Private Limited",
  shortName: "ThinkOrange",
  strapline: "Empowering Businesses | Ensuring Compliance | Driving Growth",
  positioning: "Your Trusted Partner for Tax, Compliance & Business Solutions",
  ctaLine: "Simplify compliance. Accelerate growth.",
  location: "Salem, Tamil Nadu, India",
  locality: "Salem",
  region: "Tamil Nadu",
  phoneDisplay: "+91 82482 03045",
  phoneHref: "tel:+918248203045",
  whatsappHref: "https://wa.me/918248203045",
  email: "office@thinkorange.in",
  emailHref: "mailto:office@thinkorange.in",
  domain: "thinkorange.in",
};

// --- Service categories (T3 hubs) and their leaves (T2) --------------------
// `group` drives the mega panel's hairline separation: statutory columns
// first, then the growth column(s) set apart (DESIGN.md §10.2, CONTENT-PLAN.md
// §3.1). The mechanism doesn't assume a fixed split — MegaPanel.jsx sorts by
// `group` and finds the first "growth" index at render time — so it tolerates
// 5 statutory + 1 growth below exactly as it did 4 + 2 before.
//
// ⚠️ 17-08-2026: restructured against the client's revised services mega-menu
// (thinkorange-services-menu.html, content only — the menu's own visual mockup
// was NOT implemented, this file carries IA/labels only). Changes from the
// previous structure, kept here rather than only in git history because a few
// are non-obvious:
//   - New category: Registrations & Licences. `msme-udyam` and
//     `startup-india-dpiit` MOVED here from Business Setup (their content
//     files are unchanged — only their nav.js parent/path moved). Four new,
//     unwritten leaves added. See MISSING-PAGES.md.
//   - Business Setup gained one new, unwritten leaf (Trust, Society &
//     Section 8) and lost the two leaves above.
//   - Accounting & Audit relabelled "Accounting, Payroll & Audit" — slug and
//     path are UNCHANGED (still `accounting-audit`) so the three written
//     leaves under it keep their existing URLs. Three new, unwritten leaves
//     added.
//   - Government Tenders + Loans & Finance MERGED into one category, Tenders
//     & Finance (`tenders-finance`). All four leaves under it were previously
//     written and are unchanged in content — only their nav.js parent/path
//     moved. `category-content.js`'s two old hub entries were combined into
//     one under the new slug (existing approved prose recombined, nothing
//     new written); WhatWeDo.jsx's PROMISES/SPANS maps were updated to match.
//   - GST gained one new, unwritten leaf (LUT & Export Refunds).
//   - Income Tax gained one new, unwritten leaf (Notices & Assessments) —
//     ⛔ blocked the same way as the category's other three leaves, see
//     BLOCKERS.md §1.
// None of the moved leaves needed a content-file edit beyond their own
// `category` field (cosmetic metadata, not read at render time — see
// _schema.js — but kept accurate).
export const serviceCategories = [
  {
    slug: "gst",
    path: "/services/gst",
    label: "GST Services",
    subline: "Registration through to representation",
    group: "statutory",
    children: [
      { slug: "gst-registration", path: "/services/gst/registration", label: "GST Registration" },
      { slug: "gst-return-filing", path: "/services/gst/return-filing", label: "GST Return Filing" },
      { slug: "gst-notices-litigation", path: "/services/gst/notices-litigation", label: "GST Notices & Litigation" },
      { slug: "gst-itc-refunds", path: "/services/gst/itc-refunds", label: "ITC Refunds" },
      { slug: "gst-lut-export-refunds", path: "/services/gst/lut-export-refunds", label: "LUT & Export Refunds" },
    ],
  },
  {
    slug: "income-tax",
    path: "/services/income-tax",
    label: "Income Tax",
    subline: "Filing, planning and assessments",
    group: "statutory",
    children: [
      { slug: "itr-filing", path: "/services/income-tax/itr-filing", label: "ITR Filing" },
      { slug: "tax-planning-advisory", path: "/services/income-tax/tax-planning-advisory", label: "Tax Planning & Advisory" },
      { slug: "tds-compliance", path: "/services/income-tax/tds-compliance", label: "TDS Compliance" },
      { slug: "notices-assessments", path: "/services/income-tax/notices-assessments", label: "Notices & Assessments" },
    ],
  },
  {
    slug: "business-setup",
    path: "/services/business-setup",
    label: "Business Setup",
    subline: "Choosing and forming the right entity",
    group: "statutory",
    children: [
      { slug: "private-limited-company", path: "/services/business-setup/private-limited-company", label: "Private Limited Company" },
      { slug: "opc-registration", path: "/services/business-setup/opc-registration", label: "One Person Company" },
      { slug: "llp-registration", path: "/services/business-setup/llp-registration", label: "LLP Registration" },
      { slug: "partnership-firm", path: "/services/business-setup/partnership-firm", label: "Partnership Firm" },
      { slug: "proprietorship", path: "/services/business-setup/proprietorship", label: "Proprietorship" },
      { slug: "trust-society-section8", path: "/services/business-setup/trust-society-section8", label: "Trust, Society & Section 8" },
    ],
  },
  {
    slug: "registrations-licences",
    path: "/services/registrations-licences",
    label: "Registrations & Licences",
    subline: "What you need before you can trade",
    group: "statutory",
    children: [
      { slug: "msme-udyam", path: "/services/registrations-licences/msme-udyam", label: "MSME / Udyam Registration" },
      { slug: "startup-india-dpiit", path: "/services/registrations-licences/startup-india-dpiit", label: "Startup India (DPIIT)" },
      { slug: "iec-registration", path: "/services/registrations-licences/iec-registration", label: "Import Export Code (IEC)" },
      { slug: "icegate-registration", path: "/services/registrations-licences/icegate-registration", label: "ICEGATE Registration" },
      { slug: "trademark-registration", path: "/services/registrations-licences/trademark-registration", label: "Trademark Registration" },
      { slug: "ngo-darpan-registration", path: "/services/registrations-licences/ngo-darpan-registration", label: "NGO Darpan Registration" },
    ],
  },
  {
    slug: "accounting-audit",
    path: "/services/accounting-audit",
    label: "Accounting, Payroll & Audit",
    subline: "Keeping the books and the filings clean",
    group: "statutory",
    children: [
      { slug: "bookkeeping", path: "/services/accounting-audit/bookkeeping", label: "Bookkeeping & Accounting" },
      { slug: "pf-esi-registration", path: "/services/accounting-audit/pf-esi-registration", label: "PF & ESI Registration" },
      { slug: "payroll-processing-returns", path: "/services/accounting-audit/payroll-processing-returns", label: "Payroll Processing & Returns" },
      { slug: "roc-annual-compliance", path: "/services/accounting-audit/roc-annual-compliance", label: "ROC & Annual Compliance" },
      { slug: "internal-audit", path: "/services/accounting-audit/internal-audit", label: "Internal Audit" },
      { slug: "specialised-audit", path: "/services/accounting-audit/specialised-audit", label: "Specialised Audit" },
    ],
  },
  {
    slug: "tenders-finance",
    path: "/services/tenders-finance",
    label: "Tenders & Finance",
    subline: "Winning work and funding it",
    group: "growth",
    children: [
      { slug: "gem-registration", path: "/services/tenders-finance/gem-registration", label: "GeM Registration" },
      { slug: "tender-documentation", path: "/services/tenders-finance/tender-documentation", label: "Tender Documentation Support" },
      { slug: "business-loan", path: "/services/tenders-finance/business-loan", label: "Business Loan & Financing" },
      { slug: "personal-finance", path: "/services/tenders-finance/personal-finance", label: "Personal Finance & Debt Management" },
    ],
  },
];

// --- DSC pages ------------------------------------------------------------
// T4 = product page, T5 = utility page (speed-first, no marketing chrome).
//
// ⚠️ 17-08-2026: restructured against the client's revised DSC & eSign menu
// (thinkorange-dsc-menu.html — content only, that file's own visual mockup
// was NOT implemented). New: `combo-dsc`, `dsc-renewal-reissue` and
// `aadhaar-esign` (all T4, no content file yet — aadhaar-esign is a new
// eSign product family, not a DSC certificate, but reuses the T4 shell:
// `DscProduct.jsx`'s per-field optional chaining — `validityOptions`,
// `driverSlugs`, `tokenNote` all already render-or-skip — means a content
// entry with those fields empty/absent degrades cleanly). Two new T5 pages:
// `dscValidityFaqsPage`, `dscEsignVsDscPage` (no content file yet either).
// `DscProduct.jsx` and `UtilityPage.jsx` both gained a graceful fallback for
// an unwritten slug (they used to `return null` — a genuinely blank page,
// worse than T2's `PendingLeaf` — which this restructure would have shipped
// six of without that fix). See MISSING-PAGES.md for the writing backlog.
export const dscProducts = [
  { slug: "class-3-individual", 
    path: "/dsc/class-3-individual", 
    label: "Class 3 DSC — Individual", 
    template: "T4" 
  },
  { slug: "class-3-organisation", 
    path: "/dsc/class-3-organisation", 
    label: "Class 3 DSC — Organisation", 
    template: "T4" 
  },
  { slug: "combo-dsc", 
    path: "/dsc/combo-dsc", 
    label: "Combo DSC (Sign + Encrypt)", 
    template: "T4" 
  },
  { slug: "dgft-iec", 
    path: "/dsc/dgft-iec", 
    label: "DGFT (IEC) DSC", 
    template: "T4" 
  },
  { slug: "dsc-renewal-reissue", 
    path: "/dsc/renewal-reissue", 
    label: "Renewal & Re-issue", 
    template: "T4" 
  },
  { 
    slug: "buy-tokens", 
    path: "/dsc/buy-tokens", 
    label: "Buy DSC Tokens", 
    template: "T4" 
  },
  { 
    slug: "aadhaar-esign",
    path: "/dsc/aadhaar-esign", 
    label: "Aadhaar eSign", 
    template: "T4" 
  },
];

export const dscDocumentsPage = {
  slug: "documents-required",
  path: "/dsc/documents-required",
  label: "Documents Required for DSC",
  template: "T5",
};

// New (17-08-2026) — see this section's header comment. No content file
// yet; `UtilityPage.jsx`'s fallback renders a "still being written" state
// until one exists.
export const dscValidityFaqsPage = {
  slug: "validity-renewal-faqs",
  path: "/dsc/validity-renewal-faqs",
  label: "Validity, Renewal & FAQs",
  template: "T5",
};

export const dscEsignVsDscPage = {
  slug: "esign-or-dsc",
  path: "/dsc/esign-or-dsc",
  label: "eSign or DSC — Which Do You Need?",
  template: "T5",
};

// The drivers hub absorbs what was a third nav level — the four driver pages
// are listed ON the hub, never in a nested flyout (CONTENT-PLAN.md §3.5).
export const dscDriversHub = {
  slug: "drivers",
  path: "/dsc/drivers",
  label: "Token Driver Downloads",
  template: "T5",
  children: [
    { slug: "hyp2003", path: "/dsc/drivers/hyp2003", label: "HYP2003 Driver Downloads", template: "T5" },
    { slug: "epass-2003", path: "/dsc/drivers/epass-2003", label: "ePass 2003 Driver Downloads", template: "T5" },
    { slug: "watchdata-proxkey", path: "/dsc/drivers/watchdata-proxkey", label: "Watchdata Proxkey Driver Downloads", template: "T5" },
    { slug: "mtoken", path: "/dsc/drivers/mtoken", label: "mToken Driver Downloads", template: "T5" },
  ],
};

const dscProduct = (slug) => dscProducts.find((p) => p.slug === slug);

// Presentation grouping for the DSC mega panel (DESIGN.md §10.3). Groups the
// pages above; it does not define new routes. Three link-columns, matching
// the revised menu's "Digital Signature Certificates" / "Tokens & Resources"
// / "eSign Solutions" split. Looked up by slug rather than array index —
// `dscProducts` above no longer has a stable index per item now that it's
// grown, so a positional reference (`dscProducts[3]`) would silently point
// at the wrong product the next time an item is inserted.
//
// `note` on "Buy DSC Tokens" is the exact token-brand subtitle from the
// revised menu, copied verbatim — display copy only. It does NOT change
// `buy-tokens`'s own product content (`content/dsc/products.js`), which
// still centres on HYP2003 as the stocked token and doesn't mention mToken
// or InnaIT — worth Clinton confirming whether that page's copy should catch
// up. See MISSING-PAGES.md.
export const dscPanelColumns = [
  {
    label: "Digital Signature Certificates",
    items: [
      dscProduct("class-3-individual"),
      dscProduct("class-3-organisation"),
      dscProduct("combo-dsc"),
      dscProduct("dgft-iec"),
      dscProduct("dsc-renewal-reissue"),
    ],
  },
  {
    label: "Tokens & Resources",
    items: [
      { ...dscProduct("buy-tokens"), note: "HYP2003 · mToken · InnaIT" },
      dscDocumentsPage,
      dscDriversHub,
      dscValidityFaqsPage,
    ],
  },
  {
    label: "eSign Solutions",
    items: [dscProduct("aadhaar-esign"), dscEsignVsDscPage],
  },
];

// The DSC mega panel's fourth "column" — a promo CARD, not a link list, so
// MegaPanel.jsx renders it through a distinct branch rather than
// PanelColumn's `<ul>`. Replaces the old primaryNav "Partner With Us" link
// entirely (17-08-2026, Clinton's request: pull it out of the main navbar
// and surface it inside the DSC panel instead). The underlying page at
// /partner-with-us is UNCHANGED and stays reachable from here, the footer's
// Company column (`standalonePages`, below), and this card's own CTA.
// Wording is copied verbatim from thinkorange-dsc-menu.html's Partner
// Programme panel. "Partner login" has no backing portal — nothing on this
// site authenticates a partner — so it's routed to WhatsApp rather than a
// dead or fabricated link, the same "no backend yet, route to a human"
// pattern as EnquiryCard and DscEnquiryStrip elsewhere in the DSC tree.
export const dscPartnerPromo = {
  heading: "Partner Programme",
  description:
    "Offer certificates to your own clients. We handle issuance, verification, dispatch and support.",
  cta: { label: "Become a DSC Partner", path: "/partner-with-us" },
  secondaryLabel: "Partner login",
};

// --- Insights (T10) -------------------------------------------------------
// 19-08-2026. CONTENT-PLAN.md §6 row 12 reserved this route and set the bar for
// opening it ("add at 4+ articles"); four real articles now exist, so it does.
//
// The index page exists so an article has a real parent: `breadcrumbsFor` walks
// `parent` links, and without /insights every article's breadcrumb would point
// at a path with no file behind it — a 404 for a crawler and for any hard
// navigation, which is exactly what Phase 10's link audit exists to catch.
//
// Article LABELS are the articles' own titles, read from content rather than
// retyped here, so a retitled article cannot leave the breadcrumb, the footer
// or the XML sitemap asserting the old headline. This is the one place nav.js
// derives from a content file instead of the other way round; it is safe
// because insights/index.js imports nothing from nav.js (no cycle).
export const insightsIndexPage = {
  slug: "insights",
  path: "/insights",
  label: "Insights",
  template: "T10",
};

export const insightArticlePages = insights.map((article) => ({
  slug: article.slug,
  path: `/insights/${article.slug}`,
  label: article.title,
  template: "T10",
  parent: insightsIndexPage.path,
}));

// --- Standalone and legal pages -------------------------------------------
export const standalonePages = [
  { slug: "partner-with-us", path: "/partner-with-us", label: "Partner With Us", template: "T6" },
  { slug: "about", path: "/about", label: "About Us", template: "T6" },
  { slug: "contact", path: "/contact", label: "Contact Us", template: "T7" },
];

export const legalPages = [
  { slug: "privacy-policy", path: "/privacy-policy", label: "Privacy Policy", template: "T8" },
  { slug: "terms-and-conditions", path: "/terms-and-conditions", label: "Terms & Conditions", template: "T8" },
  { slug: "refund-policy", path: "/refund-policy", label: "Refund & Cancellation Policy", template: "T8" },
  { slug: "shipping-delivery-policy", path: "/shipping-delivery-policy", label: "Shipping & Delivery Policy", template: "T8" },
  { slug: "disclaimer", path: "/disclaimer", label: "Disclaimer", template: "T8" },
];

// --- Header nav -----------------------------------------------------------
// `panel` marks a mega-panel trigger. Triggers are BUTTONS, not links, so the
// panel gets proper disclosure semantics; the hub page stays reachable via the
// panel's utility rail "View all" link (DESIGN.md §10.2 keyboard spec).
//
// 17-08-2026: "Partner With Us" removed from here — see `dscPartnerPromo`
// above for where it moved. "DSC" relabelled "Digital Signatures" (Clinton's
// request) — spelled out rather than abbreviated in the primary nav; the
// panel's own internal columns still say "DSC" where that's the accurate,
// shorter term for a specific certificate (e.g. "Buy DSC Tokens").
export const primaryNav = [
  { label: "Home", path: "/" },
  { label: "Services", panel: "services", hubPath: "/services", hubLabel: "View all services" },
  { label: "Digital Signatures", panel: "dsc", hubPath: "/dsc", hubLabel: "View all DSC services" },
  { label: "About Us", path: "/about" },
];

// --- Derived: the full route table (CONTENT-PLAN.md §4 — exactly 49) -------
export const allRoutes = [
  { path: "/", label: "Home", template: "T1" },
  { path: "/services", label: "Services", template: "T3" },
  ...serviceCategories.flatMap((category) => [
    { path: category.path, label: category.label, template: "T3", slug: category.slug },
    ...category.children.map((child) => ({
      path: child.path,
      label: child.label,
      template: "T2",
      slug: child.slug,
      parent: category.path,
    })),
  ]),
  { path: "/dsc", label: "Digital Signature Certificates", template: "T3" },
  ...dscProducts.map((p) => ({ ...p, parent: "/dsc" })),
  { ...dscDocumentsPage, parent: "/dsc" },
  { ...dscValidityFaqsPage, parent: "/dsc" },
  { ...dscEsignVsDscPage, parent: "/dsc" },
  { ...dscDriversHub, children: undefined, parent: "/dsc" },
  ...dscDriversHub.children.map((d) => ({ ...d, parent: dscDriversHub.path })),
  insightsIndexPage,
  ...insightArticlePages,
  ...standalonePages,
  ...legalPages,
  { path: "*", label: "Page Not Found", template: "T9" },
];

// --- Derived: footer sitemap (DESIGN.md §11.12 — five columns) -------------
export const footerColumns = [
  {
    heading: "Company",
    links: [
      { path: "/", label: "Home" },
      { path: "/services", label: "All Services" },
      { path: insightsIndexPage.path, label: insightsIndexPage.label },
      ...standalonePages.map(({ path, label }) => ({ path, label })),
    ],
  },
  {
    heading: "Services",
    links: serviceCategories.map(({ path, label }) => ({ path, label })),
  },
  {
    heading: "Digital Signatures",
    links: [
      ...dscProducts.map(({ path, label }) => ({ path, label })),
      { path: dscDocumentsPage.path, label: dscDocumentsPage.label },
      { path: dscValidityFaqsPage.path, label: dscValidityFaqsPage.label },
      { path: dscEsignVsDscPage.path, label: dscEsignVsDscPage.label },
      { path: dscDriversHub.path, label: dscDriversHub.label },
    ],
  },
  {
    heading: "Legal",
    links: legalPages.map(({ path, label }) => ({ path, label })),
  },
];

// --- Helpers --------------------------------------------------------------

const routesByPath = new Map(allRoutes.map((route) => [route.path, route]));

export function findRoute(path) {
  return routesByPath.get(path);
}

/**
 * Breadcrumb trail for a path, walking `parent` links back to Home.
 * Home is always first; the current page is always last and unlinked.
 */
export function breadcrumbsFor(path) {
  const trail = [];
  let current = routesByPath.get(path);

  while (current) {
    trail.unshift({ path: current.path, label: current.label });
    // Service leaves sit under a category, which sits under /services.
    // DSC pages sit under /dsc. Everything else hangs straight off Home.
    const parentPath =
      current.parent ?? (current.path.startsWith("/services/") ? "/services" : null);
    current = parentPath ? routesByPath.get(parentPath) : null;
    // A category's parent is /services, but /services has no parent — stop there.
    if (current && current.path === "/services" && trail[0]?.path === "/services") break;
  }

  if (trail[0]?.path !== "/") trail.unshift({ path: "/", label: "Home" });
  return trail;
}

/**
 * Options for the contact form's "Service required" select, grouped by
 * category so the list stays scannable at 21 leaves + DSC (CONTENT-PLAN.md §11).
 */
export function serviceSelectOptions() {
  return [
    ...serviceCategories.map((category) => ({
      group: category.label,
      options: category.children.map(({ slug, label }) => ({ value: slug, label })),
    })),
    {
      group: "Digital Signature Certificates",
      options: [
        ...dscProducts.map(({ slug, label }) => ({ value: slug, label })),
        { value: "dsc-partner", label: "DSC partner enquiry" },
      ],
    },
    { group: "Other", options: [{ value: "other", label: "Something else" }] },
  ];
}

/** Flat lookup for related-service resolution in T2/T3 templates (Phase 6). */
export const serviceLeavesBySlug = new Map(
  serviceCategories.flatMap((category) =>
    category.children.map((child) => [child.slug, { ...child, category }])
  )
);

/**
 * Resolves a slug to { path, label } across service leaves, DSC products and
 * DSC utility pages. A leaf's `related` array can legitimately point at a DSC
 * product — GST Registration relates to Class 3 DSC — Organisation, because
 * companies need one to file — so a service-only lookup is not enough.
 * Returns undefined for an unknown slug so templates can skip it rather than
 * render a dead link.
 */
const slugIndex = new Map([
  ...serviceLeavesBySlug,
  ...dscProducts.map((p) => [p.slug, p]),
  [dscDocumentsPage.slug, dscDocumentsPage],
  [dscValidityFaqsPage.slug, dscValidityFaqsPage],
  [dscEsignVsDscPage.slug, dscEsignVsDscPage],
  [dscDriversHub.slug, dscDriversHub],
  ...dscDriversHub.children.map((d) => [d.slug, d]),
  [insightsIndexPage.slug, insightsIndexPage],
  ...insightArticlePages.map((a) => [a.slug, a]),
]);

export function findBySlug(slug) {
  return slugIndex.get(slug);
}

/** Every crawlable path, for the Phase 9 XML sitemap. Excludes the 404. */
export function sitemapPaths() {
  return allRoutes.filter((route) => route.path !== "*").map((route) => route.path);
}
