import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronRight, Menu, Phone, X } from "lucide-react";
import {
  serviceCategories,
  dscPanelColumns,
  standalonePages,
  site,
} from "@/content/nav";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

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
  {
    key: "dsc",
    label: "DSC",
    hubPath: "/dsc",
    hubLabel: "View all DSC services",
    groups: dscPanelColumns.map((column) => ({
      label: column.label,
      items: column.items,
    })),
  },
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
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid h-12 w-12 place-items-center rounded-full text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
      >
        <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      {/* Backdrop + panel are portaled to document.body, NOT rendered inline
          here — see the block comment below the portal call for why.
          `canPortal` guards `document.body` from Node's SSR pass. */}
      {canPortal && createPortal(
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => closeMenu()}
            className={cn(
              "fixed inset-0 z-50 bg-ink-950/60 transition-opacity duration-[var(--dur-base)]",
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
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-ink-950 outline-none",
              "transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)]",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex h-[84px] shrink-0 items-center justify-between border-b border-ink-800 px-6">
              <span className="font-mono text-eyebrow uppercase text-ink-300">Menu</span>
              <button
                type="button"
                onClick={() => closeMenu({ restoreFocus: true })}
                className="grid h-12 w-12 place-items-center rounded-full text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
              <Row to="/" label="Home" />

              {SECTIONS.map((section) => {
                const isExpanded = expanded === section.key;
                return (
                  <div key={section.key} className="border-b border-ink-800">
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
                                      className="flex min-h-12 items-center text-body-sm text-ink-300 transition-colors hover:text-canvas focus-visible:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {standalonePages.map((page) => (
                <Row key={page.path} to={page.path} label={page.label} />
              ))}
            </nav>

            {/* Sticky footer — phone + primary CTA (DESIGN.md §10.4) */}
            <div className="shrink-0 space-y-3 border-t border-ink-800 px-6 py-5">
              <a
                href={site.phoneHref}
                className="flex min-h-12 items-center gap-2.5 text-body font-medium text-canvas hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
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

function Row({ to, label }) {
  return (
    <Link
      to={to}
      className="flex min-h-12 items-center border-b border-ink-800 py-3 text-body font-medium text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
    >
      {label}
    </Link>
  );
}
