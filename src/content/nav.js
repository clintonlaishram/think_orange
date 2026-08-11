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
// `group` drives the mega panel's hairline separation: four statutory columns,
// then the growth pair set apart (DESIGN.md §10.2, CONTENT-PLAN.md §3.1).
export const serviceCategories = [
  {
    slug: "gst",
    path: "/services/gst",
    label: "GST Services",
    group: "statutory",
    children: [
      { slug: "gst-registration", path: "/services/gst/registration", label: "GST Registration" },
      { slug: "gst-return-filing", path: "/services/gst/return-filing", label: "GST Return Filing" },
      { slug: "gst-itc-refunds", path: "/services/gst/itc-refunds", label: "ITC Refunds" },
      { slug: "gst-notices-litigation", path: "/services/gst/notices-litigation", label: "GST Notices & Litigation" },
    ],
  },
  {
    slug: "income-tax",
    path: "/services/income-tax",
    label: "Income Tax",
    group: "statutory",
    children: [
      { slug: "itr-filing", path: "/services/income-tax/itr-filing", label: "ITR Filing" },
      { slug: "tax-planning-advisory", path: "/services/income-tax/tax-planning-advisory", label: "Tax Planning & Advisory" },
      { slug: "tds-compliance", path: "/services/income-tax/tds-compliance", label: "TDS Compliance" },
    ],
  },
  {
    slug: "business-setup",
    path: "/services/business-setup",
    label: "Business Setup",
    group: "statutory",
    children: [
      { slug: "private-limited-company", path: "/services/business-setup/private-limited-company", label: "Private Limited Company" },
      { slug: "llp-registration", path: "/services/business-setup/llp-registration", label: "LLP Registration" },
      { slug: "opc-registration", path: "/services/business-setup/opc-registration", label: "One Person Company" },
      { slug: "partnership-firm", path: "/services/business-setup/partnership-firm", label: "Partnership Firm" },
      { slug: "proprietorship", path: "/services/business-setup/proprietorship", label: "Proprietorship" },
      { slug: "msme-udyam", path: "/services/business-setup/msme-udyam", label: "MSME / Udyam Registration" },
      { slug: "startup-india-dpiit", path: "/services/business-setup/startup-india-dpiit", label: "Startup India (DPIIT)" },
    ],
  },
  {
    slug: "accounting-audit",
    path: "/services/accounting-audit",
    label: "Accounting & Audit",
    group: "statutory",
    children: [
      { slug: "bookkeeping", path: "/services/accounting-audit/bookkeeping", label: "Bookkeeping & Accounting" },
      { slug: "internal-audit", path: "/services/accounting-audit/internal-audit", label: "Internal Audit" },
      { slug: "specialised-audit", path: "/services/accounting-audit/specialised-audit", label: "Specialised Audit" },
    ],
  },
  {
    slug: "government-tenders",
    path: "/services/government-tenders",
    label: "Government Tenders",
    group: "growth",
    children: [
      { slug: "gem-registration", path: "/services/government-tenders/gem-registration", label: "GeM Registration" },
      { slug: "tender-documentation", path: "/services/government-tenders/tender-documentation", label: "Tender Documentation Support" },
    ],
  },
  {
    slug: "loans-finance",
    path: "/services/loans-finance",
    label: "Loans & Finance",
    group: "growth",
    children: [
      { slug: "business-loan", path: "/services/loans-finance/business-loan", label: "Business Loan & Financing" },
      { slug: "personal-finance", path: "/services/loans-finance/personal-finance", label: "Personal Finance & Debt Management" },
    ],
  },
];

// --- DSC pages ------------------------------------------------------------
// T4 = product page, T5 = utility page (speed-first, no marketing chrome).
export const dscProducts = [
  { slug: "class-3-individual", path: "/dsc/class-3-individual", label: "Class 3 DSC — Individual", template: "T4" },
  { slug: "class-3-organisation", path: "/dsc/class-3-organisation", label: "Class 3 DSC — Organisation", template: "T4" },
  { slug: "dgft-iec", path: "/dsc/dgft-iec", label: "DGFT (IEC) DSC", template: "T4" },
  { slug: "buy-tokens", path: "/dsc/buy-tokens", label: "Buy DSC Tokens", template: "T4" },
];

export const dscDocumentsPage = {
  slug: "documents-required",
  path: "/dsc/documents-required",
  label: "Documents Required for DSC",
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

// Presentation grouping for the 3-column DSC mega panel (DESIGN.md §10.3).
// Groups the pages above; it does not define new routes.
export const dscPanelColumns = [
  {
    label: "Certificates",
    items: [dscProducts[0], dscProducts[1], dscProducts[2]],
  },
  {
    label: "Buy & Requirements",
    items: [dscProducts[3], dscDocumentsPage],
  },
  {
    label: "Token Drivers",
    items: [dscDriversHub],
    note: "HYP2003 · ePass 2003 · Watchdata Proxkey · mToken",
  },
];

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
export const primaryNav = [
  { label: "Home", path: "/" },
  { label: "Services", panel: "services", hubPath: "/services", hubLabel: "View all services" },
  { label: "DSC", panel: "dsc", hubPath: "/dsc", hubLabel: "View all DSC services" },
  { label: "Partner With Us", path: "/partner-with-us" },
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
  { ...dscDriversHub, children: undefined, parent: "/dsc" },
  ...dscDriversHub.children.map((d) => ({ ...d, parent: dscDriversHub.path })),
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
  [dscDriversHub.slug, dscDriversHub],
  ...dscDriversHub.children.map((d) => [d.slug, d]),
]);

export function findBySlug(slug) {
  return slugIndex.get(slug);
}

/** Every crawlable path, for the Phase 9 XML sitemap. Excludes the 404. */
export function sitemapPaths() {
  return allRoutes.filter((route) => route.path !== "*").map((route) => route.path);
}
