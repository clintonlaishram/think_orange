import { useEffect, useState } from "react";

/**
 * Returns false on the first render and true once the page has gone idle.
 *
 * For deferring a subtree that is genuinely not needed for first paint. Two
 * distinct reasons this is a state flag rather than `<Suspense>` around a
 * `lazy()` import, and both matter here:
 *
 *  1. It keeps the deferred work off the main thread during hydration. React
 *     hydration and, say, compiling a WebGL shader compete for one thread, and
 *     whichever one holds it delays the other.
 *  2. It renders NOTHING during SSR without leaving an unresolved Suspense
 *     boundary behind. `renderToString` cannot resolve a `lazy()` import, so it
 *     emits the boundary's fallback and marks it incomplete; hydration then
 *     reports React error #419 ("the server could not finish this Suspense
 *     boundary") and client-renders that subtree. A boolean that starts false
 *     is simply absent on the server and consistent on the client's first
 *     render, so there is no boundary to leave unfinished.
 *
 * Only use this where a late arrival is invisible — decorative layers, or UI
 * that cannot be reached until the user interacts.
 */
export function useIdleMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));

    const start = () => {
      idle(
        () => {
          if (!cancelled) setReady(true);
        },
        // Without a timeout, a page that never goes idle never mounts it at all.
        { timeout: 2000 },
      );
    };

    // On a prerendered route `load` has usually already fired by the time this
    // runs, so waiting for the event alone would wait forever.
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  return ready;
}
