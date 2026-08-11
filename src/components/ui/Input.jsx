import { useId } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

// DESIGN.md §12.4. `label` is required in spirit — never rely on a
// placeholder as the label. Colour is never the sole error/success
// indicator; both pair a border colour with an icon and a text message.
export function Input({ label, id, error, success, className, ...props }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error ? `${inputId}-error` : success ? `${inputId}-success` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-body-sm font-medium text-ink-500">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "h-12 rounded-[var(--radius-sm)] border bg-white px-3.5 text-body text-ink-600 placeholder:text-ink-300",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:border-ink-400",
          error
            ? "border-danger"
            : success
              ? "border-success"
              : "border-ink-100",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="flex items-center gap-1.5 text-body-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {error}
        </p>
      )}
      {!error && success && (
        <p id={`${inputId}-success`} className="flex items-center gap-1.5 text-body-sm text-success">
          <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {success}
        </p>
      )}
    </div>
  );
}
