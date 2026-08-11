import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { footerColumns, legalPages, site } from "@/content/nav";
import { Container } from "@/components/layout/Container";

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
    <footer data-surface="deep" className="grain relative overflow-hidden bg-ink-950 text-ink-300">
      {/* Oversized arc bleeding off the right edge at 8% (DESIGN.md §11.12).
          Approximate geometry — swap for the real logo arc per §18. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-canvas opacity-[0.08]"
        fill="none"
      >
        <path
          d="M340 200a140 140 0 1 1-66.5-119.2"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
        />
      </svg>

      <Container className="relative">

        <div className="pb-12 pt-20 flex flex-col lg:flex-row gap-10 md:gap-16 xl:gap-24">

          <div>
            <span className="font-sans text-[19px] font-black tracking-tight text-canvas">
              Think<span className="text-ember-400">Orange</span>
            </span>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">
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
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" strokeWidth={1.5} aria-hidden="true" />
                    WhatsApp
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
