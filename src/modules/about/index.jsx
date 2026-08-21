import { Link } from "react-router-dom";
import { ArrowRight, Building2, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ArcRings } from "@/components/ui/ArcRings";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { StepFlow } from "@/components/ui/StepFlow";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { serviceCategories, site } from "@/content/nav";
import { aboutContent } from "@/content/about";
import { heroStats } from "@/content/home-hero";
import { SectionHeading } from "@/components/ui/SectionHeading";

// T6 — CONTENT-PLAN.md §10. Founding year, team, credentials, client numbers
// and photography are all on §1.1's hold list — the page is written to read
// as complete without them (no "[coming soon]" scars).
//
// --- 21-08-2026: premium pass, measured against the homepage and /dsc ------
// Clinton: analyse Home and DSC, then fix About to match. Five things were
// wrong, and only the last is cosmetic:
//
// 1. ⛔ SIX EYEBROWS ON SIX SECTIONS. A mono uppercase label above every
//    heading is the single most templated rhythm a page can have, and it is
//    the one thing that made this page read as generated. Now three across
//    eight sections (hero, the dark band, "What we do") — the sections in
//    between carry their heading alone, which is what the homepage's own
//    light sections do.
//
// 2. ⛔ NO DARK BAND. The page ran deep → light → light-alt → light →
//    light-alt → light → ember: six light surfaces in a row separated only by
//    a tonal shift. That is exactly the diagnosis the /dsc premium pass
//    recorded ("six light surfaces in a row… the real reason it read as
//    plain"), and DESIGN.md §11.1 puts a genuinely dark band between light
//    ones on the homepage for the same reason. "What we believe" is now that
//    band. Cadence is `deep → light → dark → light-alt → light → light-alt →
//    light → ember`, zero consecutive repeats.
//
// 3. ⛔ THREE NEAR-IDENTICAL 3-UP CARD GRIDS (pillars, categories, how we
//    work). Every section now uses a different layout family: two-column
//    editorial prose, a hairline-divided dark trio, the oversized-numeral
//    block, the scroll-linked stepper, a hairline link list, and a 5/7 split.
//
// 4. ⛔ NONE OF THE SITE'S OWN VOCABULARY. No mono numerals, no arc rings, no
//    ember discs, no StepFlow — the four devices the homepage and /dsc are
//    built from. All four are now here, each used ONCE (DESIGN.md §16: a
//    designed page applies each effect in one place).
//
// 5. The hero was the bare `PageHero` with nothing below the lede. It now
//    carries a `spec` row. ⚠️ EVERY VALUE IN IT IS DERIVED — two counts read
//    off nav.js at render, and two facts this page's own copy already
//    asserts. No client count, no years, no turnaround: a row like this is
//    the easiest place on the site for an invented number to slip in.
//
// Deliberately NOT done: no `texture` on the hero. The four SurfaceTexture
// variants are DSC motifs (a guilloché means "certificate"), so putting one
// here would say something untrue about the page. The ~40 non-DSC heroes are
// still flat and that stays a separate, sitewide call.

const PILLAR_ICONS = [Building2, ShieldCheck, TrendingUp];

/**
 * Hero spec row. The service count is read off `serviceCategories` at render
 * time rather than typed, so the 17-08-2026 menu-restructure class of bug — a
 * hardcoded "twenty-one services" going stale the moment a leaf moves — cannot
 * happen here. "Based in" and "Coverage" are facts this page's own prose
 * already states.
 *
 * ⛔ THE CLIENT COUNT IS READ FROM `home-hero.js`, NOT TYPED HERE (Clinton,
 * 21-08-2026: "say 1000+ client serve"). Two reasons, both load-bearing:
 *
 *   1. The homepage hero ALREADY renders that same stat. A figure asserted
 *      from two places is a contradiction waiting to be shipped — the value
 *      has moved 250+ → 500+ once already without this page existing. One
 *      number, one source; change it in `home-hero.js` and both pages move.
 *   2. It carries `confirmed: false`, and that flag plus `content:check`'s
 *      warning are the only things standing between this site and a published
 *      client count. CLAUDE.md's non-negotiables and CONTENT-PLAN.md §1.1 both
 *      name client counts explicitly. The tile is DROPPED if the entry is ever
 *      deleted rather than confirmed, and the row degrades to three.
 */
