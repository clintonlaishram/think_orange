import { useRef } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";

import ArcField from "@/components/hero/ArcField";
// import { useBloom } from "@/hooks/useBloom"; // cursor bloom removed — see below
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Counter } from "@/components/motion/Counter";
import { LineMask } from "@/components/motion/LineMask";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { site } from "@/content/nav";
import { heroCapabilities, heroStats } from "@/content/home-hero";

// Homepage section 1 — DESIGN.md §11.2. Asymmetric 7/5 over the Arc Field
// (§8), Deep surface.
//
// Motion timings are §9.4's hero row, not invented: headline LineMask at
// 120ms after mount, sub-copy + CTAs Reveal at +240ms, floating card Reveal
// with spring at +340ms then a 6px idle float on a 7s loop. The second card
// and the stat row extend that cascade rather than starting a new rhythm.
const SPRING = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 };

// IMAGE-PLAN.md §4.1: home-hero is T1 (own photography). Until that lands,
// a T2 contextual desk still-life (no people, no "this is our office" claim)
// stands in. Swap the file for the T1 shot when it arrives — the import below
// needs no changes.
//
// Imported through the imagetools pipeline rather than referenced as a bare
// /images/ path. Phase 10 measured the raw file as the homepage's LCP element
// at 5.5s: a single 179KB 1200x1500 JPEG, ~146KB of which is wasted on pixels
// no viewport displays, served to browsers that have supported AVIF for years.
// This emits AVIF/WebP at four widths and lets the browser pick.
//
// It resolves through public/ ON PURPOSE, which is unusual enough to explain:
// the same file must ALSO stay reachable at a stable, unhashed absolute URL,
// because it is the sitewide og:image (src/lib/seo.js) and the LocalBusiness
// `image` (src/lib/jsonld.js), and social crawlers can't follow a
// content-hashed asset name. So public/ keeps the verbatim copy for those, and
// this import produces the optimised derivatives the page actually renders.
import heroPicture from "../../../../public/images/home/home-hero.jpg?w=384;576;768;1152&format=avif;webp&as=picture";

const heroImage = {
  alt: "Laptop, clipboard and pen on a marble desk — compliance workspace mid-task",
  // Slot is a 5-col of the 1800px container at lg, and capped by max-w-md
  // below it.
  sizes: "(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw",
};

