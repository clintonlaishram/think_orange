import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";
import { StepFlow } from "@/components/ui/StepFlow";
import { SubNav } from "@/components/layout/SubNav";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { dscFaqSectionIds, dscFaqsPage, dscSectionIds } from "@/content/nav";
import { certificateFaqs, dscProcess } from "@/content/dsc/certificates";
import { dscValidityRenewalContent } from "@/content/dsc/validity-renewal-faqs";
import { collectionPageJsonLd, faqPageJsonLd, howToJsonLd } from "@/lib/jsonld";
import { dscEnquiryHref } from "@/lib/whatsapp";

// /dsc/faqs — EVERY DSC QUESTION, IN ONE PLACE.
//
// ⛔ 03-09-2026 (Clinton): "remove the most dsc faq fron by token page and
// create a new page only for dsc faq and keep all the dsc faq there."
//
// ⚠️ THE FAQ SET IS THE SAME UNION Buy Token WAS RENDERING — `certificateFaqs`
// plus `dscValidityRenewalContent.faqs`, in that order, resolved at render
// time. Nothing was rewritten, reordered or dropped in the move, and neither
// array is restated here. A correction to either file reaches this page.
//
// ⚠️ TWO SECTIONS CAME WITH THEM, and that is deliberate rather than scope
// creep. Splitting Buy Token down to its order panel left the issuance steps
// and the validity/renewal guidance with no page at all — and the retired
// `/dsc/validity-renewal-faqs` URL plus the finder's "Renewing or replacing"
// alt link both have to land on a real section. They are reference material
// that answers questions, which is what this page is; the alternative was
// deleting written, reviewed content to satisfy a layout instruction.
//
// ⚠️ The `HowTo` schema moved WITH the steps. Schema has to sit on the page
// that renders what it describes, or it asserts structure the reader cannot
// see — the same rule that moved it off /dsc in the first place.

// Quieter than CtaBand's 0.07/0.12/0.045, which stays the site's one loud
// band. Same ladder the partner page's own dark panel uses.
const CARD_RINGS = [
  { r: 150, width: 1, opacity: 0.16 },
  { r: 108, width: 1, opacity: 0.1 },
];

