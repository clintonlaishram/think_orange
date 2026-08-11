import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import {
  primaryNav,
  serviceCategories,
  dscPanelColumns,
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
          scrolled || openKey
            ? "h-16 border-b border-ink-800 bg-ink-950/[0.72] backdrop-blur-[16px] backdrop-saturate-150"
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
                <div
                  key={item.panel}
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

        {/* Panels live outside the flex row so they can span the full container
            width. Rendered (not unmounted) only when open, so focus order stays
            predictable and there is nothing tabbable while closed. */}
        {openKey && (
          <div
            // Gutters track Container's (px-6 / md:px-10 / lg:px-18). The
            // panel only renders at lg, so lg:px-18 is the one that actually
            // applies — without it the panel sits 32px wider per side than the
            // page content it drops out of.
            className="absolute inset-x-0 top-full hidden px-6 pt-2 md:px-10 lg:block lg:px-18"
            onPointerEnter={() => hoverOpen(openKey)}
            onPointerLeave={hoverClose}
          >
            <div className="mx-auto max-w-[1800px]">
              <MegaPanel
                id={`panel-${openKey}`}
                ariaLabel={PANELS[openKey].ariaLabel}
                columns={PANELS[openKey].columns}
                hubPath={primaryNav.find((i) => i.panel === openKey).hubPath}
                hubLabel={primaryNav.find((i) => i.panel === openKey).hubLabel}
                onNavigate={close}
              />
            </div>
          </div>
        )}
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
