// Recurring statutory due dates — homepage Compliance Calendar (DESIGN.md
// §3.2, §11.6) and the footer/hero mini-widgets that all consume this same
// list. CONTENT-PLAN.md §6 row 7.
//
// Each entry is a RECURRENCE RULE, not a fixed date — the UI computes the
// next actual occurrence from today() itself (see nextOccurrence below).
// This file only says WHEN something recurs; statutory.js remains the single
// source for the underlying legal fact (`sourceKey` points back to it).
//
// ⛔ ITR filing due date is DELIBERATELY OMITTED. BLOCKERS.md §1: the Finance
// Act 2026 due-date structure needs CA confirmation and is genuinely
// unsettled right now, unlike the other dates here which are either GST
// (unaffected statute) or long-stable calendar mechanics. Add it back once
// confirmed — do not guess a date for this one specifically.
//
// AOC-4 / MGT-7 are AGM-relative, not fixed calendar dates — every company's
// AGM differs. They're included as "typical" illustrative reminders (most
// companies hold AGM by 30 September) with `illustrative: true`, and the UI
// must render a caveat for those two rather than a bare countdown.

import { s } from "./statutory.js";

export const complianceCalendar = [
  {
    id: "gstr1-monthly",
    label: "GSTR-1 (monthly filers)",
    category: "gst",
    recurrence: { type: "monthly", day: 11 },
    sourceKey: "gstr1DueMonthly",
  },
  {
    id: "gstr3b-monthly",
    label: "GSTR-3B (monthly filers)",
    category: "gst",
    recurrence: { type: "monthly", day: 20 },
    sourceKey: "gstr3bDueMonthly",
  },
  {
    id: "pmt06-qrmp",
    label: "PMT-06 (QRMP monthly payment)",
    category: "gst",
    recurrence: { type: "monthly", day: 25 },
    sourceKey: "pmt06Due",
  },
  {
    id: "tds-payment-monthly",
    label: "TDS Payment (monthly)",
    category: "income-tax",
    recurrence: { type: "monthly", day: 7 },
    sourceKey: "tdsPaymentDue",
  },
  {
    id: "advance-tax-jun",
    label: "Advance Tax — 1st instalment (15%)",
    category: "income-tax",
    recurrence: { type: "annual", month: 6, day: 15 },
    sourceKey: "advanceTaxInstalments",
  },
  {
    id: "advance-tax-sep",
    label: "Advance Tax — 2nd instalment (45%)",
    category: "income-tax",
    recurrence: { type: "annual", month: 9, day: 15 },
    sourceKey: "advanceTaxInstalments",
  },
  {
    id: "advance-tax-dec",
    label: "Advance Tax — 3rd instalment (75%)",
    category: "income-tax",
    recurrence: { type: "annual", month: 12, day: 15 },
    sourceKey: "advanceTaxInstalments",
  },
  {
    id: "advance-tax-mar",
    label: "Advance Tax — 4th instalment (100%)",
    category: "income-tax",
    recurrence: { type: "annual", month: 3, day: 15 },
    sourceKey: "advanceTaxInstalments",
  },
  {
    id: "gstr9-annual",
    label: "GSTR-9 / GSTR-9C (annual)",
    category: "gst",
    recurrence: { type: "annual", month: 12, day: 31 },
    sourceKey: "gstr9Due",
  },
  {
    id: "aoc4-typical",
    label: "AOC-4 (financial statements)",
    category: "roc",
    recurrence: { type: "annual", month: 10, day: 30 },
    sourceKey: "aoc4Window",
    illustrative: true,
    illustrativeNote: "Actual due date is 30 days from YOUR company's AGM, not a fixed calendar date. Shown assuming a typical 30 September AGM.",
  },
  {
    id: "mgt7-typical",
    label: "MGT-7 (annual return)",
    category: "roc",
    recurrence: { type: "annual", month: 11, day: 29 },
    sourceKey: "mgt7Window",
    illustrative: true,
    illustrativeNote: "Actual due date is 60 days from YOUR company's AGM, not a fixed calendar date. Shown assuming a typical 30 September AGM.",
  },
];

/**
 * Resolves the label text for an entry, e.g. for a chip or table cell — pulls
 * the live value from statutory.js so a correction there propagates here too.
 */
export function statutoryValueFor(entry) {
  return s(entry.sourceKey);
}

/**
 * Given a recurrence rule and a reference date, returns the next occurrence
 * on or after that date. `today` is passed in rather than read internally —
 * scripts and workflow contexts in this project cannot call `new Date()`
 * argument-free, and passing it in also makes this testable.
 */
export function nextOccurrence(recurrence, today) {
  const year = today.getFullYear();

  if (recurrence.type === "monthly") {
    let candidate = new Date(year, today.getMonth(), recurrence.day);
    if (candidate < today) candidate = new Date(year, today.getMonth() + 1, recurrence.day);
    return candidate;
  }

  if (recurrence.type === "annual") {
    let candidate = new Date(year, recurrence.month - 1, recurrence.day);
    if (candidate < today) candidate = new Date(year + 1, recurrence.month - 1, recurrence.day);
    return candidate;
  }

  throw new Error(`compliance-calendar: unknown recurrence type "${recurrence.type}"`);
}

/**
 * Returns calendar entries with their next occurrence and days-remaining,
 * sorted soonest first — the shape the homepage/footer widgets consume
 * directly. `chipVariant` matches Chip's variants (DESIGN.md §12.5): overdue
 * genuinely shouldn't occur here since nextOccurrence always looks forward,
 * but is included for completeness if a caller passes a stale `today`.
 */
// ⚠️ UI NOTE for whoever builds the Phase 5/6 calendar component: format
// `dueDate` with a LOCAL-date formatter — use `formatDueDate` below, which
// Phase 4's hero card already consumes. Do NOT use toISOString() to display it
// — that converts to UTC first, which silently shows the wrong calendar day
// for any user in a timezone ahead of UTC (all of India). The day-count math
// is unaffected either way, since both dates involved are constructed as local
// midnight and compared consistently — only DISPLAY of the date breaks.
//
// Callers must also pass a `today` normalised to LOCAL MIDNIGHT. Pass a
// mid-afternoon Date and nextOccurrence's `candidate < today` test skips a
// deadline falling on today itself, rolling it a whole period forward.

/** DD-MM-YYYY, the convention used throughout this project. */
export function formatDueDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

/**
 * Days-remaining as display text, matching DESIGN.md §3.2's sample rows
 * ("in 10 days", "overdue"). Zero is its own case — "in 0 days" reads as a
 * bug, and a filing due at end of today is exactly when the wording matters.
 */
export function deadlineCountdown(daysRemaining) {
  if (daysRemaining < 0) return "overdue";
  if (daysRemaining === 0) return "due today";
  if (daysRemaining === 1) return "in 1 day";
  return `in ${daysRemaining} days`;
}

export function upcomingDeadlines(today, limit = 8) {
  return complianceCalendar
    .map((entry) => {
      const due = nextOccurrence(entry.recurrence, today);
      const daysRemaining = Math.round((due - today) / (1000 * 60 * 60 * 24));
      return {
        ...entry,
        dueDate: due,
        daysRemaining,
        chipVariant: daysRemaining < 0 ? "overdue" : daysRemaining <= 14 ? "due-soon" : "neutral",
      };
    })
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, limit);
}
