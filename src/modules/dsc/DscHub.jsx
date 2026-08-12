import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { dscProducts as dscProductNav, dscDocumentsPage, dscDriversHub } from "@/content/nav";
import { getDscProduct } from "@/content/dsc/products";
import { dscHubContent } from "@/content/dsc/hub-content";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

// T3 variant for /dsc — CONTENT-PLAN.md §4/§9. Separate from CategoryHub
// (see that file's own comment) because /dsc's children are a mix of T4
// product pages and T5 utility pages, not a uniform list of service leaves —
// a different data shape, not a different design language. Visual grammar
// (compact hero, count-aware bento grid, FAQ accordion, hairline why-us row,
// CtaBand) deliberately matches CategoryHub so all 8 T3 hubs read as one
// template family even though this one is its own component.
export default function DscHub({ path }) {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "Digital Signature Certificates",
          description: dscHubContent.meta?.description ?? dscHubContent.heroLede,
          path,
        })}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signature Certificates"
        h1="Digital Signature Certificates"
        lede={dscHubContent.heroLede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section surface="light">
        <Container>
          <div className="max-w-[68ch] space-y-5 text-body-lg text-ink-500">
            {dscHubContent.intro.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="light-alt">
        <Container>
          <Eyebrow>Certificates &amp; tokens</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Choose the right certificate</h2>
          {/* Count-aware bento grid, same rule CategoryHub uses for 4+
              children (CONTENT-PLAN.md §8 row 3) — kept visually identical
              across every T3 hub even though the data source differs here. */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dscProductNav.map((product, index) => {
              const content = getDscProduct(product.slug);
              return (
                <Reveal
                  key={product.slug}
                  delay={Math.min(index, 5) * 0.06}
                  className={index === 0 ? "lg:col-span-2" : undefined}
                >
                  <Link
                    to={product.path}
                    className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="h-full">
                      <h3 className="text-h4 text-ink-600">{product.label}</h3>
                      <p className="mt-2 text-body-sm text-ink-500">{content?.lede}</p>
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
          <p className="mt-6 max-w-[68ch] text-body-sm text-ink-400">
            Pricing on request for every certificate and token — message us on WhatsApp for a
            written quote.
          </p>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <Eyebrow>Documents &amp; drivers</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Not sure what you need, or already have a token?</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Link
              to={dscDocumentsPage.path}
              className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              <Card surface="light" className="h-full">
                <h3 className="text-h4 text-ink-600">{dscDocumentsPage.label}</h3>
                <p className="mt-2 text-body-sm text-ink-500">
                  What to have ready before you apply, grouped by certificate type.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                  View documents
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Card>
            </Link>
            <Link
              to={dscDriversHub.path}
              className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              <Card surface="light" className="h-full">
                <h3 className="text-h4 text-ink-600">{dscDriversHub.label}</h3>
                <p className="mt-2 text-body-sm text-ink-500">
                  {dscDriversHub.children.map((d) => d.label).join(" · ")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                  Get drivers
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Card>
            </Link>
          </Stagger>
        </Container>
      </Section>

      <Section surface="light-alt">
        <Container>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">About our DSC services</h2>
          <Accordion
            className="mt-8 max-w-[76ch]"
            items={dscHubContent.faqs.map((faq, index) => ({
              id: index,
              question: faq.q,
              answer: faq.a,
            }))}
          />
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <Eyebrow>Why ThinkOrange</Eyebrow>
          <Stagger className="mt-8 grid grid-cols-1 divide-y divide-ink-100 md:grid-cols-3 md:divide-y-0 md:divide-x">
            {dscHubContent.whyUs.map((point, index) => (
              <p
                key={index}
                className={cn(
                  "py-4 text-body text-ink-500 first:pt-0 md:px-6 md:py-0 md:first:pl-0"
                )}
              >
                {point}
              </p>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
