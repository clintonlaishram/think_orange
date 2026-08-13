// import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
// import { ArrowRight, CheckCircle2 } from "lucide-react";
// import { Container } from "@/components/layout/Container";
// import { Section } from "@/components/layout/Section";
// import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
// import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
// import { Accordion } from "@/components/ui/Accordion";
// import { Stagger } from "@/components/motion/Stagger";
// import { CtaBand } from "@/modules/home/sections/CtaBand";
// import { JsonLd } from "@/components/seo/JsonLd";
import { findRoute, site } from "@/content/nav";
// import { findBySlug } from "@/content/nav";
import { getDscProduct } from "@/content/dsc/products";
// import { productJsonLd, faqPageJsonLd } from "@/lib/jsonld";

// T4 — CONTENT-PLAN.md §9. 4 routes, one component, zero per-slug branching —
// same discipline as T2's ServiceLeaf. "Closer to a product page than a
// service page, because the buying decision is short": single column, no
// sticky sidebar card (that's T2's pattern, for a longer research journey),
// WhatsApp is the CTA throughout rather than a multi-field enquiry form.
//
// Authority note (CONTENT-PLAN.md §9): every DSC page leads with the
// eMudhra/SignX partnership — it's the strongest verifiable credential and
// answers the buyer's real question, "is this certificate genuine?"
//
// ⚠️ 13-08-2026: client preview request (Clinton) — hero (incl. its WhatsApp
// CTA + validity note) only, then <ComingSoon /> instead of the rest of the
// body. Everything below is commented out in place, not deleted — see
// ServiceLeaf.jsx's matching note.
export default function DscProduct({ path }) {
  const route = findRoute(path);
  const slug = route?.slug;
  const product = slug ? getDscProduct(slug) : undefined;

  if (!product) return null; // all 4 T4 routes have content; nothing to fall back to.

  const whatsappHref = buildWhatsappHref(product.label);

  return (
    <>
      {/*
      <JsonLd
        data={productJsonLd({
          name: product.label,
          description: product.meta?.description ?? product.lede,
          path,
        })}
      />
      */}

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

      <ComingSoon />

      {/*
      <Section surface="light">
        <Container>
          <Eyebrow>What&rsquo;s used for</Eyebrow>
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
        <Section surface="light-alt">
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

      <Section surface={product.validityOptions ? "light" : "light-alt"}>
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
        <Container>
          <Eyebrow>How to get it</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">
            {product.process.length} steps, start to finish
          </h2>
          <ol className="relative mt-10 space-y-8 border-l border-ink-700 pl-9 md:pl-11">
            {product.process.map((step) => (
              <li key={step.step} className="relative">
                <span className="absolute -left-[46px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ember-400 bg-ink-900 font-mono text-body-sm text-ember-300 md:-left-[54px]">
                  {step.step}
                </span>
                <h3 className="text-h4 text-canvas">{step.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-body-sm text-ink-300">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section surface="light">
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
          <Container>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">Common questions</h2>
            <Accordion
              className="mt-8 max-w-[76ch]"
              items={product.faqs.map((faq, index) => ({ id: index, question: faq.q, answer: faq.a }))}
            />
          </Container>
          <JsonLd data={faqPageJsonLd(product.faqs)} />
        </Section>
      )}

      <CtaBand />
      */}
    </>
  );
}

function buildWhatsappHref(productLabel) {
  const text = `Hi ThinkOrange, I'd like to enquire about ${productLabel}.`;
  return `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
}

// function DriverSupport({ driverSlugs }) {
//   const drivers = (driverSlugs ?? []).map((slug) => findBySlug(slug)).filter(Boolean);
//   if (drivers.length === 0) return null;
//
//   return (
//     <Section surface="light-alt">
//       <Container>
//         <Eyebrow>Driver support</Eyebrow>
//         <h2 className="mt-3 text-h2 max-w-[32ch]">Get your token working</h2>
//         <p className="mt-4 max-w-[68ch] text-body text-ink-500">
//           Every certificate ships on a USB token, which needs its own driver installed before
//           your browser or portal can see it.
//         </p>
//         <Stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {drivers.map((driver) => (
//             <Link
//               key={driver.slug}
//               to={driver.path}
//               className="flex min-h-12 items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-4 py-3 text-body-sm font-medium text-ink-600 transition-colors hover:border-ember-200 hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
//             >
//               {driver.label}
//               <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
//             </Link>
//           ))}
//         </Stagger>
//       </Container>
//     </Section>
//   );
// }
