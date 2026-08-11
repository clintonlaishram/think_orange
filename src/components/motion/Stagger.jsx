import { Children, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// DESIGN.md §9.2 Pattern B. Staggers at 60ms per child, capped at six —
// beyond that the tail feels broken, so larger groups collapse into two
// batches (first half at delay 0, second half at one stagger step) instead
// of a long incremental delay chain.
export function Stagger({ className, children, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.18, margin: "0px 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);
  const STEP = 0.06;

  const delayFor = (index) => {
    if (items.length <= 6) return index * STEP;
    const half = Math.ceil(items.length / 2);
    return index < half ? 0 : STEP;
  };

  return (
    <div ref={ref} className={className} {...props}>
      {items.map((child, index) => (
        <motion.div
          key={child.key ?? index}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: delayFor(index) }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
