import { cn } from "@/lib/cn";

/**
 * The morphing hamburger (Uiverse.io / JulanDeAlb, re-expressed for this
 * codebase). Two paths, no JS animation: the long path is one continuous
 * S-curve whose visible portion is controlled entirely by `stroke-dasharray`
 * / `stroke-dashoffset`, so "hamburger -> X" is a single stroke being redrawn
 * along its own length rather than two icons cross-fading.
 *
 * Deviations from the source snippet, all deliberate:
 *  - CONTROLLED, not a checkbox. The overlay's open/close already lives in
 *    `MobileNav`'s state (Escape, backdrop, navigation all close it), so a
 *    self-owning <input type="checkbox"> would be a second source of truth
 *    that silently desynchronises the moment the menu closes by any route
 *    other than tapping this control. It also has to stay a real <button>
 *    for the existing aria-expanded / aria-controls / focus-restore wiring.
 *  - `stroke: currentColor`, not white — so it inherits the trigger's
 *    text-canvas / hover:text-ember-200 like every other icon here, and no
 *    raw colour enters theme.css (CLAUDE.md).
 *  - --dur-slow (420ms), not the snippet's 600ms, and --ease-inout: this is
 *    a tap-tier control, and 600ms outruns the panel's own --dur-base slide.
 *
 * The dash numbers ARE the animation and are not arbitrary: `12 63` shows
 * only the top bar's worth of the S-curve; `20 300` plus an offset of
 * -32.42 slides the window down that same path onto the diagonal, which the
 * -45deg rotation on the <svg> then lands as the X. Changing the `d` without
 * re-deriving these produces a stroke that ends mid-air.
 */
export function HamburgerIcon({ open, className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      data-open={open ? "true" : "false"}
      className={cn("hamburger-icon h-7 w-7", className)}
    >
      <path
        className="hamburger-icon__line hamburger-icon__line--morph"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path className="hamburger-icon__line" d="M7 16 27 16" />
    </svg>
  );
}
