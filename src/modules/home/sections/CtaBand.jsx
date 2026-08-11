import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/nav";
import { t } from "@/content/turnaround";

// Homepage section 13 — CONTENT-PLAN.md §6 row 13, DESIGN.md §11.11. The
// single full-orange surface on the whole site (CLAUDE.md non-negotiable:
// "Orange stays under ~12% of any viewport. One full-orange band on the
// whole site") — this is that one band, so nothing else on the homepage
// should push toward ember fills.
//
// The sub-line is CONTENT-PLAN.md §6's own draft copy — "response within
// one working day" — which is a ThinkOrange turnaround COMMITMENT, not a
// fact, and turnaround.js's discipline (mirrors fees:null) says that never
// gets typed directly into a component. `t("enquiryResponseTime")` resolves
// to its neutral fallback until Clinton actually confirms a response time.

// ---------------------------------------------------------------------------
// The arc, generalised to any radius.
//
// This is the SAME crescent the Footer and the hero use, not a new shape —
// DESIGN.md §3.1: "Repetition of one specific shape is what makes a visual
// system feel authored," and "the arc always curves in the same direction as
// the logo's." Rather than eyeball three more paths, the one established path
// (`M340 200a140 140 0 1 1-66.5-119.2`) is decomposed and re-derived per
// radius, so every ring is provably the same arc scaled — no drift.
//
// Decomposition: centre (200,200), r = 140, starting at 3 o'clock (0°) and
// sweeping clockwise the long way round to -58.4°, i.e. 301.6° of travel with
// a 58.4° gap in the upper right. The endpoint is therefore at angle -58.4°,
// and the `a` command's RELATIVE delta from the (200+r, 200) start is:
//   dx = (cos(-58.4°) - 1) · r = -0.4753 · r
//   dy =  sin(-58.4°)      · r = -0.8513 · r
// Sanity check at r=140: -66.54, -119.18 — matches the original path's
// -66.5, -119.2 exactly.
const ARC_CENTRE = 200;
const ARC_END_DX = -0.4753;
const ARC_END_DY = -0.8513;

function arcPath(r) {
  const dx = (ARC_END_DX * r).toFixed(1);
  const dy = (ARC_END_DY * r).toFixed(1);
  return `M${ARC_CENTRE + r},${ARC_CENTRE}a${r} ${r} 0 1 1 ${dx} ${dy}`;
}

// Three concentric rings. §11.11 specifies "the oversized arc bleeds off the
// right edge at 12% ink-950" — that 12% is kept for the DOMINANT (middle)
// ring, and the outer/inner pair sit well below it so they read as depth
// rather than as extra ink. Aggregate weight therefore stays in the spirit of
// the single-arc spec instead of tripling it.
//
// Gaps are deliberately ALIGNED across all three rather than staggered: the
// aligned version reads as one authored mark (the logo, echoed at scale),
// where staggered gaps read as generic concentric decoration.
//
// Static, no rotation. The counter-rotating animated rings are the HERO's
// signature (§3.1, §8.2) and §16's closing principle is that "designed pages
// apply each effect in one place, deliberately" — animating these too would
// spend the site's one distinctive motion idea twice. Depth here comes from
// the gradient and the opacity ladder, not movement.
const RINGS = [
  { r: 176, width: 16, opacity: 0.07 },
  { r: 140, width: 13, opacity: 0.12 },
  { r: 104, width: 9, opacity: 0.045 },
];

// Smaller echo in the top-left corner — the mark bracketing the section at
// two scales, rather than one composition dominating a whole edge. Same arc,
// same handedness, just two rings and a tighter radius pair than the main
// set, so it reads as a quiet secondary accent and never competes with the
// bottom-right composition or the headline sitting between them.
const CORNER_RINGS = [
  { r: 70, width: 7, opacity: 0.09 },
  { r: 48, width: 5, opacity: 0.14 },
];

const RING_GRADIENT_ID = "cta-arc-fade";

