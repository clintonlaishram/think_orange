# Blockers

Things that stop work and need a decision from Clinton or a professional.
Not a backlog — only items that genuinely cannot proceed safely.

---

## 1. ⛔ Income Tax Act, 2025 — blocks the ITR Filing and TDS Compliance pages

**Raised** 10-08-2026, during Phase 3b · **Owner** Clinton + CA · **Blocks** 2 of 21 service leaves

### What happened

Phase 3b was meant to write four statutorily dense pages: GST Return Filing,
GST Notices & Litigation, ITR Filing and TDS Compliance. Research before writing
turned up something that changes the scope.

**The Income Tax Act, 2025 came into force on 01-04-2026, replacing the Income
Tax Act, 1961.** Four months before today's date. It is not an amendment — it is
a re-codification:

- **Virtually every section is renumbered.** 800+ sections reduced to 536 across
  23 chapters.
- **"Previous Year" and "Assessment Year" are abolished**, replaced by a single
  concept, **"Tax Year"**.
- **TDS and TCS return forms are renumbered from 01-04-2026:**
  24Q → **Form 138**, 26Q → **Form 140**, 27Q → **Form 144**, 27EQ → **Form 143**.
- Salary TDS now sits under **Section 392**, not Section 192.
- Income earned up to 31-03-2026 remains governed by the 1961 Act; income from
  01-04-2026 onwards by the 2025 Act.

### Why this stops the work rather than slowing it

Both pages would have been written almost entirely in the vocabulary of a
repealed Act. Not subtly wrong — wrong in every section reference, every form
name, and the core "Assessment Year" framing that structures an ITR page.
Publishing that on a tax consultancy's own website, four months after the new
Act took effect, would undermine the exact competence the site exists to
demonstrate.

This is also precisely the failure mode the content architecture was built to
prevent, and it worked: the rule that statutory facts must be **researched, not
recalled** (CONTENT-PLAN.md §13.0, CLAUDE.md) is what surfaced it. Written from
model recall, both pages would have looked confident and been obsolete.

### What is needed before these two pages can be written

1. **The official section mapping, 1961 → 2025.** The Income Tax Department has
   published transition FAQs and a mapping; secondary blog summaries are not
   good enough for ~40 section references across two pages.
   Starting point: `incometaxindia.gov.in` — "FAQs on Interplay and Transition
   to the Income-tax Act, 2025".
2. **A decision on how to present the transition.** Clients filing right now are
   filing for FY 2025-26 — income earned under the **1961** Act, filed during the
   **2025** Act era. So the pages must serve both, and how they do that is a
   content-design choice, not something to guess:
   - **Option A** — lead with the 2025 Act, note the 1961 Act applies to
     FY 2025-26 and earlier. Forward-looking, correct for longest.
     *Recommended.*
   - **Option B** — lead with FY 2025-26 (what clients are filing today), with
     the 2025 Act as "what changes next year". Matches current search intent,
     but goes stale in months.
   - **Option C** — split into separate pages per regime. Most accurate, worst
     for SEO (thin, competing pages).
3. **Confirmation of the AY 2026-27 due-date structure.** Research indicates
   Finance Act 2026 moved to a three-tier structure — 31 July (ITR-1/2),
   31 August (non-audit ITR-3/4), 31 October (audit under the successor to
   s.44AB) — rather than the long-standing two-tier July/October split. Needs CA
   confirmation; it is not what a model would recall.

### What was done instead

The two **GST** pages were written and are complete: `gst-return-filing.js` and
`gst-notices-litigation.js`. GST is governed by the CGST Act 2017 and is entirely
unaffected by the income-tax re-codification, so that work was safe to do.

Phase 3b therefore delivered 2 of 4 planned leaves. The remaining two move to a
later session, once items 1–3 above are settled.

### Knock-on effects to check when this unblocks

- `CONTENT-PLAN.md` §15's source bullets and §7.2's priority list were written
  in 1961 Act vocabulary ("TDS return filing", "Section 44AD") — re-read before
  writing.
- The **Compliance Calendar** (DESIGN.md §3.2, homepage section 7, Phase 3d)
  carries income-tax due dates. Same problem, smaller surface.
- `Tax Planning & Advisory` (Phase 3c) will hit this too.
- Any page mentioning "Assessment Year" anywhere.

---

## 2. ⚠️ Tamil Nadu QRMP category — blocks publishing a stated due date

**Raised** 10-08-2026 · **Owner** CA · **Blocks** one line on `gst-return-filing.js`

Under QRMP, GSTR-3B is due on the **22nd** of the month following the quarter for
Category X states and the **24th** for Category Y. Research did not settle which
group Tamil Nadu is in.

The page currently states both, which is honest but unhelpful for a Salem client
trying to work out their own deadline. Confirm the group and set
`gstr3bDueQuarterly` in `src/content/statutory.js` to the single correct value.

---

## 3. ⚠️ GSTR-3B late fee cap

**Raised** 10-08-2026 · **Owner** CA · **Blocks** nothing, but is published

`gstLateFee` states "₹50 per day, or ₹20 per day for a nil return, subject to a
cap". The cap has been revised by notification more than once and the current
figure is not stated. Either confirm and add it, or confirm that omitting it is
acceptable.

---

## Resolved

_None yet._
