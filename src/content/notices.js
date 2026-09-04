import { s } from "@/content/statutory";

// NOTICES — the single source behind two surfaces: the homepage's moving
// notice bar (`NoticeTicker`) and the `/dsc` notice board (`NoticeBoard`).
// Added 04-09-2026 on Clinton's request for both.
//
// ⛔ READ THIS BEFORE ADDING A NOTICE. A notice board is the single easiest
// place on a compliance firm's site to publish something unsourced, because
// the format invites short, confident, dated statements — which is exactly
// what CLAUDE.md's non-negotiables and CONTENT-PLAN.md §1.1's hold list exist
// to stop. So:
//
//   1. NEVER invent a deadline, a fee, a discount, an offer, a turnaround or a
//      "from <date>" announcement here. A statutory date or threshold goes in
//      `statutory.js` with its basis and source and is interpolated with
//      `s("key")` — never typed as a literal, exactly as in a service leaf.
//      A ThinkOrange turnaround goes in `turnaround.js` with `value: null`.
//   2. `confirmed: false` HIDES a notice from both surfaces. That is the
//      mechanism, not a formality — same discipline `testimonials.js` and
//      `home-hero.js` already carry. Draft freely with the flag off.
//   3. Every seed below RESTATES something this site already publishes and has
//      already had reviewed — see each `basis` line, which names where. Not one
//      is a new claim, and that is the only reason they could ship without
//      Clinton writing them.
//
// ⚠️ WHAT IS DELIBERATELY MISSING: dated announcements ("new rates from…",
// "office closed on…", "offer valid until…"). Those are the notices a real
// board carries and they are Clinton's to write — the shape supports them
// (`date`), and adding one is a one-line content edit. Nothing here fakes one
// in the meantime.
//
// Shape:
//   id        stable key (React key + future analytics)
//   scope     "site" (homepage bar) | "dsc" (board) | "both"
//   label     short mono tag — the practice area, not a severity
//   text      ONE sentence. The bar shows it inline; the board shows it as a
//             row. Long enough to be useful, short enough to read while moving.
//   href      optional — rendered ONLY on the board. The moving bar is
//             deliberately non-interactive; see NoticeTicker's own comment.
//   date      optional DD-MM-YYYY, rendered on the board when present.
//   confirmed false hides it everywhere.
//   basis     where this is already asserted on the site. Not rendered.
export const notices = [
  {
    id: "income-tax-act-2025",
    scope: "site",
    label: "Income Tax",
    // ⚠️ The date is interpolated, never typed. `s()` is the same call every
    // service leaf uses, so a correction in statutory.js reaches this bar.
    text: `The Income Tax Act, 2025 has been in force since ${s("incomeTaxAct2025Commencement")} — "Assessment Year" is gone, replaced by "Tax Year", and sections and form numbers have changed.`,
    href: "/services/income-tax",
    confirmed: true,
    basis:
      "statutory.js incomeTaxAct2025Commencement; asserted across all four Income Tax leaves (19-08-2026).",
  },
  {
    id: "class-3-only",
    scope: "both",
    label: "DSC",
    text: "Class 3 is the only class of Digital Signature Certificate still issued — a Class 2 certificate cannot be renewed as one.",
    href: "/dsc#finder",
    confirmed: true,
    basis: "content/dsc/certificates.js — the Class 2 FAQ states this position.",
  },
  {
    id: "esign-not-dsc",
    scope: "both",
    label: "eSign",
    text: "Aadhaar eSign does not replace a Class 3 certificate on statutory portals — income tax, GST, MCA21 and e-tendering all require Class 3.",
    href: "/dsc/esign-or-dsc",
    confirmed: true,
    basis:
      "Asserted three times already: aadhaar-esign's verificationNote, the esign-or-dsc comparison table, and the /dsc hub FAQ (18-08-2026).",
  },
  {
    id: "fips-token",
    scope: "dsc",
    label: "Tokens",
    text: "Every certificate we issue is installed on a FIPS 140-3 compliant USB crypto token — a certificate cannot be copied off one.",
    href: "/dsc/buy-token",
    confirmed: true,
    basis: "certificates.js tokenNote on every variant; token.js (03-09-2026).",
  },
  {
    id: "drivers-on-request",
    scope: "dsc",
    label: "Drivers",
    // ⚠️ REWRITTEN 04-09-2026, when Clinton supplied the real HYP2003
    // initialisation tool. The previous wording ("we send… the initialisation
    // tool directly rather than linking third-party installers") became false
    // the moment that file was hosted — a notice board asserting something the
    // same site contradicts two clicks away is worse than no notice. The
    // DRIVER files are still unhosted and still sent on request, so that half
    // stands; update this again when they are published.
    text: "The HYP2003 Windows installer is now a direct download — the supplied build is the initialisation utility, which erases the certificate on a token, so read the caution beside it. macOS and Linux builds are still sent on request.",
    href: "/dsc/drivers",
    confirmed: true,
    basis:
      "content/dsc/drivers.js — HYP2003's Windows row carries a real url (04-09-2026, Clinton: \"software link is for this\"); macOS, Linux and the reset-tool entry are still null.",
  },
];

const visible = notices.filter((notice) => notice.confirmed);

/**
 * Notices for one surface. "both" appears on either.
 *
 * ⚠️ Returns a NEW array each call but the SAME objects, so it is safe to map
 * over in render and safe to hold in a ref. Callers must not mutate entries.
 */
export function noticesFor(scope) {
  return visible.filter((notice) => notice.scope === scope || notice.scope === "both");
}
