import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 10 — CONTENT-PLAN.md §6 row 10, DESIGN.md §11.1's brief
// for this row ("Split 6/6, navy inset panel on the light surface, 'Enquire
// about partnership →'"). Light-alt surface.
//
// Tiles are CONTENT-PLAN.md §10's "What we handle" list (verification,
// dispatch, driver support, renewal reminders) — deliberately NOT §10's
// "What you get" tiles, which that same section flags as unconfirmed:
// "Commission structure, joining fee and processing times must be confirmed
// by you before this page publishes. The draft preview asserted 'no upfront
// investment' and 'same-day processing' — those are commitments, not copy."
// "What we handle" describes our own operational work, not a promise to the
// partner about cost or speed, so it's safe to ship now.
const handled = [
  "Identity and document verification for your client",
  "Certificate issuance and token dispatch",
  "Driver installation support if your client gets stuck",
  "Renewal reminders, so you don't have to track expiry dates",
];

// Two rings only, and lighter than any section ladder: this is a ~600px panel,
// not a full-bleed band, so an identical opacity reads far heavier here.
const PANEL_RINGS = [
  { r: 150, width: 13, opacity: 0.16 },
  { r: 114, width: 10, opacity: 0.1 },
];

export function PartnerProgramme() {
  return (
    <section data-surface="light-alt" className="section-pad bg-canvas-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Partner with us"
              heading="Resell DSCs to your own clients, under our issuance"
              lede="For CAs, tax practitioners, advocates, consultants and IT service providers who already field DSC questions from clients. Apply once, then order per client — we handle the rest."
              headingClassName="max-w-[20ch]"
              ledeClassName="max-w-[52ch] text-body sm:text-body"
              reveal={false}
            />
            <Button as={Link} to="/partner-with-us" variant="secondary" tone="light" className="mt-6">
              Enquire about partnership
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            {/* `data-surface="dark"` is not cosmetic — this dark panel lives
                inside a light-alt section, so without it every descendant
                reading var(--surface-accent) / var(--surface-border) gets the
                LIGHT values (ember-600, ink-100). It also makes theme.css's
                `[data-surface="dark"] h3` supply the canvas heading colour,
                which is what the `!text-white` override here was working
                around — so that hack is gone.
                `.grain` needs a positioned ancestor; `.panel-dark` supplies it. */}
            <div
              data-surface="dark"
              className="panel-dark grain h-full rounded-[var(--radius-lg)] lg:rounded-[var(--radius-xl)] p-8 text-ink-300"
            >
              {/* Ink-tinted, not ember: the four tick icons are the panel's
                  only warm accent and should stay that way, and an ink arc
                  keeps this off the homepage's orange budget entirely.
                  Weights are below every section ladder — it's a small surface,
                  so the same opacity would read far heavier here. */}
              <ArcRings
                rings={PANEL_RINGS}
                gradientId="partner-panel-arc"
                color="var(--color-ink-400)"
                svgClassName="-right-20 -bottom-28 h-[300px] w-[300px]"
              />

              {/* `relative` lifts content above .arc-rings (z-index 0). */}
              <div className="relative">
                <h3 className="font-mono text-eyebrow  uppercase text-xs md:text-sm lg:text-base">
                  What we handle for you
                </h3>
                {/* Hairline-divided rows rather than plain spacing: DESIGN.md
                    §6.4's dark hairline is ink-800, and a divided list reads as
                    a ledger, which is the right register for a compliance
                    brand. `divide-y` puts a rule BETWEEN items only, so there
                    is no stray line under the last row. */}
                <ul className="mt-6 lg:mt-8 divide-y divide-ink-800">
                  {handled.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-ember-400"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-ink-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
