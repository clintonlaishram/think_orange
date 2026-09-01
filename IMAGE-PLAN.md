# ThinkOrange Consulting — Image & Asset Plan

**Version** 1.0 · **Date** 10-08-2026
**Companions** `DESIGN.md` §13 (treatment) · `CONTENT-PLAN.md` (where images sit) · `BUILD-PLAN.md` (when they land)

---

## 1. The principle

For a compliance firm, imagery is not decoration — it is **evidence**. Every photograph answers one of three questions a visitor is silently asking:

1. *Do these people actually exist?*
2. *Do they actually do this work?*
3. *Is this certificate they're selling me genuine?*

A photograph that answers one of those earns its place. One that doesn't is filler, and filler on a trust-based site is worse than white space.

**Consequence:** this site needs roughly **18–22 unique photographs and ~30 screenshots** — not hundreds. `DESIGN.md` is a typographic, dark, minimal system. It was built to carry few images well, not many images badly. A section with no photograph reads as deliberate; a section with obvious stock reads as fake. Resist the urge to fill.

---

## 2. Three tiers — and the one you must not use

### Tier 1 — Your own photography ✅ **the goal**

Team, office, signage, the actual DSC tokens you stock, real client meetings, your partnership and incorporation certificates. Maximum credibility, zero licensing risk, and impossible for a competitor to reuse. This is what "legit" means.

### Tier 2 — Licensed Indian-context stock ⚠️ **acceptable, narrowly**

Only for *contextual* imagery: a desk, a document set, a laptop with spreadsheets, a Tamil Nadu streetscape. Legitimate, but generic, and a competitor may license the same frame. Never for anything that implies "this is our team" or "this is our office."

### Tier 3 — AI-generated people ❌ **do not, under any circumstances**

This is the one thing on this site that could genuinely damage the business. AI-generated faces are increasingly recognisable — the tell-tale ear and hand artefacts, the uncanny symmetry, the too-perfect bokeh — and detection tooling is now commodity. For a firm whose entire product is trustworthiness, being caught showing staff who do not exist is not an embarrassment, it is a credibility collapse. It also edges into misrepresentation if presented as your team.

The same applies to AI-generated "office interiors" presented as your office, and AI-generated certificates or badges of any kind.

If you have no team photographs yet, the correct answer is to show **no people at all** and lean on the typographic treatment. That is a design decision. Fake people are a lie.

---

## 3. Your highest-credibility assets — and they're nearly free

Ranked by trust earned per rupee spent. The top four cost almost nothing and most competitors never bother.

| # | Asset | Why it works | Effort |
|---|---|---|---|
| 1 | ~~**Certifying-authority partnership certificate**~~ | ⛔ **DO NOT SOURCE — 02-09-2026.** This asked for a photograph of the partnership certificate as "your single strongest verifiable credential". Clinton has since instructed that **no certifying authority be named on the site** ("do not use signx it is for the other company name", then "remove eMudhra also"), and such an image would name one on its face. CONTENT-PLAN.md §9 has the full note | — |
| 2 | **Certificate of Incorporation** | Proves the entity is real and registered. Shows CIN, which you need on the site anyway | Scan |
| 3 | **Office exterior with signage** | Proves physical existence. The single most reassuring photograph on any local professional-services site | Phone camera, good light |
| 4 | **The actual DSC tokens you stock** | You sell HYP2003 tokens. Photograph them — in the box, out of the box, in a laptop port | Phone camera, white sheet, window light |
| 5 | **Team headshots** | Answers *"who am I dealing with?"* Direct access to a named person is one of your stated differentiators — show the faces | Half-day, one photographer |
| 6 | **Portal & software screenshots** | GST portal, GeM, MCA, Tally Prime, Zoho Books. Proves competence, and on driver pages they're mandatory | Free. **Must be redacted — see §7.3** |
| 7 | **Office interior / working shots** | Warmth and scale | Same shoot as #5 |

