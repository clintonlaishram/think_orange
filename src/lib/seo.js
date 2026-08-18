// Per-route SEO resolver — CONTENT-PLAN.md §14, BUILD-PLAN.md Phase 9.
//
// ONE function (`resolveSeo`) decides {title, description, canonical, robots}
// for any of the 49 routes, used from two completely different runtimes:
//   1. scripts/prerender.mjs (plain Node) — injects the result into each
//      route's static <head> at build time.
//   2. RootLayout.jsx's client-side head sync (see that file) — keeps
//      <head> in sync on CLIENT-SIDE navigation, since a prerendered page's
//      baked-in <head> only matches the route it was built for.
//
// ⚠️ This module is intentionally NOT statically imported by RootLayout (or
// anything else that's eagerly bundled). Every branch below pulls in a full
// content source — all 17 service leaves, every DSC product/driver, every
// category, both editorial pages, all 5 legal files — because that's where
// each route's `meta` object actually lives. A first attempt imported this
// file directly from RootLayout.jsx (always-eager, never lazy) and it
// dragged EVERY one of those content files into the main chunk regardless
// of which page loaded — measured: the main chunk grew from ~500KB to
// ~690KB minified, undoing a meaningful slice of Phase 7's lazy-route-chunk
// fix for a feature (client-side <head> sync) that only matters after a SPA
// navigation, never on first paint. RootLayout instead reaches this module
// via a dynamic `import()` inside a plain useEffect, so its whole content
// graph becomes its own lazily-fetched chunk — downloaded once, after
// mount, never blocking LCP, cached for every later navigation.
//
// No react-helmet-async or similar: it isn't in BUILD-PLAN.md §1's locked
// dependency list, and React 19's built-in <title>/<meta> hoisting only
// works once the DOM is mounted — it does nothing for the static HTML a
// crawler fetches before any JS runs, which is the entire point of Phase 9.
//
// Relative imports, explicit extensions, no JSX — plain-Node-importable,
// same discipline as every file under src/content/ (see the comment atop
// gst-registration.js).
import { site, findRoute, dscDriversHub, dscDocumentsPage } from "../content/nav.js";
import { getServiceContent } from "../content/services/index.js";
import { getCategoryContent } from "../content/services/category-content.js";
import { getDscProduct } from "../content/dsc/products.js";
import { getDriver } from "../content/dsc/drivers.js";
import { dscHubContent, dscDocumentsMeta } from "../content/dsc/hub-content.js";
import { aboutContent } from "../content/about.js";
import { partnerContent } from "../content/partner-with-us.js";
import { getLegalContent } from "../content/legal/index.js";
import { meta as standaloneMeta, defaultMeta } from "../content/meta.js";
import { getInsight } from "../content/insights/index.js";
import { absoluteUrl } from "./jsonld.js";

const ORIGIN = `https://${site.domain}`;
const DEFAULT_OG_IMAGE = absoluteUrl("/images/home/home-hero.jpg");

function fallbackFor(route) {
  return {
    title: route ? `${route.label} | ThinkOrange Consulting` : defaultMeta.title,
    description: defaultMeta.description,
  };
}

function driversHubMeta() {
  return {
    title: `${dscDriversHub.label} | ThinkOrange Consulting`,
    description:
      "Install the right driver for your DSC USB token before signing on any government portal. HYP2003, ePass 2003, Watchdata Proxkey and mToken.",
  };
}

/** Resolves {title, description, canonical, robots} for one path. Never
 * throws — a route this misses falls back to defaultMeta rather than
 * shipping a blank <title>. */
export function resolveSeo(path) {
  const route = findRoute(path);
  const slug = route?.slug;
  let m;

  switch (route?.template) {
    case "T1":
      m = standaloneMeta["/"];
      break;

    case "T2": {
      const leaf = slug ? getServiceContent(slug) : undefined;
      m = leaf?.meta ?? fallbackFor(route);
      break;
    }

    case "T3": {
      if (path === "/services") m = standaloneMeta["/services"];
      else if (path === "/dsc") m = dscHubContent.meta;
      else {
        const content = slug ? getCategoryContent(slug) : undefined;
        m = content?.meta ?? fallbackFor(route);
      }
      break;
    }

    case "T4": {
      const product = slug ? getDscProduct(slug) : undefined;
      m = product?.meta ?? fallbackFor(route);
      break;
    }

    case "T5": {
      if (slug === dscDriversHub.slug) m = driversHubMeta();
      else if (slug === dscDocumentsPage.slug) m = dscDocumentsMeta;
      else {
        const driver = slug ? getDriver(slug) : undefined;
        m = driver?.meta ?? fallbackFor(route);
      }
      break;
    }

    case "T6":
      m = path === "/about" ? aboutContent.meta : partnerContent.meta;
      break;

    case "T7":
      m = standaloneMeta["/contact"];
      break;

    case "T10": {
      if (path === "/insights") m = standaloneMeta["/insights"];
      else {
        const article = slug ? getInsight(slug) : undefined;
        m = article?.meta ?? fallbackFor(route);
      }
      break;
    }

    case "T8": {
      const page = getLegalContent(path.replace(/^\//, ""));
      m = page
        ? { title: `${page.title} | ThinkOrange Consulting`, description: page.metaDescription }
        : fallbackFor(route);
      break;
    }

    case "T9":
    default:
      m = standaloneMeta["*"];
  }

  m = m ?? defaultMeta;
  const isNotFound = !route || route.template === "T9";

  return {
    title: m.title ?? defaultMeta.title,
    description: m.description ?? defaultMeta.description,
    // The 404 page has no one real URL — every bad path renders it — so it
    // gets no canonical tag at all rather than one pointing at "/", which
    // would tell crawlers every mistyped URL IS the homepage.
    canonical: isNotFound ? null : `${ORIGIN}${path}`,
    robots: isNotFound ? "noindex, follow" : "index, follow",
    ogImage: DEFAULT_OG_IMAGE,
  };
}
