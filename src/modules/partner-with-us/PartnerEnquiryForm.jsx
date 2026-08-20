import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { sendEnquiry, emailjsConfigured } from "@/lib/emailjs";
import { honeypotTripped, isRateLimited, recordSubmission, submittedTooFast, useMountedAt } from "@/lib/spamGuard";
import { site } from "@/content/nav";

const PRACTICE_TYPES = [
  { value: "chartered-accountant", label: "Chartered Accountant" },
  { value: "tax-practitioner", label: "Tax Practitioner" },
  { value: "advocate", label: "Advocate" },
  { value: "consultant", label: "Business Consultant / Company Secretary" },
  { value: "it-service-provider", label: "IT Service Provider" },
  { value: "other", label: "Something else" },
];

const MONTHLY_VOLUMES = [
  { value: "1-5", label: "1–5 certificates" },
  { value: "6-15", label: "6–15 certificates" },
  { value: "16-30", label: "16–30 certificates" },
  { value: "30+", label: "30+ certificates" },
  { value: "not-sure", label: "Not sure yet" },
];

const FORM_KEY = "partner-enquiry";

const initialForm = {
  name: "",
  firm: "",
  city: "",
  practiceType: PRACTICE_TYPES[0].value,
  monthlyVolume: MONTHLY_VOLUMES[0].value,
  phone: "",
  website: "", // honeypot — real users never see or fill this field
};

// CONTENT-PLAN.md §10 lists 5 fields (name, firm, city, practice type,
// expected monthly volume) but no way to reach an applicant back — a phone
// number is added here as the minimum viable addition, same class of gap
// CONTENT-PLAN.md itself caught in the draft preview's invented commitments.
// Same EmailJS + honeypot + time-gate + rate-limit hardening as Contact's
// form (CONTENT-PLAN.md §11), reused here since this is a second public form
// on the same spammable key.
// `tone` (21-08-2026) is additive and defaults to "light", so any other call
// site is byte-identical. `tone="bare"` is the borderless treatment the contact
// page established: no box around each field, so the form can sit directly on
// the page instead of inside a card inside a card. Spacing opens up and the
// submit button stops being full-bleed — a full-width bar under a borderless
// form just redraws the card outline the tone exists to remove.
export function PartnerEnquiryForm({ tone = "light" }) {
  const bare = tone === "bare";
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useMountedAt();

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (honeypotTripped(form.website)) {
      // Silently "succeed" — never tell a bot which check it tripped.
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

    setSubmitting(true);
    try {
      await sendEnquiry({
        form_type: "DSC partner enquiry",
        name: form.name,
        firm: form.firm,
        city: form.city,
        practice_type: PRACTICE_TYPES.find((p) => p.value === form.practiceType)?.label,
        monthly_volume: MONTHLY_VOLUMES.find((v) => v.value === form.monthlyVolume)?.label,
        phone: form.phone,
      });
      recordSubmission(FORM_KEY);
      setForm(initialForm);
      toast.success("Application sent", {
        description: "We'll be in touch to confirm the next steps.",
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
      <Input tone={tone} label="Full name" required autoComplete="name" value={form.name} onChange={update("name")} />
      <Input tone={tone} label="Firm / company name" required autoComplete="organization" value={form.firm} onChange={update("firm")} />
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", bare ? "gap-7" : "gap-4")}>
        <Input tone={tone} label="City" required autoComplete="address-level2" value={form.city} onChange={update("city")} />
        <Input
          tone={tone}
          label="Phone / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
        />
      </div>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", bare ? "gap-7" : "gap-4")}>
        <Select tone={tone} label="Practice type" options={PRACTICE_TYPES} value={form.practiceType} onChange={update("practiceType")} />
        <Select
          tone={tone}
          label="Expected monthly DSC volume"
          options={MONTHLY_VOLUMES}
          value={form.monthlyVolume}
          onChange={update("monthlyVolume")}
        />
      </div>

      {/* Honeypot: hidden from sighted and AT users, present for scripted
          bots that fill every field they find. tabIndex -1 keeps it out of
          the tab order on top of the visual hiding. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="partner-website">Website</label>
        <input
          id="partner-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className={cn(bare ? "w-full sm:w-auto" : "w-full")}
        disabled={submitting}
      >
        <Send className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        {submitting ? "Sending…" : "Apply to partner with us"}
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
