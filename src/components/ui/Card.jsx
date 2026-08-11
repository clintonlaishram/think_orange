import { cn } from "@/lib/cn";
import { ArcGlyph } from "@/components/ui/ArcGlyph";

// DESIGN.md §12.2. Light cards get shadows; dark cards never do — elevation
// there comes from a border plus an inset top highlight (§6.4).
const SURFACE = {
  light:
    "bg-white border border-ink-100 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-ember-200",
  "light-alt":
    "bg-canvas-alt border border-ink-100 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-ember-200",
  dark: "bg-ink-800 border border-ink-700 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] hover:border-ember-400/40",
};

export function Card({ surface = "light", interactive = true, className, children, ...props }) {
  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-md)] p-6 md:p-8 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)]",
        SURFACE[surface],
        interactive && "hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {interactive && (
        <ArcGlyph
          variant="corner"
          className="pointer-events-none absolute right-4 top-4 h-6 w-6 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
          style={{ color: "var(--surface-accent)" }}
        />
      )}
      {children}
    </div>
  );
}
