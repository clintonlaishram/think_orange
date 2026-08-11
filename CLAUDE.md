# ThinkOrange Website

Design system: DESIGN.md — tokens only, no raw hex, no arbitrary px.
IA and content: CONTENT-PLAN.md — 49 routes, 9 templates, data-driven.
Imagery: IMAGE-PLAN.md — real assets only, no AI-generated people, ever.
Execution: BUILD-PLAN.md — phases, model routing, done-when criteria.

## Non-negotiables
- Primary buttons: ember-400 bg with ink-950 text. Never white text on orange (3.13:1, fails AA).
- No gradient text, no floating blurred blobs, no icon-in-a-circle everywhere. See DESIGN.md §16.
- Orange stays under ~12% of any viewport. One full-orange band on the whole site.
- Never invent a fee, client count, year of establishment, turnaround guarantee, or testimonial.
  `fees: null` renders "On request". That is correct, not a gap.
- Location is Salem, Tamil Nadu. Not Delhi.
- All scroll reveals are once:true. Body copy, footers, tables and forms never animate.
- Stack: React 19, Vite 8, Tailwind 4, motion/react, react-router 7. JS, not TS.
- No bare `<img>` tags — every image goes through the `<Img>` component (Phase 1, IMAGE-PLAN.md §8.4).
- No AI-generated people, offices, or certificates, anywhere, under any circumstance. IMAGE-PLAN.md §2.
- Screenshots must be redacted (flattened, not blurred/layered) of PAN/GSTIN/DIN/names/amounts before use.

## Current state
- Phase 0 (scaffold) complete. `npm run dev` and `npm run build` both pass.
- Phase 1 (design tokens & primitives) complete. `theme.css` has the real @theme
  block, self-hosted Satoshi (4 weights, real files in public/fonts), Instrument
  Serif + Plex Mono via @fontsource, fluid type scale, .grain, surface CSS vars.
  Primitives live in src/components/ui/ (Button, Card, Chip, Input, ArcGlyph, Img,
  Figure) and src/components/layout/ (Container, Section, Eyebrow), motion wrappers
  in src/components/motion/ (Reveal, Stagger, LineMask, Counter). Verified at
  /kitchen-sink (dev-only fixture route, not part of routeTable.js).
- Phase 2 (nav.js + navigation + footer) complete. `src/content/nav.js` is now the
  keystone and `routeTable.js` is DELETED. Everything derives from nav.js: the two
  mega panels, mobile accordion, footer sitemap, breadcrumbs, contact form's service
  select (`serviceSelectOptions()`), the router (`allRoutes`), and Phase 9's sitemap
  (`sitemapPaths()`). Never hardcode a path or label anywhere else.
  Components: `components/navbar/` (Header, MegaPanel, MobileNav, Logo),
  `components/footer/Footer`, `components/layout/` (RootLayout, Breadcrumbs).
  Hooks: `useHoverIntent`, `useScrolled`.
- `vite-react-ssg` is NOT installed — it conflicts with the locked react-router v7 peer
  range. Phase 9 prerenders via React Router v7's own static-rendering primitives
  instead (`createStaticHandler` / `createStaticRouter` / `StaticRouterProvider`).
  Re-check `vite-react-ssg` for v7 support before Phase 9 in case that's changed.
- ⛔ **Read BLOCKERS.md before writing any income-tax content.** The Income Tax
  Act 2025 took effect 01-04-2026, replacing the 1961 Act: ~every section
  renumbered, "Assessment Year" abolished for "Tax Year", TDS forms renumbered
  (24Q→138, 26Q→140, 27Q→144, 27EQ→143), salary TDS now s.392. ITR Filing, TDS
  Compliance, Tax Planning & Advisory and the Compliance Calendar are all
  affected. GST content is unaffected — different Act.
