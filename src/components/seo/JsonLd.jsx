// One place that turns a JSON-LD object (or array of them) into
// <script type="application/ld+json"> tags — replaces three near-identical
// inline definitions that used to live in ServiceLeaf.jsx, DscProduct.jsx and
// home/sections/Faqs.jsx (see src/lib/jsonld.js's header comment). Renders
// wherever it's placed in the tree (JSON-LD doesn't need to be in <head>),
// which is what lets Phase 9's prerender script pick it up for free — it's
// already part of the body HTML the SSR pass renders, no separate injection
// step needed.
//
// Falsy items (a builder returning null when its data is empty, e.g. no
// FAQs) are filtered rather than rendering an empty/invalid script tag.
export function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (items.length === 0) return null;

  return items.map((item, index) => (
    // Structured data, not user content — safe to inject directly.
    <script
      key={item["@type"] ? `${item["@type"]}-${index}` : index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}
