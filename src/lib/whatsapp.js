import { site } from "@/content/nav";

// One builder for a pre-filled WhatsApp deep link. 20-08-2026: the DSC module
// alone carried three identical copies of this two-line formatter
// (`DscProduct.buildWhatsappHref`, `UtilityPage.PendingUtility`,
// `UtilityPage.DscEnquiryStrip`), each encoding its own message inline, which
// is how one of them ends up with a different greeting from the others.
//
// Scope note, honestly: `MegaPanel.jsx` and `MobileNav.jsx` still have their
// own local copies for the panel's "Partner login" link. They were outside
// this pass and are left alone rather than half-migrated; point them here next
// time either is open.
export function whatsappHref(message) {
  if (!message) return site.whatsappHref;
  return `${site.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/** The DSC tree's standard enquiry message for a named product or page. */
export function dscEnquiryHref(subject) {
  return whatsappHref(`Hi ThinkOrange, I'd like to enquire about ${subject}.`);
}
