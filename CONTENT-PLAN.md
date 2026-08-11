# ThinkOrange Consulting — Information Architecture & Content Plan

**Version** 1.0 · **Date** 10-08-2026 · **Companion to** `DESIGN.md`
**Scope** 49 routes · 9 templates · 1 content data layer

---

## 1. Confirmed facts — the only things we may state as true

Everything here is sourced from the Company Profile PDF or the profile artwork. **Nothing else about the business may be asserted anywhere on the site** until you confirm it.

| Field | Value | Source |
|---|---|---|
| Legal name | ThinkOrange Consulting Private Limited | Profile |
| Location | Salem, Tamil Nadu, India | Profile |
| Phone | +91 82482 03045 | Profile |
| Email | office@thinkorange.in | Profile |
| Website | www.thinkorange.in | Profile |
| Strapline | Empowering Businesses \| Ensuring Compliance \| Driving Growth | Logo lockup |
| Positioning line | Your Trusted Partner for Tax, Compliance & Business Solutions | Profile |
| Closing CTA | Simplify compliance. Accelerate growth. | Profile |
| DSC authority | Premium partner with eMudhra, SignX and other certifying authorities | Profile PDF |
| Token stock | HYP2003 tokens | Profile PDF |
| Audience | SMEs, startups, growing enterprises & professionals across India | Profile |

**Company description** (verbatim from the profile PDF — use as the About page foundation):

> ThinkOrange Consulting Private Limited is a dynamic professional services provider offering comprehensive financial, taxation, and compliance solutions. We combine technical expertise with innovative thinking to help our clients navigate the complexities of modern business operations.

**Mission** (verbatim):

> Our mission is simple yet powerful: to be the trusted partner that helps every business owner and entrepreneur solve their problems, achieve compliance, and unlock growth opportunities.

**Four differentiators** (from the profile artwork): All solutions under one roof · Technology-driven & accurate · Pan-India, digital-first service · Client-centric, tailored solutions.

### 1.1 Still unconfirmed — must not appear on the site

CIN · GSTIN · full street address · year established · client count · years of experience · team size · team names and qualifications · any fee or price · turnaround-time guarantees · whether services are delivered in Tamil as well as English.

The draft preview HTML marks several of these in red as *[TO BE CONFIRMED]* — that instinct was correct. A compliance firm publishing an invented client count is exactly the kind of claim that damages the thing you are selling.

### 1.2 Correction to DESIGN.md

`DESIGN.md` was written assuming Delhi. It is Salem, Tamil Nadu. This changes the imagery direction (Tamil Nadu context, not North Indian), the local SEO strategy (§14), and the schema markup. Corrected in the file.

---

## 2. On sourcing content from prospectlegal.in

I analysed the site's structure and coverage. Two things you need to hear before anything gets written.

**Do not copy their copy.** Their page text is their copyright, and reusing it is infringement regardless of how much you reword the surface. That risk is real but it is not even the main problem.

**The SEO problem is worse than the legal one.** Google has already indexed prospectlegal.in. A page on thinkorange.in that substantially duplicates an indexed page will be filtered as duplicate content and will not rank — Google keeps the original and drops the copy. You would be spending your entire build budget on pages engineered to be invisible. The single reason to build 49 pages instead of 5 is organic search; duplicating a competitor destroys that reason.

**What their site is genuinely useful for**, and what I've used it for:

| What it tells us | How it's applied |
|---|---|
| Which service pages are worth having as standalone routes | Confirms the leaf-page structure in §4 |
| That DSC + token-driver downloads is a proven traffic pattern | Reinforces the utility-template priority (§9) |
| Four policy pages, not two — they carry Refund and Shipping & Delivery | §12, and this matters for you specifically |
| Page types in this sector: service landing, process/how-to, product, download, policy, contact | The nine templates in §3 |
| Services they cover that you don't: ISO certification, trademark/IP, NGO registrations, labour licences, EPF/ESIC, Shop & Establishment, IEC registration | §2.1 — expansion backlog, not v1 |
| Their homepage is a keyword-stuffed wall of bulleted lists | An anti-pattern. It ranks despite the UX, not because of it. Yours wins on clarity |

**Where your content actually comes from:** your own Company Profile PDF, which contains detailed, accurate, firm-specific service bullets for seven of nine service lines. That is a far better foundation than a competitor's marketing copy, because it is true and it is yours. The writing job in Phase 3 is expanding those bullets into full pages — not paraphrasing someone else.

