import { Link } from "react-router-dom";
import { Building2, KeyRound, Ship, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
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

export function DscBand() {
  return (
    <section data-surface="deep" className="section-pad-deep grain bg-ink-950">
      <Container>
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
                <Link
                  to={product.path}
                  className="group block h-full rounded-[var(--radius-md)] border border-ink-700 bg-ink-800 p-6 transition-[border-color,transform] duration-[var(--dur-base)] hover:-translate-y-1 hover:border-ember-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
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
        <Reveal delay={0.3} className="mt-8 rounded-[var(--radius-sm)] border border-ink-700 bg-ink-900 px-6 py-4">
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
