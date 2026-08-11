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
export const asOf = "10-08-2026";

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