Items 1–4 and 6 can all be produced this week with a phone and a scanner. That alone gets you to roughly 60% real imagery before any photographer is booked.

---

## 4. Asset manifest

Every image the site needs, with its route, purpose and specification. `[T1/T2]` marks the acceptable tier.

### 4.1 Homepage

| ID | Image | Placement | Ratio | Tier |
|---|---|---|---|---|
| `home-editorial` | Founder or team member at work, mid-task, not posed | §5 Why ThinkOrange, arc-masked | 4:5 | **T1** |
| `home-office` | Office exterior with signage | §14 footer band or About link card | 16:10 | **T1** |
| `trust-marks` | GeM, MCA, GSTN, Tally, Zoho wordmarks — ⛔ the two certifying-authority marks are REMOVED (CONTENT-PLAN.md §9) | §2 trust strip | SVG | See §7.4 |

| `home-hero` | Desk / workspace mid-task, or office interior. **No people unless T1.** Shot to sit behind two overlapping cards, so the visual interest must live in the outer thirds — the centre is covered | 4:5 | **T1** |

**Hero image — changed 11-08-2026.** This section previously read "the hero needs no photograph — the Arc Field plus the deadline card is the composition. Do not add one." Clinton asked for an image slot behind the hero's two cards, so `home-hero` is now a real slot.

Two constraints carry over unchanged and are not negotiable:
- It is **T1 only** — your own photograph. §2 Tier 3 still forbids an AI-generated "office interior" here exactly as it forbids AI-generated people.
- Until a real file exists, the slot renders §6's designed backdrop (an arc-masked panel), **not** a placeholder box and **not** stock. `Hero.jsx`'s `heroPicture` constant is `null` and documents the one-line change to wire the photo up.

The composition still does not depend on the photo: the two cards carry the hero on their own, which is what the original instruction was protecting.

### 4.2 About (`/about`)

| ID | Image | Ratio | Tier |
|---|---|---|---|
| `about-team-group` | Full team, natural, in the office — not a wall-lineup | 16:10 | **T1** |
| `about-founder` | Founder portrait, three-quarter, looking to camera | 4:5 | **T1** |
| `about-office-interior` | Working environment, some depth | 16:10 | **T1** |
| `about-credential-emudhra` | The partnership certificate, photographed flat or framed on the wall | 4:5 | **T1** |
| `about-credential-incorporation` | Certificate of Incorporation | 4:5 | **T1** |
| `about-location` | Salem streetscape or building context | 16:10 | T1 or T2 |

Credential photographs are more persuasive framed-on-the-wall than scanned-flat — a wall shot is unfakeable in a way a scan isn't.

### 4.3 Category hubs — 6 images

One per category. **These should mostly be screenshots or documents, not people.**

| Route | Image | Tier |
|---|---|---|
| `/services/gst` | GST portal dashboard, redacted | **T1** screenshot |
| `/services/income-tax` | Income tax e-filing portal, redacted | **T1** screenshot |
| `/services/business-setup` | MCA portal, or an incorporation document set | **T1** |
| `/services/accounting-audit` | Tally Prime or Zoho Books on screen, dummy data | **T1** screenshot |
| `/services/government-tenders` | GeM seller dashboard, redacted | **T1** screenshot |
| `/services/loans-finance` | CMA / projection working on screen, dummy data | **T1** screenshot |

Cost: an afternoon. Credibility: higher than any stock photograph, because a real portal screenshot is something only a practitioner can produce.

### 4.4 Service leaves — **not one each**

Seventeen leaves do **not** need seventeen images. Leaves inherit their category image by default. Only five earn a dedicated asset:

| Route | Image | Tier |
|---|---|---|
| `/services/gst/registration` | Document set laid out — PAN, address proof, photographs | **T1** |
| `/services/business-setup/private-limited-company` | Incorporation certificate + MOA/AOA, redacted | **T1** |
| `/services/government-tenders/gem-registration` | GeM registration flow, redacted | **T1** screenshot |
| `/services/accounting-audit/bookkeeping` | Tally/Zoho reconciliation view, dummy data | **T1** screenshot |
| `/services/accounting-audit/specialised-audit` | Stock-count or warehouse audit in progress | T1 or T2 |

