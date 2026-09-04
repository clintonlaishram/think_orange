import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Megaphone } from "lucide-react";
import { noticesFor } from "@/content/notices";

// The homepage's small infinite notice bar (Clinton, 04-09-2026). One thin
// full-bleed strip, not a section of content — it sits directly under the hero
// and its whole job is to be read in passing.
//
// ⛔ IT IS DELIBERATELY NON-INTERACTIVE — no links in the moving track, even
// though `notices.js` carries `href`. Two reasons, and both are real:
//   1. A link that is physically sliding away is a hostile click target. Hover
//      pause helps a mouse and does nothing for touch.
//   2. The track is DUPLICATED to loop seamlessly, so any focusable element in
//      it exists twice in the tab order pointing at the same place. Marking
//      the copy `aria-hidden` fixes the screen reader and does NOT remove it
//      from the tab order (`inert` would, but then so would the hover pause be
//      pointless).
// The `/dsc` NoticeBoard is the surface that renders `href`. Keep it that way.
//
// ⚠️ SURFACE IS `light-alt`, and that is a cadence constraint rather than a
// look. The homepage hero is `deep`; a dark or deep bar directly beneath it
// would be two adjacent dark-family surfaces, which read as one slab with no
// fold — the exact fault Clinton reported on /dsc on 02-09-2026 and which a
// cadence check comparing adjacent TOKENS passes, because the tokens differ.
// The section below this one is `light`, so `light-alt` also avoids a repeat.

// ⚠️ ONE GROUP MUST BE AT LEAST AS WIDE AS THE WIDEST WINDOW THIS EVER RENDERS
// IN. `translateX(-50%)` travels exactly one group, so at the loop point the
// trailing group has to still cover the whole visible strip — otherwise there
// is dead space behind the last item before it snaps back, which reads exactly
// as "it finishes, then starts again". This bar is FULL-BLEED, so the window
// is the viewport, not the 1800px container: budget for ~2560px. Measured at
// 1440px, one pass of the current notices is ~2900px, so 2 passes (~5800px)
// clears a 2560px window with room to spare. Re-check with the probe in this
// file's commit if `notices.js` ever shrinks to one or two short entries.
const GROUP_PASSES = 2;

// Pixels per second. TrustStrip runs ~21px/s for one-word wordmarks; full
// sentences need to be readable in passing without being so slow that the bar
// looks frozen.
const SPEED = 55;

export function NoticeTicker() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const items = noticesFor("site");

  // ⚠️ DURATION IS MEASURED, NOT HAND-COMPUTED, and that is a deliberate
  // improvement on TrustStrip — whose 120s was tied to a group width that
  // later changed, quietly slowing the strip to ~15px/s until someone noticed.
  // Here the element measures itself, so editing `notices.js` can never leave
  // the speed wrong.
  //
  // Written straight to the DOM in an effect rather than through state: it
  // must not differ between the server render and the client's first pass, or
  // it is a hydration mismatch. SSR and first render both use the CSS default.
  useEffect(() => {
    const node = trackRef.current;
    if (!node || reduceMotion) return;
    const setDuration = () => {
      // scrollWidth is BOTH groups; one group is half of it.
      const groupWidth = node.scrollWidth / 2;
      if (groupWidth > 0) node.style.setProperty("--marquee-duration", `${groupWidth / SPEED}s`);
    };
    setDuration();
    // Fonts swap and the viewport changes; both move the measured width.
    const observer = new ResizeObserver(setDuration);
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (items.length === 0) return null;

  const group = Array.from({ length: GROUP_PASSES }, () => items).flat();
  const track = [...group, ...group];

  return (
    <section
      data-surface="light-alt"
      aria-label="Notices"
      // ⚠️ `.marquee-fade` BELONGS ON THIS WINDOW, NOT ON THE TRACK. The mask
      // resolves against the element that carries it — put it on the sliding
      // `w-max` track and the soft edges slide with the content instead of
      // staying pinned to the viewport edges, which is both wrong and visibly
      // drifting. TrustStrip puts it on its wrapper for the same reason.
      // ⚠️ ember-50, and it costs NOTHING against the ~12% orange ceiling: at
      // 0.09 saturation it is below the 0.35 threshold the hue census counts as
      // ember at all, so this reads as a warm notice strip without spending any
      // of the budget. On canvas-alt the bar was near-invisible against the
      // section below it — a notice nobody notices is not a notice. Measured on
      // this tint: body ink-500 9.41:1, label ember-600 4.79:1.
      className="marquee-fade relative overflow-hidden border-y border-ember-100 bg-ember-50 py-3.5"
    >
      {reduceMotion ? (
        // DESIGN.md §9.6: reduced motion gets the static equivalent, not a
        // marquee frozen mid-slide. §9.6's global floor would otherwise collapse
        // the animation to its END state, i.e. the track parked at -50%.
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-x-8 gap-y-2 px-6 md:px-10 lg:px-18">
          {items.map((notice) => (
            <Notice key={notice.id} notice={notice} static />
          ))}
        </div>
      ) : (
        <>
          {/* Decorative and duplicated — the single real list is below, in
              sr-only, so a screen reader hears each notice exactly once. */}
          <div
            ref={trackRef}
            aria-hidden="true"
            className="flex w-max animate-[marquee_var(--marquee-duration,90s)_linear_infinite] hover:[animation-play-state:paused]"
          >
            {track.map((notice, index) => (
              <Notice key={`${notice.id}-${index}`} notice={notice} />
            ))}
          </div>
          <p className="sr-only">
            Notices: {items.map((notice) => `${notice.label} — ${notice.text}`).join(" ")}
          </p>
        </>
      )}
    </section>
  );
}

function Notice({ notice, static: isStatic }) {
  return (
    // ⚠️ `mr-14` on the ITEM, never a `gap` on the parent, and it is
    // load-bearing rather than stylistic. A seamless -50% loop needs the two
    // halves to be exact pixel mirrors; flex `gap` sits BETWEEN items, so a
    // doubled N-item row has (2N-1) gaps — an odd count for an even item total
    // — and half the row's width lands half a gap short of where the second
    // copy must start. Margin gives every item its own trailing space, so the
    // row really is 2x one group and -50% is exact. (Learned the hard way in
    // TrustStrip; do not "tidy" this into a gap.)
    <span className={isStatic ? "flex items-center gap-3" : "mr-14 flex shrink-0 items-center gap-3"}>
      {/* ⛔ NOT the arc crescent (Clinton, 04-09-2026: "change the icon to
          notice icon, instead of circile icon"). At this size a hairline arc
          with a gap in it is the loading-spinner silhouette exactly — the same
          rejection HeroFloaters already records: "the crescent is right at
          140px as a backdrop and wrong at 18px in a chip". A strip that opens
          with what looks like a spinner reads as content still loading. */}
      <Megaphone
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-ember-600"
        strokeWidth={1.75}
      />
      <span className="shrink-0 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ember-600">
        {notice.label}
      </span>
      {/* whitespace-nowrap on the moving copy only: in the static
          reduced-motion row the notices must be allowed to wrap. */}
      <span className={isStatic ? "text-body-sm text-ink-500" : "whitespace-nowrap text-body-sm text-ink-500"}>
        {notice.text}
      </span>
    </span>
  );
}
