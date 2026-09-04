import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubNav } from "@/components/layout/SubNav";
import { NoticeBoard } from "@/components/ui/NoticeBoard";
import { noticesFor } from "@/content/notices";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { DscFinder } from "@/modules/dsc/DscFinder";
import {
  dscPartnerPromo,
  dscResourcesPage,
  dscSectionIds,
} from "@/content/nav";
// ⚠️ `certificateVariants` is still imported — the hero spec row counts them.
// `portalGuide`, `certificateCapabilities` and `afterIssue` are NOT, since the
// 03-09-2026 section removal; they remain exported and are the content those
// sections would render again. See the ⛔ note where they used to sit.
import { certificateVariants } from "@/content/dsc/certificates";
import { dscHubContent } from "@/content/dsc/hub-content";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { t } from "@/content/turnaround";

// /dsc — THE DECISION, AND NOTHING ELSE.
//
// ⛔ 02-09-2026, three instructions from Clinton across one day:
//   1. "combine the 5 pages in one" — the five certificate pages merged here.
//   2. "it will only have /dsc route only" — the whole tree collapsed.
//   3. "i want to keep the page minimal… expand the field according to user
//      selection. remove the pan-drive and content. for [token] keep it in
//      another tab like digital signature."
//   4. "protal guide and document has to be dsc page… i do not need
//      'certificate[s] we issue' also, change 'how it work[s]' in[to] 'after
//      you get' section, change the bottom cta also according to dsc."
//
// (3) is why this file is short. The version between (2) and (3) had thirteen
// sections and every checklist, driver and FAQ laid out flat — technically a
// merge, but a wall. This page now carries only what a visitor came to decide:
// which certificate they need, what the five are, how issuance works, and the
// partner programme. Everything technical is one tab away at
// `/dsc/resources` — exactly the split ThinkOrange_DSC_Resources_V1.html
// argues for in its own copy ("keep the detailed technical information here,
// away from the main DSC sales page").
//
// ⚠️ THE USB TOKEN OFFER IS DELETED, not moved. `content/dsc/products.js` is
// gone. What survives is every certificate's statement that it is issued ON a
// token — that is how a Class 3 certificate works, and dropping it would leave
// this page wrong about what a buyer receives.
//
// ⛔ THERE IS NO "CERTIFICATES WE ISSUE" SECTION (instruction 4). The five
// certificates are still fully described — by the finder, which names one and
// shows its documents, validity and caveats — but listing all five again
// underneath it was the same content twice on one page. `certificateVariants`
// is still the source the finder and the document checklists resolve against;
// only the redundant list is gone.
//
// ⚠️ EXPANSION IS THE POINT, not decoration. The document checklists render
// collapsed and open one at a time — laying five of them out flat is what made
// the earlier version dense.
//
// ⚠️ SURFACE CADENCE: deep → light → light-alt → dark → light → light-alt →
// ember. Zero consecutive repeats AND no two adjacent dark-family surfaces —
// the second property is the one that actually matters visually, and the one a
// naive token-comparison check misses (see the finder section below). Verify
// off `section[data-surface]` in the live DOM; the footer is `deep`, so a bare
// `[data-surface]` selector misreads the end.

const dscNotices = noticesFor("dsc");

