import { Link } from "react-router-dom";
import { ArrowUpRight, Megaphone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcRings } from "@/components/ui/ArcRings";
import { Reveal } from "@/components/motion/Reveal";
import { noticesFor } from "@/content/notices";

// The `/dsc` notice board (Clinton, 04-09-2026), directly under the hero.
//
// ⚠️ ONE PANEL OF HAIRLINE-DIVIDED ROWS, NOT A GRID OF CARDS. A board is a
// single object with things pinned to it, and four identical cards is the
// archetype §16's tell 7 is about. It also keeps the rows scannable in one
// column, which is what a notice is for — you read down it looking for the one
// that concerns you.
//
// ⚠️ SURFACE IS `light-alt` and that is a cadence constraint. The hero above is
// `deep`; a dark board under it would be two adjacent dark-family surfaces,
// which read as one slab with no fold (the fault Clinton reported on this page
// on 02-09-2026) — and a cadence check comparing adjacent TOKENS passes it,
// because `deep` and `dark` are different strings. The finder below is `light`,
// so `light-alt` also avoids a repeat.
//
// Renders nothing when no confirmed notice targets this surface, so the page is
// unaffected if `notices.js` is ever emptied — same behaviour as `Testimonial`
// and `Insights` on the homepage.

const BOARD_RINGS = [
  { r: 150, width: 12, opacity: 0.05 },
  { r: 114, width: 9, opacity: 0.035 },
];

export function NoticeBoard({ id }) {
  const items = noticesFor("dsc");
  if (items.length === 0) return null;

  return (
    <Section id={id} surface="light-alt" className="scroll-mt-32">
      <Container>
        <SectionHeading
          eyebrow="Notice board"
          heading="What to know before you apply"
          lede="The four things people most often get wrong about certificates, tokens and eSign — worth two minutes before you start."
        />

        <Reveal className="mt-10">
          <div className="card-premium relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-ink-100 bg-white">
            <ArcRings
              rings={BOARD_RINGS}
              gradientId="dsc-notice-board"
              color="var(--color-ink-950)"
              svgClassName="absolute -bottom-28 -right-24 h-[420px] w-[420px]"
              style={{ zIndex: -1 }}
            />
            <ul>
              {items.map((notice, index) => (
                <li
                  key={notice.id}
                  // Rule on the TOP of every row but the first, never the
                  // bottom: a bottom rule leaves a hairline dangling under the
                  // last row inside the panel's own border.
                  className={index === 0 ? "" : "border-t border-ink-100"}
                >
                  <Row notice={notice} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function Row({ notice }) {
  const body = (
    <div className="flex items-start gap-4 p-6 md:gap-6 md:p-7">
      {/* Same swap as the ticker, and for the same reason — one content type
          should not carry two different marks across the two surfaces of one
          feature, and a 16px crescent reads as a loading spinner here too. */}
      <Megaphone
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 shrink-0 text-ember-600"
        strokeWidth={1.75}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ember-600">
            {notice.label}
          </span>
          {/* Rendered only when a notice actually carries one — a board full of
              undated rows is honest; a fabricated date is not. */}
          {notice.date && (
            <span className="font-mono text-body-sm tabular-nums text-ink-400">{notice.date}</span>
          )}
        </div>
        <p className="mt-2 max-w-[78ch] text-body text-ink-500">{notice.text}</p>
      </div>
      {notice.href && (
        <ArrowUpRight
          className="mt-0.5 h-5 w-5 shrink-0 text-ink-300 transition-colors duration-[var(--dur-fast)] group-hover:text-ember-600"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (!notice.href) return body;

  // ⚠️ `group` sits on the LINK, not on the row's inner div, so the arrow's
  // hover state resolves against the real click target rather than a child box.
  // Hover tint is gated by Tailwind's own `@media (hover: hover)` wrapper;
  // `active:` is not, so a touch user still gets feedback from a tap.
  return (
    <Link
      to={notice.href}
      className="group block transition-colors duration-[var(--dur-fast)] hover:bg-ember-50/60 active:bg-ember-50"
    >
      {body}
    </Link>
  );
}