### 2.1 Expansion backlog (post-launch)

Trademark registration · ISO certification (9001, 14001, 22000, 45001) · IEC/DGFT registration · Shop & Establishment · EPF & ESIC registration and returns · Section 8 / Society / Trust registration · 12A & 80G. Each is a proven search-volume category in this sector. Build the templates in v1 so adding these later is a data-file edit, not a rebuild.

---

## 3. Structural decisions

Six calls that shape everything below.

### 3.1 Two services in your profile have no home in the nav — fixed

Your profile lists nine services; your nav has eight slots and neither *Personal Finance & Debt Management* nor *Specialized Audit Services* appears. Rather than dropping them, both solve an existing problem:

- **Specialized Audit Services** becomes a third leaf under *Audit & Accounting*. Stock audit, channel-finance audit, concurrent audit and due-diligence support for CAs is a genuine B2B revenue line and a real differentiator — most local firms cannot offer it. Burying it would be a mistake.
- **Personal Finance & Debt Management** joins *Business Loans* under a renamed category, **Loans & Finance**. This also resolves the concern I raised in `DESIGN.md` §2.5: a lone "Business Loans" item sitting among statutory services looked like a broker bolt-on. As a two-leaf *Loans & Finance* category it reads as a coherent practice area.

Result: six balanced categories, every profile service accounted for.

### 3.2 Business Setup gains two leaves

Your profile PDF lists **One Person Company (OPC) registration** and **DPIIT (Startup India) registration** under incorporation, but the nav omits both. Both are high-intent search categories with low competition. Added.

### 3.3 Category naming

*Audit & Accounting* → **Accounting & Audit**. Your profile leads with accounting and bookkeeping as service #1, and "accounting" carries more search volume than "audit". Lead with the bigger term.

### 3.4 Five policy pages, not two

You listed Privacy Policy and Terms & Conditions. **You sell DSC tokens — physical goods that ship.** Razorpay, PayU and Cashfree all require a Refund/Cancellation Policy and a Shipping & Delivery Policy before they will approve a merchant account, and they check that the pages exist and are reachable. Add both now, plus a Disclaimer, or the payment integration stalls at onboarding.

These five pages need review by your CA or a lawyer. AI-drafted policy text on a site handling PAN, Aadhaar-linked DSC verification and financial documents is a liability, not a shortcut. Build the template; leave the content to a professional.

### 3.5 The mega panel absorbs the third level

Per `DESIGN.md` §10. `Token Driver Downloads` becomes one link to a hub page listing all four drivers, rather than a nested flyout. No cascading submenus anywhere.

### 3.6 Never hand-author 49 pages

This is the engineering decision that determines whether the project takes three weeks or three months. Roughly **40 of the 49 routes are the same five templates rendering different data.** Build the templates and a content data layer; generate the routes. Detail in §13 and in `BUILD-PLAN.md`.

---

## 4. Final information architecture — 49 routes

