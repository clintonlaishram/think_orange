import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import {
  complianceCalendar,
  deadlineCountdown,
  formatDueDate,
  upcomingDeadlines,
} from "@/content/compliance-calendar";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 7 — CONTENT-PLAN.md §6 row 7, DESIGN.md §3.2 + §11.6. The
// differentiator section: "the most useful thing on the page — give it room."
//
// Two deliberate departures from §11.6's literal text, both because the real
// data doesn't match the draft's assumptions:
//   · Filter chips are `All · GST · Income Tax · ROC`, not `...· TDS`. TDS
//     Payment is filed under category "income-tax" in compliance-calendar.js
//     (there is no separate "tds" category) — a chip labelled TDS would
//     either duplicate Income Tax's rows or filter to nothing. Chips are
//     derived from the categories that actually exist in the data, not typed
//     from the brief, so this can't drift out of sync again.
//   · No "View full calendar →" link. §11.6 assumes a dedicated calendar
//     route; none exists in nav.js's 49 routes. Linking to a page that
//     doesn't exist is worse than omitting the link.
// A chevron only renders when `category` maps to a real serviceCategories
// path (gst, income-tax) — "roc" has no home in the current IA (AOC-4/MGT-7
// aren't under any written category), so those rows render without one
// rather than guessing a link.
const CATEGORY_META = {
  gst: { label: "GST", path: "/services/gst" },
  "income-tax": { label: "Income Tax", path: "/services/income-tax" },
  roc: { label: "ROC", path: null },
};

const FILTERS = ["all", ...Object.keys(CATEGORY_META)];
const MAX_ROWS = 8;

export function ComplianceCalendarHome() {
  const [active, setActive] = useState("all");

  // Local midnight — see compliance-calendar.js's calling note (a
  // mid-afternoon Date rolls a same-day deadline a full period forward).
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // The full pool, not just the homepage's top few — filtering has to run
  // BEFORE the 8-row cap, or selecting "ROC" could show fewer than its own
  // 8 soonest rows just because busier categories crowded it out of an
  // earlier global top-8.
  const all = useMemo(
    () => upcomingDeadlines(today, complianceCalendar.length),
    [today]
  );
  const visible = (active === "all" ? all : all.filter((d) => d.category === active)).slice(
    0,
    MAX_ROWS
  );

  return (
    <section data-surface="light" className="section-pad bg-canvas">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Compliance Calendar"
            heading="What's due next"
            reveal={false}
          />

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                aria-pressed={active === key}
                className="rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
              >
                <Chip
                  variant={active === key ? "active" : "neutral"}
                  className="cursor-pointer"
                >
                  {key === "all" ? "All" : CATEGORY_META[key].label}
                </Chip>
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger className="mt-8 divide-y divide-ink-100 border-t border-ink-100">
          {visible.map((deadline) => (
            <DeadlineRow key={deadline.id} deadline={deadline} />
          ))}
        </Stagger>

        {visible.length === 0 && (
          <p className="mt-8 text-body-sm text-ink-400">
            No upcoming dates in this category right now.
          </p>
        )}
      </Container>
    </section>
  );
}

function DeadlineRow({ deadline }) {
  const meta = CATEGORY_META[deadline.category];
  const href = meta?.path;

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <p className="text-body font-medium text-ink-600">{deadline.label}</p>
        <p className="mt-0.5 font-mono text-body-sm uppercase tracking-wide text-ink-400">
          {meta?.label ?? deadline.category}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-mono text-body-sm tabular-nums text-ink-500">
          {formatDueDate(deadline.dueDate)}
        </p>
        {deadline.illustrative && (
          <p className="mt-0.5 max-w-[26ch] text-body-sm text-ink-400" title={deadline.illustrativeNote}>
            Typical date — see note
          </p>
        )}
      </div>

      <Chip variant={deadline.chipVariant} pulseOnce className="shrink-0">
        {deadlineCountdown(deadline.daysRemaining)}
      </Chip>

      {href ? (
        <ChevronRight className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
      ) : (
        <span className="w-4 shrink-0" aria-hidden="true" />
      )}
    </>
  );

  const rowClass =
    "flex flex-wrap items-center gap-4 py-4 sm:flex-nowrap sm:gap-6";

  if (!href) {
    return <div className={rowClass}>{content}</div>;
  }

  return (
    <Link
      to={href}
      className={
        rowClass +
        " rounded-sm transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
      }
    >
      {content}
    </Link>
  );
}
