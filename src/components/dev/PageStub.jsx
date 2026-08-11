import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/layout/Eyebrow";

// Phase 0/2 placeholder. Every route resolves through this until its real
// template lands in Phases 5-8. NOT a design reference.
//
// It opens with an ink-950 band on purpose: the header is fixed and
// transparent over the top of every page (DESIGN.md §10.1), so a light
// surface here would render the nav's canvas-coloured text invisible. Real
// templates satisfy this with their own dark compact hero
// (CONTENT-PLAN.md §7-9).
export default function PageStub({ title, template, path }) {
  return (
    <>
      <section data-surface="deep" className="page-top grain relative bg-ink-950 pb-14">
        <Container className="relative">
          <Breadcrumbs path={path} className="mb-6" />
          <Eyebrow>{template} · stub</Eyebrow>
          <h1 className="text-h1 mt-3 text-canvas">{title}</h1>
          <p className="mt-3 font-mono text-body-sm text-ink-400">{path}</p>
        </Container>
      </section>

      <section data-surface="light" className="bg-canvas py-16">
        <Container>
          <p className="max-w-[68ch] text-body text-ink-500">
            Placeholder content. This route&rsquo;s real template arrives in a later
            phase — see BUILD-PLAN.md.
          </p>
        </Container>
      </section>
    </>
  );
}
