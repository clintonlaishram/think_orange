import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/content/faqs/home";
import { site } from "@/content/nav";
import { faqPageJsonLd } from "@/lib/jsonld";

// Homepage FAQ row — CONTENT-PLAN.md §229 / DESIGN.md §758's archetype
// ("accordion, with FAQPage JSON-LD").
//
// SURFACE: light-alt, and that is a cadence decision rather than a taste one.
// This sits directly after DscBand (deep) and directly before Testimonial
// (deep, per DESIGN.md §11.1 row 9). A dark FAQ here would put three
// dark-family sections back to back; light-alt keeps the alternation intact
// both today (Testimonial renders null) and once a real testimonial ships.
//
// Deliberately NO arc rings, unlike the dark sections. The motif is now on
// three sections plus the partner panel, and DESIGN.md §16's closing principle
// is that a designed page applies each effect in one place. Adding it to a
// light section too would make it wallpaper — the same failure mode as
// "icon-in-a-circle everywhere". Depth here is typographic instead.
//
// Content comes from src/content/faqs/home.js, which POINTS AT written service
// leaves rather than restating them. Nothing in this file is a fact.

export function Faqs() {
  const faqs = homeFaqs();

  // Same discipline as Testimonial and Insights: if the source data cannot be
  // resolved, render nothing rather than an empty accordion shell.
  if (faqs.length === 0) return null;

  return (
    <section data-surface="light-alt" className="section-pad bg-canvas-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left rail — sticky on desktop so the heading stays with the list
              while a long answer is open. */}
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <Eyebrow>Common questions</Eyebrow>
              <h2 className="mt-3 text-h2 max-w-[18ch]">
                The questions we answer most often
              </h2>
              <p className="mt-4 max-w-[42ch] text-body text-ink-500">
                Every answer below is the same one on the relevant service page
                — nothing here is a summary written for the homepage.
              </p>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-body font-medium text-ember-600 underline-offset-4 transition-[gap] duration-[var(--dur-fast)] hover:gap-2.5 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-600 focus-visible:ring-offset-2"
              >
                Ask us something else
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Container>

      {/* CONTENT-PLAN.md §486 requires FAQPage JSON-LD wherever FAQs render.
          Built from the SAME resolved array the accordion renders (via the
          one shared faqPageJsonLd builder — src/lib/jsonld.js — rather than
          a fourth hand-rolled copy), so the structured data and the visible
          copy can never disagree, and every answer is present regardless of
          which row is expanded. */}
      <JsonLd data={faqPageJsonLd(faqs)} />
    </section>
  );
}

/**
 * Single-open accordion, hand-rolled rather than pulled from a headless lib:
 * one disclosure list with no focus trapping, no portal and no positioning is
 * genuinely simple to get right, and the project has no headless UI dependency
 * to justify adding for this alone.
 *
 * The a11y contract that makes it a real disclosure widget and not a clickable
 * div: a native <button> per row (so Enter/Space and focus order come free),
 * aria-expanded on that button, aria-controls pointing at the panel, and the
 * panel as a labelled region. Verified in the browser, not assumed.
 */
function FaqAccordion({ faqs }) {
  // First row open by default. An all-closed accordion reads as an empty slab
  // on a wide column, and it hides the fact that the rows open at all.
  const [openId, setOpenId] = useState(faqs[0].id);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <ul className="divide-y divide-ink-100 border-y border-ink-100">
      {faqs.map((faq, index) => {
        const isOpen = faq.id === openId;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={faq.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                // Only while the panel is actually mounted. AnimatePresence
                // unmounts closed panels, and an aria-controls pointing at an
                // id that is not in the document is a dangling reference —
                // invalid ARIA, and some screen readers announce it oddly.
                // The disclosure pattern makes aria-controls optional
                // (aria-expanded is the required half), so omitting it while
                // closed is correct rather than a downgrade.
                aria-controls={isOpen ? panelId : undefined}
                // Toggle rather than always-open: clicking the open row closes
                // it, which is what a disclosure is expected to do.
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="group flex w-full items-start gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-600 focus-visible:ring-offset-2 md:gap-6 md:py-6"
              >
                {/* Mono index — the ledger register the brand already uses for
                    eyebrows and deadline counts. Also gives the row a stable
                    left edge to align the answer against. */}
                <span
                  className="mt-1 shrink-0 font-mono text-body-sm tabular-nums text-ink-400"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex-1 text-h4 text-ink-600 transition-colors duration-[var(--dur-fast)] group-hover:text-ember-600">
                  {faq.q}
                </span>

                {/* A plus that rotates to an ×. Rotation only — no crossfade
                    between two icons, which needs two stacked elements and
                    never quite lands. 45deg is the whole trick. */}
                <span
                  className="mt-0.5 shrink-0 rounded-full border border-ink-200 p-1.5 transition-colors duration-[var(--dur-fast)] group-hover:border-ember-400"
                  aria-hidden="true"
                >
                  <Plus
                    className={`h-4 w-4 text-ink-500 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:text-ember-600 ${
                      isOpen ? "rotate-[135deg]" : "rotate-0"
                    }`}
                    strokeWidth={2}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  // height is the one property the transform rule exempts for
                  // accordions — there is no transform equivalent for opening a
                  // box. Kept to 220ms because it costs layout every frame, so
                  // a long duration is expensive as well as sluggish.
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                    // Opacity trails the height slightly on the way in so text
                    // does not appear before there is room for it.
                    opacity: { duration: 0.18, delay: isOpen ? 0.04 : 0 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-[calc(1.5rem+1ch)] pr-4 md:pl-[calc(2.5rem+1ch)]">
                    <p className="max-w-[68ch] text-body text-ink-500">{faq.a}</p>
                    <Link
                      to={faq.path}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 transition-[gap] duration-[var(--dur-fast)] hover:gap-2.5 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-600 focus-visible:ring-offset-2"
                    >
                      More on {faq.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
