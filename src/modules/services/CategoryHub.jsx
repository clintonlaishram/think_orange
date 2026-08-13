// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { Container } from "@/components/layout/Container";
// import { Section } from "@/components/layout/Section";
// import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { ComingSoon } from "@/components/ui/ComingSoon";
// import { Card } from "@/components/ui/Card";
// import { Accordion } from "@/components/ui/Accordion";
// import { Reveal } from "@/components/motion/Reveal";
// import { Stagger } from "@/components/motion/Stagger";
// import { CtaBand } from "@/modules/home/sections/CtaBand";
// import { JsonLd } from "@/components/seo/JsonLd";
import { serviceCategories } from "@/content/nav";
// import { getServiceContent } from "@/content/services";
import { getCategoryContent } from "@/content/services/category-content.js";
// import { collectionPageJsonLd } from "@/lib/jsonld";
// import { cn } from "@/lib/cn";

// T3 — CONTENT-PLAN.md §8. One component for all 6 category hubs (the
// top-level /services variant is ServicesHub.jsx; /dsc is DscHub.jsx —
// its children are T4/T5 pages with a different data shape, built in
// Phase 7 alongside DSC content). `path` resolves to a category via
// nav.js's serviceCategories, never hardcoded here.
//
// ⚠️ 13-08-2026: client preview request (Clinton) — hero only, then
// <ComingSoon /> instead of the rest of the body. Everything below is
// commented out in place, not deleted — see ServiceLeaf.jsx's matching note
// for the same pattern applied sitewide.
export default function CategoryHub({ path }) {
  const category = serviceCategories.find((entry) => entry.path === path);
  if (!category) return null;

  const content = getCategoryContent(category.slug);
  // const children = category.children;
  // const writtenCount = children.filter((child) => getServiceContent(child.slug)).length;

  return (
    <>
      {/*
      <JsonLd
        data={collectionPageJsonLd({
          name: category.label,
          description: content?.meta?.description ?? content?.heroLede,
          path,
        })}
      />
      */}

      <PageHero
        path={path}
        eyebrow="Services"
        h1={category.label}
        lede={content?.heroLede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <ComingSoon />

      {/*
      {content?.intro && (
        <Section surface="light">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Eyebrow>{category.label}</Eyebrow>
                <div className="mt-4 max-w-[68ch] space-y-5 text-body-lg text-ink-500">
                  {content.intro.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  data-surface="dark"
                  className="grain relative overflow-hidden rounded-[var(--radius-md)] bg-ink-900 p-6 md:p-8"
                >
                  <h2 className="font-mono text-eyebrow uppercase">
                    In this category
                  </h2>
                  <ul className="mt-4">
                    {children.map((child) => (
                      <li key={child.slug} className="border-t border-ink-800 first:border-t-0">
                        <Link
                          to={child.path}
                          className="flex min-h-12 items-center justify-between gap-3 rounded-sm text-body-sm text-ink-200 transition-colors hover:text-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                        >
                          {child.label}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section surface="light-alt">
        <Container>
          <Eyebrow>
            {writtenCount === children.length ? "All services" : `${writtenCount} of ${children.length} live now`}
          </Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Every service in {category.label}</h2>

          <div className={cn("mt-8 grid grid-cols-1 gap-5", gridColsFor(children.length))}>
            {children.map((child, index) => {
              const leaf = getServiceContent(child.slug);
              return (
                <Reveal
                  key={child.slug}
                  delay={Math.min(index, 5) * 0.06}
                  className={spanClassFor(children.length, index)}
                >
                  <Link
                    to={child.path}
                    className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="h-full">
                      <h3 className="text-h4 text-ink-600">{child.label}</h3>
                      <p className="mt-2 text-body-sm text-ink-500">
                        {leaf?.lede ?? "This page is being finalised — message us and we'll help you directly."}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
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

      {content?.faqs?.length > 0 && (
        <Section surface="light">
          <Container>
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">About {category.label.toLowerCase()}</h2>
            <Accordion
              className="mt-8 max-w-[76ch]"
              items={content.faqs.map((faq, index) => ({
                id: index,
                question: faq.q,
                answer: faq.a,
              }))}
            />
          </Container>
        </Section>
      )}

      {content?.whyUs?.length > 0 && (
        <Section surface="light-alt">
          <Container>
            <Eyebrow>Why ThinkOrange</Eyebrow>
            <Stagger className="mt-8 grid grid-cols-1 divide-y divide-ink-100 md:grid-cols-3 md:divide-y-0 md:divide-x">
              {content.whyUs.map((point, index) => (
                <p
                  key={index}
                  className="py-4 text-body text-ink-500 first:pt-0 md:px-6 md:py-0 md:first:pl-0"
                >
                  {point}
                </p>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {content?.relatedCategories?.length > 0 && (
        <Section surface="light">
          <Container>
            <Eyebrow>Related categories</Eyebrow>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {content.relatedCategories
                .map((slug) => serviceCategories.find((entry) => entry.slug === slug))
                .filter(Boolean)
                .map((related) => (
                  <Link
                    key={related.slug}
                    to={related.path}
                    className="block rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="h-full">
                      <h3 className="text-h4 text-ink-600">{related.label}</h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                        View category
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Card>
                  </Link>
                ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand />
      */}
    </>
  );
}

// function gridColsFor(count) {
//   if (count <= 2) return "sm:grid-cols-2";
//   if (count === 3) return "sm:grid-cols-2 lg:grid-cols-3";
//   return "sm:grid-cols-2 lg:grid-cols-3";
// }

// function spanClassFor(count, index) {
//   if (count < 4) return "";
//   return index === 0 ? "lg:col-span-2" : "";
// }
