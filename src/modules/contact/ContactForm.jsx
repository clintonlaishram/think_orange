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
import { cn } from "@/lib/cn";

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
// service required, message) — "no more". Placeholders are EXAMPLES only —
// every field keeps its real <label> (DESIGN.md §12.4: never rely on a
// placeholder as the label, it disappears the moment the user types).
// The service select is built from
// `serviceSelectOptions()` (nav.js), the one source of truth every other
// service-picking surface on the site already uses, so this can never list a
// service that doesn't exist or drift from the real route table.
export function ContactForm({ tone = "light" }) {
  // `tone` is threaded straight through to the three field primitives rather
  // than branching the markup — the form's structure is identical on every
  // surface; only the field treatment and two bits of ancillary copy change.
  //
  // `bare` (21-08-2026, /contact) needs two spacing changes and nothing else.
  // With the field boxes gone, whitespace is the only thing separating one
  // field from the next, so the rhythm has to open up — 16px between
  // boxed fields reads as 16px between LINES OF TEXT once the boxes are
  // removed. And the submit button stops being full-width: a full-bleed bar
  // under a borderless form re-draws the card outline the tone exists to
  // remove.
  const dark = tone === "dark";
  const bare = tone === "bare";
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
    <form onSubmit={handleSubmit} className={cn(bare ? "space-y-7" : "space-y-4")}>
      <Input tone={tone} label="Name" placeholder="e.g. Ramesh Kumar" required autoComplete="name" value={form.name} onChange={update("name")} />
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", bare ? "gap-7 sm:gap-8" : "gap-4")}>
        <Input
          tone={tone}
          label="Phone / WhatsApp"
          placeholder="e.g. +91 98765 43210"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
        />
        <Input tone={tone} label="Email" placeholder="e.g. you@company.in" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
      </div>
      <Select
        tone={tone}
        label="Service required"
        placeholder="Select a service"
        groups={serviceGroups}
        required
        value={form.service}
        onChange={update("service")}
      />
      <Textarea tone={tone} label="Message" placeholder="Let us know how we can help" required rows={4} value={form.message} onChange={update("message")} />

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

      <div className={cn(bare && "pt-1")}>
        <Button
          type="submit"
          variant="primary"
          className={cn(bare ? "w-full sm:w-auto" : "w-full")}
          disabled={submitting}
        >
          <Send className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
      {/* ink-300 on dark, never ink-400 — Phase 10 measured ink-400 as body
          text on ink at 2.86:1, under the 4.5:1 floor, and fixed it sitewide. */}
      <p className={cn("text-body-sm", bare && "max-w-[54ch]", dark ? "text-ink-300" : "text-ink-400")}>
        By submitting, you agree your details are sent to us via a third-party email service. See our{" "}
        <a
          href="/privacy-policy"
          className={cn(
            "underline underline-offset-2",
            dark ? "hover:text-ember-200" : "hover:text-ember-600"
          )}
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
