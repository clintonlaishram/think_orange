import { useId } from "react";
import { cn } from "@/lib/cn";

// Sibling to Input.jsx/Select.jsx — the multi-line field for the Contact and
// Partner enquiry forms' "Message" fields. EnquiryCard.jsx hand-rolled this
// inline (Phase 6, before Contact existed); this generalises the same markup
// so the real forms don't repeat it a third time.
export function Textarea({ label, id, error, className, ...props }) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-body-sm font-medium text-ink-500">
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        className={cn(
          "rounded-[var(--radius-sm)] border bg-white px-3.5 py-3 text-body text-ink-600 placeholder:text-ink-300",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:border-ink-400",
          error ? "border-danger" : "border-ink-100",
          className
        )}
        {...props}
      />
    </div>
  );
}
