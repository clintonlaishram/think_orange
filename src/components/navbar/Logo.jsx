import { Link } from "react-router-dom";
import { site } from "@/content/nav";
import { cn } from "@/lib/cn";

export function Logo({ className, compact = true }) {
  const isCompact = compact === true || compact === "true";

  return (
    <Link
      to="/"
      className={cn("flex items-center gap-1.5 shrink-0", className)}
      aria-label={`TO ${site.shortName} Consulting Pvt Ltd — home`}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid  place-items-center rounded-[var(--radius-sm)] bg-transparent font-sans text-[15px] font-black tracking-tight text-canvas",
          isCompact ? "h-10 w-12" : "w-20 h-18"
        )}
      >
        <img src="/images/logo-white.png" alt="Logo" className="w-full" />
      </span>
      <span className="leading-none flex flex-col ">
        <span className={cn(
          "font-montserrat font-black tracking-tight text-canvas font-[700]",
          isCompact ? "text-[19px]" : "text-[27px]"
        )}>
          Think<span className="text-ember-400">Orange</span>
        </span>
        {" "}
        <span className={cn(
          "mt-0.5 block uppercase tracking-[0.12em] text-ink-200 font-medium flex items-center gap-1",
          isCompact ? "text-[10px]" : "text-[14px]"
        )}>
          Consulting Pvt Ltd
        </span>
      </span>
    </Link>
  );
}