- **17 of 21 service leaves written — Phase 3 is effectively complete except
  for the income-tax-blocked four.** Done: gst-registration (exemplar),
  gst-return-filing, gst-notices-litigation, gst-itc-refunds,
  private-limited-company, llp-registration, opc-registration,
  partnership-firm, proprietorship, bookkeeping, internal-audit,
  specialised-audit, gem-registration, tender-documentation, msme-udyam,
  startup-india-dpiit, business-loan. Only remaining: itr-filing ⛔,
  tds-compliance ⛔, tax-planning-advisory ⛔, personal-finance (partly) — all
  blocked on BLOCKERS.md §1, not on research or writing capacity.
- Phase 3d also complete: `src/content/dsc/products.js` (4 DSC products),
  `src/content/dsc/drivers.js` (4 driver compatibility + install +
  troubleshooting — download URLs/versions/file sizes deliberately `null`
  pending Phase 7 real file sourcing, same discipline as `fees: null`), and
  `src/content/compliance-calendar.js` (recurrence-rule based, with
  `nextOccurrence()`/`upcomingDeadlines()` helpers — ITR due date deliberately
  omitted, AOC-4/MGT-7 marked `illustrative: true` since they're AGM-relative
  not fixed dates). **UI note left in that file:** format dates with a local
  formatter, never `toISOString()` — it silently shows the wrong day for any
  IST user.
- Batched by shared research domain throughout (entity-formation together,
  tenders together, audit/accounting together) rather than by priority order —
  one research pass serves the whole cluster.
- `content:check`'s inline-fact scanner only catches QUANTITATIVE patterns
  (₹/%/dates/durations) via regex. It missed a qualitative fact
  ("exempt from Earnest Money Deposit") stated as plain prose instead of
  `s("gemEmdExemption")` in tender-documentation.js — caught by ESLint's
  unused-import warning instead, purely by luck (the unused `s` import
  flagged it). Be alert for this class of miss in future leaves; the scanner
  is not a complete substitute for reading the diff.
  `src/content/statutory.js` and `src/content/turnaround.js` exist — read
  CONTENT-PLAN.md §13.0 before writing any leaf. `src/content/services/_schema.js`
  has the validator. Exemplar: `src/content/services/gst-registration.js` — brief
  later batches as "follow the pattern in gst-registration.js".
  Two commands: `npm run content:check` (validates + fails on hardcoded facts) and
  `npm run content:review` (regenerates CONTENT-REVIEW.md for CA sign-off).
  Still to write: Phase 3b (4 Opus leaves), 3c (16 Sonnet leaves), 3d (DSC/drivers/
  calendar, Haiku).
- Every route still renders `PageStub` EXCEPT `/` — Phases 1-2 built primitives and
  chrome, not page templates. T2 must handle unwritten leaves gracefully (20 of 21
  have no content yet) — `getServiceContent(slug)` returns undefined, don't assume a hit.
