import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Container } from "@/components/layout/Container";
import { ArcRings } from "@/components/ui/ArcRings";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 6 — CONTENT-PLAN.md §6 row 6, DESIGN.md §11.5 + Pattern D
// (§9.2). Dark surface. Four steps, emphasising written scope before work
// starts — that line stays verbatim, it's the one commitment on this page
// that costs nothing to promise and matters most to a first-time client.
const steps = [
  {
    title: "Tell us what you need",
    body: "A quick call or WhatsApp message about what you're trying to get done.",
  },
  {
    title: "We scope it and quote in writing",
    body: "No verbal estimate that changes later — you get a written scope before anything starts.",
  },
  {
    title: "We file and keep you posted",
    body: "Progress updates as it moves, not silence until it's done.",
  },
  {
    title: "You get confirmation and records",
    body: "Filed acknowledgements and copies for your own records, every time.",
  },
];

// Quadratic bézier P0(60,90) P1(500,10) P2(940,90), sampled at t = 0, 1/3,
// 2/3, 1 so each node's centre lies exactly ON the drawn path rather than
// merely near it — B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2.
const ARC_PATH = "M60,90 Q500,10 940,90";
const NODES = [
  { x: 60, y: 90 },
  { x: 353, y: 54 },
  { x: 647, y: 54 },
  { x: 940, y: 90 },
];
const VIEW_W = 1000;
const VIEW_H = 160;

// Two rings, both below WhatWeDo's — see the note at the <ArcRings> call.
const ARC_RINGS = [
  { r: 168, width: 14, opacity: 0.04 },
  { r: 132, width: 11, opacity: 0.07 },
];

export function HowWeWork() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.7"],
  });

  return (
    <section
      ref={sectionRef}
      data-surface="dark"
      // `surface-ambient` supplies §7.2's radial; bg-ink-900 stays as the
      // fallback colour beneath it.
      className="section-pad grain surface-ambient relative isolate bg-ink-900"
    >
      {/* Quieter than WhatWeDo's ladder and only two rings: this section
          already owns a prominent ember arc as its FUNCTIONAL element (the
          scroll-linked progress connector), and a second ember arc system at
          equal weight would make the two compete for the same reading.
          Anchored bottom-left, well clear of the connector's band. */}
      <ArcRings
        rings={ARC_RINGS}
        gradientId="howwework-arc-fade"
        svgClassName="-left-24 -bottom-36 h-[320px] w-[320px] md:-left-40 md:-bottom-48 md:h-[620px] md:w-[620px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="How we work"
          heading="Four steps, and a written scope before we touch anything"
          headingClassName="max-w-[28ch]"
          dark
        />

        {/* Desktop/tablet — the real arc-draw-on-scroll (Pattern D).
            aspect-ratio keeps the SVG's coordinate space matching the
            absolutely-positioned HTML node overlay below it 1:1 at any
            width, so the two never drift apart on resize. */}
        <div
          className="relative mt-16 hidden md:block"
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d={ARC_PATH}
              fill="none"
              stroke="var(--color-ink-700)"
              strokeWidth="2"
            />
            <motion.path
              d={ARC_PATH}
              fill="none"
              stroke="var(--color-ember-400)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : scrollYProgress }}
            />
          </svg>

          {NODES.map((node, index) => (
            <div
              key={steps[index].title}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
              style={{ left: `${(node.x / VIEW_W) * 100}%`, top: `${(node.y / VIEW_H) * 100}%` }}
            >
              <StepNode index={index} progress={scrollYProgress} reduceMotion={reduceMotion} />
            </div>
          ))}

          {/* Labels sit in their own row below the arc's bounding box,
              rather than crowding directly under each node, since the two
              middle nodes sit noticeably higher than the two end nodes. */}
          <div className="absolute inset-x-0 top-full mt-6 grid grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.title}>
                <h3 className="text-h4 text-canvas">{step.title}</h3>
                <p className="mt-1.5 text-body-sm text-ink-300">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — a vertical connector rather than a literal vertical ARC.
            DESIGN.md §11.5 asks for the arc to "collapse to a vertical arc
            on mobile"; a straight vertical line keeps the same draw-on-scroll
            mechanic and reads just as clearly as a connector at this width,
            without a second curve-sampling exercise for a shape nobody will
            compare side-by-side with the desktop version. */}
        <div className="relative mt-12 md:hidden">
          <svg
            viewBox="0 0 40 400"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-full w-10"
            aria-hidden="true"
          >
            <line x1="20" y1="20" x2="20" y2="380" stroke="var(--color-ink-700)" strokeWidth="2" />
            <motion.line
              x1="20"
              y1="20"
              x2="20"
              y2="380"
              stroke="var(--color-ember-400)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : scrollYProgress }}
            />
          </svg>

          <ol className="space-y-10 pl-14">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ember-400 bg-ink-900 font-mono text-body-sm text-ember-300"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="text-h4 text-canvas">{step.title}</h3>
                <p className="mt-1.5 text-body-sm text-ink-300">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/**
 * A 40px ember-ringed circle that pops with a spring once the arc has drawn
 * far enough to reach it (DESIGN.md §9.4: "step nodes pop with spring as the
 * arc reaches each"). `threshold` mirrors each node's position along the
 * bézier's t parameter (0, 1/3, 2/3, 1) — the same parameter the arc's own
 * pathLength is drawing against, so a node visibly pops right as the ember
 * stroke reaches it, not before or after.
 */
function StepNode({ index, progress, reduceMotion }) {
  const threshold = index / (NODES.length - 1);
  const active = useTransform(
    progress,
    [Math.max(threshold - 0.03, 0), threshold],
    [0, 1],
  );
  const scale = reduceMotion ? 1 : active;
  const opacity = reduceMotion ? 1 : active;

  return (
    <motion.span
      style={{ scale, opacity }}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ember-400 bg-ink-900 font-mono text-body-sm text-ember-300"
    >
      {index + 1}
    </motion.span>
  );
}
