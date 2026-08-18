// Relative import with an explicit extension, not the "@/" alias — see
// gst-registration.js's header comment.
import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// ============================================================================
// Written against gst-registration.js as the exemplar. Registrations &
// Licences category, 17-08-2026 restructure — see MISSING-PAGES.md.
//
// ⛔ Income-tax exemption / donor tax-benefit registration for NGOs is
// mentioned only in generic terms below, with NO section number and NO form
// code — that sits inside the Income Tax Act, which was recodified
// 01-04-2026, and is blocked pending CA review per BLOCKERS.md §1. Flagged
// again in `review.notes` below so it isn't missed at merge time.
// ============================================================================

export default {
  slug: "ngo-darpan-registration",
  category: "registrations-licences",
  title: "NGO Darpan Registration",
  h1: "NGO Darpan Registration (NITI Aayog)",

  meta: {
    title: "NGO Darpan Registration in Salem, Tamil Nadu | ThinkOrange Consulting",
    description:
      "Register your Trust, Society or Section 8 Company on the NITI Aayog NGO Darpan portal — the ID government grants, CSR-1 and FCRA all require.",
    keywords: [
      "ngo darpan registration salem",
      "darpan id registration niti aayog",
      "ngo darpan unique id",
      "csr-1 darpan id requirement",
      "fcra darpan id",
    ],
  },

  lede:
    "The NITI Aayog database entry your Trust, Society or Section 8 Company needs before it can receive a government grant, register for CSR funding, or apply under FCRA — none of which will move without it.",

  overview: [
    "NGO Darpan is the database NITI Aayog and the National Informatics Centre maintain for every voluntary organisation and non-profit in India. Registering on it doesn't create your NGO — you need an already-registered Trust, Society or Section 8 Company first — it records that organisation in the government's own system and issues it a unique Darpan ID.",

    `That ID is what several other, more consequential processes actually check for. A company ${s("ngoDarpanCsr1Requirement")}. Any application for FCRA registration, prior permission, renewal or annual return filing ${s("ngoDarpanFcraRequirement")}. Many state and central grant schemes ask for it too, as the first line of eligibility before they'll look at anything else in your application.`,

    `Registration itself is straightforward and ${s("ngoDarpanFee")}, but it's ${s("ngoDarpanVerificationTime")} — worth starting well before you actually need the ID for a specific application, not the week a grant deadline is due. Darpan registration is separate from, and does not by itself grant, income-tax exemption or donor tax-benefit registration for your NGO — that's a different application under a different law, decided independently.`,
  ],

  whoNeedsThis: [
    "Your Trust, Society or Section 8 Company is newly registered and you want to apply for government grants or schemes.",
    "A corporate CSR team has told you they need your Darpan ID before they can route funding to you.",
    "You're applying for FCRA registration or prior permission to receive foreign contributions.",
    "Your existing Darpan registration has lapsed or your governing body has changed and the record needs updating.",
    "You're preparing a grant or CSR application with a deadline and need the ID sorted well ahead of it.",
  ],

  included: [
    {
      title: "Eligibility check",
      desc: "We confirm your Trust, Society or Section 8 Company's registration and PAN are in order before anything is filed on the portal.",
    },
    {
      title: "Document preparation and verification",
      desc: "We assemble the registration certificate, governing body details and financial documents the portal actually asks for, checked before upload.",
    },
    {
      title: "Portal registration and profile filing",
      desc: "Your organisation's profile — objectives, governing body, registration details and bank account — is filed correctly the first time.",
    },
    {
      title: "Darpan ID tracking",
      desc: "We follow up on verification status rather than leaving you to check the portal yourself while a grant deadline approaches.",
    },
    {
      title: "Governing body update support",
      desc: "When your trustees or committee members change, we update the Darpan record so it never drifts out of date against your actual registration.",
    },
    {
      title: "Certificate and ID handover",
      desc: "Once issued, we hand over your Darpan ID with a plain explanation of where you'll be asked for it next — CSR-1, FCRA, or a specific grant portal.",
    },
  ],

  documents: [
    {
      group: "Every applicant",
      items: [
        "PAN of the organisation",
        "Registration certificate — Trust deed, Society registration certificate, or Certificate of Incorporation for a Section 8 Company",
        "Details of the governing body — name, designation, PAN and Aadhaar of each member",
        "Bank account details of the organisation, in the organisation's own name",
        "Address proof of the registered office",
        "A brief note on the organisation's objectives and the activities it actually carries out",
      ],
    },
    {
      group: "Trust",
      items: [
        "Registered Trust deed",
        "List of trustees with their contact details",
      ],
    },
    {
      group: "Society",
      items: [
        "Society registration certificate",
        "Memorandum of Association and bye-laws",
        "List of governing body / managing committee members",
      ],
    },
    {
      group: "Section 8 Company",
      items: [
        "Certificate of Incorporation issued by the Registrar of Companies",
        "Memorandum and Articles of Association",
        "List of directors with DIN",
      ],
    },
  ],

  documentsNote:
    "Your organisation's name, PAN and registration certificate have to match exactly across every document — a mismatch, even a small one like a missing middle name or an old address, is the most common reason a Darpan application is sent back for correction.",

  process: [
    {
      step: 1,
      title: "Eligibility and document check",
      desc: "We confirm your registration certificate and governing body details are consistent and complete before filing anything.",
      duration: t("ngoDarpanDocPrepTurnaround"),
    },
    {
      step: 2,
      title: "Profile filed on the portal",
      desc: "Your organisation's full profile — objectives, governing body, registration and bank details — is filed on the NGO Darpan portal.",
      duration: t("ngoDarpanFilingTurnaround"),
    },
    {
      step: 3,
      title: "NITI Aayog verification",
      desc: "The portal verifies your details against the documents submitted before issuing the ID.",
      duration: s("ngoDarpanVerificationTime"),
    },
    {
      step: 4,
      title: "Darpan ID issued",
      desc: "We hand over your unique Darpan ID and certificate, along with where you'll need to quote it next.",
      duration: "On verification",
    },
  ],

  timeline: [
    { stage: "Document collection and review", days: t("ngoDarpanDocPrepTurnaround") },
    { stage: "Profile filed on the portal", days: t("ngoDarpanFilingTurnaround") },
    { stage: "NITI Aayog verification", days: s("ngoDarpanVerificationTime") },
  ],

  // NEVER a number. Renders "On request" — that is correct, not a gap.
  fees: null,

  faqs: [
    {
      q: "What is NGO Darpan and who needs to register on it?",
      a: "It's NITI Aayog's database of voluntary organisations and non-profits, and any already-registered Trust, Society or Section 8 Company that wants to apply for government grants, CSR funding or FCRA needs a Darpan ID from it. It doesn't register the NGO itself — that has to already exist.",
    },
    {
      q: "Is there a government fee for NGO Darpan registration?",
      a: `${s("ngoDarpanFee")}. What takes time is verification, not payment — there's nothing to pay at any stage of the process, on the portal's own side.`,
    },
    {
      q: "Do I really need a Darpan ID for CSR funding?",
      a: `Yes, and it's a hard requirement, not a preference. A company ${s("ngoDarpanCsr1Requirement")} A corporate CSR team cannot legally route funds to your NGO without that filing existing, whatever else your organisation offers.`,
    },
    {
      q: "Does FCRA registration also require a Darpan ID?",
      a: `Yes. Any FCRA registration, prior permission, renewal or annual return filing ${s("ngoDarpanFcraRequirement")} If you're planning to receive foreign contributions at any point, get the Darpan ID in place well before you file the FCRA application itself.`,
    },
    {
      q: "How long does verification take, and can I speed it up?",
      a: `Typically ${s("ngoDarpanVerificationTime")}, and the portal doesn't offer an expedited track. The one thing genuinely in your control is submitting documents that are internally consistent the first time — mismatches between your registration certificate and the portal entry are what usually cause a resubmission and restart the clock.`,
    },
    {
      q: "Does NGO Darpan registration also give us income-tax exemption?",
      a: "No. Darpan registration confirms your organisation's existence in NITI Aayog's database — it does not grant income-tax exemption or donor tax-benefit status. Those are separate applications under a different law, assessed on their own criteria, and having a Darpan ID doesn't shortcut either of them.",
    },
    {
      q: "Our trustees changed — do we need to update our Darpan record?",
      a: "Yes. The governing body listed on your Darpan profile should match who's actually running the organisation today. An outdated listing is a common reason a grant-making body or a CSR team flags an application for extra scrutiny, even when the underlying registration is perfectly valid.",
    },
  ],

  related: ["trust-society-section8", "gst-registration", "business-loan"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "ngoDarpanCsr1Requirement",
      "ngoDarpanFcraRequirement",
      "ngoDarpanFee",
      "ngoDarpanVerificationTime",
    ],
    notes:
      "Sources disagree on the exact verification turnaround (some cite 7–15 working days, others 15–30) — confirm the current figure against the live NGO Darpan portal before publishing. The income-tax exemption / donor tax-benefit paragraph is deliberately generic with no section number or form code, pending BLOCKERS.md §1 (Income Tax Act 2025 recodification) — do not add a specific citation there until that blocker clears.",
  },
};
