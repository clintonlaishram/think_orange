import { allRoutes } from "@/content/nav";
import { RootLayout } from "@/components/layout/RootLayout";

import Home from "@/modules/home";
import ServicesHub from "@/modules/services/ServicesHub";
import CategoryHub from "@/modules/services/CategoryHub";
import ServiceLeaf from "@/modules/services/ServiceLeaf";
import DscHub from "@/modules/dsc/DscHub";
import DscProduct from "@/modules/dsc/DscProduct";
import UtilityPage from "@/modules/dsc/UtilityPage";
import About from "@/modules/about";
import PartnerWithUs from "@/modules/partner-with-us";
import Contact from "@/modules/contact";
import LegalPage from "@/modules/legal/LegalPage";
import NotFound from "@/modules/not-found";
import KitchenSink from "@/modules/dev/KitchenSink";

// Maps a nav.js route entry to its template component. Kept separate from
// nav.js so the content layer stays free of React imports — which is what
// lets Phase 9's build script and the sitemap generator import nav.js in a
// plain Node context (BUILD-PLAN.md §1).
function resolveComponent(entry) {
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

// Dev-only fixture — deliberately absent from nav.js, so it can never leak
// into the mega menu, footer sitemap or XML sitemap.
const devRoutes = [{ path: "/kitchen-sink", element: <KitchenSink /> }];

export const routes = [
  {
    element: <RootLayout />,
    children: [
      ...allRoutes.map((entry) => {
        const Component = resolveComponent(entry);
        return {
          path: entry.path,
          element: (
            <Component title={entry.label} template={entry.template} path={entry.path} />
          ),
        };
      }),
      ...devRoutes,
    ],
  },
];
