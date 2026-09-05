import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { SubNav } from "@/components/layout/SubNav";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { dscEsignPage } from "@/content/nav";
import { dscSectionIds } from "@/content/nav";
import { esignOrDscContent } from "@/content/dsc/esign-or-dsc";
import { faqPageJsonLd } from "@/lib/jsonld";
import { dscEnquiryHref } from "@/lib/whatsapp";

// /dsc/esign-or-dsc — eSign or DSC, which do you need.
//
// ⛔ BODY COMMENTED OUT, COMING SOON INSTEAD — 04-09-2026 (Clinton: "in esign,
// comment out section and keep as coming soon"). The real PageHero still
// renders (breadcrumb, H1, lede), then `<ComingSoon />` in place of the three
// body sections and the CTA band. Same discipline as the 13-08-2026 client
// preview: the body is commented out IN PLACE, not deleted, so uncommenting
// the JSX below plus its imports at the top restores the page exactly.
//
// Two things went out WITH the sections, deliberately, and must come back
// together with them:
//   1. **The `SubNav`.** Its three tabs pointed at #comparison, #which-one and
//      #faqs — ids that no longer exist on the page. `scripts/prerender.mjs`'s
//      `assertNoDanglingFragments` gate FAILS THE BUILD on exactly that, which
//      is the point: a tab that scrolls nowhere is worse than no tab.
//   2. **The `FAQPage` JSON-LD.** Structured data must never assert content a
//      reader cannot see on the page — the same reason every per-route schema
//      was commented out alongside its section during the client preview.
//
// The rest of this file's original notes still apply once it is restored:
//
//  1. **It is its own module, not a T5 branch.** T5 resolves unconditionally
//     to DscBuyToken (routeComponents.js) since the DSC tree collapsed to two
//     pages, so reusing T5 here would have rendered the Buy Token page under
//     this URL. This page is T11.
//  2. **`dscGroupForSlug` is gone** — content/dsc/groups.js was deleted with
//     the old menu. The hero's texture is named directly. `signature` is the
//     right variant on its own merits, not just because it is what the eSign
//     group used to resolve to: it is the one motif that means "a signature
//     applied", which is what this page is about.
//  3. ⚠️ **The old "Aadhaar eSign" button is GONE, and must stay gone.** It
//     pointed at `/dsc/aadhaar-esign`, a T4 product page whose content was
//     DELETED on 02-09-2026 along with the entire T4 family. Restoring that
//     button means restoring a page and its content first — it is not a
//     one-line change, and a button to a route that does not exist is a 404 in
//     the middle of the one section whose whole job is to send a reader
//     somewhere. The Class 3 button now points at /dsc's finder, which is what
//     actually resolves "which certificate do I need" today.
//
// No `Reveal` on the comparison table: tables never animate (CLAUDE.md), and
// this one is the page's reference content.
export function DscEsign({ path = dscEsignPage.path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Digital Signatures"
        h1={dscEsignPage.label}
        lede={esignOrDscContent.heroLede}
        texture="signature"
        textureId="dsc-esign-hero"
      />

      {/* <ComingSoon
        heading="This comparison is being finalised"
        message="We're rewriting the eSign and Class 3 comparison so it reflects exactly what each portal accepts today. In the meantime, tell us the portal and what you need to sign and we'll tell you which of the two it takes."
      /> */}

    
      <SubNav
        sections={[
          { id: "comparison", label: "Side by side" },
          { id: "which-one", label: "Which one do you need" },
          { id: "faqs", label: "FAQs" },
        ]}
      />

      <Section id="comparison" surface="light">
        <Container>
          <SectionHeading
            eyebrow="Side by side"
            heading="Where each one actually differs"
          />
       
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-ink-100">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-ink-50">
                <tr>
                  <th scope="col" className="px-5 py-3.5 text-body-sm font-medium text-ink-600">
                    Criterion
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-body-sm font-medium text-ink-600">
                    Aadhaar eSign
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-body-sm font-medium text-ink-600">
                    Class 3 DSC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {esignOrDscContent.comparisonRows.map((row) => (
                  <tr key={row.criterion}>
                    <th
                      scope="row"
                      className="px-5 py-4 text-left text-body-sm font-medium text-ink-600"
                    >
                      {row.criterion}
                    </th>
                    <td className="px-5 py-4 text-body-sm text-ink-500">{row.esign}</td>
                    <td className="px-5 py-4 text-body-sm text-ink-500">{row.dsc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section id="which-one" surface="light-alt">
        <Container>
          <SectionHeading eyebrow="Which one do you need" heading="A quick way to decide" />
          <Reveal>
            <ul className="mt-6 max-w-[68ch] space-y-3">
              {esignOrDscContent.decisionGuide.map((point) => (
                <li key={point} className="flex gap-3 text-body text-ink-500">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button as={Link} to={`/dsc#${dscSectionIds.finder}`} variant="secondary">
                Find the right certificate
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Button>
              
              <Button
                as="a"
                href={dscEnquiryHref("Aadhaar eSign")}
                target="_blank"
                rel="noreferrer noopener"
                variant="tertiary"
              >
                Ask us about Aadhaar eSign
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="faqs" surface="light">
        <FaqSection
          eyebrow="FAQs"
          heading="Common questions"
          intro="Which one a portal will actually accept, and when eSign is not a substitute for a Class 3 certificate."
          items={esignOrDscContent.faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
       
        <JsonLd data={faqPageJsonLd(esignOrDscContent.faqs)} />
      </Section>

      <CtaBand
        heading="Still not sure which one the portal wants?"
        lede="Tell us the portal or the counterparty and what you need to sign, and we will tell you which of the two it actually accepts — including when the answer is the cheaper one."
      />

    
    </>
  );
}

export default DscEsign;
