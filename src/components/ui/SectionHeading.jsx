import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * THE section header for the whole site (Clinton, 22-08-2026): one structure,
 * everywhere, in this order and nothing else.
 *
 *     LABEL          <Eyebrow>, mono / uppercase / surface accent
 *     Heading        h2 at text-h2
 *     Subheading     optional supporting line
 *
 * ⛔ DO NOT hand-roll `<Eyebrow> + <h2 className="mt-3 text-h2">` in a page
 * again. That pair was duplicated in ~30 files with four different heading
 * measures and three different lede spacings, which is exactly the drift this
 * component exists to end. If a section needs a header, it calls this.
 *
 * Exceptions that are NOT section headings and correctly do not use this:
 *   - `PageHero`'s own eyebrow / h1 (a page header, not a section header)
 *   - `CtaBand`'s display-lg h2 (the site's one full-orange band, its own
 *     archetype, DESIGN.md §11.11)
 *   - Card and panel titles (`EnquiryCard`, the DSC enquiry strip, Footer's
 *     mono column labels, `CategoryHub`'s index/why-us panel labels)
 *   - Prose headings inside article and legal body copy
 *
 * ── The rule and the index are OPT-IN ───────────────────────────────────────
 * `rule` draws a hairline on scroll and `index` prints a mono numeral beside
 * it. They are deliberately NOT part of the sitewide default: they say "this
 * section is item N of a sequence", which is true of the DSC menu groups and
 * the /services statutory-vs-growth split and of nothing else. Turning them on
 * everywhere would put a number on sections whose order carries no meaning.
 *
 * ⚠️ `dark` is not optional decoration. The eyebrow and the h2 are handled by
 * the surface system for free (`Eyebrow` reads `var(--surface-accent)`, and
 * theme.css sets `[data-surface="dark"] h2`) but the SUBHEADING, the rule and
 * the index are plain utility classes, so on a dark band they carry their
 * light-surface values: an ink-500 lede on ink-900 measures ~1.5:1, and an
 * ink-100 rule reads as a bright white line. Both were caught by pixel
 * contrast, not by looking at the page.
 *
 * @param eyebrow  the LABEL. Omitting it is allowed but is the exception.
 * @param heading  required.
 * @param lede     the subheading. Rendered only when present.
 * @param index    0-based mono numeral. Sequences only; implies `rule`.
 * @param rule     draw the hairline. Sequences only.
 * @param as       heading level, default "h2". Use "h3" where the section
 *                 already owns an h2 above this block.
 * @param headingClassName / ledeClassName  per-section measure overrides. The
 *                 defaults are the standard; override only where a narrow
 *                 column genuinely needs a tighter measure (FaqSection's rail).
 * @param reveal   set false where the header must paint without waiting on an
 *                 IntersectionObserver.
 */
export function SectionHeading({
  eyebrow,
  heading,
  lede,
  index,
  rule,
  dark = false,
  as: Heading = "h2",
  headingClassName,
  ledeClassName,
  className,
  delay = 0,
  reveal = true,
  children,
}) {
  const reduceMotion = useReducedMotion();
  const numbered = Number.isInteger(index);
  const showRule = Boolean(rule) || numbered;

  const body = (inView) => (
    <>
      {showRule && (
        <div className="mb-6 flex items-center gap-4">
          {numbered && (
            <span
              aria-hidden="true"
              className={cn(
                "font-mono text-body-sm tabular-nums tracking-[0.14em]",
                dark ? "text-ink-300" : "text-ink-400"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          {/* `scaleX` on a 1px element, so it composites. Animating `width`
              would relayout the row every frame.

              Reduced motion renders it DRAWN (`initial={false}`) rather than
              absent: the rule is structure, and a missing divider reads as a
              bug rather than as restraint. */}
          <motion.span
            aria-hidden="true"
            className={cn("h-px flex-1 origin-left", dark ? "bg-ink-700" : "bg-ink-100")}
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={reduceMotion ? undefined : inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
        </div>
      )}

      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        className={cn("text-h2", eyebrow && "mt-3", "max-w-[32ch]", headingClassName)}
      >
        {heading}
      </Heading>
      {lede && (
        <p
          className={cn(
            "mt-4 text-body-base sm:text-body-lg",
            dark ? "text-ink-200" : "text-ink-500",
            "max-w-[68ch]",
            ledeClassName
          )}
        >
          {lede}
        </p>
      )}
      {children}
    </>
  );

  if (!reveal) return <div className={className}>{body(true)}</div>;

  // Render-prop form so the rule animates off THIS Reveal's single
  // IntersectionObserver instead of installing a second one, the same reason
  // HeroStats takes the render-prop form.
  return (
    <Reveal className={className} delay={delay}>
      {(inView) => body(inView)}
    </Reveal>
  );
}
