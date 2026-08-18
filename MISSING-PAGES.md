# Missing Pages

Tracks routes that exist in `nav.js` (so they render and are linkable) but
have no written T2/T3 content file yet. Not a blocker doc — nothing here
stops other work — just a punch list so a gap doesn't go unnoticed.

Raised 17-08-2026, from `thinkorange-services-menu.html` (Clinton's revised
services mega-menu). That file's own visual design was **not** implemented —
only its content (category names, groupings, service names) was taken and
used to restructure `serviceCategories` in `src/content/nav.js`. Every route
below already renders today: T2 leaves fall back to `ServiceLeaf.jsx`'s
`PendingLeaf` state, and the one new T3 hub falls back to `CategoryHub.jsx`'s
tolerant no-content branches (hero + child grid + CTA, no intro/FAQ/why-us).
Nothing is broken or a 404 — this is a writing backlog, not a bug list.

---

## Services — ✅ resolved 18-08-2026

All 9 new/gap service leaves now have real, researched T2 content, and the
new Registrations & Licences hub has its `category-content.js` entry
(intro/FAQ/why-us, including the carried-over DPIIT FAQ). Written this
session: `iec-registration`, `icegate-registration`, `trademark-registration`,
`ngo-darpan-registration`, `gst-lut-export-refunds`, `trust-society-section8`,
`pf-esi-registration`, `payroll-processing-returns`, `roc-annual-compliance`,
and `personal-finance` (closing the pre-existing gap noted in
`src/content/services/index.js`'s own header comment). `msme-udyam` and
`startup-india-dpiit` had already moved into Registrations & Licences with no
content changes needed. Every new statutory fact carries a researched source
in `statutory.js`; every new ThinkOrange turnaround estimate landed in
`turnaround.js` as `value: null` per this repo's standing discipline.
`npm run lint`, `npm run content:check` and `npm run build` all pass (27 of 31
service leaves now written), and a live dev-server pass over all 9 new leaves
plus the new hub confirmed real content renders with zero console errors.

**One item stays unwritten, correctly:** `notices-assessments` (Income Tax) —
⛔ blocked the same way as `itr-filing`, `tax-planning-advisory` and
`tds-compliance` (see `BLOCKERS.md` §1, Income Tax Act 2025 renumbering, now
updated to track all 4). Do not write this content until that resolves.

**Open questions this batch surfaced** — none block rendering, every page
above is live today, but each needs CA/CS sign-off before launch, same as
every other item in `CONTENT-REVIEW.md`:
- Whether the Tamil Nadu Public Trusts Act, 2020 has been notified into force
  (`trust-society-section8.js` assumes not — public sources are genuinely
  ambiguous).
- Salem's actual Professional Tax slab table (`payroll-processing-returns.js`
  states the mechanism only, no rupee figure — two sources gave conflicting
  numbers even for Chennai's own slabs).
- The EPF wage ceiling (₹15,000) — an August 2026 proposal to raise it to
  ₹25,000 was reported but not yet notified as law.
- GST Rule 96A(1)(b)'s services-realisation window (`gst-lut-export-refunds.js`
  states 1 year per the Rule) against RBI/FEMA's separate 15-month general
  export-realisation extension.
- The ICEGATE "one AD code registration covers every port" claim — sourced,
  but customs circulars in this area move often.
- NGO Darpan's verification turnaround — sources split 7–15 vs 15–30 working
  days; the site states the latter with the conflict flagged in `statutory.js`.
- AOC-4/MGT-7's late-filing penalty amount — pre-existing gap (already
  flagged in `private-limited-company.js`), still unresolved.

---

## DSC & eSign — ✅ resolved 18-08-2026

Raised 17-08-2026, from `thinkorange-dsc-menu.html` (Clinton's revised DSC &
eSign mega-menu) — same discipline as the Services section above: content
only, that file's own visual mockup was not implemented.

All 3 new T4 products and both new T5 pages now have real content, researched
from SVS DigiCorp's live product pages (`svsdigicorp.com` — a real DSC
reseller, used to confirm what a Combo DSC actually is and how it's
positioned commercially) plus the Wikipedia eSign (India) article and several
DSC-industry sources for renewal/re-issue mechanics and the eSign-vs-DSC
comparison. Written this session:

- **T4** (`src/content/dsc/products.js`): `combo-dsc`, `dsc-renewal-reissue`,
  `aadhaar-esign` — all follow `class-3-individual`'s existing shape exactly,
  no template changes needed. `aadhaar-esign` sets `validityOptions: null`
  and `driverSlugs: []`, which `DscProduct.jsx`'s existing optional-chaining
  already skips cleanly (no token, no multi-year validity — this product is
  genuinely a different mechanism from every certificate on the page, not a
  DSC variant, and the copy says so explicitly rather than blurring the two).
