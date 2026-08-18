import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// DESIGN.md §9.2 Pattern A — the workhorse scroll reveal. Fires once, never
// re-triggers on scroll-up (§9.5). Reduced motion renders the final state
// immediately rather than skipping content.
//
// `children` may be a FUNCTION, in which case it receives this Reveal's own
// `inView` flag: `<Reveal>{(inView) => ...}</Reveal>`. That exists so a group
// whose members animate their own content (Counter, Scramble) can hang off
// the ONE IntersectionObserver already required by the container, instead of
// every child installing another. Plain-node children behave exactly as
// before — this is additive.
//
// Note the flag is live regardless of `reduceMotion`: useInView is
// independent of the transition, so a render-prop child still learns when it
// scrolled into view and can decide for itself whether to animate or snap.
// `margin`/`amount` default to the standard below-the-fold scroll reveal
// (a -12% bottom margin so the trigger fires a beat after the element's top
// edge crosses the fold, not the instant a sliver peeks in) — override only
// for a Reveal whose content can legitimately already be ON SCREEN at mount,
// like the hero's own trailing stat row. The -12% margin shrinks the root
// used for intersection, and for viewport heights where the target sits just
// inside the true viewport but within that shrunk-off 12% band, `amount`
// (the fraction of the target that must overlap the shrunk root) is never
// satisfied — so the element sits at opacity 0 FOREVER, despite being
// genuinely visible, until an actual scroll event changes the geometry
// enough to cross the threshold. Confirmed by measurement: at 1440×810–820
// the hero stat row is on-screen at mount yet never reaches `inView`.
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
  amount = 0.18,
  margin = "0px 0px -12% 0px",
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount, margin });
  const reduceMotion = useReducedMotion();
  const Comp = motion[as] ?? motion.div;

  return (
    <Comp
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {typeof children === "function" ? children(inView) : children}
    </Comp>
  );
}
