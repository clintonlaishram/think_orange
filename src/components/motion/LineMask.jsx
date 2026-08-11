import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

// DESIGN.md §9.2 Pattern C. Mount-triggered, not scroll-triggered — hero and
// section openers only, per DESIGN.md §9.4 ("Headline lines: C at 120ms
// after mount"). `lines` accepts strings or nodes so a consumer can drop an
// Instrument Serif italic emphasis span into one line (DESIGN.md §5.1).
export function LineMask({ lines = [], startDelay = 0.12, stagger = 0.08, className }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className={cn("block overflow-hidden", className)}>
          <motion.span
            className="block"
            initial={reduceMotion ? false : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : startDelay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
