import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubNav } from "@/components/layout/SubNav";
import { ProductShot } from "@/components/ui/ProductShot";
import { ArcGlyph } from "@/components/ui/ArcGlyph";
import { Img } from "@/components/ui/Img";
import { ArcRings } from "@/components/ui/ArcRings";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  dscPartnerPromo,
  dscDocumentsPage,
  dscValidityFaqsPage,
  // ⛔ eSign PAUSED — 21-08-2026. dscEsignVsDscPage,
  dscDriversHub,
  dscProducts,
} from "@/content/nav";
import { getDscProduct } from "@/content/dsc/products";
import { dscGroups } from "@/content/dsc/groups";
import { dscIcon } from "@/content/dsc/icons";
import { dscHubContent } from "@/content/dsc/hub-content";
import { dscValidityRenewalContent } from "@/content/dsc/validity-renewal-faqs";
// ⛔ eSign PAUSED — 21-08-2026.
// import { esignOrDscContent } from "@/content/dsc/esign-or-dsc";
import { Button } from "@/components/ui/Button";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

const DOCUMENTS_TEASER =
  "What to have ready before you apply, grouped by certificate type.";

/**
 * A card's teaser line, resolved from the linked page's OWN content file
 * rather than restated here — the same "select by reference" discipline the
 * Documents Required page and the homepage FAQ row already follow, so an
 * edit to a product's or a utility page's lede can never leave this hub
 * quietly describing the old version. Returns null for a page with no
 * content file yet (the card still renders, just without a teaser).
 */
function itemTeaser(item) {
  const product = getDscProduct(item.slug);
  if (product?.lede) return product.lede;
  if (item.slug === dscValidityFaqsPage.slug) return dscValidityRenewalContent.heroLede;
  // ⛔ eSign PAUSED — 21-08-2026.
  // if (item.slug === dscEsignVsDscPage.slug) return esignOrDscContent.heroLede;
  if (item.slug === dscDriversHub.slug)
    return dscDriversHub.children.map((driver) => driver.label).join(" · ");
  if (item.slug === dscDocumentsPage.slug) return DOCUMENTS_TEASER;
  return null;
}

// 19-08-2026 (Clinton): eSign is shown BEFORE Tokens & Resources on this page.
// A display-order override only — `dscPanelColumns` (nav.js) keeps the mega
// panel's own left-to-right order untouched, since the menu's grouping is the
// client's approved layout there. Surfaces are still assigned by RENDERED
// position (light-alt / light / light-alt), not by group identity, so
// reordering moves the content and leaves the page's colour rhythm exactly as
// it was. A group not named here keeps its menu-relative position after the
// ones that are, so a future menu column still renders.
const GROUP_DISPLAY_ORDER = [
  "Digital Signature Certificates",
  // ⛔ eSign PAUSED — 21-08-2026. "eSign Solutions",
  "Tokens & Resources",
];

// 20-08-2026 (Clinton: "most of section is look too plain"). The page ran
// deep → light → light-alt → light → light-alt → light → light-alt → ember,
// i.e. six light surfaces in a row with only a tonal shift between them. The
// homepage never does that — its rhythm puts a genuinely DARK band between
// light ones (DESIGN.md §11.1), which is where its sense of depth comes from.
// The eSign group is the one that becomes dark: it is the smallest group, it is
// the product family that genuinely differs from the rest of the page, and a
// surface change reinforces that rather than just decorating it.
//
// ⚠️ Position-independent ON PURPOSE. `dark` differs from BOTH `light` and
// `light-alt`, so this override cannot create two consecutive identical
// surfaces at ANY index — which keeps `GROUP_DISPLAY_ORDER` free to move and
// keeps a future menu column safe. Verified against the rendered DOM, not
// assumed.
// ⛔ eSign PAUSED — 21-08-2026, AND THIS LINE IS THE CONSEQUENCE WORTH KNOWING.
// The dark band was the eSign group. With eSign off, leaving this as "esign"
// matches nothing and the page loses its only dark surface — straight back to
// the run of light-on-light that the 20-08-2026 premium pass existed to fix.
// Reassigned to the tokens group so the band survives; the property that makes
// this safe is unchanged, since `dark` differs from BOTH `light` and
// `light-alt` and so cannot create two consecutive identical surfaces at any
// index. ⚠️ ON RESTORING eSIGN, put this back to "esign" — the eSign group is
// the smaller, genuinely different product family and is the better band.
// const DARK_GROUP_KEY = "esign";
const DARK_GROUP_KEY = "tokens";

