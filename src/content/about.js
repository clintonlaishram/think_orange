// ABOUT PAGE CONTENT (T6, /about) — CONTENT-PLAN.md §10. Company description
// and mission are the profile PDF's verbatim text (§1); the three pillars
// below expand the logo lockup's strapline (also §1) — one short paragraph
// each, no numbers, no claims outside what §1 confirms. "How we work" is
// CONTENT-PLAN.md §10's own three points, close to verbatim, not invented
// here. Founding year, team, credentials, client counts and photographs are
// all on §1.1's hold list — deliberately absent, not merely unlinked.

export const aboutContent = {
  meta: {
    title: "About ThinkOrange Consulting | Salem, Tamil Nadu",
    description:
      "ThinkOrange Consulting Private Limited — a Salem-based professional services firm handling GST, income tax, business setup, accounting, audit and tenders.",
  },
  description:
    "ThinkOrange Consulting Private Limited is a dynamic professional services provider offering comprehensive financial, taxation, and compliance solutions. We combine technical expertise with innovative thinking to help our clients navigate the complexities of modern business operations.",
  mission:
    "Our mission is simple yet powerful: to be the trusted partner that helps every business owner and entrepreneur solve their problems, achieve compliance, and unlock growth opportunities.",
  pillars: [
    {
      title: "Empowering Businesses",
      body: "Compliance and paperwork shouldn't be what stands between you and running your business. We handle the filings, the deadlines and the documentation so you can spend your time on the work only you can do.",
    },
    {
      title: "Ensuring Compliance",
      body: "GST, income tax, ROC and sector-specific rules change often, and the cost of missing one is rarely small. We track what applies to your business specifically, not a generic checklist, and flag what's coming before it's due.",
    },
    {
      title: "Driving Growth",
      body: "Registrations, loans, tenders and audits exist to unlock the next stage of a business, not just to satisfy a regulator. We treat each engagement as part of that bigger move, not an isolated task to close out.",
    },
  ],
  // Moved out of the About template's JSX (21-08-2026), where these four were
  // an unmarked <ul> inside a card. Same four claims, same wording, split into
  // title + body so the page can set them the way the site actually sets a
  // four-point differentiator block — the oversized mono numerals of
  // DESIGN.md §11.4 / the homepage's WhyThinkOrange. Nothing new is asserted.
  //
  // ⚠️ These deliberately stay SEPARATE from `WhyThinkOrange.jsx`'s own
  // `differentiators`, which say the same four things at greater length for
  // the homepage. Both trace to CONTENT-PLAN.md §1's confirmed facts. If they
  // are ever unified, unify them in a shared content module and have both
  // pages read from it — do not let one page quote the other's private array.
  differentiators: [
    {
      title: "All solutions under one roof",
      body: "GST, tax, entity formation, audit, tenders, finance and DSC.",
    },
    {
      title: "Technology-driven and accurate",
      body: "The same professional tooling on every client file, not loose spreadsheets.",
    },
    {
      title: "Pan-India, digital-first service",
      body: "Most engagements never need an in-person visit.",
    },
    {
      title: "Client-centric, tailored solutions",
      body: "Scoped to what your business actually needs, not a one-size template.",
    },
  ],
  howWeWork: [
    {
      title: "A written scope, before work starts",
      body: "You know exactly what's included, what isn't, and what happens next — before anything is billed or filed.",
    },
    {
      title: "Direct access to who's handling your file",
      body: "Questions go to the person actually doing the work, not a rotating queue of account managers.",
    },
    {
      title: "Plain-English answers",
      body: "Compliance is complicated enough without jargon on top of it. We explain what a notice, a filing or a requirement actually means for you.",
    },
  ],
  whereWeAre:
    "ThinkOrange is based in Salem, Tamil Nadu, and works with clients across India — most engagements run entirely over phone, WhatsApp and email, so location is rarely a constraint on who we can help.",
};
