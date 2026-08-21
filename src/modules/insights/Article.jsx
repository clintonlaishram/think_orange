import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights, getInsight } from "@/content/insights/index.js";
import { getArticleBody } from "@/content/insights/bodies.js";
import { getInsightImage } from "@/content/insights/images.js";
import { findBySlug, site } from "@/content/nav";
import { articleJsonLd } from "@/lib/jsonld";
import { formatArticleDate } from "@/lib/formatDate";
import { SectionHeading } from "@/components/ui/SectionHeading";

// T10 article — /insights/:slug. One component for all four articles, driven
// entirely by content: no per-slug branching, same discipline as T2/T4.
//
// Reading order is fixed by the body shape (see bodies.js): each section is
// paragraphs → bullets → note. The article itself carries no author byline and
// no "x min read" claim beyond `readMinutes`, which is a stated estimate rather
// than a measured fact, and no share counts or view counts — all of which would
// be invented numbers of exactly the kind CONTENT-PLAN.md §1.1 holds back.
export default function InsightArticle({ path }) {
  const slug = path.replace("/insights/", "");
  const article = getInsight(slug);
  const body = article ? getArticleBody(slug) : undefined;

  // An index entry with no body is a content bug, not a user-facing state — but
  // it must not blank the page. Falls back to the honest "being written" shape
  // the rest of the codebase uses (PendingLeaf, PendingProduct, PendingLegal).
  if (!article || !body) return <PendingArticle path={path} title={article?.title} />;

  const image = getInsightImage(slug);
  const related = (article.related ?? []).map(findBySlug).filter(Boolean);
  const others = insights.filter((entry) => entry.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        // BlogPosting only — NOT a BreadcrumbList as well. `Breadcrumbs.jsx`
        // (rendered inside PageHero) already emits one from the same trail, so
        // adding it here shipped the page TWO BreadcrumbList blocks. Caught by
        // counting ld+json @types on the live page, not by reading the diff.
        data={articleJsonLd({
          headline: article.title,
          description: article.excerpt,
          path,
          datePublished: article.published,
        })}
      />

      {/* ⛔ THIS SECTION OPENS LIGHT, WHICH BREAKS HALF OF CLAUDE.md's LAYOUT
          CONTRACT ON PURPOSE (Clinton, 20-08-2026: "in the article page do not
          make the hero section dark colour make it light colour").

          That contract requires every page's opening section to be dark, because
          the header is fixed and transparent over it and renders
          canvas-coloured text. Its own stated remedy for a template that must
          open light is "the header needs a per-route solid variant — not a local
          hack", so that is what was built: nav.js marks these routes `lightTop`
          and Header.jsx renders the solid/glass state it already owns from
          scroll position 0. Nothing is hacked locally here, and the other ~40
          heroes are untouched.

          It is also deliberately NOT `PageHero`. That primitive is the shared
          compact DARK hero for T2/T3/T4/T5 — `data-surface="deep"`,
          `text-canvas` h1, ink-300 lede — and adding a light mode to it would
          put a second surface family into a component 40+ routes depend on. An
          editorial header is a different archetype: headline, then the excerpt
          and the meta on one baseline, a rule, and the photograph.

          ONE section carries the header, the rule, the photo AND the body.
          Splitting the header out would put two `light` sections back to back,
          which reads as one surface anyway and registers as a consecutive
          repeat in the surface-cadence audit (it counts `section[data-surface]`).
          `page-top` supplies the fixed header's clearance; the bottom padding
          matches `.section-pad`'s own clamp so the page ends like every other. */}
      <section
        data-surface="light"
        className="page-top relative bg-canvas pb-[clamp(72px,9vw,144px)] text-ink-500"
      >
        <Container>
          <Reveal margin="0px" delay={0}>
            {/* tone="light" is load-bearing — the default dark palette puts
                ink-200/ink-300 on canvas, far under the 4.5:1 floor. */}
            <Breadcrumbs path={path} tone="light" className="mb-8" />
          </Reveal>

          <Reveal margin="0px" delay={0.06}>
            <Eyebrow>{article.category}</Eyebrow>
          </Reveal>

          {/* `fade={false}` — rises but never starts transparent. On this page
              the H1 is the largest text above the fold and a real LCP
              candidate, so gating its paint behind hydration would be a
              measurable regression. Same call as PageHero's own h1. */}
          <Reveal margin="0px" delay={0.12} fade={false}>
            <h1 className="mt-3 max-w-[26ch] text-h1">{article.title}</h1>
          </Reveal>

          {/* The excerpt and the meta share one baseline, with the rule beneath
              — the requested shape. They stack on phones, where a mono date
              pushed to the right of a three-line excerpt would leave the
              excerpt at ~20ch. `--surface-border` rather than a literal
              ink-100 so the rule tracks the surface system like every other
              hairline on the site. */}
          <div className="mt-8 flex flex-col gap-5 border-b border-[var(--surface-border)] pb-8 md:flex-row md:items-end md:justify-between md:gap-14">
            <Reveal margin="0px" delay={0.2} className="max-w-[64ch]">
              <p className="text-body-lg text-ink-500">{article.excerpt}</p>
            </Reveal>

            <Reveal margin="0px" delay={0.26} className="shrink-0">
              {/* ink-400, not ink-300: on a light surface ink-300 measured
                  3.4–3.5:1 for small text when this was checked for the DSC
                  documents list, and ink-400 is 7.2:1. The separator is
                  aria-hidden so a screen reader reads "12 August 2026, 6 min
                  read" rather than a stray middot. */}
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400 md:text-right">
                {formatArticleDate(article.published)}
                <span aria-hidden="true" className="mx-2 text-ink-200">·</span>
                {article.readMinutes} min read
              </p>
            </Reveal>
          </div>

          {/* Header photograph. NOT wrapped in a Reveal: on this page it is the
              LCP element, so `priority` plus an immediate paint is the whole
              point — an opacity-0 start would push the largest paint behind
              hydration. Real descriptive `alt` here, unlike the decorative
              copies of the same photo on the homepage list and the index cards,
              where the adjacent headline is the content. IMAGE-PLAN.md §2 Tier
              2 — contextual, no people, never presented as our own premises.
              See src/assets/insights/ATTRIBUTION.txt. */}
          {image && (
            <Img
              picture={image.picture}
              alt={image.alt}
              ratio="16 / 7"
              priority
              sizes="(min-width: 1800px) 1740px, 96vw"
              className="mt-10 w-full rounded-[var(--radius-lg)]"
            />
          )}

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Measure is capped at ~68ch: the whole point of an 1800px
                container is generous gutters and a sidebar, not a 140-character
                line of body copy. */}
            <article className="lg:col-span-8">
              <p className="max-w-[68ch] text-body-lg text-ink-600">{body.lede}</p>

              {body.sections.map((section) => (
                <section key={section.heading} className="mt-12 max-w-[68ch]">
                  <h2 className="text-h3 text-ink-600">{section.heading}</h2>

                  {section.paragraphs?.map((para, index) => (
                    <p key={index} className="mt-4 text-body text-ink-500">
                      {para}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((item, index) => (
                        <li key={index} className="flex gap-3 text-body text-ink-500">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.note?.map((para, index) => (
                    <p key={index} className="mt-4 text-body text-ink-500">
                      {para}
                    </p>
                  ))}
                </section>
              ))}

              <p className="mt-12 max-w-[68ch] border-l-2 border-ember-400 pl-5 text-body-lg text-ink-600">
                {body.closing}
              </p>
            </article>

            {/* Sticky rail: the services this article is actually about. Sticks
                below the fixed header (top-32, same offset T2's EnquiryCard
                uses) so neither overlaps it. */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                {related.length > 0 && (
                  <Card surface="light" interactive={false}>
                    <Eyebrow>Services in this article</Eyebrow>
                    <ul className="mt-4 space-y-1">
                      {related.map((service) => (
                        <li key={service.path}>
                          <Link
                            to={service.path}
                            className="flex min-h-11 items-center justify-between gap-3 rounded-sm text-body-sm font-medium text-ink-600 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                          >
                            {service.label}
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                <Card surface="light" interactive={false} className="mt-5">
                  <h2 className="text-h4 text-ink-600">Rather just ask?</h2>
                  <p className="mt-2 text-body-sm text-ink-500">
                    Send us your situation and we will tell you what applies to it.
                  </p>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    Message us on WhatsApp
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {others.length > 0 && (
        <Section surface="light-alt">
          <Container>
            <SectionHeading
              eyebrow="More insights"
              heading="Also worth reading"
              headingClassName="max-w-[32ch]"
            />
            {/* Deliberately the SAME card construction as /insights' own index
                (modules/insights/index.jsx), not a second design for the same
                content type on an adjacent page. Three things were wrong with
                the previous version and all three are why the row looked
                unfinished:

                  1. No thumbnail, while the index cards and the homepage list
                     both carry one — so the same article looked like a
                     different kind of thing depending on where you met it.
                  2. `h-full` alone stretches the CARD but not its contents, so
                     with three different excerpt lengths nothing lined up: the
                     row had no common floor. `flex h-full flex-col` plus
                     `mt-auto` on the action row pins "Read the article" to the
                     bottom of every card regardless of excerpt length. Rows
                     landing at different heights across a grid is exactly the
                     detail recorded in CLAUDE.md as making a set "look
                     untended".
                  3. No read time and no action affordance, so a card that IS a
                     link gave no sign of being one beyond the hover state.

                `alt=""` because the headline immediately below is the same
                information; a description of the photo would only dilute it
                (WCAG 1.1.1). Same call as the index cards. */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((entry, index) => {
                const thumb = getInsightImage(entry.slug);
                return (
                  <Reveal key={entry.slug} delay={Math.min(index, 3) * 0.06} className="h-full">
                    <Link
                      to={`/insights/${entry.slug}`}
                      className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                    >
                      <Card surface="light" className="flex h-full flex-col !p-0 overflow-hidden">
                        {thumb && (
                          <Img
                            picture={thumb.picture}
                            alt=""
                            ratio="16 / 9"
                            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw"
                            className="w-full"
                          />
                        )}
                        <div className="flex flex-col gap-1.5 p-6 sm:p-8">
                          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
                            {entry.category}
                            <span aria-hidden="true" className="mx-2 text-ink-200">·</span>
                            {entry.readMinutes} min read
                          </p>
                          <h3 className="mt-3 text-h4 text-ink-600">{entry.title}</h3>
                          <p className="mt-2 text-body-sm text-ink-500">{entry.excerpt}</p>
                          <span className="mt-auto flex items-center gap-1.5 pt-6 text-body-sm font-medium text-ember-600">
                            Read the article
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        </div>
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

function PendingArticle({ path, title }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Insights"
        h1={title ?? "Article"}
        lede="This article is still being written. In the meantime, our service pages cover the same ground in detail."
        cta={{ label: "All insights", to: "/insights" }}
      />
      <Section surface="light">
        <Container>
          <Link
            to="/services"
            className="inline-flex min-h-11 items-center gap-1.5 text-body font-medium text-ember-600 underline-offset-4 hover:underline"
          >
            Browse all services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
