import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/router";
import "@/styles/theme.css";

const router = createBrowserRouter(routes);
const container = document.getElementById("root");

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// HYDRATE when the container already has prerendered markup — which is every
// real production route, since scripts/prerender.mjs writes all 48 of them plus
// 404.html. `createRoot` is the fallback for `npm run dev` and for any
// un-prerendered container, where #root is genuinely empty.
//
// Phase 10 found this had regressed to an unconditional `createRoot`, most
// likely the same `git stash` collateral that reverted router.jsx's
// code-splitting. The consequence was invisible in every check Phase 9 ran —
// the page looked right, the HTML was still correct, hydration warnings never
// appeared because createRoot doesn't compare against existing markup — but
// React was discarding the entire prerendered tree and rebuilding it from
// scratch on the client. Measured cost: ~500ms of LCP `elementRenderDelay`,
// i.e. the prerender was paying its full build-time and byte cost while
// delivering no paint benefit at all.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
