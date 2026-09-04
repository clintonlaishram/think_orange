import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";

// THE STEP / PROCESS TREATMENT — one component, every "how it works" section.
//
// 19-08-2026, Clinton: "in all step section i want to make a premium step
// section like HowWeWork component, with scrolling effect." Before this, three
// sections (T2's How it works, T4's How to get it, T5's Installation) each
// hand-rolled the same static `border-l` list with a numbered circle, while the
// homepage's HowWeWork had the real scroll-linked treatment. This generalises
// that treatment; HowWeWork itself is untouched and stays the reference.
//
// WHY VERTICAL, NOT HowWeWork's HORIZONTAL ARC. That arc samples a quadratic
// bézier at exactly four points and pairs each with a one-line label in a
// 4-column row. These sections carry 3–6 steps whose bodies run to a full
// sentence plus a duration — at six columns that is a ~280px track per step
// even on the 1800px container. So this uses the mechanic from HowWeWork's own
// MOBILE variant (vertical connector, draw-on-scroll, nodes popping as the
// line reaches them), which is the same idea in a shape that survives the
// content. Same feel, same tokens, no truncation.
//
// THE PROGRESS LINE IS A `scaleY` TRANSFORM, NOT an SVG `pathLength`.
// pathLength animates stroke geometry, which is a PAINT property; a transform
// is composited. Same visual, no repaint per frame — the same reasoning that
// put the dark-card hover ring on opacity rather than a growing box-shadow.
//
// NODE THRESHOLDS ARE MEASURED FROM THE DOM, NOT ASSUMED TO BE EVENLY SPACED.
// An even i/(n-1) split is only correct when every step is the same height,
// and these steps are not — one has a two-line body and a duration, the next
// has one line. With an assumed split a node pops visibly before or after the
// line actually reaches it, which is exactly the tell that makes a scroll
// effect look fake. Each node's real centre is measured on layout and on
// resize, and its threshold is its fraction of the line's own span.
// useLayoutEffect warns on the server (Phase 9 prerenders every route through
// renderToString), and there is nothing to measure there anyway — no layout
// exists. Layout effect in the browser so the line is positioned before paint,
// plain effect on the server so React stays quiet.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function StepFlow({
  eyebrow,
  heading,
  intro,
  steps,
  surface = "dark",
  className,
}) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [thresholds, setThresholds] = useState(() =>
    steps.map((_, i) => i / Math.max(steps.length - 1, 1)),
  );
  const [line, setLine] = useState({ top: 0, height: 0 });
  const reduceMotion = useReducedMotion();

  // Measured after layout, and again on resize — a reflow (font swap, a
  // wrapping title at a new width) moves every node.
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const nodes = nodeRefs.current.filter(Boolean);
      if (nodes.length === 0) return;
      const base = container.getBoundingClientRect().top;
      const centres = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top - base + rect.height / 2;
      });
      const first = centres[0];
      const last = centres[centres.length - 1];
      const span = Math.max(last - first, 1);
      setLine({ top: first, height: last - first });
      setThresholds(centres.map((c) => (c - first) / span));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    nodeRefs.current.filter(Boolean).forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps]);

  // Starts drawing once the list is well into view and completes before its
  // last step leaves — so the line is never still filling when the section is
  // already scrolling away.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.65"],
  });

  const dark = surface === "dark";

  return (
    <Container>
      <div
        className={cn(
          "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16",
          className,
        )}
      >
        {/* Same 4/8 rail as FaqSection, and for the same reason: a step list is
            a narrow measure (62ch), so heading-above-list left the whole right
            half of the 1800px container empty. Sticky, so the heading and the
            step count stay with the list while the reader is inside it — which
            on a 6-step leaf is most of a screen. */}
        <div className="lg:col-span-4">
          {/* ⛔ DO NOT CHANGE THIS OFFSET — `lg:sticky
              lg:top-[calc(var(--header-h)+52px)]` is FIXED BY INSTRUCTION
              (Clinton, 04-09-2026: "StepFlow in this component, keep
              'lg:sticky lg:top-[calc(var(--header-h)+52px)]' do not change in
              next update"). It was +32px and he set it to +52px himself.

              `FaqSection` was then moved to match it ("apply the same +52px
              to FaqSection rail"), so ALL THREE sticky rails — this one,
              `FaqSection` and `DscFinder` — now carry the same value, and a
              future difference between them is drift rather than a decision.

              The clearance exists because a rail sits under the fixed header
              AND, on T2/T4 pages, under that page's own sticky sub-nav; at
              +32px the eyebrow parked beneath that bar.

              ⚠️ It must stay a `calc()` off `--header-h`, never a literal
              `lg:top-*` step — the header height is a token and a hard number
              here would drift the moment it changes. */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+52px)]">
            <SectionHeading
              eyebrow={eyebrow}
              heading={heading}
              lede={intro}
              dark={dark}
              headingClassName="max-w-[18ch]"
              ledeClassName="max-w-[42ch] text-body sm:text-body"
              reveal={false}
            />
          </div>
        </div>

        <div ref={containerRef} className="relative lg:col-span-8">
          {/* Track and progress line. Both are decorative — the <ol> below carries
          the real semantics. */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-4 w-px md:left-5",
              dark ? "bg-ink-700" : "bg-ink-200",
            )}
            style={{ top: line.top, height: line.height }}
          />
          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute left-4 w-px origin-top md:left-5",
              dark ? "bg-ember-400" : "bg-ember-500",
            )}
            style={{
              top: line.top,
              height: line.height,
              scaleY: reduceMotion ? 1 : scrollYProgress,
            }}
          />

          <ol className="space-y-10 md:space-y-12">
            {steps.map((step, index) => (
              <Step
                key={step.step ?? index}
                step={step}
                index={index}
                threshold={thresholds[index] ?? 0}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
                dark={dark}
                nodeRef={(el) => {
                  nodeRefs.current[index] = el;
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </Container>
  );
}

function Step({
  step,
  index,
  threshold,
  progress,
  reduceMotion,
  dark,
  nodeRef,
}) {
  // The node reacts across a short band ENDING at its own threshold, so it is
  // fully lit exactly as the line arrives rather than a scroll-beat later.
  const active = useTransform(
    progress,
    [Math.max(threshold - 0.06, 0), threshold],
    [0, 1],
  );
  // Spring on the scale only: DESIGN.md §9.4 asks the nodes to "pop", and a
  // linear ramp reads as a dimmer rather than a pop. Opacity stays linear —
  // a springy opacity overshoots into a flicker.
  const scale = useSpring(useTransform(active, [0, 1], [0.72, 1]), {
    stiffness: 320,
    damping: 26,
    mass: 0.6,
  });
  // ⚠️ BODY COPY IS NEVER DIMMED, and that is a measured decision rather than
  // a stylistic one. The first version faded un-reached steps to 0.55 opacity;
  // composited against ink-900 that puts ink-300 body copy at **2.43:1**, far
  // under the 4.5:1 AA floor Phase 10's audit holds the whole site to, and even
  // 0.8 only reaches 3.79:1. Text a reader can scroll to is text that must pass
  // at rest. So the scroll effect lives entirely in the line and the nodes —
  // both decorative, both aria-hidden — and every word stays at full contrast
  // from first paint. Do not reintroduce a text fade here.
  //
  // The node itself never fades to zero either: it rests at 0.3 and lifts to 1.
  // At zero, a step whose line has not reached it renders as body copy with a
  // hole where its number should be, which reads as a loading failure if a
  // reader lands mid-section from an anchor link.
  const nodeOpacity = useTransform(active, [0, 1], [0.3, 1]);

  const staticStyle = { scale: 1, opacity: 1 };

  return (
    <li className="relative flex gap-5 md:gap-7">
      <motion.span
        ref={nodeRef}
        aria-hidden="true"
        style={reduceMotion ? staticStyle : { scale, opacity: nodeOpacity }}
        className={cn(
          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ember-400 font-mono text-body-sm md:h-10 md:w-10",
          dark
            ? "bg-ink-900 text-ember-300"
            : "border-ember-500 bg-white text-ember-600",
        )}
      >
        {step.step ?? index + 1}
      </motion.span>

      <div className="pt-1 md:pt-1.5">
        <h3 className={cn("text-h4", dark ? "text-canvas" : "text-ink-600")}>
          {step.title}
        </h3>
        <p
          className={cn(
            "mt-1.5 max-w-[62ch] text-body-sm",
            dark ? "text-ink-300" : "text-ink-500",
          )}
        >
          {step.desc}
        </p>
        {step.duration && (
          // NOT a bordered pill. A rounded-full bordered element sitting beside
          // body copy reads as a button, and this is a duration — several steps
          // render turnaround.js's "Confirm with us" fallback, which as a pill
          // looks like a call to action that does nothing when clicked. A
          // hairline rule plus mono keeps it as the ledger annotation it is.
          <p
            className={cn(
              "mt-3 flex items-center gap-2.5 font-mono text-body-sm",
              dark ? "text-ember-300" : "text-ember-600",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-6 shrink-0",
                dark ? "bg-ink-700" : "bg-ink-200",
              )}
            />
            {step.duration}
          </p>
        )}
      </div>
    </li>
  );
}
