import { s } from "../statutory.js";
import { t } from "../turnaround.js";

// Follows the pattern in gst-registration.js.
//
// Angle: this ONE leaf covers three legal structures (nav.js groups them as
// one route, "Trust, Society & Section 8"), so the job of the page is not to
// describe one structure but to help the reader work out which of the three
// actually fits them — then register it under the law that genuinely governs
// it in Salem/Tamil Nadu, not the law most national guides assume.
//
// Two research findings drive the whole page:
//   1. Tamil Nadu registers SOCIETIES under its OWN 1975 Act, which repealed
//      the central 1860 Act for this state. Most guides describe the 1860
//      Act by default — that is not what a Salem society actually registers
//      under.
//   2. Tamil Nadu has NO Public Trusts Act currently in force. It passed one
//      in 2020, but public sources do not confirm it was ever notified/
//      brought into force — flagged as an open question below, not asserted
//      either way. Absent a state Public Trusts Act, a public charitable
//      trust here is created by a registered trust deed under the central
//      Registration Act, 1908, same as most Indian states.
//
// INCOME-TAX EXEMPTION (the tax-benefit registration these entities often
// pursue after formation) is deliberately mentioned only in generic terms,
// with NO section number or form code — see BLOCKERS.md §1. That whole area
// sits in the Income Tax Act, which was re-codified 01-04-2026.

