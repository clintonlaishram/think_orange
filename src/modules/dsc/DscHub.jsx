import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { FaqSection } from "@/components/ui/FaqSection";
import { SubNav } from "@/components/layout/SubNav";
import { ProductShot } from "@/components/ui/ProductShot";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  dscPanelColumns,
  dscPartnerPromo,
  dscDocumentsPage,
  dscValidityFaqsPage,
  dscEsignVsDscPage,
  dscDriversHub,
} from "@/content/nav";
import { getDscProduct } from "@/content/dsc/products";
import { dscHubContent } from "@/content/dsc/hub-content";
import { dscValidityRenewalContent } from "@/content/dsc/validity-renewal-faqs";
import { esignOrDscContent } from "@/content/dsc/esign-or-dsc";
import { Button } from "@/components/ui/Button";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

// --- Presentation copy for the three menu-derived groups -------------------
// Keyed by `dscPanelColumns`' own labels (nav.js). A column with no entry
// here falls back to its menu label as the heading, so adding a fourth
// column to the menu still renders a complete section rather than a blank
// one — it just reads as the menu's own wording until copy is written.
const COLUMN_EYEBROWS = {
  "Digital Signature Certificates": "Certificates",
  "Tokens & Resources": "Tokens & resources",
  "eSign Solutions": "eSign",
};

const COLUMN_HEADINGS = {
  "Digital Signature Certificates": "Choose the right certificate",
  "Tokens & Resources": "Already have a token, or not sure what you need?",
  "eSign Solutions": "Signing without a token",
};

const COLUMN_LEDES = {
  "Tokens & Resources":
    "Buy a replacement token, check what documents to gather before you apply, or get the driver your existing token needs.",
  "eSign Solutions":
    "Aadhaar-based signing for contracts and agreements — and where it does not stand in for a Class 3 certificate.",
};

const DOCUMENTS_TEASER =
  "What to have ready before you apply, grouped by certificate type.";

/**
 * A card's teaser line, resolved from the linked page's OWN content file
 * rather than restated here — the same "select by reference" discipline the
 * Documents Required page and the homepage FAQ row already follow, so an
 * edit to a product's or a utility page's lede can never leave this hub
 * quietly describing the old version. Returns null for a page with no
 * content file yet (the card still renders, just without a teaser).
 */
function itemTeaser(item) {
  const product = getDscProduct(item.slug);
  if (product?.lede) return product.lede;
  if (item.slug === dscValidityFaqsPage.slug) return dscValidityRenewalContent.heroLede;
  if (item.slug === dscEsignVsDscPage.slug) return esignOrDscContent.heroLede;
  if (item.slug === dscDriversHub.slug)
    return dscDriversHub.children.map((driver) => driver.label).join(" · ");
  if (item.slug === dscDocumentsPage.slug) return DOCUMENTS_TEASER;
  return null;
}

// 19-08-2026 (Clinton): eSign is shown BEFORE Tokens & Resources on this page.
// A display-order override only — `dscPanelColumns` (nav.js) keeps the mega
// panel's own left-to-right order untouched, since the menu's grouping is the
// client's approved layout there. Surfaces are still assigned by RENDERED
// position (light-alt / light / light-alt), not by column identity, so
// reordering moves the content and leaves the page's colour rhythm exactly as
// it was. A column not named here keeps its menu-relative position after the
// ones that are, so a future menu column still renders.
const COLUMN_DISPLAY_ORDER = [
  "Digital Signature Certificates",
  "eSign Solutions",
  "Tokens & Resources",
];

function orderColumnsForDisplay(columns) {
  const rank = (column) => {
    const index = COLUMN_DISPLAY_ORDER.indexOf(column.label);
    return index === -1 ? COLUMN_DISPLAY_ORDER.length : index;
  };
  // Stable sort — equal ranks (i.e. unlisted columns) keep menu order.
  return [...columns].sort((a, b) => rank(a) - rank(b));
}

