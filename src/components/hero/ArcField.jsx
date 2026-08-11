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
export default function ArcField() {
  return (
    <div className="arcfield grain absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="arcfield__base" />
      <div className="arcfield__grid" />
      <div className="arcfield__ring arcfield__ring--a" />
      <div className="arcfield__ring arcfield__ring--b" />
      <div className="arcfield__bloom" data-bloom />
      <div className="arcfield__vignette" />
    </div>
  );
}
