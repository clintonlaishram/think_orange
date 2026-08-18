// Decorative vector illustration for the homepage DSC band — a laptop with a
// signed certificate lifting off the screen, a FIPS USB token and a verified
// shield. Hand-authored SVG rather than a raster image on purpose:
//
//   - every fill reads a design token, so it can never drift from the palette
//     the way a flattened PNG would (CLAUDE.md: no raw hex);
//   - it ships as ~4KB of markup with no network request, no LQIP problem and
//     no `<Img>`/`<Figure>` wiring (IMAGE-PLAN.md §8.4's LQIP gap is still
//     open, and this sidesteps it entirely);
//   - IMAGE-PLAN.md §2 bars AI-generated people, offices and certificates.
//     This depicts a GENERIC unsigned document — no name, no PAN, no GSTIN, no
//     issuer marks, nothing resembling a real certificate that would need the
//     §2 redaction treatment.
//
// Purely decorative: `aria-hidden`, so the section's real copy carries the
// meaning. The whole scene is one viewBox, scaled by its container.
export function DscShowcase({ className }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      {/* Signal arcs — the logo crescent's handedness, never mirrored
          (DESIGN.md §3.1). Reads as "transmitted and verified". */}
      <g stroke="var(--color-ink-700)" strokeLinecap="round" fill="none">
        <path d="M262 150a96 96 0 0 1 78-56" strokeWidth="2" opacity="0.9" />
        <path d="M246 176a132 132 0 0 1 98-80" strokeWidth="2" opacity="0.6" />
        <path d="M230 202a168 168 0 0 1 118-104" strokeWidth="2" opacity="0.35" />
      </g>

      {/* Dot grid, bottom right — same ledger-grid idea as the hero. */}
      <g fill="var(--color-ink-600)">
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={532 + col * 18}
              cy={330 + row * 18}
              r="2"
              opacity={0.75 - (row + col) * 0.04}
            />
          ))
        )}
      </g>

      {/* Verified shield, sitting behind the certificate. */}
      <g transform="translate(454 96)">
        <path
          d="M62 4 116 24v52c0 41-23 70-54 84-31-14-54-43-54-84V24L62 4Z"
          fill="var(--color-ink-800)"
          stroke="var(--color-ink-600)"
          strokeWidth="2"
        />
        <path
          d="M62 16 104 31v45c0 34-19 58-42 70-23-12-42-36-42-70V31L62 16Z"
          fill="var(--color-ink-700)"
          opacity="0.55"
        />
        <path
          d="M42 76l14 15 28-33"
          stroke="var(--color-ink-100)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Laptop. Screen first, then the base in front of it. */}
      <g>
        <rect
          x="252"
          y="150"
          width="252"
          height="164"
          rx="10"
          fill="var(--color-ink-800)"
          stroke="var(--color-ink-600)"
          strokeWidth="2"
        />
        <rect
          x="264"
          y="162"
          width="228"
          height="140"
          rx="6"
          fill="var(--color-ink-900)"
        />
        {/* Base: a shallow trapezoid, wider than the lid. */}
        <path
          d="M232 316h292l22 30H210l22-30Z"
          fill="var(--color-ink-700)"
          stroke="var(--color-ink-600)"
          strokeWidth="2"
        />
        <path d="M254 328h250" stroke="var(--color-ink-500)" strokeWidth="2" strokeLinecap="round" />
        <rect x="336" y="336" width="84" height="4" rx="2" fill="var(--color-ink-500)" />
      </g>

      {/* The certificate, lifted off the screen. Canvas-toned so it reads as
          paper against the deep surface. */}
      <g transform="translate(288 76)">
        <rect
          x="0"
          y="0"
          width="212"
          height="256"
          rx="10"
          fill="var(--color-canvas)"
          stroke="var(--color-canvas-deep)"
          strokeWidth="2"
        />
        {/* Title rule — no words, so nothing here can read as a real issued
            certificate (see the file header). */}
        <rect x="28" y="34" width="128" height="10" rx="5" fill="var(--color-ink-800)" />
        <g fill="var(--color-ink-100)">
          <rect x="28" y="72" width="156" height="8" rx="4" />
          <rect x="28" y="94" width="132" height="8" rx="4" />
          <rect x="28" y="116" width="150" height="8" rx="4" />
          <rect x="28" y="138" width="98" height="8" rx="4" />
        </g>
        {/* Signature. */}
        <path
          d="M30 206c10-26 18-34 24-22s2 30-6 36 0-16 12-28 26-18 36-10 6 20 18 14 16-14 20-22"
          stroke="var(--color-ink-500)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Ember seal — the one warm accent in the scene, and the only place
            ember appears at any size, keeping the section's orange budget
            well under CLAUDE.md's ~12% ceiling. */}
        <g transform="translate(146 178)">
          <path
            d="M30 0 38.6 6.5 49.2 5.4 52.7 15.5 61.4 21.7 58.1 31.9 61.4 42.1 52.7 48.3 49.2 58.4 38.6 57.3 30 63.8 21.4 57.3 10.8 58.4 7.3 48.3 -1.4 42.1 1.9 31.9 -1.4 21.7 7.3 15.5 10.8 5.4 21.4 6.5Z"
            fill="var(--color-ember-400)"
          />
          <circle cx="30" cy="31.9" r="20" fill="var(--color-ember-500)" />
          <path
            d="M21 32l7 7 13-15"
            stroke="var(--color-canvas)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* USB crypto token, front right — the token every certificate ships on
          (products.js `tokenNote`). */}
      <g transform="translate(474 214)">
        {/* Connector. */}
        <rect x="22" y="0" width="44" height="46" rx="4" fill="var(--color-ink-400)" />
        <rect x="30" y="10" width="28" height="6" rx="3" fill="var(--color-ink-600)" />
        <rect x="30" y="22" width="28" height="6" rx="3" fill="var(--color-ink-600)" />
        {/* Body. */}
        <rect
          x="0"
          y="42"
          width="88"
          height="126"
          rx="12"
          fill="var(--color-ink-700)"
          stroke="var(--color-ink-500)"
          strokeWidth="2"
        />
        <rect x="10" y="52" width="30" height="106" rx="8" fill="var(--color-ink-600)" opacity="0.5" />
        {/* Lock mark. */}
        <g transform="translate(30 88)">
          <path
            d="M6 16v-6a8 8 0 0 1 16 0v6"
            stroke="var(--color-ink-200)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="0" y="16" width="28" height="22" rx="4" fill="var(--color-ink-200)" />
        </g>
      </g>
    </svg>
  );
}
