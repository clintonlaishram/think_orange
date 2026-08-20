import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";

import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ArcRings } from "@/components/ui/ArcRings";

const ARC_RINGS = [
  { r: 180, width: 16, opacity: 0.05 },
  { r: 144, width: 13, opacity: 0.085 },
  { r: 108, width: 9, opacity: 0.03 },
];

const AUTOPLAY_MS = 3000;

// Derived from `name` rather than stored alongside it, so an edit to a name can
// never leave the wrong initials sitting next to it.
function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Testimonial() {
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta) => {
      if (count === 0) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused, go]);

  if (count === 0) return null;

  return (
    <section
      data-surface="deep"
      className="section-pad-deep grain surface-ambient relative isolate bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ArcRings
        rings={ARC_RINGS}
        gradientId="testimonial-arc-fade"
        svgClassName="-right-24 -top-32 h-[340px] w-[340px] md:-right-36 md:-top-44 md:h-[680px] md:w-[680px]"
      />

      <Container className="relative">
        <Reveal>
          {(inView) => (
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <Eyebrow>What clients say</Eyebrow>
              {/* "In their words" states nothing about how many clients there
                  are or where they are — every version of that sentence is a
                  claim on CONTENT-PLAN.md §1.1's hold list. (This heading read
                  "Trusted by learners and parents" until Phase 10, left over
                  from another project's copy.) */}
              <h2 className="mt-3 text-heading-md text-canvas">In their words</h2>

              {/* `h-16` is the reservation, not styling. The active avatar
                  animates 44px → 64px with `transition-all`, and height is a
                  LAYOUT property — so without a fixed row height the row grew
                  and shrank on every autoplay tick, and because the outgoing
                  avatar shrinks while the incoming one grows, the row's max
                  dipped mid-transition too. Measured at 375px that was a ~9px
                  wobble every 3 seconds, the residue left after the quote
                  height was reserved below. Pinning the row to the active
                  size and centring the rest removes it. */}
              <div className="mt-10 flex h-16 items-center justify-center gap-3">
                {testimonials.map((t, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show testimonial from ${t.name}`}
                      aria-current={active}
                      className={[
                        "overflow-hidden rounded-full border transition-all duration-300",
                        active
                          ? "h-16 w-16 border-ember-400/70 opacity-100"
                          : "h-11 w-11 border-ink-800 opacity-50 hover:opacity-80",
                      ].join(" ")}
                    >
                      {/* Initials, rendered locally. These were hotlinked
                          ui-avatars.com images until Phase 10 — the only
                          third-party origin on the site besides wa.me, and React
                          emitted a <link rel="preload" as="image"> for all eight
                          during SSR, so a homepage cold load opened a connection
                          to another host and pulled eight images before anything
                          below the fold could paint.

                          Every avatar shares one ink surface rather than getting
                          its own colour: eight distinct hues would be eight
                          non-token colours, and the active state already reads
                          through size and the ember ring (§16 — the palette is
                          ink, ember and canvas). */}
                      <span
                        aria-hidden="true"
                        className="grid h-full w-full place-items-center bg-ink-800 font-mono text-body-sm text-ink-200"
                      >
                        {initialsOf(t.name)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Arrows now flank the quote horizontally instead of stacking
                  below it. grid gives fixed side rails so the center column
                  doesn't shift width as quotes of different lengths swap in. */}
              <div className="mt-10 grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8">
                {count > 1 ? (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-800 text-canvas transition-colors hover:border-ember-400/70"
                  >
                    ←
                  </button>
                ) : (
                  <span />
                )}

                <figure className="flex flex-col items-center">
                  <motion.span
                    aria-hidden="true"
                    // Italic, not roman: this decorative quote glyph was the
                    // only thing on the site pulling Instrument Serif's 400
                    // upright cut (a whole extra 21KB face for one character),
                    // and DESIGN.md §5.1 names the ITALIC as the signature
                    // anyway. Phase 10 dropped the roman @font-face with it.
                    className="block font-serif italic text-[clamp(3.5rem,8vw,6rem)] leading-[0.6] text-ember-400/45"
                    initial={{ transform: "rotate(-8deg)", opacity: 0 }}
                    animate={
                      inView
                        ? { transform: "rotate(0deg)", opacity: 1 }
                        : undefined
                    }
                    transition={{
                      duration: 0.52,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                  >
                    &ldquo;
                  </motion.span>

                  {/* ⛔ EVERY QUOTE IS MOUNTED, STACKED IN ONE GRID CELL, and
                      that is the height reservation — not a nicety.

                      This was a real, measured bug (20-08-2026). The quotes
                      are different lengths, `AnimatePresence mode="wait"`
                      mounted only the active one, and `min-h-[9rem]` (144px)
                      was far short of what any of them actually occupy. So
                      this section's height changed on EVERY autoplay tick —
                      sampled at 375px it walked 788 → 895px, i.e. up to ~107px
                      of movement every 3 seconds — and Insights, the CTA band
                      and the footer all shifted with it. Of the homepage's 13
                      sections it was the only one whose height was not
                      constant.

                      Stacking every quote in the same grid cell
                      (`col-start-1 row-start-1`) makes the container exactly
                      as tall as the LONGEST quote, with nothing measured and
                      no magic number to drift from the copy. It also means the
                      prerendered HTML already has the right height, so there
                      is no shift at hydration either — which a measure-on-
                      mount approach could not give.

                      Inactive quotes are `aria-hidden` and
                      `pointer-events-none`, so only the visible one is
                      announced or selectable. `AnimatePresence` is gone: with
                      both items mounted, the crossfade is simply two opacity
                      transitions running at once, which is also a better
                      transition than mode="wait"'s fade-out-then-in.

                      ⚠️ Consequence to know: all eight quotes are now in the
                      static HTML rather than just the first. They are still
                      the FICTIONAL placeholders `content:check` warns about on
                      every run (`confirmed: false`) — see CLAUDE.md's launch
                      blockers. Replacing them with real, consented quotes or
                      emptying the array is unchanged as a requirement, and is
                      now slightly more urgent, not less. */}
                  <div className="grid w-full">
                    {testimonials.map((t, i) => {
                      const isActive = i === index;
                      return (
                        <motion.div
                          key={t.id}
                          aria-hidden={!isActive}
                          // Never interactive, active or not: the quote is not
                          // a control, and an opacity-0 quote must not be
                          // selectable underneath the visible one.
                          className="pointer-events-none col-start-1 row-start-1 mt-4 flex flex-col items-center"
                          // initial={false}: the first quote must not fade in
                          // on hydration over prerendered markup that already
                          // shows it.
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <blockquote className="max-w-[44ch] text-quote text-canvas">
                            {t.text}
                          </blockquote>
                          <figcaption className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2 border-t border-ink-800 pt-5 font-mono text-body-sm">
                            <span className="text-canvas">{t.name}</span>
                            {t.role && (
                              <span className="text-ink-300">· {t.role}</span>
                            )}
                          </figcaption>
                        </motion.div>
                      );
                    })}
                  </div>
                </figure>

                {count > 1 ? (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-800 text-canvas transition-colors hover:border-ember-400/70"
                  >
                    →
                  </button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}