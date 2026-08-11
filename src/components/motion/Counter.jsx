import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";
import { cn } from "@/lib/cn";

// DESIGN.md §9.3 stat counter. Counts from 0 over 1200ms on first entry
// only; reduced motion renders the end value immediately. Always
// tabular-nums per DESIGN.md §5.3 — non-negotiable in a compliance context.
export function Counter({ value, duration = 1.2, format = (n) => Math.round(n), className, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo approximation
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  // Reduced motion never touches the animated `display` state — it renders
  // the end value directly at render time instead of setState-in-effect.
  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {format(shown)}
    </span>
  );
}
