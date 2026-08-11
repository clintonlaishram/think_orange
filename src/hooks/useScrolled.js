import { useEffect, useState } from "react";

// DESIGN.md §10.1 — header condenses past 80px. Passive listener, and it
// reads scrollY once on mount so a deep-linked / restored-scroll load doesn't
// render a transparent header over already-scrolled content.
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
