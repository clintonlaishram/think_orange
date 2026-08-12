import { useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/content/nav";
import { cn } from "@/lib/cn";

// Click-to-load map, per CONTENT-PLAN.md §10 (About) and §11 (Contact) —
// both explicitly ask for this to be lazy behind a placeholder rather than
// loading an iframe (and Google's tracking cookies) on every page view.
// Queries Google's plain embed endpoint by place NAME, not by a street
// address — a precise address is on CONTENT-PLAN.md §1.1's hold list, so
// this deliberately drops a city-level pin rather than inventing coordinates
// or fabricating a street address to search on. No API key needed for this
// endpoint.
export function MapEmbed({ className }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Map showing ${site.location}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(site.location)}&output=embed`}
        className={cn("h-full w-full rounded-[var(--radius-md)] border border-ink-100", className)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-dashed border-ink-200 bg-canvas-alt px-6 py-10 text-center",
        "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:border-ember-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
        className
      )}
    >
      <MapPin className="h-6 w-6 text-ember-500" strokeWidth={1.5} aria-hidden="true" />
      <span className="text-body font-medium text-ink-600">Load map of {site.location}</span>
      <span className="text-body-sm text-ink-400">Loads an embedded Google Map on click</span>
    </button>
  );
}