```
/                                                    Home                    T1
/services                                            Services hub            T3
/services/gst                                        GST Services            T3
  /services/gst/registration                         GST Registration        T2
  /services/gst/return-filing                        GST Return Filing       T2
  /services/gst/itc-refunds                          ITC Refunds             T2
  /services/gst/notices-litigation                   GST Notices & Litigation T2
/services/income-tax                                 Income Tax              T3
  /services/income-tax/itr-filing                    ITR Filing              T2
  /services/income-tax/tax-planning-advisory         Tax Planning & Advisory T2
  /services/income-tax/tds-compliance                TDS Compliance          T2
/services/business-setup                             Business Setup          T3
  /services/business-setup/private-limited-company   Private Limited Company T2
  /services/business-setup/llp-registration          LLP Registration        T2
  /services/business-setup/opc-registration          One Person Company    ★ T2
  /services/business-setup/partnership-firm          Partnership Firm        T2
  /services/business-setup/proprietorship            Proprietorship          T2
  /services/business-setup/msme-udyam                MSME / Udyam            T2
  /services/business-setup/startup-india-dpiit       Startup India (DPIIT) ★ T2
/services/accounting-audit                           Accounting & Audit    ▲ T3
  /services/accounting-audit/bookkeeping             Bookkeeping & Accounting T2
  /services/accounting-audit/internal-audit          Internal Audit          T2
  /services/accounting-audit/specialised-audit       Specialised Audit     ★ T2
/services/government-tenders                         Government Tenders      T3
  /services/government-tenders/gem-registration      GeM Registration        T2
  /services/government-tenders/tender-documentation  Tender Documentation    T2
/services/loans-finance                              Loans & Finance       ▲ T3
  /services/loans-finance/business-loan              Business Loan & Financing T2
  /services/loans-finance/personal-finance           Personal Finance & Debt ★ T2
/dsc                                                 DSC hub                 T3
  /dsc/class-3-individual                            Class 3 — Individual    T4
  /dsc/class-3-organisation                          Class 3 — Organisation  T4
  /dsc/dgft-iec                                      DGFT (IEC) DSC          T4
  /dsc/buy-tokens                                    Buy DSC Tokens          T4
  /dsc/documents-required                            Documents Required      T5
/dsc/drivers                                         Token Driver Downloads  T5
  /dsc/drivers/hyp2003                               HYP2003                 T5
  /dsc/drivers/epass-2003                            ePass 2003              T5
  /dsc/drivers/watchdata-proxkey                     Watchdata Proxkey       T5
  /dsc/drivers/mtoken                                mToken                  T5
/partner-with-us                                     Partner With Us         T6
/about                                               About Us                T6
/contact                                             Contact Us              T7
/privacy-policy                                      Privacy Policy          T8
/terms-and-conditions                                Terms & Conditions      T8
/refund-policy                                       Refund & Cancellation ★ T8
/shipping-delivery-policy                            Shipping & Delivery   ★ T8
/disclaimer                                          Disclaimer            ★ T8
/*                                                   404                     T9

★ added   ▲ renamed
```

**Template counts:** T1 ×1 · T2 ×21 · T3 ×8 · T4 ×4 · T5 ×6 · T6 ×2 · T7 ×1 · T8 ×5 · T9 ×1.

---

## 5. Template inventory

| ID | Template | Routes | Nature |
|---|---|---|---|
| **T1** | Home | 1 | Bespoke, hand-built |
| **T2** | Service Leaf | 21 | Data-driven, one component |
| **T3** | Category Hub | 8 | Data-driven, one component |
| **T4** | DSC Product | 4 | Data-driven, commerce-leaning |
| **T5** | Utility / Download | 6 | Data-driven, speed-first, no marketing chrome |
| **T6** | Editorial | 2 | Bespoke long-form |
| **T7** | Contact | 1 | Bespoke, form-centric |
| **T8** | Legal | 5 | Prose renderer, content from your CA |
| **T9** | 404 | 1 | Bespoke, small |

Four bespoke pages. Five templates. Everything else is data.

---

## 6. T1 — Homepage

Follows the `DESIGN.md` §11.1 surface cadence exactly. Fourteen sections; no layout archetype repeats consecutively.

