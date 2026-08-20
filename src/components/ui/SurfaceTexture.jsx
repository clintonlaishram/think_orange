import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll } from "motion/react";
import { arcPath, radialTicks } from "@/lib/arc";
import { cn } from "@/lib/cn";

// Named background texture layers — one motif per DSC group.
//
// --- REVISION 20-08-2026 (second pass) ------------------------------------
// Clinton on the first pass: "design is repeated to hero section and next
// page. and design also look prominent and look cheap. take the design idea
// from home page design."
//
// All three criticisms were fair, and the fixes are structural, not a tweak:
//
//  1. REPETITION. The first pass painted a group's motif in the hero AND on
//     the first light section of the same page, which is the same picture
//     twice in one scroll. Now a motif appears ONCE per page. On a T4/T5 page
//     that is the hero only. On the /dsc hub each group SECTION carries its
//     own — three different motifs on three different sections is a sequence,
//     not a repeat.
//
//  2. PROMINENT / CHEAP. The homepage is the reference, and it never draws a
//     picture behind anything: its depth comes from the arc composition at
//     0.045–0.12 opacity, an ambient radial, grain, and hairlines. The first
//     pass had a rounded-rect USB-token silhouette, circuit pads and a dashed
//     signing rule — literal clip-art illustration, at 2–4x the homepage's
//     weight. Every figurative element is gone. What remains is line geometry
//     from the site's own vocabulary: the §3.1 crescent, the ledger grid, and
//     hairlines. Opacities are now at or below the homepage's own ladder.
//
//  3. HOME-PAGE IDIOM. `certificate` and `seal` are literally `lib/arc.js`'s
//     crescent at several radii — the same object `ArcRings` draws on the
//     homepage's dark sections. `blueprint` is the ledger grid `.footer-grid`
//     and the hero's L2 layer already established, plus orthogonal hairlines
//     that terminate ON the crescent rather than floating. `signature` is the
//     one non-circular curve, and it is now a single stroke with one echo.
//
// EVERY variant is inert: `aria-hidden`, `pointer-events: none`, no animation,
// no blur (§16 bars floating blurred blobs; this is line work). Colour comes
// from the wrapper's `tone`, so a variant never names a palette value.
//
// ⚠️ `id` MUST be unique per mounted instance. `url(#id)` resolves
// DOCUMENT-wide, not per-<svg>, so two instances sharing an id silently light
// from whichever <defs> mounted last — the trap `ArcRings` documents.

/** Shared diagonal fade, so a motif is lit from one direction like every other surface. */
function FadeDef({ id, from = 0, peak = 1, to = 0.15 }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="40" y1="40" x2="360" y2="360">
      <stop offset="0%" stopColor="currentColor" stopOpacity={from} />
      <stop offset="46%" stopColor="currentColor" stopOpacity={peak} />
      <stop offset="100%" stopColor="currentColor" stopOpacity={to} />
    </linearGradient>
  );
}

// Radii are spaced so strokes never overlap — the discipline CtaBand's rings
// follow, and for the same reason: non-overlapping strokes cannot stack their
// opacities, so the stated weight is provably the worst case behind text.
const GUILLOCHE_RADII = [186, 166, 146, 126, 106];

// Certificates. Engraved concentric crescents plus a fine tick ring — the
// security print a certificate is issued on, drawn with the site's own shape.
// One composition, one corner; the first pass also had a bottom-left echo,
// which just made the section busier.
function CertificateTexture({ id }) {
  const ticks = radialTicks({ count: 34, inner: 196, outer: 205, startDeg: 0, sweepDeg: 302 });
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className="absolute -right-24 -top-28 h-[420px] w-[420px] md:-right-38 md:-top-54 md:h-[620px] md:w-[620px]"
    >
      <defs>
        <FadeDef id={`${id}-fade`} />
      </defs>
      <g stroke={`url(#${id}-fade)`} strokeLinecap="round" strokeWidth="1">
        <g opacity="0.3">
          {GUILLOCHE_RADII.map((r) => (
            <path key={r} d={arcPath(r)} />
          ))}
        </g>
        <g opacity="0.18" strokeWidth="0.75">
          {ticks.map((tick, index) => (
            <line key={index} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
          ))}
        </g>
      </g>
    </svg>
  );
}

