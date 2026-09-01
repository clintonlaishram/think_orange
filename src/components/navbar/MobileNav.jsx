import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import {
  serviceCategories,
  standalonePages,
  site,
} from "@/content/nav";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { HamburgerIcon } from "./HamburgerIcon";
import { ArcRings } from "@/components/ui/ArcRings";

// DESIGN.md §10.4. Accordions use grid-template-rows 0fr -> 1fr (§9.3) rather
// than max-height, which is what keeps the open/close from juddering.
//
// Category headings are TAPPABLE ROWS THAT TOGGLE, and each opened section
// carries its own "View all ->" link to the category page. That split is the
// whole point: tapping a heading is never ambiguous between "expand" and
// "navigate" (DESIGN.md §10.4).

const SECTIONS = [
  {
    key: "services",
    label: "Services",
    hubPath: "/services",
    hubLabel: "View all services",
    groups: serviceCategories.map((category) => ({
      label: category.label,
      path: category.path,
      items: category.children,
    })),
  },
  // ⛔ 02-09-2026: the DSC accordion group is GONE (Clinton: "keep dsc and
  // resources as a single tab like home… it will only have /dsc route only").
  // Digital Signatures is now a flat link in the list below, alongside Home
  // and About Us — matching the desktop nav, which drops its DSC panel for the
  // same reason. The two navbars do NOT derive from one array (see the
  // Partner With Us note below), so both had to change.
];

