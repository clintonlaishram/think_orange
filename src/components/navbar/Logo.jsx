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
      // The accessible name must CONTAIN the visible text, or AT users reading
      // "ThinkOrange Consulting Pvt Ltd" hear a name that doesn't match and
      // voice control can't target it. `${shortName} — home` alone dropped the
      // second line and failed axe's label-content-name-mismatch on all 49
      // routes.
      aria-label={`${site.shortName} Consulting Pvt Ltd — home`}
    >
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-ink-600 font-sans text-[15px] font-black tracking-tight text-canvas"
      >
        TO
        <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-ember-400" />
      </span>
      <span className="hidden leading-none sm:block">
        <span className="font-sans text-[19px] font-black tracking-tight text-canvas">
          Think<span className="text-ember-400">Orange</span>
        </span>
        <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-ink-300">
          Consulting Pvt Ltd
        </span>
      </span>
    </Link>
  );
}
