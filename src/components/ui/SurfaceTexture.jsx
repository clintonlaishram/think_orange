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

/* ══ SERVICE PRACTICE-AREA MOTIFS ════════════════════════════════════════════
 * Clinton, 22-08-2026: "different background texture for each service group",
 * then: "improve the texture design, now it looks simple and not looking good,
 * make more complex and premium type."
 *
 * ⚠️ THIS IS NOT A REVERSAL OF THE 20-08-2026 "PROMINENT / CHEAP" NOTE, and
 * the distinction is the whole design of this block. What read as cheap then
 * was FIGURATIVE illustration at high opacity: a USB-token silhouette, circuit
 * pads, a dashed signing rule — clip-art of the subject. Richness is a
 * different axis entirely. These are built the way security-print engraving is
 * built: many fine strokes in graduated weights, layered, at LOW opacity. The
 * complexity is in the layer count, never in the brightness, and no motif
 * depicts its subject.
 *
 * Every one is four layers on the same scaffold, so they read as one family:
 *
 *   A  anchor      one wide, very low-opacity arc — mass, not line
 *   B  guilloché   graduated fine concentric arcs
 *   C  signature   the DISTINGUISHING primitive (this is what tells them apart)
 *   D  echo        a small secondary cluster, bracketing the composition the
 *                  way CtaBand's corner echo brackets that band
 *
 *   cadence  GST                       two-scale radial dial   (circular marks)
 *   strata   Income Tax                double horizontal rules (horizontal)
 *   frame    Business Setup            nested squares + marks  (rectilinear)
 *   emboss   Registrations & Licences  rim + inner guilloché   (concentric)
 *   column   Accounting, Payroll…      ruled ledger columns    (vertical)
 *   ascent   Tenders & Finance         graduated diagonals     (diagonal)
 *
 * ⛔ The four DSC variants above are NOT reused. Those motifs MEAN something —
 * a guilloché says "certificate", a flourish says "eSign" — so putting either
 * behind a GST page would assert something untrue about it.
 *
 * ⚠️ §3.1: the echo groups are translate+scale only. NEVER a negative scale —
 * a mirrored crescent is a different shape, and the whole point of `lib/arc.js`
 * is that the site repeats one.
 */

/**
 * Where the motif sits in the hero, and it is not decoration to get right:
 * `PageHero`'s optional `aside` is an opaque `.panel-dark` occupying the whole
 * right half, so a top-right composition on a hero that HAS one is almost
 * entirely behind the panel — measured on the first pass, only the outer arc
 * and a few tick ends survived. `left` puts it in the real negative space
 * beside and below the copy instead.
 *
 * Contrast is not the question here: Phase 10 measured headings over the arc
 * rings at 15.6-17.5:1, so a motif crossing a headline is aesthetic only. It
 * was re-measured for these anyway, since they are denser.
 */
const PLACEMENT = {
  default:
    "absolute -right-24 -top-28 h-[440px] w-[440px] md:-right-20 md:-top-36 md:h-[660px] md:w-[660px]",
  left:
    "absolute -left-28 -top-20 h-[440px] w-[440px] md:-left-36 md:-top-24 md:h-[680px] md:w-[680px]",
};

/**
 * Where the circle of radius `r` centred on (200,200) crosses a given y (or x).
 * Rules TERMINATE on the crescent rather than near it — the same discipline
 * `blueprint` follows, and the reason its lines read as a technical drawing
 * measuring the brand shape instead of hairlines scattered over it.
 * Returns null when the line misses the circle entirely.
 */
function chord(r, offset) {
  const d = r * r - offset * offset;
  return d <= 0 ? null : Math.sqrt(d);
}

/** Layer B. Graduated fine arcs — the engraving base every motif shares. */
function Guilloche({ radii, base = 0.13, step = 0.028, width = 0.75 }) {
  return radii.map((r, i) => (
    <path key={r} d={arcPath(r)} strokeWidth={width} opacity={+(base + i * step).toFixed(3)} />
  ));
}

/** Layer D. A small bracketing cluster. translate + POSITIVE scale only. */
function Echo({ x, y, scale, radii = [150, 118], opacity = 0.16 }) {
  return (
    <g transform={`translate(${x - 200 * scale} ${y - 200 * scale}) scale(${scale})`}>
      {radii.map((r, i) => (
        <path
          key={r}
          d={arcPath(r)}
          strokeWidth={1.2 / scale}
          opacity={+(opacity - i * 0.05).toFixed(3)}
        />
      ))}
    </g>
  );
}

function Motif({ id, svgClass, fade, children }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={svgClass ?? PLACEMENT.default}>
      <defs>
        <FadeDef id={`${id}-fade`} {...fade} />
      </defs>
      <g stroke={`url(#${id}-fade)`} strokeLinecap="round">{children}</g>
    </svg>
  );
}

