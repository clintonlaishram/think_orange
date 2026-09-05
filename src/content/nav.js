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
// GSTIN, year established, office hours, client count, years of experience,
// team names, any fee. Do not add them speculatively.
// (CIN and the registered street address CAME OFF that list on 20-08-2026 —
// founder-confirmed, see `cin` / `registeredAddress` below.)
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
  // Confirmed by Clinton 20-08-2026. The street address was previously on
  // CONTENT-PLAN.md §1.1's hold list and therefore rendered nowhere; it is now
  // founder-confirmed, so the footer states it and `localBusinessJsonLd()`
  // carries the real `streetAddress`/`postalCode` rather than locality-only.
  // The pieces are kept separate as well as pre-joined: `full` is what the
  // footer prints, the parts are what schema.org needs.
  cin: "U69200TZ2025PTC035876",
  registeredAddress: {
    line1: "85/11, 3rd Floor, Balaji Towers",
    line2: "Ramakrishna Road",
    locality: "Salem",
    region: "Tamil Nadu",
    // Displayed as "636 007"; schema.org wants it unspaced.
    postalCode: "636007",
    postalCodeDisplay: "636 007",
    full: "85/11, 3rd Floor, Balaji Towers, Ramakrishna Road, Salem - 636 007",
    // Clinton's own Google Maps pin (20-08-2026). `mapsUrl` is the share link
    // he supplied verbatim — it is what "Get directions" opens, so it keeps
    // whatever Google resolves it to rather than a URL reassembled by hand.
    // `mapsQuery` is the coordinate pair that link resolves to, used for the
    // embedded pin: geocoding the address STRING is approximate (Google puts
    // "Ramakrishna Road" anywhere along its length), whereas lat/lng drops the
    // pin on the building. `placeName` labels it, since the plain (keyless)
    // embed endpoint cannot label a coordinate pin on its own.
    placeName: "Balaji Towers",
    mapsUrl: "https://maps.app.goo.gl/aPEpV7X2gnMgWRd66",
    mapsQuery: "11.6685447,78.1513129",
  },
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

// --- DSC: ONE PAGE ---------------------------------------------------------
//
// ⛔ 02-09-2026 (Clinton, two instructions the same day):
//   1. "for the dsc i do not need multiple page like class 3 - individual,
//      class -3 organisation, like that so combine the 5 pages in one."
//   2. "keep dsc and resources as a single tab like home… so now it will only
//      have /dsc route only."
//
// THE ENTIRE DSC TREE IS NOW ONE ROUTE. Eleven pages became sections of /dsc:
// five certificate pages, the token page, Documents Required, Validity &
// Renewal, the drivers hub and its four driver pages. `dscProducts`,
// `dscPanelColumns`, `dscDocumentsPage`, `dscValidityFaqsPage` and
// `dscDriversHub` are GONE as exports — every one of them existed to describe
// a route, and there is one route left.
//
// Content was MOVED, not rewritten. It lives in content/dsc/ exactly as it
// did (certificates.js, drivers.js, products.js, validity-renewal-faqs.js)
// and `DscHub.jsx` renders it as sections. Structure and framing follow the
// two reference documents Clinton supplied (ThinkOrange_DSC_Hub_V7.html and
// _V4.html), both of which set their canonical to /dsc and are written as one
// landing page rather than a hub over children.
//
// ⚠️ Templates T4 (DSC product) and T5 (DSC utility) no longer have any route
// pointing at them and their modules are deleted. Do not reintroduce a
// template branch for either without a route to justify it.

