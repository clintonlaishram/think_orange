// GA4 (gtag.js) event helper. The tag itself is installed once in index.html,
// deliberately outside the SEO:START/SEO:END markers that scripts/prerender.mjs
// replaces wholesale — see the comment there.
//
// ⚠️ LOCATION: this is `src/lib/`, not the `src/utils/` the Google/GA4 how-to
// guides (and Clinton's own reference screenshots) name. There is no
// `src/utils/` in this repo and never has been; every shared helper here —
// cn, whatsapp, emailjs, spamGuard, seo, jsonld, formatDate — lives in
// `src/lib/`. Adding a second helper directory for one file is how a codebase
// ends up with two places to look for the same kind of thing.
//
// ⛔ NO STATIC IMPORTS BEYOND THIS FILE'S OWN NEEDS. This module is imported
// by RootLayout, which is the one always-eager module on every route, so
// anything pulled in here lands in the main chunk for all 57 of them. It is
// intentionally dependency-free.

/**
 * True when a real gtag is reachable.
 *
 * ⚠️ This checks `window.gtag`, NOT the GA script having loaded. index.html
 * declares `function gtag(){ dataLayer.push(arguments) }` INLINE, before the
 * async googletagmanager.com script resolves — and that is the whole point of
 * the vendor snippet's shape. Events fired before the network request finishes
 * queue on `dataLayer` and are replayed when it arrives, so an early call is
 * not a lost call. It also means a blocked or ad-filtered GA script degrades
 * to a harmless array push rather than a TypeError.
 */
function gtagReady() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

// Phase 9 prerenders every route through `renderToString` in Node, where there
// is no `window` at all — every function here has to be callable in that pass
// and do nothing, rather than throw.
const isBrowser = typeof window !== "undefined";

// ⛔ DEV DOES NOT SEND, BY DESIGN. A localhost session firing real events
// pollutes the same GA4 property the live site reports into — and unlike a bad
// deploy there is no way to remove those hits afterwards. GA4's own
// internal-traffic filter is an IP allowlist, which does not help on a laptop
// with a changing address. So dev logs what it WOULD have sent, which is also
// the faster way to check a call site is wired correctly.
//
// Consequence for verification: to see real events you must test the
// PRODUCTION build (`npm run build` then `npx serve dist`), not `npm run dev`.
const SEND = import.meta.env.PROD;

/**
 * Normalise a route path for reporting.
 *
 * ⛔ WITHOUT THIS, ONE PAGE SPLITS INTO TWO ROWS IN EVERY GA4 REPORT.
 * Phase 9 prerenders to `dist/about/index.html`, so a static host serves the
 * DIRECTORY form and `location.pathname` arrives as `/about/` on a hard load —
 * while an in-app navigation gets its pathname from the link's href, and
 * nav.js emits those slash-free (`/about`). So the same page reports as
 * `/about/` when someone lands on it and `/about` when they navigate to it,
 * and no report ever adds the two together.
 *
 * Same trailing-slash trap `hasLightTop()` in nav.js already had to solve for
 * the light-header flag — both URL forms reach real users.
 */
function normalisePath(path) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "");
}

/**
 * Send one GA4 event.
 *
 * @param {string} eventName  snake_case, GA4's own convention.
 * @param {Record<string, string|number|boolean>} [parameters]
 */
export function trackEvent(eventName, parameters = {}) {
  if (!eventName) return;

  // Drop null/undefined/empty values rather than sending them. GA4 registers a
  // parameter the first time it sees one and keeps it in the property's schema,
  // so an accidental `service: undefined` becomes a permanent empty dimension
  // in reports that cannot be deleted.
  const clean = {};
  for (const [key, value] of Object.entries(parameters)) {
    if (value === null || value === undefined || value === "") continue;
    // Same normalisation as page_view's, so a `whatsapp_click` on a
    // hard-loaded `/about/` groups with a page_view of `/about` instead of
    // sitting in its own row.
    clean[key] = key === "page_path" ? normalisePath(value) : value;
  }

  if (!SEND) {
    if (isBrowser) console.debug("[analytics] (dev, not sent)", eventName, clean);
    return;
  }
  if (!gtagReady()) return;
  window.gtag("event", eventName, clean);
}

/**
 * Send a GA4 page_view for a client-side navigation.
 *
 * ⛔ THE CALLER MUST NOT FIRE THIS ON FIRST LOAD. index.html's
 * `gtag('config', …)` already sends a page_view when the document loads, so a
 * call on mount double-counts the landing page. RootLayout gates it behind a
 * ref for exactly this reason.
 */
export function trackPageView({ path, title }) {
  if (!isBrowser) return;

  const params = {
    page_path: normalisePath(path),
    page_location: window.location.href,
    page_title: title ?? document.title,
  };

  if (!SEND) {
    console.debug("[analytics] (dev, not sent) page_view", params);
    return;
  }
  if (!gtagReady()) return;
  window.gtag("event", "page_view", params);
}
