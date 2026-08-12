import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeWorkWith } from "@/modules/home/sections/WhoWeWorkWith";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceCategories } from "@/content/nav";
import { getServiceContent } from "@/content/services";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { meta } from "@/content/meta";

// Top-level /services — the T3 variant CONTENT-PLAN.md §8 describes: "all
// six categories with their children listed inline... the sitemap page
// users actually use." Reuses WhoWeWorkWith verbatim rather than reforking
// it, per §8's own instruction to reuse the homepage block.
export default function ServicesHub({ path }) {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "Services",
          description: meta["/services"].description,
          path,
        })}
      />

      <PageHero
        path={path}
        h1="Services"
        lede="Six practice areas, twenty-one services — GST, income tax, business setup, accounting and audit, government tenders, and loans and finance, all handled from Salem for clients across India."
        cta={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section surface="light">
        <Container>
          <div className="space-y-14 md:space-y-16">
            {serviceCategories.map((category) => (
              <div key={category.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-100 pb-4">
                  <h2 className="text-h3">
                    <Link
                      to={category.path}
                      className="rounded-sm text-ink-600 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                    >
                      {category.label}
                    </Link>
                  </h2>
                  <Link
                    to={category.path}
                    className="inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    View category
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                  {category.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        to={child.path}
                        className="flex min-h-12 items-center justify-between gap-2 rounded-sm text-body text-ink-500 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                      >
                        {child.label}
                        {!getServiceContent(child.slug) && (
                          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400">
                            Soon
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <WhoWeWorkWith />

      <CtaBand />
    </>
  );
}