| # | Section | Surface | Content | Presentation |
|---|---|---|---|---|
| 1 | **Hero** | Deep | Eyebrow: `GST · INCOME TAX · DSC · COMPLIANCE`. H1 with one serif-italic phrase. Lede: one sentence, Salem-based, pan-India, what you handle. Primary CTA *Talk to an Expert*, secondary *Explore Services*. Trust line: `Salem, Tamil Nadu · Pan-India delivery · eMudhra & SignX partner` | 7/5 asymmetric over Arc Field (`DESIGN.md` §8). Right column: floating deadline card showing the next three statutory due dates |
| 2 | **Trust strip** | Light | Certifying-authority and platform marks: eMudhra, SignX, GeM, MCA, GSTN, Tally, Zoho Books. Only marks you can legitimately display | Thin full-bleed marquee, greyscale at 60% opacity, colour on hover, pauses on hover |
| 3 | **What we do** | Dark | Six categories with a one-line promise each. Copy adapted from your profile's service descriptions | Bento grid (`DESIGN.md` §11.3). GST as the large card carrying its four leaf-links inline |
| 4 | **Who we work with** | Light | Four audience segments: SMEs & growing enterprises · Startups & founders · Professionals & consultants · Government contractors & vendors. One line each on the specific problem you solve for them | Four-column hairline-separated row, no cards. Each links to a filtered enquiry |
| 5 | **Why ThinkOrange** | Light alt | Your four confirmed differentiators, each expanded to two sentences: All solutions under one roof · Technology-driven & accurate · Pan-India, digital-first · Client-centric, tailored | 2×2 grid with oversized `01–04` mono numerals in ember. Numbers carry the hierarchy, not icons |
| 6 | **How we work** | Dark | Four steps: *Tell us what you need → We scope it and quote in writing → We file and keep you posted → You get confirmation and records*. Emphasise written scope before work starts | Horizontal arc stepper, connector draws on scroll (`DESIGN.md` §11.5) |
| 7 | **Compliance Calendar** | Light | Next 6–8 statutory deadlines from `compliance-calendar.json`. GSTR-1, GSTR-3B, TDS payment and returns, advance tax, ITR, AOC-4, MGT-7 | Data rows with filter chips. The most useful thing on the page — give it room (`DESIGN.md` §11.6) |
| 8 | **DSC band** | Deep | Class 3 Individual · Class 3 Organisation · DGFT (IEC) · Buy Tokens. Lead with the eMudhra/SignX partnership — it is verifiable authority | Four cards on dark, ember-ringed icons. A note strip: *Pricing on request — message us on WhatsApp*. **No published prices** until you confirm them |
| 9 | **Driver downloads** | Light | HYP2003 · ePass 2003 · Watchdata Proxkey · mToken, each with supported OS line | Four compact utility cards, download-glyph links. Deliberately plain — this is a service block, not a sales block |
| 10 | **Partner programme** | Light alt | Condensed pitch for CAs, tax practitioners, advocates and consultants reselling DSC. Four benefit tiles | Split 6/6, navy inset panel on the light surface, `Enquire about partnership →` |
| 11 | **Testimonial** | Deep | **Omit from v1.** You have no collected testimonials, and inventing them is both dishonest and easy to spot. Ship without it; add when you have two real ones with names and consent | — |
| 12 | **Insights** | Light | **Omit from v1.** An empty or thin blog is worse than no blog. Reserve the route and add at 4+ articles | — |
| 13 | **CTA band** | **Ember** | `Simplify compliance. Accelerate growth.` — your own line, and it is a good one. Sub-line: response within one working day. Phone + WhatsApp + form link | The single full-orange surface on the site. Centred, one dark button |
| 14 | **Footer** | Deep | Full sitemap across 5 columns, mini deadline widget, contact block, legal row | `DESIGN.md` §11.12 |

**Sections 11 and 12 are deliberately cut.** A homepage with twelve honest sections beats one with fourteen where two are fabricated. Both are pre-wired in the code as flag-gated components so they turn on the day you have content.

---

## 7. T2 — Service Leaf (21 pages)

This template earns most of the site's organic traffic. Every page answers the same six questions in the same order, because that is what someone searching *"GST registration Salem"* at 11pm needs.

| # | Section | Content | Presentation |
|---|---|---|---|
| 1 | **Compact hero** | Breadcrumb · H1 = the service name as people search it · one-sentence lede · inline `Talk to an Expert` | `ink-950`, 220px, static arc, no cursor bloom. Fast |
| 2 | **Sticky sub-nav** | Anchors to sections 4–9 | Sticks under the header at 64px, active-section highlight |
| 3 | **Overview** | 2–3 paragraphs: what the service is, who legally needs it, what happens if you don't. Written plainly, no jargon without explanation | 8-col prose at 68ch, 4-col sticky enquiry card alongside |
| 4 | **Who needs this** | 4–6 concrete triggers — turnover thresholds, inter-state supply, e-commerce selling, tender participation | Checklist, ember arc glyphs, two columns |
| 5 | **What's included** | The deliverables. Sourced directly from your profile PDF bullets | Icon list, two columns, plain — no card chrome |
| 6 | **Documents required** | The exact list. **Highest-value section on the page** — it is what people actually search for and what earns links | Numbered mono list, grouped by entity type where relevant. Copy-friendly, printable |
| 7 | **How it works** | 3–5 steps with an indicative duration each | Vertical stepper with the arc connector |
| 8 | **Timeline & fees** | Indicative working days per stage. **Fees: "on request" until you confirm a pricing model** | Table, `tabular-nums`, `ink-50` header |
| 9 | **FAQs** | 5–8 real questions. Penalties, thresholds, validity, what happens on rejection | Accordion + `FAQPage` JSON-LD |
| 10 | **Related services** | Three sibling or complementary services | Three cards |
| 11 | **CTA band** | Shared ember component | — |

