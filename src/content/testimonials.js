// Homepage section 11 — CONTENT-PLAN.md §6 row 11: "Omit from v1. You have
// no collected testimonials, and inventing them is both dishonest and easy
// to spot. Ship without it; add when you have two real ones with names and
// consent." BUILD-PLAN.md Phase 5: pre-wired, not shipped.
//
// ⛔⛔ DUMMY PREVIEW DATA BELOW — DO NOT SHIP ⛔⛔
//
// Fictional entries, kept at 8 on Clinton's explicit request so the carousel has
// enough items to feel like a rotation. Still fictional, still `confirmed: false`,
// still tracked here per CLAUDE.md's non-negotiables — a visible, load-bearing
// exception each time it's asked for, not a standing precedent.
//
// ⚠️ THESE ARE NOW MORE DANGEROUS THAN THE VERSION THEY REPLACED, AND THAT IS
// WORTH SAYING PLAINLY. Until 12-08-2026 the quotes here described a TUTORING
// platform — "board exams", "JEE aspirant", "Mathematics tutor" — copy from an
// unrelated project. That made them unmistakably placeholder to anyone who read
// them. Rewritten for compliance work on request (12-08-2026), they now read as
// genuine, which is exactly the state CONTENT-PLAN.md §6 calls "dishonest and
// easy to spot" if it ships. `confirmed: false` and content:check's warning are
// the only things standing between this file and a false claim on a compliance
// firm's homepage. Do not remove either.
//
// Written under the same constraints as every other content file, which is why
// none of these quotes mentions a fee, a rupee amount, a day count, a turnaround
// or a statutory threshold: CLAUDE.md's non-negotiables forbid inventing those
// anywhere, and a quotation mark around a claim does not make it sourced. A
// "registered in two days" testimonial would be an invented turnaround guarantee
// wearing a client's voice.
//
// Avatars are NOT stored here. `Testimonial.jsx` derives initials from `name` and
// renders them on an ink surface. The previous `photo` field hotlinked
// ui-avatars.com, which made it the only third-party origin on the site besides
// wa.me and cost the homepage measurable Performance and Total Blocking Time
// (Phase 10: 80 -> 85 and 652ms -> 486ms once removed).
//
// Before launch, do ONE of:
//   1. Replace each entry with a real, consented testimonial and set
//      `confirmed: true`, or
//   2. Delete the entries outright — `Testimonial()` renders nothing on an
//      empty array, exactly as it did before this was added.
// `npm run content:check` prints a loud warning while any entry survives
// with `confirmed: false`.
export const testimonials = [
  {
    id: "dummy-1",
    text: "The registration paperwork was handled end to end, and every document they asked for came with a reason attached. I never had to guess what was still pending on my side.",
    name: "Ananya Raghavan",
    role: "Proprietor, textile trading",
    confirmed: false,
  },
  {
    id: "dummy-2",
    text: "Filing used to be a scramble at my end every month. Now the reconciliation is already done by the time I sit down to look at it, and I only get asked for what is genuinely missing.",
    name: "Rohit Malhotra",
    role: "Owner, auto components",
    confirmed: false,
  },
  {
    id: "dummy-3",
    text: "We received a notice and had no idea how to respond to it. The reply was drafted with our own records behind it, and someone walked me through what it actually meant in plain language.",
    name: "Priya Sen",
    role: "Director, engineering services",
    confirmed: false,
  },
  {
    id: "dummy-4",
    text: "Ordered a signing token for our tender filings and it arrived ready to use. The driver instructions matched what I was actually seeing on screen, which has not been my experience elsewhere.",
    name: "Kavita Nair",
    role: "Partner, civil contracting",
    confirmed: false,
  },
  {
    id: "dummy-5",
    text: "Incorporating the company was my first time dealing with any of this. They explained what each form was for instead of just sending it over and asking me to sign.",
    name: "Arjun Verma",
    role: "Founder, consumer brand",
    confirmed: false,
  },
  {
    id: "dummy-6",
    text: "Our books were badly behind. They took the mess exactly as it was, without making me feel foolish about it, and we close the month properly now.",
    name: "Sandeep Kulkarni",
    role: "Managing partner, logistics",
    confirmed: false,
  },
  {
    id: "dummy-7",
    text: "The portal registration and the document set for our first tender were sorted together. Knowing in advance which certificates a buyer would actually ask for took the guesswork out of it.",
    name: "Meera Iyer",
    role: "Proprietor, office supplies",
    confirmed: false,
  },
  {
    id: "dummy-8",
    text: "I route signature and registration work here for my own clients. The status updates arrive without me having to chase anyone for them, which is the part I was really buying.",
    name: "Farhan Sheikh",
    role: "Practising accountant",
    confirmed: false,
  },
];

/** Entries still awaiting a real, consented quote — surfaced by content:check. */
export function unconfirmedTestimonials() {
  return testimonials.filter((quote) => !quote.confirmed);
}
