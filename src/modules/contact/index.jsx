import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { ArcRings } from "@/components/ui/ArcRings";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/nav";
import { ContactForm } from "@/modules/contact/ContactForm";

// T7 — CONTENT-PLAN.md §11.
//
// --- 21-08-2026: one continuous LIGHT page (Clinton) -----------------------
// Supersedes the whole-page DARK treatment of 20-08-2026. Brief: "hero and
// section are separate and have different bg colour — make it look like one
// continuous page, change it to light, make it premium, and do NOT keep the
// form inside a card, blend it to the page."
//
// Three structural consequences, none of them cosmetic:
//
// 1. ⛔ THE PAGE OPENS LIGHT, WHICH BREAKS HALF OF CLAUDE.md's LAYOUT
//    CONTRACT ON PURPOSE. That contract requires every page's opening section
//    to be dark because the header is FIXED and transparent over it and
//    renders canvas-coloured text. Its own stated remedy is "the header needs
//    a per-route solid variant — not a local hack", and that variant already
//    exists: nav.js marks /contact `lightTop` and Header.jsx renders the
//    solid/glass state it already owns from scroll position 0. This is the
//    same mechanism the T10 article template uses. Nothing is hacked here and
//    no other route is affected.
//
// 2. ONE <section> CARRIES THE WHOLE PAGE. The old shape was PageHero (deep)
//    + Section (dark) — two surfaces, and therefore a visible seam at the
//    fold, which is exactly what the brief called out. Splitting the header
//    into its own `light` section would not fix it: two `light` sections back
//    to back read as one surface anyway AND register as a consecutive repeat
//    in the surface-cadence audit, which counts `section[data-surface]`.
//    `page-top` supplies the fixed header's clearance; the bottom padding
//    matches `.section-pad`'s own clamp so the page still ends like every
//    other one. Cadence for the route is now simply `light → deep(footer)`.
//    It is deliberately NOT `PageHero`: that primitive is the shared compact
//    DARK hero for T2/T3/T4/T5, and giving it a light mode would put a second
//    surface family inside a component ~40 routes depend on.
//
// 3. THE FORM HAS NO CARD. Every field is `tone="bare"` (`.field-bare` in
//    theme.css) — transparent, one hairline along the bottom, no horizontal
//    padding, so the input text sits on the same left margin as the copy
//    around it. A bordered white input on a canvas page is a card; five of
//    them is five cards. Structure comes from hairlines and whitespace
//    instead, which is the same move the rest of the site already makes on
//    light surfaces (WhyThinkOrange, the FAQ rail, the T5 tables).
//
// The details column carries only what CONTENT-PLAN.md §1 confirms — phone,
// WhatsApp, email, and the registered address (founder-confirmed 20-08-2026).
// Office hours are still on §1.1's hold list and are simply absent, not
// stubbed. No testimonial: inventing a quote is the first item on CLAUDE.md's
// non-negotiables.
//
// ⚠️ EXACTLY ONE EYEBROW ON THE PAGE, in the header. The previous version had
// three ("Get in touch", "Send a message", "Reach us directly") — a mono
// uppercase label above every block is the single most templated rhythm a
// page can have, and on a page that is now one continuous surface it also
// implied section breaks that no longer exist. The two body headings stand on
// their own.
const CHANNELS = [
  {
    icon: Phone,
    label: "Call",
    value: site.phoneDisplay,
    href: site.phoneHref,
    note: "Straight through to the team",
    numeric: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us",
    href: site.whatsappHref,
    note: "Usually the fastest way to reach us",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: site.emailHref,
    note: "For documents and longer questions",
  },
];

