import { cn } from "@/lib/cn";

// DESIGN.md §12.5. `pulseOnce` is for the overdue variant landing on screen —
// it plays the two-pulse glow once, per DESIGN.md §9.4 ("an infinite pulse
// is nagging"). Don't re-trigger it on re-render.
const VARIANTS = {
  neutral: "bg-ink-50 text-ink-500",
  "due-soon": "bg-warning/12 text-warning",
  overdue: "bg-ember-100 text-ember-700",
  active: "bg-ember-400 text-ink-950",
};

export function Chip({ variant = "neutral", pulseOnce = false, className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-body-sm font-medium",
        VARIANTS[variant],
        variant === "overdue" && pulseOnce && "chip-pulse",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
