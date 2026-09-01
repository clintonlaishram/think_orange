import { useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";

// Homepage section 2 — CONTENT-PLAN.md §6 row 2, DESIGN.md §9.3 "Logo
// marquee". Light surface, full-bleed.
//
// TEXT WORDMARKS, NOT LOGO SVGS. IMAGE-PLAN.md §7.4: "ask them for the
// approved partner logo" and "word the strip so it reads
// 'we work with', never as endorsement." No partner has supplied an approved
// mark yet, and drawing a GSTN wordmark from memory would be
// exactly the kind of unapproved mark §7.4 warns against — a plain-type name
// carries no visual claim to being the real logo, where a hand-built SVG
// imitation would. Swap to real marks the moment they're supplied; nothing
// else about this component needs to change.
// ⛔ 02-09-2026 (Clinton): "do not use signx it is for the other company
// name", and then eMudhra too. Both certifying-authority names are OFF the
// site entirely — this strip named them, and no longer does. What is left is
// the portals and tools we actually work on, which is a claim about our own
// work rather than about someone else's brand.
const marks = ["GeM", "MCA", "GSTN", "Tally", "Zoho Books"];

// Spacing is each item's own `mr-16`, NOT the parent's flex `gap`, and that is
// load-bearing. The seamless-loop trick (translateX(-50%) on an infinite
// animation) needs the two halves to be EXACT pixel mirrors of each other.
// Flex `gap` sits BETWEEN items, outside any single item's width, so a
// 2N-item gapped row has (2N-1) gaps — an ODD count for an even item total —
// and halving the row's total width comes up half a gap short of where item
// N+1 needs to land to match item 1's start position. Margin doesn't have
// that parity problem: each item carries its own trailing space, so the row's
// total width really is exactly 2× one group's width, and -50% is exact.
//
// SECOND, INDEPENDENT REQUIREMENT, and the one that actually broke on
// 17-08-2026 when this section stopped being full-bleed: -50% scrolls the
// track by exactly ONE GROUP, so at the loop point the trailing group has to
// still cover the whole visible window. **One group must therefore be at
// least as wide as the widest window this can ever be rendered in.** Measured:
// one pass of `marks` is 831px, while the window at the 1800px container cap
// is 1656px (1800 − 2×72px `lg:px-18` gutter) — so a single-pass group left
// 450px of dead space trailing the last mark before it snapped back, which
// reads exactly as "it finishes, then starts from the beginning". Three passes
// (2493px) clear 1656px with room to spare. If `marks` ever shrinks, or the
// container cap grows, re-check that `groupWidth >= containerWidth` still
// holds — this is the invariant, 3 is just the smallest integer satisfying it
// today.
const GROUP_PASSES = 3;
const group = Array.from({ length: GROUP_PASSES }, () => marks).flat();
const track = [...group, ...group];

export function TrustStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section data-surface="light" className="section-pad overflow-hidden bg-canvas">
      <Container>
        <p className="text-center font-mono  text-eyebrow uppercase text-ink-400 text-xs md:text-sm lg:text-base xl:text-lg font-medium tracking-[0.14em]">
          We work with
        </p>

        {/* Constrained to the section's own max-width/gutters, not
            full-bleed — Clinton's call, 17-08-2026, supersedes the earlier
            full-bleed decision. `.marquee-fade` (theme.css) masks both edges
            to transparent so the track reads as intentionally windowed
            rather than as content that ran out of room, and so a mark caught
            mid-word at the boundary fades instead of snapping off. */}
        <div className="relative mt-8 overflow-hidden marquee-fade">
          {reduceMotion ? (
            // DESIGN.md §9.6: reduced motion renders "a static wrapped grid of
            // logos", not a frozen mid-scroll marquee.
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {marks.map((mark) => (
                <Mark key={mark} label={mark} />
              ))}
            </div>
          ) : (
            <>
              {/* Decorative and duplicated — a screen reader gets the real,
                  single list below instead of two scrolling copies. */}
              <div
                aria-hidden="true"
                // ⚠️ DURATION IS TIED TO GROUP WIDTH, so it has to move whenever
              // the group does. -50% travels exactly one group: that was
              // 2493px at 120s (~21px/s). With five marks the group is 1745px,
              // and holding 120s would have quietly slowed the strip to
              // ~15px/s. 84s restores ~21px/s. Recompute as
              // `groupWidth / 21` on any change to `marks` or GROUP_PASSES.
              className="flex w-max animate-[marquee_84s_linear_infinite] hover:[animation-play-state:paused]"
              >
                {track.map((mark, index) => (
                  <Mark key={`${mark}-${index}`} label={mark} />
                ))}
              </div>
              <p className="sr-only">We work with: {marks.join(", ")}.</p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

function Mark({ label }) {
  // These are flat-colour text wordmarks, not logo images, so a literal
  // `grayscale` filter has nothing to desaturate — CONTENT-PLAN.md §6 row 2's
  // "greyscale at 60%, colour on hover" is re-read for type as dim-neutral →
  // full-opacity ember, the same relationship expressed the way type can.
  //
  // `mr-16` (not the parent's `gap`) is the spacing — see the `track` comment
  // above for why that distinction is load-bearing here, not a style choice.
  return (
    // Phase 10 audit: was `text-ink-300 opacity-60`, which composited to 1.94:1
    // on canvas — ink-300 is the DARK-surface body token (§4.6) and the 60%
    // faded it further. ink-500 at 75% keeps the muted-until-hover treatment
    // and measures 4.95:1.
    <span className="mr-16 whitespace-nowrap font-sans text-h4 font-bold text-ink-500 opacity-75 transition-[opacity,color] duration-[var(--dur-base)] hover:text-ember-600 hover:opacity-100">
      {label}
    </span>
  );
}
