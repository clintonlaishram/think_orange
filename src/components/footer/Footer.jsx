import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { footerColumns, legalPages, site } from "@/content/nav";
import { Container } from "@/components/layout/Container";
import { ArcRings } from "@/components/ui/ArcRings";
import { IconBrandWhatsapp } from "@tabler/icons-react";

// The same shape as every other section's arc composition (§3.1), just
// canvas-toned rather than ember — DESIGN.md §11.12 specifies a plain
// `text-canvas` arc here, not the brand gradient, and staying ink/canvas
// keeps this entirely off the site's orange budget. Three rings replace the
// single hand-rolled path the footer used before: same technique WhatWeDo/
// HowWeWork/DscBand/Testimonial/PartnerProgramme/CtaBand all already use, so
// the footer reads as one more instance of an established motif rather than
// a new one. Total weight (0.035 + 0.07 + 0.025) lands close to the original
// single ring's flat 0.08, now expressed as depth instead of one flat stroke.
const FOOTER_ARC_RINGS = [
  { r: 176, width: 16, opacity: 0.035 },
  { r: 140, width: 13, opacity: 0.07 },
  { r: 104, width: 9, opacity: 0.025 },
];

// A quieter echo bracketing the opposite corner — CtaBand's "same arc, same
// handedness, never mirrored" pattern (§3.1), at a scale small enough to sit
// behind the brand block without competing with it.
const FOOTER_CORNER_RINGS = [
  { r: 60, width: 6, opacity: 0.05 },
  { r: 42, width: 4, opacity: 0.08 },
];

// DESIGN.md §11.12. Because the nav is deep, the footer IS the site's real
// sitemap — five columns, generous room. No entrance animation: "footers that
// animate in are irritating" (DESIGN.md §9.4).
//
// NOTE ON MISSING FACTS: DESIGN.md §11.12 asks for CIN/GSTIN in the bottom
// bar, but both are on CONTENT-PLAN.md §1.1's hold list — unconfirmed. They
// are deliberately NOT rendered rather than shown as placeholder text on a
// compliance firm's footer. Add them here once confirmed; nothing else needs
// to change.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-surface="deep"
      // `relative isolate`: scopes the arc rings' explicit z-index (and
      // `.grain`'s ::after) to this element, per the same convention every
      // ArcRings-using section already follows (WhatWeDo, HowWeWork,
      // DscBand, Testimonial, PartnerProgramme's panel).
      className="footer-surface surface-ambient grain relative isolate overflow-hidden bg-ink-950 text-ink-300"
    >
      {/* Static ledger-hairline grid — a second, non-circular motif (the user
          asked for "shapes other than circle"). Masked to fade out rather
          than tile flatly to the corners; centred where the arc bleeds off
          the right so the two read as one composition. */}
      <div aria-hidden="true" className="footer-grid" />

      {/* Oversized arc composition bleeding off the right edge (DESIGN.md
          §11.12). Approximate geometry, same status as every other section's
          — swap for the real logo-derived arc per §18 once available. */}
      <ArcRings
        rings={FOOTER_ARC_RINGS}
        gradientId="footer-arc-fade"
        color="var(--color-canvas)"
        svgClassName="-right-34 rotate-40 bottom-1/8 h-[560px] w-[560px] translate-y-1/2"
      />

      {/* Quiet corner echo, top-left — brackets the block against the main
          composition rather than leaving one edge doing all the work. */}
      <ArcRings
        rings={FOOTER_CORNER_RINGS}
        gradientId="footer-corner-arc-fade"
        color="var(--color-canvas)"
        svgClassName="-left-16 -top-16 h-[220px] w-[220px]"
      />

      {/* Oversized monogram watermark, low enough in opacity to read as
          texture rather than a second logo — the "watermark-like effect" at
          a very different register from the arc/grid pair, purely
          typographic rather than another circular shape. Sits behind the
          brand column; `overflow-hidden` on the footer clips the bleed. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-6 select-none font-sans text-[13rem] font-black leading-none tracking-tight text-canvas/[0.035] md:text-[16rem]"
      >
        TO
      </span>

      <Container className="relative">

        <div className="pb-12 pt-20 flex flex-col lg:flex-row gap-10 md:gap-16 xl:gap-24">

          <div>
            <span className="font-sans text-[19px] font-black tracking-tight text-canvas">
              Think<span className="text-ember-400">Orange</span>
            </span>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-300">
              Consulting Pvt Ltd
            </p>
            <p className="mt-4 text-body-sm text-ember-200">{site.strapline}</p>
            <p className="mt-4 max-w-[34ch] text-body-sm">{site.positioning}</p>
          </div>

          <div className="flex-1 grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-[1fr_1fr_1.5fr_1.5fr_1.5fr]">
            {/* Brand block */}

            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="font-mono text-eyebrow uppercase text-canvas">{column.heading}</h2>
                {/* The one other whitelisted use of the brand gradient
                    (DESIGN.md §7.1: "the 2px accent rule beneath section
                    eyebrows") — same recipe MegaPanel's column indicator
                    uses, static rather than hover-triggered since a footer
                    never animates. */}
                <span
                  aria-hidden="true"
                  className="mt-2.5 block h-0.5 w-8 rounded-full"
                  style={{ background: "var(--gradient-ember)" }}
                />
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="rounded-sm text-body-sm transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Contact + deadline widget */}
            <div>
              <h2 className="font-mono text-eyebrow uppercase text-canvas">Get in touch</h2>
              <span
                aria-hidden="true"
                className="mt-2.5 block h-0.5 w-8 rounded-full"
                style={{ background: "var(--gradient-ember)" }}
              />
              <ul className="mt-4 space-y-3 text-body-sm">
                <li>
                  <a
                    href={site.phoneHref}
                    className="flex items-start gap-2.5 rounded-sm transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                    <span className="tabular-nums">{site.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-start gap-2.5 rounded-sm transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    <IconBrandWhatsapp className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                    +91 82482 03045
                  </a>
                </li>
                <li>
                  <a
                    href={site.emailHref}
                    className="flex items-start gap-2.5 rounded-sm break-all transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                  {site.location}
                </li>
              </ul>


            </div>
          </div>
        </div>

        {/* pb-24 at EVERY breakpoint, not just mobile. Below `sm` this row
            wraps onto two lines (copyright, then legal links + domain), both
            left-aligned, landing under the FloatingWhatsApp button's corner.
            From `sm` up the row stays one line with `justify-between`, which
            right-aligns the domain link — and the button moved to
            bottom-RIGHT since this padding was first added, so the same
            corner-collision risk now applies at desktop widths too, just on
            the opposite side. Rather than track which corner the button is
            in and match padding to it, reserve the clearance on every
            breakpoint: `pb-24` is cheap dead space, a hidden link is not. */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-800 pb-24 pt-6 text-body-sm">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalPages.slice(0, 2).map((page) => (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className="rounded-sm transition-colors hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
                >
                  {page.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`https://${site.domain}`}
                className="rounded-sm text-ember-200 transition-colors hover:text-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
              >
                {site.domain}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