// The section anchors of /dsc. Declared here, once, because three surfaces
// have to agree on them: the mega-panel-free nav link's deep links, the hub's
// own <Section id>s and its sticky sub-nav. A tab, a link and a section that
// disagree by one character scroll nowhere and light up never.
export const dscSectionIds = {
  finder: "finder",
  // ⛔ 03-09-2026 (Clinton): "remove: Portal guide / Documents required / After
  // you get it — no need for that now." `portals`, `documents` and `process`
  // are gone WITH their sections, in the same commit, because the alternative
  // is a fragment that names nothing — which is how `/dsc#certificates` shipped
  // dead twice. Everything that pointed at `documents` now points at `finder`,
  // which is what actually produces a checklist today.
  // ⛔ 03-09-2026: `certificates` is GONE. The "certificates we issue" section
  // was deleted from /dsc on 02-09-2026 ("i do not need certificate we issue
  // also") — but this key survived it, so five redirect stubs and the homepage
  // DSC band were all pointing at `/dsc#certificates`, a fragment that names
  // nothing. Nothing errors and the link-integrity scan passes it, because the
  // PATH is real and only the FRAGMENT is dead. Exactly the `/dsc#undefined`
  // failure mode again, one step subtler. Everything that named it now names
  // `finder`, which is what actually answers "which certificate do I need" and
  // renders each one's validity, documents and caveats.
  // ⚠️ Deleting a section from a template means deleting its id here too, and
  // grepping for the key. The two cannot be done separately.
  // ⛔ 05-09-2026 (Clinton): "shift the notice board section of dsc page to
  // dsc faq page." `notices` MOVED to `dscFaqSectionIds` below rather than
  // being duplicated — an id that lives in the wrong object silently produces
  // a sub-nav tab that scrolls nowhere, which is the failure this file already
  // records twice. /dsc no longer has a notices section, so it no longer has
  // the id.
  partner: "partner",
};

// The Resources page's own anchors. Kept separate from `dscSectionIds` so a
// section cannot be moved between the two pages by accident — an id that lives
// in the wrong object silently produces a sub-nav tab that scrolls nowhere.
// ⛔ 02-09-2026 (Clinton): "protal guide and document has to be dsc page. in
// resouce page i ha[ve] to mainly focus on token and driver, the[ir] validity
// and renewal." So `portals` and `documents` moved to `dscSectionIds` above,
// and Resources is now the token/driver page: drivers, validity & renewal, and
// the FAQ set that mostly answers questions about them.
// ⛔ 03-09-2026 (Clinton): "remove the most dsc faq fron by token page and
// create a new page only for dsc faq… buy token and driver download will be two
// seperate page. in buy token only order token section."
//
// Buy Token was carrying five sections — order, about the token, drivers,
// renewal, FAQs — i.e. three different jobs on one URL. It is now three pages:
//
//   /dsc/buy-token   order the token, and nothing else
//   /dsc/drivers     the driver, its install steps and its fixes
//   /dsc/faqs        every DSC FAQ, plus the reference material around them
//
// ⚠️ `/dsc/drivers` WAS A REDIRECT STUB and is now a real route. Its entry had
// to come OUT of `dscRetiredRoutes` in the same edit, or the prerender would
// write a redirect stub over the real page's own index.html — last write wins,
// and the page would silently 302 to itself.
export const dscDriversPage = {
  slug: "dsc-drivers",
  path: "/dsc/drivers",
  label: "Driver Downloads",
  template: "T12",
};

export const dscFaqsPage = {
  slug: "dsc-faqs",
  path: "/dsc/faqs",
  label: "DSC FAQs",
  template: "T13",
};

// The FAQ page's anchors. It is the only one of the three with more than one
// section, so it is the only one with a sub-nav.
// ⚠️ `renewal` lives here now, not on Buy Token. The finder's "Renewing or
// replacing" alt link and the retired `/dsc/validity-renewal-faqs` stub both
// resolve through this object, so moving the section moved both of them.
export const dscFaqSectionIds = {
  // 04-09-2026: the notice board. Moved here from `dscSectionIds` on
  // 05-09-2026 (Clinton) — it now sits directly under this page's hero.
  // ⚠️ Its section renders NOTHING when `notices.js` has no confirmed notice
  // scoped to the board, so its sub-nav tab is rendered conditionally on the
  // same count — a tab whose target does not exist scrolls nowhere and never
  // lights the scroll-spy.
  notices: "notices",
  process: "process",
  renewal: "renewal",
  faqs: "faqs",
};

// The drivers page's one anchor. Kept as an object rather than a literal
// because `DriverPicker`'s per-token `#driver-<slug>` links and the retired
// driver-page stubs all address it.
export const dscDriverSectionIds = {
  drivers: "drivers",
};

