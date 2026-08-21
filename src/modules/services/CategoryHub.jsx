import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { ArcRings } from "@/components/ui/ArcRings";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceCategories } from "@/content/nav";
import { getServiceContent } from "@/content/services";
import { getCategoryContent } from "@/content/services/category-content.js";
import { categoryIcon, serviceIcon } from "@/content/services/icons";
import { categoryTexture } from "@/content/services/textures";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

// T3 - CONTENT-PLAN.md §8. One component for all 6 category hubs (the
// top-level /services variant is ServicesHub.jsx; /dsc is DscHub.jsx - its
// children are T4/T5 pages with a different data shape). `path` resolves to a
// category via nav.js's serviceCategories, never hardcoded here.
//
// ── 22-08-2026 PREMIUM PASS ────────────────────────────────────────────────
// Three structural problems, all shared with the T2 leaf and all fixed the
// same way the DSC pass fixed them:
//
//   1. SIX LIGHT SURFACES IN A ROW. deep, then light / light-alt / light /
//      light-alt / light separated only by a tonal shift, with no genuinely
//      dark band anywhere. The child grid is now that band, which puts it at
//      position 3 - the homepage's own rhythm (DESIGN.md §11.1).
//   2. THE SAME LIST TWICE, BACK TO BACK. The intro's navy inset panel listed
//      every child, and the very next section was a grid of every child. The
//      index is genuinely useful, so it MOVED into the hero's `aside`, where
//      it is above the fold and reaches a reader before they scroll past the
//      thing it indexes. Nothing was deleted.
//   3. THE WHY-US ROW WAS THE FLATTEST BLOCK ON THE PAGE - three plain
//      paragraphs in a divided row. It now takes the big-ember-numeral
//      treatment the homepage's WhyThinkOrange and /dsc already use, and sits
//      in the intro's empty right column rather than as its own thin section.
//
// ⛔ Copy, IA, routes and JSON-LD are UNCHANGED. Every string on this page
// still comes from nav.js or category-content.js.
export default function CategoryHub({ path }) {
  const category = serviceCategories.find((entry) => entry.path === path);
  if (!category) return null;

  const content = getCategoryContent(category.slug);
  const children = category.children;
  const writtenCount = children.filter((child) => getServiceContent(child.slug)).length;
  // Resolved ONCE: the grid's column count is derived from this same array,
  // so a slug that no longer resolves cannot widen the track and leave a hole.
  const relatedCategories = (content?.relatedCategories ?? [])
    .map((slug) => serviceCategories.find((entry) => entry.slug === slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: category.label,
          description: content?.meta?.description ?? content?.heroLede,
          path,
        })}
      />

      <PageHero
        path={path}
        eyebrow="Services"
        h1={category.label}
        lede={content?.heroLede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
        // Each practice area gets its OWN hero motif (Clinton, 22-08-2026).
        // `textureId` must be unique per mounted hero: `url(#id)` resolves
        // DOCUMENT-wide, not per-<svg>, so a shared id lights from whichever
        // <defs> mounted last. Keyed on the slug, unique by construction.
        // A category with no mapping falls back to the plain hero rather than
        // throwing, so `ringsId` is passed too — `PageHero` ignores it
        // whenever a texture resolves.
        texture={categoryTexture(category.slug)}
        textureId={`cat-hero-tex-${category.slug}`}
        ringsId={`cat-hero-${category.slug}`}
        aside={<CategoryIndex category={category} />}
      />

      {content?.intro && (
        <Section surface="light">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                {/* First paragraph promoted to a lead. The eyebrow that used
                    to sit here is gone: this block is the first thing under
                    the hero, so its position already says what it is, and the
                    label was repeating the H1 directly above it. */}
                <Reveal>
                  <p className="max-w-[62ch] text-h4 font-normal leading-[1.5] text-ink-600">
                    {content.intro[0]}
                  </p>
                </Reveal>
                {content.intro.length > 1 && (
                  <Stagger className="mt-6 max-w-[68ch] space-y-5 text-body-lg text-ink-500">
                    {content.intro.slice(1).map((para, index) => (
                      <p key={index}>{para}</p>
                    ))}
                  </Stagger>
                )}
              </div>

              {content.whyUs?.length > 0 && (
                <div className="lg:col-span-5">
                  <WhyUs points={content.whyUs} />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ── The child grid: the page's dark band. Cards are icon-led, and the
          disc is RINGED here rather than filled - the dark half of the
          filled-on-light / ringed-on-dark pairing the DSC group cards
          established. No ink-surface tint is pale enough to register as a
          disc without lifting the card's warmth, which is why the homepage
          DSC band rings its own too. */}
      <Section surface="dark" className="surface-ambient isolate">
        <ArcRings
          gradientId={`cat-grid-rings-${category.slug}`}
          rings={[
            { r: 162, width: 16, opacity: 0.09 },
            { r: 118, width: 12, opacity: 0.06 },
          ]}
          svgClassName="-right-32 -top-40 h-[620px] w-[620px]"
          className="z-[-1]"
        />
        <Container>
          <SectionHeading
            eyebrow={
              writtenCount === children.length
                ? "All services"
                : `${writtenCount} of ${children.length} live now`
            }
            heading={`Every service in ${category.label}`}
            lede={category.subline}
            dark
          />

          {/* Count-aware grid, CONTENT-PLAN.md §8 row 3: 2 children -> 2-col,
              3 -> 3-col, 4+ -> bento (first card spans 2, matching the
              asymmetric treatment WhatWeDo already established on the
              homepage) - so a hub with 2 leaves doesn't stretch into hollow
              columns, and one with 7 doesn't cram into a flat uniform grid.

              ⛔ Plain div + per-item Reveal here, NOT Stagger. Stagger wraps
              every child in its own motion.div, and THAT wrapper becomes the
              actual CSS grid item - so a span class on the child inside it
              has no effect on the grid's track sizing, and `first:` /
              `last:` exceptions match always because each child is the only
              child of its own wrapper. Reveal forwards `className` straight
              onto the element it renders, so it IS the grid item. Same fix
              WhatWeDo's bento grid and the /about dark band both needed. */}
          <div className={cn("mt-10 grid grid-cols-1 gap-5", gridColsFor(children.length))}>
            {children.map((child, index) => {
              const leaf = getServiceContent(child.slug);
              // ⛔ Always through `serviceIcon()`, never by indexing the map.
              const Icon = serviceIcon(child.slug);
              return (
                <Reveal
                  key={child.slug}
                  delay={Math.min(index, 5) * 0.06}
                  className={spanClassFor(children.length, index)}
                >
                  {/* `.card-dark` on the Link ITSELF, as DscBand and DscHub
                      already do: the class's hover ring, lift and arc draw are
                      written for the hovered element, and
                      `.card-dark:is(a, button):active` only fires when the
                      card really is the press target. A hand-rolled
                      `.card-dark` must also pass its own `.card-arc` child,
                      which <Card surface="dark"> supplies for itself. */}
                  <Link
                    to={child.path}
                    className="card-dark group/card group flex h-full flex-col rounded-[var(--radius-xl)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 sm:rounded-[var(--radius-2xl)] md:p-8 lg:rounded-[var(--radius-lg)]"
                  >
                    <ArcGlyph
                      variant="corner"
                      className="card-arc pointer-events-none absolute right-4 top-4 h-6 w-6"
                      style={{ color: "var(--surface-accent)" }}
                    />
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ember-400/60 text-ember-400"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-5 text-h4 text-canvas">{child.label}</h3>
                    <p className="mt-3 text-body-sm text-ink-200">
                      {leaf?.lede ??
                        "This page is being finalised - message us and we'll help you directly."}
                    </p>
                    <span className="mt-auto flex items-center gap-1.5 border-t border-ink-700 pt-5 text-body-sm font-medium text-ember-300">
                      Read more
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover/card:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {content?.faqs?.length > 0 && (
        <Section surface="light">
          <FaqSection
            // Label as authored, NOT lower-cased: the old heading sat under a
            // separate eyebrow and read as a sentence fragment, but as the
            // rail's own h2 "About gst services" reads like a typo. nav.js
            // labels are already correctly cased ("GST", "Tenders & Finance").
            heading={`About ${category.label}`}
            intro="The questions people ask before deciding which of these services they actually need."
            items={content.faqs.map((faq, index) => ({
              id: index,
              question: faq.q,
              answer: faq.a,
            }))}
          />
        </Section>
      )}

      {relatedCategories.length > 0 && (
        <Section surface="light-alt">
          <Container>
            <SectionHeading
              eyebrow="Related categories"
              heading="Related practice areas"
              lede="Work in these areas usually runs alongside the services above."
            />
            {/* Count-aware, like the child grid above: most categories list
                exactly two related areas, and a fixed 3-column track left the
                third cell empty. A grid has exactly as many columns as there
                is content to fill. */}
            <div
              className={cn(
                "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2",
                relatedCategories.length > 2 && "lg:grid-cols-3"
              )}
            >
              {relatedCategories.map((related, index) => {
                  const Icon = categoryIcon(related.slug);
                  return (
                    <Reveal key={related.slug} delay={Math.min(index, 3) * 0.07}>
                      <Link
                        to={related.path}
                        className="block h-full rounded-[var(--radius-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 lg:rounded-[var(--radius-2xl)]"
                      >
                        <Card surface="light-alt" className="card-premium flex h-full flex-col">
                          <span
                            aria-hidden="true"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-50 text-ember-600"
                          >
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </span>
                          <h3 className="mt-5 text-h4 text-ink-600">{related.label}</h3>
                          {related.subline && (
                            <p className="mt-2 text-body-sm text-ink-500">{related.subline}</p>
                          )}
                          <span className="mt-auto flex items-center gap-1.5 pt-5 text-body-sm font-medium text-ember-600 transition-[gap] duration-[var(--dur-fast)] group-hover:gap-2.5">
                            View category
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
      )}

      <CtaBand />
    </>
  );
}

/**
 * The hero aside: a quick index of the category's children.
 *
 * This is the navy inset panel that used to sit in the intro's right column.
 * It moved here because the section immediately after the intro is a grid of
 * these same children, so the two read as the same list printed twice. Above
 * the fold it does a different job: it lets a reader who already knows what
 * they want leave for it without scrolling at all.
 *
 * `.panel-dark` rather than `.card-dark`: the panel itself is not pressable
 * (its rows are), so a hover ring or lift on the container would signal a
 * click target that does not exist.
 */
function CategoryIndex({ category }) {
  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7"
    >
      {/* No colour class on the heading: `[data-surface="dark"] h2` supplies
          canvas and beats a plain utility on specificity anyway. Letting the
          surface system own it is the resolution recorded for the
          PartnerProgramme panel and the DSC promo card, both of which lost
          the same fight against the cascade. */}
      <h2 className="relative font-mono text-eyebrow uppercase">In this category</h2>
      <ul className="relative mt-4">
        {category.children.map((child) => (
          <li key={child.slug} className="border-t border-ink-700 first:border-t-0">
            <Link
              to={child.path}
              className="group/row flex min-h-12 items-center justify-between gap-3 rounded-sm text-body-sm text-ink-200 transition-colors hover:text-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
            >
              {child.label}
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover/row:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Why ThinkOrange, as the big quiet mono numerals the homepage's
 * WhyThinkOrange (DESIGN.md §11.4) and the /dsc why-us row already use. It
 * replaces three plain paragraphs in a `divide-x` row, which was the flattest
 * thing a light section can be.
 *
 * ember-500, not ember-400: ember-400 on canvas-alt measures 2.8:1, under the
 * 3.0 floor even as large text. Same correction /about needed.
 *
 * No headings are invented above these sentences. Each `whyUs` entry is
 * already one reviewed claim, and a three-word label derived from its own
 * opening would just say the same thing twice.
 */
function WhyUs({ points }) {
  return (
    <div className="lg:sticky lg:top-28">
      <h2 className="font-mono text-eyebrow uppercase text-ember-600">Why ThinkOrange</h2>
      {/* Plain div + per-item `Reveal` for the same reason the leaf's dark
          band needs it: under `Stagger` every item is the only child of its
          own wrapper, so `first:border-t-0 first:pt-0` matches ALL of them and
          the dividers silently vanish. */}
      <div className="mt-6 space-y-6">
        {points.map((point, index) => (
          <Reveal
            key={index}
            delay={Math.min(index, 4) * 0.07}
            className="flex gap-5 border-t border-ink-100 pt-5 first:border-t-0 first:pt-0"
          >
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-h3 tabular-nums leading-none text-ember-500"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-body text-ink-500">{point}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function gridColsFor(count) {
  if (count <= 2) return "sm:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

function spanClassFor(count, index) {
  if (count < 4) return "";
  return index === 0 ? "lg:col-span-2" : "";
}
