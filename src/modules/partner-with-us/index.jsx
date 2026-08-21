import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { StepFlow } from "@/components/ui/StepFlow";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { partnerContent } from "@/content/partner-with-us";
import { PartnerEnquiryForm } from "@/modules/partner-with-us/PartnerEnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

// T6 — CONTENT-PLAN.md §10. See partner-with-us.js's own header comment for
// why the commercial tiles state THAT commission/fee/timeline terms exist and
// are confirmed on application, never a specific rate or promise.
//
// --- 21-08-2026, premium pass ---------------------------------------------
// Clinton: "analyse the home and dsc pages and fix the partner with us page,
// make it look premium."
//
// The diagnosis was NOT that any one section was ugly. It was that all five
// body sections had the SAME composition — Eyebrow, h2, then a Stagger grid of
// bordered boxes — so the page read as one template repeated five times. That
// is the templated rhythm the homepage never falls into: its light sections get
// their depth from hairlines, the type scale and big quiet mono numerals, and a
// genuinely dark band sits between them (DESIGN.md §11.1). Three of the fixes
// below are also plain INCONSISTENCIES with passes this page was missed by:
//
//   1. The step section was a 4-card grid, not `StepFlow`. The 19-08-2026 pass
//      made StepFlow the one step treatment sitewide (T2, T4, T5) and this page
//      was overlooked. `howItWorks` already has StepFlow's exact
//      { title, body } shape, so this is a swap, not a rewrite.
//   2. The form sat inside a `<Card>`. The 21-08-2026 contact redesign moved
//      the site's other public form onto `tone="bare"` ("do not keep the form
//      inside a card, blend it to the page"), which left the two public forms
//      on this site looking like two different products.
//   3. The hero was the plain single-arc variant while `/dsc` — the page this
//      one is now reached FROM, via the mega panel's promo card — carries a
//      textured 7/5 hero. The promo card looked more considered than its own
//      destination.
//
// `whatWeHandle` was rewritten from four bordered boxes into a `.panel-dark`
// hairline ledger — the same treatment the homepage's own PartnerProgramme
// teaser already uses for a shorter version of this exact list, so the teaser
// and the real page speak with one voice. (It briefly lived in the hero as an
// aside; 21-08-2026 moved it back out to its own section — see that section's
// own comment, which records why the content could not just be deleted with
// the card.)
//
// Surface cadence, checked rather than assumed:
//   deep → light → dark → light → light-alt → light → light-alt → ember
// Zero consecutive repeats.

// Two rings only, and lighter than any section ladder — this is a ~600px panel,
// not a full-bleed band, so an identical opacity reads far heavier here. Ink,
// not ember: the tick icons are the panel's only warm accent and the hero
// already spends the page's orange budget on its texture.
const PANEL_RINGS = [
  { r: 150, width: 13, opacity: 0.16 },
  { r: 114, width: 10, opacity: 0.1 },
];

