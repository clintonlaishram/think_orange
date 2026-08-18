import { FaqSection } from "@/components/ui/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/content/faqs/home";
import { faqPageJsonLd } from "@/lib/jsonld";

// Homepage FAQ row — CONTENT-PLAN.md §229 / DESIGN.md §758's archetype
// ("accordion, with FAQPage JSON-LD").
//
// SURFACE: light-alt, and that is a cadence decision rather than a taste one.
// This sits directly after DscBand (deep) and directly before Testimonial
// (deep, per DESIGN.md §11.1 row 9). A dark FAQ here would put three
// dark-family sections back to back; light-alt keeps the alternation intact
// both today (Testimonial renders null) and once a real testimonial ships.
//
// Deliberately NO arc rings, unlike the dark sections. The motif is now on
// three sections plus the partner panel, and DESIGN.md §16's closing principle
// is that a designed page applies each effect in one place. Adding it to a
// light section too would make it wallpaper — the same failure mode as
// "icon-in-a-circle everywhere". Depth here is typographic instead.
//
// Content comes from src/content/faqs/home.js, which POINTS AT written service
// leaves rather than restating them. Nothing in this file is a fact.

export function Faqs() {
  const faqs = homeFaqs();

  // Same discipline as Testimonial and Insights: if the source data cannot be
  // resolved, render nothing rather than an empty accordion shell.
  if (faqs.length === 0) return null;

  return (
    <section data-surface="light-alt" className="section-pad bg-canvas-alt">
      {/* 19-08-2026: the layout that used to live here — the 4/8 split with a
          sticky left rail, and the accordion treatment inside it — is now the
          shared <FaqSection> / <Accordion> pair, applied to every FAQ section
          on the site at Clinton's request. This row is no longer the special
          one; it is one call site among nine. `link` per item is the only
          thing unique to it: the homepage's FAQs are POINTERS into written
          service leaves, so each answer links back to the page it came from. */}
      <FaqSection
        eyebrow="Common questions"
        heading="The questions we answer most often"
        intro="Every answer below is the same one on the relevant service page — nothing here is a summary written for the homepage."
        items={faqs.map((faq) => ({
          id: faq.id,
          question: faq.q,
          answer: faq.a,
          link: { to: faq.path, label: faq.label },
        }))}
      />

      {/* CONTENT-PLAN.md §486 requires FAQPage JSON-LD wherever FAQs render.
          Built from the SAME resolved array the accordion renders (via the
          one shared faqPageJsonLd builder — src/lib/jsonld.js — rather than
          a fourth hand-rolled copy), so the structured data and the visible
          copy can never disagree, and every answer is present regardless of
          which row is expanded. */}
      <JsonLd data={faqPageJsonLd(faqs)} />
    </section>
  );
}