- Phase 4 (Arc Field + Hero) complete. `src/components/hero/ArcField.jsx` (the five
  layers, §8.1 structure verbatim), `src/hooks/useBloom.js` (§8.3, note the path —
  §8.3 says `components/hero/`, it lives with the other hooks), and
  `src/modules/home/sections/Hero.jsx`. All Arc Field / Hero CSS is in `theme.css`
  under two new section comments, not a separate stylesheet.
  **Home now renders the real Hero plus a one-line marker section for Phase 5** —
  deliberately not placeholder versions of sections 2-14, since §11.1's alternation
  is the design and a stand-in breaks the cadence it stands in for.
  - §8.2's raw `rgba()` values are re-expressed as `color-mix()` over the tokens
    (CLAUDE.md's no-raw-hex rule); the exact mapping is documented in the theme.css
    section header. `.arcfield__base`'s gradient turned out byte-identical to
    §7.2's `--gradient-deep`, so it consumes that token.
  - Added `formatDueDate()` (DD-MM-YYYY, local) and `deadlineCountdown()` to
    `compliance-calendar.js` so Phase 5's calendar section doesn't re-roll them.
    Also documented there: **callers must pass a `today` normalised to LOCAL
    MIDNIGHT.** Pass a mid-afternoon Date and `nextOccurrence`'s `candidate < today`
    test skips a deadline falling on today itself, rolling it a whole period forward.
  - The hero card does NOT use `Chip` — the "chip on dark/deep" contrast gap below is
    still unresolved, so day-counts render as mono text (ember-300 when
    due-soon/overdue, ink-200 otherwise). The gap still needs resolving for Phase 6.
  - `useBloom` adds a `(min-width: 768px)` guard beyond §8.3, mirroring the theme.css
    breakpoint that sets `display:none` on the bloom below md — otherwise the rAF loop
    transforms an invisible element on every mobile frame. Verified: at 375px no
    inline transform is ever written.
  - ⚠️ **Phase 9:** the hero's deadlines are computed at render, so a prerendered
    build bakes the build date into the HTML. The static pass must recompute after
    hydration or exclude that card.

## Phase 4 deviations and measurements — read before Phase 5
- **§9.5's "≤3 composited layers" budget is NOT met, and is unreachable as specified.**
  §8.2 alone defines four layers carrying `will-change: transform` (grid, both rings,
  bloom), three of which animate transform continuously; §11.2 then adds a floating
  card and a bouncing chevron, both transform animations. Chrome composites every one
  regardless of `will-change`. Measured via CDP `LayerTree` (what the DevTools Layers
  panel shows): 20 layers page-wide, ~10 attributable to the hero. Dropping
  `will-change` changes nothing — an actively animating transform is promoted anyway.
  This is a spec-internal conflict, so §8 was implemented as written and the budget
  flagged rather than silently deviating from either. What the budget was protecting
  is fine: those layers only composite, they never repaint.
- **60fps confirmed by real measurement, not eyeballing.** rAF frame deltas while
  scrolling past the hero, two runs: mean 16.66/16.67ms, median 16.6/16.7ms, p95
  18.1/17.5ms, max 19.0/18.1ms, **zero frames over 33ms**. Locked 60.0fps with no
  dropped frames, and in software-composited headless Chrome, i.e. pessimistic.
- **Verification gotcha that will cost the next session an hour if unknown:** the
  in-app preview pane reports `document.visibilityState === "hidden"`, which suspends
  `requestAnimationFrame` AND `IntersectionObserver` delivery. Every mount-triggered
  reveal therefore looks permanently stuck mid-animation, and `useInView` never fires,
  so `Reveal`/`LineMask`/`useBloom` all appear broken when they are not. Screenshots
  force a burst of frames; `computer{action:"wait"}` sometimes does. For anything
  timing- or IO-dependent, drive a real Chrome over CDP instead (Node 22 has a native
  `WebSocket`, so no dependency is needed) — that is how the numbers above were taken.
- The headline is **three** `LineMask` lines, not §11.2's two. "Compliance, without"
  rewraps inside its own `overflow:hidden` wrapper at display-xl over a 7-column
  measure, which reveals two visual lines as one block and loses the 80ms cascade.
  Each `lines` entry has to be a line that actually fits.
- The scroll affordance is deliberately NOT wrapped in `Reveal`: it sits at the fold
  edge, outside Reveal's `-12%` bottom rootMargin, so it would stay at opacity 0 until
  the user had already scrolled past it.
- The trust line renders `site.legalName · site.location` only. §11.2 asks for
  "[registrations, years, clients]" — all three are numeric claims on CONTENT-PLAN.md
  §1.1's hold list, so none are typed in.
- ~~The hero's internal rhythm is tuned so the whole composition clears the fold at
  800px.~~ **Superseded by the 11-08-2026 hero revision below** — the hero is now
  ~1100px at desktop and deliberately exceeds one screen.
- Reduced motion was verified by injecting §8.2's reduced-motion rules unwrapped and
  clearing motion's inline styles (what `useReducedMotion`'s `initial={false}`
  yields), because no available browser tool toggles the media query. Composition is
  complete: arcs frozen at 156°/24°, no bloom, no float, no chevron bounce, all copy
  and the deadline card fully visible. Worth a real re-check with an OS-level toggle.

