import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: PF (EPF) and ESI are headcount-triggered obligations, not turnover-
// triggered ones like GST — that distinction is the thing most first-time
// employers get wrong, so the overview leads with it. Two separate Acts, two
// separate thresholds, one common online registration mechanism (Shram
// Suvidha) — structure the page around that shape rather than treating EPF
// and ESI as one undifferentiated "labour compliance" blob.

export default {
  slug: "pf-esi-registration",
  category: "accounting-audit",
  title: "PF & ESI Registration",
  h1: "PF & ESI Registration in Salem, Tamil Nadu",

  meta: {
    title: "PF & ESI Registration in Salem | ThinkOrange Consulting",
    description:
      "EPFO and ESIC registration for employers — the applicability check, the Shram Suvidha filing, and the contribution calendar. Salem, Tamil Nadu.",
    keywords: [
      "pf esi registration salem",
      "epf registration consultant tamil nadu",
      "esi registration for employers",
      "shram suvidha portal registration",
      "pf esi applicability employees",
    ],
  },

  lede:
    "EPFO and ESIC registration for employers crossing the employee thresholds — the applicability check, the Shram Suvidha filing, and the contribution calendar set up correctly from the first payroll.",

  overview: [
    `Provident Fund and Employees' State Insurance are two separate employer obligations that kick in once your headcount crosses a fixed number — not once your turnover does, which is what usually surprises people used to GST thresholds. Employees' Provident Fund (EPF) registration, under the Employees' Provident Funds and Miscellaneous Provisions Act 1952, becomes mandatory once you employ ${s("epfRegistrationThreshold")}. Employees' State Insurance (ESI) registration, under the Employees' State Insurance Act 1948, becomes mandatory once you employ ${s("esiRegistrationThreshold")} in an establishment the Act covers — which in Tamil Nadu includes shops, hotels and other non-factory establishments, not only factories.`,

    `Both counts include every person on your payroll, whatever they earn — the headcount that triggers registration is not the same as the headcount that gets enrolled. Only employees drawing up to ${s("epfWageCeiling")} are compulsorily covered under EPF, and up to ${s("esiWageCeiling")} under ESI; anyone above either ceiling can still be enrolled voluntarily, but is not required. A business can legitimately owe both registrations, one, or neither, depending on how its actual payroll is structured.`,

    `Skipping registration once you're liable is not a quiet gap — EPF's Section 14 exposes you to ${s("epfNonRegistrationPenalty")}, and ESI's Section 85 carries ${s("esiNonRegistrationPenalty")}, on top of the contributions and damages you owe for the whole unregistered period. Most cases we see were never deliberate — a business crossed a headcount threshold during a hiring push and nobody was tracking the number against either Act.`,
  ],

  whoNeedsThis: [
    `Your headcount has reached ${s("epfRegistrationThreshold")} — EPF registration is mandatory from that date, whatever your turnover.`,
    `You employ ${s("esiRegistrationThreshold")} at an establishment the ESI Act covers — in Tamil Nadu this reaches shops, hotels and similar non-factory establishments, not only factories.`,
    `You want EPF coverage before you're legally required to — ${s("epfVoluntaryCoverage")}.`,
    "A tender, a bank or a client has asked for proof of EPF or ESI compliance before dealing with you.",
    "You crossed a threshold some time ago and have not registered yet, and want it corrected before an inspection finds it first.",
    "You are setting up payroll for the first time and want both registrations built into it from day one, not added later.",
  ],

  included: [
    {
      title: "Applicability assessment",
      desc: "We confirm whether EPF, ESI, or both actually apply to you today, and the exact date your liability began.",
    },
    {
      title: "Common registration on Shram Suvidha",
      desc: `Filed as ${s("shramSuvidhaCommonRegistration")}, not two separate applications to two different departments.`,
    },
    {
      title: "Establishment code allotment",
      desc: "Your EPFO establishment ID and ESIC employer code obtained and handed over, along with the portal logins that go with each.",
    },
    {
      title: "UAN setup for your employees",
      desc: "Universal Account Numbers set up for covered employees, whether they are new to EPF or bringing one over from a previous employer.",
    },
    {
      title: "Contribution structure configured",
      desc: `Contribution rates set up correctly from month one — ${s("epfContributionRate")} for EPF and ${s("esiContributionRate")} for ESI.`,
    },
    {
      title: "Filing calendar handover",
      desc: "The monthly and half-yearly filing dates handed to you, or to whoever runs your payroll, so the first cycle is not a scramble.",
    },
    {
      title: "Query response",
      desc: "We respond to any clarification the EPFO or ESIC field office raises while the application is being processed.",
    },
  ],

  documents: [
    {
      group: "Every applicant",
      items: [
        "Certificate of Incorporation, partnership deed, or registration certificate — whichever applies to your entity type",
        "PAN of the business",
        "Cancelled cheque or the latest bank statement of the business's current account",
        "Address proof of the establishment — electricity bill, property tax receipt, or rent agreement with a No Objection Certificate",
        "GST registration certificate, if you hold one",
        "Digital Signature Certificate of the authorised signatory, for companies and LLPs",
        "List of all employees with date of joining, wage and designation",
      ],
    },
    {
      group: "For ESI specifically",
      items: [
        `Individual employee details for ESI enrolment — name, date of birth, wage and family details, for those within the current wage ceiling (${s("esiWageCeiling")})`,
        "Copy of your Shops and Establishments registration, where the business is covered by it rather than being a factory",
      ],
    },
  ],

  documentsNote:
    "Voluntary EPF registration additionally needs a signed record of employee consent — it cannot be initiated by the employer alone, and once approved it cannot be backdated to an earlier date the employer wishes it had started.",

  process: [
    {
      step: 1,
      title: "Applicability check",
      desc: "We confirm which Act, or Acts, actually apply, and the exact date liability began against your real headcount.",
      duration: t("pfEsiApplicabilityCheck"),
    },
    {
      step: 2,
      title: "Document collection",
      desc: "Employer and employee documents assembled and checked, including UAN details for anyone bringing EPF history from a previous job.",
      duration: t("pfEsiDocPrep"),
    },
    {
      step: 3,
      title: "Common application filed",
      desc: "The registration application is filed on the Shram Suvidha portal, covering both EPFO and ESIC in one submission.",
      duration: "On document completion",
    },
    {
      step: 4,
      title: "Establishment codes issued",
      desc: "EPFO and ESIC issue your establishment code and portal access once the application is processed.",
      duration: "On approval",
    },
    {
      step: 5,
      title: "Payroll setup handed over",
      desc: "Contribution rates configured and the ongoing filing calendar handed to you, or to whoever runs your payroll.",
      duration: "Ongoing, monthly",
    },
  ],

  timeline: [
    { stage: "Applicability check", days: t("pfEsiApplicabilityCheck") },
    { stage: "Document collection", days: t("pfEsiDocPrep") },
    { stage: "EPF registration trigger", days: s("epfRegistrationThreshold") },
    { stage: "ESI registration trigger", days: s("esiRegistrationThreshold") },
    {
      stage: "Registration window once liable",
      days: `${s("epfRegistrationWindow")} (EPF) · ${s("esiRegistrationWindow")} (ESI)`,
    },
  ],

  fees: null,

  faqs: [
    {
      q: "At how many employees does PF registration become mandatory?",
      a: `Once you employ ${s("epfRegistrationThreshold")}, counted across your whole establishment regardless of what each person earns. You then have ${s("epfRegistrationWindow")} to register — the clock starts the day the threshold is crossed, not the following month.`,
    },
    {
      q: "At how many employees does ESI registration become mandatory?",
      a: `Once you employ ${s("esiRegistrationThreshold")}, and in Tamil Nadu this applies well beyond factories — shops, hotels, restaurants and similar establishments are covered. You then have ${s("esiRegistrationWindow")} to register.`,
    },
    {
      q: "Does registering mean every employee is covered?",
      a: `No. Only employees drawing up to ${s("epfWageCeiling")} are compulsorily covered under EPF, and up to ${s("esiWageCeiling")} under ESI. Someone earning above either ceiling can still be enrolled voluntarily, with the employer's agreement, but is not required to be.`,
    },
    {
      q: "Can we register for EPF voluntarily with fewer than 20 employees?",
      a: `Yes — ${s("epfVoluntaryCoverage")}. Once granted, coverage is permanent, so you cannot drop back out later simply because headcount falls.`,
    },
    {
      q: "What happens if we were liable and never registered?",
      a: `EPF's Section 14 exposes you to ${s("epfNonRegistrationPenalty")}, and ESI's Section 85 carries ${s("esiNonRegistrationPenalty")}. Either way you also owe the contributions and interest for the whole unregistered period, which is usually the larger number.`,
    },
    {
      q: "How are contributions actually paid each month once we're registered?",
      a: `EPF contributions are filed through the Electronic Challan-cum-Return, due by ${s("epfEcrDue")}. ESI contributions follow the same monthly rhythm, due by ${s("esiMonthlyContributionDue")}, with a further half-yearly return on top.`,
    },
    {
      q: "Do EPFO and ESIC need separate applications?",
      a: `Not any more — ${s("shramSuvidhaCommonRegistration")} covers both, and both departments recognise the same Labour Identification Number for the establishment afterward, so you are not maintaining two unrelated department relationships.`,
    },
  ],

  related: ["payroll-processing-returns", "roc-annual-compliance", "bookkeeping"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "epfRegistrationThreshold",
      "esiRegistrationThreshold",
      "epfWageCeiling",
      "esiWageCeiling",
      "epfRegistrationWindow",
      "esiRegistrationWindow",
      "epfContributionRate",
      "esiContributionRate",
      "shramSuvidhaCommonRegistration",
      "epfVoluntaryCoverage",
      "epfNonRegistrationPenalty",
      "esiNonRegistrationPenalty",
      "epfEcrDue",
      "esiMonthlyContributionDue",
    ],
    notes:
      "Confirm the Tamil Nadu-specific ESI threshold (10 employees) against the current state notification, which can differ by class of establishment. Confirm the EPF wage ceiling figure given the reported proposal to raise it to ₹25,000 — not yet notified as of this writing, but worth re-checking close to publication. Confirm the exact EPF employer-contribution split (EPS/EDLI/admin charge) before quoting a full breakdown anywhere more detailed than the headline 12%.",
  },
};
