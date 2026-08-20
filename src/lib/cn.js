import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// ⛔ REAL, LIVE, SITEWIDE BUG this configuration fixes — found 20-08-2026 by
// measuring computed font sizes, not by reading source.
//
// `tailwind-merge` has no access to the @theme block, so it classifies a
// `text-*` utility by guessing from the value: a known t-shirt size or numeric
// value is a FONT SIZE, and anything else falls through to TEXT COLOUR. Every
// font-size token in this project is a semantic name (`--text-h1`,
// `--text-body-lg`, …), so `text-h1` was being classified as a colour — which
// put it in the same conflict group as `text-canvas`. The later class won and
// the SIZE WAS SILENTLY DELETED.
//
//   twMerge("text-h1 text-canvas")   →  "text-canvas"      ← size gone
//   twMerge("text-h2 text-ink-600")  →  "text-ink-600"     ← size gone
//
// Anywhere a size and a colour went through `cn()` together, the element
// rendered at the inherited 16px/400 instead. `PageHero`'s `<h1>` did exactly
// that, so the primary heading of every T2 / T3 / T4 / T5 page — 60-odd
// routes — was rendering at body size. Measured before the fix: 16px, weight
// 400, where `--text-h1` resolves to ~52px/700 at a 1440px viewport. The
// homepage was unaffected only because its `<h1>` does not pass its classes
// through `cn()`.
//
// Declaring the tokens below moves them into the real `font-size` group, so a
// size and a colour stop conflicting and both survive.
//
// ⚠️ THIS LIST MUST TRACK theme.css's `--text-*` tokens. Adding a font-size
// token there without adding it here reintroduces exactly the bug above, and
// it fails silently — nothing errors, the text is just the wrong size. Grep
// `--text-` in `src/styles/theme.css` (ignore the `--line-height` /
// `--letter-spacing` / `--font-weight` sub-properties) to re-derive it.
const FONT_SIZE_TOKENS = [
  "display-xl",
  "display-lg",
  "h1",
  "h2",
  "h3",
  "h4",
  "body-lg",
  "body",
  "body-sm",
  "eyebrow",
  "quote",
  "stat",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: FONT_SIZE_TOKENS }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