function heroSpec() {
  const leafCount = serviceCategories.reduce(
    (total, category) => total + category.children.length,
    0
  );
  const clients = heroStats.find((stat) => stat.id === "clients");

  return [
    ...(clients ? [{ label: clients.label, value: clients.value }] : []),
    { label: "Services", value: String(leafCount) },
    { label: "Based in", value: `${site.locality}, ${site.region}` },
    { label: "Coverage", value: "Pan-India" },
  ];
}

export default function About({ path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="About ThinkOrange"
        h1="Compliance, taxation and growth support, from one place"
        lede={aboutContent.description}
        spec={heroSpec()}
        ringsId="about-hero-rings"
      />

      {/* --- Who we are. Two-column editorial prose rather than a heading over
          a card: the section is two paragraphs, and two paragraphs set side by
          side under one heading is a composition, where the same two stacked
          beside a bulleted card was a container looking for something to
          hold. The bullets that used to live in that card are now the numeral
          block two sections down, where they read as the four claims they
          actually are. --- */}
      <Section surface="light">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              heading={site.positioning}
              headingClassName="max-w-[26ch]"
              reveal={false}
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-6 text-body-lg text-ink-500 md:grid-cols-2">
            <Reveal delay={0.06}>
              <p>{aboutContent.description}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>{aboutContent.mission}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- What we believe — THE DARK BAND (see note 2 above). `.grain` comes
          from Section for dark surfaces; `surface-ambient` is §7.2 compliance,
          which is explicit that a dark section is not a flat slab. The three
          pillars are hairline-divided columns, NOT cards: a panel inside a dark
          section is a box in a box, and these are static content, so a card's
          hover ring would signal an interaction that does not exist. --- */}
      <Section surface="dark" className="surface-ambient isolate">
        <ArcRings
          gradientId="about-arc-fade"
          rings={[
            { r: 150, width: 15, opacity: 0.08 },
            { r: 112, width: 11, opacity: 0.05 },
          ]}
          svgClassName="-bottom-40 -right-32 h-[420px] w-[420px] md:-bottom-48 md:-right-24 md:h-[600px] md:w-[600px]"
        />

        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="What we believe"
              heading={site.strapline}
              headingClassName="max-w-[24ch]"
              dark
              reveal={false}
            />
          </Reveal>

          {/* ⚠️ NOT `Stagger`, and that is a bug fix rather than a preference.
              Stagger wraps every child in its own motion.div, so THOSE become
              the grid items and the divide-* rules resolve against them — while
              `first:`/`last:` on the element inside match ALWAYS, because each
              one is the only child of its own wrapper. The gutter silently
              collapsed on every column. `Reveal` forwards `className` straight
              onto the element it renders, so it IS the grid item and the
              exceptions resolve correctly. Same trap the /services bento grid
              hit in Phase 6. */}
          <div className="mt-12 grid grid-cols-1 divide-y divide-ink-700 md:grid-cols-3 md:divide-x md:divide-y-0">
            {aboutContent.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index] ?? Building2;
              return (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.06}
                  className="py-8 first:pt-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  {/* Ringed ember disc — the dark half of the filled-on-light /
                      ringed-on-dark pairing the DSC group cards established. No
                      ink-surface tint is pale enough to read as a disc. */}
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ember-300/40 text-ember-300">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h4">{pillar.title}</h3>
                  {/* ink-200, never ink-400: Phase 10 measured ink-400 as body
                      text on ink at 2.86:1 and fixed it sitewide. */}
                  <p className="mt-3 text-body text-ink-200">{pillar.body}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --- What sets us apart. DESIGN.md §11.4's oversized mono numerals, the
          same archetype the homepage's WhyThinkOrange and the /dsc why-us row
          use — "numbers carry the hierarchy, not icons" (§16 tell 6). Used ONCE
          on this page, which is why the pillars above are icon-led and this is
          not. --- */}
      <Section surface="light-alt">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              heading="What sets us apart"
              headingClassName="max-w-[24ch]"
              reveal={false}
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
            {aboutContent.differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="flex gap-6">
                {/* ember-500, not ember-400 — measured, not chosen: ember-400
                    on canvas-alt is 2.8:1, under the 3.0 floor even as large
                    text. The homepage's own numeral block records the same. */}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-stat font-black leading-none text-ember-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h3 className="text-h3 text-ink-600">{item.title}</h3>
                  <p className="mt-2 max-w-[42ch] text-body text-ink-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- How we work. The shared `StepFlow` — the site's one step treatment
          (19-08-2026), scroll-linked, with the node thresholds measured off the
          real DOM rather than assumed evenly spaced. This page was hand-rolling
          a flat 3-column divide for content that is the arc of an engagement,
          which is exactly what that component exists for. `surface="light"`
          keeps the cadence alternating after the dark band above. --- */}
      <Section surface="light">
        <StepFlow
          eyebrow="How we work"
          heading="What working with us looks like"
          intro="The same three commitments on every engagement, whatever the filing is."
          surface="light"
          steps={aboutContent.howWeWork.map((point) => ({
            title: point.title,
            desc: point.body,
          }))}
        />
      </Section>

      {/* --- What we do. Derived from `serviceCategories` (nav.js) rather than a
          second list, so a category rename can never leave this page stale.
          Now a hairline list carrying each category's real `subline` — the bare
          label pills it replaced were six identical boxes saying nothing the
          nav does not already say. --- */}
      <Section surface="light-alt">
        <Container>
          <Reveal>
            {/* ⚠️ The count is deliberately NOT in this heading (Clinton, 21-08-2026:
                "do not mention 6 practice directly"). The grid below still derives
                every row from `serviceCategories`, so the page shows the practice
                areas without ever asserting how many there are — which also means a
                category added or merged can never leave this line stale. */}
            <SectionHeading
              eyebrow="What we do"
              heading="Every practice area, one point of contact"
              headingClassName="max-w-[30ch]"
              reveal={false}
            />
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 border-t border-ink-100 md:grid-cols-2">
            {serviceCategories.map((category, index) => (
              <Link
                key={category.slug}
                to={category.path}
                className={
                  "group flex items-center gap-6 border-b border-ink-100 py-6 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] " +
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas-alt " +
                  // The vertical rule belongs to the RIGHT-hand column only, and
                  // it is keyed off the item's index rather than a `:nth-child`
                  // guess, because `Stagger` wraps each child in its own
                  // motion.div — a structural selector would be resolving
                  // against those wrappers, not against these links.
                  (index % 2 === 1 ? "md:border-l md:border-l-ink-100 md:pl-8" : "md:pr-8")
                }
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-h4 text-ink-600 transition-colors duration-[var(--dur-fast)] group-hover:text-ember-600">
                    {category.label}
                  </span>
                  {/* ink-400 on canvas-alt is 7.2:1; ink-300 measures ~3.4:1 on
                      a light surface and is not a body-text colour here. */}
                  <span className="mt-1 block text-body-sm text-ink-400">{category.subline}</span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-ink-300 transition-[color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:text-ember-600"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ember-50 text-ember-600">
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <SectionHeading
                  eyebrow="Where we are"
                  heading={site.location}
                  lede={aboutContent.whereWeAre}
                  headingClassName="mt-5 max-w-[22ch]"
                  ledeClassName="max-w-[52ch]"
                  reveal={false}
                />
                <address className="mt-6 text-body not-italic text-ink-500">
                  {site.registeredAddress.line1}
                  <br />
                  {site.registeredAddress.line2}
                  <br />
                  {site.registeredAddress.locality}, {site.registeredAddress.region}{" "}
                  <span className="tabular-nums">{site.registeredAddress.postalCodeDisplay}</span>
                </address>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <MapEmbed className="aspect-[16/10] w-full" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