// Tokens & Resources. Orthogonal hairlines that TERMINATE ON the crescent —
// which is the whole idea: a technical drawing measuring the brand shape,
// rather than the circuit-board illustration the first pass drew. Radius 150
// is the arc they meet; the x/y values below are points on it, so a line
// stops exactly where the curve is instead of near it.
//   (200 + 150·cos θ, 200 + 150·sin θ) for θ = 200°, 232°, 262°
const BLUEPRINT_RULES = [
  { x: 59.0, y: 148.7 },
  { x: 107.7, y: 81.8 },
  { x: 179.1, y: 51.4 },
];

function BlueprintTexture({ id }) {
  return (
    <>
      {/* The grid is CSS (`.tex-grid`, theme.css) rather than an SVG <pattern>:
          a repeating-linear-gradient tiles for free at any section height. */}
      <div className="tex-grid absolute inset-0" />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute -right-24 -top-28 h-[420px] w-[420px] md:-right-20 md:-top-36 md:h-[620px] md:w-[620px]"
      >
        <defs>
          <FadeDef id={`${id}-fade`} />
        </defs>
        <g stroke={`url(#${id}-fade)`} strokeLinecap="round">
          <g opacity="0.26" strokeWidth="1">
            <path d={arcPath(150)} />
          </g>
          <g opacity="0.16" strokeWidth="0.75">
            {BLUEPRINT_RULES.map((point) => (
              <path key={`${point.x}`} d={`M${point.x} ${point.y} H 400`} />
            ))}
            {BLUEPRINT_RULES.map((point) => (
              <path key={`v${point.x}`} d={`M${point.x} ${point.y} V 400`} />
            ))}
          </g>
        </g>
      </svg>
    </>
  );
}

// eSign. The one non-circular motif on the site, and the only place it
// appears — which is what §16 asks of an effect. A single flourish with one
// receding echo; the first pass had three strokes plus a dashed signing rule,
// which read as a chart.
const STROKES = [
  { d: "M-30 196 C 60 92, 132 292, 226 178 S 338 44, 428 168 S 528 274, 610 132", width: 1.25, opacity: 0.3 },
  { d: "M-30 244 C 74 152, 150 322, 248 224 S 352 108, 450 220 S 546 310, 610 192", width: 0.75, opacity: 0.16 },
];

function SignatureTexture({ id }) {
  return (
    <svg
      viewBox="0 0 620 340"
      fill="none"
      className="absolute -right-16 -top-8 h-[300px] w-[560px] md:-right-8 md:-top-4 md:h-[380px] md:w-[700px]"
    >
      <defs>
        <linearGradient id={`${id}-fade`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="620" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="32%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="76%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id}-fade)`} strokeLinecap="round">
        {STROKES.map((stroke) => (
          <path key={stroke.d} d={stroke.d} strokeWidth={stroke.width} opacity={stroke.opacity} />
        ))}
      </g>
    </svg>
  );
}

// The /dsc hub hero. One wide band plus two fine crescents and a fine tick
// rosette — the same weight the single static arc it replaced carried
// (`opacity-[0.12]`, strokeWidth 16), redistributed across the composition
// rather than added on top of it.
function SealTexture({ id }) {
  const ticks = radialTicks({ count: 46, inner: 190, outer: 201, startDeg: 0, sweepDeg: 302 });
  return (
    <>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute -right-28 -top-32 h-[460px] w-[460px] md:-right-20 md:-top-40 md:h-[700px] md:w-[700px]"
      >
        <defs>
          <FadeDef id={`${id}-fade`} from={0.05} peak={1} to={0.18} />
        </defs>
        <g stroke={`url(#${id}-fade)`} strokeLinecap="round">
          <path d={arcPath(172)} strokeWidth="13" opacity="0.1" />
          <path d={arcPath(146)} strokeWidth="1" opacity="0.26" />
          <path d={arcPath(138)} strokeWidth="0.75" opacity="0.16" />
          <g opacity="0.2" strokeWidth="0.75">
            {ticks.map((tick, index) => (
              <line key={index} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
            ))}
          </g>
        </g>
      </svg>

      {/* Ledger hairlines low-left, so the fold is not carrying its depth on
          one circular composition in one corner. */}
      <div className="tex-grid tex-grid--hero absolute inset-0" />
    </>
  );
}

