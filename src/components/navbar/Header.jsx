import { Fragment, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  hasLightTop,
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

const PANEL_EASE = [0.22, 1, 0.36, 1];

// ⛔ WHY THE PANEL USES VARIANTS RATHER THAN INLINE initial/animate/exit.
//
// Reported (20-08-2026, Clinton): on a large screen, moving between Services
// and Digital Signatures made the dropdown BLINK. Measured over CDP — sampling
// both panels' computed opacity every frame through a real pointer move — the
// crossover frame had Services at 0.471 and DSC at 0.380, i.e. combined
// coverage of only 0.672: **a third of the page showed through the menu**, and
// both panels were translating at the same time. Two separate AnimatePresence
// instances each ran their own independent fade, so the outgoing panel emptied
// out before the incoming one had filled in.
//
// The fix has to distinguish a SWITCH from a plain open/close, and the exiting
// element cannot be re-rendered — AnimatePresence animates the LAST element it
// saw, so a `switching` flag read inline from props would be the stale
// pre-switch value. `AnimatePresence`'s `custom` prop exists exactly for this:
// it is re-read at exit time. Hence variants-as-functions, and `custom` passed
// on BOTH the AnimatePresence (for the exiting panel) and the motion.div (for
// the entering one).
//
// The switch transition itself: the incoming panel fades up over 140ms while
// the outgoing one HOLDS AT FULL OPACITY, and only starts fading once the
// incoming has reached opacity 1 and is covering it. Coverage is therefore
// 1 - (1 - a)(1 - 1) = 1 at every frame — the gap is closed by construction,
// not by tuning two durations until it looks acceptable. `seq` as z-index
// guarantees the incoming paints on top however many times the two alternate,
// so the switch always reads as the new panel materialising over the old rather
// than the old one dissolving away first (which looks like lag, since nothing
// happens for 140ms).
//
// Neither panel TRAVELS during a switch: the -6px drop is the gesture of a
// panel coming out of its trigger, and on a switch the surface is already
// there — only its contents change. Under reduced motion no transform is used
// in any state and only opacity moves.
// ⛔ EVERY STATE MUST SPELL OUT translateY AND scale. NEVER "none".
//
// Motion decomposes a transform STRING into its components and interpolates
// each one, and it does not read "none" as "translateY(0) scale(1)" — the scale
// component simply has no value on that side, so animating
// `translateY(-6px) scale(0.995)` → `none` resolved the end state to
// **scale(0)**. Cost real time here: the panel reported `opacity: 1` and a
// computed `width: 1680px`, so every probe said it was open and fully visible,
// while `getBoundingClientRect()` returned 0×0 and the screenshot showed no
// panel at all — `matrix(0, 0, 0, 0, 0, 0)`. Only dumping the INLINE transform
// found it. The pre-existing code sidestepped this by writing
// `translateY(0px) scale(1)` explicitly on the animate leg; the same discipline
// is now applied to all three states so the trap cannot come back.
const REST_TRANSFORM = "translateY(0px) scale(1)";

const PANEL_VARIANTS = {
  hidden: ({ switching, reduceMotion }) => ({
    opacity: 0,
    transform:
      reduceMotion || switching
        ? REST_TRANSFORM
        : "translateY(-6px) scale(0.995)",
  }),
  shown: ({ switching }) => ({
    opacity: 1,
    transform: REST_TRANSFORM,
    transition: { duration: switching ? 0.14 : 0.18, ease: PANEL_EASE },
  }),
  exit: ({ switching, reduceMotion }) => ({
    opacity: 0,
    transform:
      reduceMotion || switching
        ? REST_TRANSFORM
        : "translateY(-4px) scale(0.997)",
    // Part of the exit state, not decoration: the panel stays mounted for the
    // whole exit, and without this the cursor crossing a closing panel calls
    // hoverOpen and reopens it. Given its own zero-duration transition so it
    // applies immediately even when the opacity leg is delayed below.
    pointerEvents: "none",
    transition: switching
      ? {
          // The delay IS the fix — see the block comment above.
          opacity: { duration: 0.13, delay: 0.14, ease: "linear" },
          pointerEvents: { duration: 0 },
        }
      : { duration: 0.12, ease: PANEL_EASE },
  }),
};

export function Header() {
  const scrolled = useScrolled(80);
  const location = useLocation();
  // CLAUDE.md's layout contract: this header is fixed and transparent over each
  // page's opening section, and its text is canvas-coloured, which is why every
  // template opens on a dark surface. The article template (T10) opens LIGHT, so
  // it declares `lightTop` in nav.js and the header renders the solid state it
  // already has for `scrolled` / `openKey` instead. That contract explicitly
  // asks for a per-route variant here rather than a local hack in the template.
  //
  // Derived from the path, with no state and no effect, so the prerendered HTML
  // and the client's first render cannot disagree.
  const lightTop = hasLightTop(location.pathname);
  const { openKey, switching, seq, hoverOpen, hoverClose, toggle, close } =
    useHoverIntent();
  const reduceMotion = useReducedMotion();
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
          scrolled || openKey || lightTop
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
                {/* AnimatePresence so the panel has an EXIT, not just an
                    entrance — an element this large vanishing on a single frame
                    is the thing that read as unfinished. It stays mounted for
                    the exit's 120ms, which is also why `pointerEvents: "none"`
                    is part of the exit state: without it, the cursor crossing
                    a closing panel would call hoverOpen and reopen it.
                    Enter 180ms / exit 120ms, both --ease-out, both from
                    -6px + 0.995 scale with `transform-origin: top` — it drops
                    OUT of its trigger rather than materialising in place, and
                    never from scale(0). Under reduced motion the transform legs
                    are dropped and only opacity moves. */}
                <AnimatePresence custom={{ switching, reduceMotion }}>
                {openKey === item.panel && (
                  <motion.div
                    // Gutters track Container's (px-6 / md:px-10 / lg:px-18). The
                    // panel only renders at lg, so lg:px-18 is the one that
                    // actually applies — without it the panel sits 32px wider per
                    // side than the page content it drops out of.
                    className="absolute inset-x-0 top-full hidden origin-top px-6 pt-2 md:px-10 lg:block lg:px-18"
                    // Monotonic, so the panel opening now always outranks the
                    // one leaving, in either direction and however many times
                    // they alternate. A plain 0/1 pair ties on the second
                    // switch and DOM order decides instead.
                    style={{ zIndex: seq }}
                    custom={{ switching, reduceMotion }}
                    variants={PANEL_VARIANTS}
                    initial="hidden"
                    animate="shown"
                    exit="exit"
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
                  </motion.div>
                )}
                </AnimatePresence>
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