## Hero revision + 1800px container — 11-08-2026 (post-Phase 4, pre-Phase 5)

⛔ **LAUNCH BLOCKER: two invented stats are rendering.** `src/content/home-hero.js`
holds `clients: "250+"` and `years: "10+"` with `confirmed: false`. Both are on
CONTENT-PLAN.md §1.1's hold list and nav.js forbids rendering them speculatively;
they exist only because Clinton asked for dummy figures to judge the layout.
`npm run content:check` prints a warning every run (it does not fail — that would
just be noise during design work). **Replace with founder-confirmed numbers or
delete the two entries before launch.** `HeroStats` renders whatever survives, so
deleting is safe and the row becomes two tiles.

- **Container is 1800px, not 1280px** (DESIGN.md §6.2 updated). Gutters are
  `px-6 / md:px-10 / lg:px-18`. `Header.jsx` duplicates that gutter chain in TWO
  places (the nav row and the mega-panel wrapper) rather than nesting `Container` —
  if you change the gutters, change all three or the nav stops aligning with content.
- **Flexbox gotcha, cost real time:** `Container` carries `mx-auto`, and flexbox
  suppresses cross-axis stretch on a flex item that has an auto margin on that axis.
  So `Container` collapses to shrink-to-fit whenever it is a DIRECT child of a
  column-flex parent — it was silently doing this in the Hero, invisible at 1280px
  because shrink-to-fit happened to be close to the cap. The Hero now nests it one
  plain `<div>` deeper. Watch for this in every Phase 5 section that centres content
  vertically with flex.
- **Hero now renders:** 7/5 grid (copy left; image slot + two cards right), then a
  4-tile hairline stat row, then the scroll affordance. `HeroShowcase` puts the two
  cards in NORMAL FLOW and the image as an absolutely-positioned backdrop —
  deliberately inverted, so a card can never be clipped by a fixed-ratio image box,
  and so it degrades to a plain stack below `lg` with no positioning to unwind.
- **Hero image slot exists but has no asset.** IMAGE-PLAN.md §4.1 previously said
  "the hero needs no photograph — do not add one"; that is updated to record the new
  slot, and `home-hero` is now listed in the manifest as **T1 only**. Every folder
  under `public/images/` is still empty, so `heroPicture` is `null` and `Figure`
  renders `ShowcaseBackdrop` per §6's interim pattern. §2 Tier 3 still forbids an
  AI-generated office interior here. Wiring the real photo is a one-line change,
  documented at the top of Hero.jsx.
- **Cards are translucent, NOT glassmorphic.** DESIGN.md §7.5 keeps `backdrop-filter`
  exclusive to the sticky nav; §7.5 now also states that translucency *without* blur
  is a separate, permitted thing. `.hero-card` is `ink-800` at 86%, so the arc and
  ledger grid read through it. Chosen over real glass on Clinton's call — it also
  keeps two large blur surfaces off the mobile compositor.
- **The arc now renders on phone**, which §8.2 originally suppressed below 768px.
  One ring only, `animation: none`, `blur(46px)`, geometry in vh. Two traps, both
  documented in theme.css because both produced a ring that was "visible" yet showed
  nothing:
  1. The conic's bright band peaks at 176deg — the ring's BOTTOM — and the ring is
     centred above the viewport, so rotation must leave that band pointing down.
     §8.2's reduced-motion 156deg swings it off screen entirely.
  2. `radial-gradient(circle, …)` defaults to farthest-corner, so the mask's 56%/73%
     stops resolve against the half-DIAGONAL (0.707 × width), not the half-width.
     The band actually sits at 0.396–0.516 × width from the centre, ~40% further out
     than the naive reading.
