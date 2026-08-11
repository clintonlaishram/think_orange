// The one repeated shape from the logo's crescent — DESIGN.md §3.1. Used by
// Eyebrow (rule) and Card's hover corner (corner). This is an approximation;
// DESIGN.md §18 flags the real logo-derived arc path as a pending swap once
// the SVG source is available — replace the `d` paths below when it lands.

export function ArcGlyph({ variant = "rule", className }) {
  if (variant === "corner") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 12a8 8 0 1 1-3.8-6.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="8"
      viewBox="0 0 24 8"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 6.5C4.5 2.5 9.5 1 12 3C14.5 5 19.5 5.5 23 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
