import { cn } from "@/lib/cn";

// DESIGN.md §12.5. `pulseOnce` is for the overdue variant landing on screen —
// it plays the two-pulse glow once, per DESIGN.md §9.4 ("an infinite pulse
// is nagging"). Don't re-trigger it on re-render.
// Phase 10 audit: `active` was `text-white`, which is the one pairing §4.5
// names as "❌ Never" (3.13:1). §12.5 already specifies ember-400/ink-950 —
// the white was a straight deviation, not a judgement call.
//
// `due-soon` is a spec-internal conflict: §12.5 prescribes `warning` text on a
// 12% `warning` tint, which measures 3.43:1 and fails §4.5's own AA floor.
// Resolved the way this repo resolves those elsewhere — honour the accessible
// outcome, keep the amber character, document the deviation. `warning-700` is
// the same hue at a passing depth (5.1:1 on canvas), not a new brand colour.
const VARIANTS = {
  neutral: "bg-ink-50 text-ink-500",
  "due-soon": "bg-warning/12 text-warning-700",
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
