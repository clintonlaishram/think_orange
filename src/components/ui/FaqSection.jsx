import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/content/nav";
import { SectionHeading } from "@/components/ui/SectionHeading";

// THE FAQ SECTION LAYOUT — the homepage row's, applied everywhere
// (19-08-2026, Clinton: "take the design of the home page FAQs on all pages").
//
// The design that was asked for is not only the row treatment inside
// `Accordion` — it is this composition: a 4/8 split with a STICKY left rail
// carrying the eyebrow, heading, one supporting line and a WhatsApp escape
// hatch, against the accordion on the right. Before this, every non-homepage
// FAQ section stacked a heading above a `max-w-[76ch]` list, which on the
// 1800px container left the entire right half of the section empty.
//
// The rail is sticky so the heading stays with the list while a long answer
// is open — the reason the homepage version was built this way, and it holds
// on a 8-question service leaf even more than on the homepage's 6.
//
// Deliberately NOT a <Section>: callers keep their own Section, because the
// surface is decided per page (DscHub derives it from its column count so the
// cadence can't repeat) and some callers hang an id or JSON-LD off it. This
// component owns the layout inside the section, nothing else.
// `dark` is available but currently unused by any call site — every FAQ
// section on the site sits on a light surface. It exists so a future dark
// one cannot forget it: without it the subheading keeps its ink-500
// light-surface value, which measures ~1.5:1 on ink-900.
export function FaqSection({
  eyebrow = "Common questions",
  heading,
  intro,
  items,
  askLabel = "Ask us something else",
  dark = false,
}) {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            {/* The sitewide LABEL / Heading / Subheading header. The tighter
                measures are the one legitimate override: this rail is a 4-col
                column, where the standard 32ch/68ch would run past its edge. */}
            <SectionHeading
              eyebrow={eyebrow}
              heading={heading}
              lede={intro}
              dark={dark}
              headingClassName="max-w-[18ch]"
              ledeClassName="max-w-[42ch] text-body sm:text-body"
              reveal={false}
            />
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-body font-medium text-ember-600 underline-offset-4 transition-[gap] duration-[var(--dur-fast)] hover:gap-2.5 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-600 focus-visible:ring-offset-2"
            >
              {askLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion items={items} />
        </Reveal>
      </div>
    </Container>
  );
}
