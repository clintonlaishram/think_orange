// DSC GROUP MODEL — one source for how the three DSC menu groups present
// themselves, and for which group any DSC page belongs to.
//
// 20-08-2026 (Clinton: "make the design clean and premium… I want a different
// background design for each group"). Before this, `DscHub.jsx` held three
// private maps (COLUMN_EYEBROWS / COLUMN_HEADINGS / COLUMN_LEDES) keyed by
// menu label, and nothing else in the DSC tree knew a page belonged to a
// group at all — so a product page shared no visual language with the group
// it was reached through. Moving that here lets the hub, the T4 product pages
// and the T5 utility pages all resolve the SAME group and render the same
// texture, without any of them hardcoding a slug list.
//
// MEMBERSHIP IS DERIVED FROM `dscPanelColumns` (nav.js), never restated:
// that export is what the DSC mega panel renders from, so a menu change moves
// the menu, the hub's sections AND every page's background treatment
// together. Driver detail pages are the one indirection — they are children
// of the drivers hub rather than panel items in their own right, so they
// inherit their parent's group (see `dscGroupForSlug`).
//
// ⚠️ `texture` names a variant of `components/ui/SurfaceTexture.jsx`. Adding a
// fourth menu column without adding a variant is safe — the group falls back
// to no texture rather than crashing — but it will read as untreated beside
// the other three.
import { dscPanelColumns, dscDriversHub } from "../nav.js";

// Keyed by the column's own label in nav.js. A column with no entry here
// falls back to its menu label for the heading and renders untextured, so a
// future menu column still produces a complete section.
const GROUP_PRESENTATION = {
  "Digital Signature Certificates": {
    key: "certificates",
    // Guilloché — nested crescents plus an engraved tick ring. The security
    // print a certificate is printed on, in the site's own one shape.
    texture: "certificate",
    eyebrow: "Certificates",
    heading: "Choose the right certificate",
    lede:
      "Class 3 for individuals and organisations, combo certificates where a portal wants encryption alongside signing, DGFT for import-export, and renewals.",
  },
  "Tokens & Resources": {
    key: "tokens",
    // Ledger grid plus orthogonal hairlines that terminate ON the crescent —
    // a technical drawing measuring the brand shape, for the hardware half of
    // the practice. Built from the ledger-hairline idiom `.footer-grid` and
    // the hero's old L2 grid already established, not a new family.
    texture: "blueprint",
    eyebrow: "Tokens & resources",
    heading: "Already have a token, or not sure what you need?",
    lede:
      "Buy a replacement token, check what documents to gather before you apply, or get the driver your existing token needs.",
  },
  // ⛔ eSign PAUSED — 21-08-2026. Membership is derived from `dscPanelColumns`,
  // where the eSign column is also commented out, so this entry is already inert
  // — it is commented out too only so the two states cannot drift.
  // "eSign Solutions": {
  //   key: "esign",
  //   // Flowing strokes — the one genuinely organic motif on the site, and the
  //   // only place it appears (DESIGN.md §16: apply each effect in one place).
  //   texture: "signature",
  //   eyebrow: "eSign",
  //   heading: "Signing without a token",
  //   lede:
  //     "Aadhaar-based signing for contracts and agreements — and where it does not stand in for a Class 3 certificate.",
  // },
};

/** One derivation of a group's section id, shared by the sub-nav and the sections. */
export const dscGroupId = (label) =>
  "group-" +
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Every DSC group, in nav.js's own menu order, each carrying its menu label,
 * its items and its presentation. `label` stays the identity — display copy
 * and texture hang off it.
 */
export const dscGroups = dscPanelColumns.map((column) => {
  const presentation = GROUP_PRESENTATION[column.label] ?? {};
  return {
    label: column.label,
    items: column.items,
    id: dscGroupId(column.label),
    key: presentation.key ?? dscGroupId(column.label),
    texture: presentation.texture ?? null,
    eyebrow: presentation.eyebrow ?? column.label,
    heading: presentation.heading ?? column.label,
    lede: presentation.lede ?? null,
  };
});

// slug → group, built once. Panel items first; then the drivers hub's own
// children, which are not panel items themselves and would otherwise resolve
// to no group at all — a driver page would then be the only page in the DSC
// tree with no background treatment.
const groupBySlug = new Map();
for (const group of dscGroups) {
  for (const item of group.items) {
    if (!item?.slug) continue;
    groupBySlug.set(item.slug, group);
    if (item.slug === dscDriversHub.slug) {
      for (const child of dscDriversHub.children) groupBySlug.set(child.slug, group);
    }
  }
}

/**
 * The group a DSC page belongs to, or undefined for a slug that is not in the
 * DSC tree (or a future one added to nav.js outside every panel column).
 * Callers must tolerate undefined — a page with no group renders untextured,
 * which is the pre-20-08-2026 look, not a crash.
 */
export function dscGroupForSlug(slug) {
  return slug ? groupBySlug.get(slug) : undefined;
}