### 7.1 Exemplar — `/services/gst/registration`

Build this page first and completely. It becomes the reference every other leaf is written against.

- **H1** — GST Registration in Salem, Tamil Nadu
- **Lede** — New GST registration, amendments, additional place of business and multi-state registration, prepared correctly the first time so you avoid queries and rejection.
- **Who needs this** — turnover above the threshold for goods or services · inter-state supply · e-commerce selling · casual taxable person · reverse charge liability · voluntary registration to claim input credit
- **What's included** *(from your profile)* — GST registration for new businesses · document preparation and verification · application filing and ARN tracking · clarification and query response · GSTIN certificate handover · post-registration compliance setup
- **Documents required** — grouped: Proprietorship / Partnership / LLP / Private Limited. Each with PAN, Aadhaar, photograph, proof of business address, bank details, authorisation letter, board resolution where applicable
- **FAQs** — How long does registration take? · What if the application is rejected? · Do I need separate registration per state? · What is the turnover threshold? · Can I register voluntarily? · What happens if I trade without registering?
- **Related** — GST Return Filing · Bookkeeping & Accounting · Class 3 DSC — Organisation
- **Target queries** — gst registration salem · gst registration consultant tamil nadu · gst registration documents required · new gst registration process

### 7.2 The remaining sixteen

Each gets the same structure, seeded from your profile PDF bullets. Full source bullets, decoded from the PDF, are preserved in §15 so the writing phase has ground truth. Priority order for writing, by commercial value:

1. GST Registration ← exemplar
2. GST Return Filing
3. ITR Filing
4. Private Limited Company
5. Bookkeeping & Accounting
6. GST Notices & Litigation
7. MSME / Udyam
8. LLP Registration
9. GeM Registration
10. TDS Compliance
11. ITC Refunds
12. Business Loan & Financing
13. Tax Planning & Advisory
14. Proprietorship
15. OPC Registration
16. Startup India (DPIIT)
17. Internal Audit · Specialised Audit · Partnership Firm · Tender Documentation · Personal Finance

---

## 8. T3 — Category Hub (8 pages)

| # | Section | Content | Presentation |
|---|---|---|---|
| 1 | Compact hero | Breadcrumb, category H1, one-paragraph positioning | Same as T2 hero |
| 2 | Intro | Two paragraphs on the category as a practice area, plus who it serves | 7/5 split, right side a navy inset listing the child services as links |
| 3 | Services in this category | Every child, name + two-line description + `Read more →` | Cards, count-aware grid: 2 children → 2-col, 3 → 3-col, 4+ → bento |
| 4 | Common questions | 4–5 category-level FAQs | Accordion |
| 5 | Why us for this category | Three points specific to the practice area | Hairline row |
| 6 | Related categories | Two or three | Compact cards |
| 7 | CTA band | Shared | — |

`/services` (the top hub) is a variant: all six categories with their children listed inline, plus the Who-we-work-with block reused from the homepage. It is the sitemap page users actually use.

---

## 9. T4 — DSC Product (4 pages) and T5 — Utility (6 pages)

### T4 — DSC product pages

Closer to a product page than a service page, because the buying decision is short.

1. Compact hero — certificate type, validity options, `Enquire on WhatsApp`
2. What it is used for — income tax portal, GST portal, MCA/ROC, e-tendering, EPFO, DGFT/ICEGATE. Concrete portal names, since that is how people search
3. Validity and token — 2-year / 3-year, FIPS-compliant token, what ships in the box
4. Documents required — with the video-verification step called out, since it surprises people
5. How to get it — 4 steps, same-day where applicable
6. Pricing — **"on request" until confirmed.** A WhatsApp CTA, not a fake price
7. Driver support — link across to the relevant driver page
8. FAQs
9. CTA

**Authority note:** lead every DSC page with the eMudhra / SignX partnership. It is your strongest verifiable credential and it directly answers the buyer's real question — *is this certificate genuine?*

### T5 — Utility pages

Per `DESIGN.md` §2.4 and §11.9. Covers the four driver pages, the drivers hub, and Documents Required for DSC.

**No animated hero. No marketing chrome above the fold.** Structure:

