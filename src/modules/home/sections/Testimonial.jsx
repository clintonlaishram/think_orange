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
              <h2 className="mt-3 text-heading-md text-canvas">
                Trusted by learners and parents
              </h2>

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
                      <img
                        src={t.photo}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                      />
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
                    className="block font-serif text-[clamp(3.5rem,8vw,6rem)] leading-[0.6] text-ember-400/45"
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