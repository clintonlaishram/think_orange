// DSC USB TOKEN — the Buy Token page's content.
//
// ⛔ 02-09-2026 (Clinton): "analyse [emudhradigital.com/purchase-token] and
// add[] buy token feature in my resource page. actually change resou[rce] page
// to buy token. so add[] the buying functionality and token det[ai]ls."
//
// STRUCTURE follows that reference: a token explainer (what kind, why it is
// required, why not to share it), then platform and quantity selection, a
// price panel, and an order action. The DESIGN follows this site, and two
// things about the reference are deliberately NOT reproduced:
//
//  ⛔ ITS PRICE. The reference shows "Token Cost Rs. 600" — that is the
//     reference site's price, not ThinkOrange's, and publishing another
//     firm's number as our own is
//     inventing a fee. `price: null` is the same discipline as `fees: null`
//     everywhere else on this site. Clinton confirmed "On request" for now
//     (02-09-2026). ⚠️ SET `price` AND THE PAGE TURNS ITSELF ON: the per-unit
//     cost, the live total and the GST note all render from it with no code
//     change. Until then the order form still captures platform and quantity
//     and we quote before anything is paid.
//
//  ⛔ ITS CHECKOUT. The reference ends in "Proceed to Pay" behind billing and
//     shipping address forms. This site has no backend and no payment
//     provider, so a checkout would be a form that collects postal addresses
//     and does nothing with them — and all five legal pages, the privacy
//     policy included, are still placeholders (`sections: null`). Ordering
//     therefore routes to WhatsApp with the order pre-filled, which is the
//     established "no backend yet, route to a human" pattern (EnquiryCard,
//     DscEnquiryStrip). Delivery address is taken in that conversation rather
//     than through an unreviewed form.
//
// ⚠️ ONE CLAIM FROM THE REFERENCE WAS DROPPED ON PURPOSE. It states that "only
// FIPS-compliant, Version 3 Tokens are accepted as per CCA guidelines". The
// FIPS half we already assert across the DSC tree, but "Version 3… as per CCA
// guidelines" is a specific, dated regulatory requirement and this repo does
// not publish those without research and a source in statutory.js. The copy
// below says what we can stand behind — that the token must be a compliant
// crypto token and that ours is — and the claim is logged in MISSING-PAGES.md.

export const tokenProduct = {
  label: "DSC USB Token",
  h1: "Buy a DSC USB Token",
  meta: {
    title: "Buy a DSC USB Token | ThinkOrange Consulting",
    description:
      "FIPS-compliant HYP2003 USB crypto tokens for Digital Signature Certificates — for a new certificate, a renewal, or replacing a lost or locked token. Salem, Tamil Nadu.",
  },
  lede:
    "A Digital Signature Certificate cannot be held as a file on a computer — it lives on a secure USB crypto token. We stock FIPS-compliant HYP2003 tokens, for a new certificate, a renewal, or replacing one that is lost, damaged or locked.",

  // Price is quoted, not published. See the header note.
  price: null,
  priceNote: "We confirm the full amount, including GST and delivery, before anything is paid.",

  // ⚠️ Mirrors the reference's own ladder. Kept as data so the select cannot
  // drift from what the order message reports.
  quantities: [1, 2, 3, 4, 5, 10, 15, 20, 25],
  bulkLabel: "More than 25",

  // The three explainer blocks, in our own words. Every portal named here is
  // one the portal guide on /dsc already lists.
  explainers: [
    {
      key: "which",
      title: "What kind of token do I need?",
      points: [
        "It has to be a compliant USB crypto token — a certificate cannot be stored as a file on a computer, and a plain USB pen drive will not work.",
        "The tokens we supply are FIPS-compliant and are what we issue certificates onto as standard.",
        "Drivers are available for Windows, macOS and Linux, and we install and test yours before you rely on it.",
      ],
    },
    {
      key: "why",
      title: "Why is a token required at all?",
      points: [
        "The certificate's private key stays inside the hardware, so it cannot be copied off the device.",
        "It adds a second factor: someone needs the token itself and its password, not just one of them.",
        "Statutory portals expect it — MCA21/ROC, GST, income tax, EPFO, DGFT/ICEGATE and e-tendering all sign from a token.",
      ],
    },
    {
      key: "care",
      title: "Why you should never share it",
      points: [
        "The certificate inside is your legal identity online — anything signed with it is signed as you.",
        "Treat it the way you would treat a bank card and its PIN together, and keep it somewhere you would notice its absence quickly.",
        "Tokens lock permanently after a set number of wrong password attempts, and a certificate cannot be recovered from a lost one. If you are close to the limit, stop and call us.",
      ],
    },
  ],

  // What a buyer is actually choosing between. `platform` decides which driver
  // we send, not which token — the hardware is the same.
  platformNote:
    "The token is the same either way; your operating system only decides which driver we set you up with.",

  buyingFor: [
    "A new Class 3 or DGFT certificate being issued",
    "A renewal, where your current token is worn, damaged or you would rather start fresh",
    "Replacing a token that is lost, damaged or locked",
    "Stocking up as a professional or channel partner issuing to your own clients",
  ],

  bulkNote:
    "Bulk pricing is available for chartered accountants, tax practitioners and channel partners ordering in volume — tell us the quantity and we will quote for it.",
};