export function CtaBand() {
  return (
    <section
      data-surface="ember"
      // 2% grain (§11.11 — lighter than the 3.5% dark-surface default),
      // via the `--grain-opacity` override added to theme.css's `.grain`.
      className="section-pad grain relative overflow-hidden bg-ember-400"
      style={{ "--grain-opacity": 0.02 }}
    >
      {/* Oversized concentric arcs bleeding off the right edge (§11.11).
          Approximate geometry, same status as ArcGlyph's paths — swap for the
          real logo-derived arc per DESIGN.md §18 once available. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -bottom-[66%] h-[420px] w-[420px] -translate-y-1/2 md:-right-42 md:h-[620px] md:w-[620px]"
        fill="none"
      >
        <defs>
          {/* ONE gradient, shared by all three rings via `userSpaceOnUse`, so
              the fade runs continuously across the whole composition and every
              ring is lit from the same direction. Per-ring `objectBoundingBox`
              gradients would restart the ramp on each radius and the rings
              would stop looking like one object.

              §7.1 permits gradients on "the arc rings" specifically. It is NOT
              the brand ember gradient here — that would be invisible on an
              ember surface — but the ink-950 tint §11.11 mandates for this
              band, shaped into a gradient. Stop opacities are RELATIVE (they
              multiply with each ring's own `opacity`), so the ladder in RINGS
              stays the single source of absolute weight. */}
          <linearGradient
            id={RING_GRADIENT_ID}
            gradientUnits="userSpaceOnUse"
            x1="60"
            y1="60"
            x2="360"
            y2="360"
          >
            <stop offset="0%" stopColor="var(--color-ink-950)" stopOpacity="0.15" />
            <stop offset="45%" stopColor="var(--color-ink-950)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-ink-950)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {RINGS.map((ring) => (
          <path
            key={ring.r}
            d={arcPath(ring.r)}
            fill="none"
            stroke={`url(#${RING_GRADIENT_ID})`}
            strokeWidth={ring.width}
            strokeLinecap="round"
            opacity={ring.opacity}
          />
        ))}
      </svg>

      {/* Top-left corner echo — same arc, same handedness (DESIGN.md §3.1:
          "the arc always curves in the same direction as the logo's" — this
          is never mirrored), just two rings at a smaller scale. References
          the SAME gradient by id rather than redefining it: `url(#id)` looks
          up the id document-wide, not scoped to the enclosing <svg>, so both
          corners stay lit from one consistent direction with no second
          <defs> to keep in sync. viewBox is identical to the main SVG's for
          the same reason — arcPath()'s coordinates only mean the same thing
          in a 0 0 400 400 space. */}

       <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute rotate-225 -left-34 top-1/6 h-[120px] w-[120px] -translate-y-1/2 md:-right-42 md:h-[420px] md:w-[420px]"
        fill="none"
      >
        <defs>
          {/* ONE gradient, shared by all three rings via `userSpaceOnUse`, so
              the fade runs continuously across the whole composition and every
              ring is lit from the same direction. Per-ring `objectBoundingBox`
              gradients would restart the ramp on each radius and the rings
              would stop looking like one object.

              §7.1 permits gradients on "the arc rings" specifically. It is NOT
              the brand ember gradient here — that would be invisible on an
              ember surface — but the ink-950 tint §11.11 mandates for this
              band, shaped into a gradient. Stop opacities are RELATIVE (they
              multiply with each ring's own `opacity`), so the ladder in RINGS
              stays the single source of absolute weight. */}
          <linearGradient
            id={RING_GRADIENT_ID}
            gradientUnits="userSpaceOnUse"
            x1="60"
            y1="60"
            x2="360"
            y2="360"
          >
            <stop offset="0%" stopColor="var(--color-ink-950)" stopOpacity="0.15" />
            <stop offset="45%" stopColor="var(--color-ink-950)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-ink-950)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {RINGS.map((ring) => (
          <path
            key={ring.r}
            d={arcPath(ring.r)}
            fill="none"
            stroke={`url(#${RING_GRADIENT_ID})`}
            strokeWidth={ring.width}
            strokeLinecap="round"
            opacity={ring.opacity}
          />
        ))}
      </svg>

      {/* <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 md:-left-64 md:-top-34 md:h-156 md:w-156 rotate-265"
        fill="none"
      >
        {CORNER_RINGS.map((ring) => (
          <path
            key={ring.r}
            d={arcPath(ring.r)}
            fill="none"
            stroke={`url(#${RING_GRADIENT_ID})`}
            strokeWidth={ring.width}
            strokeLinecap="round"
            opacity={ring.opacity}
          />
        ))}
      </svg> */}

      <Container className="relative text-center">
        <Reveal className="mx-auto max-w-[36ch]">
          <h2 className="text-display-lg text-ink-950">{site.ctaLine}</h2>
          <p className="mt-4 text-body-lg text-ink-900">{t("enquiryResponseTime")}.</p>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button as={Link} to="/contact" variant="onEmber">
            Talk to an Expert
          </Button>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-body font-medium text-ink-950 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-950 focus-visible:ring-offset-2"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-body font-medium text-ink-950 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-950 focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            WhatsApp
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
