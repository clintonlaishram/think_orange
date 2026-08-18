/* eslint-disable react-refresh/only-export-components -- this module's export
   is a route-config array, not a component, so Fast Refresh's component-export
   rule doesn't apply to the lazy() bindings below. */
import { lazy } from "react";
import { allRoutes } from "@/content/nav";
import { RootLayout } from "@/components/layout/RootLayout";
import { resolveComponent } from "@/routeComponents";

// Every template is lazy — Phase 7's code-splitting fix. Loading them eagerly
// packs all nine into one chunk, so a driver-download page has to download and
// execute the homepage's WebGL shader and every Framer Motion homepage section
// before its own first paint can register.
//
// Phase 10 found this had regressed: router.jsx was back to eager imports with
// a hand-copied resolveComponent switch, and the whole client bundle was a
// single 905KB chunk. Most likely collateral from the `git stash` that reverted
// Phase 9's two hydration experiments — it went back past Phase 7's fix too.
// If a revert ever touches this file again, check `dist/assets/*.js` for one
// oversized chunk; the build succeeds either way and nothing else flags it.
const components = {
  Home: lazy(() => import("@/modules/home")),
  ServicesHub: lazy(() => import("@/modules/services/ServicesHub")),
  CategoryHub: lazy(() => import("@/modules/services/CategoryHub")),
  ServiceLeaf: lazy(() => import("@/modules/services/ServiceLeaf")),
  DscHub: lazy(() => import("@/modules/dsc/DscHub")),
  DscProduct: lazy(() => import("@/modules/dsc/DscProduct")),
  UtilityPage: lazy(() => import("@/modules/dsc/UtilityPage")),
  About: lazy(() => import("@/modules/about")),
  PartnerWithUs: lazy(() => import("@/modules/partner-with-us")),
  Contact: lazy(() => import("@/modules/contact")),
  LegalPage: lazy(() => import("@/modules/legal/LegalPage")),
  InsightsIndex: lazy(() => import("@/modules/insights")),
  InsightArticle: lazy(() => import("@/modules/insights/Article")),
  NotFound: lazy(() => import("@/modules/not-found")),
};

// Dev-only fixture — deliberately absent from nav.js, so it can never leak
// into the mega menu, footer sitemap or XML sitemap. Lazy for the same reason:
// eagerly imported, the kitchen sink's demo of every primitive ships to every
// real visitor.
const KitchenSink = lazy(() => import("@/modules/dev/KitchenSink"));
const devRoutes = [{ path: "/kitchen-sink", element: <KitchenSink /> }];

export const routes = [
  {
    element: <RootLayout />,
    children: [
      ...allRoutes.map((entry) => {
        const Component = resolveComponent(entry, components);
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
