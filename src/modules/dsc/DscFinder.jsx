import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Gavel,
  Globe,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  finderAltLinks,
  finderAnswer,
  finderSigners,
  finderUse,
  finderUses,
} from "@/content/dsc/finder";
import {
  certificateVariant,
  documentsFor,
  kycRoute,
  kycRoutes,
} from "@/content/dsc/certificates";
import {
  dscDriversPage,
  dscFaqSectionIds,
  dscFaqsPage,
  findBySlug,
} from "@/content/nav";
import { t } from "@/content/turnaround";
import { dscEnquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// THE DSC FINDER — what for, who signs, your certificate.
//
// ⛔ REBUILT 03-09-2026 against Clinton's `dsc-finder-preview.html`. Its data
// model, its step labels and its copy are in `content/dsc/finder.js`, with the
// one content conflict this raised recorded at the top of that file. What is
// here is the behaviour and this site's design; none of the reference's own
// styling was carried over.
//
// What the reference added that the previous version did not have, in order of
// how much it matters:
//
//  1. **A VERIFICATION-ROUTE TOGGLE on the document checklist.** Aadhaar eKYC
//     and PAN-based need genuinely different documents, and every checklist on
//     this site previously assumed Aadhaar while also listing a photograph —
//     wrong on both routes at once. See `kycRoutes` in certificates.js.
//  2. A document COUNT, so the reader can judge the effort before reading.
//  3. Per-route document notes (the foreign route's scan and translation
//     rules), which have nowhere else to live.
//  4. Escape hatches under question one, for a reader who is renewing, chasing
//     a driver, or does not recognise any of the three purposes.
//
// ⚠️ THE RESULT IS RENDERED ON DEMAND, NOT PRERENDERED, and that stays safe
// only while nothing is reachable ONLY through the finder. /dsc's documents
// section carries every checklist and the portal guide as ordinary visible
// content, and the Buy Token page carries the drivers and renewal material. If
// that stops being true, these results have to be rendered statically instead.
//
// ⚠️ NO URL HASH SYNC, deliberately. The reference pushes `#dsc/gst/org` as you
// answer; here the hash is already spoken for by the sub-nav, the footer's DSC
// column and every retired-URL redirect, and `RootLayout` scrolls on it.

// Content names an icon; the component owns which glyph that is, so
// `finder.js` stays a plain-data file the Node scripts can read. Never index
// this directly — `<undefined />` is a hard React crash, not a blank.
const ICONS = { file: FileText, gavel: Gavel, ship: Ship, globe: Globe };
const finderIcon = (key) => ICONS[key] ?? ShieldCheck;

const EASE = [0.22, 1, 0.36, 1];

export function DscFinder() {
  const [useKey, setUseKey] = useState(null);
  const [signer, setSigner] = useState(null);
  // Which way a panel slides: forward when answering, backward on Start over.
  // Without it, going back animates like going forward and the gesture
  // contradicts what just happened.
  const [direction, setDirection] = useState(1);
  const [kyc, setKyc] = useState(kycRoutes[0].key);
  const reduceMotion = useReducedMotion();

  // Focus moves to the panel when it changes, or a keyboard or screen-reader
  // user presses a card and nothing announces — the page has changed several
  // hundred pixels below where their focus still sits.
  const panelRef = useRef(null);

  const activeUse = useKey ? finderUse(useKey) : null;
  const skips = Boolean(activeUse?.skipsSigner);
  const signerKey = skips ? "any" : signer;
  const answer = activeUse && signerKey ? finderAnswer(activeUse.key, signerKey) : null;

  const step = answer ? "result" : activeUse ? "signer" : "uses";
  const stepIndex = step === "uses" ? 0 : step === "signer" ? 1 : 2;
  // ⚠️ SEEDED WITH THE CURRENT STEP, and it has to be declared after `step` for
  // that. `useRef(null)` would not match on the first run, so the scroll effect
  // below would fire on mount and move a reader who has not touched the finder.
  // A ref's argument is only read on the first render, so this is stable.
  const stepRef = useRef(step);

  // The verification route resets with the question, so a reader who went back
  // and chose a different purpose is not silently still on the PAN route they
  // picked for the previous answer.
  function advance(fn) {
    setDirection(1);
    fn();
  }

  function reset() {
    setDirection(-1);
    setUseKey(null);
    setSigner(null);
    setKyc(kycRoutes[0].key);
  }

  // ⛔ 03-09-2026 (Clinton): "in the phone or tab view optimise the focus and
  // auto scroll smooth to area where need to focus."
  //
  // This used to be a bare `panelRef.current.focus()`, and the bug is in what
  // the browser does with that: focus scrolls the MINIMUM amount to bring the
  // element into view, so for a tall element it aligns the BOTTOM edge. On a
  // phone the result panel is several screens high, so answering a question
  // landed the reader at the FOOT of their own answer — past the heading, the
  // spec row and the checklist. It only looked acceptable on a wide screen,
  // where the panel is a short column beside a sticky rail.
  //
  // So the scroll is now deliberate rather than incidental: `preventScroll`
  // takes the browser out of it, and the panel's TOP is placed just under the
  // fixed header and the sticky sub-nav.
  //
  // ⚠️ THE CLEARANCE IS READ OFF THE ELEMENT'S OWN `scroll-margin-top`, never
  // typed here. `scroll-mt-32` is already on that div for anchor navigation, so
  // reading it back means the keyboard path and this path cannot drift — and
  // changing the header or the sub-nav height is still a one-place edit.
  //
  // ⚠️ Runs on STEP change, not on `useKey`/`signer`, so "Start over" scrolls
  // back to the choices too — on a phone that used to leave the reader stranded
  // where the old answer's foot had been. `stepRef` seeds with the first step so
  // nothing fires on mount; the finder is above the fold on /dsc and moving a
  // reader who has not touched it would be its own bug.
  useEffect(() => {
    if (stepRef.current === step) return;
    stepRef.current = step;

    const node = panelRef.current;
    if (!node) return;
    node.focus({ preventScroll: true });

    const clearance = parseFloat(getComputedStyle(node).scrollMarginTop) || 0;

    // ⛔ ONE `scrollTo` IS NOT ENOUGH, and this is the whole reason for the
    // observer below. `AnimatePresence mode="wait"` means the step that is
    // LEAVING is still mounted when this runs, so the document is still as tall
    // as the old step — and the steps differ enormously (the result panel is
    // several screens on a phone; question two is a few hundred pixels). Scroll
    // to a target computed against the old height and the browser CLAMPS it to
    // whatever the document allows once the content shrinks. Measured on a
    // 390px viewport: the panel landed at top 671 instead of the 128 it asked
    // for, i.e. the reader was left short of their own answer — the same class
    // of failure this effect exists to fix.
    //
    // So the position is re-asserted as the panel resizes, until it settles or
    // the cap expires. The first pass still runs immediately, so the scroll
    // starts on the tap rather than after the transition.
    let cancelled = false;
    const settle = () => {
      if (cancelled) return;
      const top = node.getBoundingClientRect().top;
      // Already parked where it belongs — re-scrolling would be motion for its
      // own sake, and would restart the smooth animation every resize tick.
      if (Math.abs(top - clearance) <= 2) return;
      window.scrollTo({
        top: Math.max(0, window.scrollY + top - clearance),
        // Honours the same preference `html { scroll-behavior: smooth }` gives
        // up under §9.6's reduced-motion floor.
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    settle();

    // ⚠️ CAPPED, deliberately. Without the cap this would keep re-centring the
    // panel for as long as anything resized it — including a reader opening
    // something themselves — which is a page that fights you. 700ms comfortably
    // covers the 280ms exit plus the enter and one layout pass.
    const observer = new ResizeObserver(settle);
    observer.observe(node);
    const stop = window.setTimeout(() => {
      cancelled = true;
      observer.disconnect();
    }, 700);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(stop);
    };
  }, [step, reduceMotion]);

  // One transition for the whole panel: a short directional slide plus a fade.
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

  // 40ms, deliberately below the 60ms Stagger uses elsewhere: this is a
  // control, and waiting to be able to choose is lag rather than polish.
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
        {/* Same 4/8 sticky rail as FaqSection and StepFlow, for the same
            reason: the panel is a narrow measure, and heading-above-panel left
            the right half of the 1800px container empty. */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+52px)]">
            <SectionHeading
              eyebrow="Find your certificate"
              heading="Which DSC do you need?"
              lede="Two questions. Buying the wrong certificate is the most common and most expensive mistake in this process."
              headingClassName="max-w-[18ch]"
              ledeClassName="max-w-[42ch] text-body sm:text-body"
            />
            <StepRail current={stepIndex} asksSigner={!skips} />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div
            ref={panelRef}
            tabIndex={-1}
            // Politely announced, not assertively: the reader pressed a button
            // and is expecting this, so it must not interrupt them.
            aria-live="polite"
            className="scroll-mt-32 focus:outline-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              {step === "uses" && (
                <motion.div key="uses" {...panelMotion}>
                  <ul className="grid grid-cols-1 gap-3">
                    {finderUses.map((item, index) => (
                      <motion.li key={item.key} {...cardMotion(index)}>
                        <ChoiceCard
                          item={item}
                          icon={finderIcon(item.icon)}
                          onClick={() => advance(() => setUseKey(item.key))}
                        />
                      </motion.li>
                    ))}
                  </ul>

                  {/* ⛔ 03-09-2026 (Clinton): "remove this show as 4 card no
                      need to sperate." The foreign-national route used to sit
                      under a labelled rule ("Or, if the applicant is a foreign
                      national") as a separate card below this list. It is the
                      fourth card in the list above now — one `finderUses`
                      array, one map — so there is no second render path to
                      keep in step. Do not reinstate the divider. */}
                  <motion.ul
                    {...cardMotion(finderUses.length)}
                    className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink-100 pt-6"
                  >
                    {finderAltLinks.map((link) => (
                      <li key={link.key}>
                        <AltLink to={ALT_PATHS[link.key]} label={link.label} />
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}

              {step === "signer" && (
                <motion.div key="signer" {...panelMotion}>
                  <BackButton onClick={reset} />
                  <p className="mt-5 font-mono text-eyebrow uppercase tracking-[0.12em] text-ember-600">
                    {activeUse.label}
                  </p>
                  <h3 className="mt-2 text-h3 text-ink-600">Who signs on the portal?</h3>
                  <p className="mt-2 max-w-[62ch] text-body text-ink-500">
                    A certificate always belongs to a named person — what matters is whether they
                    sign personally or on behalf of an entity.
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-3">
                    {finderSigners.map((option, index) => (
                      <motion.li key={option.key} {...cardMotion(index)}>
                        <SignerChip
                          label={option.label}
                          onClick={() => advance(() => setSigner(option.key))}
                        />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {step === "result" && (
                <motion.div key="result" {...panelMotion}>
                  <FinderResult
                    answer={answer}
                    use={activeUse}
                    signerLabel={
                      skips
                        ? null
                        : finderSigners.find((option) => option.key === signer)?.label
                    }
                    kyc={kyc}
                    onKyc={setKyc}
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

// Built here rather than typed in `finder.js`, so a section id can never be
// spelled wrong in content — every one comes from nav.js. A fragment naming a
// section that does not exist scrolls nowhere and the link audit cannot catch
// it, which is the failure this repo has already shipped twice.
const ALT_PATHS = {
  // ⛔ 03-09-2026: both retargeted when Buy Token split into three pages.
  // Renewal is a section of the FAQ page now; drivers has a page of its own.
  renewal: `${dscFaqsPage.path}#${dscFaqSectionIds.renewal}`,
  drivers: dscDriversPage.path,
  contact: "/contact",
};

/**
 * The progress rail.
 *
 * ⚠️ It shows TWO steps for a route that settles the signer question itself
 * (statutory filings, foreign national) and three for one that asks. Showing a
 * fixed "Step 1 of 3" and then skipping step two is the kind of small lie that
 * makes a wizard feel broken — the rail describes the path this reader is
 * actually on.
 */
function StepRail({ current, asksSigner }) {
  const steps = asksSigner
    ? ["What for", "Who signs", "Your certificate"]
    : ["What for", "Your certificate"];
  // With two steps, the result is index 2 in the state machine but index 1 here.
  const active = asksSigner ? current : Math.min(current, 1);

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
 * One purpose. `.card-premium` is the light-surface card wash the DSC and
 * services cards already use. Its own press feedback is selected through
 * `a:active > .card-premium` — this is a BUTTON, not a link wrapping a card,
 * so that rule can never fire here and the `active:` utilities supply it
 * instead. Deliberately not hover-gated: Tailwind v4 wraps every `hover:` in
 * `@media (hover: hover)`, so without them a touch user gets nothing back.
 *
 * The `pill` names the certificate this route leads to, up front — the
 * reference's idea, and a good one: it lets a reader who already knows what
 * they need confirm it without answering anything.
 */
function ChoiceCard({ item, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card-premium group relative flex h-full w-full items-start gap-4 rounded-[var(--radius-md)] border border-ink-100 bg-white p-5 text-left shadow-sm transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-ember-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.99] sm:p-6 lg:rounded-[var(--radius-lg)]"
    >
      {/* Filled disc on a light surface, ringed on dark — the established
          pairing. A ring plus a tint on white is two treatments doing one job. */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-50">
        <Icon className="h-4.5 w-4.5 text-ember-600" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-h4 text-ink-600 transition-colors group-hover:text-ember-600">
          {item.label}
        </span>
        <span className="mt-1 block text-body-sm text-ink-400">{item.desc}</span>
        {item.pill && (
          <span className="mt-3 inline-block rounded-[var(--radius-sm)] bg-ember-50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ember-700">
            {item.pill}
          </span>
        )}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-[transform,color] duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:text-ember-600"
        strokeWidth={2}
      />
    </button>
  );
}

/** Question two's answers. Chips rather than cards: three short labels with no
 *  supporting line, where a card's box would be an empty frame. */
function SignerChip({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-ink-200 bg-white px-5 py-3 text-body-sm font-medium text-ink-600 shadow-sm transition-[color,border-color,transform] duration-[var(--dur-fast)] hover:border-ember-300 hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 active:scale-[0.98]"
    >
      {label}
    </button>
  );
}

function AltLink({ to, label }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 rounded-sm text-body-sm text-ink-500 underline-offset-4 transition-colors hover:text-ember-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
    >
      {label}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function BackButton({ onClick, onDark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-sm text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
        // The result panel is dark; question two sits on the light section.
        // Same control, two surfaces, so the tone is passed rather than
        // assumed — ink-400 on ink is 2.63:1 and would be near-invisible.
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
 * ⚠️ SELECTS BY REFERENCE. The validity options, the verification note and the
 * document checklist are resolved out of `certificates.js` from the answer's
 * `certificate` key — they are NOT restated in `finder.js`. The foreign route
 * is the single exception and carries its own `documents`, because a passport
 * route is not one of the five certificates and there is nothing to resolve
 * it against.
 */
function FinderResult({ answer, use, signerLabel, kyc, onKyc, onReset, reduceMotion }) {
  const variant = answer.certificate ? certificateVariant(answer.certificate) : null;
  const related = answer.link ? findBySlug(answer.link.slug) : null;

  // ⚠️ The route toggle is hidden, not disabled, where no second route exists
  // — a control with one option is a control that lies about being a choice.
  const noKyc = Boolean(use.noKyc) || Boolean(answer.documents);
  const documents = answer.documents ?? documentsFor(variant?.documentCore, kyc);
  const routeNote = noKyc ? null : kycRoute(kyc).note;

  // The answer's own internal cascade, so it assembles rather than arriving as
  // one slab. Short, and only after the panel itself has landed.
  const beat = (index) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE, delay: 0.1 + index * 0.07 },
        };

  return (
    // ⛔ 03-09-2026 (Clinton): "in finder make the last step light and do not
    // confine in card." The answer used to be a `.panel-dark` card — a dark
    // slab dropped on this light section, which is what gave it weight. There
    // is no card and no surface now, so the weight has to come from the light
    // idiom this site already uses on `WhoWeWorkWith` and `WhyThinkOrange`:
    // hairlines, the type scale, mono labels, generous whitespace, and ONE
    // ember element per block.
    //
    // ⚠️ EVERY COLOUR IN HERE HAD TO BE RE-TONED, not just the wrapper. The
    // surface system covers headings and `var(--surface-*)` accents — it does
    // NOT cover the plain `text-ink-*` / `text-canvas` utilities this panel is
    // built from, so leaving them would have put canvas text on canvas. Same
    // trap already recorded for `GroupHeading`, `Breadcrumbs` and
    // `DriverPanel`. `BackButton` and `PanelLink` are shared with the dark
    // steps and take a tone rather than assuming one.
    <div>
      <BackButton onClick={onReset} />

      <motion.p
        {...beat(0)}
        className="mt-5 font-mono text-body-sm uppercase tracking-[0.14em] text-ember-600"
      >
        {use.label}
        {signerLabel && <span className="text-ink-400"> · {signerLabel}</span>}
      </motion.p>
      <motion.h3 {...beat(1)} className="mt-2 max-w-[26ch] text-h2 text-ink-600">
        {answer.heading}
      </motion.h3>

      {/* The reference's facts list, as a hairline spec row rather than pills —
          a pill beside body copy reads as a button, and there are real buttons
          at the foot of this block.
          ⚠️ EVERY VALUE IS DERIVED OR ALREADY ASSERTED. Validity comes off the
          certificate, "On request" is the fees: null discipline, and the timing
          comes from turnaround.js. The reference's own result card carries
          "₹[X]" and "[X hrs]"; neither is a fact and neither was carried over. */}
      <motion.dl
        {...beat(2)}
        // ⚠️ SIX TRACKS, NOT TWO. Five cells in a 2-column grid leaves two empty
        // cells, which read as content that failed to load. A 6-track grid takes
        // the two long values at half width and the three short ones at a third,
        // so both rows fill exactly. Any cell added or removed here has to keep
        // the spans summing to a multiple of 6.
        //
        // ⚠️ HORIZONTAL RULES ONLY, and that is what lets the cells sit FLUSH
        // LEFT. A first cut drew a full hairline mesh (`gap-px` over
        // `bg-ink-100`), which needs horizontal padding on every cell so the
        // text does not touch a vertical rule — and a grid item cannot know
        // which row it is in, so `first:pl-0` clears the first cell of the GRID
        // only and row two's leading cell keeps its inset. The two rows then
        // disagree with each other and with the heading above. Dropping the
        // vertical rules removes the reason for the padding, so every cell can
        // be `pl-0` unconditionally and both columns line up with the h3 by
        // construction. Each cell draws its own `border-b`, which reads as one
        // continuous rule per row because the cells of a row tile the width.
        className="mt-9 grid grid-cols-1 border-t border-ink-200 sm:grid-cols-6"
      >
        <SpecCell label="In whose name" value={answer.name} span="sm:col-span-3" />
        <SpecCell label="Covers" value={answer.covers} span="sm:col-span-3" />
        <SpecCell
          label="Validity"
          value={variant?.validityOptions?.join(" · ") ?? "Confirm with us"}
          span="sm:col-span-2"
        />
        <SpecCell label="Professional fees" value="On request" span="sm:col-span-2" />
        <SpecCell label="Issued in" value={t("dscIssuanceTurnaround")} span="sm:col-span-2" />
      </motion.dl>

      <motion.div {...beat(3)}>
        <DocumentPanel
          documents={documents}
          notes={answer.documentNotes}
          noKyc={noKyc}
          kyc={kyc}
          onKyc={onKyc}
          routeNote={routeNote}
          verificationNote={variant?.verificationNote}
        />
      </motion.div>

      {/* ⛔ 03-09-2026 (Clinton): "remove warning note and buy token." The
          ember-tinted caution callout that sat here is gone, and with it the
          answer's last filled area — the block is now entirely hairlines and
          type.

          ⚠️ `answer.warn` IS STILL WRITTEN ON EVERY ANSWER in finder.js and is
          simply no longer rendered. Do NOT prune those strings as dead content:
          they are the one thing that goes wrong per route (encryption cannot be
          added to a signing-only certificate; the DGFT name must match the PAN
          database exactly), and restoring the callout is a render-only change.

          ⚠️ SIDE EFFECT WORTH KNOWING: the `filings` warn was the half of the
          unresolved portalGuide contradiction that this page actually rendered
          (see the ⛔⛔ block at the top of finder.js). With it unrendered, /dsc
          no longer asserts both sides — but the conflict itself is NOT settled,
          and restoring this callout brings it straight back. */}

      {/* beat(4), not beat(5): the warn callout that used to hold index 4 is
          gone, and leaving the hole would idle the cascade for one extra 70ms
          step before the only actions on the page appear.

          ⛔ 03-09-2026 (Clinton): "keep apply on whatsapp button right and
          green color." The related-service link leads, the button is pushed to
          the far edge by `ml-auto` — which also puts it right when there is NO
          related link, where `justify-between` alone would leave it on the
          left. */}
      <motion.div
        {...beat(4)}
        className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink-200 pt-8"
      >
        {/* ⛔ 03-09-2026: the "Buy the token" secondary button is gone on an
            earlier instruction the same day. /dsc/buy-token is still reachable
            from the nav panel, the footer's DSC column, and this page's own
            "Token drivers and downloads" alt link on step one. */}
        {related && <PanelLink to={related.path} label={answer.link.label} />}
        {/* ⚠️ `variant="tertiary"` IS the site's WhatsApp button — the same one
            ServiceLeaf's quote CTA and DscEsign already use — not a one-off
            green. Do not hand-roll `bg-whatsapp` here; that variant carries the
            contrast fixes recorded in Button.jsx.
            ⚠️ Its text is ink-950, NOT white: white on this green measures
            1.98:1. The brand-green exception itself is the one DESIGN.md §16
            already sanctions for a WhatsApp affordance. */}
        <Button
          as="a"
          href={dscEnquiryHref(`${answer.heading} for ${use.label}`)}
          target="_blank"
          rel="noopener noreferrer"
          variant="tertiary"
          className="ml-auto"
        >
          <IconBrandWhatsapp className="h-4.5 w-4.5" strokeWidth={1.5} aria-hidden="true" />
          Apply on WhatsApp
        </Button>
      </motion.div>
    </div>
  );
}

/**
 * THE DOCUMENT PANEL — "make it look premium step document showing section"
 * (Clinton, 03-09-2026).
 *
 * A nested surface inside the result panel rather than a bare list, because
 * this is the part a reader acts on: they read it, gather things, and come
 * back to it. It carries its own header with a live count, its own control,
 * and its own footer link to the full checklists.
 *
 * ⚠️ THE SEGMENTED CONTROL USES `aria-pressed`, NOT `role="radio"`. Radios
 * carry a keyboard contract — arrow keys move between them under a roving
 * tabindex, and Tab enters the group once — that these do not implement. A
 * `role="radiogroup"` whose members only respond to Tab and Enter is a worse
 * lie to a screen-reader user than two honest toggle buttons in a labelled
 * group, which still announce their pressed state. Same pattern `TokenOrder`
 * already uses for its platform and quantity options.
 *
 * ⚠️ Numbers are `tabular-nums`: the count changes as the route changes (3 on
 * Aadhaar, 4 on PAN for an individual), and proportional digits make the
 * header shift under the reader's eye when it does.
 */
function DocumentPanel({ documents, notes, noKyc, kyc, onKyc, routeNote, verificationNote }) {
  return (
    <section aria-label="What to have ready" className="mt-10 border-t border-ink-200 pt-7">
      {/* ⛔ 03-09-2026: was a mono uppercase label. It is a real heading — the
          reader stops here and starts gathering things — so it now reads as
          one: sans, `text-h4`, sentence case. `tabular-nums` stays on the
          count, which changes with the verification route (3 on Aadhaar, 4 on
          PAN for an individual); proportional digits make the row shift under
          the reader's eye when it does. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h4 className="text-h4 text-ink-600">What to have ready</h4>
        <p className="text-body-sm tabular-nums text-ink-400">
          {documents.length} document{documents.length === 1 ? "" : "s"}
        </p>
      </div>

      {!noKyc && <KycToggle value={kyc} onChange={onKyc} />}

      {/* Hairline-separated rows rather than a bulleted list: with no card
          around them the rules are what hold the checklist together as one
          object, and they also stop the two columns reading as one paragraph
          that happens to wrap. The tick is the block's single ember element. */}
      <ul className="mt-6 grid grid-cols-1 border-t border-ink-100 sm:grid-cols-2 sm:gap-x-12">
        {documents.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-b border-ink-100 py-3.5 text-body-sm leading-relaxed text-ink-500"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-ember-600"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* ⛔ 03-09-2026: these three ran together as undifferentiated grey
          paragraphs directly under the checklist — "it look confusion to read".
          They answer different questions, so each is now a labelled block on
          its own hairline: what the chosen route means, what the format rules
          are, and what to know before applying. A reader can skip the two that
          are not theirs. */}
      {routeNote && (
        <NoteBlock label="On this route">{routeNote}</NoteBlock>
      )}

      {notes?.length > 0 && (
        <NoteBlock label="How to send them">
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note} className="flex gap-2.5">
                <span aria-hidden="true" className="text-ink-400">
                  —
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </NoteBlock>
      )}

      {verificationNote && (
        <NoteBlock label="Before you apply">{verificationNote}</NoteBlock>
      )}

      {/* ⛔ 03-09-2026: the "Full checklist and notes" link is GONE. It pointed
          at `/dsc#documents`, a section removed on Clinton's instruction the
          same day — and a link to a fragment that names nothing scrolls nowhere
          while looking like a real destination. This block IS the checklist
          now; there is nothing fuller to link to. */}
    </section>
  );
}

/**
 * One labelled note under the checklist. A 3/9 split so the labels line up in
 * their own column and the prose keeps a single left edge — three unlabelled
 * paragraphs stacked was the readability complaint this answers.
 *
 * ⚠️ Sans, not mono. See the ⛔ note on `SpecCell`.
 */
function NoteBlock({ label, children }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-ink-100 pt-5 sm:grid-cols-12">
      <p className="text-body-sm font-medium text-ink-400 sm:col-span-3">{label}</p>
      <div className="max-w-[68ch] text-body-sm leading-relaxed text-ink-500 sm:col-span-9">
        {children}
      </div>
    </div>
  );
}

function KycToggle({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Verification route"
      className="mt-5 inline-flex gap-1 rounded-full border border-ink-200/15 bg-ink-50 p-1"
    >
      {kycRoutes.map((route) => {
        const active = route.key === value;
        return (
          <button
            key={route.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(route.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
              // ⛔ 03-09-2026 (Clinton): "for the white color i have use in tab
              // keep as it is." The active pill is WHITE on ember-400, changed
              // by Clinton directly, and it is to stay. Measured statically it
              // is **3.15:1** — under the 4.5:1 AA floor, and the exact pairing
              // CLAUDE.md's first non-negotiable forbids. It is kept on explicit
              // instruction, the same standing exception `Chip.jsx`'s active
              // variant already carries. ⚠️ DO NOT "FIX" THIS BACK TO ink-950;
              // it has been asked for by name. Flagged, not changed.
              //
              // The INACTIVE half is ink-500, not ink-400: it sits on ink-50,
              // where ink-400 is under the floor.
              active ? "bg-ember-400 text-white shadow-sm" : "text-ink-500 hover:text-ink-600"
            )}
          >
            {route.label}
          </button>
        );
      })}
    </div>
  );
}

function PanelLink({ to, label }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 transition-colors hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
    >
      {label}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function SpecCell({ label, value, span }) {
  return (
    // `bg-canvas` matches the `light` section exactly (Section.jsx), which is
    // what makes the `gap-px` mesh above read as hairlines rather than as a
    // tinted table. Change the section's surface and this has to change with it.
    // No left padding and no background: see the grid's own note. `pr-8` is the
    // gutter between columns, and it is on every cell rather than being a
    // `last:` exception for the same reason — a grid item cannot know whether
    // it ends a row.
    <div className={cn("border-b border-ink-200 py-5 pr-8", span)}>
      {/* ⛔ 03-09-2026 (Clinton): "do not use font mono and fixed the font
          weight also… show details properly right now it look confusion to
          read." These labels were mono UPPERCASE with letter-spacing — five of
          them stacked in one grid, which is a lot of shouting above the values
          a reader is actually here for. Plain sans, sentence case, and the
          EMPHASIS IS INVERTED: the label is now the quiet half (regular weight,
          ink-400) and the value the loud one (medium, ink-600). It was the
          other way round. */}
      <dt className="text-body-sm text-ink-400">{label}</dt>
      <dd className="mt-1.5 text-body font-medium leading-relaxed text-ink-600">{value}</dd>
    </div>
  );
}
