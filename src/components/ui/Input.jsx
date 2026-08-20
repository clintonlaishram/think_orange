import { useId } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldLabelClass } from "@/components/ui/fieldLabel";

// DESIGN.md §12.4. `label` is required in spirit — never rely on a
// placeholder as the label. Colour is never the sole error/success
// indicator; both pair a border colour with an icon and a text message.
//
// `tone` (20-08-2026) is additive and defaults to "light", so every existing
// call site is byte-identical. "dark" swaps the surface for `.field-dark`
// (theme.css — ONE definition shared by Input/Select/Textarea, same reason
// `.card-dark` is a single class) and lifts the label/text/placeholder to
// colours that clear AA on ink: label ink-100, value canvas, placeholder
// ink-300. ink-400 is NOT a body-text colour on dark in this codebase —
// Phase 10 measured it at 2.86:1 and fixed it sitewide for exactly this.
//
// `tone="bare"` (21-08-2026) is the third tone: no box at all — transparent,
// one hairline along the bottom, zero horizontal padding (`.field-bare` in
// theme.css). Built for /contact, whose form sits directly on the page
// instead of inside a card. Its label is mono/uppercase rather than
// sentence-case sans, because with the input's own box gone the label is the
// only thing marking where the field begins.
export function Input({ label, id, error, success, tone = "light", className, ...props }) {
  const dark = tone === "dark";
  const bare = tone === "bare";
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error ? `${inputId}-error` : success ? `${inputId}-success` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className={fieldLabelClass(tone)}
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "h-12 rounded-[var(--radius-sm)] border px-3.5 text-body",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
          dark && "field-dark text-canvas placeholder:text-ink-300",
          bare && "field-bare text-ink-600 placeholder:text-ink-400",
          !dark && !bare && "bg-white text-ink-600 placeholder:text-ink-300 focus-visible:border-ink-400",
          error
            ? "border-danger"
            : success
              ? "border-success"
              : !dark && !bare
                ? "border-ink-100"
                : "",
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
