import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

// Sibling to Input.jsx (DESIGN.md §12.4's field pattern), for the Contact
// form's "Service required" select. Plain native <select> with <optgroup> —
// fully accessible and keyboard-operable for free, no Radix dependency
// needed for something this simple. `groups` is `serviceSelectOptions()`'s
// shape ([{ group, options: [{ value, label }] }]); pass `options` instead
// for a flat, ungrouped list.
export function Select({ label, id, groups, options, placeholder, error, className, ...props }) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-body-sm font-medium text-ink-500">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full appearance-none rounded-[var(--radius-sm)] border bg-white px-3.5 pr-10 text-body text-ink-600",
            "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:border-ink-400",
            error ? "border-danger" : "border-ink-100",
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
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
