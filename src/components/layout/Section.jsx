import { cn } from "@/lib/cn";
import { SurfaceTexture } from "@/components/ui/SurfaceTexture";

// DESIGN.md §4.6 surface pairing rules + §6.1 fluid padding. `data-surface`
// drives the accent/border CSS custom properties and heading colour defined
// in theme.css, so descendants (Eyebrow, borders, accents) read
// var(--surface-accent) / var(--surface-border) without prop-drilling.
const SURFACE_CLASSES = {
  light: "bg-canvas text-ink-500",
  "light-alt": "bg-canvas-alt text-ink-500",
  dark: "bg-ink-900 text-ink-300",
  deep: "bg-ink-950 text-ink-300",
  ember: "bg-ember-400 text-ink-900",
};

const GRAIN_SURFACES = new Set(["dark", "deep"]);

// Which texture tone a surface asks for. Derived here rather than passed in,
// so a call site can never pair an ink-toned texture with an ink-toned
// section — the failure mode is a texture that is simply invisible, which
// looks like the prop was ignored.
const DARK_SURFACES = new Set(["dark", "deep", "ember"]);

/**
 * `texture` / `textureId` (20-08-2026) render a `SurfaceTexture` behind the
 * section's content — the DSC module's per-group backgrounds. Both are
 * OPTIONAL and additive: pass neither and the output is byte-identical to
 * before, which is what every non-DSC section still relies on.
 *
 * `isolate` is added only when a texture is present, so the layer cannot
 * escape to an outer stacking context. The section's own `overflow` stays
 * VISIBLE either way — StepFlow and HowWeWork both position content outside
 * their parent's box, and the texture clips itself instead (see
 * `.surface-texture` in theme.css).
 *
 * `textureId` must be unique per mounted section: `url(#id)` resolves
 * document-wide, so two sections sharing one id light from whichever mounted
 * last.
 */
export function Section({
  surface = "light",
  texture,
  textureId,
  className,
  children,
  ...props
}) {
  const grainy = GRAIN_SURFACES.has(surface);
  const textured = Boolean(texture && textureId);

  return (
    <section
      data-surface={surface}
      className={cn(
        "relative",
        textured && "isolate",
        surface === "deep" ? "section-pad-deep" : "section-pad",
        SURFACE_CLASSES[surface],
        grainy && "grain",
        className
      )}
      {...props}
    >
      {textured && (
        <SurfaceTexture
          variant={texture}
          id={textureId}
          tone={DARK_SURFACES.has(surface) ? "dark" : "light"}
        />
      )}
      {children}
    </section>
  );
}
