// Homepage section 11 — CONTENT-PLAN.md §6 row 11: "Omit from v1. You have
// no collected testimonials, and inventing them is both dishonest and easy
// to spot. Ship without it; add when you have two real ones with names and
// consent." BUILD-PLAN.md Phase 5: pre-wired, not shipped.
//
// ⛔⛔ DUMMY PREVIEW DATA BELOW — DO NOT SHIP ⛔⛔
//
// Fictional entries, expanded to 8 on Clinton's explicit request (per this
// chat) so the carousel has enough items to actually feel like a rotation.
// Still fictional, still `confirmed: false`, still tracked here per
// CLAUDE.md's non-negotiables — a visible, load-bearing exception each time
// it's asked for, not a standing precedent. `photo` uses ui-avatars.com
// initials avatars (no real person's likeness).
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
    text: "I was nervous about finding someone for my daughter's board exams, but the tutor matching was quick and the sessions actually fit our evenings. Grades went up within a month.",
    name: "Ananya R.",
    role: "Parent, Class 10 student",
    photo: "https://ui-avatars.com/api/?name=Ananya+R&background=2A6F5E&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-2",
    text: "Rescheduling used to be a headache with our old tutor. Here I can move a session in two taps and the tutor gets notified instantly. Small thing, but it removed all the friction.",
    name: "Rohit Malhotra",
    role: "Parent, Class 8 student",
    photo: "https://ui-avatars.com/api/?name=Rohit+Malhotra&background=B85C2E&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-3",
    text: "As a tutor, the payout tracking alone was worth switching for. I always know what's pending and what's cleared, and parents can see my availability without me texting back and forth.",
    name: "Priya Sen",
    role: "Mathematics tutor",
    photo: "https://ui-avatars.com/api/?name=Priya+Sen&background=3C5A99&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-4",
    text: "We tried three different tutoring apps before this one. It's the only one where the demo class actually got scheduled without five follow-up calls.",
    name: "Kavita Nair",
    role: "Parent, Class 6 student",
    photo: "https://ui-avatars.com/api/?name=Kavita+Nair&background=7A4E9E&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-5",
    text: "I teach across four different families now and the calendar sync means I've stopped double-booking myself. That alone paid for the time I spent setting up my profile.",
    name: "Arjun Verma",
    role: "Physics tutor",
    photo: "https://ui-avatars.com/api/?name=Arjun+Verma&background=1F6F78&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-6",
    text: "My son is preparing for JEE and needed someone who could handle late-night doubt sessions. Found a tutor within two days and the fee breakdown was clear from the start.",
    name: "Sandeep Kulkarni",
    role: "Parent, JEE aspirant",
    photo: "https://ui-avatars.com/api/?name=Sandeep+Kulkarni&background=A84A4A&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-7",
    text: "The verification step made me trust the platform enough to actually let a new tutor into our home. Small detail, but it mattered more than I expected.",
    name: "Meera Iyer",
    role: "Parent, Class 4 student",
    photo: "https://ui-avatars.com/api/?name=Meera+Iyer&background=2E7D5B&color=fff&size=128",
    confirmed: false,
  },
  {
    id: "dummy-8",
    text: "Switched from spreadsheets to this for tracking my students and invoices. Took a week to get used to, now I can't imagine going back.",
    name: "Farhan Sheikh",
    role: "Chemistry tutor",
    photo: "https://ui-avatars.com/api/?name=Farhan+Sheikh&background=6B5B3E&color=fff&size=128",
    confirmed: false,
  },
];

/** Entries still awaiting a real, consented quote — surfaced by content:check. */
export function unconfirmedTestimonials() {
  return testimonials.filter((quote) => !quote.confirmed);
}