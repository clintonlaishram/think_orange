// PARTNER-WITH-US CONTENT (T6, /partner-with-us) — CONTENT-PLAN.md §10.
//
// ⛔ 02-09-2026 (Clinton): "CA, CS, Tax practitioner[s] don't refer their
// clients. They themselves onboard with us to process the DSC for their
// clients. right now it is writ[ten] in [a] different interpretation."
//
// THIS FILE WAS ENTIRELY REWRITTEN ON THAT NOTE. Every previous sentence
// described a REFERRAL programme — "Refer your clients' DSC needs to us",
// "Commission on referrals", "You refer the requirement to us with your
// client's details; we handle verification, issuance, the token and dispatch".
// That is the opposite of the product. A partner is not handing work over;
// they enrol through ThinkOrange and issue certificates
// THEMSELVES — their own login, their own video verification, their own
// client relationship, their own margin. We enable and support; we do not take
// the client.
//
// ⚠️ THE DISTINCTION IS LOAD-BEARING IN THE COPY, not a matter of tone. If a
// sentence could be read as "send your client to ThinkOrange", it is wrong.
// The tell is the verb: partners ISSUE, they do not REFER.
//
// Structure and much of the wording follow the reference Clinton supplied
// (thinkorange-dsc-usecase-pages.html). ⛔ THAT FILE MARKS ITS OWN UNCONFIRMED
// FIGURES with a `.tbc` class and carries two explicit "Note to ThinkOrange"
// blocks saying they need real values before publishing. Every one of those is
// therefore ABSENT here:
//   - the commission percentage (`[X]%`)
//   - login activation time (`[X hrs]`)
//   - retail price ranges and margin percentages in the earnings table
//   - "we reply within one working day" — a turnaround commitment, so it comes
//     from `turnaround.js` (`enquiryResponseTime`, value null) like every other
//     one on this site, never typed in.
// What the reference asserts WITHOUT a tbc mark is Clinton's own claim and is
// carried over: no joining fee, no minimum volume, your own login, your
// clients stay yours, free onboarding, partner-rate tokens, English and Tamil
// support. See MISSING-PAGES.md for the two that still want a human check.