### 4.5 DSC products — 6 images, all mandatory T1

This is the section where real photography converts directly into sales, because the visitor is deciding whether to trust you with an identity credential.

| ID | Shot | Ratio |
|---|---|---|
| `dsc-token-hero` | HYP2003 token, three-quarter, clean background, shallow depth | 1:1 |
| `dsc-token-box` | Retail packaging, sealed | 1:1 |
| `dsc-token-inport` | Token inserted in a laptop USB port, in use | 16:10 |
| `dsc-token-range` | Multiple token types side by side | 16:10 |
| `dsc-certificate-detail` | Certificate details on screen after install, redacted | 16:10 |
| `dsc-verification` | Video-verification step in progress (staged with a colleague, consented) | 4:5 |

A white sheet of paper as backdrop, a window for light, and a phone will produce all of these to an entirely acceptable standard. Do not use the manufacturer's marketing renders — they look like stock because they are.

### 4.6 Driver pages — ~30 screenshots, all mandatory T1

Six utility pages, each needing 4–6 numbered install screenshots. **These are not optional and they are not decorative** — they are the content. Someone at 11pm with a token their computer won't recognise needs to see the exact dialog on their screen.

Per driver (HYP2003, ePass 2003, Watchdata Proxkey, mToken):

1. Download page / installer file
2. Installer welcome dialog
3. Install path / options step
4. Completion confirmation
5. Token Manager showing the certificate detected
6. Browser or portal recognising the certificate

Capture on Windows 11 at 1440px wide, light theme, no personal data on screen, no bookmarks bar, clean desktop. Crop to the dialog with ~24px of surrounding context.

### 4.7 Remaining pages

| Route | Image | Tier |
|---|---|---|
| `/partner-with-us` | Consultation or handover between two professionals | T1 preferred |
| `/contact` | Office exterior (reuse `home-office`) + click-to-load map | **T1** |
| `/404` | None — typographic | — |
| OG/social | One templated card per route: logo + page title on navy with the arc | Generated |

### 4.8 Totals

**T1 photography: 18 frames** · **T1 screenshots: ~36** · **T2 stock: 0–3, contextual only** · **Templated OG cards: 49.**

That is one half-day photographer booking plus two afternoons of screen capture. Achievable.

---

## 5. Shoot brief

Hand this to whoever shoots it.

**Look.** Natural light wherever possible. Real workspace, tidied but not staged empty. Shallow depth of field on portraits, deeper on environment shots. Slightly cool-neutral white balance — the site's navy is cool, and warm-yellow office fluorescent will clash with it.

**Do**
- Shoot **landscape 16:10 and portrait 4:5** of every setup. The design system locks to those two ratios plus 1:1 for products
- Leave generous headroom and negative space on the right of at least three frames — the arc mask cuts the top-right corner
- Include one frame with the logo signage clearly legible
- Photograph the partnership and incorporation certificates on the wall, in situ
- Shoot mid-action: typing, reviewing a document, on a call. Not looking at the camera smiling
- Minimum 3000px on the long edge, RAW if available

**Do not**
- Handshake-with-a-stock-smile poses
- Arms folded in front of a blank wall
- Anyone holding a document with real client data visible
- Rupee notes, coin stacks, calculators-on-graphs, or any of the standard finance-stock clichés
- Group photos lined up against a wall

**Consent.** Written model consent from every identifiable person, covering website and social use. If any client appears, or any client's premises, get their written permission first. Keep the releases on file.

---

## 6. Interim strategy — launching before the shoot

You will want to ship before a photographer is booked. Sequenced so the site never looks unfinished *or* fake.

**Launch wave — this week, no photographer**
Certificates (scanned or wall-shot) · office exterior and interior on a phone · DSC token product shots on a white sheet · all portal and software screenshots · all driver install screenshots.