// A channel is a link, so it gets a real press state as well as a hover one.
// `:active` is not hover-gated on purpose — Tailwind wraps every `hover:`
// variant in `@media (hover: hover)`, so without this a touch user gets no
// feedback at all from a tap. Same reasoning as `.card-dark:is(a, button)`
// and the light DSC cards.
function ChannelCard({ channel }) {
  const Icon = channel.icon;

  return (
    <a
      href={channel.href}
      {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group/ch flex h-full flex-col gap-4 py-7 transition-transform duration-[var(--dur-instant)] ease-[var(--ease-out)] active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
    >
      {/* Filled ember disc, not a ringed one — the light half of the pairing
          established on the DSC group cards. A ring plus a tint on a light
          surface is two treatments doing one job. */}
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ember-50 text-ember-600 transition-colors duration-[var(--dur-fast)] group-hover/ch:bg-ember-100">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
      </span>

      <span className="block">
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">
          {channel.label}
        </span>
        {/* The arrow sits INLINE after the value, not pinned to the cell's far
            edge. These cells are ~430px wide at desktop against two or three
            words of content, so a right-aligned glyph strands itself a third of
            a screen from the thing it belongs to and reads as a stray mark. */}
        <span
          className={`mt-2 flex flex-wrap items-center gap-2 break-words text-h4 text-ink-600 transition-colors duration-[var(--dur-fast)] group-hover/ch:text-ember-600 ${
            channel.numeric ? "tabular-nums" : ""
          }`}
        >
          {channel.value}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-ink-300 transition-[color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover/ch:-translate-y-0.5 group-hover/ch:translate-x-0.5 group-hover/ch:text-ember-600"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
        {/* ink-400 on canvas is 7.2:1; ink-300 measures ~3.4:1 there and is
            not a body-text colour on a light surface in this codebase. */}
        <span className="mt-1.5 block text-body-sm text-ink-400">{channel.note}</span>
      </span>
    </a>
  );
}

export default function Contact({ path }) {
  const address = site.registeredAddress;

  return (
    <section
      data-surface="light"
      className="page-top surface-ambient-light relative isolate bg-canvas pb-[clamp(72px,9vw,144px)] text-ink-500"
    >
      {/* One quiet ring pair, bled off the top-right into the header's real
          negative space. INK, not the component's default ember: on canvas an
          ember ring at section weight is invisible, and the page's colour
          budget is better spent on the three channel discs and the CTA.
          Unique gradientId — `url(#id)` resolves document-wide, not per-<svg>.
          `.arc-rings` supplies its own absolute/inset/overflow/z-index and
          clips itself, so the section's overflow stays visible; the Container
          carries `relative` so content paints above it. */}
      <ArcRings
        gradientId="contact-arc-fade"
        color="var(--color-ink-300)"
        rings={[
          { r: 150, width: 12, opacity: 0.2 },
          { r: 112, width: 9, opacity: 0.13 },
        ]}
        svgClassName="-right-40 -top-40 h-[380px] w-[380px] md:-right-44 md:-top-52 md:h-[620px] md:w-[620px]"
      />

      <Container className="relative">
        {/* --- Header. `margin="0px"` on every line: Reveal's default -12%
            bottom root-shrink exists to stop a below-the-fold section firing
            on a sliver, and above-the-fold content is the documented dead zone
            where it leaves things stuck at opacity 0 until a scroll. --- */}
        <Reveal margin="0px" delay={0}>
          {/* tone="light" is load-bearing — the default dark palette puts
              ink-200/ink-300 on canvas, far under the 4.5:1 floor. */}
          <Breadcrumbs path={path} tone="light" className="mb-8" />
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal margin="0px" delay={0.06}>
              <Eyebrow>Get in touch</Eyebrow>
            </Reveal>
            {/* `fade={false}` — the H1 rises but never starts transparent. It
                is the largest text above the fold and a real LCP candidate, so
                gating its paint behind hydration would be a measurable
                regression. Same call as PageHero's own h1. */}
            <Reveal margin="0px" delay={0.12} fade={false}>
              <h1 className="mt-3 max-w-[16ch] text-h1">We&rsquo;re here to help</h1>
            </Reveal>
          </div>

          <Reveal margin="0px" delay={0.2} className="lg:col-span-5">
            <p className="max-w-[46ch] text-body-lg text-ink-500">
              Most enquiries in this line of work move fastest over WhatsApp — but phone, email
              and the form below all reach the same team.
            </p>
          </Reveal>
        </div>

        {/* --- Channels. A full-width hairline row rather than a rail: these
            are the page's primary actions, and burying them beside the form
            put the two fastest routes to a human below the fold. Vertical
            hairlines at md, horizontal below — `divide-*` rather than borders
            on each item, so the outer edges stay clean. --- */}
        <Reveal delay={0.28} margin="0px" className="mt-14 md:mt-16">
          <ul className="grid grid-cols-1 divide-y divide-ink-100 border-y border-ink-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            {CHANNELS.map((channel) => (
              // ⚠️ The gutter lives on the <li>, NOT on the <a> inside it. A
              // first-of-row exception has to be expressed as `first:pl-0`, and
              // the anchor is the ONLY child of its own <li> — so `:first-child`
              // matched every one of them and silently zeroed the left padding
              // across the whole row.
              <li key={channel.label} className="md:px-10 md:first:pl-0 md:last:pr-0">
                <ChannelCard channel={channel} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* --- Form + office. The form is 7 columns and carries no container
            of any kind; the office block is 5 and sticks, because on a long
            form the address and the map are what a visitor scrolls back up
            for. --- */}
        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[20ch] text-h2">Tell us what you need</h2>
              <p className="mt-4 max-w-[54ch] text-body text-ink-500">
                Five fields, nothing more. Pick the service closest to what you need — we will
                point you the right way if it turns out to be another one.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <ContactForm tone="bare" />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            {/* `lg:top-32` = header + a little air, the same offset the T2
                enquiry card uses. The column stretches to the row height (no
                `self-start`), which is what gives a sticky child anything to
                travel through — the bug found on the T2 card on 19-08-2026. */}
            <div className="lg:sticky lg:top-32">
              <Reveal delay={0.12}>
                <h2 className="text-h3">Where we are</h2>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-6 flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ember-50 text-ember-600">
                    <MapPin className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">
                      Registered office
                    </span>
                    {/* A real <address> element; `not-italic` because the UA
                        default italicises it. */}
                    <address className="mt-2 text-body not-italic text-ink-600">
                      {address.line1}
                      <br />
                      {address.line2}
                      <br />
                      {address.locality}, {address.region}
                      <br />
                      <span className="tabular-nums">{address.postalCodeDisplay}</span>
                    </address>
                  </div>
                </div>
              </Reveal>

              {/* Click-to-load is unchanged and required: CONTENT-PLAN.md
                  §10/§11 both rule out loading a Google iframe (and its
                  cookies) on page view. */}
              <Reveal delay={0.24} className="mt-8">
                <MapEmbed className="aspect-[4/3] w-full" />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