1. H1 + one line + **download buttons immediately**
2. Compatibility table — OS, architecture, version, file size, release date
3. Installation steps — numbered, screenshot per step
4. Troubleshooting accordion — token not detected, driver install fails, browser can't see the certificate, Java/portal issues
5. One quiet ember-bordered card at the foot: *Need a new DSC? We issue Class 3 certificates — [enquire]*

That final card is the entire commercial mechanism on these pages. Everything above it exists to be genuinely useful.

**Two engineering flags.** First, do not host third-party driver binaries yourself without checking the vendor's redistribution terms — link to the official source, or host with permission. Second, if you do host files, serve them with correct `Content-Type` and a checksum shown on the page; a compliance firm distributing unverifiable executables is a bad look.

Target LCP on these pages: **under 1.2 seconds.**

---

## 10. T6 — Editorial (2 pages)

### `/about`

1. Compact hero — *About ThinkOrange Consulting*
2. Who we are — built on the verbatim company description and mission from §1. Two to three paragraphs
3. What we believe — expand the three strapline pillars: Empowering Businesses · Ensuring Compliance · Driving Growth. One short paragraph each
4. What we do — the six categories as a compact linked list
5. How we work — written scope before work starts, direct access to the person handling your file, plain-English answers
6. Where we are — Salem, Tamil Nadu, serving clients pan-India. Map, lazy-loaded behind a click-to-load placeholder
7. CTA band

**Held for your input:** founding year, team, credentials, client numbers, photographs. The page is designed to read as complete without them, with slots ready.

### `/partner-with-us`

The DSC channel-partner programme — from your profile: *"DSC business partnership opportunities for entrepreneurs and professionals."*

1. Hero — *Become a ThinkOrange DSC Partner*
2. Who it's for — CAs, tax practitioners, advocates, consultants, IT service providers
3. How it works — 4 steps: apply → get onboarded → order per client → we handle issuance and dispatch
4. What you get — 4 tiles. **Commission structure, joining fee and processing times must be confirmed by you before this page publishes.** The draft preview asserted "no upfront investment" and "same-day processing" — those are commitments, not copy
5. What we handle — verification, dispatch, driver support, renewal reminders
6. Partner enquiry form — name, firm, city, practice type, expected monthly volume
7. FAQs
8. CTA

---

## 11. T7 — Contact

Split 6/6.

**Left — details.** Phone `+91 82482 03045` (tel: link) · WhatsApp (wa.me link, pre-filled message) · Email `office@thinkorange.in` · Office: Salem, Tamil Nadu *[full address pending]* · Office hours *[pending confirmation]* · Map, click-to-load.

**Right — enquiry form.** Name · Phone/WhatsApp · Email · Service required (select, populated from the same route data that builds the nav — one source of truth) · Message. Five fields, no more.

**Submission:** EmailJS, matching the InscribeWebsite pattern — no backend required. Three things that pattern needs hardening for a compliance site:

- A honeypot field plus a minimum time-to-submit check. A public EmailJS key is spammable and the template ID is visible in the bundle.
- Client-side rate limiting via `localStorage`, and EmailJS's own per-key limits configured.
- **A privacy-policy line disclosing that enquiry data transits a third-party service.** You are collecting name, phone and business details; that disclosure is required, not optional.

A prominent floating WhatsApp button sitewide. In this sector most enquiries arrive by WhatsApp, not by form.

---

## 12. T8 — Legal (5 pages)

One prose renderer, five content files. Structure: H1, last-updated date (DD-MM-YYYY), auto-generated table of contents from `h2`s, numbered sections, contact block at the foot.

| Page | Why it exists |
|---|---|
| Privacy Policy | DPDP Act 2023 obligations; must disclose the EmailJS transit, analytics, and how enquiry data is retained |
| Terms & Conditions | Scope of engagement, limitation of liability, client responsibilities |
| Refund & Cancellation | **Payment-gateway onboarding requirement** |
| Shipping & Delivery | **Required — you ship physical DSC tokens** |
| Disclaimer | That site content is general information, not professional advice on a specific matter |

**Content comes from your CA or lawyer, not from this build.** The template renders whatever prose you supply. Ship placeholder pages that say the policy is being finalised rather than publishing AI-drafted text you haven't had reviewed — an unreviewed privacy policy on a site handling PAN and Aadhaar-linked verification is a liability.

---

## 13. Content data layer

The mechanism that turns 40 routes into 5 components. One directory, plain JS objects, no CMS.

