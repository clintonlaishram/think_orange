// import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
// import { Container } from "@/components/layout/Container";
// import { Section } from "@/components/layout/Section";
// import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { ComingSoon } from "@/components/ui/ComingSoon";
// import { Card } from "@/components/ui/Card";
// import { MapEmbed } from "@/components/ui/MapEmbed";
// import { Reveal } from "@/components/motion/Reveal";
// import { site } from "@/content/nav";
// import { ContactForm } from "@/modules/contact/ContactForm";

// T7 — CONTENT-PLAN.md §11. 6/6 split: contact details + click-to-load map
// on the left, the 5-field enquiry form on the right. Office hours and the
// full street address are both on §1.1's hold list — the left column shows
// only what §1 confirms (phone, WhatsApp, email, city/state), never a
// placeholder for the missing two.
//
// ⚠️ 13-08-2026: client preview request (Clinton) — hero only, then
// <ComingSoon /> instead of the rest of the body (including the real
// contact details/map/form). ComingSoon's own phone + WhatsApp buttons are
// the only way to reach us while this is live. Everything below is
// commented out in place, not deleted — see ServiceLeaf.jsx's matching note.
export default function Contact({ path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Get in touch"
        h1="Talk to us about what you need"
        lede="Most enquiries in this line of work move fastest over WhatsApp — but phone, email and the form below all reach the same team."
      />

      <ComingSoon />

      {/*
      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Reach us directly</Eyebrow>
              <h2 className="mt-3 text-h2 max-w-[24ch]">However's easiest for you</h2>

              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-3.5 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-5 py-4 transition-colors hover:border-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-ember-500" strokeWidth={1.5} aria-hidden="true" />
                    <span>
                      <span className="block text-body-sm text-ink-400">Call us</span>
                      <span className="block text-body font-medium tabular-nums text-ink-600">{site.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3.5 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-5 py-4 transition-colors hover:border-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0 text-ember-500" strokeWidth={1.5} aria-hidden="true" />
                    <span>
                      <span className="block text-body-sm text-ink-400">WhatsApp us</span>
                      <span className="block text-body font-medium text-ink-600">Usually the fastest way to reach us</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.emailHref}
                    className="flex items-center gap-3.5 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-5 py-4 transition-colors hover:border-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-ember-500" strokeWidth={1.5} aria-hidden="true" />
                    <span>
                      <span className="block text-body-sm text-ink-400">Email us</span>
                      <span className="block break-all text-body font-medium text-ink-600">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3.5 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-5 py-4">
                  <MapPin className="h-5 w-5 shrink-0 text-ember-500" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <span className="block text-body-sm text-ink-400">Office</span>
                    <span className="block text-body font-medium text-ink-600">{site.location}</span>
                  </span>
                </li>
              </ul>

              <Reveal className="mt-6">
                <MapEmbed className="aspect-[4/3] w-full" />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Card surface="light-alt" interactive={false}>
                <h2 className="text-h4 text-ink-600">Send us a message</h2>
                <p className="mt-1.5 text-body-sm text-ink-500">
                  Tell us what you need and we'll get back to you.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
      */}
    </>
  );
}
