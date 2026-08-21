// Which `SurfaceTexture` variant backs each practice area's hero
// (Clinton, 22-08-2026: "in hero section i want different background texture
// for each service group").
//
// The mapping lives here rather than in `icons.js` because these are plain
// strings with no imports, so this module is safe anywhere — including
// `nav.js`, `lib/seo.js` and the Node scripts. `icons.js` imports lucide and
// is component-side only; do not merge the two.
//
// Every leaf inherits its CATEGORY's texture, so all five GST pages share one
// motif and all four Income Tax pages share another. That is what makes the
// texture read as "which part of the practice am I in" rather than as
// decoration that changes at random from page to page.
//
// ⛔ These are NOT the four DSC variants. Those mean something specific (a
// guilloché says "certificate", a flourish says "eSign") and reusing one here
// would assert something untrue about the page. See the block comment above
// the service motifs in `components/ui/SurfaceTexture.jsx` for why each of the
// six geometries was chosen and how they stay distinguishable.
const CATEGORY_TEXTURES = {
  gst: "cadence", // returns arrive on a cycle -> a dial of radial marks
  "income-tax": "strata", // weighted horizontal bands
  "business-setup": "frame", // nested squares, the one rectilinear motif
  "registrations-licences": "emboss", // a raised rim, two arcs plus marks
  "accounting-audit": "column", // hairline verticals, a ledger's columns
  "tenders-finance": "ascent", // rising parallels, the one diagonal
};

/**
 * ⛔ Always go through this helper, never index the object.
 *
 * Consumers map over nav.js, not over this file, so a category added there
 * without an entry here would resolve to `undefined`. `SurfaceTexture` already
 * renders nothing for an unknown variant rather than throwing, so the fallback
 * is a hero with no texture — the pre-22-08-2026 look, which is a correct
 * degradation rather than a broken page.
 */
export function categoryTexture(slug) {
  return CATEGORY_TEXTURES[slug] ?? null;
}
