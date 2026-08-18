// ============================================================================
// CATEGORY HUB CONTENT (T3) — CONTENT-PLAN.md §8.
//
// Separate from the leaf files in this directory because a hub's copy
// describes the PRACTICE AREA, not a specific service — it doesn't carry a
// `fees`/`documents`/`process` shape and isn't part of the T2 schema
// `_schema.js` validates. Kept alongside the leaves (not in nav.js) because
// nav.js is IA — paths, labels, parent/child structure — and must stay free
// of prose per CONTENT-PLAN.md §13's content-layer split.
//
// Same discipline as every leaf file even though `content:check`'s scanner
// only walks src/content/services/<slug>.js (one leaf per file, per its own
// comment): no invented numbers, no rupee amounts, no day counts, no form
// codes. Where a fact-shaped claim was tempting (a threshold, a scheme name)
// it was either left out or phrased generically enough to need no citation.
// Income-tax content in particular avoids every section number, form code
// and date around the 01-04-2026 Income Tax Act 2025 transition — see
// BLOCKERS.md §1 — while still being honest that the change happened.
// ============================================================================

export const categoryContent = {
  gst: {
    meta: {
      title: "GST Services in Salem, Tamil Nadu | ThinkOrange Consulting",
      description:
        "GST registration, return filing, ITC refunds and notices & litigation — one team handling the whole relationship, from Salem for clients across India.",
    },
    heroLede:
      "Registration, monthly and annual returns, ITC reconciliation and representation if a notice arrives — GST handled end to end from Salem for businesses across India.",
    intro: [
      "GST touches almost every business that sells goods or services above the registration threshold, and it rewards the ones who stay on top of it: clean input tax credit, no late fees, and no notice arriving out of nowhere because a return went unfiled.",
      "We work with proprietorships, partnerships, LLPs and companies across trading, manufacturing and services. Whether you're registering for the first time, filing every month, chasing a stuck refund, or replying to a departmental notice, one team handles the whole relationship rather than passing you between specialists who don't know your file.",
    ],
    whyUs: [
      "One team for registration, returns and notices, so nothing gets lost in a handover between specialists.",
      "We track every ARN and departmental deadline ourselves, rather than waiting for you to notice something's due.",
      "Every figure we quote is checked against the current Act and Rules — not recalled from memory.",
    ],
    faqs: [
      {
        q: "Do I need to register for GST separately in every state I operate from?",
        a: "Yes. GST registration is state-specific, so a business supplying from more than one state registers separately in each, even under a single PAN and business name. See our GST Registration page for the full process.",
      },
      {
        q: "What happens if a GST return is filed late?",
        a: "A late fee and interest apply, and repeated non-filing can lead to registration being suspended or cancelled. Our GST Return Filing page sets out exactly what applies and how we keep clients ahead of it.",
      },
      {
        q: "Can you help if we've already received a GST notice?",
        a: "Yes — we review the notice, assess your position and draft the reply within the window given. Visit GST Notices & Litigation for how we handle representation.",
      },
      {
        q: "Do you handle input tax credit refunds?",
        a: "Yes, including zero-rated exports and the inverted duty structure. See ITC Refunds for the eligibility conditions and the time limit that applies to every claim.",
      },
    ],
    relatedCategories: ["income-tax", "accounting-audit"],
  },

  "income-tax": {
    meta: {
      title: "Income Tax Services in Salem, Tamil Nadu | ThinkOrange Consulting",
      description:
        "ITR filing, TDS compliance and tax planning & advisory for individuals, firms, LLPs and companies, advised against the current law. Salem, Tamil Nadu.",
    },
    heroLede:
      "Return filing, TDS compliance and tax planning for individuals, firms, LLPs and companies — advised against the law as it currently stands.",
    intro: [
      "Income tax obligations differ sharply by how you're structured and what you earn — a salaried professional, a partnership firm and a private limited company file differently, on different forms, against different deadlines, and the rules governing all of it were recently recodified.",
      "We prepare and file returns, manage TDS deduction and payment, and advise on legal ways to reduce your tax outgo before your year closes rather than after it. Where a return has already drawn a notice or gone to assessment, we represent you through it rather than leaving you to face it alone.",
    ],
    whyUs: [
      "We advise against the current law, not last year's section numbers and forms — this area changed recently and older guidance is now wrong in places.",
      "Tax planning happens before your year closes, while it can still change the outcome, not after.",
      "Notices and assessments are handled by the team that already knows your file, not passed to someone new.",
    ],
    faqs: [
      {
        q: "Has the recent change to income tax law affected how I file?",
        a: "The underlying law was recently recodified, with sections, forms and some terminology renumbered. The practical filing experience for most taxpayers is similar, but we deliberately avoid quoting old section numbers or form codes while this settles — ask us for your specific position.",
      },
      {
        q: "Do you handle TDS for my business?",
        a: "Yes — deduction, payment and return filing, plus correcting or contesting a mismatch if one shows up in your TDS credit. See TDS Compliance for how the current process works.",
      },
      {
        q: "Can tax planning actually reduce what I owe?",
        a: "Often, yes, through legal structuring and timing decisions available under the law — but it has to happen before your financial year closes. Once the year ends, most of the options close with it.",
      },
      {
        q: "What if I've already received an income tax notice?",
        a: "We review it, explain what it actually means in plain terms, and represent you in replying or at assessment. See Tax Planning & Advisory and ITR Filing for the compliance those notices usually relate to.",
      },
    ],
    relatedCategories: ["gst", "accounting-audit"],
  },

  "business-setup": {
    meta: {
      title: "Business Registration & Incorporation in Salem | ThinkOrange Consulting",
      description:
        "Private limited, LLP, OPC, partnership, proprietorship and trust/society/Section 8 incorporation — Salem, Tamil Nadu, pan-India clients.",
    },
    heroLede:
      "Private limited, LLP, OPC, partnership or proprietorship — incorporated correctly the first time, with PAN, TAN and the statutory registrations that follow.",
    intro: [
      "Choosing a structure is the first decision that shapes almost everything after it — how much personal liability you carry, what you can raise money against, how much you'll file every year, and how a buyer or investor will eventually value the business.",
      // 17-08-2026: dropped this paragraph's DPIIT/MSME clause — both leaves
      // moved to the new Registrations & Licences category (nav.js), so the
      // sentence became inaccurate rather than just incomplete.
      "We incorporate every structure recognised for a growing Indian business: private limited companies, LLPs, One Person Companies, partnership firms and proprietorships, plus trusts, societies and Section 8 companies for non-profit and charitable work.",
    ],
    whyUs: [
      "We tell you which structure actually fits your situation, not the one that's easiest for us to file.",
      "PAN, TAN and the post-incorporation statutory steps are set up together, not left for you to discover later.",
      "We stay current on company law changes — an OPC rule most competitors still get wrong is several years out of date.",
    ],
    faqs: [
      {
        q: "Which business structure should I choose?",
        a: "It depends on your liability tolerance, whether you plan to raise outside capital, and how much annual compliance you're willing to carry. A private limited company suits fundraising and limited liability; an LLP or proprietorship suits lower compliance. We assess your specific case rather than defaulting to one answer.",
      },
      {
        q: "Do I need a minimum capital to start a private limited company?",
        a: "No — the minimum paid-up capital requirement was removed some years ago. See our Private Limited Company page for what's actually required today.",
      },
      {
        q: "What is a One Person Company and who is it for?",
        a: "An OPC lets a single founder incorporate with limited liability, without bringing in a second shareholder. See OPC Registration for the current eligibility rules, including a widely-repeated one that no longer applies.",
      },
    ],
    // 17-08-2026: dropped the DPIIT FAQ that lived here — that leaf moved to
    // Registrations & Licences (nav.js), which needs its own FAQ set,
    // including a DPIIT question, once that hub's content is written. See
    // MISSING-PAGES.md.
    relatedCategories: ["registrations-licences", "accounting-audit"],
  },

  "accounting-audit": {
    // 17-08-2026: category relabelled "Accounting, Payroll & Audit" in
    // nav.js — slug/path unchanged. Only meta/heroLede touched here to add
    // "payroll" to the summary; intro/whyUs/faqs untouched pending real
    // content for the three new payroll/ROC leaves (see MISSING-PAGES.md).
    meta: {
      title: "Accounting, Payroll & Audit Services in Salem | ThinkOrange Consulting",
      description:
        "Monthly bookkeeping on Tally Prime and Zoho Books, payroll processing, and internal and specialised audit work — from Salem, Tamil Nadu.",
    },
    heroLede:
      "Bookkeeping on Tally Prime or Zoho Books, payroll, internal audit and specialised audits — the numbers kept clean all year, not reconstructed at year-end.",
    intro: [
      "Good books are the foundation everything else sits on — your GST returns, your tax return, your loan application and your investor conversations all draw from the same set of numbers, and if those numbers are wrong or late, everything built on them is too.",
      "We handle day-to-day bookkeeping and monthly close for growing businesses, statutory and internal audit for companies that need it, and specialised work — stock audit, channel-finance audit, concurrent audit and due-diligence support — for businesses and CAs who need a second set of hands with genuine audit depth.",
    ],
    whyUs: [
      "Books closed monthly, not reconstructed from bank statements once a year when a deadline forces the issue.",
      "We work in Tally Prime and Zoho Books, so your data stays in tools your next accountant can also use.",
      "Specialised audit work most local firms in this sector don't offer at all.",
    ],
    faqs: [
      {
        q: "Do you handle bookkeeping if we're not audit-mandated?",
        a: "Yes — most of our bookkeeping clients aren't required by law to have an audit at all; they just want accurate, current books. Audit only becomes relevant once you cross specific thresholds.",
      },
      {
        q: "What's the difference between internal audit and a specialised audit?",
        a: "Internal audit is an ongoing check on a company's own controls and processes, and is mandatory above certain thresholds. Specialised audits — stock, channel-finance, concurrent — are engagement-specific work usually commissioned by a lender, principal or another CA firm.",
      },
      {
        q: "Which accounting software do you use?",
        a: "Tally Prime and Zoho Books, matched to what suits your business and what your existing team is comfortable with.",
      },
      {
        q: "Can you support a CA firm that needs extra audit fieldwork capacity?",
        a: "Yes — our Specialised Audit service exists partly for this: due-diligence and fieldwork support for practising CAs who need additional hands on a specific engagement.",
      },
    ],
    relatedCategories: ["gst", "business-setup"],
  },

  // 17-08-2026: merged from the previous separate "government-tenders" and
  // "loans-finance" entries (nav.js now combines those two categories into
  // one, Tenders & Finance). Every sentence below already existed in one of
  // the two old entries — recombined, not rewritten; nothing new was
  // invented for the merge. meta/heroLede alone are newly written to
  // describe the combined scope, and stay just as fact-free as everything
  // else in this file.
  "tenders-finance": {
    meta: {
      title: "Government Tenders & Business Finance in Salem | ThinkOrange Consulting",
      description:
        "GeM registration and tender documentation support, plus CMA data, loan documentation and personal finance planning. Salem, Tamil Nadu.",
    },
    heroLede:
      "GeM registration and tender documentation so a missed step never costs you a bid, plus loan documentation, CMA data and personal finance planning.",
    intro: [
      "Government procurement rewards businesses that get the paperwork right, not necessarily the lowest bidder — a technically strong bid disqualified on a documentation error loses to a weaker one that was submitted correctly.",
      "We register businesses on the Government e-Marketplace, prepare and check tender documentation before submission, and help you navigate the specific portal and departmental requirements of each opportunity, so the bid you submit is the bid that actually gets evaluated.",
      "Winning the work is one half of this category; funding it is the other. Getting a business loan approved is usually a documentation problem before it's a creditworthiness one — banks want projections, CMA data and a coherent financial story, prepared in the format they actually expect. We prepare that documentation for working capital and term loans, and separately help individuals plan their own finances and manage existing debt in a structured way.",
    ],
    whyUs: [
      "We check documentation against the tender's own requirements before submission, not after a rejection.",
      "Udyam-registered micro and small enterprises get specific GeM procurement benefits — we make sure you're actually claiming them.",
      "We coordinate directly with the department, or the bank, where a query needs a fast answer.",
      "CMA data and projections prepared in the format lenders actually expect, not a generic template.",
      "Personal finance planning is treated as seriously as business finance — most firms in this sector don't offer it at all.",
    ],
    faqs: [
      {
        q: "What is GeM and do I need to register?",
        a: "The Government e-Marketplace is the portal most central and state government purchases now happen through. If you want to sell to government buyers, GeM registration is generally the entry point. See GeM Registration for the process.",
      },
      {
        q: "Do small businesses get any preference in government tenders?",
        a: "Yes — Udyam-registered micro and small enterprises get specific procurement preferences, including exemption from certain deposit requirements in some cases. See GeM Registration for how these apply.",
      },
      {
        q: "What usually causes a tender submission to get rejected?",
        a: "Most rejections are documentation, not price — a missing certificate, a mismatch between the registered business name and the bid, or a document that's expired or incorrectly attested. Our Tender Documentation Support service exists specifically to catch these before submission.",
      },
      {
        q: "What is CMA data and why does a bank ask for it?",
        a: "Credit Monitoring Arrangement data is a structured financial projection format Indian banks use to assess working capital and term loan applications. Most lenders expect it in a specific layout, and getting that layout wrong is a common reason applications stall.",
      },
      {
        q: "Do you help with personal loans as well as business ones?",
        a: "Yes — personal loan and mortgage documentation support sits under Personal Finance & Debt Management, alongside broader budgeting and debt-structuring advice.",
      },
      {
        q: "Can you help with a specific tender we're already looking at?",
        a: "Yes — send us the tender notice and we'll tell you what's needed and by when, rather than starting from a generic checklist.",
      },
    ],
    relatedCategories: ["business-setup", "gst"],
  },

  // 18-08-2026: written to fill the gap MISSING-PAGES.md flagged for the
  // hub introduced by the 17-08-2026 services-menu restructure. msme-udyam
  // and startup-india-dpiit only moved here (content untouched); the other
  // four children are new leaves written this same session.
  "registrations-licences": {
    meta: {
      title: "Business Registrations & Licences in Salem | ThinkOrange Consulting",
      description:
        "MSME/Udyam, Startup India, IEC, ICEGATE, trademark and NGO Darpan registration — the specific licences a growing business needs beyond incorporation.",
    },
    heroLede:
      "The registrations that come after incorporation — MSME/Udyam, Startup India recognition, import-export codes, trademark protection and NGO Darpan — each opening a different door.",
    intro: [
      "Incorporating a business gets you a legal entity; it doesn't automatically get you every registration that entity needs to actually do what it plans to do. Selling to government buyers, importing raw material, protecting your brand name, or receiving CSR funding as a non-profit each sit behind their own, separate registration — and most businesses only discover which one they're missing when a deal is already on the table.",
      "We handle the specific licences that come up most often once a business is trading: MSME/Udyam classification and the Startup India (DPIIT) recognition that follows a growth story, the Import Export Code and ICEGATE/AD code registration that international trade actually needs, trademark protection for a name or logo worth defending, and NGO Darpan registration for the Trusts, Societies and Section 8 Companies that need it before a grant or CSR conversation can even start.",
    ],
    whyUs: [
      "We tell you which registration you actually need for what you're trying to do, not a bundle of everything that's loosely related.",
      "Cross-registrations that depend on each other — an IEC before ICEGATE, a Darpan ID before CSR-1 — are sequenced correctly so you're not stuck waiting on a prerequisite you didn't know existed.",
      "Every threshold and fee we quote is checked against the current Act, Rules or portal — not recalled from memory.",
    ],
    faqs: [
      {
        q: "Is Startup India (DPIIT) recognition worth applying for?",
        a: "It depends on what you actually need it for. DPIIT recognition itself doesn't hand you funding — its practical value is a set of specific, confirmed procedural benefits (self-certification for certain labour and environment compliances, easier public procurement participation, and eligibility for a small number of government schemes). Whether it's worth the paperwork comes down to your eligibility and which of those benefits actually applies to your business — see Startup India (DPIIT) for the current criteria.",
      },
      {
        q: "We're importing for the first time — what do we actually need beyond an IEC?",
        a: "An IEC gets you the right to trade; it doesn't clear a shipment on its own. You'll also need to register on ICEGATE, India's customs portal, and link an AD code from your bank before customs will process your first bill of entry. See IEC Registration and ICEGATE Registration for how the two connect.",
      },
      {
        q: "Do we need a trademark before we register our company name?",
        a: "No — they're unrelated registrations. Incorporating a company reserves your name against other companies at the Registrar; it does not stop a competitor from trading under a confusingly similar brand. A trademark is the only registration that actually protects your name or logo in the market. See Trademark Registration for how the two differ in practice.",
      },
      {
        q: "Our NGO wants CSR funding — where do we actually start?",
        a: "With an NGO Darpan ID, before anything else. A company legally cannot file Form CSR-1 — the MCA filing that lets it route CSR funds to your NGO — without your Darpan ID already in place. Get that first, then the CSR-1 and any specific corporate conversation can move. See NGO Darpan Registration for the process.",
      },
    ],
    relatedCategories: ["business-setup", "tenders-finance"],
  },
};

/** Returns hub content for a category slug, or undefined if not written. */
export function getCategoryContent(slug) {
  return categoryContent[slug];
}
