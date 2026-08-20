// Article imagery, keyed by slug.
//
// ⚠️ VITE-ONLY MODULE. The `?w=…&format=…&as=picture` queries are
// vite-imagetools directives, so this file is NOT plain-Node importable —
// unlike every other file under src/content/. It must therefore never be
// imported by `nav.js`, `seo.js` or anything else `scripts/prerender.mjs` and
// `content-check.mjs` load directly through Node. Components only. (The
// prerender pass itself is fine — it builds through Vite.)
//
// Widths cover the three real render sizes: the ~112px plate on the homepage
// list, the ~700px feature panel and the ~1160px article header, plus 1600 for
// a 2x display on the widest of those. avif and webp only — the original JPEG
// stays on disk in public/ as the source of truth.
//
// Sources and licences: src/assets/insights/ATTRIBUTION.txt. All four are
// IMAGE-PLAN.md §2 Tier 2 contextual stock with no people in frame.
//
// Sources live in src/assets/, NOT public/, deliberately — and this differs
// from Hero.jsx, which imports its photo out of public/images/home/. Anything
// under public/ is copied to dist VERBATIM as well as being processed, so that
// pattern ships the untouched 1600px JPEG (and its ATTRIBUTION.txt) to every
// deploy even though no page ever requests it: 684KB of dead weight for these
// four. From src/assets only the emitted avif/webp variants are written. Worth
// migrating the hero the same way next time that file is open.
import entityChoice from "../../assets/insights/private-limited-vs-llp-vs-opc.jpg?w=224;384;768;1152;1600&format=avif;webp&as=picture";
// ⛔ eSign PAUSED — 21-08-2026. Commenting the import keeps the source file out
// of the build's emitted assets entirely while eSign is off.
// import dscEsign from "../../assets/insights/class-3-dsc-or-aadhaar-esign.jpg?w=224;384;768;1152;1600&format=avif;webp&as=picture";
import gstRegistration from "../../assets/insights/when-gst-registration-stops-being-optional.jpg?w=224;384;768;1152;1600&format=avif;webp&as=picture";
import gemTenders from "../../assets/insights/gem-registration-tender-readiness.jpg?w=224;384;768;1152;1600&format=avif;webp&as=picture";

// `alt` describes the PHOTOGRAPH, not the headline: the heading is adjacent real
// text, so restating it would repeat information a screen reader already has,
// where describing the picture adds some (WCAG 1.1.1).
const IMAGES = {
  "private-limited-vs-llp-vs-opc": {
    picture: entityChoice,
    alt: "Printed documents spread across a desk beside a pen",
  },
  // ⛔ eSign PAUSED — 21-08-2026. Uncomment with the import above.
  // "class-3-dsc-or-aadhaar-esign": {
  //   picture: dscEsign,
  //   alt: "An open laptop on a wooden desk",
  // },
  "when-gst-registration-stops-being-optional": {
    picture: gstRegistration,
    alt: "A calculator and pen resting on printed figures",
  },
  "gem-registration-tender-readiness": {
    picture: gemTenders,
    alt: "Stacked cardboard cartons on warehouse racking",
  },
};

export function getInsightImage(slug) {
  return IMAGES[slug];
}
