import { Link } from "react-router-dom";
import {
  Building2,
  Calculator,
  Check,
  KeyRound,
  RefreshCw,
  Scale,
  Send,
  Server,
  TrendingUp,
  Upload,
  Usb,
  Zap,
} from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
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
import { site } from "@/content/nav";
import { whatsappHref } from "@/lib/whatsapp";
import { t } from "@/content/turnaround";
import { PartnerEnquiryForm } from "@/modules/partner-with-us/PartnerEnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

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
//   deep → light → dark → light-alt → light → light-alt → ember
// Zero consecutive repeats, no adjacent dark-family pair.
//
// --- 04-09-2026 ------------------------------------------------------------
// Clinton: remove three sections — "Already issuing DSCs?" (the switching
// band), "Before you apply" (what the programme asks of you) and "Earning
// potential" (the certificate/margin table).
//
// ⚠️ Their CONTENT is NOT deleted. `partnerContent.switching`,
// `.responsibilities`, `.responsibilitiesNote` and `.earnings` are all still
// written and exported from content/partner-with-us.js, unreferenced — the
// same discipline `portalGuide` and `afterIssue` already carry in the DSC
// tree. Restoring any of these sections is a render-only change. Do not prune
// them as dead content on a later tidy-up pass.
//
// ⛔ The switching band was the page's only DARK surface, so removing it left
// two light sections adjacent. "Who this suits" took that role and was
// re-toned for it — see its own comment.

// Two rings only, and lighter than any section ladder — this is a ~600px panel,
// not a full-bleed band, so an identical opacity reads far heavier here. Ink,
// not ember: the tick icons are the panel's only warm accent and the hero
// already spends the page's orange budget on its texture.
// Why-us bento ring compositions — ONE PER TILE, and they are deliberately all
// different (Clinton, 04-09-2026: "here all ring effect is same"). The first
// cut gave every tile the same two-ring ladder and only moved the corner, so
// four cards read as one card printed four times.
//
// ⚠️ WHAT VARIES IS THE COMPOSITION, NEVER THE SHAPE. Every ring is still the
// same crescent from `lib/arc.js` at a different radius — DESIGN.md §3.1's
// "repetition of one specific shape" only holds while that is literally true,
// so vary ring COUNT, radius, stroke width, anchor corner and weight; never
// hand-author a new curve and never mirror one (a mirrored crescent is a
// different shape).
//
// Every ladder sits below CtaBand's 0.12/0.07/0.045, which stays the one loud
// band on the site. The lead card's are INK, not ember: it is a light card and
// an ember arc there would compete with the badge that is meant to be the
// eye's first stop.
const WHY_RINGS = {
  // Three faint rings, wide apart, swinging out of the bottom-left — the
  // quietest of the four, because this card carries display type.
  lead: {
    color: "var(--color-ink-950)",
    svgClassName: "absolute -bottom-28 -left-28 h-[480px] w-[480px]",
    rings: [
      { r: 170, width: 14, opacity: 0.05 },
      { r: 132, width: 10, opacity: 0.038 },
      { r: 96, width: 7, opacity: 0.028 },
    ],
  },
  // ONE thick ring, top-right. On the solid ember tile a ladder disappears
  // into the fill, so this is a single broad band of light instead.
  commissions: {
    color: "var(--color-canvas)",
    svgClassName: "absolute -right-24 -top-24 h-[330px] w-[330px]",
    rings: [{ r: 150, width: 26, opacity: 0.1 }],
  },
  // Two tight rings, bottom-right — the closest to the site's standard pair,
  // and the only tile that keeps it.
  login: {
    svgClassName: "absolute -bottom-24 -right-20 h-[320px] w-[320px]",
    rings: [
      { r: 150, width: 12, opacity: 0.13 },
      { r: 114, width: 9, opacity: 0.08 },
    ],
  },
  // Four hairlines of EQUAL width, tightly nested and bled off the right edge
  // — a fine concentric fan rather than a ladder, which suits a 180px-tall
  // landscape tile where a large radius would only show as one flat curve.
  issuance: {
    svgClassName: "absolute -right-16 -top-32 h-[440px] w-[440px]",
    rings: [
      { r: 186, width: 6, opacity: 0.11 },
      { r: 156, width: 6, opacity: 0.085 },
      { r: 126, width: 6, opacity: 0.06 },
      { r: 96, width: 6, opacity: 0.04 },
    ],
  },
};