export function Hero() {
  const heroRef = useRef(null);
  // Cursor bloom removed 11-08-2026 — see the note on `.arcfield__bloom` in
  // theme.css. The hook already early-returns without a [data-bloom] element,
  // so this is belt-and-braces rather than load-bearing; it keeps the removal
  // legible. Restore alongside the div and the CSS block.
  // useBloom(heroRef);

  return (
    <section
      ref={heroRef}
      data-surface="deep"
      // `isolate` is load-bearing: ArcField sits at -z-10, and without a
      // stacking context here it would paint behind this section's own
      // background. `.page-top` clears the fixed transparent header — see
      // CLAUDE.md's layout contract, this was a real Phase 2 bug.
      //
      // min-h, not h: `100svh` is a floor, and since the stat row and the
      // second card landed this hero now EXCEEDS one screen on most laptops
      // by design. It is a content hero, not a viewport-locked splash.
      className="page-top relative isolate flex min-h-[100svh] flex-col bg-ink-950 pb-10 text-ink-300"
    >
      <ArcField />

      {/* Container carries `mx-auto`, and flexbox suppresses cross-axis
          stretch on any flex item with an auto margin on that axis — so
          Container collapses to shrink-to-fit whenever it is a DIRECT child
          of a column flex container. The outer div is the flex item doing the
          vertical centring; the inner plain div breaks that direct
          relationship so Container behaves as an ordinary block child. */}
      <div className="flex flex-1 flex-col justify-center">
        <div>
          <Container>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
              {/* ---- Left column (7) ------------------------------------ */}
              <div className="lg:col-span-7">
                <Reveal delay={0} className="mb-6">
                  <Eyebrow className="!text-xs">GST · Income Tax · DSC · Compliance</Eyebrow>
                </Reveal>

                <h1 className="text-display-xl text-canvas">
                  {/* Three lines, not two: at display-xl (88px/900) over a
                      7-column measure, "Compliance, without" rewraps inside
                      its own mask wrapper, which reveals two visual lines as
                      one block and loses the 80ms cascade. Each entry has to
                      be a line that actually fits. */}
                  <LineMask
                    className="pb-[0.1em]"
                    startDelay={0.12}
                    lines={[
                      "Compliance,",
                      "without",
                      <>
                        the{" "}
                        <em className="font-serif font-normal italic tracking-[-0.01em] text-ember-300">
                          scramble.
                        </em>
                      </>,
                    ]}
                  />
                </h1>

                <Reveal
                  delay={0.24}
                  className="mt-6 max-w-[52ch] text-body-lg text-ink-200"
                >
                  GST, income tax and company filings handled end to end from{" "}
                  {site.locality}, for clients across India.
                </Reveal>

                <Reveal
                  delay={0.24}
                  className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                >
                  <Button
                    as={Link}
                    className="px-5 py-2.5 sm:px-7 sm:py-3.5 "
                    to="/contact"
                  >
                    Talk to an Expert
                  </Button>
                  <Button
                    as={Link}
                    className="px-5 py-2.5 sm:px-7 sm:py-3.5 "
                    to="/services"
                    variant="secondary"
                    tone="dark"
                  >
                    Explore Services
                  </Button>
                </Reveal>

                {/* §11.2 asks for "[placeholder: registrations, years,
                    clients]" here. All three are numeric claims on
                    CONTENT-PLAN.md §1.1's hold list — none are typed in.
                    This renders only the two facts nav.js marks confirmed. */}
                <Reveal
                  delay={0.24}
                  className="mt-8 border-t border-ink-800 pt-4 font-mono text-body-sm text-ink-200"
                >
                  {site.legalName} · {site.location}
                </Reveal>
              </div>

              {/* ---- Right column (5) — image + overlapping card -------- */}
              <div className="lg:col-span-5">
                <HeroShowcase />
              </div>
            </div>

            <HeroStats />
          </Container>
        </div>
      </div>

      {/* ---- Scroll affordance (§11.2) --------------------------------
          Deliberately NOT wrapped in Reveal: it sits at the hero's end,
          outside Reveal's -12% bottom rootMargin, so it would stay at
          opacity 0 until the user had already started scrolling past it. An
          affordance that appears only once you no longer need it is worse
          than one that never animates. */}
      <div className="hidden sm:block absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
        <button
          type="button"
          aria-label="Scroll to the next section"
          onClick={() => {
            const next = heroRef.current?.nextElementSibling;
            if (next)
              next.scrollIntoView({ behavior: "smooth", block: "start" });
            else
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ember-400/70 text-ember-300 transition-colors duration-[var(--dur-fast)] hover:border-ember-400 hover:bg-ember-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          <ChevronDown className="hero-chevron h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

/**
 * Right column: image is the primary frame; the capabilities card hangs off
 * its bottom-right corner (same composition on phone and desktop). Outer
 * padding reserves space for the overhang so the card is never clipped by
 * the column edge or the stat row below.
 */
function HeroShowcase() {
  return (
    // Outer padding is layout-only: it reserves room for the card overhang
    // so the next section never collides with it. The inner relative box is
    // the image frame the card actually positions against.
    <div className="mx-auto max-w-md pb-14 pr-8 sm:pb-16 sm:pr-10 lg:mx-0 lg:max-w-none lg:pb-20 lg:pr-14">
      <div className="relative">
        <Figure
          picture={heroPicture}
          sizes={heroImage.sizes}
          alt={heroImage.alt}
          ratio="1/1"
          arcMask
          priority
          className="w-full"
        />

        <Reveal
          delay={0.44}
          transition={{ ...SPRING, delay: 0.44 }}
          className="absolute -bottom-6 -right-12 sm:-right-4 z-10 sm:-bottom-8 sm:-right-6 lg:-bottom-10 lg:-right-10 w-[20rem] sm:w-[24rem] backdrop-blur-sm backdrop-saturate-150"
        >
          <div className="hero-card rounded-lg border border-ink-700 p-5 sm:p-6 md:p-7">
            <h2 className="text-sm sm:text-h4 text-canvas">What we handle for you</h2>

            <ul className="mt-2 sm:mt-4 divide-y divide-ink-700/30">
              {heroCapabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-2 sm:gap-3 py-2 sm:py-3 first:pt-0 last:pb-0"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-ember-400"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="text-xs sm:text-body-sm text-ink-100">
                    {capability}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/**
 * The hairline stat row — DESIGN.md §11.4's archetype ("hairline row, no
 * cards"), used here inside the hero rather than as its own section.
 *
 * ⛔ Two of these four tiles are UNCONFIRMED placeholders. See the warning
 * block at the top of src/content/home-hero.js before shipping.
 */
function HeroStats() {
  if (import.meta.env.DEV) {
    const unconfirmed = heroStats.filter((stat) => !stat.confirmed);
    if (unconfirmed.length > 0) {
      console.warn(
        `[hero] Rendering ${unconfirmed.length} UNCONFIRMED stat(s): ` +
        `${unconfirmed.map((s) => `${s.label} = ${s.value}`).join(", ")}. ` +
        `Client count and years of experience are on CONTENT-PLAN.md §1.1's ` +
        `hold list — confirm or delete before launch (src/content/home-hero.js).`,
      );
    }
  }

  return (
    // delay is 0.2, not the +520ms the hero's mount cascade would imply.
    // Reveal is scroll-triggered, and this row sits below the fold on any
    // laptop-height viewport, so 520ms would land as visible lag AFTER it
    // scrolls into view. 200ms still reads as part of the cascade on a tall
    // monitor, where the row IS above the fold at mount.
    //
    // Render-prop form: the tiles animate their own values, and they all hang
    // off THIS Reveal's single IntersectionObserver rather than installing
    // four more of their own.
    <Reveal delay={0.5} className="mt-1 border-t border-ink-800 pt-6">
      {(inView) => (
        <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {heroStats.map((stat, index) => (
            <div
              key={stat.id}
              // Hairlines BETWEEN tiles only. At the 2-column breakpoint a
              // divider on every tile would also run down the middle of the
              // row, so it only turns on from sm upward where the row is a
              // single line of four.
              //
              // No left padding on the first tile at any breakpoint: with it,
              // "250+" sits 16px inboard of the headline's left edge and the
              // whole row reads as misaligned against the column above it.
              className="flex flex-col-reverse gap-1.5 pr-4 sm:border-l sm:border-ink-800 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="text-body-sm text-ink-200">{stat.label}</dt>
              {/* h3 on phone, h2 from sm up. At h2 the word-value tiles wrap
                  mid-word in a 2-column 163px track ("Pan-" / "India"), which
                  reads as broken rather than large. */}
              <dd className="text-h3 font-black tracking-[-0.02em] text-ember-400 sm:text-h2 line-clamp-1">
                <StatValue value={stat.value} play={inView} index={index} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Reveal>
  );
}

// A leading number with anything trailing it — "250+" → 250 / "+", "1,200"
// → 1200 / "". Deliberately reads the SHAPE of stat.value rather than keying
// off stat.id: the two numeric tiles in home-hero.js are unconfirmed
// placeholders due to be replaced or deleted before launch, so this has to
// keep working when the content changes underneath it. Anything that doesn't
// match is treated as a word and decodes instead of counting.
const NUMERIC = /^(\d[\d,]*)(.*)$/;

// 60ms, matching Stagger's established STEP — the row is one object, so the
// four tiles resolve in sequence rather than all at once.
const TILE_STEP = 0.6;

function StatValue({ value, play, index }) {
  const numeric = NUMERIC.exec(value);
  const delay = index * TILE_STEP;

  if (!numeric) {
    return <Scramble text={value} play={play} delay={delay} />;
  }

  const [, digits, suffix] = numeric;
  const target = Number(digits.replace(/,/g, ""));

  return (
    // Same `.value-sizer` treatment Scramble uses, for the same reason:
    // tabular-nums keeps every digit one width, but the digit COUNT still
    // grows 1→3 while counting, which would slide the "+" rightward for the
    // whole 1.2s. tabular-nums is on the sizer itself so the reserved box is
    // measured at the same digit width the counter will render at.
    <span className="value-sizer tabular-nums" data-value={`${digits}${suffix}`}>
      <span>
        <Counter
          value={target}
          play={play}
          delay={delay}
          // en-IN so a future five-figure value groups the Indian way
          // (1,20,000), not 120,000.
          format={(n) => Math.round(n).toLocaleString("en-IN")}
        />
        {suffix}
      </span>
    </span>
  );
}
