# ThinkOrange Consulting — Build & Execution Plan

**Version** 1.0 · **Date** 10-08-2026
**Companions** `DESIGN.md` (visual system) · `CONTENT-PLAN.md` (IA and content)
**Target** 49 prerendered routes · React 19 + Vite 8 + Tailwind 4 + Motion

---

## 1. Stack — locked

Taken from your working `InscribeWebsite` project (`/Users/clinton/Documents/Incribe/InscribeWebsite`) so you are on versions you have already shipped with.

```jsonc
{
  "dependencies": {
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-router": "^7.17.0",
    "react-router-dom": "^7.17.0",
    "motion": "^12.40.0",              // framer-motion successor; import from "motion/react"
    "tailwind-merge": "^3.6.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1",
    "lucide-react": "^1.21.0",
    "radix-ui": "^1.5.0",             // shadcn primitives — accordion, dialog, select, navigation-menu
    "sonner": "^2.0.7",               // toasts on form submit
    "@emailjs/browser": "^4.4.1",     // contact + partner forms, no backend
    "date-fns": "^4.4.0",             // Compliance Calendar date maths
    "@fontsource/instrument-serif": "^5.3.0",
    "@fontsource/ibm-plex-mono": "^5.3.0"
    // neither family ships a variable axis — @fontsource-variable/* 404s for both.
    // Satoshi: self-host woff2 from Fontshare into /public/fonts — not on npm
  },
  "devDependencies": {
    "vite": "^8.0.12",
    "@vitejs/plugin-react": "^6.0.1",
    "tailwindcss": "^4.3.0",
    "@tailwindcss/vite": "^4.3.0",
    "vite-imagetools": "latest",      // ADDED — image pipeline, see IMAGE-PLAN.md §8.2
    "eslint": "^10.3.0",
    "@eslint/js": "^10.0.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0"
  }
}
```