export default function DscHub({ path }) {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: "Digital Signature Certificates",
            description: dscHubContent.meta.description,
            path,
          }),
          // ⚠️ The HowTo schema moved to /dsc/resources WITH the four-step
          // issuance content it describes. Emitting HowTo here while the steps
          // render on another page would assert structure this page does not
          // show.
        ]}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signatures"
        h1="Digital Signature Certificates"
        lede={dscHubContent.heroLede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
        texture="seal"
        textureId="dsc-hero"
        spec={heroSpec()}
      />

      {/* ⚠️ EVERY TAB IS BUILT FROM A SECTION THAT ACTUALLY RENDERS. A tab
          pointing at a section that was removed scrolls nowhere AND never
          lights up under the scroll-spy, which reads as broken rather than
          empty — and it is exactly what happened when the certificates section
          came out and this bar still listed it. `SubNav` also renders nothing
          below two entries, so a future trim cannot leave a one-tab bar. */}
      <SubNav
        sections={[
          ...(dscNotices.length > 0 ? [{ id: dscSectionIds.notices, label: "Notices" }] : []),
          { id: dscSectionIds.finder, label: "Which DSC?" },
          { id: dscSectionIds.partner, label: "Partner" },
        ]}
      />

      {/* Notice board — directly under the hero (Clinton, 04-09-2026). Renders
          null when no confirmed notice is scoped here, which is why its tab
          above is conditional on the same count. */}
      <NoticeBoard id={dscSectionIds.notices} />

      {/* The finder is the first thing on the page, deliberately. It is the
          question every visitor arrives with, and putting prose in front of it
          is what made the previous version feel like a document rather than a
          tool. */}
      <Section
        id={dscSectionIds.finder}
        // ⛔ 02-09-2026 (Clinton): "in dsc page two dark is having
        // consecutively in hero and next to it." The finder was `dark` under a
        // `deep` hero — two different surface TOKENS, so the cadence check
        // passed them, but two adjacent dark surfaces read as one continuous
        // slab and the fold disappears. THE HERO CANNOT CHANGE: the layout
        // contract requires every page's opening section to be dark, because
        // the header is fixed and transparent over it and renders
        // canvas-coloured text. So the finder moved to light instead, and
        // `DscFinder` was restyled for it — the result panel stays
        // `.panel-dark`, which is the established dark-panel-on-light-section
        // pattern and keeps the answer landing with weight.
        //
        // ⚠️ A surface-cadence check that only compares adjacent tokens will
        // NOT catch this class of problem. deep/dark, and dark/light-alt at the
        // other end, are distinct tokens that still read as one surface.
        surface="light"
        // ⛔ 02-09-2026 (Clinton): "remove the circle effect [at] top right of
        // finder section." That was `texture="certificate"` — the guilloché,
        // whose concentric crescents sit in the top-right corner. Gone; the
        // bottom-left ring composition below is now the section's only
        // backdrop.
        //
        // ⚠️ `isolate` IS NOW EXPLICIT, and it is load-bearing. `Section` adds
        // it ONLY when a texture is set, so removing the texture silently took
        // it away too — and `<ArcRings>` below sits at `zIndex: -1`, which
        // without a stacking context escapes this section and paints BEHIND
        // its background, i.e. the rings vanish. Removing one decorative layer
        // would have quietly removed the other.
        className="surface-ambient-light isolate"
      >
        {/* Bottom-left ring composition. Three things about it are
            load-bearing rather than cosmetic:
              - `gradientId` MUST be unique per mounted instance. `url(#id)`
                resolves DOCUMENT-wide, not per-<svg>, so a duplicate would
                silently light from whichever <defs> mounted last.
              - `zIndex: -1`, NOT `.arc-rings`' own `z-index: 0`. A positioned
                z-0 layer paints at step 6 of the painting order and in-flow
                TEXT paints at step 5 — i.e. it would sit ON TOP of the
                finder's copy. At -1 it paints above the section background and
                below everything else, with nothing for the content to
                remember. The section already carries `isolate` (Section adds
                it whenever a texture is set), so the negative index stays
                contained.
                ⚠️ It is an INLINE STYLE, not a `z-[-1]` class, and that is not
                laziness: `.arc-rings` is UNLAYERED CSS in theme.css, so it
                beats Tailwind's `@layer utilities` and the class silently lost
                — measured `zIndex: "0"` with the class applied. Same
                specificity trap as `.field-bare`'s focus ring.
                ⚠️ `pointer-events: none` on `.arc-rings` means an
                `elementFromPoint` check CANNOT detect this — it passes through
                the overlay and reports the text as hittable either way. Read
                the computed `zIndex`, or look at a screenshot.
              - The arc is TRANSLATED into the corner, never mirrored.
                DESIGN.md §3.1's "one specific shape" only holds while every
                instance is the same crescent with the same handedness.
            Opacities sit below CtaBand's 0.12/0.07/0.045 ladder, which stays
            the one loud band on the site. */}
        <ArcRings
          rings={[
            { r: 176, width: 16, opacity: 0.11 },
            { r: 132, width: 12, opacity: 0.07 },
          ]}
          gradientId="dsc-finder-arc"
          svgClassName="rotate-180 -bottom-30 -left-26 h-[380px] w-[380px] md:-bottom-36 md:-left-20 md:h-[520px] md:w-[520px]"
          style={{ zIndex: -1 }}
        />
        <DscFinder />
      </Section>

      {/* ⛔ 03-09-2026 (Clinton): "remove: Portal guide / Documents required /
          After you get it — no need for that now." All three sections are gone
          from this page, along with their sub-nav tabs and their ids in
          `dscSectionIds` (nav.js) — deleting a section without deleting its id
          is how `/dsc#certificates` shipped as a dead fragment twice; the
          build-time fragment gate in prerender.mjs now catches it either way.

          ⚠️ THE CONTENT ITSELF IS NOT DELETED. `portalGuide`,
          `certificateCapabilities` and `afterIssue` are all still exported
          from content/dsc/certificates.js, unreferenced, so restoring any of
          these sections is a render-only change. Do NOT prune them as dead
          content on a later tidy-up pass.

          ⚠️ CONSEQUENCE WORTH KNOWING: the document checklists are now
          reachable ONLY through the finder, which renders on demand in JS.
          This file's own note above — and CLAUDE.md's — recorded that
          on-demand results were safe precisely BECAUSE this page carried every
          checklist as ordinary visible content. That is no longer true, so a
          crawler or a no-JS reader now sees no checklist anywhere on /dsc. */}

      {/* Partner programme, as its own section (Clinton: "show become a
          partner in dsc page as a section"). It used to be a panel tucked
          under a why-us row, which is where a reader stops looking. Content is
          `dscPartnerPromo` (nav.js) — the same object the retired DSC mega
          panel rendered as a promo card — so the two cannot drift.
          `secondaryLabel` ("Partner login") is still deliberately not
          rendered: there is no portal behind it. */}
      <Section id={dscSectionIds.partner} surface="light-alt">
        <Container>
          <div
            data-surface="dark"
            className="panel-dark grain relative overflow-hidden rounded-[var(--radius-lg)] p-8 md:p-12"
          >
            <ArcRings
              rings={[
                { r: 176, width: 16, opacity: 0.16 },
                { r: 132, width: 12, opacity: 0.1 },
              ]}
              color="var(--color-ink-600)"
              gradientId="dsc-partner-arc"
              svgClassName="-right-24 -top-28 h-[380px] w-[380px] md:-right-16 md:-top-32 md:h-[520px] md:w-[520px]"
            />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Partner programme"
                  heading={dscPartnerPromo.heading}
                  lede={dscPartnerPromo.description}
                  dark
                />
                <Reveal className="mt-8">
                  <Button as={Link} to={dscPartnerPromo.cta.path} variant="primary">
                    {dscPartnerPromo.cta.label}
                  </Button>
                </Reveal>
              </div>
              <Reveal delay={0.12} className="lg:col-span-5">
                <ul className="space-y-4">
                  {PARTNER_POINTS.map((point) => (
                    <li key={point} className="flex gap-3 border-t border-ink-700 pt-4">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-ember-300"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-ink-100">{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* The one pointer to the technical half of the practice. It is a
              single quiet row rather than a card grid: the split only works if
              /dsc stays short, and four resource cards here would start
              rebuilding the wall this page exists to avoid. */}
          <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-6">
            {/* ⛔ 03-09-2026: this line used to promise "document checklists,
                the portal-by-portal guide, token drivers, renewal and the full
                FAQ set". Two of those five were never on the Buy Token page —
                the checklists and the portal guide were sections of THIS page —
                and after today's removal the portal guide is not anywhere. A
                pointer has to name what the destination actually holds, so it
                now names only the three that are really there. */}
            <p className="max-w-[62ch] text-body text-ink-500">
              Token drivers, validity and renewal, and the full FAQ set are all in one place.
            </p>
            <Link
              to={dscResourcesPage.path}
              className="group inline-flex items-center gap-2 rounded-sm text-body font-medium text-ember-600 transition-colors hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              {dscResourcesPage.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* ⛔ 02-09-2026 (instruction 4): the sitewide CTA line is replaced here
          with one that answers the question this page is about. The closing
          clause is deliberate and is the most useful sentence on the band —
          telling someone they may not need to buy anything is the thing a
          reseller never says, and it is the honest outcome often enough to be
          worth promising. Copy is adapted from Clinton's own V7 reference. */}
      <CtaBand
        heading="Still not sure which one? Send it to us."
        lede="Give us the portal, the filing or the tender document — we will tell you exactly what you need, including when the answer is that you do not need a new certificate at all."
      />
    </>
  );
}

// ⛔ 02-09-2026: REWRITTEN OFF THE REFERRAL FRAMING. The first line used to
// read "We handle issuance, verification, dispatch and support — you stay the
// point of contact", which describes handing the work over. Partners do the
// opposite: they enrol through us and issue themselves. ⚠️ The tell is the
// verb — partners ISSUE, they do not REFER.
//
// ⚠️ NOT NEW CLAIMS. Each of these is asserted on /partner-with-us, whose
// content comes from Clinton's own reference document. No commission rate,
// joining fee or activation time appears — those are the figures that
// reference marks as placeholders and flags itself as needing real values.
const PARTNER_POINTS = [
  "Your own issuing login — you raise applications and run the video verification yourself.",
  "Your clients stay yours. We do not contact them beyond the verification steps that require it.",
  "No joining fee, free onboarding and training, and tokens at partner rates.",
];

/**
 * The hero's spec row.
 *
 * ⚠️ EVERY VALUE IS DERIVED OR ALREADY ASSERTED. A spec row is the easiest
 * place on a page for an invented number to slip in, so: the certificate count
 * is read off `certificateVariants`, "On request" is the fees: null discipline,
 * the turnaround comes from turnaround.js (value null → "Confirm with us")
 * rather than being typed, and the two certifying authorities are named
 * repeatedly in this page's own content. No client count, no years, no
 * guarantee.
 */
function heroSpec() {
  return [
    { label: "Certificates", value: String(certificateVariants.length) },
    { label: "Issued through", value: "Licensed CA" },
    { label: "Issued in", value: t("dscIssuanceTurnaround") },
    { label: "Professional fees", value: "On request" },
  ];
}
