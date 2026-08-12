import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// Shared compact dark hero for T2 (service leaf) and T3 (category hub) —
// CONTENT-PLAN.md §7 row 1 and §8 row 1 ("Same as T2 hero"). Breadcrumb, H1,
// one-line copy and an inline CTA over a single static arc — no cursor
// bloom, no scroll-linked motion, so it stays cheap across the 29 pages that
// render it (21 leaves + 8 hubs). This is the `PageHero` primitive
// CLAUDE.md's Phase 4 notes flagged as still missing ("Phase 5 should wrap
// this... so templates never hand-roll the offset") — built here in Phase 6
// since T2/T3 are the first templates that actually need it twice.
//
// Satisfies the layout contract: full-bleed to y=0 via `.page-top`, dark
// surface so the fixed transparent header's canvas-coloured text stays
// legible over it (CLAUDE.md "Layout contract").
//
// `children` (Phase 7): T5 utility pages need their download buttons
// "immediately" above the fold (CONTENT-PLAN.md §9) — inside this hero
// rather than in a separate section below it, and WITHOUT the `cta` link
// button (T5 is "no marketing chrome"). Optional and additive; T2/T3 don't
// pass it and are unaffected.
export function PageHero({ path, eyebrow, h1, lede, cta, children }) {
  return (
    <section
      data-surface="deep"
      className="page-top grain relative overflow-hidden bg-ink-950 pb-14 md:pb-16"
    >
      {/* Single static arc — same crescent as the Footer/CtaBand, at rest.
          No rotation, no bloom: DESIGN.md reserves that treatment for the T1
          hero (§3.1, §16 — "designed pages apply each effect in one place"),
          and CONTENT-PLAN.md §7 asks for this hero to be fast above all. */}
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

      <Container className="relative">
        <Breadcrumbs path={path} className="mb-6" />
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className={cn("text-h1 max-w-[34ch] text-canvas", eyebrow && "mt-3")}>{h1}</h1>
        {lede && <p className="mt-4 max-w-[62ch] text-body-lg text-ink-300">{lede}</p>}
        {cta && (
          <div className="mt-7">
            <Button as={Link} to={cta.to} variant="primary">
              {cta.label}
            </Button>
          </div>
        )}
        {children && <div className="mt-7">{children}</div>}
      </Container>
    </section>
  );
}
