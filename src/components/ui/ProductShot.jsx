import { Img } from "@/components/ui/Img";
import { ArcRings } from "@/components/ui/ArcRings";
import { cn } from "@/lib/cn";

// A designed plinth for a supplied product photograph — 19-08-2026, Clinton:
// the new DSC token and DSC illustration were rendering as bare `<img>` tags
// with no frame, which read as "an image dropped on the page" rather than as
// part of the design.
//
// TWO REAL BUGS THIS ALSO FIXES, both of which were live:
//   1. `DscHub.jsx` had `src="public/images/drivers/dsc-card.png"`. `public/`
//      is Vite's build ROOT, not a URL segment — the served path is
//      `/images/...`, and as written it resolved relative to the route
//      (`/dsc/public/images/...`) and 404'd.
//   2. Both were bare `<img>` tags, which CLAUDE.md forbids outright: every
//      image goes through `<Img>`, whose required width/height reserve the box
//      before load so a 600KB PNG cannot shift the layout under the reader.
//
// THE DESIGN, and why each piece is here rather than decoration for its own
// sake (DESIGN.md §16 — apply an effect where it does work):
//   - A DARK plinth, on both light and deep sections. Both assets are
//     transparent PNGs of dark hardware; on `canvas` they float with no ground
//     and the token's own drop shadow reads as dirt on the page.
//   - ONE radial ember glow behind the product, sized to it. It anchors the
//     object to the panel and is the section's warm accent — the panel itself
//     stays pure ink, since DESIGN.md §7.1 bars the brand gradient from card
//     backgrounds.
//   - The arc rings the rest of the site already uses, at panel weight (ink
//     tint, higher opacity than a section ladder — this is a ~500px surface,
//     where section-level opacities are invisible). Keeps the token off the
//     page's orange budget.
//   - `.grain`, because §7.4 applies grain to every dark surface, plus the
//     `relative`/`overflow-hidden` pair `.grain::after` and the rings both
//     need to stay inside the panel's radius.
//
// Deliberately NO hover lift, ring or arc-draw: this is a static product
// still, not an interactive card, and signalling an interaction that does not
// exist is the failure `.panel-dark` already avoids for the partner panel.
export function ProductShot({
  src,
  alt,
  width,
  height,
  caption,
  gradientId,
  glowClassName = "h-[70%] w-[85%]",
  className,
  imgClassName,
}) {
  return (
    <figure
      data-surface="dark"
      // `.panel-dark` (theme.css) is the site's static dark-panel surface —
      // directional wash, hairline border and §6.4's inset light-catch, the
      // detail that makes a dark panel read as an object rather than a hole cut
      // in the page. Reused rather than re-specified: it is already the
      // treatment on the homepage partner panel, and it deliberately has no
      // hover state, which is right for a product still.
      className={cn(
        "panel-dark grain isolate rounded-[var(--radius-lg)] px-6 py-12 md:px-10 md:py-16",
        className,
      )}
    >
      <ArcRings
        rings={[
          { r: 168, width: 15, opacity: 0.14 },
          { r: 128, width: 12, opacity: 0.09 },
        ]}
        color="var(--color-ink-600)"
        gradientId={gradientId}
        svgClassName="-right-20 -top-24 h-[380px] w-[380px] md:-right-28 md:-top-32 md:h-[520px] md:w-[520px]"
      />

      {/* Ember key light behind the product, and a ground shadow beneath it.
          Both are what stop a transparent PNG reading as a sticker: one gives
          the object a light source, the other seats it on the panel. Every
          colour is a `color-mix` over a token — no raw rgba (CLAUDE.md). */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl",
          glowClassName,
        )}
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-ember-400) 34%, transparent), transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[68%] h-[14%] w-[62%] -translate-x-1/2 rounded-[50%] blur-xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-ink-950) 78%, transparent), transparent 100%)",
        }}
      />

      {/* `ratio` matters here beyond CLS: <Img>'s inner <img> is
          `h-full w-full object-cover`, and cover only equals contain — i.e.
          only leaves a transparent product uncropped — when the box's ratio is
          the file's own. Pass the real pixel dimensions, not a design ratio. */}
      <Img
        src={src}
        alt={alt}
        width={width}
        height={height}
        // No skeleton: this is a TRANSPARENT PNG standing on the plinth, so a
        // filled loading rectangle would cover the panel's wash, its arc rings
        // and its key light — visibly wrong rather than merely early. The
        // plinth is itself the holding surface here.
        skeleton={false}
        ratio={`${width} / ${height}`}
        className={cn("relative mx-auto !bg-transparent", imgClassName)}
      />

      {caption && (
        <figcaption className="relative mt-8 flex items-center justify-center gap-3 text-center font-mono text-body-sm text-ink-300">
          <span aria-hidden="true" className="h-px w-6 bg-ink-700" />
          {caption}
          <span aria-hidden="true" className="h-px w-6 bg-ink-700" />
        </figcaption>
      )}
    </figure>
  );
}
