import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

// Homepage section 2 — REPLACES TrustStrip on the homepage (18-08-2026,
// Clinton's request: the "We work with" partner marquee is out). TrustStrip
// is commented out in home/index.jsx rather than deleted — it has no other
// call site, but it is the only surface that names the eMudhra/SignX
// partnership and it carries IMAGE-PLAN.md §7.4's approved-marks reasoning.
//
// Same slot, same light surface, so DESIGN.md §11.1's alternation is
// unchanged: deep hero → this → dark WhatWeDo. Where the marquee asserted
// association, this section does work the hero can't: it names the
// situations people actually arrive with and hands each one straight to the
// written service leaf that answers it, so the first thing under the fold is
// a route into the site rather than a row of names.
//
// Different archetype from every other light section on the page —
// ComplianceCalendarHome is a table, Faqs an accordion, WhyThinkOrange a
// numeral grid, WhoWeWorkWith a four-up hairline row. This is a full-width
// hairline row LIST, left-aligned (§16 tell 8), numbers carrying the
// hierarchy rather than icons (§16 tell 6).
//
// CONTENT RULES OBSERVED: no fee, no day count, no turnaround, no statutory
// threshold or form code anywhere in this copy. "Approaching the GST
// registration limit" names the situation without asserting the number —
// the number itself belongs in statutory.js and is stated on the leaf, not
// on a homepage teaser. Every `to` is a real path from nav.js and every one
// resolves to a WRITTEN leaf, so nothing here lands on PendingLeaf.
const situations = [
  {
    situation: "Your turnover is approaching the GST registration limit",
    response: "Registration filed with the right documents the first time, so the application isn't sent back for clarification.",
    to: "/services/gst/registration",
    cta: "GST Registration",
  },
  {
    situation: "A GST notice has arrived and you don't know what it wants",
    response: "We read it, work out what's actually being asked, and draft the reply — before the window to respond closes.",
    to: "/services/gst/notices-litigation",
    cta: "GST Notices & Litigation",
  },
  {
    situation: "You're ready to stop trading in your own name",
    response: "Private Limited, LLP, OPC or a partnership — scoped to how you'll actually raise money and share control, then incorporated end to end.",
    to: "/services/business-setup/private-limited-company",
    cta: "Business Setup",
  },
  {
    situation: "You want to sell to government departments",
    response: "GeM registration and the tender paperwork that goes with it, so a missing annexure doesn't disqualify a bid you could have won.",
    to: "/services/tenders-finance/gem-registration",
    cta: "GeM Registration",
  },
  {
    situation: "Your books are behind and returns are piling up",
    response: "Bookkeeping brought current in Tally Prime or Zoho Books, then kept current, with the filings running off clean numbers.",
    to: "/services/accounting-audit/bookkeeping",
    cta: "Bookkeeping",
  },
  {
    situation: "A portal is asking for a Digital Signature Certificate",
    response: "Class 3 DSC issued on a token, with the driver install and the renewal handled when it comes due.",
    to: "/dsc",
    cta: "Digital Signatures",
  },
];

export function WhenToCallUs() {
  return (
    <Section surface="light">
      <Container>
        <div className="max-w-[52ch]">
          <Eyebrow>When people call us</Eyebrow>
          {/* ⚠️ The count is deliberately NOT in this heading (Clinton,
              21-08-2026: "do not directly mention six"). The list below still
              renders whatever `situations` holds, so the section says what it
              does without asserting how many entries there are — which also
              means adding or removing a row can never leave this line stale.
              Same call as /about's "Every practice area, one point of
              contact". */}
          <h2 className="mt-4 text-h2 text-ink-600">
            Most engagements start with one of these sentences.
          </h2>
          <p className="mt-4 text-body text-ink-500">
            If one of them sounds like your week, the page it points to explains
            exactly what the work involves and what we need from you.
          </p>
        </div>

        <div className="mt-12 border-t border-ink-100">
          {situations.map((item, index) => (
            <Reveal key={item.situation} delay={index * 0.05}>
              <Link
                to={item.to}
                className="group grid grid-cols-1 items-start gap-x-8 gap-y-3 border-b border-ink-100 py-7 transition-colors duration-[var(--dur-fast)] hover:bg-canvas-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 lg:grid-cols-12 lg:py-8"
              >
                <span
                  className="font-mono text-body-sm text-ember-600 lg:col-span-1"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-h4 text-ink-600 lg:col-span-5">
                  {item.situation}
                </h3>

                <p className="max-w-[52ch] text-body-sm text-ink-500 lg:col-span-4">
                  {item.response}
                </p>

                <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600 transition-[gap] duration-[var(--dur-fast)] group-hover:gap-2.5 lg:col-span-2 lg:justify-end">
                  {item.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-body-sm text-ink-500">
          Not sure which of these you're in?{" "}
          <Link
            to="/contact"
            className="font-medium text-ember-600 underline decoration-ember-300 decoration-1 underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-ember-700"
          >
            Describe the situation and we'll tell you
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
