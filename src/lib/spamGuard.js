import { useEffect, useRef } from "react";

// CONTENT-PLAN.md §11: "A public EmailJS key is spammable and the template ID
// is visible in the bundle" — three lightweight, client-side hardenings for
// the Contact and Partner-With-Us forms. None of this is a security boundary
// (it's all inspectable/bypassable client JS); it raises the cost of casual
// scripted abuse enough to matter for a public key with no backend behind it,
// on top of EmailJS's own per-key limits (configured in the EmailJS
// dashboard, not in code — see the account setup note in `src/lib/emailjs.js`).

const MIN_FILL_TIME_MS = 3000; // a human can't realistically fill 4-5 fields faster than this
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;

/**
 * Records when a form mounted, for the "submitted suspiciously fast" check.
 * `Date.now()` is read inside an effect, not as the `useRef` initial value —
 * reading it during render is an impure render call (React's `react-hooks/
 * purity` rule correctly flags `useRef(Date.now())`), and it would also be
 * wrong under React 19's Strict Mode double-render, which discards the first
 * render's values.
 */
export function useMountedAt() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = Date.now();
  }, []);
  return ref;
}

/** True if submitted implausibly fast for a human to have filled the form in. */
export function submittedTooFast(mountedAtRef) {
  return Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS;
}

/** True if the honeypot field (must always render empty and stay empty) was filled — a bot. */
export function honeypotTripped(value) {
  return Boolean(value);
}

// Wrapped in try/catch: localStorage throws in Safari private browsing and
// some locked-down browser configurations. A guard failing open (never
// blocking a genuine submission because storage isn't available) is the
// right failure mode here — this is a courtesy limit, not a security control.
function readTimestamps(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    const timestamps = raw ? JSON.parse(raw) : [];
    return Array.isArray(timestamps) ? timestamps.filter((t) => Date.now() - t < RATE_LIMIT_WINDOW_MS) : [];
  } catch {
    return [];
  }
}

/** True if `formKey` has already submitted RATE_LIMIT_MAX times in the current window. */
export function isRateLimited(formKey) {
  return readTimestamps(`to_submissions_${formKey}`).length >= RATE_LIMIT_MAX;
}

/** Call after a successful submission so the next check sees it. */
export function recordSubmission(formKey) {
  try {
    const storageKey = `to_submissions_${formKey}`;
    const timestamps = readTimestamps(storageKey);
    timestamps.push(Date.now());
    localStorage.setItem(storageKey, JSON.stringify(timestamps));
  } catch {
    // Storage unavailable — nothing to persist, nothing to crash over.
  }
}
