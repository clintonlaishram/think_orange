import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// DESIGN.md §9.2 Pattern A — the workhorse scroll reveal. Fires once, never
// re-triggers on scroll-up (§9.5). Reduced motion renders the final state
// immediately rather than skipping content.
export function Reveal({ as = "div", delay = 0, className, children, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.18, margin: "0px 0px -12% 0px" });
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
      {children}
    </Comp>
  );
}