That covers the DSC pages, all six category hubs, all six driver pages, and Contact — the commercially important surfaces — entirely with real assets.

**Held for the shoot** — About page team and founder frames, `home-editorial`, Partner page.

**How to render those slots meanwhile:** the components render a **typographic fallback**, not a placeholder box and not stock. About's team section becomes a text-led block; `home-editorial` becomes a full-width quote using the Instrument Serif treatment from `DESIGN.md` §5.1. Both are designed to look intentional, so nothing signals "image missing."

```jsx
// components/ui/Figure.jsx — no asset, no gap
export function Figure({ src, alt, fallback, ...rest }) {
  if (!src) return fallback ?? null;   // renders the typographic alternative
  return <Img src={src} alt={alt} {...rest} />;
}
```

**What not to do in the interim:** stock people on the About page. A visitor who reverse-image-searches one stock portrait discovers the whole page is staged, and every real claim on the site is then suspect. Text-only is strictly better.

---

## 7. Legal, privacy and licensing

### 7.1 Stock sources, if you use Tier 2

| Source | Terms | Note |
|---|---|---|
| **ImagesBazaar** | Paid, commercial | Largest Indian-model library. The right choice if you ever need Indian faces legitimately |
| **Adobe Stock / iStock** | Paid, model-released | Safe, indemnified |
| **Unsplash / Pexels** | Free | ⚠️ **No model release.** Free licence covers the photograph, not the person's likeness. Avoid for any commercial use involving recognisable faces |

Keep licence receipts on file. Never source from a Google Images result.

### 7.2 Never use for any purpose

Competitor site images (including prospectlegal.in) · manufacturer marketing renders passed off as your stock · government portal logos or emblems implying endorsement · any image whose licence you cannot produce.

### 7.3 Screenshot redaction — treat as a data-protection task

Every screenshot must be scrubbed of **GSTIN, PAN, TAN, Aadhaar, DIN, names, addresses, phone numbers, email addresses, amounts, ARNs and invoice numbers.**

- Use a **test or dummy account**, or your own firm's data — not a client's, ever
- Redact by drawing an opaque `ink-700` block, then **flatten the image**. Never rely on a layer, a blur, or a CSS overlay — blurs are reversible and layers survive in the file
- Check window titles, browser tabs, taskbars and notification popups. That's where leaks hide
- Verify the exported file, not the editor canvas

Publishing a client's GSTIN in a screenshot is a personal-data disclosure under the DPDP Act 2023, on the website of the firm they hired to protect them. Have a second person check every screenshot before it ships.

### 7.4 Partner and platform marks

The trust strip displays GeM, MCA, GSTN, Tally and Zoho marks. ⛔ **The two certifying-authority marks were removed on 02-09-2026** — no certifying authority is named anywhere on the site (CONTENT-PLAN.md §9), so do not request or add an approved partner logo. **Check each remaining brand's guidelines before publishing**, and only display marks you have a genuine relationship with or are permitted to reference. Platform marks like GSTN and MCA describe portals you work with; word the strip so it reads *"we work with"*, never as endorsement or accreditation.

⚠️ The trust strip is currently commented out on the homepage (replaced by *When people call us*), so none of these render today.

---

## 8. Technical pipeline

### 8.1 Directory and naming

```
public/images/
├── team/          about-founder.jpg, about-team-group.jpg
├── office/        home-office.jpg, about-office-interior.jpg
├── credentials/   emudhra-partner.jpg, incorporation.jpg
├── products/      dsc-token-hero.jpg, dsc-token-box.jpg
├── screens/       gst-portal.png, gem-dashboard.png
├── drivers/       hyp2003-01-installer.png … epass-2003-04-complete.png
└── og/            generated at build
```

Lowercase kebab-case, semantic, numbered where sequential. No `IMG_4471.jpg`.

### 8.2 Formats and sizes

