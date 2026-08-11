# ThinkOrange Consulting — Design System & Build Specification

**Version** 1.0 · **Date** 10-08-2026 · **Stack** React + Vite + Tailwind CSS v4 + `motion`
**Owner** Clinton · **Status** Approved direction, copy pending

---

## 0. How to use this file

This is the single source of truth for the visual and motion design of the ThinkOrange website. Any code generated for this project — by a human or by an AI assistant — must conform to it.

Three rules govern everything below:

1. **Tokens only.** No raw hex, no arbitrary pixel values, no one-off durations in components. If a value isn't in §4–§7, it doesn't get used.
2. **Restraint is the aesthetic.** Every effect in this document has a named, limited set of places it is allowed to appear. "Looks nice, let's add it everywhere" is how this site starts looking machine-made. See §16.
3. **Copy is placeholder.** No claim, statistic, client name, price or credential in this document is a fact about ThinkOrange. Everything is `[placeholder]` until you supply real content. Do not ship invented numbers on a compliance firm's website.

---

## 1. Brand foundation

**What the business is.** A Salem, Tamil Nadu-based compliance and advisory firm serving clients pan-India — GST, income tax, business setup, accounting and audit, government tenders, digital signature certificates, and loans and finance. Not a boutique tax practice: a broad statutory-services provider across 49 routes. See `CONTENT-PLAN.md` for the full architecture.

**What the site must do,** in priority order:

1. Convert an anxious visitor with a deadline into an enquiry.
2. Rank for long-tail service queries — local ("GST registration consultant Salem") and national-technical ("ePass 2003 driver download").
3. Establish that this firm is competent and permanent, not a two-person operation with a Wix template.

**The emotional target.** Most Indian CA and compliance websites land in one of two places: cluttered and cheap (stock rupee imagery, five typefaces, blinking "Apply Now"), or sterile and forgettable (blue gradient, generic icons, no personality). The gap is **calm authority** — the feeling of a well-run practice that has seen your problem a hundred times. Dark, quiet, precise, with a single warm colour that appears only when something is actionable.

**Brand attributes**, in the order the design serves them: *Precise · Assured · Warm · Modern*. Warm before Modern matters — this must not read as a fintech startup.

---

## 2. Counter-thinking — the honest critique

You asked me to say whether this will actually look good, and where the risks are. Five things.

### 2.1 Orange as "primary" would have hurt you — the split we chose is the right one

Orange at large surface area does two things you don't want. It raises visual arousal, which fights the calm-authority target. And in Indian market context, a saturated orange field reads *retail promotion* — Swiggy, Amazon Sale, coaching-centre banner — not *statutory advisor*. Meanwhile navy at large scale is the single most reliable trust signal in financial services, which is exactly why every bank uses it and exactly why we must not use it in the boring way.

So: **navy owns the surface, orange owns the signal.** Orange never exceeds roughly 8–12% of any viewport. Because it is scarce, every appearance carries meaning — if it's orange, it's clickable, it's live, or it's the number that matters. This is not a compromise on your brand; it is what makes the orange actually land. A site that is 40% orange has no orange emphasis left to spend.

One deliberate exception, in §11.11: exactly one full-orange band on the entire homepage, immediately before the footer. It works precisely because nothing else on the page is orange at that scale.

### 2.2 Your three-level dropdown menu should be flattened to two — this is my strongest recommendation

The structure you gave me is three levels deep in two places:

```
SERVICES ▾ → GST Services ▾ → GST Registration
DSC ▾ → Token Driver Downloads ▾ → ePass 2003 Driver Downloads
```

Cascading hover menus at three levels are one of the best-documented usability failures on the web. The diagonal-mouse problem means users lose the submenu constantly on the way to it. They are effectively impossible on touch, they are hostile to keyboard and screen-reader navigation, and they hide your most commercially important pages two hover-states deep — which also means search crawlers and users both discount them.

**Do this instead:** a single full-width mega panel under `SERVICES`, with all six categories as columns and every child link visible at once. No cascade, no second hover. All three of your levels are visible simultaneously in one panel — category headings are themselves clickable landing pages, children sit beneath them. This is the pattern ClearTax, Razorpay and Zoho all converged on, and for the same reason. Full spec in §10.

For DSC, same treatment: one panel, three columns (*Certificates* · *Buy & Requirements* · *Token Drivers*). "Token Driver Downloads" becomes a single link to a hub page listing all four drivers, rather than a nested flyout. Those driver pages get their own template — see §2.4.

### 2.3 React + Vite will cost you organic search unless you prerender

You have ~25 service pages whose entire commercial value is ranking for queries people type at 11pm before a deadline. A standard Vite SPA ships an empty `<div id="root">` and renders on the client. Google can execute JavaScript, but it does so on a deferred second pass, inconsistently, and Bing and most AI crawlers do far worse. For a business that lives on long-tail search, this is a self-inflicted wound.

You do not need to switch to Next.js. Add **`vite-react-ssg`** (or `vite-plugin-prerender`) and prerender every static route to real HTML at build time. Same React, same Vite, same developer experience, roughly thirty minutes of setup, and every service page ships as crawlable HTML with its own `<title>`, meta description and JSON-LD. Treat this as non-optional. Details in §15.

### 2.4 The DSC driver-download pages are your highest-traffic asset and must not use the marketing template

"HYP2003 driver download", "ePass 2003 token driver", "Watchdata Proxkey driver" are high-volume, high-intent, low-competition queries. People searching them are frustrated, on a deadline, and want a file — not a hero animation and a testimonial carousel.

Give these a separate **Utility template** (§11.9): no hero animation, download buttons above the fold, OS/version table, step-by-step install with numbered screenshots, and a single quiet contextual card at the bottom — *"Need a new DSC? We issue Class 3 certificates in 24 hours."* That card is the conversion mechanism. This asymmetry — marketing pages that persuade, utility pages that get out of the way — is itself a mark of designed rather than generated work.

### 2.5 Business Loans sits awkwardly in a compliance menu

Placing a lending product beside statutory services slightly dilutes the advisor positioning and invites the question of whether you are a broker. I am not removing it — it's your business. But in the mega panel, group it under a **Growth** column heading alongside Government Tenders, visually separated by a hairline from the four statutory columns. It reads as adjacency rather than confusion, and costs nothing.

**Verdict on the direction overall:** the reference site works because of a strong dark/light rhythm, generous whitespace, one dominant colour and restrained type. Those properties transfer to navy + orange cleanly and, honestly, with more sophistication — navy has more depth range to work with than that green. The risk is not the palette. The risk is section monotony (see §16) and effect over-application. The specification below is structured to prevent both.

---

## 3. The two signature ideas

Generic sites are generic because they have no distinguishing device. This site gets two, and everything else stays quiet so these read.

### 3.1 The Arc

Your logo's orange crescent — the swoosh cutting through the `O` — is a genuinely good mark, and it is the only asset you own that no competitor can copy. It becomes the site's recurring graphic device:

| Where | Form |
|---|---|
| Hero background | Two counter-rotating blurred conic rings (§8) |
| Section eyebrows | A 24 × 4px arc segment preceding the label |
| Primary buttons | An arc sweep that travels across the face on hover |
| Process section | The connecting line between steps is an arc that draws on scroll |
| Feature imagery | One image per page masked with the arc curve on its top-right |
| Card hover | A thin arc appears in the top-right corner |
| Scroll progress | A 2px arc-gradient bar at the top of the viewport |
| Footer | An oversized 8%-opacity arc bleeding off the right edge |

