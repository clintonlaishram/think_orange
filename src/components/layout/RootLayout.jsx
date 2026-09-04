import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Header } from "@/components/navbar/Header";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollNav } from "@/components/layout/ScrollNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import { useIdleMount } from "@/hooks/useIdleMount";
import { wasPrerendered } from "@/lib/prerendered";
import { trackPageView } from "@/lib/analytics";
import { useContactLinkTracking } from "@/hooks/useContactLinkTracking";
import { site } from "@/content/nav";

const ORIGIN = `https://${site.domain}`;

// Lazy, because RootLayout is the one always-eager module on every route and a
// static import puts Sonner in the main chunk for all 49 of them — including
// the 47 with no form on them. Nothing can toast until a user submits Contact
// or Partner-With-Us, both of which are themselves lazy route chunks, so the
// Toaster has no reason to be on the critical path. Still mounted sitewide and
// still a single instance; only its arrival is deferred.
const Toaster = lazy(() =>
  import("sonner").then((mod) => ({ default: mod.Toaster }))
);

// ⚠️ The lazy Toaster is gated on `useIdleMount`, NOT wrapped in a bare
// <Suspense> — and it has to be. RootLayout is in the prerender tree, and
// `renderToString` cannot resolve a lazy() import: it emits the fallback and
// marks the boundary unfinished, so hydration reports React error #419 and
// client-renders the subtree. That showed up in Phase 10 as a console error in
// Lighthouse's Best Practices audit on the homepage. A flag that starts false
// renders nothing on the server and nothing on the client's first pass, so the
// two agree and there is no boundary left open.
function DeferredToaster() {
  const ready = useIdleMount();
  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Toaster
        position="top-right"
        richColors={false}
        toastOptions={{
          classNames: {
            toast: "!bg-white !border !border-ink-100 !shadow-[var(--shadow-md)] !rounded-[var(--radius-sm)]",
            title: "!text-body !font-medium !text-ink-600",
            description: "!text-body-sm !text-ink-500",
            error: "!border-danger",
            success: "!border-success",
          },
        }}
      />
    </Suspense>
  );
}

function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  const existing = document.head.querySelector('link[rel="canonical"]');
  if (href == null) {
    existing?.remove();
    return;
  }
  const el = existing ?? document.createElement("link");
  el.setAttribute("rel", "canonical");
  el.setAttribute("href", href);
  if (!existing) document.head.appendChild(el);
}