// At most ONE image per group, and only for a group whose card count leaves
// real room beside it. An image squeezed next to a five-card grid reads as
// "an image was added", not as a layout that wanted one — which is why the
// Certificates and Tokens groups get icons and no picture.
//
// This is the same asset the homepage DSC band uses, and the only DSC
// illustration the project owns besides the token photograph. IMAGE-PLAN.md §2
// bars AI-generated people, offices and certificates; this is a generic
// unsigned document with no name, PAN or issuer marks — the same reasoning
// `DscShowcase` and the homepage band already rely on. Its provenance is still
// worth a human check before launch (recorded in CLAUDE.md).
const GROUP_ASIDE = {
  // ⛔ eSign PAUSED — 21-08-2026. Keyed by group, and the eSign group no longer
  // exists, so this is inert: `aside` resolves to undefined and every group
  // renders the full-width grid. Deliberately NOT re-pointed at another group —
  // the comment above is explicit that an image only belongs beside a group
  // with two cards, and both surviving groups have four or more.
  esign: {
    src: "/images/home/dsc.png",
    alt: "A signed digital document on a laptop beside a USB signing token.",
    width: 1050,
    height: 711,
  },
};

function groupSurface(group, index) {
  if (group.key === DARK_GROUP_KEY) return "dark";
  return index % 2 === 0 ? "light-alt" : "light";
}

function orderGroupsForDisplay(groups) {
  const rank = (group) => {
    const index = GROUP_DISPLAY_ORDER.indexOf(group.label);
    return index === -1 ? GROUP_DISPLAY_ORDER.length : index;
  };
  // Stable sort — equal ranks (i.e. unlisted groups) keep menu order.
  return [...groups].sort((a, b) => rank(a) - rank(b));
}

