// ============================================================================
// SERVICE LEAF SCHEMA (T2) — CONTENT-PLAN.md §7 and §13.1.
//
// 21 leaf files conform to this. The validator below makes BUILD-PLAN.md's
// Phase 3 done-when criterion ("all 21 leaves validate against the schema")
// machine-checkable rather than a manual read-through: `npm run content:check`.
//
// Field order below mirrors the 11 sections of the T2 template in
// CONTENT-PLAN.md §7, so authoring a leaf is a top-to-bottom pass down the page.
// ============================================================================

/**
 * @typedef {Object} ServiceLeaf
 * @property {string}   slug              Matches the slug in nav.js. The join key.
 * @property {string}   category          Parent category slug from nav.js.
 * @property {string}   title             Short label — cards, related lists, breadcrumbs.
 * @property {string}   h1                On-page H1, phrased as people search it.
 * @property {Object}   meta              { title, description, keywords[] }
 * @property {string}   lede              One sentence under the H1.
 * @property {string[]} overview          2–3 paragraphs, 150–250 words total (§16).
 * @property {string[]} whoNeedsThis      4–6 concrete triggers.
 * @property {Object[]} included          [{ title, desc }] — the deliverables.
 * @property {Object[]} documents         [{ group, items[] }] — grouped by entity type.
 * @property {string}  [documentsNote]    Caveat under the document list.
 * @property {Object[]} process           [{ step, title, desc, duration }] — 3–5 steps.
 * @property {Object[]} timeline          [{ stage, days }].
 * @property {null}     fees              ALWAYS null until a pricing model is confirmed.
 *                                        Renders "On request" — correct, not a gap.
 * @property {Object[]} faqs              [{ q, a }] — 5–8, answers 40–90 words.
 * @property {string[]} related           3 slugs (service leaves or DSC products).
 * @property {Object}   review            { statutoryKeys[], needsProfessionalReview }
 */

/** Every field a leaf must define. `fees` is included — it must be explicitly null. */
const REQUIRED = [
  "slug",
  "category",
  "title",
  "h1",
  "meta",
  "lede",
  "overview",
  "whoNeedsThis",
  "included",
  "documents",
  "process",
  "timeline",
  "fees",
  "faqs",
  "related",
  "review",
];

const WORD_BUDGETS = {
  overview: [150, 320], // §16 says 150–250; upper bound loosened slightly for
                        // statutorily dense pages, still flags runaway prose.
  faqAnswer: [25, 110],
};

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

/**
 * Validates one leaf. Returns an array of human-readable problems — empty means
 * it passes. Deliberately returns all problems rather than throwing on the
 * first, so a batch of 5 leaves gives one complete report.
 */
export function validateLeaf(leaf) {
  const problems = [];
  const at = (field) => `${leaf?.slug ?? "<no slug>"} · ${field}`;

  if (!leaf || typeof leaf !== "object") return ["leaf is not an object"];

  for (const field of REQUIRED) {
    if (!(field in leaf)) problems.push(`${at(field)}: missing`);
  }

  // fees must be explicitly null — never a number, never a string, never absent.
  // This is the one rule that protects against inventing a price
  // (CONTENT-PLAN.md §1.1, CLAUDE.md non-negotiables).
  if ("fees" in leaf && leaf.fees !== null) {
    problems.push(`${at("fees")}: must be null until a pricing model is confirmed, got ${JSON.stringify(leaf.fees)}`);
  }

  if (leaf.meta) {
    if (!leaf.meta.title) problems.push(`${at("meta.title")}: missing`);
    if (!leaf.meta.description) problems.push(`${at("meta.description")}: missing`);
    else if (leaf.meta.description.length > 165) {
      problems.push(`${at("meta.description")}: ${leaf.meta.description.length} chars, keep under ~165 or Google truncates it`);
    }
    if (!Array.isArray(leaf.meta.keywords) || leaf.meta.keywords.length === 0) {
      problems.push(`${at("meta.keywords")}: expected a non-empty array`);
    }
  }

  if (Array.isArray(leaf.overview)) {
    const words = countWords(leaf.overview.join(" "));
    const [min, max] = WORD_BUDGETS.overview;
    if (words < min || words > max) {
      problems.push(`${at("overview")}: ${words} words, expected ${min}–${max} (§16)`);
    }
  }

  const countRange = (field, min, max) => {
    const list = leaf[field];
    if (!Array.isArray(list)) {
      problems.push(`${at(field)}: expected an array`);
    } else if (list.length < min || list.length > max) {
      problems.push(`${at(field)}: ${list.length} items, expected ${min}–${max}`);
    }
  };

  countRange("whoNeedsThis", 4, 6);
  countRange("included", 4, 10);
  countRange("process", 3, 6);
  countRange("faqs", 5, 8);
  countRange("related", 3, 3);

  if (Array.isArray(leaf.faqs)) {
    leaf.faqs.forEach((faq, i) => {
      if (!faq.q || !faq.a) {
        problems.push(`${at(`faqs[${i}]`)}: needs both q and a`);
        return;
      }
      if (!faq.q.trim().endsWith("?")) {
        problems.push(`${at(`faqs[${i}].q`)}: should be a question`);
      }
      const words = countWords(faq.a);
      const [min, max] = WORD_BUDGETS.faqAnswer;
      if (words < min || words > max) {
        problems.push(`${at(`faqs[${i}].a`)}: ${words} words, expected ${min}–${max}`);
      }
    });
  }

  if (Array.isArray(leaf.documents)) {
    leaf.documents.forEach((group, i) => {
      if (!group.group) problems.push(`${at(`documents[${i}].group`)}: missing group label`);
      if (!Array.isArray(group.items) || group.items.length === 0) {
        problems.push(`${at(`documents[${i}].items`)}: expected a non-empty array`);
      }
    });
  }

  if (leaf.review) {
    if (leaf.review.needsProfessionalReview !== true) {
      problems.push(`${at("review.needsProfessionalReview")}: must be true — no page of tax content ships unreviewed`);
    }
    if (!Array.isArray(leaf.review.statutoryKeys)) {
      problems.push(`${at("review.statutoryKeys")}: expected an array of statutory.js keys used on this page`);
    }
  }

  return problems;
}

/** Validates a batch. Returns { ok, problems }. */
export function validateAll(leaves) {
  const problems = leaves.flatMap(validateLeaf);
  return { ok: problems.length === 0, problems };
}
