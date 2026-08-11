import { useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";

// Homepage section 2 — CONTENT-PLAN.md §6 row 2, DESIGN.md §9.3 "Logo
// marquee". Light surface, full-bleed.
//
// TEXT WORDMARKS, NOT LOGO SVGS. IMAGE-PLAN.md §7.4: "ask them for the
// approved partner logo" (eMudhra, SignX) and "word the strip so it reads
// 'we work with', never as endorsement." No partner has supplied an approved
// mark yet, and drawing an eMudhra/SignX/GSTN wordmark from memory would be
// exactly the kind of unapproved mark §7.4 warns against — a plain-type name
// carries no visual claim to being the real logo, where a hand-built SVG
// imitation would. Swap to real marks the moment they're supplied; nothing
// else about this component needs to change.
const marks = ["eMudhra", "SignX", "GeM", "MCA", "GSTN", "Tally", "Zoho Books"];

// Doubled once, flat — no per-copy wrapper. The seamless-loop trick
// (translateX(-50%) on an infinite animation) needs the two halves to be
// EXACT pixel mirrors of each other, and that only holds if every item's
// trailing space is baked into its own box (margin) rather than supplied by
// the parent's `gap`. Flex `gap` sits BETWEEN items, outside any single
// item's width, so a 2N-item gapped row has (2N-1) gaps — an ODD count for
// an even item total — and halving the row's total width comes up half a
// gap short of where item N+1 needs to land to match item 1's start
// position. Margin doesn't have that parity problem: each item carries its
// own trailing space, so the row's total width really is exactly 2× one
// copy's width, and -50% is exact. (Cost half an hour to notice in testing —
// worth the paragraph.)
const track = [...marks, ...marks];

export function TrustStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section data-surface="light" className="section-pad overflow-hidden bg-canvas">
      <Container>
        <p className="text-center font-mono  text-eyebrow uppercase text-ink-400 text-xs md:text-sm lg:text-base xl:text-lg font-medium tracking-[0.14em]">
          We work with
        </p>
      </Container>

      {/* Full-bleed: outside Container deliberately, so the track can run
          edge-to-edge rather than being capped at the 1800px content width. */}
      <div className="relative mt-8 overflow-hidden">
        {reduceMotion ? (
          // DESIGN.md §9.6: reduced motion renders "a static wrapped grid of
          // logos", not a frozen mid-scroll marquee.
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6">
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
              className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]"
            >
              {track.map((mark, index) => (
                <Mark key={`${mark}-${index}`} label={mark} />
              ))}
            </div>
            <p className="sr-only">We work with: {marks.join(", ")}.</p>
          </>
        )}
      </div>
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
    <span className="mr-16 whitespace-nowrap font-sans text-h4 font-bold text-ink-300 opacity-60 transition-[opacity,color] duration-[var(--dur-base)] hover:text-ember-600 hover:opacity-100">
      {label}
    </span>
  );
}
