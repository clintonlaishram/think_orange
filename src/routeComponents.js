// Maps a nav.js route entry to its template component — the one piece of
// logic router.jsx (client, lazy chunks) and router-static.jsx (Phase 9 SSR,
// eager imports) must share rather than each maintaining its own copy of the
// same switch statement. A route resolving to the wrong template in one but
// not the other is exactly the kind of drift neither file's own build would
// catch — the client bundle would render fine, and the prerendered HTML
// would silently be for the wrong page.
//
// Takes the actual components as a parameter rather than importing them
// itself, so each caller controls HOW its components are loaded (lazy vs.
// eager) without this file caring. No JSX here on purpose — kept a plain .js
// module so nothing about it depends on react-jsx transform specifics.
export function resolveComponent(entry, components) {
  const {
    Home,
    ServicesHub,
    CategoryHub,
    ServiceLeaf,
    DscHub,
    DscBuyToken,
    DscEsign,
    DscDrivers,
    DscFaqs,
    About,
    PartnerWithUs,
    Contact,
    LegalPage,
    InsightsIndex,
    InsightArticle,
    NotFound,
  } = components;

  switch (entry.template) {
    case "T1":
      return Home;
    case "T2":
      return ServiceLeaf;
    case "T3":
      if (entry.path === "/services") return ServicesHub;
      if (entry.path === "/dsc") return DscHub;
      return CategoryHub;
    // ⛔ 02-09-2026: T4 (DSC product) is retired — the five certificate pages
    // and the token page are gone, and `DscProduct.jsx` with them. T5 was
    // retired alongside them and then brought back the same day for exactly
    // one route: /dsc/resources, the technical tab that keeps /dsc minimal.
    case "T5":
      return DscBuyToken;
    // T11 — /dsc/esign-or-dsc, unpaused 03-09-2026. Its own template rather
    // than a T5 branch, because T5 resolves unconditionally to DscBuyToken now
    // that the DSC tree is two pages: marking this T5 would have served the
    // Buy Token page under the eSign URL, in both the client bundle AND the
    // prerendered HTML, with nothing failing.
    case "T11":
      return DscEsign;
    // T12 / T13 — /dsc/drivers and /dsc/faqs, split off Buy Token 03-09-2026.
    // Their own branches for the same reason T11 has one: T5 resolves
    // unconditionally to DscBuyToken, so reusing it would have served the order
    // page under both URLs, in the bundle AND the prerendered HTML, silently.
    case "T12":
      return DscDrivers;
    case "T13":
      return DscFaqs;
    case "T6":
      return entry.path === "/about" ? About : PartnerWithUs;
    case "T7":
      return Contact;
    case "T8":
      return LegalPage;
    // T10 — the index and the articles share a template family and branch on
    // path, the same way T3 (/services, /dsc, category hubs) and T6
    // (/about, /partner-with-us) already do.
    case "T10":
      return entry.path === "/insights" ? InsightsIndex : InsightArticle;
    case "T9":
    default:
      return NotFound;
  }
}
