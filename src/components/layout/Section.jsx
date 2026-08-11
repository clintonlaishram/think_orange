import { cn } from "@/lib/cn";

// DESIGN.md §4.6 surface pairing rules + §6.1 fluid padding. `data-surface`
// drives the accent/border CSS custom properties and heading colour defined
// in theme.css, so descendants (Eyebrow, borders, accents) read
// var(--surface-accent) / var(--surface-border) without prop-drilling.
const SURFACE_CLASSES = {
  light: "bg-canvas text-ink-500",
  "light-alt": "bg-canvas-alt text-ink-500",
  dark: "bg-ink-900 text-ink-300",
  deep: "bg-ink-950 text-ink-300",
  ember: "bg-ember-400 text-ink-900",
};

const GRAIN_SURFACES = new Set(["dark", "deep"]);

export function Section({ surface = "light", className, children, ...props }) {
  const grainy = GRAIN_SURFACES.has(surface);

  return (
    <section
      data-surface={surface}
      className={cn(
        "relative",
        surface === "deep" ? "section-pad-deep" : "section-pad",
        SURFACE_CLASSES[surface],
        grainy && "grain",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
