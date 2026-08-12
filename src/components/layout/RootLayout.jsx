import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Header } from "@/components/navbar/Header";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import { useIdleMount } from "@/hooks/useIdleMount";
import { wasPrerendered } from "@/lib/prerendered";
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
  const { pathname } = useLocation();

  // Reset scroll on navigation. React Router does not do this for you, and
  // without it a deep service page opens halfway down.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
    const skip = isFirstPass.current && wasPrerendered;
    isFirstPass.current = false;
    if (skip) return;

    let cancelled = false;
    import("@/lib/seo").then(({ resolveSeo }) => {
      if (cancelled) return;
      const { title, description, canonical, robots, ogImage } = resolveSeo(pathname);
      document.title = title;
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
      <main id="main">
        {/* Fallback is a plain dark block, not a spinner — it's on-screen for
            one chunk fetch at most, and the layout contract requires every
            route's opening section to be dark anyway (fixed transparent
            header needs canvas-coloured text to stay legible), so this keeps
            that contract true even during the brief gap before the real
            lazy-loaded template paints. `min-h-screen` avoids a footer jump. */}
        <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
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
      <DeferredToaster />
    </>
  );
}
