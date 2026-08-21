import {
  BadgeCheck,
  Blocks,
  BookOpen,
  Building2,
  Calculator,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  Compass,
  Container,
  Copyright,
  Factory,
  FileSignature,
  FileSpreadsheet,
  FileText,
  Gavel,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Microscope,
  Percent,
  PiggyBank,
  Receipt,
  Rocket,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Ship,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  Undo2,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

// One icon per service leaf and per practice area, so a service carries the
// same mark on the /services hub, on its category hub and in a related-service
// card. Mirrors `src/content/dsc/icons.js`, which exists for the same reason.
//
// ⚠️ This is a COMPONENT-SIDE module that happens to live under `src/content/`:
// it imports lucide, so plain Node cannot load it. Never import it from
// `nav.js`, `lib/seo.js`, or anything `scripts/prerender.mjs` /
// `scripts/content-check.mjs` pull in. Components only. Same caveat as
// `content/insights/images.js`.

const SERVICE_ICONS = {
  // GST
  "gst-registration": BadgeCheck,
  "gst-return-filing": FileSpreadsheet,
  "gst-notices-litigation": Gavel,
  "gst-itc-refunds": Undo2,
  "gst-lut-export-refunds": Ship,

  // Income Tax
  "itr-filing": FileText,
  "tax-planning-advisory": Compass,
  "tds-compliance": Percent,
  "notices-assessments": ShieldAlert,

  // Business Setup
  "private-limited-company": Building2,
  "opc-registration": UserRound,
  "llp-registration": Handshake,
  "partnership-firm": Users,
  proprietorship: Store,
  "trust-society-section8": HeartHandshake,

  // Registrations & Licences
  "msme-udyam": Factory,
  "startup-india-dpiit": Rocket,
  "iec-registration": Container,
  "icegate-registration": ScrollText,
  "trademark-registration": Copyright,
  "ngo-darpan-registration": HeartPulse,

  // Accounting, Payroll & Audit
  bookkeeping: BookOpen,
  "pf-esi-registration": ShieldCheck,
  "payroll-processing-returns": Wallet,
  "roc-annual-compliance": CalendarCheck,
  "internal-audit": ClipboardCheck,
  "specialised-audit": Microscope,

  // Tenders & Finance
  "gem-registration": ShoppingCart,
  "tender-documentation": FileSignature,
  "business-loan": Landmark,
  "personal-finance": PiggyBank,
};

const CATEGORY_ICONS = {
  gst: Receipt,
  "income-tax": Calculator,
  "business-setup": Blocks,
  "registrations-licences": BadgeCheck,
  "accounting-audit": ClipboardList,
  "tenders-finance": TrendingUp,
};

/**
 * ⛔ ALWAYS go through these helpers. Never index the objects above directly.
 *
 * Every consumer maps over nav.js, not over this file, so a slug added to
 * nav.js without a matching entry here resolves to `undefined` — and
 * `<undefined />` is a hard React crash (invalid element type), not a
 * graceful blank. That exact bug shipped once from `DscBand`'s private icon
 * map (17-08-2026) and was caught only in a live pass. The fallback makes the
 * whole class of failure impossible.
 */
export function serviceIcon(slug) {
  return SERVICE_ICONS[slug] ?? Sparkles;
}

export function categoryIcon(slug) {
  return CATEGORY_ICONS[slug] ?? Sparkles;
}
