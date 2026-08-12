import { Link } from "react-router-dom";
import { Home, MessageCircle, Phone, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/nav";

// T9 — bespoke, small, deliberately NOT built on PageHero: that primitive
// assumes a real nav.js entry with breadcrumbs and a parent trail, neither of
// which means anything for a wildcard path. Still satisfies the layout
// contract by hand (dark surface, `.page-top`, `grain`) since the header is
// fixed and transparent over every route including this one.
const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "All Services" },
  { to: "/dsc", label: "Digital Signature Certificates" },
  { to: "/contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <section
      data-surface="deep"
      className="page-top grain relative flex min-h-screen items-center overflow-hidden bg-ink-950 pb-20"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-28 -top-28 h-[340px] w-[340px] text-ember-300 opacity-[0.12] md:-right-16 md:-top-32 md:h-[460px] md:w-[460px]"
        fill="none"
      >
        <path d="M340 200a140 140 0 1 1-66.5-119.2" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      </svg>

      <Container className="relative">
        <p className="font-mono text-eyebrow uppercase text-ember-300">404</p>
        <h1 className="mt-3 text-h1 max-w-[24ch] text-canvas">This page doesn&rsquo;t exist</h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-ink-300">
          The link may be out of date, or the page may have moved. Try one of these instead, or
          reach us directly.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-[560px]">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-ink-700 px-5 py-4 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:border-ember-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
            >
              <span className="text-body font-medium text-canvas">{link.label}</span>
              {link.to === "/" ? (
                <Home className="h-4 w-4 shrink-0 text-ink-400 group-hover:text-ember-300" aria-hidden="true" />
              ) : (
                <Search className="h-4 w-4 shrink-0 text-ink-400 group-hover:text-ember-300" aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button as="a" href={site.phoneHref} variant="secondary" tone="dark">
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {site.phoneDisplay}
          </Button>
          <Button as="a" href={site.whatsappHref} target="_blank" rel="noreferrer noopener" variant="secondary" tone="dark">
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