// T3 variant for /dsc — CONTENT-PLAN.md §4/§9. Separate from CategoryHub
// (see that file's own comment) because /dsc's children are a mix of T4
// product pages and T5 utility pages, not a uniform list of service leaves —
// a different data shape, not a different design language. Visual grammar
// (compact hero, count-aware bento grid, FAQ accordion, hairline why-us row,
// CtaBand) deliberately matches CategoryHub so all 8 T3 hubs read as one
// template family even though this one is its own component.
/** One derivation of a column's section id, shared by the bar and the sections. */
const groupId = (label) =>
  "group-" + label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function DscHub({ path }) {
  // The three group sections above alternate light-alt/light, so which
  // surface the FAQ row may use depends on how many groups the menu has —
  // derived rather than hardcoded, or adding a menu column would silently
  // put two identical surfaces back to back (DESIGN.md §11.1's alternation).
  const columns = orderColumnsForDisplay(dscPanelColumns);
  const faqSurface = columns.length % 2 === 0 ? "light-alt" : "light";
  const whySurface = faqSurface === "light" ? "light-alt" : "light";

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

      {/* Built from the SAME `columns` array the groups below render from, so
          a nav.js change that adds or reorders a DSC menu column updates the
          bar, the sections and the menu together. `groupId` is the single
          place the id is derived, so a tab can never point at a section id
          that was spelled differently. */}
      <SubNav
        sections={[
          ...columns.map((column) => ({
            id: groupId(column.label),
            label: COLUMN_EYEBROWS[column.label] ?? column.label,
          })),
          ...(dscHubContent.faqs?.length > 0 ? [{ id: "faqs", label: "FAQs" }] : []),
        ]}
      />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 max-w-[68ch] space-y-5 text-body-lg text-ink-500">
              {dscHubContent.intro.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
            <div className="lg:col-span-5">
              <ProductShot
                src="/images/drivers/dsc-card.png"
                alt="A HYP2003 USB cryptographic token, the device a Class 3 certificate is issued on."
                width={1143}
                height={370}
                caption="Every certificate ships on a token"
                gradientId="dschub-shot-arc"
                // Tighter padding than the default here: this asset is a wide,
                // flat object (1143×370) rather than a tall scene, so the
                // component's default vertical padding left it swimming in a
                // panel twice its height. twMerge lets the caller win.
                className="px-5 py-9 md:px-7 md:py-11"
                glowClassName="h-[72%] w-[95%]"
                imgClassName="max-w-[520px]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 19-08-2026: these three sections MIRROR the DSC mega panel's own
          grouping and are driven by the same `dscPanelColumns` export
          (nav.js) the panel renders from — so "View all DSC services" can
          never present a different structure or membership from the menu it's
          reached through. ORDER is the one deliberate exception, see
          `COLUMN_DISPLAY_ORDER` above (eSign before Tokens & Resources here). Before this, the hub showed one flat
          7-card grid of every product (tokens and Aadhaar eSign included)
          plus a separate 4-card resources row, which stopped matching the
          menu the moment the 17-08-2026 restructure split certificates,
          tokens/resources and eSign into three named columns.
          Adding a column or moving an item in nav.js updates both surfaces.
          Teasers resolve from each page's OWN content file (see
          `itemTeaser`), never restated here. */}
      {columns.map((column, columnIndex) => (
        <Section
          key={column.label}
          id={groupId(column.label)}
          // Alternates light-alt / light down the page, so the three groups
          // stay visually separated without a fourth surface value.
          surface={columnIndex % 2 === 0 ? "light-alt" : "light"}
        >
          <Container>
            <Eyebrow>{COLUMN_EYEBROWS[column.label] ?? "Services"}</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[32ch]">
              {COLUMN_HEADINGS[column.label] ?? column.label}
            </h2>
            {COLUMN_LEDES[column.label] && (
              <p className="mt-3 max-w-[68ch] text-body-lg text-ink-500">
                {COLUMN_LEDES[column.label]}
              </p>
            )}

            {/* Count-aware grid, same rule CategoryHub uses (CONTENT-PLAN.md
                §8 row 3): 2 items → 2 columns, 3 → 3, 4+ → 3 columns with the
                first card spanning two tracks. Kept identical across every T3
                hub even though the data source differs here. */}
            <div
              className={cn(
                "mt-8 grid grid-cols-1 gap-5",
                column.items.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {column.items.map((item, index) => (
                <Reveal
                  key={item.path}
                  delay={Math.min(index, 5) * 0.06}
                  className={
                    column.items.length >= 4 && index === 0 ? "lg:col-span-2" : undefined
                  }
                >
                  <Link
                    to={item.path}
                    className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Card surface="light" className="h-full">
                      <h3 className="text-h4 text-ink-600">{item.label}</h3>
                      {/* Per-item note — currently only "Buy DSC Tokens"'
                          token-brand subtitle, the same string the mega
                          panel renders under that link. Mono/muted, matching
                          the panel's register. */}
                      {item.note && (
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400">
                          {item.note}
                        </p>
                      )}
                      <p className="mt-2 text-body-sm text-ink-500">{itemTeaser(item)}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>

            {columnIndex === 0 && (
              <p className="mt-6 max-w-[68ch] text-body-sm text-ink-400">
                Pricing on request for every certificate and token — message us on WhatsApp for a
                written quote.
              </p>
            )}
          </Container>
        </Section>
      ))}

      <Section id="faqs" surface={faqSurface}>
        <FaqSection
          heading="About our DSC services"
          intro="What people ask before buying a certificate — validity, tokens, documents and what happens at renewal."
          items={dscHubContent.faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </Section>

      <Section surface={whySurface}>
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

          {/* Partner Programme — added 19-08-2026 for the same reason the
              three groups above are menu-derived: the 17-08-2026 restructure
              pulled "Partner With Us" out of the navbar entirely and moved it
              INTO the DSC panel as a promo card, so the DSC hub is now the
              page that has to carry it too. Content comes from that card's
              own `dscPartnerPromo` (nav.js), so the two can't drift.
              `.panel-dark` + `data-surface="dark"` is the established pattern
              for a dark panel on a light section (PartnerProgramme, and the
              mega panel's own PanelPromo) — deliberately not `.card-dark`,
              since this panel is not itself one big link. The attribute is
              load-bearing: without it every `var(--surface-*)` inside
              resolves to the light-section values. `secondaryLabel`
              ("Partner login") is deliberately NOT rendered here — it has no
              backing portal, and the mega panel's own copy of it is
              commented out for that reason. */}
          <div
            data-surface="dark"
            className="panel-dark grain relative mt-12 overflow-hidden rounded-[var(--radius-lg)] p-8 md:p-10"
          >
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[52ch]">
                <h3 className="text-h3 text-canvas">{dscPartnerPromo.heading}</h3>
                <p className="mt-3 text-body text-ink-200">{dscPartnerPromo.description}</p>
              </div>
              <Button as={Link} to={dscPartnerPromo.cta.path} variant="primary" className="shrink-0">
                {dscPartnerPromo.cta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
