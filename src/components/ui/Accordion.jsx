import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

// DESIGN.md §9.3 grid-template-rows technique — same 0fr->1fr trick
// MobileNav's accordion uses, which is what keeps open/close from
// juddering (max-height transitions do not animate smoothly to "auto").
//
// Generic enough to serve T2 FAQs, T3 category FAQs and (later) T8's legal
// prose sections — one component, no per-caller special-casing.
//
// `items`: [{ id, question, answer }]. Only one panel open at a time.
export function Accordion({ items, className }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className={cn("divide-y divide-ink-100", className)}>
      {items.map((item, index) => {
        const id = item.id ?? index;
        const isOpen = openId === id;
        const buttonId = `accordion-trigger-${id}`;
        const panelId = `accordion-panel-${id}`;

        return (
          <div key={id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : id)}
                className="flex w-full min-h-12 items-center justify-between gap-4 py-5 text-left text-body font-medium text-ink-600 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink-400 transition-transform duration-[var(--dur-base)]",
                    isOpen && "rotate-180"
                  )}
                  strokeWidth={1.75}
                />
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
                <p className="max-w-[68ch] pb-5 text-body-sm text-ink-500">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
