import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

// A decode / "matrix" character reveal, for stat values that are WORDS rather
// than numbers — the text-tile counterpart to Counter. Runs once, snaps under
// reduced motion, and (like Counter) accepts an external `play` so a caller
// that already has a scroll trigger doesn't install another observer.
//
// Glyph pool is uppercase latin + digits, deliberately NOT katakana or binary.
// The literal Matrix alphabet on a chartered accountancy homepage reads as a
// costume; a ledger/terminal decode is at least adjacent to what the firm does.
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Unsettled characters re-roll on this interval, NOT every frame. At 60fps the
// glyph churn is a strobe the eye reads as noise rather than as characters;
// ~55ms is slow enough to register individual glyphs and still read as
// scrambling. It also keeps this to ~18 React renders instead of ~30.
const RESHUFFLE_MS = 55;

// Only letters and digits scramble. Spaces, commas and hyphens hold their
// position throughout, so the string keeps its silhouette while decoding
// ("Salem, TN" stays a 5+2 shape) instead of churning into a block of noise.
const SCRAMBLES = /[a-z0-9]/i;

export function Scramble({
  text,
  duration = 0.5,
  delay = 0,
  play = true,
  className,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  // null = the animation has not taken over, so the real string renders as
  // static text. Any string = we are mid-decode.
  const [display, setDisplay] = useState(null);
  const noise = useRef([]);
  const lastRoll = useRef(0);
  const lastShown = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!play || reduceMotion || hasRun.current) return;
    hasRun.current = true;

    const chars = [...text];
    const mutable = chars.map((c) => SCRAMBLES.test(c));
    noise.current = chars;
    lastRoll.current = 0;

    const controls = animate(0, 1, {
      duration,
      delay,
      // linear, per the easing table: this is a progress readout (how much of
      // the string has resolved), and progress should not ease. An eased
      // settle makes the last characters land in a visible clump.
      ease: "linear",
      onUpdate: (p) => {
        const settled = Math.floor(p * chars.length);
        const now = performance.now();
        if (now - lastRoll.current >= RESHUFFLE_MS) {
          lastRoll.current = now;
          noise.current = chars.map((c, i) =>
            mutable[i] ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : c,
          );
        }
        const next = chars
          .map((c, i) => (i < settled || !mutable[i] ? c : noise.current[i]))
          .join("");
        // The string only actually changes on a settle step or a re-roll tick.
        // Guarding here turns a per-frame setState into ~18 renders total.
        if (next !== lastShown.current) {
          lastShown.current = next;
          setDisplay(next);
        }
      },
      onComplete: () => setDisplay(text),
    });

    return () => controls.stop();
  }, [play, reduceMotion, text, duration, delay]);

  // Not started, or the user asked for reduced motion: plain static text, no
  // overlay and no extra DOM at all.
  if (reduceMotion || display === null) {
    return (
      <span className={className} {...props}>
        {text}
      </span>
    );
  }

  // `.value-sizer` holds the box at the final string's width via a
  // pseudo-element, so the glyph churn cannot reflow the tile and the string
  // still appears exactly once in the DOM. See theme.css for why that matters.
  //
  // The moving span is NOT aria-hidden: it is the only copy of the text, so
  // hiding it would leave the tile with no accessible name at all. It is not a
  // live region, so nothing is announced mid-decode — a screen reader reaching
  // this tile reads whatever is settled by then, and the decode is ~500ms.
  return (
    <span
      className={cn("value-sizer", className)}
      data-value={text}
      {...props}
    >
      <span>{display}</span>
    </span>
  );
}
