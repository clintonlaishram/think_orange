import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { sendEnquiry, emailjsConfigured } from "@/lib/emailjs";
import { honeypotTripped, isRateLimited, recordSubmission, submittedTooFast, useMountedAt } from "@/lib/spamGuard";
import { serviceSelectOptions, site } from "@/content/nav";

const FORM_KEY = "contact";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  website: "", // honeypot — real users never see or fill this field
};

// CONTENT-PLAN.md §11: exactly 5 real fields (name, phone/WhatsApp, email,
// service required, message) — "no more". The service select is built from
// `serviceSelectOptions()` (nav.js), the one source of truth every other
// service-picking surface on the site already uses, so this can never list a
// service that doesn't exist or drift from the real route table.
export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useMountedAt();
  const serviceGroups = serviceSelectOptions();

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (honeypotTripped(form.website)) {
      setForm(initialForm);
      return;
    }
    if (submittedTooFast(mountedAt)) {
      toast.error("That was fast!", { description: "Please take a moment and try submitting again." });
      return;
    }
    if (isRateLimited(FORM_KEY)) {
      toast.error("Too many submissions", {
        description: `Please reach us directly on WhatsApp or ${site.phoneDisplay} instead.`,
      });
      return;
    }

    const serviceLabel =
      serviceGroups.flatMap((g) => g.options).find((o) => o.value === form.service)?.label ?? form.service;

    setSubmitting(true);
    try {
      await sendEnquiry({
        form_type: "Contact enquiry",
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: serviceLabel,
        message: form.message,
      });
      recordSubmission(FORM_KEY);
      setForm(initialForm);
      toast.success("Message sent", {
        description: "We've received your enquiry and will get back to you shortly.",
      });
    } catch (error) {
      toast.error("Couldn't send that", {
        description: emailjsConfigured
          ? "Something went wrong — please try again, or reach us on WhatsApp."
          : `Email sending isn't set up yet — please reach us directly on WhatsApp or ${site.phoneDisplay}.`,
      });
      if (import.meta.env.DEV) console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" required autoComplete="name" value={form.name} onChange={update("name")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Phone / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
        />
        <Input label="Email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
      </div>
      <Select
        label="Service required"
        placeholder="Select a service"
        groups={serviceGroups}
        required
        value={form.service}
        onChange={update("service")}
      />
      <Textarea label="Message" required rows={4} value={form.message} onChange={update("message")} />

      {/* Honeypot — hidden from sighted/AT users, present for bots that fill
          every field they find. tabIndex -1 keeps it out of the tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
        <Send className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        {submitting ? "Sending…" : "Send message"}
      </Button>
      <p className="text-body-sm text-ink-400">
        By submitting, you agree your details are sent to us via a third-party email service. See our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-ember-600">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
