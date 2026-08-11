import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

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

export function PartnerProgramme() {
  return (
    <section data-surface="light-alt" className="section-pad bg-canvas-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Partner with us</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[20ch]">
              Resell DSCs to your own clients, under our issuance
            </h2>
            <p className="mt-4 max-w-[52ch] text-body text-ink-500">
              For CAs, tax practitioners, advocates, consultants and IT
              service providers who already field DSC questions from
              clients. Apply once, then order per client — we handle the
              rest.
            </p>
            <Button as={Link} to="/partner-with-us" variant="secondary" tone="light" className="mt-6">
              Enquire about partnership
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-lg)] bg-ink-900 p-8 text-ink-300">
              <h3 className="font-mono text-eyebrow uppercase !text-white">
                What we handle for you
              </h3>
              <ul className="mt-5 space-y-4">
                {handled.map((item) => (
                  <li key={item} className="flex items-start gap-3">
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
