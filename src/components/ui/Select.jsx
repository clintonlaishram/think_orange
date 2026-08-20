import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldLabelClass } from "@/components/ui/fieldLabel";

// Sibling to Input.jsx (DESIGN.md §12.4's field pattern), for the Contact
// form's "Service required" select. Plain native <select> with <optgroup> —
// fully accessible and keyboard-operable for free, no Radix dependency
// needed for something this simple. `groups` is `serviceSelectOptions()`'s
// shape ([{ group, options: [{ value, label }] }]); pass `options` instead
// for a flat, ungrouped list.
//
// `tone="dark"` is additive (see Input.jsx). The <option> list itself is drawn
// by the OS, not by us — `.field-dark option` in theme.css keeps it on the
// light palette so a dark field never yields white-on-white options.
//
// `tone="bare"` — see Input.jsx. The chevron moves flush to the right edge,
// because a bare field has no horizontal padding for it to sit inside.
export function Select({
  label,
  id,
  groups,
  options,
  placeholder,
  error,
  tone = "light",
  className,
  ...props
}) {
  const dark = tone === "dark";
  const bare = tone === "bare";
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className={fieldLabelClass(tone)}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full appearance-none rounded-[var(--radius-sm)] border px-3.5 pr-10 text-body",
            "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300",
            dark && "field-dark text-canvas",
            bare && "field-bare text-ink-600",
            !dark && !bare && "bg-white text-ink-600 focus-visible:border-ink-400",
            error ? "border-danger" : !dark && !bare ? "border-ink-100" : "",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {groups
            ? groups.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2",
            bare ? "right-0" : "right-3.5",
            dark ? "text-ink-200" : bare ? "text-ink-400" : "text-ink-300"
          )}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
