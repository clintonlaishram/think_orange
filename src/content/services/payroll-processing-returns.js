import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js and bookkeeping.js.
//
// ⛔ Salary TDS is described GENERICALLY throughout this file — no Income Tax
// Act section number, no form name, no "Assessment Year". See BLOCKERS.md §1:
// the Income Tax Act 2025 replaced the 1961 Act on 01-04-2026, renumbering
// every section and TDS form, so naming either here would very likely be
// wrong within months of publishing. `tdsPaymentDue` (statutory.js) is the one
// safe TDS-related key — it is explicitly marked as a calendar mechanic only,
// not tied to a section number — and is the only TDS fact cited on this page.
//
// Angle: this is the RECURRING service that sits downstream of pf-esi-
// registration.js's one-time registration — make that relationship explicit
// rather than re-explaining EPF/ESI applicability from scratch.

export default {
  slug: "payroll-processing-returns",
  category: "accounting-audit",
  title: "Payroll Processing & Returns",
  h1: "Payroll Processing & Returns in Salem, Tamil Nadu",

  meta: {
    title: "Payroll Processing & Returns in Salem | ThinkOrange",
    description:
      "Monthly payroll, EPF and ESI filing, Professional Tax deduction and salary TDS deposit — run end to end. Salem, Tamil Nadu, for clients across India.",
    keywords: [
      "payroll processing services salem",
      "payroll outsourcing tamil nadu",
      "epf esi monthly return filing",
      "professional tax deduction salem",
      "payroll compliance services",
    ],
  },

  lede:
    "Monthly payroll run end to end — payslips, EPF and ESI filings, Professional Tax and salary TDS deposited on time, every month.",

  overview: [
    "Registering for EPF and ESI is a one-time step; running payroll correctly every month is not, and it is where most of the actual compliance risk sits. Each pay cycle has to reconcile salaries, statutory deductions and several separate government filings — EPF, ESI, Professional Tax where it applies, and salary TDS — against their own deadlines, for every employee, every month, indefinitely.",

    `We prepare and file the EPF Electronic Challan-cum-Return, due by ${s("epfEcrDue")}, and the ESI monthly contribution, due by ${s("esiMonthlyContributionDue")}. On top of both, ESI's half-yearly consolidated return is due by ${s("esiHalfYearlyReturnDue")}. None of these deadlines move together, and missing one restarts interest and damages from that specific date, not from whichever filing you remembered first.`,

    `In Salem, Professional Tax on salaries is ${s("tnProfessionalTaxMechanism")}. The specific slab table is set by each corporation separately, so we confirm the current one for wherever your staff are actually based rather than assuming another city's rates apply here. Salary TDS is deducted from every payslip and deposited each month — the calendar mechanic is stable, due by ${s("tdsPaymentDue")} — though which section and form it sits under is being re-confirmed following this year's transition to the new Income Tax Act, so we advise on that separately rather than naming it on this page.`,
  ],

  whoNeedsThis: [
    "You already have employees on EPF and/or ESI and need the monthly filing actually done, not just the registration.",
    "You want one system handling payslips, statutory deductions and government filings together, instead of three separate people or vendors.",
    "You are growing headcount and the payroll spreadsheet that worked for five people is starting to miss things at fifteen.",
    "You need Professional Tax deducted and deposited correctly for staff based in Salem or elsewhere in Tamil Nadu.",
    "You want salary TDS deducted and deposited every month without it becoming a year-end scramble.",
    "You are switching payroll vendors, or bringing payroll in-house, and want the handover done cleanly.",
  ],

  included: [
    {
      title: "Monthly payroll run",
      desc: "Salaries, deductions and net pay calculated and payslips issued every month, on a fixed date you can plan around.",
    },
    {
      title: "EPF ECR filing",
      desc: `The Electronic Challan-cum-Return prepared and filed monthly, due by ${s("epfEcrDue")}, so contributions are never sitting unpaid past the date.`,
    },
    {
      title: "ESI return filing",
      desc: `Monthly ESI contributions filed by ${s("esiMonthlyContributionDue")}, with the half-yearly consolidated return filed by ${s("esiHalfYearlyReturnDue")} on top.`,
    },
    {
      title: "Professional Tax deduction",
      desc: "Deducted from salary and deposited on the local municipal corporation's own half-yearly schedule, correctly for wherever your staff are based.",
    },
    {
      title: "Salary TDS deposit",
      desc: "Deducted from every payslip and deposited each month, reconciled against your books rather than estimated.",
    },
    {
      title: "Full and final settlement",
      desc: "Exits handled correctly — final pay, leave encashment and the statutory filings an exit still triggers, not left as a loose end.",
    },
    {
      title: "Payroll register and MIS",
      desc: "A statutory register and a management report you can hand to an auditor or a bank without reconstructing anything.",
    },
  ],

  documents: [
    {
      group: "To get started",
      items: [
        "Employee master data — name, wage structure, date of joining, PAN, and EPF/ESI numbers if already registered",
        "Attendance and leave records for the period",
        "Existing payroll register or software export, if you are switching from an existing system",
        "EPFO and ESIC establishment codes and portal logins, if already registered separately",
      ],
    },
    {
      group: "Each month",
      items: [
        "Attendance, leave and any variable pay — incentives, overtime, reimbursements — for the period",
        "New joiners' and exits' documentation for the month",
        "Any change to salary structure or statutory rates that needs to be reflected",
      ],
    },
  ],

  documentsNote:
    "Payroll runs on whatever cadence your business actually pays on. Tell us your pay date and cut-off upfront — it decides when we need each month's inputs from you, not the other way round.",

  process: [
    {
      step: 1,
      title: "Payroll setup",
      desc: "Employee master data, salary structure and statutory registrations reviewed, and gaps flagged before the first live run.",
      duration: t("payrollSetupReview"),
    },
    {
      step: 2,
      title: "Monthly inputs collected",
      desc: "Attendance, leave and variable pay collected against an agreed cut-off date each month.",
      duration: t("payrollMonthlyCutoff"),
    },
    {
      step: 3,
      title: "Payroll processed and filed",
      desc: "Salaries calculated, payslips issued, and EPF, ESI, Professional Tax and TDS deposited within their own deadlines.",
      duration: t("payrollProcessingTurnaround"),
    },
    {
      step: 4,
      title: "Reconciliation and handover",
      desc: "The month's filings reconciled against your books, with a register you or your auditor can rely on.",
      duration: "Ongoing, monthly",
    },
  ],

  timeline: [
    { stage: "Payroll setup and review", days: t("payrollSetupReview") },
    { stage: "Monthly cut-off to processing", days: t("payrollMonthlyCutoff") },
    { stage: "EPF ECR due", days: s("epfEcrDue") },
    { stage: "ESI monthly contribution due", days: s("esiMonthlyContributionDue") },
    { stage: "Salary TDS deposit due", days: s("tdsPaymentDue") },
  ],

  fees: null,

  faqs: [
    {
      q: "Is this the same as PF and ESI registration?",
      a: "No. Registration is the one-time step that gets you an EPFO and ESIC code; this is the recurring monthly service that actually files against those codes every month, for as long as you have covered employees. Most clients need both, in that order.",
    },
    {
      q: "How is Professional Tax handled for our staff?",
      a: `Professional Tax on salaries in Tamil Nadu is ${s("tnProfessionalTaxMechanism")}. The exact slab table is set separately by each corporation, so we confirm the current one for wherever your staff are actually based rather than assuming one city's rates apply everywhere.`,
    },
    {
      q: "What about TDS on salaries — do you handle that too?",
      a: "Yes. Salary TDS is deducted from every payslip and deposited each month as part of the same cycle, reconciled against your books rather than left to a year-end catch-up. We advise separately on the specific provisions involved, which are currently being re-confirmed following this year's change to the Income Tax Act.",
    },
    {
      q: "What happens when an employee leaves partway through the month?",
      a: "Their full and final settlement is processed in that cycle — final pay, leave encashment, and the same statutory deductions and filings any other month's pay attracts. It does not wait for the next payroll run.",
    },
    {
      q: "Can you take over payroll from our current vendor or in-house team?",
      a: "Yes, and it is usually straightforward once we have the employee master data and the existing EPF and ESI codes. The main thing worth flagging upfront is any unresolved discrepancy in a recent filing — easier to fix before a handover than after.",
    },
    {
      q: "Do you handle Professional Tax and TDS even if we don't run PF or ESI through you?",
      a: "Yes — payroll processing and the registrations are separate services, and we run the monthly cycle correctly whether the underlying EPF and ESI codes were set up by us or by someone else.",
    },
  ],

  related: ["pf-esi-registration", "bookkeeping", "roc-annual-compliance"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "epfEcrDue",
      "esiMonthlyContributionDue",
      "esiHalfYearlyReturnDue",
      "tnProfessionalTaxMechanism",
      "tdsPaymentDue",
    ],
    notes:
      "Deliberately states no Income Tax Act section number or TDS form name anywhere — see BLOCKERS.md §1. The Tamil Nadu Professional Tax slab table is deliberately NOT stated: research found materially different half-yearly slab figures even for the same Chennai corporation across two sources, and one source explicitly confirms Salem's own slab notification differs from Chennai's. Confirm Salem City Municipal Corporation's current slab table directly before publishing any rupee figure for Professional Tax.",
  },
};
