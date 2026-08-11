// Registry of written service leaves. Phase 3 adds files here as each batch
// lands; nav.js remains the source of truth for WHICH leaves exist and their
// paths — this only records which ones have CONTENT yet.
//
// Templates must handle the gap: 17 of 21 leaves are written, so T2 needs a
// graceful "content coming" state rather than assuming a leaf resolves.
// Remaining 4 (itr-filing, tds-compliance, tax-planning-advisory,
// personal-finance) are blocked or constrained — see BLOCKERS.md §1.

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
};

/** All written leaves, for validation and the review-checklist generator. */
export const writtenLeaves = Object.values(serviceContent);

/** Returns leaf content for a slug, or undefined if not yet written. */
export function getServiceContent(slug) {
  return serviceContent[slug];
}