// ⛔ 02-09-2026, later the same day (Clinton): "i want to keep the page
// minimal. now it['s] filled up with the content… remove the pan-drive and
// content. for [token] keep it in another tab like digital signature."
//
// So /dsc did NOT stay the only DSC route after all. It keeps the hero, the
// finder, the certificates, how-it-works and the partner programme — the
// decision the visitor came to make — and everything technical moves here.
// This is precisely what ThinkOrange_DSC_Resources_V1.html is: a "DSC
// Resources Centre" whose own copy says to keep the detailed technical
// information "away from the main DSC sales page".
//
// The USB token offer is NOT here. It was DELETED outright on Clinton's
// instruction, not relocated — see content/dsc/certificates.js. Certificates
// still state that they are issued ON a token, because that is how a Class 3
// certificate works and removing it would make those sections wrong; what is
// gone is selling the token as a product of its own.
// ⛔ 02-09-2026, later again (Clinton): "actually change resou[rce] page to
// buy token." The Resources tab became the Buy Token page — the same route
// family, renamed and repurposed around ordering a USB token, with the driver,
// validity and renewal material kept because it is all token lifecycle.
// `/dsc/resources` never shipped (it was created earlier the same day), so
// there is no old URL to redirect from.
export const dscResourcesPage = {
  slug: "buy-token",
  path: "/dsc/buy-token",
  label: "Buy Token",
  template: "T5",
};

// ⛔ UNPAUSED 03-09-2026 (Clinton: "unpause the esign routes and add that
// column"). Off the route table since 21-08-2026; back now, because its
// content file (content/dsc/esign-or-dsc.js) was written in full before the
// pause and was never deleted, so nothing here is invented to restore it.
//
// ⚠️ **T11, not T5.** T5 resolves unconditionally to `DscBuyToken` now that
// the DSC tree is two pages, so marking this T5 would have served the Buy
// Token page under this URL — a silent wrong-page bug that renders fine and
// prerenders fine. It has its own template branch and its own module.
//
// ⚠️ The OTHER eSign route — `/dsc/aadhaar-esign`, the T4 product page — is
// deliberately NOT restored. Its content went with `content/dsc/products.js`
// when the whole T4 family was deleted on 02-09-2026, so bringing it back is a
// content-writing job plus a template decision, not an uncomment. See
// MISSING-PAGES.md.
export const dscEsignPage = {
  slug: "esign-or-dsc",
  path: "/dsc/esign-or-dsc",
  label: "eSign or DSC — Which Do You Need?",
  template: "T11",
};

// --- DSC mega panel -------------------------------------------------------
// ⛔ 03-09-2026 (Clinton): "in digital signature it will be show and dropdown
// option like previous… 4 category: DSC — (Digital Signature Certificate, DSC
// Faqs), Token & Driver — (buy token, driver download), eSign — keep as
// previous, partner with us card… do not make the main option clik[able] only
// the sub option is clik[able]."
//
// So the DSC mega panel is BACK, one day after it was removed. It is not the
// old panel restored: the DSC tree is still two routes (/dsc and
// /dsc/buy-token), so every item here is a DEEP LINK into a section of one of
// them, not a page of its own. That is exactly why the column headings are
// groupings rather than routes — there is no page for "Token & Driver" to
// point at — and it satisfies Clinton's "only the sub option is clickable"
// directly: `PanelColumn` (MegaPanel.jsx) renders a heading as a <Link> only
// when the column carries a `path`, and none of these do.
//
// ⚠️ Every `path` is BUILT from a page object or a section-id map, never typed
// as a literal. A fragment that names a
// section id which no longer exists scrolls nowhere and lights up never, and
// the link-integrity scan cannot catch it — the PATH is real and only the
// fragment is nonsense. That is precisely how `/dsc#undefined` shipped once
// (02-09-2026); the build-time fragment check exists because of it.
export const dscPanelColumns = [
  {
    label: "DSC",
    items: [
      {
        // /dsc IS the certificates page. Not a fragment: the section
        // this once pointed at no longer exists (see `dscSectionIds`).
        path: "/dsc",
        label: "Digital Signature Certificate",
      },
      // The FAQ set lives on the Buy Token page, not on /dsc — it mostly
      // answers token, validity and renewal questions. Same destination the
      // footer's DSC column has always used.
      {
        path: dscFaqsPage.path,
        label: "DSC FAQs",
      },
    ],
  },
  {
    label: "Token & Driver",
    items: [
      { path: dscResourcesPage.path, label: "Buy Token" },
      {
        path: dscDriversPage.path,
        label: "Driver Downloads",
      },
    ],
  },
  // ⛔ UNPAUSED 03-09-2026. ONE item, not the two the paused version carried:
  // `aadhaar-esign`'s product page has no content and no template since the T4
  // family was deleted (02-09-2026), and a menu item pointing at a route that
  // does not exist is a 404 in the main navigation. The page below is the one
  // that answers the question a visitor actually arrives with — which of the
  // two do I need — and it routes eSign enquiries to a human, so nothing is
  // unreachable. Add the second item when that page exists again, not before.
  {
    label: "eSign",
    items: [{ path: dscEsignPage.path, label: dscEsignPage.label }],
  },
];

