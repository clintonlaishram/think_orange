// PRIVACY POLICY (T8, /privacy-policy) — CONTENT-PLAN.md §12.
//
// ⛔ Content must come from the client's CA or lawyer, never from this build.
// A DPDP Act 2023-compliant privacy policy needs to accurately describe real
// data flows (this site's EmailJS-backed forms, any analytics installed,
// retention practice) — getting that wrong on a compliance firm's own site is
// a liability, not a placeholder-copy problem. `sections: null` renders the
// honest "being finalised" state (LegalPage.jsx) rather than shipping
// AI-drafted legal text nobody has reviewed.
//
// Whoever writes the real version needs to know it must disclose: enquiry
// data (name/phone/email/message) transits EmailJS, a third-party service,
// on submission from the Contact and Partner-With-Us forms.
export const privacyPolicy = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  // Honest to the current `sections: null` state — update once real content
  // (from the client's CA or lawyer) replaces the pending placeholder.
  metaDescription: "ThinkOrange Consulting's privacy policy. This policy is being finalised.",
  lastUpdated: null,
  sections: null,
};
