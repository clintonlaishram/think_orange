import { cn } from "@/lib/cn";
import { arcPath } from "@/lib/arc";

// Concentric arc rings as a reusable section background — the treatment
// CtaBand pioneered, generalised so dark sections stop reading as blank
// fields without each one hand-authoring its own curve.
//
// ⚠️ The arc math now lives in `src/lib/arc.js` — ONE definition, so
// DESIGN.md §3.1's "repetition of one specific shape" is literally true.
// CtaBand.jsx still carries its own local copy (documented there and in
// CLAUDE.md); migrate it onto <ArcRings> next time it is opened.

/**
 * @param rings     [{ r, width, opacity }] — absolute weight lives here, and
 *                  only here. Stop opacities below are relative and multiply
 *                  with these, so this array stays the one knob to turn.
 * @param gradientId Must be unique per mounted instance. `url(#id)` resolves
 *                  DOCUMENT-wide, not scoped to the enclosing <svg>, so two
 *                  instances sharing an id would silently light from whichever
 *                  <defs> mounted last.
 * @param svgClassName Position/size of the ring composition. The wrapper
 *                  clips it, so bleeding off an edge is safe.
 */
export function ArcRings({
  rings,
  gradientId,
  color = "var(--color-ember-400)",
  svgClassName,
  className,
}) {
  return (
    <div className={cn("arc-rings", className)} aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" className={cn("absolute", svgClassName)}>
        <defs>
          {/* ONE gradient shared by every ring via userSpaceOnUse, so the fade
              runs continuously across the whole composition and each ring is
              lit from the same direction. Per-ring objectBoundingBox gradients
              restart the ramp on each radius and the set stops reading as one
              object — the same trap documented in CtaBand. */}
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="60"
            y1="60"
            x2="360"
            y2="360"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.12" />
            <stop offset="45%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {rings.map((ring) => (
          <path
            key={ring.r}
            d={arcPath(ring.r)}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={ring.width}
            strokeLinecap="round"
            opacity={ring.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
