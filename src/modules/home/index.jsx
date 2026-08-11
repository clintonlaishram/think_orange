import { Hero } from "@/modules/home/sections/Hero";
import { TrustStrip } from "@/modules/home/sections/TrustStrip";
import { WhatWeDo } from "@/modules/home/sections/WhatWeDo";
import { WhoWeWorkWith } from "@/modules/home/sections/WhoWeWorkWith";
import { WhyThinkOrange } from "@/modules/home/sections/WhyThinkOrange";
import { HowWeWork } from "@/modules/home/sections/HowWeWork";
import { ComplianceCalendarHome } from "@/modules/home/sections/ComplianceCalendarHome";
import { DscBand } from "@/modules/home/sections/DscBand";
import { Faqs } from "@/modules/home/sections/Faqs";
import { DriverDownloads } from "@/modules/home/sections/DriverDownloads";
import { PartnerProgramme } from "@/modules/home/sections/PartnerProgramme";
import { Testimonial } from "@/modules/home/sections/Testimonial";
import { Insights } from "@/modules/home/sections/Insights";
import { CtaBand } from "@/modules/home/sections/CtaBand";

// T1 — the homepage. CONTENT-PLAN.md §6 is the authoritative section-by-
// section brief (fourteen rows, real content and archetypes); DESIGN.md
// §11.1's table is the abstract surface-cadence rule it has to satisfy.
//
// Faqs and Testimonial were moved above DriverDownloads (11-08-2026). The
// cadence has to hold in BOTH states, because Testimonial still renders null:
//
//   as authored:  Deep → Light → Dark → Light → Light-alt → Dark → Light →
//                 Deep → Light-alt → Deep → Light → Light-alt → Ember → Deep
//   as rendered:  … → Deep → Light-alt → Light → Light-alt → Ember → Deep
//
// Neither sequence repeats an archetype consecutively — Phase 5's done-when
// criterion, re-verified after the move.
//
// FAQ SITS BEFORE TESTIMONIAL, not after, and that ordering is forced: DscBand
// is Deep and DESIGN.md §11.1 row 9 fixes Testimonial at Deep, so putting the
// quote first would place two Deep sections back to back. A light-alt FAQ
// between them keeps the alternation and lets Testimonial keep its spec'd
// surface. Both are still above DriverDownloads, which was the requirement.
//
// Testimonial (§11.1 row 9) and Insights are flag-gated per BUILD-PLAN.md
// Phase 5: "wired, not shipped." Both return null today because
// src/content/testimonials.js and src/content/insights.js are empty —
// CONTENT-PLAN.md §6: inventing either is "dishonest and easy to spot."
// Add real, consented content to those files and the sections switch on with
// no change here. Faqs is NOT flag-gated in the same way: its content resolves
// from already-written service leaves, so it renders today.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <WhoWeWorkWith />
      <WhyThinkOrange />
      <HowWeWork />
      <ComplianceCalendarHome />
      <DscBand />
      <Faqs />
      <Testimonial />
      <DriverDownloads />
      <PartnerProgramme />
      <Insights />
      <CtaBand />
    </>
  );
}
