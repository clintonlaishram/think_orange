// Registry of written service leaves. Phase 3 adds files here as each batch
// lands; nav.js remains the source of truth for WHICH leaves exist and their
// paths — this only records which ones have CONTENT yet.
//
// ALL 31 leaves are now written (19-08-2026). The last four — itr-filing,
// tds-compliance, tax-planning-advisory and notices-assessments — were blocked
// on BLOCKERS.md §1 until the Income Tax Act 2025 section mapping was
// researched; that research is recorded in statutory.js under the INCOME TAX
// ACT, 2025 heading. T2 still keeps its graceful "content coming" state:
// nav.js remains the source of truth for which leaves exist, and a future
// menu change can add a leaf here before its content is written.

// Relative + explicit extension so plain Node can import this too — see the
// note in gst-registration.js.
import gstRegistration from "./gst-registration.js";
import gstReturnFiling from "./gst-return-filing.js";
import gstNoticesLitigation from "./gst-notices-litigation.js";
import privateLimitedCompany from "./private-limited-company.js";
import llpRegistration from "./llp-registration.js";
import opcRegistration from "./opc-registration.js";
import partnershipFirm from "./partnership-firm.js";
import proprietorship from "./proprietorship.js";
import bookkeeping from "./bookkeeping.js";
import internalAudit from "./internal-audit.js";
import specialisedAudit from "./specialised-audit.js";
import gemRegistration from "./gem-registration.js";
import tenderDocumentation from "./tender-documentation.js";
import gstItcRefunds from "./gst-itc-refunds.js";
import msmeUdyam from "./msme-udyam.js";
import startupIndiaDpiit from "./startup-india-dpiit.js";
import businessLoan from "./business-loan.js";
import gstLutExportRefunds from "./gst-lut-export-refunds.js";
import trustSocietySection8 from "./trust-society-section8.js";
import iecRegistration from "./iec-registration.js";
import icegateRegistration from "./icegate-registration.js";
import trademarkRegistration from "./trademark-registration.js";
import ngoDarpanRegistration from "./ngo-darpan-registration.js";
import pfEsiRegistration from "./pf-esi-registration.js";
import payrollProcessingReturns from "./payroll-processing-returns.js";
import rocAnnualCompliance from "./roc-annual-compliance.js";
import personalFinance from "./personal-finance.js";
import itrFiling from "./itr-filing.js";
import tdsCompliance from "./tds-compliance.js";
import taxPlanningAdvisory from "./tax-planning-advisory.js";
import noticesAssessments from "./notices-assessments.js";

/** slug -> leaf content. Keys must match nav.js service leaf slugs. */
export const serviceContent = {
  [gstRegistration.slug]: gstRegistration,
  [gstReturnFiling.slug]: gstReturnFiling,
  [gstNoticesLitigation.slug]: gstNoticesLitigation,
  [privateLimitedCompany.slug]: privateLimitedCompany,
  [llpRegistration.slug]: llpRegistration,
  [opcRegistration.slug]: opcRegistration,
  [partnershipFirm.slug]: partnershipFirm,
  [proprietorship.slug]: proprietorship,
  [bookkeeping.slug]: bookkeeping,
  [internalAudit.slug]: internalAudit,
  [specialisedAudit.slug]: specialisedAudit,
  [gemRegistration.slug]: gemRegistration,
  [tenderDocumentation.slug]: tenderDocumentation,
  [gstItcRefunds.slug]: gstItcRefunds,
  [msmeUdyam.slug]: msmeUdyam,
  [startupIndiaDpiit.slug]: startupIndiaDpiit,
  [businessLoan.slug]: businessLoan,
  [gstLutExportRefunds.slug]: gstLutExportRefunds,
  [trustSocietySection8.slug]: trustSocietySection8,
  [iecRegistration.slug]: iecRegistration,
  [icegateRegistration.slug]: icegateRegistration,
  [trademarkRegistration.slug]: trademarkRegistration,
  [ngoDarpanRegistration.slug]: ngoDarpanRegistration,
  [pfEsiRegistration.slug]: pfEsiRegistration,
  [payrollProcessingReturns.slug]: payrollProcessingReturns,
  [rocAnnualCompliance.slug]: rocAnnualCompliance,
  [personalFinance.slug]: personalFinance,
  [itrFiling.slug]: itrFiling,
  [tdsCompliance.slug]: tdsCompliance,
  [taxPlanningAdvisory.slug]: taxPlanningAdvisory,
  [noticesAssessments.slug]: noticesAssessments,
};

/** All written leaves, for validation and the review-checklist generator. */
export const writtenLeaves = Object.values(serviceContent);

/** Returns leaf content for a slug, or undefined if not yet written. */
export function getServiceContent(slug) {
  return serviceContent[slug];
}
