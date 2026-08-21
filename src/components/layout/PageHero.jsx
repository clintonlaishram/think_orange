import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SurfaceTexture } from "@/components/ui/SurfaceTexture";
import { ArcRings } from "@/components/ui/ArcRings";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

// Shared compact dark hero for T2 (service leaf) and T3 (category hub) —
// CONTENT-PLAN.md §7 row 1 and §8 row 1 ("Same as T2 hero"). Breadcrumb, H1,
// one-line copy and an inline CTA over a single static arc — no cursor
// bloom, no scroll-linked motion, so it stays cheap across the 40+ pages that
// render it.
//
// Satisfies the layout contract: full-bleed to y=0 via `.page-top`, dark
// surface so the fixed transparent header's canvas-coloured text stays
// legible over it (CLAUDE.md "Layout contract").
//
// `children` (Phase 7): T5 utility pages need their download buttons
// "immediately" above the fold (CONTENT-PLAN.md §9) — inside this hero
// rather than in a separate section below it, and WITHOUT the `cta` link
// button (T5 is "no marketing chrome"). Optional and additive.
//
// --- 20-08-2026, DSC premium pass -----------------------------------------
// Three more optional props, all additive. Pass none of them and the rendered
// output is byte-identical to before, which is what the ~40 non-DSC routes
// rely on:
//
//   `texture`  — a SurfaceTexture variant (theme.css `.surface-texture`)
//                rendered INSTEAD of the single static arc, plus
//                `.surface-ambient`'s radial so the fold is not a flat slab.
//                §7.2 is explicit that dark surfaces "are not flat #0B1329";
//                the other 40 heroes still are, and can take the same prop
//                one at a time — deliberately not switched on for all of them
//                inside a DSC-scoped change.
//   `aside`    — right-hand column. Switches the hero to a 7/5 grid.
//   `spec`     — [{ label, value }] hairline row beneath, for DERIVED facts
//                only (counts, "On request", partner names already asserted in
//                content). Never a number that would need confirming — this
//                row is exactly where an invented client count or turnaround
//                would be easiest to slip in.
//
// `textureId` must be unique per mounted hero — `url(#id)` resolves
// document-wide, not per-<svg>.
//
// --- 21-08-2026 ------------------------------------------------------------
// `ringsId` is a third, additive backdrop option, alongside the default single
// crescent and `texture`. Pass a unique id and the hero renders `ArcRings` —
// the concentric, gradient-faded set the CtaBand and the /dsc sections already
// use — instead of the lone flat arc.
//
// The lone arc is a single 16px stroke at a flat 12% ember, hung off the
// corner at a size that puts its brightest section behind the fixed header. On
// a page with no other backdrop it does not read as a corner composition; it
// reads as one dull circle that has been cut off. `ArcRings` fixes that by
// construction rather than by nudging: the shared gradient fades each stroke
// along its own length, so the composition resolves into the surface instead
// of ending at the clip edge, and two radii read as depth where one reads as
// an object. Same crescent geometry either way (`lib/arc.js`), so §3.1's "one
// specific shape" still holds.
//
// Default stays the single arc — the other ~40 heroes are byte-identical
// unless they opt in.
export function PageHero({
  path,
  eyebrow,
  h1,
  lede,
  cta,
  children,
  texture,
  textureId,
  aside,
  spec,
  ringsId,
}) {
  const textured = Boolean(texture && textureId);
  const ringed = Boolean(ringsId) && !textured;

  // The hero's entrance cascade (20-08-2026, Clinton: "in the hero section add
  // animation showing text"). Every line is a `Reveal`, staggered down the
  // block, so the fold assembles top-to-bottom instead of appearing at once.
  //
  // `margin="0px"` on ALL of them, not just the spec row: `Reveal`'s default
  // -12% bottom root-shrink exists to stop a below-the-fold section firing the
  // instant a sliver peeks in. Hero content is above the fold at mount, where
  // that margin is a liability — it is the documented dead zone that left the
  // homepage stat row stuck at opacity 0 until a scroll.
  //
  // ⚠️ TRADEOFF, stated rather than hidden: this puts `opacity: 0` on the H1 in
  // the prerendered HTML of ~40 routes, so the largest text on the page paints
  // only after hydration. The same tradeoff is already recorded for the
  // homepage's Typewriter. It was measured after this change (see CLAUDE.md);
  // if a T5 driver page ever misses CONTENT-PLAN.md §9's LCP < 1.2s target,
  // the fix is to drop the H1's opacity from its `Reveal` and let it rise only.
  const copy = (
    <>
      <Reveal margin="0px" delay={0}>
        <Breadcrumbs path={path} className="mb-6" />
      </Reveal>
      {eyebrow && (
        <Reveal margin="0px" delay={0.06}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      {/* `fade={false}` — the H1 RISES but never starts transparent. It is the
          largest text on all ~40 routes this hero serves and the LCP element on
          the T5 driver pages that carry CONTENT-PLAN.md §9's LCP < 1.2s budget,
          so hiding it until hydration would gate the page's largest paint
          behind JS. This keeps the entrance animation and lets the text paint
          straight from the prerendered HTML. Everything else in the cascade
          fades normally — none of it is an LCP candidate. */}
      <Reveal margin="0px" delay={0.12} fade={false}>
        <h1 className={cn("text-h1 max-w-[34ch] text-canvas", eyebrow && "mt-3")}>{h1}</h1>
      </Reveal>
      {lede && (
        <Reveal margin="0px" delay={0.2}>
          <p className="mt-4 max-w-[62ch] text-body-base sm:text-body-lg text-ink-300">{lede}</p>
        </Reveal>
      )}
      {cta && (
        <Reveal margin="0px" delay={0.28} className="mt-7">
          <Button as={Link} to={cta.to} variant="primary">
            {cta.label}
          </Button>
        </Reveal>
      )}
      {children && (
        <Reveal margin="0px" delay={0.28} className="mt-7">
          {children}
        </Reveal>
      )}
    </>
  );

  return (
    <section
      data-surface="deep"
      className={cn(
        "page-top grain relative overflow-hidden bg-ink-950 pb-14 md:pb-16",
        (textured || ringed) && "surface-ambient isolate"
      )}
    >
      {textured ? (
        /* `placement` is DERIVED, never passed by a call site: an `aside` is
           an opaque `.panel-dark` filling the right half, so a top-right motif
           on a hero that has one ends up almost entirely behind it. Deriving
           it here means a template cannot pair the two wrongly. */
        <SurfaceTexture
          variant={texture}
          id={textureId}
          tone="dark"
          placement={aside ? "left" : "default"}
        />
      ) : ringed ? (
        /* Bled off the right edge and centred on the hero's own height rather
           than hung off the top corner, so the brightest part of the sweep
           lands beside the copy instead of behind the fixed header. */
        <ArcRings
          gradientId={ringsId}
          rings={[
            { r: 150, width: 14, opacity: 0.16 },
            { r: 112, width: 10, opacity: 0.1 },
            { r: 74, width: 7, opacity: 0.07 },
          ]}
          svgClassName="rotate-60 -right-36 -bottom-44 h-[420px] w-[420px] md:-right-38 md:-bottom-40 md:h-[560px] md:w-[560px] lg:-bottom-44 lg:-right-42 lg:h-[660px] lg:w-[660px]"
        />
      ) : (
        /* Single static arc — same crescent as the Footer/CtaBand, at rest.
           No rotation, no bloom: DESIGN.md reserves that treatment for the T1
           hero (§3.1, §16 — "designed pages apply each effect in one place"),
           and CONTENT-PLAN.md §7 asks for this hero to be fast above all. */
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-28 -top-28 h-[340px] w-[340px] text-ember-300 opacity-[0.12] md:-right-16 md:-top-32 md:h-[460px] md:w-[460px]"
          fill="none"
        >
          <path
            d="M340 200a140 140 0 1 1-66.5-119.2"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </svg>
      )}

      <Container className="relative">
        {aside ? (
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">{copy}</div>
            {/* Only the OPTIONAL parts animate. The breadcrumb, h1 and lede
                are deliberately left alone: they are above the fold on every
                one of the ~40 routes this hero serves, and animating them here
                would both delay the LCP text and spend the homepage hero's
                entrance cascade a second time (§16). */}
            <Reveal delay={0.36} margin="0px" className="lg:col-span-5">
              {aside}
            </Reveal>
          </div>
        ) : (
          copy
        )}

        {spec?.length > 0 && (
          // `margin="0px"` overrides Reveal's default -12% bottom exclusion,
          // and it is a bug fix rather than a preference: this row is the
          // hero's own trailing content and can legitimately already be ON
          // SCREEN at mount, where the shrunk intersection root never grants
          // it the 18% overlap `amount` needs — so it would sit at opacity 0
          // until an actual scroll changed the geometry. Exactly the dead zone
          // documented for the homepage's stat row.
          //
          // No Counter/Scramble here, deliberately. Those are the T1 hero's
          // signature (§16 — apply each effect in one place), and two of these
          // four values are not numbers anyway.
          <Reveal
            delay={0.44}
            margin="0px"
            className="hero-spec mt-12 grid grid-cols-2 md:mt-14 md:grid-cols-4"
            as="dl"
          >
            {spec.map((entry) => (
              <div key={entry.label} className="px-0 py-4 md:px-6 md:py-1">
                {/* ink-300, NOT ink-400 — measured, not chosen. At 11px on
                    ink-950 under the hero's ambient radial, ink-400 sampled at
                    2.86:1 against the 4.5:1 floor for normal text; ink-300 is
                    5.8:1. Same failure class Phase 10 recorded for ink-300 /
                    ink-400 used as body copy on dark, and invisible to a static
                    resolver because the surface is a gradient. */}
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-300">
                  {entry.label}
                </dt>
                <dd className="mt-1.5 text-body font-medium text-canvas">{entry.value}</dd>
              </div>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
