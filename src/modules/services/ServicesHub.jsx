import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ArcRings } from "@/components/ui/ArcRings";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WhoWeWorkWith } from "@/modules/home/sections/WhoWeWorkWith";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceCategories } from "@/content/nav";
import { getServiceContent } from "@/content/services";
import { categoryIcon } from "@/content/services/icons";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { meta } from "@/content/meta";
import { cn } from "@/lib/cn";

// Top-level /services - the T3 variant CONTENT-PLAN.md §8 describes: "all six
// categories with their children listed inline... the sitemap page users
// actually use." Reuses WhoWeWorkWith verbatim rather than reforking it, per
// §8's own instruction.
//
// The lede's count and category names are DERIVED - a hardcoded
// "twenty-one services" and a hardcoded category list had each already gone
// stale once (the 17-08-2026 menu restructure), so neither is typed in.
//
// This page mirrors the services mega panel's own ORDER and grouping, not
// just its membership: the panel splits growth from statutory with a hairline
// (MegaPanel.jsx, DESIGN.md §10.2), and both derive that split the same way.
//
// ── 22-08-2026 PREMIUM PASS ────────────────────────────────────────────────
//   1. A REAL CADENCE BUG, not just a flat look: the page ran deep, light,
//      light, ember - two consecutive `light` sections, which every other
//      page on the site is audited against. The growth group is now its own
//      DARK band, which fixes the repeat and gives the page the depth break
//      it had nowhere else.
//   2. THE ROWS STAY ROWS, deliberately. It is tempting to turn six
//      categories into six cards, and it would be wrong: CLAUDE.md already
//      records that §16's tell 7 over-triggered on exactly this page because
//      a multi-column list of plain text links is a DIRECTORY, which is the
//      correct archetype here and not a card grid pretending to be one. What
//      the rows lacked was an anchor and a hierarchy, so each one now leads
//      with its practice-area mark and a mono count, and each child link is a
//      real hairline row with its own hover affordance instead of loose text.
//   3. The bare hero gets `ringsId` plus a spec row of derived counts, the
//      same treatment /about took.
const GROUP_HEADINGS = {
  statutory: "Statutory & compliance",
  growth: "Growth & funding",
};

const GROUP_LEDES = {
  statutory:
    "The filings, registrations and representations that keep a business on the right side of the law.",
  growth: "The work that wins contracts and funds them.",
};

const COUNT_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight"];

