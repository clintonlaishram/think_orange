import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// ONE delegated listener for every WhatsApp and phone link on the site, rather
// than an onClick on each of them.
//
// Twenty files render a `wa.me` link — ComingSoon, FaqSection, FloatingWhatsApp,
// MobileNav, MegaPanel, Footer, Article, CtaBand, DscBand, Testimonial,
// LegalPage, EnquiryCard, ServiceLeaf, DscEsign, DscFinder, DscFaqs,
// DscDrivers, TokenOrder, contact, not-found — plus a phone link in most of
// them. Instrumenting each one means twenty edits that a twenty-first call
// site silently opts out of, which is the drift this repo extracts helpers to
// avoid. A delegated listener covers every existing link, every future one,
// and the two local copies of the href builder in MegaPanel/MobileNav that
// `lib/whatsapp.js` never absorbed.
//
// ⛔ THE href IS NEVER SENT, AND THAT IS NOT FASTIDIOUSNESS. A `wa.me` link's
// `?text=` carries the pre-filled message, and several are composed from what
// the visitor just typed — TokenOrder puts their name, phone, email and
// DELIVERY ADDRESS in it, and EnquiryCard their name, phone and email. Logging
// the URL would ship all of that into GA4, a third party, with no consent
// prompt and no privacy policy behind it (all five legal pages are still
// `sections: null`). Only the link's own visible label and the current path go
// out — both authored by us, neither derived from user input.
//
// Uses `click` in the bubble phase on `document`, so React's own handlers run
// first and nothing here can interfere with a call site's behaviour. GA4's
// default transport is `navigator.sendBeacon`, so an event fired as the page
// unloads (a WhatsApp link without target="_blank") still gets out.
export function useContactLinkTracking(pathname) {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target?.closest?.("a[href]");
      if (!link) return;

      // `getAttribute`, not `.href` — the property resolves to an absolute URL,
      // which for `tel:` is fine but makes the prefix test read oddly. The
      // attribute is what the author wrote.
      const href = link.getAttribute("href") ?? "";

      let eventName = null;
      if (href.startsWith("tel:")) eventName = "phone_click";
      else if (href.includes("wa.me")) eventName = "whatsapp_click";
      if (!eventName) return;

      trackEvent(eventName, {
        // Capped: GA4 truncates a parameter value at 100 characters anyway,
        // and a label longer than that is a paragraph, not a button.
        link_text: (link.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 100),
        page_path: pathname,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);
}
