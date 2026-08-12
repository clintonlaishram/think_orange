// Did this document arrive as prerendered HTML, or as an empty shell?
//
// Captured at MODULE-EVALUATION time, which is the whole point: this module is
// imported (transitively, via the router) before `hydrateRoot`/`createRoot` runs,
// so `#root` still holds the server's markup when the check happens. Reading it
// later — inside a component or an effect — always reports a populated root,
// because by then React has rendered into it either way.
//
// Two callers rely on this distinction:
//   - main.jsx picks `hydrateRoot` over `createRoot`.
//   - RootLayout skips its first <head> sync, since prerender.mjs already baked
//     the correct tags in and re-resolving them would pull the entire content
//     graph onto the critical path of a cold load for no visible change.
export const wasPrerendered =
  typeof document !== "undefined" &&
  (document.getElementById("root")?.childElementCount ?? 0) > 0;
