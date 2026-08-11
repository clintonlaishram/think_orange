import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

// Homepage section 5 — CONTENT-PLAN.md §6 row 5. Light-alt surface, 2×2 grid
// with oversized 01–04 mono numerals in ember: "Numbers carry the
// hierarchy, not icons" (DESIGN.md §16 tell #6 — no icon-in-a-circle).
//
// The four differentiators themselves are CONTENT-PLAN.md §1's confirmed
// facts, sourced from the profile artwork verbatim ("All solutions under one
// roof", etc.) — expanded to two sentences each per §6's brief, not invented.
const differentiators = [
  {
    title: "All solutions under one roof",
    body: "GST, income tax, company incorporation, audit and Digital Signature Certificates, from a single point of contact. You explain your situation once, not to a different specialist for every filing.",
  },
  {
    title: "Technology-driven & accurate",
    body: "Bookkeeping and filings run through Tally Prime and Zoho Books, not loose spreadsheets. That's fewer transcription errors and a clean paper trail if a notice ever asks for one.",
  },
  {
    title: "Pan-India, digital-first service",
    body: "Based in Salem, working with clients across India — document collection, verification and filing happen digitally, so your location doesn't limit who you can engage.",
  },
  {
    title: "Client-centric, tailored solutions",
    body: "A one-person consultancy and a growing company need different things from the same GST return. We scope the engagement to what your business actually needs.",
  },
];

export function WhyThinkOrange() {
  return (
    <section data-surface="light-alt" className="section-pad bg-canvas-alt">
      <Container>
        <Eyebrow>Why ThinkOrange</Eyebrow>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {differentiators.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="flex gap-6">
              <span
                className="shrink-0 font-mono text-stat font-black leading-none text-ember-400"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-1">
                <h3 className="text-h3 text-ink-600">{item.title}</h3>
                <p className="mt-2 max-w-[46ch] text-body text-ink-500">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