- Tablet (768–1023px) keeps both rings animating, with ring geometry nudged into
  frame. Stat values stay at `text-h3` until `lg` — at `h2` the word-valued tiles
  ("Pan-India", "Salem, TN") wrap mid-word in both the 2×163px phone and 4×188px
  tablet tracks.
- The stat row's Reveal uses `delay={0.2}`, not the hero cascade's +520ms: Reveal is
  scroll-triggered and this row is below the fold on any laptop, where 520ms would
  land as visible lag after it scrolls in.
- Verification note: the two cards and the stat row are legitimately at opacity 0
  until scrolled into view on short viewports. A screenshot taken with
  `captureBeyondViewport` therefore shows them blank and looks like a bug — scroll
  the page through the hero first, then capture.

## Phase 5 (Homepage sections) — complete, 11-08-2026
All 14 rows of CONTENT-PLAN.md §6 are built and wired into `src/modules/home/index.jsx`:
`TrustStrip`, `WhatWeDo`, `WhoWeWorkWith`, `WhyThinkOrange`, `HowWeWork`,
`ComplianceCalendarHome`, `DscBand`, `DriverDownloads`, `PartnerProgramme`,
`Testimonial`, `Insights`, `CtaBand` — all in `src/modules/home/sections/`.
Rendered surface cadence verified programmatically (real Chrome via CDP, reading
`[data-surface]` off the live DOM, not eyeballed): `Deep → Light → Dark → Light →
Light-alt → Dark → Light → Deep → Light → Light-alt → Ember → Deep`. Zero
consecutive repeats, zero console errors.

- **CONTENT-PLAN.md §6 is the authoritative per-section brief, not DESIGN.md §11.1.**
  The two disagree in places (§11.1 calls row 4 "Numbers"/stat-counters; §6's actual
  row 4 is "Who we work with", a plain audience-segment row) — §6 has the real
  content decisions (e.g. swapping DESIGN's abstract "Packages" placeholder for DSC
  band + Driver downloads + Partner programme, since publishing package prices hits
  the same `fees: null` wall). Follow §6's Presentation column; consult DESIGN.md
  §11.x only where §6 explicitly cites it.
- **Testimonial and Insights are flag-gated, per BUILD-PLAN.md's "wired, not
  shipped."** `src/content/testimonials.js` and `src/content/insights.js` are both
  empty arrays with a comment explaining why (CONTENT-PLAN.md §6: inventing either
  is "dishonest and easy to spot" / "worse than no blog"). Both components return
  `null` on empty data — `Insights` specifically requires 4+ articles, not just >0,
  so a single first post can't go live looking like a thin one-item "editorial"
  section. Add real, consented content to those two files and the sections turn on
  with zero changes to `home/index.jsx`.
- **Found and fixed a real bug in the existing Footer** (predates Phase 5):
  the "Next due" widget read `item.dueDate` straight off raw `complianceCalendar`
  entries, which are recurrence RULES with no `dueDate` field — only
  `upcomingDeadlines()` computes one against `today`. It was rendering
  blank/undefined dates every time. Now uses the same helper the hero card and the
  homepage calendar section use, so all three can never drift apart again.
- **The homepage's compliance calendar section departs from DESIGN.md §11.6 in two
  places, both because the real data doesn't match what the brief assumed:**
  filter chips are `All · GST · Income Tax · ROC`, not `...· TDS` — there is no
  separate "tds" category in `compliance-calendar.js` (TDS Payment is filed under
  `"income-tax"`); a TDS chip would either duplicate Income Tax or filter to
  nothing. And there's no "View full calendar →" link, because no dedicated
  calendar route exists anywhere in nav.js's 49 routes — linking to one would 404.
  A row's chevron only renders when its category maps to a real
  `serviceCategories` path (gst, income-tax); ROC rows (AOC-4, MGT-7) render
  without one rather than guessing a link, since no written category covers ROC
  filings yet.
