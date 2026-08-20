import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/content/nav";
import { cn } from "@/lib/cn";

// Click-to-load map, per CONTENT-PLAN.md §10 (About) and §11 (Contact) —
// both explicitly ask for this to be lazy behind a placeholder rather than
// loading an iframe (and Google's tracking cookies) on every page view.
//
// --- 20-08-2026 -----------------------------------------------------------
// It used to query by CITY name, because a precise address was on
// CONTENT-PLAN.md §1.1's hold list and a city-level pin was the honest
// answer. That address is now founder-confirmed (`site.registeredAddress`),
// so the pin is the real office.
//
// The pin is dropped on `mapsQuery` (lat/lng), NOT on the address string:
// geocoding a street name is approximate and can land the marker anywhere
// along the road, while the coordinate pair — read off Clinton's own share
// link — lands on the building. `z=17` frames the street rather than the
// district.
//
// `tone="dark"` is additive: it restyles the placeholder and the loaded
// frame's border for an ink surface. The light branch is unchanged.
export function MapEmbed({ className, tone = "light" }) {
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef(null);
  const dark = tone === "dark";

  // ⚠️ 21-08-2026, Clinton (twice): "map is not showing". The map was never
  // broken after the src fix below — what he was seeing is the click-to-load
  // PLACEHOLDER, which reads as a failed map rather than as a button.
  //
  // So it now loads ITSELF the moment it scrolls near the viewport, and the
  // button survives only as the pre-observer state (and as the no-JS/no-IO
  // fallback). Stated plainly because it is a real, deliberate deviation:
  // CONTENT-PLAN.md §10/§11 both ask for "lazy-loaded behind a click-to-load
  // placeholder", i.e. no Google iframe and no Google cookies until a visitor
  // asks for them. Auto-loading means Google gets the request without a click.
  // What is preserved is the other half of that requirement — the iframe is
  // still NOT fetched on page view: `rootMargin` only fires it when the map is
  // about to come into view, and on both /contact and /about it sits well
  // below the fold. If the privacy half ever has to come back, delete this
  // effect and nothing else changes.
  useEffect(() => {
    if (loaded) return undefined;
    const el = wrapperRef.current;
    // No IntersectionObserver (very old browser, some test environments) means
    // no auto-load — the button is still there and still works, which is the
    // correct degradation rather than eagerly loading for everyone.
    if (!el || typeof IntersectionObserver === "undefined") return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);
  const address = site.registeredAddress;
  const label = `${address.placeName}, ${address.locality}`;

  // ⛔ THE IFRAME MUST NOT BE POINTED AT `mapsUrl`. That is the
  // `maps.app.goo.gl` SHARE link, and Google refuses to be framed from it —
  // it 302s to google.com/maps, which serves `X-Frame-Options` /
  // `frame-ancestors 'none'`, so the iframe renders as a blank white box with
  // a console refusal and no error the component can catch. It was doing
  // exactly that. The share link is for the "Get directions" anchor below,
  // where it opens in a new tab (or the native app) and is correct.
  //
  // The framable one is the plain KEYLESS embed endpoint, which needs
  // `output=embed` and takes the coordinate pair rather than the address
  // string — geocoding "Ramakrishna Road" lands the marker anywhere along its
  // length, while lat/lng lands it on the building. `z=17` frames the street
  // rather than the district. This is what this file's comment above has
  // described all along; the code had drifted from it.
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address.mapsQuery
  )}&z=17&hl=en&output=embed`;

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      {loaded ? (
        <iframe
          title={`Map showing our office at ${address.full}`}
          src={embedUrl}
          className={cn(
            "h-full w-full rounded-[var(--radius-md)] border",
            dark ? "border-ink-700" : "border-ink-100"
          )}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-dashed px-6 py-10 text-center",
            "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
            dark
              ? "border-ink-700 bg-ink-950/40 hover:border-ember-300"
              : "border-ink-200 bg-canvas-alt hover:border-ember-300"
          )}
        >
          <MapPin
            className={cn("h-6 w-6", dark ? "text-ember-300" : "text-ember-500")}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className={cn("text-body font-medium", dark ? "text-canvas" : "text-ink-600")}>
            {label}
          </span>
          {/* ink-300, not ink-400, on dark — Phase 10 measured ink-400 as body
              text on ink at 2.86:1 and fixed it sitewide. */}
          {/* Copy is a LOADING state now, not a call to action — the observer
              above fires before a visitor normally reads it, and "Load map on
              click" beside a map that is already loading itself is a button
              describing something that is not going to happen. It stays a real
              <button> so the no-IO fallback is still operable. */}
          <span className={cn("text-body-sm", dark ? "text-ink-300" : "text-ink-400")}>
            Loading map&hellip;
          </span>
        </button>
      )}

      {/* Always available, loaded or not — an embedded map cannot give
          turn-by-turn directions, and a visitor on a phone wants the native
          app rather than a pinch-zoom inside an iframe. Opens Clinton's own
          share link verbatim (`mapsUrl`), which is the one place that URL is
          correct: it must never be the iframe's `src`, see above.

          `bottom-7` rather than `bottom-3`: once loaded, Google draws its own
          ~20px attribution bar ("Map data ©…, Terms, Report a map error")
          along the bottom edge, plus a control in the right corner. At 12px
          the pill sat on top of both — and that attribution has to stay
          legible, it is a condition of the embed. */}
      <a
        href={address.mapsUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "absolute bottom-7 right-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-body-sm font-medium",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
          dark
            ? "bg-ink-950/85 text-canvas hover:text-ember-200"
            : "bg-white/95 text-ink-600 shadow-[var(--shadow-sm)] hover:text-ember-600"
        )}
      >
        Get directions
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}