/**
 * Every retired DSC path, and the slug it used to answer to.
 *
 * Kept — not deleted — for three jobs, each of which fails silently without it:
 *
 *  1. `scripts/prerender.mjs` emits a redirect stub for each path, so an old
 *     link, bookmark or search result lands on /dsc instead of a 404. All
 *     eleven are live today and are in the currently-deployed sitemap.xml.
 *  2. `slugIndex` below resolves the old slugs, because six service leaves
 *     still carry certificate slugs in `related` (gst-registration,
 *     llp-registration, private-limited-company, trademark-registration,
 *     iec-registration, icegate-registration). Those arrays are deliberately
 *     NOT rewritten: the slug still names a real, specific certificate — it
 *     just no longer has a page of its own — so the related card keeps its
 *     accurate label and points at the page that now covers it.
 *  3. `hash` sends a reader to the section that absorbed the page, rather than
 *     dropping them at the top of a long page to hunt for it.
 *
 * ⚠️ `label` must stay in step with content/dsc/certificates.js and
 * content/dsc/drivers.js. It is not imported from either because this file
 * sits at the top of the content graph and is loaded by the Node scripts; it
 * must stay dependency-free.
 */
export const dscRetiredRoutes = [
  { slug: "class-3-individual", path: "/dsc/class-3-individual", label: "Class 3 DSC — Individual", hash: dscSectionIds.finder },
  { slug: "class-3-organisation", path: "/dsc/class-3-organisation", label: "Class 3 DSC — Organisation", hash: dscSectionIds.finder },
  { slug: "combo-dsc", path: "/dsc/combo-dsc", label: "Combo DSC (Sign + Encrypt)", hash: dscSectionIds.finder },
  { slug: "dgft-iec", path: "/dsc/dgft-iec", label: "DGFT (IEC) DSC", hash: dscSectionIds.finder },
  { slug: "dsc-renewal-reissue", path: "/dsc/renewal-reissue", label: "DSC Renewal & Re-issue", hash: dscSectionIds.finder },
  // ⚠️ `buy-tokens` redirects to /dsc with NO hash. Its content was deleted,
  // so there is no section to land on — sending a reader to a fragment that
  // does not exist would leave them at the top of the page wondering what they
  // missed. /dsc's certificates section explains that every certificate ships
  // on a token, which is the honest remainder of what that page was for.
  // ⚠️ Now that a real Buy Token page exists again, the retired
  // /dsc/buy-tokens URL points at it rather than at /dsc. It briefly redirected
  // to /dsc while the token offer was deleted; this is the better destination
  // and the reason the redirect table carries an explicit `to`.
  { slug: "buy-tokens", path: "/dsc/buy-tokens", label: "Buy DSC Tokens", to: "/dsc/buy-token" },
  // ⛔ 03-09-2026: retargeted from `documents` to `finder` — the documents
  // section was removed from /dsc and the finder is where a checklist now comes
  // from. The label still names what the old URL was about.
  { slug: "documents-required", path: "/dsc/documents-required", label: "Documents Required for DSC", hash: dscSectionIds.finder },
  { slug: "validity-renewal-faqs", path: "/dsc/validity-renewal-faqs", label: "Validity, Renewal & FAQs", to: `${dscFaqsPage.path}#${dscFaqSectionIds.renewal}` },
  // ⛔ 03-09-2026: `/dsc/drivers` IS NO LONGER RETIRED. It is a real page now,
  // so its stub had to be deleted here in the same edit — `writeRedirects()`
  // runs after the route pass and would have overwritten the real page's
  // index.html with a stub that redirects to itself.
  // The four per-token driver URLs stay retired and now land on that page.
  { slug: "hyp2003", path: "/dsc/drivers/hyp2003", label: "HYP2003 Driver Downloads", to: dscDriversPage.path },
  { slug: "epass-2003", path: "/dsc/drivers/epass-2003", label: "ePass 2003 Driver Downloads", to: dscDriversPage.path },
  { slug: "watchdata-proxkey", path: "/dsc/drivers/watchdata-proxkey", label: "Watchdata Proxkey Driver Downloads", to: dscDriversPage.path },
  { slug: "mtoken", path: "/dsc/drivers/mtoken", label: "mToken Driver Downloads", to: dscDriversPage.path },
].map((route) => ({
  ...route,
  // ⚠️ Every destination is DERIVED from a page object, never a literal. The
  // Buy Token page has already been renamed once (/dsc/resources →
  // /dsc/buy-token) and a hardcoded string here would have silently pointed
  // eight redirect stubs at a 404.
  redirectTo: route.to ?? `/dsc#${route.hash}`,
}));

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
// ⛔ 02-09-2026 (Clinton): "CA, CS, Tax practitioner[s] don't refer their
// clients. They themselves onboard with us to process the DSC for their
// clients." The old description — "Offer certificates to your own clients. We
// handle issuance, verification, dispatch and support" — described the
// referral model, where the partner hands the work over. They do not. A
// partner enrols through us and issues the certificates THEMSELVES.
// ⛔ 02-09-2026 (Clinton): "do not use signx it is for the other company name"
// — and eMudhra with it. No certifying authority is named anywhere on the
// site now; the claim is "a licensed Certifying Authority".
// ⚠️ The tell is the verb: partners ISSUE, they do not REFER, and "we handle
// issuance" is exactly the sentence that gets it wrong.
export const dscPartnerPromo = {
  heading: "DSC Partner Programme",
  description:
    "Issue certificates for your own clients under your own issuing login — rather than sending them elsewhere mid-engagement.",
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

// `lightTop` is read by Header.jsx, and it exists because of CLAUDE.md's layout
// contract: the header is FIXED and transparent over each page's opening
// section, and it renders canvas-coloured text, so every other template opens
// on a dark surface. The article template opens LIGHT (Clinton, 20-08-2026), so
// the nav text would be invisible over it. That contract's own instruction for
// this case is "the header needs a per-route solid variant — not a local hack",
// and this is the signal for it: the header simply renders the solid/glass
// state it already has for the scrolled and panel-open cases.
//
// Declared here rather than in the template so it stays derivable during Phase
// 9's SSR pass and on client navigation from the SAME source, with no state and
// no effect — server and client can never disagree about it.
export const insightArticlePages = insights.map((article) => ({
  slug: article.slug,
  path: `/insights/${article.slug}`,
  label: article.title,
  template: "T10",
  parent: insightsIndexPage.path,
  lightTop: true,
}));

// --- Standalone and legal pages -------------------------------------------
export const standalonePages = [
  { slug: "partner-with-us", path: "/partner-with-us", label: "Partner With Us", template: "T6" },
  { slug: "about", path: "/about", label: "About Us", template: "T6" },
  // `lightTop` (21-08-2026): /contact opens on a LIGHT surface, so the fixed
  // transparent header's canvas-coloured text would be invisible over it. Same
  // sanctioned mechanism the T10 article template uses (see the block above
  // `insightArticlePages`) — the header renders the solid/glass state it
  // already owns, rather than the template hacking the header locally.
  { slug: "contact", path: "/contact", label: "Contact Us", template: "T7", lightTop: true },
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
  // ⛔ 03-09-2026 (Clinton: "in digital signature it will be show and dropdown
  // option like previous"). The flat DSC tab is a mega-panel trigger again —
  // see `dscPanelColumns` above for the four-slot structure and why every
  // column heading is deliberately unclickable.
  //
  // ⚠️ "Buy Token" is NO LONGER a top-level tab. It became a sub-option of
  // this panel's "Token & Driver" column on the same instruction, and leaving
  // it in both places would put one destination in the navbar twice. The page
  // itself is unchanged and still reachable from the panel, the footer's DSC
  // column, /dsc's own links and its route directly.
  //
  // ⛔ No `hubPath`/`hubLabel` (Clinton, 03-09-2026: "in dropdown remove vie[w]
  // all d[s]c services button"). MegaPanel omits the utility rail's hub link
  // when they are absent. Safe here and ONLY here: the panel's own "Digital
  // Signature Certificate" item already points at /dsc, so nothing became
  // unreachable — unlike Services, whose trigger is a <button> and whose rail
  // link is the navbar's only route to /services.
  {
    label: "Digital Signatures",
    panel: "dsc",
  },
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
  { ...dscResourcesPage, parent: "/dsc" },
  { ...dscDriversPage, parent: "/dsc" },
  { ...dscFaqsPage, parent: "/dsc" },
  { ...dscEsignPage, parent: "/dsc" },
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
      { path: "/dsc", label: "Digital Signature Certificates" },
      { path: `/dsc#${dscSectionIds.finder}`, label: "Which DSC do I need?" },
      { path: dscResourcesPage.path, label: "Buy a DSC Token" },
      { path: dscDriversPage.path, label: "Token Driver Downloads" },
      { path: dscFaqsPage.path, label: "DSC FAQs" },
      // ⛔ UNPAUSED 03-09-2026 — a live route again, so the footer lists it.
      { path: dscEsignPage.path, label: "eSign or DSC?" },
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
 * Does this route's OPENING section use a light surface?
 *
 * Only true where a template deliberately breaks the "open dark" half of the
 * layout contract; the header consumes it to render its solid state from scroll
 * position 0 so its canvas-coloured text stays legible. Defaults to false, so
 * every route that has not opted in behaves exactly as before.
 */
export function hasLightTop(path) {
  return Boolean(routesByPath.get(normalisePath(path))?.lightTop);
}

/**
 * Trailing slashes are stripped before the lookup, and that is a bug fix rather
 * than defensiveness. Route paths in this file are canonical and slash-free
 * (`/insights/foo`), but Phase 9 prerenders to `dist/insights/foo/index.html`,
 * so a static host serves the directory form and `location.pathname` arrives as
 * `/insights/foo/`. Measured: without this the header stayed transparent (84px,
 * fully transparent background) over the light article hero — i.e. exactly the
 * invisible-nav-text failure the flag exists to prevent — while a slash-free
 * visit worked. Both forms reach real users.
 *
 * Only `hasLightTop` needs it today: every other consumer receives a canonical
 * `entry.path` from the route config rather than a live pathname. Anything new
 * that keys off `location.pathname` should use this too.
 */
function normalisePath(path) {
  if (typeof path !== "string" || path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
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
        // One DSC option now, not six — there is one DSC page, and a form
        // that offers six variants of it invites a choice the site no longer
        // makes the reader take.
        { value: "dsc", label: "Digital Signature Certificate" },
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
  // ⛔ 02-09-2026: every retired DSC slug still resolves, to the /dsc section
  // that absorbed it. Six service leaves carry certificate slugs in `related`
  // and those arrays are deliberately unchanged — the slug still names a real,
  // specific certificate, it just no longer has a page of its own, so the
  // related card keeps its accurate label and links to the page that now
  // covers it. `path` is the anchored destination, so a reader lands on the
  // section rather than at the top of a long page.
  ...dscRetiredRoutes.map((r) => [r.slug, { ...r, path: r.redirectTo }]),
  ["dsc", { slug: "dsc", path: "/dsc", label: "Digital Signature Certificates" }],
  [dscResourcesPage.slug, dscResourcesPage],
  [dscDriversPage.slug, dscDriversPage],
  [dscFaqsPage.slug, dscFaqsPage],
  [dscEsignPage.slug, dscEsignPage],
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
