import { useId } from "react";
import { cn } from "@/lib/cn";
import { fieldLabelClass } from "@/components/ui/fieldLabel";

// Sibling to Input.jsx/Select.jsx — the multi-line field for the Contact and
// Partner enquiry forms' "Message" fields. EnquiryCard.jsx hand-rolled this
// inline (Phase 6, before Contact existed); this generalises the same markup
// so the real forms don't repeat it a third time.
//
// `tone="dark"` is additive (see Input.jsx) — same `.field-dark` surface, so
// the two tones share one geometry and one definition of the dark recess.
// `tone="bare"` — see Input.jsx.
export function Textarea({ label, id, error, tone = "light", className, ...props }) {
  const dark = tone === "dark";
  const bare = tone === "bare";
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className={fieldLabelClass(tone)}
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        className={cn(
          "rounded-[var(--radius-sm)] border px-3.5 py-3 text-body",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
          dark && "field-dark text-canvas placeholder:text-ink-300",
          bare && "field-bare text-ink-600 placeholder:text-ink-400",
          !dark && !bare && "bg-white text-ink-600 placeholder:text-ink-300 focus-visible:border-ink-400",
          error ? "border-danger" : !dark && !bare ? "border-ink-100" : "",
          className
        )}
        {...props}
      />
    </div>
  );
}
