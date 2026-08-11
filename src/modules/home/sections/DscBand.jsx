import { Link } from "react-router-dom";
import { Building2, KeyRound, Ship, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { ArcRings } from "@/components/ui/ArcRings";
import { Reveal } from "@/components/motion/Reveal";
import { dscProducts as dscNav, site } from "@/content/nav";
import { dscProducts as dscContent } from "@/content/dsc/products";

// Homepage section 8 — CONTENT-PLAN.md §6 row 8. Deep surface. Ledes are
// pulled from src/content/dsc/products.js verbatim — the real T4 page copy
// — rather than re-written here, so the teaser and the product page never
// say something subtly different about the same certificate.
const ICONS = {
  "class-3-individual": User,
  "class-3-organisation": Building2,
  "dgft-iec": Ship,
  "buy-tokens": KeyRound,
};

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
        <Reveal>
          <Eyebrow>Digital Signature Certificates</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[26ch] text-canvas">
            Issued through our eMudhra and SignX partnership
          </h2>
          <p className="mt-3 max-w-[62ch] text-body-lg text-ink-300">
            Both are licensed certifying authorities, not a reseller of
            unknown standing — the question every buyer actually has about a
            digital signature.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dscNav.map((product, index) => {
            const Icon = ICONS[product.slug];
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
                  className="card-dark group block h-full rounded-[var(--radius-md)] lg:rounded-[var(--radius-lg)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <ArcGlyph
                    variant="corner"
                    className="card-arc pointer-events-none absolute right-4 top-4 h-6 w-6"
                    style={{ color: "var(--surface-accent)" }}
                  />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ember-400/60">
                    <Icon className="h-5 w-5 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-h4 text-canvas">{product.label}</h3>
                  <p className="mt-2 text-body-sm text-ink-300">{lede}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* fees:null discipline — DESIGN.md §11.1's brief for this row is
            explicit: "No published prices until you confirm them." */}
        <Reveal delay={0.3} className="mt-8 rounded-[var(--radius-sm)] lg:rounded-[var(--radius-md)] border border-ink-700 bg-ink-900 px-6 py-4">
          <p className="text-body-sm text-ink-300">
            Pricing on request —{" "}
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-ember-300 underline-offset-4 hover:underline"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
