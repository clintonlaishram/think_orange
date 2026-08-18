// ============================================================================
// STATUTORY FACTS — single source of truth for every number, form and deadline
// this site asserts about Indian tax law.
//
// WHY THIS FILE EXISTS
// Service-page prose is full of claims like "₹40 lakh" and "7 working days".
// If those live inline in 21 separate leaf files, three things go wrong:
//   1. The Finance Act changes one and you have to find every mention.
//   2. The CA reviewing the site has to read 21 pages of prose to audit them.
//   3. Prose and the review checklist drift apart silently.
// So every such fact is defined ONCE here, with its legal basis and source,
// and leaf files interpolate it. `npm run content:review` turns this file into
// a sign-off checklist (scripts/content-review.mjs).
//
// HARD RULE: no statutory number, form code, deadline or penalty may be typed
// directly into a leaf file. If it is not in here, add it here first.
//
// ⚠️  EVERY VALUE BELOW NEEDS PROFESSIONAL SIGN-OFF BEFORE THE SITE GOES LIVE.
// These were researched from public sources on the date in `asOf`, not taken
// from an AI model's training data — but they are still not a substitute for a
// practising CA confirming them against the current Act, Rules and
// notifications. Indian tax law changes with every Finance Act.
// ============================================================================

/** Date the values below were last researched and need re-checking against. */
export const asOf = "19-08-2026";

/**
 * Date the INCOME TAX block was researched. Separate from `asOf` because that
 * block was written after the Income Tax Act 2025 came into force (01-04-2026)
 * and is the newest, least settled law on the site — it needs re-checking on a
 * shorter cycle than the GST and Companies Act values.
 */
export const incomeTaxAsOf = "19-08-2026";

/**
 * Tamil Nadu is a NORMAL category state for GST threshold purposes, not a
 * special category state. This matters on every ThinkOrange service page —
 * the lower special-category thresholds do not apply to Salem clients.
 */
export const homeStateCategory = "normal";