**Deliberately dropped from the Inscribe list:** `gsap` (Motion covers every pattern in `DESIGN.md` §9), `@paper-design/shaders-react` (the Arc Field is pure CSS — no WebGL), `next-themes` (single theme; the site's dark sections are design, not a mode), `@tabler/icons-react` (Lucide alone), `react-day-picker`, `autoprefixer`/`postcss` (Tailwind 4 handles it).

**`vite-react-ssg` is NOT installed — resolved during Phase 0, revisit in Phase 9.** It pins a peer dependency of `react-router-dom@^6.14.1` and hard-conflicts with the locked RRv7 stack; forcing it with `--legacy-peer-deps` would leave a package whose internals assume v6 router APIs, which is worse than not having it. Phase 9 should prerender using React Router v7's own static-rendering primitives (`createStaticHandler` / `createStaticRouter` / `StaticRouterProvider`, exported from `react-router`) via a small custom build script instead — that is the actively-maintained path for this router version. Re-check `vite-react-ssg`'s peer range at that point in case it has shipped v7 support by then; if so, either is acceptable.

**shadcn/ui — use sparingly.** Take `accordion`, `dialog`, `select`, `navigation-menu` and `sheet` for their accessibility primitives, then restyle them entirely against `DESIGN.md` tokens. Do **not** run a broad `shadcn add` — the defaults are the visual signature of a generated site and will fight §16 of the design doc directly.

### 1.1 Repo structure

Mirrors Inscribe's `modules/` convention so it feels familiar.

```
src/
├── content/          # the data layer — see CONTENT-PLAN.md §13
│   ├── nav.js        # keystone: nav, footer, routes, breadcrumbs, form dropdown
│   ├── services/     # 17 leaf files + index.js
│   ├── dsc/          # products.js, drivers.js
│   ├── compliance-calendar.js
│   └── legal/
├── components/
│   ├── ui/           # Button, Card, Chip, Input, Accordion, Select — token-bound
│   ├── layout/       # Container, Section, Eyebrow, PageHero, CTABand
│   ├── motion/       # Reveal, Stagger, LineMask, ArcDraw, Counter
│   ├── navbar/       # Header, MegaMenu, MobileNav
│   └── footer/
├── modules/
│   ├── home/         # T1 — sections/ subfolder
│   ├── services/     # T2 ServiceLeaf, T3 CategoryHub
│   ├── dsc/          # T4 DscProduct, T5 UtilityPage
│   ├── about/ partner-with-us/ contact/ legal/ not-found/
├── hooks/            # useBloom, useScrollProgress, useCountUp, useHoverIntent
├── lib/              # cn.js, seo.js, calendar.js
└── styles/theme.css  # DESIGN.md §15.4
```

---

## 2. How to read the model column

Three tiers, chosen per phase by what the work actually demands:

- **Haiku 4.5** — mechanical, pattern-following, verifiable by running it. Scaffolding, tables, repetitive data entry.
- **Sonnet 5** — the default. Component work, following an established spec, prose that has a template to follow.
- **Opus 5** — reserved for work where a wrong decision is expensive to unwind: the navigation architecture, the bespoke motion, the accuracy-critical tax content, and the final audit.

The rule that saves the most tokens is not model choice — it is **building one exemplar carefully and then replicating it cheaply.** Phases 3, 6 and 7 are all structured that way.

---

## 3. Phases

### Phase 0 — Scaffold
**Model: Haiku 4.5** · Cost: very low · 1 session

Vite + React 19 project, install deps from §1, Tailwind 4 via `@tailwindcss/vite`, `jsconfig.json` path aliases, ESLint, `react-router` shell, folder tree from §1.1, `.env.example` for EmailJS keys, `CLAUDE.md` (§5).

**Done when:** `npm run dev` serves a blank routed page and `npm run build` passes.
**Why Haiku:** zero judgment. Every output is verified by the build running.

---

### Phase 1 — Design tokens & primitives
**Model: Sonnet 5** · Cost: low · 1 session · Context: `DESIGN.md` §4–7, §9, §12, §15.4

`theme.css` with the full `@theme` block · Satoshi self-hosted + Instrument Serif + IBM Plex Mono · fluid type scale as utilities · `.grain` utility · `Button` (4 variants, `ink-950`-on-ember primary) · `Card` (light/dark) · `Chip` · `Input` · `Container` · `Section` (surface prop: light / light-alt / dark / deep / ember) · `Eyebrow` (with arc) · motion wrappers `Reveal` / `Stagger` / `LineMask` / `Counter` · `prefers-reduced-motion` handling.

Also the image layer, per `IMAGE-PLAN.md` §8: `vite-imagetools` config, the `<Img>` component (AVIF/WebP/fallback, explicit dimensions, LQIP, lazy except the one LCP image per page, required `alt`), `Figure` with its typographic fallback, and the `.to-figure` navy-tint treatment. Every later phase consumes these — no bare `<img>` tags anywhere in the codebase.

**Done when:** a throwaway `/kitchen-sink` route renders every primitive on all five surfaces, the orange-button contrast is `ink-950` not white, and `<Img>` renders a responsive AVIF with zero layout shift.
**Why Sonnet:** precision transcription of a written spec — no architectural decisions, but too much detail for Haiku to hold accurately.

---

### Phase 2 — `nav.js` + navigation + footer
**Model: Opus 5** · Cost: medium · 1–2 sessions · Context: `CONTENT-PLAN.md` §4, §13.1; `DESIGN.md` §10

The keystone phase. Build `src/content/nav.js` as the single source for the mega menu, mobile accordion, footer sitemap, breadcrumbs, related-service resolution, the contact form's service dropdown, the route table and the XML sitemap. Then `Header` (transparent → blurred sticky), `MegaMenu` (6-column flat panel, hover-intent 120ms, click/keyboard parity, Escape, focus return), `MobileNav` (full-screen sheet, `grid-template-rows` accordions), `Footer` (5 columns + mini deadline widget), `Breadcrumbs`.

**Done when:** every one of the 49 routes is reachable by keyboard alone, Escape closes the panel and returns focus to the trigger, and no submenu cascades.
**Why Opus:** this is the one piece where a bad structural choice propagates into all 40 generated pages, and mega-menu accessibility is where most implementations quietly fail. Worth the spend once.

---

### Phase 3 — Content data layer
**Model: mixed** · Cost: **highest of any phase** · 6–7 sessions

The largest token expenditure in the project. Structured to avoid paying full price 21 times.

**3a — Schema + flagship exemplar · Opus 5 · 1 session.** Finalise the leaf schema, then write `/services/gst/registration` completely: overview, who-needs-this, what's-included, documents by entity type, process, timeline, 8 FAQs, meta and keywords. This one file is the pattern every other page is measured against, and GST is the technically riskiest content to get wrong.

**3b — High-value technical leaves · Opus 5 · 1 session.** GST Return Filing · ITR Filing · GST Notices & Litigation · TDS Compliance. Statutory detail (GSTR-1/3B/9/9C, Section 73/74/74A, ITR forms, threshold and due-date references) where an error is a credibility problem, not a typo.

> **Status: 2 of 4 delivered.** The two GST leaves are written. ITR Filing and TDS Compliance are **blocked** — the Income Tax Act 2025 replaced the 1961 Act on 01-04-2026 and renumbered virtually every section, so both pages would have been written in the vocabulary of a repealed Act. See `BLOCKERS.md` §1 for what is needed to unblock. Research also revised Section 73/74 to include **Section 74A** (unified 42-month limitation from FY 2024-25), which recall would have missed.

**3c — Remaining sixteen leaves · Sonnet 5 · 4 sessions, batches of 4–5.** Context per session: the schema, the Phase 3a exemplar, and the relevant source bullets from `CONTENT-PLAN.md` §15 — **not** the whole document. Batches are independent, so context stays small and constant.

> **Status: complete (14 of 16 delivered; 2 folded into Phase 3b's blocked pair).** Batch 1 (Opus 5, off-plan model): private-limited-company, llp-registration, opc-registration, partnership-firm, proprietorship. Batch 2 (Sonnet 5, on-plan): bookkeeping, internal-audit, specialised-audit, gem-registration, tender-documentation, gst-itc-refunds, msme-udyam, startup-india-dpiit, business-loan. `tax-planning-advisory` and `personal-finance` remain blocked alongside Phase 3b's pair — see `BLOCKERS.md` §1. Two more recent-law findings surfaced by research: the MSME classification limits were revised 01-04-2025 (investment 2.5x, turnover doubled — still widely misreported), and the OPC mandatory-conversion thresholds (₹50L/₹2Cr) were repealed in 2021 and are still widely republished as current.

**3d — DSC products, drivers, calendar · Haiku 4.5 · 1 session.** Four DSC product files, four driver compatibility matrices, `compliance-calendar.js`. Almost entirely tabular.

> **Status: complete (run on Sonnet 5, not Haiku — off-plan model, see note below).** Driver download URLs/versions/file sizes left `null` pending Phase 7 real-file sourcing — same discipline as `fees: null`; inventing a version number would be the same category of error as inventing a price. Compliance calendar built as recurrence rules + a `nextOccurrence()` helper rather than fixed dates, with the ITR due date deliberately omitted (unsettled, see `BLOCKERS.md` §1) and AOC-4/MGT-7 marked illustrative (AGM-relative, not fixed calendar dates).

**Done when:** all 21 leaves validate against the schema, `fees` is `null` everywhere, and no statistic or price appears anywhere.
**Why the split:** ~70% of the writing is pattern replication once the exemplar exists. Paying Opus rates for all 17 would roughly triple this phase's cost for no gain on the easy ones — but paying Sonnet rates for GST litigation content is a false economy in the other direction.

**Actual model usage vs plan:** 3b and 3c batch 1 both ran on Opus 5 rather than their planned models (3b is correctly Opus-routed; 3c batch 1 should have been Sonnet 5). 3d ran on Sonnet 5 rather than Haiku 4.5. None of this affected output quality, only cost — flagging so future sessions don't assume the model column was followed.

**Content-check limitation found in 3c:** the inline-fact scanner in `scripts/content-check.mjs` only pattern-matches quantitative facts (₹ amounts, %, durations, dates). It missed a qualitative statutory fact ("exempt from Earnest Money Deposit") written as plain prose instead of `s("gemEmdExemption")` — caught only incidentally, by ESLint flagging the resulting unused `s` import. The scanner is a floor, not a substitute for reading the diff.

---

### Phase 4 — Arc Field + Hero
**Model: Opus 5** · Cost: low (small surface) · 1 session · Context: `DESIGN.md` §3.1, §8, §11.2

The five-layer background exactly as specified, `useBloom` hook with the IntersectionObserver idle guard, the mobile static fallback, reduced-motion frozen angles, then the hero itself: line-mask headline, staggered CTAs, floating deadline card, scroll affordance.

**Done when:** DevTools Layers shows ≤3 composited layers, the page holds 60fps while scrolling the hero, and reduced-motion renders a complete static composition.
**Why Opus:** the single most visible element on the site and the one most likely to look generic if approximated. Small file, high leverage — cheap place to spend the better model.

---

### Phase 5 — Homepage sections
**Model: Sonnet 5** · Cost: medium · 2 sessions · Context: `CONTENT-PLAN.md` §6; `DESIGN.md` §11

Sections 2–10 and 13–14 from the homepage table. Sections 11 (testimonials) and 12 (insights) are built as flag-gated components that render nothing until content exists — wired, not shipped.

**Done when:** the surface cadence matches `DESIGN.md` §11.1 exactly and no layout archetype repeats consecutively.

---

### Phase 6 — T2 and T3 templates
**Model: Sonnet 5** · Cost: medium · 2 sessions · Context: `CONTENT-PLAN.md` §7–8

`ServiceLeaf` (11 sections, sticky sub-nav with scroll-spy, sticky enquiry card, FAQ accordion) and `CategoryHub` (count-aware child grid). Wire both to the router; all 25 service routes light up at once.

**Done when:** all 21 leaves and 8 hubs render from data with zero page-specific code.

---

### Phase 7 — T4 and T5
**Model: T4 Sonnet 5 · T5 Haiku 4.5** · Cost: low · 1–2 sessions

`DscProduct` (4 routes) and `UtilityPage` (6 routes). T5 is deliberately plain — no animated hero, downloads above the fold, compatibility table, numbered install steps, troubleshooting accordion.

**Done when:** utility pages hit **LCP < 1.2s** on mobile throttling.
**Why Haiku for T5:** the design brief for these pages is "get out of the way". Table rendering and download links — exactly the shape Haiku handles well.

---

### Phase 8 — Editorial, contact, legal, 404
**Model: Sonnet 5** · Cost: low–medium · 1–2 sessions

About · Partner With Us · Contact (form + EmailJS + honeypot + time-gate + localStorage rate limit + Sonner toasts) · legal prose renderer with auto-TOC · 404 · sitewide floating WhatsApp button.

**Done when:** a test submission arrives by email, the honeypot blocks a scripted submit, and every form field has a real `<label for>`.

---

### Phase 9 — Prerender, SEO, schema
**Model: Sonnet 5** · Cost: low · 1 session · Context: `CONTENT-PLAN.md` §14

Prerender all 49 routes via React Router v7's static-rendering primitives (or `vite-react-ssg` if it has since added v7 support — see §1) · per-route title, description, canonical, OG/Twitter · JSON-LD: `Organization`, `LocalBusiness`, `BreadcrumbList` sitewide, `Service` + `FAQPage` on leaves, `Product` on DSC (no price), `HowTo` on driver install · `sitemap.xml` and `robots.txt` generated from `nav.js` · `lang="en-IN"`.

**Done when:** `curl` on any route returns fully-rendered HTML with a unique title, and Rich Results Test passes on a leaf and a driver page.

---

### Phase 10 — Audit
**Model: Opus 5** · Cost: medium · 1 session

Contrast audit against `DESIGN.md` §4.5 with **specific attention to orange-on-white body text** · full keyboard traversal of the mega menu · screen-reader pass on nav and forms · reduced-motion completeness · Lighthouse mobile on four representative routes · and a deliberate pass against the twelve tells in `DESIGN.md` §16.

**Done when:** Lighthouse ≥95 on Performance, Accessibility, Best Practices, SEO for home, a leaf, a driver page and contact.
**Why Opus:** judgment work. "Does this look generated?" is not a checklist a smaller model answers usefully.

---

### Phase 11 — Real content & asset handoff
**No model.** Blocking on you, not on the build.

Legal pages from your CA or lawyer · full street address, CIN, GSTIN, office hours · DSC and partner commercial terms · a pricing decision · confirmation of the Tamil-language claim. See `CONTENT-PLAN.md` §1.1.

**Photography per `IMAGE-PLAN.md`:** the half-day team and founder shoot, redaction review of every screenshot, and licence/consent filing.

Note the split — screenshots, DSC token photography, certificates and office shots are **not** blocked on this phase. Produce them during Phase 3 (`IMAGE-PLAN.md` §6) so the DSC pages, all six category hubs and all six driver pages ship with real assets from day one. Only the About and Partner people-frames wait for the shoot, and both render a designed typographic fallback until then.

---

## 4. Sequencing

```
0 ─ 1 ─ 2 ─┬─ 3 (a→b→c→d) ─┐
           ├─ 4 ── 5 ──────┼─ 6 ─ 7 ─ 8 ─ 9 ─ 10
           └───────────────┘
```

Phases 3 and 4/5 are independent after Phase 2 and can run in parallel across sessions. Phase 6 needs both. **Do not start Phase 5 or 6 before Phase 2 is finished** — the nav data shape determines the props every template receives, and reworking it later means touching all 40 generated pages.

---

## 5. Token discipline

The largest savings come from context hygiene, not from model downgrades.

**Create `CLAUDE.md` in Phase 0** so the rules load automatically every session instead of being re-pasted:

```markdown
# ThinkOrange Website

Design system: DESIGN.md — tokens only, no raw hex, no arbitrary px.
IA and content: CONTENT-PLAN.md — 49 routes, 9 templates, data-driven.

## Non-negotiables
- Primary buttons: ember-400 bg with ink-950 text. Never white text on orange (3.13:1, fails AA).
- No gradient text, no floating blurred blobs, no icon-in-a-circle everywhere. See DESIGN.md §16.
- Orange stays under ~12% of any viewport. One full-orange band on the whole site.
- Never invent a fee, client count, year of establishment, turnaround guarantee, or testimonial.
  `fees: null` renders "On request". That is correct, not a gap.
- Location is Salem, Tamil Nadu. Not Delhi.
- All scroll reveals are once:true. Body copy, footers, tables and forms never animate.
- Stack: React 19, Vite 8, Tailwind 4, motion/react, react-router 7. JS, not TS.
```

**Per-session rules**

- **One phase per session.** Start fresh between phases.
- **Load only the sections you need.** Phase 3c needs the schema, the exemplar and §15 — not all three planning documents.
- **Never ask a model to re-read a file it just wrote.**
- **Phase 3 batches must stay independent.** Four leaf files per session, then a fresh session. Context that grows across 17 files is where a content phase quietly triples in cost.
- **Build the exemplar first, always.** "Follow the pattern in `gst-registration.js`" is the cheapest instruction in the project.

---

## 6. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Copying prospectlegal.in copy | Infringement, and duplicate-content filtering kills the ranking the pages exist for | Original copy from your own profile PDF. `CONTENT-PLAN.md` §2 |
| SPA without prerendering | 49 pages built for search, invisible to crawlers | Static rendering via React Router v7 primitives, Phase 9, non-optional |
| Invented facts reaching production | Credibility damage on a compliance site — the worst possible category to be caught in | `fees: null`, §1.1 hold list, `CLAUDE.md` rule |
| Unreviewed AI legal pages | Real liability; you handle PAN and Aadhaar-linked verification | Template only; content from your CA. Phase 11 |
| **Statutory content written from model recall** | The training cutoff predates the current financial year. Realised in Phase 3b: the Income Tax Act 2025 and GST Section 74A had both already changed the law. Pages would have confidently described repealed provisions | Research every value, record `source` + `asOf` in `statutory.js`, enumerate into `CONTENT-REVIEW.md`, and `npm run content:check` blocks inline facts |
| Missing Refund / Shipping policy | Payment-gateway onboarding blocked — you ship physical tokens | Both added in `CONTENT-PLAN.md` §3.4 |
| Redistributing vendor driver binaries | Licensing exposure | Link official sources, or host with written permission + checksums |
| EmailJS key abuse | Spam floods your inbox; enquiry PII transits a third party | Honeypot + time-gate + rate limit; disclose in the privacy policy |
| shadcn defaults overriding the design system | The site ends up looking exactly like the generated sites §16 warns about | Import primitives only, restyle to tokens, never bulk-add |
| Nav data reworked after Phase 6 | Touches all 40 generated pages | Finish Phase 2 completely before Phase 5/6 |

---

## 7. Realistic first milestone

Phases 0, 1, 2, 4 and a homepage-only Phase 5 gives you a **complete, real, deployable homepage with working navigation across all 49 routes** — before a single service page is written. That is the right thing to look at and react to before committing to the content phase, which is where most of the budget goes.

Get to that point, review it properly, then start Phase 3.
