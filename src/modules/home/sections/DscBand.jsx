import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headset,
  ShieldCheck,
  Usb,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";
import { DscShowcase } from "@/components/ui/DscShowcase";
import { Reveal } from "@/components/motion/Reveal";
import { ProductShot } from "@/components/ui/ProductShot";
import { dscProducts as dscNav, site } from "@/content/nav";
import { dscProducts as dscContent } from "@/content/dsc/products";
import { dscIcon } from "@/content/dsc/icons";
import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 8 — CONTENT-PLAN.md §6 row 8. Deep surface. Ledes are
// pulled from src/content/dsc/products.js verbatim — the real T4 page copy
// — rather than re-written here, so the teaser and the product page never
// say something subtly different about the same certificate.
//
// Restructured 17-08-2026 from a single headline + 4-card grid into three
// stacked bands (split intro with illustration → labelled product grid →
// help strip), following a reference layout Clinton supplied. Three things in
// that reference are deliberately NOT copied, because they break this repo's
// own rules:
//   - its centred section heading. DESIGN.md §16 tell 8 is measured at 0
//     centre-aligned sections sitewide (Phase 10) and this stays left-aligned.
//   - white text on its orange button. 3.13:1, fails AA — <Button variant=
//     "primary"> is ember-400 with ink-950 text and always has been.
//   - its three feature icons sitting in filled circles. §16 tell 6 counts
//     icon-in-a-circle instances per page, and the product cards below
//     already spend four of them; these render as bare glyphs instead.
// The reference's three trust points were "Secure & Compliant / Quick
// Processing / Expert Assistance". "Quick Processing" is an unconfirmed
// turnaround claim wearing an adjective (CLAUDE.md non-negotiables), so it is
// not here. Each of these three is instead something products.js and
// drivers.js already state as fact.
const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Licensed CA issuance",
    desc: "Through eMudhra and SignX",
  },
  {
    icon: Usb,
    title: "FIPS-compliant token",
    desc: "Ships with the certificate",
  },
  {
    icon: Headset,
    title: "Setup support included",
    desc: "Drivers installed and tested",
  },
];

// ink-950 is darker than WhatWeDo's ink-900, so an ember stroke has slightly
// more headroom here before it reads as loud — but the ladder still sits below
// CtaBand's (0.07 / 0.12 / 0.045). Anchored top-right for the same reason
// WhatWeDo is: the product grid fills the lower half, and the real negative
// space is beside the headline. Radii differ from WhatWeDo's set so the two
// don't read as the same image pasted twice.
const ARC_RINGS = [
  { r: 172, width: 15, opacity: 0.05 },
  { r: 136, width: 12, opacity: 0.09 },
  { r: 100, width: 8, opacity: 0.03 },
];

