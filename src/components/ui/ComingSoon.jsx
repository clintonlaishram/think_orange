import { Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/nav";

// Shared "rest of this page isn't live yet" body, dropped in AFTER a
// template's own PageHero/hero (never instead of it — the hero's
// breadcrumb/H1/lede stay real). Used while most of the site is
// intentionally shown to the client as hero-only, per Clinton's request
// (13-08-2026): every template except T1 (Home) and T6's `/about` renders
// this instead of its normal body sections, which are commented out in
// place rather than deleted so they can be restored by uncommenting.
//
// Same honesty discipline as ServiceLeaf's PendingLeaf / LegalPage's
// PendingLegal (which predate this and are left as they are): no invented
// copy, just a real way to reach a human in the meantime.
export function ComingSoon({
  eyebrow = "Coming soon",
  heading = "This page is being rebuilt",
  message = "We're reworking this page and it isn't live yet. Call, WhatsApp or email us and we'll help you the same way we would through the page.",
}) {
  return (
    <Section surface="light">
      <Container>
        <div className="max-w-[68ch]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2">{heading}</h2>
          <p className="mt-4 text-body-lg text-ink-500">{message}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button as="a" href={site.phoneHref} variant="secondary">
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {site.phoneDisplay}
            </Button>
            <Button as="a" href={site.whatsappHref} target="_blank" rel="noreferrer noopener" variant="secondary">
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