- **T5** (new files `src/content/dsc/validity-renewal-faqs.js` and
  `esign-or-dsc.js`, no schema existed for either — one had to be designed):
  `validity-renewal-faqs` reads each product's `validityOptions` straight off
  `dscProducts` rather than duplicating the data (same "select by reference"
  discipline as the homepage FAQ row and the Documents Required page — a
  future validity change on any product stays correct here for free) and adds
  a renewal/re-issue/revocation explainer plus FAQs; `esign-or-dsc` is a
  comparison table + decision guide + FAQs. `UtilityPage.jsx` gained two new
  dispatch branches and render functions (`ValidityRenewalFaqs`, `EsignOrDsc`)
  for these — the "add a template dispatch branch" work this section always
  said would be needed, not just a content file.
- `DscHub.jsx` needed zero changes — it already reads `dscProducts` and the
  documents/drivers grid directly, so all 7 products and both new T5 pages
  appeared automatically once the content existed.
- **The single most important fact on both new comparison-style pages,
  double-checked against multiple sources:** Aadhaar eSign does NOT substitute
  for a Class 3 DSC on statutory portals (income tax, GST, MCA21/ROC,
  e-tendering/GeM) — those mandate Class 3 specifically and reject eSign
  outright. Stated plainly on `aadhaar-esign`'s own product page (in
  `verificationNote`, which renders as a prominent callout) and again on the
  `esign-or-dsc` comparison table, so a reader can't miss it on either page.
- `npm run lint` and `npm run build` both pass; a live dev-server pass over
  all 5 new routes plus `/dsc` itself confirmed real content renders with
  zero console errors. DSC content has no `content:check`-equivalent schema
  validator (pre-existing — see this file's Phase 7 note in `CLAUDE.md`), so
  verification here was manual: read-through plus the live render pass.

**Open questions this batch surfaced**, none blocking (every page renders
live today), each worth a vendor/CA confirmation before launch:
- Whether a specific tender/portal's encryption-certificate requirement
  applies to a given bid — `combo-dsc.js` deliberately doesn't claim GeM
  itself requires one (SVS DigiCorp's own site doesn't list GeM under its
  combo product), only that "many e-tendering portals" do; check the actual
  tender before assuming either way.
- The Aadhaar eSign delivery mechanism described (via the existing eMudhra/
  SignX partnership) is an inference from that partnership already existing
  for DSC issuance, not a confirmed fact that ThinkOrange currently offers
  eSign through them specifically — confirm before this page implies a
  concrete delivery channel that isn't actually set up yet.

### Navbar restructure (Clinton's explicit request, done — not a content gap)

- "Partner With Us" removed from the primary navbar (desktop `primaryNav`
  and the mobile menu's flat link list) and replaced with a premium promo
  card inside the DSC mega panel/mobile accordion (`dscPartnerPromo` in
  nav.js, rendered by `MegaPanel.jsx`'s `PanelPromo` and `MobileNav.jsx`'s
  `PromoCard`). The underlying `/partner-with-us` page is untouched and
  still reachable from that card, the footer, and search/direct links.
- "DSC" relabelled "Digital Signatures" in both the desktop and mobile nav.
- **Worth Clinton's confirmation, not yet acted on:** the revised menu's
  "Buy DSC Tokens" subtitle reads "HYP2003 · mToken · InnaIT" (copied
  verbatim into the mega panel as a per-item note) — but `buy-tokens`'s own
  product page content (`products.js`) still centres entirely on HYP2003 and
  doesn't mention mToken or InnaIT at all. If the actual stocked token
  brands changed, that page's `tokenNote`/copy should be updated to match;
  left alone for now rather than guessed at.
- **"Partner login"** (the promo card's secondary link) has no backing
  portal — nothing on this site authenticates a partner — so it's routed to
  WhatsApp instead. Revisit if a real partner portal is ever built.

---

## Total

Both sections on this page are now resolved. The only thing left in the
entire punch list is `notices-assessments` (Income Tax), which is genuinely
blocked rather than missing — see `BLOCKERS.md` §1. Nothing else to do here
until that clears; this file can stay as a historical record of what the
17-08-2026 menu restructure required and how it was closed out.

Follow this repo's standing content discipline on anything written in the
future: research statutory facts, don't recall them; route every figure
through `statutory.js`'s `s()` and every ThinkOrange turnaround estimate
through `turnaround.js`'s `t()`; `fees` stays `null`; run `npm run
content:check` (T2 leaves) or a live render pass (DSC/T4/T5, which has no
schema validator) before considering a batch done.

---

## Income Tax — ✅ resolved 19-08-2026

The four Income Tax leaves (`itr-filing`, `tds-compliance`,
`tax-planning-advisory`, `notices-assessments`) are written. They were never a
menu-restructure gap — they were held by BLOCKERS.md §1 until the Income Tax
Act 2025 section mapping was researched. **Every service leaf in nav.js now has
content: 31 of 31.**

Still owed on them, and tracked in BLOCKERS.md §1 rather than here, because it
is a review task and not a writing task: CA sign-off on the whole
`INCOME TAX ACT, 2025` block in `statutory.js`, plus a decision on the two facts
deliberately left unpublished (reassessment limitation periods, and the
first-appeal form number).
