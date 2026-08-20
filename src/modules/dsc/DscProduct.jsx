import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Info,
  KeyRound,
  Layers,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { SubNav } from "@/components/layout/SubNav";
import { StepFlow } from "@/components/ui/StepFlow";
import { ArcRings } from "@/components/ui/ArcRings";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { findRoute, findBySlug, site } from "@/content/nav";
import { getDscProduct } from "@/content/dsc/products";
import { dscGroupForSlug } from "@/content/dsc/groups";
import { productJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { dscEnquiryHref } from "@/lib/whatsapp";
import { IconBrandWhatsapp } from "@tabler/icons-react";

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
// --- 20-08-2026, DSC premium pass -----------------------------------------
// The page now carries its GROUP's background motif, resolved from
// `dscGroupForSlug` (content/dsc/groups.js) rather than from any per-slug
// branch here — a Class 3 certificate page shows the guilloché the
// Certificates group section showed, an Aadhaar eSign page shows the
// signature strokes, and a token page shows the circuit grid. Membership
// comes from `dscPanelColumns` in nav.js, so moving an item between menu
// columns moves its background with it and there is nothing here to update.
//
// The group's eyebrow replaces the hardcoded "Digital Signature Certificates"
// string, which was wrong on `aadhaar-esign` (an eSign product, not a
// certificate) and on `buy-tokens` (a token, not a certificate).
// The variables the Pricing paragraph already names, as a row. No amounts, no
// ranges, no "starting from" — `fees` is null on every DSC product and that is
// deliberate, not a gap (CLAUDE.md). Naming what a quote depends on is honest;
// implying a number is not.
const PRICING_FACTORS = [
  {
    icon: CalendarClock,
    label: "Validity period",
    note: "A longer certificate costs more up front and less per year.",
  },
  {
    icon: Layers,
    label: "Token bundling",
    note: "Whether a USB token is included or you already have a working one.",
  },
  {
    icon: Users,
    label: "Partner or bulk rate",
    note: "Volume rates for chartered accountants, practitioners and channel partners.",
  },
];

// The three rows of the "What you're issued" spec panel. Every value comes
// from existing product content — see `specValue`. Declared out here so the
// row set is one list to read rather than three branches in the JSX, and so a
// product missing a field drops that row instead of rendering an empty one.
const SPEC_ROWS = [
  { key: "certificate", icon: ShieldCheck, label: "Certificate" },
  { key: "validity", icon: CalendarClock, label: "Validity" },
  { key: "token", icon: KeyRound, label: "Token" },
];

function specValue(key, product) {
  if (key === "certificate") {
    return product.label ? <p className="text-h4 text-canvas">{product.label}</p> : null;
  }
  if (key === "validity") {
    if (!product.validityOptions?.length) return null;
    return (
      // Hairline-divided values rather than pills: a pill beside body copy
      // reads as a button, and several of these panels sit next to a real CTA.
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
        {product.validityOptions.map((option, index) => (
          <span
            key={option}
            className={
              "font-mono text-h4 text-canvas" +
              (index > 0 ? " border-l border-ink-700 pl-6 md:pl-8" : "")
            }
          >
            {option}
          </span>
        ))}
      </div>
    );
  }
  if (key === "token") {
    return product.tokenNote ? (
      <p className="max-w-[64ch] text-body text-ink-100">{product.tokenNote}</p>
    ) : null;
  }
  return null;
}

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
  if (!product) return <PendingProduct path={path} label={route?.label} slug={slug} />;

  const group = dscGroupForSlug(slug);
  const whatsappHref = dscEnquiryHref(product.label);

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
        eyebrow={group?.eyebrow ?? "Digital Signature Certificates"}
        h1={product.h1}
        lede={product.lede}
        texture={group?.texture}
        textureId={group ? `dsc-product-hero-${group.key}` : undefined}
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

      {/* NO texture here — 20-08-2026 revision. The first pass painted the
          group motif in the hero AND on this section, and Clinton's note was
          that the design "is repeated to hero section and next page". A motif
          appears ONCE per page: on a product page that is the hero. Depth on
          this section comes from type and hairlines, which is what the
          homepage's own light sections do (WhoWeWorkWith, WhyThinkOrange). */}
      <Section id="what-its-for" surface="light">
        <Container>
          {/* Headings reveal; the checklist below already staggers. Body copy
              stays static per CLAUDE.md — a heading is not body copy, and the
              homepage animates its section headings the same way. */}
          <Reveal>
            <Eyebrow>What it&rsquo;s used for</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">Where you&rsquo;ll actually use it</h2>
          </Reveal>
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
            <Reveal>
              <Eyebrow>Validity &amp; token</Eyebrow>
              <h2 className="mt-3 text-h2 max-w-[32ch]">What you&rsquo;re issued</h2>
            </Reveal>
            {/* 20-08-2026 (second pass). Clinton: "for token and validity it
                look so empty." It was: three tiny icon cards and a panel
                occupying the top 220px of a full `section-pad` band, leaving a
                lake of canvas underneath. The cause is that this section only
                has TWO data points — 2-3 validity strings and one token
                sentence — so spreading them across an 1800px container can
                only ever look sparse.

                Fixed by building for the data rather than against it: ONE
                full-width spec panel, as a real <dl>, carrying three rows that
                all come from existing product content —
                  Certificate  → product.label
                  Validity     → product.validityOptions
                  Token        → product.tokenNote
                Nothing invented; `product.label` was simply not being shown
                here before, and it is the most useful line of the three.
                Three hairline-separated rows read as one considered object
                where four small boxes read as an unfinished grid. */}
            <Reveal
              data-surface="dark"
              className="panel-dark grain relative mt-8 overflow-hidden rounded-[var(--radius-lg)] px-6 py-2 md:px-10 md:py-4"
            >
              <ArcRings
                rings={[
                  { r: 176, width: 16, opacity: 0.14 },
                  { r: 132, width: 12, opacity: 0.09 },
                ]}
                color="var(--color-ink-600)"
                gradientId="dsc-product-validity-arc"
                svgClassName="-right-24 -top-32 h-[420px] w-[420px] md:-right-16 md:-top-40 md:h-[560px] md:w-[560px]"
              />
              <dl className="relative divide-y divide-ink-700">
                {SPEC_ROWS.map(({ key, icon: Icon, label }) => {
                  const value = specValue(key, product);
                  if (!value) return null;
                  return (
                    <div
                      key={key}
                      className="grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:gap-8 md:py-7"
                    >
                      <dt className="flex items-center gap-3 md:col-span-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ember-400/60">
                          <Icon
                            className="h-4 w-4 text-ember-400"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember-200">
                          {label}
                        </span>
                      </dt>
                      <dd className="md:col-span-8">{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section id="documents-required" surface={product.validityOptions ? "light" : "light-alt"}>
        <Container>
          <Reveal>
            <Eyebrow>Documents required</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">What you&rsquo;ll need to hand over</h2>
          </Reveal>
          {/* 20-08-2026 (second pass). Clinton: this section looked empty too.
              It was a full-width card holding 2-5 short strings in a 2x2 grid,
              so most of an 1800px card was blank, with the verification note
              stranded underneath it.

              Now a 7/5 pair: the checklist is ONE column of hairline-separated
              rows (which reads as a list of things to gather, and gets taller
              rather than sparser as a product needs more documents), and the
              verification note becomes a real panel beside it instead of a
              footnote below. Both columns carry weight, so the section has no
              dead half.

              The CARD reveals as one block, but the LIST ITEMS deliberately do
              not stagger. That is the distinction CLAUDE.md's "body copy never
              animates" rule is protecting: a one-shot fade-up of a container
              before you reach it is fine, five lines resolving one by one while
              you are trying to copy them down is not. */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <Reveal className="card-premium rounded-[var(--radius-lg)] border border-ink-100 bg-white px-6 py-2 md:px-8 md:py-3 lg:col-span-7">
              <ol className="divide-y divide-ink-100">
                {product.documents.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 py-4">
                    {/* ink-400, NOT ink-300 — measured. These are visible
                        ordinals, not decoration, so they carry the 4.5:1
                        floor: ink-300 on this card sampled at 3.40-3.49:1,
                        ink-400 is 7.2:1. */}
                    <span className="mt-0.5 shrink-0 font-mono text-body-sm tabular-nums text-ink-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-ink-600">{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {product.verificationNote && (
              <Reveal
                delay={0.12}
                data-surface="dark"
                className="panel-dark grain relative self-start overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8 lg:col-span-5"
              >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ember-400/60">
                  <Info className="h-5 w-5 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ember-200">
                  Before you apply
                </h3>
                <p className="relative mt-3 text-body text-ink-100">{product.verificationNote}</p>
              </Reveal>
            )}
          </div>
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
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">On request</h2>
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-4 text-body-base sm:text-body-lg text-ink-500 flex sm:flex-row flex-col justify-between gap-4">
           <p className="max-w-[68ch]">
             Pricing depends on validity period, token bundling and any partner or bulk rate that
            applies — message us on WhatsApp for a written quote before you order.
            </p>
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="tertiary">
              <IconBrandWhatsapp className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Enquire on WhatsApp
            </Button>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
          </Reveal>
          {/* The three things that actually move the number, as a row rather
              than buried in the sentence above. These are NOT prices and not a
              fee table — `fees` is null on every product and stays that way
              (CLAUDE.md non-negotiables); each tile just names a variable the
              paragraph already names. */}
          <Stagger className="mt-8 grid grid-cols-1 gap-6 border-t border-ink-100 pt-8 sm:grid-cols-3">
            {PRICING_FACTORS.map(({ icon: Icon, label, note }) => (
              <div key={label} className="flex gap-4">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-ember-600"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-body font-medium text-ink-600">{label}</p>
                  <p className="mt-1 text-body-sm text-ink-500">{note}</p>
                </div>
              </div>
            ))}
          </Stagger>
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

/**
 * Graceful fallback for a T4 slug with no content file yet — mirrors
 * ServiceLeaf's `PendingLeaf`. Nothing invented: just the nav label, a
 * breadcrumb, and a direct route to a human.
 */
function PendingProduct({ path, label, slug }) {
  const group = dscGroupForSlug(slug);
  return (
    <>
      <PageHero
        path={path}
        eyebrow={group?.eyebrow ?? "Digital Signature Certificates"}
        texture={group?.texture}
        textureId={group ? `dsc-pending-hero-${group.key}` : undefined}
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
                href={dscEnquiryHref(label ?? "a DSC certificate")}
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
        <Reveal>
          <Eyebrow>Driver support</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Get your token working</h2>
        </Reveal>
        <Reveal as="p" delay={0.08} className="mt-4 max-w-[68ch] text-body text-ink-500">
          Every certificate ships on a USB token, which needs its own driver installed before
          your browser or portal can see it.
        </Reveal>
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