export const partnerContent = {
  meta: {
    title: "Become a DSC Partner | ThinkOrange Consulting",
    description:
      "Partner with ThinkOrange and issue Class 3, Combo and DGFT certificates for your own clients — your own login, your own verification, your clients stay yours.",
  },
  eyebrow: "DSC Partner Programme",
  h1: "Issue Digital Signature Certificates for your own clients",
  heroLede:
    "Partner with ThinkOrange and process certificates yourself — your own login, your own verification, your own margin. Whether you already issue DSCs and want better terms, or you are a practice tired of sending clients elsewhere mid-engagement.",

  // Unmarked assertions from the reference — Clinton's own claims, no numbers.
  heroTicks: [
    "No joining fee",
    "Your own issuing login",
    "Your clients stay yours",
    "Free onboarding & training",
    "Tokens at partner rates",
    "Support in English & Tamil",
  ],

  // --- 04-09-2026 ---------------------------------------------------------
  // Clinton supplied this section's copy verbatim and a reference layout (a
  // bento: one tall card beside two small tiles and one wide one), so `whyUs`
  // below is now a SHAPED object rather than a flat list — the page renders
  // `lead` as the tall card and `tiles` as the three beside it.
  //
  // ⚠️ Order is load-bearing: `tiles` renders small, small, WIDE. A fourth
  // entry breaks that composition rather than wrapping neatly.
  //
  // Every claim here is Clinton's own, given directly, and none carries a
  // number: "direct commissions" without a percentage (the reference's own
  // `[X]%` is still unconfirmed — see this file's header), "no bulk token
  // purchase" rather than a rupee floor.
  //
  // ⚠️ ONE claim is worth a second look: "Instant in-house issuance" is
  // Clinton's own wording and is a SPEED claim. It is published as given
  // because it describes a mechanism rather than a guarantee — a partner
  // raises the application from their own login, so there is no vendor step to
  // wait on — and the body deliberately says that instead of naming a
  // turnaround. Do NOT let a future edit turn it into "issued in X hours";
  // that is `turnaround.js`'s territory and the value there is still null.
  whyUs: {
    lead: {
      badge: "No joining fee",
      title: "Zero upfront investment.",
      body: "No bulk token purchase, no minimum volume and no joining fee to get started. You buy a certificate when a client actually asks for one — never before.",
    },
    tiles: [
      {
        key: "commissions",
        surface: "ember",
        label: "Your margin",
        title: "Direct commissions",
        body: "Earn a direct margin on every certificate you process. Your slab is confirmed in writing before you commit to anything.",
      },
      {
        key: "login",
        surface: "dark",
        label: "Your clients, your data",
        title: "Your own partner login",
        body: "Complete control over your clients' records. Nothing is routed through us and nothing is visible to another partner.",
      },
      {
        key: "issuance",
        surface: "dark",
        wide: true,
        label: "No vendor delays",
        title: "Instant in-house issuance",
        body: "Raise, verify and complete an application from your own login — there is no vendor in the middle to queue behind, and no one else's turnaround to explain to your client.",
      },
    ],
  },

  // ⚠️ RETAINED, NOT RENDERED. This was `whyUs` until 04-09-2026, when Clinton
  // replaced the section's copy with the four benefit claims above. Kept
  // exported and unreferenced — the same discipline `switching`,
  // `responsibilities` and `earnings` already carry in this file — because it
  // is the page's only differentiation copy (a practising compliance firm
  // rather than a token dealer, Tamil support, PSU issuance) and restoring it
  // anywhere is a render-only change. Do not prune it as dead content.
  whyUsCredibility: [
    {
      title: "A practising compliance firm, not a token dealer",
      body: "We file GST returns, run internal audits and incorporate companies. When you ask which certificate a particular filing needs, the answer comes from someone who does that filing — not a sales desk reading off a product list.",
    },
    {
      title: "Support that speaks your client's language",
      body: "English and Tamil, from Salem. When your client cannot install a driver on a Friday evening, that call gets resolved rather than becoming a ticket number.",
    },
    {
      title: "We issue for government and PSU work ourselves",
      body: "Certificates issued to public sector undertakings and government departments carry stricter scrutiny than routine retail issuance. We handle that in-house, which is why the unusual cases you eventually hit are ones we have already seen.",
    },
    {
      title: "Tokens as well as certificates",
      body: "Compliant tokens supplied at partner rates alongside the certificate, so you are not sourcing hardware from a separate vendor and hoping the driver matches.",
    },
  ],

  // For practitioners already issuing under another certifying authority.
  switching: {
    eyebrow: "Already issuing DSCs?",
    heading: "Switching costs you nothing",
    body: "If you already issue certificates through another certifying authority, you are not starting over. Your clients, your pricing and your working method stay exactly as they are — only the account behind them changes, and certificates already issued elsewhere stay valid until they expire.",
    pains: [
      {
        title: "Commission that stopped improving",
        body: "Slabs that never moved as your volume grew.",
      },
      {
        title: "Support that does not answer",
        body: "A ticket queue while a client waits on a tender deadline.",
      },
      {
        title: "Approvals that take days",
        body: "Applications sitting without explanation while you field the calls.",
      },
    ],
  },

  // Who this suits. Every one of these ISSUES; none of them refers.
  // ⚠️ 04-09-2026: `body` IS NO LONGER RENDERED. Clinton asked for this section
  // to become an icon-and-label grid with no subline, so the page shows the
  // icon and the `title` only. The bodies are kept here — unreferenced, the
  // same discipline `switching` / `responsibilities` / `earnings` /
  // `whyUsCredibility` already carry in this file — because each is the one
  // sentence explaining WHY that audience is a fit, and putting them back is a
  // render-only change. Do not prune them as dead content.
  //
  // `key` is the icon lookup, resolved through `whoIcon()` in the template.
  whoItsFor: [
    {
      key: "practitioners",
      title: "CAs, CSs & tax practitioners",
      body: "Issue certificates alongside the filings you already do, instead of sending a client elsewhere mid-engagement.",
    },
    {
      key: "advocates",
      title: "Advocates & consultants",
      body: "Clients handling tenders, ROC work or trademark filings need certificates. Keep that revenue inside the practice.",
    },
    {
      key: "resellers",
      title: "Existing DSC resellers",
      body: "Already issuing under another certifying authority? Switch to us for better terms and support that answers.",
    },
    {
      key: "it",
      title: "IT & software vendors",
      body: "You already sell to the businesses that need certificates. Add DSCs and tokens to the same client relationship.",
    },
    {
      key: "tokens",
      title: "Token dealers",
      body: "Selling the hardware but not the certificate that goes on it means half the margin on every sale.",
    },
    {
      key: "corporate",
      title: "Corporate service firms",
      body: "Incorporation and compliance practices — director certificates are part of the job anyway.",
    },
  ],

  onboarding: [
    {
      step: 1,
      title: "Apply",
      desc: "Tell us about your practice, your expected volume, and whether you already issue certificates elsewhere.",
    },
    {
      step: 2,
      title: "KYC and partner agreement",
      desc: "We verify your details and you sign an agreement covering verification obligations, conduct and commercial terms. The documents required at registration are listed with the application form below.",
    },
    {
      step: 3,
      title: "Your issuing login is activated",
      desc: "Your account is created under our certifying-authority partnership and the credentials are issued to you — the mail ID you apply with becomes your login username.",
    },
    {
      step: 4,
      title: "Onboarding session",
      desc: "We walk you through raising an application, running video verification correctly, downloading to a token, and the errors that come up most. Free, and for as long as you need.",
    },
    {
      step: 5,
      title: "You issue",
      desc: "You raise applications directly from that point. We stay available for escalations, unusual cases and anything the portal throws at you.",
    },
  ],

  // ⚠️ What a partner takes on. This is not boilerplate: video verification is
  // mandated by the Controller of Certifying Authorities, and a certificate
  // issued on inadequate verification is a problem for the applicant, for
  // the certifying authority and for the partner. Stating it plainly is part
  // of the offer.
  responsibilities: [
    "Verifying your client's identity documents properly before applying",
    "Conducting video verification with the actual applicant, never a stand-in",
    "Keeping application records as the certifying authority requires",
    "Not sharing your login, or issuing on behalf of another practice",
    "Telling us promptly if a certificate needs revoking",
  ],
  responsibilitiesNote:
    "These are not house rules. Video verification is set by the Controller of Certifying Authorities, and partners who treat it seriously have no difficulty here.",

  // ⛔ `retail` and `margin` are NULL on every row, and stay that way. The
  // reference prints "₹[X] – ₹[X]" and "Up to [X]%" in each cell and flags them
  // in its own dev note as needing real values — they are placeholders, not
  // figures. Same `fees: null` discipline as everywhere else; set them here and
  // the table renders them with no code change.
  earnings: {
    rows: [
      { product: "Class 3 — Individual", note: "Signing, or Combo", validity: "2 years", retail: null, margin: null, buyer: "Professionals, proprietors and directors filing in their own name" },
      { product: "Class 3 — Organisation", note: "Signing, or Combo", validity: "2 years", retail: null, margin: null, buyer: "Companies and LLPs — ROC, EPFO, corporate tender bids" },
      { product: "Combo (Sign + Encrypt)", note: null, validity: "2 years", retail: null, margin: null, buyer: "Bidders on GeM, CPP Portal and state e-procurement" },
      { product: "DGFT (IEC)", note: null, validity: "2 years", retail: null, margin: null, buyer: "Importers and exporters on DGFT and ICEGATE" },
      { product: "FIPS 140-3 compliant tokens", note: "HYP2003", validity: "Hardware — no expiry", retail: null, margin: null, buyer: "Every new certificate, plus replacements" },
      { product: "Renewals", note: null, validity: "2 years", retail: null, margin: null, buyer: "Your existing base, every two years — no new business development" },
    ],
    note:
      "Margins improve with volume, and your own slab is confirmed in writing when you apply, before you commit to anything. You set what you charge your own clients. Renewals are worth noting separately: once a client base is issued under you, it comes back on a two-year cycle.",
  },

  // ⛔ The documents required at registration, exactly as Clinton listed them.
  // These are
  // DOCUMENTS TO HAVE READY, not fields on this website's form — see
  // PartnerApplicationForm.jsx for why identity numbers are not collected here.
  registrationDocuments: [
    { label: "PAN", detail: "Of the applicant — the person the partner login will belong to." },
    { label: "Aadhaar", detail: "For identity verification during onboarding." },
    { label: "MSME certificate or latest bank statement", detail: "Either one, as proof of the practice or business." },
    { label: "Phone number linked with Aadhaar", detail: "Verification one-time passwords are sent to this number, so it has to be the one Aadhaar holds." },
    { label: "Mail ID", detail: "This becomes your login username, so use one you will keep." },
  ],

  faqs: [
    {
      q: "Can I switch from another certifying authority?",
      a: "Yes, and many partners do. There is no switching cost and no lock-in. Your existing clients stay with you — only the account issuing the certificates changes. Certificates already issued elsewhere remain valid until they expire.",
    },
    {
      q: "Do I need technical knowledge?",
      a: "No more than you already have. The issuing portal is a web application, and token installation is the same process your clients go through. The onboarding session covers it and we stay available afterwards.",
    },
    {
      q: "Is there a joining fee or a minimum volume?",
      a: "No joining fee and no minimum monthly commitment. If any opening balance or advance applies to your account, it is confirmed with you in writing before you commit — never assumed either way in advance.",
    },
    {
      q: "Do my clients become ThinkOrange clients?",
      a: "No. Your clients are yours. We do not contact them for anything other than the verification steps that require it, and we do not market to them.",
    },
    {
      q: "Who conducts the video verification?",
      a: "You do, with your client, on your own schedule. That is what issuing yourself means — and it is also why the timeline is in your hands rather than someone else's.",
    },
    {
      q: "Do I have to stock tokens?",
      a: "Not necessarily. Holding a small stock means you can hand a client their token the same day, which is why most partners do, but ordering per certificate is also available.",
    },
    {
      q: "What if an application is rejected?",
      a: "We help you work out what was missing and resubmit. Whether any resubmission charge applies is confirmed with you during onboarding rather than stated generically here.",
    },
    {
      q: "Can I issue for clients outside Tamil Nadu?",
      a: "Yes. Verification is done by video and tokens are couriered, so your client's location does not limit you.",
    },
    {
      q: "What commission will I earn?",
      a: "It depends on the certificate and your volume, and your slab is quoted in writing when you apply — we would rather give you your actual number than a headline one you may not qualify for. Tell us the volume you expect and we will come back with it.",
    },
  ],
};