export function DscBand() {
  return (
    <section
      data-surface="deep"
      className="section-pad-deep grain relative isolate bg-ink-950"
    >
      <ArcRings
        rings={ARC_RINGS}
        gradientId="dscband-arc-fade"
        svgClassName="-right-24 -top-32 h-[340px] w-[340px] md:-right-36 md:-top-48 md:h-[680px] md:w-[680px]"
      />

      <Container className="relative">
        {/* ── Band 1: split intro. 7/5, copy left, illustration right — the
            same ratio the hero and every T3 hub intro use. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              {/* Two lines, second in ember — the reference's treatment, done with a
                  plain coloured span. No gradient text (§16). */}
              <SectionHeading
                eyebrow="Digital Signature Certificates"
                heading={
                  <>
                    Digital signatures,{" "}
                    <span className="text-ember-300">simplified for you.</span>
                  </>
                }
                lede="Issued through our eMudhra and SignX partnership — both licensed certifying authorities, not a reseller of unknown standing. That is the question every buyer actually has about a digital signature."
                headingClassName="max-w-[22ch]"
                ledeClassName="max-w-[54ch]"
                dark
                reveal={false}
              />
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3">
                {ASSURANCES.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-ember-400"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="block">
                      <span className="block text-body-sm font-medium text-canvas">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-body-sm text-ink-300">
                        {desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="lg:col-span-5">
            {/* Was a bare <img alt="dsc"> — CLAUDE.md routes every image
                through <Img>, and "dsc" is not an alt text. */}
            <Img
              src="/images/home/dsc.png"
              alt="A signed digital document on a laptop beside a USB signing token."
              className="mx-auto w-full h-full max-w-[800px]"
            />
          </Reveal>
        </div>

        {/* ── Band 2: the product grid, now under its own label. */}
        <Reveal className="mt-20 lg:mt-24">
          <SectionHeading
            eyebrow="DSC solutions"
            heading="Choose the right DSC for your needs"
            as="h3"
            headingClassName="text-h3 max-w-[30ch]"
            dark
            reveal={false}
          >
            {/* The reference's short rule under the heading, left-aligned to the
                text rather than centred beneath it. Passed as children so it stays
                part of this header rather than becoming a floating sibling. */}
            <span
              className="mt-4 block h-0.5 w-16 rounded-full bg-ember-400"
              aria-hidden="true"
            />
          </SectionHeading>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dscNav.map((product, index) => {
            // Shared map, and resolved through a helper that always returns a
            // component — an unmapped slug used to render `<undefined />`, a hard
            // React crash. See content/dsc/icons.js.
            const Icon = dscIcon(product.slug);
            const lede = dscContent.find((p) => p.slug === product.slug)?.lede;

            return (
              <Reveal key={product.slug} delay={Math.min(index, 5) * 0.06}>
                {/* `card-dark` is the SAME class <Card surface="dark"> uses —
                    the gradient wash, hover ring and corner-arc draw all come
                    from one definition in theme.css, so this hand-rolled link
                    and the WhatWeDo bento grid can never drift apart. The old
                    inline hover (ungated -translate-y-1 plus a static border
                    swap) is gone; .card-dark's is pointer-gated. */}
                <Link
                  to={product.path}
                  className="card-dark group flex h-full flex-col rounded-[var(--radius-md)] lg:rounded-[var(--radius-lg)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <ArcGlyph
                    variant="corner"
                    className="card-arc pointer-events-none absolute right-4 top-4 h-6 w-6"
                    style={{ color: "var(--surface-accent)" }}
                  />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ember-400/60">
                    <Icon className="h-5 w-5 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 text-h4 text-canvas">{product.label}</h4>
                  <p className="mt-2 text-body-sm text-ink-300">{lede}</p>
                  {/* The whole card is the link, so its accessible name
                      already includes the product title above — this row is a
                      visual affordance only, not a second "Learn more" link
                      with no context (the axe `link-text` failure Phase 10
                      fixed in five other places). */}
                  <span
                    className="mt-5 inline-flex items-center gap-2 pt-1 text-body-sm font-medium text-ember-300"
                    aria-hidden="true"
                  >
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] motion-safe:group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* ── Band 3: the help strip. The reference's "Need help choosing?"
            bar, carrying the fees:null line DESIGN.md §11.1 requires of this
            row ("No published prices until you confirm them") rather than
            leaving it as a separate note below. */}
        <Reveal
          delay={0.3}
          className="mt-10 flex flex-col gap-6 rounded-[var(--radius-md)] lg:rounded-[var(--radius-lg)] border border-ink-700 bg-ink-900 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8"
        >
          <div className="flex items-start gap-4">
            <Headset
              className="mt-0.5 h-6 w-6 shrink-0 text-ember-400"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-body font-medium text-canvas">
                Not sure which DSC you need?
              </p>
              <p className="mt-1 text-body-sm text-ink-300">
                Pricing on request —{" "}
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-ember-300 underline-offset-4 hover:underline"
                >
                  message us on WhatsApp
                </a>{" "}
                and we will tell you which certificate your filings actually
                require.
              </p>
            </div>
          </div>

          <Button as={Link} to="/contact" className="shrink-0 self-start sm:self-auto">
            Talk to us
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
