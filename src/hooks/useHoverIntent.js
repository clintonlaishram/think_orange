import { useCallback, useEffect, useRef, useState } from "react";

// DESIGN.md §9.3 / §10.2. Hover-intent is JS-controlled, never CSS `:hover`
// alone — that's what lets touch and keyboard get click semantics instead of
// a panel that can never be dismissed on a tablet.
//
// Two delays, doing different jobs:
//   OPEN_DELAY  — 120ms, so the panel doesn't flash during casual mouse travel
//                 across the nav bar (spec'd in DESIGN.md §9.3).
//   CLOSE_DELAY — 180ms grace period, so moving the pointer from the trigger
//                 down into the panel doesn't dismiss it mid-journey. Not in
//                 the spec but required: without it the panel is unusable,
//                 because trigger and panel are separate elements.
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;

export function useHoverIntent() {
  const [openKey, setOpenKey] = useState(null);
  const timer = useRef(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  /** Pointer entered a trigger or its panel — open after the intent delay. */
  const hoverOpen = useCallback(
    (key) => {
      clear();
      timer.current = setTimeout(() => setOpenKey(key), OPEN_DELAY);
    },
    [clear]
  );

  /** Pointer left the trigger+panel group — close after the grace period. */
  const hoverClose = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpenKey(null), CLOSE_DELAY);
  }, [clear]);

  /** Click / Enter / Space — no delay, and it toggles. */
  const toggle = useCallback(
    (key) => {
      clear();
      setOpenKey((current) => (current === key ? null : key));
    },
    [clear]
  );

  const close = useCallback(() => {
    clear();
    setOpenKey(null);
  }, [clear]);

  useEffect(() => clear, [clear]);

  return { openKey, hoverOpen, hoverClose, toggle, close };
}