The rule is that the arc always curves in the same direction as the logo's, and always uses the brand gradient (§7.1). Repetition of one specific shape is what makes a visual system feel authored.

### 3.2 The Compliance Calendar

This is the differentiator, and it's the section I'd fight for. Every Indian CA website has a hero, services, about and contact. Almost none show **what is due next**.

A live band on the homepage — and a persistent slim widget in the footer — showing upcoming statutory deadlines:

```
GSTR-3B (Jul 2026)      due 20-08-2026     in 10 days
TDS Payment (Jul)       due 07-08-2026     overdue
ITR — Individuals       due 15-09-2026     in 36 days
ROC AOC-4               due 30-10-2026     in 81 days
```

Chips are colour-coded: `>14 days` neutral ink, `≤14 days` amber, `overdue` ember with a soft glow. Each row links to the relevant service page. This is the most-bookmarked thing on a compliance site, it generates return visits, it earns links, and it demonstrates competence in a way no "Why Choose Us" block can. It is also drop-dead simple: a static JSON file of recurring due dates and a date-diff function. No backend.

Ship this in v1. It is worth more than the testimonial carousel.

---

## 4. Colour system

### 4.1 Ink (navy) — the structural scale

Derived from the logo navy `#1C2C5B`, extended down into near-black for immersive surfaces and up into cool greys for text hierarchy.

| Token | Hex | Use |
|---|---|---|
| `ink-950` | `#070C1C` | Hero base, footer, deepest dark surface |
| `ink-900` | `#0B1329` | Dark section background |
| `ink-800` | `#101B3A` | Elevated card on dark |
| `ink-700` | `#16264F` | Dark-surface borders, hover fill |
| `ink-600` | `#1C2C5B` | **Brand navy.** Headings on light, logo |
| `ink-500` | `#2A3E75` | Secondary heading, active nav on light |
| `ink-400` | `#46598E` | Muted heading, icon default |
| `ink-300` | `#7A88AF` | Body text on dark surfaces |
| `ink-200` | `#B4BDD2` | Muted text on dark, disabled |
| `ink-100` | `#DDE2EC` | Borders on light |
| `ink-50` | `#F0F2F7` | Subtle fill, table stripe |

### 4.2 Ember (orange) — the signal scale

| Token | Hex | Use |
|---|---|---|
| `ember-700` | `#9E3108` | Pressed state on light |
| `ember-600` | `#C43D0A` | **Orange text on light backgrounds** (5.2:1 — the only orange safe for body-size text on white) |
| `ember-500` | `#E85A16` | Button hover fill |
| `ember-400` | `#F26522` | **Brand orange.** Buttons, active states, icon accents |
| `ember-300` | `#FB8C1E` | Gradient terminus, glow core, highlights on dark |
| `ember-200` | `#FFB067` | Orange text on dark surfaces |
| `ember-100` | `#FFDCBD` | Chip fill, subtle tint |
| `ember-50` | `#FFF3E8` | Section wash, hover background |

### 4.3 Canvas — warm neutrals, not grey

Cool grey next to navy makes the whole page feel like a spreadsheet. Warm neutrals give the dark bands something to breathe against — this is what makes the reference site feel expensive.

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#FBF9F5` | Default page background |
| `canvas-alt` | `#F5F1EA` | Alternating section, card fill on canvas |
| `canvas-deep` | `#EDE7DC` | Rare — pricing card, quote block |
| `white` | `#FFFFFF` | Cards that must lift off canvas |

### 4.4 Semantic

| Token | Hex | Use |
|---|---|---|
| `success` | `#1F8A5B` | Filed, verified, compliant |
| `warning` | `#B87A0A` | Deadline within 14 days |
| `danger` | `#C4342B` | Overdue, error, notice |
| `info` | `#2A5FA8` | Neutral advisory note |

Note `warning` is a desaturated amber deliberately kept away from `ember-400`, so a due-soon chip never gets mistaken for a call to action.

### 4.5 Contrast — non-negotiable pairings

The most common mistake with an orange brand is white text on an orange button. `#F26522` against white is **3.13:1** — it fails WCAG AA for body text. Against `ink-950` it is **5.83:1** and passes comfortably.

**Therefore: primary buttons are orange with near-black navy text, never white text.** This is also better looking — the density of near-black on saturated orange is what gives the button its authority.

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `ink-950` | `ember-400` | 5.83 | ✅ **Primary button** |
| `white` | `ember-400` | 3.13 | ❌ Never |
| `ember-600` | `canvas` | 5.11 | ✅ Orange link/text on light |
| `ember-400` | `canvas` | 3.06 | ⚠️ Large display only (≥24px bold) |
| `ember-200` | `ink-900` | 7.9 | ✅ Orange text on dark |
| `ember-300` | `ink-950` | 9.4 | ✅ Stat numerals on dark |
| `ink-600` | `canvas` | 10.9 | ✅ Headings on light |
| `ink-500` | `canvas` | 8.1 | ✅ Body on light |
| `ink-300` | `ink-950` | 8.2 | ✅ Body on dark |
| `ink-200` | `ink-900` | 10.4 | ✅ Muted on dark |
| `ink-400` | `canvas` | 5.4 | ✅ Captions on light |

### 4.6 Surface pairing rules

Only these five combinations exist. No other background/foreground pairs may be invented.

| Surface | Background | Heading | Body | Accent | Border |
|---|---|---|---|---|---|
| **Light** | `canvas` | `ink-600` | `ink-500` | `ember-600` | `ink-100` |
| **Light alt** | `canvas-alt` | `ink-600` | `ink-500` | `ember-600` | `ink-100` |
| **Dark** | `ink-900` | `canvas` | `ink-300` | `ember-300` | `ink-700` |
| **Deep** | `ink-950` | `canvas` | `ink-300` | `ember-300` | `ink-800` |
| **Ember** | `ember-400` | `ink-950` | `ink-900` | `ink-950` | `ember-500` |

---

## 5. Typography

### 5.1 Families

Three families. The choices are deliberate — Inter, Poppins, Montserrat and Roboto are excluded because their ubiquity is itself the tell.

| Role | Family | Source | Weights |
|---|---|---|---|
| **Display + UI** | **Satoshi** | Fontshare (free, commercial OK) | 400, 500, 700, 900 |
| **Editorial accent** | **Instrument Serif** | Google Fonts | 400, 400 italic |
| **Data & labels** | **IBM Plex Mono** | Google Fonts | 400, 500 |

**Satoshi** is a geometric grotesque with just enough character — the distinctive `g`, the slightly narrow caps — to feel chosen rather than defaulted, while remaining completely legible at 14px in a compliance table. It carries both display and UI, which keeps the loading budget honest.

**Instrument Serif Italic** is the signature move and the strongest anti-generic device in the type system. It appears in exactly three places, never more:

1. One emphasised phrase inside the hero headline
2. One emphasised phrase per major section heading (optional, max four per page)
3. Testimonial and pull-quote body text

A high-contrast serif italic dropped into a grotesque headline is an unmistakably editorial, human decision. Machines produce all-sans pages.

