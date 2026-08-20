// The site's ONE repeated shape — DESIGN.md §3.1. Single definition, so
// "repetition of one specific shape" is literally true rather than three
// files happening to agree.
//
// Decomposition of the established path `M340 200a140 140 0 1 1-66.5-119.2`
// (Footer / PageHero / CtaBand crescent): centre (200,200), r = 140, starting
// at 3 o'clock and sweeping clockwise the long way round to -58.4° — 301.6°
// of travel with a 58.4° gap in the upper right. The `a` command's RELATIVE
// delta from the (200+r, 200) start is:
//   dx = (cos(-58.4°) - 1) · r = -0.4753 · r
//   dy =  sin(-58.4°)      · r = -0.8513 · r
// Sanity check at r=140: -66.54, -119.18 — matches the original exactly.
//
// ⚠️ CtaBand.jsx still carries its own local copy of this math (documented
// there and in CLAUDE.md as a known duplicate). It was out of scope for the
// DSC pass that extracted this module; migrate it here next time it is open.
export const ARC_CENTRE = 200;
const ARC_END_DX = -0.4753;
const ARC_END_DY = -0.8513;

/** The crescent at radius `r`, centred on (200,200) in a 0 0 400 400 viewBox. */
export function arcPath(r) {
  const dx = (ARC_END_DX * r).toFixed(1);
  const dy = (ARC_END_DY * r).toFixed(1);
  return `M${ARC_CENTRE + r},${ARC_CENTRE}a${r} ${r} 0 1 1 ${dx} ${dy}`;
}

/**
 * Radial tick marks around the same centre — the engraved-rosette detail that
 * turns concentric crescents into something that reads as security print.
 * Returns [{ x1, y1, x2, y2 }] in the same 400×400 user space.
 *
 * `gapDeg` leaves the crescent's own 58.4° opening clear, so the ticks stop
 * where the arcs stop instead of closing a shape the arcs deliberately leave
 * open.
 */
export function radialTicks({ count, inner, outer, startDeg = 0, sweepDeg = 302 }) {
  const ticks = [];
  for (let i = 0; i < count; i += 1) {
    const rad = ((startDeg + (sweepDeg * i) / (count - 1)) * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    ticks.push({
      x1: +(ARC_CENTRE + cos * inner).toFixed(2),
      y1: +(ARC_CENTRE + sin * inner).toFixed(2),
      x2: +(ARC_CENTRE + cos * outer).toFixed(2),
      y2: +(ARC_CENTRE + sin * outer).toFixed(2),
    });
  }
  return ticks;
}