- **CTA band's sub-line is NOT "response within one working day"** — that's
  CONTENT-PLAN.md §6's own draft copy, but it's a ThinkOrange turnaround
  *commitment*, not a fact, and turnaround.js's discipline (mirrors `fees: null`)
  says that never gets typed directly into a component. Added a new
  `enquiryResponseTime` key to `turnaround.js` (`value: null`, fallback "We respond
  fast") rather than hardcoding the draft's specific timeframe — same pattern as
  every other unconfirmed operational estimate in that file.
- **`.grain`'s opacity is now overridable** via an inline `--grain-opacity` custom
  property (default stays 3.5% for existing dark/deep usage). CTA band needed
  DESIGN.md §11.11's specific 2%, and a second CSS class for one number felt like
  the wrong shape — used by `CtaBand.jsx` only, so far.
- **CTA band arc is now THREE concentric gradient rings** (Clinton's call,
  11-08-2026), not §11.11's single arc. Points worth keeping:
  - The rings are not a new shape. `arcPath(r)` in `CtaBand.jsx` decomposes the
    established Footer/hero crescent (`M340 200a140 140 0 1 1-66.5-119.2`) into
    centre + radius + a 301.6° sweep, then re-derives it per radius — verified to
    reproduce the original byte-for-byte at r=140. DESIGN.md §3.1's "repetition of
    one specific shape" only holds if it's literally the same arc, so don't
    hand-author new ones; add a radius to `RINGS`.
  - §11.11's 12% ink-950 is kept for the DOMINANT (middle) ring; the outer/inner
    pair sit at 7% and 4.5% so the set reads as depth, not as 3× the ink.
    Aggregate weight stays in the spirit of the single-arc spec.
  - **Radii/widths are chosen so the strokes never overlap** (21.5 and 25 units of
    clear space). That's load-bearing, not incidental: non-overlapping strokes mean
    opacities can never stack, so 12% is provably the worst case behind text.
    Contrast checked at that worst case — ink-950 heading 4.96:1, ink-900 sub-line
    4.69:1, both above the 4.5:1 AA floor. Widen a stroke or close a radius gap and
    that guarantee breaks; re-check contrast if you do.
  - ONE gradient shared via `gradientUnits="userSpaceOnUse"`, so the fade runs
    continuously across all three and they read as one object. Per-ring
    `objectBoundingBox` gradients restart the ramp on each radius and the set stops
    cohering. Stop opacities are RELATIVE (they multiply with each ring's
    `opacity`), so `RINGS` stays the single source of absolute weight — it's the
    one knob to turn if the effect wants to be stronger or quieter.
  - Deliberately STATIC. Counter-rotating animated rings are the hero's signature
    (§3.1, §8.2) and §16's closing principle is that designed pages apply each
    effect in one place — animating these would spend that idea twice.
  - **A second, smaller 2-ring echo now sits in the top-left corner** (`CORNER_RINGS`,
    same session), bracketing the section against the main bottom-right composition.
    Same arc, same handedness — never mirrored, per §3.1. It references the main
    ring's gradient by id rather than a second `<defs>`: `url(#id)` resolves
    document-wide, not scoped to its enclosing `<svg>`, so one gradient lights both
    corners from a consistent direction with nothing to keep in sync by hand.
- **Bug caught before it shipped, in `TrustStrip`'s own marquee:** the standard
  "duplicate the track, `translateX(-50%)`, loop forever" trick is only seamless
  if the two halves are EXACT pixel mirrors. Using Tailwind's flex `gap` for the
  spacing breaks that — `gap` sits between items, outside any single item's box,
  so a doubled N-item row has `(2N-1)` gaps (an odd count for an even item total),
  and halving the row's total width lands half a gap short of where the second
  copy needs to start. Fixed by moving the spacing onto each item's own
  `margin-right` instead of the parent's `gap` — then every item (including the
  copy boundary) carries its own trailing space, the two halves really are
  identical, and `-50%` is exact. Caught by doing the arithmetic before shipping,
  not by eyeballing it — worth the same care anywhere else a doubled-track
  marquee shows up.
