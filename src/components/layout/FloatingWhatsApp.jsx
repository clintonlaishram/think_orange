import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/nav";

// CONTENT-PLAN.md §11 (Contact): "A prominent floating WhatsApp button
// sitewide. In this sector most enquiries arrive by WhatsApp, not by form."
// Originally scoped to Phase 8 (BUILD-PLAN.md) alongside the Contact page;
// pulled forward on Clinton's request since it's a small, self-contained
// addition that doesn't need the rest of that phase's context. Mounted once
// in RootLayout so it appears on all 49 routes.
//
// Bottom-right, tabler's `IconBrandWhatsapp` mark, and WhatsApp green
// (`--color-whatsapp`) are all Clinton's explicit calls, each reversing an
// earlier default recorded in this file's history (bottom-left; lucide's
// generic `MessageCircle`, shared with Footer.jsx/CtaBand.jsx; ember, kept
// there deliberately for the palette-restraint reasons in DESIGN.md §16).
// This FAB is the one deliberate exception to that palette rule — it's the
// universally recognised WhatsApp affordance.
//
// The glow is two motion-driven rings (`AnimatePresence`-free, just looping
// `animate`), not a CSS keyframe pulse — `motion` eases continuously instead
// of jumping between keyframe steps, which is what makes it read as a smooth
// "breathing" glow rather than a mechanical blink. `useReducedMotion` drops
// both the rings and the entrance/hover motion entirely rather than just
// shortening them, per the global reduced-motion floor in theme.css.
//
// The surface (`.whatsapp-fab`, theme.css) is a two-layer gradient — a soft
// highlight lifted toward the upper-left over a base that darkens toward the
// bottom-right — with inset shadows standing in for a border: a thin lit rim
// at the top, a soft dark rim at the bottom, both fading to transparent
// rather than reading as a hard edge. That gradient + inset pairing is what
// gives the flat circle a glossy, three-dimensional read.
//
// Icon stays white, not ink-950: white-on-flat-green measures ~2:1, below
// even the 3:1 floor WCAG 1.4.11 sets for graphical UI components — the same
// failure mode CLAUDE.md's ember-button rule exists to prevent, just on a
// different hue. The icon sits over the gradient's darker lower-right two
// thirds more than its highlight corner, so ink-950 is the color that holds
// up across the whole surface, not just at one point on it.
export function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={site.whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with us on WhatsApp"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.08, y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className="whatsapp-fab fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-whatsapp)] focus-visible:ring-offset-2"
    >
      {!reduceMotion &&
        [0, 0.9].map((delay) => (
          <motion.span
            key={delay}
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[var(--color-whatsapp)]"
            animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay }}
          />
        ))}
      <IconBrandWhatsapp className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
    </motion.a>
  );
}