```
src/content/
├── nav.js                  # single source of truth — builds mega menu, footer, sitemap, form dropdown, routes
├── services/
│   ├── _schema.js          # schema + validator (npm run content:check)
│   ├── index.js            # registry of WRITTEN leaves
│   ├── gst-registration.js # the exemplar — §7.1
│   ├── gst-return-filing.js
│   └── … 21 leaf files
├── dsc/
│   ├── products.js         # 4 DSC products
│   └── drivers.js          # 4 drivers + compatibility matrices
├── statutory.js            # ⚠️ every tax-law fact, defined ONCE
├── turnaround.js           # our own service promises, null until confirmed
├── compliance-calendar.js  # recurring statutory due dates
├── faqs/                   # shared FAQ pools
└── legal/                  # 5 prose files
```

**Everything under `src/content/` must be importable by plain Node**, not just
Vite — the review scripts and Phase 9's prerender/sitemap generator read this
directory outside the bundler. So content files use relative imports with
explicit `.js` extensions, not the `@/` alias, which Node ESM cannot resolve.

### 13.0 Two kinds of claim — keep them apart

The single most important structural decision in the content layer. Added during
Phase 3a after the validator caught invented turnaround times in the exemplar.

| | `statutory.js` | `turnaround.js` |
|---|---|---|
| Asserts | What the **law** says | What **ThinkOrange promises** |
| Example | "GST approval takes 7 working days" | "We review your documents in 1–2 days" |
| Verifiable? | Yes, against the Act and Rules | No — it is a commitment, not a fact |
| Who signs it off | A practising CA | Clinton |
| Default state | Researched value + legal basis + source | **`null`** until confirmed |
| Renders as | The value | A neutral phrase, never a number |

Both are enumerated into `CONTENT-REVIEW.md` by `npm run content:review`, in
separate tables addressed to separate people. **No statutory number, form code,
deadline, penalty or turnaround estimate may be typed directly into a leaf
file** — `npm run content:check` fails the build if one is.

Why this matters more here than on a normal site: the model drafting this
content has a training cutoff that predates the current financial year. Phase 3a
research surfaced the **Rule 14A simplified registration scheme**, effective
01-11-2025, which would not have been written from recall. Isolating every such
fact into one reviewable file is the only way that stays manageable across 21
pages.

### 13.1 Service leaf schema

```js
export default {
  slug: "gst-registration",
  category: "gst",
  title: "GST Registration",
  h1: "GST Registration in Salem, Tamil Nadu",
  meta: {
    title: "GST Registration in Salem | ThinkOrange Consulting",
    description: "…155 chars…",
    keywords: ["gst registration salem", "gst registration consultant tamil nadu"],
  },
  lede: "…one sentence…",
  overview: ["para 1", "para 2", "para 3"],
  whoNeedsThis: ["…", "…"],
  included: [{ title: "…", desc: "…" }],
  documents: [{ group: "Private Limited Company", items: ["…"] }],
  process: [{ step: 1, title: "…", desc: "…", duration: "1 working day" }],
  timeline: [{ stage: "…", days: "2–3" }],
  fees: null,                       // null renders "On request" — never invent a number
  faqs: [{ q: "…", a: "…" }],
  related: ["gst-return-filing", "bookkeeping", "dsc-class-3-organisation"],
};
```

**`nav.js` is the keystone.** The mega menu, mobile accordion, footer sitemap, breadcrumbs, related-service resolution, the contact form's service dropdown, the router's route table, and the XML sitemap all derive from it. Change a service name in one place and every surface updates. Getting this file right in Phase 2 is what makes Phases 5–7 fast.

---

## 14. SEO plan

### 14.1 Two distinct strategies

**Local — Salem and Tamil Nadu.** Winnable. "GST consultant Salem", "company registration Salem", "tax consultant Tamil Nadu". Requires: `LocalBusiness` schema with the real address and coordinates, a Google Business Profile, city names in H1s and meta on service leaves, consistent NAP (name-address-phone) across the footer and schema.

**National — DSC and drivers.** Location-agnostic and genuinely winnable because intent is technical, not geographic. "ePass 2003 driver download", "HYP2003 token driver", "DSC documents required", "Class 3 DSC for GST portal". These pages will likely out-traffic everything else combined.

