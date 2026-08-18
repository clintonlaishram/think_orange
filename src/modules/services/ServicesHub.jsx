import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeWorkWith } from "@/modules/home/sections/WhoWeWorkWith";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceCategories } from "@/content/nav";
import { getServiceContent } from "@/content/services";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { meta } from "@/content/meta";

// Top-level /services — the T3 variant CONTENT-PLAN.md §8 describes: "all
// six categories with their children listed inline... the sitemap page
// users actually use." Reuses WhoWeWorkWith verbatim rather than reforking
// it, per §8's own instruction to reuse the homepage block.
//
// 17-08-2026: the lede's leaf count is now DERIVED, not hardcoded — the
// services-menu restructure (nav.js) changed it from 21 to 31, and a literal
// "twenty-one" had already gone stale silently once before this fix. The
// category list is still named explicitly (matches the new menu's own
// order), since spelling out six numbers-into-words isn't worth automating.
// 19-08-2026: the hub now mirrors the services mega panel's own ORDER and
// grouping, not just its membership. The panel splits growth from statutory
// with a hairline (MegaPanel.jsx, DESIGN.md §10.2 — Tenders & Finance reads
// as an adjacent practice area, not one more statutory service); this page
// listed all six flat in nav.js order, so the same menu produced two
// different structures depending on which surface you arrived through. Both
// now derive the split the same way: filter on `group`, find the first
// growth index, mark that boundary. Each category's `subline` — already
// written in nav.js and already rendered by the panel — is shown here too
// rather than being panel-only copy.
const GROUP_HEADINGS = {
  statutory: "Statutory & compliance",
  growth: "Growth & funding",
};

const COUNT_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight"];

export default function ServicesHub({ path }) {
  const totalLeaves = serviceCategories.reduce((sum, category) => sum + category.children.length, 0);

  // Ordered exactly as the mega panel orders its columns.
  const ordered = [
    ...serviceCategories.filter((category) => category.group !== "growth"),
    ...serviceCategories.filter((category) => category.group === "growth"),
  ];
  const firstGrowthIndex = ordered.findIndex((category) => category.group === "growth");
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

      {/* `lede`'s count and category names are DERIVED — a hardcoded
          "twenty-one services" and a hardcoded category list had each already
          gone stale once (17-08-2026 restructure), so neither is typed in
          here any more. */}
      <PageHero
        path={path}
        h1="Services"
        // Oxford comma is load-bearing, not style: category labels contain
        // their own commas ("Accounting, Payroll & Audit"), so without it the
        // last two run together as one phrase.
        lede={`${categoryWord.charAt(0).toUpperCase()}${categoryWord.slice(1)} practice areas, ${totalLeaves} services — ${categoryNames
          .slice(0, -1)
          .join(", ")}, and ${categoryNames.at(-1)} — all handled from Salem for clients across India.`}
        cta={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section surface="light">
        <Container>
          <div className="space-y-14 md:space-y-16">
            {ordered.map((category, index) => (
              <div key={category.slug}>
                {/* Group heading, printed once at each group's first
                    category — the light-surface equivalent of the panel's
                    hairline divider. `firstGrowthIndex > 0` guards the case
                    where every category is growth (no boundary to draw). */}
                {(index === 0 || index === firstGrowthIndex) && firstGrowthIndex > 0 && (
                  <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
                    {GROUP_HEADINGS[category.group] ?? category.group}
                  </p>
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-100 pb-4">
                  <h2 className="text-h3">
                    <Link
                      to={category.path}
                      className="rounded-sm text-ink-600 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                    >
                      {category.label}
                    </Link>
                    {category.subline && (
                      <span className="mt-1 block text-body-sm font-normal text-ink-400">
                        {category.subline}
                      </span>
                    )}
                  </h2>
                  <Link
                    to={category.path}
                    className="inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    View category
                    <span className="text-ink-400">({category.children.length})</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                  {category.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        to={child.path}
                        className="flex min-h-12 items-center justify-between gap-2 rounded-sm text-body text-ink-500 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                      >
                        {child.label}
                        {!getServiceContent(child.slug) && (
                          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400">
                            Soon
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <WhoWeWorkWith />

      <CtaBand />
    </>
  );
}