// ⛔ ALWAYS resolved through `whyIcon()`, never by indexing the object: an
// unmapped key evaluates to `undefined` and `<undefined />` is a HARD React
// crash, not a blank. That exact bug shipped once from DscBand's private map
// (17-08-2026), which is why every slug-keyed icon map in this codebase has a
// helper with a fallback.
const WHY_ICONS = { commissions: TrendingUp, login: KeyRound, issuance: Zap };
const whyIcon = (key) => WHY_ICONS[key] ?? Zap;

// Who-this-suits, same rule: `whoIcon()`, never a bare index.
const WHO_ICONS = {
  practitioners: Calculator,
  advocates: Scale,
  resellers: RefreshCw,
  it: Server,
  tokens: Usb,
  corporate: Building2,
};
const whoIcon = (key) => WHO_ICONS[key] ?? Building2;

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
            {/* ⛔ 05-09-2026 (Clinton): "in partner with us page in apply to
                become a partner program button link to this link… when click
                to it redirect to this link in new tab." It was an in-page
                `#apply` anchor; it now opens the certifying authority's own
                registration form. The URL is in `partner-with-us.js`, never
                inline here — see the ⚠️ notes on it.

                ⚠️ `rel="noopener noreferrer"` is not boilerplate on a
                `target="_blank"`: without `noopener` the opened page gets a
                handle on this one through `window.opener` and can navigate it
                anywhere. */}
            <Button
              as="a"
              href={partnerContent.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
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

      {/* WHY THROUGH US — a bento, per Clinton's reference image (04-09-2026):
          one tall card carrying the strongest claim, two small tiles beside it
          and one wide tile beneath them.

          ⛔ THE REFERENCE'S PALETTE IS NOT REPRODUCED, deliberately. It runs a
          vivid green stat card and a full-bleed purple CTA card; both are
          off-palette here (DESIGN.md §16's first tell), and a purple-sized
          block of ember would put this one fold near CLAUDE.md's ~12% orange
          ceiling on its own. So the composition is copied and the colour is
          re-cast in this site's own vocabulary: exactly ONE ember tile as the
          pop the green card supplies, the other two in ink, the tall card
          light. Measured ember share of this fold after the change: 2.15%.

          ⚠️ THE EMBER TILE'S FILL IS `.tile-ember` — A GRADIENT, AND THE
          GRADIENT IS WHAT MAKES ITS LIGHT TEXT LEGAL. Read that class's
          comment in theme.css before touching this tile. Short version: it
          opens on ember-400 (the colour Clinton asked to keep) and deepens to
          ember-700 before the copy starts, because canvas on flat ember-400 is
          3.00:1 and white is 3.15:1 — exactly the pairing CLAUDE.md's first
          non-negotiable bars. The tile's text is bottom-aligned, so every word
          lands on the deep end. ⛔ Flatten the fill, or stop bottom-aligning
          this tile's text, and the copy slides onto the bright end and fails
          AA silently.

          Three fills were measured getting here, which is worth recording so
          nobody re-walks it: flat ember-400 (Clinton: light text, so no), flat
          ember-700 (Clinton: "so much dark"), and flat ember-600 — which
          PASSED statically at 4.97:1 and FAILED the pixel sweep at 4.03:1,
          because this tile carries a translucent canvas ring that lightens the
          fill it crosses. A static colour pair is not the measurement whenever
          anything translucent sits over the background.

          The two ink tiles sit vertically adjacent, which is fine BECAUSE
          their compositions differ (one portrait with a stacked icon, one
          landscape with the icon inline): tiles, unlike sections, read as a set
          rather than as a repeat when their shape and orientation differ. */}
      <Section surface="light">
        <Container>
          <SectionHeading
            eyebrow="Why enrol through ThinkOrange"
            heading="Why become an Authorised DSC Partner with us?"
            lede="Anyone can hand you a login. What follows is what the arrangement actually gives you — and what it does not ask for up front."
          />

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* THE TALL CARD. Its claim is the strongest of the four and the
                only one shaped like a headline, which is why it gets display
                type and the rest do not. */}
            <Reveal className="lg:col-span-5">
              <div className="card-premium relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-ink-100 bg-white p-8 md:p-10">
                <ArcRings
                  rings={WHY_RINGS.lead.rings}
                  gradientId="partner-why-lead"
                  color={WHY_RINGS.lead.color}
                  svgClassName={WHY_RINGS.lead.svgClassName}
                  style={{ zIndex: -1, }}
                />
                <span className="inline-flex w-fit items-center rounded-full bg-ember-400 px-4 py-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-950">
                  {partnerContent.whyUs.lead.badge}
                </span>
                <h3 className="mt-8 max-w-[14ch] text-display-lg text-ink-600">
                  {partnerContent.whyUs.lead.title}
                </h3>
                <p className="mt-auto pt-10 max-w-[38ch] text-body-lg text-ink-500">
                  {partnerContent.whyUs.lead.body}
                </p>
              </div>
            </Reveal>

            {/* THE THREE TILES. `wide` is read off the content, not the index,
                so reordering the array cannot silently move the wide slot away
                from the entry written for it. */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
              {partnerContent.whyUs.tiles.map((tile, index) => {
                const Icon = whyIcon(tile.key);
                const rings = WHY_RINGS[tile.key] ?? WHY_RINGS.login;
                const ember = tile.surface === "ember";
                return (
                  <Reveal
                    key={tile.key}
                    delay={0.06 + index * 0.06}
                    className={cn(tile.wide && "sm:col-span-2")}
                  >
                    <div
                      // ⛔ `dark` ON THE EMBER TILE TOO, and it is load-bearing
                      // rather than decorative. theme.css owns
                      // `[data-surface="dark"] h3 { color: canvas }` UNLAYERED,
                      // and unlayered CSS beats Tailwind's `@layer utilities` —
                      // so the heading's colour has to come from the attribute,
                      // not from a class. An earlier cut used
                      // `data-surface="ember"` (which pins h3 to ink-950) and a
                      // plain `text-canvas` class silently LOST to it.
                      //
                      // It is also honest: ember-600 is a genuinely dark
                      // surface that carries light text, which is exactly what
                      // `dark` declares. `ember` below selects the FILL only.
                      data-surface="dark"
                      className={cn(
                        "relative isolate flex h-full overflow-hidden rounded-xl p-7 md:p-8",
                        tile.wide ? "flex-row items-center gap-7" : "flex-col",
                        ember ? "tile-ember" : "panel-dark grain",
                      )}
                    >
                      <ArcRings
                        rings={rings.rings}
                        gradientId={`partner-why-${tile.key}`}
                        color={rings.color}
                        svgClassName={rings.svgClassName}
                        style={{ zIndex: -1 }}
                      />
                      <span
                        className={cn(
                          "flex shrink-0 items-center justify-center rounded-lg",
                          tile.wide ? "h-14 w-14" : "h-12 w-12",
                          ember
                            ? "bg-ink-950/20 text-canvas"
                            : "bg-ember-400 text-ink-950",
                        )}
                      >
                        <Icon className={tile.wide ? "h-6 w-6" : "h-5 w-5"} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <div className={cn(tile.wide ? "min-w-0" : "mt-auto pt-10")}>
                        <p
                          className={cn(
                            "font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em]",
                            // ⚠️ ember-50, and each step up from the ink tiles'
                            // ember-200 was forced by a MEASURED failure rather
                            // than chosen: this label is 11px so it carries the
                            // 4.5 floor, and it sits highest in the text block
                            // — i.e. on the lightest part of the gradient any
                            // copy touches. ember-200 pairs at 3.29:1 there and
                            // ember-100 sampled 4.13:1, then 4.39:1 after the
                            // ramp was deepened. Only ember-50 clears it.
                            // Anything warmer than this on this tile needs
                            // re-measuring.
                            ember ? "text-ember-50" : "text-ember-200",
                          )}
                        >
                          {tile.label}
                        </p>
                        <h3
                          className={cn(
                            "mt-2 text-h3 text-canvas",
                          )}
                        >
                          {tile.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-3 text-body-sm",
                            ember ? "text-canvas" : "text-ink-100",
                            tile.wide ? "max-w-[62ch]" : "max-w-[36ch]",
                          )}
                        >
                          {tile.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* WHO IT'S FOR. ⚠️ Every entry describes someone who ISSUES. If a future
          edit makes one of these read as "send the client to ThinkOrange", it
          has reverted the page to the referral framing this rewrite removed.

          ⚠️ 04-09-2026: this is now the page's ONE dark band. It became dark when
          the Switching section (which used to carry that role) was removed
          alongside "Before you apply" and "Earning potential" — without the
          swap this section sat light directly under the light "Why through us"
          band above it, i.e. a consecutive-surface repeat. Every colour here is
          the dark-surface pair (SectionHeading `dark`, canvas headings, ink-100
          body, ink-700 hairlines): the surface system covers headings and
          var(--surface-*) accents, NOT the plain text-ink-* utilities this grid
          is built from. If it is ever put back to light, all of them move
          back. */}
      <Section surface="dark" className="surface-ambient">
        <Container>
          <SectionHeading
            eyebrow="Who this suits"
            heading="Practices that already own the client relationship"
            lede="The common thread is that you are already the person your client asks. This keeps that intact instead of interrupting it."
            dark
          />
          {/* ⚠️ ICON + LABEL ONLY — no subline (Clinton, 04-09-2026, with a
              reference image). Each entry's `body` is still written in the
              content file and simply not rendered; see its comment there.

              Deliberately NO disc behind the glyph, unlike the DSC group cards
              and the why-us tiles above. Two reasons: the reference has none,
              and §16's tell 6 is "icon-in-a-circle everywhere" — a page that
              already uses discs in one section should not reach for them again
              in the next.

              The CELLS are centred and the section heading above is NOT. §16's
              tell 8 audits centre-aligned SECTIONS (a centred heading block is
              the generic-landing-page tell); a centred cell inside a
              left-aligned section is an icon grid, which is a different thing.
              Re-check with the tell-8 detector if that section ever centres. */}
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
            {partnerContent.whoItsFor.map((item, index) => {
              const Icon = whoIcon(item.key);
              return (
                <Reveal
                  key={item.title}
                  delay={Math.min(index, 5) * 0.05}
                  className="flex flex-col items-center text-center"
                >
                  {/* 48px at a 1.25 stroke, not the 16-20px this codebase uses
                      inside buttons and list rows: here the glyph IS the cell,
                      and at icon-in-a-row size the band read as underfilled. */}
                  <Icon
                    className="h-12 w-12 text-ember-300"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-body font-medium text-canvas">{item.title}</h3>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ONBOARDING — the site's one step treatment.

          ⚠️ This section is `light`, not the `light-alt` it carried until
          05-09-2026, and the swap is a CADENCE decision rather than a look.
          Clinton added the Documents section directly below it and said "later
          i will remove the onboard, for now keep that also" — so Documents
          takes `light-alt`, this one moves to `light`, and the day this block
          is deleted the page falls straight back to its original
          deep → light → dark → light-alt → light → light-alt → ember with
          nothing else to touch. The other way round (Documents on `light`)
          leaves a light/light pair against the apply section the moment
          onboarding goes. */}
      {/* <Section surface="light">
        <StepFlow
          eyebrow="How onboarding works"
          heading="From application to your first issued certificate"
          intro="Straightforward, but not instant — the certifying authority runs its own checks and we do not shortcut them."
          surface="light"
          steps={partnerContent.onboarding}
        />
      </Section> */}

      {/* DOCUMENTS REQUIRED — 05-09-2026. See the ⛔ notes on
          `partnerContent.documentsRequired` for why the portal's own screens
          are not described and why no turnaround is stated on the assisted
          route. */}
      <Section id="documents" surface="light-alt" className="scroll-mt-32">
        <DocumentsRequired />
      </Section>

      {/* APPLY */}
      <Section id="apply" surface="light" className="scroll-mt-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* ⛔ `flex-1` CAME OFF THE PANEL ON 05-09-2026 AND MUST STAY OFF
                while the panel is short. It was added when the panel carried
                all five documents and stretching it to the form's height only
                cost invisible padding. The panel is now a three-line pointer,
                so stretching it to a ~700px form rendered a mostly-empty navy
                slab — a worse fault than the ~15px bottom misalignment the
                stretch was there to fix. If the full checklist ever comes back
                here, put `flex-1` back with it. */}
            <div className="flex flex-col lg:col-span-5">
              <SectionHeading
                eyebrow="Apply"
                heading="Tell us about your practice"
                lede="We read every application and come back to you — including when the answer is that the programme is not the right fit yet. If you already issue certificates elsewhere, say so; we will tell you plainly whether our terms beat what you have."
              />
              <RegistrationDocuments />
            </div>
            {/* ⚠️ THE FORM IS IN A CARD, and that is a deliberate difference
                from /contact, which runs the same primitives borderless
                (`tone="bare"`). There the form IS the page, so a card outline
                boxes the whole content; here it is one column beside prose and
                a dark panel, and the card is what marks it as the distinct
                object you act on. Same call the services enquiry card already
                makes.

                `h-full` + `items-start` on the row: without it the card is
                shrink-to-fit and its bottom edge lands wherever the last field
                happens to end, which is what left the two columns visibly
                unrelated. */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="card-premium h-full rounded-[var(--radius-lg)] border border-ink-100 bg-white p-6 shadow-sm md:p-8 lg:p-10">
                <PartnerEnquiryForm />
              </div>
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
 * DOCUMENTS REQUIRED — 05-09-2026 (Clinton). What to send, and how to send it.
 *
 * ⚠️ THE LAYOUT IS DELIBERATELY `StepFlow`'s, not a new one: the same 4/8
 * grid, the same sticky rail at the same `+52px` offset, the same
 * `SectionHeading` with `reveal={false}` inside it. Clinton asked for it "with
 * the same theme as onboarding work" and it sits immediately below that
 * section, so anything else would read as two unrelated blocks. It is NOT
 * `StepFlow` itself, because this is not a sequence — the five documents are a
 * checklist and the two routes are alternatives, and numbering either would
 * tell the reader to do them in order.
 *
 * ⛔ DO NOT CHANGE THE RAIL OFFSET. `lg:top-[calc(var(--header-h)+52px)]` is
 * fixed by instruction (Clinton, 04-09-2026) and is shared by StepFlow,
 * FaqSection and DscFinder. A different value here is drift, not a decision.
 *
 * ⚠️ The checklist reads `partnerContent.registrationDocuments` — the SAME
 * array the panel beside the application form renders — so the two can never
 * disagree about what is required.
 */
function DocumentsRequired() {
  const { eyebrow, heading, intro, routes, note } = partnerContent.documentsRequired;
  const documents = partnerContent.registrationDocuments;
  const [selfRoute, assistedRoute] = routes;

  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+52px)]">
            <SectionHeading
              eyebrow={eyebrow}
              heading={heading}
              lede={intro}
              headingClassName="max-w-[18ch]"
              ledeClassName="max-w-[42ch] text-body sm:text-body"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          {/* ⚠️ ONE Reveal around the whole list, never one per row. Five lines
              resolving one after another while somebody is reading them off to
              collect their papers is exactly what "body copy never animates"
              protects against. */}
          <Reveal>
            <ol className="border-t border-ink-100">
              {documents.map((doc, index) => (
                <li
                  key={doc.label}
                  className="flex gap-5 border-b border-ink-100 py-5 md:gap-7"
                >
                  {/* `tabular-nums` so the two-digit case would still line the
                      labels up; `aria-hidden` because the <ol> already conveys
                      the position to assistive tech and reading "01" aloud
                      before every item is noise. */}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 font-mono text-body-sm tabular-nums text-ember-600"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-body font-medium text-ink-600">{doc.label}</p>
                    <p className="mt-1 text-body-sm text-ink-500">{doc.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* THE TWO ROUTES. Equal weight on purpose — the assisted one is not
              a fallback for people who cannot manage the form, it is the route
              Clinton expects most practices to take. */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="card-premium flex h-full flex-col rounded-[var(--radius-lg)] border border-ink-100 bg-white p-6 shadow-sm md:p-7">
                <RouteIcon icon={Upload} />
                <h3 className="mt-5 text-h4 text-ink-600">{selfRoute.title}</h3>
                <p className="mt-2 text-body-sm text-ink-500">{selfRoute.body}</p>
                {/* `mt-auto` on the action block, `h-full` + `flex-col` on the
                    card: the pair's BOTTOM edges align whatever the body copy
                    does (measured 437px / 437px at 1440), which is what stops a
                    two-card row looking untended. The buttons themselves sit at
                    different heights on purpose — the other card carries a
                    response-time line beneath its own. */}
                <div className="mt-auto pt-6">
                  {/* ⚠️ Same URL, same target and the same `rel` as the hero's
                      button, and for the same reason: without `noopener` the
                      opened page gets a handle on this one through
                      `window.opener`. The URL lives in the content file. */}
                  <Button
                    as="a"
                    href={partnerContent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    {selfRoute.actionLabel}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <div className="card-premium flex h-full flex-col rounded-[var(--radius-lg)] border border-ink-100 bg-white p-6 shadow-sm md:p-7">
                <RouteIcon icon={Send} />
                <h3 className="mt-5 text-h4 text-ink-600">{assistedRoute.title}</h3>
                <p className="mt-2 text-body-sm text-ink-500">{assistedRoute.body}</p>
                <div className="mt-auto pt-6">
                  {/* The site's WhatsApp button — `tertiary` plus tabler's brand
                      mark, the same pair the DSC and services CTAs already use,
                      rather than a fourth hand-rolled green. */}
                  <Button
                    as="a"
                    href={whatsappHref(
                      "Hi ThinkOrange, I'd like to become a DSC partner. I'm sending my registration documents.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="tertiary"
                  >
                    <IconBrandWhatsapp className="h-4 w-4" aria-hidden="true" />
                    Send on WhatsApp
                  </Button>
                  {/* ⚠️ The email is a text link, NOT a second Button. Two pills
                      side by side do not fit this card's measure — the address
                      is long enough that they wrapped onto separate rows, which
                      read as one button that had failed to fit. It also keeps
                      the address itself visible, which matters when somebody is
                      going to send the documents from their own mail client.

                      ⚠️ AND NOT "we set it up within 24 hours". The offer is
                      Clinton's own; the timeframe is not confirmed, so it comes
                      from turnaround.js like every other one on this site. */}
                  <p className="mt-4 text-body-sm text-ink-500">
                    Or email{" "}
                    <a
                      href={site.emailHref}
                      className="font-medium text-ink-600 underline decoration-ink-200 underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-ember-600 hover:decoration-ember-400"
                    >
                      {site.email}
                    </a>
                    . {t("enquiryResponseTime")}.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 border-t border-ink-100 pt-5 text-body-sm text-ink-500">{note}</p>
          </Reveal>
        </div>
      </div>
    </Container>
  );
}

/**
 * ⚠️ FILLED disc, no ring — the light half of the filled-on-light /
 * ringed-on-dark pairing the DSC group cards established. A ring plus a tint on
 * a white card is two treatments doing one job.
 */
function RouteIcon({ icon: Icon }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-50"
    >
      <Icon className="h-5 w-5 text-ember-600" strokeWidth={1.75} />
    </span>
  );
}

/**
 * A POINTER to the Documents section above, not a second copy of the list.
 *
 * ⛔ IT USED TO RENDER ALL FIVE ITEMS, and stopped on 05-09-2026 when Clinton
 * asked for a Documents section of its own. That section sits immediately
 * above this one, so the full checklist here would have been the same five
 * lines twice within one scroll — the thing that makes a page read as
 * unedited. The list moved up; the one sentence that is load-bearing did not.
 *
 * ⛔ THAT SENTENCE IS THE POINT OF THIS PANEL, AND MUST SURVIVE ANY REWRITE.
 * Three of the five items are DOCUMENTS — scans handed over during
 * onboarding — and two of them are PAN and Aadhaar. Putting identity numbers
 * into a public web form that relays them through a third-party email service
 * is not something to do casually anywhere, and certainly not while all five
 * legal pages, the privacy policy included, are still `sections: null`.
 * Aadhaar in particular carries its own statutory restrictions on collection
 * and storage. So the form beside this panel collects only what is genuinely
 * DATA — the Aadhaar-linked phone number and the mail ID that becomes the
 * login — and a reader looking at a form on a page headed "Documents required"
 * needs telling, right here, that nothing is uploaded on it.
 *
 * ⚠️ If the form is ever changed to collect PAN or Aadhaar numbers directly,
 * the privacy policy has to be written first, and the transport has to be
 * something better than a client-side email relay.
 */
function RegistrationDocuments() {
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
        <h3 className="text-h4 text-canvas">Nothing is uploaded here</h3>
        <p className="mt-2 text-body-sm text-ink-200">
          This form asks for your practice and how to reach you — no PAN, no Aadhaar, no scans.
          The five registration documents are listed above, with both ways of sending them.
        </p>
        {/* A plain <a href="#…">, not a <Link>: react-router must not treat a
            fragment on the current route as a navigation. */}
        <a
          href="#documents"
          className="mt-5 inline-flex items-center gap-2 text-body-sm font-medium text-ember-300 underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-ember-200 hover:underline"
        >
          <ArcGlyph variant="corner" aria-hidden="true" className="h-4 w-4 shrink-0" />
          See the documents required
        </a>
      </div>
    </Reveal>
  );
}
