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
export function Breadcrumbs({ path, className }) {
  const trail = breadcrumbsFor(path);
  if (trail.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-body-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-x-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink-200">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.path}
                    className="rounded-sm text-ink-300 transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-ink-400"
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
