import { Link } from "react-router-dom";
import { Check, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { StepFlow } from "@/components/ui/StepFlow";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { partnerContent } from "@/content/partner-with-us";
import { t } from "@/content/turnaround";
import { PartnerEnquiryForm } from "@/modules/partner-with-us/PartnerEnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

// T6 — CONTENT-PLAN.md §10. See partner-with-us.js's own header comment for
// why the commercial tiles state THAT commission/fee/timeline terms exist and
// are confirmed on application, never a specific rate or promise.
//
// --- 21-08-2026, premium pass ---------------------------------------------
// Clinton: "analyse the home and dsc pages and fix the partner with us page,
// make it look premium."
//
// The diagnosis was NOT that any one section was ugly. It was that all five
// body sections had the SAME composition — Eyebrow, h2, then a Stagger grid of
// bordered boxes — so the page read as one template repeated five times. That
// is the templated rhythm the homepage never falls into: its light sections get
// their depth from hairlines, the type scale and big quiet mono numerals, and a
// genuinely dark band sits between them (DESIGN.md §11.1). Three of the fixes
// below are also plain INCONSISTENCIES with passes this page was missed by:
//
//   1. The step section was a 4-card grid, not `StepFlow`. The 19-08-2026 pass
//      made StepFlow the one step treatment sitewide (T2, T4, T5) and this page
//      was overlooked. `howItWorks` already has StepFlow's exact
//      { title, body } shape, so this is a swap, not a rewrite.
//   2. The form sat inside a `<Card>`. The 21-08-2026 contact redesign moved
//      the site's other public form onto `tone="bare"` ("do not keep the form
//      inside a card, blend it to the page"), which left the two public forms
//      on this site looking like two different products.
//   3. The hero was the plain single-arc variant while `/dsc` — the page this
//      one is now reached FROM, via the mega panel's promo card — carries a
//      textured 7/5 hero. The promo card looked more considered than its own
//      destination.
//
// `whatWeHandle` was rewritten from four bordered boxes into a `.panel-dark`
// hairline ledger — the same treatment the homepage's own PartnerProgramme
// teaser already uses for a shorter version of this exact list, so the teaser
// and the real page speak with one voice. (It briefly lived in the hero as an
// aside; 21-08-2026 moved it back out to its own section — see that section's
// own comment, which records why the content could not just be deleted with
// the card.)
//
// Surface cadence, checked rather than assumed:
//   deep → light → dark → light → light-alt → light → light-alt → ember
// Zero consecutive repeats.

// Two rings only, and lighter than any section ladder — this is a ~600px panel,
// not a full-bleed band, so an identical opacity reads far heavier here. Ink,
// not ember: the tick icons are the panel's only warm accent and the hero
// already spends the page's orange budget on its texture.
const PANEL_RINGS = [
  { r: 150, width: 13, opacity: 0.16 },
  { r: 114, width: 10, opacity: 0.1 },
];

export default function PartnerWithUs({ path }) {
  return (
    <>
      <PageHero
        path={path}
        // Was "DSC Partner Programme", which is very nearly the H1 sitting
        // directly beneath it — the same duplication the /dsc hub's eyebrow was
        // fixed for. An audience label says something the H1 does not.
        // ⛔ 02-09-2026: the whole page was a REFERRAL programme and is now the
        // opposite — partners issue certificates themselves. The H1 carries
        // that distinction rather than leaving it to body copy: "for your own
        // clients" is the entire proposition.
        eyebrow={partnerContent.eyebrow}
        h1={partnerContent.h1}
        lede={partnerContent.heroLede}
        texture="certificate"
        textureId="partner-hero"
      >
        {/* `children` rather than `cta`, because this page needs TWO actions and
            PageHero renders `cta` and `children` as separate stacked blocks.
            The primary one is an in-page anchor: the form is the whole point of
            the page, and the old single CTA sent people to /contact, i.e. off
            it. A plain <a href="#…"> is correct here — react-router must not
            treat a fragment as a route change. */}
        <div>
          {/* The six unmarked assertions from Clinton's reference — no joining
              fee, own login, clients stay yours, and so on. ⚠️ The reference's
              stat strip beside these carried "[X]% commission" and "[X hrs]
              activation"; both are placeholders it flags itself, so neither is
              here. See MISSING-PAGES.md. */}
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
            {partnerContent.heroTicks.map((tick) => (
              <li key={tick} className="flex items-center gap-2 text-body-sm font-medium text-ink-100">
                <Check className="h-4 w-4 shrink-0 text-ember-300" strokeWidth={2.5} aria-hidden="true" />
                {tick}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#apply" variant="primary">
              Apply to become a partner
            </Button>
            <Button as={Link} to="/contact" variant="secondary" tone="dark">
              Talk to us first
            </Button>
          </div>
          {/* ⚠️ NOT "we reply within one working day" — the reference says
              that, but it is a turnaround commitment, so it comes from
              turnaround.js like every other one on this site. */}
          <p className="mt-4 text-body-sm text-ink-300">
            No commitment. {t("enquiryResponseTime")}.
          </p>
        </div>
      </PageHero>

      {/* WHY THROUGH US. Four claims, hairline columns rather than cards —
          each is a complete paragraph, and a box around a paragraph is a box
          doing nothing. */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="Why enrol through ThinkOrange"
            heading="The certifying authority issues it. We make sure you can run the business."
            lede="Anyone can hand you a login. The difference shows up in the first month, when a client's application is rejected for a reason the portal explains badly and you need someone who knows why."
          />
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {partnerContent.whyUs.map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index, 3) * 0.06} className="border-t border-ink-200 pt-5">
                <h3 className="text-h4 text-ink-600">{item.title}</h3>
                <p className="mt-2 max-w-[62ch] text-body-sm text-ink-500">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SWITCHING — the page's one dark band. An existing reseller is the
          readiest partner there is, which is why the reference leads on this
          and why it gets its own surface rather than a card. */}
      <Section surface="dark" className="surface-ambient">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow={partnerContent.switching.eyebrow}
                heading={partnerContent.switching.heading}
                lede={partnerContent.switching.body}
                dark
              />
              <Reveal className="mt-8">
                <Button as="a" href="#apply" variant="primary">
                  Talk to us about switching
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <ul className="space-y-4">
                {partnerContent.switching.pains.map((pain, index) => (
                  <Reveal
                    as="li"
                    key={pain.title}
                    delay={index * 0.06}
                    className="border-t border-ink-700 pt-4"
                  >
                    <h3 className="text-h4 text-canvas">{pain.title}</h3>
                    <p className="mt-1 text-body-sm text-ink-100">{pain.body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHO IT'S FOR. ⚠️ Every entry describes someone who ISSUES. If a future
          edit makes one of these read as "send the client to ThinkOrange", it
          has reverted the page to the referral framing this rewrite removed. */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="Who this suits"
            heading="Practices that already own the client relationship"
            lede="The common thread is that you are already the person your client asks. This keeps that intact instead of interrupting it."
          />
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {partnerContent.whoItsFor.map((item, index) => (
              <Reveal
                key={item.title}
                delay={Math.min(index, 5) * 0.05}
                className="border-t border-ink-200 pt-5"
              >
                <h3 className="text-h4 text-ink-600">{item.title}</h3>
                <p className="mt-2 text-body-sm text-ink-500">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ONBOARDING — the site's one step treatment. */}
      <Section surface="light-alt">
        <StepFlow
          eyebrow="How onboarding works"
          heading="From application to your first issued certificate"
          intro="Straightforward, but not instant — the certifying authority runs its own checks and we do not shortcut them."
          surface="light"
          steps={partnerContent.onboarding}
        />
      </Section>

      {/* WHAT YOU TAKE ON. Kept prominent rather than buried near the form:
          issuing yourself means carrying the verification obligation yourself,
          and a partner who learns that after signing is the wrong partner. */}
      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Before you apply"
                heading="What the programme asks of you"
                lede={partnerContent.responsibilitiesNote}
              />
            </div>
            <div className="lg:col-span-7">
              <ul className="border-t border-ink-200">
                {partnerContent.responsibilities.map((point, index) => (
                  <Reveal
                    as="li"
                    key={point}
                    delay={Math.min(index, 4) * 0.05}
                    className="flex gap-4 border-b border-ink-200 py-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-ember-600"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="text-body text-ink-500">{point}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* EARNINGS. ⛔ Every retail range and margin in the reference is a
          bracketed placeholder that its own dev note flags as needing real
          values, so nothing numeric is published — the table shows what you can
          issue and who buys it, and quotes on application. Set `retail` and
          `margin` in the content file and the cells fill in with no code
          change. Tables never animate. */}
      <Section surface="light-alt">
        <Container>
          <SectionHeading
            eyebrow="Earning potential"
            heading="What you can issue, and who buys it"
            lede={partnerContent.earnings.note}
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-200">
                  {["Certificate", "Validity", "Typical retail", "Your margin", "Who buys it"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-3 pr-6 font-mono text-body-sm uppercase tracking-[0.1em] text-ink-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partnerContent.earnings.rows.map((row) => (
                  <tr key={row.product} className="border-b border-ink-100 align-top">
                    <th scope="row" className="py-4 pr-6 text-body font-medium text-ink-600">
                      {row.product}
                      {row.note && (
                        <span className="mt-0.5 block text-body-sm font-normal text-ink-400">
                          {row.note}
                        </span>
                      )}
                    </th>
                    <td className="py-4 pr-6 text-body-sm text-ink-500">{row.validity}</td>
                    <td className="py-4 pr-6 text-body-sm text-ink-500">
                      {row.retail ?? "On request"}
                    </td>
                    <td className="py-4 pr-6 text-body-sm font-medium text-ember-600">
                      {row.margin ?? "Quoted on application"}
                    </td>
                    <td className="py-4 text-body-sm text-ink-500">{row.buyer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* APPLY */}
      <Section id="apply" surface="light" className="scroll-mt-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Apply"
                heading="Tell us about your practice"
                lede="We read every application and come back to you — including when the answer is that the programme is not the right fit yet. If you already issue certificates elsewhere, say so; we will tell you plainly whether our terms beat what you have."
              />
              <RegistrationDocuments documents={partnerContent.registrationDocuments} />
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <PartnerEnquiryForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section surface="light-alt">
        <FaqSection
          heading="What partners ask before applying"
          intro="Switching, commission, verification and what happens to your client relationship."
          items={partnerContent.faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </Section>

      <CtaBand
        heading="Issue certificates without sending clients elsewhere."
        lede="Tell us what your practice files and the volume you expect, and we will come back with your slab in writing before you commit to anything."
      />
    </>
  );
}

/**
 * The documents required at registration, exactly as Clinton listed
 * them (PAN, Aadhaar, MSME or latest bank statement, Aadhaar-linked phone,
 * mail ID).
 *
 * ⛔ THIS IS A CHECKLIST, NOT FORM FIELDS, AND THAT IS DELIBERATE. Three of
 * the five are DOCUMENTS — scans handed over during onboarding — and
 * two of them are PAN and Aadhaar. Putting identity numbers into a public
 * web form that relays them through a third-party email service is not
 * something to do casually anywhere, and certainly not while all five legal
 * pages, the privacy policy included, are still `sections: null`. Aadhaar in
 * particular carries its own statutory restrictions on collection and
 * storage.
 *
 * So the form collects only what is genuinely DATA — the Aadhaar-linked phone
 * number and the mail ID that becomes the login — and this panel tells an
 * applicant what to have ready. The documents are collected in the onboarding
 * conversation, which is also where they are actually needed.
 *
 * ⚠️ If this is ever changed to collect PAN or Aadhaar numbers directly, the
 * privacy policy has to be written first, and the transport has to be
 * something better than a client-side email relay.
 */
function RegistrationDocuments({ documents }) {
  return (
    <Reveal
      data-surface="dark"
      className="panel-dark grain relative mt-10 overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7"
    >
      <ArcRings
        rings={PANEL_RINGS}
        color="var(--color-ink-600)"
        gradientId="partner-docs-arc"
        svgClassName="-right-20 -top-24 h-[320px] w-[320px]"
      />
      <div className="relative">
        <h3 className="text-h4 text-canvas">What to have ready</h3>
        <p className="mt-2 text-body-sm text-ink-200">
          These are asked for at registration. Nothing here is uploaded on this page — we collect
          them with you once your application is through.
        </p>
        <dl className="mt-5 space-y-4">
          {documents.map((doc) => (
            <div key={doc.label} className="flex gap-3 border-t border-ink-700 pt-3">
              <ArcGlyph
                variant="corner"
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0"
                style={{ color: "var(--color-ember-300)" }}
              />
              <div>
                <dt className="text-body-sm font-medium text-canvas">{doc.label}</dt>
                <dd className="mt-0.5 text-body-sm text-ink-200">{doc.detail}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
