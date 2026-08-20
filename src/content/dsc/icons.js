import {
  Building2,
  CalendarClock,
  ClipboardList,
  FileSignature,
  HardDriveDownload,
  KeyRound,
  Lock,
  RefreshCw,
  Scale,
  ShieldCheck,
  Ship,
  User,
} from "lucide-react";

// One icon per DSC page. 20-08-2026, Clinton: "include icon, images make it
// clean and look premium still most of section is look too plain."
//
// This map used to live privately inside `home/sections/DscBand.jsx`, which
// meant the /dsc hub had no icons at all and adding them would have forked the
// pairing — the homepage showing a key for "Buy DSC Tokens" while the hub
// showed something else. One map, consumed by both.
//
// ⚠️ NOTE THIS IS A COMPONENT-SIDE MODULE despite living under `src/content/`:
// it imports React components from lucide. Never import it from `nav.js`,
// `seo.js`, or anything `scripts/prerender.mjs` / `scripts/content-check.mjs`
// load directly under plain Node. Same caveat as
// `src/content/insights/images.js`, which holds Vite imagetools imports for
// the same kind of reason.
//
// ⛔ ALWAYS resolve through `dscIcon()`, never by indexing this object.
// `DscBand` iterates every product in nav.js and renders `<Icon />`; a slug
// with no entry evaluates to `<undefined />`, which is a HARD React crash
// ("invalid element type"), not a graceful blank. That was a real bug caught
// before shipping when the 17-08-2026 menu restructure added three products.
// The fallback below makes the whole class of bug impossible.
const DSC_ICONS = {
  // Certificates
  "class-3-individual": User,
  "class-3-organisation": Building2,
  "combo-dsc": Lock,
  "dgft-iec": Ship,
  "dsc-renewal-reissue": RefreshCw,
  // Tokens & resources
  "buy-tokens": KeyRound,
  "documents-required": ClipboardList,
  drivers: HardDriveDownload,
  "validity-renewal-faqs": CalendarClock,
  // ⛔ eSign PAUSED — 21-08-2026. `dscIcon(slug)` has a fallback, so an absent
  // entry is safe; never index this object directly.
  // "aadhaar-esign": FileSignature,
  // "esign-or-dsc": Scale,
};

/** Never returns undefined — see the warning above. */
export function dscIcon(slug) {
  return DSC_ICONS[slug] ?? ShieldCheck;
}
