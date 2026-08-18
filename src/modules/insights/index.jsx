import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights } from "@/content/insights/index.js";
import { getInsightImage } from "@/content/insights/images.js";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { formatArticleDate } from "@/lib/formatDate";
import { meta as siteMeta } from "@/content/meta";

// T10 index — /insights. Exists chiefly so every article has a real parent for
// its breadcrumb (see nav.js's insights block) and so the homepage section has
// a "read everything" destination. Deliberately plain: a list, in reverse
// publication order, with no filters or tag cloud for four articles.
export default function InsightsIndex({ path }) {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "Insights",
          description: siteMeta["/insights"].description,
          path,
        })}
      />

      {/* No eyebrow: on every other template the eyebrow names the parent
          category, and here it would only repeat the H1 word for word. */}
      <PageHero
        path={path}
        h1="Insights"
        lede="Plain explanations of the compliance decisions our clients actually face — what a rule requires, when it applies to you, and what it costs to get wrong."
      />

      <Section surface="light">
        <Container>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {insights.map((article, index) => {
              const image = getInsightImage(article.slug);
              return (
              <li key={article.slug}>
                <Reveal delay={Math.min(index, 4) * 0.06}>
                  <Link
                    to={`/insights/${article.slug}`}
                    className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="flex h-full flex-col">
                      {/* Decorative here — `alt=""` — because the headline
                          directly below is the same information a description
                          of the photo would only dilute. */}
                      {image && (
                        <Img
                          picture={image.picture}
                          alt=""
                          ratio="16 / 9"
                          sizes="(min-width: 768px) 42vw, 92vw"
                          className="mb-6 w-full rounded-[var(--radius-md)]"
                        />
                      )}
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
                        {article.category} · {article.readMinutes} min read
                      </p>
                      <h2 className="mt-3 text-h3 text-ink-600">{article.title}</h2>
                      <p className="mt-3 text-body text-ink-500">{article.excerpt}</p>
                      <span className="mt-auto flex items-center gap-1.5 pt-6 text-body-sm font-medium text-ember-600">
                        Read the article
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
                        {formatArticleDate(article.published)}
                      </span>
                    </Card>
                  </Link>
                </Reveal>
              </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