// GST — a precision dial. Returns arrive on a cycle, so the signature layer is
// radial marks at TWO scales (13 long majors, 52 short minors) around a bezel,
// plus a fine inner tick ring. Reads as a chronometer bezel rather than as a
// picture of anything.
function CadenceTexture({ id, svgClass }) {
  const majors = radialTicks({ count: 13, inner: 146, outer: 184, startDeg: 0, sweepDeg: 302 });
  const minors = radialTicks({ count: 53, inner: 168, outer: 180, startDeg: 0, sweepDeg: 302 });
  const inners = radialTicks({ count: 31, inner: 86, outer: 98, startDeg: 0, sweepDeg: 302 });
  return (
    <Motif id={id} svgClass={svgClass}>
      <path d={arcPath(196)} strokeWidth="16" opacity="0.055" />
      <Guilloche radii={[186, 164, 140, 118, 96]} />
      <g strokeWidth="1.15" opacity="0.24">
        {majors.map((t, i) => <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      </g>
      <g strokeWidth="0.6" opacity="0.15">
        {minors.map((t, i) => <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      </g>
      <g strokeWidth="0.6" opacity="0.12">
        {inners.map((t, i) => <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      </g>
      <Echo x={318} y={330} scale={0.26} />
    </Motif>
  );
}

// Income Tax — layered bands. Each rule is DOUBLED by a hairline just beneath
// it, which is an engraving convention and the thing that stops this reading
// as a plain set of lines. Weight increases downward. No amount, no rate, no
// slab table: the geometry says "layers" and asserts nothing.
const STRATA_Y = [78, 110, 142, 174, 206, 238, 270, 302];

function StrataTexture({ id, svgClass }) {
  return (
    <Motif id={id} svgClass={svgClass}>
      <path d={arcPath(198)} strokeWidth="15" opacity="0.05" />
      <Guilloche radii={[188, 172, 158]} base={0.1} />
      {STRATA_Y.map((y, i) => {
        const half = chord(158, y - 200);
        if (half === null) return null;
        const x = +(200 - half).toFixed(1);
        return (
          <g key={y}>
            <line
              x1={x} y1={y} x2="400" y2={y}
              strokeWidth={+(0.55 + i * 0.16).toFixed(2)}
              opacity={+(0.1 + i * 0.016).toFixed(3)}
            />
            {/* The paired hairline. 5px under its rule, always finer. */}
            <line x1={x + 12} y1={y + 5} x2="400" y2={y + 5} strokeWidth="0.5" opacity="0.075" />
          </g>
        );
      })}
      <Echo x={92} y={330} scale={0.24} />
    </Motif>
  );
}

// Business Setup — nested structure. The only rectilinear closed shape in the
// set, which is what makes it unmistakable beside five circular/linear motifs.
// Each square carries REGISTRATION CROSSES at its corners: already site
// vocabulary (HeroFloaters draws the same mark), and what turns four rectangles
// into a drawn plate rather than four rectangles.
const FRAME_HALF = [58, 96, 134, 172, 196];

function FrameTexture({ id, svgClass }) {
  return (
    <Motif id={id} svgClass={svgClass}>
      <path d={arcPath(190)} strokeWidth="15" opacity="0.05" />
      <Guilloche radii={[152, 120]} base={0.12} />
      {FRAME_HALF.map((half, i) => (
        <rect
          key={half}
          x={200 - half} y={200 - half} width={half * 2} height={half * 2}
          rx={8 + i * 3}
          strokeWidth={i === 2 ? 1.1 : 0.7}
          opacity={i === 2 ? 0.2 : +(0.085 + i * 0.012).toFixed(3)}
        />
      ))}
      {/* Registration crosses on the dominant square's corners. */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => {
        const cx = 200 + sx * 134;
        const cy = 200 + sy * 134;
        return (
          <g key={`${sx}${sy}`} strokeWidth="0.8" opacity="0.22">
            <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} />
            <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} />
          </g>
        );
      })}
      <Echo x={318} y={332} scale={0.24} />
    </Motif>
  );
}

// Registrations & Licences — a raised seal. Two heavy rim arcs with 44 marks
// between them, then a separate inner guilloché and one DASHED ring. Dense
// concentric weight is the signature, where `cadence` is marks alone and DSC's
// `certificate` is five fine rings with no rim at all.
function EmbossTexture({ id, svgClass }) {
  const rim = radialTicks({ count: 45, inner: 176, outer: 192, startDeg: 0, sweepDeg: 302 });
  const inner = radialTicks({ count: 25, inner: 104, outer: 114, startDeg: 0, sweepDeg: 302 });
  return (
    <Motif id={id} svgClass={svgClass} fade={{ from: 0.05, peak: 1, to: 0.18 }}>
      <path d={arcPath(194)} strokeWidth="2.2" opacity="0.2" />
      <path d={arcPath(174)} strokeWidth="2.2" opacity="0.2" />
      <g strokeWidth="0.8" opacity="0.15">
        {rim.map((t, i) => <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      </g>
      <Guilloche radii={[152, 140, 128, 116]} base={0.1} step={0.022} />
      {/* One dashed ring — a stamp's perforated edge, in line not illustration. */}
      <path d={arcPath(164)} strokeWidth="1" opacity="0.18" strokeDasharray="3 9" />
      <g strokeWidth="0.6" opacity="0.13">
        {inner.map((t, i) => <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
      </g>
      <Echo x={96} y={334} scale={0.24} />
    </Motif>
  );
}

// Accounting, Payroll & Audit — a ruled ledger. Hairline VERTICALS dropping
// from the crescent, under one heavy header rule with short separator ticks
// sitting on it. Vertical dominance is the distinction from `strata`, and from
// DSC's `blueprint`, which draws both axes plus a CSS grid field.
const COLUMN_X = [74, 104, 134, 164, 194, 224, 254, 284, 314];
const HEADER_Y = 118;

function ColumnTexture({ id, svgClass }) {
  const headerHalf = chord(186, HEADER_Y - 200);
  return (
    <Motif id={id} svgClass={svgClass}>
      <path d={arcPath(196)} strokeWidth="15" opacity="0.05" />
      <Guilloche radii={[186, 168]} base={0.12} />
      {headerHalf !== null && (
        <>
          <line
            x1={+(200 - headerHalf).toFixed(1)} y1={HEADER_Y} x2="400" y2={HEADER_Y}
            strokeWidth="1.3" opacity="0.22"
          />
          <line
            x1={+(200 - headerHalf).toFixed(1) + 10} y1={HEADER_Y + 6} x2="400" y2={HEADER_Y + 6}
            strokeWidth="0.55" opacity="0.1"
          />
        </>
      )}
      {COLUMN_X.map((x, i) => {
        const half = chord(186, x - 200);
        if (half === null) return null;
        const top = +(200 - half).toFixed(1);
        return (
          <g key={x}>
            <line
              x1={x} y1={top} x2={x} y2="400"
              strokeWidth={i % 3 === 0 ? 0.95 : 0.6}
              opacity={i % 3 === 0 ? 0.18 : 0.115}
            />
            {/* Separator tick sitting on the header rule. */}
            <line x1={x} y1={HEADER_Y - 5} x2={x} y2={HEADER_Y + 5} strokeWidth="0.9" opacity="0.2" />
          </g>
        );
      })}
      <Echo x={322} y={330} scale={0.24} />
    </Motif>
  );
}

// Tenders & Finance — rising parallels, the only diagonal in the set. Each
// heavy line is PAIRED with a hairline echo above it, so the set reads as a
// graduated sheaf rather than as stripes. Deliberately no axis and no plotted
// points: nothing here should read as a performance claim the page never makes.
const ASCENT_OFFSET = [-168, -112, -56, 0, 56, 112, 168];

function AscentTexture({ id, svgClass }) {
  return (
    <Motif id={id} svgClass={svgClass}>
      <path d={arcPath(196)} strokeWidth="15" opacity="0.05" />
      <Guilloche radii={[186, 158, 130]} base={0.11} />
      {ASCENT_OFFSET.map((offset, i) => (
        <g key={offset}>
          <line
            x1="-20" y1={430 + offset} x2="420" y2={178 + offset}
            strokeWidth={+(0.55 + (i % 3) * 0.28).toFixed(2)}
            opacity={+(0.1 + (i % 3) * 0.035).toFixed(3)}
          />
          <line x1="-20" y1={418 + offset} x2="420" y2={166 + offset} strokeWidth="0.45" opacity="0.07" />
        </g>
      ))}
      <Echo x={318} y={92} scale={0.24} />
    </Motif>
  );
}

const VARIANTS = {
  certificate: CertificateTexture,
  blueprint: BlueprintTexture,
  signature: SignatureTexture,
  seal: SealTexture,

  // Service practice areas — see the block above.
  cadence: CadenceTexture,
  strata: StrataTexture,
  frame: FrameTexture,
  emboss: EmbossTexture,
  column: ColumnTexture,
  ascent: AscentTexture,
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
 * @param variant  one of the keys in VARIANTS (four DSC motifs plus six
 *                 service practice-area motifs). An
 *                 unknown or missing variant renders NOTHING rather than
 *                 throwing, so a nav.js column added without a matching
 *                 variant degrades to an untextured section.
 * @param id       Unique per mounted instance — see the warning above.
 * @param placement `default` (top-right) or `left`. `PageHero` passes
 *                 `left` whenever it renders an `aside`, because the panel
 *                 would otherwise cover the composition.
 * @param tone     `light` (default) for canvas surfaces, `dark` for ink ones.
 *                 `Section` derives it from its own surface and `PageHero`
 *                 always passes `dark`, so no call site sets it by hand.
 */
export function SurfaceTexture({ variant, id, tone = "light", placement = "default", className }) {
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
        {/* Only the six service motifs read `svgClass`; the four DSC
            variants ignore it and keep their hand-tuned positions. */}
        <Variant id={id} svgClass={PLACEMENT[placement] ?? PLACEMENT.default} />
      </motion.div>
    </div>
  );
}
