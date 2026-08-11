import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/nav";

// T2's sticky enquiry card (CONTENT-PLAN.md §7 row 3) — 4 fields max: name,
// phone, email, message. Contact's real EmailJS-backed form is Phase 8
// (src/modules/contact is still a stub), so this deliberately does NOT fake
// a submission with no backend behind it. Instead it composes the same
// WhatsApp deep link the Footer, CtaBand and FloatingWhatsApp already use —
// CONTENT-PLAN.md §11 itself: "in this sector most enquiries arrive by
// WhatsApp, not by form." That makes this card genuinely functional today,
// not a placeholder waiting on Phase 8. Once Contact's form exists, this can
// be pointed at it instead with no change to the surrounding template.
export function EnquiryCard({ serviceLabel, className }) {
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
    const url = `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card surface="light" interactive={false} className={className}>
      <h2 className="text-h4 text-ink-600">Enquire about {serviceLabel}</h2>
      <p className="mt-1.5 text-body-sm text-ink-500">
        Tell us a little about what you need — this opens as a WhatsApp message to us, ready to send.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <Input
          label="Name"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
        />
        <Input
          label="Email (optional)"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="enquiry-message" className="text-body-sm font-medium text-ink-500">
            What do you need help with? (optional)
          </label>
          <textarea
            id="enquiry-message"
            rows={3}
            value={form.message}
            onChange={update("message")}
            className="rounded-[var(--radius-sm)] border border-ink-100 bg-white px-3.5 py-3 text-body text-ink-600 placeholder:text-ink-300 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:border-ink-400"
          />
        </div>
        <Button type="submit" variant="primary" className="w-full">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Send on WhatsApp
        </Button>
      </form>
    </Card>
  );
}
