import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

// Homepage section 11 — DESIGN.md §11.1 row 9: Deep surface, single large
// quote. Flag-gated per BUILD-PLAN.md Phase 5 — "wired, not shipped": this
// renders nothing while testimonials.js is empty, and needs no further code
// change in home/index.jsx the day a real, consented testimonial lands.
export function Testimonial() {
  if (testimonials.length === 0) return null;

  const quote = testimonials[0];

  return (
    <section data-surface="deep" className="section-pad-deep grain bg-ink-950">
      <Container>
        <Eyebrow>What clients say</Eyebrow>
        <blockquote className="mt-6 max-w-[42ch] text-quote text-canvas">
          “{quote.text}”
        </blockquote>
        <p className="mt-6 text-body-sm text-ink-300">
          {quote.name}
          {quote.role && <span className="text-ink-400"> · {quote.role}</span>}
        </p>
      </Container>
    </section>
  );
}
