import { cn } from "@/lib/cn";
import { ArcGlyph } from "@/components/ui/ArcGlyph";

// DESIGN.md §3.1, §5.1. Mono, uppercase, 0.14em tracking, coloured via the
// ambient surface's accent token — no surface prop needed here, it just
// reads var(--surface-accent) set by the enclosing Section.
export function Eyebrow({ className, children, ...props }) {
  return (
    <div
      className={cn("flex items-center gap-2 font-mono text-eyebrow uppercase text-xs md:text-sm lg:text-base xl:text-lg", className)}
      style={{ color: "var(--surface-accent)" }}
      {...props}
    >
      {/* <ArcGlyph variant="rule" className="h-2 w-6 shrink-0" /> */}
      {children}
    </div>
  );
}
