import { cn } from "@/lib/cn";
import { ArcGlyph } from "@/components/ui/ArcGlyph";

// DESIGN.md §12.2. Light cards get shadows; dark cards never do — elevation
// there comes from a border plus an inset top highlight (§6.4).
//
// `dark` delegates its whole surface, hover ring and corner-arc draw to the
// `.card-dark` block in theme.css, because DscBand's hand-rolled product
// links need the identical treatment and two copies of these values would
// drift. Light surfaces are unchanged.
const SURFACE = {
  light:
    "bg-white border border-ink-100 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-ember-200",
  "light-alt":
    "bg-canvas-alt border border-ink-100 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-ember-200",
  dark: "card-dark",
};

export function Card({ surface = "light", interactive = true, className, children, ...props }) {
  const isDark = surface === "dark";

  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-xl)] lg:rounded-[var(--radius-2xl)] p-6 md:p-8",
        // .card-dark owns its own transition (180ms, hover-gated). Applying
        // the shared 280ms one on top would win on specificity order and
        // undo that.
        !isDark &&
          "transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)]",
        SURFACE[surface],
        // Dark's lift lives in .card-dark's hover-gated block; light surfaces
        // keep the original (still ungated — out of scope here, but worth
        // fixing when the light templates get their own pass).
        interactive && !isDark && "hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {interactive && (
        <ArcGlyph
          variant="corner"
          className={cn(
            "pointer-events-none absolute right-4 top-4 h-6 w-6",
            isDark
              ? "card-arc"
              : "opacity-0 transition-opacity duration-[var(--dur-slower)] group-hover:opacity-100"
          )}
          style={{ color: "var(--surface-accent)" }}
        />
      )}
      {children}
    </div>
  );
}
