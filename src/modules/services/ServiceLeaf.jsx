import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { Accordion } from "@/components/ui/Accordion";
import { Stagger } from "@/components/motion/Stagger";
import { EnquiryCard } from "@/modules/services/EnquiryCard";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { findRoute, findBySlug, serviceLeavesBySlug, site } from "@/content/nav";
import { getServiceContent } from "@/content/services";
import { cn } from "@/lib/cn";

// T2 — CONTENT-PLAN.md §7. The highest-traffic template on the site: 21
// routes, one component, zero per-slug branching. Every leaf answers the
// same 11 sections in the same order; what varies is only the data pulled
// from src/content/services/<slug>.js.
//
// `path` is the only thing the router supplies (see router.jsx's
// resolveComponent) — the slug is looked up from nav.js's route table so
// this file never hardcodes a path, matching CLAUDE.md's nav.js discipline.
export default function ServiceLeaf({ path }) {
  const route = findRoute(path);
  const slug = route?.slug;
  const leaf = slug ? getServiceContent(slug) : undefined;
  const category = slug ? serviceLeavesBySlug.get(slug)?.category : undefined;

  if (!leaf) {
    return <PendingLeaf path={path} label={route?.label} category={category} />;
  }

  return (
    <>
      <PageHero
        path={path}
        eyebrow={category?.label}
        h1={leaf.h1}
        lede={leaf.lede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <SubNav sections={SUBNAV_SECTIONS} />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow>Overview</Eyebrow>
              <div className="mt-4 max-w-[68ch] space-y-5 text-body-lg text-ink-500">
                {leaf.overview.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:self-start">
              {/* top-32 = header condensed (64px) + the sticky sub-nav bar
                  (~64px) — keeps the card clear of both fixed elements above
                  it rather than sliding underneath them. */}
              <div className="lg:sticky lg:top-32">
                <EnquiryCard serviceLabel={leaf.title} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="who-needs-this" surface="light-alt">
        <Container>
          <Eyebrow>Who needs this</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Is this you?</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {leaf.whoNeedsThis.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <ArcGlyph
                  variant="corner"
                  className="mt-1 h-5 w-5 shrink-0 text-ember-500"
                />
                <p className="text-body text-ink-500">{point}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section id="whats-included" surface="light">
        <Container>
          <Eyebrow>What&rsquo;s included</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Everything handled, end to end</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {leaf.included.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-ember-500"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-h4 text-ink-600">{item.title}</h3>
                  <p className="mt-1 text-body-sm text-ink-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section id="documents-required" surface="light-alt">
        <Container>
          <Eyebrow>Documents required</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">What you&rsquo;ll need to hand over</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {leaf.documents.map((group) => (
              <div key={group.group}>
                <h3 className="text-h4 text-ink-600">{group.group}</h3>
                <ol className="mt-3 space-y-2.5">
                  {group.items.map((item, index) => (
                    <li key={index} className="flex gap-3 text-body-sm text-ink-500">
                      <span className="shrink-0 font-mono tabular-nums text-ember-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          {leaf.documentsNote && (
            <p className="mt-8 max-w-[68ch] text-body-sm text-ink-400">{leaf.documentsNote}</p>
          )}
        </Container>
      </Section>

      <Section id="how-it-works" surface="dark">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">
            {leaf.process.length} steps, start to finish
          </h2>
          <ol className="relative mt-10 space-y-8 border-l border-ink-700 pl-9 md:pl-11">
            {leaf.process.map((step) => (
              <li key={step.step} className="relative">
                <span className="absolute -left-[46px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ember-400 bg-ink-900 font-mono text-body-sm text-ember-300 md:-left-[54px]">
                  {step.step}
                </span>
                <h3 className="text-h4 text-canvas">{step.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-body-sm text-ink-300">{step.desc}</p>
                {step.duration && (
                  <p className="mt-1.5 font-mono text-body-sm text-ember-300">{step.duration}</p>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="timeline-fees" surface="light">
        <Container>
          <Eyebrow>Timeline &amp; fees</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">What to expect, and what it costs</h2>
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-ink-100">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead className="bg-ink-50">
                <tr>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Stage</th>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">
                    Indicative time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {leaf.timeline.map((row) => (
                  <tr key={row.stage}>
                    <td className="px-5 py-4 text-body-sm text-ink-500">{row.stage}</td>
                    <td className="px-5 py-4 font-mono text-body-sm tabular-nums text-ink-600">
                      {row.days}
                    </td>
                  </tr>
                ))}
                {/* fees is ALWAYS null on every leaf (CLAUDE.md non-negotiable) —
                    this row is the one place that fact renders, as a neutral
                    "On request", never a number. */}
                <tr className="bg-ink-50/60">
                  <td className="px-5 py-4 text-body-sm font-medium text-ink-600">
                    Professional fees
                  </td>
                  <td className="px-5 py-4 font-mono text-body-sm tabular-nums text-ink-600">
                    On request
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[68ch] text-body-sm text-ink-400">
            Timelines are indicative and depend on departmental processing and how quickly
            documents come back to us. Message us on WhatsApp for a written quote.
          </p>
        </Container>
      </Section>

      <Section id="faqs" surface="light-alt">
        <Container>
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Common questions</h2>
          <Accordion
            className="mt-8 max-w-[76ch]"
            items={leaf.faqs.map((faq, index) => ({ id: index, question: faq.q, answer: faq.a }))}
          />
        </Container>
        <FaqJsonLd faqs={leaf.faqs} />
      </Section>

      <RelatedServices related={leaf.related} currentSlug={leaf.slug} />

      <CtaBand />
    </>
  );
}

// Anchors to sections 4-9 of CONTENT-PLAN.md §7 (Overview, section 3, is not
// anchored — it's the first thing under the hero, nothing to jump past).
const SUBNAV_SECTIONS = [
  { id: "who-needs-this", label: "Who needs this" },
  { id: "whats-included", label: "What\u2019s included" },
  { id: "documents-required", label: "Documents required" },
  { id: "how-it-works", label: "How it works" },
  { id: "timeline-fees", label: "Timeline & fees" },
  { id: "faqs", label: "FAQs" },
];

/**
 * Sticky sub-nav with scroll-spy — CONTENT-PLAN.md §7 row 2. `top-16` (64px)
 * is Header.jsx's condensed height (`--header-h-condensed`); this bar only
 * ever becomes sticky after the compact hero has scrolled past, by which
 * point the page is already >80px scrolled and the header has condensed, so
 * the two edges always meet exactly with no gap or overlap.
 */
function SubNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstVisible = entries.find((entry) => entry.isIntersecting);
        if (firstVisible) setActiveId(firstVisible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div
      data-surface="light"
      className="sticky top-16 z-30 border-b border-ink-100 bg-canvas"
    >
      <Container>
        <nav aria-label="On this page" className="flex gap-1 overflow-x-auto py-3">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
                activeId === id ? "bg-ember-50 text-ember-700" : "text-ink-500 hover:text-ink-700"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}

function FaqJsonLd({ faqs }) {
  if (!faqs?.length) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  // Structured data, not user content — safe to inject directly.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function RelatedServices({ related, currentSlug }) {
  const items = (related ?? [])
    .map((relatedSlug) => findBySlug(relatedSlug))
    .filter((item) => item && item.slug !== currentSlug);

  if (items.length === 0) return null;

  return (
    <Section surface="light">
      <Container>
        <Eyebrow>Related services</Eyebrow>
        <h2 className="mt-3 text-h2 max-w-[32ch]">You might also need</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => {
            const relatedContent = getServiceContent(item.slug);
            return (
              <Link
                key={item.slug}
                to={item.path}
                className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
              >
                <Card surface="light" className="h-full">
                  <h3 className="text-h4 text-ink-600">{item.label}</h3>
                  {relatedContent?.lede && (
                    <p className="mt-2 text-body-sm text-ink-500">{relatedContent.lede}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/**
 * Graceful fallback for the 4 leaves with no content file yet (itr-filing,
 * tds-compliance, tax-planning-advisory, personal-finance — all blocked per
 * BLOCKERS.md §1). Renders only what's genuinely known: the nav label and
 * breadcrumb, plus a direct route to a human and, where possible, sibling
 * services in the same category that ARE written — nothing invented.
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
      />

      <Section surface="light">
        <Container>
          <div className="max-w-[68ch]">
            <Eyebrow>Content coming soon</Eyebrow>
            <h2 className="mt-3 text-h2">We&rsquo;re still writing this page</h2>
            <p className="mt-4 text-body-lg text-ink-500">
              We don&rsquo;t publish a service page before it&rsquo;s been checked against the
              current law, so this one isn&rsquo;t live yet. Call, WhatsApp or email us and
              we&rsquo;ll help you the same way we would through the page.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button as="a" href={site.phoneHref} variant="secondary">
                <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {site.phoneDisplay}
              </Button>
              <Button as="a" href={site.whatsappHref} target="_blank" rel="noreferrer noopener" variant="secondary">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </div>

          {writtenSiblings.length > 0 && (
            <div className="mt-16">
              <Eyebrow>In the meantime</Eyebrow>
              <h3 className="mt-3 text-h3 max-w-[32ch]">Related services that are live</h3>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                {writtenSiblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    to={sibling.path}
                    className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="h-full">
                      <h4 className="text-h4 text-ink-600">{sibling.label}</h4>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
