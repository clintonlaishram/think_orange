// One definition of the field label's typography, shared by Input, Select and
// Textarea — the same reason `.field-dark` / `.field-bare` are single classes
// in theme.css rather than three copies of the same declarations.
//
// `bare` is deliberately mono/uppercase where the other two tones are
// sentence-case sans: with the input's own box removed, the label is the only
// thing marking where the field starts, so it has to carry more weight than a
// caption. ink-400 on canvas is 7.2:1; ink-300 measures ~3.4:1 there and is
// not a body-text colour on a light surface in this codebase.
export function fieldLabelClass(tone) {
  if (tone === "bare") {
    return "font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400";
  }
  return tone === "dark"
    ? "text-body-sm font-medium text-ink-100"
    : "text-body-sm font-medium text-ink-500";
}
