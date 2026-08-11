import { useEffect } from "react";

// DESIGN.md §8.3 — the cursor bloom. One requestAnimationFrame loop, one
// lerped transform, desktop pointers only, idle when the hero is off-screen.
//
// The 0.045 lag coefficient is deliberate and must not be raised: §8.3 —
// "fast cursor-following feels like a toy; slow feels like weight".
//
// Two guards beyond the raw spec:
//   · (min-width: 768px) mirrors theme.css, which sets `display:none` on
//     .arcfield__bloom below md. Without this the loop would transform an
//     invisible element on every frame on mobile.
//   · cancelAnimationFrame before (re)starting, so an IntersectionObserver
//     callback that fires twice in the intersecting state can't leave two
//     loops running against the same element.
//
// Like §8.3's original, the media queries are read once at mount: a mid-session
// change (OS reduced-motion toggle, DevTools device emulation) needs a reload.
export function useBloom(heroRef) {
  useEffect(() => {
    const hero = heroRef.current;
    const el = hero?.querySelector("[data-bloom]");
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.4;
    let cx = tx;
    let cy = ty;
    let raf = 0;
    let active = true;

    const onMove = (event) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.045; // heavy lag = calm, not twitchy
      cy += (ty - cy) * 0.045;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (active) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (active) raf = requestAnimationFrame(tick);
      },
      { threshold: 0 }
    );

    io.observe(hero);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [heroRef]);
}