// T3 variant for /dsc — CONTENT-PLAN.md §4/§9. Separate from CategoryHub
// (see that file's own comment) because /dsc's children are a mix of T4
// product pages and T5 utility pages, not a uniform list of service leaves —
// a different data shape, not a different design language.
//
// --- 20-08-2026, premium pass ---------------------------------------------
// Clinton: "optimise the DSC module… make the design clean and premium, right
// now it looks plain… add background texture shape… make hero section
// premium… I want a different background design for each group."
//
// What changed here, and what deliberately did not:
//   - The three group presentation maps that used to live in this file
//     (COLUMN_EYEBROWS / _HEADINGS / _LEDES) and the `groupId` helper moved to
//     `content/dsc/groups.js`, which also derives which group any DSC slug
//     belongs to. That is what lets a product page and a driver page carry the
//     same background as the group section they were reached through — before
//     this, nothing outside this file knew groups existed.
//   - Each group section now renders its own `SurfaceTexture` variant through
//     `Section`'s new `texture` prop, plus a mono group index and a hairline
//     rule in the header.
//   - The hero is 7/5 with a spec row (see `PageHero`'s new props). Every
//     value in that row is DERIVED — counts off nav.js, "On request" from the
//     same `fees: null` discipline every product page follows, and the two
//     certifying authorities, which hub content already asserts. Nothing in
//     it needs confirming.
//   - Surface alternation, count-aware grid rule, teaser-by-reference and the
//     menu-derived membership are all unchanged. This is a treatment pass, not
//     a restructure.
export default function DscHub({ path }) {
  // The group sections alternate light-alt/light, so which surface the FAQ row
  // may use depends on how many groups the menu has — derived rather than
  // hardcoded, or adding a menu column would silently put two identical
  // surfaces back to back (DESIGN.md §11.1's alternation).
  const groups = orderGroupsForDisplay(dscGroups);
  const faqSurface = groups.length % 2 === 0 ? "light-alt" : "light";
  const whySurface = faqSurface === "light" ? "light-alt" : "light";

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "Digital Signature Certificates",
          description: dscHubContent.meta?.description ?? dscHubContent.heroLede,
          path,
        })}
      />

      <PageHero
        path={path}
        // Was "Digital Signature Certificates" — the same string as the H1
        // directly beneath it, which read as a duplication rather than a
        // category label.
        // ⛔ eSign PAUSED — 21-08-2026: was "DSC & eSign".
        eyebrow="Digital Signatures"
        h1="Digital Signature Certificates"
        lede={dscHubContent.heroLede}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
        texture="seal"
        textureId="dsc-hub-hero"
        aside={<HeroHighlights highlights={dscHubContent.heroHighlights} />}
        spec={heroSpec()}
      />

      {/* Built from the SAME `groups` array the sections below render from, so
          a nav.js change that adds or reorders a DSC menu column updates the
          bar, the sections and the menu together. The section id is derived in
          exactly one place (`dscGroupId`, in groups.js), so a tab can never
          point at an id that was spelled differently. */}
      <SubNav
        sections={[
          ...groups.map((group) => ({ id: group.id, label: group.eyebrow })),
          ...(dscHubContent.faqs?.length > 0 ? [{ id: "faqs", label: "FAQs" }] : []),
        ]}
      />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7 max-w-[68ch] space-y-5 text-body-base sm:text-body-lg text-ink-500">
              {dscHubContent.intro.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </Reveal>
            <Reveal delay={0.14} className="lg:col-span-5">
              <ProductShot
                src="/images/drivers/dsc-card.png"
                alt="A HYP2003 USB cryptographic token, the device a Class 3 certificate is issued on."
                width={1143}
                height={370}
                caption="Every certificate ships on a token"
                gradientId="dschub-shot-arc"
                // Tighter padding than the default here: this asset is a wide,
                // flat object (1143×370) rather than a tall scene, so the
                // component's default vertical padding left it swimming in a
                // panel twice its height. twMerge lets the caller win.
                className="px-5 py-9 md:px-7 md:py-11"
                glowClassName="h-[72%] w-[95%]"
                imgClassName="max-w-[520px]"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* These sections MIRROR the DSC mega panel's own grouping and are driven
          by the same `dscPanelColumns` export (nav.js) the panel renders from
          (via `dscGroups`) — so "View all DSC services" can never present a
          different structure or membership from the menu it's reached through.
          ORDER is the one deliberate exception, see `GROUP_DISPLAY_ORDER`.
          Each group's `texture` is its own motif and follows the reader onto
          every page inside the group. */}
      {groups.map((group, groupIndex) => {
        const surface = groupSurface(group, groupIndex);
        const aside = GROUP_ASIDE[group.key];

        return (
        <Section
          key={group.label}
          id={group.id}
          surface={surface}
          texture={group.texture}
          textureId={`dsc-hub-${group.key}`}
        >
          <Container className="relative">
            <GroupHeading group={group} index={groupIndex} dark={surface === "dark"} />

            {/* A group with a GROUP_ASIDE entry gets a 7/5 split; the others
                run the full-width grid. ⛔ eSign PAUSED — no group currently
                has one, so every group renders full width.
                Deliberately ONE image per group at most, and only where the
                content leaves space for it — an image squeezed beside a
                five-card grid is what "added an image" looks like, rather than
                a layout that wanted one. */}
            <div
              className={cn(
                "mt-10",
                aside && "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
              )}
            >
              <div className={cn(aside && "lg:col-span-7")}>
                <div
                  className={cn(
                    "grid grid-cols-1 gap-5",
                    group.hasAside
                      ? "sm:grid-cols-2"
                      : group.items.length === 2
                        ? "sm:grid-cols-2"
                        : "sm:grid-cols-2 lg:grid-cols-3"
                  )}
                >
                  {group.items.map((item, index) => (
                    <Reveal
                      key={item.path}
                      delay={Math.min(index, 5) * 0.06}
                      className={
                        !aside && group.items.length >= 4 && index === 0
                          ? "lg:col-span-2"
                          : undefined
                      }
                    >
                      <GroupCard
                        item={item}
                        icon={dscIcon(item.slug)}
                        dark={surface === "dark"}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>

              {aside && (
                <Reveal delay={0.18} className="lg:col-span-5">
                  {/* Rendered directly on the dark surface with no plinth —
                      exactly how the homepage DSC band uses this same asset.
                      `ProductShot`'s dark panel exists for a transparent PNG
                      sitting on a LIGHT section (the token, in the intro
                      above); on ink it would be a box around a box. */}
                  <Img
                    // Transparent PNG rendered straight onto the dark surface —
                    // no photo-shaped box, so no skeleton. See ProductShot.
                    skeleton={false}
                    {...aside}
                    ratio={`${aside.width} / ${aside.height}`}
                    className="mx-auto w-full max-w-[520px] !bg-transparent"
                  />
                </Reveal>
              )}
            </div>

            {groupIndex === 0 && (
              <Reveal as="p" className="mt-8 text-body-sm text-ink-400">
                Pricing on request for every certificate and token — message us on WhatsApp for a
                written quote.
              </Reveal>
            )}
          </Container>
        </Section>
        );
      })}

      <Section id="faqs" surface={faqSurface}>
        <FaqSection
          heading="About our DSC services"
          intro="What people ask before buying a certificate — validity, tokens, documents and what happens at renewal."
          items={dscHubContent.faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </Section>

      <Section surface={whySurface}>
        <Container>
          {/* Label promoted to heading, as on the homepage's WhyThinkOrange and
              /about: this section carried a label and no heading, and promoting the
              existing string beats writing a new sentence. SectionHeading reveals
              itself, so the wrapper Reveal that used to be here is gone. */}
          <SectionHeading eyebrow="Why us" heading="Why ThinkOrange" />
          {/* 20-08-2026: was three plain paragraphs in a divided row, which is
              the flattest thing a light section can be. This is the homepage's
              own archetype for exactly this content — `WhyThinkOrange` pairs a
              big mono ember numeral with the copy (DESIGN.md §11.4's "not
              cards… hairlines… cost whitespace"), so the section gets scale and
              a warm accent without a box or an icon per point.

              No headings were invented to sit above these sentences: each
              `whyUs` entry is one complete claim already reviewed in
              hub-content.js, and topping it with a three-word label derived
              from its own opening would just say the same thing twice. */}
          <Stagger className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {dscHubContent.whyUs.map((point, index) => (
              <div key={index} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-stat font-black leading-none text-ember-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-body text-ink-500">{point}</p>
              </div>
            ))}
          </Stagger>

          {/* Partner Programme — added 19-08-2026 for the same reason the
              groups above are menu-derived: the 17-08-2026 restructure pulled
              "Partner With Us" out of the navbar entirely and moved it INTO
              the DSC panel as a promo card, so the DSC hub is now the page
              that has to carry it too. Content comes from that card's own
              `dscPartnerPromo` (nav.js), so the two can't drift.
              `.panel-dark` + `data-surface="dark"` is the established pattern
              for a dark panel on a light section (PartnerProgramme, and the
              mega panel's own PanelPromo) — deliberately not `.card-dark`,
              since this panel is not itself one big link. The attribute is
              load-bearing: without it every `var(--surface-*)` inside
              resolves to the light-section values. `secondaryLabel`
              ("Partner login") is deliberately NOT rendered here — it has no
              backing portal, and the mega panel's own copy of it is
              commented out for that reason. */}
          <Reveal
            data-surface="dark"
            className="panel-dark grain relative mt-12 overflow-hidden rounded-[var(--radius-lg)] p-8 md:p-10"
          >
            {/* Its own ring instance, own gradient id — `url(#id)` resolves
                document-wide, so a duplicate would light from whichever
                <defs> mounted last. */}
            <ArcRings
              rings={[
                { r: 176, width: 16, opacity: 0.16 },
                { r: 132, width: 12, opacity: 0.1 },
              ]}
              color="var(--color-ink-600)"
              gradientId="dsc-hub-partner-arc"
              svgClassName="-right-24 -top-28 h-[380px] w-[380px] md:-right-16 md:-top-32 md:h-[520px] md:w-[520px]"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[52ch]">
                <h3 className="text-h3 text-canvas">{dscPartnerPromo.heading}</h3>
                <p className="mt-3 text-body text-ink-200">{dscPartnerPromo.description}</p>
              </div>
              <Button as={Link} to={dscPartnerPromo.cta.path} variant="primary" className="shrink-0">
                {dscPartnerPromo.cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

/**
 * One item in a group grid. 20-08-2026 (Clinton: "include icon… most of
 * section is look too plain"): the card is now icon-led. The per-card mono
 * index is GONE — `GroupHeading` already numbers the groups, so numbering the
 * items inside them as well was structure for its own sake, and the icon is a
 * better anchor than a digit anyway.
 *
 * Two branches, and the split mirrors what the codebase already does rather
 * than inventing a third pattern:
 *   - LIGHT: `<Card surface="light">` plus `.card-premium`'s wash, wrapped in
 *     the Link. That is the site's light-card object with one extra detail.
 *   - DARK: `.card-dark` applied to the Link ITSELF, exactly as the homepage's
 *     `DscBand` does. That class's hover ring, lift and corner-arc draw are
 *     written for the hovered element, so putting the surface on a child would
 *     leave the affordance responding to the child's box; and
 *     `.card-dark:is(a, button):active` only fires when the card really is the
 *     click target.
 *
 * The icon sits in a hairline circle. DESIGN.md §16 tell 6 counts
 * icon-in-a-circle per page, but its detector correctly excludes glyphs inside
 * `a, button, label, [role=button]` — a circle that IS the click target is an
 * affordance, not the decorative motif the tell is about. This is the same
 * treatment, on the same kind of card, as the homepage DSC band.
 */
// `icon` arrives as a PROP rather than being resolved in here, and that is not
// a style choice: `react-hooks/static-components` flags
// `const Icon = dscIcon(slug)` in a component body as "creating a component
// during render" — it cannot prove the returned reference is stable, even
// though lucide's icons are module constants. Resolving it at the call site
// (inside the map, as `DscBand` also does) keeps the rule satisfied without
// disabling it.
function GroupCard({ item, icon: Icon, dark }) {
  const teaser = itemTeaser(item);

  const body = (
    <>
      {/* LIGHT: a filled disc, no border (Clinton, 20-08-2026). On a white
          card a hairline ring plus a tint was two treatments doing one job, and
          the ring read as an outline around a shape rather than as the shape.
          DARK keeps its ring: on ink there is no tint pale enough to register
          as a disc without lifting the card's whole warmth, which is why the
          homepage DSC band draws a ring there too. */}
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          dark ? "border border-ember-400/60" : "bg-ember-50"
        )}
      >
        <Icon
          className={cn("h-5 w-5", dark ? "text-ember-400" : "text-ember-600")}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </span>
      <h3 className={cn("mt-5 text-h4", dark ? "text-canvas" : "text-ink-600")}>{item.label}</h3>
      {/* Per-item note — currently only "Buy DSC Tokens"' token-brand
          subtitle, the same string the mega panel renders under that link. */}
      {item.note && (
        <p
          className={cn(
            "mt-2 font-mono text-[11px] uppercase tracking-[0.08em]",
            dark ? "text-ink-300" : "text-ink-400"
          )}
        >
          {item.note}
        </p>
      )}
      {teaser && (
        <p className={cn("mt-3 text-body-sm", dark ? "text-ink-200" : "text-ink-500")}>{teaser}</p>
      )}
      {/* `mt-auto` puts the action row on the card's floor. In a grid of
          unequal teaser lengths those rows would otherwise land at a different
          height in every card, which is the detail that makes a set look
          untended. `pt-5` keeps a gap when a long teaser leaves no free space
          to absorb. ONE ember element per card — the action. */}
      <span
        className={cn(
          "mt-auto flex items-center gap-1.5 border-t pt-5 text-body-sm font-medium",
          dark ? "border-ink-700 text-ember-300" : "border-ink-100 text-ember-600"
        )}
      >
        Read more
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover/card:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (dark) {
    return (
      <Link
        to={item.path}
        className="card-dark group/card group flex h-full flex-col rounded-[var(--radius-xl)] sm:rounded-[var(--radius-2xl)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 lg:rounded-[var(--radius-lg)] md:p-8"
      >
        {/* `.card-dark`'s corner crescent strokes on rather than cross-fading —
            the class expects a `.card-arc` child, which <Card surface="dark">
            supplies for itself and a hand-rolled link has to pass. */}
        <ArcGlyph
          variant="corner"
          className="card-arc pointer-events-none absolute right-4 top-4 h-6 w-6"
          style={{ color: "var(--surface-accent)" }}
        />
        {body}
      </Link>
    );
  }

  return (
    <Link
      to={item.path}
      className="group/card block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 lg:rounded-[var(--radius-lg)]"
    >
      <Card surface="light" className="card-premium flex h-full flex-col">
        {body}
      </Card>
    </Link>
  );
}

/**
 * The hero's hairline spec row. Every value is DERIVED from nav.js or is the
 * same "On request" the `fees: null` discipline renders on every product page —
 * there is deliberately no client count, no years-in-business and no
 * turnaround here, all of which are on CONTENT-PLAN.md §1.1's hold list and
 * all of which a row like this is the easiest place to slip in.
 *
 * "eMudhra · SignX" is not a new claim: `dscHubContent`'s own lede, intro and
 * whyUs all state the partnership, and CONTENT-PLAN.md §9 asks every DSC page
 * to lead with it.
 */
function heroSpec() {
  return [
    { label: "Issued through", value: "eMudhra · SignX" },
    { label: "Certificate types", value: String(dscProducts.length) },
    { label: "Token drivers", value: String(dscDriversHub.children.length) },
    { label: "Pricing", value: "On request" },
  ];
}

/**
 * Hero aside — the portals a certificate is actually accepted on, plus the one
 * correction worth making above the fold (eSign is not a substitute on
 * statutory portals). Content comes from `dscHubContent.heroHighlights`, which
 * sits next to the paragraph it was drawn from so the two cannot drift.
 *
 * `.panel-dark` rather than `.card-dark`: this is a static information panel,
 * not a link, and a hover ring or lift would signal an interaction that does
 * not exist. `data-surface="dark"` is load-bearing even though the hero is
 * already deep — the panel's own accent/border tokens resolve off it.
 */
function HeroHighlights({ highlights }) {
  if (!highlights) return null;

  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative rounded-[var(--radius-lg)] p-6 md:p-8"
    >
      <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember-200">
        {highlights.heading}
      </h2>
      <ul className="relative mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {highlights.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-body-sm text-ink-100">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-ember-300"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="relative mt-6 border-t border-ink-700 pt-4 text-body-sm text-ink-200">
        {highlights.footnote}
      </p>
    </div>
  );
}

/**
 * A group section's header. The mono index, the drawn hairline rule and the
 * eyebrow / h2 / lede all live in `components/ui/SectionHeading.jsx` now
 * (22-08-2026): the services templates needed the identical device, and two
 * copies of it would drift. This stays as a named wrapper only because it
 * adapts DscHub's `group` object to the shared component's flat props.
 *
 * ⚠️ `dark` is still not optional decoration - see SectionHeading's own note.
 * The eyebrow and h2 are handled by the surface system for free, but the
 * index, the rule and the LEDE are plain utilities and carried their
 * light-surface values onto the dark eSign band (an ink-500 lede on ink-900,
 * measured ~1.5:1). Caught by pixel contrast, not by looking at it.
 */
function GroupHeading({ group, index, dark }) {
  return (
    <SectionHeading
      index={index}
      eyebrow={group.eyebrow}
      heading={group.heading}
      lede={group.lede}
      dark={dark}
    />
  );
}