export function MobileNav({ className }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // `document` doesn't exist during Phase 9's SSR prerender pass (Node) —
  // this portal only ever needs to exist client-side, so it's gated behind a
  // plain runtime check rather than called unconditionally at render time.
  // Not state: it can't change within a single environment's lifetime, so
  // there's nothing to synchronize via an effect.
  const canPortal = typeof document !== "undefined";

  // Close on navigation, via React's documented "adjusting state during
  // render" pattern rather than an effect. An effect here would commit an
  // open overlay to the DOM and then immediately close it — a visible flash
  // plus a wasted paint. This re-renders before committing instead.
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpen(false);
    setExpanded(null);
  }

  // Lock body scroll while the overlay is up, and restore it exactly.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Single close path, so every dismissal (Escape, the X, the backdrop) resets
  // the accordion too. Without the setExpanded(null), reopening the menu shows
  // whichever section was expanded last time — the navigation-based close
  // resets it but the others didn't, which read as a glitch.
  const closeMenu = useCallback(({ restoreFocus = false } = {}) => {
    setOpen(false);
    setExpanded(null);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Escape closes and returns focus to the trigger; Tab is trapped inside.
  //
  // The trap is what makes `aria-modal="true"` honest. Phase 10 measured focus
  // escaping the open overlay after 10 tabs onto the page behind it, which is
  // invisible to a sighted keyboard user (the overlay covers it) and leaves an
  // AT user reading content the dialog claims to have suppressed. `inert` only
  // guards the panel while it is CLOSED; it can't guard the rest of the page
  // while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      // tabIndex >= 0 filters out the panel itself and the collapsed
      // accordion rows, which are already held at -1 while their section
      // is shut.
      const focusables = [
        ...panel.querySelectorAll("a[href], button, input, select, textarea, [tabindex]"),
      ].filter((el) => el.tabIndex >= 0 && !el.hasAttribute("disabled"));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // Move focus into the overlay when it opens so keyboard and screen-reader
  // users land inside it rather than continuing through the page behind.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => (open ? closeMenu({ restoreFocus: true }) : setOpen(true))}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid h-12 w-12 place-items-center rounded-full text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
      >
        <HamburgerIcon open={open} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {/* Backdrop + panel are portaled to document.body, NOT rendered inline
          here — see the block comment below the portal call for why.
          `canPortal` guards `document.body` from Node's SSR pass. */}
      {canPortal && createPortal(
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            data-open={open ? "true" : "false"}
            onClick={() => closeMenu()}
            className={cn(
              "mobile-sheet-scrim fixed inset-0 z-50",
              open ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          />

          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            // The panel stays mounted so it can slide in and out, which means
            // its links are in the DOM while it is off-screen. Without
            // `inert` a keyboard user tabs straight off the logo into
            // invisible content — the classic off-canvas trap. `inert`
            // removes the whole subtree from the tab order, the a11y tree
            // and pointer events in one attribute.
            inert={!open}
            data-open={open ? "true" : "false"}
            data-surface="dark"
            className={cn(
              "mobile-sheet grain fixed inset-y-0 right-0 z-50 isolate flex w-full max-w-sm flex-col overflow-hidden outline-none",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* The site's own arc, at panel weight, bled off the top-right so
                the sheet's empty upper corner carries the brand mark rather
                than nothing. `[z-index:-1]` rather than `.arc-rings`' own 0:
                a positioned z-0 layer paints ABOVE in-flow text, which is why
                every other call site has to remember `relative` on its
                content wrapper. At -1, inside this sheet's `isolate`, there
                is nothing to remember. Unique gradientId — `url(#id)`
                resolves document-wide. */}
            <ArcRings
              gradientId="mobile-sheet-arc"
              rings={[
                { r: 140, width: 1, opacity: 0.1 },
                { r: 112, width: 1.5, opacity: 0.055 },
              ]}
              className="[z-index:-1]"
              svgClassName="-right-56 -top-44 h-[400px] w-[400px]"
            />

            <div className="flex h-[84px] shrink-0 items-center justify-between border-b border-ink-800 px-6">
              <span className="font-mono text-eyebrow uppercase text-ink-300">Menu</span>
              <button
                type="button"
                onClick={() => closeMenu({ restoreFocus: true })}
                className="grid h-12 w-12 place-items-center rounded-full text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {/* Same control, already in its open state: tapping it morphs
                    back to the hamburger as the panel slides out, which is the
                    half of the animation the trigger itself can't show (the
                    full-width panel covers it while open). */}
                <HamburgerIcon open={open} />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="relative flex-1 overflow-y-auto overscroll-contain px-6 py-4"
            >
              <Row to="/" label="Home" index={0} />

              {SECTIONS.map((section, i) => {
                const isExpanded = expanded === section.key;
                return (
                  <div
                    key={section.key}
                    style={{ "--i": i + 1 }}
                    className="mobile-sheet-item border-b border-ink-800"
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : section.key)}
                      aria-expanded={isExpanded}
                      className="flex min-h-12 w-full items-center justify-between py-3 text-left text-body font-medium text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                    >
                      {section.label}
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-[var(--dur-base)]",
                          isExpanded && "rotate-90"
                        )}
                        strokeWidth={2}
                      />
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out)]"
                      style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-4">
                          <Link
                            to={section.hubPath}
                            className="mb-2 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                            tabIndex={isExpanded ? undefined : -1}
                          >
                            {section.hubLabel}
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                          </Link>

                          {section.groups.map((group) => (
                            <div key={group.label} className="mt-3">
                              {group.path ? (
                                <Link
                                  to={group.path}
                                  tabIndex={isExpanded ? undefined : -1}
                                  className="block font-mono text-eyebrow uppercase text-ember-400 hover:text-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                                >
                                  {group.label}
                                </Link>
                              ) : (
                                <span className="block font-mono text-eyebrow uppercase text-ink-300">
                                  {group.label}
                                </span>
                              )}
                              <ul className="mt-1 border-l border-ink-800 pl-3">
                                {group.items.map((item) => (
                                  <li key={item.path}>
                                    <Link
                                      to={item.path}
                                      tabIndex={isExpanded ? undefined : -1}
                                      className="flex min-h-12 flex-col justify-center text-body-sm text-ink-300 transition-colors hover:text-canvas focus-visible:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                                    >
                                      {item.label}
                                      {item.note && (
                                        <span className="font-mono text-[11px] leading-relaxed text-ink-400">
                                          {item.note}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {section.promo && (
                            <PromoCard promo={section.promo} isExpanded={isExpanded} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ⛔ 02-09-2026: Digital Signatures is a flat Row now, not an
                  accordion group — one page, one link, exactly like Home. It
                  sits directly after the Services accordion so the nav order
                  still matches the desktop `primaryNav`. */}
              <Row
                to="/dsc"
                label="Digital Signatures"
                index={SECTIONS.length + 1}
              />

              {standalonePages
                .filter((page) => page.slug !== "partner-with-us")
                .map((page, i) => (
                  <Row
                    key={page.path}
                    to={page.path}
                    label={page.label}
                    index={SECTIONS.length + 2 + i}
                  />
                ))}
            </nav>

            {/* Sticky footer — phone + primary CTA (DESIGN.md §10.4). Last in
                the cascade, so the eye lands on the CTA once the list has
                settled rather than competing with it. */}
            <div
              style={{ "--i": SECTIONS.length + 5 }}
              className="mobile-sheet-item relative shrink-0 space-y-3 border-t border-ink-800 px-6 py-5"
            >
              <a
                href={site.phoneHref}
                className="flex pl-2 min-h-12 items-center gap-2.5 text-body font-medium text-canvas hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
              >
                <Phone className="h-4 w-4 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                <span className="tabular-nums">{site.phoneDisplay}</span>
              </a>
              <Button as={Link} to="/contact" variant="primary" className="w-full">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

// Why the portal: `<Header>` adds `backdrop-blur-[16px]` to the `<header>`
// element once the page is scrolled (Header.jsx's `scrolled` state, past
// 80px). A non-`none` `backdrop-filter` establishes a new containing block
// for `position: fixed` descendants — same rule as `transform`/`filter`.
// This backdrop + panel used to render as DOM descendants of `<header>`, so
// the moment the header picked up that blur, their "fixed" positioning
// stopped resolving against the real viewport and instead resolved against
// `<header>`'s own ~64px-tall box — squashing/mispositioning the whole
// overlay. That's exactly why it opened fine from the very top of a page
// (header still transparent, no blur, no hijacked containing block) and
// broke the instant you'd scrolled even a little first. Portaling to
// `document.body` puts the overlay outside `<header>` entirely, so it can
// never be affected by the header's own filter state again.

function Row({ to, label, index = 0 }) {
  return (
    <Link
      to={to}
      style={{ "--i": index }}
      // No `transition-colors` here: `.mobile-sheet-item` owns this element's
      // `transition` shorthand (a later utility would replace it wholesale and
      // kill the cascade), so it carries the colour leg itself.
      className="mobile-sheet-item flex min-h-12 items-center border-b border-ink-800 py-3 text-body font-medium text-canvas hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
    >
      {label}
    </Link>
  );
}

/**
 * Mobile equivalent of MegaPanel.jsx's `PanelPromo` — same `dscPartnerPromo`
 * data (nav.js), same `.panel-dark` surface (the "static content panel"
 * treatment, not `.card-dark` — this box holds two distinct CTAs, not one
 * click target, same reasoning as the desktop version). `tabIndex` on both
 * links follows the same collapsed/expanded gating every other link in this
 * accordion already uses, so a closed section can't be tabbed into.
 */
function PromoCard({ promo, isExpanded }) {
  const whatsappHref = `${site.whatsappHref}?text=${encodeURIComponent(
    `Hi ThinkOrange, I'm a DSC partner and need help with ${promo.secondaryLabel?.toLowerCase()}.`
  )}`;

  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative mt-4 overflow-hidden rounded-[var(--radius-lg)] p-4"
    >
      {/* `text-canvas` — see MegaPanel.jsx's `PanelPromo` for why this isn't
          ember (matches the source mockup, and `.text-ember-300` would lose
          to `[data-surface="dark"] h4`'s canvas rule anyway). */}
      <h4 className="text-h4 text-canvas">{promo.heading}</h4>
      <p className="mt-2 text-body-sm leading-relaxed text-ink-300">{promo.description}</p>
      <div className="relative mt-4 flex flex-col items-start gap-3">
        <Button
          as={Link}
          to={promo.cta.path}
          tabIndex={isExpanded ? undefined : -1}
          variant="primary"
          className="min-h-0 px-4 py-2 text-body-sm"
        >
          {promo.cta.label}
        </Button>
        {promo.secondaryLabel && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            tabIndex={isExpanded ? undefined : -1}
            className="text-body-sm font-medium text-ink-300 underline-offset-4 transition-colors hover:text-ember-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
          >
            {promo.secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}
