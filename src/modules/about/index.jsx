import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { serviceCategories, site } from "@/content/nav";
import { aboutContent } from "@/content/about";

// T6 — CONTENT-PLAN.md §10. Founding year, team, credentials, client numbers
// and photography are all on §1.1's hold list — the page is written to read
// as complete without them (no "[coming soon]" scars), with slots ready:
// swap the "Where we are" card's map for a real office photo, or add a team
// section above it, with no restructuring needed elsewhere.
export default function About({ path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="About ThinkOrange"
        h1="Compliance, taxation and growth support, from one place"
        lede={aboutContent.description}
      />

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="mt-3 text-h2 max-w-[28ch]">{site.positioning}</h2>
              <div className="mt-6 max-w-[64ch] space-y-4 text-body-lg text-ink-500">
                <p>{aboutContent.description}</p>
                <p>{aboutContent.mission}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Card surface="light-alt" interactive={false} className="h-full">
                <h3 className="text-h4 text-ink-600">What sets us apart</h3>
                <ul className="mt-4 space-y-3 text-body text-ink-500">
                  <li>All solutions under one roof — GST, tax, entity formation, audit, tenders, finance and DSC.</li>
                  <li>Technology-driven and accurate, using the same tools professionally as we do for every client file.</li>
                  <li>Pan-India, digital-first service — most engagements never need an in-person visit.</li>
                  <li>Client-centric, tailored solutions rather than a one-size template.</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="light-alt">
        <Container>
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">{site.strapline}</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {aboutContent.pillars.map((pillar) => (
              <Card key={pillar.title} surface="light" interactive={false} className="h-full">
                <h3 className="text-h4 text-ink-600">{pillar.title}</h3>
                <p className="mt-3 text-body text-ink-500">{pillar.body}</p>
              </Card>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Six practice areas, one point of contact</h2>
          <Stagger className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <Link
                key={category.slug}
                to={category.path}
                className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-ink-100 bg-white px-5 py-4 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:border-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
              >
                <span className="text-body font-medium text-ink-600">{category.label}</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-ink-300 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:text-ember-500"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light-alt">
        <Container>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">What working with us actually looks like</h2>
          <Stagger className="mt-8 grid grid-cols-1 divide-y divide-ink-100 md:grid-cols-3 md:divide-y-0 md:divide-x">
            {aboutContent.howWeWork.map((point) => (
              <div key={point.title} className="py-5 first:pt-0 md:px-6 md:py-0 md:first:pl-0">
                <h3 className="text-h4 text-ink-600">{point.title}</h3>
                <p className="mt-2 text-body text-ink-500">{point.body}</p>
              </div>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="mt-3 text-h2 max-w-[26ch]">{site.location}</h2>
              <p className="mt-4 max-w-[52ch] text-body-lg text-ink-500">{aboutContent.whereWeAre}</p>
            </div>
            <Reveal className="lg:col-span-7">
              <MapEmbed className="aspect-[16/10] w-full" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
