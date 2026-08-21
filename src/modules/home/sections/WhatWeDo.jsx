import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ArcRings } from "@/components/ui/ArcRings";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { serviceCategories } from "@/content/nav";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 3 — CONTENT-PLAN.md §6 row 3, DESIGN.md §11.3. Dark
// surface, bento grid — deliberately NOT a uniform 3×2 (§16 tell #7).
//
// One-line promises adapted from CONTENT-PLAN.md §15's Company Profile PDF
// bullets, kept to the §16 word budget for a service card (20–30 words) and
// written second-person/active per §16's voice rules. `slug` keys these
// against `serviceCategories` in nav.js rather than duplicating labels/paths.
//
// 17-08-2026: updated for the services-menu restructure (nav.js) —
// "registrations-licences" is new, "government-tenders" + "loans-finance"
// merged into "tenders-finance". Both new lines are marketing copy only
// (service names straight from nav.js, no rupee/day/threshold facts), same
// register as every other entry here.
const PROMISES = {
  gst: "Registration, monthly and annual returns, ITC reconciliation, and representation if a notice arrives.",
  "income-tax": "Returns for individuals, firms and companies, tax planning, TDS compliance, and notice handling.",
  "business-setup": "Private limited, LLP, OPC, partnership or a trust, society or Section 8 company — incorporated correctly, statutory registrations sorted.",
  "registrations-licences": "MSME/Udyam, Startup India, import-export code, ICEGATE, trademark and NGO Darpan — cleared before you need to trade on them.",
  "accounting-audit": "Bookkeeping on Tally or Zoho Books, payroll, and specialised audits including stock and concurrent audit.",
  "tenders-finance": "GeM registration and tender documentation, plus loan documentation, CMA data and personal finance support.",
};

// Bento positions per DESIGN.md §11.3's diagram — GST is the large 6-col
// card carrying its own leaf links inline; the last category is the wide
// 6-col closer; the remaining four sit as 3-col cards in between. Row 2
// (Registrations & Licences 3 + Accounting, Payroll & Audit 3 + Tenders &
// Finance 6) mirrors row 1's 6+3+3 shape, so the bento pattern is unchanged
// by the restructure — only which category fills which slot moved.
const SPANS = {
  gst: "md:col-span-6",
  "income-tax": "md:col-span-3",
  "business-setup": "md:col-span-3",
  "registrations-licences": "md:col-span-3",
  "accounting-audit": "md:col-span-3",
  "tenders-finance": "md:col-span-6",
};

// Background arc ladder. Absolute weight lives here; every value is BELOW
// CtaBand's (0.07 / 0.12 / 0.045) so this reads as a quiet echo of the one
// loud ember band rather than a copy of it. Static — the counter-rotating
// version is the hero's signature and spending it twice would cheapen both.
const ARC_RINGS = [
  { r: 176, width: 16, opacity: 0.055 },
  { r: 140, width: 13, opacity: 0.1 },
  { r: 104, width: 9, opacity: 0.035 },
];

export function WhatWeDo() {
  return (
    // `relative isolate`: relative scopes both the arc rings and — a
    // pre-existing bug — `.grain`'s absolutely-positioned ::after overlay,
    // which had no positioned ancestor here and was escaping to the initial
    // containing block. isolate keeps the rings' z-index local to this section.
    <section
      data-surface="dark"
      className="section-pad grain relative isolate bg-ink-900"
    >
      {/* Top-right, not bottom-right: the bento grid fills the bottom of this
          section, so rings anchored there are almost entirely occluded by
          cards. The genuine negative space is beside the headline. */}
      <ArcRings
        rings={ARC_RINGS}
        gradientId="whatwedo-arc-fade"
        // Smaller at base on purpose: at 375px a 500px composition offset only
        // -112px spans the whole viewport width, so the rings crossed every
        // line of the headline instead of reading as a corner. Contrast is not
        // the issue (measured 15.6:1 there) — it just looked busy.
        svgClassName="-right-24 -top-28 h-[340px] w-[340px] md:-right-36 md:-top-44 md:h-[700px] md:w-[700px]"
      />

      {/* `relative` lifts the content into the positioned layer so it paints
          above .arc-rings (z-index 0) — without it the rings sit over the copy. */}
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            heading="Ways we keep you compliant — and out of trouble"
            headingClassName="max-w-[24ch]"
            dark
            reveal={false}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {serviceCategories.map((category, index) => (
            <Reveal
              key={category.slug}
              delay={Math.min(index, 5) * 0.06}
              className={SPANS[category.slug] ?? "md:col-span-3"}
            >
              <Card surface="dark" className="h-full">
                <h3 className="text-h3 text-canvas">{category.label}</h3>
                <p className="mt-3 text-body-sm text-ink-300">
                  {PROMISES[category.slug]}
                </p>

                {/* The large GST card alone carries its leaves inline
                    (DESIGN.md §11.3: "the highest-value service is one click
                    from the fold") — the other five link only to their hub. */}
                {category.slug === "gst" ? (
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-700 pt-4">
                    {category.children.map((leaf) => (
                      <li key={leaf.slug}>
                        <Link
                          to={leaf.path}
                          className="inline-flex items-center gap-1 rounded-sm text-body-sm text-ink-200 transition-colors hover:text-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                        >
                          {leaf.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Link
                    to={category.path}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-300 transition-[gap] duration-[var(--dur-fast)] hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                  >
                    {/* Five "Learn more" links on one page are indistinguishable
                        in a screen reader's link list, and Lighthouse flags them
                        under SEO link-text. The visible label stays short; the
                        accessible name gains the destination. */}
                    Learn more<span className="sr-only"> about {category.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