export const statutory = {
  // --- GST registration thresholds -----------------------------------------
  gstThresholdGoods: {
    value: "₹40 lakh",
    label: "GST registration threshold — goods, normal category states",
    basis: "Section 22, CGST Act 2017, as raised by Notification 10/2019-Central Tax",
    note: "Tamil Nadu is a normal category state, so this is the figure that applies to Salem clients.",
    source: "https://cleartax.in/s/gst-registration-limits-increased",
  },
  gstThresholdServices: {
    value: "₹20 lakh",
    label: "GST registration threshold — services, normal category states",
    basis: "Section 22, CGST Act 2017",
    source: "https://cleartax.in/s/gst-registration-limits-increased",
  },
  gstThresholdGoodsSpecial: {
    value: "₹20 lakh",
    label: "GST registration threshold — goods, special category states",
    basis: "Section 22, CGST Act 2017",
    note: "Does not apply to Tamil Nadu. Relevant only for clients registering in a special category state.",
    source: "https://cleartax.in/s/gst-registration-limits-increased",
  },
  gstThresholdServicesSpecial: {
    value: "₹10 lakh",
    label: "GST registration threshold — services, special category states",
    basis: "Section 22, CGST Act 2017",
    source: "https://cleartax.in/s/gst-registration-limits-increased",
  },

  // --- GST registration procedure ------------------------------------------
  gstRegApplyWindow: {
    value: "30 days",
    label: "Window to apply for GST registration after becoming liable",
    basis: "Section 25(1), CGST Act 2017",
    note: "Apply within the window and registration is effective from the date liability arose; apply late and it is effective only from the date of grant.",
    source: "https://cleartax.in/s/cgst-rules-chapter-3-registration",
  },
  gstRegStandardDays: {
    value: "7 working days",
    label: "Standard GST registration approval time (Aadhaar-authenticated, no physical verification)",
    basis: "Rule 9, CGST Rules 2017",
    source: "https://www.indiafilings.com/gst/gst-registration-approval-in-india-how-many-days",
  },
  gstRegNoAadhaarDays: {
    value: "up to 30 days",
    label: "GST registration approval time without Aadhaar authentication or where physical verification is ordered",
    basis: "Rule 9, CGST Rules 2017",
    source: "https://www.indiafilings.com/gst/gst-registration-approval-in-india-how-many-days",
  },
  gstBiometricWindow: {
    value: "15 days",
    label: "Window to complete biometric Aadhaar authentication at a GST Suvidha Kendra after submitting REG-01 Part B",
    basis: "Rule 8(4A), CGST Rules 2017",
    note: "Miss it and the ARN is not generated at all — the application stalls rather than being rejected.",
    source: "https://tax2win.in/guide/aadhaar-authentication-biometric-verification-gst-registration",
  },

  // --- Rule 14A simplified scheme ------------------------------------------
  // NOTE: effective 01-11-2025 — i.e. AFTER the training cutoff of the model
  // that drafted this site. Exactly the class of fact that must be researched
  // rather than recalled.
  gstRule14ADays: {
    value: "3 working days",
    label: "GST registration approval time under the Rule 14A simplified scheme",
    basis: "Rule 14A, CGST Rules 2017, effective 01-11-2025",
    note: "Optional scheme. Aadhaar-authenticated, algorithmic risk profiling.",
    source: "https://www.taxmann.com/post/blog/gstn-introduces-simplified-gst-registration-scheme-under-rule-14a",
  },
  gstRule14AMonthlyCap: {
    value: "₹2.5 lakh",
    label: "Rule 14A eligibility cap — monthly output tax liability on supplies to registered persons",
    basis: "Rule 14A, CGST Rules 2017",
    note: "Applicant must also hold no more than one registration in the same State/UT under the same PAN.",
    source: "https://www.indiafilings.com/gst-registration/simplified-gst-registration-scheme-rule-14a",
  },

  // --- GST penalties -------------------------------------------------------
  gstNonRegistrationPenalty: {
    value: "₹10,000 or the tax due, whichever is higher",
    label: "Penalty for failing to register under GST when liable",
    basis: "Section 122, CGST Act 2017",
    note: "Back tax for the unregistered period plus interest is payable on top. Wilful evasion attracts a penalty equal to 100% of the tax evaded.",
    source: "https://www.mastersindia.co/blog/penalty-for-not-registering-or-late-registering-under-gst/",
  },

  // --- GST forms -----------------------------------------------------------
  // Form codes are stable but listed here so the review checklist is complete
  // and so no leaf file hardcodes a code that later changes.
  gstFormApplication: {
    value: "GST REG-01",
    label: "GST registration application (Part A: PAN/mobile/email; Part B: business details and documents)",
    basis: "Rule 8, CGST Rules 2017",
    source: "https://cleartax.in/s/cgst-rules-chapter-3-registration",
  },
  gstFormQuery: {
    value: "GST REG-03",
    label: "Notice from the proper officer seeking clarification or further documents",
    basis: "Rule 9(2), CGST Rules 2017",
    source: "https://cleartax.in/s/cgst-rules-chapter-3-registration",
  },
  gstFormQueryReply: {
    value: "GST REG-04",
    label: "Reply to a REG-03 clarification notice",
    basis: "Rule 9(2), CGST Rules 2017",
    source: "https://cleartax.in/s/cgst-rules-chapter-3-registration",
  },
  gstFormCertificate: {
    value: "GST REG-06",
    label: "Certificate of registration, carrying the GSTIN",
    basis: "Rule 10, CGST Rules 2017",
    source: "https://cleartax.in/s/cgst-rules-chapter-3-registration",
  },

  // --- GST return filing ---------------------------------------------------
  gstr1DueMonthly: {
    value: "11th of the following month",
    label: "GSTR-1 due date — monthly filers",
    basis: "Rule 59, CGST Rules 2017",
    source: "https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/",
  },
  gstr3bDueMonthly: {
    value: "20th of the following month",
    label: "GSTR-3B due date — monthly filers",
    basis: "Rule 61, CGST Rules 2017",
    source: "https://cleartax.in/s/gstr-3b",
  },
  gstr1DueQuarterly: {
    value: "13th of the month following the quarter",
    label: "GSTR-1 due date — QRMP quarterly filers",
    basis: "Rule 59, CGST Rules 2017",
    source: "https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/",
  },
  gstr3bDueQuarterly: {
    value: "22nd or 24th of the month following the quarter, by state group",
    label: "GSTR-3B due date — QRMP quarterly filers",
    basis: "Rule 61, CGST Rules 2017",
    note: "⚠️ Category X states file by the 22nd, Category Y by the 24th. CONFIRM WHICH GROUP TAMIL NADU IS IN before publishing — research did not settle it and guessing would mislead local clients on their own deadline.",
    source: "https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/",
  },
  qrmpThreshold: {
    value: "₹5 crore",
    label: "Aggregate turnover ceiling to opt into the QRMP scheme",
    basis: "Rule 61A, CGST Rules 2017",
    source: "https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/",
  },
  pmt06Due: {
    value: "25th of each month",
    label: "PMT-06 monthly tax payment due date under QRMP",
    basis: "Rule 61A, CGST Rules 2017",
    note: "QRMP files returns quarterly but pays tax MONTHLY — the distinction clients most often get wrong.",
    source: "https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/",
  },
  gstr9Threshold: {
    value: "₹2 crore",
    label: "Aggregate turnover above which GSTR-9 annual return is required",
    basis: "Section 44, CGST Act 2017 read with Rule 80",
    source: "https://www.registerkaro.in/post/gst-compliance-calendar-due-dates",
  },
  gstr9cThreshold: {
    value: "₹5 crore",
    label: "Aggregate turnover above which GSTR-9C reconciliation statement is required",
    basis: "Section 44, CGST Act 2017 read with Rule 80",
    source: "https://www.registerkaro.in/post/gst-compliance-calendar-due-dates",
  },
  gstr9Due: {
    value: "31 December following the financial year",
    label: "GSTR-9 and GSTR-9C due date",
    basis: "Rule 80, CGST Rules 2017",
    source: "https://www.registerkaro.in/post/gst-compliance-calendar-due-dates",
  },
  gstLateFee: {
    value: "₹50 per day, or ₹20 per day for a nil return",
    label: "Late fee for filing GSTR-3B after the due date",
    basis: "Section 47, CGST Act 2017",
    note: "Subject to a cap. Confirm the current cap, which has been revised by notification more than once.",
    source: "https://cleartax.in/s/gstr-3b",
  },
  gstInterest: {
    value: "18% per annum",
    label: "Interest on GST paid late",
    basis: "Section 50, CGST Act 2017",
    note: "Computed daily from the due date to the date of payment.",
    source: "https://thegstcalculator.in/tools/gst-interest-calculator",
  },
  gstReturnTimeBar: {
    value: "3 years",
    label: "Time bar after which a GST return can no longer be filed at all",
    basis: "Section 39(11), CGST Act 2017; portal enforcement from July 2025",
    note: "Hard block, not a penalty — the period is permanently closed and the input credit in it is lost. This is the single most consequential thing a client with old pending returns needs to hear.",
    source: "https://calcguru.in/gst-late-fee-interest-calculator/",
  },

  // --- GST demands, scrutiny and appeals -----------------------------------
  // ⚠️ Section 74A (Finance (No. 2) Act 2024) UNIFIED the old 73/74 split from
  // FY 2024-25. Sections 73 and 74 still govern periods up to FY 2023-24, so
  // both frameworks are live simultaneously depending on the year under demand.
  gstDemandUnifiedLimitation: {
    value: "42 months",
    label: "Limitation to issue a demand notice under Section 74A (FY 2024-25 onwards)",
    basis: "Section 74A, CGST Act 2017, inserted by Finance (No. 2) Act 2024",
    note: "Longer than the old 3-year non-fraud limit, shorter than the old 5-year fraud limit. Applies to FY 2024-25 and later.",
    source: "https://cleartax.in/s/section-74a-of-cgst-act",
  },
  gstDemandLegacyNonFraud: {
    value: "3 years",
    label: "Limitation under Section 73 (non-fraud) — periods up to FY 2023-24",
    basis: "Section 73, CGST Act 2017",
    source: "https://taxguru.in/goods-and-service-tax/section-73-74-74a-new-unified-gst-demand-regime-fy-2024-25.html",
  },
  gstDemandLegacyFraud: {
    value: "5 years",
    label: "Limitation under Section 74 (fraud or wilful misstatement) — periods up to FY 2023-24",
    basis: "Section 74, CGST Act 2017",
    source: "https://taxguru.in/goods-and-service-tax/section-73-74-74a-new-unified-gst-demand-regime-fy-2024-25.html",
  },
  gstFormScrutiny: {
    value: "ASMT-10",
    label: "Scrutiny notice pointing out discrepancies in a return",
    basis: "Section 61, CGST Act 2017 read with Rule 99",
    source: "https://caalokkumar.com/gst-notice-demand-defence.html",
  },
  gstFormScrutinyReply: {
    value: "ASMT-11, within 30 days",
    label: "Reply to an ASMT-10 scrutiny notice",
    basis: "Rule 99, CGST Rules 2017",
    source: "https://caalokkumar.com/gst-notice-demand-defence.html",
  },
  gstFormPreNotice: {
    value: "DRC-01A",
    label: "Pre-show-cause intimation of tax and interest ascertained as due",
    basis: "Rule 142(1A), CGST Rules 2017",
    source: "https://caalokkumar.com/gst-notice-demand-defence.html",
  },
  gstFormShowCause: {
    value: "DRC-01",
    label: "Show cause notice raising a demand for tax, interest and penalty",
    basis: "Rule 142, CGST Rules 2017",
    source: "https://caalokkumar.com/gst-notice-demand-defence.html",
  },
  gstFormVoluntaryPayment: {
    value: "DRC-03",
    label: "Voluntary payment of tax, used to close a matter before or after a notice",
    basis: "Rule 142(2), CGST Rules 2017",
    source: "https://caalokkumar.com/gst-notice-demand-defence.html",
  },
  gstFormDemandOrder: {
    value: "DRC-07",
    label: "Final adjudication order creating the demand",
    basis: "Rule 142(5), CGST Rules 2017",
    source: "https://www.patronaccounting.com/blog/gst-demand-order-appeal-process",
  },
  gstFormAppeal: {
    value: "APL-01",
    label: "Appeal to the Appellate Authority against a demand order",
    basis: "Section 107, CGST Act 2017",
    source: "https://vakilsearch.com/article/gst-appeal-procedure-apl-01/",
  },
  gstAppealWindow: {
    value: "3 months from the order",
    label: "Window to file a first appeal under Section 107",
    basis: "Section 107(1), CGST Act 2017",
    note: "A further one month may be condoned for sufficient cause. Confirm the current condonation position.",
    source: "https://vakilsearch.com/article/gst-appeal-procedure-apl-01/",
  },
  gstAppealPreDeposit: {
    value: "10% of the disputed tax",
    label: "Mandatory pre-deposit to file a first appeal",
    basis: "Section 107(6), CGST Act 2017",
    source: "https://unnathipartners.com/gst-apl-01-pre-deposit-filing-guide-2025/",
  },

  // --- Company and LLP formation (Companies Act 2013, LLP Act 2008) --------
  // Unaffected by the Income Tax Act 2025 re-codification — different statute.
  pvtLtdMinMembers: {
    value: "2 directors and 2 shareholders",
    label: "Minimum for a Private Limited Company",
    basis: "Section 149 and Section 3, Companies Act 2013",
    note: "Directors must be individuals. One person may be both a director and a shareholder, so two people suffice.",
    source: "https://cleartax.in/s/characteristics-private-limited-company",
  },
  pvtLtdMaxShareholders: {
    value: "200",
    label: "Maximum shareholders in a Private Limited Company",
    basis: "Section 2(68), Companies Act 2013",
    note: "Employees holding shares under an ESOP are excluded from the count.",
    source: "https://cleartax.in/s/characteristics-private-limited-company",
  },
  companyMinCapital: {
    value: "None — there is no minimum paid-up capital",
    label: "Minimum paid-up capital for a company",
    basis: "Companies (Amendment) Act 2015, which removed the earlier requirement",
    note: "Only authorised share capital must be declared. Clients still routinely believe ₹1 lakh is required.",
    source: "https://cleartax.in/s/characteristics-private-limited-company",
  },
  spicePlusScope: {
    value: "name reservation, DIN, incorporation, PAN and TAN in one application",
    label: "What the SPICe+ form covers",
    basis: "Companies (Incorporation) Rules 2014, as amended",
    source: "https://taxguru.in/company-law/private-limited-company-incorporation-process-via-spice-plus-faqs.html",
  },
  inc20aWindow: {
    value: "180 days from incorporation",
    label: "Window to file INC-20A, the declaration of commencement of business",
    basis: "Section 10A, Companies Act 2013",
    note: "Until it is filed the company cannot legally commence business or borrow. The most commonly missed post-incorporation step.",
    source: "https://www.vjmglobal.com/feeds/blog/company-incorporation-checklist",
  },
  aoc4Window: {
    value: "30 days from the AGM",
    label: "AOC-4 filing window — financial statements",
    basis: "Section 137, Companies Act 2013",
    note: "⚠️ Late-filing penalty NOT stated on the site: research returned conflicting figures (₹100/day vs ₹1,000/day, likely fee vs additional penalty). Confirm before publishing any amount.",
    source: "https://datatracks.com/in/blog/understanding-aoc-4-and-mgt-7-filings/",
  },
  mgt7Window: {
    value: "60 days from the AGM",
    label: "MGT-7 filing window — annual return",
    basis: "Section 92, Companies Act 2013",
    source: "https://datatracks.com/in/blog/understanding-aoc-4-and-mgt-7-filings/",
  },

  // --- One Person Company --------------------------------------------------
  // ⚠️ The ₹50 lakh capital / ₹2 crore turnover MANDATORY CONVERSION thresholds
  // were REMOVED by the Companies (Incorporation) Second Amendment Rules 2021,
  // effective 01-04-2021. They are still widely repeated online and are the
  // single most common stale fact about OPCs.
  opcMandatoryConversion: {
    value: "None — no turnover or capital level forces conversion",
    label: "Mandatory OPC conversion threshold",
    basis: "Rule 7, Companies (Incorporation) Rules 2014, as amended by the Second Amendment Rules 2021",
    note: "An OPC may operate at any capital or turnover indefinitely, and convert voluntarily at any time with no waiting period.",
    source: "https://restthecase.com/knowledge-bank/business-and-compliance/turnover-limit-for-one-person-company-in-india",
  },
  // A REPEALED value, kept here deliberately. The OPC page cites it in order to
  // correct it — competitors still publish it as live law. `repealed: true`
  // keeps it out of the "claims to confirm" table in CONTENT-REVIEW.md and puts
  // it in a separate section, because the CA is confirming that it is still
  // repealed, not that it applies.
  opcRepealedConversionThresholds: {
    value: "₹50 lakh paid-up capital and ₹2 crore turnover",
    label: "FORMER mandatory OPC conversion thresholds — repealed",
    basis: "Rule 6, Companies (Incorporation) Rules 2014, omitted by the Second Amendment Rules 2021 with effect from 01-04-2021",
    note: "Cited on the OPC page only to state that it no longer applies. If this were ever reinstated, that page's central argument would need rewriting.",
    repealed: true,
    source: "https://restthecase.com/knowledge-bank/business-and-compliance/turnover-limit-for-one-person-company-in-india",
  },
  opcResidency: {
    value: "120 days in India",
    label: "Residency test for OPC eligibility",
    basis: "Rule 3, Companies (Incorporation) Rules 2014, as amended 2021",
    note: "Reduced from 182 days. Non-resident Indian citizens may also incorporate an OPC.",
    source: "https://www.onlinelegalindia.com/blogs/amendments-to-one-person-company-compliance/",
  },
  opcStructure: {
    value: "one member, one nominee and at least one director",
    label: "Minimum structure of an OPC",
    basis: "Section 3(1)(c) and Rule 3, Companies Act 2013",
    note: "The nominee must be a natural person who is an Indian citizen and resident, and takes over on the member's death or incapacity.",
    source: "https://www.patronaccounting.com/one-person-company-registration",
  },

  // --- LLP -----------------------------------------------------------------
  llpMinPartners: {
    value: "2 designated partners, at least one resident in India",
    label: "Minimum for an LLP",
    basis: "Section 7, LLP Act 2008",
    source: "https://cleartax.in/s/llp-annual-filings",
  },
  llpForm11Due: {
    value: "30 May",
    label: "LLP Form 11 annual return due date",
    basis: "Rule 25, LLP Rules 2009",
    source: "https://cleartax.in/s/llp-annual-filings",
  },
  llpForm8Due: {
    value: "30 October",
    label: "LLP Form 8 statement of account and solvency due date",
    basis: "Rule 24, LLP Rules 2009",
    source: "https://cleartax.in/s/llp-annual-filings",
  },
  llpLateFee: {
    value: "₹100 per day, with no cap",
    label: "Late fee for LLP Form 8 and Form 11",
    basis: "LLP Act 2008 read with LLP Rules 2009",
    note: "The absence of a cap is the point — a forgotten LLP filing compounds indefinitely, unlike most company penalties.",
    source: "https://cleartax.in/s/llp-annual-filings",
  },
  llpAgreementWindow: {
    value: "30 days from incorporation",
    label: "Window to file the LLP agreement in Form 3",
    basis: "Section 23, LLP Act 2008",
    source: "https://taxguru.in/corporate-law/annual-filing-llp-form-8-form-11.html",
  },

  // --- Partnership firm ----------------------------------------------------
  partnershipStatute: {
    value: "Indian Partnership Act, 1932",
    label: "Statute governing partnership firms",
    basis: "Indian Partnership Act, 1932",
    source: "https://www.indiafilings.com/learn/documents-required-for-gst-registration",
  },

  // --- Internal audit and books of account (Companies Act 2013) ------------
  // Unaffected by the Income Tax Act 2025 transition — different statute.
  internalAuditTurnoverThreshold: {
    value: "₹200 crore",
    label: "Turnover above which internal audit is mandatory for a private company",
    basis: "Section 138, Companies Act 2013, read with Rule 13, Companies (Accounts) Rules 2014",
    note: "Checked against turnover during the preceding financial year. Listed companies require internal audit regardless of any threshold.",
    source: "https://taxguru.in/company-law/internal-audit-companies-act-2013-thresholds-appointment-reporting-obligations.html",
  },
  internalAuditBorrowingThreshold: {
    value: "₹100 crore",
    label: "Outstanding borrowings above which internal audit is mandatory for a private company",
    basis: "Section 138, Companies Act 2013, read with Rule 13, Companies (Accounts) Rules 2014",
    note: "Checked at any point during the preceding financial year, not just at year-end — a temporary spike still triggers it.",
    source: "https://taxguru.in/company-law/internal-audit-companies-act-2013-thresholds-appointment-reporting-obligations.html",
  },
  booksRetentionCompanies: {
    value: "8 financial years",
    label: "Books of account retention period for a company",
    basis: "Section 128, Companies Act 2013",
    note: "The income tax retention period is separate and currently under review given the Income Tax Act 2025 transition — see BLOCKERS.md §1. Do not state an income-tax-specific figure until that is resolved.",
    source: "https://www.registerkaro.in/post/sec-128-of-companies-act-2013",
  },

  // --- Government e-Marketplace and MSE procurement preference -------------
  gemEmdExemption: {
    value: "fully exempt from Earnest Money Deposit",
    label: "EMD treatment for Udyam-registered Micro and Small Enterprises bidding on GeM",
    basis: "Rule 170, General Financial Rules 2017, read with the Public Procurement Policy for MSEs",
    note: "The Udyam certificate must be current at the time of bidding, and the registered business name must match the GeM seller name exactly — a mismatch is a common rejection reason.",
    source: "https://www.tenderbook.in/blogs/gem-benefits-for-msmes-emd-exemptions-preferences-and-more",
  },
  gemMsePriceMatching: {
    value: "quoting within 15% of L1 may match L1 and supply up to 25% of the tendered quantity",
    label: "MSE price-matching preference where the lowest bidder (L1) is not an MSE",
    basis: "Public Procurement Policy for Micro and Small Enterprises",
    source: "https://www.incorpx.io/blog/msme-benefits-government-tenders-procurement",
  },

  // --- GST input tax credit refunds (Section 54, CGST Act) -----------------
  itcRefundTimeLimit: {
    value: "2 years from the relevant date",
    label: "Time limit to file a GST refund application",
    basis: "Section 54(1), CGST Act 2017",
    note: "The portal does not enforce this limitation itself — filing within time is the taxpayer's own responsibility, and 'relevant date' is defined differently for different refund types.",
    source: "https://www.sansalegal.com/post/how-to-claim-a-gst-refund-in-india-eligibility-section-54-process-rfd-01-and-timelines",
  },
  itcRefundFormApplication: {
    value: "GST RFD-01",
    label: "GST refund application form",
    basis: "Rule 89, CGST Rules 2017",
    source: "https://www.mastersindia.co/blog/section-54-gst-refund-process/",
  },
  itcRefundAcknowledgement: {
    value: "RFD-02, within 15 days of a complete application",
    label: "Refund application acknowledgement",
    basis: "Rule 90, CGST Rules 2017",
    source: "https://www.mastersindia.co/blog/section-54-gst-refund-process/",
  },
  itcRefundProvisional: {
    value: "90% sanctioned provisionally, on a risk-evaluation basis",
    label: "Provisional refund for zero-rated supplies and, since 01-10-2025, inverted duty structure claims",
    basis: "Rule 91, CGST Rules 2017, as amended by Notification 13/2025-Central Tax",
    note: "Applies to applications filed on or after 01-10-2025. Confirm the current turnaround for provisional sanction, which sources state inconsistently as 7 or 15 days.",
    source: "https://www.mygstrefund.com/blog/90-percent-provisional-gst-refund-exporters-2025",
  },
  itcInvertedDutyRestriction: {
    value: "restricted to input goods only, not input services or capital goods",
    label: "Scope restriction on the inverted duty structure refund",
    basis: "Section 54(3)(ii), CGST Act 2017, with the Rule 89(5) formula",
    note: "This restriction is the single most common reason an inverted-duty refund claim comes back lower than expected — clients assume all inputs qualify.",
    source: "https://kmgcollp.com/inverted-duty-structure-under-gst/",
  },

  // --- MSME / Udyam classification and payment protection -------------------
  // ⚠️ Revised classification effective 01-04-2025 — investment limits raised
  // 2.5x, turnover limits doubled. Older figures (₹1cr/5cr micro, ₹10cr/50cr
  // small, ₹50cr/250cr medium) are now WRONG and still widely published.
  udyamMicroLimit: {
    value: "investment up to ₹2.5 crore and turnover up to ₹10 crore",
    label: "Micro enterprise classification limit",
    basis: "MSME classification revision effective 01-04-2025, under the MSMED Act 2006",
    note: "Both conditions must be met. Older, now-superseded figures (₹1 crore / ₹5 crore) are still widely published — this is the single most commonly outdated MSME fact online.",
    source: "https://www.iifl.com/blogs/business-loan/msme-classification-2026-micro-small-medium-enterprise-criteria",
  },
  udyamSmallLimit: {
    value: "investment up to ₹25 crore and turnover up to ₹100 crore",
    label: "Small enterprise classification limit",
    basis: "MSME classification revision effective 01-04-2025",
    source: "https://www.iifl.com/blogs/business-loan/msme-classification-2026-micro-small-medium-enterprise-criteria",
  },
  udyamMediumLimit: {
    value: "investment up to ₹125 crore and turnover up to ₹500 crore",
    label: "Medium enterprise classification limit",
    basis: "MSME classification revision effective 01-04-2025",
    source: "https://www.iifl.com/blogs/business-loan/msme-classification-2026-micro-small-medium-enterprise-criteria",
  },
  udyamReclassification: {
    value: "automatic, based on ITR and GST data filed each year",
    label: "How Udyam classification is revised",
    basis: "MSME classification rules",
    note: "Crossing a threshold upward or downward triggers automatic reclassification — clients do not apply for it themselves.",
    source: "https://www.udyam.ltd/blog/msme-turnover-limit-2026",
  },
  msmedPaymentWindow: {
    value: "45 days from acceptance, or 15 days if there is no agreement",
    label: "Maximum payment window to a registered MSME supplier",
    basis: "Section 15, MSMED Act 2006",
    source: "https://www.scconline.com/blog/post/2022/12/14/when-is-the-interest-rate-payable-under-section-16-of-the-msmed-act-2006-applicable/",
  },
  msmedDelayedInterest: {
    value: "compound interest, monthly rests, at three times the RBI-notified bank rate",
    label: "Interest payable on a delayed payment to a registered MSME supplier",
    basis: "Section 16, MSMED Act 2006",
    note: "Non-waivable by agreement, and not deductible as a business expense for the buyer under Section 23 of the same Act.",
    source: "https://nbassociates.net/section-16-of-msme-act/",
  },

  // --- DPIIT Startup India recognition ---------------------------------------
  // ⚠️ Criteria updated by DPIIT notification G.S.R. 108(E), 04-02-2026 —
  // turnover cap raised to ₹200 crore and Cooperative Societies added.
  // INCOME TAX BENEFITS (e.g. the tax holiday) are deliberately NOT stated with
  // a section number here — that sits in the Income Tax Act and is affected by
  // the 01-04-2026 re-codification. See BLOCKERS.md §1.
  dpiitAgeLimit: {
    value: "under 10 years from incorporation (20 years for Deep Tech)",
    label: "Entity age limit for DPIIT startup recognition",
    basis: "DPIIT notification G.S.R. 108(E), 04-02-2026",
    source: "https://www.registerkaro.in/post/startup-india-registration-eligibility",
  },
  dpiitTurnoverCap: {
    value: "₹200 crore in any financial year (₹300 crore for Deep Tech)",
    label: "Turnover cap for DPIIT startup recognition",
    basis: "DPIIT notification G.S.R. 108(E), 04-02-2026",
    note: "Raised from the earlier ₹100 crore cap. Confirm before publishing — this is a very recent change (weeks before this content was written) and worth double-checking against the current notification.",
    source: "https://www.registerkaro.in/post/startup-india-registration-eligibility",
  },
  dpiitEligibleEntities: {
    value: "Private Limited Company, LLP, registered Partnership Firm, Cooperative Society or Multi-State Cooperative",
    label: "Entity types eligible for DPIIT recognition",
    basis: "DPIIT notification G.S.R. 108(E), 04-02-2026",
    note: "A sole proprietorship is NOT eligible for DPIIT recognition.",
    source: "https://www.registerkaro.in/post/startup-india-registration-eligibility",
  },

  // --- CGTMSE (business loan facilitation) ----------------------------------
  cgtmseLimit: {
    value: "₹10 crore collateral-free (₹20 crore for DPIIT-recognised startups)",
    label: "Maximum collateral-free loan cover under CGTMSE",
    basis: "Credit Guarantee Fund Trust for Micro and Small Enterprises scheme",
    note: "Doubled from ₹5 crore in a recent revision. For amounts above ₹10 crore, lenders may structure a hybrid facility with partial collateral on the excess.",
    source: "https://www.setubridgesolutions.co.in/blogs/cgtmse-10-crore-coverage-doubled-2026-msme-loans-update",
  },
  cgtmseCoverage: {
    value: "75% to 85% of the lender's loss generally, up to 90% for micro, women-led and North Eastern Region units",
    label: "CGTMSE guarantee coverage on default",
    basis: "Credit Guarantee Fund Trust for Micro and Small Enterprises scheme",
    source: "https://www.iifl.com/blogs/business-loan/collateral-free-msme-loan",
  },

  // --- Income tax CALENDAR MECHANICS only ------------------------------
  // ⚠️ These two are date-only mechanics (which day of which month), not
  // substantive provisions — they have been stable for years and are not
  // known to be affected by the Income Tax Act 2025 renumbering, unlike form
  // names or section citations. Included for the homepage Compliance Calendar
  // widget ONLY. Do NOT use these to justify writing the itr-filing.js or
  // tds-compliance.js leaf pages — those remain blocked per BLOCKERS.md §1
  // for reasons beyond just these two dates (form renumbering, AY->Tax Year,
  // the uncertain AY 2026-27 due-date tier structure itself).
  tdsPaymentDue: {
    value: "7th of the following month (30 April for March)",
    label: "TDS payment due date",
    basis: "Calendar mechanic, historically stable — cite no section number pending BLOCKERS.md §1",
    note: "CONFIRM before publishing given the ongoing Income Tax Act 2025 transition, even though this specific date is not expected to have changed.",
    source: "https://www.aiaccountant.com/blog/tds-filing-due-date",
  },
  advanceTaxInstalments: {
    value: "15% by 15 June, 45% by 15 September, 75% by 15 December, 100% by 15 March",
    label: "Advance tax instalment schedule",
    basis: "Calendar mechanic, historically stable — cite no section number pending BLOCKERS.md §1",
    note: "CONFIRM before publishing given the ongoing Income Tax Act 2025 transition, even though this schedule is not expected to have changed.",
    source: "https://www.incometaxindia.gov.in/",
  },


  // --- INCOME TAX ACT, 2025 -------------------------------------------------
  // ⚠️ ALL OF THE FOLLOWING WERE RESEARCHED ON 19-08-2026, AFTER the Income
  // Tax Act 2025 took effect on 01-04-2026, specifically to unblock the four
  // Income Tax leaves (BLOCKERS.md §1). NOTHING here is recalled — the 2025
  // Act renumbered essentially every section, so a remembered number is a
  // wrong number. Two structural points that shape every leaf using these:
  //
  //   1. "Previous Year" and "Assessment Year" no longer exist. There is one
  //      concept, TAX YEAR. Any copy using AY vocabulary is written against a
  //      repealed Act.
  //   2. Income earned up to 31-03-2026 is still governed by the 1961 Act;
  //      income from 01-04-2026 by the 2025 Act. Leaves lead with the 2025
  //      Act and say so (BLOCKERS.md §1 Option A).
  //
  // CA SIGN-OFF IS NON-OPTIONAL ON THIS ENTIRE BLOCK. It is the newest and
  // least settled law on the site.

  incomeTaxAct2025Commencement: {
    value: "1 April 2026",
    label: "Date the Income Tax Act, 2025 came into force, replacing the 1961 Act",
    basis: "Income Tax Act, 2025 — a re-codification, not an amendment: sections renumbered, \"Assessment Year\" abolished in favour of \"Tax Year\", TDS/TCS forms renumbered. Income earned up to 31-03-2026 remains governed by the 1961 Act.",
    source: "https://www.caclubindia.com/articles/income-tax-act-2025-vs-1961-what-actually-changed-for-salaried-professionals-55022.asp",
  },

  // Returns — Section 263 (replaces s.139, 139D and 194P of the 1961 Act)
  itrReturnSection: {
    value: "Section 263",
    label: "Return of income — governing section, Income Tax Act 2025",
    basis: "Section 263, Income Tax Act 2025, in force 01-04-2026. Consolidates original, belated, revised and updated returns into one section, replacing Sections 139, 139D and 194P of the 1961 Act.",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrDueDateIndividuals: {
    value: "31 July",
    label: "Return due date — individuals with salary or simple income (ITR-1, ITR-2)",
    basis: "Section 263(1)(b), Income Tax Act 2025",
    source: "https://tax2win.in/guide/section-263-income-tax-act-2025",
  },
  itrDueDateNonAuditBusiness: {
    value: "31 August",
    label: "Return due date — non-audit business and professional cases (ITR-3, ITR-4), and their partners",
    basis: "Section 263(1)(c), Income Tax Act 2025 — moved from 31 July by the Finance Act 2026",
    note: "This tier is NEW. The long-standing split was two-tier (July / October); it is now three-tier. Confirm against the current year's notifications before publishing.",
    source: "https://tax2win.in/guide/section-263-income-tax-act-2025",
  },
  itrDueDateAudit: {
    value: "31 October",
    label: "Return due date — audit cases and companies",
    basis: "Section 263(1), Income Tax Act 2025",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrDueDateTransferPricing: {
    value: "30 November",
    label: "Return due date — cases with transfer pricing reporting obligations",
    basis: "Section 263(1), Income Tax Act 2025",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrBelatedWindow: {
    value: "9 months from the end of the tax year, or before the assessment is completed, whichever is earlier",
    label: "Belated return window",
    basis: "Section 263(4), Income Tax Act 2025",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrRevisedWindow: {
    value: "12 months from the end of the tax year, or before the assessment is completed, whichever is earlier",
    label: "Revised return window",
    basis: "Section 263(5), Income Tax Act 2025",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrUpdatedReturnWindow: {
    value: "48 months from the end of the financial year following the tax year",
    label: "Updated return (ITR-U) window",
    basis: "Section 263(6), Income Tax Act 2025",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrUpdatedReturnAdditionalTax: {
    value: "25% to 70% of the tax and interest due, rising the later it is filed",
    label: "Additional income tax payable on an updated return",
    basis: "Section 267, Income Tax Act 2025",
    note: "Confirm the exact slab boundaries (which delay period attracts which rate) before a client relies on this.",
    source: "https://cleartax.in/s/section-263-income-tax-act-2025",
  },
  itrDefectiveReturnProvision: {
    value: "Section 263(9)",
    label: "Defective return — the provision under which the department asks you to fix a return",
    basis: "Section 263(9), Income Tax Act 2025, successor to Section 139(9) of the 1961 Act",
    source: "https://taxgarden.in/blog/income-tax-notices-types-reasons-how-to-respond-india",
  },
  itrLateFee: {
    value: "₹5,000, or ₹1,000 where total income does not exceed ₹5 lakh",
    label: "Late filing fee for a return filed after the due date",
    basis: "Section 428, Income Tax Act 2025, successor to Section 234F of the 1961 Act. Applies from 01-04-2026.",
    note: "Reported as mandatory in nature under the 2025 Act, unlike its 1961 predecessor — confirm that characterisation with the CA.",
    source: "https://cleartax.in/s/section-428-income-tax-act-2025",
  },
  itrLateFilingInterest: {
    value: "1% per month on unpaid tax",
    label: "Interest for late filing of a return",
    basis: "Section 423, Income Tax Act 2025, successor to Section 234A of the 1961 Act",
    source: "https://bigyanmishra.com/interest-for-late-filing-of-income-tax-return/",
  },
  advanceTaxShortfallInterest: {
    value: "1% per month where advance tax paid is under 90% of the liability",
    label: "Interest on short payment of advance tax",
    basis: "Section 424, Income Tax Act 2025, successor to Section 234B of the 1961 Act",
    source: "https://www.axismaxlife.com/blog/tax-savings/section-424",
  },
  taxYearConcept: {
    value: "Tax Year",
    label: "The single period concept that replaced Previous Year and Assessment Year",
    basis: "Income Tax Act 2025, in force 01-04-2026 — \"Assessment Year\" is abolished, not renamed",
    source: "https://www.caclubindia.com/articles/income-tax-act-2025-vs-1961-what-actually-changed-for-salaried-professionals-55022.asp",
  },

  // Tax audit — Section 63 (successor to s.44AB)
  taxAuditSection: {
    value: "Section 63",
    label: "Tax audit — governing section, Income Tax Act 2025",
    basis: "Section 63, Income Tax Act 2025, successor to Section 44AB of the 1961 Act",
    source: "https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html",
  },
  taxAuditTurnoverThreshold: {
    value: "₹1 crore, rising to ₹10 crore where cash receipts and cash payments are each within 5% of the total",
    label: "Tax audit turnover threshold — business",
    basis: "Section 63, Income Tax Act 2025",
    source: "https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html",
  },
  taxAuditProfessionThreshold: {
    value: "₹50 lakh of gross receipts",
    label: "Tax audit threshold — professionals",
    basis: "Section 63, Income Tax Act 2025",
    source: "https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html",
  },
  taxAuditReportDue: {
    value: "one month before the return due date",
    label: "Tax audit report filing deadline (the \"specified date\")",
    basis: "Section 63 read with Section 263(1), Income Tax Act 2025",
    source: "https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html",
  },
  presumptiveTaxationSection: {
    value: "Sections 58 and 61",
    label: "Presumptive taxation — governing sections, Income Tax Act 2025",
    basis: "Sections 58(2) and 61(2), Income Tax Act 2025, successors to the 44AD / 44ADA presumptive schemes",
    note: "Confirm the turnover ceilings for each scheme separately before any leaf states them — they are deliberately not asserted here.",
    source: "https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html",
  },

  // TDS / TCS — Sections 392, 393, 397 and the renumbered forms
  tdsSalarySection: {
    value: "Section 392",
    label: "TDS on salary — governing section, Income Tax Act 2025",
    basis: "Section 392, Income Tax Act 2025, successor to Section 192 of the 1961 Act",
    source: "https://www.caclubindia.com/articles/old-vs-new-tds-sections-mapping-under-income-tax-act-2025-complete-guide-for-fy-202627-55160.asp",
  },
  tdsNonSalarySection: {
    value: "Section 393",
    label: "TDS on every non-salary payment — governing section, Income Tax Act 2025",
    basis: "Section 393, Income Tax Act 2025 — one tabular section with payment codes, replacing Sections 193 to 194T of the 1961 Act",
    source: "https://www.caclubindia.com/articles/old-vs-new-tds-sections-mapping-under-income-tax-act-2025-complete-guide-for-fy-202627-55160.asp",
  },
  tdsComplianceSection: {
    value: "Section 397",
    label: "TAN, quarterly statements and TDS certificates — governing section",
    basis: "Section 397, Income Tax Act 2025; quarterly statements under Section 397(3)(b)",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },
  tdsFormSalaryStatement: {
    value: "Form 138",
    label: "Quarterly TDS statement — salary (was Form 24Q)",
    basis: "Income-tax Rules, 2026, effective 01-04-2026",
    source: "https://blog.saginfotech.com/tds-returns-forms-138-140-144-143",
  },
  tdsFormNonSalaryStatement: {
    value: "Form 140",
    label: "Quarterly TDS statement — non-salary payments to residents (was Form 26Q)",
    basis: "Income-tax Rules, 2026, effective 01-04-2026",
    source: "https://blog.saginfotech.com/tds-returns-forms-138-140-144-143",
  },
  tdsFormNonResidentStatement: {
    value: "Form 144",
    label: "Quarterly TDS statement — payments to non-residents (was Form 27Q)",
    basis: "Income-tax Rules, 2026, effective 01-04-2026",
    source: "https://blog.saginfotech.com/tds-returns-forms-138-140-144-143",
  },
  tcsFormStatement: {
    value: "Form 143",
    label: "Quarterly TCS statement (was Form 27EQ)",
    basis: "Income-tax Rules, 2026, effective 01-04-2026",
    source: "https://blog.saginfotech.com/tds-returns-forms-138-140-144-143",
  },
  tdsCertificateSalary: {
    value: "Form 130",
    label: "TDS certificate — salary (was Form 16)",
    basis: "Income-tax Rules, 2026, effective 01-04-2026",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },
  tdsCertificateNonSalary: {
    value: "Form 131",
    label: "TDS certificate — non-salary payments (was Form 16A)",
    basis: "Income-tax Rules, 2026, effective 01-04-2026",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },
  tdsQuarterlyStatementDues: {
    value: "31 July, 31 October, 31 January and 31 May",
    label: "Quarterly TDS/TCS statement due dates (Q1 to Q4)",
    basis: "Income-tax Rules, 2026 — substantively unchanged from the 1962 Rules; TCS statement dates were aligned to the same days",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },
  tdsCertificateIssueWindow: {
    value: "15 days from the statement due date",
    label: "Deadline to issue TDS certificates to deductees",
    basis: "Income-tax Rules, 2026 — i.e. 15 August, 15 November, 15 February and 15 June",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },
  tdsLateStatementFee: {
    value: "₹200 per day of delay, capped at the tax deducted",
    label: "Late filing fee for a quarterly TDS/TCS statement",
    basis: "Section 427, Income Tax Act 2025, successor to Section 234E of the 1961 Act",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },
  tdsLateDepositInterest: {
    value: "1.5% per month from the date of deduction to the date of payment",
    label: "Interest on TDS deducted but deposited late",
    basis: "Income Tax Act 2025 — rate carried forward unchanged from the 1961 Act",
    source: "https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp",
  },

  // Assessment, notices and appeals — Sections 268 to 280, 356
  assessmentSection: {
    value: "Section 270",
    label: "Assessment (processing of a return and scrutiny) — governing section",
    basis: "Section 270, Income Tax Act 2025, successor to Section 143 of the 1961 Act",
    source: "https://eztax.in/income-tax-act-2025/section-270",
  },
  intimationOuterLimit: {
    value: "9 months from the end of the financial year in which the return is filed",
    label: "Outer limit for the department to issue an intimation on a processed return",
    basis: "Section 270(1), Income Tax Act 2025",
    source: "https://eztax.in/income-tax-act-2025/section-270",
  },
  scrutinyNoticeWindow: {
    value: "3 months from the end of the financial year in which the return is filed",
    label: "Time limit for the department to serve a scrutiny notice",
    basis: "Section 270(8), Income Tax Act 2025, successor to the Section 143(2) window",
    source: "https://eztax.in/income-tax-act-2025/section-270",
  },
  inquiryBeforeAssessmentSection: {
    value: "Section 268",
    label: "Inquiry before assessment — the section under which the officer calls for information",
    basis: "Section 268, Income Tax Act 2025",
    source: "https://www.caclubindia.com/news/rectification-assessment-and-appeals-under-income-tax-act-2025-26723.asp",
  },
  bestJudgmentAssessmentSection: {
    value: "Section 271",
    label: "Best judgment assessment — what happens if you do not respond",
    basis: "Section 271, Income Tax Act 2025, successor to Section 144 of the 1961 Act",
    source: "https://www.taxtmi.com/tmi_notes?id=2220",
  },
  facelessAssessmentSection: {
    value: "Section 273",
    label: "Faceless assessment — the default mode for assessment, best judgment and reassessment",
    basis: "Section 273, Income Tax Act 2025 — conducted electronically through the National Faceless Assessment Centre",
    source: "https://ai.jamku.app/incometax2025/act/273.html",
  },
  reassessmentNoticeSection: {
    value: "Section 280",
    label: "Notice for income escaping assessment (reassessment)",
    basis: "Section 280 read with Section 279, Income Tax Act 2025, successors to Sections 148 and 147 of the 1961 Act",
    source: "https://www.taxheal.com/types-of-assessment-in-income-tax-act-2025.html",
  },
  appealFirstLevelWindow: {
    value: "30 days from the date the order is served",
    label: "Time limit to file a first appeal",
    basis: "Income Tax Act 2025 — first appeal to the Joint Commissioner (Appeals) under Section 356, or to the Commissioner (Appeals)",
    source: "https://eztax.in/income-tax-act-2025/section-356",
  },
  appealDisposalTimeline: {
    value: "within one year from the end of the financial year in which the appeal is filed, where possible",
    label: "Indicative timeline for a first appeal to be decided",
    basis: "Income Tax Act 2025 — a direction to the appellate authority, not a guarantee to the taxpayer",
    note: "Word this as an aspiration on any page that states it. It is not enforceable by the appellant.",
    source: "https://www.patronaccounting.com/blog/appeal-cit-a-itat-rules-2026",
  },

  // Rates and reliefs — for the tax planning leaf
  newRegimeSlabs: {
    value: "nil up to ₹4 lakh, 5% to ₹8 lakh, 10% to ₹12 lakh, 15% to ₹16 lakh, 20% to ₹20 lakh, 25% to ₹24 lakh and 30% above",
    label: "Individual slab rates — new regime",
    basis: "Rates in force for the tax year; unchanged by the Union Budget 2026",
    note: "Re-check every Finance Act. This is the single most frequently changed fact on the site.",
    source: "https://cleartax.in/c/income-tax-slab-rates",
  },
  oldRegimeSlabs: {
    value: "nil up to ₹2.5 lakh, 5% to ₹5 lakh, 20% to ₹10 lakh and 30% above, with a higher nil threshold at ages 60 and 80",
    label: "Individual slab rates — old regime",
    basis: "Rates in force for the tax year",
    source: "https://cleartax.in/c/income-tax-slab-rates",
  },
  standardDeductionNewRegime: {
    value: "₹75,000",
    label: "Standard deduction for salary and pension — new regime",
    basis: "Income Tax Act 2025",
    source: "https://cleartax.in/c/income-tax-slab-rates",
  },
  standardDeductionOldRegime: {
    value: "₹50,000",
    label: "Standard deduction for salary — old regime",
    basis: "Income Tax Act 2025",
    source: "https://cleartax.in/c/income-tax-slab-rates",
  },
  rebateSection: {
    value: "Section 156",
    label: "Rebate for small taxpayers — governing section",
    basis: "Section 156, Income Tax Act 2025, successor to Section 87A of the 1961 Act",
    source: "https://cleartax.in/s/income-tax-rebate-us-87a",
  },
  rebateNewRegime: {
    value: "up to ₹60,000, taking tax to nil on taxable income up to ₹12 lakh",
    label: "Rebate available under the new regime",
    basis: "Section 156, Income Tax Act 2025",
    note: "The ₹12 lakh figure is taxable income AFTER the standard deduction, and the rebate does not extend to income taxed at special rates. Both caveats must survive into any page that states this.",
    source: "https://cleartax.in/s/income-tax-rebate-us-87a",
  },

  // --- Misc ----------------------------------------------------------------
  gstinLength: {
    value: "15 characters",
    label: "Length of a GSTIN",
    basis: "Structural — state code, PAN, entity code, check digit",
    source: "https://cleartax.in/s/gst-registration-documents-checklist",
  },
  gstDocUploadLimit: {
    value: "100 KB per file, PDF or JPEG",
    label: "GST portal document upload limit",
    basis: "GST portal operational limit",
    note: "Operational rather than statutory — verify against the portal, it changes without notification.",
    source: "https://cleartax.in/s/gst-registration-documents-checklist",
  },

  // --- GST — LUT and export refunds (Rule 96A, CGST Rules 2017) -----------
  // Added 18-08-2026, researched for gst-lut-export-refunds.js.
  lutFormNumber: {
    value: "Form GST RFD-11",
    label: "Form used to furnish a Letter of Undertaking (LUT)",
    basis: "Rule 96A(1), CGST Rules 2017",
    source: "https://irisgst.com/form-rfd-11-used-for-furnishing-letter-of-undertaking-lut/",
  },
  lutValidityPeriod: {
    value: "one financial year (1 April to 31 March)",
    label: "Validity period of an accepted LUT",
    basis: "GST portal practice under Rule 96A — no statutory carry-forward provision; a fresh LUT must be filed each financial year",
    source: "https://www.indiafilings.com/learn/how-to-file-and-renew-your-lut",
  },
  lutEligibilityThreshold: {
    value: "₹2.5 crore",
    label: "Tax-evasion threshold above which a person is ineligible to furnish an LUT and must furnish a bond instead",
    basis: "Notification No. 37/2017-Central Tax, dated 04-10-2017",
    source: "https://www.lexology.com/library/detail.aspx?g=1e166b98-a660-4d4a-9631-927073b51ebf",
  },
  lutBankGuaranteeCap: {
    value: "up to 15% of the bond amount",
    label: "Bank guarantee normally required alongside an export bond for LUT-ineligible exporters",
    basis: "Circular No. 8/8/2017-GST",
    note: "The jurisdictional Commissioner may waive or reduce this based on the exporter's track record.",
    source: "https://cbic-gst.gov.in/pdf/Final_Master_circular_LUT_Bond_04102017.pdf",
  },
  lutGoodsExportWindow: {
    value: "3 months",
    label: "Time limit to physically export goods from the date of the export invoice, under LUT/bond",
    basis: "Rule 96A(1)(a), CGST Rules 2017",
    source: "https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter10/rule96a_v1.00.html",
  },
  lutServicesRealisationWindow: {
    value: "1 year",
    label: "Time limit to realise payment for a services export from the date of the export invoice, under LUT/bond",
    basis: "Rule 96A(1)(b), CGST Rules 2017",
    note: "⚠️ CONFIRM CURRENT TEXT — distinct from RBI/FEMA's general export-realisation window, which was separately extended from 9 to 15 months in late 2025. No confirmation found that Rule 96A itself was amended to match; needs a current-text check before publishing.",
    source: "https://www.caclubindia.com/articles/export-of-services-and-receipt-of-consideration-under-gst-50977.asp",
  },
  lutPaymentWindow: {
    value: "15 days",
    label: "Window to pay IGST plus interest after the goods-export or services-realisation deadline expires, before the LUT facility is deemed withdrawn",
    basis: "Rule 96A(1), CGST Rules 2017",
    source: "https://fintaxblog.com/rule-96a-of-cgst-rules-2017-refund-of-integrated-tax-paid-on-export-of-goods-or-services-under-bond-or-letter-of-undertaking/",
  },
  lutOfficerResponseWindow: {
    value: "3 working days",
    label: "Officer response window before an LUT application is deemed accepted",
    basis: "Circular No. 40/14/2018-GST",
    source: "https://cbic-gst.gov.in/pdf/circularno-40-cgst.pdf",
  },

  // --- Import Export Code (IEC) — DGFT -------------------------------------
  // Added 18-08-2026, researched for iec-registration.js.
  iecFormApplication: {
    value: "ANF-2A",
    label: "IEC application form",
    basis: "Handbook of Procedures 2023, under the Foreign Trade Policy",
    source: "https://content.dgft.gov.in/Website/ANF-2A_0.pdf",
  },
  iecGovtFee: {
    value: "₹500",
    label: "Government fee for a fresh IEC application",
    basis: "DGFT fee schedule for IEC and related services",
    source: "https://www.indiafilings.com/learn/revised-application-fee-for-iec-and-various-dgft-services",
  },
  iecOnePerPan: {
    value: "one IEC per PAN",
    label: "Limit on IEC issuance per PAN",
    basis: "DGFT policy — the IEC number is the business's PAN itself, following GST implementation",
    note: "Multiple IECs against the same PAN are not permitted; a business with an existing, even unused, IEC cannot apply for a second one.",
    source: "https://www.jparks.co/iec/are-iec-and-pan-number-the-same/",
  },
  iecValidity: {
    value: "permanent, with no periodic renewal",
    label: "Validity of an Import Export Code",
    basis: "DGFT policy — IEC made permanent, effective FY 2021-22",
    note: "Not to be confused with the separate mandatory annual update requirement introduced the same year — permanence removed renewal, not the update obligation.",
    source: "https://ofinlegal.com/iec-renewal/",
  },
  iecAnnualUpdateWindow: {
    value: "1 April to 30 June",
    label: "Window to complete the mandatory annual IEC update",
    basis: "DGFT notification, effective FY 2021-22",
    note: "At no charge. Required every year even if no details have changed.",
    source: "https://www.jparks.co/iec/how-to-check-iec-renewal-status/",
  },
  iecDeactivationConsequence: {
    value: "deactivated, and cannot be used for any import or export",
    label: "Consequence of missing the annual IEC update window",
    basis: "DGFT notification, effective FY 2021-22",
    note: "Reactivation is automatic and free once the overdue update is filed — there is no fresh application or fee.",
    source: "https://www.jparks.co/iec/how-to-check-iec-renewal-status/",
  },
  iecExemptCategories: {
    value: "Central and State Government departments, and imports or exports for personal use unconnected with trade, manufacture or agriculture",
    label: "Categories exempted from holding an IEC",
    basis: "Para 2.07, Handbook of Procedures, read with the Foreign Trade Policy",
    note: "The exemption does not extend to export of SCOMET (Special Chemicals, Organisms, Materials, Equipment and Technologies) items. Confirm against the current HBP edition — para numbering has shifted between FTP cycles.",
    source: "https://content.dgft.gov.in/Website/dgftprod/6978673f-9c59-4aac-a612-084df7b47e39/HBP2023_Chapter02.pdf",
  },
  iecProcessingTime: {
    value: "1 to 2 working days",
    label: "Typical DGFT processing time for a fresh IEC application",
    basis: "DGFT portal operational timeline, not a statutory guarantee",
    note: "Assumes the application and digital signature/Aadhaar authentication are in order and no clarification is sought.",
    source: "https://www.skydo.com/blog/iec-code-apply-online",
  },

  // --- ICEGATE / AD Code — Customs -----------------------------------------
  // Added 18-08-2026, researched for icegate-registration.js.
  icegateAdCodeLength: {
    value: "14-digit",
    label: "Length of an Authorised Dealer (AD) Code",
    basis: "Structural — issued by the RBI-authorised bank branch holding the exporter's/importer's current account",
    source: "https://www.skydo.com/blog/ad-code-registration",
  },
  icegateAdCodeScope: {
    value: "One registration is valid at every Indian customs port under the same IEC",
    label: "Scope of AD Code registration on ICEGATE",
    basis: "ICEGATE 2.0 procedural change, superseding the earlier port-wise registration requirement",
    note: "IFSC code registration for receiving duty refunds and IGST credits must still be done separately at each port you actually export from. ⚠️ Customs circulars on this have moved more than once — confirm still current before publishing.",
    source: "https://onpattison.com/news/2026/jan/26/iec-and-ad-code-registration-complete-guide-for-exporters-in-india/",
  },
  icegateGovtFee: {
    value: "None — no government fee for ICEGATE or AD code registration itself",
    label: "Government fee for ICEGATE and AD code registration",
    basis: "CBIC ICEGATE portal — no prescribed fee for this registration",
    note: "Banks and DSC issuers may charge their own processing fees; those are not government charges.",
    source: "https://www.skydo.com/blog/ad-code-registration",
  },
  icegateProcessingTime: {
    value: "3 to 4 working days",
    label: "Typical ICEGATE role-registration approval time after submission",
    basis: "ICEGATE portal operational timeline, not a statutory guarantee",
    note: "Excludes the time to obtain the AD code letter from the bank, which is usually the longer step.",
    source: "https://cleartax.in/s/icegate-registration",
  },

  // --- Trademark registration — Trade Marks Act 1999 / Rules 2017 ---------
  // Added 18-08-2026, researched for trademark-registration.js.
  tmFormApplication: {
    value: "TM-A",
    label: "Trademark application form",
    basis: "Trade Marks Rules 2017",
    note: "Unified single/multi-class and collective-mark filing into one form; replaced the earlier multi-form system.",
    source: "https://ipindia.gov.in/tm-rules-2017",
  },
  tmClassesTotal: {
    value: "45 classes",
    label: "Number of classes under the Nice Classification used for Indian trademark filing",
    basis: "Fourth Schedule, Trade Marks Rules 2017",
    note: "Classes 1–34 cover goods, 35–45 cover services.",
    source: "https://www.intepat.com/blog/trademark-registration-fees-india",
  },
  tmFeeStandardApplicant: {
    value: "₹4,500 per class",
    label: "Government e-filing fee per class — individuals, sole proprietors, and MSME/DPIIT-startup applicants",
    basis: "First Schedule, Trade Marks Rules 2017",
    note: "Requires a valid Udyam registration or DPIIT recognition certificate at the time of filing to qualify. Paper filing costs more.",
    source: "https://www.intepat.com/blog/trademark-registration-fees-india",
  },
  tmFeeOtherApplicant: {
    value: "₹9,000 per class",
    label: "Government e-filing fee per class — partnerships, LLPs and companies without qualifying MSME/startup status",
    basis: "First Schedule, Trade Marks Rules 2017",
    source: "https://www.intepat.com/blog/trademark-registration-fees-india",
  },
  tmFormPowerOfAttorney: {
    value: "TM-48",
    label: "Power of Attorney form authorising an agent to file on the applicant's behalf",
    basis: "Trade Marks Rules 2017",
    source: "https://www.mondaq.com/india/trademark/1612072/documents-required-for-trademark-registration",
  },
  tmOppositionWindow: {
    value: "4-month opposition window",
    label: "Window to file a notice of opposition after journal publication",
    basis: "Rule 42, Trade Marks Rules 2017, read with Section 21(1), Trade Marks Act 1999",
    note: "Fixed at 4 months from the date of publication/re-advertisement in the Trade Marks Journal; the Registrar no longer has power to extend it (removed by the 2017 Rules).",
    source: "https://www.legalserviceindia.com/legal/article-248-trademark-opposition-under-new-trademark-rule-2017.html",
  },
  tmValidityPeriod: {
    value: "10 years from the date of filing",
    label: "Duration of a trademark registration before renewal is due",
    basis: "Section 25(1), Trade Marks Act 1999",
    note: "Renewable indefinitely — no cap on the number of renewals.",
    source: "https://ssrana.in/ip-laws/trademarks-in-india/trademark-renewal-in-india/",
  },
  tmRenewalGracePeriod: {
    value: "a 6-month grace period",
    label: "Grace period to restore a lapsed trademark registration after expiry",
    basis: "Section 25(3)–(4), Trade Marks Act 1999",
    note: "Restoration requires the prescribed form and a surcharge on top of the normal renewal fee. After this window closes the mark is removed from the register and the original filing date is lost.",
    source: "https://thelegalschool.in/blog/section-25-of-trademark-act",
  },

  // --- NGO Darpan — NITI Aayog ----------------------------------------------
  // Added 18-08-2026, researched for ngo-darpan-registration.js.
  ngoDarpanCsr1Requirement: {
    value: "cannot file Form CSR-1 with the Ministry of Corporate Affairs without a Darpan ID",
    label: "Darpan ID as a precondition for MCA Form CSR-1",
    basis: "MCA notification dated 22-01-2021, mandating CSR-1 registration for NGOs receiving CSR funds, effective 01-04-2021",
    note: "Form CSR-1 has a dedicated, mandatory Darpan ID field — the form cannot be submitted without it where the NGO is registered on the Darpan portal.",
    source: "https://www.india-briefing.com/news/navigate-indias-new-csr-1-requirements-essential-guide-for-businesses-38648.html/",
  },
  ngoDarpanFcraRequirement: {
    value: "requires a Darpan ID",
    label: "Darpan ID as a precondition for FCRA registration, prior permission, renewal and annual return filing",
    basis: "Ministry of Home Affairs notice, 06-10-2017 (\"Unique ID of NGOs receiving Foreign Contribution\"), and subsequent FCRA portal directives",
    source: "https://fcraonline.nic.in/home/PDF_Doc/fc_notice_06102017.pdf",
  },
  ngoDarpanFee: {
    value: "the portal charges no registration fee",
    label: "Government fee for NGO Darpan registration",
    basis: "NITI Aayog / NGO-PS portal — no prescribed fee",
    source: "https://www.registerkaro.in/post/ngo-darpan-registration",
  },
  ngoDarpanVerificationTime: {
    value: "15 to 30 working days",
    label: "Typical NITI Aayog verification time for an NGO Darpan application",
    basis: "NGO Darpan portal operational timeline, not a statutory guarantee",
    note: "⚠️ Sources disagree — some cite 7–15 working days instead of 15–30. Confirm the current figure against the live portal before publishing.",
    source: "https://www.incorpx.io/guide/how-to-apply-for-darpan-registration-certificate-2026-step-by-step-guide-for-ngos",
  },

  // --- Trust, Society & Section 8 company formation ------------------------
  // Added 18-08-2026, researched for trust-society-section8.js.
  trustGoverningLaw: {
    value: "the Indian Trusts Act, 1882",
    label: "Statute governing a private trust",
    basis: "Indian Trusts Act, 1882",
    note: "Governs private trusts specifically. A PUBLIC charitable trust is not comprehensively covered by this Act — see trustDeedRegistrationRule below for how one is actually set up where no state Public Trusts Act applies.",
    source: "https://cleartax.in/s/indian-trusts-act",
  },
  trustDeedRegistrationRule: {
    value: "registration is compulsory once the trust holds immovable property",
    label: "When a trust deed must be registered, and under what law",
    basis: "Section 17, Registration Act 1908, read with Section 5, Indian Trusts Act 1882",
    note: "Most Indian states — Tamil Nadu among them — have no dedicated Public Trusts Act currently in force, so in their absence a public charitable trust is created the same way: a registered trust deed under the central Registration Act, 1908, at the Sub-Registrar's office. ⚠️ See trust-society-section8.js's review notes — confirm the Tamil Nadu Public Trusts Act, 2020 has not since been notified into force before relying on this.",
    source: "https://www.willjini.com/blog/indian-trusts-act-1882-registration-taxation/",
  },
  trustMinTrustees: {
    value: "at least two trustees",
    label: "Practical minimum number of trustees to register a trust",
    basis: "Indian Trusts Act, 1882, and standard sub-registrar practice",
    note: "The Act itself does not fix a number for a private trust; two is the number practitioners and registering offices treat as the working minimum, and one of the two may also be the settlor.",
    source: "https://enterslice.com/learning/trust-registration-indian-trust-act-1882/",
  },
  tnSocietiesAct: {
    value: "Tamil Nadu Societies Registration Act, 1975",
    label: "Statute governing society registration in Tamil Nadu",
    basis: "Tamil Nadu Act 27 of 1975",
    note: "Repeals the central Societies Registration Act, 1860 as it applied to Tamil Nadu (Section 53). A Salem-based society registers, and is regulated, under this state Act — not the central 1860 Act most national guides describe by default.",
    source: "https://upload.indiacode.nic.in/showfile?actid=AC_TN_85_691_00002_00002_1549874708133&type=actfile&filename=tn_societies-registration-act-1975.pdf",
  },
  societyMinMembersTN: {
    value: "at least 7 members",
    label: "Minimum members to register a society in Tamil Nadu",
    basis: "Tamil Nadu Societies Registration Act, 1975",
    source: "https://www.indiafilings.com/learn/society-registration-in-tamil-nadu",
  },
  section8LicenceRoute: {
    value: "the Section 8(1) licence to drop \"Private Limited\" from the name is now granted together with the Certificate of Incorporation through SPICe+, so a standalone Form INC-12 application is no longer filed for a fresh incorporation",
    label: "How a Section 8 company's government licence is obtained",
    basis: "Section 8, Companies Act 2013, read with the current SPICe+ integrated incorporation process",
    note: "Operational filing mechanics rather than a Companies Act provision — confirm against the current MCA portal before publishing, since portal filing structure changes without statutory notice. INC-12 remains the correct form/route for an EXISTING company converting to Section 8 status, which is a different scenario from a fresh incorporation.",
    source: "https://vakilsearch.com/article/procedure-for-incorporation-of-a-section-8-company/",
  },
  section8ProfitApplicationClause: {
    value: "the memorandum, filed in Form INC-13, must carry a clause committing all income and profit to the company's stated objects, with no dividend to members",
    label: "Section 8 company's mandatory profit-application clause",
    basis: "Section 8(1)(b)–(c), Companies Act 2013",
    source: "https://www.icsi.edu/Webmodules/Publications/FAQs_on_Section_8_Companies.pdf",
  },
  section8DeclarationForms: {
    value: "the INC-14 and INC-15 declarations are no longer separate e-forms — their content is now built into the consolidated INC-9 declaration filed with SPICe+",
    label: "Section 8 incorporation declarations, current filing mechanics",
    basis: "Current MCA SPICe+ filing structure",
    note: "Operational filing mechanics, not a Companies Act provision — re-verify against the live MCA portal before publishing, it is revised without notice.",
    source: "https://vakilsearch.com/article/procedure-for-incorporation-of-a-section-8-company/",
  },

  // --- EPF / ESI registration and payroll (EPF Act 1952, ESI Act 1948) ----
  // Added 18-08-2026, researched for pf-esi-registration.js and
  // payroll-processing-returns.js.
  epfRegistrationThreshold: {
    value: "20 or more employees",
    label: "Employee count threshold for mandatory EPF registration",
    basis: "Section 1(3)(b), Employees' Provident Funds and Miscellaneous Provisions Act 1952",
    note: "Every person on the payroll counts toward this number, regardless of what they earn — coverage of individual employees is a separate question, governed by the wage ceiling. An establishment already covered stays covered even if headcount later falls below 20.",
    source: "https://vakilsearch.com/article/epf-employer-registration-india-2026/",
  },
  epfWageCeiling: {
    value: "₹15,000 per month (basic wages plus dearness allowance)",
    label: "Wage ceiling for compulsory EPF coverage of an individual employee",
    basis: "Section 6, EPF Act 1952, read with the EPF Scheme 1952",
    note: "In force since 01-09-2014. ⚠️ A proposal to raise this to ₹25,000 has been reported (August 2026) but was not notified as law as of this writing — confirm before publishing given how recently this has moved.",
    source: "https://www.businesstoday.in/personal-finance/tax/story/epf-wage-ceiling-hike-to-rs25000-set-to-bring-millions-under-pension-net-what-it-means-546947-2026-08-03",
  },
  epfRegistrationWindow: {
    value: "30 days from crossing the threshold",
    label: "Window to register with EPFO once liable",
    basis: "Section 1(3), EPF Act 1952",
    source: "https://vakilsearch.com/article/epf-employer-registration-india-2026/",
  },
  epfContributionRate: {
    value: "12% of basic wages and DA from both employer and employee",
    label: "EPF contribution rate",
    basis: "Section 6, EPF Act 1952",
    note: "Of the employer's 12%, 8.33% (subject to the wage ceiling) is diverted to the Employees' Pension Scheme and the remainder to the EPF account itself, plus a separate small EDLI contribution — confirm the current admin-charge and EDLI split before publishing a full breakdown.",
    source: "https://hrforest.in/epf-contribution/",
  },
  epfEcrDue: {
    value: "15th of the following month",
    label: "EPF Electronic Challan-cum-Return (ECR) filing and payment due date",
    basis: "Employees' Provident Funds Scheme 1952",
    source: "https://www.catrak.in/deadlines/pf-ecr",
  },
  epfVoluntaryCoverage: {
    value: "voluntary coverage available below the 20-employee threshold, with the mutual consent of the employer and a majority of employees, granted by the Central PF Commissioner",
    label: "Voluntary EPF coverage below the mandatory threshold",
    basis: "Section 1(4), EPF Act 1952",
    note: "Coverage taken up voluntarily becomes permanent and cannot be backdated — it runs from the date of the application, not from an earlier point the employer wishes it had started.",
    source: "https://www.taxtmi.com/tmi_blog_details?id=302255",
  },
  epfNonRegistrationPenalty: {
    value: "imprisonment up to 1 year, a fine up to ₹5,000, or both",
    label: "Penalty for failing to register for EPF when liable",
    basis: "Section 14, EPF Act 1952",
    note: "Repeated or continuing default attracts a higher penalty of up to 3 years' imprisonment. This is on top of the unpaid contributions, interest and damages owed for the whole unregistered period.",
    source: "https://www.aaptaxlaw.com/epf-act-1952/section-14-epf-act-1952-penalties-section-14-employees-provident-funds-miscellaneous-provisions-act-1952.html",
  },
  esiRegistrationThreshold: {
    value: "10 or more employees",
    label: "Employee count threshold for mandatory ESI registration",
    basis: "Section 1(5), ESI Act 1948, as extended to Tamil Nadu by state notification",
    note: "Reduced from the original 20-employee threshold; some states still apply 20 for specific classes of establishment. In Tamil Nadu this extends beyond factories to shops, hotels, restaurants and similar non-factory establishments.",
    source: "https://www.citehr.com/showthread.php?t=450399",
  },
  esiWageCeiling: {
    value: "₹21,000 per month (₹25,000 for an employee with a disability)",
    label: "Wage ceiling for compulsory ESI coverage of an individual employee",
    basis: "Rule 50, ESI (Central) Rules 1950",
    note: "In force since 01-01-2017, unchanged since.",
    source: "https://salarybox.in/esi-applicability-2026-which-companies-must-register-under-esic-complete-guide-for-employers/",
  },
  esiRegistrationWindow: {
    value: "15 days from reaching the threshold",
    label: "Window to register with ESIC once liable",
    basis: "ESI (General) Regulations 1950",
    source: "https://www.keka.com/compliance/forms/esi-registration",
  },
  esiContributionRate: {
    value: "4% of gross wages in total — 3.25% employer, 0.75% employee",
    label: "ESI contribution rate",
    basis: "Rule 51, ESI (Central) Rules 1950",
    note: "Unchanged since the 01-07-2019 revision.",
    source: "https://tallysolutions.com/business-guides/esi-contribution-rate-2026-current-percentage-for-employer-employee/",
  },
  esiMonthlyContributionDue: {
    value: "15th of the following month",
    label: "ESI monthly contribution payment due date",
    basis: "ESI (General) Regulations 1950",
    source: "https://www.indianhrm.com/guides/esi-payment-due-date",
  },
  esiHalfYearlyReturnDue: {
    value: "11 November for the April–September contribution period, 12 May for the October–March period",
    label: "ESI half-yearly consolidated return due date",
    basis: "ESI (General) Regulations 1950",
    note: "Filed on top of, not instead of, the monthly contribution payment — a business current on every monthly payment can still be in default for not filing this return.",
    source: "https://ezhrm.in/esi-return-filing-2026-hr-guide/",
  },
  esiNonRegistrationPenalty: {
    value: "imprisonment up to 3 years (minimum 1 year for specified defaults) and a fine up to ₹10,000",
    label: "Penalty for failing to register for ESI when liable",
    basis: "Section 85, ESI Act 1948",
    note: "Damages of up to 100% of the arrears may additionally be levied under Section 85B, on top of the contributions and interest owed for the unregistered period.",
    source: "https://www.patronaccounting.com/blog/esi-registration-compliance-rates-deadlines",
  },
  shramSuvidhaCommonRegistration: {
    value: "a single \"Registration for EPFO-ESIC\" application on the Unified Shram Suvidha Portal",
    label: "Common online registration mechanism for EPF and ESI",
    basis: "Unified Shram Suvidha Portal (USSP), Ministry of Labour and Employment",
    note: "Both departments recognise the same Labour Identification Number (LIN) for the establishment afterward.",
    source: "https://www.msmekipathshala.com/webkype/assets/pdf/Common%20Registration%20for%20EPFO%20&ESIC.pdf",
  },
  tnProfessionalTaxMechanism: {
    value: "levied and collected by the local municipal body — in Salem, the Salem City Municipal Corporation — not the state government directly, deducted from salary and deposited half-yearly by 30 September and 31 March",
    label: "Mechanism and due dates for Professional Tax on salaries in Tamil Nadu",
    basis: "Tamil Nadu District Municipalities Act 1920 (Chapter VI-A) and the Tamil Nadu Municipal Laws (Second Amendment) Act 1998, given effect through each local body's own council resolution",
    note: "⚠️ The half-yearly slab amounts (income band → tax) are set separately by each municipal corporation and are NOT stated on the site — research returned materially different figures even for two sources describing the same Greater Chennai Corporation slabs, and one source states Salem's own slab table differs from Chennai's. Confirm Salem's current slab notification directly with Salem City Municipal Corporation before publishing any rupee figure.",
    source: "https://www.greythr.com/wiki/acts/professional-tax-tamil-nadu/",
  },
  mgt7aApplicability: {
    value: "One Person Companies and small companies file the abridged MGT-7A instead of the full MGT-7, within the same filing window",
    label: "MGT-7A abridged annual return applicability",
    basis: "Rule 11(1), Companies (Management and Administration) Rules 2014, as inserted by the 2021 Amendment Rules with effect from 05-03-2021",
    note: "Applicable for FY 2020-21 onwards. MGT-7A does not need certification by a practising company secretary and can be filed on directors' Digital Signature Certificates alone.",
    source: "https://taxguru.in/company-law/form-mgt-7a-abridged-annual-return-small-company-opc.html",
  },
  smallCompanyThreshold: {
    value: "paid-up share capital up to ₹4 crore and turnover up to ₹40 crore",
    label: "Small company classification threshold",
    basis: "Section 2(85), Companies Act 2013, as revised by the Companies (Specification of Definitions Details) Amendment Rules 2022, effective 15-09-2022",
    note: "Both conditions must be met. Excludes holding companies, subsidiary companies, Section 8 companies and any company governed by a special Act. Classification is checked every year against that year's figures, not fixed at incorporation.",
    source: "https://taxguru.in/company-law/definition-small-company-w-e-f-15th-september-2022.html",
  },
  dir3KycDeadline: {
    value: "30 September each year",
    label: "DIR-3 KYC annual filing deadline",
    basis: "Rule 12A, Companies (Appointment and Qualification of Directors) Rules 2014",
    note: "Applies to every director holding a DIN as at 31 March of that financial year.",
    source: "https://www.patronaccounting.com/blog/dir-3-kyc-annual-filing-process-deadline-penalty-guide",
  },
  dir3KycLateFee: {
    value: "₹5,000 flat fee per DIN, regardless of how late the filing is",
    label: "Late filing fee for DIR-3 KYC",
    basis: "Rule 12A, Companies (Appointment and Qualification of Directors) Rules 2014",
    note: "The DIN is marked \"Deactivated due to non-filing of DIR-3 KYC\" until the form is filed with this fee — a director cannot sign any MCA filing while deactivated.",
    source: "https://www.incorpx.io/blog/dir-3-kyc-penalty-din-deactivation",
  },

  // --- Personal finance — credit bureaus -----------------------------------
  // Added 18-08-2026, researched for personal-finance.js.
  rbiCreditInformationCompanies: {
    value: "four",
    label: "Number of RBI-licensed credit information companies operating in India",
    basis: "Credit Information Companies (Regulation) Act, 2005 — the four currently licensed are TransUnion CIBIL, Experian, Equifax and CRIF High Mark",
    note: "Licence status can change; re-verify against RBI's current list of licensed CICs before publishing.",
    source: "https://www.paisabazaar.com/credit-score/credit-information-companies-india/",
  },
  creditScoreRange: {
    value: "300–900",
    label: "Standard credit score range used by India's credit information companies",
    basis: "Industry-standard scoring range used by TransUnion CIBIL, Experian, Equifax and CRIF High Mark — not a statutory figure, but a consistent, checkable industry fact rather than something typed from memory.",
    source: "https://www.paisabazaar.com/credit-score/credit-information-companies-india/",
  },
};

/**
 * Terse accessor for interpolating into prose: `${s("gstThresholdGoods")}`.
 * Throws on an unknown key so a typo fails loudly at import time rather than
 * rendering "undefined" into a sentence about tax law.
 */
export function s(key) {
  const fact = statutory[key];
  if (!fact) throw new Error(`statutory: unknown key "${key}"`);
  return fact.value;
}
