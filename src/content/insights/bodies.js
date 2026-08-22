// ARTICLE BODIES (T10 article template). Imported ONLY by the article template,
// so this prose stays in that route's own lazy chunk — see ./index.js's header
// for why that split matters.
//
// ⚠️ EVERY statutory value here comes through `s()`. Not one threshold, form
// code, day count or penalty is typed as a literal, for the same reason no
// service leaf types one: the Finance Act moves them, and a corrected value in
// statutory.js has to reach the articles too. If you need a fact that isn't in
// statutory.js, RESEARCH it, add it there with its legal basis and source, and
// interpolate it — do not write it inline here.
//
// Nothing here touches income tax computation, ITR, TDS or assessments —
// BLOCKERS.md §1 (Income Tax Act 2025 renumbering) is unreviewed, so those
// remain out of scope for editorial as much as for the four blocked leaves.
// Where a reader would reasonably ask an income-tax question, the article says
// to ask us rather than answering it.
//
// Shape: { lede, sections: [{ heading, paragraphs?, bullets?, note? }], closing }
// — deliberately plain data, no markdown parser. The template renders each
// section in a FIXED order: paragraphs, then bullets, then `note` paragraphs
// after the list. `note` exists precisely so a section can close with prose
// after its list without the order depending on key order in this object.
// Anything richer than that is a signal the article wants to be a service page.
import { s } from "../statutory.js";