export default function DscFaqs({ path = dscFaqsPage.path }) {
  const faqs = [...certificateFaqs, ...dscValidityRenewalContent.faqs];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: dscFaqsPage.label,
            description: dscValidityRenewalContent.meta.description,
            path,
          }),
          howToJsonLd({
            name: "How to get a Digital Signature Certificate in India",
            description: dscValidityRenewalContent.meta.description,
            steps: dscProcess,
            path,
          }),
          // Built from the SAME array the accordion renders, so the structured
          // data can never assert a question the page does not show.
          faqPageJsonLd(faqs),
        ]}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signatures"
        h1="Digital signature questions, answered"
        lede="Which certificate, what it costs to get wrong, how issuance actually runs, what happens at renewal, and what to do when a token stops being recognised."
        texture="certificate"
        textureId="dsc-faqs-hero"
      />

      <SubNav
        sections={[
          { id: dscFaqSectionIds.process, label: "How issuance works" },
          { id: dscFaqSectionIds.renewal, label: "Validity & renewal" },
          { id: dscFaqSectionIds.faqs, label: "FAQs" },
        ]}
      />

      {/* StepFlow renders its own Container and heading, not a <section>, so
          the surface and the id belong to this wrapper. */}
      <Section id={dscFaqSectionIds.process} surface="light">
        <StepFlow
          eyebrow="How issuance works"
          heading="From documents to a working certificate"
          intro="The same four steps for every certificate. What changes between them is the document list, not the process."
          surface="light"
          steps={dscProcess}
        />
      </Section>

      {/* ⛔ 04-09-2026 (Clinton), two rounds. First: "Renewal & re-issue
          section reduce the content make as point and fixed the Renewing soon?
          card." Then, on the 7/5 result: "here propotion is not right amount
          show in grid of 2 col and show card as cta button below it."

          So: four points off `renewalPoints` across TWO FULL-WIDTH COLUMNS,
          with the card demoted to a CTA row underneath.

          ⚠️ WHY THE 7/5 SPLIT WAS WRONG, and it was a proportion problem
          rather than a styling one: four short points do not fill a 7-column
          measure, and one small card does not fill a 5-column one — so the
          section ran a narrow ragged list beside ~700px of empty canvas with a
          card floating at the top of it. Nothing scaled with the content.

          ⛔ A CSS GRID, DELIBERATELY — AND THIS REVERSES THE MULTI-COLUMN
          CHOICE, ON INSTRUCTION. Third round, same day: "line is not align
          make it align properly keep as empty space."

          The list was built with CSS multi-column first, because this repo has
          hit the grid row-stretch bug four times ("What's included", "Is this
          you?", "Documents required") — a grid aligns items into ROWS, so a
          two-line point is stretched to the height of the three-line one
          beside it and leaves whitespace under the shorter one. Multi-column
          packs by height instead and has no row alignment at all.

          But that is exactly what made the RULES disagree: with items packing
          by height, the second hairline in the left column landed ~30px below
          the second in the right, and a pair of near-aligned hairlines reads
          as a misprint rather than as a deliberate stagger. Clinton chose
          alignment over tightness, explicitly accepting the whitespace ("keep
          as empty space"). So the row-stretch is now the WANTED behaviour
          here, not the bug — do NOT "fix" this back to multi-column.

          ⚠️ Two things this depends on:
            - The rule sits on TOP of each point. With a bottom rule, a short
              item's hairline would sit at the top of its own trailing
              whitespace and float away from the text it belongs to.
            - `items-start`, so the copy stays at the top of a stretched row
              rather than centring in it.
            - The items are DIRECT children of the `<dl>` (one `Reveal` wraps
              the whole list, never one per item), so they are genuine
              siblings. If a per-item wrapper is ever introduced, that wrapper
              becomes the grid item and any `first:`/`nth-child` exception
              silently matches every item — the trap recorded three times over
              in CLAUDE.md.

          ⚠️ The card is the `.panel-dark` + real-Button pattern CLAUDE.md
          already records for this section, now as a full-width row. It had
          drifted to a filled ember-50 callout with an underlined bare anchor,
          which was wrong three ways:
            1. ember-50 + an ember border is the site's CAUTION treatment; this
               is a next-step CTA, so it read as a warning about renewing.
            2. An underlined text link where every other WhatsApp CTA on the
               site is `Button variant="tertiary"` — the one carrying the
               measured contrast fix (its text is ink-950; white on that green
               is 1.98:1).
            3. No `self-start`, so it stretched to the prose column's height.
               Moot now that it is its own row, but do not reintroduce a
               side-by-side without it.

          ⚠️ `data-surface="dark"` is LOAD-BEARING, not decoration: this is a
          dark panel nested in a light-alt section, so without it every
          descendant reading `var(--surface-accent)` / `var(--surface-border)`
          gets the LIGHT values, and `[data-surface="dark"] h3` never supplies
          the canvas heading colour. */}
      <Section id={dscFaqSectionIds.renewal} surface="light-alt">
        <Container>
          <SectionHeading
            eyebrow="Renewal & re-issue"
            heading="Validity, renewal and what to do when something goes wrong"
            lede="What renewal actually means in India, and what changes depending on when you start it."
          />

          {/* ONE Reveal around the whole list, never one per point — body copy
              resolving line by line while a reader is reading it is what
              CLAUDE.md's "body copy never animates" rule protects against. */}
          <Reveal>
            <dl className="mt-10 grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2">
              {dscValidityRenewalContent.renewalPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-start gap-4 border-t border-ink-200 pt-5"
                >
                  <ArcGlyph
                    variant="corner"
                    aria-hidden="true"
                    className="mt-1.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--color-ember-500)" }}
                  />
                  <div>
                    <dt className="text-body font-medium text-ink-600">{point.label}</dt>
                    <dd className="mt-1 text-body text-ink-500">{point.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={0.12}
            data-surface="dark"
            className="panel-dark grain relative mt-4 overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8"
          >
            <ArcRings
              rings={CARD_RINGS}
              color="var(--color-ink-600)"
              gradientId="dsc-faqs-renewal-arc"
              svgClassName="-right-24 -top-28 h-[340px] w-[340px]"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[62ch]">
                <h3 className="text-h4 text-canvas">Renewing soon?</h3>
                <p className="mt-2 text-body-sm text-ink-200">
                  Tell us your expiry date and we will start it before the certificate lapses, so a
                  filing deadline never arrives without a working signature.
                </p>
              </div>
              {/* `shrink-0` so a long lede can never squeeze the button into
                  two lines — the row wraps to a stack below md instead. */}
              <Button
                as="a"
                href={dscEnquiryHref("renewing my Digital Signature Certificate")}
                target="_blank"
                rel="noopener noreferrer"
                variant="tertiary"
                className="shrink-0"
              >
                <IconBrandWhatsapp className="h-4 w-4" aria-hidden="true" />
                Start a renewal
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id={dscFaqSectionIds.faqs} surface="light">
        <FaqSection
          eyebrow="FAQs"
          heading="DSC questions, answered"
          intro="Everything we are asked most often about certificates, tokens, validity and renewal."
          items={faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </Section>

      <Section surface="light-alt">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-6">
            <p className="max-w-[62ch] text-body text-ink-500">
              Still working out which certificate you need? The finder asks two questions and names
              it, with the documents and validity for that one.
            </p>
            <Link
              to={`/dsc#${dscSectionIds.finder}`}
              className="group inline-flex items-center gap-2 rounded-sm text-body font-medium text-ember-600 transition-colors hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              Find your certificate
              <ArrowRight
                className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Question not answered here? Ask us directly."
        lede="Send the portal, the certificate you hold and what it is doing — most of these are settled in one message rather than a call."
      />
    </>
  );
}