- **Photographs** → AVIF primary, WebP fallback, JPEG last resort. Widths `480 / 768 / 1024 / 1440 / 1920`
- **Screenshots** → AVIF and WebP from PNG source. Never ship raw PNG; a driver screenshot is often 800 KB as PNG and 60 KB as AVIF
- **Logos and marks** → SVG, optimised with SVGO
- Use `vite-imagetools` so variants are generated at build from a single source file

### 8.3 Budgets — enforced

| Class | AVIF ceiling |
|---|---|
| Full-width hero-class | 120 KB |
| Content photograph | 80 KB |
| Screenshot | 90 KB |
| Product 1:1 | 60 KB |
| Card thumbnail | 25 KB |
| **Total per page** | **400 KB** |

A driver page is on a 1.2s LCP budget (`DESIGN.md` §11.9). Screenshots are the only heavy thing on it — they must be tight.

### 8.4 The `<Img>` component — build in Phase 1

Every image on the site goes through one component. No bare `<img>` tags anywhere.

```jsx
// components/ui/Img.jsx
export function Img({ src, alt, ratio = "16/10", priority = false, className, sizes }) {
  const { avif, webp, fallback, width, height, lqip } = resolve(src);
  return (
    <picture className={cn("to-figure", className)} style={{ aspectRatio: ratio }}>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={fallback} alt={alt} width={width} height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={{ backgroundImage: `url(${lqip})`, backgroundSize: "cover" }}
      />
    </picture>
  );
}
```

Non-negotiables it enforces: explicit `width`/`height` on every image (CLS stays under 0.02), `aspect-ratio` reserving the box before load, an LQIP blur so nothing pops in, `lazy` everywhere except the one LCP image per page, and a required `alt`.

### 8.5 Treatment — bake the grade, keep the tint in CSS

`DESIGN.md` §13 specifies `saturate(.88) contrast(1.04)` plus a 10% navy multiply. Split it:

- **Bake `saturate` and `contrast` into the exported asset.** A CSS `filter` on a large image forces a repaint on every scroll frame and will cost you the 60fps target on mid-range Android
- **Keep the navy tint in CSS** as a pseudo-element overlay — cheap, composited, and adjustable without re-exporting

```css
.to-figure { position: relative; overflow: hidden; border-radius: var(--radius-sm); }
.to-figure::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: #1C2C5B; opacity: .10; mix-blend-mode: multiply;
}
.to-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
```

The arc mask (`DESIGN.md` §3.1) is a separate `clip-path` variant, applied to **one image per page maximum**.

### 8.6 Alt text

Descriptive and specific, because on this site the image often *is* the information.

- ❌ `alt="office"` · ❌ `alt="DSC token image"` · ❌ `alt=""` on a driver screenshot
- ✅ `alt="ThinkOrange Consulting office entrance in Salem, Tamil Nadu"`
- ✅ `alt="HYP2003 USB token inserted into a laptop port"`
- ✅ `alt="ePass 2003 installer showing the destination folder step, with the default path selected"`

Purely decorative images get `alt=""` and `aria-hidden`. Screenshots never do — a driver page read by a screen reader must still be followable.

---

## 9. Where this lands in the build

Two small additions to `BUILD-PLAN.md`:

- **Phase 1** — build `<Img>`, `Figure`, the `.to-figure` treatment and `vite-imagetools` config alongside the other primitives. Every later phase then consumes one component.
- **Phase 11** — asset production: the shoot, the screenshot session, redaction review, licence and consent filing.

Screenshots and token photography are **not** blocked on Phase 11. Produce them during Phase 3, so the DSC and driver pages ship with real assets from day one.

---

## 10. Summary

Legitimacy on this site is bought with **certificates, signage, tokens and screenshots** — four things you can produce yourself this week — far more than with a photographer. Book the photographer for the team and founder frames, because faces matter and stock faces are transparent.

The single rule to hold: **if an image can't be traced to something real about ThinkOrange, it doesn't ship.** Not stock people, not AI faces, not manufacturer renders. On a site selling trust, an unverifiable image costs more than an empty space.
