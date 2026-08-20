// Hero floaters — 20-08-2026, Clinton's request, referencing Zoho MCP's hero.
//
// What was borrowed from that page: a scatter of small static accent marks in
// the hero's margins. What was NOT borrowed: its sprite-sheet sparkles in three
// unrelated hues (violet / cyan / orange), which is DESIGN.md §16's very first
// tell.
//
// ⛔ TWO THINGS HAVE ALREADY BEEN TRIED AND REJECTED HERE. Do not reintroduce
// either.
//
//   1. **The crescent as the mark.** §3.1 ("repeat one specific shape") pushes
//      you straight at it, and it is wrong at this scale: a hairline arc with a
//      gap, centred in a small tile, is the universal loading-spinner
//      silhouette, and screenshotted at 1440px every mark read as a spin
//      control — i.e. as a page that had failed to finish loading. The crescent
//      is right at 140px as a backdrop and wrong at 18px as a chip.
//
//   2. **The two floating tiles on the showcase image.** The reference page's
//      second decorative family is a pair of 72px rounded tiles drifting in
//      counter-phase, and that was built here, anchored to the image frame,
//      each carrying ArcGlyph's `rule` wave. Clinton's call (20-08-2026):
//      removed. The `rule` variant IS the Eyebrow's mark, so two of them
//      sitting on the image read as two stray eyebrows rather than as floating
//      objects — a fair criticism, and the reason the tiles are gone rather
//      than restyled. The motion the pair was providing now lives where it
//      actually belongs: on the showcase image and the capabilities card
//      themselves (see `hero-image-drift` / `.hero-card-float` in theme.css and
//      `HeroShowcase` in Hero.jsx).
//
// So what remains is one family: hairline registration crosses. Not a new
// shape either — DESIGN.md §7.4b's certificate/blueprint textures already
// establish `radialTicks` hairlines as the arc's companion detail
// (src/lib/arc.js), and a cross is two of them.
//
// ⚠️ THE LAYER IS md+ ONLY, and that is measured rather than lazy. At 375px the
// hero is a dense vertical stack — eyebrow, H1, lede, two CTAs, trust line,
// image, capabilities card, stat row — with no margin to float anything into,
// and CLAUDE.md records mobile ember coverage already at 6.5% there against the
// ~12% ceiling (desktop sits near 4%). Adding ember marks to the one viewport
// with the least space AND the least colour headroom is the wrong trade.
//
// Everything here is decorative: `aria-hidden`, `pointer-events-none`, no text
// content. Nothing in this file is reachable by keyboard or AT.

/**
 * A hairline registration cross — the print-shop mark, at `size` px.
 *
 * `vectorEffect="non-scaling-stroke"` keeps the hairline at 1px however the
 * mark is scaled, so a 10px cross and a 14px cross read as the same weight of
 * line rather than the smaller one looking anaemic.
 *
 * `...props` is forwarded for the same reason ArcGlyph's own comment gives, and
 * it was the same real bug: G3 positions itself with an inline `top` (the only
 * one of the four that can't be expressed as a Tailwind offset), the first
 * version of this component swallowed `style`, and the mark silently fell to
 * its static position at y=0 — behind the fixed header, invisible. Caught by
 * measuring rects over CDP, not by reading the JSX.
 */
function RegMark({ size, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M6 0.5v11M0.5 6h11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The gutter scatter — four static marks in the hero's own dead space,
 * measured against the rendered composition at 1440×900 rather than eyeballed:
 *
 *   G1/G2  the left gutter, x 0–72px at lg and 0–40px at md. Both sit near
 *          the gutter's centre at lg — hugging the viewport edge reads as an
 *          accident rather than a placement — and pull back in at md, where the
 *          gutter is only 40px and gutter-centre would put a mark's right edge
 *          into the copy column's text.
 *   G3     the band between the fixed header (84px) and the top of the
 *          content. `.page-top` guarantees content starts at header-h + 40px,
 *          so a 14px mark at header-h + 18px clears at BOTH ends on any
 *          viewport height — including short ones, where the hero's flex
 *          centring gives back no extra room.
 *   G4     the strip below the stat row, inside the section's own pb-10.
 *
 * Static, not animated. The reference page's small marks are static too, and
 * four more composited layers to move a 12px hairline 7px is not a trade worth
 * making on a section that already carries a WebGL canvas.
 *
 * `z-[-1]` puts the layer above the section background and below in-flow text
 * — the same reasoning as SurfaceTexture's own note, and it means a mark can
 * never sit on top of copy even if a future edit moves one. It paints above
 * ArcField (-z-10) and relies on the section's `isolate`, which Hero.jsx has.
 */
export function HeroFloaters() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-1] hidden md:block"
    >
      {/* G1 — left gutter, level with the headline's upper third. The one
          ember mark in the scatter; the rest are ink, so the set reads as
          quiet structure with a single accent rather than as confetti. */}
      <RegMark
        size={14}
        className="absolute left-3 top-[27%] text-ember-400/70 lg:left-7"
      />

      {/* G2 — left gutter, level with the CTA row. */}
      <RegMark
        size={10}
        className="absolute left-4 top-[62%] text-ink-400/70 lg:left-8"
      />

      {/* G3 — under the header, over the copy column's empty top band. */}
      <RegMark
        size={12}
        className="absolute left-[40%] text-ink-400/60"
        style={{ top: "calc(var(--header-h) + 18px)" }}
      />

      {/* G4 — the strip under the stat row, in the section's own bottom pad. */}
      <RegMark
        size={10}
        className="absolute bottom-3 right-[12%] text-ink-400/50"
      />
    </div>
  );
}
