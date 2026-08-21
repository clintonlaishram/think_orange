import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Stagger } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 4 — CONTENT-PLAN.md §6 row 4. Light surface, DESIGN.md
// §11.4's archetype ("not cards... hairlines... cost whitespace") borrowed
// for audience segments instead of stat numerals, since the brief is
// explicit that this is a plain hairline row, no cards, at this position.
//
// §6 says each segment "links to a filtered enquiry" — Contact (T7) is still
// a stub with no segment-aware query handling (that's Phase 8), so a filter
// param would point at a mechanism that doesn't exist yet. Every segment
// links to plain /contact instead; wiring a real `?for=` filter is a Phase 8
// follow-up once the form itself exists to read it.
const segments = [
  {
    label: "SMEs & growing enterprises",
    problem: "GST, accounting and filings piling up while you're busy running the business.",
  },
  {
    label: "Startups & founders",
    problem: "Incorporation, DPIIT registration and compliance set up right before you have a finance team.",
  },
  {
    label: "Professionals & consultants",
    problem: "Income tax, GST and a Digital Signature Certificate handled without pulling you off client work.",
  },
  {
    label: "Government contractors & vendors",
    problem: "GeM registration and tender documentation, so a missed step doesn't cost you a bid.",
  },
];

export function WhoWeWorkWith() {
  return (
    <section data-surface="light" className="section-pad bg-canvas">
      <Container>
        {/* This section carried a label and no heading. Rather than write a new
            sentence, the existing label is PROMOTED to the heading and the label
            becomes a plain category word. No new claim. */}
        <SectionHeading eyebrow="Clients" heading="Who we work with" />

        <Stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment, index) => (
            <Link
              key={segment.label}
              to="/contact"
              className={
                "group block rounded-sm border-t border-ink-100 px-1 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 lg:border-t-0 lg:border-l lg:px-6 lg:py-0 " +
                (index === 0 ? "lg:border-l-0 lg:pl-0" : "")
              }
            >
              <h3 className="text-h4 text-ink-600">{segment.label}</h3>
              <p className="mt-2 text-body-sm text-ink-500">{segment.problem}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600 transition-[gap] duration-[var(--dur-fast)] group-hover:gap-2.5">
                Talk to us
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
