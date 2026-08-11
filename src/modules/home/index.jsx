import { Hero } from "@/modules/home/sections/Hero";
import { TrustStrip } from "@/modules/home/sections/TrustStrip";
import { WhatWeDo } from "@/modules/home/sections/WhatWeDo";
import { WhoWeWorkWith } from "@/modules/home/sections/WhoWeWorkWith";
import { WhyThinkOrange } from "@/modules/home/sections/WhyThinkOrange";
import { HowWeWork } from "@/modules/home/sections/HowWeWork";
import { ComplianceCalendarHome } from "@/modules/home/sections/ComplianceCalendarHome";
import { DscBand } from "@/modules/home/sections/DscBand";
import { DriverDownloads } from "@/modules/home/sections/DriverDownloads";
import { PartnerProgramme } from "@/modules/home/sections/PartnerProgramme";
import { Testimonial } from "@/modules/home/sections/Testimonial";
import { Insights } from "@/modules/home/sections/Insights";
import { CtaBand } from "@/modules/home/sections/CtaBand";

// T1 — the homepage. CONTENT-PLAN.md §6 is the authoritative section-by-
// section brief (fourteen rows, real content and archetypes); DESIGN.md
// §11.1's table is the abstract surface-cadence rule it has to satisfy.
//
// Rendered surface cadence (Testimonial/Insights render null — see below —
// so they contribute no surface to this sequence at all):
//   Deep → Light → Dark → Light → Light-alt → Dark → Light → Deep → Light →
//   Light-alt → Ember → Deep
// No archetype repeats consecutively — Phase 5's done-when criterion.
//
// Testimonial (row 11) and Insights (row 12) are flag-gated per
// BUILD-PLAN.md Phase 5: "wired, not shipped." Both are imported and placed
// here in their correct cadence position, and both return null today
// because src/content/testimonials.js and src/content/insights.js are
// empty — CONTENT-PLAN.md §6: inventing either is "dishonest and easy to
// spot." Add real, consented content to those two files and these sections
// switch on with no further change here.
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
      <DriverDownloads />
      <PartnerProgramme />
      <Testimonial />
      <Insights />
      <CtaBand />
    </>
  );
}
