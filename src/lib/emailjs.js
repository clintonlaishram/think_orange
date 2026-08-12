import emailjs from "@emailjs/browser";

// CONTENT-PLAN.md §11 / BUILD-PLAN.md Phase 8: EmailJS, no backend. The three
// IDs are public by design (they ship in the client bundle either way) — see
// .env.example for where to get them and the hardening this file's callers
// (spamGuard.js) add around a key that's inherently spammable.
//
// MANUAL SETUP STILL NEEDED (cannot be done from code): create the service +
// template in the EmailJS dashboard, put the three IDs in a real `.env` (never
// commit it — `.env.example` documents the shape), and set the account's own
// per-key rate limit in the dashboard (CONTENT-PLAN.md §11's "EmailJS's own
// per-key limits configured" is a dashboard setting, not something this file
// can configure). Until `.env` exists, `emailjsConfigured` is false and every
// form shows an honest "can't send right now" state instead of pretending to
// succeed or throwing an unhandled error.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Sends `templateParams` through the configured EmailJS service/template.
 * Rejects immediately (never calls the SDK) if not configured, so a missing
 * `.env` fails fast and legibly instead of as a confusing network error.
 */
export function sendEnquiry(templateParams) {
  if (!emailjsConfigured) {
    return Promise.reject(
      new Error("Email sending isn't configured yet — see .env.example (VITE_EMAILJS_*).")
    );
  }
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
    // Client-side belt on top of the dashboard's own per-key limit — refuses
    // to fire a second send from the same browser within 60s regardless of
    // what spamGuard.js's localStorage check decided.
    limitRate: { throttle: 60000 },
  });
}