- **`Page.captureScreenshot`'s `clip` param does not do what its name suggests
  once the page is scrolled** (a verification-tooling note, not a site bug): after
  `scrollTo`, an explicit `clip: {x:0, y:0, w, h}` reliably came back blank in
  headless Chrome over CDP, repeatedly, even with a rAF-flushed scroll beforehand.
  Dropping `clip` entirely and capturing the default current viewport worked
  correctly every time. If a future verification pass needs to screenshot a
  scrolled page section-by-section, scroll first, then call
  `captureScreenshot({format:"png"})` with no `clip` — don't fight it.
- **HowWeWork's arc-draw-on-scroll is genuinely scroll-linked, not a fixed
  reveal-on-mount fake** — confirmed by capturing it at a scroll position
  mid-section, where nodes 1–3 were lit and node 4 wasn't yet, proving the
  `pathLength` spring actually tracks `useScroll`'s live progress rather than
  animating to completion regardless of scroll position.
- The 4 node positions on the desktop arc are sampled EXACTLY on the quadratic
  bézier that draws the connector (`t = 0, 1/3, 2/3, 1`), not eyeballed — so a
  node's centre never drifts off the visible line. Mobile/tablet use a plain
  vertical connector rather than a second curve-sampling exercise for a shape
  nobody compares side-by-side with the desktop version.
- Session-interruption note for whoever reads this next: mid-way through this
  phase the session was stopped and resumed. `Hero.jsx`'s deadline card had been
  left commented-out from that interruption (dead imports, one card missing,
  inconsistent `self-start`/`self-end` alignment) — restored before Phase 5 wiring
  was verified. If a future interruption leaves similar half-finished edits, check
  `git diff` / recently-touched files before assuming the last-seen state was a
  deliberate design decision.

## Writing content — the rules that matter most
- **Never type a statutory fact into a leaf file.** No rupee amounts, day counts,
  form codes (REG-01, GSTR-3B), penalties or thresholds. Add it to `statutory.js`
  with its legal basis and source, then interpolate with `s("key")`.
  `npm run content:check` greps for these and fails.
- **Never type a ThinkOrange turnaround estimate either.** Those go in
  `turnaround.js` with `value: null` and render a neutral phrase until Clinton
  confirms them — turnaround guarantees are on CONTENT-PLAN.md §1.1's hold list.
  Use `t("key")`.
- **RESEARCH statutory values, do not recall them.** The training cutoff predates
  the current financial year; Indian tax law changes with every Finance Act.
  Phase 3a found Rule 14A (effective 01-11-2025) that recall would have missed.
  Every value needs a `source` URL and lands in `CONTENT-REVIEW.md` for a CA.
- `fees: null` on every leaf, always. The validator enforces it.

## Layout contract — read before building any page template
- **The header is `fixed` and transparent over the page's opening section.** So the
  first section of every page must be full-bleed to y=0 AND carry the `.page-top`
  class (= `calc(var(--header-h) + 40px)` top padding). Do NOT add top padding to
  `<main>` — that exposes the body background behind the transparent header and the
  nav's canvas-coloured text goes invisible on it. This was a real bug caught in
  Phase 2. Phase 5 should wrap this in the `PageHero` primitive so templates never
  hand-roll the offset.
- **Every page's opening section must be a dark surface** (`deep` or `dark`) because
  the transparent header renders canvas-coloured text. All templates already comply
  (T1 hero is Deep; T2-T5 open with the ink-950 compact hero). If a future template
  needs to open light, the header needs a per-route solid variant — not a local hack.

