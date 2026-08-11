// Homepage section 12 — CONTENT-PLAN.md §6 row 12: "Omit from v1. An empty
// or thin blog is worse than no blog. Reserve the route and add at 4+
// articles." BUILD-PLAN.md Phase 5: pre-wired, not shipped.
//
// `Insights` renders nothing below 4 articles specifically — not just >0 —
// so a lone first post can't go live as a visibly thin, one-item "editorial"
// section either.
//
// ⛔⛔ FOUR DUMMY ENTRIES BELOW — DO NOT SHIP ⛔⛔
//
// Added on Clinton's explicit request (11-08-2026) to preview the Insights
// section's layout. `confirmed: false` on every entry, same pattern as
// home-hero.js's two unconfirmed stats and testimonials.js's placeholder quote.
//
// ⚠️ WORSE than the usual placeholder risk: `Insights.jsx` links each card to
// `/insights/${slug}` (and the JSON-LD, if this ever gets any, would too), and
// THAT ROUTE DOES NOT EXIST — not in nav.js, not in the router. No blog module
// has been built yet. Turning this on makes every card a real 404, not just a
// dummy label. Confirmed and left in on explicit instruction anyway, for a
// visual-only preview — do not deploy this state.
//
// Before launch, do ONE of:
//   1. Build the actual insights/blog route + pages, replace these four with
//      real published articles, and set `confirmed: true` on each, or
//   2. Delete all four — `Insights()` renders nothing below
//      MIN_ARTICLES_TO_SHOW, exactly as it did before this was added.
// `npm run content:check` prints a loud warning while any of these survive.
export const insights = [
  {
    slug: "placeholder-one",
    title: "PLACEHOLDER — not a real article",
    excerpt: "Dummy excerpt standing in only so the Insights grid's layout and card treatment can be judged. Links from this card 404 — no /insights route exists yet.",
    confirmed: false,
  },
  {
    slug: "placeholder-two",
    title: "PLACEHOLDER — not a real article",
    excerpt: "Dummy excerpt standing in only so the Insights grid's layout and card treatment can be judged. Links from this card 404 — no /insights route exists yet.",
    confirmed: false,
  },
  {
    slug: "placeholder-three",
    title: "PLACEHOLDER — not a real article",
    excerpt: "Dummy excerpt standing in only so the Insights grid's layout and card treatment can be judged. Links from this card 404 — no /insights route exists yet.",
    confirmed: false,
  },
  {
    slug: "placeholder-four",
    title: "PLACEHOLDER — not a real article",
    excerpt: "Dummy excerpt standing in only so the Insights grid's layout and card treatment can be judged. Links from this card 404 — no /insights route exists yet.",
    confirmed: false,
  },
];
export const MIN_ARTICLES_TO_SHOW = 4;

/** Entries still awaiting a real route + real content — surfaced by content:check. */
export function unconfirmedInsights() {
  return insights.filter((article) => !article.confirmed);
}
