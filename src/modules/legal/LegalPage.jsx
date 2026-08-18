import { Phone, MessageCircle, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { getLegalContent } from "@/content/legal";
import { site } from "@/content/nav";

// T8 — CONTENT-PLAN.md §12. One renderer, five content files (src/content/legal/).
// Body copy never animates (CLAUDE.md non-negotiables) — no Reveal/Stagger
// anywhere in this file, unlike every marketing template.
function slugifyHeading(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function LegalPage({ path, title }) {
  const slug = path.replace(/^\//, "");
  const page = getLegalContent(slug);

  // Unreachable via nav.js's route table (every T8 path has a matching
  // content file) — guards a stray path rather than crashing on one.
  if (!page) return null;

  if (!page.sections) {
    return <PendingLegal path={path} title={page.title ?? title} />;
  }

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Legal"
        h1={page.title}
        lede={page.lastUpdated ? `Last updated ${page.lastUpdated}` : undefined}
      />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* TOC — auto-generated from the sections below, so a future
                edit to the prose can never leave a stale table of contents. */}
            <nav aria-label="Table of contents" className="lg:order-2 lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[var(--radius-md)] border border-ink-100 bg-canvas-alt p-6">
                <h2 className="font-mono text-eyebrow uppercase text-ink-400">On this page</h2>
                <ol className="mt-4 space-y-2.5">
                  {page.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#${slugifyHeading(section.heading)}`}
                        className="text-body-sm text-ink-500 transition-colors hover:text-ember-600"
                      >
                        {index + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="max-w-[72ch] space-y-12 lg:order-1 lg:col-span-8">
              {page.sections.map((section, index) => (
                <div key={section.heading} id={slugifyHeading(section.heading)} className="scroll-mt-32">
                  <h2 className="text-h3 text-ink-600">
                    {index + 1}. {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-body text-ink-500">
                    {section.body?.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                    {section.list && (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              <ContactBlock />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactBlock() {
  return (
    <div className="rounded-[var(--radius-md)] border border-ink-100 bg-canvas-alt p-6">
      <h2 className="text-h4 text-ink-600">Questions about this policy?</h2>
      <p className="mt-2 text-body text-ink-500">Reach us directly and we'll help.</p>
      <div className="mt-5 flex flex-wrap gap-4">
        <Button as="a" href={site.phoneHref} variant="secondary">
          <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {site.phoneDisplay}
        </Button>
        <Button as="a" href={site.whatsappHref} target="_blank" rel="noreferrer noopener" variant="secondary">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          WhatsApp
        </Button>
        <Button as="a" href={site.emailHref} variant="secondary">
          <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {site.email}
        </Button>
      </div>
    </div>
  );
}

// CONTENT-PLAN.md §12: "Ship placeholder pages that say the policy is being
// finalised rather than publishing AI-drafted text you haven't had
// reviewed." Same honesty discipline as ServiceLeaf's PendingLeaf — no fake
// sections, no invented TOC, still fully reachable and still gives a real
// way to ask a question in the meantime.
function PendingLegal({ path, title }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Legal"
        h1={title}
        lede="This policy is being finalised by our legal team and hasn't been published yet."
      />
      <Section surface="light">
        <Container>
          <div className="max-w-[68ch]">
            <p className="text-body-lg text-ink-500">
              We don't publish a legal policy before it's been reviewed, so this one isn't live
              yet. If you have a question in the meantime, reach us directly and we'll answer it
              the same way we would through this page.
            </p>
          </div>
          <div className="mt-8 max-w-[68ch]">
            <ContactBlock />
          </div>
        </Container>
      </Section>
    </>
  );
}
