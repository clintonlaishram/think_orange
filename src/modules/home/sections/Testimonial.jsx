import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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

  const quote = testimonials[index];

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

              <div className="mt-10 flex items-center justify-center gap-3">
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

                  <div className="relative min-h-[9rem] w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={quote.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 flex flex-col items-center"
                      >
                        <blockquote className="max-w-[44ch] text-quote text-canvas">
                          {quote.text}
                        </blockquote>
                        <figcaption className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2 border-t border-ink-800 pt-5 font-mono text-body-sm">
                          <span className="text-canvas">{quote.name}</span>
                          {quote.role && (
                            <span className="text-ink-300">· {quote.role}</span>
                          )}
                        </figcaption>
                      </motion.div>
                    </AnimatePresence>
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