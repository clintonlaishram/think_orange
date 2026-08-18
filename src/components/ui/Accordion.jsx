import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

// THE ONE FAQ / DISCLOSURE TREATMENT ON THE SITE.
//
// 19-08-2026: this component now carries the design the homepage FAQ row had
// (Clinton's request — "take the design of the home page FAQs everywhere").
// Before this, there were two: the homepage's own `FaqAccordion` (mono index,
// plus that rotates to an ×, h4 questions, hairline top and bottom rules) and
// this one (chevron, body-weight questions, no index). `Faqs.jsx` now renders
// THIS component and its private copy is gone — so the treatment has a single
// definition, the way `.card-dark` does for dark cards. Change it here or
// nowhere.
//
// Call sites: T2 service leaves, T3 category hubs, the DSC hub, DSC products,
// three sections in T5 utility pages, partner-with-us, and the homepage row.
// Every one of them is on a `light` or `light-alt` surface — the colours below
// are light-surface tokens and there is no dark variant, because no dark
// call site exists. Add one only when a real page needs it.
//
// ANIMATION IS grid-template-rows 0fr -> 1fr (DESIGN.md §9.3), NOT the
// homepage's old AnimatePresence height animation, and that is deliberate.
// The grid technique keeps the panel MOUNTED while closed, which removes the
// dangling-`aria-controls` problem the homepage version had to work around by
// setting the attribute only while open (recorded in CLAUDE.md, found during
// the Phase 5 a11y pass). Same visual result, one less a11y footgun, and no
// motion dependency in a component this widely used.
//
// `items`: [{ id, question, answer, link?: { to, label } }]
//   `link` renders the homepage's "More on <label> ↗" row under the answer.
//   Omit it and nothing renders — every non-homepage call site does.
export function Accordion({ items, className, defaultOpenFirst = true }) {
  // First row open by default, matching the homepage. An all-closed accordion
  // reads as an empty slab and hides the fact that the rows open at all.
  // Overridable for a caller where an open row would push real content down.
  const [openId, setOpenId] = useState(
    defaultOpenFirst && items.length > 0 ? (items[0].id ?? 0) : null
  );
  const baseId = useId();

  return (
    <ul className={cn("divide-y divide-ink-100 border-y border-ink-100", className)}>
      {items.map((item, index) => {
        const id = item.id ?? index;
        const isOpen = openId === id;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                // Toggle rather than always-open: clicking the open row closes
                // it, which is what a disclosure is expected to do.
                onClick={() => setOpenId(isOpen ? null : id)}
                className="group flex w-full items-start gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-600 focus-visible:ring-offset-2 md:gap-6 md:py-6"
              >
                {/* Mono index — the ledger register the brand already uses for
                    eyebrows and deadline counts. Also gives the row a stable
                    left edge to align the answer against. */}
                <span
                  className="mt-1 shrink-0 font-mono text-body-sm tabular-nums text-ink-400"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex-1 text-h4 text-ink-600 transition-colors duration-[var(--dur-fast)] group-hover:text-ember-600">
                  {item.question}
                </span>

                {/* A plus that rotates to an ×. Rotation only — no crossfade
                    between two icons, which needs two stacked elements and
                    never quite lands. 45deg is the whole trick. */}
                <span
                  className="mt-0.5 shrink-0 rounded-full border border-ink-200 p-1.5 transition-colors duration-[var(--dur-fast)] group-hover:border-ember-400"
                  aria-hidden="true"
                >
                  <Plus
                    className={cn(
                      "h-4 w-4 text-ink-500 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:text-ember-600",
                      isOpen ? "rotate-[135deg]" : "rotate-0"
                    )}
                    strokeWidth={2}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                {/* Indented to sit under the question, not under the index —
                    the mono column plus its gap. */}
                <div className="pb-6 pl-[calc(1.5rem+1ch)] pr-4 md:pl-[calc(2.5rem+1ch)]">
                  <p className="max-w-[68ch] text-body text-ink-500">{item.answer}</p>
                  {item.link && (
                    <Link
                      to={item.link.to}
                      // Not reachable by keyboard while the row is closed: the
                      // panel stays mounted (see the grid note above), so
                      // without this the tab order would run through the links
                      // of every collapsed row.
                      tabIndex={isOpen ? 0 : -1}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 transition-[gap] duration-[var(--dur-fast)] hover:gap-2.5 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-600 focus-visible:ring-offset-2"
                    >
                      More on {item.link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