**IBM Plex Mono** carries eyebrows, statistic labels, deadline dates, form field numbers and table figures. Its enterprise heritage reads as *precision* rather than *developer*, which suits statutory work. Always uppercase at `0.14em` tracking when used as an eyebrow.

Load `Satoshi` variable + `Instrument Serif` 400/400i + `Plex Mono` 400/500, subset to `latin`, `font-display: swap`, all self-hosted as `woff2`. Total budget ≤ 110 KB.

### 5.2 Scale

Fluid, `clamp()`-based. Values are `size / line-height / letter-spacing`.

| Token | Clamp | LH | Tracking | Family | Use |
|---|---|---|---|---|---|
| `display-xl` | `clamp(3rem, 1.1rem + 6.4vw, 5.5rem)` | 0.95 | −0.035em | Satoshi 900 | Hero headline only |
| `display-lg` | `clamp(2.5rem, 1.3rem + 4vw, 4rem)` | 1.0 | −0.03em | Satoshi 700 | Section openers, CTA band |
| `h1` | `clamp(2.25rem, 1.5rem + 2.6vw, 3.25rem)` | 1.08 | −0.025em | Satoshi 700 | Inner page titles |
| `h2` | `clamp(1.875rem, 1.3rem + 1.9vw, 2.5rem)` | 1.15 | −0.02em | Satoshi 700 | Section headings |
| `h3` | `clamp(1.375rem, 1.15rem + 0.7vw, 1.625rem)` | 1.25 | −0.015em | Satoshi 700 | Card titles, subsections |
| `h4` | `1.125rem` | 1.35 | −0.01em | Satoshi 500 | Small headings, menu columns |
| `body-lg` | `1.125rem` | 1.65 | 0 | Satoshi 400 | Lead paragraphs |
| `body` | `1rem` | 1.7 | 0 | Satoshi 400 | Default |
| `body-sm` | `0.875rem` | 1.6 | 0 | Satoshi 400 | Captions, meta, footer |
| `eyebrow` | `0.75rem` | 1.2 | 0.14em | Plex Mono 500 | Uppercase section labels |
| `stat` | `clamp(2.5rem, 1.5rem + 3vw, 3.75rem)` | 1.0 | −0.03em | Satoshi 900 | Metrics, `tabular-nums` |
| `quote` | `clamp(1.5rem, 1.1rem + 1.5vw, 2.125rem)` | 1.4 | −0.01em | Instrument Serif 400i | Testimonials |

### 5.3 Typographic rules

- **Measure.** Body text never exceeds `68ch`. Display headlines break at `14–18ch` per line — set explicit `max-width` on headlines rather than letting them run to the container edge. Long headline lines are the fastest way to look like a template.
- **Optical alignment.** Display headings get `text-wrap: balance`. Paragraphs get `text-wrap: pretty`.
- **Numerals.** Every figure — prices, statistics, dates, deadline counts — uses `font-variant-numeric: tabular-nums`. Non-negotiable in a compliance context.
- **No gradient text.** Ever. It is the single most recognisable AI-page signature, and at body weights it fails contrast.
- **No centred paragraphs.** Section headings may be centred; body copy under them is left-aligned within a constrained column. Centred multi-line body text is a template tell.
- **Sentence case** for all headings. Title Case reads as 2015 corporate; ALL CAPS is reserved for the mono eyebrow.
- **Hierarchy through weight, not size.** Prefer `Satoshi 900` at the same size over jumping two scale steps. Keeps sections compact.

---

## 6. Space, grid, radius, elevation

### 6.1 Spacing scale

8px base with 4px half-steps: `4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160`. No value outside this list.

**Section padding** is fluid: `padding-block: clamp(72px, 9vw, 144px)`. Dark sections get one step more than light sections — dark surfaces need more air to avoid feeling heavy.

### 6.2 Grid

- 12 columns, `max-width: 1800px`, page gutter `24px` mobile / `40px` desktop, column gap `24px`.
- Text-only content sits in a `760px` inner measure, **offset to columns 2–8, not centred**, for editorial sections. Off-centre placement is the cheapest way to escape the symmetric-template look.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- **Deliberate asymmetry:** at least three homepage sections must use a 7/5 or 5/7 split rather than 6/6, and the service card grid uses a bento arrangement (§11.3) rather than a uniform 3×2.

### 6.3 Radius

Uniform `rounded-2xl` on every element is an AI tell. This system uses deliberate radius contrast — near-square containers against fully-round controls.

| Token | Value | Applied to |
|---|---|---|
| `radius-xs` | `4px` | Chips, tags, table cells |
| `radius-sm` | `8px` | Inputs, small cards, images |
| `radius-md` | `12px` | Standard cards, mega-menu panel |
| `radius-lg` | `20px` | Feature cards, pricing, modals |
| `radius-full` | `9999px` | Buttons, pills, avatars, icon dots |

Buttons are **fully pill-shaped**. Cards are **12px**. The contrast between the two is the point — do not soften it by making buttons 12px too.

### 6.4 Elevation

Shadows are navy-tinted, never neutral black. Black shadows on a warm canvas look muddy.

```css
--shadow-xs: 0 1px 2px rgba(28,44,91,.06);
--shadow-sm: 0 2px 8px rgba(28,44,91,.07);
--shadow-md: 0 8px 24px -6px rgba(28,44,91,.10);
--shadow-lg: 0 20px 48px -12px rgba(28,44,91,.14);
--shadow-ember: 0 8px 28px -6px rgba(242,101,34,.35);
```

**On dark surfaces, shadows do not exist.** Elevation there is expressed with a `1px ink-700` border plus a `inset 0 1px 0 rgba(255,255,255,.05)` top highlight. Applying drop shadows to dark cards is a reliable sign nobody looked at the result.

### 6.5 Borders

`1px` default. Hairline dividers use `ink-100` on light, `ink-800` on dark. Section separators are **full-bleed 1px hairlines**, not thick rules, and never gradient-faded on both ends — that effect is exhausted.

---

## 7. Gradients, glow and texture

This is where sites go wrong. Each effect below has an exhaustive whitelist. If a use isn't listed, it isn't allowed.

### 7.1 The brand gradient

One gradient. One angle.

```css
--gradient-ember: linear-gradient(135deg, #F26522 0%, #FB8C1E 100%);
```

Permitted on: the arc rings (§8), the 2px accent rule beneath section eyebrows, the scroll-progress bar, the active mega-menu column indicator, the arc mask on feature imagery, and the logo mark itself. **Not** on buttons (flat `ember-400` — flat reads more confident and more clickable), **not** on text, **not** on card backgrounds, **not** on borders.

### 7.2 Ambient dark gradients

Dark sections are not flat `#0B1329`. They carry a barely-there radial that gives depth:

```css
--gradient-deep: radial-gradient(120% 90% at 50% -10%, #16264F 0%, #0B1329 45%, #070C1C 100%);
```

Maximum luminance shift across any ambient gradient is 8%. Anything more starts to read as a "hero background pack".

### 7.3 Glow — whitelist of five

Glow is `box-shadow` with `ember` colour and no offset. It appears in exactly five places:

1. Primary button on hover — `--shadow-ember`
2. The hero arc rings — via `filter: blur()`
3. Stat numerals on dark surfaces — `text-shadow: 0 0 32px rgba(251,140,30,.28)`
4. The active nav underline
5. The `overdue` chip in the Compliance Calendar

