// Phase 9 SSR entry point — built separately from the client bundle via
// `vite build --ssr src/entry-server.jsx` (see package.json's `build:ssr`
// script) into a Node-runnable module that scripts/prerender.mjs imports and
// calls once per route. Not shipped to the browser.
//
// Uses react-router's own static-rendering primitives rather than
// `vite-react-ssg` — BUILD-PLAN.md §1 ruled that package out early: it pins
// a react-router-dom@^6 peer range and hard-conflicts with this project's
// locked v7 stack. `createStaticHandler`/`createStaticRouter`/
// `StaticRouterProvider` are react-router v7's own supported path for
// exactly this (confirmed present in the installed 7.18.2 at Phase 9 time —
// re-check vite-react-ssg's peer range before repeating this setup on a
// future v7 upgrade, per BUILD-PLAN.md's original note).
//
// `renderToString` (not the streaming APIs) is deliberate and safe here:
// router-static.jsx's components are all EAGER imports, so nothing in the
// tree ever suspends on a lazy() boundary — there is nothing for a
// synchronous render to get wrong. Every browser-only API in the app
// (window/document/matchMedia/IntersectionObserver/ResizeObserver/WebGL) is
// confined to useEffect bodies, which renderToString never executes, so this
// stays crash-free without needing a jsdom shim.
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { staticRoutes } from "@/router-static";

const handler = createStaticHandler(staticRoutes);

/** Renders one path to a complete HTML string for the app's #root content. */
export async function render(path) {
  const request = new Request(new URL(path, "http://localhost"));
  const context = await handler.query(request);

  // None of the 49 routes has a loader/action that redirects or errors, so
  // this should never actually trigger — guarded rather than assumed, since
  // a silent wrong-content prerender is worse than a loud build failure.
  if (context instanceof Response) {
    throw new Error(`Unexpected Response from router for ${path} (status ${context.status})`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(<StaticRouterProvider router={router} context={context} />);
}
