// Homepage hero content — the stat row (DESIGN.md §11.4's hairline treatment,
// pulled up into the hero) and the capability card that sits over the hero
// image slot. Neither holds a statutory value (no rupee amounts, form codes,
// penalties or deadlines), so nothing here belongs in statutory.js.

import { site } from "./nav.js";

// ⛔⛔ TWO UNCONFIRMED PLACEHOLDER FIGURES BELOW — DO NOT SHIP ⛔⛔
//
// `clients` and `years` carry `confirmed: false`. Client count and years of
// experience are BOTH on CONTENT-PLAN.md §1.1's hold list, and nav.js's
// confirmed-facts block names them explicitly: "MUST NOT be rendered ... Do
// not add them speculatively." CLAUDE.md's non-negotiables say the same.
//
// They exist only because Clinton asked for dummy figures on 11-08-2026 to
// evaluate the hero layout. They are round, obviously-approximate numbers for
// exactly that reason.
//
// Before launch, do ONE of these two things:
//   1. Replace `value` with the founder-confirmed figure and set
//      `confirmed: true`, or
//   2. Delete the entry outright.
// `HeroStats` renders whatever survives, so deleting is safe and the row
// simply becomes two tiles. `npm run content:check` prints a loud warning
// while any unconfirmed stat remains.
export const heroStats = [
  { id: "clients", value: "250+", label: "Clients served", confirmed: false },
  { id: "years", value: "10+", label: "Years of practice", confirmed: false },
  // Both below are confirmed: pan-India service scope is already asserted in
  // index.html's meta description, and the location comes from nav.js.
  {
    id: "reach",
    value: "Pan-India",
    label: "Multi-state GST handled",
    confirmed: true,
  },
  {
    id: "base",
    value: `${site.locality}, TN`,
    label: "Head office",
    confirmed: true,
  },
];

/** Stats safe to render right now. */
export function confirmedHeroStats() {
  return heroStats.filter((stat) => stat.confirmed);
}

/** Stats still awaiting founder sign-off — surfaced by content:check. */
export function unconfirmedHeroStats() {
  return heroStats.filter((stat) => !stat.confirmed);
}

// Plain-language summaries of the six service clusters in nav.js. Descriptive
// scope only — deliberately no counts, no fees, no turnaround claims, and no
// form codes, so this stays outside statutory.js's remit. Keep each to one
// line; this card is scannable, not a services page.
export const heroCapabilities = [
  "GST returns, refunds & departmental notices",
  "Income tax filing and year-round planning",
  "Company, LLP & MSME incorporation",
  "Internal audit and monthly bookkeeping",
  "GeM registration and tender documentation",
  "Class 3 & DGFT Digital Signature Certificates",
];
