import { forwardRef } from "react";
import { cn } from "@/lib/cn";

// DESIGN.md §12.1. Four variants: primary, secondary (light/dark via
// `tone`), ghost (light/dark via `tone`). Primary text is ALWAYS ink-950 —
// white on ember-400 is 3.13:1 and fails WCAG AA. Never change this.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-body font-medium " +
  "min-h-[48px] min-w-[44px] px-7 py-3.5 transition-[transform,background-color,border-color,box-shadow] " +
  "duration-[var(--dur-base)] ease-[var(--ease-out)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 " +
  "active:duration-[var(--dur-instant)] active:scale-[.985] active:translate-y-0 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS = {
  primary:
    "btn-sweep bg-ember-400 text-ink-950 hover:bg-ember-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-ember)]",
  // For use ON an ember surface, where `primary` would be invisible
  // (ember-400 button on an ember-400 band). Specified in DESIGN.md §11.11:
  // "one solid ink-950 button with canvas text". Focus ring switches to
  // ink-950 because ember-300 has almost no contrast against ember-400.
  onEmber:
    "bg-ink-950 text-canvas hover:bg-ink-900 hover:-translate-y-0.5 focus-visible:ring-ink-950",
    secondary: {
      light:
      "bg-transparent text-ink-600 border border-ink-100 hover:bg-ink-50 hover:border-ink-600",
      dark: "bg-transparent text-canvas border border-ink-700 hover:bg-ink-800 hover:border-ink-600",
    },
    tertiary:
      "bg-whatsapp text-canvas text-ink-800 hover:text-ink-100 hover:bg-success hover:-translate-y-0.5 focus-visible:ring-ink-950",
  ghost: {
    light: "bg-transparent text-ember-600 hover:underline underline-offset-4",
    dark: "bg-transparent text-ember-200 hover:underline underline-offset-4",
  },
};

export const Button = forwardRef(function Button(
  { variant = "primary", tone = "light", className, children, as: Comp = "button", ...props },
  ref
) {
  // Variants are either a flat class string (primary, onEmber) or keyed by
  // surface tone (secondary, ghost).
  const entry = VARIANTS[variant];
  const variantClass = typeof entry === "string" ? entry : entry?.[tone];

  return (
    <Comp ref={ref} className={cn(BASE, variantClass, className)} {...props}>
      {children}
    </Comp>
  );
});
