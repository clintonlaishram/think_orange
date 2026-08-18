import { Fragment, useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

// Character-by-character reveal — the hero H1's typewriter, replacing
// LineMask's slide-up mask (DESIGN.md §9.2 Pattern C).
//
// Two modes, one component:
//   `lines`     — one fixed sentence, written once on mount.
//   `sequences` — an array of `lines`, each written → held → erased in turn,
//                 then round-robin forever. What the hero H1 uses.
//
// A `lines` value is an array of LINES; each line is an array of SEGMENTS —
// `{ text, className }`. Segments exist so one word inside a line (the serif
// italic "scramble.") can carry its own styling while still writing as part
// of one continuous character stream across the whole sentence.
//
// In rotating mode only the ACTIVE sentence is mounted, so a crawler and a
// screen reader each see ONE coherent sentence rather than every variant
// concatenated. That property is what keeps a rotating <h1> honest — see
// CLAUDE.md. Do not change this to render all sequences at once.
//
// ── Why a position counter, and why the caret is INLINE ──────────────────
// The caret has to sit immediately after the last written character and
// travel with it, forwards while writing and backwards while erasing. A
// caret rendered at the end of the line cannot do that — it parks at the end
// of the full sentence, which was the reported bug.
//
// The fix is NOT to pull unwritten characters out of layout. It is to render
// the caret as one more inline item in the character stream, at position
// `shown`. Every character stays in flow at all times — unwritten ones are
// merely transparent — so the caret lands exactly after the last written
// glyph with no measurement, no per-line bookkeeping and no absolute
// positioning.
//
// ⚠️ An intermediate attempt DID take unwritten characters out of flow
// (`display: none`) so the text grew into an empty line. Do not go back to
// it: an empty line cannot reproduce the line box of a line that will hold
// glyphs, and no `min-height` fixes that, because line 3's emphasis word is
// Instrument Serif and its metrics are taller than the sans. Measured, that
// version produced three different <h1> heights (260/268/281px) within one
// cycle and visibly shunted the lede, CTAs and stat row on every rotation.
// Keeping every glyph in flow makes the heading's box constant by
// construction.
//
// The per-character fade is a plain CSS transition on `opacity`, which is
// possible precisely because the element is always in flow. Write and erase
// carry different durations via `data-on`, since a transition is governed by
// the state being transitioned TO.
//
// Both `animate()` calls below are the two-argument value form
// (`animate(from, to, options)`), which is the safe one. Do NOT rewrite this
// as a single multi-keyframe call with `times` — `animate()` prepends `from`
// as an implicit keyframe, the counts then disagree, and the cycle silently
// collapses into an instant swap. That regression has already shipped once.
const WRITE_SECONDS_PER_CHAR = 0.055;
const ERASE_SECONDS_PER_CHAR = 0.022; // erasing is quicker, like held backspace.

export function Typewriter({
  lines,
  sequences,
  startDelay = 0.12,
  cycleSeconds = 10,
  className,
}) {
  const reduceMotion = useReducedMotion();

  // One code path: a fixed `lines` is a rotation of length 1 that never
  // advances past its own write-on.
  const allSequences = sequences ?? [lines ?? []];
  const rotates = allSequences.length > 1;

  const [active, setActive] = useState(0);
  const current = allSequences[active] ?? [];

  // Flatten to lines of characters, and record each line's slice of the
  // global character stream so the caret can be placed on the right line.
  // Plain loops rather than nested `map` closures: `react-hooks/immutability`
  // rejects reassigning an outer counter from inside a callback, since a
  // callback can in principle run after render.
  const built = [];
  let offset = 0;
  for (const segments of current) {
    const start = offset;
    const parts = [];
    for (const segment of segments) {
      const chars = [...segment.text];
      parts.push({ className: segment.className, chars, from: offset });
      offset += chars.length;
    }
    built.push({ parts, start, end: offset });
  }
  const totalChars = offset;

  // Reduced motion: the finished sentence, immediately, and no rotation — a
  // heading that erases and rewrites itself every few seconds is exactly the
  // motion `prefers-reduced-motion` asks this site not to produce.
  const [shown, setShown] = useState(reduceMotion ? totalChars : 0);

  useEffect(() => {
    if (reduceMotion || totalChars === 0) return;

    let cancelled = false;
    let holdTimer;

    async function run() {
      await animate(0, totalChars, {
        duration: totalChars * WRITE_SECONDS_PER_CHAR,
        // Only the first sentence waits for the hero's mount delay; later
        // ones follow straight on from the previous erase.
        delay: active === 0 ? startDelay : 0,
        // Writing is a progress readout, not an expressive move — an eased
        // cadence makes the last characters land in a visible clump.
        ease: "linear",
        onUpdate: (v) => setShown(Math.round(v)),
      });
      if (cancelled || !rotates) return;

      const writeSeconds =
        (active === 0 ? startDelay : 0) + totalChars * WRITE_SECONDS_PER_CHAR;
      const eraseSeconds = totalChars * ERASE_SECONDS_PER_CHAR;
      // Whatever is left of the cycle after writing and erasing. Clamps at 0
      // rather than going negative if a caller passes a `cycleSeconds` too
      // short for a given sentence's length.
      const hold = Math.max(0, cycleSeconds - writeSeconds - eraseSeconds);
      await new Promise((resolve) => {
        holdTimer = setTimeout(resolve, hold * 1000);
      });
      if (cancelled) return;

      await animate(totalChars, 0, {
        duration: eraseSeconds,
        ease: "linear",
        onUpdate: (v) => setShown(Math.round(v)),
      });
      if (cancelled) return;

      setActive((index) => (index + 1) % allSequences.length);
    }

    run();

    return () => {
      cancelled = true;
      clearTimeout(holdTimer);
    };
  }, [
    reduceMotion,
    totalChars,
    startDelay,
    cycleSeconds,
    rotates,
    active,
    allSequences.length,
  ]);

  // The caret is drawn once, at stream position `shown` — i.e. directly
  // after the last written character. It is suppressed under reduced motion,
  // and for a fixed sentence once that sentence is complete, since a caret
  // blinking on finished static text reads as a stuck cursor.
  //
  // On the caret under reduced motion specifically: the global CSS floor
  // collapses the blink to one 0.01ms iteration with no fill, which leaves
  // the caret at its BASE style — solid, measured opacity 1, NOT invisible as
  // an earlier note in CLAUDE.md claimed. A solid caret parked after a
  // heading that will never write or erase implies motion that is not
  // coming, so it is dropped outright rather than frozen.
  const showCaret = !reduceMotion && (rotates || shown < totalChars);
  const caret = <span aria-hidden="true" className="typewriter-cursor" />;

  return (
    <>
      {built.map((line, lineIndex) => (
        <span key={lineIndex} className={cn("block", className)}>
          {line.parts.map((part, partIndex) => (
            <span key={partIndex} className={part.className}>
              {part.chars.map((char, charIndex) => {
                const index = part.from + charIndex;
                return (
                  <Fragment key={charIndex}>
                    {/* Nothing written yet: the caret waits at the very
                        start, before the first character. */}
                    {showCaret && shown === 0 && index === 0 && caret}
                    <span
                      className="typewriter-char"
                      // `data-on` drives both the opacity and WHICH
                      // transition duration applies — see theme.css. Written
                      // characters fade in; erasing wipes them faster.
                      data-on={index < shown || reduceMotion ? "true" : "false"}
                      // Spaces sit between inline-blocks and would otherwise
                      // collapse, running words together mid-sentence.
                      style={{ whiteSpace: "pre" }}
                    >
                      {char}
                    </span>
                    {/* The caret is emitted INSIDE the character stream,
                        immediately AFTER the last written character — which
                        is what makes it ride the write position and travel
                        with it in both directions.

                        Anchoring to the last written character rather than to
                        the first unwritten one matters at a line break: with
                        "before character N", finishing a line jumps the caret
                        to the START of the next line while the text it
                        belongs to is still on the previous one. Measured, that
                        misplaced it in 6 of 295 samples, twice per sentence.
                        Anchoring here keeps it on the same line as its text by
                        construction. */}
                    {showCaret && index === shown - 1 && caret}
                  </Fragment>
                );
              })}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
