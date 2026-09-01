import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

// DISCLOSURE — the open-one-at-a-time list, shared by /dsc and /dsc/resources.
//
// ⛔ 02-09-2026. Extracted from the DSC token page once /dsc needed the same
// treatment for its document checklists (Clinton: "protal guide and document
// has to be dsc page"). One definition rather than two near-identical ones —
// the same discipline that keeps `.card-dark` a single class.
//
// This is deliberately NOT `components/ui/Accordion.jsx`. That one renders its
// `answer` inside a <p>, so a panel containing a table or a list would be
// invalid nesting, and it is tuned for Q&A rows. This renders arbitrary panel
// content behind an icon-led, two-line header.

/**
 * The shared open-one-at-a-time list. One implementation for documents and
 * drivers rather than two near-identical ones — the same discipline that keeps
 * `.card-dark` a single class.
 *
 * ⚠️ Panels stay MOUNTED while collapsed (see this file's header). The
 * consequence is that any link inside a closed panel is still in the tab
 * order, so `DocumentPanel` and `DriverPanel` must not contain links, or must
 * gate them on the open state. Neither does today.
 */
export function Disclosure({ items, dark = false, openKey, onOpenChange }) {
  // Uncontrolled by default; controlled when a caller passes `openKey` — which
  // is what lets /dsc/resources open a specific driver from a link elsewhere on
  // the page (the hero's token buttons) or from a URL hash.
  const [internalKey, setInternalKey] = useState(null);
  const isControlled = onOpenChange !== undefined;
  const activeKey = isControlled ? openKey : internalKey;
  const setActiveKey = isControlled ? onOpenChange : setInternalKey;
  const reduceMotion = useReducedMotion();

  return (
    <ul className={cn("mt-10 border-t", dark ? "border-ink-700" : "border-ink-200")}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isOpen = activeKey === item.key;
        return (
          <li
            key={item.key}
            // A per-item anchor, so a link elsewhere can address one row. The
            // scroll margin clears the fixed header AND the sticky sub-nav.
            id={item.anchorId}
            className={cn(
              "scroll-mt-32 border-b",
              dark ? "border-ink-700" : "border-ink-200"
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => setActiveKey(isOpen ? null : item.key)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.key}`}
                className={cn(
                  "group flex w-full items-center gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 md:gap-6",
                  dark && "focus-visible:ring-offset-ink-950"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden shrink-0 font-mono text-body-sm tabular-nums sm:block",
                    dark ? "text-ink-300" : "text-ink-400"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {Icon && (
                  // Ringed on dark, filled on light — the established pairing.
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
                )}
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-h4 transition-colors",
                      dark
                        ? "text-canvas group-hover:text-ember-200"
                        : "text-ink-600 group-hover:text-ember-600"
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-mono text-body-sm",
                      dark ? "text-ink-300" : "text-ink-400"
                    )}
                  >
                    {item.meta}
                  </span>
                </span>
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn(
                    "h-5 w-5 shrink-0 transition-[rotate,color] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                    dark
                      ? "text-ink-300 group-hover:text-ember-200"
                      : "text-ink-400 group-hover:text-ember-600",
                    // ⚠️ Tailwind v4 compiles `rotate-*` to the INDIVIDUAL
                    // `rotate` property, not `transform` — a probe reading
                    // getComputedStyle().transform sees "none".
                    isOpen && (dark ? "rotate-[135deg] text-ember-200" : "rotate-[135deg] text-ember-600")
                  )}
                />
              </button>
            </h3>

            <div
              id={`panel-${item.key}`}
              role="region"
              className={cn(
                "grid",
                !reduceMotion &&
                  "transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              {/* ⚠️ ALWAYS MOUNTED. An earlier cut wrapped this in
                  `{isOpen && …}` inside an AnimatePresence, which unmounts the
                  panel while collapsed — and a probe of the BUILT HTML caught
                  it: not one driver's troubleshooting text was in the
                  prerendered page. This page is the only place several of the
                  retired pages' content now exists, so it has to be as
                  crawlable as they were. `grid-template-rows: 0fr → 1fr`
                  collapses without unmounting, and keeps `aria-controls`
                  pointing at a real element. `invisible` when closed so the
                  contents leave the tab order and the accessibility tree —
                  which is also what stops a collapsed panel's links being
                  tabbable. */}
              <div className={cn("overflow-hidden", !isOpen && "invisible")}>
                <div
                  className={cn(
                    "pb-8 sm:pl-[3.75rem] lg:pl-[5.75rem]",
                    !reduceMotion &&
                      "transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
                    isOpen ? "opacity-100" : "opacity-0"
                  )}
                >
                  {item.panel}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