// Wraps all 49 routes. The header is fixed and transparent over the hero, so
// every page template must open with a dark surface — all of them do
// (T1 hero is Deep; T2/T3/T4/T5 open with the ink-950 compact hero per
// CONTENT-PLAN.md §7-9). If a future template ever opens on a light surface,
// the header needs a solid variant for that route, not a hack here.
export function RootLayout() {
  const { pathname, hash } = useLocation();
  // Reset scroll on navigation. React Router does not do this for you, and
  // without it a deep service page opens halfway down.
  //
  // ⛔ 03-09-2026: this used to scroll to the top UNCONDITIONALLY, which
  // silently broke every cross-page fragment link on the site — the footer's
  // DSC column, the retired-DSC redirect stubs and, as of today, the whole
  // Digital Signatures mega panel, whose items are all deep links into a
  // section of /dsc or /dsc/buy-token. React Router changes the URL without a
  // document load, so the browser never performs its own fragment scroll and
  // this effect then scrolled the reader back to the top of a page they had
  // asked to enter halfway down. A same-page anchor was unaffected, which is
  // why it went unnoticed.
  //
  // ⚠️ The RETRY is not defensive padding. Every page template is
  // `React.lazy`-loaded (Phase 7), so on a cross-page navigation the target
  // section does not exist in the DOM on the frame this effect first runs —
  // one `getElementById` would miss on exactly the case this exists for.
  // `scroll-mt-*` on the targets supplies the fixed header's clearance, so
  // `scrollIntoView` needs no offset of its own here.
  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : "";
    if (!id) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let frame = 0;
    let attempts = 0;
    const seek = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
        return;
      }
      // ~30 frames (about half a second) is comfortably longer than a lazy
      // chunk takes to resolve locally and on a cold cache; after that the
      // fragment genuinely does not exist and the top of the page is the
      // honest fallback rather than an indefinite loop.
      if (++attempts > 30) {
        window.scrollTo(0, 0);
        return;
      }
      frame = window.requestAnimationFrame(seek);
    };
    frame = window.requestAnimationFrame(seek);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  // Phase 9 — keeps <title>/<meta description>/canonical/OG in sync on every
  // CLIENT-side navigation. A prerendered page already has the correct tags
  // baked in by scripts/prerender.mjs; this only matters once React Router
  // starts handling navigation without a full page reload.
  //
  // DYNAMIC import, not a static one, and load-bearing: src/lib/seo.js pulls
  // in every content source sitewide (all 17 service leaves, every DSC
  // product/driver, every category, both editorial pages, all 5 legal
  // files) to resolve a route's meta. A static import here — RootLayout is
  // always-eager, never one of router.jsx's lazy chunks — dragged that
  // entire graph into the MAIN bundle regardless of which single page
  // loaded. Measured before reverting to this: main chunk 500KB -> 690KB
  // minified. The dynamic import makes seo.js's whole content graph its own
  // chunk instead, fetched once in the background after mount — never
  // blocking first paint, cached for every later in-app navigation.
  //
  // And it only RUNS on navigation. Phase 10 measured what running it on the
  // first render costs: resolving meta for the page already in the document
  // pulled seo.js's ~175KB content-graph chunk onto the critical path of every
  // cold load, to compute tags byte-identical to the ones prerender.mjs had
  // already written into <head>. Skipping the prerendered first pass means that
  // chunk is not fetched until a visitor actually navigates in-app.
  const isFirstPass = useRef(true);
  useEffect(() => {
    // Read BEFORE the early return below, because the page_view gate needs
    // "was this the very first render" independently of whether the page was
    // prerendered — the <head> sync only cares about the latter.
    const isInitialRender = isFirstPass.current;
    const skip = isInitialRender && wasPrerendered;
    isFirstPass.current = false;
    if (skip) return;

    let cancelled = false;
    import("@/lib/seo").then(({ resolveSeo }) => {
      if (cancelled) return;
      const { title, description, canonical, robots, ogImage } = resolveSeo(pathname);
      document.title = title;

      // GA4 page_view for the client-side navigation.
      //
      // ⛔ FIRED FROM INSIDE THIS EFFECT, AFTER `document.title` IS SET, AND
      // BOTH HALVES OF THAT MATTER. `resolveSeo` arrives through a DYNAMIC
      // import (see the note above), so a page_view sent from its own effect on
      // the pathname change would carry the PREVIOUS page's `document.title` —
      // every report row labelled one page behind. Sending it here means the
      // title is already correct by construction.
      //
      // ⛔ AND THE FIRST RENDER IS ALWAYS SKIPPED, prerendered or not.
      // index.html's `gtag('config', …)` sends a page_view on document load, so
      // a call on mount double-counts the landing page. `isInitialRender` is
      // captured above the `wasPrerendered` early return on purpose: gating on
      // `skip` instead would skip the first real NAVIGATION on a prerendered
      // page (the effect's first reaching this line), losing a genuine hit —
      // and under `npm run dev`, where nothing is prerendered, it would let the
      // mount through and double-count instead. The two gates answer different
      // questions and cannot share one flag.
      if (!isInitialRender) {
        trackPageView({ path: pathname, title });
      }
      upsertMeta("name", "description", description);
      upsertMeta("name", "robots", robots);
      upsertMeta("property", "og:type", "website");
      upsertMeta("property", "og:site_name", site.shortName);
      upsertMeta("property", "og:title", title);
      upsertMeta("property", "og:description", description);
      upsertMeta("property", "og:url", canonical ?? `${ORIGIN}${pathname}`);
      upsertMeta("property", "og:image", ogImage);
      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:title", title);
      upsertMeta("name", "twitter:description", description);
      upsertCanonical(canonical);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // One delegated listener for every WhatsApp and phone link sitewide — see
  // the hook for why this is not twenty onClick handlers, and why the link's
  // href is deliberately never sent.
  useContactLinkTracking(pathname);

  return (
    <>
      {/* Organization + LocalBusiness — CONTENT-PLAN.md §14.2 "All" row.
          Sitewide and identical on every route on purpose: a crawler that
          only ever fetches one page (a driver download page ranking on its
          own, say) still gets the full identity block, not just whatever
          that one page's own schema happens to add. */}
      <JsonLd data={[organizationJsonLd(), localBusinessJsonLd()]} />

      <Header />
      {/* No top padding here on purpose — the header is transparent over the
          page's opening section, so that section must be full-bleed to y=0 and
          clear the header itself via `.page-top`. Padding <main> instead would
          expose the body background behind the transparent header. */}
      {/* ⛔ `overflow-x-clip`, NEVER `overflow-x-hidden`. This was `hidden`
          until 19-08-2026 and it silently broke EVERY `position: sticky` on the
          site — the T2 sub-nav, the enquiry card, and the FAQ/step rails.
          Per spec, when one axis is not `visible` the other computes to `auto`,
          so `overflow-x: hidden` gave <main> `overflow-y: auto` and made it a
          scroll container. A sticky element then sticks to MAIN's scrollport
          rather than the viewport — and since main is not the thing being
          scrolled (the document is), it never engages at all. Measured before
          the fix: the sub-nav scrolled clean off at -1344px instead of parking
          at 64px. `clip` does the same visual clipping without creating a
          scroll container, so the horizontal-overflow guard this was here for
          still holds. */}
      <main id="main" className="overflow-x-clip">
        {/* Fallback is a plain dark block, not a spinner — it's on-screen for
            one chunk fetch at most, and the layout contract requires every
            route's opening section to be dark anyway (fixed transparent
            header needs canvas-coloured text to stay legible), so this keeps
            that contract true even during the brief gap before the real
            lazy-loaded template paints. `min-h-screen` avoids a footer jump. */}
        {/* ⛔ `key={pathname}` — REMOUNTS the page subtree on every navigation,
            and it is a bug fix, not a preference (22-08-2026).

            React reconciles by element TYPE and POSITION. Two service leaves
            are two different routes but both render <ServiceLeaf> at the same
            depth, so React kept the SAME component instance and only changed
            its props — which meant every `useInView(..., { once: true })`
            latch inside `Reveal`, `Stagger` and `SectionHeading` survived the
            navigation already flipped to true. The new page's content
            therefore appeared fully opaque with no reveal at all, and any
            wrapper that happened to be latched stayed latched forever.

            Measured on /services/gst/registration -> /services/gst/return-filing:
            a hard load starts with 23 of 30 reveal wrappers hidden; after the
            in-app navigation only 6 were, and scrolling the new page never
            revealed anything because there was nothing left to trigger.

            Keying by pathname makes an in-app navigation behave like a fresh
            load: new instances, fresh observers, reveals replay. It also fixes
            the same class of problem for every other template that serves more
            than one route (T3 hubs, T4 products, T5 utility pages, T8 legal,
            T10 articles), not just service leaves.

            On the Suspense boundary rather than a wrapper div, so it adds no
            DOM node. Keys are not serialized, so this cannot introduce a
            hydration mismatch. */}
        <Suspense key={pathname} fallback={<div className="min-h-screen bg-ink-950" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
      {/* Mounted once, sitewide, for Phase 8's Contact and Partner-With-Us
          forms (the only two callers of toast.* in the codebase) — one
          instance rather than a per-page mount, since Sonner is a singleton
          by design. `top-right` deliberately avoids the FloatingWhatsApp
          FAB's bottom-right corner, where Sonner's default position would
          otherwise stack toasts directly over/behind it. `classNames` maps
          onto design tokens rather than Sonner's own inline theme (CLAUDE.md:
          tokens only, no raw hex). */}
      {/* ---- Scroll affordance (§11.2) --------------------------------
          Now its own component: a fixed down/up control that advances one
          section from the top and returns to the top thereafter. It replaced
          an inline `position: absolute` button here whose target was
          `main.nextElementSibling` — the footer — so "next section" jumped the
          whole page. Deliberately NOT wrapped in Reveal: it is a persistent
          control, not section content, and an affordance that fades in only
          after you have scrolled is one that arrives too late to be useful. */}
      <ScrollNav />
      <DeferredToaster />
    </>
  );
}
