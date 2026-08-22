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

## Homepage refinement — stat motion + dark-section depth (11-08-2026)
NOT a phase. A standalone polish pass on the finished Phase 5 homepage; keep it
out of BUILD-PLAN.md's sequence. Scope was Hero's stat row plus the three dark
sections (WhatWeDo, HowWeWork, DscBand). CtaBand, Testimonial and the hero
composition itself were deliberately untouched.

- **`Reveal` now accepts a FUNCTION child** — `<Reveal>{(inView) => ...}</Reveal>`
  — so a group whose members animate their own contents can hang off the one
  IntersectionObserver the container already needs. `HeroStats` runs four tiles
  off a single observer this way. Plain-node children are unchanged; this is
  purely additive. `Counter` gained matching `play`/`delay` props: pass `play`
  and the caller's trigger drives it, omit it and it keeps its own observer.
  A `hasRun` ref makes the driven path one-shot, which `once: true` gave the
  standalone path for free.
- **`Scramble` (new, `components/motion/`)** is the word-tile counterpart to
  `Counter` — a decode reveal for stat values that aren't numbers. Two things
  in it are load-bearing and non-obvious:
  1. **Unsettled characters re-roll every ~55ms, not every frame.** At 60fps the
     glyph churn is a strobe the eye reads as noise rather than as characters.
     It also collapses ~30 React renders into ~18, since the string only
     actually changes on a settle step or a re-roll tick (guarded by a ref).
  2. **Only `[a-z0-9]` scramble.** Spaces, commas and hyphens hold position, so
     "Salem, TN" keeps its 5+2 silhouette while decoding instead of churning
     into a block of junk.
- **`.value-sizer` (theme.css) reserves the final string's width via a
  PSEUDO-element, and the pseudo is the whole point.** Both animated treatments
  change width mid-flight (Counter's digit count grows 1→3, sliding the trailing
  "+" for the full 1.2s; Scramble's random glyphs are different widths in a
  proportional face). The obvious fix — an `opacity-0` ghost span — works for
  layout but puts a SECOND copy of every value in the DOM: `innerText` read
  "250+ 250+", and so would any crawler. Caught by dumping `innerText` during
  verification, not by looking at it. Pseudo-element `content: attr(data-value)`
  holds the box without entering the text content.
- **`.card-dark` in theme.css is the SINGLE definition of the dark-card
  treatment**, consumed by both `<Card surface="dark">` and DscBand's
  hand-rolled product `<Link>`s. Change it in one place or neither. The wash is
  a static `color-mix` gradient (5% ember into ink-800 → ink-950-mixed corner)
  so the card has a light direction; the hover ring is a pseudo-element whose
  OPACITY animates, because growing a box-shadow spread repaints the whole
  border box every frame — six at once on the WhatWeDo grid. §12.2 still holds:
  the glow is cast outward only, the card surface itself carries no shadow.
- **Hover motion is `--dur-fast` (180ms), not `--dur-base`.** Hover is the
  "tens of times a day" tier; 280ms reads as lag when you sweep across a
  six-card grid. `Card`'s dark branch therefore skips the shared 280ms
  transition class, which would otherwise win on order and undo this.
- **Pointer gating was missing and now exists for the dark surface.** The old
  `hover:-translate-y-1` was ungated, so on touch a tap left the card stuck
  lifted. `.card-dark`'s hover block sits inside
  `@media (hover: hover) and (pointer: fine)`. **`Card`'s LIGHT surfaces are
  still ungated** — out of scope here, fix it when the light templates get a pass.
- **Press feedback is scoped with `:is(a, button)`.** DscBand's cards ARE links;
  WhatWeDo's are divs whose inner links are the real targets. Pressing a card
  that isn't clickable signals something false, so only genuinely-pressable
  cards get the `:active` scale. Not hover-gated — `:active` is a real press on
  touch, and it's the only feedback a touch user gets since the ring never fires.
- **The corner arc's "0→90" draw, and its honest status.** The request was a
  hover progress animation 0→90 in ember. Implemented as the EXISTING corner
  crescent (§3.1's one repeated shape) stroking on rather than cross-fading:
  `pathLength="1"` on the path normalises its geometry to a unit length, so
  dasharray/dashoffset are 1 → `--card-arc-draw` (0.1) with no measured magic
  number to drift from the `d`. Set `--card-arc-draw: 0` for a full draw.
  ⚠️ Two caveats recorded rather than hidden: this is the THIRD simultaneous
  signal for one hover (lift and ring already complete the feedback), and
  `stroke-dashoffset` is a paint property where the fade it replaced was
  composited. Trivial on a 24px SVG, but it's the weakest element of the pass —
  revisit before copying the pattern to a larger surface.
- **`ArcGlyph` was silently dropping `style`.** `Card` has always passed
  `style={{ color: "var(--surface-accent)" }}`, the component never accepted
  props, so the hover corner arc inherited the card's body-text colour and was
  never the accent. Now forwards `...props`; verified rendering ember-300.
- **`ArcRings` (new, `components/ui/`)** generalises CtaBand's ring composition.
  Position rings in the section's REAL negative space — the first pass put
  WhatWeDo's bottom-right where the bento grid occludes almost all of it; beside
  the headline is where they read. Base sizes are deliberately smaller than the
  md sizes: at 375px a 500px composition offset only -112px spans the entire
  viewport width and crossed every headline line.
  - Each instance needs a UNIQUE `gradientId` — `url(#id)` resolves
    document-wide, not per-`<svg>`, so duplicates silently light from whichever
    `<defs>` mounted last.
  - Ladders are per-section and all below CtaBand's 0.07/0.12/0.045, which stays
    the one loud band.
- **`.surface-ambient` (theme.css) gives HowWeWork §7.2's ambient radial.**
  §7.2 is explicit that dark sections "are not flat #0B1329" and should carry a
  barely-there radial capped at an 8% luminance shift — the homepage's dark
  sections were all shipping flat, so this is spec compliance, not a new effect.
  Same three stops as `--gradient-deep` (ink-700 → ink-900 → ink-950); only the
  radial's centre moved, to -30%, chosen by sweeping offsets and reading
  rendered pixels. **Applied to HowWeWork only, as asked — WhatWeDo (dark) is
  still flat and can take the same class with a one-word change.**
  - ⚠️ **`--gradient-deep` applied as-authored measures ΔL* 10.03%, over §7.2's
    own 8% cap.** The percentages in a radial are scale-invariant, so that isn't
    a section-height artefact — §7.2 sets a cap and hands you a token that
    exceeds it. Same class of spec-internal conflict as Phase 4's §9.5 layer
    budget. The written cap is honoured here (-30% → 5.33%); the token is left
    untouched because the hero's `.arcfield__base` depends on it. If the hero is
    ever re-tuned, that 10% is the number to revisit.
  - **Measuring a near-black gradient: use CIE ΔL*, not relative luminance.**
    At these values the relative-luminance shift is 0.59pp, which sounds like
    nothing and is useless for judging the cap; ΔL* reads 5.33% and is the
    number that tracks what you actually see. Both are in the verify script.
  - **Sampling trap that produced two wrong readings before it was caught:**
    scrolling the section to `block: 'start'` puts its top edge UNDER the fixed
    header, whose `rgba(7,12,28,.72)` backdrop darkens the sample. It reported
    ΔL* 2.5% and 3.0% for gradients actually measuring 10% and 12%. Always land
    the section's top edge ~110px down the viewport before sampling a
    background. Any future contrast or gradient measurement on a non-opening
    section needs the same offset.
- **`.panel-dark` (theme.css) — the Partner programme's right-hand panel.**
  Note this is the homepage `PartnerProgramme` section; `/partner-with-us`
  itself is still a `PageStub` with no cards on it at all. The panel was flat
  `bg-ink-900` with no gradient, border, inset highlight or grain — the flattest
  surface left on the page. Deliberately a SEPARATE class from `.card-dark`:
  this is a static content panel, so a hover ring, lift or arc draw would all
  signal an interaction that doesn't exist. Depth comes from surface quality
  instead. Wash stops are PURE ink — §7.1 bars the brand gradient from card
  backgrounds, so the four ember ticks stay the panel's only warm accent.
  Measured ΔL* 6.94% (within §7.2), text contrast 15.74:1 (h3) and 8.79:1 (body).
  - **`data-surface="dark"` on the panel is load-bearing, not cosmetic.** It's a
    dark panel nested in a `light-alt` section, so without it every descendant
    reading `var(--surface-accent)` / `var(--surface-border)` got the LIGHT
    values — ember-600 and ink-100. Verified now resolving to ember-300 /
    ink-700. It also lets `[data-surface="dark"] h3` supply the canvas heading
    colour, which is what the `!text-white` override was hacking around; that
    override is gone. **Any dark panel dropped onto a light section needs this
    attribute** — the surface system is attribute-scoped, not component-scoped.
  - ⚠️ **Surface-cadence checks must select `section[data-surface]`, not
    `[data-surface]`.** A nested panel now carries the attribute, so a bare
    selector reports `div:dark` between light-alt and ember and misreads the
    cadence (the footer's `footer:deep` was always a similar trap). Scoped to
    `section[...]` the cadence is unchanged and still has zero consecutive
    repeats.
  - `.grain` was missing here entirely, though §7.4 calls grain the
    "highest-value, lowest-cost anti-generic move" and applies it to all dark
    surfaces. Added; `.panel-dark` supplies the `position: relative` +
    `overflow: hidden` that `.grain::after` and the arc rings both need to stay
    inside the corner radius.
  - Ring opacities (0.16 / 0.10) are HIGHER than any section ladder and use an
    ink tint rather than ember. Both are deliberate: it's a ~600px surface, so
    section-level opacities read as invisible on it, and ink keeps the panel off
    the homepage's orange budget.
- ⚠️ **Content duplication, not fixed (it's copy, not code): "What we handle for
  you" is the heading in TWO places on the homepage** — `Hero.jsx:207` as an
  `<h2>` in the showcase card over `heroCapabilities` (service scope), and the
  Partner panel's `<h3>` over DSC partner operations. Two different lists under
  one identical heading on a single page. The hero one is also an `h2` nested in
  a card directly under the `h1`, which is a questionable heading hierarchy.
  Needs a copy decision.
- **Found: `.grain` was escaping on every hand-rolled homepage section.**
  `.grain::after` is `position: absolute; inset: 0` and needs a positioned
  ancestor; WhatWeDo, HowWeWork, DscBand and Testimonial had none, so the
  overlay resolved against an outer containing block. Fixed for the three in
  scope (verified: each grain layer's height now matches its own section's).
  **`Testimonial.jsx` still has it** — harmless while it returns null on empty
  data, latent the moment real content lands. Root cause: these sections
  hand-roll `<section>` instead of using `components/layout/Section.jsx`, which
  already includes `relative`. Prefer `Section` for anything new.
- **Found, NOT fixed (CtaBand was out of scope): it defines the SAME
  `linearGradient` id twice** (`cta-arc-fade`, in two `<defs>`), so the second
  is dead and the DOM has a duplicate id. Its own comment claims it references
  the gradient rather than redefining it — the comment is right, the code isn't.
  `arcPath()` is also now duplicated between CtaBand and ArcRings. Migrate
  CtaBand onto `<ArcRings>` next time it's open; §3.1's "one specific shape"
  only holds while the definition is genuinely single.
- **Verification tooling: CDP *can* emulate `prefers-reduced-motion`** via
  `Emulation.setEmulatedMedia({features:[{name:"prefers-reduced-motion",
  value:"reduce"}]})`. This supersedes the Phase 4 note that no available tool
  toggles the media query — the reduced-motion path is now actually testable
  rather than inferred by injecting rules by hand. Confirmed: stat values are
  final on the first sample, word tiles render no extra DOM at all, and hover
  still reaches its end state (durations collapsed to 1e-05s by §9.6's floor).
- **Measured, not eyeballed:** heading contrast over the rings is 15.61:1
  (WhatWeDo), 17.51:1 (HowWeWork), 17.07:1 (DscBand) at 375px and 17.5–18.5:1
  at 1440px — so the rings crossing a headline is an aesthetic question, never a
  contrast one. Ember coverage per dark section is 0.78% / 0.96% / 0.89%,
  far under CLAUDE.md's ~12% ceiling. Hero is 5.14%, unchanged by this pass.
  Scripts used are throwaway; the method (screenshot → decode in-page via
  canvas → count by hue/saturation, and hide text to sample the worst-case
  background beneath it) is worth re-deriving for any future contrast claim.
- **Pre-existing, unrelated to this pass:** at 375px the hero showcase card's
  "What we handle for you" heading sits over the hero's mobile arc at 4.48:1 —
  under the 4.5:1 normal-text floor, passing only as large text. Surfaced by the
  contrast sweep above. Hero was out of scope; worth a look when it's next open.

## Homepage FAQ row + Testimonial move (11-08-2026)
Both sections now sit above `DriverDownloads`, per request. Part of the same
standalone refinement pass — not a phase.

- ⛔ **THE TESTIMONIAL SECTION STILL RENDERS NOTHING, AND MUST.**
  `src/content/testimonials.js` is an empty array by design. CLAUDE.md's
  non-negotiables list "testimonial" beside fees and client counts as things
  never to invent, and CONTENT-PLAN.md §6 sets the bar: **two real quotes, with
  names and consent to publish.** The visual treatment is now built and waiting;
  the section appears the moment that file has real entries, with no code change
  in the component or in `home/index.jsx`. Do not populate it to "see how it
  looks" — a placeholder quote in that file is indistinguishable from a real one
  to the next reader.
- **`src/content/faqs/home.js` selects BY REFERENCE and must stay that way.**
  It holds `{ slug, q }` pointers; `homeFaqs()` resolves each answer out of the
  written service leaf at call time. Copying answer text into this file would
  fork it — a CA correction to a leaf would leave the homepage asserting the
  superseded version indefinitely. Consequence: **adding a homepage FAQ is not a
  writing task.** Write it in the leaf first, where `_schema.js` validates the
  word budget and `content:check`'s statutory scanner runs, then point at it.
  - Matching is on exact question text, not array index, so a leaf's FAQs can be
    reordered during review without silently swapping what the homepage shows.
  - Unresolvable pointers are DROPPED, with a loud dev-only console warning —
    a shorter list beats a blank accordion row.
  - Selection spans GST / entity choice / DSC / accounting / tenders on purpose,
    so the row reads as the whole practice. **Nothing is sourced from an
    income-tax leaf** — those four are unwritten and blocked on BLOCKERS.md §1,
    so there is no reviewed answer to point at. Do not write one here to fill it.
- **FAQ SITS BEFORE TESTIMONIAL, and the order is forced, not stylistic.**
  DscBand is Deep and DESIGN.md §11.1 row 9 fixes Testimonial at Deep, so
  quote-first would put two Deep sections back to back. A light-alt FAQ between
  them preserves the alternation. Cadence re-verified in **both** states, since
  Testimonial renders null: as-authored and as-rendered each have zero
  consecutive repeats.
- **The FAQ row deliberately has NO arc rings**, unlike the dark sections. The
  motif is already on three sections plus the partner panel; adding it to a light
  section would make it wallpaper, which is DESIGN.md §16's "apply each effect in
  one place" failing in the same way "icon-in-a-circle everywhere" does. Depth
  there is typographic — mono row numbers, hairline dividers, a sticky left rail.
- **Accordion a11y — a real defect found and fixed during verification.**
  `AnimatePresence` unmounts closed panels, so `aria-controls` on the five closed
  buttons pointed at ids that were not in the document — a dangling reference.
  Fixed by setting `aria-controls` only while the panel is mounted; the
  disclosure pattern makes it optional (`aria-expanded` is the required half).
  Verified: native `<button type="button">`, `tabIndex 0`, panel is a
  `role="region"` whose `aria-labelledby` matches its button, single-open
  enforced, and both Enter and Space activate.
  - **CDP gotcha that cost a false alarm:** `Input.dispatchKeyEvent` with
    `type: "rawKeyDown"` does NOT activate a focused button on Enter (Space still
    works, because Space activates on keyup). It reported Enter as broken when it
    was not. Use `type: "keyDown"` with `text: "\r"` and both
    `windowsVirtualKeyCode`/`nativeVirtualKeyCode` — that fires exactly one click.
  - Note `document.querySelector('[aria-expanded]')` matches the header's mobile
    nav toggle first. Scope accordion queries to `h3 > button[aria-expanded]`.
- **`FAQPage` JSON-LD is built from the same resolved array the accordion
  renders** (CONTENT-PLAN.md §486), so the structured data can never disagree
  with the visible copy, and all six answers are present regardless of which row
  is expanded. Verified: 6 questions, all with non-empty answers.
- **FAB overlap, checked because CLAUDE.md requires it for that button:** at
  1440px the WhatsApp FAB (`.whatsapp-fab`, x 1360–1416) overlaps whichever
  accordion row scrolls under it — row 5 at the tested position. It is
  **cosmetic only**: the toggle is a full-width button, so the FAB covers the
  plus icon and never the activation target. Measured `rowClickableAtLeft: true`
  for every in-viewport row at both 1440px and 375px. Inherent to a fixed FAB
  over scrolling content, not specific to this section — but if the toggle is
  ever moved to a narrow right-aligned hit area, this becomes a real blocker.
  Select the FAB by `.whatsapp-fab`; `a[href*="wa.me"]` also matches the
  in-content WhatsApp links in DscBand and the footer.

## Hero background: DarkVeil shader replaces the Arc Field's rings (11-08-2026)
NOT a phase. Requested swap of the hero's L3 layer for React Bits' DarkVeil (a
WebGL shader, `ogl` is now a real dependency). Everything removed is
**commented out, not deleted** — L2 grid, L3 rings, L4 cursor bloom — so the
original §8.2 Arc Field is restorable by uncommenting three blocks in
`theme.css` plus their `<div>`s in `ArcField.jsx`.

- **Current L-stack:** L1 base (`--gradient-deep`, untouched) → L3 `<DarkVeil>`
  via `.arcfield__veil` → L5 vignette. L2 and L4 are gone.
- **`mix-blend-mode: screen` on `.arcfield__veil` is what keeps the brand
  background.** The canvas is fully opaque (its shader hardcodes `alpha=1`), so
  painted normally it would REPLACE `.arcfield__base`. `screen` means black
  contributes nothing, so the base gradient shows through the pattern's dark
  regions and the shader only ADDS light. `.arcfield` now also has
  `isolation: isolate` — without it that blending reached past the element into
  whatever was painted behind, which is both wrong and an unscoped blend group.

### Four traps, each cost real time
1. **`preserveDrawingBuffer` defaults to `false` in ogl.** The canvas looked
   right in the viewport, but any ASYNCHRONOUS read of it (screenshot tooling,
   `toDataURL`, html2canvas, an extension) could catch it freshly cleared to
   black — the browser may clear the back buffer between frames unless told
   not to. Now `true`. Found by: an out-of-band read returned solid (0,0,0)
   while a synchronous `readPixels` right after `drawArrays`, on a hand-built
   copy of the same program, showed real colour.
2. **`renderer.setSize(w, h)` also writes `canvas.style.width/height` as INLINE
   styles.** Passing a *scaled* size (for a perf cut) therefore shrinks the
   canvas's on-screen box to that fraction, pinned top-left — the "half cut"
   symptom: rich colour in a corner, flat background elsewhere. Inline styles
   beat `DarkVeil.css`'s `width:100%`, so CSS can never win. **Pass the full
   container size to `setSize()`; put any resolution cut in `renderer.dpr`,
   which only multiplies the BUFFER.** `uResolution` is read back from
   `gl.canvas.width/height` after `setSize()` so it can't drift from what
   `gl_FragCoord` actually spans.
3. **`window.resize` is not enough — there's a `ResizeObserver` on the
   container.** `resize` fires only for viewport changes, never for
   content-driven layout (font swap, hero image load, React layout pass), any
   of which changes the hero's height after first measure. Without the observer
   an early too-small measurement gets locked in permanently — the other half
   of the inconsistent "sometimes right, sometimes cut" behaviour.
4. **⚠️ The performance panic was an artefact of my own test setup — disregard
   any low fps numbers from that pass.** The hero was measured at 2.6fps and
   the shader blamed, prompting a dpr cap of 1 and `resolutionScale` 0.75.
   Those readings came from a Chrome launched with `--use-angle=swiftshader`
   (forced software rasterization, added earlier just to get WebGL running for
   colour sampling). On the hardware renderer — verified via
   `WEBGL_debug_renderer_info` as `ANGLE Metal Renderer: Apple M1` — the page
   holds **60fps at FULL resolution**, and A/B'ing the blur, the isolation and
   the bloom all showed 60fps regardless. The resolution cut was solving a
   problem that only existed in the test environment, and it was the direct
   cause of the reported graininess (dpr-cap 1 × 0.75 on a 2× display stretched
   each rendered pixel over ~2.7 physical ones). **Always check the WebGL
   renderer string before drawing a perf conclusion in this repo.**

### The two magic numbers are measured, not chosen
Both are functions of THIS network's fixed weights — re-derive if the shader
source ever changes.
- **`EMBER_HUE_SHIFT = 225`.** `uHueShift` rotates hue in **YIQ** space, not
  HSL, so it does NOT move in step with HSL degrees — arithmetic based on "the
  pattern is 262°, ember is 19.3°, so shift 116°" produced GREEN. Found by
  sweeping 0–360° in a standalone harness, weighted-hue-sampling the real
  output pixels, and picking the minimum distance to ember-400's ≈19.3°. 225°
  is a stable basin (217–233° all land within ~2–8°), not a lone spike.
- **`Y_SCALE = 0.5`, `Y_OFFSET = -0.5`** (added uniforms; they re-frame the UV
  mapping in `mainImage`, the CPPN weights are untouched). At vendor defaults
  the pattern's vertical brightness profile is
  `[27.7, 30.7, 24.3, 10.7, 2.3, 0.5, 0.2, 0.1, 0, 0]` top→bottom — effectively
  black below 40%, which is why it "showed almost at top". **The vignette was
  measured and is NOT the cause.** Now `[26.1, 30.1, 30.9, 29.5, 26.4, 20.8,
  13.7, 7.3, 3.4, 1.5]`: full strength to ~60%, fading through band 7, gone by
  band 9. That taper point is anchored to the "Explore Services" button, whose
  bottom edge measured 64–70% of arcfield height across 1600/1920/2560-wide
  viewports (stat row starts 76–84%), so the effect reaches the CTA pair and
  falls away before washing behind the stat numbers.
  - Method for re-sweeping: build a standalone harness with the extracted
    shader, render at the hero's real aspect, average **several `uTime`
    phases** (the pattern morphs over time — one frame proves nothing), and
    score mean brightness per 10% band.
  - ⚠️ **Mobile is deliberately different and was not tuned to the button.**
    At 375px the hero is a tall stack, so the button sits at 43% and the
    profile runs `[50.4, 59.7, 54.5, 41.6, 29.4, 17.7, 7.2, 2.2, 1.4, 1.2]` —
    brighter at top (a narrow viewport makes `uv.x *= aspect` sample a
    narrower, brighter slice) and fading by ~70% rather than at the button.
    Measured acceptable (6.5% ember, 6.94:1 contrast); revisit if it ever
    needs to match desktop's relationship to the CTA.

### Removed layers, and why
- **L2 grid** — removed outright per request, no replacement.
- **L4 cursor bloom** — removed per request. It existed to add ember glow over
  the L3 rings; the veil supplies a far richer moving ember field, so it was
  redundant. It was ALSO the source of a translucent RECTANGLE that tracked the
  cursor on real GPU hardware: `filter: blur(48px)` gives an element its own
  filter region, and inside a blend group a compositor can rasterise that
  region and leave its rectangular bounds visible — matching the symptom
  exactly (hard-edged ~520px square = the bloom's box). **Not reproducible in
  headless software rendering** — an edge-detection scan across the bloom's
  boundary found no discontinuity — so it was diagnosed from a user screenshot
  and fixed by removing the mechanism. If ever restored, drop the blur and
  widen the gradient's own stops; a radial-gradient fading to transparent is
  already a smooth falloff, so the blur was never load-bearing. `useBloom`
  early-returns without `[data-bloom]`, so nothing is left running; its call
  and import in `Hero.jsx` are commented out to keep the removal legible.
- `noiseIntensity` dropped 0.045 → 0.014: `uNoise` is per-pixel, per-FRAME
  jitter (animated film grain), so it read as sizzle and compounded with the
  low render resolution. `.grain` in theme.css already supplies static texture.
- Verified after all of it: ember coverage 3.95% @1600, 2.44% @2560, 6.5%
  @375 (ceiling ~12%); h1 contrast 6.93:1 / 6.93:1 / 6.94:1; 60fps; canvas CSS
  box exactly matches its container at dpr 1 and 2; no console errors.
## Phase 6 (T2 Service Leaf + T3 Category Hub) — complete, 11-08-2026
All 21 service-leaf routes and all 8 category-hub routes (6 practice-area hubs +
the top-level `/services` variant + `/dsc`, which was already built) now render
real templates instead of `PageStub`. Zero per-slug conditionals in either
template — every leaf answers the same structure, every hub uses the same
count-aware grid; anything that looked like it needed special-casing turned out
to be a content-file problem instead (see `PendingLeaf` below).

- **`ServiceLeaf.jsx` (T2, CONTENT-PLAN.md §7)** renders 11 sections top to
  bottom: `PageHero` (compact dark hero — breadcrumb, category eyebrow, H1,
  lede, CTA), a sticky sub-nav, 2-col overview (8-col prose / 4-col sticky
  `EnquiryCard`), "Who needs this" (`ArcGlyph` bullets), "What's included"
  (`CheckCircle2` list), "Documents required" (numbered mono list, grouped by
  entity type), "How it works" (vertical numbered stepper on a dark surface),
  "Timeline & fees" (`tabular-nums` table — the fees row is hardcoded copy
  reading "On request", never sourced from data, since `fees` is always
  `null`), FAQ `Accordion` + `FAQPage` JSON-LD, related services, `CtaBand`.
  All data comes from `getServiceContent(slug)`; the template itself never
  imports a single leaf file by name.
- **`PageHero.jsx`** (`src/components/layout/PageHero.jsx`) is the shared
  compact dark hero for T2 and T3, per the Layout contract section above —
  breadcrumb + eyebrow + H1 + lede + one CTA, full-bleed to `y=0`, `.page-top`
  padding, `deep` surface. One static corner arc, no animation (that's the
  homepage hero's signature, per §16 — reused here only as a quieter echo).
- **Sticky sub-nav scroll-spy** (`SubNav`, inside `ServiceLeaf.jsx`) uses an
  `IntersectionObserver` with `rootMargin: "-30% 0px -55% 0px"` over the six
  anchored sections, not scroll-position math. It sticks at `top-16` (64px —
  `Header.jsx`'s condensed height), and `EnquiryCard`'s sticky wrapper sits at
  `lg:top-32` (header + sub-nav) so neither fixed element ever overlaps it.
- **`EnquiryCard.jsx`** (`src/modules/services/EnquiryCard.jsx`) is 4 fields
  (name, phone, email, message) that compose a pre-filled WhatsApp deep link
  on submit — the same `site.whatsappHref` pattern Footer/CtaBand/
  FloatingWhatsApp already use. Deliberately NOT a fake form post: Contact's
  real EmailJS-backed form is still Phase 8, and CONTENT-PLAN.md §11 itself
  says most enquiries in this sector arrive by WhatsApp anyway. This makes the
  card genuinely functional today rather than a placeholder. Swapping it to a
  real POST later is a change inside this one file, not the surrounding
  template.
- **`PendingLeaf`** (inside `ServiceLeaf.jsx`) is what renders for the 4 leaves
  with no content file yet (`itr-filing`, `tds-compliance`,
  `tax-planning-advisory`, `personal-finance` — all blocked on BLOCKERS.md §1).
  Shows only the nav label, breadcrumb, a plain "still being written" message,
  direct phone/WhatsApp buttons, and — if any exist — sibling leaves in the
  same category that ARE written, so a visitor to a blocked page isn't
  stranded. Nothing invented, no fake sections, doesn't crash.
- **`CategoryHub.jsx` (T3, CONTENT-PLAN.md §8)** renders: `PageHero`, a 7/5
  intro (prose left, navy inset listing children as links right — same inset
  pattern as the sub-nav card), the count-aware child grid (see below),
  category FAQs (`Accordion`), a 3-point "Why ThinkOrange" hairline row,
  related categories, `CtaBand`. All six practice-area hubs plus the written/
  unwritten mix are driven entirely by `nav.js` + `getServiceContent` — the
  component has no awareness of which specific hub it's rendering.
- **Count-aware grid, exactly per §8 row 3**: 2 children → `sm:grid-cols-2`,
  3 → adds `lg:grid-cols-3`, 4+ → same 3-col grid with the FIRST card spanning
  `lg:col-span-2` (a bento treatment, matching the asymmetric card `WhatWeDo`
  already established on the homepage). Verified at the DOM level, not just
  eyeballed: on the 7-child Business Setup hub, `private-limited-company`
  measured 857px wide against 419px for every sibling at a 1440px viewport —
  exactly 2× minus the gap.
  - **Real bug caught during this phase**: the grid was originally built with
    `Stagger` (like every other homepage grid), which wraps each child in its
    own `motion.div` — THAT wrapper becomes the actual CSS grid item, so a
    span class placed on the child inside it has zero effect on the grid's
    track sizing. Fixed by dropping `Stagger` for this one grid and using a
    plain grid `div` + per-item `Reveal` instead, since `Reveal` forwards
    `className` straight onto the element it renders and can carry the span
    itself. Same reason `WhatWeDo`'s bento grid on the homepage does the same
    thing — worth checking for this pattern any time a bento/spanning grid
    needs scroll-reveal.
- **`category-content.js`** (`src/content/services/category-content.js`) is
  the new practice-area prose layer for all 6 hubs — `heroLede`, `intro`
  (paragraphs), `faqs`, `whyUs`, `relatedCategories`. Same discipline as every
  leaf file: no rupee amounts, no day counts, no invented stats.
- **`ServicesHub.jsx`** is the top-level `/services` T3 variant (§8's own
  callout: "the sitemap page users actually use"). Lists all 6 categories with
  every child inline in one page, a "Soon" tag on any leaf with no content
  file yet, then reuses `WhoWeWorkWith` verbatim (per §8's explicit
  instruction not to refork it) and `CtaBand`.
- **`Accordion.jsx`** (`src/components/ui/Accordion.jsx`) is the shared
  `grid-template-rows: 0fr → 1fr` accordion — same technique `MobileNav`
  already used, generalised so T2 FAQs, T3 category FAQs and (later) T8's
  legal-page prose sections share one component instead of three
  reimplementations. Single-open-panel, full keyboard/ARIA wiring
  (`aria-expanded`, `aria-controls`, `role="region"`).
- **Router: no changes needed.** `router.jsx`'s `resolveComponent` already
  branched on `template` (`T2` → `ServiceLeaf`, `T3` → `CategoryHub`, with
  `/services` and `/dsc` special-cased to their own top-level components) from
  earlier scaffolding — it was routing to `PageStub` only because that's what
  the T2/T3 files exported. All 29 T2/T3 routes lit up automatically once the
  real components replaced the stubs.
- **Chip-on-dark gap (flagged after Phase 4) did not need resolving here**:
  neither template uses `Chip` anywhere. The sub-nav's active state and the
  "written/unwritten" indicators are plain text/pill treatments on light
  surfaces, so that gap is still open but still unencountered on a real page —
  next candidate to check is Phase 7 (T4/T5) or wherever a Chip is next
  spec'd on a dark surface.
- **Verification method**: `npm run lint`, `npm run content:check` (17/21
  leaves, all checks pass), and `npm run build` all clean. Then a
  puppeteer-core + headless Edge script screenshotted 11 representative
  routes — one leaf per category (`gst-registration`, `itr-filing` [pending],
  `private-limited-company`, `bookkeeping`, `gem-registration`,
  `business-loan`), a hub with all leaves written (`/services/gst`, 4/4), a
  hub with only one leaf written (`/services/income-tax`, 1/3), a 7-child
  bento hub (`/services/business-setup`), a 2-child hub
  (`/services/loans-finance`), and the top-level `/services` hub. Zero
  console/page errors across all 11. Re-confirms the Phase 4/5-documented
  gotcha: headless Chrome never fires `Reveal`'s `IntersectionObserver` for
  content below the fold unless the page has actually scrolled past it first —
  the verification script now walks the full scroll height in 600px steps
  before every screenshot, or every `Reveal`-wrapped section (which is most of
  both templates) captures as permanently blank.

## Phase 7 (T4 DSC Product + T5 Utility + DSC hub) — complete, 12-08-2026
All 11 `/dsc` routes now render real templates: the `/dsc` hub itself (T3, 1),
4 DSC product pages (T4), and 6 utility pages — the drivers hub, 4 individual
driver pages, and Documents Required (T5). Router wiring needed no changes;
`resolveComponent`'s T3/T4/T5 branches already pointed at these files.

- **Correction to the Phase 6 entry above: `/dsc` was NOT already built.**
  That entry's parenthetical ("+ /dsc, which was already built") was wrong —
  `DscHub.jsx` was still returning `PageStub` going into this session, and its
  own top-of-file comment already said so ("built in Phase 7 alongside DSC
  content"). Built now; the Phase 6 note above is left as-written with this
  correction rather than silently edited, per this file's own discipline of
  recording what actually happened.
- **`DscHub.jsx` (T3 for `/dsc`) is deliberately its own component, not a
  `CategoryHub` reuse** — `/dsc`'s children are a mix of T4 product pages and
  a T5 utility subtree, not a uniform list of service leaves, so the *data
  shape* differs even though the visual grammar (compact hero, count-aware
  bento grid, FAQ accordion, hairline why-us row, CtaBand) is kept identical
  to every other T3 hub on purpose. New content file:
  `src/content/dsc/hub-content.js` (heroLede/intro/faqs/whyUs), same
  no-invented-facts discipline as `category-content.js` — written generically
  where a fact-shaped claim was tempting, same as that file's own rule.
- **`DscProduct.jsx` (T4, 4 routes) is single-column, not the T2 sticky-
  sidebar layout** — CONTENT-PLAN.md §9 calls this "closer to a product page
  than a service page, because the buying decision is short," and T4's own
  section list never mentions a sub-nav or a sticky enquiry card the way T2's
  does. WhatsApp is the CTA throughout (hero, pricing section, driver
  support) rather than a multi-field form — reuses `site.whatsappHref` with a
  per-product pre-filled message, same pattern `EnquiryCard` already
  established. Zero per-slug branching: one component, 4 routes, driven
  entirely by `src/content/dsc/products.js` (already written in Phase 3d).
  `validityOptions: null` (the `buy-tokens` product) correctly skips the
  whole "Validity & token" section rather than rendering it empty — verified
  by screenshot, not just by reading the conditional.
- **`UtilityPage.jsx` (T5, 6 routes) dispatches on WHICH CONTENT COLLECTION a
  slug resolves against** (drivers hub / `getDriver(slug)` / documents page),
  never on a specific slug string — same discipline as `ServiceLeaf`'s
  `PendingLeaf` branch. Three genuinely different content shapes share one
  file because CONTENT-PLAN.md §9 groups them under one template, not because
  they're the same shape.
  - **`/dsc/documents-required` has no content file of its own.** It derives
    its checklist directly from `dscProducts` (`src/content/dsc/products.js`)
    grouped by product, cross-linked back to each product's own page — the
    same "select by reference, don't fork" discipline the homepage FAQ row
    already established, so a future edit to a product's document list can
    never leave this page quietly stale.
  - **Deliberately zero `Reveal`/`Stagger` anywhere in this file.**
    CONTENT-PLAN.md §9's "no marketing chrome" brief and its LCP < 1.2s target
    point the same way — a scroll-triggered reveal on a page whose whole job
    is "get out of the way" buys nothing. T4 and `DscHub` keep the normal
    scroll-reveal treatment; only T5 goes without.
  - **Download buttons render inside `PageHero` itself**, not a separate
    section below it — CONTENT-PLAN.md §9 wants them "immediately" above the
    fold. `PageHero` gained an optional `children` prop for this (rendered
    after `lede`/`cta`, additive, T2/T3 don't pass it and are unaffected). T5
    pages never pass `cta` — only the download-buttons `children` — since a
    "Talk to an Expert" link would be exactly the marketing chrome the brief
    rules out here.
  - **All four drivers' `downloads[]` URLs/versions/file sizes are still
    `null`, and stay that way.** Researched real vendor sourcing this
    session rather than guessing: HYP2003 has one unambiguous manufacturer
    page (`hypersecu.com/downloads`) and Watchdata ProxKey has one unambiguous
    brand-owned support portal (`support.cryptoplanet.in`), but ePass 2003
    (FEITIAN) and mToken have **no single canonical official source** — both
    are distributed under different names by dozens of competing Indian DSC
    resellers, several of which are direct competitors of ThinkOrange's own
    DSC business. Linking any one of them would be an undisclosed business
    call (implicitly endorsing/routing traffic to a competitor), exactly the
    kind of unconfirmed judgement call `fees: null` and `turnaround.js` exist
    to defer to Clinton rather than guess. So the null stayed null across all
    four for consistency, not just the two that were genuinely ambiguous.
    `UtilityPage` renders the honest state instead of inventing one: a muted
    "— not yet available" pill in the hero and table row per platform, still
    keyboard/AT-reachable text, no dead/broken link anywhere. Whoever sources
    the real files next only has to fill in `drivers.js` — no template change
    needed.
  - **The compatibility table's "Supported versions" column is a best-effort
    match against `supportedOs`**, joining on `download.platform` starting
    with `entry.os` (case-insensitive) — written this way because
    `downloads[]`'s platform granularity doesn't always match `supportedOs`'s
    1:1 (mToken's two `downloads` rows, 32-bit/64-bit, both match its one
    `supportedOs` entry and correctly show the same version text for both).
  - **The foot-of-page "quiet ember-bordered card" (CONTENT-PLAN.md §9's
    "entire commercial mechanism" on every T5 page) drops that section's own
    example copy — "we issue Class 3 certificates in 24 hours."** That's an
    unconfirmed turnaround guarantee (CLAUDE.md's non-negotiables list), so
    it never got typed in as fact. Added `turnaround.dscIssuanceTurnaround`
    (`value: null`, same pattern as every other entry in that file) and the
    card renders "Turnaround: Confirm with us" until Clinton confirms a real
    number — labelled, not embedded mid-sentence, matching how every other
    `t()` call in the codebase is actually used (a table/step `duration`
    value, never prose).
- **Real bug found and fixed, not specific to Phase 7 but blocking it:**
  `ogl` was listed in `package.json` but missing from `node_modules` at the
  start of this session — `npm run build` failed outright with "Rolldown
  failed to resolve import 'ogl'" before any Phase 7 code was even touched.
  `npm install` fixed it with zero lockfile drift (verified via `git diff
  package-lock.json` — empty). Unrelated to anything in this phase; flagged
  here only because it would otherwise look like something Phase 7 broke.
- ⚠️ **Real, measured gap found against this phase's own done-when
  criterion, and fixed within scope rather than deferred:** CONTENT-PLAN.md
  §9's T5 target is LCP < 1.2s on mobile throttling. Measured for real via
  CDP (`Network.emulateNetworkConditions` + `Emulation.setCPUThrottlingRate:
  4`, Lighthouse's simulated-mobile profile) against the **production build**
  served by `vite preview` — measuring against `vite dev` is meaningless here,
  since dev serves hundreds of unbundled ES modules with no minification and
  its LCP numbers don't reflect what ships. First pass: `/dsc/drivers/hyp2003`
  at 2320ms, `/dsc/documents-required` at 1592ms, both over budget, while
  `/dsc/drivers` (plainer markup) passed at 872ms — same shared JS, different
  content weight, so the bundle was the bottleneck, not any one template's
  markup. **Root cause:** `router.jsx` statically imported all nine page
  templates, so Rolldown packed them into one ~854KB chunk — a T5 page had to
  download and execute Home's entire WebGL shader (`ogl`/`DarkVeil`) and every
  Framer Motion homepage section before its own first paint could register.
  **Fix:** every template in `router.jsx` is now `React.lazy(() =>
  import(...))`, with one `<Suspense>` boundary added in `RootLayout.jsx`
  around `<Outlet />` (fallback is a plain `bg-ink-950` block sized
  `min-h-screen` — not a spinner, and dark so the fixed transparent header's
  canvas-coloured text stays legible if that fallback is ever actually seen).
  Main chunk dropped to 466KB; every template now has its own chunk
  (`UtilityPage` 8KB, `DscProduct` 6KB, `DscHub` 7KB, gzipped smaller still).
  Re-measured after the fix, reordering URLs to separate a real "first
  navigation after browser launch" cold-start artifact (~2.3s regardless of
  URL — confirmed by re-running `/dsc/drivers/hyp2003` both first and later
  in the same script; only the *first* page of any run paid it) from real
  page behaviour: all 6 T5 routes land at **1088–1208ms**, under or at the
  1.2s line. **This is a sitewide fix, not a DSC-specific one** — every other
  template (T1–T9) now also loads its own chunk lazily; re-verified 12 routes
  spanning every template family (`/`, `/services`, a T3 hub, a T2 leaf,
  `/dsc`, both DSC templates, `/about`, `/contact`, a T8 legal page, and a
  404) all render with zero console/page errors after the change.
  - Re-measure after Phase 9 (prerendering) lands — it changes the LCP story
    again, since the LCP element will paint from static HTML before
    hydration rather than waiting on any JS chunk at all.
- **Verification method**: `npm run lint` (0 errors/warnings — one new
  `react-refresh/only-export-components` warning batch from the `lazy()`
  bindings was silenced with a scoped `eslint-disable` comment in
  `router.jsx`, since that file's real export is a route-config array, not a
  component, and the rule's Fast-Refresh concern doesn't apply to it),
  `npm run content:check` (clean — same three pre-existing unconfirmed-content
  warnings as every prior phase, unrelated to DSC), `npm run build`, then a
  puppeteer-core + headless Edge pass: 7 DSC-tree screenshots (scrolling in
  600px steps first, per the standing `Reveal`/`IntersectionObserver`
  headless gotcha) confirmed the bento product grid, the conditional
  validity section, the disabled-download states, and the DSC enquiry strip
  all render as intended; a separate CDP LCP pass (above) against the
  production build; and a final 12-route sitewide smoke pass after the
  router change. All temporary scripts and screenshots were deleted after
  use — nothing under `scripts/` or a `verify-shots*` directory should remain
  from this session.

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
- **Current design (superseding the first pass): bottom-RIGHT, WhatsApp's own
  green (`--color-whatsapp`), tabler's `IconBrandWhatsapp` mark, animated glow
  rings.** The first pass shipped bottom-left / ember / lucide's generic
  `MessageCircle`, each a deliberate palette-restraint call recorded in this
  file's history — Clinton reversed all three afterward. This IS the one
  deliberate exception to the ink/ember/canvas restraint (DESIGN.md §16):
  it's the universally recognised WhatsApp affordance, and a brand-colour
  FAB reads as correct in a way an ember one didn't. `@tabler/icons-react`
  is now a real dependency (`package.json`) for the brand mark specifically
  — lucide has no WhatsApp glyph. Icon stays white on the green surface;
  ink-950 would fail contrast on this hue the way white fails on ember.
- **The corner move broke the Footer fix that was written for the OLD
  corner — caught and fixed in this session, not by the person who moved
  it.** The button is `fixed`, 56px + 24px inset, occupying whichever
  bottom corner it's in. When it was bottom-left, `pb-24` on the footer's
  bottom bar (only below `sm`, restored to `pb-6` above it) was enough,
  because at `sm`+ the bar is one line and the copyright text — not the
  right-aligned domain link — sits in the bottom-left corner. Moving the
  button to bottom-right put it exactly where that same one-line layout's
  `justify-between` right-aligns the domain link, and the `sm:pb-6`
  reduction stopped protecting anything. Fixed by dropping the breakpoint
  split entirely — `pb-24` now applies at every width, confirmed via a real
  browser pass (bounding-box intersection against every footer `<a>`, not
  eyeballed) with zero overlaps at both 375px and 1440px. **If this button
  moves corners again, re-run that check before calling it done** — this
  class of bug won't show up in lint or build, only in a real layout pass.

## Phase 8 (Editorial, Contact, Legal, 404) — complete, 12-08-2026
All 5 remaining stub routes now render real templates: `/about` and
`/partner-with-us` (T6), `/contact` (T7), all 5 `/privacy-policy` etc. legal
pages (T8, one renderer), and the `*` 404 (T9). FloatingWhatsApp was already
built (pulled forward, see the section above) — confirmed still sitewide and
unaffected by this phase's changes.

- **New shared infrastructure, used by both public forms:**
  `src/lib/emailjs.js` wraps `@emailjs/browser`'s `send()`, reading
  `VITE_EMAILJS_*` from `.env` (not present in this repo — `.env.example`
  documents the shape) and exporting `emailjsConfigured`. Callers get an
  honest rejected promise instead of a crash when it's unset, so Contact and
  Partner-With-Us currently show a real "email sending isn't set up yet —
  reach us on WhatsApp" toast rather than pretending to succeed. **Manual
  setup still needed, cannot be done from code:** create the service +
  template in the EmailJS dashboard, add a real `.env`, and set the
  account's own per-key rate limit in the dashboard (CONTENT-PLAN.md §11's
  "EmailJS's own per-key limits configured" is a dashboard setting).
  `src/lib/spamGuard.js` is the honeypot + time-gate + localStorage
  rate-limit hardening CONTENT-PLAN.md §11 asks for around a public,
  spammable key — `useMountedAt()`, `submittedTooFast()`,
  `honeypotTripped()`, `isRateLimited()`/`recordSubmission()`. None of it is
  a real security boundary (inspectable client JS); it raises the cost of
  casual scripted abuse. **`useMountedAt` reads `Date.now()` inside a
  `useEffect`, not as `useRef`'s initial value** — `useRef(Date.now())` is
  flagged by `eslint-plugin-react-hooks`'s new `react-hooks/purity` rule
  (impure call during render) and would also read wrong under Strict Mode's
  double-render. Caught by `npm run lint`, not by inspection.
- **Three new form primitives, siblings to `Input.jsx`:** `Select.jsx`
  (native `<select>` with `<optgroup>` support — takes `serviceSelectOptions()`'s
  `groups` shape directly, no Radix needed for something this simple, despite
  `radix-ui` being a locked dependency in BUILD-PLAN.md's stack that's still
  never actually been imported anywhere in the codebase), `Textarea.jsx`
  (generalises the inline textarea `EnquiryCard.jsx` hand-rolled in Phase 6),
  and `MapEmbed.jsx` (click-to-load Google Maps iframe, used by both `/about`
  and `/contact` per CONTENT-PLAN.md §10/§11's explicit "lazy-loaded behind a
  click-to-load placeholder" — queries by `site.location` name, not a street
  address, since a precise address is still on §1.1's hold list).
- **Sonner's `<Toaster>` is now mounted once in `RootLayout.jsx`**, sitewide,
  `position="top-right"` — deliberately NOT bottom-right, which is exactly
  where `FloatingWhatsApp`'s FAB already lives. `toastOptions.classNames`
  maps onto design tokens (`bg-white`/`border-ink-100`/`shadow-md`/etc.)
  rather than Sonner's own inline theme, per CLAUDE.md's no-raw-hex rule.
- **Contact (`/contact`, T7) is the 5-field form CONTENT-PLAN.md §11 asks
  for exactly** — name, phone/WhatsApp, email, service required, message,
  "no more". The service select is built from `serviceSelectOptions()`
  (nav.js) — the same source of truth every other service-picking surface
  on the site already uses, so it can never list a service that doesn't
  exist. Left column shows only what CONTENT-PLAN.md §1 confirms (phone,
  WhatsApp, email, city/state) — office hours and the full street address
  are both still on §1.1's hold list and are simply absent, not shown as a
  placeholder.
- **Partner-With-Us (`/partner-with-us`, T6) adds a phone field CONTENT-PLAN.md
  §10 didn't list.** §10's 5 fields (name, firm, city, practice type,
  expected monthly volume) have no way to reach an applicant back — flagged
  and fixed here as the minimum viable addition, the same class of gap
  CONTENT-PLAN.md itself caught in the draft preview's invented commitments.
  **The "what you get" tiles never state a commission rate, joining fee or
  processing time** — CONTENT-PLAN.md §10 explicitly flags these as needing
  confirmation before publishing ("no upfront investment" and "same-day
  processing" in the draft preview were commitments, not copy). Tiles state
  THAT each mechanism exists and is confirmed on application, matching the
  `fees: null` / `turnaround.js` discipline for facts that aren't shaped
  like a fee or a duration so they don't fit either file directly — see
  `src/content/partner-with-us.js`'s header comment.
- **About (`/about`, T6) draws "What we do" straight from `serviceCategories`
  (nav.js)** rather than a separate content list, so a future category
  rename can never leave this page's linked list stale. Founding year, team,
  credentials, client numbers and photography are all absent (§1.1's hold
  list) — the page is written to read as complete without them, per
  CONTENT-PLAN.md §10's own instruction, with the "Where we are" card's map
  slot ready to swap for a real office photo later.
- **Legal (5 routes, T8) is one renderer + five content files, exactly per
  CONTENT-PLAN.md §12.** Each file (`src/content/legal/*.js`) currently ships
  `sections: null` — CONTENT-PLAN.md §12 is explicit that this content "comes
  from your CA or lawyer, not from this build" and to "ship placeholder pages
  that say the policy is being finalised rather than publishing AI-drafted
  text you haven't had reviewed... an unreviewed privacy policy on a site
  handling PAN and Aadhaar-linked verification is a liability." `LegalPage.jsx`
  renders an honest `PendingLegal` state (same discipline as `ServiceLeaf`'s
  `PendingLeaf`) while `sections` is null, and switches to the full renderer —
  numbered sections, an auto-generated sticky TOC, a `lastUpdated` line, a
  contact block at the foot — the moment real content lands, with zero
  further code changes. **Verified end-to-end with temporary sample content**
  (added to `disclaimer.js`, screenshotted, then reverted before this session
  ended — nothing under `src/content/legal/` should carry real sections from
  this verification pass): TOC links generate correctly from the headings,
  numbering matches section order, and clicking a TOC anchor lands the target
  heading in view respecting the sticky header's `scroll-mt-32` clearance.
  `privacy-policy.js`'s header comment records what the real version must
  disclose once written: enquiry data transits EmailJS, a third party, on
  every Contact/Partner-With-Us submission.
- **404 (`*`, T9) is deliberately NOT built on `PageHero`** — that primitive
  assumes a real `nav.js` entry with a breadcrumb trail and a parent, neither
  of which means anything for a wildcard path. Hand-rolls the same layout
  contract instead (dark surface, `.page-top`, `grain`) since the header is
  fixed and transparent over every route including this one. Quick links to
  Home/Services/DSC/Contact plus direct phone/WhatsApp buttons — no dead
  ends.
- **Verification method:** `npm run lint` (0 errors after the `react-hooks/
  purity` fix above), `npm run content:check` (clean — same three
  pre-existing unconfirmed-content warnings from earlier phases, home-hero
  stats/testimonials/insights, none introduced by this phase and all
  unrelated to it), `npm run build`, then a puppeteer-core + headless Edge
  pass: 12 routes spanning every template touched this phase plus a few
  unrelated ones as a regression check, all rendering with zero console/page
  errors, correct `<h1>`, the opening section's dark surface, and the FAB
  present; a dedicated Contact-form pass confirming all 5 real fields render,
  the honeypot is present but hidden (off-screen, `tabIndex -1`), and an
  immediate submit is correctly blocked by the time-gate with a toast; a
  second pass waiting past the time-gate confirming the honest "not
  configured" toast (no `.env` exists in this repo) instead of a silent
  failure or a crash; and the legal-page TOC pass described above. All
  temporary scripts and screenshots were deleted after use — nothing under
  `scripts/` should remain from this session.
- **Main JS chunk crept back up to 500.95KB** (from Phase 7's 466KB),
  crossing Rolldown's 500kB chunk-size warning by under 1KB — `sonner`'s
  `<Toaster>` is now imported eagerly in `RootLayout.jsx` (not lazy, since
  it must be mounted before any page's form can toast) plus `@emailjs/
  browser`, `spamGuard.js` and the two new lazy-loaded page chunks add
  weight elsewhere. Every page template is still independently lazy-loaded
  (Phase 7's fix), so this is a shared-chrome cost paid once, not a
  per-route regression — worth a look at the Phase 10 performance audit if
  it grows further, not addressed here since it's one shared `<Toaster>`
  instance doing exactly what Phase 8 needs it to do.

## Phase 9 (Prerendering, SEO, structured data, sitemap) — complete, 12-08-2026
All 48 crawlable routes now prerender to real static HTML (`dist/<path>/index.html`,
`dist/index.html` for "/", `dist/404.html` for the wildcard) via a custom React
Router v7 static-rendering pipeline, plus per-route SEO metadata, sitewide + per-
template JSON-LD, `sitemap.xml`, and `robots.txt`. `vite-react-ssg` stays ruled out
(BUILD-PLAN.md §1 — its locked `react-router-dom@^6` peer range conflicts with this
project's v7 stack); this is a hand-built equivalent using React Router v7's own
`createStaticHandler`/`createStaticRouter`/`StaticRouterProvider` primitives.

- **Two parallel route configs, one shared resolver.** `src/routeComponents.js`
 exports `resolveComponent(entry, components)` — the single template-dispatch
 switch — consumed by BOTH `src/router.jsx` (client, every template
 `React.lazy`-loaded, Phase 7's code-splitting) and the new `src/router-static.jsx`
 (SSR, every template imported eagerly — a synchronous `renderToString` pass has
 no use for code-splitting and Suspense only complicates it). A route resolving
 to the wrong template in one but not the other is exactly the drift neither
 file's own build would catch on its own; this is what keeps them from silently
 diverging.
- **`src/entry-server.jsx`** is the Node SSR entry: builds a static handler from
 `router-static.jsx`'s routes, queries it for a given path, and renders the
 matched tree with `renderToString`. `scripts/prerender.mjs` (wired as `postbuild`,
 runs automatically after `vite build`) compiles this via
 `vite build --ssr src/entry-server.jsx --outDir dist-server`, calls `render(path)`
 once per route from `sitemapPaths()` (nav.js), splices the returned body HTML
 into `dist/index.html`'s `<div id="root">` and the resolved `<!-- SEO:START -->…
 <!-- SEO:END -->` block into `<head>`, writes each route to its own file, then
 deletes `dist-server/` and emits `sitemap.xml` + `robots.txt`. The 404 route is
 rendered off a literal probe path (`/__prerender_404_probe__`, since `"*"` itself
 isn't a fetchable URL) but its `<head>` tags still come from `resolveSeo("*")`,
 the real nav.js key.
- **`src/lib/seo.js`'s `resolveSeo(path)`** is the ONE function that decides
 title/description/canonical/robots/OG for every route — called at prerender time
 (build-time HTML) AND from `RootLayout.jsx` on every client-side navigation
 (post-hydration `<head>` sync), so the two can never disagree. **Imported
 DYNAMICALLY in `RootLayout.jsx`, not statically — this is load-bearing, not a
 style choice.** `seo.js` pulls in the entire content graph sitewide (all 17
 service leaves, every DSC product/driver, every category, both editorial pages,
 all 5 legal files) to resolve any route's meta; a static import in
 `RootLayout` — always-eager, never one of `router.jsx`'s lazy chunks — dragged
 that whole graph into the MAIN bundle regardless of which single page loaded.
 Measured before reverting to the dynamic import: main chunk 500KB → 690KB
 minified. The dynamic import isolates that content graph into its own
 background-fetched chunk instead (`services-*.js`), never blocking first paint.
- **`src/lib/jsonld.js` + `src/components/seo/JsonLd.jsx`** are the shared
 structured-data layer — pure builder functions (`organizationJsonLd`,
 `localBusinessJsonLd`, `breadcrumbListJsonLd`, `faqPageJsonLd`, `serviceJsonLd`,
 `collectionPageJsonLd`, `productJsonLd`, `howToJsonLd`) plus one
 `<JsonLd data={...}>` component that renders `<script type="application/
 ld+json">` for either a single object or an array. Consolidated THREE separately
 hand-rolled `FaqJsonLd` implementations (`ServiceLeaf.jsx`, `DscProduct.jsx`,
 `home/sections/Faqs.jsx`) into this one. Per-route script counts (verified live):
 3 sitewide (Organization + LocalBusiness, mounted once in `RootLayout`, plus
 whatever the page adds) up to 5 on a T2 leaf (+ Service, + FAQPage,
 + BreadcrumbList).
 - `Organization`/`LocalBusiness` render on EVERY route via `RootLayout` — even a
 driver-download page ranking on its own gets the full identity block, not just
 whatever that one page's own schema adds.
 - `BreadcrumbList` (`Breadcrumbs.jsx`) is generated off the SAME `trail` array
 the visible `<ol>` renders — same "select by reference" discipline as the
 homepage FAQ row, so the two can never drift.
 - T2 (`ServiceLeaf`) → `Service` + `FAQPage`. T3 (`CategoryHub`/`ServicesHub`/
 `DscHub`) → `CollectionPage`. T4 (`DscProduct`) → `Product` + `FAQPage`.
 T5 driver pages (`UtilityPage`) → `HowTo` for the install steps.
- **Hydration switch (`src/main.jsx`)**: `hydrateRoot` when `#root` already has
 content (every real production route, now that prerendering exists),
 `createRoot` fallback for `npm run dev`/an un-prerendered `vite preview` (empty
 div — `hydrateRoot` against nothing just warns and behaves like a fresh render,
 no reason to pay even that cost when the case is already known).
- ⚠️ **Real bug hunted at length this session, then found to be a TEST-HARNESS
 artifact, not an app bug — worth reading in full before "fixing" this again.**
 A puppeteer-core + headless Edge hydration pass against `vite preview` showed
 "Minified React error #418" (hydration mismatch) on every route except `/`.
 Two successive `React.lazy`/`Suspense` timing "fixes" were built and both had
 ZERO effect on the outcome — because the real cause had nothing to do with lazy
 loading at all: **`vite preview`'s static server was silently serving
 `dist/index.html` (the HOME page) for every nested route** (`/services/gst/
 registration`, `/about`, etc.), even though the correct
 `dist/services/gst/registration/index.html` file genuinely existed on disk.
 Confirmed by fetching the route directly and reading the returned `<title>` —
 it was Home's title, not the requested page's. The client then tried to
 hydrate ServiceLeaf's real component tree against Home's markup: a real,
 enormous mismatch, correctly reported by React, just about the wrong pair of
 trees. Re-run against a standard static file server (`npx serve dist`, which
 correctly resolves a directory's `index.html` for a clean URL) and EVERY route
 hydrates with **zero console/page errors**, including the original ORIGINAL
 `router.jsx`/`main.jsx` from before either "fix" — both fixes were reverted
 (`git stash`, not deleted, in case the underlying React.lazy-always-suspends-
 on-first-hydration-render behaviour they were built around ever becomes a real
 problem elsewhere). **Lesson for any future verification pass on this repo:
 never use bare `vite preview` to test a specific nested prerendered route — it
 will silently serve the wrong page and look exactly like a hydration bug.**
 Use `npx serve dist` (or an equivalent real static host) instead.
- **Verification method**: `npm run lint` (0 errors), `npm run content:check`
 (clean — same pre-existing dummy-testimonial/insight warnings as every prior
 phase, unrelated to this one), `npm run build` (48 routes + 404.html +
 sitemap.xml + robots.txt written), then two puppeteer-core + headless Edge
 passes against `npx serve dist`: an 18-route sweep across every template
 family confirming zero console/page errors, correct `<title>`/`<h1>`, and
 JSON-LD script counts matching each template's expected schema set; and a
 direct byte-level check that every one of the 49 written HTML files (a) has
 valid, parseable JSON in all 200 of its `<script type="application/ld+json">`
 blocks sitewide, (b) has a `<title>` and (except `404.html`, deliberately) a
 `rel="canonical"` link, and (c) never leaks the SSR probe path. All temporary
 scripts and screenshots were deleted after use — nothing under `scripts/`
 remains from this session beyond the permanent `prerender.mjs`.

## Phase 10 (Audit: contrast, a11y, performance, §16 judgment pass) — 12-08-2026
BUILD-PLAN.md §3's final gate. Every audit below was **measured**, not reviewed by
eye or by reading source: the whole point of this phase is that claims about
aggregate behaviour ("every icon in a circle", "everything fades up", "orange
under 12%") cannot be confirmed from any single file. Accessibility, contrast,
reduced motion, keyboard, link integrity and 11 of §16's 12 tells all pass.
**Two things do not, and both are content decisions, not code** — see Launch
blockers at the end of this section.

### Verification harness — read this before re-running anything
- **`npx serve dist`, never `vite preview`.** Phase 9 already recorded why (bare
  `vite preview` serves `dist/index.html` for every nested route and looks
  exactly like a hydration bug). Still true.
- **Lighthouse needs the HTTP/2 host, not the plain one.** `scripts/_serve-h2.mjs`
  supplies HTTP/2 + brotli + immutable caching on hashed assets, i.e. a
  production-shaped host. It takes the port as `argv[2]` and defaults to **4443**,
  while the Lighthouse scripts default to **4455** — start it as
  `node scripts/_serve-h2.mjs 4455` or pass the base URL explicitly, or every run
  reports `ERRORED` and looks like a Lighthouse failure.
- **Median of 3, minimum.** A single Lighthouse run on a loaded dev machine is
  not a measurement — the same `/contact` build scored 100 alone and 88 inside a
  four-route batch purely from CPU contention. `_audit-lighthouse-median.mjs`
  exists for this.
- **Always check whether Chrome had a GPU before drawing a perf conclusion.**
  The headless default passes `--disable-gpu`, which forces the DarkVeil CPPN's
  per-pixel maths onto the main thread and costs the homepage ~10 Performance
  points on its own (93 with GPU vs 83–86 without, same build, same throttling).
  This is the third time this trap has cost this project real time — Phase 4 and
  the DarkVeil session both recorded it.
- **A backgrounded `npx serve` leaves an orphaned child holding `dist/`.** Killing
  the `npx` parent does not kill it, and the next `vite build` fails with
  `EPERM: operation not permitted, lstat 'dist/about/index.html'` — which reads
  like a permissions or antivirus problem and is not. Find it with
  `Get-CimInstance Win32_Process` filtered on a `cursor-sandbox-cache\...\_npx`
  command line and kill that PID specifically. Do **not** blanket-kill browsers
  or node.

### Accessibility — 100 on every route audited
- **`label-content-name-mismatch` on the logo, and why it was real.** axe compares
  an element's accessible name against its *sighted visible text*, and it counts
  text inside `aria-hidden` descendants. `Logo.jsx`'s "TO" mark plus the two
  wordmark spans concatenated to `TOThinkOrangeConsulting Pvt Ltd` — JSX strips
  the newlines between sibling elements — which no `aria-label` starting
  "ThinkOrange" could contain. Fixed with explicit `{" "}` text nodes between the
  siblings and an `aria-label` of ``TO ${site.shortName} Consulting Pvt Ltd —
  home``. **Adding whitespace between JSX siblings is a semantic change here, not
  formatting.**
- **The desktop mega panel was unreachable by keyboard, and the mobile overlay
  was not trapped.** Both fixed and both re-verified by driving real Tab/Enter/
  Escape key events: Enter opens the panel, Tab walks into its contents, Escape
  closes it and returns focus to the trigger; the mobile dialog holds focus for
  40 consecutive Tabs, locks body scroll, is `inert` while closed (guarding 44
  focusables so a closed overlay can never be tabbed into), and restores both
  focus and scroll on Escape.
  - **`Input.dispatchKeyEvent` with `type: "rawKeyDown"` does not activate a
    focused button on Enter** — Space appears to work because it activates on
    keyup. This reported Enter as broken when it was not. Use `type: "keyDown"`
    with `text: "\r"` and both virtual key codes.
- Five vague "Learn more" links got specific accessible names (axe `link-text`).
- Landmarks, single `<main>`, single `<h1>` and focus visibility verified on every
  sampled route: **0 focusables with no visible focus indicator**.

### Contrast — four independent methods, all clean
A static resolver alone is not enough on this site, because the elements most at
risk sit over things CSS cannot resolve: a WebGL canvas, `color-mix` gradients
(`.card-dark`, `.surface-ambient`), and a translucent fixed header.
1. **Static** (`_audit-contrast.mjs`) — climbs ancestors for an opaque background.
   0 failures; 28 cases correctly reported as *unresolvable* and handed to (2).
2. **Pixel-sampled** (`_audit-contrast-pixels.mjs`) — applies
   `* { color: transparent !important }`, screenshots, and samples the 95th/5th
   percentile luminance under each text box. 0 failures across 13 routes, 105
   instances. Tightest pass 4.7:1.
3. **Hero, multi-phase** (`_audit-hero-pixels.mjs`) — the veil animates, so one
   frame proves nothing. Samples 4 animation phases at 375px and 1440px.
4. **Header** (`_audit-header-pixels.mjs`) — the glass header over whatever
   scrolls beneath it. Worst case 4.59:1.
- Fixes: chip variants, missing `data-surface` attributes, `ink-300`/`ink-400`
  used as body text on dark, header glass opacity, and in the hero specifically
  **`text-ember-300` → `!text-ember-200`** (eyebrow, was 3.5:1) and
  **`text-ink-200` → `text-ink-100`** (lede and trust line, was 4.43:1). All three
  failed only over the *lit* part of the ember arc — which is exactly why the
  static pass could not see them.

### Performance
Final, median of 3, simulated mobile (Lantern slow 4G + 4× CPU), production build
over HTTP/2 + brotli:

| route | perf | a11y | best practices | SEO | TBT |
|---|---|---|---|---|---|
| `/services/gst/registration` | **98** | 100 | 100 | 100 | 5ms |
| `/dsc/drivers/hyp2003` | **98** | 100 | 100 | 100 | 5ms |
| `/contact` | **98** | 100 | 100 | 100 | 5ms |
| `/` | **93** with GPU / 83–86 without | 100 | 100 | 100 | 115ms / ~530ms |

- **⚠️ The homepage does not meet the ≥95 gate. Accepted at 93 on Clinton's call
  (12-08-2026) rather than chased further.** 93 is with hardware rasterization,
  which is what a real visitor gets; the 83–86 figure is the `--disable-gpu`
  harness. (Both numbers were taken before the avatar hotlinks came out, which is
  worth +5 on the software-rendered figure — so treat 93/86 as the floor.) The residual cost is the DarkVeil shader
  plus fourteen motion-wrapped sections, and LCP is dominated by
  `elementRenderDelay` (main-thread work), not by the image — its Load Delay and
  Load Time are both 0ms. Closing the last two points means lazy-mounting
  below-fold homepage sections, which would put the verified surface cadence and
  every scroll reveal back in play. Deliberately not attempted inside an audit
  phase; flagged instead.
- **SSR error #419, and the hook that fixes that whole class of problem.**
  `renderToString` cannot resolve a `lazy()` component, so a lazy child inside a
  bare `<Suspense fallback={null}>` makes the server emit an *unfinished boundary
  marker*; the client then throws React #419 and client-renders the subtree. This
  surfaced as a console error in Lighthouse Best Practices. Fix is
  **`src/hooks/useIdleMount.js`** — a flag that is `false` during SSR and on the
  client's first pass, flipped by `requestIdleCallback` after `load`. Server and
  client agree on "render nothing", so no boundary is left open. `Toaster`
  (`RootLayout`) and `DarkVeil` (`ArcField`) both hang off it. **Gate a deferred
  lazy subtree on a flag; do not wrap it in a bare Suspense.**
- **DarkVeil no longer competes with hydration**: idle-mounted, plus an
  `IntersectionObserver` and a `visibilitychange` listener that pause the rAF loop
  when the hero is scrolled away or the tab is backgrounded. Homepage TBT was
  measured as high as 3,420ms before this.
- **`RootLayout` no longer re-resolves `<head>` on a prerendered first render.**
  Its own comment already said the sync "only matters once React Router starts
  handling navigation" — but the effect ran on mount too, pulling `seo.js`'s
  ~175KB content-graph chunk onto the critical path of every cold load to compute
  tags byte-identical to the ones `prerender.mjs` had already written. Now gated
  on **`src/lib/prerendered.js`**, whose `wasPrerendered` is captured at
  *module-evaluation* time — before `hydrateRoot` runs, while `#root` still holds
  the server's markup. Read it any later and it always reports true. `main.jsx`
  consumes the same constant for its hydrate-vs-createRoot choice, so the two
  decisions cannot disagree. Homepage 91 → 93; the chunk is now fetched on first
  in-app navigation instead of never being needed. Verified by
  `_probe-seo-nav.mjs`: cold loads carry correct prerendered tags on 5 routes
  (exactly one `<title>` and one canonical each), and two successive real link
  clicks still update title/canonical/OG correctly, with 0 console errors.
- **`_serve-h2.mjs` was charging Lighthouse ~350ms of fake TTFB** by running
  brotli quality 11 synchronously per request. Now cached in memory per file. A
  test host's own cost is easy to mistake for the site's.

### Reduced motion — including a regression this phase introduced and caught
`Emulation.setEmulatedMedia({features:[{name:"prefers-reduced-motion",value:"reduce"}]})`
over CDP: 0 CSS animations running, 0 elements stuck mid-opacity, WebGL canvas
static.
- **The regression is worth reading, because the code looked correct.** After
  adding the IntersectionObserver pause/resume to `DarkVeil`, the reduced-motion
  branch still read `if (reduceMotion) renderOnce(0); else sync();` — which never
  starts the loop. But **`IntersectionObserver` fires its callback once on
  `observe()`**, and that callback calls `sync()` → `play()`. So the canvas
  animated under `prefers-reduced-motion: reduce` anyway. Fixed by returning early
  from the effect before the observers are wired at all. Only the emulated-media
  audit caught it; reading the diff did not.

### §16's twelve tells — mechanically checked, 11 pass
`_audit-design-tells.mjs`, 15 routes × 2 viewports, against the rendered DOM.
- **Tell 1 needed pixels.** The DarkVeil CPPN pattern is natively violet, so the
  only honest test is what reaches the screen. Hue census of the hero: violet is
  8.3% of hued pixels at desktop / 5.8% at mobile, ember 5.6% / 10.1%, and the
  dominant bucket is **225° (navy)** at desktop, 15° (ember) at mobile. Passes.
- Tell 4: only Satoshi, IBM Plex Mono and Instrument Serif render anywhere — no
  Inter/Poppins/Roboto/etc. Tell 5: five distinct radii in use, dominant share
  50.4%, pill present. Tell 8: **0 of 200** sections are centre-aligned. Tell 9:
  0 ember box-shadows sitewide. Tell 10: 2.5% of elements carry motion styles,
  and **0 inside a footer, table or form**. Tell 12: 41 dark surfaces, all
  grained, none drifting outside its own section.
- **Fixed under tell 12:** `CategoryHub`'s navy inset panel had no grain at all.
  It now carries `grain relative overflow-hidden` — all three together, because
  `.grain::after` is `position:absolute; inset:0` and needs a positioned ancestor,
  and without `overflow-hidden` the texture squares off the panel's radius. Same
  root cause as the Phase 5 escaping-grain bug: hand-rolled surfaces instead of
  `components/layout/Section.jsx`.
- **Three detector-design traps, recorded because a wrong detector wastes a whole
  investigation:**
  1. **Tell 6 over-triggered on pill buttons.** Counting "an `<svg>` whose parent
     is circular and filled" flagged every `rounded-full` Button and the WhatsApp
     FAB, reporting 13 on the homepage. A pill containing an icon is §6.3's
     deliberate radius contrast, not an icon-in-a-circle motif. Excluding
     `a, button, label, [role=button]` leaves **3** on the worst page.
  2. **Tell 7 over-triggered on the `/services` sitemap page** — 5 "identical
     3-card grids" that are actually multi-column lists of plain text links, a
     different archetype and the correct shape for a directory. Requiring the grid
     items to be *cards* (own background, border, or ≥12px padding) fixed it.
  3. **…and then under-triggered, to 1 card grid sitewide,** because `Reveal`
     wraps each grid item in a bare `motion.div`, so the card's surface sits one
     level below the grid item. Checking the item *and its first element child*
     gives the true answer: worst page has **2**, under the tell's threshold of 3.
- **Tell 11 failed, and was fixed.** Not stock photography — the site's only local
  image is a licensed, attributed Unsplash desk still-life with no people
  (`public/images/home/ATTRIBUTION.txt`), which is compliant. The failure was **8
  hotlinked `ui-avatars.com` images** in the dummy testimonials: the only
  third-party origin besides `wa.me`, and React emitted a
  `<link rel="preload" as="image">` for every one of them during SSR, so a
  homepage cold load opened a connection to another host and fetched eight images
  before anything below the fold could paint. `Testimonial.jsx` now derives
  initials from `name` and renders them locally. **All eight share one `ink-800`
  surface rather than getting a colour each** — eight distinct hues would be eight
  non-token colours, and the active dot already reads through size plus the ember
  ring. Verified: 0 image preloads, 0 external requests, initials at 8.99:1,
  `aria-hidden` on the glyphs with the accessible name on the button.

### Link integrity (new audit, `_audit-links.mjs`)
Scans `dist/`, not the router: `sitemapPaths()` decides what actually gets a file,
so a path the router matches but the build never emitted is still a 404 for a
crawler and for any hard navigation. **4,683 hrefs across 49 files, 0 broken.**
- `content:check`'s insights warning was **stale and actively misleading** — it
  claimed every placeholder card "404s if deployed". `Insights.jsx` renders an
  unconfirmed entry as a non-interactive card rather than a `Link`, so no dead
  link exists; the real risk is placeholder copy being visible. Warning text
  corrected, so the next reader does not go hunting a bug that isn't there.

### ⛔ Launch blockers — content decisions, all pre-existing, none introduced here
1. **`src/content/testimonials.js` — 8 fictional quotes, now MORE dangerous than
   before, deliberately and on record.** Until this phase the copy described a
   **tutoring platform** ("board exams", "JEE aspirant", "Mathematics tutor") —
   leftover from an unrelated project, and `Testimonial.jsx`'s own heading read
   "Trusted by learners and parents". Rewritten for compliance work on explicit
   request (12-08-2026), which means they no longer read as placeholder at all.
   `confirmed: false` and `content:check`'s warning are now the only things
   between this file and eight false claims on a compliance firm's homepage —
   **do not remove either.** The rewrite deliberately contains no fee, rupee
   amount, day count, turnaround or statutory threshold: a "registered in two
   days" quote is an invented turnaround guarantee wearing a client's voice, and
   quotation marks do not make a claim sourced. The heading is now "In their
   words", which asserts nothing about how many clients exist or where they are.
   Before launch: replace with real consented quotes and set `confirmed: true`,
   or delete the array — `Testimonial()` renders nothing when empty.
2. **`src/content/home-hero.js` — `clients: "250+"` and `years: "10+"`,** both
   `confirmed: false`. `HeroStats` renders whatever survives, so deleting is safe
   and the row degrades to two tiles.
3. **`src/content/insights.js` — 4 placeholder articles** and no `/insights` route.
   Safe (non-interactive cards), but the placeholder titles are visible copy.
All three print a loud warning on every `npm run content:check`, which
deliberately does not fail the command — that would be noise during design work.

### Verification method
`npm run lint` (0 errors), `npm run content:check` (the three unconfirmed-content
warnings above, no new ones), `npm run build` (48 routes + 404.html + sitemap.xml
+ robots.txt). Then, over `npx serve dist` and `_serve-h2.mjs`: axe-core on every
sampled route; four contrast passes; keyboard/focus-trap/focus-visibility driven
by real key events; landmark and heading structure; reduced motion via emulated
media; Lighthouse median-of-3 on four representative routes plus a GPU-on/GPU-off
comparison for the homepage; the twelve-tells pass; SEO cold-load and in-app
navigation probes; and a byte-level link-integrity scan of `dist/`.
**All `scripts/_*` audit scripts, their self-signed certs and their Lighthouse
JSON output were deleted after use**, per this repo's standing discipline — only
`content-check.mjs`, `content-review.mjs` and `prerender.mjs` remain. Every method
above is documented in enough detail to rebuild the one you need, and the three
detector traps under §16 are recorded precisely so a rewrite does not repeat them.
Re-verifying the launch blockers below needs only `npm run content:check` plus one
Lighthouse median run.

## Client preview mode: hero + Coming Soon everywhere except Home/About — 13-08-2026
NOT a phase. Standalone, reversible request (Clinton): for a client preview, only
`/` (Home) and `/about` show their real, full pages. Every other route — all 21
service leaves, all 6 category hubs + `/services`, `/dsc` + its 4 products + its 6
utility pages, `/partner-with-us`, `/contact`, and all 5 legal pages — renders its
real `PageHero` (breadcrumb, H1, lede, and any hero-embedded CTA like a DSC
product's WhatsApp button or a driver page's download buttons), then the new
shared `<ComingSoon />` component instead of the rest of the body.

- **`src/components/ui/ComingSoon.jsx` (new)** — a small, self-contained Section
  (Eyebrow + heading + message + phone/WhatsApp buttons via `site`), styled like
  the honesty-first "still being written" patterns this codebase already had
  (`ServiceLeaf`'s `PendingLeaf`, `LegalPage`'s old `PendingLegal`). Reused as-is
  across every affected template rather than forked per template.
- **Every affected file's original body is commented out in place, not deleted**
  — same discipline as the DarkVeil hero swap's L2/L4 removal. Uncomment the
  return's JSX (and the matching imports at the top of each file) to restore the
  real page instantly. Touched: `ServiceLeaf.jsx`, `CategoryHub.jsx`,
  `ServicesHub.jsx`, `DscHub.jsx`, `DscProduct.jsx`, `UtilityPage.jsx`,
  `partner-with-us/index.jsx`, `contact/index.jsx`, `legal/LegalPage.jsx`.
  `Home` (T1) and `About` (T6's `/about` branch) are untouched.
- **Per-route JSON-LD is commented out alongside its section** on every one of
  these routes (Service/CollectionPage/Product/FAQPage/HowTo schema) — structured
  data shouldn't assert content that isn't actually visible on the page.
- **`ServiceLeaf`'s `PendingLeaf` (the 4 BLOCKERS.md-blocked leaves) and its
  `SubNav`/`RelatedServices` helpers were left alone**, not swapped onto the new
  component — `PendingLeaf` already was a real hero+coming-soon page, and it does
  one thing `<ComingSoon />` doesn't: link to written sibling leaves.
- **`LegalPage.jsx` now shows `<ComingSoon />` unconditionally**, even once a
  policy's `sections` are eventually filled in — the old branch on `page.sections`
  and the real section/TOC renderer are commented out, not removed, so this
  reverts the moment real, CA-reviewed legal copy is ready to publish for real.
- **`UtilityPage.jsx`'s `dscDocumentsPage` dispatch stays live** (its
  `DocumentsRequired` branch renders hero + `<ComingSoon />`, not `null`) — the
  route still exists in `nav.js` and must not render a blank page.
- Verified: `npm run lint` (0 errors), `npm run build` + `postbuild` prerender
  (48 routes + 404 + sitemap, unchanged counts), and a browser pass across one
  route per affected template family plus Home and About — hero renders with its
  real copy, `<ComingSoon />` renders directly below it, phone/WhatsApp buttons
  work, zero console errors.
- **To fully restore the site**: uncomment the JSX/imports in the 9 files above
  (search each for the 13-08-2026 note) and remove the `<ComingSoon />` line each
  one added.

⛔ **REVERTED 17-08-2026.** Client preview is over; all 9 files (`ServiceLeaf.jsx`,
`CategoryHub.jsx`, `ServicesHub.jsx`, `DscHub.jsx`, `DscProduct.jsx`,
`UtilityPage.jsx`, `partner-with-us/index.jsx`, `contact/index.jsx`,
`legal/LegalPage.jsx`) restored to their pre-preview state — each was `git show
<pre-preview-commit>:<path>`'d back rather than hand-uncommented, having first
confirmed via `git diff` that the only change since was the comment-out/
`<ComingSoon />` insertion (no unrelated fixes were bundled into those commits).
`ComingSoon.jsx` itself is untouched and unused — left in place as a component,
same discipline as the DarkVeil L2/L4 layers, in case a future preview needs it
again. `LegalPage.jsx` is back to its real behaviour: `PendingLegal` while a
policy's `sections` is `null` (true for all 5 today), full renderer once it
isn't — not `<ComingSoon />` unconditionally. Verified: `npm run lint` (0
errors), `npm run build` + prerender (48 routes + 404 + sitemap, unchanged
counts), and a live dev-server pass over one route per affected template
(a T2 leaf, a T3 category hub, `/services`, `/dsc`, a DSC product, `/contact`,
`/partner-with-us`, a legal page) — full content renders, zero console errors.

## Bug fix: mobile nav overlay broke once the header had scrolled — 13-08-2026
Real bug (Clinton, tested on a phone): the hamburger menu displayed correctly
when opened from the very top of a page, but opened broken/mispositioned once
the page had been scrolled even a little first.

- **Root cause**: `Header.jsx` adds `backdrop-blur-[16px]` (a `backdrop-filter`)
  to `<header>` once `useScrolled(80)` flips true. Per spec, a non-`none`
  `backdrop-filter` makes an element a new containing block for its
  `position: fixed` descendants — same rule as `transform`/`filter`.
  `MobileNav`'s backdrop (`fixed inset-0`) and sliding panel
  (`fixed inset-y-0 right-0`) were rendered as DOM descendants of `<header>`,
  so the instant the header picked up that blur, both stopped resolving their
  "fixed" position against the real viewport and instead resolved against
  `<header>`'s own ~64px-tall box. Unscrolled (header transparent, no blur) it
  looked fine; scrolled, it didn't — exactly Clinton's repro.
- **Fix**: `src/components/navbar/MobileNav.jsx` now renders the backdrop +
  panel through `createPortal(..., document.body)`, so they're never a
  descendant of `<header>` and can't be hijacked by its filter state
  regardless of scroll position. The trigger button stays inline (unaffected,
  it isn't `fixed`).
- **`canPortal = typeof document !== "undefined"` guards the portal call** —
  `document` doesn't exist during Phase 9's Node SSR prerender pass, and
  calling `createPortal` unconditionally crashed `scripts/prerender.mjs` with
  `ReferenceError: document is not defined`. Not React state (no
  `useState`/`useEffect` needed): the answer can't change within one
  environment's lifetime, and an effect that calls `setState` synchronously on
  mount just to flip this is exactly what `react-hooks/set-state-in-effect`
  flags — first attempt at this fix did that and had to be corrected.
- Verified: `npm run lint` (0 errors), `npm run build` + prerender (48 routes
  unchanged), and — since headless viewport emulation in this session's
  browser tool measures `getBoundingClientRect()` inconsistently against
  `getComputedStyle()` for fixed-position elements (a tooling artifact, not a
  page bug: `window.innerWidth` itself never matched the requested
  375px-wide viewport in this pane) — verification used
  `getComputedStyle(panel)` instead of the rect, simulating the scrolled
  header state via a direct `window.scrollY` override + dispatched `scroll`
  event. Confirmed `right: 0px` / `left: 33px` (= viewport width − panel
  width) resolve correctly post-fix in the simulated-scrolled state, where
  pre-fix the panel was provably boxed into the header instead.

## Hero headline: typewriter effect replaces LineMask — 17-08-2026
NOT a phase. Standalone request (Clinton, referencing Aceternity's Typewriter
Effect): the H1 ("Compliance, without the scramble.") now types in
character-by-character with a blinking cursor instead of LineMask's slide-up
mask reveal. Same 3-line break as before (still required at display-xl over a
7-column measure — "Compliance, without" still rewraps into one block if
allowed to wrap naturally) and the same 0.12s mount delay.

- **New `src/components/motion/Typewriter.jsx`.** Built custom rather than
  porting Aceternity's component: that one is framer-motion + hardcoded
  hex/gradient word colours, and this repo's stack is `motion/react` (the
  renamed framer-motion package, already a dependency) with CLAUDE.md's
  no-raw-hex / no-gradient-text rules. `lines` mirrors LineMask's per-line
  shape but each line is an array of `{ text, className }` SEGMENTS, so the
  serif italic ember "scramble." can keep its own styling while still typing
  as part of one continuous character stream.
- **Every character is real DOM text from first render — only `opacity`
  animates.** This was a deliberate choice, not the obvious one: an earlier
  draft sliced the string down to `shown` characters (Scramble's technique),
  which means a prerendered page or a screen reader landing before hydration
  would see NO text in the H1 at all — unacceptable for the site's primary
  heading. Rendering the full string always, with only opacity staggered,
  keeps the complete sentence in the static HTML and the accessibility tree
  regardless of animation state. Verified in `dist/index.html`: all 27
  characters present as text nodes, each with `style="opacity:0"`.
- **Cursor (`.typewriter-cursor`, theme.css) is a plain CSS blink, not
  JS-driven** — same pattern as `.hero-chevron`/`.hero-card-float`. The
  global reduced-motion floor's `animation-iteration-count: 1` freezes it at
  the keyframe's 100% state (opacity 0), so it disappears under reduced
  motion rather than blinking — a static cursor stranded mid-sentence would
  read as a stray mark, so invisible is the correct frozen state here, unlike
  the arc rings which freeze *visible* at a composed angle.
- ⚠️ **Real, unresolved tradeoff, flagged rather than silently shipped:**
  because every character starts at `opacity:0` in the prerendered HTML, the
  H1 — the homepage's largest text block — is invisible until hydration runs
  the ~1.4s type-in (27 chars × 38ms + the 0.12s start delay). Phase 10
  already accepted the homepage's Lighthouse Performance at 93/100, below the
  sitewide 95 gate, and flagged it as the one open gap; this change makes
  that H1's paint timing worse, not better, since the previous LineMask
  reveal only clipped/translated real, already-opaque text rather than
  fading it from zero. **Not re-measured this session** (Phase 10's
  Lighthouse harness — `_serve-h2.mjs`, median-of-3, GPU-on — was deleted per
  that phase's own cleanup discipline and would need rebuilding). Re-run that
  harness before trusting the homepage's Performance score again.
- Verified instead: `npm run lint` (0 errors), `npm run build` + prerender
  (48 routes unchanged, no errors), a live browser pass confirming the type-in
  renders, the cursor blinks (`animation-name: typewriter-blink`, ember-300),
  and zero console errors — and the `dist/index.html` byte check above.
  Reduced-motion was reasoned from the component's `useReducedMotion` branch
  (identical shape to LineMask/Reveal/Scramble's own, all already verified
  under emulated `prefers-reduced-motion`) rather than re-toggled live this
  session.
- LineMask itself is untouched and still used by `/kitchen-sink`
  (`KitchenSink.jsx`) — this was a swap on one call site, not a component
  deprecation.

### Follow-up same session: the H1 itself rotates through three headlines
Clinton asked first for the type-in to repeat every 10s, then for several
headlines cycling. **Final shape: the H1 rotates.** Three headlines, each
typed → held → erased → handed to the next, round-robin, in the page's main
heading. There is no sub-line — an interim version put the rotation on a new
line beneath a fixed H1, and that was reverted on Clinton's instruction
("added this effect in main heading line not in subline").

- **The SEO objection I raised against a rotating H1 turned out not to
  apply, and the reasoning is worth keeping.** The concern was real in
  general: a rotating heading normally means every variant's text lives in
  the page's one `<h1>`, which Google reads as a single run-on heading, and
  Phase 10's audit verified exactly one clean `<h1>` per route. It does not
  apply *here* because the component mounts **only the active sentence** —
  the others are not in the DOM at all. So the heading holds exactly one
  coherent sentence at every moment, and the prerendered HTML holds the
  first one. Verified against the built `dist/index.html`: `<h1>` count is 1,
  text content exactly `Compliance,withoutthe scramble.`, with neither other
  headline present. **If this component is ever changed to render all
  sequences at once (e.g. for a cross-fade), that verification breaks and
  the original objection becomes live again.**
- **Copy is approved, not drafted by me.** Clinton picked the "X, without the
  Y" pattern from three options on 17-08-2026, and all three are now in
  rotation. No fee, turnaround, count, deadline or form code appears in any
  of them — see `heroHeadlines`' header comment, which spells out why
  "Filed in 3 days, without the follow-ups" would be an invented turnaround
  guarantee in slogan's clothing.
- ⚠️ **`heroHeadlines`' three-line shape is load-bearing, not formatting.**
  Every entry is pre-broken into exactly three lines AND every entry's second
  line is the same word ("without"). That is what holds the heading's height
  and rhythm identical across the rotation, so the lede, CTAs and stat row
  below never shift when a headline swaps. Verified by screenshot at all
  three headlines: everything below the H1 is pixel-stable. A new entry that
  wraps to a different line count, or breaks the shared line 2, reintroduces
  a layout jump twice per cycle. (The pre-breaking itself is inherited from
  the LineMask version — at display-xl over a 7-column measure a headline
  allowed to wrap naturally rewraps mid-phrase.)
- **One component, two modes.** `lines` = one fixed sentence typed once.
  `sequences` = an array of `lines`, each typed → held → erased in turn,
  round-robin (what the H1 now uses). The fixed mode is currently unused by
  the hero but is the reason the component is still safe to reuse elsewhere.
- ⛔ **THE BUG THAT MADE THE HEADLINE SWAP WITH NO ANIMATION AT ALL, and the
  API form that caused it.** Clinton reported the headline "change directly
  without any effect" — no reveal, no typing. The cause was driving the whole
  cycle from ONE keyframe call,
  `animate(0, [total, total, 0], { duration: cycle, times: [...] })`, and
  stepping a `shown` counter from its `onUpdate`. **`animate()` prepends the
  `from` value as an implicit first keyframe**, so the effective keyframe
  count is 4 while `times` supplies 3, the reveal/hold/erase split does not
  survive, and the intended cascade collapses. This is the same overload
  hazard as the WeakMap crash recorded below — that family of calls is
  ambiguous, and this repo should not use it for value sequences.
  **The replacement is a single `shown` counter** driven by two
  `animate(from, to, options)` value calls (write, then erase) with a
  `setTimeout` hold between and `setActive` after.
- ⛔ **THE CARET MUST BE EMITTED INSIDE THE CHARACTER STREAM, AFTER CHARACTER
  `shown - 1`.** Clinton's second report: the caret "always stay as the then
  of sentence", where it should follow the write position (`c |`, `Co |`,
  `Com |`). A caret rendered at the end of the line sits past that line's
  remaining characters — which are transparent but still laid out — so it
  parks at the end of the sentence and never moves.
  - It is anchored to the last WRITTEN character, not to the first unwritten
    one. Both look identical mid-line, but at a line break "before the first
    unwritten character" jumps the caret to the START of the next line while
    the text it belongs to is still on the previous one. Measured: 6 of 295
    samples misplaced, twice per sentence. Anchoring after `shown - 1` keeps
    it on its own line by construction — re-measured at **0 of 293
    misplaced, caret-to-glyph gap a constant 5px**, on both dev and the
    production build.
- ⛔ **EVERY CHARACTER STAYS IN FLOW. Unwritten ones are transparent, never
  `display: none`.** An intermediate attempt removed them from layout so the
  text would grow into an empty line — the obvious way to let a caret follow
  the text. It cannot work here: an empty line cannot reproduce the line box
  of a line that will hold glyphs, and no `min-height` fixes it, because
  line 3's emphasis word is Instrument Serif and its metrics are taller than
  the sans. Measured, that version produced **three different `<h1>` heights
  (260/268/281px) inside one cycle**, shunting the lede, CTAs and stat row on
  every rotation. Keeping every glyph in flow makes the box constant by
  construction: re-measured at **one `<h1>` height (281px) and one lede
  position (561px) across 240 samples**.
  - ⚠️ When measuring this, sample only AFTER the hero's entrance animations
    settle (~5s). `Reveal` translates its children 16px on mount, so a probe
    that starts at 600ms reports the lede moving and looks like a typewriter
    layout bug when it is not — that cost a false FAIL here.
- **The per-character fade is a CSS transition on `opacity`, selected by
  `data-on`** (theme.css). Possible only because the element never leaves
  flow. A transition is governed by the state being transitioned TO, so
  writing gets 300ms ease-out and erasing 120ms linear — the erase stays
  crisp, per "delete effect is okay", while the write keeps the soft reveal
  of Clinton's Aceternity reference. Zero per-character JS animation.
  ⚠️ An earlier version made characters appear INSTANTLY on a reading of
  "fixed writing effect" as "the fade looks smeared". That was the wrong
  reading — the write effect was *broken*, not too soft. Do not re-remove the
  fade.
- **The caret renders only when `(rotates || shown < totalChars)` and
  `!reduceMotion`.** A fixed, finished sentence otherwise keeps a permanently
  blinking caret, which reads as a stuck cursor.
  ⚠️ **Correction to an earlier claim in this file: the caret does NOT freeze
  invisible under reduced motion.** The global CSS floor collapses the blink
  to one 0.01ms iteration with no fill, so it settles at its BASE style —
  **measured opacity 1, solid**. A solid caret parked after a heading that
  will never write or erase implies motion that is not coming, so it is
  dropped outright in that branch. Verified absent (`caret: false`) under
  emulated `prefers-reduced-motion: reduce`, with the full sentence visible
  and no rotation across 17s.
- **The H1 is NOT `aria-hidden`**, following Scramble.jsx's precedent — it is
  real copy, and it is not a live region, so nothing is announced as it
  rotates; AT reaching it reads whichever headline is settled.

Superseded mechanism, kept because its hazards are still live elsewhere:

- ⛔ **Real bug, not a tooling artifact: passing the keyframes as a single
  ARRAY first argument — `animate([0, totalChars, totalChars, 0], {...})` —
  crashed every load with `TypeError: Invalid value used as weak map key`,
  caught by React's router error boundary.** Framer's `animate()` overloads
  on the first argument's shape: a bare array there is read as a list of DOM
  *subjects* to animate (as in `animate([el1, el2], {...})`), not as a
  keyframes sequence for a plain value. It then tried to track each number
  (`0`, `27`) as an element in an internal WeakMap — numbers can't be WeakMap
  keys, hence the exact error text. **Fix: value-only keyframe sequences need
  the two-argument form, `animate(from, [keyframe1, keyframe2, …], options)`**
  — `from` (0) stays a separate argument, and `times` gets one entry per
  value in the `to` array (3), not per value including `from` (4). The
  two-number form elsewhere in this file (`animate(0, totalChars, {...})`,
  and Scramble.jsx's own `animate(0, 1, {...})`) was never affected — only
  the multi-keyframe array form was ambiguous. **Scramble.jsx still uses the
  safe two-number form and needs no change.**

### ⚠️ Verification lesson: this pane CANNOT test this component
Two rounds of "verified working" in the in-app preview pane were wrong, and
the animation-free swap Clinton reported shipped straight through them. The
pane reports `document.visibilityState === "hidden"`, which suspends rAF and
throttles timers — already documented in the Phase 4 section, and it bites
harder here than anywhere else in the codebase:
- With the old keyframe mechanism, the pane showed the sentence fully typed,
  which looked like success. It was the animation being skipped to its end
  state, not running.
- An interim `useAnimate` + `stagger()` version showed the headline
  **permanently invisible** in the pane (every character stuck at opacity 0,
  no console error, no unhandled rejection) — which looks like a catastrophic
  bug and was not one. A real browser rendered it correctly.
- `document.getAnimations()` does not help either: motion drives its opacity
  animations on its own JS driver, not WAAPI, so the H1 reports only the
  caret's CSS blink. (The CURRENT version's fades are real CSS transitions,
  so they would show — but the counter driving them is still JS.)

**Verify this component by driving a real Chrome over CDP** — Node 22 has a
native `WebSocket`, so no dependency is needed; launch
`/Applications/Google Chrome.app/…/Google Chrome --headless=new
--remote-debugging-port=…`, then poll on an interval. Check
`document.visibilityState` reads "visible" first. Three probes are worth
rebuilding, and each caught a real defect the others missed:
1. **Progression** — count `.typewriter-char[data-on="true"]` and look for
   samples where `0 < written < total`. Catches the write collapsing to an
   instant swap.
2. **Caret tracking** — `caret.getBoundingClientRect().left` minus the last
   written character's `.right`. Should be a small constant on the same line
   (here: 5px). Catches the caret parking at the end of the sentence, and
   the line-break jump.
3. **Layout stability** — the `<h1>`'s height and the lede's `top`, sampled
   across a full cycle, each expected to yield exactly ONE distinct value.
   Catches the collapsing-empty-line problem. **Start this one ~5s in**, or
   `Reveal`'s 16px mount translation reports a false failure.

**Measured results, both dev and the production build over `npx serve dist`:**
all three headlines observed in rotation; the write steps through
intermediate counts (`C → Co → Com → …`) rather than jumping, and the erase
steps back down the same way; caret-to-glyph gap a constant **5px in 293/293
samples, 0 misplaced**; **one `<h1>` height (281px) and one lede top (561px)
across 240 samples**; cycle ~10.0s end to end. Reduced motion verified via
`Emulation.setEmulatedMedia`: full sentence visible, no rotation across 17s,
no caret.
- **Stale console errors are a trap in this tool.** After fixing the WeakMap
  crash, `read_console_messages` kept returning the OLD errors on the same
  tab across a forced reload, which looks exactly like an unfixed bug. Same
  again later for a `heroRotatingLines is not defined` HMR error that a hard
  reload had already resolved. **Open a NEW tab to get a clean console before
  concluding a fix did not work** — both times the fresh tab reported zero
  errors.

## Bug fix: hero stat row invisible-until-scroll at ~810–820px viewport height — 17-08-2026
Clinton reported the stat row "not shown when i open in more height desktop
screen, only show when i scroll a little bit." Real bug in `Reveal`
(`src/components/motion/Reveal.jsx`), not the typewriter work above, and not
a tooling artifact — confirmed by driving a real Chrome over CDP (the in-app
preview pane cannot be trusted for anything IntersectionObserver-based; see
the section above).

- **Root cause: a dead zone in `Reveal`'s scroll-trigger geometry.**
  `useInView` is called with `margin: "0px 0px -12% 0px"` (shrinks the
  intersection root by 12% of viewport height at the bottom) and
  `amount: 0.18` (18% of the target must overlap that shrunk root). For most
  viewport heights this is invisible — either the target is fully above the
  shrunk boundary (passes trivially) or fully below it (correctly waits for a
  real scroll, the below-the-fold case the margin exists for). But because
  the hero's content is vertically centred in a `min-h-[100svh]` container,
  there is a **narrow band of viewport heights (~810–820px at 1440 width)
  where the stat row is genuinely ON SCREEN at mount (`fitsInViewport: true`)
  yet overlaps the shrunk root by LESS than 18%** — so `inView` never becomes
  true, the row sits at `opacity: 0` forever, and only an actual scroll event
  (which recomputes the intersection against new geometry) fixes it. Worked
  out algebraically first (content height is a fixed ~750px regardless of
  viewport height at this breakpoint, so the failure band is derivable), then
  confirmed empirically: `revealOpacity: "0"` at 800/810/815px, `"1"` at
  790px and 825px+, and one sample at 820px caught mid-transition
  (`"0.446718"`) after a 2px scroll — i.e. the scroll didn't reveal
  already-rendered content, it triggered the reveal that had never fired.
- **This band is plausible on real hardware** — common laptop viewport
  heights after browser chrome land in or near it — which is why Clinton hit
  it on a real desktop despite it not reproducing at the first several
  round-number heights (900/1200/1400/1600px) tried.
- **Fix: `Reveal` now accepts optional `amount`/`margin` props**, defaulting
  to the existing values so every other call site (14 others, sitewide) is
  byte-for-byte unaffected. `HeroStats`' own `<Reveal>` in `Hero.jsx` now
  passes `margin="0px"` — no bottom exclusion — because this row is the
  hero's own trailing content and can legitimately already be on screen at
  mount, unlike a genuine below-the-fold section reveal, where the -12%
  margin is correct and stays untouched everywhere else. With `margin="0px"`,
  the row reaches 100% overlap the instant `fitsInViewport` is true, so
  there is no longer a threshold to miss.
- **Verified at the exact failing heights (700/750/780/800/810/815/820/825/
  850/900/1200/1600px, width 1440):** every height where the row is on-screen
  at load now reports `revealOpacity: "1"` immediately, with no scroll. 700px
  (row genuinely below the fold) correctly still waits for a real scroll —
  the fix removes the dead zone without turning this into an always-on
  reveal. `npm run lint`, `content:check` and `build` + prerender all clean.

⚠️ **Same class of bug could exist for any OTHER `<Reveal>` whose content sits
near a viewport-height-dependent fold** — most of the site's Reveals wrap
content that's unambiguously below the fold on any real viewport (they never
hit the "on screen but under-threshold" band), so this was not audited
sitewide. If a future report describes "shows only after a tiny scroll" for
a different section, check whether that section's container height also
scales with viewport height (vertical centering, `min-h-[100svh]`, etc.) —
that's the precondition for this dead zone to exist at all.

## Services menu restructure — nav.js only, content not design — 17-08-2026
NOT a phase. Clinton supplied a revised services mega-menu
(`thinkorange-services-menu.html`) and asked for the site updated to match —
explicitly the CONTENT (category names, groupings, service names), not that
file's own visual mockup (a static HTML/CSS panel, never wired to the real
`MegaPanel` component). `serviceCategories` in `src/content/nav.js` — the
keystone every surface derives from — was restructured to match exactly;
nothing else needed a structural change, per that file's own discipline.

- **What changed, in nav.js:** new category **Registrations & Licences**
  (`msme-udyam` and `startup-india-dpiit` MOVED here from Business Setup,
  plus 4 new unwritten leaves). Business Setup gained 1 new unwritten leaf
  (Trust, Society & Section 8) and lost the two that moved out. **Accounting
  & Audit relabelled "Accounting, Payroll & Audit"** — slug/path unchanged
  (`accounting-audit`), so its 3 written leaves kept their URLs; gained 3 new
  unwritten leaves. **Government Tenders + Loans & Finance MERGED** into one
  category, **Tenders & Finance** (`tenders-finance`) — all 4 existing leaves
  moved path with content untouched. GST gained 1 new unwritten leaf (LUT &
  Export Refunds). Income Tax gained 1 new unwritten leaf (Notices &
  Assessments) — ⛔ blocked the same as the category's other 3, BLOCKERS.md §1.
  Total leaf count: 21 → 31. Total routes: 48 → 58 (+404, sitemap unaffected).
- **`MegaPanel.jsx` needed zero code changes.** Its statutory/growth split
  already worked by filtering on `group` and finding the first "growth"
  index at render time, not by assuming a fixed 4-and-2 split — so 5
  statutory + 1 growth (Tenders & Finance) renders the same hairline
  separation mechanism correctly. Verified live: mega panel shows all 6
  columns, hairline break still lands before the one growth column.
  **`CategoryHub.jsx` also needed zero code changes** — its `content?.x &&`
  guards already tolerate `getCategoryContent(slug)` returning `undefined`,
  which is exactly the new Registrations & Licences hub's state (hero +
  child grid + CTA only, no intro/FAQ/why-us) until that copy is written.
- **`category-content.js`'s two old entries for the merged category were
  combined into one `tenders-finance` entry by RECOMBINING their existing,
  already-approved prose** — every sentence in the merged intro/whyUs/faqs
  already existed in one of the two old entries; only `meta`/`heroLede` are
  newly written, and stay exactly as fact-free as the rest of the file.
  **Business Setup's intro and FAQ list were edited for accuracy**, not
  expanded: the paragraph naming DPIIT/MSME as part of this category was
  rewritten (they moved out), and the DPIIT FAQ was dropped rather than left
  stale — noted in `MISSING-PAGES.md` to carry into the new hub's content
  once written, rather than silently lost.
- **`msme-udyam`/`startup-india-dpiit`/`gem-registration`/
  `tender-documentation`/`business-loan`'s own `category:` field** (each
  leaf's own metadata, required by `_schema.js`, documented there as "Parent
  category slug from nav.js") **were updated to match** even though nothing
  currently reads that field at render time — `content:check`'s orphan check
  only cross-validates a leaf's `slug` against nav.js, not this field — kept
  accurate for whichever future validator or review-doc generator expects it
  to actually match.
- **`WhatWeDo.jsx`'s `PROMISES`/`SPANS` maps are keyed by category slug and
  would have silently rendered a blank promise + fallen back to a default
  span for any slug not in the map** — updated for the new/merged slugs.
  The bento layout is UNCHANGED as a pattern (6+3+3 / 3+3+6, verified live
  via each card's `col-span` class) — only which category fills which slot
  moved, so DESIGN.md §11.3's asymmetric-grid intent survives the
  restructure untouched.
- **Two other stale-content bugs caught and fixed in the same pass, not
  directly requested but silently wrong the moment the leaf count changed:**
  `ServicesHub.jsx`'s lede hardcoded "twenty-one services" — now computed
  from `serviceCategories` at render time so a future count change can't
  silently go stale again the same way; and `meta.js`'s `/services` SEO
  description, which hardcoded the same stale count and the two now-gone
  category names.
- **`MISSING-PAGES.md` (new)** is the punch list this restructure's own
  request asked for: every new/moved leaf and the one new category hub that
  still needs real content, organised under a "Services" heading. Nothing
  in it is a blocker — every route already renders today via `PendingLeaf`
  or `CategoryHub`'s tolerant no-content branches — it's a writing backlog,
  not a bug list. Follow it, plus this file's own content-writing rules
  above, when that batch of leaves eventually gets written.
- Verified: `npm run lint` (0 errors), `npm run content:check` (17/21
  written leaves still validate clean — none of the moves or renames touched
  leaf *content*, only nav.js/category-metadata), `npm run build` + prerender
  (58 routes + 404 + sitemap, up from 48), and a live dev-server pass: the
  mega panel's 6 columns, a new unwritten leaf's `PendingLeaf` fallback (with
  correct written-sibling links), the new hub's tolerant render, the merged
  hub's combined intro/FAQ, Business Setup's corrected copy, and the
  homepage's 6-card bento grid in the right 6/3/3/3/3/6 spans — zero console
  errors throughout.

## DSC & eSign menu restructure + Partner With Us moved into the DSC panel — 17-08-2026
NOT a phase. Same treatment as the services menu restructure above, applied to
`thinkorange-dsc-menu.html` (Clinton's revised DSC & eSign mega-menu) — content
only, that file's own visual mockup was not implemented. Plus an explicit,
separate design request: pull "Partner With Us" out of the main navbar
entirely and surface it as a premium promo card inside the DSC panel instead.

- **nav.js DSC exports restructured:** `dscProducts` grew from 4 to 7 (added
  `combo-dsc`, `dsc-renewal-reissue`, `aadhaar-esign` — all unwritten). Two new
  standalone T5 pages, `dscValidityFaqsPage` and `dscEsignVsDscPage` (also
  unwritten), added alongside the existing `dscDocumentsPage`. `dscPanelColumns`
  rebuilt into 3 columns matching the revised menu ("Digital Signature
  Certificates" / "Tokens & Resources" / "eSign Solutions") and switched from
  positional indices (`dscProducts[3]`) to a `dscProduct(slug)` lookup helper —
  indices would silently point at the wrong item the next time something is
  inserted. New `dscPartnerPromo` export holds the promo card's content
  (heading/description/CTA/secondary link), copied verbatim from the menu's
  "Partner Programme" panel. All three of `allRoutes`, `footerColumns` and the
  `slugIndex` behind `findBySlug` were updated for the 2 new T5 pages — missing
  any one would have left a route unreachable from the sitemap/footer or an
  unresolvable `related` pointer. Total DSC routes: 9 → 14.
- ⛔ **Two T4/T5 templates had NO graceful fallback for an unwritten slug —
  both `return`ed `null`, a genuinely blank page (not even a hero), and this
  restructure would have shipped five of them.** `PendingLeaf` (T2) has
  existed since Phase 6 for exactly this; T4/T5 never needed it before because
  every one of the original 4+6 routes had content. Added `PendingProduct` to
  `DscProduct.jsx` and `PendingUtility` to `UtilityPage.jsx`, both mirroring
  `PendingLeaf`'s shape (hero, "still being written", phone/WhatsApp buttons).
  Verified live: `/dsc/combo-dsc` and `/dsc/esign-or-dsc` both render this
  state correctly instead of a blank `<main>`.
- ⛔ **Real crash caught before shipping: `DscBand.jsx`'s homepage section
  has its own `ICONS` map keyed by product slug, with only 4 entries.**
  `dscNav.map(...)` iterates every product in nav.js and does `<Icon />`
  where `Icon = ICONS[product.slug]` — for the 3 new products this evaluates
  to `undefined`, and `<undefined />` is a hard React crash (invalid element
  type), not a graceful blank. Added `Lock` (combo-dsc), `RefreshCw`
  (dsc-renewal-reissue) and `FileSignature` (aadhaar-esign). Grepped the rest
  of `src/` for other slug-keyed DSC maps before calling this done — none
  found (`WhatWeDo.jsx`'s equivalent maps are services-only, `DriverDownloads.jsx`
  only touches the untouched `dscDriversHub`).
- **The DSC mega panel gained two new mechanisms in `MegaPanel.jsx`, both
  additive — the Services panel is unaffected:**
  1. **Per-item `note`** (`item.note`, rendered under a link's label) — the
     revised menu's "HYP2003 · mToken · InnaIT" subtitle on "Buy DSC Tokens"
     needed this; the component only had a column-level `note` before.
  2. **A `promo` prop**, rendered by a new `PanelPromo` sub-component instead
     of `PanelColumn` — a promo card isn't a link list, so it gets its own
     branch rather than overloading `column.items`. Sized as one more equal
     grid track in the SAME grid as the link columns (not a second sibling
     grid), same reasoning `MegaPanel`'s existing growth-column comment
     already gives for why that split matters.
  `MobileNav.jsx` got the mobile equivalents: per-item note rendering inline,
  and a `PromoCard` component rendered inside the DSC accordion group,
  `tabIndex`-gated the same way every other link in that accordion already is.
- ⛔ **Real bug, caught by checking computed styles rather than trusting a
  screenshot: the promo card's "Partner Programme" heading rendered CANVAS
  instead of the ember I'd styled it, because `[data-surface="dark"] h4`
  (theme.css) beats a plain `.text-ember-300` class on specificity — the
  exact trap this file already documents once for PartnerProgramme's h3.**
  Fixed by NOT fighting it: dropped to `text-h4 text-canvas`, matching
  `PanelColumn`'s own heading style AND matching what the source mockup's
  `.col.panel h4` actually does (plain white, same as every other column
  heading — my ember instinct was an embellishment beyond the source, not
  something the mockup asked for). Applied to both the desktop and mobile
  versions.
- **"Partner With Us" removal from the navbar touched two different arrays
  that don't share one true source, on purpose.** `primaryNav` (desktop) had
  the entry removed outright. `standalonePages` — a SEPARATE array that also
  feeds the footer's Company column and `allRoutes` — was left untouched, so
  the real `/partner-with-us` page keeps existing and stays reachable from
  the footer; `MobileNav.jsx`'s flat link list (which reads `standalonePages`
  directly, not `primaryNav`) instead filters it out at render time
  (`.filter((page) => page.slug !== "partner-with-us")`). Missing this
  filter would have left the old link sitting in the mobile menu even after
  it disappeared from desktop — the two navbars don't derive from the same
  array, so removing it from one doesn't remove it from the other for free.
- **"DSC" relabelled "Digital Signatures"** in `primaryNav` (desktop) and
  `MobileNav.jsx`'s `SECTIONS` (mobile) — both hardcoded the string
  separately, so both needed the edit. Left alone deliberately: the panel's
  own internal column labels and DSC product names ("Buy DSC Tokens", etc.),
  where "DSC" is the accurate, established short form for a specific
  certificate rather than the whole practice area.
- **"Partner login" has no backing portal — nothing on this site
  authenticates a partner — so it's routed to WhatsApp** with a pre-filled
  message, not a dead link or an invented login page. Same "no backend yet,
  route to a human" pattern as `EnquiryCard`/`DscEnquiryStrip` elsewhere in
  the DSC tree. The WhatsApp link-builder is duplicated (not shared) between
  `MegaPanel.jsx` and `MobileNav.jsx` — matching `DscProduct.jsx`'s own
  precedent of keeping such small formatters local rather than centralising
  a two-call-site helper into nav.js.
- **`DscHub.jsx`'s "Documents & drivers" section grew from 2 cards to 4**
  (added Validity/Renewal/FAQs and eSign-or-DSC), `sm:grid-cols-2` →
  `sm:grid-cols-2 lg:grid-cols-4`, so both new T5 pages are reachable from the
  hub page itself, not just tucked inside the nav menu.
- **`MISSING-PAGES.md` gained a "DSC & eSign" section**, same discipline as
  its existing "Services" section — nothing below is a blocker, every route
  already renders via the new `PendingProduct`/`PendingUtility` fallbacks;
  it's a writing backlog. Flags one thing for Clinton to confirm rather than
  guess at: whether `buy-tokens`'s own product-page copy (still HYP2003-only)
  should be updated to match the menu's newer "HYP2003 · mToken · InnaIT"
  subtitle.
- Verified: `npm run lint` (0 errors), `npm run content:check` (clean, DSC
  content isn't covered by this script at all — no schema exists for T4/T5
  the way `_schema.js` covers T2), `npm run build` + prerender (63 routes +
  404 + sitemap, up from 58), and a live dev-server pass: the mega panel's 3
  columns + promo card (desktop and mobile), the per-item token-brand note,
  `PendingProduct`/`PendingUtility` on two of the five new unwritten routes,
  the DSC hub's 4-card documents/drivers grid, the homepage DSC band
  rendering all 7 products without crashing, "Partner With Us" absent from
  both navbars but still reachable via the promo card/footer/`/partner-with-us`
  directly, and zero console errors throughout.

## Services backlog closed — 18-08-2026
NOT a phase. Closed `MISSING-PAGES.md`'s Services section (the DSC & eSign section
there is separate and still open). Deliberately broke the usual "4-5 leaves per
session" rule (Session discipline, below) — this ran as 5 parallel research batches,
one per shared statutory domain, each independently researching real sources and
writing its own leaf file(s) with no shared-file edits, so the parallelism didn't
create the drift that rule exists to prevent. Statutory/turnaround keys from all 5
batches were merged centrally afterward, once, to avoid concurrent writes to those
shared files.

- **10 leaf files written**: `iec-registration`, `icegate-registration`,
  `trademark-registration`, `ngo-darpan-registration` (new Registrations & Licences
  category), `gst-lut-export-refunds` (GST), `trust-society-section8` (Business
  Setup), `pf-esi-registration`, `payroll-processing-returns`, `roc-annual-compliance`
  (Accounting, Payroll & Audit), and `personal-finance` (Tenders & Finance — closed
  the pre-existing gap `services/index.js`'s own header comment had flagged since
  Phase 3). Plus the `registrations-licences` entry in `category-content.js`
  (intro/whyUs/faqs, carrying forward the DPIIT FAQ that lost its home in the
  17-08-2026 restructure). 27 of 31 service leaves are now written; the 4 unwritten
  are all Income Tax, all blocked on BLOCKERS.md §1 (now updated to list all four,
  including `notices-assessments`, added by that same restructure).
- **`trust-society-section8.js` covers three legal structures in one leaf** (nav.js
  groups them as one route) — `documents` has three groups instead of the usual one.
  Real research finding worth flagging again here: Tamil Nadu registers societies
  under its OWN 1975 Act, not the central 1860 Act every generic guide assumes — got
  this wrong once would have meant a Salem client following the wrong statute's
  procedure entirely, not just a stale number.
- **`roc-annual-compliance.js` reuses existing `statutory.js` keys** (`aoc4Window`,
  `mgt7Window`, `llpForm8Due`, `llpForm11Due`, etc.) rather than duplicating them —
  the research agent was briefed specifically to check for this before adding new
  keys, since this leaf's facts overlap heavily with `private-limited-company.js`'s.
- **`payroll-processing-returns.js` needed the same income-tax exclusion discipline
  as everywhere else**, even though payroll is an EPF/ESI/Companies-Act topic, not an
  income-tax one: salary TDS is mentioned only generically ("deducted and deposited
  each month"), no section number, no form name, because that specific sub-topic
  (salary TDS's section and form both moved under the 2025 Act) is exactly what
  BLOCKERS.md §1 is about. Same exclusion applied to `12A`/`80G` mentions in
  `trust-society-section8.js` and `ngo-darpan-registration.js` — non-profits
  routinely pursue income-tax exemption registration, described generically with no
  section number, flagged in each leaf's `review.notes` as deferred pending that
  blocker.
- **`content:check`'s inline-fact scanner caught two real misses**: `gst-lut-export-
  refunds.js` had literal "31 March"/"1 April" mentions alongside its correct `s()`
  calls (reworded to "the financial year ends"/"a new financial year" — the specific
  dates are already established via `s("lutValidityPeriod")` elsewhere on the page),
  and `personal-finance.js` had literal "3 months"/"6 months" document-lookback
  windows. The latter weren't restated via a new statutory key, because they aren't a
  legal fact — how many months of statements a lender wants is the LENDER's practice
  and varies; reworded to say so honestly ("the exact number of months is set by the
  lender") rather than inventing a false universal rule.
- Verified with a live dev-server pass (not just `content:check`/`build`) over all 9
  new leaves plus the new hub — real content renders, zero console errors. The
  session's `.claude/launch.json` had a stale hardcoded `port: 5173` that collided
  with an unrelated project's dev server; fixed by pinning an explicit unlikely-to-
  collide port (5183) with `--strictPort` rather than relying on `autoPort`, which
  doesn't work here since `vite --host` doesn't read the tool's reassigned port back
  and just auto-increments past whatever's already in use.

## DSC & eSign backlog closed — 18-08-2026
NOT a phase. Same session as the Services backlog above; closes the other half of
`MISSING-PAGES.md` (the DSC & eSign restructure's writing backlog). Content researched
from `svsdigicorp.com` (a real DSC reseller, Clinton's requested source — used to
confirm what a Combo DSC actually is commercially, not just in law) plus the Wikipedia
eSign (India) article and several DSC-industry sources for renewal mechanics and the
eSign-vs-DSC comparison.

- **3 T4 products** (`combo-dsc`, `dsc-renewal-reissue`, `aadhaar-esign`) added to
  `src/content/dsc/products.js` — all fit the existing shape with zero template
  changes. `aadhaar-esign` is the interesting one: `validityOptions: null` and
  `driverSlugs: []`, both already handled by `DscProduct.jsx`'s existing optional
  chaining, because eSign genuinely has no token and no multi-year certificate to
  validate — it's a different mechanism from every other product on this page, not a
  DSC variant with different numbers.
- **2 new T5 pages, and T5 had no content schema for either — one had to be designed
  from scratch**: `validity-renewal-faqs.js` and `esign-or-dsc.js`
  (`src/content/dsc/`), plus two new dispatch branches and render functions
  (`ValidityRenewalFaqs`, `EsignOrDsc`) in `UtilityPage.jsx`. `validity-renewal-faqs`
  deliberately does NOT duplicate each product's `validityOptions` as static content —
  it reads `dscProducts` directly at render time, same "select by reference"
  discipline as the homepage FAQ row and the existing Documents Required page, so a
  future validity change on any product can't leave this page quietly stale.
- **`DscHub.jsx` needed zero changes** — it already builds its product grid and its
  documents/drivers grid from `dscProducts`/nav.js directly, so all 7 products (up
  from 4) and both new T5 pages appeared automatically the moment the content existed.
  Worth remembering as a pattern: a hub/index page built from a data source, not a
  hardcoded list, absorbs new children for free.
- **The one fact that mattered most to get unambiguously right, stated twice**:
  Aadhaar eSign does NOT substitute for a Class 3 DSC on statutory portals (income
  tax, GST, MCA21/ROC, e-tendering/GeM) — those mandate Class 3 specifically. Stated
  in `aadhaar-esign`'s own `verificationNote` (a prominent rendered callout, not buried
  prose) and again as its own row on the `esign-or-dsc` comparison table, so a reader
  landing on either page gets the correction rather than an easy-to-miss caveat.
- **Two things flagged as inferred, not confirmed**, in `MISSING-PAGES.md`: whether
  GeM specifically requires an encryption certificate for `combo-dsc` (SVS DigiCorp's
  own site doesn't list GeM under their combo product — worded as "many e-tendering
  portals" rather than naming GeM), and whether ThinkOrange's existing eMudhra/SignX
  DSC partnership actually extends to Aadhaar eSign delivery today, or whether that's
  this session's reasonable-but-unconfirmed inference from the partnership already
  existing for DSC issuance.
- **No `content:check`-equivalent schema exists for DSC content** (T2's `_schema.js`
  only covers service leaves — a pre-existing gap, noted back in the Phase 7 section
  above). Verified instead by `npm run lint`, `npm run build`, and a live dev-server
  pass over all 5 new routes plus `/dsc` itself — zero console errors, and the DSC
  hub's product/resource grids confirmed picking up every new entry automatically.

## Income Tax leaves written — BLOCKERS.md §1 cleared for writing — 19-08-2026
NOT a phase. The last four unwritten service leaves — `itr-filing`,
`tds-compliance`, `tax-planning-advisory` and `notices-assessments` — are now
written. **All 31 service leaves have content.** The blocker was never about
writing capacity; it was that the Income Tax Act, 2025 replaced the 1961 Act on
01-04-2026 and every section number, form name and the core "Assessment Year"
framing had to be RESEARCHED rather than recalled. That research happened this
session and is recorded, fact by fact, in `statutory.js`.

- **`statutory.js` gained an `INCOME TAX ACT, 2025` block (~45 keys)**, each with
  its own `basis` and `source`, plus a separate `incomeTaxAsOf` export — that
  block needs re-checking on a shorter cycle than the GST and Companies Act
  values, so it does not hide behind the file-wide `asOf`.
- **The mapping that made these pages writeable at all**, since a remembered
  number here is a wrong number: returns are `Section 263` (was 139/139D/194P);
  TDS is `392` salary + `393` everything-else-by-payment-code (was 192–194T,
  sixty-odd sections) with compliance under `397`; assessment is `270` (was 143),
  best judgment `271` (was 144), faceless `273`, reassessment notice `280` (was
  148); late fee `428` (was 234F), interest `423`/`424` (was 234A/234B); rebate
  `156` (was 87A); tax audit `63` (was 44AB); presumptive `58`/`61`. Forms:
  statements `138`/`140`/`144`/`143` (was 24Q/26Q/27Q/27EQ), certificates
  `130`/`131` (was 16/16A).
- **BLOCKERS.md §1's Option A was taken**, as it recommended: every leaf leads
  with the 2025 Act and states that income earned up to 31-03-2026 is still
  governed by the 1961 Act. **No page says "Assessment Year" except to say it has
  been abolished** — that concept was removed, not renamed, and copy still using
  it is copy written against a repealed Act. That is the single most visible
  possible error on a tax consultancy's own site, so treat it as a hard rule for
  any future income-tax content.
- **What was deliberately NOT published, and why it is not a gap:** no TDS rate
  table or per-payment-code threshold, no basic exemption amount, no presumptive
  turnover ceiling, no reassessment limitation period, and no first-appeal form
  number. Rates reportedly carried over unchanged from the 1961 Act — but
  "reportedly" is not the standard for a number a client will actually deduct on,
  and one secondary source reporting Form 99 replacing Form 35 was not
  corroborated. Same discipline as `fees: null`: state the mechanism, defer the
  unconfirmed number. Each leaf's `review.notes` says exactly what was withheld.
- **`tax-planning-advisory` carries a different risk from the other three and is
  written differently.** Filing, TDS and notices go wrong by citing a repealed
  section; a planning page goes wrong by drifting into personalised financial
  advice. So it states mechanisms and what the comparison depends on, names no
  investment product, gives no worked example, and quantifies no saving. The
  rebate line carries two caveats that must survive any rewrite: the ₹12 lakh
  figure is taxable income AFTER the standard deduction, and the rebate does not
  extend to income taxed at special rates. Stating the headline without them is
  the most misread number in Indian tax.
- **`notices-assessments` is now the second-highest-risk page on the site**, after
  `gst-notices-litigation`, and for the same reason — a visitor may act on it
  while a reply window is running. It gives the OLD section number in brackets
  once per concept (143, 148, 144) purely as orientation, because a reader
  arriving with a notice searched for the old number; the citation itself is
  always the new one.
- **Two `content:check` catches worth knowing about**: the inline-fact scanner
  flagged the literal commencement date "1 April 2026" (now `s(
  "incomeTaxAct2025Commencement")`) and a raw "₹12 lakh" sitting in an FAQ
  QUESTION, not an answer — the question was reworded so the amount comes from
  the statutory key in the answer. It also enforces that every `s()` key used
  appears in that leaf's `review.statutoryKeys`, which caught four omissions.
  The scanner earns its keep on exactly this kind of page.
- **Fixed in passing: `content:check` reported "31 leaf file(s) written of 21"** —
  the total was hardcoded and went stale when the 17-08-2026 menu restructure took
  the count from 21 to 31. Now derived from `serviceLeavesBySlug.size` (a Map, not
  an object — `Object.keys()` on it returns 0 and reports "of 0").
- Verified: `npm run lint` (0 errors; one PRE-EXISTING unused-`site`-import warning
  in `MegaPanel.jsx` from the DSC restructure session, untouched here),
  `npm run content:check` (31/31 leaves validate, no hardcoded facts, only the
  three long-standing unconfirmed-content warnings), `npm run build` + prerender
  (63 routes), and a real-Chrome-over-CDP pass across the Income Tax hub and all
  four new leaves — correct H1, 9 sections each, 8 FAQs, 5 JSON-LD blocks, "On
  request" fees, no `undefined` in any rendered string, zero console errors.

## One FAQ treatment sitewide — homepage design applied to every page — 19-08-2026
NOT a phase. Clinton: "in faqs section in all page take the design of Faqs
section of home page." There were two FAQ treatments; there is now one, and the
homepage is no longer the special call site — it is one of nine.

- **What the homepage design actually was, and it is TWO things, not one.** The
  row treatment (mono `01` index, question at `text-h4`, a `+` that rotates
  135° to an `×`, hairline top/bottom rules, first row open) AND the section
  composition (4/8 split, STICKY left rail carrying eyebrow + h2 + one
  supporting line + a WhatsApp escape hatch). Only migrating the first would
  have left every other page stacking a heading above a `max-w-[76ch]` list
  with the entire right half of the 1800px container empty — which is what they
  were doing. Both moved.
- **`components/ui/Accordion.jsx` now IS that row treatment**, and the
  homepage's private `FaqAccordion` inside `Faqs.jsx` is deleted. Single
  definition, same discipline as `.card-dark`. New optional `item.link`
  (`{ to, label }`) renders the "More on X ↗" row — the ONE thing unique to the
  homepage, whose FAQs are pointers into written leaves.
- **`components/ui/FaqSection.jsx` (new)** is the section composition.
  Deliberately NOT a `<Section>`: the surface is decided per page (DscHub
  derives it from its column count so the cadence can't repeat) and callers
  hang `id`/JSON-LD off their own Section. It owns the layout inside, nothing
  else.
- **The animation mechanism is the grid-rows one, NOT the homepage's old
  `AnimatePresence` height animation, and that is a real improvement rather
  than a compromise.** `grid-template-rows: 0fr → 1fr` (DESIGN.md §9.3) keeps
  the panel MOUNTED while closed, which removes the dangling-`aria-controls`
  problem the homepage version had to work around by setting the attribute only
  while open (found in the Phase 5 a11y pass, recorded above). Verified: 0
  dangling references on all 10 routes checked.
  - Consequence to remember: a mounted-but-collapsed panel means any link
    inside it is still in the tab order. `item.link` carries
    `tabIndex={isOpen ? 0 : -1}` for exactly that. Measured on the homepage:
    exactly 1 tabbable panel link (the open row's), not 6.
- **9 call sites migrated**: homepage, T2 service leaves, T3 category hubs, DSC
  hub, DSC products, three sections in T5 utility pages (including the driver
  troubleshooting list, which is the same archetype and takes a custom
  `askLabel="Send us a screenshot"`), and partner-with-us.
- **Two copy bugs the new layout EXPOSED rather than caused** — both were
  `.toLowerCase()` calls that were tolerable under a small eyebrow and read as
  typos once promoted into the rail's h2 and body copy: `About gst services` →
  `About GST` (CategoryHub) and "asked about gst registration" → "about GST
  Registration" (ServiceLeaf), same for DSC product labels. nav.js and leaf
  titles are already correctly cased; do not lower-case them.
- **Tailwind v4 gotcha that produced a false negative during verification:**
  `rotate-[135deg]` compiles to the INDIVIDUAL `rotate` CSS property, not to
  `transform`. `getComputedStyle(el).transform` reads `"none"` and looks like
  the class never applied. Read `.rotate` instead — it reports `"135deg"`.
- Verified on 10 routes in a real Chrome over CDP: identical list width (833px
  at 1440), sticky rail on every one, exactly one row open, `+` at 135° on the
  open row, 0 dangling `aria-controls`, single-open toggle by mouse AND by real
  Enter key events, no HTML entity leaking into rendered text, no horizontal
  overflow at 375px, zero console errors. `npm run lint` (0 errors; the one
  pre-existing `MegaPanel.jsx` unused-`site` warning is untouched),
  `content:check` clean, `build` + prerender 63 routes.

## One step treatment sitewide — scroll-linked StepFlow — 19-08-2026
NOT a phase. Clinton: "in all step section i want to make a premium step section
like HowWeWork component, with scrolling effect." Three sections hand-rolled the
same static `border-l` list with a numbered circle — T2's *How it works*, T4's
*How to get it*, T5's *Installation* — while only the homepage's `HowWeWork` had
the real scroll-linked treatment. `components/ui/StepFlow.jsx` (new) is that
treatment generalised. **HowWeWork itself is untouched and stays the reference.**

- **Vertical, not HowWeWork's horizontal arc, and that is a content constraint
  rather than a preference.** The arc samples a quadratic bézier at exactly four
  points and pairs each with a one-line label in a 4-column row. These sections
  carry 3–6 steps whose bodies run a full sentence plus a duration — at six
  columns that is a ~280px track even on the 1800px container. So StepFlow uses
  the mechanic from HowWeWork's own MOBILE variant (vertical connector,
  draw-on-scroll, nodes popping as the line reaches them): same idea, same
  tokens, in a shape the content survives.
- **The progress line is a `scaleY` transform, NOT an SVG `pathLength`.**
  pathLength animates stroke geometry, which is a paint property; a transform is
  composited. Same reasoning that put the dark-card hover ring on opacity rather
  than a growing box-shadow.
- ⚠️ **NODE THRESHOLDS ARE MEASURED FROM THE DOM, not assumed evenly spaced,
  and this is the detail that decides whether the effect reads as real.** An
  even `i/(n-1)` split is only correct when every step is the same height, and
  these are not — one step has a two-line body and a duration, the next has one
  line. With an assumed split, a node pops visibly before or after the line
  actually arrives, which is the classic tell of a fake scroll effect. Each
  node's true centre is measured in a layout effect and re-measured by a
  `ResizeObserver` on the container AND every node, so a font swap or a
  re-wrapping title cannot desynchronise it.
- ⛔ **BODY COPY IS NEVER DIMMED — a measured accessibility decision, and the
  first version got it wrong.** Fading un-reached steps to 0.55 opacity puts
  ink-300 body copy at **2.43:1** against ink-900, far under the 4.5:1 AA floor
  Phase 10 holds the site to; even 0.8 opacity only reaches 3.79:1 (light
  surface: 2.88:1 and 5.35:1 respectively). Text a reader can scroll to must
  pass at rest. The motion now lives entirely in the line and the nodes — both
  decorative and `aria-hidden` — and every word is full contrast from first
  paint. **Do not reintroduce a text fade here.**
  - The node rests at **0.3 opacity, not 0**. At zero, a step the line has not
    reached renders as body copy with a hole where its number should be, which
    reads as a loading failure to anyone landing mid-section from the sub-nav's
    anchor links.
- **Layout: the same 4/8 sticky rail as `FaqSection`**, for the same reason — a
  step list is a 62ch measure, so heading-above-list left the right half of the
  container empty. StepFlow owns its `Container` and heading (`eyebrow`,
  `heading`, `intro` props) so call sites are one element.
- **Duration is a hairline rule plus mono, NOT a bordered pill.** The first pass
  used a `rounded-full` bordered pill; beside body copy that reads as a button,
  and several steps render `turnaround.js`'s "Confirm with us" fallback — a pill
  saying that looks like a call to action that does nothing when clicked.
- **`useLayoutEffect` is isomorphic here** (`typeof window` check): Phase 9
  prerenders every route through `renderToString`, where a layout effect warns
  and has nothing to measure anyway.
- Verified in a real Chrome over CDP on all four affected route families (T2 leaf
  incl. a new Income Tax leaf, T4 product, T5 driver): the line's `scaleY` steps
  through genuine intermediate values (0 → 0.31 → 0.75 → 1) with nodes lighting
  in step, and probes repeatedly caught nodes MID-POP (0.47, 0.65, 0.92) — which
  is the proof it tracks live scroll position rather than animating to completion
  on entry. Body opacity is `1` everywhere, at every scroll position. Reduced
  motion via emulated media: line fully drawn, all nodes and bodies at 1, no
  animation. 375px: no horizontal overflow, nodes at x=24. Zero console errors.
  `npm run lint` (0 errors), `content:check` clean, `build` + prerender 63 routes.

## Bug fix: `overflow-x-hidden` on <main> disabled EVERY sticky on the site — 19-08-2026
Clinton reported the T2 sub-nav "supposed to be sticky after navbar but it is
not working". Real bug, one root cause, and its blast radius was much wider than
the reported symptom.

- ⛔ **ROOT CAUSE: `<main id="main" className="overflow-x-hidden">` in
  `RootLayout.jsx`.** Per spec, when one overflow axis is not `visible` the
  other computes to `auto` — so `overflow-x: hidden` silently gave `<main>`
  `overflow-y: auto` and made it a SCROLL CONTAINER. A `position: sticky`
  element inside then sticks to main's scrollport rather than the viewport, and
  since main is not the thing being scrolled (the document is), it never engages
  at all. Measured before the fix: at scrollY 1800 the sub-nav sat at **-1344px**
  instead of parking at 64px.
- **Fix: `overflow-x-clip`.** `clip` does the same visual clipping WITHOUT
  creating a scroll container, so the horizontal-overflow guard the class was
  there for still holds. Verified after the change: `main` computes
  `overflow-x: clip / overflow-y: visible`, and `documentElement.scrollWidth`
  is still exactly 375 at a 375px viewport on `/`, a T2 leaf, `/dsc`, `/contact`
  and `/about` — nothing started overflowing.
- **This one line was breaking every sticky on the site, not just the sub-nav**:
  the T2 enquiry card, and both rails added earlier the same day (`FaqSection`,
  `StepFlow`). They are all now measured parking correctly — sub-nav at exactly
  64px at every scroll position, rails at 116px (`--header-h` + 32).
- **Second, independent bug found while verifying, on the T2 enquiry card:
  `lg:self-start` on its grid column.** A sticky element can only travel inside
  its parent's box; `self-start` shrank the column to the card's own height, so
  there was zero travel and it scrolled away like a static element even once the
  main overflow bug was fixed. Removed — the column now stretches to the row
  height, which is the point of it being sticky.
  - ⚠️ **Still honestly limited, and not something CSS can fix here:** the card's
    travel is bounded by the OVERVIEW SECTION's height, and on several leaves the
    card is the tallest item in that row, so the row height equals the card
    height and there is nothing to travel through. It engages on leaves whose
    overview column is taller, and on short viewports. Making it stick through
    the whole page would mean moving it out of the overview section, which is a
    template restructure CONTENT-PLAN.md §7 does not ask for — flagged rather
    than silently half-fixed.
- **Debugging note that cost a wrong reading:** an early probe reported the
  sub-nav's `position` as `static`, which looked like the Tailwind class never
  applied. It was a selector error —
  `nav[aria-label="On this page"].parentElement` is `Container`'s inner div, not
  the sticky wrapper. Use `.closest('div.sticky')`.
- **The general rule for this repo, since this will recur:** if something that
  should be sticky is not, check every ancestor for a non-`visible` overflow on
  EITHER axis before touching the sticky element itself. `overflow-x-hidden` is
  the usual culprit and it never looks like the cause.

## Sticky sub-nav extended to the DSC tree — 19-08-2026
NOT a phase. Clinton asked for the T2 sub-nav on the DSC pages too, straight
after the sticky bug above was fixed.

- **`SubNav` moved out of `ServiceLeaf.jsx` into
  `components/layout/SubNav.jsx`** — it was a private function there. One
  implementation now serves T2 leaves, T4 DSC products, the DSC hub and three
  T5 pages. Two things gained in the move: `aria-current` on the active tab
  (the scroll-spy was purely visual before), and a `sections.length < 2` guard
  that renders nothing — a one-tab bar is decoration, not navigation.
- ⚠️ **EVERY BAR IS BUILT FROM WHAT THE PAGE ACTUALLY RENDERS, never a fixed
  list, and this is the trap to avoid if more pages get one.** A tab pointing at
  a section that conditionally did not render scrolls nowhere AND never lights
  up under the scroll-spy, which looks broken rather than empty. So:
  `aadhaar-esign` has `validityOptions: null` and correctly shows 5 tabs where
  the other products show 6; a driver with no `troubleshooting` drops that tab;
  the FAQ tab appears only where FAQs exist. Verified per page that every tab's
  target id resolves to a real element.
- **`DscHub`'s bar is derived from the same `columns` array its sections render
  from**, through a single `groupId(label)` helper — so a nav.js menu change
  moves the menu, the sections and the bar together, and a tab can never point
  at an id that was spelled differently in two places. Same "one source" rule
  the hub's grouping already followed.
- **`/dsc/documents-required` and `/dsc/drivers` deliberately get NO bar** —
  each is a single anchorable section, so the guard above returns null. That is
  the intended outcome, not a gap.
- **T5's "no marketing chrome" brief (CONTENT-PLAN.md §9) was considered and
  does not bar this**: a sub-nav is navigation, not chrome, and on a driver page
  it is the fastest route to the one section a stuck user wants. No `Reveal` was
  added anywhere in the T5 tree.
- Verified in a real Chrome across 8 routes (DSC hub, two products including the
  no-validity one, three T5 pages, plus a T2 leaf as a regression check): every
  tab's target exists, the bar parks at exactly 64px at every scroll position
  while the page has content below it, and the scroll-spy marks the correct tab
  after jumping to a section. Zero console errors. Lint, `content:check`, build
  + prerender 63 routes all clean.
- **Found, NOT fixed, pre-existing and unrelated to this change:**
  `DscHub.jsx` renders `<img src="public/images/drivers/dsc-card.png">` — a bare
  `<img>` (CLAUDE.md forbids these outside the `<Img>` component) whose path is
  also wrong: `public/` is the build root, so the served URL is `/images/...`,
  and as written it resolves relative to the route and 404s. Flagged rather than
  silently changed, since it came in with an uncommitted image batch from
  another session.

## Supplied product images framed — ProductShot, and two live bugs fixed — 19-08-2026
NOT a phase. Clinton added two of his own images (`public/images/drivers/dsc-card.png`,
a HYP2003 token; `public/images/home/dsc.png`, a signed-document illustration)
and asked for them to be fixed and made to look premium instead of "plain".

- ⛔ **BUG 1, and it was live: `DscHub.jsx` had `src="public/images/drivers/
  dsc-card.png"`.** `public/` is Vite's build ROOT, not a URL segment — the
  served path is `/images/...`. As written the browser resolved it relative to
  the route (`/dsc/public/images/...`) and 404'd, so the DSC hub was shipping a
  broken image. Now `/images/drivers/dsc-card.png`, verified 200 in the network
  log and present in `dist/images/drivers/`.
- ⛔ **BUG 2: both were bare `<img>` tags**, which CLAUDE.md forbids outright.
  Both now go through `<Img>`, whose required width/height reserve the box
  before load — these are 600–700KB PNGs, so without that they shift the layout
  under the reader on a slow connection. `alt="dsc"` is also not alt text; both
  now describe what is pictured.
- **`components/ui/ProductShot.jsx` (new)** is the frame. It is not decoration
  for its own sake — both assets are transparent PNGs of dark hardware, and on
  a light section they float with no ground while their own drop shadow reads
  as dirt on the page. So: a dark plinth, ONE ember key light behind the
  object, a blurred ground ellipse under it, the site's arc rings at panel
  weight, and a mono caption rule.
  - **The surface is `.panel-dark`, reused, not re-specified.** It already
    encodes the directional wash, hairline border and §6.4 inset light-catch,
    and it is deliberately the class with NO hover state — correct for a
    product still, where a lift or ring would signal an interaction that does
    not exist.
  - Every colour is a `color-mix` over a token; no raw rgba anywhere.
- ⚠️ **`ratio` is passed the file's REAL pixel dimensions, and that is
  load-bearing, not just CLS hygiene.** `<Img>`'s inner `<img>` is
  `h-full w-full object-cover`; cover only equals contain — i.e. only leaves a
  transparent product uncropped — when the box's aspect ratio is the file's
  own. A "nicer" design ratio silently crops the product.
- **Per-instance tuning is via `className`, and works because `cn()` is
  `twMerge`, so a caller's padding genuinely overrides the component's.** The
  hub's token is wide and flat (1143×370) and was swimming in a panel twice its
  height at the default padding; the homepage illustration (1050×711) uses the
  default.
- Verified in a real Chrome: both images load 200 and paint inside the plinth
  at 1440 and at 375 (panel 327px, image 285px, no horizontal overflow), zero
  console errors, lint/build/prerender clean.
- **Unrelated note for whoever reads this next:** the route count moved 63 → 68
  mid-session because `nav.js` was edited outside this work (five new routes).
  Nothing here touched it; if a build diff shows 68, that is why.
- ⚠️ **Worth a human check, not something I can settle:** IMAGE-PLAN.md §2 bars
  AI-generated people, offices and certificates. `home/dsc.png` is a 3D render
  of a generic "DIGITAL SIGNATURE" document — no name, no PAN, no issuer marks,
  so it is the same generic-document reasoning `DscShowcase.jsx` already relies
  on, but confirm its provenance and licence before launch. The token photo is
  a real product shot and raises no §2 question.

## DSC module: premium pass + per-group backgrounds — 20-08-2026
NOT a phase. Clinton: "optimise the DSC module and its pages and components,
make the design clean and premium, right now it looks plain… add background
texture shape… make the hero section premium… I want a different background
design for each group, one design for the digital signature group, one for
tokens and resources, and so on." All 14 `/dsc` routes plus the shared
primitives they use.

### ⛔ The biggest cause of "it looks plain" was a real bug, not a styling gap
**`text-h1` was being SILENTLY DELETED, and the `<h1>` of every T2/T3/T4/T5
page — 60-odd routes — was rendering at 16px / weight 400.** Found by measuring
computed font sizes over CDP, not by reading source; the class was simply
absent from `className` at runtime.
- **Cause:** `tailwind-merge` has no access to the `@theme` block, so it
  classifies a `text-*` utility by guessing from the value. A known t-shirt
  size or number is a font size; **anything else falls through to text
  COLOUR.** Every font-size token here is a semantic name, so `text-h1` landed
  in the colour group, conflicted with `text-canvas`, and lost. Reproduced
  directly: `twMerge("text-h1 text-canvas") === "text-canvas"`.
- It only bit where a size and a colour went through `cn()` **together**. The
  homepage was fine because its `<h1>` does not use `cn()`.
- **Fix:** `src/lib/cn.js` now uses `extendTailwindMerge` and declares the
  scale (`display-xl … stat`) into the real `font-size` group.
- **Measured before/after across 13 routes: 207 headings unchanged, 25 fixed** —
  12 `<h1>`s 16px/400 → 52px/700, and 13 StepFlow step titles 16px/400 →
  18px/500. Homepage untouched at 88px/900. Verified `text-h1` is present in
  the prerendered `dist/**/index.html`, so the heading is right before
  hydration too.
- ⚠️ **THE LIST IN `cn.js` MUST TRACK `theme.css`'s `--text-*` tokens.** Adding
  a size token there without adding it here reintroduces this exact bug and
  nothing errors — the text is just the wrong size. Recorded in DESIGN.md §5.2.

### Per-group backgrounds — `components/ui/SurfaceTexture.jsx` (new)
Four motifs — **see the REVISION block below for their final shape**, which is
materially quieter and less literal than the first pass:
`certificate` (guilloché — concentric crescents + a radial tick ring),
`blueprint` (ledger grid + orthogonal hairlines terminating on the crescent),
`signature` (one flowing stroke + one echo), `seal` (the hub hero: one wide
band, two fine crescents, a tick rosette, a low-left ledger grid).
Full rationale and the §3.1 / §16 reckoning are in **DESIGN.md §7.4b**.
- **Colour is set ONCE on the wrapper and inherited via `currentColor`,
  including the CSS grid** (`color-mix(… currentColor …)`). `tone: light` →
  ink-400 on canvas, `tone: dark` → ember-400 on ink. **Tone is DERIVED** —
  `Section` from its own surface, `PageHero` always `dark` — never passed by
  hand, because an ink texture on an ink surface is invisible and looks exactly
  like the prop being ignored. (First pass hardcoded `text-ink-400` per variant
  and the eSign product hero's strokes were unreadable.) Light tone is now
  `ink-300`, not `ink-400` — see the REVISION block.
- ⛔ **`z-index: -1`, NOT `0`, and this is load-bearing.** A positioned
  `z-index: 0` overlay paints at step 6 of the painting order and in-flow TEXT
  paints at step 5 — i.e. it sits ON TOP of the copy. That is why every
  `.arc-rings` call site has to remember `relative` on its content wrapper. At
  `-1` the layer paints above the section background and below everything else
  with nothing to remember; `Section`/`PageHero` add `isolate` so it stays
  contained. Section `overflow` still must stay `visible` (StepFlow/HowWeWork
  position labels outside their box), so the texture clips itself.
- ⚠️ **`id` must be unique per mounted instance** — `url(#id)` resolves
  document-wide. Verified: 0 duplicate gradient ids introduced. The one dupe
  the scan reports (`cta-arc-fade`, on every page carrying `CtaBand`) is the
  PRE-EXISTING defect CLAUDE.md already records for that file.
- ⚠️ **The signature variant's first version was badly wrong and the lesson
  generalises:** `inset-0 h-full w-full` with `preserveAspectRatio="slice"`
  scales a 620-unit viewBox to the section's full height, so a 2.25-unit stroke
  rendered ~7px and the "texture" read as a chart line drawn across the
  headline. **Give every variant a fixed pixel box** or the stroke weights mean
  nothing.

### `content/dsc/groups.js` (new) — the group model
`DscHub.jsx` held three private maps keyed by menu label, and **nothing outside
that file knew groups existed**, so a product page shared no visual language
with the group it was reached through. Now one module owns group presentation
(eyebrow / heading / lede / texture) AND `dscGroupForSlug(slug)`.
- **Membership is DERIVED from `dscPanelColumns`** (nav.js) — the same export
  the mega panel renders from. Moving an item between menu columns moves its
  background with it and there is nothing in any template to update.
- Driver detail pages are the one indirection: they are children of the drivers
  hub, not panel items, so they inherit their parent's group. Without that they
  would be the only DSC pages with no treatment.
- A group with no matching texture variant renders untextured rather than
  crashing, so a fourth menu column is safe.
- Verified derivation: certificates→certificate, tokens→circuit (incl. all four
  driver pages, documents-required, validity-renewal-faqs), esign→signature.

### What each template got
- **`PageHero`** gained `texture` / `textureId` / `aside` / `spec`, **all
  optional and additive** — pass none and the output is byte-identical, which
  is what the ~40 non-DSC routes rely on (verified: 0 textures on `/services`,
  `/about`, T2/T3 routes). A textured hero also picks up `.surface-ambient`,
  i.e. §7.2 compliance; **the other ~40 heroes are still flat and can take the
  same prop one at a time** — deliberately not switched on sitewide inside a
  DSC-scoped change.
- **`/dsc` hub hero is 7/5** with a `.panel-dark` aside listing the portals a
  certificate is accepted on, and a 4-up hairline spec row. **Every spec value
  is derived or already-asserted content** — `dscProducts.length`,
  `dscDriversHub.children.length`, "On request" (the `fees: null` discipline),
  and "eMudhra · SignX" which hub content already states three times. No client
  count, no years, no turnaround: a row like this is the easiest place on the
  site for one to slip in.
- `hub-content.js` gained `heroHighlights` — **not new content**, the same
  portals already named in `intro[0]`, as a list, kept in that file adjacent to
  the paragraph they came from so the two cannot drift.
- **Group sections** get their motif, plus a mono group index and a hairline
  rule in the header (`GroupHeading`), which is what makes three near-identical
  headers read as a sequence.
- **T4 / T5** carry their group's motif in the HERO ONLY (revised — the first
  pass also painted it on the first light section). T4's eyebrow is now the
  group's, fixing two wrong labels: `aadhaar-esign` and `buy-tokens` both said
  "Digital Signature Certificates".
- **T5 discipline held:** no `Reveal`/`Stagger` added anywhere in
  `UtilityPage.jsx`. A texture is one inert SVG plus a CSS gradient — no image
  request, no JS, no layout work — so it does not touch that file's LCP brief.
- **`.card-premium`** (theme.css) is the light-card counterpart to `.card-dark`
  — see DESIGN.md §7.4c and the REVISION block: it is now surface quality only,
  with no top rule and no pseudo-elements at all.
- Hub hero eyebrow was the **same string as the H1 directly beneath it**; now
  "DSC & eSign".

### Deduplication done in passing
- **`src/lib/arc.js` (new)** — the crescent had three definitions. `ArcRings`
  and the textures now share one; verified byte-identical at r=140. `CtaBand`
  still has the last local copy (out of scope, recorded in DESIGN.md §3.1).
- **`src/lib/whatsapp.js` (new)** — the DSC module alone had three copies of the
  deep-link formatter, each with its own inline message. `MegaPanel`/`MobileNav`
  still have theirs; left alone rather than half-migrated.

### Verification — and two audit bugs that produced phantom failures
`npm run lint` (0 errors; the single warning is the pre-existing unused `site`
import in `MegaPanel.jsx`), `content:check` (31/31 leaves, only the three
standing unconfirmed-content warnings), `build` + prerender (68 routes + 404 +
sitemap, unchanged), link integrity over `dist/` (**3,730 internal refs, 0
broken**), `/dsc` JSON-LD 4/4 blocks valid with exactly one `<h1>`.

Then a real Chrome over CDP against `npx serve dist` (never `vite preview`, and
never the in-app preview pane — `visibilityState: "hidden"` there suspends
`IntersectionObserver`, so every `Reveal` looks stuck). Confirmed
`visibilityState: "visible"` and a hardware renderer (`ANGLE Metal Renderer:
Apple M1`) before drawing any conclusion.
- **Contrast, pixel-sampled** (hide text via `color: transparent`, screenshot,
  decode in-page on a canvas, sample p95/p05 luminance under each box): **0
  failures** across 13 folds, re-run after the revision. It found ONE real failure, which was mine — the
  hero spec labels at `ink-400` 11px on the ambient radial measured **2.86:1**
  against the 4.5:1 floor; now `ink-300` at 5.8:1. Same failure class Phase 10
  recorded, and invisible to a static resolver because the surface is a
  gradient.
- **Ember coverage** by hue census: **0.70–1.81% per fold** after the revision
  (ceiling ~12%).
- ⚠️ **AUDIT BUG 1 — `html { scroll-behavior: smooth }` silently invalidates
  the whole run.** A bare `window.scrollTo` has not finished when the next
  command runs, so `getBoundingClientRect()` is taken at one position and the
  screenshot at another. That reported a 40px ink-600 heading on canvas at
  1.08:1. **Force `scrollBehavior = 'auto'` and assert `window.scrollY`
  landed.** A sanity check comparing a decoded pixel against the section's own
  `getComputedStyle().backgroundColor` did NOT catch it, because both sides of
  that check were computed post-scroll in the same call.
- ⚠️ **AUDIT BUG 2 — read the FOREGROUND colour BEFORE injecting the
  `color: transparent` probe.** Read it after and every colour comes back
  `rgba(0,0,0,0)`, luminance 0, and every ratio is fiction.
- Two remaining reported failures were correctly excluded, not waved away: text
  scrolled UNDER the fixed header samples its `rgba(7,12,28,.72)` glass (the
  trap Phase 10 documented — require `rect.top >= 130`), and StepFlow's step
  numbers are inside an `aria-hidden="true"` subtree resting at 0.3 opacity by
  design, which WCAG contrast does not apply to and which this pass never
  touched.
- **375px, 15 routes: `documentElement.scrollWidth === 375` on every one** — no
  horizontal overflow. Decorative SVGs do bleed past `innerWidth`; they are
  inside `.surface-texture`'s `overflow: hidden` frame, which is what the
  scrollWidth result proves.
- **Reduced motion** via `Emulation.setEmulatedMedia`: 0 running animations, 0
  elements stuck mid-opacity, card-rule transition collapsed to 1e-05s.
  Textures still render, correctly — they are static line work, not motion.
- **Regression:** T2 leaf, T3 hub, `/services`, `/about`, `/` all render with 0
  textures and their original single-arc hero, and the homepage `<h1>` is
  unchanged.
- ⚠️ **Pre-existing and NOT from this change: React error #418 (hydration) logs
  on every route including `/about` and `/`, which this pass never touched.**
  Already recorded as sitewide and unexplained (Phase 9's `vite preview`
  explanation does not cover it — this reproduces under `npx serve dist`).
  Deliberately not chased here.
- All CDP/audit scripts lived in the session scratchpad and are gone; nothing
  was added under `scripts/`. **Kill the background `npx serve` when done** — an
  orphaned child holds `dist/` and the next `vite build` fails with `EPERM`,
  which reads like a permissions problem and is not.

### REVISION, same session — Clinton's second round of notes
"here design is repeated to hero section and next page. and design also look
prominent and look cheap. take the design idea from home page design. fixed the
design of card of light also do not use thick top border at all. and make the
card look premium."

All three criticisms were fair. The fixes are structural rather than tweaks, and
the reasoning is worth keeping because the first pass failed in a way that is
easy to repeat.

1. **REPETITION — a motif now appears ONCE per page.** The first pass painted a
   group's motif in the hero *and* on that page's first light section, which is
   the same picture twice in one scroll. T4/T5 pages now carry it in the hero
   only; the `/dsc` hub's three group sections each carry a *different* one,
   which is a sequence, not a repeat. Verified per route: every T4/T5 page has
   exactly **1** `.surface-texture`, in the hero; the hub has 4 (hero + 3
   groups); non-DSC routes have 0.

2. **PROMINENT / CHEAP — every figurative element is gone.** The first pass drew
   a rounded-rect USB-token silhouette, circuit trace pads and a dashed signing
   rule. That is *illustration*, not texture, and at 2–4× the homepage's weight.
   `circuit` was replaced by **`blueprint`** — the ledger grid plus orthogonal
   hairlines that terminate **on** the crescent (the endpoints are real points
   on r=150, computed, so a line stops exactly where the curve is rather than
   near it): a technical drawing measuring the brand shape. `signature` lost its
   third stroke and its dashed baseline. `certificate` lost its bottom-left
   echo. Opacities now sit at or below CtaBand's own 0.045–0.12 ladder; light
   tone dropped `ink-400` → `ink-300`.

3. **HOME-PAGE IDIOM was the right reference and I had not actually applied
   it.** The homepage's light sections — `WhoWeWorkWith`, `WhyThinkOrange` —
   carry **no background art at all**: they get their depth from hairlines, the
   type scale, big quiet mono numerals and whitespace, with exactly ONE ember
   element per block. That is why the DSC cards read as cheap: each one had
   THREE small ember accents (top rule, mono index, "Read more") on a plain
   white box.
   - The 2px growing top rule is **removed outright**. `.card-premium` is now
     surface quality only — one directional canvas wash, no pseudo-elements.
     Verified: `::after` computes `content: none`.
     ⚠️ **Do not reintroduce a coloured bar on this card.**
   - The mono index is `ink-300`, not ember. A hairline above the action row
     supplies the structure the colour was doing.
   - The action row is `mt-auto` inside a `flex-col` Card, so it lands on the
     card's floor in every card regardless of teaser length — rows landing at
     different heights across a grid is the detail that makes a set look
     untended.
   - Hover is unchanged and untouched: `shadow-sm` → `shadow-md`, border →
     `ember-200`, corner crescent fade-in, -4px lift. A fifth signal was the
     bar's real problem.

Re-verified after the revision: **0 contrast failures**, ember coverage
**0.70–1.81%**, `scrollWidth === 375` on 15 routes, reduced motion 0 running
animations, lint/`content:check`/build+prerender clean at 68 routes.

### SECOND REVISION — icons, images, and a real dark band (20-08-2026)
Clinton: "improve the design of section of dsc page, include icon, images make
it clean and look premium still most of section is look too plain."

The diagnosis was that after the restraint pass the sections were *clean* but
carried nothing but type. Four changes, all taking the homepage as the
reference rather than inventing a new language:

- **`src/content/dsc/icons.js` (new) — one icon per DSC page.** This map used to
  live privately inside `home/sections/DscBand.jsx`, which is why the hub had no
  icons at all: adding them would have forked the pairing. Now shared, extended
  to cover the T5 pages the homepage map never had, and resolved through
  **`dscIcon(slug)` with a fallback** — `DscBand` iterates every product in
  nav.js and renders `<Icon />`, so an unmapped slug evaluated to
  `<undefined />`, a HARD React crash. That was a real bug caught before
  shipping once already (17-08-2026); the helper makes the class of bug
  impossible. ⛔ **Never index that object directly.**
  ⚠️ It is a **component-side module under `src/content/`** (it imports lucide),
  same caveat as `content/insights/images.js` — never import it from `nav.js`,
  `seo.js`, or anything the Node scripts load.
- **Group cards are now icon-led,** in a circle — **filled (`bg-ember-50`, no
  border) on the light cards, ringed on the dark ones** (Clinton, same session:
  "in icon of light card do not use border use bg only"). A ring plus a tint on
  a white card is two treatments doing one job, and the ring read as an outline
  around a shape rather than as the shape. The dark cards keep their ring
  because no ink-surface tint is pale enough to register as a disc without
  lifting the card's warmth — which is why the homepage DSC band rings its own.
  Verified: all 9 light discs at `border-width: 0` with `rgb(255,243,232)`
  fill; both dark discs unchanged at a 1px ember ring on a transparent
  background. The per-card mono index is GONE —
  `GroupHeading` already numbers the groups, so numbering items inside them was
  structure for its own sake. §16 tell 6 is unaffected: its detector correctly
  excludes glyphs inside `a, button, label, [role=button]`, and a circle that IS
  the click target is an affordance, not the decorative motif the tell is about.
- **The eSign group is now a DARK band with the signed-document render.** The
  page ran `deep → light → light-alt → light → light-alt → light → light-alt →
  ember`: six light surfaces in a row with only a tonal shift between them,
  which is the real reason it read as plain. The homepage never does that
  (DESIGN.md §11.1 puts a genuinely dark band between light ones). Now measured
  off the live DOM: **`deep > light > light-alt > dark > light-alt > light >
  light-alt > ember`**, zero consecutive repeats.
  - ⚠️ **`DARK_GROUP_KEY` is position-independent on purpose.** `dark` differs
    from BOTH `light` and `light-alt`, so the override cannot create two
    consecutive identical surfaces at ANY index — which keeps
    `GROUP_DISPLAY_ORDER` free to move and a future menu column safe.
  - Cards there use `.card-dark` on the Link ITSELF, as `DscBand` does — that
    class's hover ring, lift and arc-draw are written for the hovered element,
    and `:is(a, button):active` only fires when the card really is the target. A
    hand-rolled `.card-dark` must also pass its own `.card-arc` child, which
    `<Card surface="dark">` supplies for itself. Verified rest → hover: ring
    0→1, arc 0→1, lift −4px.
- **At most ONE image per group, and only where the card count leaves room.**
  `GROUP_ASIDE` is data-driven, and only eSign (2 cards) has an entry. An image
  squeezed beside a five-card grid reads as "an image was added", not as a
  layout that wanted one, so Certificates and Tokens get icons and no picture.
  Rendered with plain `<Img>` and no plinth — `ProductShot`'s dark panel exists
  for a transparent PNG on a LIGHT section (the token, in the intro); on ink it
  would be a box around a box.
- **Why-ThinkOrange row** was three plain paragraphs in a divided row — the
  flattest thing a light section can be. Now the homepage's own archetype for
  this exact content: a big mono ember numeral beside the copy
  (`WhyThinkOrange`, DESIGN.md §11.4). **No headings were invented** above those
  sentences; each `whyUs` entry is already one reviewed claim, and a three-word
  label derived from its own opening would say the same thing twice.
- **T4 got the same treatment on its three plainest sections:** validity pills →
  icon-led option cards with the token note in a `.panel-dark` beside them
  (not under them); the documents list → a two-column checklist on one card,
  still an `<ol>`, plus an `Info` glyph on the verification callout; and Pricing
  gained a three-up row naming what a quote depends on. **`PRICING_FACTORS`
  contains no amounts, ranges or "from" prices** — `fees` is null on every DSC
  product and stays that way; naming the variables the paragraph already names
  is honest, implying a number is not.

### Two real defects this revision introduced, both found by measurement
1. **`GroupHeading` hardcoded light-surface colours.** The eyebrow and h2 are
   handled for free (`var(--surface-accent)`, `[data-surface="dark"] h2`) but
   the mono index, the hairline rule and the **lede** are plain utilities, so
   the dark eSign band got an `ink-500` lede on `ink-900` — measured ~1.5:1,
   all but unreadable — and an `ink-100` rule that read as a bright white line.
   Now takes a `dark` prop. **Any component dropped onto both surface families
   needs this check; the surface system covers headings and accents, not
   arbitrary utilities.**
2. **The documents-checklist ordinals at `ink-300` on white measured
   3.40–3.49:1** against the 4.5:1 floor. They are visible ordinals, not
   decoration, so they carry the floor — now `ink-400` at 7.2:1.

### ⚠️ HARNESS BUG that produced 18 phantom contrast failures — read this
`cdp.mjs` used a FIXED debug port (9333) and a fixed `--user-data-dir`. With a
leftover Chrome from a previous script still listening, `launch()` spawns a
process that immediately exits and then happily attaches to the **old browser**,
inheriting its viewport, its emulated media and whatever page it was left on.
The run reported 18 failures that were really a 375px browser sitting on the
homepage — including impossible ones (a homepage Compliance-Calendar section
reported on a DSC product route, which is what gave it away).
**Fixes, both now in the harness: randomise the port and profile per run, and
ASSERT `innerWidth`/`visibilityState`/`location.pathname` before measuring
anything.** With the assertion in place the same run reported 6 failures, all
real, all fixed above. Also: `pkill -9 -f "Google Chrome --headless"` between
sessions — an orphan does not die with the script.

### Re-verified after this revision
Surface cadence off the live DOM (zero consecutive repeats), **0 contrast
failures** across 20 folds with the widened selector set, ember coverage
**0–3.46% per fold** (ceiling ~12%), `scrollWidth === 375` on 15 routes,
reduced motion 0 running animations and 0 elements stuck mid-opacity, dark-card
hover states, link integrity **3,731 internal refs / 0 broken**, `npm run lint`
(0 errors), `content:check` clean, `build` + prerender 68 routes.

### MOTION PASS — motion/react on the DSC pages (20-08-2026)
Clinton: "use frammer motion and available screen and animation and
transition." Built with the repo's existing primitives and `motion/react`
(the renamed framer-motion already in `package.json`), not a new library.

- **Scroll-linked parallax on every texture layer** (`SurfaceTexture`). The
  motif travels ±28px over the whole time its section is on screen, so the
  background reads as sitting further away than the copy. Transform only, so it
  composites. Same construction `StepFlow` already uses on these prerendered
  pages: `useScroll({ target, offset: ["start end", "end start"] })`, no
  listener of our own. Measured across 6 scroll depths per layer: all four
  layers step through real intermediate values (+28 → −28), so it tracks live
  scroll rather than animating to completion on entry.
- ⛔ **THE PARALLAX STARTS AT ZERO AND IS ONLY DRIVEN AFTER MOUNT, and that is
  a hydration fix, not a style choice.** Deriving the offset straight off
  `scrollYProgress` with `useTransform` makes the FIRST render emit
  `transform: translateY(28px)` — and `useReducedMotion()` is **false on the
  server** (there is no matchMedia), so a reduced-motion client renders `none`
  against a server that said 28px: a mismatch on every textured section.
  Fixed with `useMotionValue(0)` plus a `scrollYProgress.on("change", …)`
  subscription in an effect, primed once post-hydration. **Verified in the
  built output: all 4 texture wrappers in `dist/dsc/index.html` ship
  `style="transform:none"`,** which is what the server, a normal client and a
  reduced-motion client all render on first paint.
- **The group heading's hairline rule now DRAWS** from the mono index outward
  as its section arrives — the same "a line draws on scroll" device
  `HowWeWork`'s connector and `StepFlow`'s progress line already use, which is
  why it reads as part of the system rather than a new effect. `scaleX` on a 1px
  element (composited; animating `width` would relayout the row every frame).
  `GroupHeading` takes `Reveal`'s **render-prop form** so the rule hangs off the
  ONE IntersectionObserver the container already needs instead of installing a
  second. Measured: scaleX steps 0 → 0.113 → 0.309 → 0.471 → … → 0.987 → 1,
  10 intermediate values — a real draw, not a snap.
  - Under reduced motion the rule renders **drawn** (`initial={false}`), not
    absent: it is structure, and a missing divider looks like a bug.
- **`PageHero` animates ONLY its optional parts** — the `aside` panel
  (`delay 0.12`) and the `spec` row (`delay 0.24`). The breadcrumb, h1 and lede
  are deliberately untouched: they are above the fold on all ~40 routes this
  hero serves, animating them would delay the LCP text, and it would spend the
  T1 hero's entrance cascade a second time (§16). Measured on the spec row:
  opacity 0 → 0.88 → 0.97 → 1.
  - **`margin="0px"` on the spec row is a bug fix, not tuning.** It is the
    hero's own trailing content and can legitimately be ON SCREEN at mount,
    where `Reveal`'s default −12% root shrink never grants the 18% overlap
    `amount` needs — the documented dead zone that left the homepage stat row
    invisible until a scroll. Verified at the exact failing heights
    (780/800/810/815/818/820/822/900/1200 × 1440): on screen, opacity 1,
    scrollY 0, every time.
  - **No `Counter`/`Scramble` here on purpose.** Those are the T1 hero's
    signature, and two of the four spec values are not numbers anyway.
- **T4:** each section's eyebrow+h2 pair reveals; validity option cards
  `Stagger`; the token panel reveals beside them at `delay 0.12`.
  ⛔ **The documents checklist is deliberately NOT animated** — CLAUDE.md is
  explicit that body copy and tables never animate, and it is the one section a
  reader lands on to copy a list down. Verified: 4 items, none carrying a
  transform or sub-1 opacity.
- **Press feedback for light DSC cards** (`a:active > .card-premium`), filling a
  real gap: every other affordance on those cards (lift, shadow, border swap,
  corner crescent) lives behind `hover:`, which Tailwind v4 wraps in
  `@media (hover: hover)` — so **a touch user got nothing back from a tap.**
  `:active` is a genuine press on touch so it is deliberately NOT hover-gated,
  exactly as `.card-dark:is(a, button):active` already is. Selected through the
  parent `a` because the card is a div INSIDE the link.

### Verification notes from this pass
- **The production build was broken mid-session by another session's
  in-flight work**, not by this one: `home/sections/Hero.jsx` imported
  `HeroShowcaseFloaters` from the new `components/hero/HeroFloaters.jsx`, which
  only exported `HeroFloaters`. I verified the motion work against the DEV
  server in the meantime (valid for motion/layout/contrast, NOT for hydration —
  nothing is prerendered there) and left their files alone. It was fixed
  upstream before this pass ended and the full production suite then ran clean.
- ⚠️ **Counting hydration exceptions needs a settle BEFORE clearing the
  buffer.** A first attempt reported 2 on `/dsc` and 1 everywhere else, which
  looked exactly like a new mismatch on the one page this pass changed most. It
  was a leak: an exception from the PREVIOUS navigation landing after
  `ex.length = 0`. With a settle before the clear and three trials per route,
  every route reports **exactly 1** — including `/about` and `/`, which this
  pass never touched. That one is the long-standing sitewide #418
  (`args[]=HTML`, i.e. a mismatch at the `<html>` level, outside any of these
  components). **No new hydration mismatch was introduced.**
- Re-verified on the production build: **0 contrast failures**, ember coverage
  unchanged, `scrollWidth === 375` on 15 routes, reduced motion 0 running
  animations / 0 stuck mid-opacity / texture transform `none` uniformly / rule
  drawn, link integrity 3,731 refs / 0 broken, lint 0 problems,
  `content:check` clean, build + prerender 68 routes.

### HERO TEXT CASCADE + REVEALS ON EVERY SECTION (20-08-2026)
Clinton: "in the hero section add animation showing text and all added
reveling animation of all the section." This reverses the restraint decision
recorded in the motion pass above — that pass deliberately left the hero's
breadcrumb/h1/lede static and only animated the optional aside and spec row.
Asked for explicitly, so it is built.

- **`PageHero` now cascades its whole text block**: breadcrumb 0 → eyebrow
  0.06 → h1 0.12 → lede 0.20 → cta/children 0.28 → aside 0.36 → spec 0.44.
- **`margin="0px"` on EVERY one of them, not just the spec row.** `Reveal`'s
  default -12% bottom root-shrink exists so a below-the-fold section does not
  fire the instant a sliver peeks in; hero content is above the fold at mount,
  where that margin is a liability — it is the documented dead zone that left
  the homepage stat row at opacity 0 until a scroll.
- **Sections revealed on the hub**: the intro prose and its ProductShot, the
  "pricing on request" note, the why-us eyebrow, and the Partner Programme
  panel. `FaqSection` already reveals both of its columns — NOT double-wrapped.
- **Sections revealed on T4**: every eyebrow+h2 pair, the documents card, the
  verification callout, the pricing lede and button, and the driver-support
  lede. `StepFlow` is already scroll-linked.
- **The documents CHECKLIST reveals as one block; its list items do NOT
  stagger.** That is the distinction CLAUDE.md's "body copy never animates"
  rule is actually protecting — a one-shot fade-up of a container before you
  reach it is fine, a dozen lines resolving one by one while you are trying to
  read them is not.

⛔ **THE H1 RISES BUT NEVER FADES, and this is the important detail of the whole
pass.** The first cut faded it like everything else, which puts `opacity: 0` on
the H1 wrapper in the prerendered HTML of **~40 routes** — gating the page's
largest paint behind hydration. CONTENT-PLAN.md §9 sets LCP < 1.2s on mobile
throttling for the T5 driver pages, where the H1 IS the LCP element, so that is
a knowingly bad trade.

`Reveal` gained an additive **`fade={false}`** prop (rise only, opacity
untouched; all 20+ existing call sites unaffected) and `PageHero`'s H1 uses it.
Verified in the built output on 4 routes: the H1 wrapper now ships
`style="transform:translateY(16px)"` with **no opacity**, so the text paints
straight from static HTML and still animates into place. Everything else in the
cascade fades normally — none of it is an LCP candidate. Confirmed live: the
H1's opacity reads 1 on the very first sample after navigation while its
translateY steps 16 → 14.1 → 7.3 → 4.3 → 1.9 → 0.

⚠️ **The LCP A/B I ran to justify this was INCONCLUSIVE, and the reason matters
for anyone re-running it.** Applied DevTools throttling (1.6Mbit/150ms + 4× CPU)
over plain HTTP/1.1 with no compression gave a ±800–1000ms spread on 3 runs, and
on `/dsc/drivers/hyp2003/` the animation-disabled arm measured *slower* than the
animated one (3004ms vs 2412ms) — causally impossible, i.e. pure noise. Its
absolute numbers are also not comparable to Phase 10's 1088–1208ms, which came
from Lighthouse's SIMULATED throttling over HTTP/2 + brotli. **To measure LCP in
this repo, rebuild Phase 10's harness (`_serve-h2.mjs` + Lighthouse
median-of-3); do not use applied throttling over `npx serve`.** Also:
`performance.getEntriesByType('largest-contentful-paint')` returned an EMPTY
array on every run — use a `PerformanceObserver` installed through
`Page.addScriptToEvaluateOnNewDocument`. The fix above removes the risk
structurally, so the measurement was not needed in the end.

### ⚠️ SECOND HARNESS BUG — `primeReveals` never fired the reveals it existed for
The helper walked the page in ONE synchronous in-page loop
(`while (y < h) { window.scrollTo(0, y); y += step }`) and then scrolled back to
0. **IntersectionObserver delivers asynchronously, so the observer only ever saw
the FINAL position** — every reveal below the fold stayed at opacity 0. It
reported "27 of 34 wrappers still hidden after a full scroll", which reads
exactly like broken reveals.

Fixed by awaiting each step from Node (one round-trip per 500px, 90ms settle).
Re-measured: `/dsc/` goes 27 hidden at load → **0 still hidden**. On T4 pages 3
remain, and they are correct — StepFlow's node circles rest at 0.3 opacity by
design (`aria-hidden`) until the scroll-linked line reaches them.

Consequence worth knowing: **every earlier audit in this session that called
`primeReveals` under-primed the page.** The contrast results still stand,
because that pass scrolls to each fold and waits before sampling, which fires
the observers naturally — and it was re-run after the fix with the same result
(0 failures).

### T4 "Validity & token" + "Documents required" rebuilt — 20-08-2026
Clinton: "for token and validity it look so empty… make the design look
premium." Both sections were sparse for the same structural reason, and the fix
was to build for the data rather than spread it:

- **These sections have almost no data.** Validity is 2–3 short strings plus one
  token sentence; documents are 2–5 short strings. Laid out across an 1800px
  container inside a full `section-pad` band, that can only ever look empty —
  three ~180px icon cards and a panel occupying the top 220px of a 700px
  section, with a lake of canvas underneath.
- **Validity & token is now ONE full-width spec panel**, a real `<dl>` with
  three hairline-separated rows: **Certificate** (`product.label`), **Validity**
  (`product.validityOptions`, hairline-divided mono values), **Token**
  (`product.tokenNote`). Nothing invented — `product.label` simply was not being
  shown in this section before, and it is the most useful of the three. Three
  rows in one object read as considered where four small boxes read as an
  unfinished grid. `SPEC_ROWS` + `specValue()` are declared at module level so
  a product missing a field DROPS that row instead of rendering an empty one.
  - Values are hairline-divided, **not pills**: a pill beside body copy reads as
    a button, and these panels sit near real CTAs.
- **Documents required is now a 7/5 pair**: the checklist as ONE column of
  hairline-separated rows (which gets taller rather than sparser as a product
  needs more documents — verified at both 4 and 5 items), and the verification
  note promoted from a footnote underneath to a `.panel-dark` panel beside it
  under a "Before you apply" label. Both columns carry weight, so there is no
  dead half. `self-start` on the note so it does not stretch to match a long
  checklist.
- The checklist container reveals as one block; **its list items still do not
  stagger** — a dozen lines resolving one by one while a reader is copying them
  down is exactly what the "body copy never animates" rule protects against.
- Ordinals stay `ink-400`, not `ink-300`: they are visible ordinals, not
  decoration, so they carry the 4.5:1 floor (ink-300 measured 3.40–3.49:1 on
  this card, ink-400 is 7.2:1).

Verified: **0 contrast failures** across 20 folds including both rebuilt
sections on two products (4-doc and 5-doc, 3-option and 2-option variants);
375px `scrollWidth === 375` with both panels stacking to full width on all
three products checked; reduced motion 0 running animations / 0 stuck
mid-opacity; lint 0 problems; `content:check` clean; build + prerender 68
routes; link integrity 3,731 refs / 0 broken.

### T5 validity page — card grid → matrix table, prose column → 7/5 — 20-08-2026
Clinton: "fixed the design of these section" (the `/dsc/validity-renewal-faqs`
Validity-by-certificate and Renewal sections).

- **"Validity by certificate" is now a MATRIX TABLE** (certificate × validity
  period) instead of five cards in a 2-column grid. The grid was three rows with
  a hole in the last one, each card holding a title and two or three pills, so
  most of it was white space. A table is the right shape because the data IS a
  matrix and the reader's actual question — "which periods can I get for this
  certificate?" — is answered at a glance. It also surfaces what the cards hid:
  **Combo has no 1-year option.**
  - **Columns are DERIVED** from the union of every product's options, ordered
    by leading number (`parseFloat("2 years")` → 2; stable sort keeps insertion
    order for anything unparseable). A product offering a period nobody else
    does adds a column instead of being silently dropped.
  - Matches the two tables already in this file (driver compatibility, eSign
    comparison), including the `overflow-x-auto` + `min-w-[640px]` pair.
    Verified at 375px: the page's `scrollWidth` is 375 while the table's own
    wrapper scrolls (client 325 / scroll 640) — the table scrolls, the page
    does not.
  - Semantics: `th[scope=col]` per period, `th[scope=row]` per certificate
    (5 of them), and each cell pairs an `aria-hidden` glyph with an `sr-only`
    "Available" / "Not available" (15 total) — otherwise a screen reader hears
    an unlabelled tick in a grid of identical cells.
  - Nothing here animates: tables never do (CLAUDE.md), which is also T5's own
    no-motion brief, so this section stays compliant with both.
- **"Renewal, re-issue & revocation" is now 7/5.** The prose was a lone
  `max-w-[68ch]` column leaving the right two thirds empty. The next step —
  previously a trailing sentence after three paragraphs, i.e. the most useful
  line and the easiest to miss — is now a `.panel-dark` panel beside the copy
  with a real Button. `self-start` so it does not stretch to the prose height.

⚠️ **A contrast failure my own pixel audit was designed to skip.** The
"not available" em-dash is `aria-hidden` (correctly — the accessible answer is
the `sr-only` word next to it), and the audit excludes `aria-hidden` subtrees,
so it reported 0 failures. But for a SIGHTED reader that dash is the only signal
a period is unavailable, so it is not incidental text and it carries the 4.5:1
floor: `ink-300` on canvas is **3.35:1**, `ink-400` is 6.48:1. Found by
computing the pair directly rather than trusting the sweep.
**Lesson: `aria-hidden` means "not announced", not "exempt from contrast" — a
glyph that is the sole visual carrier of meaning still needs the ratio.**

### Harness fixes forced by this pass (all three cost real time)
1. **CDP calls had no timeout.** A dead socket left the promise pending forever
   and the script died with "Detected unsettled top-level await" and no useful
   error — indistinguishable from "still running". `send()` now rejects after
   30s naming the method.
2. **`scrollTo` referenced `document` in NODE scope** (`at < document?.body?.
   scrollHeight`), so it threw `ReferenceError: document is not defined` — but
   only on the branch where a scroll clamps, which is why it lay dormant for
   most of the session. Removed; it now just returns where it landed.
3. **`pkill -f "node.*serve"` kills the static server out from under a running
   audit.** An audit then measures `about:blank` and reports nonsense (`env`
   showed `path: "/"`). Always re-check `curl` returns 200 before trusting a
   run, and prefer killing by port.

### Still open — needs a decision from Clinton
**Route-level page transitions were NOT built.** "transition" could have meant
that, and it is materially different work: an `AnimatePresence` exit/enter
around `<Outlet />` in `RootLayout` interacts with Phase 9's prerendering and
with the hydration path, so it is not a change to make silently on a guess.
Everything above is section- and interaction-level motion.

### Left undone, deliberately
- The homepage `DriverDownloads` section was not touched — the request was the
  `/dsc` module, and the homepage had its own polish pass. `DscBand` was touched
  only to consume the shared icon map (no visual change).
- The ~40 non-DSC `PageHero`s are still flat `bg-ink-950` with the single arc.
  `texture`/`spec` are ready for them; that is a separate, sitewide call.
- ✅ **Correction, not a gap:** this file has claimed since the Phase 5
  refinement pass that `Card`'s LIGHT surfaces have an *ungated*
  `hover:-translate-y-1` (i.e. sticky on touch). **They do not.** Tailwind v4
  wraps every `hover:` variant in `@media (hover: hover)` — verified by reading
  the built CSS, where `.hover\:-translate-y-1:hover` sits inside that query.
  Nothing to fix; the earlier note was wrong.

## Hero floaters — Zoho MCP's scatter-and-float, re-expressed — 20-08-2026
NOT a phase. Clinton: analyse the hero of https://www.zoho.com/mcp/ and add a
floating design that suits this site. New `src/components/hero/HeroFloaters.jsx`
(two exports) + `.hero-float-tile` / `hero-float-rise` / `hero-float-sink` in
theme.css, wired into `Hero.jsx` at two points.

- **What the reference actually does, measured in its own DOM rather than
  guessed from the screenshot:** flat black hero, centred H1 + one CTA, and two
  decorative families. Six `.star-icon1–6` spans (14–24px, one shared SVG
  sprite, absolutely positioned around the headline) which are **static** — no
  animation at all — plus two 72px rounded tiles as `::before`/`::after` on the
  content wrapper, each running `3s ease-in-out infinite` with counter-phased
  `floatDown`/`floatUp` keyframes. That is the whole effect: a static scatter
  and one counter-phased pair.
- **What was borrowed and what was refused.** Borrowed: the two-family
  structure, the counter-phase, static small marks. Refused: its three
  off-palette accent hues (violet/cyan/orange sparkles — DESIGN.md §16's first
  tell) and its 3s tempo, which nothing on this page shares. Rhythm here is
  **±7px over 7s and 9s**, sitting beside `.hero-card-float`'s 6px/7s so the
  satellites breathe with the composition. The two periods are deliberately
  unequal so the pair never locks into step.
- ⛔ **THE OBVIOUS SHAPE CHOICE WAS WRONG, and §3.1 pushes you straight into
  it.** First pass used the crescent for all five marks — "repeat one specific
  shape" says to. Screenshotted at 1440px, **every one read as a loading
  spinner**: a hairline arc with a gap, centred in a small rounded tile, is that
  silhouette exactly, so the hero looked like a page that had failed to finish
  loading. The crescent is right at 140px as a backdrop and wrong at 18px in a
  chip. Split by role instead: tiles carry ArcGlyph's **`rule` variant** (the
  Eyebrow's double-curve wave — unmistakably this site's mark, nothing like a
  spinner), and the small marks are **hairline registration crosses**, which is
  not a new shape either — §7.4b's certificate/blueprint textures already
  establish `radialTicks` hairlines as the arc's companion detail, and a cross
  is two of them. Do not "fix" these back to crescents.
- **The tiles are anchored to the SHOWCASE IMAGE FRAME, not to the section, and
  that is load-bearing.** The H1 rotates through three headlines of different
  widths, so any absolute position inside the copy column is a collision
  waiting for the longest one. Hanging both tiles off the image frame makes
  clearance a function of the grid instead: at 1440px the copy column ends at
  x 799 and the image starts at 847, so a 48px tile pulled 24px outboard spans
  823–871 and keeps 24px of clearance from the widest possible headline, at
  every headline in the rotation. Both sit on the image's LEFT edge at two
  heights on purpose — the capabilities card already hangs off the
  bottom-right, so left-side satellites balance it.
- **The scatter layer is `z-[-1]`, the tiles are `z-10`.** Marks paint above the
  section background and below in-flow text (the same reasoning
  `SurfaceTexture` records), so a mark can never sit on top of copy even if a
  future edit moves one; tiles match the capabilities card and paint in front
  of the photograph, which is the point. Both rely on the section's existing
  `isolate`.
- ⚠️ **md+ ONLY, and measured rather than lazy.** At 375px the hero is a dense
  vertical stack with no margin to float anything into, and mobile ember
  coverage is already 6.5% against the ~12% ceiling (desktop ~4%) — adding
  ember marks to the viewport with the least space AND the least colour
  headroom is the wrong trade. It also keeps two more animating transforms off
  the mobile compositor. Verified hidden (zero-size rects) below md.
- **No `will-change`,** deliberately: Phase 4 measured that an actively
  animating transform is composited regardless, so the hint would only add
  bookkeeping to a hero that already exceeds §9.5's layer budget for reasons
  documented there. **No `backdrop-filter`** either — §7.5 keeps blur exclusive
  to the sticky nav, and the veil reading through these tiles is why they float
  at all. `.hero-float-tile` reuses `.hero-card` / `.scroll-nav`'s
  translucent-ink recipe rather than defining a third dark surface.
- ⛔ **Real bug, found by measuring rects and not by reading the JSX:
  `RegMark` swallowed `style`.** G3 is the one mark positioned with an inline
  `top: calc(var(--header-h) + 18px)` (no Tailwind offset expresses it), and
  without `...props` it fell to its static position at y=0 — behind the fixed
  header, invisible. Same class of bug as `ArcGlyph` dropping `style` before
  Phase 5. Fixed; G3 now measures y=102 with the header ending at 84 and
  content starting at 124.
- **Reduced motion needs no branch.** Only `transform` animates, so §9.6's
  global floor collapses each keyframe set to its 100% frame — translate 0,
  i.e. the resting composition. Verified via
  `Emulation.setEmulatedMedia`: **0 running animations, both tiles parked at
  translateY 0, still full size, all four marks still rendering.**
- **Verification** in a real Chrome over CDP against the dev server (never the
  in-app pane — `visibilityState: "hidden"` there suspends rAF, so the drift
  cannot be observed at all; confirmed `visible` and `ANGLE Metal Renderer:
  Apple M1` before drawing any conclusion):
  - **Drift is real, not a fixed reveal**: 14 samples over 7s show tile A
    stepping `-6.97 → -0.01` and tile B `+6.99 → +0.01` through 14 distinct
    intermediate values each, in counter-phase, at 7s/9s.
  - **Zero intersections with any text box** at 1920/1440/1024/768/500px —
    bounding-box tested against every heading, paragraph, link and stat tile in
    the hero, not eyeballed. So the contrast audit is untouched by this change
    by construction; the added ember is one 14px hairline cross plus one 24×8
    wave stroke, ≈0.008% of the fold by arithmetic.
  - `npm run lint` (0 errors; the single warning is the pre-existing unused
    `site` import in `MegaPanel.jsx`), `content:check` (clean apart from the
    three standing unconfirmed-content warnings), `build` + prerender (68
    routes + 404 + sitemap, unchanged).
- **Left undone deliberately:** the intensity is dialled to "quiet structure" —
  two tiles and four marks against the reference's two tiles and six sparkles.
  A third tile fits in the free region right of the image and above the
  capabilities card (x 1297–1425, y 175–323 at 1440px) if it ever wants to be
  louder. An ember glow on the tiles is NOT available: Phase 10's §16 tell 9
  audited "0 ember box-shadows sitewide" and adding one here breaks that
  property.

## Layout-jump fix: heading + testimonial heights are now RESERVED — 20-08-2026
Clinton, on mobile and tablet (where the hero's 7/5 grid stacks): the sections
below were "jumping up and down" because of the typewriter's height change.
Measured, that turned out to be **three** separate unreserved heights, only one
of which was the typewriter. All three are fixed; **all 13 homepage sections are
now height-stable at 375 / 768 / 1440px over ~1,200 rAF samples each, on the
production build.**

### 1. The H1's box was inferred, not reserved (`Typewriter.jsx` + theme.css)
- This file has claimed since 17-08-2026 that "everything below the H1 is
  pixel-stable" because every glyph stays in flow. **That makes ONE sentence's
  box constant; it does not make the box constant across the rotation.** The
  heading's height was simply the SUM of whatever its line boxes measured, and a
  line containing the serif emphasis word measures taller than an all-sans line
  — **51.4 vs 50.4px at 375px, 73.1 vs 70.1px at 768px**. That the three current
  headlines all totalled the same height was a property of the COPY (all three
  are 2 sans lines + 1 sans+serif line), not of the layout.
- **`.typewriter-line { height: calc(1lh + 0.1em) }`** makes one line's box
  independent of which font renders it. `1lh` is the box the display-xl token
  already produces, so it tracks that token instead of restating it; the +0.1em
  is the descender allowance the hero used to carry as a per-line `pb-[0.1em]`,
  moved into the class so the box has one definition (Hero no longer passes it).
  Verified byte-identical to the old SANS line box (50.4 @375, 70.08 @768) — the
  serif line just stops being 1–3px taller, its descender overflowing visually
  instead of pushing layout. h1: 152.2 → **151.2** @375, 213.2 → **210.2** @768,
  281 → **277.2** @1440, and every line now measures the same.
- **`.typewriter { min-height: calc(var(--typewriter-lines) * (1lh + 0.1em)) }`**,
  with `--typewriter-lines` set from the LONGEST sequence in the rotation (not
  the active one — that would be no reservation at all). Currently redundant
  since all three headlines are 3 lines; it is what makes a future headline of a
  different line count safe.
- ⛔ **`white-space: nowrap` on the line is the other half, and without it the
  reservation is reserved for the wrong number of lines.** Two things could make
  a pre-broken line wrap into two:
  1. **The caret.** It is emitted inline at the write position and is 0.11em
     wide (0.05em + 0.06em margin) — enough to tip a line already filling its
     measure onto a second visual line, and because it MOVES, that wrap appears
     and disappears *as the sentence types*. A whole line box of jump, repeating.
     This is the most likely thing Clinton actually saw.
  2. **The fallback face.** Every `@font-face` here is `font-display: swap` with
     no `size-adjust`, and `.typewriter-char` is `inline-block`, which makes
     every character its own break opportunity — so an overlong line does not
     overflow, it breaks MID-WORD and adds a line, then reflows when Satoshi
     arrives.
  With `nowrap`, an over-wide line bleeds a few pixels into the gutter instead;
  `<main>`'s `overflow-x: clip` contains it and no scrollbar appears. Verified
  `scrollWidth === innerWidth` and exactly 3 equal-height lines at
  **320/360/375/390/414/430/480/540/640/768/900/1024/1280/1440**. (At 320px the
  widest line is 3px over the measure and is contained — 320 is below any
  supported target.)
- The `<h1>` still holds exactly ONE sentence in the prerendered HTML with no
  other variant present, so Phase 10's single-clean-h1 property is intact.
  Caret re-verified after the line-box change: constant gap (2.9px @375, 5.3px
  @1440), **0 misplaced in 1,257 samples**, write stepping through all 32
  distinct counts.

### 2. The testimonial carousel had no reserved height at all — the biggest jump
- Found by sampling every `main section`'s height over 20s: of the homepage's 13
  sections, **`Testimonial` was the only one whose height was not constant**, and
  it moved by up to **~107px every 3 seconds** (sampled at 375px it walked
  788 → 895px). Insights, the CTA band and the footer all shifted with it. This
  is almost certainly the "remaining section is jumping up and down" — and it is
  nothing to do with the typewriter.
- Cause: quotes are different lengths, `AnimatePresence mode="wait"` mounted only
  the active one, and `min-h-[9rem]` (144px) was far short of what any of them
  occupy.
- Fix: **every quote is mounted, stacked in one grid cell**
  (`col-start-1 row-start-1`), so the container is exactly as tall as the longest
  — nothing measured, no magic number to drift from the copy, and **the
  prerendered HTML already has the right height, so there is no shift at
  hydration either**, which a measure-on-mount approach could not give.
  `AnimatePresence` is gone; with both items mounted the crossfade is two
  simultaneous opacity transitions, which also beats mode="wait"'s
  fade-out-then-in. Inactive quotes are `aria-hidden` + `pointer-events-none`.
- ⚠️ **Consequence: all eight quotes are now in the static HTML, not just the
  first** (verified: 8 `<blockquote>`, 7 `aria-hidden`). They are still the
  FICTIONAL placeholders `content:check` warns about every run
  (`confirmed: false`) — launch blocker 1 below is unchanged and slightly more
  urgent, not less.

### 3. The avatar row animated its own height (same file)
- Residual ~9px wobble every 3s after fixing (2). The active avatar animates
  44px → 64px under `transition-all`, and **height is a layout property**; the
  row's max also dips mid-transition because the outgoing avatar shrinks while
  the incoming one grows. Row pinned to `h-16` with the rest centred.

### Verification notes worth keeping
- **`document.querySelectorAll('main section')` + per-section height over 20s is
  the right instrument for "something is jumping" reports.** It found the real
  culprit in one run, after two rounds of probing the hero found nothing wrong
  with it. Reach for it before theorising.
- ⚠️ **On the DEV server, four unrelated sections appeared to "vary" — all
  changing at the same instant (13,981ms into one run) and never again.** That is
  a single page-wide reflow during the load phase (dev serves fonts unbundled),
  not a repeating jump, and it does not reproduce on the production build over
  `npx serve dist`, where all 13 sections are stable. **Judge layout stability on
  the built output, and treat a set of sections that all change on the same frame
  as one load event rather than N bugs.**
- ⚠️ zsh does not word-split unquoted variables, so `for wh in "375 812"; do node
  probe.mjs $wh` passes ONE argument and every measurement comes back `NaN`-wide.
  Cost a whole confusing run.

## Hero floater tiles removed; image + card now carry the motion — 20-08-2026
NOT a phase. Clinton, on the same day the floaters landed: "in the middle image
two eyebrow is not good remove it. also added animation in right image and card
section."

- ⛔ **The two floating tiles on the showcase image are GONE, and the criticism
  was correct.** Each tile carried ArcGlyph's **`rule` variant — which IS the
  Eyebrow's mark**, sitewide. Two of them sitting on the photograph therefore
  read as two stray eyebrows rather than as floating objects. Note the shape
  choice for those tiles had ALREADY been revised once, away from the crescent
  (which read as a loading spinner at chip size); the second attempt failed for
  the opposite reason — the mark was too recognisable as something else. **Both
  rejections are recorded at the top of `HeroFloaters.jsx`; do not re-add tiles
  carrying either mark.**
  - `.hero-float-tile` and the `hero-float-rise` / `hero-float-sink` keyframes
    were deleted along with them rather than left as dead CSS.
  - **The hairline registration-cross scatter (`HeroFloaters`) stays** — it is a
    separate family, lives in the gutters rather than on the image, and was not
    what the note was about. Verified still 4 marks, 0 tiles.
- **The motion moved onto the two things that were actually static, which is a
  better answer than the tiles were:** it gives the composition depth instead of
  adding objects to it.
  - ⚠️ **`.hero-card-float` was already defined and applied to NOTHING.** It has
    existed in theme.css since Phase 4, DESIGN.md §11.2 / §9.4 specify "a 6px
    idle float on a 7s loop" for this card, and `Hero.jsx`'s own header comment
    has described that behaviour all along — the class was simply never put on
    the element. Found while wiring this up. Now on the card's inner div (not on
    Reveal's wrapper, so the CSS animation and Reveal's transform never contend
    for the same element).
  - **`hero-image-drift` (new)** on the Figure: translateY 0→7px plus
    scale 1→1.012 over **11s**, against the card's **7s**. The unequal periods
    are the point — the card overlaps the image's bottom-right corner, so the
    relative drift between them is the effect; matched periods would move the
    pair as one block. Same reasoning the removed tiles' 7s/9s pairing used.
  - **It sits on the Figure, never on the frame.** The card is positioned
    against that frame, so animating the frame would carry the card along and
    the relative drift would vanish.
  - **The image gets NO entrance animation, deliberately.** It is the
    homepage's LCP element (Phase 10 measured it), so a fade or a mask reveal
    would push first paint back. A transform on an already-painted element does
    not move the LCP timestamp; that is why drift was the right treatment and a
    reveal was not.
  - The 1.2% scale is inside the arc clip-path, so the arc bite breathes with
    the image rather than the image sliding under a static mask. Checked for
    overflow: at lg it grows ~2.7px per side (image 847–1297 → 844–1300), well
    clear of the copy column's 799 edge, and `scrollWidth === innerWidth` at all
    14 widths tested.
- **The card's six capability rows now cascade** at Stagger's established 60ms
  step, starting at 0.62s — after the card's own 0.44s spring has settled rather
  than while the whole card is still travelling.
  - **NOT wrapped in `<Stagger>`, on purpose:** that component wraps each child
    in its own `motion.div`, which would put a `<div>` between the `<ul>` and its
    `<li>`s and break the list's semantics. `Reveal`'s render-prop form drives
    `motion.li` directly instead, so `<ul> > <li>` is intact and no second
    IntersectionObserver is installed.
- **Verified in a real Chrome over CDP** (never the in-app pane — it suspends
  IntersectionObserver, so the card's Reveal never fires there and the card
  looks missing):
  - Image drift is genuinely running, not a fixed reveal: **16 distinct
    translateY values and 14 distinct scale values** across 16 samples.
  - Card float likewise **16 distinct translateY values**, 7s.
  - The row cascade is real, caught mid-flight: `[0.95, 0.86, 0.64, 0.18, 0, 0]`
    — a clean descending gradient across the six rows, **11 samples in a partial
    state**, settling to all-1 at ~2.56s.
  - **Reduced motion** via `Emulation.setEmulatedMedia`: **0 running
    animations**, image parked at translateY 0 / scale 1, card at 0, all six
    rows at opacity 1. Only transform animates, so §9.6's global floor handles
    both CSS animations with nothing to special-case; the rows use
    `useReducedMotion` the same way `Reveal`/`Stagger` do.
  - 0 console errors. `lint` clean, `content:check` clean, `build` + prerender
    68 routes.
- **Not re-measured: Lighthouse.** Two more composited layers land on a hero
  that Phase 10 already accepted at 93/100 with §9.5's layer budget knowingly
  exceeded. Both are transform-only and neither touches the LCP element's paint
  timing, so no regression is expected — but that is reasoning, not a
  measurement. Rebuild Phase 10's `_serve-h2.mjs` median-of-3 harness before
  trusting the homepage's Performance score again.

## Mega panel: switching between Services and DSC no longer blinks — 20-08-2026
NOT a phase. Clinton, on a large screen: moving between the Services and Digital
Signatures dropdowns had a "blinking effect". Real, and measurable.

### The cause, measured before touching anything
Each panel had its **own** `AnimatePresence`, so a switch ran two independent
transitions: the outgoing panel's 120ms exit and the incoming panel's 180ms
enter, both fading and both translating. Sampling each panel's computed opacity
every frame through a real CDP pointer move, the crossover frame read
**Services 0.471 / DSC 0.380 — combined coverage 0.672, i.e. a third of the page
showing through the menu.** The outgoing panel emptied out before the incoming
one had filled in. That is the blink.

### The fix
- **The incoming panel fades up over 140ms while the outgoing HOLDS AT FULL
  OPACITY**, and the outgoing only starts fading (130ms) once the incoming has
  reached 1 and is covering it. Coverage is then
  `1 - (1 - a)(1 - 1) = 1` at every frame — **the gap is closed by construction,
  not by tuning two durations until it looks acceptable.**
- ⚠️ **This needs to distinguish a SWITCH from a plain open/close, and the
  exiting element cannot be re-rendered** — `AnimatePresence` animates the LAST
  element it saw, so a `switching` flag read inline from props is the stale
  pre-switch value. `AnimatePresence`'s **`custom` prop** exists for exactly
  this: it is re-read at exit time. Hence variants-as-functions, with `custom`
  passed on BOTH the `AnimatePresence` (for the exiting panel) and the
  `motion.div` (for the entering one). Inline `initial`/`animate`/`exit` objects
  cannot express this.
- **`seq` (monotonic, from `useHoverIntent`) is the panel's z-index**, so the
  incoming always paints above the outgoing however many times the two
  alternate. A plain 0/1 pair ties on the second switch and DOM order decides
  instead — and with the outgoing on top the switch reads as lag, because
  nothing appears to happen for 140ms.
- **Neither panel travels during a switch.** The -6px drop is the gesture of a
  panel coming out of its trigger; on a switch the surface is already there and
  only its contents change. Open-from-closed keeps the drop (verified: it steps
  through translateY -6 → 0).
- **`OPEN_DELAY` is now skipped when a panel is already open** — standard
  mega-menu behaviour, and it matters here because paying 120ms of hover intent
  on top of the 140ms hold made the switch feel sluggish. `useHoverIntent` now
  holds one state object (`key` / `from` / `seq`) so a consumer can tell a switch
  from an open or a close, and exposes `switching`.
  - The "is anything open" ref is synced in an **effect**, not assigned during
    render — `react-hooks/refs` rejects the latter (same rule that caught
    `useMountedAt` in Phase 8).

### ⛔ A REAL BUG I INTRODUCED AND ALMOST SHIPPED — read this before touching the variants
Writing the `shown` variant as `transform: "none"` **collapsed the Services
panel to `scale(0)`**. Motion decomposes a transform STRING into components and
interpolates each; it does NOT read `"none"` as `translateY(0) scale(1)`, so
animating `translateY(-6px) scale(0.995)` → `"none"` resolved the end state to
`matrix(0, 0, 0, 0, 0, 0)`.

**What makes this dangerous is how it presented.** The panel reported
`opacity: 1`, computed `width: 1680px`, `display: block`, correct `position` and
`offsetParent`, and **zero console errors** — every probe said it was open and
fully visible. Only `getBoundingClientRect()` (0×0) and a screenshot (no panel
at all) disagreed, and only dumping the **inline** `transform` explained it. It
also silently invalidated a whole verification pass: the "gap-free" coverage
numbers I had just measured were of an invisible panel.

Every state now spells out `translateY(...) scale(...)` via a shared
`REST_TRANSFORM` constant. **Never use `"none"` in a transform variant here.**
(The pre-existing inline code sidestepped this by writing
`translateY(0px) scale(1)` explicitly on the animate leg — that was load-bearing,
not verbosity.)

### Verified in a real Chrome over CDP
- Both panels render at real sizes: Services **1536×518**, DSC **1536×450** (68px
  apart, so no height animation is warranted).
- **minCoverage 1.000 on every frame** of services→dsc, dsc→services, AND a
  second services→dsc alternation (the z-index tie case). Was 0.672.
- Open-from-closed still drops in (translateY -6 → 0, 8 distinct values); under
  emulated `prefers-reduced-motion` translateY is **only ever 0**.
- Leaving the nav unmounts both panels; Enter opens (exactly 1 click), Escape
  closes and restores focus to the trigger. 0 console errors.
- `lint` clean, `content:check` clean, `build` + prerender 68 routes.

### Two verification traps that produced false failures
1. ⚠️ **`Input.dispatchKeyEvent` keyDown-with-text PLUS a keyUp fires TWO
   activations on Enter** — the panel opened and immediately closed, reporting
   "Enter is broken". CLAUDE.md's existing note (use `type: "keyDown"` with
   `text: "\r"` and both virtual key codes) is right and **complete: do not add
   a keyUp**. Confirmed by counting click events: 2 with the keyUp, 1 without.
2. ⚠️ **Parking the test cursor near the panel's bottom edge closes the panel by
   itself, and it is not a bug in the transition.** The header shrinks 84px →
   64px when a panel opens, which moves the panel's `top-full` origin up 20px —
   so a cursor a few px inside the pre-resize box ends up outside the post-resize
   box, fires `pointerleave`, and `hoverClose` runs. Park the cursor well clear
   (y ≥ 800) when testing keyboard behaviour. Pre-existing consequence of the
   header resize, unrelated to this change, but worth knowing it exists.

## Bug fix: the closed mobile sheet cast a shadow into the viewport — 20-08-2026
Real bug, reported with a screenshot (Clinton, on a phone): a dark fade down the
right-hand edge of the page **while the menu is closed**.

- **Cause.** `MobileNav`'s sheet stays mounted so it can slide, and closed it
  sits exactly off-screen (`translate: 100%`, left = viewport width). An
  off-screen element paints nothing — **but its OUTER box-shadow does.**
  `.mobile-sheet` carried `-32px 0 64px -24px` at 85% ink unconditionally, so
  the shadow was cast leftward, back INTO the viewport, on every route.
  `inert` and the scrim's `opacity: 0` were both already correct; neither hides
  a shadow on a different element.
- **Measured, not eyeballed.** Screenshot decoded in-page on a canvas, sampling
  the pixel row at mid-height on a light section at 390px:
  **rgb 128 one pixel from the edge — 50% grey on a white surface** — then 147 at
  8px, 178 at 22px, 206 at 32px, 229 at 45px, and not clean until ~90px in. So
  roughly a 90px darkening strip down the full height of every mobile page.
- **Fix: the cast shadow belongs to the OPEN state.** Only the inset light-catch
  is unconditional (it is inside the box and cannot escape); the outer leg moved
  to `.mobile-sheet[data-open="true"]`.
  - ⚠️ **`[data-open="false"]` now writes the full `transition` shorthand, not
    just a duration/timing override.** The box-shadow leg needs its own delay,
    and the old `transition-duration: var(--dur-base)` would have applied to it
    too. It is held for the WHOLE exit and then dropped in one 1ms step
    (`box-shadow 1ms linear var(--dur-base)`), so the sheet keeps its depth
    while it travels and nothing is left painting afterwards. Deliberately not
    animated: box-shadow is a paint property, and by the time it switches the
    sheet is entirely off-screen, so there is nothing to see.
- **Verified on the production build over `npx serve dist`** at 390px and 375px:
  closed = **1 shadow leg** (inset only), cast absent, sheet at left = viewport
  width, `inert`, scrim 0. Open = **2 legs**, cast present, scrim 1. Mid-close at
  120ms = **still 2 legs** with the sheet at left 34/27 — i.e. the exit keeps its
  shadow while travelling, which was the point of the delay. Closed again = back
  to 1 leg.
  Re-sampled the same pixel row on three routes: `/services/gst/registration`,
  `/contact` and `/about` all now read a flat surface token from 1px to 195px in
  (`/about` is 245,241,234 at every sample — dead flat, no gradient).
  `scrollWidth === innerWidth` at both widths, 0 console errors. `lint` clean,
  `build` + prerender 68 routes.
- ⚠️ **Verification note: the dev server died mid-session** (it belonged to
  another chat, and this session's `preview_start` cannot claim port 5183). The
  symptom is `document.title === "localhost"` and every selector returning
  null/0, which reads exactly like the component having disappeared. **Check
  `document.title` before believing a "component is missing" result.** Switched
  to `npx serve dist` — which is this repo's standing preference for
  verification anyway — and remember to kill it afterwards, or an orphaned child
  holds `dist/` and the next `vite build` fails with `EPERM`.

## Article template: light editorial header + fixed "More insights" cards — 20-08-2026
NOT a phase. Clinton: the T10 article hero should be LIGHT, not dark, laid out as
tag / heading / (subheading · date · read time) / rule / photo — and the "More
insights" cards needed fixing.

### ⛔ A light opening section breaks half the layout contract, so the header got the variant the contract itself prescribes
CLAUDE.md's layout contract requires every page's opening section to be dark,
because the header is `fixed` and transparent over it and renders
canvas-coloured text. Its own stated remedy is "the header needs a per-route
solid variant — **not a local hack**". That is what was built:
- `nav.js` marks `insightArticlePages` with **`lightTop: true`** and exports
  `hasLightTop(path)`. Declared in nav.js rather than in the template so the
  answer is derivable from ONE source during Phase 9's SSR pass and on client
  navigation, **with no state and no effect** — server and client cannot
  disagree.
- `Header.jsx` adds it to the condition it already had: `scrolled || openKey ||
  lightTop` renders the existing 64px ink-950/0.88 glass bar from scroll
  position 0. No new visual state was invented.
- ⚠️ **First version silently did nothing, and the cause is a trap for anything
  keyed off `location.pathname`.** Route paths in nav.js are canonical and
  slash-free (`/insights/foo`), but Phase 9 prerenders to
  `dist/insights/foo/index.html`, so a static host serves the directory form and
  the pathname arrives as `/insights/foo/`. The lookup missed and the header
  stayed transparent (measured: 84px, `rgba(0,0,0,0)`) over a light hero — i.e.
  exactly the invisible-nav-text failure the flag exists to prevent. Both URL
  forms reach real users. `hasLightTop` now normalises the trailing slash;
  verified identical on both forms. Every other nav.js consumer receives a
  canonical `entry.path` from the route config, so only this one needed it —
  **anything new that keys off a live pathname does too.**

### The header is NOT PageHero, deliberately
`PageHero` is the shared compact DARK hero for T2/T3/T4/T5 — `data-surface="deep"`,
`text-canvas` h1, ink-300 lede — and giving it a light mode would put a second
surface family inside a component ~40 routes depend on. An editorial header is a
different archetype, so T10 hand-rolls its own. `PageHero` is untouched and still
serves `PendingArticle` and the `/insights` index.
- **ONE section carries the header, the rule, the photo AND the body.** Splitting
  the header out would put two `light` sections back to back — one surface to the
  eye, and a consecutive repeat in the cadence audit (it counts
  `section[data-surface]`). Verified in all four prerendered files: `light →
  light-alt → ember → deep(footer)`, zero consecutive repeats, one `<h1>`, 4
  ld+json blocks (unchanged).
- **`Breadcrumbs` gained a `tone` prop, and it is not cosmetic.** Every colour in
  it was a hardcoded dark-surface utility (ink-200 / ink-300 / ember-200,
  `ring-offset-ink-950`) — correct in ~60 dark heroes, unreadable on canvas.
  Third instance of the trap this file already records for `GroupHeading` and
  `PartnerProgramme`: **the surface system covers headings and
  `var(--surface-*)` accents, not arbitrary utilities.** Default stays `"dark"`,
  so every existing call site is byte-identical.
- **The photo is NOT wrapped in a `Reveal`, and the H1 uses `fade={false}`.** On
  this page the photo is the LCP element; an opacity-0 start would gate the
  largest paint behind hydration. Same reasoning PageHero's own h1 already
  carries.
- The rule uses `border-[var(--surface-border)]` rather than a literal ink-100,
  so it tracks the surface system like every other hairline on the site.

### "More insights" cards — three real defects, all fixed by matching the index
Rebuilt to the SAME construction as `/insights`' own cards rather than being a
second design for the same content type on an adjacent page:
1. **No thumbnail**, while the index cards and the homepage list both carry one —
   so one article looked like a different kind of thing depending on where you
   met it.
2. **`h-full` stretches the CARD but not its contents**, so with three different
   excerpt lengths the row had no common floor. Now `flex h-full flex-col` with
   `mt-auto` on the action row. Measured at 1440px: heights 483/483/483 and
   "Read the article" at y=711 on **all three**. (At 375px the heights
   legitimately differ — single column, each card its own row, nothing to
   equalise against.)
3. **No read time and no action affordance** on something that IS a link.

### Verified
Real Chrome over CDP against `npx serve dist` (never `vite preview`), asserting
`innerWidth` / `visibilityState` / `location.pathname` before measuring:
- **Layout matches the brief**, measured off the live DOM at 1440px: breadcrumb
  y=124, eyebrow y=178, h1 y=218 (953px wide), excerpt y=363 at x=72,
  meta y=406 at x=1154 with `metaRightOfExcerpt: true`, rule spanning the full
  1296px container, photo y=495 with `photoIsAfterRule: true`.
- **Contrast, pixel-sampled** (read foreground FIRST, then inject
  `color: transparent`, screenshot, sample p95 luminance under each box): h1
  **12.8:1**, excerpt **9.77:1**, meta **6.48:1**, eyebrow **4.97:1** — all pass.
- **Header over the light hero**: 64px, glass, bordered, nav links **13.76:1**.
  ⚠️ The probe also reported two logo "failures" at 1.05:1 and 1.41:1 — **not
  real**: both are wrapper spans with `ownText=false` (the "TO" mark's container
  and the wordmark's flex wrapper), so a text-contrast ratio is meaningless for
  them. Every element that actually renders text passes (13.76 / 4.59 / 7.68:1),
  and a control — a T2 page scrolled until its header is the same glass — is
  byte-identical in structure and colour, so this page's header is the
  already-audited scrolled state rather than a new condition. **Restrict a
  contrast sweep to elements with their own text nodes.**
- No regressions: T2, the homepage and `/insights` itself all still render the
  84px transparent header over a `deep` opening section.
- `scrollWidth === innerWidth` at 1440 and 375. `lint` clean, `content:check`
  clean, `build` + prerender 68 routes.
- Console: exactly **1** error, the long-standing sitewide React #418
  (`args[]=HTML`) this file already records as reproducing on untouched routes.

### Left as-is
The `/insights` INDEX still opens with the dark `PageHero`. The request was the
article page, and the flag is per-route — add `lightTop` to `insightsIndexPage`
and give it the same header treatment if that should match.

## Contact page: one continuous LIGHT surface, form with no card — 21-08-2026
NOT a phase. Clinton: "hero and section are separate and have different bg
colour — make it look like one continuous page, change it into light theme,
make the design premium. Do not keep the form inside a card, blend it to the
page." Supersedes the whole-page DARK treatment of 20-08-2026 entirely. Run
against the `design-taste-frontend` and `emil-design-eng` skills (Redesign —
Preserve mode: brand tokens, copy voice, IA, form field names and order all
unchanged).

- ⛔ **THE PAGE OPENS LIGHT, which breaks half of the layout contract on
  purpose — via the contract's OWN prescribed remedy, not a local hack.** The
  header is fixed and transparent over each page's opening section and renders
  canvas-coloured text; the contract says a template that must open light needs
  "a per-route solid variant". That variant already exists from the T10 article
  work: `nav.js` marks `/contact` **`lightTop: true`** and `Header.jsx` renders
  the solid/glass state it already owns from scroll position 0. Verified: 64px
  glass header at scrollY 0 on `/contact`, while `/`, `/about`,
  `/partner-with-us` and a T2 leaf all still show the 84px transparent header
  over a `deep` surface.
- **ONE `<section>` carries the whole page**, which is what actually answers the
  brief. The old shape was `PageHero` (deep) + `Section` (dark) — two surfaces,
  therefore a seam at the fold. Splitting the header into its own `light`
  section would NOT fix it: two `light` sections back to back read as one
  surface anyway AND register as a consecutive repeat in the cadence audit
  (which counts `section[data-surface]`). Measured cadence for the route is now
  simply `light` → `deep` (footer). Same construction the T10 article template
  already uses, including `page-top` for the header clearance and a
  `pb-[clamp(72px,9vw,144px)]` matching `.section-pad`.
  - Deliberately NOT `PageHero`: that primitive is the shared compact DARK hero
    for T2/T3/T4/T5, and giving it a light mode would put a second surface
    family inside a component ~40 routes depend on.
  - `Breadcrumbs` gets `tone="light"` — load-bearing, its default dark palette
    is ink-200/ink-300 on canvas.
- **`.field-bare` (theme.css) is the new third field tone**, additive on
  `Input`/`Select`/`Textarea` alongside `light` (default) and `dark`, so all
  ~6 other call sites are byte-identical (verified: 0 bare fields and unchanged
  white fields on `/partner-with-us` and a T2 leaf). Transparent, no side or top
  border, one hairline along the bottom, **zero horizontal padding** so the
  input text sits on the same left margin as the copy around it. A bordered
  white input on a canvas page IS a card; five of them is five cards.
  - ⚠️ **The focus state is a `box-shadow`, and that is load-bearing.** Tailwind
    implements `focus-visible:ring-2` as a box-shadow, and `.field-bare` is
    UNLAYERED CSS (same as `.field-dark`), so it beats `@layer utilities` and
    would silently ERASE the ring. The rule therefore has to carry the whole
    focus affordance itself: `0 1px 0` doubles the hairline to a 2px ember rule
    and a soft drop supplies the halo. Never reduce this to a colour change.
  - ⚠️ **`.field-bare` also sets `border-color: transparent`, which beats the
    `border-danger` utility the primitives add** — an error state would be
    invisible. Restated as `.field-bare[aria-invalid="true"]`, an attribute the
    primitives already set, so the two cannot disagree.
  - `select.field-bare` keeps `padding-right: 1.75rem` for its chevron, which
    moves flush to the right edge on this tone.
  - Labels are mono/uppercase here where the other tones are sentence-case sans:
    with the input's box gone, the label is the only thing marking where the
    field begins. `fieldLabelClass()` (`components/ui/fieldLabel.js`) is the one
    definition, shared by all three primitives.
  - Placeholders drop to **ink-400 (7.2:1)**, not the light tone's ink-300
    (~3.4:1 on canvas): with no field background to sit in, a placeholder is
    body text on the page surface.
- **`.surface-ambient-light` (theme.css)** is the light counterpart to
  `.surface-ambient`. §7.2 requires dark sections not be flat slabs; a single
  continuous canvas with no surface change to mark the fold has the same
  problem. A whisper of ember (brightest stop 5% ember mixed into canvas) at
  the top of the page, gone by the time the form starts.
- **EXACTLY ONE EYEBROW on the page**, in the header. The old version had three
  ("Get in touch" / "Send a message" / "Reach us directly") — the templated
  rhythm `design-taste-frontend` calls its single most-violated rule, and on a
  page that is now one continuous surface they also implied section breaks that
  no longer exist.
- **The three channels are a full-width hairline row, not a right rail.** They
  are the page's primary actions; beside the form they put the two fastest
  routes to a human below the fold. `divide-*` rather than per-item borders so
  the outer edges stay clean. Discs are FILLED ember-50 (the light half of the
  filled-on-light / ringed-on-dark pairing), and `:active` is deliberately NOT
  hover-gated — Tailwind wraps every `hover:` in `@media (hover: hover)`, so
  without it a touch user gets nothing back from a tap.
  - ⚠️ **Real bug caught by screenshot: `md:first:pl-0` on the `<a>` zeroed the
    left gutter on EVERY cell.** The anchor is the only child of its own `<li>`,
    so `:first-child` matched all three. The gutter belongs on the `<li>`. Any
    first/last-of-row exception has to be expressed on the element that really
    is a sibling of the others.
  - The arrow glyph moved INLINE beside each value. Pinned to the cell's far
    edge it stranded itself ~350px from the text it belongs to and read as a
    stray mark — these cells are ~430px wide against two or three words.
- Form spacing opens from `space-y-4` to `space-y-7` on this tone, and the
  submit button stops being `w-full`: a full-bleed bar under a borderless form
  re-draws the card outline the tone exists to remove.
- **Verified** in a real Chrome over CDP against `npx serve dist` (never
  `vite preview`, never the in-app pane), asserting
  `innerWidth`/`visibilityState`/`pathname` before measuring, and priming
  reveals by step-scrolling from Node:
  - **Pixel-sampled contrast** (read foreground colours FIRST, then inject
    `color: transparent`, screenshot, decode in-page on a canvas, sample
    p95/p05 luminance under each box): **0 failures**, 19 samples at 1440px and
    9 at 375px, tightest 6.44:1. A static resolver cannot judge this page — the
    surface is a `color-mix` radial.
  - One `section[data-surface]`, value `light`. One `<h1>`. 5 `.field-bare`
    fields, **0 card/panel classes inside the form**. 0 reveals left hidden.
  - `scrollWidth === innerWidth` at 1440 and at an emulated 375 (channels stack
    to one column). Reduced motion via `Emulation.setEmulatedMedia`: 0 running
    animations, 0 elements stuck mid-opacity.
  - Exactly **1** console exception, the long-standing sitewide React #418
    (`args[]=HTML`) — confirmed byte-identical on `/about`, which this change
    never touched. No new hydration mismatch.
  - `npm run lint` (0 problems), `content:check` (clean apart from the three
    standing unconfirmed-content warnings), `build` + prerender 68 routes.
- ⚠️ **Verification trap, new: `el.focus()` in headless Chrome does not apply
  `:focus` or `:focus-visible` unless focus emulation is on.** The probe
  reported the bare field's focus indicator as completely absent — no border
  change, no shadow — which looks exactly like the CSS never matching. Call
  `Page.bringToFront` + `Emulation.setFocusEmulationEnabled({enabled:true})`
  first, and settle ~400ms afterwards or the transition is still mid-flight and
  reads back the resting value. With both, the indicator measures correctly:
  hairline ink-100 → ember-400 plus the doubling and the halo.

### Bug fix, same session: the embedded map was pointed at the SHARE link
Clinton: "map is not load properly". Real bug, and it predates the contact
redesign — `MapEmbed.jsx` set the iframe's `src` to
`site.registeredAddress.mapsUrl`, the `maps.app.goo.gl` SHORT SHARE LINK.

- ⛔ **`maps.app.goo.gl` can never be framed.** It 302s to google.com/maps,
  which serves `X-Frame-Options` / `frame-ancestors 'none'`, so the iframe
  renders as a blank box with a browser-level refusal and **no error the
  component can catch** — nothing throws, nothing logs to React, the element
  is simply empty. Both `/contact` and `/about` were shipping this.
- **The framable one is the plain KEYLESS embed endpoint**, which needs
  `output=embed` and takes the COORDINATE PAIR, not the address string:
  `https://www.google.com/maps?q=<lat,lng>&z=17&hl=en&output=embed`. That is
  exactly what this file's own comment block has described since 20-08-2026 —
  the code had drifted from its own documentation, which is the reason it read
  as correct on inspection.
- `mapsUrl` stays, and stays correct, for the "Get directions" anchor: opened
  in a new tab (or handed to the native app) a share link is the right thing;
  it is only the `src` that it can never be. **The two URLs are not
  interchangeable — do not collapse them into one field.**
- The pill moved `bottom-3` → `bottom-7`. Once loaded, Google draws its own
  ~20px attribution bar along the bottom edge plus a control in the right
  corner, and at 12px the pill covered both. Keeping "Map data ©… / Terms /
  Report a map error" legible is a condition of using the embed, not a
  preference.
- Verified on the production build in a real Chrome: clicking "Load map" on
  BOTH `/contact` (503x377) and `/about` (743x464) loads a real tiled map with
  the marker on Ramakrishna Road, `src` resolving to the embed endpoint, the
  pill still pointing at the share link, and 28px of clearance above the
  attribution bar. Screenshotted, not inferred from the URL.

⚠️ **Then Clinton said "still it is not showing" — and the map was NOT broken.
He was looking at the click-to-load PLACEHOLDER.** Driving his own dev server
(`:5174`) proved the iframe rendered correctly the moment the button was
clicked. A dashed box saying "Load map of Balaji Towers" reads as a map that
failed, not as a control, and that is a design failure regardless of what the
code does. So the map now **loads itself via an `IntersectionObserver`**
(`rootMargin: "200px 0px"`) and the button survives only as the pre-observer
state and the no-JS/no-IO fallback; its copy changed from a call to action to
"Loading map…".

- ⚠️ **This is a REAL, deliberate deviation from CONTENT-PLAN.md §10/§11**,
  which both ask for the map to be "lazy-loaded behind a click-to-load
  placeholder" — i.e. no Google iframe and no Google cookies until a visitor
  asks. Auto-loading means Google gets the request without a click. The other
  half of the requirement IS preserved: the iframe is still never fetched on
  page view, only when the map is about to scroll into frame, and on both
  routes it sits well below the fold. **To restore the privacy behaviour,
  delete the effect in `MapEmbed.jsx` — nothing else changes.**
- Initial state stays `false`, so the placeholder is what Phase 9 prerenders
  and what the client's first pass renders. The observer only runs in an
  effect, so there is no hydration mismatch to introduce.
- Verified with **NO CLICK** on the production build AND on the live dev
  server, `/contact` and `/about` (4 combinations): scroll normally and the
  iframe appears at 503x377 / 743x464 with the embed `src` and the placeholder
  gone. Console on `dist` shows only the long-standing sitewide React #418.
  ⚠️ A coarse scroll step (400px with a 120ms settle) missed `/about` on dev
  once — the observer needs the element to actually rest near the viewport, so
  step finer or settle longer before calling an auto-load broken.

## About page: premium pass, measured against Home and /dsc — 21-08-2026
NOT a phase. Clinton: "analyse the home and dsc pages and fix the about us page,
make it look premium." Run against `design-taste-frontend` and
`emil-design-eng` (Redesign — Preserve: every sentence of copy, the IA and the
route are unchanged; nothing new is asserted).

### What the analysis actually found — four structural faults, one cosmetic
1. ⛔ **SIX EYEBROWS ON SIX SECTIONS.** A mono uppercase label above every
   heading is the most templated rhythm a page can have, and it is the single
   thing that made this page read as generated. Now **three across eight
   sections** (hero, the dark band, "What we do") — the rest carry their
   heading alone, which is what the homepage's own light sections do. Count it
   mechanically: mono + uppercase + no children + no previous sibling.
   ⚠️ `PageHero`'s spec-row `<dt>`s match that signature too — exclude
   `.hero-spec` before believing a count.
2. ⛔ **NO DARK BAND.** The page ran `deep → light → light-alt → light →
   light-alt → light → ember`: six light surfaces in a row separated only by a
   tonal shift. Exactly the diagnosis the /dsc premium pass recorded for its own
   plainness, and DESIGN.md §11.1 puts a genuinely dark band between light ones
   on the homepage for the same reason. "What we believe" is now that band
   (`Section surface="dark"` + `.surface-ambient` + `ArcRings`; `Section`
   supplies `.grain` for dark surfaces itself). Measured off the live DOM:
   **`deep → light → dark → light-alt → light → light-alt → light → ember`,
   zero consecutive repeats.**
3. ⛔ **THREE NEAR-IDENTICAL 3-UP CARD GRIDS** (pillars, categories, how we
   work) — Section-Layout-Repetition. Every section now uses a different
   family: two-column editorial prose, a hairline-divided dark trio, the
   oversized-numeral block, the scroll-linked stepper, a hairline link list,
   and a 5/7 split.
4. ⛔ **NONE OF THE SITE'S OWN VOCABULARY.** No mono numerals, no arc rings, no
   ember discs, no `StepFlow` — the four devices Home and /dsc are built from.
   All four are here now and **each is used exactly once**, which is why the
   pillars are icon-led and the differentiators are numeral-led rather than
   both reaching for the same treatment (§16: a designed page applies each
   effect in one place).
5. The hero was the bare `PageHero`. It now carries a `spec` row.
   ⚠️ **Every value is DERIVED**: two counts read off `serviceCategories` at
   render (6 practice areas / 31 services — so the 17-08-2026 "twenty-one
   services" staleness class of bug cannot recur here) and two facts this
   page's prose already asserts. No client count, no years, no turnaround — a
   spec row is the easiest place on the site for an invented number to slip in.

### Decisions worth keeping
- **`StepFlow` replaces the hand-rolled 3-column divide for "How we work".**
  That content is the arc of an engagement and StepFlow is the site's one step
  treatment; `surface="light"` keeps the cadence alternating after the dark
  band above it.
- **The pillars are hairline-divided columns, NOT cards.** A panel inside a
  dark section is a box in a box, and they are static content — a card's hover
  ring would signal an interaction that does not exist. Discs are RINGED
  (the dark half of the filled-on-light / ringed-on-dark pairing).
- **"What we do" is derived from `serviceCategories` and now renders each
  category's real `subline`.** The six bare label pills it replaced were
  identical boxes saying nothing the nav does not already say.
- **`aboutContent.differentiators` (new, in `about.js`)** is the four bullets
  that used to be an unmarked `<ul>` inside a card, split into title + body.
  Same wording, no new claim. ⚠️ They stay SEPARATE from `WhyThinkOrange.jsx`'s
  own longer `differentiators`; both trace to CONTENT-PLAN.md §1. If they are
  ever unified, unify them into a shared content module — do not let one page
  reach into the other's private array.
- **No `texture` on the hero, deliberately.** The four `SurfaceTexture`
  variants are DSC motifs (a guilloché means "certificate"), so one here would
  say something untrue about the page. The ~40 non-DSC heroes stay flat; that
  is still a separate, sitewide call.
- ember-500, not ember-400, on the numerals: ember-400 on `canvas-alt` is
  2.8:1, under the 3.0 floor even as large text. Body copy on the dark band is
  ink-200, never ink-400 (2.86:1 on ink, fixed sitewide in Phase 10).

### ⛔ THE `Stagger` GRID-ITEM TRAP, THIRD OCCURRENCE — read before using it
The dark band's three columns rendered with **zero gutter**: the icons sat
directly on the dividers. `Stagger` wraps every child in its own `motion.div`,
so **those** become the grid items — `divide-x` resolves against them, while
`first:` / `last:` on the element inside match **always**, because each one is
the only child of its own wrapper. So `md:px-8 md:first:pl-0` zeroed the
padding on all three.
- Fix: a plain grid + per-item `Reveal`, which forwards `className` onto the
  element it renders, so `Reveal` IS the grid item and the exceptions resolve.
  Same fix Phase 6's bento hub grid needed.
- This is the same family as the `md:first:pl-0`-on-an-only-child bug found on
  /contact the same day. **Any first/last-of-row exception must sit on the
  element that is genuinely a sibling of the others** — check what the real
  grid item is before writing one.
- Found by screenshot, not by reading the diff: the classes are all present and
  correct in the source.

### Homepage: "When people call us" no longer states its own count — 21-08-2026
Clinton: "in home page when people call us section do not directly mention six."
`WhenToCallUs.jsx`'s h2 read "Most engagements start with one of these six
sentences"; it now reads "…one of these sentences."

- The list still renders whatever `situations` holds, so the section says what
  it does without asserting how many rows there are — which also means adding
  or removing a situation can never leave the heading stale. Same call as
  /about's "Every practice area, one point of contact" (below).
- Only copy changed. The row list, the mono indices, the surface and the
  section's place in DESIGN.md §11.1's alternation are untouched.
- The word survives in that file only inside a code comment. Verified in the
  built `dist/index.html`: the rendered heading is
  "Most engagements start with one of these sentences."

### Follow-up, same session: client count, the heading, and the hero circle
Clinton: "do not mention 6 practice directly", "say 1000+ client serve instead
of 6 practice area", "fixed this hero section including circle effect".

- **The "What we do" heading no longer states a count** — "Every practice area,
  one point of contact". The grid below still derives every row from
  `serviceCategories`, so the page shows the practice areas without asserting
  how many there are, and a category added or merged cannot leave the line
  stale.
- ⛔ **THE CLIENT COUNT LIVES IN `home-hero.js`, AND /about READS IT — it is
  NOT typed on the About page.** The homepage hero already renders that same
  stat, so a figure asserted from two places is a contradiction waiting to
  ship; the value has already moved 250+ → 500+ once. It is now **1000+ in one
  place**, and both pages move together. The About tile is dropped entirely if
  the entry is ever deleted rather than confirmed, and the spec row degrades to
  three.
  - ⚠️ **`confirmed` stays FALSE and `content:check` still warns.** A client
    count is named explicitly by CLAUDE.md's non-negotiables and
    CONTENT-PLAN.md §1.1's hold list, and this number was given in passing
    while judging a layout — the same circumstance that produced 250+ and 500+.
    That flag is the only thing between this site and a published claim. Set it
    to `true` only when the figure is deliberately signed off for launch. **The
    figure is now on TWO pages instead of one, so the launch blocker is more
    urgent than before, not less.**
  - ⚠️ Verification gotcha: `document.body.innerText` reports NEITHER "1000+"
    nor "500+" on the homepage, which looks like the stat vanished. It has not
    — `.value-sizer` holds the final string in a pseudo-element
    (`content: attr(data-value)`) precisely so it never enters the text
    content. Grep the built HTML for `data-value` instead.
- **The hero "circle effect" is fixed by construction, not by nudging.**
  `PageHero` gained an additive **`ringsId`** prop: pass a unique id and it
  renders `ArcRings` — the concentric, gradient-faded set the CtaBand and the
  /dsc sections use — instead of the default lone crescent. Only /about opts
  in; the other ~40 heroes are byte-identical.
  - What was wrong: the default arc is a single 16px stroke at a flat 12%
    ember, hung off the top corner at a size that puts its brightest section
    behind the fixed header. With no other backdrop on the page it does not
    read as a corner composition — it reads as one dull circle that has been
    cut off, which is exactly what Clinton saw.
  - Why rings fix it: the shared `userSpaceOnUse` gradient fades each stroke
    along its own length, so the composition resolves into the surface instead
    of ending at the clip edge, and two radii read as depth where one reads as
    an object. Same crescent geometry either way (`lib/arc.js`), so §3.1's "one
    specific shape" still holds. Positioned bled off the RIGHT and centred on
    the hero's height rather than hung off the top corner, so the bright part
    lands beside the copy and not behind the header.
  - A ringed hero also picks up `.surface-ambient` + `isolate`, the same as a
    textured one — §7.2 compliance, so the fold is not a flat slab.
  - `ringed` is `false` whenever `texture` is set, so the two backdrops can
    never both render.
- Re-verified: contrast **0 failures** (50 samples @1440 tightest 5.17:1, 56
  @375 tightest 4.83:1), spec row `1000+ / 31 / Salem, Tamil Nadu / Pan-India`
  with all four tiles single-line at 375px, `scrollWidth === innerWidth` at
  both widths, reduced motion 0 running / 0 stuck, 3 ring paths in the hero and
  the single arc gone, the only duplicate gradient id sitewide still the
  pre-existing `cta-arc-fade`, and a T2 leaf / `/dsc` / `/partner-with-us` all
  keeping their original hero backdrop. Lint 0, `content:check` clean apart
  from the standing warnings, build + prerender 68 routes.
- ⚠️ Harness note, cost two confusing runs: `npx serve` had DIED, and the probe
  reported `path: "/"` rather than a connection error — which reads exactly
  like an app-side redirect. `curl` the URL before believing any "wrong page"
  result.

### Verified
Real Chrome over CDP against `npx serve dist` (never `vite preview`, never the
in-app pane), asserting `innerWidth`/`visibilityState`/`pathname` first and
priming reveals by step-scrolling from Node:
- **Pixel-sampled contrast** (read foreground colours FIRST, then inject
  `color: transparent`, screenshot, decode in-page, sample p95/p05 luminance
  under each box, fold by fold): **0 failures — 50 samples at 1440px, tightest
  5.53:1; 56 samples at 375px, tightest 4.83:1.** A static resolver cannot
  judge the dark band — it is a `color-mix` radial.
- Cadence and repeat count off the live DOM (above), one `<h1>`, spec row
  reading `6 / 31 / Salem, Tamil Nadu / Pan-India`, 0 reveals left hidden,
  `scrollWidth === innerWidth` at 1440 and an emulated 375.
- **Reduced motion** via `Emulation.setEmulatedMedia`: 0 running animations,
  0 elements stuck mid-opacity, StepFlow's progress line fully drawn.
- **No regressions**: `/`, `/dsc`, a T2 leaf and `/contact` all render their
  original surface cadence, one `<h1>` each, and the correct header height
  (84px transparent / 64px glass on `/contact`).
- `npm run lint` 0 problems, `content:check` clean apart from the three
  standing unconfirmed-content warnings, `build` + prerender 68 routes.
- ⚠️ Harness note: launching headless Chrome in rapid succession races on the
  debug port and fails as "chrome did not start" or a bare WebSocket
  ErrorEvent. `pkill -9 -f "Google Chrome"` and retry — it is not the page.
  Also set `Emulation.setDeviceMetricsOverride` AFTER `Page.navigate`; before
  it, the width came back as 642 rather than the requested 375.

## Session discipline
- One phase per session. Start fresh between phases — see BUILD-PLAN.md §5.
- Load only the plan sections a phase actually needs, not the whole document.
- Phase 3 (content) batches must stay independent — 4-5 leaf files per session, then
 a fresh session. Always build the exemplar first and reference it by name.

## "View all" hubs realigned to the new menus — 19-08-2026
NOT a phase. Clinton: update the two "View all" destinations (`/services`,
`/dsc` — the mega panels' utility-rail links, `nav.js`'s `hubLabel`) to match
the restructured Services and DSC & eSign menus. Both pages already picked up
the new *membership* automatically (they build from nav.js), but each presented
a different STRUCTURE from the menu it's reached through — that's what changed.

- **`DscHub.jsx` now renders three sections driven by `dscPanelColumns`** — the
  same export the DSC mega panel renders from — instead of one flat 7-card
  product grid plus a hardcoded 4-card resources row. So "Certificates" /
  "Tokens & resources" / "eSign" group the same way, in the same order, with the
  same membership, on both surfaces; adding or moving a menu item updates both.
  `buy-tokens`' `note` ("HYP2003 · mToken · InnaIT") renders on its card too,
  same string the panel shows.
  - **Teasers resolve from each linked page's OWN content file** (`itemTeaser`)
    — product `lede`, `dscValidityRenewalContent.heroLede`,
    `esignOrDscContent.heroLede`, the drivers hub's own child labels — never
    restated in the hub. Same "select by reference" discipline as the homepage
    FAQ row and Documents Required. A page with no content file yet renders its
    card without a teaser rather than crashing or showing `undefined`.
  - **Per-column heading/eyebrow/lede copy is keyed by the column's own menu
    label** (`COLUMN_HEADINGS` etc.) with a fallback to that label, so a fourth
    menu column still renders a complete section instead of a blank one.
  - **The FAQ and why-us surfaces are DERIVED from the column count**
    (`faqSurface`/`whySurface`), not hardcoded: the group sections alternate
    light-alt/light, so a menu column added or removed would otherwise put two
    identical surfaces back to back. Verified live off `section[data-surface]`:
    `deep → light → light-alt → light → light-alt → light → light-alt → ember`,
    zero consecutive repeats.
  - **Partner Programme panel added at the foot**, from `dscPartnerPromo` — the
    17-08-2026 restructure pulled "Partner With Us" out of the navbar entirely
    and into the DSC panel, so the DSC hub has to carry it too. `.panel-dark` +
    `data-surface="dark"` (the established dark-panel-on-light-section pattern;
    the attribute is load-bearing for `var(--surface-*)`), heading `text-canvas`
    not ember — `[data-surface="dark"] h3` beats a plain class on specificity,
    the trap this file already records twice. `secondaryLabel` ("Partner login")
    is deliberately not rendered: no backing portal, same reason the panel's own
    copy of it is commented out.
- **`hub-content.js` copy was genuinely stale, not just structurally off**: the
  intro said "Choose individual or organisation Class 3, DGFT, or a standalone
  token" — written when there were 4 products, and silently wrong since combo,
  renewal and Aadhaar eSign landed. `meta.description`, `heroLede` and that
  paragraph now cover all seven. Two FAQs added, both restating facts already
  reviewed elsewhere in the DSC tree rather than new claims: what a combo
  certificate adds, and — the one that matters — that **Aadhaar eSign does not
  replace a Class 3 certificate on statutory portals**, which is now asserted on
  the product page, the comparison page and the hub FAQ.
- **`ServicesHub.jsx` now mirrors the services panel's statutory/growth split**
  (filter on `group`, find the first growth index — the same mechanism
  `MegaPanel.jsx` uses for its hairline), printing a group heading at each
  boundary. Each category's `subline` — already in nav.js, previously
  panel-only — renders under its heading, and "View category" carries the leaf
  count.
  - **The lede's category count AND names are now derived**, not typed: both had
    already gone stale once each (the 17-08-2026 restructure). The Oxford comma
    in that join is load-bearing — category labels contain their own commas
    ("Accounting, Payroll & Audit"), so without it the last two run together.
- **Two stray unused imports were removed from `nav.js`** (`sub` from date-fns
  and `s` from `./statutory`, both flagged unused by ESLint, both uncommitted).
  The extensionless `./statutory` specifier crashed `npm run content:check`
  outright under Node ESM (`ERR_MODULE_NOT_FOUND`) — Vite resolves it, plain
  Node does not. Unrelated to this change, but it blocked the validator.
- **No "Soon" tags render on `/services` any more, and that's correct** —
  `content:check` now reports 31 of 31 leaves written (the four income-tax
  leaves landed 19-08-2026), so `getServiceContent` resolves for every child.
  The mechanism is untouched and will show them again for any future
  unwritten leaf.
- Verified: `npm run lint` (0 errors; the 3 warnings are pre-existing, in files
  not touched here), `npm run content:check` (clean apart from the three
  standing unconfirmed-content warnings), `npm run build` + prerender (63
  routes + 404 + sitemap, unchanged), then a real Chrome over CDP against
  `npx serve dist` (never `vite preview` — Phase 9's note still applies):
  rendered text of both hubs read end to end, surface cadence sampled off the
  live DOM, and section screenshots of the certificates grid, the eSign group
  and the partner panel.
  - ⚠️ **Pre-existing and NOT from this change: React error #418 (hydration)
    logs on `/services` and `/dsc` — and equally on `/about` and `/contact`,
    which this session never touched.** Phase 9 attributed a #418 to
    `vite preview` serving the wrong file; this one reproduces under
    `npx serve dist`, so that explanation does not cover it. Sitewide, worth
    its own investigation; deliberately not chased inside this change.

## Scroll nav: one down/up control, sitewide — 19-08-2026
NOT a phase. Clinton: the round chevron button should advance about one screen
("show the next section after the hero, around 100svh"), then become an arrow-up
that returns to the top, and look premium. New component
`src/components/layout/ScrollNav.jsx` + `.scroll-nav` in theme.css, mounted once
in `RootLayout.jsx`.

- **The button it replaces had two real defects, both fixed here rather than
  restyled around.** It was `position: absolute` inside a fragment, so it
  resolved against the page box and scrolled out of reach instead of staying
  available; and its target was `mainRef.current.nextElementSibling` — the
  **footer** — so "scroll to the next section" jumped the entire page. `mainRef`
  existed only for that and is gone.
- **Behaviour, measured on the production build over `npx serve dist`:** at the
  top it points down and advances to the next `<section>` **below the current
  scroll position**, resolved from the live DOM. On the homepage that is exactly
  the post-hero section (`y 0 → 829` at a 813px viewport, i.e. ~100svh, which is
  the brief). It flips to arrow-up past **85% of one viewport** and stays up to
  the foot of the page; pressing it there returns to `y 0` and it flips back.
  On a compact-hero template (`/dsc`, hero ~483px) the presses walk
  `0 → 483 → 1119 → 0`, flipping only once past that 85% line.
  - **Targeting the next section below the scroll position, not `sections[1]`,
    is deliberate.** With `sections[1]` a second press on a short-hero page
    re-targets a section already at the top of the viewport and the control
    appears dead — the first version did exactly that on `/dsc`.
- **Premium treatment, and what it is NOT.** A scroll-progress ring around the
  disc (SVG, ember, `strokeDashoffset` derived from `2πr` so changing r can't
  leave a stale dash length), a directional icon swap through `AnimatePresence`
  (the outgoing glyph exits the way the new one points, so the flip reads as the
  page's direction changing rather than a cross-fade), and the down state keeps
  the existing `.hero-chevron` nudge while the up state drops it — a hint to
  start scrolling is meaningless once you have.
  - **Translucent, NOT glass.** No `backdrop-filter` anywhere on it: DESIGN.md
    §7.5 keeps blur exclusive to the sticky nav and permits translucency without
    it, which also keeps a second large blur surface off the mobile compositor.
    The disc is an ink `color-mix` gradient with inset shadows for a lit top rim
    and a dark bottom one — the same construction as `.whatsapp-fab`, in ink
    with an ember rim so the FAB stays that corner's only colour exception.
  - **Hover is gated to `(hover: hover) and (pointer: fine)`** — ungated, a tap
    leaves the disc stuck lit, the same defect the dark cards had before their
    own gate.
  - Progress is quantised to whole percent and read inside one rAF-throttled
    passive `scroll`/`resize` listener, so a continuous scroll doesn't re-render
    per pixel.
- **Geometry is a STACK with `FloatingWhatsApp`, not a neighbour:** 44px at
  `bottom-23 right-6` = 24 + 56 + 12 gap above the 56px FAB, and deliberately
  smaller so the WhatsApp affordance stays dominant. Verified by bounding-box
  intersection at the very bottom of the homepage (where the footer's own links
  live) at **1440px and 375px: zero footer-link overlaps, no FAB overlap, and
  `elementFromPoint` at the disc's centre returns the button** — i.e. nothing
  covers it. CLAUDE.md already records that the last time this corner changed,
  the footer padding written for the old corner silently stopped protecting
  anything; **re-run that check if either control moves.**
- **SSR/hydration:** initial state is deterministic (`down`, progress 0,
  visible), so the prerendered markup and the client's first pass agree; the
  effect specialises it afterwards. When there is nothing to scroll the button
  fades out and leaves the tab order (`tabIndex -1`, `aria-hidden`,
  `pointer-events: none`) rather than sitting there inert.
- **Reduced motion verified via `Emulation.setEmulatedMedia`:** the scroll
  becomes `behavior: "auto"` (arrived at y 829 within 250ms of the press, vs a
  smooth animation), the icon swap and hover/tap motion are dropped, and
  `document.getAnimations()` reports **0 running animations**.
- Verified: `npm run lint` (0 errors), `npm run build` + prerender (63 routes,
  unchanged), plus the CDP passes above on `/` and `/dsc`. Also worth knowing:
  a failed prerender leaves `dist-server/` behind, and ESLint then lints that
  bundle and reports dozens of errors in generated code — delete `dist-server/`
  before believing them.

### Follow-up: DSC panel headings now match the Services panel — 19-08-2026
Clinton: the Digital Signatures dropdown's column headings should look like the
Services dropdown's. They didn't, and the cause was in `MegaPanel.jsx`'s
`PanelColumn`, not in either panel's data.

- **The whole ember heading treatment hung off `column.path`.** Services columns
  are real category routes, so they got `text-ember-300` + `font-semibold` +
  the column layout; the DSC columns are GROUPINGS with no route
  ("Digital Signature Certificates", "Tokens & Resources", "eSign Solutions"),
  so they fell through to plain `text-canvas`. One component, two visibly
  different dropdowns. Now the LOOK is unconditional and only the interactive
  states (hover colour, focus ring, `rounded-sm`) stay conditional on `path`.
  The DSC groups remain non-links — there is no page for a grouping to link to.
- **The subline `<span>` rendered even when there was no subline**, and an empty
  `text-xs` span still occupies a line box — so every column without one (all
  three DSC columns) carried a blank row between its label and the gradient
  rule. Now conditional. No sublines were invented for the DSC groups; nav.js
  simply doesn't have them.
- Verified by opening both panels in a real headless Chrome at 1680px and
  screenshotting each: both render ember-300 semibold labels with the gradient
  rule beneath, the Services columns additionally showing their real sublines.
  `npm run lint` (0 errors), `npm run build` + prerender (63 routes, unchanged).

## Insights is live: 4 real articles + /insights routes (T10) — 19-08-2026
NOT a phase. Clinton: show four service-related articles in the homepage Insights
component, in a feature-plus-three layout, and make them open real article pages
with proper slugs. This closes CONTENT-PLAN.md §6 row 12 ("Reserve the route and
add at 4+ articles") and clears launch blocker 3 from the Phase 10 list — the
four `PLACEHOLDER — not a real article` entries are gone, replaced by written
articles on routes that exist.

### Content
- **`src/content/insights.js` is now a DIRECTORY**, and the split is
  load-bearing rather than tidiness:
  - `insights/index.js` — the index (slug, title, excerpt, category,
    readMinutes, published, `related` service slugs, per-article `meta`). Small,
    and imported by `nav.js`, which is in the always-eager main chunk.
  - `insights/bodies.js` — the article prose, imported ONLY by the article
    template, so it lands in that route's own lazy chunk. Verified in the built
    output: body text is in `Article-*.js` (18.9KB) and appears in **no** other
    chunk; main went 472KB → 482KB, which is the index data plus the new
    homepage section, not the articles.
- **Four articles, all deliberately outside income-tax territory.** Entity
  choice (Pvt Ltd / LLP / OPC), Class 3 DSC vs Aadhaar eSign, when GST
  registration becomes mandatory, and GeM registration / tender readiness.
  BLOCKERS.md §1 makes income tax unreviewed for editorial exactly as it does
  for the four blocked service leaves, so no article touches ITR, TDS or
  assessments; where a reader would reasonably ask one, the article says to ask
  us instead of answering.
- **Not one statutory value is typed as a literal in `bodies.js` — every one
  comes through `s()`.** Thresholds, form codes (`GST REG-01`/`REG-06`), the
  30-day application window, AOC-4/MGT-7/Form 8/Form 11 due dates, the
  non-registration penalty, the Udyam EMD exemption. A CA correction in
  statutory.js therefore reaches the articles automatically, and
  `content:check`'s scanner covers them the same way it covers a leaf. Verified
  live: the rendered GST article shows "₹40 lakh", "30 days" and "GST REG-01"
  interpolated, not hardcoded.
- No fee, turnaround, client count, byline, view count or read-count claim
  anywhere. `readMinutes` is labelled as an estimate; `published` is the day the
  articles were written, not backdated to imply a longer-running editorial.
  `confirmed: true` here means "real article, real route" — the flag
  `Insights.jsx` and `content-check.mjs` read — NOT "CA-reviewed prose".
- **`src/lib/formatDate.js` (new)** formats the publish date. It parses
  "YYYY-MM-DD" by hand and never touches `toISOString()` — `new Date("2026-08-19")`
  is UTC midnight, which renders as the previous day for any IST reader. Same
  trap `compliance-calendar.js` already documents for deadlines.

### Routes and wiring
- **`nav.js` gained `insightsIndexPage` + `insightArticlePages` (T10)**, 5 new
  routes (68 total, from 63). `/insights` exists specifically so an article has
  a real parent: `breadcrumbsFor` walks `parent` links, and without it every
  article's breadcrumb would point at a path with no file behind it — a 404 for
  a crawler and for any hard navigation.
  - **Article LABELS are read from the content, not retyped in nav.js**, so a
    retitled article can't leave the breadcrumb, footer or XML sitemap asserting
    the old headline. This is the ONE place nav.js derives from a content file
    rather than the reverse; safe because `insights/index.js` imports nothing
    from nav.js, so there's no cycle.
  - Also added to `footerColumns`' Company column and to `slugIndex`, so
    `findBySlug` resolves an article and a future leaf `related` entry could
    point at one.
- **T10 branches on path** (`/insights` → index, anything else → article), the
  same convention T3 and T6 already use. Added to `routeComponents.js` (the
  shared resolver), `router.jsx` (lazy) and `router-static.jsx` (eager, SSR) —
  all three, or the client and the prerender would render different templates.
- `seo.js` gained a T10 branch; `meta.js` gained `/insights`.
- **`articleJsonLd` (BlogPosting) added to `lib/jsonld.js`.** No personal author
  — the page carries no byline, and naming someone in structured data the page
  never states is the same class of claim as a team name on §1.1's hold list.
  `dateModified` mirrors `datePublished` deliberately: a rebuild is not an edit.
- ⛔ **Real defect caught by counting `ld+json` @types on the live page, not by
  reading the diff: the article shipped TWO `BreadcrumbList` blocks.**
  `Breadcrumbs.jsx` (inside `PageHero`) already emits one from the same trail,
  and Article.jsx was emitting a second. Removed from the template. **Any new
  page template using `PageHero` must NOT add its own BreadcrumbList.**

### The homepage layout (Clinton's sketch)
One tall feature panel on the left carrying article 1 with its heading and
subheading at the panel's foot; articles 2–4 stacked down the right, each a
numbered plate beside its own heading and subheading. Two columns at `lg`, one
stack below.
- **The plates are typographic, and that is a content decision, not a
  placeholder.** IMAGE-PLAN.md §2 forbids AI-generated imagery and the site owns
  exactly one licensed photograph, so four editorial thumbnails do not exist and
  cannot be conjured. Each plate is the site's own arc motif on a dark surface
  with a mono index. Swapping in real commissioned art later is a change inside
  `SecondaryRow` alone.
- **`.card-dark` sits on the feature `<Link>` ITSELF, not on an absolutely
  positioned child** — that class's hover ring and lift are written for the
  element being hovered, so a surface on a child leaves the affordance
  responding to the child's hover box instead of the link's. The plates use
  **`.panel-dark`** instead, precisely because a decorative plate inside a link
  must not carry a hover ring that reads as a nested click target.
- `data-surface="dark"` on both, load-bearing as always for a dark surface
  inside a light section. Each `ArcRings` instance has its own `gradientId`
  (`url(#id)` resolves document-wide).
- Section surface is unchanged (`light`), and the homepage cadence still has
  **zero consecutive repeats** with the section now rendering real content.

### Verification
`npm run lint` (0 errors), `npm run content:check` (**the insights warning is
gone** — its stale text was also corrected, since it claimed no /insights route
exists; the testimonial and hero-stat warnings remain, untouched),
`npm run build` + prerender (68 routes + 404 + sitemap; all four article slugs
present in sitemap.xml). Then over `npx serve dist` in real Chrome: all five new
routes return 200 with their own `<title>`, the article page renders
`Organization + LocalBusiness + BlogPosting + BreadcrumbList` (one each), and a
**link-integrity scan of `dist/` — 3,440 internal hrefs, 0 broken.**
- Screenshots confirmed the sketched layout renders as intended and the article
  template's prose/sticky-rail layout holds. Note the standing headless gotcha:
  a `captureBeyondViewport` shot of this section comes back BLANK because
  `Reveal` hasn't fired — scroll the section into the viewport and capture the
  plain viewport instead.

### Follow-up: real photography on the Insights surfaces — 19-08-2026
Clinton: download relevant images from a free source and use them instead of the
colour cards, in the article pages too. Four licensed photographs now carry the
homepage feature panel, the homepage list thumbnails, the index cards and each
article's header.

- **What was downloaded, and why these.** Four Unsplash photos at w=1600, q=80 —
  documents on a desk (entity choice), a laptop on a desk (DSC/eSign), a
  calculator on printed figures (GST), warehouse racking (GeM/tenders). All four
  are **IMAGE-PLAN.md §2 TIER 2** — licensed *contextual* stock — and **no frame
  contains a person**, which is what keeps them inside §2's narrow permission:
  none implies "our office", "our team" or "our client's paperwork". §2 Tier 3
  (AI-generated anything) was never in play. Photographer, photo page and CDN URL
  for each are recorded in `src/assets/insights/ATTRIBUTION.txt`, even though the
  Unsplash licence requires no attribution — same discipline as
  `public/images/home/ATTRIBUTION.txt`.
- **Sources live in `src/assets/insights/`, NOT `public/` — deliberately, and
  this differs from `Hero.jsx`.** Anything under `public/` is copied to `dist`
  verbatim *as well as* being processed by imagetools, so the hero's pattern
  ships its untouched 1600px JPEG to every deploy even though no page requests
  it. Keeping these four in `src/assets` saves ~684KB per deploy and emits only
  the avif/webp variants (54 files). **Worth migrating the hero the same way next
  time that file is open.**
- **`src/content/insights/images.js` (new) is the slug → picture map, and it is
  the one VITE-ONLY file under `src/content/`.** The `?w=…&as=picture` queries
  are imagetools directives, so plain Node cannot import it — it must never be
  pulled into `nav.js`, `seo.js` or anything `prerender.mjs`/`content-check.mjs`
  load directly. Components only.
- **`alt` differs by context, on purpose.** The article header carries a real
  description of the photograph; the homepage list and the index cards use
  `alt=""` because the headline sits directly beside the image and a description
  there would only restate what a screen reader already has (WCAG 1.1.1). Both
  go through `<Img>` — no bare `<img>` was added anywhere.
- **The article header image is `priority`** (eager, `fetchpriority=high`): on
  that page it IS the LCP element, so lazy-loading it is a measurable delay
  rather than a saving. Everything else stays lazy. Verified live: all served as
  **AVIF**, header 1382px natural into a 1281px box, thumbnails 112px into 112px.
- **The header image sits INSIDE the existing `light` section, not in its own.**
  A second `light` section back-to-back would read as one surface anyway and
  would register as a consecutive repeat in the surface-cadence audit, which
  counts `section[data-surface]`.
- ⛔ **A REAL CONTRAST FAILURE was found by measuring, and it is the reason the
  scrim's stops are what they are.** The feature panel's headline sits over its
  photograph, so it carries a gradient scrim. The first version (94% ink at the
  foot falling to 42% by 78% height) left the eyebrow — ember-200, 11px — on the
  bright region of the white-paper photo at **3.13:1**, under the 4.5:1 floor for
  normal text. Same failure mode Phase 10 found in the hero over the lit arc, and
  invisible to any static resolver because the background is a photograph.
  Re-tuned to hold ~92% ink across the whole copy block: re-measured
  **4.83:1 (eyebrow) / 11.43:1 (headline, 40px) / 13.36:1 (excerpt)** — all pass.
  - Method: hide the panel's text (`color: transparent`), screenshot, decode
    in-page via canvas, sample the 95th-percentile luminance under each text box,
    ratio against the text's own computed colour. Worth rebuilding rather than
    trusting a static check whenever text lands on an image.
  - ⚠️ **Those figures are for THIS photo in the feature slot.** The failure came
    from the image's own bright area, not the gradient alone — so reordering
    `insights` (article 1 is the feature) or swapping a photo requires
    re-measuring, not just eyeballing.
- Verified: `npm run lint` (0 errors), `npm run content:check` (clean),
  `npm run build` + prerender (68 routes), all four images returning 200 as AVIF
  with correct natural sizes, and an asset+link integrity scan of `dist/` —
  **3,730 internal refs, 0 broken.**

## Mobile nav trigger: morphing hamburger — 20-08-2026
NOT a phase. Clinton supplied the Uiverse.io (JulanDeAlb) hamburger and asked
for it on the small-screen navbar. New `src/components/navbar/HamburgerIcon.jsx`
+ `.hamburger-icon*` in theme.css; wired into `MobileNav.jsx` at both the
trigger and the panel's close button.

- **Controlled, NOT the snippet's `<input type="checkbox">`.** The overlay's
  open state already lives in `MobileNav` and is closed by Escape, the
  backdrop and navigation as well as by this control — a self-owning checkbox
  is a second source of truth that desyncs on every one of those paths. It
  also has to stay a real `<button>` for the existing `aria-expanded` /
  `aria-controls` / focus-restore wiring. The icon reads `data-open`, written
  from that state, so it can never disagree with the panel.
- **`stroke: currentColor`**, so it inherits `text-canvas` / `hover:text-ember-200`
  like every other icon there and no raw colour enters theme.css.
  `--dur-slow` (420ms) `--ease-inout`, not the snippet's 600ms: this is a
  tap-tier control and 600ms outruns the panel's own `--dur-base` slide.
- ⚠️ **The dash numbers ARE the animation.** The long path is one continuous
  S-curve; `12 63` windows the top bar out of it, and `20 300` at offset
  `-32.42` slides that window onto the diagonal that the svg's `-45deg`
  rotation lands as the X. Editing `d` without re-deriving them leaves a
  stroke ending mid-air.
- **The same component is the panel's close button, mounted in the open
  state** — that's the half of the morph the trigger can't show, since the
  full-width panel covers it while open. The `X` import is gone.
- **Reduced motion needs no branch**: only transitions are involved, so
  §9.6's floor collapses them and the icon lands on its correct END state.
  Verified via `Emulation.setEmulatedMedia`: X fully formed, 0 running
  animations.
- ⚠️ **The in-app preview pane CANNOT verify this** — `visibilityState:
  "hidden"` there freezes the transition mid-flight, so computed styles read
  the previous state indefinitely and it looks like the CSS never applied.
  Verified in a real Chrome over CDP (`visibilityState: "visible"`): sampling
  every 70ms through both directions shows the transform stepping
  `identity → …0.87/-0.49… → 0.707/-0.707` and the dasharray `12,63 →
  17.2,217 → 20,300` with the offset tracking to `-32.42`, then the exact
  reverse on close, settling precisely on both end states.
- `npm run lint` (0 errors; the one warning is the pre-existing unused `site`
  import in `MegaPanel.jsx`), `npm run build` + prerender (68 routes,
  unchanged).

### Follow-up: the sheet itself — surface, asymmetric slide, row cascade
Same session. Clinton: "make the sidebar of small screen look premium, smooth in
opening." The panel was a flat `bg-ink-950` rectangle sliding 280ms in both
directions with no content motion — the flattest dark surface left on the site,
and the one thing a phone visitor looks at with nothing else on screen.

- **Surface (`.mobile-sheet`, theme.css)**: directional wash over ink tokens, a
  hairline left edge, §6.4's inset light-catch, and a cast shadow so the sheet
  reads as lifted rather than pasted on. Plus `.grain` (§7.4) and ONE quiet
  `ArcRings` pair bled off the top-right corner. **No `backdrop-filter`** — §7.5
  keeps blur exclusive to the sticky nav, and a full-height blur surface is the
  most expensive thing you can hand a phone compositor mid-transition.
  - `ArcRings` is given `[z-index:-1]`, not its own `z-index: 0`: a positioned
    z-0 layer paints ABOVE in-flow text, which is why every other call site has
    to remember `relative` on its content wrapper. At -1 inside the sheet's
    `isolate` there is nothing to remember. Unique `gradientId` as always.
- ⚠️ **`translate`, NOT just `transform`, in the transition list.** Tailwind
  v4's `translate-x-*` utilities compile to the INDIVIDUAL `translate`
  property, so the first version — `transition: transform …`, replacing
  Tailwind's own `transition-transform` — animated nothing and the sheet
  teleported. Caught by reading `getComputedStyle(panel).translate` over CDP,
  not by looking at it. Same family as the `rotate-[135deg]` trap recorded above.
- **Enter and exit are asymmetric on purpose**: open is `--dur-slow` (420ms)
  decelerating, close is `--dur-base` accelerating, and the scrim's exit is
  `--dur-fast`. A transition is governed by the state being transitioned TO, so
  the `[data-open="false"]` rules ARE the exit. Measured: `100% → 67 → 19.5 →
  4.7 → 0.8 → 0` opening, `2.6 → 13 → 38 → 100` closing.
- **Row cascade is one CSS rule, not a motion component per row.**
  `.mobile-sheet-item` rests at `opacity 0 / translateX(14px)`; the open rule
  adds `transition-delay: calc(90ms + var(--i) * 45ms)`. **The delay lives only
  in the OPEN rule** so closing collapses the list at once — unwinding row by
  row would hold the sheet on screen long after the tap.
  - ⚠️ **§9.6's floor collapses durations but says NOTHING about delays**, so
    the cascade would survive reduced motion as a staircase of late-appearing
    rows — worse than the animation it removes. A local
    `prefers-reduced-motion` rule zeroes the delay. Verified: 0s delays,
    instant open, 0 running animations.
  - `Row` deliberately drops its `transition-colors` utility and the item rule
    carries the colour leg instead: a later `transition` utility replaces the
    shorthand wholesale and kills the cascade.
- `overscroll-contain` on the scrolling nav so a flick at the end of the list
  doesn't chain to the page behind it.
- Verified in a real Chrome over CDP at 375px (the in-app pane freezes these
  transitions mid-flight — `visibilityState: "hidden"`): the slide, scrim and
  per-row cascade all stepping through real intermediate values; reduced motion
  clean; `scrollWidth === 375`; 0 console errors. Lint 0 errors, build +
  prerender 68 routes.

## Desktop mega panel: surface + enter/exit motion — 20-08-2026
NOT a phase. Clinton: make the large-screen dropdown premium. Run against
Emil Kowalski's design-engineering framework (the `emil-design-eng` skill), so
every value below is the answer to one of its questions rather than a guess.

- ⛔ **The panel had NO entrance or exit animation at all** — `openKey === key &&`
  mounted ~30 links on one frame and unmounted them on another. That, plus a flat
  `bg-ink-900`, was the whole of "it looks plain". Now `AnimatePresence` +
  `motion.div` in `Header.jsx`: **enter 180ms, exit 120ms**, both `--ease-out`
  (`cubic-bezier(0.22,1,0.36,1)`), from `translateY(-6px) scale(0.995)` with
  `origin-top` — it drops OUT of its trigger, and never from `scale(0)`.
  - Framework, applied: frequency is "occasional-to-often" → a short animation,
    under the 300ms UI ceiling and inside the 150–250ms dropdown band; the
    element is ENTERING → `ease-out`, never `ease-in`; exit is faster than
    enter.
  - `transform` is animated as a **full string**, not motion's `x`/`scale`
    shorthands, which run on the main thread via rAF rather than being
    hardware-accelerated.
  - ⚠️ **`pointerEvents: "none"` in the exit variant is load-bearing.**
    AnimatePresence keeps the panel mounted for the exit's 120ms, and without
    it a cursor crossing a closing panel hits `onPointerEnter` → `hoverOpen`
    and reopens it. Verified closing: `aria-expanded` false, opacity
    `1 → 0.13 → 0`, unmounted by ~180ms.
  - Reduced motion drops the transform legs and keeps only the opacity fade
    (§9.6 plus `useReducedMotion`), which is what reduced motion should mean —
    gentler, not nothing. Verified via emulated media: `transform: none`
    throughout, 0 running animations.
- **`.mega-panel` (theme.css)** gives the panel the surface every other dark
  surface already has: directional ink wash, §6.4 inset light-catch, deeper cast
  shadow, `.grain`, and one quiet `ArcRings` pair bled off the bottom-right.
  Same construction as `.panel-dark` / `.mobile-sheet` rather than a fourth
  recipe. No `backdrop-filter` — §7.5 keeps blur on the header bar itself.
  `gradientId` is derived from the panel's own `id`, since `url(#id)` resolves
  document-wide and both panels can be in the DOM during an exit.
- **`.mega-panel-col` cascade is deliberately tiny: 22ms per column** (~110ms
  across the widest panel, inside the container's own 180ms). Stagger guidance is
  30–80ms, but this is a nav opened tens of times a day, where a visible stagger
  reads as lag; it exists only so six columns don't snap in as one block.
  - ⚠️ **Same delay trap as the mobile sheet**: §9.6's floor collapses
    durations, not delays, and with `animation-fill-mode: backwards` a column
    would sit invisible through its delay. Zeroed under
    `prefers-reduced-motion`.
- **Link rows are now real targets, not colour-only.** `-mx-2 px-2` claws back
  the column padding so the tint spans the column rather than floating inside
  it, at `ink-700/45` — lighter than the column's own `ink-800` hover so the two
  levels read as nested. Contrast computed over the exact composite: **8.48:1**
  resting (ink-200) and **15.18:1** hovered (canvas). The column indicator bar
  went from `transition-all` to `transition-[transform,opacity]`.
- ⛔ **Fixed a live non-negotiable violation, unrelated to the polish: the DSC
  promo's CTA carried `text-white` on the primary (ember) button** — 3.13:1,
  the exact combination CLAUDE.md's first non-negotiable forbids. Override
  removed; verified rendering `rgb(7, 12, 28)` (ink-950).
- The long-standing unused `site` import in `MegaPanel.jsx` is gone with it, so
  **`npm run lint` is now 0 errors AND 0 warnings.**
- Left as found, deliberately: the working tree's own uncommitted change to the
  column headings (`text-ember-300` → `text-ink-100`, and the `subline` span
  removed). That is a design decision made outside this session, not a
  regression to revert.
- Verified in a real Chrome over CDP at 1440px (the in-app pane cannot be
  trusted here — `visibilityState: "hidden"` freezes both the motion enter and
  the CSS cascade): enter stepping opacity `0.22 → 0.86 → 1` with translate
  `-4.66 → 0` and scale `0.996 → 1`, columns cascading `0.99/0.97/0.92/0.81/
  0.58/0.17` mid-flight, exit and unmount as above, both panels' screenshots,
  1 arc instance per panel, no new duplicate gradient ids (the one dupe is the
  pre-existing `cta-arc-fade` already recorded), 0 console errors.
  `npm run lint`, `content:check`, `build` + prerender (68 routes) all clean.

## CIN + registered address published — 20-08-2026
Clinton supplied both, so **CIN and the registered street address came OFF
CONTENT-PLAN.md §1.1's hold list.** `nav.js`'s own header comment listed both as
never-render and has been corrected — read it before assuming anything else on
that list has moved; nothing else has (GSTIN, year established, office hours,
client count, years of experience, team names, fees all still held).

- **`site.cin` + `site.registeredAddress`** (nav.js). The address is stored as
  PARTS as well as a pre-joined `full`: the footer prints the parts across
  lines, schema.org needs `streetAddress`/`postalCode` separately, and the
  postcode is held twice on purpose — `636007` for schema, `636 007` for
  display.
- **Footer, two placements, both deliberate.** The address goes in the
  "Get in touch" column under a mono "Registered office" label, as a real
  `<address>` element (`not-italic` — the UA default italicises it). CIN goes
  in the bottom bar beside the copyright, not in the contact column: it is a
  statutory identifier in the same register as the legal links opposite it.
  Both mono + `tabular-nums` so the digits align and neither reads as prose.
- ⚠️ **First pass put both labels at `ink-400`, which measures 2.86:1 on the
  footer's ink-950 and fails AA** — the exact colour Phase 10 already
  fixed sitewide for this reason. Now `ink-300` (5.53:1). `ink-400` is not a
  body-text colour on dark in this codebase; treat it as decorative only.
- **`localBusinessJsonLd()` now carries the real `streetAddress` and
  `postalCode`**, since the footer states them on all 68 routes and schema
  asserting less (or more) than the visible page is a defect. Still no `geo`
  coordinates — never supplied. Verified in the built `dist/index.html`.
- Verified in a real Chrome over CDP at 1440px and 375px: address renders as
  five lines with the correct content, CIN reads `CIN U69200TZ2025PTC035876`,
  `scrollWidth` equals the viewport at both widths, 0 console errors, lint
  clean, build + prerender 68 routes.
  - **Pre-existing, cosmetic, not introduced here:** at 1440px the ScrollNav
    disc clips the last ~4px of the footer's `thinkorange.in` link while that
    row is mid-scroll. `elementFromPoint` confirms the link is still hittable,
    and CLAUDE.md already accepts this class of overlap for fixed controls
    over scrolling content. (The same probe reports the first link in each
    footer column as "blocked" — that is the column's own gradient rule span
    under the hit point, also pre-existing and unrelated.)

## Contact page: whole-dark theme + real office map — 20-08-2026
NOT a phase. Clinton supplied a dark reference layout (form left, details right)
and the Google Maps share link for the office, asking for a premium dark
treatment in THIS palette rather than the reference's green one.

- **The page is now dark end to end**: `deep` hero → `dark` body → `deep`
  footer. The body section is **`dark` (ink-900), not `deep`** — a `deep`
  section directly under the `deep` hero is a consecutive-surface repeat (the
  property the cadence audit checks on `section[data-surface]`) and would read
  as one unbroken slab with no seam at the fold. Measured off the live DOM:
  `deep → dark`, zero consecutive repeats. `surface-ambient` is on the section
  for §7.2 compliance (dark sections "are not flat #0B1329"); `Section` already
  supplies `.grain`.
- ⛔ **The form is NOT a light card dropped on an ink page.** `Input`, `Select`
  and `Textarea` gained an additive **`tone` prop** (default `"light"`, so all
  ~6 other call sites — Partner With Us, EnquiryCard — are byte-identical), and
  `ContactForm` threads it through. `tone="dark"` swaps the surface for
  **`.field-dark`** in theme.css: ONE definition of the dark recess shared by
  all three primitives, same reason `.card-dark` is a single class. Same
  construction as `.panel-dark` (directional ink wash + §6.4 inset light-catch),
  no `backdrop-filter` — §7.5 keeps blur on the sticky nav, and a form is the
  last place to hand a phone compositor a stack of blur surfaces.
  - ⚠️ **`.field-dark` is UNLAYERED CSS, so it beats Tailwind's `@layer
    utilities`** — that is why it also owns the focus ring (`focus-visible:ring-2`
    would be overridden) and the transition list. Verified rendering: ember
    border at 60% + a 2px ember ring on focus.
  - **`.field-dark option, optgroup` pins the native list to the LIGHT palette.**
    The `<option>` popup is drawn by the OS, not by us; without this some
    engines render white-on-white on a dark `<select>`.
  - Labels `ink-100`, values `canvas`, placeholders `ink-300`. **Never `ink-400`
    as text on dark** — Phase 10 measured it at 2.86:1 and fixed it sitewide.
- **Right column carries only confirmed facts.** Phone / WhatsApp / email as a
  hairline-divided row list (ringed ember disc per row — the dark half of the
  filled-on-light / ringed-on-dark pairing the DSC group cards established),
  then the registered address as a real `<address not-italic>`, then the map.
  Office hours are still on §1.1's hold list and are simply ABSENT, not stubbed.
  **The reference's testimonial card is deliberately not reproduced** —
  inventing a quote is the first item on this file's non-negotiables, and
  `testimonials.js` is still the launch blocker it always was.
- **Placeholders are examples only** ("e.g. Ramesh Kumar"); every field keeps its
  real `<label>` per §12.4 — a placeholder disappears the moment you type.

### The map (`MapEmbed.jsx`) — now the real office, and why by coordinates
- `site.registeredAddress` gained `placeName` / `mapsUrl` / `mapsQuery`. The
  short link Clinton supplied resolves (checked, not assumed) to **Balaji
  Towers, `11.6685447,78.1513129`** — which matches the founder-confirmed
  street address already in that object, so the two corroborate each other.
- ⚠️ **The pin is dropped on lat/lng, NOT on the address string.** Geocoding
  "Ramakrishna Road" puts the marker anywhere along its length; the coordinate
  pair lands on the building. Verified by screenshotting the bare iframe at
  600×400 — the red marker sits centred on Ramakrishna Rd. `z=17` frames the
  street rather than the district. A `&ll=` variant was tested and is
  unnecessary: the plain `q=` form already centres the marker.
- **`mapsUrl` is used verbatim for a new always-present "Get directions" pill**
  (loaded or not). An embedded map cannot give turn-by-turn directions, and a
  phone visitor wants the native app rather than pinch-zoom inside an iframe.
- Click-to-load is UNCHANGED (CONTENT-PLAN.md §10/§11 both require it — no
  Google iframe or its cookies on page view). `tone="dark"` restyles only the
  placeholder and the frame border; `/about` still renders the light branch and
  picks up the better pin for free.
- ⚠️ **The LOADED map is light grey, and that is left alone deliberately.** The
  keyless `output=embed` endpoint cannot be dark-styled (that needs the JS API
  plus an API key), and `filter: invert()` on the iframe wrecks label legibility
  and every brand colour on the tiles. Click-to-load means the page is dark
  until the visitor asks for the map, which is the honest outcome.
- `className` now sits on a positioned WRAPPER (the pill is absolute inside it)
  rather than on the button/iframe itself. Both call sites pass an aspect ratio,
  which still gives the wrapper its height and the `h-full` child fills it —
  verified 507×317 on contact, 743×464 on about.

### Verification
`npm run lint` (0 errors — one transient error mid-run was ESLint linting the
`dist-server/` bundle a failed prerender left behind; the standing gotcha, not a
real finding), `content:check` (clean apart from the three long-standing
unconfirmed-content warnings), `build` + prerender (68 routes, unchanged). Then a
real Chrome over CDP against `npx serve dist` (never `vite preview`, never the
in-app pane), asserting `innerWidth`/`visibilityState`/`pathname` before
measuring:
- **Pixel-sampled contrast** (read foreground colours FIRST, then inject
  `color: transparent`, screenshot, decode in-page, sample p95/p05 luminance
  under each box): **0 failures across 21 samples**, tightest 5.29:1. A static
  resolver cannot do this page — the surfaces are `color-mix` gradients.
- One `<h1>` at 52px, cadence `deep → dark`, 0 reveals left hidden after a
  step-scroll primed from Node, `scrollWidth === innerWidth` at 1440 and 375.
- **Reduced motion** via `Emulation.setEmulatedMedia`: 0 running animations, and
  the 3 elements reported "mid-opacity" are the hero's static arc (0.12) and the
  two ArcRings paths (0.06/0.10) — decorative, `aria-hidden`, at their designed
  resting weight, not stuck reveals.
- ⚠️ **The stale-Chrome harness bug bit again** (already recorded once): a
  leftover headless Chrome makes `launch()` attach to the OLD browser, and a
  `querySelector` that exists returns null. Randomise the debug port AND the
  profile dir per run, and `pkill -9 -f "Google Chrome --headless"` between
  sessions. Also: `npx serve` DIES when `vite build` replaces `dist/` under it —
  restart it after every rebuild, and the symptom is curl returning `000`.

## Services module: premium pass — 22-08-2026
NOT a phase. Clinton: analyse Home and /dsc, then bring the services pages up to
the same standard — "premium, clean and aesthetic", keep the enquiry form in a
card, and add proper animation. Scope: `ServiceLeaf.jsx` (T2, 31 routes),
`CategoryHub.jsx` (T3, 6 routes), `ServicesHub.jsx` (`/services`) and
`EnquiryCard.jsx`. Run as **Redesign — Preserve**: copy, IA, routes, JSON-LD,
sub-nav anchor ids and the enquiry form's field names and order are all
unchanged, and every string still comes from `nav.js` or the content files.

### Why the pages read as plain — four structural causes, none of them colour
Measured against Home and /dsc rather than judged by eye. "Add more orange"
would not have fixed any of these, and the ember budget was never the problem
(non-CTA folds measured 0.6–1.9% against the ~12% ceiling, before and after).

1. **NO DARK BAND, or one arriving far too late.** `/services` ran
   `deep → light → light → ember` — a genuine **consecutive-surface repeat**,
   the property every other page is audited against, so this was a real bug and
   not only a flat look. `/services/gst` ran six light-family surfaces in a row.
   The T2 leaf reached its first dark band only at section 6. Exactly the
   diagnosis already recorded for /dsc and /about.
2. **AN EYEBROW ON EVERY SECTION** — eight over ten sections on the leaf. The
   most templated rhythm a page can have, and the same thing that made /about
   read as generated.
3. **BARE HEROES.** Flat ink-950 plus the default lone crescent, whose brightest
   part sits behind the fixed header, so it reads as one dull circle that has
   been cut off. No spec row, no aside.
4. **THE SAME LAYOUT FAMILY THREE TIMES.** "Who needs this", "What's included"
   and "Documents required" were all sparse two-column text runs; on T3 the
   intro's navy panel listed every child and the very next section was a grid of
   **the same children**.

### What each page got
- **`components/ui/SectionHeading.jsx` (new)** is DscHub's private
  `GroupHeading`, extracted. Mono index (optional), a hairline rule that DRAWS
  on scroll, then eyebrow / h2 / lede. `DscHub` now consumes it and keeps only a
  thin adapter, so there is ONE definition — same discipline as `.card-dark` and
  `lib/arc.js`. The drawn rule is what lets most sections drop their eyebrow
  entirely: the structure carries the ordering the labels were carrying badly.
  Leaf eyebrow count is now 3 (hero category, StepFlow, FAQ) over 10 sections.
- **`content/services/icons.js` (new)** — one icon per leaf (31) and per
  practice area (6), so a service carries the same mark on `/services`, on its
  category hub and in a related-service card. ⛔ **Always via `serviceIcon()` /
  `categoryIcon()`, never by indexing the map**: consumers map over nav.js, so
  an unmapped slug resolves to `undefined` and `<undefined />` is a hard React
  crash. That exact bug shipped once from `DscBand`'s private map (17-08-2026).
  ⚠️ It is a component-side module under `src/content/` (it imports lucide) —
  never import it from `nav.js`, `lib/seo.js`, or anything the Node scripts
  load. Same caveat as `content/insights/images.js`. Verified `content-check.mjs`
  never touches it: that script imports `services/index.js` and then reads
  `<slug>.js` by name, and `icons` is not a slug.
- **T2 cadence is now `deep → light → dark → light → light-alt → dark → light →
  light-alt → light → ember`** — darks at positions 3 and 6, which is the
  homepage's own rhythm. "Who needs this" is the new band.
- **T2 layout families, now all different:** numbered hairline rows on dark
  (who needs this) / ONE card holding a two-column checklist (what's included) /
  a card per entity-type group (documents) / scroll-linked StepFlow (how it
  works) / a 7/5 table beside a `.panel-dark` panel (timeline).
  - The documents grid is the biggest single lift: up to five groups previously
    ran together as one ~30-row text wall with nothing marking where one entity
    type ended. The group is a real boundary in the data, not a grid invented to
    fill space.
  - The timeline panel's copy is the OLD footnote, moved out of the gutter and
    given the button it was already asking for. No new claim.
- **T3:** the intro's child-list panel MOVED into the hero's `aside` (above the
  fold, and no longer the same list twice); the child grid is the dark band with
  ringed icon-led `.card-dark` links; why-us takes the big-ember-numeral
  treatment in the intro's formerly empty right column. Cadence
  `deep → light → dark → light → light-alt → ember`.
- **`/services`: the rows STAY ROWS, deliberately.** Turning six categories into
  six cards is the tempting move and it is wrong — CLAUDE.md already records that
  §16's tell 7 over-triggered on exactly this page because a multi-column list of
  plain text links is a DIRECTORY, the correct archetype here. What the rows
  lacked was an anchor and a hierarchy, so each leads with its practice-area mark
  and a count, and each child link is a real hairline row. The growth group is
  the dark band, which is what fixes the consecutive-`light` bug.
- **The enquiry form STAYS IN A CARD** (explicit instruction), deliberately
  unlike /contact's borderless `.field-bare` treatment: there the form IS the
  page, so a card outline boxes the whole content; here it is one column beside
  prose, and the card is what marks it as a distinct actionable object.
  `.card-premium` wash, filled ember disc, one quiet `ArcRings` pair, the shared
  `Textarea` in place of the hand-rolled one, and a hairline footer carrying the
  phone fallback. `interactive={false}` is kept — the card is not pressable, and
  Card's hover lift plus corner-arc draw would fight the real controls' focus
  states.

### Four real bugs, every one found by MEASURING rather than by looking
1. ⛔ **`Stagger` silently deleted every divider on the new dark band.** Rows
   measured `border-top-width: 0px` across the board. `Stagger` wraps each child
   in its own `motion.div`, so each row is the ONLY child of its wrapper and
   `first:border-t-0` matched all six. Third occurrence of this family in this
   repo (`md:first:pl-0` on /contact, the zero-gutter /about dark band) — and I
   wrote the warning about it in `CategoryHub` and then walked into it in
   `ServiceLeaf` in the same session. **Fix: plain grid + per-item `Reveal`**,
   which forwards `className` onto the element it renders, so the row IS the
   grid item and `first:` / `nth-child` resolve against real siblings. The same
   trap was live in T3's `WhyUs`.
2. ⛔ **`Button variant="secondary"` on a dark panel was `text-ink-600` on an
   `border-ink-100` outline** — near-invisible text plus a bright white hairline
   on ink-800. `secondary` is `{light, dark}` and defaults to `tone="light"`;
   the dark panel needs `tone="dark"` passed explicitly.
3. ⛔ **At 375px the timeline table put its ENTIRE "Indicative time" column
   off-screen.** `min-w-[480px]` inside a ~327px container behind an
   `overflow-x-auto` a reader has no reason to look for: the table appeared to
   have one column and no timings at all. Now `min-w-[320px]` with tighter
   mobile row padding — two columns of short strings wrap fine in 327px. Found
   by screenshotting the real 375px viewport, not by reading the class.
4. Related-practice-areas rendered a fixed 3-column track for the 2 entries most
   categories have, leaving an empty cell. Now count-aware, and the count is
   derived from the SAME resolved array the cards render from.

### Verification harness — three traps that produced phantom failures
The pixel-contrast sampler is the right instrument for these pages (surfaces are
`color-mix` gradients that no static resolver can evaluate), but it reported 12
failures at 1440 and 24 at 375 that were all artifacts. Each fix is worth
keeping:
- ⚠️ **A pill button's ROUNDED CORNERS expose the page behind it**, so p95/p05 of
  its sampled rect is fiction — it reported the ember CTA at **1.00:1**. Score
  any element with an opaque background STATICALLY against that colour instead.
- ⚠️ **Text clipped by an `overflow-x` ancestor still reports its full rect**, so
  the sample averages the page outside the clip. Skip it.
- ⚠️ **The fixed FAB and ScrollNav sit over the RIGHT EDGE of any full-width
  heading at 375px**, so p05 picked up a dark disc and reported an ink-600 h2 on
  canvas at 1.02:1. Hide `.whatsapp-fab, .scroll-nav, header` in the probe
  stylesheet — CLAUDE.md already treats that overlap as separate and cosmetic.
  An `elementFromPoint` check on the box CENTRE does not catch it; the overlap is
  at the edge.
- Also re-confirmed: `primeReveals` must step from Node awaiting each scroll —
  IntersectionObserver delivers asynchronously, so one synchronous in-page loop
  only ever lets the observer see the final position.

### Measured results
`npm run lint` 0 problems. `content:check` clean apart from the three standing
unconfirmed-content warnings. `build` + prerender clean, and a byte-level check
of the prerendered services HTML: exactly one `<h1>`, all `ld+json` blocks
parse (4/4 on hubs, 5/5 on leaves), a canonical on each, and no `undefined` /
`[object Object]` / `NaN` in any rendered string.

Then a real Chrome over CDP against the dev server (never the in-app pane —
`visibilityState: "hidden"` there suspends IntersectionObserver), asserting
`innerWidth` / `visibilityState` / `pathname` before measuring anything:
- **Pixel-sampled contrast: 0 failures.** 615 samples at 1440px over 6 routes,
  385 at 375px over 4 routes. Tightest 4.64:1 at both widths.
- **Surface cadence off the live DOM, zero consecutive repeats** on all three
  templates (listed above). The `/services` repeat is fixed.
- **Ember per fold**, hue census: worst NON-CtaBand fold is **1.23%**
  (`/services`), **1.28%** (`/services/gst`), **1.89%** (leaf), against `/dsc`'s
  own **1.27%**. Ceiling ~12%. Every fold above that is a CtaBand fold, which is
  the site's one deliberate full-orange band.
- **0 stuck reveals** on all routes after priming. The remaining zero-opacity
  elements are hover affordances (31 on `/services` = one arrow per leaf row),
  distinguished from stuck reveals by having no transform.
- **`scrollWidth === innerWidth` at 375px** on all 7 routes checked, including
  `/` and `/dsc` as regression controls.
- **Reduced motion** via `Emulation.setEmulatedMedia`: 0 running animations, 0
  elements stuck mid-opacity, and `SectionHeading`'s rule renders DRAWN rather
  than absent (`initial={false}`) — it is structure, and a missing divider reads
  as a bug.

### Notes for whoever reads this next
- **Route count is 65, not the 68 this file records above.** `nav.js` has no
  diff in this session (`git status` confirms); the earlier number is stale
  relative to the checked-out tree, not a regression from this pass.
- **Not re-measured: Lighthouse.** These pages gained composited layers
  (`ArcRings` per band) but nothing that touches an LCP element's paint timing.
  That is reasoning, not a measurement — rebuild Phase 10's `_serve-h2.mjs`
  median-of-3 harness before trusting a Performance score.
- **Deliberately NOT used: `SurfaceTexture`.** Its four variants are DSC motifs
  (a guilloché means "certificate"), so one on a services page would say
  something untrue about it — the same call /about made. The heroes take
  `ringsId` instead, which is non-semantic and already endorsed.
- All CDP/audit scripts lived in the session scratchpad and are gone; nothing
  was added under `scripts/`.

## One section-header pattern sitewide — 22-08-2026
NOT a phase. Clinton, immediately after the services premium pass: "keep the
section heading same throughout the website i.e.: LABEL (eyebrow component) /
Heading / Subheading (if there)."

**`components/ui/SectionHeading.jsx` is now THE section header for the whole
site.** 47 call sites across 24 files. ⛔ **Do not hand-roll
`<Eyebrow> + <h2 className="mt-3 text-h2">` in a page again** — that pair was
duplicated in ~30 files with four different heading measures and three
different lede spacings, which is exactly the drift this component ends.

### Two decisions Clinton made before the work started
1. **The drawn hairline rule and the mono index are OPT-IN, not part of the
   standard.** The standard is exactly the three parts he listed. `rule` /
   `index` stay available and are used only where sections genuinely form a
   sequence: the DSC menu groups and the /services statutory-vs-growth split.
   Turning them on everywhere would have put a number on ~30 sections whose
   order carries no meaning, and added a visible new line above every one.
2. **Sections with no label get one written.** Short, plain, derived from the
   section's own existing content. Every one is listed below so the wording can
   be corrected.

### The labels that are NEW copy (nothing else on the site changed wording)
- `/about` — **"Who we are"** (over `site.positioning`), **"Our approach"**
  (over "What sets us apart"), **"Where we are"** (over `site.location`).
- `/about`'s StepFlow — **"How we work"**. It was passing no `eyebrow` at all,
  so it was the one genuine gap the header audit found rather than an exclusion.
- `/contact` — **"Send a message"**. ⚠️ **This reverses a recorded decision.**
  CLAUDE.md's 21-08-2026 contact entry says that page runs "EXACTLY ONE EYEBROW
  … the old version had three ('Get in touch' / 'Send a message' / 'Reach us
  directly')". The sitewide instruction supersedes it, and only ONE of the three
  came back — "Where we are" is left alone as a sticky panel title beside the
  form. If /contact should stay minimal, this is the line to remove.
- `/services` group headers — **"Services"** on both groups.

### Where an existing label was PROMOTED rather than a sentence invented
Three sections carried a label and no heading. The existing string became the
heading and a plain category word became the label, so the structure is
satisfied with no new claim: `WhoWeWorkWith` ("Clients" / "Who we work with"),
`WhyThinkOrange` ("Why us" / "Why ThinkOrange"), `DscHub`'s why-us row
("Why us" / "Why ThinkOrange").

### Services eyebrows are RESTORED, not invented
The 22-08-2026 premium pass had stripped them under the "max 1 eyebrow per 3
sections" rule. The five on a T2 leaf are back and they are the ORIGINAL
strings, which is what makes them earn their place here: **they are the six
sub-nav labels**, so each one names the anchor the sticky bar above jumps to.

### What is deliberately NOT a section header
Recorded in the component's own docblock, and the header audit treats each as a
pass rather than a gap:
- `PageHero`'s eyebrow/h1 and the homepage Hero's (page headers, not sections)
- `CtaBand`'s `display-lg` h2 (the one full-orange band, DESIGN.md §11.11)
- Card and panel titles: `EnquiryCard`, the DSC enquiry strip, `Footer`'s mono
  column labels, `CategoryHub`'s "In this category" and "Why ThinkOrange" rail
  labels, `/dsc`'s hero aside, Article's "Services in this article"
- Prose headings inside article and legal body copy
- **The opening prose block directly under a hero has no header at all** and
  that is consistent, not an oversight: `/dsc`'s intro, `CategoryHub`'s intro
  and the T2 leaf's overview all lead with a lead paragraph.

### Implementation notes worth keeping
- **`FaqSection`, `StepFlow` and `ComingSoon` now render through
  `SectionHeading` too**, so there is one definition rather than four. Their
  narrow 4-col rails are the one legitimate measure override
  (`headingClassName="max-w-[18ch]"`, `ledeClassName="max-w-[42ch]"`); the
  standard 32ch/68ch would run past the column edge.
- **`reveal={false}` where a call site already sits inside a `<Reveal>`.**
  `SectionHeading` reveals itself by default, and double-wrapping installs a
  second IntersectionObserver and stacks the delays.
- **`Testimonial` needs `className="flex flex-col items-center"`** because that
  section is centred: without it the wrapper div stretches and `Eyebrow`'s own
  flex row aligns left inside it.
- **`DscBand`'s band-2 header passes the short ember rule as `children`**, so it
  stays part of the header instead of becoming a floating sibling. `as="h3"` +
  `headingClassName="text-h3"` works only because `lib/cn.js` declares the
  semantic font-size scale into twMerge's `font-size` group — without that fix
  `text-h3` would be classified as a COLOUR and lose to `text-h2`.
- `FaqSection` gained an unused-but-present `dark` prop, so a future dark FAQ
  cannot forget it and ship an ink-500 lede on ink-900 (~1.5:1).

### Two harness traps this pass added to the pile
- ⚠️ **The auto-import helper inserted `import …` INTO the middle of a
  multi-line import block** (`import {` … `} from`), because "last line starting
  with `import `" is not the last import. It produced a parse error that reads
  like a syntax bug in the component. Anchor on the closing `} from "…";` line.
- ⚠️ **A contrast sampler must check BOTH axes for a clipping ancestor.** A
  collapsed accordion panel is `overflow:hidden` at 0 height and its links still
  report a full rect, so a horizontal-only clip check let four invisible FAQ
  rows through and measured the surface behind them. Cost four phantom failures
  at 375px.

### Verified
`npm run lint` 0 problems, `content:check` clean, `build` + prerender 65 routes,
and the prerendered HTML for 5 representative routes has exactly one `<h1>` and
no `undefined` / `[object Object]` in any rendered string.

Real Chrome over CDP against the dev server, asserting
`innerWidth`/`visibilityState`/`pathname` first:
- **A dedicated header-structure probe** walked every `main section` on 16
  routes and reported the (label, heading, lede) triple for each. Every section
  header carries a LABEL; the only headings without one are the exclusions
  listed above, each confirmed by name.
- **Pixel-sampled contrast: 923 samples at 1440px over 10 routes, 793 at 375px
  over 8 routes. 2 failures at 1440, 1 at 375 — all PRE-EXISTING and in files
  this session never opened** (see below).
- `scrollWidth === innerWidth` at 375px and exactly one `<h1>` on all 12 routes
  checked. Reduced motion via `Emulation.setEmulatedMedia`: 0 running
  animations and 0 elements stuck mid-opacity on 4 routes.

### ⚠️ Two pre-existing contrast failures, NOT introduced here, one deliberate
1. **`Chip`'s `active` variant is `bg-ember-400 text-white` — 3.15:1 measured**,
   which is the exact pairing CLAUDE.md's first non-negotiable forbids and which
   Phase 10 had already fixed once. It was changed back, and `Chip.jsx` carries
   the line **"Do not change this white text in active at all"**, so it was left
   alone. It renders on the homepage compliance-calendar filter row. Flagged,
   not touched.
2. **The homepage hero eyebrow measured 3.96:1** over the animated DarkVeil.
   `Hero.jsx` is untouched this session (`git status` confirms). Phase 10 sampled
   the hero across FOUR animation phases for exactly this reason — the veil
   moves, so one frame proves nothing. Re-measure multi-phase before acting.

## Per-practice-area hero textures; hero spec row removed — 22-08-2026
NOT a phase. Clinton: "in hero section i want different background texture for
each service group list gst, itr filling, so on. and remove the 4 stats given
from the hero section." Then, on the first cut: "improve the texture design,
now it looks simple and not looking good, make more complex and premium type."

### The spec row is gone from the services templates only
The four derived tiles (`Practice area / Process / Documents / Professional
fees` on a leaf, `Services / Practice area / Delivered from / Professional
fees` on a hub) added by the 22-08-2026 premium pass are removed from
`ServiceLeaf`, `CategoryHub` and `ServicesHub`. ⚠️ **`/dsc` and `/about` still
render theirs** — they came from their own earlier passes and were not part of
this instruction. Say the word and they go the same way.

### Six new motifs, one per practice area
`src/content/services/textures.js` maps category slug -> variant, and **a leaf
inherits its CATEGORY's motif**, so all five GST pages share one and all four
Income Tax pages share another. That is what makes the texture read as "which
part of the practice am I in" rather than as decoration that changes at random.

    gst                       cadence   two-scale radial dial   (circular marks)
    income-tax                strata    double horizontal rules (horizontal)
    business-setup            frame     nested squares + marks  (rectilinear)
    registrations-licences    emboss    rim + inner guilloché   (concentric)
    accounting-audit          column    ruled ledger columns    (vertical)
    tenders-finance           ascent    graduated diagonals     (diagonal)

- **`/services` deliberately gets NO texture** and keeps its arc rings: it is
  every practice area at once, so no single motif is true of it.
- ⛔ **The four DSC variants are NOT reused.** Those mean something specific —
  a guilloché says "certificate", a flourish says "eSign" — so putting one
  behind a GST page would assert something untrue about it. Same reasoning that
  kept textures off /about entirely.
- `textures.js` is plain strings with no imports, so it is safe anywhere,
  unlike `icons.js` which imports lucide and is component-side only. **Do not
  merge the two.** Both go through a helper with a fallback; never index them.

### ⚠️ "Complex and premium" is NOT a reversal of the 20-08-2026 "cheap" note
That note was about FIGURATIVE illustration at high opacity — a USB-token
silhouette, circuit pads, a dashed signing rule, i.e. clip-art of the subject.
Richness is a different axis. These are built the way security-print engraving
is: many fine strokes in graduated weights, layered, at LOW opacity. **The
complexity is in the layer count, never in the brightness**, and no motif
depicts its subject. Each is the same four-layer scaffold, so they read as one
family while layer C tells them apart:

    A  anchor      one wide, very low-opacity arc — mass, not line
    B  guilloché   graduated fine concentric arcs (shared `<Guilloche>`)
    C  signature   the distinguishing primitive
    D  echo        a small bracketing cluster, the device CtaBand's corner echo
                   already established

⚠️ §3.1: the `<Echo>` groups are **translate + POSITIVE scale only**. Never a
negative scale — a mirrored crescent is a different shape, and the point of
`lib/arc.js` is that the site repeats exactly one.

### `placement` is derived, and it was a real bug on the first cut
`PageHero`'s optional `aside` is an opaque `.panel-dark` filling the right
half, so a top-right composition on a hero that HAS one is almost entirely
behind the panel — measured on the first pass, only the outer arc and a few
tick ends survived, which is most of why Clinton said it looked simple.
`SurfaceTexture` gained a `placement` prop (`default` top-right, `left`), and
**`PageHero` derives it from `Boolean(aside)` rather than letting a call site
pass it**, so a template cannot pair the two wrongly. Category hubs (which have
the aside) get `left`; leaves (which do not) keep top-right.

Only the six service variants are placement-aware — they take an `svgClass`
prop. The four DSC variants ignore it and keep their hand-tuned positions.

### Two JSX-syntax traps, both cost a build
- `{/* … */}` is only valid in **child** position. Between JSX **attributes**
  you need a bare `//` comment (what the rest of this codebase uses), and
  inside a **ternary branch** (`{textured ? ( … ) : …}`) you need a bare
  `/* … */` block comment, because the branch must be a single expression.
  Both produced "Unexpected token" errors that read like a broken component.

### Verified
`npm run lint` 0 problems, `content:check` clean, `build` + prerender 65
routes. Prerendered HTML for 4 routes: texture present on the hub and leaf,
absent on `/services`, **`hero-spec` count 0 everywhere**, one `<h1>`, no
`undefined` in any rendered string.

Real Chrome over CDP, asserting `innerWidth`/`visibilityState`/`pathname`
first:
- **Geometry fingerprint, not shape counts.** A count-based check reported
  `strata` and `ascent` as identical (both 6 lines) — the fingerprint has to
  hash the actual `d` / `x1,y1,x2,y2` attributes. All six hash distinctly, and
  a leaf correctly matches its own category's hash.
- Rules **terminate exactly on the crescent**, verified against the circle
  equation: `strata`'s first rule starts at x=81 for y=96 on r=158
  (200-√(158²-104²)=81.1); `column`'s at y=77 for x=92 on r=164 (76.6).
- **Pixel-sampled contrast over the hero folds: 0 failures, 178 samples,
  tightest 5.01:1.** Full-page re-sweep afterwards: 0 failures at 1440px (381
  samples) and 375px (281 samples), tightest 4.64:1 at both.
- **Ember coverage on the hero fold: 1.25–1.28% per route, against `/dsc`'s own
  1.29%** and a ~12% ceiling. The layering adds no colour weight, which is the
  measurable proof that "complex" was done through stroke count rather than
  brightness.
- `scrollWidth === innerWidth` at 375px on all 10 routes checked.
- **Reduced motion**: 0 running animations, texture wrapper transform `none`,
  and the texture still RENDERS — it is static line work, so removing it under
  reduced motion would be wrong.
- **Duplicate gradient ids: only `cta-arc-fade`**, the pre-existing `CtaBand`
  defect this file already records, present on `/` and `/dsc` equally. Every
  new texture id is unique per mounted instance.

### Follow-up: "What's included" is out of its card — 22-08-2026
Clinton, on the T2 leaf: "fixed the design of this section do not put inside
card." Two things were wrong and only one of them was the card.

1. **THE CARD.** A list of short title+body pairs does not need elevation:
   nothing in it is pressable and nothing is a separate object, which is
   DESIGN.md's actual test for reaching for a card. On the 1800px container it
   read as a large empty white box with the content floating at the top.
2. ⛔ **THE RAGGED GAPS, which the card only made obvious.** The list was a
   two-column CSS **GRID**, and a grid aligns items into ROWS — so every item
   was stretched to the height of the tallest one beside it, which is why a
   two-line entry sat above a lake of white space when its neighbour ran to
   five. **Switched to CSS MULTI-COLUMN**, which has no row alignment at all:
   items pack against each other and the rhythm is even down both columns
   whatever the copy does. `break-inside-avoid` stops an item splitting across
   the gap. Measured: `maxGapWithinColumn` is **0** on every leaf checked.

Details worth keeping:
- **The rule sits on TOP of each item, not the bottom.** With two columns of
  unequal length a bottom rule leaves a hairline dangling under the shorter
  one; a top rule terminates cleanly by construction.
- **Reading order changed from row-major to column-major and that is an
  improvement, not a regression.** DOM order is untouched (source order 1-8),
  so assistive tech is unaffected; visually the left column is now items 1-4
  instead of 1,3,5,7.
- ONE `Reveal` around the whole list, never per item — a dozen lines resolving
  one by one while a reader is reading them is what "body copy never animates"
  protects against.
- ⚠️ The text moved from a `bg-white` card onto the `canvas` section, which is
  slightly darker, so every ratio in here shifted down. Re-measured rather than
  assumed: **0 failures across 54 samples, tightest 9.77:1.**
- Verified on four leaves with 6 and 8 items: no card, 2 columns, zero
  within-column gap; at 375px it collapses to one column with no overflow.
  `npm run lint` 0 problems, `content:check` clean, build + prerender 65
  routes, and the prerendered HTML confirms no `card-premium` wrapper and the
  multi-column class present.

### Follow-up: "Is this you?" rebuilt on oversized numerals — 22-08-2026
Clinton, on the T2 leaf's dark band: "fixed the design of this make it look
more premium." Two problems, and the second one I had introduced myself an hour
earlier.

1. ⛔ **SECTION-LAYOUT-REPETITION I CREATED.** The moment "What's included"
   below became a two-column ruled list, this band was the SAME layout family
   two sections apart on one page. It is now DESIGN.md §11.4's oversized-mono-
   numeral archetype (what `WhyThinkOrange` uses on the homepage): the numeral
   carries the separation instead of a hairline, so the two blocks read as
   different treatments rather than one printed twice. **Worth remembering that
   fixing one section can break a neighbour's distinctness** — check the
   families on the whole page after changing any one of them.
2. ⛔ **THE SAME RAGGED-GAP BUG, third occurrence.** This was still a
   two-column CSS **grid**, which aligns items into ROWS, so a one-line
   statement was stretched to the height of the two-line one beside it — the
   lake of white under row 03 in Clinton's screenshot. CSS multi-column again.
   Measured `maxGapWithinColumn: 0` on every leaf checked, including a 5-item
   one where the columns balance 3+2.

**The numerals are `aria-hidden` but their colour was still measured**, per the
standing lesson that `aria-hidden` means "not announced", not "exempt from
contrast" — they are 26px glyphs a sighted reader uses to count. ember-400 on
the ambient ink-900 band measures **5.85:1**, clear of the 4.5:1 floor.
Statements moved ink-200 -> ink-100 at `text-body-lg` and measure **14.19:1**:
at this size they are the section's content, not supporting copy.

The per-item `Reveal` stagger is gone — one `Reveal` around the list. Six
statements resolving one by one is what "body copy never animates" protects
against, and the old code was doing exactly that.

Verified: 4 leaves (6-item and 5-item), 2 columns, zero within-column gap;
375px collapses both lists to one column with no overflow; full-page contrast
**0 failures at 1440px (351 samples) and 375px (171 samples), tightest
4.64:1**; reduced motion 0 running animations, 0 stuck, both lists at opacity
1. Lint, `content:check`, build + prerender 65 routes clean, and the
prerendered HTML confirms the multi-column class with no leftover row rules.

### Follow-up: "Documents required" loses its cards too — 22-08-2026
Clinton: "it is not looking good keep the layout as it is. do not show in card
view." Third card removal on this template, and the pattern is now clear:
**this page does not want card surfaces on its content sections.**

- ⛔ **I argued for keeping the card here and was overruled.** My reasoning was
  that these groups are mutually exclusive — a reader needs "Every applicant"
  plus the ONE group matching how they are constituted — so the card edge said
  "this set, not that set". It was a real argument but the wrong call: the
  column break plus the ruled group header carry that boundary perfectly well,
  and the boxes were the thing making the section look heavy. Recorded so the
  next person does not re-derive the same argument and put them back.
- **Layout is unchanged**, as asked: same three columns, same order, same
  group headers with their ember count. Only the card surfaces are gone
  (`cardLikeBlocks: 0` measured — no background, no border, no shadow on any
  group block).
- It had ALREADY been switched from grid to CSS multi-column in the same
  session, which is what fixes the two visible defects behind the complaint: a
  grid stretched the 3-item Proprietorship block to match the 6-item one beside
  it, and a 5-group leaf left a hole in the second row of a 3-column track.
  Multi-column packs by height — measured 5 groups across 3 columns as 1/2/2
  with no empty cell.
- Column gap widened `gap-x-5` -> `gap-x-14` and the per-group gap moved to
  `mb-10`: with no card edge, whitespace is the only thing separating one
  group from the next, so it has to do more work. ⚠️ Multi-column `gap` sets
  the COLUMN gap only — the gap between stacked items must be `mb-*` on the
  item.

Verified: text moved off a `bg-white` card onto `canvas-alt`, so every ratio
shifted down and was re-measured rather than assumed — **0 failures across 100
samples, tightest 4.64:1**, including the `aria-hidden` ordinals and counts
(aria-hidden means "not announced", not "exempt from contrast"). 375px
collapses to one column with no overflow. Lint, `content:check`, build +
prerender 65 routes all clean.

### Follow-up: Timeline & fees rebuilt on the DSC pricing pattern — 22-08-2026
Clinton: "for the timeline and fee section, create something similar to dsc
pages pricing section."

`DscProduct`'s pricing section is three beats — heading, then ONE paragraph
with the CTA beside it, then a hairline-topped content row — and no box
anywhere. The leaf now runs the same three beats.

What went:
- **The bordered white table.** `bg-white` + border + radius is a box by
  another name, and this was the fourth such surface on the template.
- **The `.panel-dark` "Get it in writing" panel.** Its copy was the one line a
  reader needs to act on, so it IS the paragraph now, sitting beside the CTA
  exactly as DSC's does. Copy unchanged.

⚠️ **`<dl>`, not `<table>`, and that is what makes the layout work.** The data
is stage -> duration pairs, which a description list expresses just as
correctly — and unlike a table a `<dl>` can be laid out in COLUMNS. A
two-column table stranded at a third of an 1800px container with a lake beside
it was the actual reason that section always needed a panel to fill the space.
Multi-column also packs by height, so no row is stretched (`timelineMaxGap: 0`,
5 rows over 2 columns at 1440, 1 column at 375).

**"Professional fees / On request" is pulled OUT of the list** and given
`text-h4` weight above its own rule. DSC makes "On request" its entire section
heading; this is the same decision — `fees` is null on every leaf and the
honest answer is the point, not a footnote. Measured 4.97:1 (ember-600 on
canvas, 18px).

Nothing in the section animates except the paragraph and its CTA: tables and
body copy never animate, and this is the section a reader checks a date
against.

The CTA uses `whatsappHref()` from `lib/whatsapp.js` and tabler's
`IconBrandWhatsapp` with `variant="tertiary"` — the same three pieces
`DscProduct`'s pricing CTA already uses, rather than a fourth local copy.

### ⛔ Related services KEEPS its card — asked for, then reverted, then kept
Sequence worth recording so nobody re-litigates it: I offered to strip the
cards from Related services and the enquiry form, Clinton said "okay apply", I
converted Related services to hairline link columns, and he then said "for
related service keep in card view only". **Reverted; the cards are back.**

The principle that survives it: **the four sections that lost their cards are
STATIC CONTENT; the two that keep them are INTERACTIVE.** Related-service items
are links and the enquiry form is a form, so in both the card edge is the
affordance saying "this is a thing you act on" — which is the hierarchy
DESIGN.md's elevation rule is actually about. Do not "tidy" either one to match
the other four. (The enquiry card was never in scope anyway: Clinton's original
services instruction was "for any enquiry form for this pages i want to keep in
card". My offer to remove it contradicted that and should not have been made.)

Card audit on the finished leaf: exactly ONE card surface outside links and
buttons — the enquiry card. Everything else flagged by the detector is a form
input or an ember icon disc inside a link.

Verified: full-page contrast **0 failures, 344 samples at 1440px and 163 at
375px, tightest 4.64:1**; related-service action rows on a single baseline at
1440 (three at 375, correctly, one card per row); no horizontal overflow at
either width; reduced motion 0 running animations and 0 stuck; lint,
`content:check`, build + prerender 65 routes all clean.

## Bug fix: reveals stopped animating on in-app navigation — 22-08-2026
Clinton: "reveal effect is not working when i change route in between services
pages." Real bug, sitewide, and it affected every template that serves more
than one route — not just service leaves.

### Root cause
**React reconciles by element TYPE and POSITION.** Two service leaves are two
different routes, but both render `<ServiceLeaf>` at the same depth of the
route tree, so React kept the SAME component instance across the navigation and
only changed its props. Every `useInView(..., { once: true })` latch inside
`Reveal`, `Stagger` and `SectionHeading` therefore survived already flipped to
true: the new page's content appeared fully opaque with no reveal at all, and
scrolling never triggered anything because there was nothing left to trigger.

⚠️ It is NOT a scroll-restoration problem — `RootLayout` has had a
`window.scrollTo(0, 0)` on `pathname` since Phase 9 and it works. That was the
first hypothesis and measuring killed it.

### Measured, before and after
`/services/gst/registration` -> `/services/gst/return-filing`, counting reveal
wrappers sitting below opacity 0.99:

| | hard load | after in-app nav | after scrolling the new page |
|---|---|---|---|
| before | 23 hidden | **6** | **6** (never revealed) |
| after | 23 hidden | 21 | 2 |

Leaf -> category hub behaves the same (14 on arrival, 1 after walking), i.e. an
in-app navigation now matches a fresh load.

### The fix
`key={pathname}` on the `<Suspense>` boundary wrapping `<Outlet />` in
`RootLayout`. On the boundary rather than a wrapper div so it adds no DOM node,
and keys are not serialized so it cannot introduce a hydration mismatch.

### Two things checked because the fix could plausibly have broken them
1. ⚠️ **Does the dark Suspense fallback now flash on every navigation?** No.
   It paints exactly ONCE per template chunk, on first fetch, which is
   pre-existing `React.lazy` behaviour and not caused by the key. Proved by
   revisiting: `/services/gst` -> leaf -> `/services/gst` again -> two more
   routes left the counter at **1**. Leaf -> leaf (chunk already loaded) is
   **0** — an already-resolved lazy module renders synchronously even on
   remount.
2. ⚠️ **Do the T2 sub-nav anchors now remount the page?** No. They change only
   the HASH, so `pathname` is unchanged and the key is stable — measured **0
   remounts**, hash set, scrolled to the target. If this had remounted, every
   in-page jump would have replayed the reveals and lost the scroll position.

Regression: 9 routes across every template family render with one `<h1>`,
reveals present and no horizontal overflow. Lint, `content:check`, build +
prerender 65 routes all clean.

### /services rebuilt as a card hub, like /dsc — 22-08-2026
Clinton: "fixed the service hub page like dsc hub page, show in card view."

⚠️ **This overrides an earlier decision of mine on the same page.** The
22-08-2026 premium pass deliberately kept plain directory ROWS here, citing the
note above that §16's tell-7 detector over-triggered on /services because a
multi-column list of text links is a DIRECTORY archetype, not a card grid. That
was my call and Clinton overruled it. The tell is unaffected in practice: its
threshold is 3 identical card grids on one page and this page has two, at
different sizes.

Structure now mirrors `/dsc`: a group heading, then a count-aware bento grid of
icon-led cards. Statutory (5) is `sm:2 / lg:3` with the first card spanning two
tracks, which fills exactly (2 + 3, no empty cell); Growth (1) spans the row.

⛔ **THE CARD IS NOT A LINK, AND IT CANNOT BE.** Every card lists its
category's child services as links, and an `<a>` inside an `<a>` is invalid
HTML that browsers actively un-nest — it would break both the markup and the
child links. So the card is a plain container and the real targets sit inside
it: the heading, each child row, and "View category". That is also why it takes
`interactive={false}` / `.panel-dark` rather than the pressable `.card-dark`
treatment DscHub's product cards use — a hover ring on a container that is not
itself clickable signals a target that does not exist. **Asserted in the
verification: `document.querySelectorAll('a a').length === 0`.**

The children stay listed inline. CONTENT-PLAN.md §8 calls this "the sitemap
page users actually use", so boxing the categories must not cost the reader the
one thing the page is for — all **31** child-service links are still present.

⚠️ **The child list splits into two columns off the card's WIDTH, not its child
count.** Keying it off the count (`children.length > 4`) split a 419px card's
names into two ~190px columns where "Private Limited Company" and "One Person
Company" both wrapped and the rows stopped lining up. `isWide()` derives from
the SAME rules `gridColsFor`/`spanClassFor` use, so the grid and the card can
never disagree. Measured: 857px card -> 2 columns, 419px -> 1, 1296px -> 2,
327px (mobile) -> 1.

Verified: 6 cards, 0 nested anchors, 31 child links, bento widths
857+419 / 419x3 / 1296, contrast **0 failures at both 1440px (75 samples) and
375px (78), tightest 4.97:1**, no horizontal overflow at 375px, reduced motion
0 running / 0 stuck. Lint, `content:check`, build + prerender 65 routes clean.

## Homepage Insights section restored — fourth article written — 22-08-2026
Clinton: "in home page insight article is not show fixed it". Not a styling bug —
`Insights.jsx` returns `null` when `insights.length < MIN_ARTICLES_TO_SHOW` (4),
and the array had dropped to 3 when the eSign article was commented out on
21-08-2026. `src/content/insights/index.js` had already recorded this exact
consequence in the pause comment.

- **Fixed by writing a fourth NON-eSign article**, per Clinton's call, rather
  than lowering the threshold (4 is deliberate — a feature-plus-three layout
  degrades to feature-plus-two at 3, the thin editorial row the threshold
  exists to prevent) or un-pausing the eSign article (it links to paused DSC
  service routes).
- **`annual-roc-filings-companies-llps`** — "The filings a company owes every
  year, whether or not it traded". Topic chosen because it is entirely
  Companies Act / LLP Act territory: no eSign, and **no income tax**, so
  BLOCKERS.md §1 is untouched. Every value comes through `s()` and **not one
  new statutory key was needed** — all eleven already existed for
  `roc-annual-compliance.js` and `private-limited-company.js`
  (`aoc4Window`, `mgt7Window`, `mgt7aApplicability`, `smallCompanyThreshold`,
  `dir3KycDeadline`, `dir3KycLateFee`, `llpForm8Due`, `llpForm11Due`,
  `llpLateFee`, `inc20aWindow`, `llpAgreementWindow`, `booksRetentionCompanies`).
- ⚠️ **AOC-4's late-filing penalty is deliberately NOT quoted**, in kind only.
  `statutory.js`'s own note on that key records that research returned
  conflicting figures (₹100/day vs ₹1,000/day, likely fee vs additional
  penalty). Same discipline as `fees: null` — state the consequence, defer the
  unconfirmed number. The closing line points income-tax questions back to us
  rather than answering them.
- **New photo**: `src/assets/insights/annual-roc-filings-companies-llps.jpg`,
  Unsplash (Beatriz Perez Moya, `XN4T2PVUUgk`), 1600×869, IMAGE-PLAN.md §2
  Tier 2 — stacked document folders, **no people in frame**, recorded in
  `ATTRIBUTION.txt`. In `src/assets/`, never `public/`, for the reason
  `images.js`'s own header gives (public/ ships the untouched 1600px JPEG to
  every deploy on top of the emitted variants).
  - It lands as a 112px secondary-row thumbnail, **not** the feature panel, so
    it never sits under the feature's scrim — the measured-contrast caveat
    recorded for that panel (19-08-2026) does not apply to it. Reorder
    `insights` so this becomes article 1 and that measurement has to be redone:
    the photo is very light.
- The eSign entry stays commented, in `index.js` AND `images.js`. Its comment
  now records consequence 1 as resolved rather than live; uncommenting it
  restores a fifth article, not a fourth.
- Verified: `npm run lint` 0 problems, `content:check` clean (**the insights
  warning is gone**; only the three standing hero-stat/testimonial warnings
  remain), `build` + prerender **66 routes** (up from 65), the prerendered
  `dist/index.html` carries all four article links and the new headline, and
  `dist/insights/annual-roc-filings-companies-llps/` exists with its avif/webp
  variants emitted. Live on the dev server: the homepage section renders with
  all four cards, and the article page shows the correct `<h1>`, five body
  headings, all six sampled statutory values interpolated, no `undefined` /
  `[object Object]` / `NaN`, and a "More insights" row of the other three.
  - ⚠️ Image `naturalWidth` reads **0** in the in-app preview pane — the
    documented `visibilityState: "hidden"` artifact, not a broken asset:
    an EXISTING article's image reports identically 0 in the same pane, and
    fetching the avif directly returns 200 `image/avif`.

## Image skeleton loading state, sitewide — 22-08-2026
NOT a phase. Clinton: "in all image added skeleton loading, as image take time to
load." One change in `<Img>` plus one class in theme.css covers every image on the
site, because `<Img>` is already the single funnel (CLAUDE.md's no-bare-`<img>`
non-negotiable is what makes this a one-file change).

- **What it replaces.** IMAGE-PLAN.md §8.4 assumed vite-imagetools would emit a
  base64 LQIP; the installed version does not, so an unloaded image left its
  reserved box **transparent** — right for CLS, but on a slow connection a
  visitor saw a hole in the layout rather than a photo arriving.
- **`.img-skeleton` (theme.css)** is a flat surface tone with ONE slow sheen
  passing over it, 1.6s.
  - ⚠️ **SURFACE-AWARE VIA CUSTOM PROPERTIES (`--skeleton-base` /
    `--skeleton-sheen`), never per-call-site classes.** A skeleton stands in for
    the image's own box, so an ink-50 rectangle on a dark section is a bright
    hole punched in the page — worse than the gap it replaces. Declared on
    `:root` and overridden under `[data-surface="dark"|"deep"|"ember"]`, inherited
    exactly the way `--surface-accent` already is. Verified live: the homepage
    resolves three distinct tones across `deep` (hero), `dark` (Insights feature
    panel) and `light` (the 112px thumbnails).
  - **The sheen is a TRANSFORM on a pseudo-element, not an animated
    `background-position`** — background-position repaints the whole box every
    frame, and these boxes are large (a 1160px article header, the feature panel).
- ⛔ **THE CACHED-IMAGE TRAP, and it is the reason for the layout effect.**
  `onLoad` only fires for a load that happens after React attaches the handler.
  On a prerendered page whose image is already in the HTTP cache — a repeat
  visit, a back navigation, any second view — the browser decodes it BEFORE
  hydration, `onLoad` never fires, and the skeleton would shimmer forever over a
  fully loaded photo. `<Img>` now reads `node.complete && node.naturalWidth > 0`
  in an isomorphic layout effect on mount. `naturalWidth > 0` is what separates
  a real decode from a failed request, which also reports `complete: true`.
  Measured on a warm-cache reload: 4 skeletons, **0 still visible, 6/6 images
  loaded, 0 running animations**.
- ⛔ **`data-loaded="true"` is what STOPS the sheen, and it is not decoration.**
  The skeleton stays mounted at opacity 0 so the cross-fade can run — so without
  the `.img-skeleton[data-loaded="true"]::after { animation: none }` rule its
  infinite animation keeps ticking on every loaded image for the rest of the
  session. Measured before the fix: **4 running animations still going long
  after all 4 images had decoded.** After: 3 while 3 are pending, **0 once all
  have loaded.**
- **`onError` settles the state too.** A permanent shimmer over a broken request
  reads as "still loading", which is worse than the empty box. (Consequence
  worth knowing when testing: `Network.setBlockedURLs` on images CANNOT
  photograph this state — blocking errors the request and correctly settles the
  skeleton. Hold the requests open with `Fetch.requestPaused` and never continue
  the `Image` ones instead. That cost one useless screenshot.)
- **`skeleton={false}` on the three TRANSPARENT PNGs** — `ProductShot`,
  `DscBand`'s illustration, `DscHub`'s group aside. There is no photo-shaped box
  to hold there; a filled rectangle would cover the plinth's wash, arc rings and
  key light. Everything else (hero, all insights imagery) keeps it.
- **`placeholderSrc` still WINS over the skeleton** where it is supplied — a real
  LQIP of the actual photo beats a generic shimmer. The §8.4 route to one is
  unchanged (import a `?w=24` variant, which Vite auto-inlines as base64).
- **Reduced motion**: `.img-skeleton::after { display: none }`. §9.6's global
  floor collapses the duration but parks the sheen at the keyframe's END state —
  a bright band sitting still across the box. A skeleton's honest reduced-motion
  form is the flat tone alone. Verified via `Emulation.setEmulatedMedia`: sheen
  `display: none`, **0 running animations**, tone still rendering.
- **No hydration risk**: server and client first render both emit
  `data-loaded="false"`; only the mount effect can change it. Verified — exactly
  **1** console error per route, the long-standing sitewide React #418
  (`args[]=HTML`), byte-identical on `/about` and `/dsc`.
- Verified: `npm run lint` 0 problems, `content:check` clean, `build` +
  prerender 66 routes, and a real Chrome over CDP against `npx serve dist`
  (never `vite preview`, never the in-app pane) asserting
  `innerWidth`/`visibilityState`/`pathname` first — throttled load shows the
  skeletons up, animating, then fading out image by image as each decodes;
  screenshotted with image requests held pending to confirm the treatment reads
  as quiet rather than loud.
