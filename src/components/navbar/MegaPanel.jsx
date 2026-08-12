import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { ArcGlyph } from "@/components/ui/ArcGlyph";

// DESIGN.md §10.2 / §10.3 — ONE flat panel, every level visible at once.
// No cascading submenus anywhere: CONTENT-PLAN.md §2.2 is explicit that the
// original 3-level hover cascade was the single worst usability risk in the
// brief, so this must never regress into a nested flyout.
//
// `columns` shape: { label, path?, items: [{ path, label }], note?, group? }

function PanelColumn({ column, onNavigate }) {
  const Heading = column.path ? Link : "div";
  const headingProps = column.path ? { to: column.path, onClick: onNavigate } : {};

  return (
    <div
      className={cn(
        // Column hover: ink-800 tint + a 2px gradient bar on the top edge
        // (DESIGN.md §10.2). The bar is the ONLY gradient permitted here —
        // §7.1's whitelist covers "the active mega-menu column indicator".
        "group relative rounded-[var(--radius-sm)] p-3 transition-colors duration-[var(--dur-fast)]",
        "hover:bg-ink-800 focus-within:bg-ink-800"
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-3 top-0 h-0.5 origin-left scale-x-0 rounded-full opacity-0 transition-all duration-[var(--dur-fast)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100"
        style={{ background: "var(--gradient-ember)" }}
      />

      <ArcGlyph variant="rule" className="mb-2 h-2 w-4 text-ember-400" />

      <Heading
        {...headingProps}
        className={cn(
          "block text-h4 text-canvas",
          column.path &&
            "rounded-sm transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
        )}
      >
        {column.label}
      </Heading>

      <ul className="mt-2 space-y-0.5">
        {column.items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={onNavigate}
              className="block rounded-sm py-2.5 text-body-sm text-ink-300 transition-colors duration-[var(--dur-fast)] hover:text-canvas focus-visible:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {column.note && (
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink-300">{column.note}</p>
      )}
    </div>
  );
}

export function MegaPanel({ id, ariaLabel, columns, hubPath, hubLabel, onNavigate, className }) {
  // Growth columns are hairline-separated from the statutory ones
  // (DESIGN.md §10.2, CONTENT-PLAN.md §3.1 — Loans & Finance reads as an
  // adjacent practice area, not one more statutory service).
  //
  // ONE grid across all columns, with the divider drawn as a border on the
  // first growth column. Splitting this into two sibling grids made the
  // growth columns ~2x the width of the statutory ones; a single grid with
  // equal fr tracks is the only way the widths can't drift as categories
  // are added or regrouped.
  const ordered = [
    ...columns.filter((c) => c.group !== "growth"),
    ...columns.filter((c) => c.group === "growth"),
  ];
  const firstGrowthIndex = ordered.findIndex((c) => c.group === "growth");

  return (
    <div
      id={id}
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "rounded-[var(--radius-md)] border border-ink-700 bg-ink-900 p-10 shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${ordered.length}, minmax(0, 1fr))` }}
      >
        {ordered.map((column, index) => (
          <div
            key={column.label}
            className={cn(
              index === firstGrowthIndex && firstGrowthIndex > 0 && "border-l border-ink-700 pl-3"
            )}
          >
            <PanelColumn column={column} onNavigate={onNavigate} />
          </div>
        ))}
      </div>

      {/* Utility rail (DESIGN.md §10.2). Also the only route to the hub page,
          since the nav trigger is a button rather than a link — see nav.js. */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-700 pt-6">
        <p className="text-body-sm text-ink-300">
          Not sure what you need?{" "}
          <Link
            to="/contact"
            onClick={onNavigate}
            className="rounded-sm font-medium text-ember-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            Tell us your situation
          </Link>{" "}
          and we&rsquo;ll point you to the right service.
        </p>
        <Link
          to={hubPath}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-canvas underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
        >
          {hubLabel}
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
