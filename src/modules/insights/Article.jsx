import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
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

      <PageHero
        path={path}
        eyebrow={article.category}
        h1={article.title}
        lede={article.excerpt}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
          {formatArticleDate(article.published)} · {article.readMinutes} min read
        </p>
      </PageHero>

      <Section surface="light">
        <Container>
          {/* Header photograph — INSIDE this section, not a section of its own:
              a second `light` section back-to-back would read as one surface
              anyway and would show up as a consecutive repeat in the surface
              cadence audit (which counts `section[data-surface]`).
              `priority` because on this page the header image IS the LCP
              element, and lazy-loading the LCP image is a measurable delay
              rather than a saving. Real descriptive `alt` here, unlike the
              decorative copies of the same photo on the homepage list and the
              index cards where the adjacent headline is the content.
              IMAGE-PLAN.md §2 Tier 2 — contextual, no people, never presented
              as our own premises. See src/assets/insights/ATTRIBUTION.txt. */}
          {image && (
            <Img
              picture={image.picture}
              alt={image.alt}
              ratio="16 / 7"
              priority
              sizes="(min-width: 1800px) 1740px, 96vw"
              className="mb-12 w-full rounded-[var(--radius-lg)]"
            />
          )}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
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
      </Section>

      {others.length > 0 && (
        <Section surface="light-alt">
          <Container>
            <Eyebrow>More insights</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">Also worth reading</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((entry, index) => (
                <Reveal key={entry.slug} delay={Math.min(index, 3) * 0.06}>
                  <Link
                    to={`/insights/${entry.slug}`}
                    className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="h-full">
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
                        {entry.category}
                      </p>
                      <h3 className="mt-2 text-h4 text-ink-600">{entry.title}</h3>
                      <p className="mt-2 text-body-sm text-ink-500">{entry.excerpt}</p>
                    </Card>
                  </Link>
                </Reveal>
              ))}
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
