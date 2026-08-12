import { Link } from "react-router-dom";
import { site } from "@/content/nav";
import { cn } from "@/lib/cn";

// Placeholder lockup. DESIGN.md §18 flags the real logo SVG (mark, wordmark,
// and the arc path that §3.1's motif should be derived from) as a pending
// asset — swap this whole component when it lands, don't patch around it.
// Wordmark hides below `sm` per DESIGN.md §10.1.
export function Logo({ className }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 shrink-0", className)}
      // The accessible name must CONTAIN every word rendered inside this link,
      // or voice-control users can't target what they can see and AT users hear
      // a name that doesn't match the logo. Two non-obvious parts, both
      // measured against the real axe rule rather than reasoned about:
      //
      //   * "TO" is in here even though the mark below is aria-hidden.
      //     label-content-name-mismatch compares against SIGHTED visible text
      //     (axe's `visibleVirtual(node, false)`), not the screen-reader view —
      //     which is the right call for a rule about voice control, and means
      //     aria-hidden does not exempt visible letters from it.
      //   * The word order and spacing have to match the rendered order.
      //     Below `sm` the wordmark is display:none and the visible text is
      //     just "TO", so the mark's letters lead.
      aria-label={`TO ${site.shortName} Consulting Pvt Ltd — home`}
    >
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-ink-600 font-sans text-[15px] font-black tracking-tight text-canvas"
      >
        TO
        <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-ember-400" />
      </span>
      {/* Both of the explicit spaces in this component are load-bearing, not
          formatting. JSX drops the newline between two sibling elements, so
          without them the rendered text nodes concatenate to
          "TOThinkOrangeConsulting Pvt Ltd" — which the aria-label above cannot
          contain, failing axe's label-content-name-mismatch on every route.
          Neither space renders: this one sits between two flex items, where
          whitespace-only text nodes are discarded, and the one below precedes a
          block-level element. */}{" "}
      <span className="hidden leading-none sm:block">
        <span className="font-sans text-[19px] font-black tracking-tight text-canvas">
          Think<span className="text-ember-400">Orange</span>
        </span>
        {" "}
        {/* ink-200, not ink-300: at 9px this is the dimmest text in the header,
            and it sits over a translucent bar whose effective background
            depends on the page scrolled behind it. */}
        <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-ink-200">
          Consulting Pvt Ltd
        </span>
      </span>
    </Link>
  );
}
