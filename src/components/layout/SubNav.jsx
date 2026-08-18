import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

// Sticky on-page sub-nav with scroll-spy — CONTENT-PLAN.md §7 row 2.
//
// 19-08-2026: extracted out of ServiceLeaf.jsx (where it was a private
// function) so the DSC tree can use it too, at Clinton's request. T2 service
// leaves, T4 DSC products and the T5 driver / comparison pages now share this
// one implementation.
//
// `top-16` (64px) is Header.jsx's CONDENSED height. This bar only becomes
// sticky after the compact page hero has scrolled past, by which point the page
// is already >80px scrolled and the header has condensed — so the two edges
// always meet exactly, with no gap and no overlap.
//
// ⚠️ If this ever stops sticking, the bug is almost certainly NOT here. Check
// every ancestor for a non-`visible` overflow on EITHER axis first: `<main>`
// carried `overflow-x-hidden` until 19-08-2026, which per spec forces
// `overflow-y: auto`, makes main a scroll container, and silently disables
// every sticky inside it. See the RootLayout.jsx comment.
//
// `sections`: [{ id, label }] — each id must be on a real `<Section id>` on the
// page, or the anchor scrolls nowhere and the observer never fires for it. Feed
// it only sections that actually render: a DSC product with no validity options
// must not advertise a "Validity" tab.
export function SubNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstVisible = entries.find((entry) => entry.isIntersecting);
        if (firstVisible) setActiveId(firstVisible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  // One entry is not a navigation aid, it is a decoration — a page whose
  // optional sections did not render should get no bar at all.
  if (sections.length < 2) return null;

  return (
    <div data-surface="light" className="sticky top-16 z-30 border-b border-ink-100 bg-canvas">
      <Container>
        <nav aria-label="On this page" className="flex gap-1 overflow-x-auto py-3">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
                activeId === id ? "bg-ember-50 text-ember-700" : "text-ink-500 hover:text-ink-700"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