Nowhere else. In particular: no glow on cards, no glow on icons, no glow on section edges, no glowing blurred blobs floating behind content. That last one is the most recognisable generated-page artefact in existence.

### 7.4 Grain — use this everywhere

A `3%` opacity SVG turbulence overlay on all dark surfaces. This is the highest-value, lowest-cost anti-generic move available: it removes the plastic, vector-perfect quality of pure CSS gradients and makes dark sections read as printed rather than rendered.

```css
.grain::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  opacity:.035; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Static — never animate the grain. Animated film grain is distracting and expensive.

### 7.5 Glassmorphism — one place only

Frosted blur is permitted **only** on the sticky navigation bar after scroll (`backdrop-filter: blur(16px) saturate(150%)` over `rgba(7,12,28,.72)`). Not on cards, not on the mega panel body (that gets a solid `ink-900` fill for legibility), not on modals.

**Translucency without blur is a separate thing, and is allowed.** The hero's two floating cards (§11.2) use a semi-transparent `ink-800` fill (`86%`) so the Arc Field's arc and ledger grid read through them. That buys the layered depth glassmorphism would have, without spending `backdrop-filter` — which stays exclusive to the nav, and which would otherwise put two large blur surfaces on the mobile compositor. Keep such fills opaque enough that body copy on top still clears AA against whatever moves behind it.

---

## 8. Hero animated background — "The Arc Field"

Five layers, all GPU-composited. Only `transform`, `rotate` and `opacity` animate — no layout, no paint, no `background-position`.

The concept: a faint ledger grid drifting behind two counter-rotating arcs of orange light, with an ember bloom that trails the cursor. The grid is thematic (ledgers, spreadsheets, filings), the arcs are the brand mark, the grain holds it together.

### 8.1 Component

```jsx
// src/components/hero/ArcField.jsx
export default function ArcField() {
  return (
    <div className="arcfield grain absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="arcfield__base" />
      <div className="arcfield__grid" />
      <div className="arcfield__ring arcfield__ring--a" />
      <div className="arcfield__ring arcfield__ring--b" />
      <div className="arcfield__bloom" data-bloom />
      <div className="arcfield__vignette" />
    </div>
  );
}
```

### 8.2 Styles

```css
.arcfield { background: #070C1C; }

/* L1 — ambient depth */
.arcfield__base{
  position:absolute; inset:0;
  background: radial-gradient(120% 90% at 50% -10%, #16264F 0%, #0B1329 45%, #070C1C 100%);
}

/* L2 — ledger grid, slow diagonal drift */
.arcfield__grid{
  position:absolute; inset:-72px;
  background-image:
    linear-gradient(to right,  rgba(180,189,210,.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(180,189,210,.07) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(70% 58% at 50% 42%, #000 0%, transparent 76%);
          mask-image: radial-gradient(70% 58% at 50% 42%, #000 0%, transparent 76%);
  animation: arc-drift 44s linear infinite;
  will-change: transform;
}
@keyframes arc-drift { to { transform: translate3d(-72px,-72px,0); } }

/* L3 — the Arc: two counter-rotating conic rings */
.arcfield__ring{
  position:absolute; left:50%; aspect-ratio:1; border-radius:9999px;
  translate:-50% 0; filter: blur(70px); will-change: transform;
}
.arcfield__ring--a{
  width:min(1100px,125vw); top:-42%;
  background: conic-gradient(from 0deg,
    transparent 0deg,
    rgba(242,101,34,0)   38deg,
    rgba(242,101,34,.55) 128deg,
    rgba(251,140,30,.78) 176deg,
    rgba(242,101,34,.26) 224deg,
    transparent 302deg);
  -webkit-mask: radial-gradient(circle, transparent 55%, #000 56%, #000 73%, transparent 74%);
          mask: radial-gradient(circle, transparent 55%, #000 56%, #000 73%, transparent 74%);
  opacity:.58; animation: arc-spin 34s linear infinite;
}
.arcfield__ring--b{
  width:min(620px,80vw); top:-6%;
  background: conic-gradient(from 200deg,
    transparent 0deg, rgba(251,140,30,.5) 58deg, transparent 148deg);
  -webkit-mask: radial-gradient(circle, transparent 61%, #000 62%, #000 79%, transparent 80%);
          mask: radial-gradient(circle, transparent 61%, #000 62%, #000 79%, transparent 80%);
  opacity:.4; animation: arc-spin 52s linear infinite reverse;
}
@keyframes arc-spin { to { rotate: 360deg; } }

/* L4 — cursor bloom, lerped in JS */
.arcfield__bloom{
  position:absolute; width:520px; height:520px; left:0; top:0;
  margin:-260px 0 0 -260px; border-radius:9999px; opacity:.30;
  background: radial-gradient(circle, rgba(251,140,30,.34) 0%, transparent 65%);
  filter: blur(48px); will-change: transform;
  transform: translate3d(50vw, 40vh, 0);
}

/* L5 — vignette, seats the content */
.arcfield__vignette{
  position:absolute; inset:0;
  background: radial-gradient(100% 70% at 50% 45%, transparent 40%, rgba(7,12,28,.72) 100%);
}

/* Mobile — blur(70px) on a 1100px element is expensive on mid-range Android.
   Swap the live rings for a baked static bloom below md. */
@media (max-width: 767px){
  .arcfield__ring, .arcfield__bloom { display:none; }
  .arcfield__base{
    background:
      radial-gradient(80% 44% at 62% 4%, rgba(242,101,34,.30) 0%, transparent 60%),
      radial-gradient(120% 90% at 50% -10%, #16264F 0%, #0B1329 45%, #070C1C 100%);
  }
}

@media (prefers-reduced-motion: reduce){
  .arcfield__grid, .arcfield__ring { animation: none; }
  .arcfield__ring--a { rotate: 156deg; }   /* frozen at a good angle */
  .arcfield__ring--b { rotate: 24deg; }
  .arcfield__bloom { display:none; }
}
```

### 8.3 Cursor bloom

One `requestAnimationFrame` loop, one lerped `transform`. Desktop pointers only, and it must idle when the hero is off-screen.

```js
// src/components/hero/useBloom.js
import { useEffect } from "react";

export function useBloom(heroRef) {
  useEffect(() => {
    const el = heroRef.current?.querySelector("[data-bloom]");
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = innerWidth / 2, ty = innerHeight * 0.4, cx = tx, cy = ty;
    let raf = 0, active = true;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.045;            // heavy lag = calm, not twitchy
      cy += (ty - cy) * 0.045;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (active) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) { raf = requestAnimationFrame(tick); }
      else { cancelAnimationFrame(raf); }
    }, { threshold: 0 });

    io.observe(heroRef.current);
    addEventListener("pointermove", onMove, { passive: true });
    return () => { active = false; cancelAnimationFrame(raf); io.disconnect(); removeEventListener("pointermove", onMove); };
  }, [heroRef]);
}
```

**Why this beats the usual choices.** Particle-mesh canvases and floating blurred blobs are the two most over-used hero backgrounds on the web and both read as stock. This composition is specific to ThinkOrange: the arcs are the logo, the grid is a ledger. The lag coefficient of `0.045` is intentionally slow — fast cursor-following feels like a toy; slow feels like weight.

---

## 9. Motion system

### 9.1 Tokens

```css
--dur-instant: 120ms;   /* colour, opacity swaps */
--dur-fast:    180ms;   /* hover, focus */
--dur-base:    280ms;   /* dropdowns, chips, small transitions */
--dur-slow:    420ms;   /* scroll reveals, card entrances */
--dur-slower:  700ms;   /* hero lines, large masks */

--ease-out:   cubic-bezier(.22,1,.36,1);      /* default entrance */
--ease-inout: cubic-bezier(.65,0,.35,1);      /* movement between states */
--ease-in:    cubic-bezier(.55,.06,.68,.19);  /* exits only */
```

Springs, where used, are `{ type:"spring", stiffness: 260, damping: 30, mass: 0.9 }`.

### 9.2 The four core patterns

Only these four. A site with twelve different animation behaviours looks nervous.

**A · Reveal** — the workhorse. `opacity 0→1`, `translateY 16px→0`, `--dur-slow`, `--ease-out`, `IntersectionObserver` at `threshold: 0.18` / `rootMargin: "0px 0px -12% 0px"`, `once: true`.

**B · Stagger** — sibling groups reveal at `60ms` intervals, capped at six children. Beyond six the tail feels broken; switch to two batched groups.

**C · Line mask** — headline lines sit in `overflow: hidden` wrappers and rise from `translateY(105%)`, `--dur-slower`, `80ms` stagger. Hero and section openers only.

**D · Arc draw** — an SVG path animated via `stroke-dashoffset` tied to scroll progress. Process section connector and the scroll-progress bar only.

### 9.3 Interaction motion

| Element | Behaviour |
|---|---|
| **Primary button** | Hover: `translateY(-2px)` + `--shadow-ember` + arc sweep (a `::after` gradient band traversing `-120% → 120%` over `--dur-base`). Active: `translateY(0) scale(.985)`, `--dur-instant`. |
| **Secondary button** | Hover: border `ink-100 → ink-600`, background `transparent → ink-50`. |
| **Card** | Hover: `translateY(-4px)`, border → `ember-200`, and a `24px` arc fades in at the top-right corner. No scale — scaling cards blurs text mid-transition. |
| **Nav link** | Hover: a 2px `--gradient-ember` underline wipes in from the left, `--dur-fast`. |
| **Mega panel** | Open: `opacity 0→1` + `translateY(-8px)`, `--dur-base`. Close: `--dur-fast`, `--ease-in`. `120ms` open delay on hover-intent so the panel doesn't flash during casual mouse travel. |
| **Sticky header** | Past `80px`: height `84px → 64px`, background `transparent → rgba(7,12,28,.72)` + `blur(16px)`, `--dur-base`. Never hide the header on scroll-down — a service site needs its nav constantly reachable. |
| **Input focus** | `2px ember-300` ring at `2px` offset, `--dur-fast`. Never remove the outline without replacing it. |
| **Accordion** | `grid-template-rows: 0fr → 1fr`, `--dur-base`. Height-based animation causes jank. |
| **Stat counter** | Count from 0 on entry, `1200ms`, ease-out-expo, `tabular-nums`. Once only. |
| **Logo marquee** | Continuous `translateX`, `40s` linear, pauses on hover, duplicated track for seamless loop. |

### 9.4 Per-section motion map

| Section | Motion |
|---|---|
| Hero | Arc Field ambient (§8). Headline lines: **C** at `120ms` after mount. Sub-copy + CTAs: **A**, `+240ms`. Floating side card: **A** with spring, `+340ms`, then a `6px` idle float on a `7s` sine loop. |
| Trust strip | Marquee only. |
| Services bento | **B** across cards, `60ms` stagger. Icons draw their stroke on card entry (`stroke-dashoffset`, `600ms`). |
| About / editorial | Image: `scale(1.06) → 1` with **A**, `--dur-slower`. Text: **A**. Arc mask on the image draws once. |
| Stats | Counters (§9.3) + hairline separators wiping in horizontally, `80ms` stagger. |
| Process | **D** arc draw scrubbed to scroll progress; step nodes pop with spring as the arc reaches each. |
| Compliance Calendar | Rows **B** at `50ms`. `overdue` chip glow pulses **twice** then stops — an infinite pulse is nagging. |
| Pricing | **B**. Middle card enters `40ms` earlier and sits `8px` higher. |
| Testimonial | Crossfade `--dur-base`; quote mark rotates `-8deg → 0`. |
| Insights | **B**. Card image `scale(1.04)` on hover, `--dur-slow`. |
| CTA band | **A** only. This section is loud already; keep motion quiet. |
| Footer | No entrance animation. Footers that animate in are irritating. |

### 9.5 Restraint rules

- **Roughly 40% of elements animate.** Body paragraphs, footer content, form labels, table rows and navigation never reveal on scroll.
- **Never re-animate.** All scroll reveals are `once: true`. Re-triggering on scroll-up is the fastest way to make a site feel cheap.
- **Never animate text word-by-word or letter-by-letter.** Instant tell.
- **No scroll-jacking, no full-page section snapping, no horizontal-scroll takeover.** People come here with a deadline.
- **Smooth-scroll:** Lenis is optional, and if used, `lerp: 0.1` maximum, disabled on touch. Heavier settings make the page feel broken on trackpads.
- **Total hero animation cost ≤ 3 composited layers.** Verify in DevTools' Layers panel.

### 9.6 Reduced motion

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.01ms !important;
    scroll-behavior:auto !important;
  }
}
```

Plus, in JS: skip the bloom loop, skip counters (render final values), skip the marquee (render a static wrapped grid of logos), freeze the arcs at fixed angles. Reduced motion must produce a **complete, well-composed static page** — not a page with holes where the animation was.

---

## 10. Navigation & mega menu

### 10.1 Header

Transparent over the hero, condensing to blurred `ink-950/72` after `80px`. Height `84px → 64px`. Contents left to right: logo (mark + wordmark; wordmark hides below `sm`), primary nav, phone number with a small ember arc icon, and a primary CTA button — *[placeholder: "Book a Consultation"]*.

### 10.2 The Services mega panel

Full-width, edge-to-edge within the `1800px` container, `radius-md`, solid `ink-900` fill, `1px ink-700` border, `--shadow-lg`, `40px` padding. Opens on hover-intent (`120ms` delay) and on click/Enter for keyboard and touch.

Six columns, hairline-separated, with the growth pair set apart:

```
┌──────────────┬──────────────┬───────────────┬──────────────┊──────────────┬──────────────┐
│ GST SERVICES │ INCOME TAX   │ BUSINESS      │ ACCOUNTING   ┊ GOVERNMENT   │ LOANS &      │
│              │              │ SETUP         │ & AUDIT      ┊ TENDERS      │ FINANCE      │
├──────────────┼──────────────┼───────────────┼──────────────┊──────────────┼──────────────┤
│ Registration │ ITR Filing   │ Private Ltd   │ Bookkeeping &│ GeM          │ Business Loan│
│ Return Filing│ Tax Planning │ LLP           │  Accounting  ┊  Registration│  & Financing │
│ ITC Refunds  │   & Advisory │ One Person Co.│ Internal     ┊ Tender Doc.  │ Personal Fin.│
│ Notices &    │ TDS          │ Partnership   │  Audit       ┊  Support     │  & Debt Mgmt │
│  Litigation  │  Compliance  │ Proprietorship│ Specialised  ┊              │              │
│              │              │ MSME / Udyam  │  Audit       ┊              │              │
│              │              │ Startup India │              ┊              │              │
└──────────────┴──────────────┴───────────────┴──────────────┊──────────────┴──────────────┘
        4 statutory practice columns              growth pair, hairline-separated ┘
   ↑ column heading is a clickable category landing page
```

**Authority note.** This diagram follows `CONTENT-PLAN.md` §4, which is the source of truth for IA. It supersedes the pre-rename version of this section: *Audit & Accounting* → **Accounting & Audit** (§3.3 there), *Business Loans* → **Loans & Finance** (§3.1), plus four leaves added from the company profile (OPC, Startup India, Specialised Audit, Personal Finance). 21 service leaves, not 17.

Specifications:

- Column headings: `h4`, `canvas`, with a `16px` ember arc above. Each links to a category page (`/services/gst`).
- Child links: `body-sm`, `ink-300` → `canvas` on hover, `10px` vertical padding for a comfortable target.
- Hovering a column tints its background `ink-800` and reveals a 2px `--gradient-ember` bar along its top edge.
- **Bottom utility rail** inside the panel, above a hairline: *"Not sure what you need?"* + a text link to a guided enquiry. This converts the browsers.
- **Keyboard:** `Escape` closes and returns focus to the trigger; `Tab` moves through links in DOM order; the trigger carries `aria-expanded` and `aria-controls`; the panel is `role="group"` with an `aria-label`.
- **Never open on `:hover` alone in CSS.** Hover-intent must be JS-controlled so touch and keyboard get click semantics.

### 10.3 The DSC panel

Three columns, same construction:

| Certificates | Buy & Requirements | Token Drivers |
|---|---|---|
| Class 3 — Individual | Buy DSC Tokens | Token Driver Downloads → *hub page* |
| Class 3 — Organisation | Documents Required | *(HYP2003 · ePass 2003 · Watchdata Proxkey · mToken listed on the hub)* |
| DGFT (IEC) DSC | | |

The driver hub page (§11.9) absorbs your third level. No nested flyout.

### 10.4 Mobile navigation

Full-screen overlay from the right, `ink-950`, `--dur-base`, `--ease-out`. Accordion sections using the `grid-template-rows` technique. Category headings are tappable rows with a chevron that rotates `90deg`; a separate "View all →" link inside each opened accordion goes to the category page, so tapping the heading never becomes ambiguous. Sticky footer inside the overlay holds the phone number and the primary CTA. Minimum `48px` row height.

---

## 11. Page architecture

### 11.1 Homepage rhythm

The reference site's power comes from **alternation** — it never runs two similar sections consecutively. The surface cadence below is mandatory, and no layout archetype repeats back-to-back.

| # | Section | Surface | Archetype |
|---|---|---|---|
| 1 | Hero | Deep | Asymmetric 7/5, animated |
| 2 | Trust strip | Light | Full-bleed marquee |
| 3 | Services | Dark | Bento grid |
| 4 | Why ThinkOrange | Light | Editorial split 5/7 |
| 5 | Numbers | Light alt | Hairline row, no cards |
| 6 | How it works | Dark | Horizontal arc stepper |
| 7 | **Compliance Calendar** | Light | Data rows |
| 8 | Packages | Light alt | 3 columns, centre elevated |
| 9 | Testimonial | Deep | Single large quote |
| 10 | Insights | Light | 3 editorial cards |
| 11 | CTA band | **Ember** | Centred, the one orange surface |
| 12 | Footer | Deep | 5-column sitemap |

Deep → Light → Dark → Light → Light-alt → Dark → Light → Light-alt → Deep → Light → Ember → Deep. Read that sequence aloud; the rhythm is the design.

### 11.2 Hero

Left column (7): mono eyebrow with arc · `display-xl` headline with one `Instrument Serif Italic` phrase · a single `body-lg` line at `52ch` max · primary + secondary CTA · a thin trust line beneath (*[placeholder: registrations, years, clients]*).

Right column (5): one floating card, `ink-800`, `radius-lg`, `1px ink-700`, inner top highlight, idle float. Contents: the next three statutory deadlines pulled from the same JSON as §3.2. It previews the calendar, proves the site is alive, and gives the hero something concrete instead of a stock photograph.

Below the fold edge: the reference's circular scroll-down affordance, rebuilt as a `44px` ember-ringed button with a slow bouncing chevron.

Headline pattern — *[placeholder]*:
> **Compliance, without the** *scramble.* — GST, income tax and company filings handled end to end from Salem, for clients across India.

### 11.3 Services bento

Six categories, but **not** a 3×2 uniform grid. Uniform grids of identical cards are the strongest section-level template tell.

```
┌──────────────────────────┬─────────────┬─────────────┐
│  GST SERVICES            │ INCOME TAX  │ BUSINESS    │
│  (large, 6 cols,         │ (3 cols)    │ SETUP       │
│   image or arc graphic)  │             │ (3 cols)    │
├─────────────┬────────────┼─────────────┴─────────────┤
│ ACCOUNTING  │ GOVERNMENT │  LOANS & FINANCE          │
│ & AUDIT     │ TENDERS    │  (6 cols, horizontal)     │
│ (3 cols)    │ (3 cols)   │                           │
└─────────────┴────────────┴───────────────────────────┘
```

Category names per `CONTENT-PLAN.md` §4 — see the authority note in §10.2.

Each card: `ink-800` fill, `1px ink-700`, `radius-md`, line icon in `ember-400`, `h3` title, two lines of `ink-300` copy, and a `Learn more ↗` link that shifts `4px` right on hover. The large card carries three sub-links directly, so the highest-value service is one click from the fold.

### 11.4 Numbers

Not cards. Four figures in a single row separated by full-height `1px` hairlines, `stat`-scale numerals in `ink-600`, mono uppercase labels beneath in `ink-400`. On dark variants, numerals get the `ember` text glow (§7.3). Cards around statistics add nothing and cost whitespace.

### 11.5 How it works

Four steps on a horizontal arc: *Share your details → We assess and quote → We file → You get confirmation*. The connecting arc draws on scroll (**D**); nodes are `40px` ember-ringed circles with mono step numbers. Collapses to a vertical arc on mobile.

### 11.6 Compliance Calendar

Per §3.2. Header row: `h2` plus a filter chip group (`All · GST · Income Tax · ROC · TDS`), chips pill-shaped, active chip `ember-400` with `ink-950` text. Rows: compliance name · form/period · due date (`tabular-nums`, DD-MM-YYYY) · status chip · a chevron linking to the relevant service page. Maximum eight rows visible with a "View full calendar →" link. Data from `src/data/compliance-calendar.json`; status computed client-side from today's date.

### 11.7 Packages

Three tiers on `canvas-alt` — *[placeholder tiers, e.g. Starter / Growth / Enterprise]*. Centre card elevated: `white` fill, `--shadow-lg`, `1px ember-200`, an `ember-100` "Most chosen" pill, and `8px` higher than its neighbours. Prices in ₹ with `tabular-nums` at `stat` scale, billing period in `body-sm ink-400`. Feature lists use a small ember check glyph, never an emoji. A monthly/annual toggle mirrors the reference, with the annual saving shown as a small ember chip.

**Flag:** if fees vary by case — as they usually do in compliance work — publishing fixed prices creates a commitment problem. Consider "starting from ₹X" with a mandatory scope call, and have someone confirm this against professional-body advertising norms before launch.

### 11.8 Service page template

Applies to all ~25 leaf pages.

1. **Compact hero** — deep surface, `ink-950`, `220px` tall, static arc (no cursor bloom), breadcrumb, `h1`, one-line summary, inline CTA.
2. **Sticky sub-nav** — anchor links to the sections below; sticks under the header at `64px`.
3. **Two-column body** — 8 columns of prose (`68ch`), 4 columns of a sticky enquiry card. The card is the page's whole commercial job: name, phone, service pre-selected, submit. Keep it to four fields.
4. **What's included** — icon list, two columns.
5. **Documents required** — numbered mono list. Genuinely useful, and it ranks.
6. **Timeline & fees** — table, `tabular-nums`, `ink-50` header row.
7. **FAQ** — accordion, with `FAQPage` JSON-LD.
8. **Related services** — three cards.
9. **CTA band** — the ember surface, reused.

### 11.9 Utility template — driver downloads

Per §2.4. No animated hero. `h1` + one line + download buttons immediately, above the fold. Compatibility table (OS · architecture · version · size · date). Numbered install steps with screenshots. Troubleshooting accordion. One quiet ember-bordered card at the foot offering DSC issuance. Target LCP under 1.2s — these pages should feel instant.

### 11.10 Contact

Split 6/6: form left, details right. Form fields — name, phone, email, service (select, populated from the same nav data), message. Salem office address, map embed lazy-loaded behind a click-to-load placeholder (never load a third-party map iframe on page load — it costs 900 KB and leaks visitor data). WhatsApp and phone as prominent tappable links; on a compliance site, most enquiries arrive by phone.

### 11.11 CTA band

The only full-orange surface on the site. `ember-400` background, `ink-950` heading at `display-lg`, `ink-900` supporting line, one solid `ink-950` button with `canvas` text. Grain overlay at 2%. The oversized arc bleeds off the right edge at 12% `ink-950`.

### 11.12 Footer

`ink-950`, tall, five columns: brand block (logo, one-line description, social) · Services (six category links) · DSC · Company · Contact + the mini deadline widget. Bottom bar: copyright, CIN/GSTIN *[placeholder]*, privacy and terms links. An oversized arc at 8% opacity bleeds off the right. Because the nav is deep, the footer is the site's real sitemap — give it room.

---

## 12. Component specifications

### 12.1 Buttons

| Variant | Fill | Text | Border | Hover |
|---|---|---|---|---|
| **Primary** | `ember-400` | `ink-950` | none | `ember-500`, `-2px`, ember glow, arc sweep |
| **Secondary (light)** | transparent | `ink-600` | `1px ink-100` | `ink-50` fill, border `ink-600` |
| **Secondary (dark)** | transparent | `canvas` | `1px ink-700` | `ink-800` fill, border `ink-600` |
| **Ghost** | none | `ember-600` / `ember-200` | none | underline wipe |

Geometry: `radius-full`, `14px` vertical / `28px` horizontal padding, `body` size at weight 500, `min-height 48px`, `min-width 44px`. Icons `18px`, `8px` gap, optical-aligned. Focus: `2px ember-300` ring at `2px` offset — visible on both light and dark, which is why the ring uses `ember-300` rather than `ember-400`.

Never place two primary buttons in one viewport region. One primary, one secondary.

### 12.2 Cards

Light: `white` on `canvas` (or `canvas-alt` on `canvas`), `1px ink-100`, `radius-md`, `24–32px` padding, `--shadow-sm` at rest, `--shadow-md` on hover.
Dark: `ink-800`, `1px ink-700`, inset top highlight, no shadow.
Hover: `-4px` lift, border → `ember-200` (light) / `ember-400/40` (dark), corner arc fades in. `--dur-base`.

### 12.3 Icons

Lucide, `1.5px` stroke, `24px` at standard size, `ember-400` on dark, `ink-500` on light with an ember arc underline on hover.

**Do not put every icon in a filled circle.** Coloured icon-circles on every card is a defining generated-page look. Circles are permitted only on the six service bento cards and the four process nodes — and there they are ember-*ringed*, not ember-filled.

Never use emoji as icons anywhere on this site.

### 12.4 Forms

Inputs: `radius-sm`, `1px ink-100`, `white` fill, `48px` height, `14px` padding. Labels above, `body-sm`, `ink-500`, `500` weight — never placeholder-as-label. Focus: `2px ember-300` ring, border → `ink-400`. Error: `1px danger` border plus an icon plus a text message — colour is never the sole indicator. Success: `success` border with a check.

Given that the enquiry form is the conversion point, keep every form to five fields or fewer, and never mark anything required that you won't actually use.

### 12.5 Chips

`radius-full`, `4px/12px` padding, `body-sm`, `500`. Neutral `ink-50` / `ink-500`. Due-soon `warning` at 12% / `warning`. Overdue `ember-100` / `ember-700` with the pulse-twice glow. Filter-active `ember-400` / `ink-950`.

### 12.6 Tables

`ink-50` header row, mono uppercase `body-sm` headers, `1px ink-100` row separators, `16px` cell padding, `tabular-nums` on every numeric column, right-aligned figures. Horizontally scrollable within a bordered wrapper below `md` — never let a fee table break the page width.

---

## 13. Imagery & iconography

> **Full asset manifest, shoot brief, licensing rules and technical pipeline: `IMAGE-PLAN.md`.** This section covers treatment only.

**Photography must be Indian, and ideally Tamil Nadu.** A Salem compliance firm illustrated with American stock offices is an immediate credibility failure, and it is the most common one on this category of website. Source real photographs of the team, the office, and client meetings. If stock is unavoidable at launch, choose Indian-context imagery and plan to replace it.

**Treatment**, applied uniformly so the set reads as one shoot:

```css
filter: saturate(.88) contrast(1.04);
/* plus a navy multiply overlay at 10% for cohesion */
```

Aspect ratios are locked to `4:5` (portrait), `16:10` (landscape) and `1:1` (avatars). Every image has explicit `width`/`height` to prevent layout shift, `loading="lazy"` below the fold, and an AVIF/WebP `<picture>` chain.

**The arc mask** appears on exactly one image per page — the primary editorial image — with a `clip-path` arc removed from the top-right corner and a 2px `--gradient-ember` stroke tracing the cut.

Illustrations, if used, are line-only in `ember-400` on dark, never flat-vector "corporate Memphis" people. That style is thoroughly exhausted and reads as clip-art.

---

## 14. Accessibility

Target: **WCAG 2.2 AA**. On a site handling minors' guardians, financial documents and identity paperwork, this is a baseline, not a nice-to-have.

- Contrast per §4.5. The orange-on-white body-text failure is the one to watch — audit for it specifically before launch.
- Visible focus on every interactive element, `2px ember-300` at `2px` offset. Never `outline: none` without a replacement.
- Touch targets `≥44 × 44px`; mobile nav rows `48px`.
- Semantic landmarks: `header`, `nav`, `main`, `footer`, one `h1` per page, no skipped heading levels.
- Skip-to-content link, visible on focus.
- Mega menu: `aria-expanded`, `aria-controls`, `Escape` to close, focus returns to trigger, full keyboard traversal.
- All motion respects `prefers-reduced-motion` (§9.6), with reduced-motion producing a complete page.
- `alt` text on every meaningful image; `aria-hidden` on all decorative layers including the entire Arc Field.
- Forms: `<label for>` on every field, `aria-describedby` for errors, `aria-live="polite"` on the submission result.
- `lang="en-IN"` on `<html>`.

---

## 15. Performance & technical notes

### 15.1 Budget

| Metric | Target |
|---|---|
| LCP | < 2.0s (utility pages < 1.2s) |
| CLS | < 0.02 |
| INP | < 200ms |
| Initial JS | < 140 KB gzipped |
| Fonts | ≤ 110 KB total |
| Hero composited layers | ≤ 3 |

### 15.2 Prerendering — required

Per §2.3. Add `vite-react-ssg`, enumerate all static routes, and prerender at build. Every page needs a unique `<title>`, meta description, canonical, Open Graph tags, and JSON-LD: `Organization` + `LocalBusiness` sitewide, `Service` on service pages, `FAQPage` where FAQs exist, `BreadcrumbList` on all inner pages.

### 15.3 Libraries

| Need | Choice | Why |
|---|---|---|
| Animation | `motion` (`motion/react`) | ~18 KB with the mini bundle; scroll and spring primitives cover every pattern in §9 |
| Icons | `lucide-react`, tree-shaken | Only import used icons |
| Smooth scroll | `lenis` — **optional** | `lerp: 0.1` max, off on touch. Skip it if in doubt |
| Forms | `react-hook-form` + `zod` | Small, accessible, good error semantics |
| Routing | `react-router` | Enumerable routes for prerendering |

Do not add a component library. Tailwind plus these tokens is the design system; dropping in MUI or shadcn defaults will overwrite half of this document.

### 15.4 Tailwind v4 theme

```css
/* src/styles/theme.css */
@import "tailwindcss";

@theme {
  --color-ink-950:#070C1C; --color-ink-900:#0B1329; --color-ink-800:#101B3A;
  --color-ink-700:#16264F; --color-ink-600:#1C2C5B; --color-ink-500:#2A3E75;
  --color-ink-400:#46598E; --color-ink-300:#7A88AF; --color-ink-200:#B4BDD2;
  --color-ink-100:#DDE2EC; --color-ink-50:#F0F2F7;

  --color-ember-700:#9E3108; --color-ember-600:#C43D0A; --color-ember-500:#E85A16;
  --color-ember-400:#F26522; --color-ember-300:#FB8C1E; --color-ember-200:#FFB067;
  --color-ember-100:#FFDCBD; --color-ember-50:#FFF3E8;

  --color-canvas:#FBF9F5; --color-canvas-alt:#F5F1EA; --color-canvas-deep:#EDE7DC;

  --color-success:#1F8A5B; --color-warning:#B87A0A;
  --color-danger:#C4342B;  --color-info:#2A5FA8;

  --font-sans:"Satoshi",ui-sans-serif,system-ui,sans-serif;
  --font-serif:"Instrument Serif",ui-serif,Georgia,serif;
  --font-mono:"IBM Plex Mono",ui-monospace,monospace;

  --radius-xs:4px; --radius-sm:8px; --radius-md:12px; --radius-lg:20px;

  --ease-out:cubic-bezier(.22,1,.36,1);
  --ease-inout:cubic-bezier(.65,0,.35,1);
  --ease-in:cubic-bezier(.55,.06,.68,.19);

  --shadow-xs:0 1px 2px rgba(28,44,91,.06);
  --shadow-sm:0 2px 8px rgba(28,44,91,.07);
  --shadow-md:0 8px 24px -6px rgba(28,44,91,.10);
  --shadow-lg:0 20px 48px -12px rgba(28,44,91,.14);
  --shadow-ember:0 8px 28px -6px rgba(242,101,34,.35);
}
```

---

## 16. The twelve tells — and their antidotes

Print this. Check every screen against it before shipping.

| # | The tell | The antidote |
|---|---|---|
| 1 | Purple/indigo gradient hero | Navy Arc Field with grain (§8) |
| 2 | Floating blurred colour blobs | Arcs derived from the actual logo, masked to rings, cursor-lagged |
| 3 | Gradient-filled headline text | Never. Solid `ink-600` or `canvas`, weight for emphasis |
| 4 | Inter / Poppins at every weight | Satoshi + Instrument Serif Italic + IBM Plex Mono (§5.1) |
| 5 | `rounded-2xl` on absolutely everything | Radius contrast: 12px cards against pill buttons (§6.3) |
| 6 | Every icon inside a coloured circle | Bare line icons; circles only on 6 cards + 4 process nodes (§12.3) |
| 7 | Three identical 3-card grids in a row | Bento (§11.3), hairline stat row (§11.4), arc stepper (§11.5), data rows (§11.6) — four different archetypes |
| 8 | Everything centred, perfectly symmetric | 7/5 and 5/7 splits, text offset to columns 2–8 (§6.2) |
| 9 | Glow on every surface | Whitelist of five (§7.3) |
| 10 | Every element fades up on scroll | ~40% animate; body copy, footers, tables and forms never do (§9.5) |
| 11 | Generic Western stock photography | Indian-context photography, uniform grade, arc mask (§13) |
| 12 | Flat, plastic, vector-perfect surfaces | 3% grain on every dark surface (§7.4) |

The unifying principle: **generated pages apply every effect uniformly; designed pages apply each effect in one place, deliberately.** Scarcity is the signal.

---

## 17. Build order

1. Tokens — `theme.css`, fonts self-hosted, grain utility, base reset
2. Primitives — Button, Card, Chip, Input, Section wrapper, Container, Eyebrow
3. Header + mega menu + mobile overlay (the hardest piece; do it early while attention is fresh)
4. Footer + sitemap + mini deadline widget
5. Arc Field + Hero
6. Homepage sections in the §11.1 order
7. Compliance Calendar data + component (homepage, hero card and footer widget all consume it)
8. Service page template, then the ~25 leaf pages
9. Utility template + DSC driver pages
10. Contact + form handling
11. Prerender setup, meta and JSON-LD
12. Audit pass: contrast, keyboard, reduced motion, Lighthouse on mobile throttling

---

## 18. Open items

- **Copy and real figures.** Everything marked *[placeholder]* needs your input. Do not let generated placeholder statistics reach production on a compliance firm's site.
- **Photography.** Team and office shoot, or a vetted Indian-context stock set.
- **Logo files.** SVG of the mark, the wordmark, and a mark-only favicon lockup. The arc path should be extracted from the SVG so §3.1 reuses the real geometry rather than an approximation.
- **Pricing model.** Fixed prices versus "starting from" — see the flag in §11.7, and confirm against advertising norms for your professional registrations before publishing fees.
- **Legal pages.** Privacy policy, terms, and a refund/cancellation policy are required by Indian payment-gateway onboarding if you ever take payment on-site. These need professional review, not AI drafting.
- **Business Loans positioning.** Confirm the Growth-column grouping in §2.5, and whether any lending disclosure is required.
