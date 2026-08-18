import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { FaqSection } from "@/components/ui/FaqSection";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { partnerContent } from "@/content/partner-with-us";
import { PartnerEnquiryForm } from "@/modules/partner-with-us/PartnerEnquiryForm";

// T6 — CONTENT-PLAN.md §10. See partner-with-us.js's own header comment for
// why the commercial tiles state THAT commission/fee/timeline terms exist
// and are confirmed on application, never a specific rate or promise.
export default function PartnerWithUs({ path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="DSC Partner Programme"
        h1="Become a ThinkOrange DSC Partner"
        lede={partnerContent.heroLede}
        cta={{ label: "Talk to us first", to: "/contact" }}
      />

      <Section surface="light">
        <Container>
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Built for the people already trusted with a client's filings</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {partnerContent.whoItsFor.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-5 py-4">
                <ArcGlyph variant="corner" className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--surface-accent)" }} />
                <p className="text-body text-ink-500">{point}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light-alt">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Four steps, from application to a dispatched token</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerContent.howItWorks.map((step, index) => (
              <Card key={step.title} surface="light" interactive={false} className="h-full">
                <span className="font-mono text-eyebrow text-ember-600">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-h4 text-ink-600">{step.title}</h3>
                <p className="mt-2 text-body-sm text-ink-500">{step.body}</p>
              </Card>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">A programme built to stay out of your way</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {partnerContent.whatYouGet.map((tile) => (
              <Card key={tile.title} surface="light-alt" interactive={false} className="h-full">
                <h3 className="text-h4 text-ink-600">{tile.title}</h3>
                <p className="mt-2 text-body text-ink-500">{tile.body}</p>
              </Card>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="dark">
        <Container>
          <Eyebrow>What we handle</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch] text-canvas">Everything after you make the referral</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {partnerContent.whatWeHandle.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-ink-700 px-5 py-4">
                <ArcGlyph variant="corner" className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--surface-accent)" }} />
                <p className="text-body text-ink-300">{point}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light-alt">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Apply</Eyebrow>
              <h2 className="mt-3 text-h2 max-w-[26ch]">Tell us about your practice</h2>
              <p className="mt-4 max-w-[52ch] text-body-lg text-ink-500">
                We'll confirm the commission structure, onboarding steps and next order details once we hear from you.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Card surface="light" interactive={false}>
                <PartnerEnquiryForm />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="light">
        <FaqSection
          heading="About the partner programme"
          intro="What partners ask before applying. Anything not answered here, ask us directly — we would rather set expectations now."
          items={partnerContent.faqs.map((faq, index) => ({ id: index, question: faq.q, answer: faq.a }))}
        />
      </Section>

      <CtaBand />
    </>
  );
}
