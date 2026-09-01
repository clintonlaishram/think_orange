import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Badge,
  Building2,
  Check,
  FileText,
  Gavel,
  Globe,
  Package,
  Receipt,
  RefreshCw,
  Ship,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { finderUses, finderCapacities } from "@/content/dsc/finder";
import { certificateVariant } from "@/content/dsc/certificates";
import { findBySlug, dscResourcesPage, dscResourceSectionIds } from "@/content/nav";
import { t } from "@/content/turnaround";
import { dscEnquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// THE DSC FINDER — two questions, one answer.
//
// ⛔ 02-09-2026. This is the mechanism that lets /dsc replace five certificate
// pages rather than concatenate them, and — after Clinton's "keep it minimal"
// note the same day — it is now the page's centrepiece rather than one section
// among thirteen. A reader names the portal they are dealing with, which they
// always know, and only where it genuinely changes the answer, whose name the
// certificate is in. Structure is from ThinkOrange_DSC_Hub_V7.html's finder;
// the step rail and progressive disclosure are from
// ThinkOrange_DSC_Resources_V1.html's wizard. The design is this site's.
//
// ⚠️ THE RESULT IS RENDERED ON DEMAND, NOT PRERENDERED. Nothing on this page
// is reachable ONLY through the finder: /dsc's certificates section lists all
// five certificates, and the Resources page carries every checklist, the
// portal guide and the FAQs as ordinary visible content. The finder is a
// shortcut into material that exists elsewhere, so a reader with no
// JavaScript still gets the whole answer. If that ever stops being true, the
// results have to be rendered statically instead.
//
// ⚠️ NO URL HASH SYNC, deliberately. V7 pushes `#dsc/gst/org` as you answer.
// Here the hash is already spoken for: the sub-nav, the footer's DSC column
// and every retired-URL redirect address sections of these two pages by hash,
// and `RootLayout` scrolls on pathname change. A finder that wrote the hash
// would fight all three.

// Content names an icon; the component owns which glyph that is. Keeps
// `finder.js` a plain-data file the Node scripts can read — the same
// separation `content/dsc/icons.js` documents for itself.
const ICONS = {
  receipt: Receipt,
  building: Building2,
  file: FileText,
  gavel: Gavel,
  ship: Ship,
  package: Package,
  users: Users,
  badge: Badge,
  refresh: RefreshCw,
  globe: Globe,
};

// Never returns undefined: `<undefined />` is a hard React crash, not a blank.
// Same discipline as `dscIcon()`.
const finderIcon = (key) => ICONS[key] ?? ShieldCheck;

const EASE = [0.22, 1, 0.36, 1];

export function DscFinder() {
  const [use, setUse] = useState(null);
  const [capacity, setCapacity] = useState(null);
  // Direction drives which way a panel slides: forward when answering,
  // backward on Start over. Without it, going back animates like going
  // forward and the gesture contradicts what happened.
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  // Focus moves to the panel when it changes. Without it a keyboard or
  // screen-reader user presses "GST portal" and nothing announces — the page
  // has changed several hundred pixels below where their focus still sits.
  const panelRef = useRef(null);

  const activeUse = use ? finderUses.find((u) => u.key === use) : null;
  const askingCapacity = activeUse?.capacity === "ask" && !capacity;

  const result = (() => {
    if (!activeUse) return null;
    if (activeUse.capacity === "none") return activeUse.result;
    const key = activeUse.capacity === "ask" ? capacity : activeUse.capacity;
    return key ? activeUse.results?.[key] : null;
  })();

  const step = result ? "result" : askingCapacity ? "capacity" : "uses";
  const stepIndex = step === "uses" ? 0 : step === "capacity" ? 1 : 2;

  function advance(fn) {
    setDirection(1);
    fn();
    requestAnimationFrame(() => panelRef.current?.focus());
  }

  function reset() {
    setDirection(-1);
    setUse(null);
    setCapacity(null);
    requestAnimationFrame(() => panelRef.current?.focus());
  }

  // One transition for the whole panel: a short directional slide plus a fade.
  // Anything larger reads as the page moving rather than the answer arriving.
  // `mode="wait"` so the outgoing panel is gone before the incoming one
  // measures — these panels are very different heights, and cross-fading them
  // makes the section jump.
  const panelMotion = reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, x: direction * 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -16 },
        transition: { duration: 0.28, ease: EASE },
      };

  // Choice cards cascade in. 40ms is deliberately below the 60ms Stagger uses
  // elsewhere: ten cards at 60ms is 540ms of the reader waiting to be able to
  // choose, which is lag on a control, not polish.
  const cardMotion = (index) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.32, ease: EASE, delay: 0.04 + index * 0.04 },
        };

  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Same 4/8 sticky rail as FaqSection and StepFlow, and for the same
            reason: the panel is a narrow measure, and heading-above-panel left
            the right half of the 1800px container empty. */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <SectionHeading
              eyebrow="Find your certificate"
              heading="Which DSC do you need?"
              lede="Two questions. Buying the wrong certificate is the most common and most expensive mistake in this process."
              headingClassName="max-w-[18ch]"
              ledeClassName="max-w-[42ch] text-body sm:text-body"
            />
            <StepRail current={stepIndex} asksCapacity={activeUse?.capacity === "ask"} />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div
            ref={panelRef}
            tabIndex={-1}
            // Politely announced, not assertively: the reader pressed a button
            // and is expecting this, so it should not interrupt them.
            aria-live="polite"
            className="scroll-mt-32 focus:outline-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              {step === "uses" && (
                <motion.ul
                  key="uses"
                  {...panelMotion}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {finderUses.map((item, index) => {
                    const Icon = finderIcon(item.icon);
                    return (
                      <motion.li key={item.key} {...cardMotion(index)}>
                        <ChoiceCard
                          icon={Icon}
                          label={item.label}
                          desc={item.desc}
                          onClick={() => advance(() => setUse(item.key))}
                        />
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}

              {step === "capacity" && (
                <motion.div key="capacity" {...panelMotion}>
                  <BackButton onClick={reset} />
                  <h3 className="mt-5 text-h3 text-ink-600">
                    Whose name will the certificate be in?
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-body text-ink-500">
                    For {activeUse.label}. A certificate always belongs to a named person — what
                    matters is whether they sign personally or on behalf of an entity.
                  </p>
                  <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {finderCapacities.map((option, index) => (
                      <motion.li key={option.key} {...cardMotion(index)}>
                        <ChoiceCard
                          label={option.label}
                          desc={option.desc}
                          onClick={() => advance(() => setCapacity(option.key))}
                        />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {step === "result" && (
                <motion.div key="result" {...panelMotion}>
                  <FinderResult
                    result={result}
                    use={activeUse}
                    onReset={reset}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Container>
  );
}

/**
 * The progress rail, from the Resources reference's wizard.
 *
 * ⚠️ It shows TWO steps for a portal that settles the capacity question itself
 * (MCA, EPFO, ICEGATE, trademark, renewal, foreign) and three for one that
 * asks. Showing a fixed "Step 1 of 3" and then skipping step two is the kind
 * of small lie that makes a wizard feel broken — the rail has to describe the
 * path this reader is actually on.
 */
function StepRail({ current, asksCapacity }) {
  const steps = asksCapacity
    ? ["What for", "Whose name", "Your certificate"]
    : ["What for", "Your certificate"];
  // With two steps, the result is index 2 in the state machine but index 1 here.
  const active = asksCapacity ? current : Math.min(current, 1);

  return (
    <ol className="mt-8 space-y-3">
      {steps.map((label, index) => {
        const done = index < active;
        const isCurrent = index === active;
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-body-sm tabular-nums transition-colors duration-[var(--dur-base)]",
                done && "border-ember-500 bg-ember-500 text-canvas",
                isCurrent && "border-ember-500 text-ember-600",
                !done && !isCurrent && "border-ink-200 text-ink-400"
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <span
              className={cn(
                "text-body-sm transition-colors duration-[var(--dur-base)]",
                isCurrent ? "text-ink-600" : done ? "text-ink-500" : "text-ink-400"
              )}
            >
              {label}
            </span>
            {isCurrent && <span className="sr-only">(current step)</span>}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * One choice. `.card-dark` is the same class `<Card surface="dark">` uses, so
 * the hover ring, lift and corner-arc draw come from one definition in
 * theme.css. Its `:active` press feedback is scoped to `:is(a, button)` — this
 * is a real button, so it gets it, which is the only feedback a touch user
 * gets since the hover states are behind `@media (hover: hover)`.
 *
 * Deliberately NO corner arc glyph on hover (Clinton, 02-09-2026): the lift,
 * the border swap and the arrow already complete the feedback, and a fourth
 * signal on a card whose whole job is "pick one" read as noise. The trailing
 * arrow is the hover affordance here.
 */
function ChoiceCard({ icon: Icon, label, desc, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      // `.card-premium` is the light-surface card wash the DSC and services
      // cards already use. Its own press feedback is selected through
      // `a:active > .card-premium` — this is a BUTTON, not a link wrapping a
      // card, so that rule can never fire here and the `active:` utilities
      // below supply it instead. Deliberately not hover-gated: Tailwind v4
      // wraps every `hover:` in `@media (hover: hover)`, so without these a
      // touch user gets nothing back from a tap.
      className="card-premium group relative flex h-full w-full items-start gap-4 rounded-[var(--radius-md)] border border-ink-100 bg-white p-5 text-left shadow-sm transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-ember-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.99] lg:rounded-[var(--radius-lg)]"
    >
      {Icon && (
        // Filled disc on a light surface, ringed on dark — the established
        // pairing. A ring plus a tint on white is two treatments doing one job.
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-50">
          <Icon className="h-4.5 w-4.5 text-ember-600" strokeWidth={1.5} aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-h4 text-ink-600 transition-colors group-hover:text-ember-600">
          {label}
        </span>
        <span className="mt-1 block text-body-sm text-ink-400">{desc}</span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-[transform,color] duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:text-ember-600"
        strokeWidth={2}
      />
    </button>
  );
}

function BackButton({ onClick, onDark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-sm text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
        // The result panel is dark; the capacity question sits on the light
        // section. Same control, two surfaces, so the tone is passed rather
        // than assumed — ink-400 on ink is 2.63:1 and would be near-invisible.
        onDark
          ? "text-ink-300 hover:text-ember-200 focus-visible:ring-offset-ink-950"
          : "text-ink-400 hover:text-ember-600"
      )}
    >
      <ArrowLeft
        className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      Start over
    </button>
  );
}

/**
 * The answer.
 *
 * ⚠️ SELECTS BY REFERENCE. The certificate's label, validity options,
 * verification note and document checklist are resolved out of
 * `certificates.js` at render time from the result's `certificate` key — they
 * are NOT restated in `finder.js`. Copying them there would fork the
 * checklist, and a correction to a certificate would leave the finder
 * confidently showing the superseded version. The only strings a result owns
 * are the ones specific to that portal: why this certificate, and the one
 * thing worth knowing about that portal.
 *
 * The foreign-national route is the single exception and carries its own
 * `documents`, because it is a verification ROUTE rather than one of the five
 * certificates — there is nothing to resolve it against.
 */
function FinderResult({ result, use, onReset, reduceMotion }) {
  const variant = result.certificate ? certificateVariant(result.certificate) : null;
  const heading = result.heading ?? variant?.label ?? use.label;
  const documents = result.documents ?? variant?.documents ?? [];
  const related = result.link ? findBySlug(result.link.slug) : null;

  // The answer's own internal cascade, so it assembles rather than appearing
  // as one slab. Short, and only after the panel itself has landed.
  const beat = (index) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE, delay: 0.1 + index * 0.07 },
        };

  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-9"
    >
      <div className="relative">
        <BackButton onClick={onReset} onDark />

        <motion.p
          {...beat(0)}
          className="mt-5 font-mono text-body-sm uppercase tracking-[0.14em] text-ember-300"
        >
          For {use.label}
        </motion.p>
        <motion.h3 {...beat(1)} className="mt-2 text-h2 text-canvas">
          {heading}
        </motion.h3>
        <motion.p {...beat(2)} className="mt-4 max-w-[64ch] text-body-lg text-ink-100">
          {result.why}
        </motion.p>

        {/* A hairline spec row, not pills — a pill beside body copy reads as a
            button, and there are real buttons at the foot of this panel.
            ⚠️ EVERY VALUE IS DERIVED OR ALREADY ASSERTED: the validity options
            come from the certificate, "On request" is the fees: null
            discipline, and the timing comes from turnaround.js rather than
            being typed in. V7's own result card carries "₹[X]" and "[X hrs]"
            placeholders; neither was carried over, because neither is a fact. */}
        <motion.dl
          {...beat(3)}
          className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-ink-700 bg-ink-700 sm:grid-cols-3"
        >
          <SpecCell label="Professional fees" value="On request" />
          <SpecCell label="Issued in" value={t("dscIssuanceTurnaround")} />
          <SpecCell
            label="Validity"
            value={variant?.validityOptions?.join(" · ") ?? "Confirm with us"}
          />
        </motion.dl>

        <motion.div {...beat(4)} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h4 className="text-h4 text-canvas">What to keep ready</h4>
            <ul className="mt-4 space-y-3">
              {documents.map((item, index) => (
                <li key={index} className="flex gap-3 text-body-sm text-ink-100">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-ember-300"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-h4 text-canvas">Worth knowing</h4>
            <p className="mt-4 text-body-sm text-ink-100">{result.note}</p>
            {variant?.verificationNote && (
              <p className="mt-3 text-body-sm text-ink-200">{variant.verificationNote}</p>
            )}
            <div className="mt-4 flex flex-col gap-2">
              {related && (
                <PanelLink to={related.path} label={result.link.label} />
              )}
              <PanelLink
                to={`${dscResourcesPage.path}#${dscResourceSectionIds.documents}`}
                label="Full document checklists"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          {...beat(5)}
          className="mt-9 flex flex-wrap gap-3 border-t border-ink-700 pt-7"
        >
          <Button
            as="a"
            href={dscEnquiryHref(`${heading} for ${use.label}`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Apply on WhatsApp
          </Button>
          <Button as="button" type="button" variant="secondary" tone="dark" onClick={onReset}>
            Check something else
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function PanelLink({ to, label }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-200 transition-colors hover:text-ember-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      {label}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function SpecCell({ label, value }) {
  return (
    <div className="bg-ink-900 px-5 py-4">
      <dt className="font-mono text-body-sm uppercase tracking-[0.1em] text-ink-300">{label}</dt>
      <dd className="mt-1 text-h4 text-canvas">{value}</dd>
    </div>
  );
}
