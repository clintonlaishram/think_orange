import { useState } from "react";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ArcRings } from "@/components/ui/ArcRings";
import { site } from "@/content/nav";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

// T2's sticky enquiry card (CONTENT-PLAN.md §7 row 3) - 4 fields max: name,
// phone, email, message. It does NOT fake a submission with no backend behind
// it; it composes the same WhatsApp deep link the Footer, CtaBand and
// FloatingWhatsApp already use. CONTENT-PLAN.md §11: "in this sector most
// enquiries arrive by WhatsApp, not by form." Once Contact's EmailJS form is
// the target, this can be pointed at it with no change to the surrounding
// template.
//
// 22-08-2026 premium pass. The form STAYS IN A CARD (Clinton's explicit
// instruction for the services pages), deliberately unlike /contact's
// borderless `.field-bare` treatment: there the form IS the page, so a card
// outline is a box around the whole content; here it is one column beside a
// prose column, and the card is what marks it as a distinct, actionable
// object rather than more page furniture.
//
// What changed, and why each of these rather than more ornament:
//   - `.card-premium`'s directional wash, so the card has a light direction
//     instead of reading as a flat white rectangle on cream.
//   - `interactive={false}` is kept: the card is not pressable, so it must
//     not carry Card's hover lift or corner-arc draw. Those would signal a
//     click target that does not exist and would fight the focus states of
//     the real controls inside it.
//   - One quiet `ArcRings` pair bled off the top-right, at PANEL weight. The
//     shared crescent (lib/arc.js) is the site's one repeated shape, so this
//     is the established motif rather than a new decoration.
//   - A hairline-separated footer carrying the phone fallback, because the
//     card's single button commits the reader to WhatsApp and some will want
//     to call instead.
export function EnquiryCard({ serviceLabel, className, ringsId = "enquiry-card-rings" }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const lines = [
      `Hi ThinkOrange, I'd like help with ${serviceLabel}.`,
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.message,
    ].filter(Boolean);
    // ⛔ THIS CALL IS NOT OPTIONAL COVERAGE. Every other WhatsApp CTA on the
    // site is an <a href>, so RootLayout's delegated listener records it; this
    // one hands the URL to `window.open`, which fires no click on any anchor.
    // Without an explicit event, the one enquiry surface that sits on all 31
    // service leaves would be the only conversion path GA4 never sees.
    trackEvent("lead_submitted", {
      form_name: "service_enquiry_card",
      service: serviceLabel,
      channel: "whatsapp",
    });
    const url = `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      surface="light"
      interactive={false}
      className={cn("card-premium isolate overflow-hidden", className)}
    >
      {/* `isolate` + `overflow-hidden` on the card, not on the rings: the
          rings are absolutely positioned and bleed past the corner radius,
          and without the clip they square the card off. Same pairing
          `.panel-dark` and the CategoryHub inset already need. */}
      {/* `z-[-1]`, NOT `.arc-rings`' own `z-index: 0`. A positioned z-0 overlay
          paints at step 6 of the painting order and in-flow text paints at
          step 5, i.e. it sits ON TOP of the form. At -1, inside the card's
          `isolate`, it paints above the card background and below everything
          else with nothing for each content block to remember.

          Weights are HIGHER than any section ladder (0.10 / 0.065 vs
          CtaBand's 0.12 / 0.045 across a full band) for the same reason
          `.panel-dark`'s are: this is a ~420px surface, and section-level
          opacities read as invisible on it. */}
      <ArcRings
        gradientId={ringsId}
        rings={[
          { r: 150, width: 15, opacity: 0.1 },
          { r: 108, width: 11, opacity: 0.065 },
        ]}
        svgClassName="-right-28 -top-32 h-[420px] w-[420px]"
        className="z-[-1]"
      />

      <div className="flex items-start gap-3.5">
        {/* Filled disc on a light surface, never ringed - the established
            filled-on-light / ringed-on-dark pairing. A ring plus a tint on a
            white card is two treatments doing one job. */}
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember-50 text-ember-600"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="text-h4 text-ink-600">Enquire about {serviceLabel}</h2>
          <p className="mt-1.5 text-body-sm text-ink-500">
            Tell us what you need. This opens as a WhatsApp message to us, ready to send.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Name"
          required
          autoComplete="name"
          placeholder="e.g. Ramesh Kumar"
          value={form.name}
          onChange={update("name")}
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91"
          value={form.phone}
          onChange={update("phone")}
        />
        <Input
          label="Email (optional)"
          type="email"
          autoComplete="email"
          placeholder="you@company.in"
          value={form.email}
          onChange={update("email")}
        />
        <Textarea
          label="What do you need help with? (optional)"
          rows={3}
          value={form.message}
          onChange={update("message")}
        />
        <Button type="submit" variant="primary" className="w-full">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Send on WhatsApp
        </Button>
      </form>

      <div className="mt-6 border-t border-ink-100 pt-5">
        <p className="flex items-start gap-2 text-body-sm text-ink-500">
          <ShieldCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-ember-600"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          Nothing is submitted from this page. Your details go straight into a WhatsApp draft
          you send yourself.
        </p>
        <a
          href={site.phoneHref}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Prefer to call? {site.phoneDisplay}
        </a>
      </div>
    </Card>
  );
}
