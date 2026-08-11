import { Link } from "react-router-dom";
import { insights, MIN_ARTICLES_TO_SHOW } from "@/content/insights";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Card } from "@/components/ui/Card";

// Homepage section 12 — DESIGN.md §11.1 row 10: Light surface, 3 editorial
// cards. Flag-gated per BUILD-PLAN.md Phase 5 — renders nothing below
// CONTENT-PLAN.md §6 row 12's own bar ("Reserve the route and add at 4+
// articles"), not just "more than zero".
export function Insights() {
  if (insights.length < MIN_ARTICLES_TO_SHOW) return null;

  return (
    <section data-surface="light" className="section-pad bg-canvas">
      <Container>
        <Eyebrow>Insights</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.slice(0, 3).map((article) => {
            // interactive=false on the dummy path too: Card's default hover
            // lift + revealed corner arc are an affordance for something
            // clickable, and this card isn't (see below) — showing them
            // anyway would signal an interaction that doesn't exist, the same
            // defect class as an earlier pass fixed on the dark cards.
            const card = (
              <Card surface="light" interactive={article.confirmed}>
                <h3 className="text-h4 text-ink-600">{article.title}</h3>
                <p className="mt-2 text-body-sm text-ink-500">{article.excerpt}</p>
              </Card>
            );

            // No /insights/:slug route exists in nav.js or the router yet —
            // insights.js's own header comment flags this. `article.confirmed`
            // doubles as "this points at a real, published article" here, so
            // an unconfirmed (dummy) entry renders as a non-interactive div
            // rather than a Link that would 404 on click. Once the route is
            // built and an entry is marked confirmed: true, it becomes a real
            // link automatically — no change needed here.
            if (!article.confirmed) {
              return (
                <div key={article.slug} className="rounded-[var(--radius-md)]">
                  {card}
                </div>
              );
            }

            // Card renders a plain <div> — it has no `as` prop — so the link
            // wraps it rather than trying to make Card itself anchor-shaped.
            return (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className="block rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
