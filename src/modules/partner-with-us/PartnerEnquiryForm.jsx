import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { practiceTypes } from "@/content/practice-types";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { sendEnquiry, emailjsConfigured } from "@/lib/emailjs";
import { trackEvent } from "@/lib/analytics";
import { honeypotTripped, isRateLimited, recordSubmission, submittedTooFast, useMountedAt } from "@/lib/spamGuard";
import { site } from "@/content/nav";

// ⛔ 03-09-2026: the list MOVED to `content/practice-types.js` because the Buy
// Token order form asks the same question. Aliased rather than renamed at every
// use so this file's diff stays about the move.
const PRACTICE_TYPES = practiceTypes;

// "Do you issue today?" is the question that decides whether this is an
// onboarding conversation or a switching one, and the reference page leads on
// switching for good reason — an existing reseller is the readiest partner.
const CURRENT_ISSUER = [
  { value: "no", label: "No — this would be new" },
  { value: "yes-other-ca", label: "Yes — through another certifying authority" },
  { value: "previously", label: "Previously, not currently" },
];

const MONTHLY_VOLUMES = [
  { value: "1-10", label: "1–10 certificates" },
  { value: "11-25", label: "11–25 certificates" },
  { value: "26-50", label: "26–50 certificates" },
  { value: "51-100", label: "51–100 certificates" },
  { value: "100+", label: "100+ certificates" },
  { value: "not-sure", label: "Not sure yet" },
];

const FORM_KEY = "partner-enquiry";

const initialForm = {
  name: "",
  firm: "",
  city: "",
  practiceType: PRACTICE_TYPES[0].value,
  currentIssuer: CURRENT_ISSUER[0].value,
  monthlyVolume: MONTHLY_VOLUMES[0].value,
  phone: "",
  email: "",
  notes: "",
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
        current_issuer: CURRENT_ISSUER.find((c) => c.value === form.currentIssuer)?.label,
        monthly_volume: MONTHLY_VOLUMES.find((v) => v.value === form.monthlyVolume)?.label,
        phone: form.phone,
        email: form.email,
        notes: form.notes,
      });
      recordSubmission(FORM_KEY);
      trackEvent("lead_submitted", {
        form_name: "partner_application",
        practice_type: form.practiceType,
        monthly_volume: form.monthlyVolume,
      });
      setForm(initialForm);
      toast.success("Application sent", {
        description: "We'll be in touch to confirm the next steps.",
      });
    } catch (error) {
      // Same reasoning as ContactForm's: while EmailJS is unconfigured every
      // real application lands here, so the failure is the only hit there is.
      trackEvent("lead_failed", {
        form_name: "partner_application",
        reason: emailjsConfigured ? "send_error" : "not_configured",
      });
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
        {/* ⚠️ The Aadhaar-linked number and the mail ID are the only two items
            from the registration list that are DATA rather than documents,
            which is why they are the only two collected here. The label says
            "linked with Aadhaar" because verification one-time passwords go to
            whichever number UIDAI holds — giving any other number is the most
            common reason onboarding stalls. */}
        <Input
          tone={tone}
          label="Phone linked with Aadhaar"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
        />
        <Input
          tone={tone}
          label="Mail ID — becomes your login"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
        />
      </div>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", bare ? "gap-7" : "gap-4")}>
        <Input tone={tone} label="City" required autoComplete="address-level2" value={form.city} onChange={update("city")} />
        <Select tone={tone} label="Practice type" options={PRACTICE_TYPES} value={form.practiceType} onChange={update("practiceType")} />
      </div>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", bare ? "gap-7" : "gap-4")}>
        <Select
          tone={tone}
          label="Do you issue DSCs today?"
          options={CURRENT_ISSUER}
          value={form.currentIssuer}
          onChange={update("currentIssuer")}
        />
        <Select
          tone={tone}
          label="Expected monthly DSC volume"
          options={MONTHLY_VOLUMES}
          value={form.monthlyVolume}
          onChange={update("monthlyVolume")}
        />
      </div>
      <Textarea
        tone={tone}
        label="Anything we should know"
        rows={4}
        value={form.notes}
        onChange={update("notes")}
        placeholder="Optional — your current provider, the certificate types you see most, or anything you'd like clarified."
      />

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
        {submitting ? "Sending…" : "Submit application"}
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