export const articleBodies = {
  "private-limited-vs-llp-vs-opc": {
    lede: "Most of the founders who ask us this question are really asking two different things at once: which structure raises money best, and which one they can actually keep compliant while running the business. Those pull in different directions, and the honest answer depends on which of the two is your real constraint this year.",
    sections: [
      {
        heading: "What each structure is, in one line",
        paragraphs: [
          "A Private Limited Company is a separate legal person with shares, run by directors and owned by shareholders. It needs " +
            s("pvtLtdMinMembers") +
            ", and there is no capital barrier to clear first — the requirement is " +
            s("companyMinCapital").toLowerCase() +
            ".",
          "A Limited Liability Partnership is a partnership where the partners are not personally liable for the firm's debts. It needs " +
            s("llpMinPartners") +
            ". There are no shares, so there is nothing for an outside investor to buy into without restructuring first.",
          "A One Person Company is a private company with a single member, created so a solo founder can have limited liability without inventing a second shareholder. The member must be an Indian citizen resident in India — measured as " +
            s("opcResidency") +
            " in the previous financial year.",
        ],
      },
      {
        heading: "If you intend to raise outside money, this is already decided",
        paragraphs: [
          "Institutional investors, venture funds and most angel networks buy equity, and equity means shares. A Private Limited Company can issue them; an LLP cannot, and an OPC cannot hold more than one member. Converting later is possible but it is a project — a fresh set of approvals in the middle of a fundraise, at exactly the moment you have least attention to spare.",
          "If funding is a next-eighteen-months plan rather than a someday idea, incorporate as a Private Limited Company and treat the extra compliance below as the price of being investable.",
        ],
      },
      {
        heading: "The compliance you are signing up for",
        paragraphs: [
          "This is the part founders discover after incorporation rather than before it, and it is the real difference between the three.",
          "A Private Limited Company files its financial statements in AOC-4, due " +
            s("aoc4Window") +
            ", and its annual return in MGT-7, due " +
            s("mgt7Window") +
            ". Both are therefore anchored to when you hold the AGM, not to a fixed calendar date. It also cannot begin business or borrow until it files a declaration of commencement, due within " +
            s("inc20aWindow") +
            ".",
          "An LLP's calendar is simpler and, crucially, date-fixed rather than AGM-relative: the annual return in Form 11 by " +
            s("llpForm11Due") +
            " and the statement of accounts in Form 8 by " +
            s("llpForm8Due") +
            ". Fewer filings, fewer board formalities, and no minutes to maintain for routine decisions.",
          "An OPC carries a company's filing obligations with one member's simplicity. Worth knowing, because it is widely misreported: " +
            s("opcMandatoryConversion").toLowerCase() +
            " — the turnover and capital limits that used to force an OPC to convert were removed.",
        ],
      },
      {
        heading: "How we would actually choose",
        bullets: [
          "Raising equity, or hiring a team with stock options: Private Limited Company.",
          "Professional services or a family trading business, two or more partners, no outside investors expected: LLP — materially less annual work for the same limited liability.",
          "Solo founder who wants limited liability and a corporate identity for tenders and vendor onboarding: OPC.",
          "Testing whether the business works at all, with no contracts in your own name at risk: a proprietorship is not a failure of ambition, and it converts later.",
        ],
        note: [
          "Whichever you pick, the tax consequences differ between structures and depend on your numbers — that part is worth a conversation rather than an article, and it is the one question we would not want you answering from a blog post.",
        ],
      },
    ],
    closing:
      "If you tell us what the business does, who owns it and whether outside money is on the horizon, we will tell you which of the three we would form — and say so plainly if the answer is the cheaper one.",
  },

  // ⛔ eSign PAUSED — 21-08-2026. Body preserved verbatim; its index entry in
  // content/insights/index.js is commented out too, so nothing resolves it.
  // "class-3-dsc-or-aadhaar-esign": {
  //   lede: "Both a Class 3 Digital Signature Certificate and an Aadhaar-based eSign produce a legally valid electronic signature under the Information Technology Act. That shared legal standing is exactly what causes the confusion, because it does not mean the two are interchangeable in practice.",
  //   sections: [
  //     {
  //       heading: "The rule that settles most cases",
  //       paragraphs: [
  //         "Statutory portals mandate a Class 3 certificate specifically. The income tax portal, the GST portal, MCA21 for company filings, and e-tendering and e-procurement platforms including GeM will not accept an Aadhaar eSign in place of one. If your filing lands on any of those, the question is already answered and the only decision left is individual or organisation.",
  //         "This is worth stating flatly because it is the mistake with a deadline attached: discovering it on the evening of a filing date, with a token that has to be issued and delivered before you can sign, is a different problem from discovering it a week earlier.",
  //       ],
  //     },
  //     {
  //       heading: "Where eSign is genuinely the better tool",
  //       paragraphs: [
  //         "For contracts and agreements between private parties, an Aadhaar eSign is faster and lighter in every respect. There is no USB token to buy, no driver to install, no certificate to track, and no physical object that can be lost the week you need it. Signing takes an Aadhaar-linked mobile OTP and a couple of minutes.",
  //         "Offer and appointment letters, HR onboarding paperwork, NDAs, vendor agreements and client engagement letters are all reasonable candidates — provided the other side accepts an Aadhaar-based signature, which in practice most do.",
  //       ],
  //     },
  //     {
  //       heading: "Individual or organisation, if it is a DSC",
  //       paragraphs: [
  //         "An individual Class 3 certificate carries your own name and is what you use when you sign in your personal capacity. An organisation certificate carries both your name and the entity's, and is what a portal expects when you sign on behalf of a company or LLP — ROC filings, corporate tender bids, entity-level GST or EPFO submissions.",
  //         "One more variant catches bidders out: some e-tendering portals require an encryption certificate alongside the signing one before a bid can be submitted at all. That pairing is what a combo certificate is, issued together on a single token rather than bought twice.",
  //       ],
  //     },
  //     {
  //       heading: "Verification is not optional either way",
  //       paragraphs: [
  //         "Every Class 3 issuance includes a short recorded video verification confirming your identity against your documents. It is required by the Controller of Certifying Authorities and cannot be skipped or delegated, for any certificate type. Aadhaar eSign substitutes its own Aadhaar authentication for that step, which is precisely why it is faster and also why it is not accepted where a certificate is mandated.",
  //         "Plan for the verification step rather than around it. It is short, but it is a scheduled human interaction in a process people otherwise assume is instant.",
  //       ],
  //     },
  //   ],
  //   closing:
  //     "If you tell us which portal you are signing on, we can tell you in one message which of the two you need — and if it is a certificate, which class and whose name it should carry.",
  // },

  "when-gst-registration-stops-being-optional": {
    lede: "Almost everyone knows there is a turnover threshold for GST registration. Far fewer know that several categories of business have to register from their first invoice regardless of turnover — and that being in one of those categories is the most common reason a registration turns out to be overdue rather than upcoming.",
    sections: [
      {
        heading: "The turnover thresholds",
        paragraphs: [
          "For most of India, the aggregate turnover threshold is " +
            s("gstThresholdGoods") +
            " for a business supplying goods and " +
            s("gstThresholdServices") +
            " for one supplying services.",
          "In the special category states those figures are lower — " +
            s("gstThresholdGoodsSpecial") +
            " for goods and " +
            s("gstThresholdServicesSpecial") +
            " for services. Tamil Nadu is not a special category state, so a Salem business reads the first pair.",
          "Two details matter more than the numbers. Aggregate turnover is computed across all your GSTINs on one PAN and includes exempt supplies, so it is usually larger than the figure a founder has in mind. And once you cross, you have " +
            s("gstRegApplyWindow") +
            " to apply — the clock starts at the crossing, not at the point you notice it.",
        ],
      },
      {
        heading: "The cases where turnover is irrelevant",
        paragraphs: [
          "Some businesses must register from the first rupee. If you are in one of these categories, the thresholds above simply do not apply to you:",
        ],
        bullets: [
          "Interstate suppliers of goods — selling across a state border, not merely shipping within Tamil Nadu.",
          "Sellers on e-commerce marketplaces, and the operators of those marketplaces.",
          "Anyone required to pay tax under reverse charge on their inward supplies.",
          "Casual and non-resident taxable persons — including a business exhibiting or supplying temporarily in another state.",
          "Agents supplying on behalf of another taxable person, and input service distributors.",
        ],
      },
      {
        heading: "What the application itself involves",
        paragraphs: [
          "Registration is applied for in " +
            s("gstFormApplication") +
            " on the GST portal, and the certificate issued is " +
            s("gstFormCertificate") +
            ". With Aadhaar authentication completed successfully, registration is generally granted within " +
            s("gstRegStandardDays") +
            "; without it, the timeline stretches to " +
            s("gstRegNoAadhaarDays") +
            " because physical verification enters the picture.",
          "Where biometric authentication is triggered, the applicant has " +
            s("gstBiometricWindow") +
            " to complete it at a designated centre. Missing that window is a common cause of an application lapsing quietly rather than being rejected outright.",
        ],
      },
      {
        heading: "The cost of registering late",
        paragraphs: [
          "Operating without a registration you were required to hold carries a penalty of " +
            s("gstNonRegistrationPenalty") +
            ". The larger practical cost is usually different: you cannot issue a tax invoice, so your business customers cannot claim input tax credit on what they bought from you, and you cannot claim credit on your own purchases for the unregistered period either.",
          "That is why the answer to \"should I register before I have to?\" is often yes for a B2B business — voluntary registration is available, and buyers frequently prefer a registered supplier for exactly that reason.",
        ],
      },
    ],
    closing:
      "If you are not sure which side of the line you are on — particularly if you sell interstate or through a marketplace — send us your turnover and how you sell, and we will tell you whether registration is already due.",
  },

  "gem-registration-tender-readiness": {
    lede: "Government Marketplace registration is often described as the hard part of selling to government buyers. In our experience it is the straightforward half. What stops a first bid is almost always readiness: a document that does not match another document, a certificate that has expired, or a signature the portal will not accept.",
    sections: [
      {
        heading: "What registration establishes",
        paragraphs: [
          "GeM registration creates your seller identity: the entity, its authorised signatory, its bank account for receiving payment, and the catalogue of what you actually supply. Every later bid draws on that profile, which is why an inconsistency there resurfaces on every attempt rather than once.",
          "The single most common inconsistency is a name mismatch — the entity name on PAN, on the GST registration, and on the bank account need to agree. A trading name that differs from the registered name is fine in business; it is not fine spread across three government records that a portal cross-checks.",
        ],
      },
      {
        heading: "The MSME benefit that changes the economics",
        paragraphs: [
          "If your business holds a Udyam registration, it is " +
            s("gemEmdExemption") +
            " on government tenders. For a small supplier bidding on several contracts at once, that is the difference between working capital tied up in deposits and working capital available to deliver.",
          "Udyam registration is quick and free to obtain, and it is worth having in place before you start bidding rather than partway through — the exemption applies to bids you submit as a registered MSME, not retroactively to ones you have already deposited against.",
        ],
      },
      {
        heading: "What a live bid needs beyond the profile",
        bullets: [
          "A Class 3 Digital Signature Certificate for the authorised signatory — e-tendering portals mandate one, and some require an encryption certificate alongside it.",
          "Entity documents that agree with each other: incorporation or registration proof, PAN, GST registration, bank details.",
          "Product or service specifications written to match the buyer's category, not your brochure. A specification mismatch is a rejection, not a negotiation.",
          "Any certificates the tender itself calls for, valid on the submission date — not merely obtained at some point.",
        ],
        note: [
          "Bid documents are also read strictly. A technical bid missing one annexure is set aside without anyone calling you about it, which is why the documentation work is worth doing properly before you are against a submission deadline.",
        ],
      },
      {
        heading: "The realistic sequence",
        paragraphs: [
          "Get Udyam registration, then the Class 3 certificate for whoever will actually sign, then the GeM seller profile with documents that reconcile, and only then start responding to live tenders. Attempting them in the other order is what produces the experience of a portal that seems to reject everything.",
          "Government buyers are, in the end, buyers who pay reliably and re-order. The entry cost is administrative rather than commercial, and it is a one-time cost paid mostly at the start.",
        ],
      },
    ],
    closing:
      "We handle GeM registration, the Class 3 certificate and tender documentation together, because they are one workflow in practice even though they are three separate processes on paper. Tell us what you supply and we will map out what you are missing.",
  },

  // Written 22-08-2026. Every value below is an s() key that already existed
  // for roc-annual-compliance.js and private-limited-company.js — no new
  // statutory research was introduced by this article. AOC-4's late-filing
  // penalty is deliberately NOT stated: statutory.js's own note records that
  // research returned conflicting figures, so the article describes the
  // consequence in kind rather than quoting an amount.
  "annual-roc-filings-companies-llps": {
    lede: "The most expensive misunderstanding we correct is a simple one: that a company with no revenue has nothing to file. Registration with the Registrar of Companies creates an annual obligation that runs from incorporation until the entity is formally closed, and it does not pause for a quiet year.",
    sections: [
      {
        heading: "What a company files each year",
        paragraphs: [
          "Two filings carry the year. Financial statements go to the Registrar in AOC-4, due " +
            s("aoc4Window") +
            ", and the annual return goes in MGT-7, due " +
            s("mgt7Window") +
            ". Both dates are measured from the annual general meeting, not from a fixed calendar date, which is why two companies can have entirely different deadlines in the same year.",
          "Smaller companies file a shorter version of the annual return: " +
            s("mgt7aApplicability") +
            ". A small company here means one with " +
            s("smallCompanyThreshold") +
            " — both conditions, tested afresh each year against that year's figures rather than fixed at incorporation.",
        ],
      },
      {
        heading: "The filing that belongs to the director, not the company",
        paragraphs: [
          "DIR-3 KYC is due " +
            s("dir3KycDeadline") +
            " and is owed by every individual holding a Director Identification Number, whatever the company did that year. It is the one on this list that people miss most often, because it does not feel like a company filing at all.",
          "Miss it and the consequence is immediate and personal: " +
            s("dir3KycLateFee") +
            ". The DIN is deactivated in the meantime, and a deactivated DIN cannot sign any MCA filing — so one forgotten form can hold up every other filing the company needs to make.",
        ],
      },
      {
        heading: "An LLP's calendar is different, and stricter in one respect",
        paragraphs: [
          "An LLP files Form 11, its annual return, by " +
            s("llpForm11Due") +
            ", and Form 8, the statement of account and solvency, by " +
            s("llpForm8Due") +
            ". These are fixed dates, so unlike a company's they do not move with a meeting.",
          "The late fee is " +
            s("llpLateFee") +
            ". The absence of a cap is the part worth reading twice: a company's penalties are largely bounded, while a forgotten LLP filing keeps compounding for as long as it stays unfiled. We have seen dormant LLPs where the accumulated fee is the single largest number in the file.",
        ],
      },
      {
        heading: "The first-year items that are easy to leave behind",
        bullets: [
          "INC-20A, the declaration of commencement of business, due " +
            s("inc20aWindow") +
            " — until it is filed the company cannot legally commence business or borrow.",
          "The LLP agreement in Form 3, due " +
            s("llpAgreementWindow") +
            ".",
          "Books of account, which a company has to retain for " +
            s("booksRetentionCompanies") +
            " — a requirement that outlives most of the people who set the filing system up.",
        ],
        note: [
          "None of these are annual, but they surface in the same conversation, because a company that missed one of them usually discovers it while trying to complete its first annual filing.",
        ],
      },
      {
        heading: "Why dormancy does not help",
        paragraphs: [
          "A company that traded nothing still holds a registration, still has directors, and still appears on a public register that lenders, buyers and tender portals read. Non-filing shows there. It is a common reason a bid is set aside or a loan application stalls, long before anyone mentions a penalty.",
          "If a business genuinely has stopped, the answer is to close or dormant it properly through the process the Act provides, not to stop filing and hope. Stopping quietly costs more than closing deliberately, and the gap widens every year.",
        ],
      },
    ],
    closing:
      "Income tax filings sit alongside all of this and follow their own calendar — ask us about those separately. If you are unsure which of the above your entity currently owes, send us your incorporation details and we will tell you exactly what is outstanding.",
  },
};

export function getArticleBody(slug) {
  return articleBodies[slug];
}