const VARIANTS = {
  certificate: CertificateTexture,
  blueprint: BlueprintTexture,
  signature: SignatureTexture,
  seal: SealTexture,
};

// Colour is set ONCE, on the wrapper, and every variant inherits it through
// `currentColor` — including `.tex-grid`, whose gradient stops are
// `color-mix(… currentColor …)`. So a variant never names a palette value and
// the same motif works on either kind of surface.
//
// `dark` is EMBER, not a lighter ink. On ink-950 an ink tint has nothing to
// read against (measured: signature strokes at ink-400 were invisible on the
// eSign product hero), and ember is what the single static arc these replaced
// was already using on every one of these heroes.
//
// `light` is INK-300, not ink-400: on canvas these strokes should be felt
// rather than seen, and the first pass at ink-400 was the "prominent" part of
// Clinton's note.
const TONE_CLASS = {
  light: "text-ink-300",
  dark: "text-ember-400",
};

/**
 * How far the motif travels across the whole time its section is on screen,
 * in px. Deliberately small: this is depth, not a ride. The layer is `-1`
 * behind the content and clipped by its own frame, so the travel reads as the
 * background sitting further away than the copy — the effect breaks the moment
 * it becomes noticeable enough to look at.
 *
 * `transform` only, so it composites — the whole point of doing this with a
 * motion value rather than animating a background-position.
 */
const PARALLAX_PX = 28;

/**
 * @param variant  `certificate` | `blueprint` | `signature` | `seal`. An
 *                 unknown or missing variant renders NOTHING rather than
 *                 throwing, so a nav.js column added without a matching
 *                 variant degrades to an untextured section.
 * @param id       Unique per mounted instance — see the warning above.
 * @param tone     `light` (default) for canvas surfaces, `dark` for ink ones.
 *                 `Section` derives it from its own surface and `PageHero`
 *                 always passes `dark`, so no call site sets it by hand.
 */
export function SurfaceTexture({ variant, id, tone = "light", className }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  // Same construction StepFlow already uses on these prerendered pages:
  // scroll-linked, target-scoped, no listener of our own.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ⚠️ THE OFFSET STARTS AT ZERO AND IS ONLY DRIVEN AFTER MOUNT, and that is a
  // hydration fix rather than a style choice. Deriving it straight off
  // `scrollYProgress` with `useTransform` makes the FIRST render emit
  // `transform: translateY(28px)` — and `useReducedMotion()` is false on the
  // server (there is no matchMedia), so a reduced-motion client renders
  // `none` against a server that said 28px: a mismatch on every textured
  // section. Starting at 0 means the server, a normal client and a
  // reduced-motion client all emit the same thing, and only a real scroll
  // event moves it.
  const y = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const apply = (progress) => y.set(PARALLAX_PX - progress * 2 * PARALLAX_PX);
    apply(scrollYProgress.get()); // prime once, post-hydration
    return scrollYProgress.on("change", apply);
  }, [reduceMotion, scrollYProgress, y]);

  const Variant = VARIANTS[variant];
  if (!Variant || !id) return null;

  return (
    // `.surface-texture` (theme.css) is the clipping frame — the section's own
    // overflow must stay `visible` (StepFlow and HowWeWork position labels
    // outside their parent's box), so the texture clips itself, exactly as
    // `.arc-rings` already does.
    <div
      ref={ref}
      className={cn("surface-texture", TONE_CLASS[tone] ?? TONE_CLASS.light, className)}
      aria-hidden="true"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Variant id={id} />
      </motion.div>
    </div>
  );
}