export default function ServicesHub({ path }) {
  const totalLeaves = serviceCategories.reduce((sum, category) => sum + category.children.length, 0);

  // Ordered exactly as the mega panel orders its columns.
  const ordered = [
    ...serviceCategories.filter((category) => category.group !== "growth"),
    ...serviceCategories.filter((category) => category.group === "growth"),
  ];
  const statutory = ordered.filter((category) => category.group !== "growth");
  const growth = ordered.filter((category) => category.group === "growth");
  const categoryWord = COUNT_WORDS[ordered.length] ?? String(ordered.length);
  const categoryNames = ordered.map((category) => category.label);

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "Services",
          description: meta["/services"].description,
          path,
        })}
      />

      <PageHero
        path={path}
        h1="Services"
        // Oxford comma is load-bearing, not style: category labels contain
        // their own commas ("Accounting, Payroll & Audit"), so without it the
        // last two run together as one phrase.
        lede={`${categoryWord.charAt(0).toUpperCase()}${categoryWord.slice(1)} practice areas, ${totalLeaves} services - ${categoryNames
          .slice(0, -1)
          .join(", ")}, and ${categoryNames.at(-1)} - all handled from Salem for clients across India.`}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
        // No texture here: /services is every practice area at once, so no
        // single motif is true of it. It keeps the arc rings instead.
        ringsId="services-hub-hero"
      />

      {statutory.length > 0 && (
        <Section surface="light">
          <Container>
            <SectionHeading
              index={0}
              eyebrow="Services"
              heading={GROUP_HEADINGS.statutory}
              lede={GROUP_LEDES.statutory}
            />
            <div className={cn("mt-12 grid grid-cols-1 gap-5", gridColsFor(statutory.length))}>
              {statutory.map((category, index) => (
                <Reveal
                  key={category.slug}
                  delay={Math.min(index, 5) * 0.06}
                  className={spanClassFor(statutory.length, index)}
                >
                  <CategoryCard
                    category={category}
                    icon={categoryIcon(category.slug)}
                    wide={isWide(statutory.length, index)}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* The growth group as the page's dark band. `firstGrowthIndex > 0` used
          to guard the case where every category is growth; the equivalent
          guard here is that each group renders only when it has members, so
          an all-growth or all-statutory nav.js still produces one section and
          no empty band. */}
      {growth.length > 0 && (
        <Section surface="dark" className="surface-ambient isolate">
          <ArcRings
            gradientId="services-hub-growth-rings"
            rings={[
              { r: 160, width: 16, opacity: 0.09 },
              { r: 116, width: 12, opacity: 0.06 },
            ]}
            svgClassName="-right-32 -bottom-44 h-[600px] w-[600px]"
            className="z-[-1]"
          />
          <Container>
            <SectionHeading
              index={1}
              eyebrow="Services"
              heading={GROUP_HEADINGS.growth}
              lede={GROUP_LEDES.growth}
              dark
            />
            <div className={cn("mt-12 grid grid-cols-1 gap-5", gridColsFor(growth.length))}>
              {growth.map((category, index) => (
                <Reveal
                  key={category.slug}
                  delay={Math.min(index, 5) * 0.06}
                  className={spanClassFor(growth.length, index)}
                >
                  <CategoryCard
                    category={category}
                    icon={categoryIcon(category.slug)}
                    wide={isWide(growth.length, index)}
                    dark
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <WhoWeWorkWith />

      <CtaBand />
    </>
  );
}

/**
 * One practice area as a CARD (Clinton, 22-08-2026: "fixed the service hub
 * page like dsc hub page, show in card view"), matching `/dsc`'s group
 * sections: a group heading, then a count-aware bento grid of icon-led cards.
 *
 * ⚠️ This overrides the earlier call on this page, which kept plain rows on
 * the grounds that CLAUDE.md records §16's tell-7 detector over-triggering
 * here because a multi-column list of text links is a DIRECTORY archetype.
 * That reasoning was mine and Clinton overruled it. The tell is unaffected in
 * practice: its threshold is 3 identical card grids on one page and this page
 * has two, each a different size.
 *
 * ⛔ THE CARD IS NOT A LINK, and it cannot be. Every card lists the category's
 * child services as links, and an <a> inside an <a> is invalid HTML that
 * browsers actively un-nest — it would break both the markup and the child
 * links. So the card is a plain container and the real targets are inside it:
 * the heading, each child row, and the "View category" action. That is also
 * why it takes `interactive={false}` / `.panel-dark` rather than the pressable
 * `.card-dark` treatment DscHub's product cards use — a hover ring on a
 * container that is not itself clickable signals a target that does not exist.
 *
 * The children stay listed inline: CONTENT-PLAN.md §8 calls this "the sitemap
 * page users actually use", so boxing the categories must not cost the reader
 * the one thing the page is for.
 *
 * The disc is FILLED on light and RINGED on dark — the established pairing.
 */
function CategoryCard({ category, icon: Icon, dark = false, wide = false }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            dark ? "border border-ember-400/60 text-ember-400" : "bg-ember-50 text-ember-600"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 font-mono text-body-sm tabular-nums",
            dark ? "text-ink-300" : "text-ink-400"
          )}
        >
          {String(category.children.length).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-h4">
        <Link
          to={category.path}
          className={cn(
            "rounded-sm transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
            dark
              ? "text-canvas hover:text-ember-300 focus-visible:ring-offset-ink-900"
              : "text-ink-600 hover:text-ember-600"
          )}
        >
          {category.label}
        </Link>
      </h3>
      {category.subline && (
        <p className={cn("mt-1.5 text-body-sm", dark ? "text-ink-200" : "text-ink-400")}>
          {category.subline}
        </p>
      )}

      {/* The children, still inline. Two columns whenever the card is wide
          enough to carry them — the bento's first card spans two tracks, and a
          single-category group's card spans the row. */}
      <ul
        className={cn(
          "mt-5 border-t",
          dark ? "border-ink-700" : "border-ink-100",
          // ⚠️ Keyed off the card's WIDTH, not its child count. Keying it off
          // the count split a 419px card's service names into two ~190px
          // columns, where "Private Limited Company" and "One Person Company"
          // both wrapped and the rows stopped lining up. Only a card that
          // actually spans more than one track has room for two columns.
          wide && category.children.length > 3 && "sm:columns-2 sm:gap-x-10"
        )}
      >
        {category.children.map((child) => (
          <li key={child.slug} className="break-inside-avoid">
            <Link
              to={child.path}
              className={cn(
                "group/leaf flex min-h-11 items-center justify-between gap-2 rounded-sm border-b text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
                dark
                  ? "border-ink-800 text-ink-200 hover:text-ember-300"
                  : "border-ink-100/70 text-ink-500 hover:text-ember-600"
              )}
            >
              <span>{child.label}</span>
              <span className="flex shrink-0 items-center gap-2">
                {!getServiceContent(child.slug) && (
                  <span
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.08em]",
                      dark ? "text-ink-300" : "text-ink-400"
                    )}
                  >
                    Soon
                  </span>
                )}
                {/* Opacity-only on hover plus a small travel. Not a colour
                    change: the label already changes colour, and two colour
                    signals for one hover is noise. */}
                <ArrowRight
                  className="h-3.5 w-3.5 opacity-0 transition-[opacity,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover/leaf:translate-x-0.5 group-hover/leaf:opacity-100 group-focus-visible/leaf:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* `mt-auto` so this lands on the card's floor whatever the child count,
          which is what stops a bento of unequal cards looking untended. */}
      <Link
        to={category.path}
        className={cn(
          "mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-sm pt-5 text-body-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
          dark ? "text-ember-300 focus-visible:ring-offset-ink-900" : "text-ember-600"
        )}
      >
        View category
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </>
  );

  if (dark) {
    // `.panel-dark` + `data-surface="dark"` is the established dark-panel-on-
    // dark-section pattern. The attribute is load-bearing, not cosmetic: the
    // surface system is attribute-scoped, so without it every descendant
    // reading var(--surface-accent) / var(--surface-border) gets LIGHT values.
    return (
      <div
        data-surface="dark"
        className="panel-dark grain relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] p-6 md:p-8 lg:rounded-[var(--radius-lg)]"
      >
        {body}
      </div>
    );
  }

  return (
    <Card surface="light" interactive={false} className="card-premium flex h-full flex-col">
      {body}
    </Card>
  );
}

function gridColsFor(count) {
  if (count <= 1) return "";
  if (count === 2) return "sm:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

// 4+ takes the bento treatment WhatWeDo established on the homepage: the first
// card spans two tracks. At 5 that also fills the grid exactly (2 + 3), so
// there is no empty cell to explain.
function spanClassFor(count, index) {
  if (count < 4) return "";
  return index === 0 ? "lg:col-span-2" : "";
}

/** True when the card occupies more than one grid track, so its child list
 *  has room to run in two columns. Derived from the SAME rules the grid uses
 *  above, so the two can never disagree. */
function isWide(count, index) {
  if (count <= 1) return true; // a lone card spans the whole row
  return count >= 4 && index === 0;
}