import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";
import { cn } from "@/lib/cn";

// DESIGN.md §9.3 stat counter. Counts from 0 over 1200ms on first entry
// only; reduced motion renders the end value immediately. Always
// tabular-nums per DESIGN.md §5.3 — non-negotiable in a compliance context.
//
// `play` is optional. Leave it undefined and the counter keeps its original
// standalone behaviour (its own IntersectionObserver). Pass a boolean and the
// caller's existing scroll trigger drives it instead — that is how HeroStats
// runs four tiles off one observer rather than four. `delay` staggers a group
// without needing a second timeline.
export function Counter({
  value,
  duration = 1.2,
  delay = 0,
  play,
  format = (n) => Math.round(n),
  className,
  ...props
}) {
  const ref = useRef(null);
  const selfInView = useInView(ref, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  // Once the count has run it must never run again, even if an external
  // `play` flips back to false. The standalone path gets this from
  // `once: true`; the driven path needs it stated.
  const hasRun = useRef(false);

  const started = play ?? selfInView;

  useEffect(() => {
    if (!started || reduceMotion || hasRun.current) return;
    hasRun.current = true;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo approximation
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [started, reduceMotion, value, duration, delay]);

  // Reduced motion never touches the animated `display` state — it renders
  // the end value directly at render time instead of setState-in-effect.
  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {format(shown)}
    </span>
  );
}