## Known gaps — resolve before/during Phase 5-6
- **RESOLVED in Phase 2:** the ember-surface button. DESIGN.md §11.11 does specify
  it ("one solid ink-950 button with canvas text") — it just isn't in §12.1's variant
  table. Now implemented as `<Button variant="onEmber">`; use it for the CTA band.
- **Chip on dark/deep/ember is still unresolved.** `due-soon` and `overdue` have
  near-zero contrast on those surfaces. They're only ever spec'd for the
  Compliance Calendar, which is a LIGHT section (DESIGN.md §11.1 row 7), so this may
  never occur on a real page — confirm before building Phase 6 rather than
  inventing variants speculatively.
- **Font payload is ~188KB against DESIGN.md §5.1's <=110KB target**
  (Satoshi 4 weights ~108KB + Instrument Serif 400/400i ~48KB + Plex Mono
  400/500 ~32KB). Fontshare's CSS API has no true variable Satoshi endpoint.
  Revisit at Phase 10 audit — subsetting or dropping an unused weight.
- **No real LQIP.** IMAGE-PLAN.md §8.4's pseudocode assumes vite-imagetools
  emits a `lqip` field; the installed version (imagetools-core, confirmed by
  reading its source) has no bundled base64/inline output format. `<Img>`
  currently cross-fades from a flat `bg-ink-50` placeholder instead of a
  blurred data-URI. A true LQIP is achievable later via a second `?w=24`
  import relying on Vite's default `assetsInlineLimit` auto-inlining small
  emitted files as base64 — not built yet, `placeholderSrc` prop is ready
  for it.

## Pulled forward from Phase 8 — sitewide floating WhatsApp button
CONTENT-PLAN.md §11: "A prominent floating WhatsApp button sitewide." Built early
(Clinton's request, small and self-contained) rather than waiting for Phase 8's
Contact page. `src/components/layout/FloatingWhatsApp.jsx`, mounted once in
`RootLayout.jsx` so it's on all 49 routes — not the homepage only.
- **Bottom-LEFT is Clinton's explicit call**, not a doc default. No position was
  specified anywhere; bottom-right is the more common convention for this pattern.
  If asked to "put it back", that means bottom-right, not removing it.
- Ember (`ember-400` / `ink-950`), not WhatsApp's own green — the palette is
  deliberately restrained to ink/ember/canvas (DESIGN.md §16), and a green FAB
  would be the one element on the page from outside that system. Reuses the same
  `MessageCircle` (lucide) icon Footer.jsx and CtaBand.jsx already use for their
  own WhatsApp links, rather than a WhatsApp brand mark — same reasoning as
  TrustStrip's text wordmarks (IMAGE-PLAN.md §7.4: don't render a brand's mark
  without it being an approved asset).
- **Found and fixed a real overlap this caused**: the button is `fixed`, 56px +
  24px inset, so it occupies the viewport's bottom-left 80×80px permanently. Below
  `sm`, Footer's bottom bar (copyright + legal links + domain) wraps onto two
  left-aligned lines and the second line landed exactly under the button —
  confirmed by screenshot, "Privacy Policy" and the domain link were genuinely
  obscured, not just close. Fixed with `pb-24 sm:pb-6` on that row: reserved CLEAR
  SPACE below the real content, so scrolling to the true end of the page leaves
  the last line of text sitting above the button's footprint. The button itself
  can't yield the space since it doesn't participate in document flow — anything
  narrow enough to wrap into that corner needs this same treatment.

## Session discipline
- One phase per session. Start fresh between phases — see BUILD-PLAN.md §5.
- Load only the plan sections a phase actually needs, not the whole document.
- Phase 3 (content) batches must stay independent — 4-5 leaf files per session, then
  a fresh session. Always build the exemplar first and reference it by name.
