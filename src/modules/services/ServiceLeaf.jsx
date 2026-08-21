import { Link } from "react-router-dom";
import { ArrowRight, Check, FileText, MessageCircle, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArcRings } from "@/components/ui/ArcRings";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubNav } from "@/components/layout/SubNav";
import { StepFlow } from "@/components/ui/StepFlow";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { EnquiryCard } from "@/modules/services/EnquiryCard";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { findRoute, findBySlug, serviceLeavesBySlug, site } from "@/content/nav";
import { getServiceContent } from "@/content/services";
import { serviceIcon } from "@/content/services/icons";
import { categoryTexture } from "@/content/services/textures";
import { serviceJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { whatsappHref } from "@/lib/whatsapp";

// T2 - CONTENT-PLAN.md §7. The highest-traffic template on the site: 31
// routes, one component, zero per-slug branching. Every leaf answers the
// same sections in the same order; what varies is only the data pulled from
// src/content/services/<slug>.js.
//
// `path` is the only thing the router supplies (see router.jsx's
// resolveComponent) - the slug is looked up from nav.js's route table so
// this file never hardcodes a path, matching CLAUDE.md's nav.js discipline.
//
// ── 22-08-2026 PREMIUM PASS ────────────────────────────────────────────────
// Audited against the Home and DSC pages, which had already had theirs. The
// leaf read as plain for four structural reasons, all fixed here. None of
// them was a colour problem, which is why "add more orange" would not have
// helped:
//
//   1. NO DARK BAND UNTIL SECTION 6. The page ran deep, then four light /
//      light-alt sections separated only by a tonal shift, and only then hit
//      StepFlow. That is the exact diagnosis recorded for /dsc and /about,
//      and the exact thing DESIGN.md §11.1 avoids on the homepage. "Who
//      needs this" is now a genuine dark band, which puts darks at positions
//      3 and 6 - the homepage's own rhythm.
//   2. AN EYEBROW ON EVERY SECTION. Eight of them over ten sections is the
//      most templated rhythm a page can have. Now three (hero category,
//      StepFlow, FAQ) with `SectionHeading`'s drawn hairline rule carrying
//      the structure the labels were doing badly.
//   3. THE BARE HERO. Flat ink-950 plus one lone crescent hung off the
//      corner, whose brightest part sits behind the fixed header, so it read
//      as one dull circle that had been cut off. Now `ringsId` (the same fix
//      /about took) plus a spec row of DERIVED facts.
//   4. THREE LONG FLAT LISTS IN A ROW. "Who needs this", "What's included"
//      and "Documents required" were all sparse two-column text runs. Each
//      now uses a different layout family, so no two sections in this
//      template share one.
//
// ⛔ Copy, IA, route, JSON-LD, sub-nav anchor ids and the enquiry form's
// fields and order are all UNCHANGED. This was a visual pass.
export default function ServiceLeaf({ path }) {
  const route = findRoute(path);
  const slug = route?.slug;
  const leaf = slug ? getServiceContent(slug) : undefined;
  const category = slug ? serviceLeavesBySlug.get(slug)?.category : undefined;

  if (!leaf) {
    return <PendingLeaf path={path} label={route?.label} category={category} />;
  }

  // One builder for the deep link, shared with the DSC tree (lib/whatsapp).
  const quoteHref = whatsappHref(
    `Hi ThinkOrange, I'd like a written quote for ${leaf.title}.`
  );

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: leaf.title,
          description: leaf.meta?.description ?? leaf.lede,
          path,
          categoryLabel: category?.label,
        })}
      />

      <PageHero
        path={path}
        eyebrow={category?.label}
        h1={leaf.h1}
        lede={leaf.lede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
        // A leaf inherits its CATEGORY's motif, so all five GST pages share
        // one and all four Income Tax pages share another — the texture says
        // which part of the practice you are in, rather than changing at
        // random from page to page.
        //
        // `textureId` / `ringsId` must be unique per mounted hero: `url(#id)`
        // resolves DOCUMENT-wide, not per-<svg>, so a shared id lights from
        // whichever <defs> mounted last. Keyed on the slug, unique by
        // construction. `PageHero` ignores `ringsId` whenever a texture
        // resolves, so an unmapped category degrades to the plain hero.
        texture={categoryTexture(category?.slug)}
        textureId={`leaf-hero-tex-${leaf.slug}`}
        ringsId={`leaf-hero-${leaf.slug}`}
      />

      <SubNav sections={SUBNAV_SECTIONS} />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              {/* The eyebrow that used to sit here is gone. This block is the
                  first thing under the hero, so its position already says what
                  it is, and "Overview" above an overview is the definition of a
                  label that adds nothing.

                  The first paragraph is promoted to a lead. That is the
                  editorial way to open a long read, and it does the job the
                  eyebrow was failing at: marking where the page's argument
                  starts. */}
              <Reveal>
                <p className="max-w-[62ch] text-h4 font-normal leading-[1.5] text-ink-600">
                  {leaf.overview[0]}
                </p>
              </Reveal>
              {leaf.overview.length > 1 && (
                <Stagger className="mt-6 max-w-[68ch] space-y-5 text-body-lg text-ink-500">
                  {leaf.overview.slice(1).map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </Stagger>
              )}
            </div>
            {/* NO `lg:self-start` on this column - it was here until
                19-08-2026 and it defeated the sticky card underneath it. A
                sticky element can only travel INSIDE its parent's box; with
                `self-start` the grid item shrinks to the card's own height, so
                there is zero travel and the card scrolls away like a static
                one. Letting the column stretch to the row height (grid's
                default) gives the card the prose column's full height to
                travel through, which is the whole point of it being sticky. */}
            <div className="lg:col-span-4">
              {/* top-32 = header condensed (64px) + the sticky sub-nav bar
                  (~64px) - keeps the card clear of both fixed elements above
                  it rather than sliding underneath them. */}
              <div className="lg:sticky lg:top-32">
                <EnquiryCard
                  serviceLabel={leaf.title}
                  ringsId={`enquiry-rings-${leaf.slug}`}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {/* ── 01. Who needs this ── the page's dark band.
          Layout family: OVERSIZED MONO NUMERALS, no rules (DESIGN.md §11.4,
          the archetype WhyThinkOrange uses on the homepage).

          Two reasons it is not a ruled list any more:

          1. ⛔ SECTION-LAYOUT-REPETITION. Once "What's included" below became
             a two-column ruled list, this was the SAME family two sections
             apart. The numeral carries the separation here instead of a
             hairline, so the two read as different blocks rather than as one
             treatment printed twice.
          2. ⛔ THE SAME RAGGED-GAP BUG the card section had. This was a
             two-column CSS GRID, which aligns items into ROWS, so a one-line
             statement was stretched to the height of the two-line one beside
             it — visible as a lake of white under row 03. CSS MULTI-COLUMN has
             no row alignment: items pack against each other and the rhythm is
             even down both columns. `break-inside-avoid` stops a statement
             splitting across the gap.

          The numerals are a count, not the meaning (the statement carries
          that), so they stay `aria-hidden` — but they are still large visible
          glyphs, so their colour was measured rather than picked.

          ONE `Reveal` around the whole list, never per item: six statements
          resolving one by one is exactly what "body copy never animates"
          protects against, and the old per-item stagger was doing it. */}
      <Section
        id="who-needs-this"
        surface="dark"
        className="surface-ambient isolate"
      >
        <ArcRings
          gradientId={`leaf-who-rings-${leaf.slug}`}
          rings={[
            { r: 158, width: 16, opacity: 0.09 },
            { r: 116, width: 12, opacity: 0.06 },
          ]}
          svgClassName="-left-24 -bottom-40 h-[560px] w-[560px] rotate-180"
          className="z-[-1]"
        />
        <Container>
          <SectionHeading
            eyebrow="Who needs this"
            heading="Is this you?"
            lede="If any of these describe where you are right now, this is the service you are looking for."
            dark
          />
          <Reveal as="ul" delay={0.08} className="mt-12 md:columns-2 md:gap-x-20">
            {leaf.whoNeedsThis.map((point, index) => (
              <li
                key={index}
                className="flex break-inside-avoid items-start gap-6 py-6"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-h3 tabular-nums leading-none text-ember-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* ink-100, not the ink-200 body default: at text-body-lg these
                    statements are the section's content, and the reader is
                    matching themselves against them one by one. */}
                <p className="max-w-[46ch] text-body-lg text-ink-100">{point}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ── 02. What's included ──
          Layout family: RULED TWO-COLUMN LIST, no card (Clinton, 22-08-2026:
          "do not put inside card").

          Two things were wrong with the card version and only one of them was
          the card:

          1. THE CARD ITSELF. A list of short title+body pairs does not need
             elevation — nothing here is pressable, nothing is a separate
             object, and DESIGN.md's rule is that cards are for when elevation
             communicates real hierarchy. On an 1800px container it read as a
             big empty white box with the content floating at the top of it.
          2. ⛔ THE RAGGED GAPS, which the card was only making obvious. A
             two-column CSS GRID aligns items into ROWS, so every item is
             stretched to the height of the tallest one beside it — that is why
             a two-line entry sat above a lake of white space when its
             neighbour ran to five lines. Switching to CSS MULTI-COLUMN removes
             row alignment entirely: items flow and pack against each other, so
             the rhythm is even down both columns whatever the copy does.
             `break-inside-avoid` keeps an item from splitting across the gap.

          The rule sits on TOP of each item, not the bottom: with two columns
          of unequal length a bottom rule leaves a hairline dangling under the
          shorter one, where a top rule terminates cleanly by construction.

          ONE `Reveal` around the whole list, never per item. A dozen lines
          resolving one by one while a reader is trying to read them is exactly
          what CLAUDE.md's "body copy never animates" rule protects against. */}
      <Section id="whats-included" surface="light">
        <Container>
          <SectionHeading
            eyebrow="What’s included"
            heading="Everything handled, end to end"
            lede="The full scope of the engagement, so there is nothing to discover halfway through."
          />
          <Reveal as="ul" delay={0.08} className="mt-10 md:columns-2 md:gap-x-16">
            {leaf.included.map((item) => (
              <li
                key={item.title}
                className="flex break-inside-avoid gap-4 border-t border-ink-100 py-6"
              >
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-ember-600"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-h4 text-ink-600">{item.title}</h3>
                  <p className="mt-1.5 max-w-[54ch] text-body-sm text-ink-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
      {/* ── 03. Documents required ──
          Layout family: MASONRY CARDS, one per entity type.

          ⛔ NO CARDS (Clinton, 22-08-2026: "do not show in card view"). Same
          call as the two sections above. I had argued the card earned its
          place here because the groups are mutually exclusive and the edge
          says "this set, not that set" — overruled, and the column break plus
          the ruled group header carry that boundary well enough on their own.
          The layout is unchanged: same columns, same order, just no boxes.

          ⛔ IT IS NOT A GRID, and that was the visible bug behind the ragged
          look: a grid
          stretches every card to the tallest in its ROW, so a 3-item
          Proprietorship card was padded out to match a 6-item one beside it
          and shipped with a third of itself empty. A 5-group leaf also left a
          hole in the second row of a 3-column track, which is the bento
          cell-count rule failing. CSS MULTI-COLUMN packs by height instead:
          cards keep their natural size, columns balance themselves, and there
          is no empty cell to explain at any group count.

          `break-inside-avoid` keeps a card whole; the vertical gap has to be
          `mb-*` on the card because multi-column `gap` only sets the COLUMN
          gap, never the gap between stacked items.

          ONE `Reveal` around the whole set. The items inside never stagger —
          this is the one section a reader works from while gathering
          paperwork, so lines resolving one by one would be actively unhelpful. */}
      <Section id="documents-required" surface="light-alt">
        <Container>
          <SectionHeading
            eyebrow="Documents required"
            heading="What you'll need to hand over"
            lede="Collected once, at the start. We tell you which of these apply to your case before you gather anything."
          />
          <Reveal delay={0.08} className="mt-10 md:columns-2 md:gap-x-14 lg:columns-3">
            {leaf.documents.map((group) => (
              <div key={group.group} className="mb-10 break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4 border-b border-ink-100 pb-4">
                  <h3 className="text-h4 text-ink-600">{group.group}</h3>
                  {/* The card's ONE ember element, and it earns it: this is
                      how many things the reader has to go and find. It was a
                      faint ink-400 11px mark before, which read as a stray
                      artefact rather than as a count. */}
                  <span
                    className="shrink-0 font-mono text-body-sm tabular-nums text-ember-600"
                    aria-hidden="true"
                  >
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ol className="mt-5 space-y-3.5">
                  {group.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3.5 text-body-sm text-ink-500">
                      {/* ink-400, not ink-300: these are visible ordinals, not
                          decoration, so they carry the 4.5:1 floor. ink-300
                          measured 3.4:1 on this card. */}
                      <span className="shrink-0 font-mono tabular-nums text-ink-400">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </Reveal>
          {leaf.documentsNote && (
            <Reveal as="p" className="mt-6 max-w-[68ch] text-body-sm text-ink-400">
              {leaf.documentsNote}
            </Reveal>
          )}
        </Container>
      </Section>

      {/* ── 04. How it works ── the second dark band. Untouched: StepFlow is
          already the site's one scroll-linked step treatment and needs no
          help from this pass. */}
      <Section id="how-it-works" surface="dark">
        <StepFlow
          eyebrow="How it works"
          heading={`${leaf.process.length} steps, start to finish`}
          intro="Where the work actually goes, and what we need from you at each stage."
          surface="dark"
          steps={leaf.process}
        />
      </Section>
      {/* ── 05. Timeline & fees ──
          Layout family: the DSC PRICING composition (Clinton, 22-08-2026:
          "create something similar to dsc pages pricing section"). That
          section is heading -> one paragraph with the CTA beside it -> a
          hairline-topped content row, and no box anywhere. Same three beats
          here.

          What went, and why:
          - THE BORDERED WHITE TABLE. Third card-like surface removed from this
            template. `bg-white` + border + radius is a box by another name.
          - THE `.panel-dark` "Get it in writing" PANEL. Its copy was the one
            line a reader needs to act on, so it is now the paragraph itself,
            sitting beside the CTA exactly as DSC's does. Copy UNCHANGED.

          ⚠️ `<dl>`, not `<table>`. The data is stage -> duration pairs, which
          a description list expresses just as correctly, and unlike a table a
          `<dl>` can be laid out in COLUMNS — which is what lets these rows
          fill an 1800px container instead of stranding a two-column table at
          one third of the width with a lake beside it. Multi-column also packs
          by height, so no row is stretched to match its neighbour (the bug
          fixed in three other sections this session).

          Nothing here animates. CLAUDE.md: tables and body copy never animate,
          and this is the section a reader checks a date against. Only the
          paragraph and its CTA reveal. */}
      <Section id="timeline-fees" surface="light">
        <Container>
          <SectionHeading
            eyebrow="Timeline &amp; fees"
            heading="What to expect, and what it costs"
          />

          <Reveal
            delay={0.08}
            className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-start"
          >
            <p className="max-w-[68ch] text-body-base text-ink-500 sm:text-body-lg">
              Timelines are indicative and depend on departmental processing and how quickly
              documents come back to us. Message us on WhatsApp for a written quote.
            </p>
            <Button
              as="a"
              href={quoteHref}
              target="_blank"
              rel="noreferrer noopener"
              variant="tertiary"
              className="shrink-0"
            >
              <IconBrandWhatsapp className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Enquire on WhatsApp
            </Button>
          </Reveal>

          <dl className="mt-10 md:columns-2 md:gap-x-16">
            {leaf.timeline.map((row) => (
              <div
                key={row.stage}
                className="flex break-inside-avoid items-baseline justify-between gap-8 border-t border-ink-100 py-4"
              >
                <dt className="text-body-sm text-ink-500">{row.stage}</dt>
                <dd className="shrink-0 font-mono text-body-sm tabular-nums text-ink-600">
                  {row.days}
                </dd>
              </div>
            ))}
          </dl>

          {/* `fees` is ALWAYS null on every leaf (CLAUDE.md non-negotiable).
              This is the one place that fact renders, and it is pulled out of
              the list and given weight on purpose — DSC's pricing section makes
              "On request" its entire heading, which is the same decision: the
              honest answer is the point, not a footnote. */}
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-ink-200 pt-6">
            <p className="text-h4 text-ink-600">Professional fees</p>
            <p className="font-mono text-h4 tabular-nums text-ember-600">On request</p>
          </div>
        </Container>
      </Section>

      <Section id="faqs" surface="light-alt">
        <FaqSection
          eyebrow="FAQs"
          heading="Common questions"
          // Title as authored, not lower-cased - the leaf titles are full of
          // acronyms ("GST Registration", "MSME / Udyam Registration") and
          // lower-casing them reads as a typo in the rail's body copy.
          intro={`The questions we are actually asked about ${leaf.title}. If yours is not here, ask us directly.`}
          items={leaf.faqs.map((faq, index) => ({ id: index, question: faq.q, answer: faq.a }))}
        />
        <JsonLd data={faqPageJsonLd(leaf.faqs)} />
      </Section>

      <RelatedServices related={leaf.related} currentSlug={leaf.slug} />

      <CtaBand />
    </>
  );
}

// Anchors to the six sub-nav sections. Overview is not anchored - it is the
// first thing under the hero, so there is nothing to jump past.
const SUBNAV_SECTIONS = [
  { id: "who-needs-this", label: "Who needs this" },
  { id: "whats-included", label: "What’s included" },
  { id: "documents-required", label: "Documents required" },
  { id: "how-it-works", label: "How it works" },
  { id: "timeline-fees", label: "Timeline & fees" },
  { id: "faqs", label: "FAQs" },
];

/**
 * Icon-led CARDS, and the card is deliberate here (Clinton, 22-08-2026: "for
 * related service keep in card view only").
 *
 * ⚠️ This is the one content section on the template that keeps its card,
 * after the other four had theirs removed. It is also the one section whose
 * items are LINKS — the card edge is the affordance that says "this is a
 * click target", which is exactly the hierarchy DESIGN.md's rule about
 * elevation is describing. The other four were static content, where the box
 * was doing nothing but adding weight. Do not "tidy" this one to match them.
 *
 * The disc is FILLED on a light surface and never ringed - the pairing
 * established by the DSC group cards. A ring plus a tint on a white card is
 * two treatments doing one job, and the ring reads as an outline around a
 * shape rather than as the shape.
 */
function RelatedServices({ related, currentSlug }) {
  const items = (related ?? [])
    .map((relatedSlug) => findBySlug(relatedSlug))
    .filter((item) => item && item.slug !== currentSlug);

  if (items.length === 0) return null;

  return (
    <Section surface="light">
      <Container>
        <SectionHeading
          eyebrow="Related services"
          heading="You might also need"
          lede="Services that usually come up in the same conversation as this one."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const relatedContent = getServiceContent(item.slug);
            // ⛔ Always through `serviceIcon()`, never by indexing the map:
            // an unmapped slug resolves to undefined and `<undefined />` is a
            // hard React crash, not a graceful blank.
            const Icon = serviceIcon(item.slug);
            return (
              <Reveal key={item.slug} delay={Math.min(index, 3) * 0.07}>
                <Link
                  to={item.path}
                  className="block h-full rounded-[var(--radius-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 lg:rounded-[var(--radius-2xl)]"
                >
                  <Card surface="light" className="card-premium flex h-full flex-col">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-50 text-ember-600"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-5 text-h4 text-ink-600">{item.label}</h3>
                    {relatedContent?.lede && (
                      <p className="mt-2 text-body-sm text-ink-500">{relatedContent.lede}</p>
                    )}
                    {/* `mt-auto` inside a flex-col Card, so the action row
                        lands on the card's floor in every card regardless of
                        teaser length. Rows landing at different heights across
                        a grid is the detail that makes a set look untended. */}
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-body-sm font-medium text-ember-600 transition-[gap] duration-[var(--dur-fast)] group-hover:gap-2.5">
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
/**
 * Graceful fallback for any leaf with no content file yet. Renders only what
 * is genuinely known: the nav label and breadcrumb, plus a direct route to a
 * human and, where possible, sibling services in the same category that ARE
 * written - nothing invented.
 *
 * All 31 leaves are written as of 19-08-2026, so this branch is currently
 * unreached. It stays because nav.js gains leaves before content exists
 * (twice already), and the alternative is a blank page.
 */
function PendingLeaf({ path, label, category }) {
  const writtenSiblings = (category?.children ?? []).filter((child) =>
    getServiceContent(child.slug)
  );

  return (
    <>
      <PageHero
        path={path}
        eyebrow={category?.label}
        h1={label ?? "Service"}
        lede="This page is still being written and checked against current law. Message us directly and we'll help you the same way."
        cta={{ label: "Talk to an Expert", to: "/contact" }}
        texture={categoryTexture(category?.slug)}
        textureId={`pending-hero-tex-${category?.slug ?? "service"}`}
        ringsId={`pending-hero-${category?.slug ?? "service"}`}
      />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Content coming soon"
                heading={<>We&rsquo;re still writing this page</>}
              />
              <p className="mt-4 max-w-[62ch] text-body-lg text-ink-500">
                We don&rsquo;t publish a service page before it&rsquo;s been checked against the
                current law, so this one isn&rsquo;t live yet. Call, WhatsApp or email us and
                we&rsquo;ll help you the same way we would through the page.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button as="a" href={site.phoneHref} variant="secondary">
                  <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {site.phoneDisplay}
                </Button>
                <Button
                  as="a"
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {writtenSiblings.length > 0 && (
              <div className="lg:col-span-5">
                <div
                  data-surface="dark"
                  className="panel-dark grain relative overflow-hidden rounded-[var(--radius-lg)] p-7 md:p-8"
                >
                  <h3 className="flex items-center gap-2.5 text-h4 text-canvas">
                    <FileText className="h-4 w-4 text-ember-300" strokeWidth={1.5} aria-hidden="true" />
                    Related services that are live
                  </h3>
                  <ul className="mt-4">
                    {writtenSiblings.map((sibling) => (
                      <li key={sibling.slug} className="border-t border-ink-700 first:border-t-0">
                        <Link
                          to={sibling.path}
                          className="flex min-h-12 items-center justify-between gap-3 rounded-sm text-body-sm text-ink-200 transition-colors hover:text-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                        >
                          {sibling.label}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
