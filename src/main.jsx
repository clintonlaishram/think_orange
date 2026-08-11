import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/router";
import "@/styles/theme.css";

// Phase 2 wraps this route list in a root layout route (Header/Outlet/Footer).
// Kept flat here since Phase 0 is infrastructure only.
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