export default {
  slug: "trust-society-section8",
  category: "business-setup",
  title: "Trust, Society & Section 8",
  h1: "Trust, Society & Section 8 Company Registration in Salem, Tamil Nadu",

  meta: {
    title: "Trust, Society & Section 8 Company Registration in Salem | ThinkOrange",
    description:
      "Trust, society or Section 8 company from Salem, Tamil Nadu — which structure fits, the law that actually governs it, and the documents each one needs.",
    keywords: [
      "trust registration salem",
      "society registration tamil nadu",
      "section 8 company registration salem",
      "ngo registration consultant tamil nadu",
      "trust vs society vs section 8 company",
    ],
  },

  lede:
    "Trust, society or Section 8 company — the right non-profit structure explained first, then registered under the law that actually governs it here, not the one most guides assume.",

  overview: [
    `Trust, society and Section 8 company are the three structures Indian founders use to run a charitable, religious or community purpose with a legal identity of its own — a bank account in its own name, and continuity beyond any one founder. They are not interchangeable. A trust suits a founder or family running a defined charitable purpose with the least ongoing paperwork. A society suits a genuinely membership-run body — a resident welfare association, a professional, arts or sports organisation — where members, not a small founding group, are meant to control it. A Section 8 company suits an organisation that wants a company's governance and the credibility institutional or CSR funders often expect, in exchange for heavier compliance.`,

    `Where you register changes what governs you. A trust here is created by executing a trust deed under ${s("trustGoverningLaw")}, and ${s("trustDeedRegistrationRule")} — there being no dedicated Tamil Nadu Public Trusts Act we can confirm is currently in force for a public charitable trust. A society registers under the ${s("tnSocietiesAct")}, which repealed the central 1860 Act for this state — not the Act most national guides describe by default. A Section 8 company incorporates through SPICe+ like any other company, and ${s("section8LicenceRoute")}.`,

    `Tax exemption is a separate, later step for all three, applied for once the entity exists rather than part of registering it. We do not quote a section number or form code for that step here — it sits in the Income Tax Act, re-codified from 01-04-2026 — and will confirm the current position with you directly when you are ready for it.`,
  ],

  whoNeedsThis: [
    "You want to run a defined charitable, religious or educational purpose with the least ongoing paperwork of the three — usually a trust.",
    "You are forming a genuinely membership-run body — a resident welfare association, a professional, arts or sports body — where members, not a small founding group, are meant to control it. That points to a society.",
    "You expect institutional grants, government funding, or CSR money from companies whose own policy requires a company structure to fund. That points to a Section 8 company.",
    "You already run an informal charitable activity and need a bank account and a proper legal identity to receive and account for donations.",
    "You want limited liability and a company's governance for a non-profit venture, and can accept a company's heavier annual compliance in exchange.",
    "You are unsure which of the three fits and want the trade-offs explained before you commit to registering one.",
  ],

  included: [
    {
      title: "Structure advice before you commit",
      desc: "Which of the three actually fits your objects, who is meant to control it, and where funding will realistically come from — settled before any drafting starts.",
    },
    {
      title: "Drafting for whichever structure fits",
      desc: "Trust deed, society memorandum and rules, or Section 8 Memorandum and Articles of Association, drafted to match your stated objects and the roles you have decided on.",
    },
    {
      title: "Registration filing",
      desc: "Trust deed registered at the Sub-Registrar's office, society application filed with the Registrar of Societies, or Section 8 incorporation filed through SPICe+ — whichever applies.",
    },
    {
      title: "Governing document review",
      desc: `Trustee, member or director roles and meeting requirements checked, and, for a Section 8 company, the profit-application clause its memorandum must carry (${s("section8ProfitApplicationClause")}).`,
    },
    {
      title: "PAN and TAN",
      desc: "Obtained for the entity itself, so it can open a bank account and start operating without a gap between registration and being functional.",
    },
    {
      title: "No minimum capital to plan around",
      desc: `A Section 8 company needs no paid-up capital to incorporate — ${s("companyMinCapital").toLowerCase()} — the same position as any other company.`,
    },
    {
      title: "Post-registration compliance setup",
      desc: "Books of account from day one for a trust or society; auditor appointment and the first-year filing calendar for a Section 8 company.",
    },
    {
      title: "Guidance on what comes next",
      desc: "What a tax-exemption application or a funder-specific registration will eventually need from your records — explained in plain terms, without a form code attached to it here.",
    },
  ],

  documents: [
    {
      group: "Trust",
      items: [
        "Trust deed on non-judicial stamp paper, stating the trust's name, objects, registered office and corpus",
        "PAN and Aadhaar of the settlor and all trustees",
        "Passport-sized photographs of the settlor and trustees",
        "Proof of the registered office — latest electricity bill, property tax receipt or municipal khata, or a rent agreement with the owner's No Objection Certificate",
        "Identity proof of two witnesses to the deed",
        "Written consent of each named trustee to act",
      ],
    },
    {
      group: "Society",
      items: [
        "Memorandum of Association of the society, stating its name, objects and the first governing body's details",
        "Rules and regulations (bye-laws) governing membership and management",
        "PAN and Aadhaar, or other government ID, of the founding governing body",
        "Minutes of the meeting at which the memorandum and rules were adopted, signed by the members present",
        "Proof of the registered office — latest electricity bill, property tax receipt or municipal khata, or a rent agreement with the owner's No Objection Certificate",
        "Covering letter and affidavit from the president or secretary, as the Registrar's office requires",
      ],
    },
    {
      group: "Section 8 Company",
      items: [
        "PAN, Aadhaar, identity and address proof of every proposed director and member",
        "Class 3 Digital Signature Certificate for the directors and subscribers signing the application. We issue certificates ourselves.",
        "Memorandum of Association (Form INC-13) carrying the objects and the mandatory profit-application clause, and the Articles of Association",
        "A statement of expected income and expenditure, generally covering three years, supporting the stated charitable objects",
        "Proof of the registered office and the owner's No Objection Certificate where the premises are rented",
        `Director and subscriber declarations, ${s("section8DeclarationForms").toLowerCase()}`,
      ],
    },
  ],

  documentsNote:
    "Which of the three lists above applies depends entirely on the structure you choose, and society registrars in particular are not fully consistent in what they ask for beyond this list. We confirm the exact set for your Registrar before you gather anything.",

  process: [
    {
      step: 1,
      title: "Structure consultation",
      desc: "We discuss your objects, who is meant to run the organisation, and where funding is likely to come from, and confirm which of the three structures actually fits.",
      duration: t("nonprofitStructureAdvice"),
    },
    {
      step: 2,
      title: "Drafting",
      desc: "The trust deed, society memorandum and rules, or Section 8 MOA and AOA drafted to match your stated objects and the roles you have decided on.",
      duration: t("nonprofitDocPrep"),
    },
    {
      step: 3,
      title: "Registration filed",
      desc: "Trust deed registered at the Sub-Registrar's office, the society application filed with the Registrar of Societies, or the Section 8 application filed through SPICe+ — whichever applies to your structure.",
      duration: t("nonprofitRegistrationFiling"),
    },
    {
      step: 4,
      title: "Certificate issued, plus PAN and TAN",
      desc: "Your registration certificate (trust or society) or Certificate of Incorporation with a CIN (Section 8) is issued, and PAN and TAN obtained so you can open a bank account.",
      duration: "On approval",
    },
    {
      step: 5,
      title: "Post-registration setup",
      desc: "Books of account set up from day one, and, for a Section 8 company, the auditor appointed and the first-year filing dates handed to you.",
      duration: "Ongoing",
    },
  ],

  timeline: [
    { stage: "Structure consultation", days: t("nonprofitStructureAdvice") },
    { stage: "Drafting the deed, memorandum or MOA/AOA", days: t("nonprofitDocPrep") },
    { stage: "Registration filed", days: t("nonprofitRegistrationFiling") },
    { stage: "Section 8 company — AOC-4, financial statements, annually", days: s("aoc4Window") },
    { stage: "Section 8 company — MGT-7, annual return, annually", days: s("mgt7Window") },
  ],

  fees: null,

  faqs: [
    {
      q: "Which should I choose — a trust, a society or a Section 8 company?",
      a: "It depends on who is meant to control the organisation and where funding will come from. A trust suits a founder or family running a defined charitable purpose with the least ongoing paperwork. A society suits a genuinely membership-run body, such as a resident association or a professional or arts organisation. A Section 8 company suits an organisation that wants a company's governance and credibility with institutional or CSR funders, in exchange for heavier compliance. We talk through your objects and funding plans before recommending one.",
    },
    {
      q: "How many people do I need to start each of the three?",
      a: `A trust needs ${s("trustMinTrustees")}, one of whom may also be the settlor. A society needs ${s("societyMinMembersTN")} in Tamil Nadu. A Section 8 company follows the same minimum as any private company — ${s("pvtLtdMinMembers")} — though it is usually formed with more, since a genuine membership base supports the funding case a Section 8 company is often built to make.`,
    },
    {
      q: "What law governs registering a society in Salem?",
      a: `The ${s("tnSocietiesAct")}, not the central Societies Registration Act, 1860 that most national guides describe by default. That 1975 Act repealed the 1860 Act as it applied to Tamil Nadu, so a Salem-based society registers, and is regulated, under the state Act.`,
    },
    {
      q: "Does Tamil Nadu have its own law for public charitable trusts?",
      a: "Not one we can confirm is currently in force. Most Indian states have no dedicated Public Trusts Act, and in that situation a public charitable trust is created by executing a trust deed and registering it under the central Registration Act, 1908. Tamil Nadu passed a Public Trusts Act in 2020, but we have not been able to confirm it was ever notified into force — we check its current status before advising you on this basis.",
    },
    {
      q: "Does a Section 8 company need a separate government licence?",
      a: `Yes — a licence under Section 8(1) of the Companies Act 2013 to operate without "Private Limited" in its name — but it no longer needs a separate application. ${s("section8LicenceRoute")}.`,
    },
    {
      q: "Can a trust, society or Section 8 company apply for income-tax exemption?",
      a: "Yes, all three can separately apply for income-tax exemption and donor-benefit registration once formed — but that is a distinct application after incorporation, not something this registration includes automatically. We are not quoting section numbers or form codes for it here while the Income Tax Act's recent re-codification settles, and will advise the current position when you are ready for that step.",
    },
    {
      q: "What ongoing compliance does each structure carry?",
      a: `A trust and a society both keep books of account and file whatever annual return their own Registrar requires, which is comparatively light. A Section 8 company carries a company's compliance — audited accounts, an appointed auditor, AOC-4 within ${s("aoc4Window")} and MGT-7 within ${s("mgt7Window")} — the same filings a private limited company makes.`,
    },
    {
      q: "Can I convert from one of these structures to another later?",
      a: "Conversion is possible in some directions but is genuinely involved, not a form change — converting a trust or society into a Section 8 company, for instance, means transferring assets and re-registering as a new legal entity. It is far easier to choose correctly at the start, which is the point of the structure consultation.",
    },
  ],

  related: ["ngo-darpan-registration", "private-limited-company", "bookkeeping"],

  review: {
    needsProfessionalReview: true,
    statutoryKeys: [
      "trustGoverningLaw",
      "trustDeedRegistrationRule",
      "trustMinTrustees",
      "tnSocietiesAct",
      "societyMinMembersTN",
      "section8LicenceRoute",
      "section8ProfitApplicationClause",
      "section8DeclarationForms",
      "pvtLtdMinMembers",
      "companyMinCapital",
      "aoc4Window",
      "mgt7Window",
    ],
    notes:
      "HIGH-RISK ITEM FOR CA/CS SIGN-OFF, specifically: whether the Tamil Nadu Public Trusts Act, 2020 has actually been notified/brought into force — this page assumes it has NOT, and describes trust registration via a deed under the Registration Act 1908 accordingly. If it has since come into force, the trust half of this page needs rewriting around the state Act instead (registration authority, disqualification rules, and any Charity-Commissioner-equivalent role it creates). Also confirm: (1) whether INC-20A applies to a specific Section 8 company — it depends on whether that company has share capital, which varies, so this page deliberately does not assert an INC-20A window for Section 8 companies; (2) that INC-14/INC-15 declarations are genuinely folded into INC-9 on the current MCA portal, since portal mechanics change without notice; (3) the practical minimum-trustee figure for a trust, which is practice rather than a stated statutory number. Deliberately deferred, per BLOCKERS.md §1: any income-tax exemption/donor-benefit registration detail — no section number or form code appears anywhere on this page.",
  },
};
