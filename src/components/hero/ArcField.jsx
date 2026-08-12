import { useIdleMount } from "@/hooks/useIdleMount";
import DarkVeil from "./DarkVeil";

// DarkVeil is mounted only once the page has gone idle, never on first render.
//
// Compiling that fragment shader and starting a full-screen per-pixel rAF loop
// are both main-thread work, and mounting on first render puts them in the
// exact window React is hydrating the page in. The two compete and the shader
// wins, because its loop keeps re-entering. Measured on the homepage under
// Lighthouse's 4× CPU throttle: 3,420ms total blocking time and 7.7s of script
// evaluation, against ~0–10ms TBT on every route that doesn't mount this.
//
// Nothing about the effect changes — `.arcfield__base` already paints the
// gradient the veil layers over, and the canvas is absolutely positioned, so
// there is no layout shift when it arrives and no visible gap before it.

// DESIGN.md §8.1 — five GPU-composited layers, verbatim structure.
//
//   L1 base     ambient depth (the deep radial gradient)
//   L2 grid     ledger grid, slow diagonal drift
//   L3 rings    the Arc — two counter-rotating conic rings (§3.1)
//   L4 bloom    ember bloom lerped toward the cursor by useBloom
//   L5 vignette seats the content
//
// Only transform / rotate / opacity animate — no layout, no paint, no
// background-position. All styles live in theme.css under "Arc Field", which
// also carries the <=767px static fallback and the reduced-motion frozen
// angles (§8.2).
//
// The consumer must make its own stacking context (`isolate`) — this sits at
// -z-10, and without one a negative-z-index child paints BEHIND the parent's
// own background and disappears. See Hero.jsx.
//
// ⚠️ L2/L3 SWAPPED, 11-08-2026 — Clinton's request. Both commented out
// (not deleted) below, restorable by uncommenting:
//   L3: the two conic rings, replaced with <DarkVeil>, a WebGL shader layer
//       (React Bits). ".arcfield__base" still paints the same --gradient-deep
//       background under everything — the veil is layered ON TOP via
//       `mix-blend-mode: screen` (see `.arcfield__veil` in theme.css), which
//       is what "keep the background the same colour" actually required:
//       `screen` keeps the base gradient showing through the shader's black
//       regions and only ADDS light where the shader pattern is bright,
//       rather than the opaque canvas replacing the background outright.
//   L2: the ledger grid, removed outright per request — no replacement.
//   L4: the cursor bloom, removed outright per request (11-08-2026). It was
//       designed to add an ember glow over the L3 rings; with the veil
//       supplying a far richer moving ember field, it was redundant, and it
//       was also the layer producing a visible translucent rectangle that
//       tracked the cursor on real GPU hardware. `useBloom` is a no-op without
//       the [data-bloom] element (it early-returns), so nothing is left
//       running — but its call in Hero.jsx is commented out too, so the
//       removal reads as deliberate rather than accidental.
// L1/L5 are untouched.
export default function ArcField() {
  const veilReady = useIdleMount();

  return (
    <div className="arcfield grain absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="arcfield__base" />
      {/* <div className="arcfield__grid" /> */}
      {/* <div className="arcfield__ring arcfield__ring--a" /> */}
      {/* <div className="arcfield__ring arcfield__ring--b" /> */}
      <div className="arcfield__veil">{veilReady ? <DarkVeil /> : null}</div>
      {/* <div className="arcfield__bloom" data-bloom /> */}
      <div className="arcfield__vignette" />
    </div>
  );
}
