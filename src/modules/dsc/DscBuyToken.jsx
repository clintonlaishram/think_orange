import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { dscDriversPage, dscFaqsPage, dscSectionIds } from "@/content/nav";
import { tokenProduct } from "@/content/dsc/token";
import { TokenOrder } from "@/modules/dsc/TokenOrder";
import { collectionPageJsonLd } from "@/lib/jsonld";

// /dsc/buy-token — ORDER A DSC USB TOKEN. NOTHING ELSE.
//
// ⛔ 03-09-2026 (Clinton): "buy token and driver download will be two seperate
// page. in buy token only order token section." This page was carrying five
// sections doing three different jobs. It is one job now, and the other two got
// their own routes:
//
//   /dsc/drivers   the driver, its install steps and its fixes
//   /dsc/faqs      every DSC FAQ, plus the issuance steps and renewal guidance
//
// ⚠️ WHAT WAS REMOVED, AND WHERE IT WENT — check here before assuming content
// was lost:
//   • "Driver & setup"      → /dsc/drivers, unchanged, with its HowTo schema
//   • "Validity & renewal"  → /dsc/faqs, unchanged
//   • "FAQs"                → /dsc/faqs, the same union, unchanged
//   • "How issuance works"  → /dsc/faqs, with its HowTo schema
//   • "About the token"     → NOT MOVED. `tokenProduct.explainers` is still
//     written and exported; it simply no longer renders, because "only order
//     token section" is explicit. ⚠️ Do NOT prune those strings on a later
//     tidy-up — restoring the block is a render-only change, the same
//     discipline `portalGuide` and `afterIssue` already carry.
//
// ⚠️ NO SubNav. One section, and `SubNav` renders nothing below two entries
// anyway — a one-tab bar is decoration, not navigation.
//
// ⚠️ NO `howToJsonLd` HERE ANY MORE. It described the issuance steps, and those
// render on /dsc/faqs now. Schema on a page that does not show what it
// describes is a lie to a crawler.
//
// ⛔ NO PRICE AND NO CHECKOUT — both deliberate, documented at length in
// `content/dsc/token.js` and `TokenOrder.jsx`. Short version: the reference's
// "Rs. 600" is that site's price, and this has no backend or payment provider,
// so ordering routes to WhatsApp with the order written out. Set
// `tokenProduct.price` and the panel turns its own price display on.
//
// ⚠️ SURFACE CADENCE: deep → light → light-alt → ember. Zero consecutive
// repeats and no adjacent dark-family pairs. Re-run the cadence probe after
// adding or reordering ANY section here.
export default function DscBuyToken({ path }) {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: tokenProduct.h1,
            description: tokenProduct.meta.description,
            path,
          }),
        ]}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signatures"
        h1={tokenProduct.h1}
        lede={tokenProduct.lede}
        texture="blueprint"
        textureId="dsc-buy-token-hero"
      />

      <Section id="order" surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Order a token"
                heading="Tell us where to send it"
                // ⚠️ The lede no longer mentions an operating system. That field
                // is gone (it was a support question inside a purchase, and
                // drivers have their own page), so a lede promising it would be
                // describing a form that is not there.
                lede="The token is the same for everyone. Your details and the quantity are all we need to quote and dispatch."
              />
              <ul className="mt-8 space-y-3">
                {tokenProduct.buyingFor.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-500">
                    <Check
                      className="mt-1.5 h-4 w-4 shrink-0 text-ember-600"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* The two pages this one used to contain. A quiet hairline row
                  rather than cards — the three-way split only works if none of
                  the pages starts rebuilding the others. */}
              <div className="mt-10 border-t border-ink-200 pt-6">
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  <li>
                    <PageLink to={dscDriversPage.path} label="Token drivers & setup" />
                  </li>
                  <li>
                    <PageLink to={dscFaqsPage.path} label={dscFaqsPage.label} />
                  </li>
                  <li>
                    <PageLink to={`/dsc#${dscSectionIds.finder}`} label="Which DSC do I need?" />
                  </li>
                </ul>
              </div>
            </div>
            <Reveal delay={0.1} className="lg:col-span-6">
              <TokenOrder />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Ordering more than a handful?"
        lede="Tell us how many and who they are for. Bulk orders are quoted together and dispatched together, rather than one at a time."
      />
    </>
  );
}

function PageLink({ to, label }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 transition-colors hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
    >
      {label}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
