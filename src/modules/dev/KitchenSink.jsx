import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineMask } from "@/components/motion/LineMask";
import { Counter } from "@/components/motion/Counter";

// Phase 1 verification page only — not a design reference for real pages,
// not linked from any real nav. BUILD-PLAN.md §3 Phase 1 done-when target.
// `kitchen-sink-swatch.jpg` is a generated solid-colour test fixture used
// to exercise the vite-imagetools pipeline end-to-end; it is not content
// photography and must never be treated as one (IMAGE-PLAN.md §2-3).
import swatchPicture from "@/assets/dev/kitchen-sink-swatch.jpg?w=480;768;1024&format=avif;webp;jpg&as=picture";

const SURFACES = ["light", "light-alt", "dark", "deep", "ember"];

function cardSurfaceFor(surface) {
  if (surface === "light") return "light";
  if (surface === "light-alt") return "light-alt";
  return "dark";
}

function toneFor(surface) {
  return surface === "light" || surface === "light-alt" ? "light" : "dark";
}

export default function KitchenSink() {
  return (
    <main>
      <Section surface="deep" className="page-top">
        <Container>
          <Eyebrow>Phase 1 · Kitchen sink</Eyebrow>
          <h1 className="text-display-lg mt-3 max-w-[16ch]">
            <LineMask lines={["Design tokens &", "primitives"]} />
          </h1>
          <p className="text-body-lg mt-4 max-w-[52ch] text-ink-300">
            Every primitive from DESIGN.md §12 on every surface from §4.6.
            Not a page reference — a verification fixture for Phase 1's
            done-when checklist.
          </p>
        </Container>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Container>
            <Eyebrow>Surface: {surface}</Eyebrow>
            <h2 className="text-h2 mt-2">Sample heading on {surface}</h2>
            <p className="mt-2 max-w-[68ch] text-body">
              Body copy at the default weight, sized and coloured per the
              surface pairing rules in DESIGN.md §4.6.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary" tone={toneFor(surface)}>
                Secondary
              </Button>
              <Button variant="ghost" tone={toneFor(surface)}>
                Ghost link
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Chip variant="neutral">Neutral</Chip>
              <Chip variant="due-soon">Due in 10 days</Chip>
              <Chip variant="overdue" pulseOnce>
                Overdue
              </Chip>
              <Chip variant="active">Active filter</Chip>
            </div>

            <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
              <Card surface={cardSurfaceFor(surface)}>
                <h3 className="text-h3">Card one</h3>
                <p className="mt-2 text-body-sm">
                  Hover to see the corner arc and lift.
                </p>
              </Card>
              <Card surface={cardSurfaceFor(surface)}>
                <h3 className="text-h3">Card two</h3>
                <p className="mt-2 text-body-sm">Staggered reveal, 60ms apart.</p>
              </Card>
              <Card surface={cardSurfaceFor(surface)}>
                <h3 className="text-h3">Card three</h3>
                <p className="mt-2 text-body-sm">Third in the batch.</p>
              </Card>
            </Stagger>

            <Reveal className="mt-8 flex flex-wrap items-end gap-10">
              <div>
                <span className="text-stat block">
                  <Counter value={1247} />+
                </span>
                <span className="text-body-sm">Filings this year</span>
              </div>
              <div className="w-full max-w-xs">
                <Input label="Phone / WhatsApp" placeholder="+91" />
              </div>
              <div className="w-full max-w-xs">
                <Input label="Email" error="Enter a valid email address" />
              </div>
            </Reveal>
          </Container>
        </Section>
      ))}

      <Section surface="light-alt">
        <Container>
          <Eyebrow>Image layer</Eyebrow>
          <h2 className="text-h2 mt-2">Img &amp; Figure</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-body-sm">With a real picture import (AVIF/WebP/JPEG, zero CLS):</p>
              <Figure picture={swatchPicture} ratio="16/10" alt="Solid-colour test swatch verifying the responsive image pipeline" />
            </div>
            <div>
              <p className="mb-2 text-body-sm">With no src — typographic fallback, never a broken image:</p>
              <Figure
                ratio="16/10"
                alt=""
                fallback={
                  <div className="flex h-full min-h-[200px] items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-ink-100 bg-canvas p-8 text-center">
                    <p className="text-quote font-serif italic text-ink-400">
                      Photography pending — Phase 11
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
