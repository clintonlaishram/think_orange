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

## Session discipline
- One phase per session. Start fresh between phases — see BUILD-PLAN.md §5.
- Load only the plan sections a phase actually needs, not the whole document.
- Phase 3 (content) batches must stay independent — 4-5 leaf files per session, then
 a fresh session. Always build the exemplar first and reference it by name.
