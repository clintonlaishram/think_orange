import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { ArcRings } from "@/components/ui/ArcRings";
import { Button } from "@/components/ui/Button";

// DESIGN.md §10.2 / §10.3 — ONE flat panel, every level visible at once.
// No cascading submenus anywhere: CONTENT-PLAN.md §2.2 is explicit that the
// original 3-level hover cascade was the single worst usability risk in the
// brief, so this must never regress into a nested flyout.
//
// `columns` shape: { label, path?, items: [{ path, label, note? }], note?, group? }

function PanelColumn({ column, onNavigate }) {
  const Heading = column.path ? Link : "div";
  const headingProps = column.path ? { to: column.path, onClick: onNavigate } : {};

  return (
    <div
      className={cn(
        // Column hover: ink-800 tint + a 2px gradient bar on the top edge
        // (DESIGN.md §10.2). The bar is the ONLY gradient permitted here —
        // §7.1's whitelist covers "the active mega-menu column indicator".
        "group relative rounded-[var(--radius-sm)] p-3 transition-colors duration-[var(--dur-fast)]",
        "hover:bg-ink-800 focus-within:bg-ink-800"
      )}
    >
      <span
        aria-hidden="true"
        // `transition-[transform,opacity]`, not `transition-all`: `all` makes
        // the compositor watch every property on the element, and this one
        // only ever changes two.
        className="absolute inset-x-3 top-0 h-0.5 origin-left scale-x-0 rounded-full opacity-0 transition-[transform,opacity] duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100"
        style={{ background: "var(--gradient-ember)" }}
      />

      {/* <ArcGlyph variant="rule" className="mb-2 h-2 w-4 text-ember-400" /> */}

      {/* 19-08-2026: the heading LOOK (ember-300, semibold, column layout) is
          shared by every panel, and only the INTERACTIVE states are
          conditional on `column.path`. It used to be the other way round —
          the whole ember treatment hung off `column.path`, so the Services
          panel's headings (real category routes) rendered ember and the DSC
          panel's (groupings, not routes: "Digital Signature Certificates",
          "Tokens & Resources", "eSign Solutions") fell back to plain canvas.
          Two visibly different dropdowns from one component. The DSC groups
          stay non-links, because there is no page for a grouping to link to. */}
      <Heading
        {...headingProps}
        className={cn(
          "flex flex-col text-h4 font-semibold text-ink-100",
          column.path &&
            "rounded-sm transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
        )}
      >
        {column.label}

        <span
          aria-hidden="true"
          className="mt-2.5 block h-0.5 w-8 rounded-full"
          style={{ background: "var(--gradient-ember)" }}
        />
      </Heading>

      <ul className="mt-2 space-y-0.5">
        {column.items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={onNavigate}
              // A row is a full-width target, so it now reads as one: a
              // tint lighter than the column's own hover tint, on the row's
              // real bounds (`-mx-2 px-2` claws back the column padding so
              // the highlight spans the column rather than floating inside
              // it). Colour alone left ~30 links with no shape.
              className="-mx-2 block rounded-[var(--radius-sm)] px-2 py-2.5 font-medium text-body-sm text-ink-200 transition-colors duration-[var(--dur-fast)] hover:bg-ink-700/45 hover:text-canvas focus-visible:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              {item.label}
              {/* Per-item note — currently only "Buy DSC Tokens"' token-brand
                  subtitle. Mono/muted/small, same register as the column-level
                  note below, just scoped to one link instead of the whole
                  column. */}
              {item.note && (
                <span className="mt-0.5 block font-mono text-[11px] leading-relaxed text-ink-300">
                  {item.note}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {column.note && (
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink-300">{column.note}</p>
      )}
    </div>
  );
}

/**
 * The mega panel's promo card — currently the DSC panel's "Partner
 * Programme" slot, replacing the old primaryNav "Partner With Us" link
 * (nav.js's `dscPartnerPromo`). Deliberately NOT `PanelColumn`: this isn't a
 * list of links, it's a self-contained pitch with its own two CTAs, so it
 * gets its own render path rather than overloading `column.items`.
 *
 * Reuses `.panel-dark` (theme.css) — the same "static content panel" surface
 * PartnerProgramme's homepage panel uses, deliberately NOT `.card-dark`:
 * this box isn't itself one big link (it holds two distinct CTAs), so a
 * hover lift/glow on the whole card would signal a click target that isn't
 * there, the exact trap `.panel-dark`'s own comment in theme.css warns
 * about. `data-surface="dark"` is load-bearing, not decorative — the whole
 * mega panel container never sets it, so without it here `var(--surface-
 * accent)`/`var(--surface-border)` would resolve to their light-surface
 * values a few levels up.
 */
function PanelPromo({ promo, onNavigate }) {
  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative flex h-fit flex-col overflow-hidden rounded-[var(--radius-lg)] p-8"
    >
      {/* <ArcGlyph variant="rule" className="mb-2 h-2 w-4 text-ember-400" /> */}
      {/* `text-canvas`, matching PanelColumn's own `<Heading>` — not an ember
          eyebrow. Two reasons: it's what the source mockup's `.col.panel h4`
          actually does (plain white, same as every other column heading),
          and `.text-ember-300` here would lose anyway to `[data-surface=
          "dark"] h4`'s canvas rule (theme.css), which beats a plain class on
          specificity — the exact trap this codebase already hit once on
          PartnerProgramme's h3. */}
      <h4 className="text-h4 text-canvas">{promo.heading}</h4>
      <p className="mt-2 text-body-sm leading-relaxed text-ink-300">{promo.description}</p>

      <div className="relative mt-6 flex flex-col items-start gap-3">
        <Button
          as={Link}
          to={promo.cta.path}
          onClick={onNavigate}
          variant="primary"
          // NOT `text-white`: CLAUDE.md's first non-negotiable is ember-400
          // bg with ink-950 text — white on ember measures 3.13:1 and fails
          // AA. `Button`'s primary variant already carries the right colour,
          // so the override is simply removed.
          className="min-h-0 px-4 py-2 text-body-sm"
        >
          {promo.cta.label}
        </Button>
        {/* {promo.secondaryLabel && (
          <a
            href={buildPartnerLoginHref(promo.secondaryLabel)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ink-300 underline-offset-4 transition-colors hover:text-ember-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {promo.secondaryLabel}
          </a>
        )} */}
      </div>
    </div>
  );
}


export function MegaPanel({ id, ariaLabel, columns, promo, hubPath, hubLabel, onNavigate, className }) {
  // Growth columns are hairline-separated from the statutory ones
  // (DESIGN.md §10.2, CONTENT-PLAN.md §3.1 — Tenders & Finance reads as an
  // adjacent practice area, not one more statutory service).
  //
  // ONE grid across all columns, with the divider drawn as a border on the
  // first growth column. Splitting this into two sibling grids made the
  // growth columns ~2x the width of the statutory ones; a single grid with
  // equal fr tracks is the only way the widths can't drift as categories
  // are added or regrouped.
  const ordered = [
    ...columns.filter((c) => c.group !== "growth"),
    ...columns.filter((c) => c.group === "growth"),
  ];
  const firstGrowthIndex = ordered.findIndex((c) => c.group === "growth");

  return (
    <div
      id={id}
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "mega-panel grain relative isolate overflow-hidden rounded-[var(--radius-md)] border border-ink-700 p-10",
        className
      )}
    >
      {/* The site's own arc, at panel weight, bled off the bottom-right so the
          panel's one genuinely empty region carries the brand mark. Same
          `[z-index:-1]` reasoning as the mobile sheet: `.arc-rings`' own z-0
          would paint above in-flow text. Unique gradientId per instance —
          `url(#id)` resolves document-wide — hence the panel's own `id`. */}
      <ArcRings
        gradientId={`${id}-arc`}
        rings={[
          { r: 140, width: 1, opacity: 0.085 },
          { r: 108, width: 1.5, opacity: 0.05 },
        ]}
        className="[z-index:-1]"
        svgClassName="-bottom-60 -right-44 h-[520px] w-[520px]"
      />

      <div
        className="grid gap-2"
        // `promo` is an extra track in the SAME grid, not a second grid next
        // to it — same reasoning as the growth-column split above: two
        // sibling grids let the promo card's width drift independently of
        // the link columns as columns are added or regrouped.
        style={{ gridTemplateColumns: `repeat(${ordered.length + (promo ? 1 : 0)}, minmax(0, 1fr))` }}
      >
        {ordered.map((column, index) => (
          <div
            key={column.label}
            style={{ "--i": index }}
            className={cn(
              "mega-panel-col",
              index === firstGrowthIndex && firstGrowthIndex > 0 && "border-l border-ink-700 pl-3"
            )}
          >
            <PanelColumn column={column} onNavigate={onNavigate} />
          </div>
        ))}
        {promo && (
          <div style={{ "--i": ordered.length }} className="mega-panel-col pl-3">
            <PanelPromo promo={promo} onNavigate={onNavigate} />
          </div>
        )}
      </div>

      {/* Utility rail (DESIGN.md §10.2). Also the only route to the hub page,
          since the nav trigger is a button rather than a link — see nav.js. */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-700 pt-6">
        <p className="text-body-sm text-ink-300">
          Not sure what you need?{" "}
          <Link
            to="/contact"
            onClick={onNavigate}
            className="rounded-sm font-medium text-ember-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            Tell us your situation
          </Link>{" "}
          and we&rsquo;ll point you to the right service.
        </p>
        {/* ⛔ 03-09-2026 (Clinton: "in dropdown remove vie[w] all d[s]c
            services button"). The hub link is now OPTIONAL, and the DSC panel
            omits it — its "Digital Signature Certificate" item already goes to
            /dsc, so the rail link was the same destination twice in one panel.
            ⚠️ Services still passes it, and still NEEDS it: that trigger is a
            <button> for disclosure semantics, so this rail is the only route to
            /services from the navbar (DESIGN.md §10.2). Do not remove it there
            without giving that hub another way in. */}
        {hubPath && hubLabel && (
          <Link
            to={hubPath}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-canvas underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            {hubLabel}
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        )}
      </div>
    </div>
  );
}