export default function PartnerWithUs({ path }) {
  return (
    <>
      <PageHero
        path={path}
        // Was "DSC Partner Programme", which is very nearly the H1 sitting
        // directly beneath it — the same duplication the /dsc hub's eyebrow was
        // fixed for. An audience label says something the H1 does not.
        eyebrow="For CAs, advocates & consultants"
        h1="Become a ThinkOrange DSC Partner"
        lede={partnerContent.heroLede}
        texture="certificate"
        textureId="partner-hero"
      >
        {/* `children` rather than `cta`, because this page needs TWO actions and
            PageHero renders `cta` and `children` as separate stacked blocks.
            The primary one is an in-page anchor: the form is the whole point of
            the page, and the old single CTA sent people to /contact, i.e. off
            it. A plain <a href="#…"> is correct here — react-router must not
            treat a fragment as a route change. */}
        <div className="flex flex-wrap gap-3">
          <Button as="a" href="#apply" variant="primary">
            Apply to partner with us
          </Button>
          <Button as={Link} to="/contact" variant="secondary" tone="dark">
            Talk to us first
          </Button>
        </div>
      </PageHero>

      {/* WHO IT'S FOR — hairline-divided rows, not four bordered boxes.
          `whoItsFor` entries are complete sentences with no title, so a card
          gives each one a box and a shadow to carry a single line of text. The
          homepage's light sections earn their depth from hairlines and
          whitespace instead, which is also what stops this section repeating
          the hero's split-with-a-panel composition immediately below it. */}
      <Section surface="light">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Who it&apos;s for"
              heading="Built for the people already trusted with a client&apos;s filings"
              headingClassName="max-w-[32ch]"
              reveal={false}
            />
          </Reveal>

          {/* Per-item `Reveal as="li"` rather than `<Stagger>`: Stagger wraps
              every child in its own `motion.div`, which would put a <div>
              between the <ul> and its <li>s and break the list's semantics —
              the same reason the homepage hero's capability rows do this too.
              `Reveal` renders the element itself and forwards `className`. */}
          <ul className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {partnerContent.whoItsFor.map((point, index) => (
              <Reveal
                as="li"
                key={point}
                delay={index * 0.06}
                className="flex items-start gap-4 border-t border-[var(--surface-border)] py-5"
              >
                <ArcGlyph
                  variant="corner"
                  className="mt-1 h-5 w-5 shrink-0"
                  style={{ color: "var(--surface-accent)" }}
                />
                <p className="text-body text-ink-500">{point}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* HOW IT WORKS — the sitewide step treatment (19-08-2026), which this
          page was missed by. Scroll-linked progress line, node thresholds
          measured off the real DOM. This is also the page's dark band.
          The heading deliberately does NOT spell the step count in words: two
          separate hardcoded counts have already gone stale in this codebase
          (`ServicesHub`'s "twenty-one services", `content:check`'s "of 21"), and
          "Four steps" would be a third the moment a step is added. */}
      <Section surface="dark">
        <StepFlow
          eyebrow="How it works"
          heading="From application to a dispatched token"
          intro="No technical setup on your side, and no minimum commitment per order."
          surface="dark"
          // ⚠️ SHAPE ADAPTED AT THE CALL SITE, and it is not optional.
          // `StepFlow` renders `step.desc` (the key every DSC `process` array
          // uses); `partnerContent.howItWorks` calls the same field `body`,
          // matching its siblings `whatYouGet` in that content file. Passing
          // the array straight through renders the four TITLES and silently
          // drops every body — React renders `undefined` as nothing, so there
          // is no error, no warning and no visual clue beyond four bare
          // headings. Caught by screenshot, not by reading the diff.
          // Adapted here rather than renaming the content key, so the prose
          // file stays internally consistent.
          steps={partnerContent.howItWorks.map((step, index) => ({
            step: index + 1,
            title: step.title,
            desc: step.body,
          }))}
        />
      </Section>

      {/* WHAT WE HANDLE — 21-08-2026, Clinton: "from the hero section remove
          right side card and below stats also".
          The card and the spec row are gone, so the hero is back to the plain
          full-width copy block every other PageHero renders (with its texture
          kept). But `whatWeHandle` ONLY lived in that card — the previous pass
          moved it into the hero and deleted its standalone section — so
          removing the card outright would have silently dropped five lines of
          real, reviewed copy off the page. It is restored here instead.
          Placed after "How it works" because it is that section's operational
          counterpart: those are the steps, these are the parts we own.
          The panel treatment is unchanged, just relocated — which also makes
          this section the same composition as the homepage's PartnerProgramme
          teaser, the surface that carries a shorter version of this exact list.
          Surface is `light`, so the cadence gains no consecutive repeat:
          deep → light → dark → light → light-alt → light → light-alt → ember. */}
      <Section surface="light">
        <Container>
          {/* `items-center` so the two-line heading sits against the middle of a
              ~340px panel rather than at its top edge — without it the left
              column is all dead space below the h2. Same reason the DSC hub's
              intro centres its prose against the ProductShot beside it. */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="What we handle"
                heading="Everything after you make the referral"
                headingClassName="max-w-[24ch]"
                reveal={false}
              />
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <WhatWeHandlePanel points={partnerContent.whatWeHandle} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* WHAT YOU GET — the homepage's `WhyThinkOrange` archetype: an oversized
          mono numeral carrying the hierarchy instead of an icon or a card
          (DESIGN.md §16 tell 6 — no icon-in-a-circle). These entries genuinely
          have a title AND a body, which is the shape that archetype is for, so
          it fits without inventing a single word.
          ember-500, not ember-400: §4.5 clears ember-400 on `canvas` for large
          display only (3.06:1), and this section is canvas-alt, where it drops
          to 2.8:1 — under the 3.0 floor even as large text. */}
      <Section surface="light-alt">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What you get"
              heading="A programme built to stay out of your way"
              headingClassName="max-w-[32ch]"
              reveal={false}
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {partnerContent.whatYouGet.map((tile, index) => (
              <Reveal key={tile.title} delay={index * 0.06} className="flex gap-6">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-stat font-black leading-none text-ember-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="text-h3 text-ink-600">{tile.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-body text-ink-500">{tile.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* APPLY — `tone="bare"`, no card. The 21-08-2026 contact redesign moved
          the site's other public form onto this tone for a reason that applies
          identically here: a bordered white box holding five bordered white
          inputs IS a card inside a card, and it made this page's form look like
          a different product from /contact's.
          `scroll-mt-32` clears the fixed header plus the hero's anchor jump. */}
      <Section id="apply" surface="light" className="scroll-mt-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Apply"
                heading="Tell us about your practice"
                headingClassName="max-w-[26ch]"
                reveal={false}
              />
              <p className="mt-4 max-w-[52ch] text-body-lg text-ink-500">
                We&apos;ll confirm the commission structure, onboarding steps and next order
                details once we hear from you.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <PartnerEnquiryForm tone="bare" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section surface="light-alt">
        <FaqSection
          heading="About the partner programme"
          intro="What partners ask before applying. Anything not answered here, ask us directly — we would rather set expectations now."
          items={partnerContent.faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </Section>

      <CtaBand />
    </>
  );
}

/**
 * `whatWeHandle` as a hairline-divided ledger on a dark panel. Deliberately the
 * SAME construction as the homepage's PartnerProgramme teaser panel, which
 * carries a shorter version of this exact list — the teaser and its destination
 * should not be two different designs of one idea.
 *
 * `data-surface="dark"` is load-bearing, not cosmetic: it is what makes every
 * descendant reading var(--surface-accent) / var(--surface-border) resolve to
 * the dark values, and it lets theme.css's `[data-surface="dark"] h3` supply the
 * canvas heading colour rather than a `!text-white` override. Without it, this
 * dark panel nested in a LIGHT section would resolve every one of those to the
 * light values (ember-600, ink-100).
 *
 * `.grain` needs a positioned ancestor and a clipped box; `.panel-dark` supplies
 * both. `ArcRings` needs a gradientId unique to this mount — `url(#id)` resolves
 * document-wide, not per-<svg>.
 */
function WhatWeHandlePanel({ points }) {
  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative overflow-hidden rounded-[var(--radius-lg)] p-7 md:p-8"
    >
      <ArcRings
        rings={PANEL_RINGS}
        gradientId="partner-hero-panel-arc"
        color="var(--color-ink-400)"
        svgClassName="-right-20 -bottom-28 h-[300px] w-[300px]"
      />

      {/* `relative` lifts the content above .arc-rings (z-index 0). */}
      <div className="relative">
        <h3 className="font-mono text-eyebrow uppercase text-xs md:text-sm">
          What we handle for you
        </h3>
        {/* `divide-y` puts a rule BETWEEN items only, so there is no stray line
            under the last row. DESIGN.md §6.4's dark hairline is ink-800, and a
            divided list reads as a ledger — the right register for this brand. */}
        <ul className="mt-6 divide-y divide-ink-800">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-ember-400"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-body-sm text-ink-200">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
