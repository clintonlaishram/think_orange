import { cn } from "@/lib/cn";

// Concentric arc rings as a reusable section background — the treatment
// CtaBand pioneered, generalised so dark sections stop reading as blank
// fields without each one hand-authoring its own curve.
//
// ⚠️ The math below is lifted verbatim from CtaBand.jsx:40-48, which still
// carries its own local copy. CtaBand was explicitly out of scope for this
// refinement pass so it was left untouched, but that leaves TWO definitions of
// one shape. Migrate CtaBand onto this module next time it is opened —
// DESIGN.md §3.1's "repetition of one specific shape" only holds while the
// definition is genuinely single.
//
// Decomposition of the established path `M340 200a140 140 0 1 1-66.5-119.2`:
// centre (200,200), r = 140, starting at 3 o'clock and sweeping clockwise the
// long way round to -58.4° — 301.6° of travel with a 58.4° gap in the upper
// right. The `a` command's RELATIVE delta from the (200+r, 200) start is:
//   dx = (cos(-58.4°) - 1) · r = -0.4753 · r
//   dy =  sin(-58.4°)      · r = -0.8513 · r
// Sanity check at r=140: -66.54, -119.18 — matches the original exactly.
const ARC_CENTRE = 200;
const ARC_END_DX = -0.4753;
const ARC_END_DY = -0.8513;

// Not exported: a future CtaBand migration should consume <ArcRings> itself
// rather than re-implementing the composition around a shared path helper.
function arcPath(r) {
  const dx = (ARC_END_DX * r).toFixed(1);
  const dy = (ARC_END_DY * r).toFixed(1);
  return `M${ARC_CENTRE + r},${ARC_CENTRE}a${r} ${r} 0 1 1 ${dx} ${dy}`;
}

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
