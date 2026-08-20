import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { breadcrumbsFor } from "@/content/nav";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

// Derived entirely from nav.js — templates pass only their path.
// Emits matching BreadcrumbList JSON-LD off the SAME `trail` array the
// visible <ol> renders (CONTENT-PLAN.md §14.2), so the two can never drift —
// same "select by reference" discipline as the homepage FAQ row.
//
// ⚠️ `tone` (20-08-2026) is NOT cosmetic. Every colour below used to be a plain
// dark-surface utility (ink-200 / ink-300 / ember-200, ring-offset-ink-950),
// which is correct for the ~60 dark heroes this renders in and unreadable on a
// light one — ink-200 on canvas is nowhere near the 4.5:1 floor. The article
// template (T10) opens light, so it passes `tone="light"`.
//
// This is the same trap already recorded twice in CLAUDE.md (GroupHeading's
// hardcoded light colours on the dark eSign band; PartnerProgramme's heading):
// the surface system covers headings and `var(--surface-*)` accents, NOT
// arbitrary utilities. Any component dropped onto both surface families needs
// this check. Default stays "dark", so every existing call site is unchanged.
const TONES = {
  dark: {
    current: "text-ink-200",
    link: "text-ink-300 hover:text-ember-200 focus-visible:ring-offset-ink-950",
    chevron: "text-ink-400",
  },
  light: {
    current: "text-ink-600",
    link: "text-ink-400 hover:text-ember-600 focus-visible:ring-offset-canvas",
    chevron: "text-ink-300",
  },
};

export function Breadcrumbs({ path, className, tone = "dark" }) {
  const trail = breadcrumbsFor(path);
  if (trail.length < 2) return null;

  const colours = TONES[tone] ?? TONES.dark;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-body-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-x-1.5">
              {isLast ? (
                <span aria-current="page" className={colours.current}>
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.path}
                    className={cn(
                      "rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
                      colours.link
                    )}
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight
                    aria-hidden="true"
                    className={cn("h-3.5 w-3.5 shrink-0", colours.chevron)}
                    strokeWidth={2}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbListJsonLd(trail)} />
    </nav>
  );
}