Do **not** chase "GST registration India" — you will not outrank ClearTax, IndiaFilings or Vakilsearch, and the effort spent trying is better invested in the two lanes above.

### 14.2 Per-page-type requirements

| Type | Schema | Notes |
|---|---|---|
| All | `Organization`, `LocalBusiness`, `BreadcrumbList` | NAP consistent everywhere |
| T2 service leaf | `Service` + `FAQPage` | Unique title/description per page, no templated duplication |
| T3 category hub | `CollectionPage` + `BreadcrumbList` | Must add value, not just list children |
| T4 DSC product | `Product` (no price until confirmed) + `FAQPage` | — |
| T5 utility | `SoftwareApplication` or `HowTo` for install steps | Fastest pages on the site |

Plus: XML sitemap generated from `nav.js`, `robots.txt`, canonicals on every route, Open Graph and Twitter cards, `lang="en-IN"`.

### 14.3 Prerendering

Non-negotiable, per `DESIGN.md` §2.3. `vite-react-ssg` over all 49 routes at build time. Without it none of the above works.

### 14.4 Tamil-language version

The draft preview claimed bilingual English/Tamil delivery. If that is accurate it is a real competitive advantage in Salem and worth a v2 language route. Confirm before claiming it anywhere.

---

## 15. Source bullets from your Company Profile PDF

Ground truth for the writing phase. Decoded from the PDF; these are your own words.

**Accounting & Bookkeeping** — Complete bookkeeping and accounting services using Tally Prime and Zoho Books · Monthly, quarterly and annual financial statement preparation · Bank reconciliation and cash flow management · Accounts payable and receivable management · Business setup support and accounting system implementation

**GST Services & Advisory** — GST registration for new businesses · Monthly and quarterly GST return filing (GSTR-1, GSTR-3B) · Annual GST return filing (GSTR-9, GSTR-9C) · GST notice handling and representation before GST authorities · Input tax credit (ITC) reconciliation and optimisation · GST advisory and compliance consulting

**Income Tax Services** — Income Tax Return (ITR) filing for individuals, firms, LLPs and companies · Tax planning and advisory services (legal tax optimisation) · TDS return filing and compliance · Income tax notice handling and representation · Tax assessment and litigation support

**Business Loan & Financing Support** — Bank loan documentation and application support · Business projection reports and financial forecasting · CMA data preparation for working capital and term loans · Loan negotiation and coordination with banks and financial institutions · Personal loan and mortgage documentation assistance

**Digital Signature Certificate (DSC) Services** — DSC issuance for individuals, companies and government organisations · Premium partner with eMudhra, SignX and other leading certifying authorities · HYP2003 DSC token sales · DSC renewal and technical support · DSC business partnership opportunities for entrepreneurs and professionals

**Government Tender Support Services** — End-to-end tender documentation and application support · GeM (Government e-Marketplace) registration and bidding assistance · Tender portal navigation and online submission · Coordination with government departments and officials

**Business Incorporation & Setup Services** — Private Limited Company registration · Limited Liability Partnership (LLP) incorporation · Partnership Firm registration · One Person Company (OPC) registration · DPIIT (Startup India) registration and certification · PAN, TAN and statutory registration assistance

**Personal Finance & Debt Management** *(one-line from profile artwork)* — Personal planning, budgeting and structured debt strategies for lasting stability

**Specialised Audit Services** *(one-line from profile artwork)* — Stock, channel-finance and concurrent audits, plus due-diligence support for CAs

---

## 16. Voice and copy rules

- **Second person, active, present tense.** "We file your GSTR-3B" — not "GSTR-3B filing services are provided."
- **Lead with the reader's problem**, not your capability.
- **Explain every acronym on first use per page.** GSTR-3B, ITC, DPIIT, CMA, DSC, ARN, DIN. Your visitor is a business owner, not a practitioner.
- **No superlatives without evidence.** "Leading", "best", "trusted by thousands" are worthless without numbers, and you don't have the numbers yet.
- **Indian English, INR, lakh/crore, DD-MM-YYYY** throughout.
- **Never state a fee, turnaround guarantee or client count** until confirmed. `fees: null` renders "On request" — that is the correct behaviour, not a gap.
- **Sentence case headings.** No Title Case, no ALL CAPS outside mono eyebrows.
- **Word budgets** — leaf overview 150–250 · category intro 120–180 · FAQ answer 40–90 · service card 20–30.
