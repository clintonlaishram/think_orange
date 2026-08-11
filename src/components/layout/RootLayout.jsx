import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/navbar/Header";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

// Wraps all 49 routes. The header is fixed and transparent over the hero, so
// every page template must open with a dark surface — all of them do
// (T1 hero is Deep; T2/T3/T4/T5 open with the ink-950 compact hero per
// CONTENT-PLAN.md §7-9). If a future template ever opens on a light surface,
// the header needs a solid variant for that route, not a hack here.
export function RootLayout() {
  const { pathname } = useLocation();

  // Reset scroll on navigation. React Router does not do this for you, and
  // without it a deep service page opens halfway down.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      {/* No top padding here on purpose — the header is transparent over the
          page's opening section, so that section must be full-bleed to y=0 and
          clear the header itself via `.page-top`. Padding <main> instead would
          expose the body background behind the transparent header. */}
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
