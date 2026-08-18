import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { SubNav } from "@/components/layout/SubNav";
import { StepFlow } from "@/components/ui/StepFlow";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { findRoute, findBySlug, site } from "@/content/nav";
import { getDscProduct } from "@/content/dsc/products";
import { productJsonLd, faqPageJsonLd } from "@/lib/jsonld";

// T4 — CONTENT-PLAN.md §9. 4 routes, one component, zero per-slug branching —
// same discipline as T2's ServiceLeaf. "Closer to a product page than a
// service page, because the buying decision is short": single column, no
// sticky sidebar card (that's T2's pattern, for a longer research journey),
// WhatsApp is the CTA throughout rather than a multi-field enquiry form.
//
// Authority note (CONTENT-PLAN.md §9): every DSC page leads with the
// eMudhra/SignX partnership — it's the strongest verifiable credential and
// answers the buyer's real question, "is this certificate genuine?"
export default function DscProduct({ path }) {
  const route = findRoute(path);
  const slug = route?.slug;
  const product = slug ? getDscProduct(slug) : undefined;

  // 17-08-2026: the DSC menu restructure added product slugs (combo-dsc,
  // dsc-renewal-reissue, aadhaar-esign) with no content file yet. This used
  // to be `return null` — a genuinely blank page, since all 4 pre-existing
  // T4 routes had content and an unwritten one never happened in practice.
  // Same discipline as ServiceLeaf's PendingLeaf: nothing invented, no dead
  // ends, a direct route to a human.
  if (!product) return <PendingProduct path={path} label={route?.label} />;

  const whatsappHref = buildWhatsappHref(product.label);

  // Built from what this product ACTUALLY renders, not from a fixed list:
  // `validityOptions: null` (aadhaar-esign) skips its whole section, and a
  // product can ship without FAQs. A tab pointing at a section that never
  // rendered scrolls nowhere and never lights up under the scroll-spy.
  const subNavSections = [
    { id: "what-its-for", label: "What it\u2019s for" },
    ...(product.validityOptions ? [{ id: "validity-token", label: "Validity & token" }] : []),
    { id: "documents-required", label: "Documents required" },
    { id: "how-to-get-it", label: "How to get it" },
    { id: "pricing", label: "Pricing" },
    ...(product.faqs?.length > 0 ? [{ id: "faqs", label: "FAQs" }] : []),
  ];

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: product.label,
          description: product.meta?.description ?? product.lede,
          path,
        })}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signature Certificates"
        h1={product.h1}
        lede={product.lede}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="primary">
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Enquire on WhatsApp
          </Button>
          {product.validityOptions && (
            <p className="font-mono text-body-sm text-ember-300">
              Validity: {product.validityOptions.join(" · ")}
            </p>
          )}
        </div>
      </PageHero>

      <SubNav sections={subNavSections} />

      <Section id="what-its-for" surface="light">
        <Container>
          <Eyebrow>What it&rsquo;s used for</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Where you&rsquo;ll actually use it</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
            {product.usedFor.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-ember-500"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-body text-ink-500">{point}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      {product.validityOptions && (
        <Section id="validity-token" surface="light-alt">
          <Container>
            <Eyebrow>Validity &amp; token</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">What you&rsquo;re issued</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.validityOptions.map((option) => (
                <span
                  key={option}
                  className="rounded-full border border-ink-100 bg-white px-4 py-2 font-mono text-body-sm text-ink-600"
                >
                  {option}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-[68ch] text-body text-ink-500">{product.tokenNote}</p>
          </Container>
        </Section>
      )}

      <Section id="documents-required" surface={product.validityOptions ? "light" : "light-alt"}>
        <Container>
          <Eyebrow>Documents required</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">What you&rsquo;ll need to hand over</h2>
          <ol className="mt-8 max-w-[68ch] space-y-2.5">
            {product.documents.map((item, index) => (
              <li key={index} className="flex gap-3 text-body text-ink-500">
                <span className="shrink-0 font-mono tabular-nums text-ember-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
          {product.verificationNote && (
            <div className="mt-6 max-w-[68ch] rounded-[var(--radius-md)] border border-ember-200 bg-ember-50 p-5">
              <p className="text-body-sm text-ink-600">{product.verificationNote}</p>
            </div>
          )}
        </Container>
      </Section>

      <Section id="how-to-get-it" surface="dark">
        <StepFlow
          eyebrow="How to get it"
          heading={`${product.process.length} steps, start to finish`}
          intro="From your first message to a working certificate on a token."
          surface="dark"
          steps={product.process}
        />
      </Section>

      <Section id="pricing" surface="light">
        <Container>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">On request</h2>
          <p className="mt-4 max-w-[68ch] text-body-lg text-ink-500">
            Pricing depends on validity period, token bundling and any partner or bulk rate that
            applies — message us on WhatsApp for a written quote before you order.
          </p>
          <div className="mt-6">
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="secondary">
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Enquire on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>

      <DriverSupport driverSlugs={product.driverSlugs} />

      {product.faqs?.length > 0 && (
        <Section id="faqs" surface="light">
          <FaqSection
            eyebrow="FAQs"
            heading="Common questions"
            intro={`What buyers ask about the ${product.label} before ordering.`}
            items={product.faqs.map((faq, index) => ({ id: index, question: faq.q, answer: faq.a }))}
          />
          <JsonLd data={faqPageJsonLd(product.faqs)} />
        </Section>
      )}

      <CtaBand />
    </>
  );
}

function buildWhatsappHref(productLabel) {
  const text = `Hi ThinkOrange, I'd like to enquire about ${productLabel}.`;
  return `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
}

/**
 * Graceful fallback for a T4 slug with no content file yet — mirrors
 * ServiceLeaf's `PendingLeaf`. Nothing invented: just the nav label, a
 * breadcrumb, and a direct route to a human.
 */
function PendingProduct({ path, label }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Digital Signature Certificates"
        h1={label ?? "Certificate"}
        lede="This page is still being written. Message us directly and we'll help you the same way."
        cta={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section surface="light">
        <Container>
          <div className="max-w-[68ch]">
            <Eyebrow>Content coming soon</Eyebrow>
            <h2 className="mt-3 text-h2">We&rsquo;re still writing this page</h2>
            <p className="mt-4 text-body-lg text-ink-500">
              Call, WhatsApp or email us and we&rsquo;ll help you the same way we would through
              the page.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button as="a" href={site.phoneHref} variant="secondary">
                <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {site.phoneDisplay}
              </Button>
              <Button
                as="a"
                href={buildWhatsappHref(label ?? "a DSC certificate")}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

function DriverSupport({ driverSlugs }) {
  const drivers = (driverSlugs ?? []).map((slug) => findBySlug(slug)).filter(Boolean);
  if (drivers.length === 0) return null;

  return (
    <Section surface="light-alt">
      <Container>
        <Eyebrow>Driver support</Eyebrow>
        <h2 className="mt-3 text-h2 max-w-[32ch]">Get your token working</h2>
        <p className="mt-4 max-w-[68ch] text-body text-ink-500">
          Every certificate ships on a USB token, which needs its own driver installed before
          your browser or portal can see it.
        </p>
        <Stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {drivers.map((driver) => (
            <Link
              key={driver.slug}
              to={driver.path}
              className="flex min-h-12 items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-4 py-3 text-body-sm font-medium text-ink-600 transition-colors hover:border-ember-200 hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
            >
              {driver.label}
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
