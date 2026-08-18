import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { insights, MIN_ARTICLES_TO_SHOW } from "@/content/insights/index.js";
import { getInsightImage } from "@/content/insights/images.js";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

// Homepage section 12 — DESIGN.md §11.1 row 10 (Light surface, editorial).
// Still gated on CONTENT-PLAN.md §6 row 12's own bar ("Reserve the route and
// add at 4+ articles"), not just "more than zero" — four real articles now
// clear it, so the section renders.
//
// LAYOUT (Clinton, 19-08-2026): one tall FEATURE panel on the left carrying
// article 1, with its heading and subheading at the panel's foot; the other
// three stacked down the right, each as a numbered plate beside its own
// heading and subheading. Two columns at lg, a single stack below it.
//
// IMAGERY (19-08-2026): each article now carries a real photograph — licensed
// Unsplash contextual stock, IMAGE-PLAN.md §2 TIER 2, no people in any frame,
// sources in src/assets/insights/ATTRIBUTION.txt. They replaced the earlier
// typographic arc plates. Two rules they have to keep obeying:
//   1. Every image goes through <Img> (CLAUDE.md non-negotiable, no bare <img>),
//      which reserves its box so CLS stays at zero.
//   2. Nothing here implies the photo is ThinkOrange's own office, desk or
//      paperwork — §2 permits Tier 2 only for genuinely contextual imagery, and
//      an editorial thumbnail beside a headline is exactly that.
// The feature panel's headline sits OVER its photograph, so it carries a scrim
// (see FeatureCard) and the contrast was measured on rendered pixels, not
// assumed.
export function Insights() {
  if (insights.length < MIN_ARTICLES_TO_SHOW) return null;

  const [feature, ...rest] = insights.slice(0, MIN_ARTICLES_TO_SHOW);
  const secondary = rest.slice(0, 3);

  return (
    <section data-surface="light" className="section-pad relative bg-canvas">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-3 text-h2 max-w-[28ch]">
              Compliance, explained without the jargon
            </h2>
          </div>
          <Link
            to="/insights"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-body-sm font-medium text-ember-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
          >
            All insights
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FeatureCard article={feature} />

          {/* The three secondary rows. `divide-y` rather than three separate
              cards: a card each would compete with the feature panel for
              weight, and the sketch's right-hand column is a list, not a grid
              of equals. */}
          <ul className="flex h-full flex-col justify-between divide-y divide-ink-100">
            {secondary.map((article, index) => (
              <li key={article.slug} className={cn(index === 0 && "lg:pt-0")}>
                <Reveal delay={0.06 * (index + 1)}>
                  <SecondaryRow article={article} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Article 1 — a tall panel, photograph behind, copy anchored at its foot. */
function FeatureCard({ article }) {
  const image = getInsightImage(article.slug);

  return (
    <Reveal className="h-full">
      {/* `.card-dark` stays on the LINK itself (its hover ring and lift are
          written for the hovered element, so a surface on a child would respond
          to the child's box instead) and now sits UNDER the photograph as the
          fallback surface, which is what shows while the image decodes.
          `overflow-hidden` keeps the photo, the grain and the radius aligned. */}
      <Link
        to={`/insights/${article.slug}`}
        data-surface="dark"
        className="card-dark group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 md:min-h-[26rem] md:p-10"
      >
        {image && (
          <Img
            picture={image.picture}
            alt=""
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* SCRIM, not a blur or an opacity drop on the photo itself: the text
            needs a predictable floor to sit on, and a gradient gives the
            headline a dark base while the top of the image stays readable as a
            picture. Measured on rendered pixels — see CLAUDE.md for the figure.
            `alt=""` on the image above because this photo is decorative HERE:
            the headline beside it is the real content, and the article page
            carries the same photo with a descriptive alt. */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              // Stops are MEASURED, not eyeballed. The first version ran 94% at
              // the foot down to 42% by 78% height, which left the eyebrow
              // ("Business Setup · 6 min read", ember-200 at 11px) sitting on
              // the bright part of a white-paper photograph at 3.13:1 — under
              // the 4.5:1 floor for normal text. The plateau now holds ~92% ink
              // across the whole copy block and only falls away above it, which
              // is what the re-measured figures in CLAUDE.md are taken against.
              // Any change to these stops needs re-measuring on rendered pixels;
              // a photo swap does too, since the failure came from the image's
              // own bright region, not from the gradient alone.
              "linear-gradient(to top, color-mix(in srgb, var(--color-ink-950) 96%, transparent) 0%, color-mix(in srgb, var(--color-ink-950) 92%, transparent) 45%, color-mix(in srgb, var(--color-ink-950) 60%, transparent) 72%, color-mix(in srgb, var(--color-ink-950) 30%, transparent) 100%)",
          }}
        />

        <p className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-ember-200">
          {article.category} · {article.readMinutes} min read
        </p>
        <h3 className="relative mt-4 max-w-[24ch] text-h2 text-canvas">{article.title}</h3>
        <p className="relative mt-4 max-w-[46ch] text-body text-ink-100">{article.excerpt}</p>
        <span className="relative mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-200">
          Read the article
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </Reveal>
  );
}

/** Articles 2-4 — a photo thumbnail on the left, copy to its right. */
function SecondaryRow({ article }) {
  const image = getInsightImage(article.slug);

  return (
    <Link
      to={`/insights/${article.slug}`}
      className="group flex items-start gap-5 rounded-[var(--radius-md)] py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 md:gap-6"
    >
      {image && (
        <Img
          picture={image.picture}
          alt=""
          ratio="1 / 1"
          sizes="112px"
          // A fixed square rather than an aspect-ratio box that grows with the
          // column: the three thumbnails have to agree with each other down the
          // list, and the copy beside them is what should take the extra width.
          className="h-20 w-20 shrink-0 rounded-[var(--radius-md)] md:h-28 md:w-28"
        />
      )}

      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
          {article.category} · {article.readMinutes} min read
        </span>
        <span className="mt-2 block text-h4 text-ink-600 transition-colors duration-[var(--dur-fast)] group-hover:text-ember-600">
          {article.title}
        </span>
        <span className="mt-2 block text-body-sm text-ink-500">{article.excerpt}</span>
      </span>
    </Link>
  );
}
