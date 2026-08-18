import { Fragment, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import {
  primaryNav,
  serviceCategories,
  dscPanelColumns,
  dscPartnerPromo,
  site,
} from "@/content/nav";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/navbar/Logo";
import { MegaPanel } from "@/components/navbar/MegaPanel";
import { MobileNav } from "@/components/navbar/MobileNav";
import { useHoverIntent } from "@/hooks/useHoverIntent";
import { useScrolled } from "@/hooks/useScrolled";

// Panel column data, shaped for MegaPanel. Derived from nav.js — never
// hardcode labels or paths here.
const PANELS = {
  services: {
    ariaLabel: "Services",
    columns: serviceCategories.map((category) => ({
      label: category.label,
      subline: category.subline,
      path: category.path,
      group: category.group,
      items: category.children,
    })),
  },
  dsc: {
    ariaLabel: "Digital Signature Certificates",
    columns: dscPanelColumns.map((column) => ({
      label: column.label,
      items: column.items,
      note: column.note,
    })),
    // The DSC panel's fourth "column" — a promo card, not a link list. See
    // dscPartnerPromo's own comment in nav.js.
    promo: dscPartnerPromo,
  },
};

export function Header() {
  const scrolled = useScrolled(80);
  const location = useLocation();
  const { openKey, hoverOpen, hoverClose, toggle, close } = useHoverIntent();
  const triggerRefs = useRef({});
  const navRef = useRef(null);

  // Close the panel on navigation — otherwise it hangs open over the new page.
  useEffect(close, [location.pathname, close]);

  // Escape closes and returns focus to the trigger (DESIGN.md §10.2).
  useEffect(() => {
    if (!openKey) return;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      const trigger = triggerRefs.current[openKey];
      close();
      trigger?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openKey, close]);

  // Pointer-down outside the nav closes it. Using pointerdown rather than
  // click so it fires before focus moves anywhere unexpected.
  useEffect(() => {
    if (!openKey) return;
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openKey, close]);

  // Tabbing out of the whole nav group closes the panel, so a keyboard user
  // isn't dragging an invisible open panel down the page with them.
  const handleFocusOut = (event) => {
    if (!openKey) return;
    if (!navRef.current?.contains(event.relatedTarget)) close();
  };

  return (
    <>
      {/* Skip link — DESIGN.md §14. First focusable element on every page. */}
      <a
        href="#main"
        className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[60] focus:bg-ember-400 focus:px-5 focus:py-2.5 focus:text-body-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[height,background-color,backdrop-filter,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)]",
          // Glassmorphism appears here and NOWHERE else on the site
          // (DESIGN.md §7.5 — one permitted use).
          // 0.88, not §7.5's 0.72. Phase 10 sampled the real pixels behind
          // this bar and found the fill is only as dark as whatever is scrolled
          // under it: on a light-surfaced page (/contact past the fold) the
          // effective background measured #4b4e58, dropping the logo sub-label
          // to 2.36:1 and the ember wordmark to 2.63:1. Canvas-coloured nav
          // links stayed fine at 7.5:1 — it is only the dim elements that
          // break, and only in the scrolled state, which is why nothing caught
          // it before: the transparent state always sits over a dark hero.
          // 0.88 keeps the blur and the glass read while making the fill dark
          // enough that page content can no longer lift it out of range.
          scrolled || openKey
            ? "h-16 border-b border-ink-800 bg-ink-950/[0.88] backdrop-blur-[16px] backdrop-saturate-150"
            : "h-[84px] border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1800px] items-center gap-6 px-6 md:px-10 lg:px-18">
          <Logo />

          <nav
            ref={navRef}
            aria-label="Primary"
            className="ml-auto hidden items-center gap-1 lg:flex"
            onBlur={handleFocusOut}
          >
            {primaryNav.map((item) =>
              item.panel ? (
                <Fragment key={item.panel}>
                <div
                  className="relative"
                  onPointerEnter={() => hoverOpen(item.panel)}
                  onPointerLeave={hoverClose}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      triggerRefs.current[item.panel] = node;
                    }}
                    aria-expanded={openKey === item.panel}
                    aria-controls={`panel-${item.panel}`}
                    aria-haspopup="true"
                    onClick={() => toggle(item.panel)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-body-sm font-medium transition-colors duration-[var(--dur-fast)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
                      openKey === item.panel
                        ? "text-ember-200"
                        : "text-canvas hover:text-ember-200",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-[var(--dur-fast)]",
                        openKey === item.panel && "rotate-180",
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* The panel is rendered INSIDE <nav>, immediately after its own
                    trigger. Both of those matter, and Phase 10 found out why the
                    hard way when it was a sibling of <nav> instead:

                    1. `navRef` guards the pointerdown-outside handler. With the
                       panel outside it, pressing the mouse on any panel link
                       counted as "outside", called close(), and unmounted the
                       link before the click could land — every link in the mega
                       menu was silently unclickable.
                    2. `handleFocusOut` closes when focus leaves <nav>. Tabbing
                       toward the panel therefore closed it first, so its ~30
                       links were unreachable by keyboard entirely.

                    Sitting here, tab order is trigger -> panel contents -> next
                    nav item with no focus management at all, and both handlers
                    correctly treat the panel as inside the nav. It still
                    positions against <header> (the nearest positioned ancestor —
                    <nav> is static), so the full-bleed geometry is unchanged. */}
                {openKey === item.panel && (
                  <div
                    // Gutters track Container's (px-6 / md:px-10 / lg:px-18). The
                    // panel only renders at lg, so lg:px-18 is the one that
                    // actually applies — without it the panel sits 32px wider per
                    // side than the page content it drops out of.
                    className="absolute inset-x-0 top-full hidden px-6 pt-2 md:px-10 lg:block lg:px-18"
                    onPointerEnter={() => hoverOpen(item.panel)}
                    onPointerLeave={hoverClose}
                  >
                    <div className="mx-auto max-w-[1800px]">
                      <MegaPanel
                        id={`panel-${item.panel}`}
                        ariaLabel={PANELS[item.panel].ariaLabel}
                        columns={PANELS[item.panel].columns}
                        promo={PANELS[item.panel].promo}
                        hubPath={item.hubPath}
                        hubLabel={item.hubLabel}
                        onNavigate={close}
                      />
                    </div>
                  </div>
                )}
                </Fragment>
              ) : (
                <NavLinkItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                />
              ),
            )}

            <a
              href={site.phoneHref}
              className="ml-2 hidden xl:flex items-center gap-2 rounded-full px-3 py-2 text-body-sm font-medium text-canvas transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <Phone
                className="h-4 w-4 text-ember-400"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="tabular-nums">{site.phoneDisplay}</span>
            </a>

            <Button
              as={Link}
              to="/contact"
              variant="primary"
              className="ml-1 min-h-0 px-5 py-2.5"
            >
              Talk to an Expert
            </Button>
          </nav>

          <MobileNav className="ml-auto lg:hidden" />
        </div>
      </header>
    </>
  );
}

function NavLinkItem({ to, label }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-body-sm font-medium transition-colors duration-[var(--dur-fast)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
        active ? "text-ember-200" : "text-canvas hover:text-ember-200",
      )}
    >
      {label}
    </Link>
  );
}
