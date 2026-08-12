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
    DscProduct,
    UtilityPage,
    About,
    PartnerWithUs,
    Contact,
    LegalPage,
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
    case "T4":
      return DscProduct;
    case "T5":
      return UtilityPage;
    case "T6":
      return entry.path === "/about" ? About : PartnerWithUs;
    case "T7":
      return Contact;
    case "T8":
      return LegalPage;
    case "T9":
    default:
      return NotFound;
  }
}
