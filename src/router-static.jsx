// Phase 9 SSR counterpart to router.jsx — used ONLY by src/entry-server.jsx,
// which in turn is only reachable from scripts/prerender.mjs (a build-time
// Node script, never shipped to the browser). Every template is imported
// EAGERLY here, deliberately duplicating router.jsx's import list rather
// than sharing it:
//
//   - A synchronous SSR pass (renderToString) has no use for React.lazy's
//     async boundary — there is nothing to defer when the whole point is to
//     produce one complete HTML string before the script moves on.
//   - More importantly: if this file's imports were shared with router.jsx
//     (e.g. by having router.jsx import FROM here), Rolldown would see a
//     STATIC import of every template alongside the dynamic ones and bundle
//     them into the main chunk regardless — silently undoing Phase 7's
//     code-splitting fix. Keeping this a wholly separate module means the
//     client bundle never even sees these import statements.
//
// The actual template<->route mapping lives in ONE place regardless —
// routeComponents.js's resolveComponent() — so this file and router.jsx
// can't drift on WHICH template a given route resolves to, only on how
// that template is loaded.
import Home from "@/modules/home";
import ServicesHub from "@/modules/services/ServicesHub";
import CategoryHub from "@/modules/services/CategoryHub";
import ServiceLeaf from "@/modules/services/ServiceLeaf";
import DscHub from "@/modules/dsc/DscHub";
import DscBuyToken from "@/modules/dsc/DscBuyToken";
import About from "@/modules/about";
import PartnerWithUs from "@/modules/partner-with-us";
import Contact from "@/modules/contact";
import LegalPage from "@/modules/legal/LegalPage";
import InsightsIndex from "@/modules/insights";
import InsightArticle from "@/modules/insights/Article";
import NotFound from "@/modules/not-found";
import { allRoutes } from "@/content/nav";
import { RootLayout } from "@/components/layout/RootLayout";
import { resolveComponent } from "@/routeComponents";

const components = {
  Home,
  ServicesHub,
  CategoryHub,
  ServiceLeaf,
  DscHub,
  DscBuyToken,
  About,
  PartnerWithUs,
  Contact,
  LegalPage,
  InsightsIndex,
  InsightArticle,
  NotFound,
};

export const staticRoutes = [
  {
    element: <RootLayout />,
    children: allRoutes.map((entry) => {
      const Component = resolveComponent(entry, components);
      return {
        path: entry.path,
        element: <Component title={entry.label} template={entry.template} path={entry.path} />,
      };
    }),
  },
];
