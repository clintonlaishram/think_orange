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
//
// ⚠️ OPEN_DELAY IS SKIPPED WHEN A PANEL IS ALREADY OPEN — 20-08-2026. The delay
// exists to stop a panel flashing open during casual travel across the bar;
// once a panel is open the user is demonstrably in the menu, so the delay only
// adds lag to a switch. Standard mega-menu behaviour, and it matters here
// because the switch transition (Header.jsx) intentionally holds the outgoing
// panel opaque for 140ms — paying 120ms of intent delay on top of that made the
// switch feel sluggish.
//
// State is one object, not two: `key` plus the `from` it came from, so a
// consumer can tell a SWITCH (both non-null and different) from a plain open or
// close and transition accordingly. `seq` increments on every open and is used
// as the panel's z-index, which guarantees the incoming panel paints above the
// outgoing one however many times they alternate — the property the switch
// transition depends on. See Header.jsx's PANEL_VARIANTS.
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;

const INITIAL = { key: null, from: null, seq: 0 };

// Every transition goes through here so `from` and `seq` can never drift from
// `key`. `next` is the key being opened, or null to close.
function transition(state, next) {
  if (state.key === next) return state;
  return {
    key: next,
    from: state.key,
    seq: next ? state.seq + 1 : state.seq,
  };
}

export function useHoverIntent() {
  const [state, setState] = useState(INITIAL);
  const timer = useRef(null);
  // The open handler needs to know whether anything is open WITHOUT taking
  // `state` as a dependency — otherwise hoverOpen is a new function on every
  // transition and the nav's pointer handlers churn with it.
  //
  // Synced in an EFFECT, not assigned during render: writing to a ref while
  // rendering is impure and `react-hooks/refs` rejects it (the same rule that
  // caught `useMountedAt` in Phase 8). An effect is correct here anyway — it
  // commits long before any pointer can reach a trigger.
  const isOpen = useRef(false);
  useEffect(() => {
    isOpen.current = state.key !== null;
  }, [state.key]);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  /**
   * Pointer entered a trigger or its panel. Opens after the intent delay from
   * a closed menu, and IMMEDIATELY when switching between open panels.
   */
  const hoverOpen = useCallback(
    (key) => {
      clear();
      if (isOpen.current) {
        setState((current) => transition(current, key));
        return;
      }
      timer.current = setTimeout(
        () => setState((current) => transition(current, key)),
        OPEN_DELAY,
      );
    },
    [clear],
  );

  /** Pointer left the trigger+panel group — close after the grace period. */
  const hoverClose = useCallback(() => {
    clear();
    timer.current = setTimeout(
      () => setState((current) => transition(current, null)),
      CLOSE_DELAY,
    );
  }, [clear]);

  /** Click / Enter / Space — no delay, and it toggles. */
  const toggle = useCallback(
    (key) => {
      clear();
      setState((current) => transition(current, current.key === key ? null : key));
    },
    [clear],
  );

  const close = useCallback(() => {
    clear();
    setState((current) => transition(current, null));
  }, [clear]);

  useEffect(() => clear, [clear]);

  return {
    openKey: state.key,
    // True only while moving directly from one open panel to the other.
    switching: Boolean(state.from && state.key && state.from !== state.key),
    seq: state.seq,
    hoverOpen,
    hoverClose,
    toggle,
    close,
  };
}
