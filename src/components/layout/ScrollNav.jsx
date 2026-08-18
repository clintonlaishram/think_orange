import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, ChevronDown } from "lucide-react";

// The sitewide scroll control (19-08-2026, Clinton's brief): one button that
// reads the page for you. Near the top it points DOWN and advances exactly one
// screen — the section immediately after the opening hero, which every template
// sizes to ~100svh. Once you are past that first screen it becomes an arrow UP
// and stays that way to the foot of the page, where it returns you to the top.
//
// It replaces the inline affordance that used to live in RootLayout, which had
// two real problems: it was `position: absolute` inside a fragment, so it
// resolved against the page box and scrolled away instead of staying reachable;
// and its target was `main.nextElementSibling` — the FOOTER — so "scroll to the
// next section" actually jumped the whole page. Both are fixed here.
//
// ⚠️ Positioned as a STACK with FloatingWhatsApp, not beside it: that FAB is
// 56px at a 24px inset in the same corner, so this sits directly above it
// (24 + 56 + 12 gap = 92px). It is deliberately 44px rather than 56 — the
// WhatsApp affordance stays the dominant one in that corner. If the FAB ever
// moves corners again, re-check this offset; CLAUDE.md records that the last
// corner move silently broke the footer padding written for the old one.
const ADVANCE_LABEL = "Scroll to the next section";
const TOP_LABEL = "Back to top";

// Ring geometry. r is set so the 1.5px stroke sits fully inside the 44px box
// (22 - 1.5/2 - 0.5 breathing room), and the circumference is derived from it
// rather than measured, so changing r can't leave a stale dash length behind.
const RING_R = 20.25;
const RING_C = 2 * Math.PI * RING_R;

export function ScrollNav() {
  const reduceMotion = useReducedMotion();
  // Initial state is deterministic and matches what the prerender emits (down
  // arrow, no progress, visible) — the effect below is what specialises it on
  // the client, so hydration has nothing to disagree about.
  const [mode, setMode] = useState("down");
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(true);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      const viewport = window.innerHeight;
      const max = document.documentElement.scrollHeight - viewport;
      setScrollable(max > 80);
      // 85% of a screen, not a full one: the flip should happen as the second
      // section takes over the viewport, not once it is fully past.
      setMode(window.scrollY < viewport * 0.85 ? "down" : "up");
      // Quantised to whole percent — the ring can't render finer than that, and
      // it keeps a continuous scroll from re-rendering on every pixel.
      setProgress(max > 0 ? Math.round((window.scrollY / max) * 100) / 100 : 0);
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = useCallback(() => {
    const behavior = reduceMotion ? "auto" : "smooth";

    if (mode === "up") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    // The next section BELOW the current position, found in the DOM rather
    // than assumed to be exactly 100svh away: from the top of a T1 homepage
    // that is the section after the hero (~100svh, which is the brief), and on
    // a template with a short compact hero it is still a section edge rather
    // than a point mid-copy. Resolving it against the live scroll position
    // instead of always taking `sections[1]` also keeps the control useful on
    // those shorter pages — otherwise a second press before the 85% flip point
    // would re-target a section already at the top of the viewport and appear
    // to do nothing.
    const sections = [...document.querySelectorAll("main > section, main > div > section")];
    const next = sections
      .map((section) => section.getBoundingClientRect().top + window.scrollY)
      .find((top) => top > window.scrollY + 8);
    window.scrollTo({
      top: next ?? window.scrollY + window.innerHeight,
      behavior,
    });
  }, [mode, reduceMotion]);

  const Icon = mode === "up" ? ArrowUp : ChevronDown;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={mode === "up" ? TOP_LABEL : ADVANCE_LABEL}
      title={mode === "up" ? TOP_LABEL : ADVANCE_LABEL}
      // Hidden — and taken out of the tab order — when there is nothing to
      // scroll. A control that cannot do anything is worse than no control.
      aria-hidden={!scrollable}
      tabIndex={scrollable ? 0 : -1}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: scrollable ? 1 : 0, scale: scrollable ? 1 : 0.6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.08, y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.93 }}
      className="scroll-nav fixed bottom-24 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
      style={{ pointerEvents: scrollable ? undefined : "none" }}
    >
      {/* Scroll-progress ring. Rotated -90° so it fills clockwise from twelve
          o'clock, and `pathLength`-free: the dash length is derived from r
          above. Purely decorative — the button's accessible name already says
          what it does, and progress is not information a screen-reader user
          needs from a scroll control. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 44 44"
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="22"
          cy="22"
          r={RING_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ember-400/20"
        />
        <circle
          cx="22"
          cy="22"
          r={RING_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-ember-300 transition-[stroke-dashoffset] duration-[var(--dur-fast)] ease-out"
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - progress)}
        />
      </svg>

      {/* The icon swap is the one place this control animates its contents: the
          outgoing glyph leaves in the direction the new one points, so the flip
          reads as the page's direction changing rather than as two icons
          cross-fading. `mode` as the key is what drives AnimatePresence. */}
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={mode}
          className="relative flex items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, y: mode === "up" ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: mode === "up" ? -8 : 8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* The nudge animation only runs on the down state — it is a hint to
              start scrolling, which is meaningless once you have. */}
          <Icon
            className={mode === "down" ? "hero-chevron h-4 w-4" : "h-4 w-4"}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
