# Content Review Checklist — statutory claims

**Generated** by `npm run content:review` · **do not edit by hand**, edits are overwritten.
**Statutory values last researched** 19-08-2026
**Coverage** 31 of 21 service leaves written

---

## Why you are being asked to review this

Every factual claim this website makes about Indian tax law is listed below,
with its legal basis and the pages it appears on. The values were researched
from public sources on 19-08-2026 — **not** recalled from an AI model's training
data, which predates the current financial year. They still need a practising
CA to confirm them against the Act, the Rules and current notifications before
the site goes live.

Two things to know about how this is built:

1. Each value is defined **once**, in `src/content/statutory.js`. Correcting a
   figure here updates every page that mentions it — there is no second copy to
   miss.
2. No page states a **fee**. `fees: null` renders "On request" everywhere, by
   design, until a pricing model is confirmed. See CONTENT-PLAN.md §11.7 on
   whether publishing fixed fees is advisable for your registrations at all.

---

## 1. Statutory claims to confirm

Tick each once you have confirmed the value and the basis.

| Key | Value as published | What it is | Stated basis | Appears on | ✓ |
|---|---|---|---|---|---|
| `gstThresholdGoods` | ₹40 lakh | GST registration threshold — goods, normal category states | Section 22, CGST Act 2017, as raised by Notification 10/2019-Central Tax | GST Registration, Proprietorship | ☐ |
| `gstThresholdServices` | ₹20 lakh | GST registration threshold — services, normal category states | Section 22, CGST Act 2017 | GST Registration, Proprietorship | ☐ |
| `gstRegApplyWindow` | 30 days | Window to apply for GST registration after becoming liable | Section 25(1), CGST Act 2017 | GST Registration | ☐ |
| `gstRegStandardDays` | 7 working days | Standard GST registration approval time (Aadhaar-authenticated, no physical verification) | Rule 9, CGST Rules 2017 | GST Registration, Proprietorship | ☐ |
| `gstRegNoAadhaarDays` | up to 30 days | GST registration approval time without Aadhaar authentication or where physical verification is ordered | Rule 9, CGST Rules 2017 | GST Registration | ☐ |
| `gstBiometricWindow` | 15 days | Window to complete biometric Aadhaar authentication at a GST Suvidha Kendra after submitting REG-01 Part B | Rule 8(4A), CGST Rules 2017 | GST Registration | ☐ |
| `gstRule14ADays` | 3 working days | GST registration approval time under the Rule 14A simplified scheme | Rule 14A, CGST Rules 2017, effective 01-11-2025 | GST Registration | ☐ |
| `gstNonRegistrationPenalty` | ₹10,000 or the tax due, whichever is higher | Penalty for failing to register under GST when liable | Section 122, CGST Act 2017 | GST Registration | ☐ |
| `gstFormApplication` | GST REG-01 | GST registration application (Part A: PAN/mobile/email; Part B: business details and documents) | Rule 8, CGST Rules 2017 | GST Registration | ☐ |
| `gstFormQuery` | GST REG-03 | Notice from the proper officer seeking clarification or further documents | Rule 9(2), CGST Rules 2017 | GST Registration | ☐ |
| `gstFormQueryReply` | GST REG-04 | Reply to a REG-03 clarification notice | Rule 9(2), CGST Rules 2017 | GST Registration | ☐ |
| `gstFormCertificate` | GST REG-06 | Certificate of registration, carrying the GSTIN | Rule 10, CGST Rules 2017 | GST Registration | ☐ |
| `gstr1DueMonthly` | 11th of the following month | GSTR-1 due date — monthly filers | Rule 59, CGST Rules 2017 | GST Return Filing, Compliance Calendar (GSTR-1 (monthly filers)) | ☐ |
| `gstr3bDueMonthly` | 20th of the following month | GSTR-3B due date — monthly filers | Rule 61, CGST Rules 2017 | GST Return Filing, Compliance Calendar (GSTR-3B (monthly filers)) | ☐ |
| `gstr1DueQuarterly` | 13th of the month following the quarter | GSTR-1 due date — QRMP quarterly filers | Rule 59, CGST Rules 2017 | GST Return Filing | ☐ |
| `gstr3bDueQuarterly` | 22nd or 24th of the month following the quarter, by state group | GSTR-3B due date — QRMP quarterly filers | Rule 61, CGST Rules 2017 | GST Return Filing | ☐ |
| `qrmpThreshold` | ₹5 crore | Aggregate turnover ceiling to opt into the QRMP scheme | Rule 61A, CGST Rules 2017 | GST Return Filing | ☐ |
| `pmt06Due` | 25th of each month | PMT-06 monthly tax payment due date under QRMP | Rule 61A, CGST Rules 2017 | GST Return Filing, Compliance Calendar (PMT-06 (QRMP monthly payment)) | ☐ |
| `gstr9Threshold` | ₹2 crore | Aggregate turnover above which GSTR-9 annual return is required | Section 44, CGST Act 2017 read with Rule 80 | GST Return Filing | ☐ |
| `gstr9cThreshold` | ₹5 crore | Aggregate turnover above which GSTR-9C reconciliation statement is required | Section 44, CGST Act 2017 read with Rule 80 | GST Return Filing | ☐ |
| `gstr9Due` | 31 December following the financial year | GSTR-9 and GSTR-9C due date | Rule 80, CGST Rules 2017 | GST Return Filing, Compliance Calendar (GSTR-9 / GSTR-9C (annual)) | ☐ |
| `gstLateFee` | ₹50 per day, or ₹20 per day for a nil return | Late fee for filing GSTR-3B after the due date | Section 47, CGST Act 2017 | GST Return Filing | ☐ |
| `gstInterest` | 18% per annum | Interest on GST paid late | Section 50, CGST Act 2017 | GST Return Filing | ☐ |
| `gstReturnTimeBar` | 3 years | Time bar after which a GST return can no longer be filed at all | Section 39(11), CGST Act 2017; portal enforcement from July 2025 | GST Return Filing | ☐ |
| `gstDemandUnifiedLimitation` | 42 months | Limitation to issue a demand notice under Section 74A (FY 2024-25 onwards) | Section 74A, CGST Act 2017, inserted by Finance (No. 2) Act 2024 | GST Notices & Litigation | ☐ |
| `gstDemandLegacyNonFraud` | 3 years | Limitation under Section 73 (non-fraud) — periods up to FY 2023-24 | Section 73, CGST Act 2017 | GST Notices & Litigation | ☐ |
| `gstDemandLegacyFraud` | 5 years | Limitation under Section 74 (fraud or wilful misstatement) — periods up to FY 2023-24 | Section 74, CGST Act 2017 | GST Notices & Litigation | ☐ |
| `gstFormScrutiny` | ASMT-10 | Scrutiny notice pointing out discrepancies in a return | Section 61, CGST Act 2017 read with Rule 99 | GST Notices & Litigation | ☐ |
| `gstFormScrutinyReply` | ASMT-11, within 30 days | Reply to an ASMT-10 scrutiny notice | Rule 99, CGST Rules 2017 | GST Notices & Litigation | ☐ |
| `gstFormPreNotice` | DRC-01A | Pre-show-cause intimation of tax and interest ascertained as due | Rule 142(1A), CGST Rules 2017 | GST Notices & Litigation | ☐ |
| `gstFormShowCause` | DRC-01 | Show cause notice raising a demand for tax, interest and penalty | Rule 142, CGST Rules 2017 | GST Notices & Litigation | ☐ |
| `gstFormVoluntaryPayment` | DRC-03 | Voluntary payment of tax, used to close a matter before or after a notice | Rule 142(2), CGST Rules 2017 | GST Notices & Litigation | ☐ |
| `gstFormDemandOrder` | DRC-07 | Final adjudication order creating the demand | Rule 142(5), CGST Rules 2017 | GST Notices & Litigation | ☐ |
| `gstFormAppeal` | APL-01 | Appeal to the Appellate Authority against a demand order | Section 107, CGST Act 2017 | GST Notices & Litigation | ☐ |
| `gstAppealWindow` | 3 months from the order | Window to file a first appeal under Section 107 | Section 107(1), CGST Act 2017 | GST Notices & Litigation | ☐ |
| `gstAppealPreDeposit` | 10% of the disputed tax | Mandatory pre-deposit to file a first appeal | Section 107(6), CGST Act 2017 | GST Notices & Litigation | ☐ |
| `pvtLtdMinMembers` | 2 directors and 2 shareholders | Minimum for a Private Limited Company | Section 149 and Section 3, Companies Act 2013 | Private Limited Company, Trust, Society & Section 8 | ☐ |
| `pvtLtdMaxShareholders` | 200 | Maximum shareholders in a Private Limited Company | Section 2(68), Companies Act 2013 | Private Limited Company | ☐ |
| `companyMinCapital` | None — there is no minimum paid-up capital | Minimum paid-up capital for a company | Companies (Amendment) Act 2015, which removed the earlier requirement | Private Limited Company, Trust, Society & Section 8 | ☐ |
| `spicePlusScope` | name reservation, DIN, incorporation, PAN and TAN in one application | What the SPICe+ form covers | Companies (Incorporation) Rules 2014, as amended | Private Limited Company, One Person Company | ☐ |
| `inc20aWindow` | 180 days from incorporation | Window to file INC-20A, the declaration of commencement of business | Section 10A, Companies Act 2013 | Private Limited Company, One Person Company, ROC & Annual Compliance | ☐ |
| `aoc4Window` | 30 days from the AGM | AOC-4 filing window — financial statements | Section 137, Companies Act 2013 | Private Limited Company, One Person Company, Trust, Society & Section 8, ROC & Annual Compliance, Compliance Calendar (AOC-4 (financial statements)) | ☐ |
| `mgt7Window` | 60 days from the AGM | MGT-7 filing window — annual return | Section 92, Companies Act 2013 | Private Limited Company, Trust, Society & Section 8, ROC & Annual Compliance, Compliance Calendar (MGT-7 (annual return)) | ☐ |
| `opcMandatoryConversion` | None — no turnover or capital level forces conversion | Mandatory OPC conversion threshold | Rule 7, Companies (Incorporation) Rules 2014, as amended by the Second Amendment Rules 2021 | One Person Company | ☐ |
| `opcResidency` | 120 days in India | Residency test for OPC eligibility | Rule 3, Companies (Incorporation) Rules 2014, as amended 2021 | One Person Company | ☐ |
| `opcStructure` | one member, one nominee and at least one director | Minimum structure of an OPC | Section 3(1)(c) and Rule 3, Companies Act 2013 | One Person Company | ☐ |
| `llpMinPartners` | 2 designated partners, at least one resident in India | Minimum for an LLP | Section 7, LLP Act 2008 | LLP Registration | ☐ |
| `llpForm11Due` | 30 May | LLP Form 11 annual return due date | Rule 25, LLP Rules 2009 | LLP Registration, ROC & Annual Compliance | ☐ |
| `llpForm8Due` | 30 October | LLP Form 8 statement of account and solvency due date | Rule 24, LLP Rules 2009 | LLP Registration, ROC & Annual Compliance | ☐ |
| `llpLateFee` | ₹100 per day, with no cap | Late fee for LLP Form 8 and Form 11 | LLP Act 2008 read with LLP Rules 2009 | LLP Registration, ROC & Annual Compliance | ☐ |
| `llpAgreementWindow` | 30 days from incorporation | Window to file the LLP agreement in Form 3 | Section 23, LLP Act 2008 | LLP Registration | ☐ |
| `partnershipStatute` | Indian Partnership Act, 1932 | Statute governing partnership firms | Indian Partnership Act, 1932 | Partnership Firm | ☐ |
| `internalAuditTurnoverThreshold` | ₹200 crore | Turnover above which internal audit is mandatory for a private company | Section 138, Companies Act 2013, read with Rule 13, Companies (Accounts) Rules 2014 | Internal Audit | ☐ |
| `internalAuditBorrowingThreshold` | ₹100 crore | Outstanding borrowings above which internal audit is mandatory for a private company | Section 138, Companies Act 2013, read with Rule 13, Companies (Accounts) Rules 2014 | Internal Audit | ☐ |
| `booksRetentionCompanies` | 8 financial years | Books of account retention period for a company | Section 128, Companies Act 2013 | Bookkeeping & Accounting, ROC & Annual Compliance | ☐ |
| `gemEmdExemption` | fully exempt from Earnest Money Deposit | EMD treatment for Udyam-registered Micro and Small Enterprises bidding on GeM | Rule 170, General Financial Rules 2017, read with the Public Procurement Policy for MSEs | GeM Registration, Tender Documentation Support | ☐ |
| `gemMsePriceMatching` | quoting within 15% of L1 may match L1 and supply up to 25% of the tendered quantity | MSE price-matching preference where the lowest bidder (L1) is not an MSE | Public Procurement Policy for Micro and Small Enterprises | GeM Registration | ☐ |
| `itcRefundTimeLimit` | 2 years from the relevant date | Time limit to file a GST refund application | Section 54(1), CGST Act 2017 | ITC Refunds | ☐ |
| `itcRefundFormApplication` | GST RFD-01 | GST refund application form | Rule 89, CGST Rules 2017 | ITC Refunds | ☐ |
| `itcRefundAcknowledgement` | RFD-02, within 15 days of a complete application | Refund application acknowledgement | Rule 90, CGST Rules 2017 | ITC Refunds | ☐ |
| `itcRefundProvisional` | 90% sanctioned provisionally, on a risk-evaluation basis | Provisional refund for zero-rated supplies and, since 01-10-2025, inverted duty structure claims | Rule 91, CGST Rules 2017, as amended by Notification 13/2025-Central Tax | ITC Refunds | ☐ |
| `itcInvertedDutyRestriction` | restricted to input goods only, not input services or capital goods | Scope restriction on the inverted duty structure refund | Section 54(3)(ii), CGST Act 2017, with the Rule 89(5) formula | ITC Refunds | ☐ |
| `udyamMicroLimit` | investment up to ₹2.5 crore and turnover up to ₹10 crore | Micro enterprise classification limit | MSME classification revision effective 01-04-2025, under the MSMED Act 2006 | MSME / Udyam Registration | ☐ |
| `udyamSmallLimit` | investment up to ₹25 crore and turnover up to ₹100 crore | Small enterprise classification limit | MSME classification revision effective 01-04-2025 | MSME / Udyam Registration | ☐ |
| `udyamMediumLimit` | investment up to ₹125 crore and turnover up to ₹500 crore | Medium enterprise classification limit | MSME classification revision effective 01-04-2025 | MSME / Udyam Registration | ☐ |
| `udyamReclassification` | automatic, based on ITR and GST data filed each year | How Udyam classification is revised | MSME classification rules | MSME / Udyam Registration | ☐ |
| `msmedPaymentWindow` | 45 days from acceptance, or 15 days if there is no agreement | Maximum payment window to a registered MSME supplier | Section 15, MSMED Act 2006 | MSME / Udyam Registration | ☐ |
| `msmedDelayedInterest` | compound interest, monthly rests, at three times the RBI-notified bank rate | Interest payable on a delayed payment to a registered MSME supplier | Section 16, MSMED Act 2006 | MSME / Udyam Registration | ☐ |
| `dpiitAgeLimit` | under 10 years from incorporation (20 years for Deep Tech) | Entity age limit for DPIIT startup recognition | DPIIT notification G.S.R. 108(E), 04-02-2026 | Startup India (DPIIT) | ☐ |
| `dpiitTurnoverCap` | ₹200 crore in any financial year (₹300 crore for Deep Tech) | Turnover cap for DPIIT startup recognition | DPIIT notification G.S.R. 108(E), 04-02-2026 | Startup India (DPIIT) | ☐ |
| `dpiitEligibleEntities` | Private Limited Company, LLP, registered Partnership Firm, Cooperative Society or Multi-State Cooperative | Entity types eligible for DPIIT recognition | DPIIT notification G.S.R. 108(E), 04-02-2026 | Startup India (DPIIT) | ☐ |
| `cgtmseLimit` | ₹10 crore collateral-free (₹20 crore for DPIIT-recognised startups) | Maximum collateral-free loan cover under CGTMSE | Credit Guarantee Fund Trust for Micro and Small Enterprises scheme | Business Loan & Financing | ☐ |
| `cgtmseCoverage` | 75% to 85% of the lender's loss generally, up to 90% for micro, women-led and North Eastern Region units | CGTMSE guarantee coverage on default | Credit Guarantee Fund Trust for Micro and Small Enterprises scheme | Business Loan & Financing | ☐ |
| `tdsPaymentDue` | 7th of the following month (30 April for March) | TDS payment due date | Calendar mechanic, historically stable — cite no section number pending BLOCKERS.md §1 | Payroll Processing & Returns, TDS Compliance, Compliance Calendar (TDS Payment (monthly)) | ☐ |
| `advanceTaxInstalments` | 15% by 15 June, 45% by 15 September, 75% by 15 December, 100% by 15 March | Advance tax instalment schedule | Calendar mechanic, historically stable — cite no section number pending BLOCKERS.md §1 | Tax Planning & Advisory, Compliance Calendar (Advance Tax — 1st instalment (15%)), Compliance Calendar (Advance Tax — 2nd instalment (45%)), Compliance Calendar (Advance Tax — 3rd instalment (75%)), Compliance Calendar (Advance Tax — 4th instalment (100%)) | ☐ |
| `incomeTaxAct2025Commencement` | 1 April 2026 | Date the Income Tax Act, 2025 came into force, replacing the 1961 Act | Income Tax Act, 2025 — a re-codification, not an amendment: sections renumbered, "Assessment Year" abolished in favour of "Tax Year", TDS/TCS forms renumbered. Income earned up to 31-03-2026 remains governed by the 1961 Act. | ITR Filing, TDS Compliance, Tax Planning & Advisory, Notices & Assessments | ☐ |
| `itrReturnSection` | Section 263 | Return of income — governing section, Income Tax Act 2025 | Section 263, Income Tax Act 2025, in force 01-04-2026. Consolidates original, belated, revised and updated returns into one section, replacing Sections 139, 139D and 194P of the 1961 Act. | ITR Filing | ☐ |
| `itrDueDateIndividuals` | 31 July | Return due date — individuals with salary or simple income (ITR-1, ITR-2) | Section 263(1)(b), Income Tax Act 2025 | ITR Filing, Tax Planning & Advisory | ☐ |
| `itrDueDateNonAuditBusiness` | 31 August | Return due date — non-audit business and professional cases (ITR-3, ITR-4), and their partners | Section 263(1)(c), Income Tax Act 2025 — moved from 31 July by the Finance Act 2026 | ITR Filing | ☐ |
| `itrDueDateAudit` | 31 October | Return due date — audit cases and companies | Section 263(1), Income Tax Act 2025 | ITR Filing, Tax Planning & Advisory | ☐ |
| `itrDueDateTransferPricing` | 30 November | Return due date — cases with transfer pricing reporting obligations | Section 263(1), Income Tax Act 2025 | ITR Filing | ☐ |
| `itrBelatedWindow` | 9 months from the end of the tax year, or before the assessment is completed, whichever is earlier | Belated return window | Section 263(4), Income Tax Act 2025 | ITR Filing | ☐ |
| `itrRevisedWindow` | 12 months from the end of the tax year, or before the assessment is completed, whichever is earlier | Revised return window | Section 263(5), Income Tax Act 2025 | ITR Filing | ☐ |
| `itrUpdatedReturnWindow` | 48 months from the end of the financial year following the tax year | Updated return (ITR-U) window | Section 263(6), Income Tax Act 2025 | ITR Filing | ☐ |
| `itrUpdatedReturnAdditionalTax` | 25% to 70% of the tax and interest due, rising the later it is filed | Additional income tax payable on an updated return | Section 267, Income Tax Act 2025 | ITR Filing | ☐ |
| `itrDefectiveReturnProvision` | Section 263(9) | Defective return — the provision under which the department asks you to fix a return | Section 263(9), Income Tax Act 2025, successor to Section 139(9) of the 1961 Act | Notices & Assessments | ☐ |
| `itrLateFee` | ₹5,000, or ₹1,000 where total income does not exceed ₹5 lakh | Late filing fee for a return filed after the due date | Section 428, Income Tax Act 2025, successor to Section 234F of the 1961 Act. Applies from 01-04-2026. | ITR Filing | ☐ |
| `itrLateFilingInterest` | 1% per month on unpaid tax | Interest for late filing of a return | Section 423, Income Tax Act 2025, successor to Section 234A of the 1961 Act | ITR Filing | ☐ |
| `advanceTaxShortfallInterest` | 1% per month where advance tax paid is under 90% of the liability | Interest on short payment of advance tax | Section 424, Income Tax Act 2025, successor to Section 234B of the 1961 Act | Tax Planning & Advisory | ☐ |
| `taxYearConcept` | Tax Year | The single period concept that replaced Previous Year and Assessment Year | Income Tax Act 2025, in force 01-04-2026 — "Assessment Year" is abolished, not renamed | ITR Filing, Tax Planning & Advisory | ☐ |
| `taxAuditSection` | Section 63 | Tax audit — governing section, Income Tax Act 2025 | Section 63, Income Tax Act 2025, successor to Section 44AB of the 1961 Act | ITR Filing | ☐ |
| `taxAuditTurnoverThreshold` | ₹1 crore, rising to ₹10 crore where cash receipts and cash payments are each within 5% of the total | Tax audit turnover threshold — business | Section 63, Income Tax Act 2025 | ITR Filing | ☐ |
| `taxAuditProfessionThreshold` | ₹50 lakh of gross receipts | Tax audit threshold — professionals | Section 63, Income Tax Act 2025 | ITR Filing | ☐ |
| `taxAuditReportDue` | one month before the return due date | Tax audit report filing deadline (the "specified date") | Section 63 read with Section 263(1), Income Tax Act 2025 | ITR Filing | ☐ |
| `presumptiveTaxationSection` | Sections 58 and 61 | Presumptive taxation — governing sections, Income Tax Act 2025 | Sections 58(2) and 61(2), Income Tax Act 2025, successors to the 44AD / 44ADA presumptive schemes | ITR Filing, Tax Planning & Advisory | ☐ |
| `tdsSalarySection` | Section 392 | TDS on salary — governing section, Income Tax Act 2025 | Section 392, Income Tax Act 2025, successor to Section 192 of the 1961 Act | TDS Compliance | ☐ |
| `tdsNonSalarySection` | Section 393 | TDS on every non-salary payment — governing section, Income Tax Act 2025 | Section 393, Income Tax Act 2025 — one tabular section with payment codes, replacing Sections 193 to 194T of the 1961 Act | TDS Compliance | ☐ |
| `tdsComplianceSection` | Section 397 | TAN, quarterly statements and TDS certificates — governing section | Section 397, Income Tax Act 2025; quarterly statements under Section 397(3)(b) | TDS Compliance | ☐ |
| `tdsFormSalaryStatement` | Form 138 | Quarterly TDS statement — salary (was Form 24Q) | Income-tax Rules, 2026, effective 01-04-2026 | TDS Compliance | ☐ |
| `tdsFormNonSalaryStatement` | Form 140 | Quarterly TDS statement — non-salary payments to residents (was Form 26Q) | Income-tax Rules, 2026, effective 01-04-2026 | TDS Compliance | ☐ |
| `tdsFormNonResidentStatement` | Form 144 | Quarterly TDS statement — payments to non-residents (was Form 27Q) | Income-tax Rules, 2026, effective 01-04-2026 | TDS Compliance | ☐ |
| `tcsFormStatement` | Form 143 | Quarterly TCS statement (was Form 27EQ) | Income-tax Rules, 2026, effective 01-04-2026 | TDS Compliance | ☐ |
| `tdsCertificateSalary` | Form 130 | TDS certificate — salary (was Form 16) | Income-tax Rules, 2026, effective 01-04-2026 | ITR Filing, TDS Compliance | ☐ |
| `tdsCertificateNonSalary` | Form 131 | TDS certificate — non-salary payments (was Form 16A) | Income-tax Rules, 2026, effective 01-04-2026 | ITR Filing, TDS Compliance | ☐ |
| `tdsQuarterlyStatementDues` | 31 July, 31 October, 31 January and 31 May | Quarterly TDS/TCS statement due dates (Q1 to Q4) | Income-tax Rules, 2026 — substantively unchanged from the 1962 Rules; TCS statement dates were aligned to the same days | TDS Compliance | ☐ |
| `tdsCertificateIssueWindow` | 15 days from the statement due date | Deadline to issue TDS certificates to deductees | Income-tax Rules, 2026 — i.e. 15 August, 15 November, 15 February and 15 June | TDS Compliance | ☐ |
| `tdsLateStatementFee` | ₹200 per day of delay, capped at the tax deducted | Late filing fee for a quarterly TDS/TCS statement | Section 427, Income Tax Act 2025, successor to Section 234E of the 1961 Act | TDS Compliance | ☐ |
| `tdsLateDepositInterest` | 1.5% per month from the date of deduction to the date of payment | Interest on TDS deducted but deposited late | Income Tax Act 2025 — rate carried forward unchanged from the 1961 Act | TDS Compliance | ☐ |
| `assessmentSection` | Section 270 | Assessment (processing of a return and scrutiny) — governing section | Section 270, Income Tax Act 2025, successor to Section 143 of the 1961 Act | Notices & Assessments | ☐ |
| `intimationOuterLimit` | 9 months from the end of the financial year in which the return is filed | Outer limit for the department to issue an intimation on a processed return | Section 270(1), Income Tax Act 2025 | ITR Filing, Notices & Assessments | ☐ |
| `scrutinyNoticeWindow` | 3 months from the end of the financial year in which the return is filed | Time limit for the department to serve a scrutiny notice | Section 270(8), Income Tax Act 2025, successor to the Section 143(2) window | Notices & Assessments | ☐ |
| `inquiryBeforeAssessmentSection` | Section 268 | Inquiry before assessment — the section under which the officer calls for information | Section 268, Income Tax Act 2025 | Notices & Assessments | ☐ |
| `bestJudgmentAssessmentSection` | Section 271 | Best judgment assessment — what happens if you do not respond | Section 271, Income Tax Act 2025, successor to Section 144 of the 1961 Act | Notices & Assessments | ☐ |
| `facelessAssessmentSection` | Section 273 | Faceless assessment — the default mode for assessment, best judgment and reassessment | Section 273, Income Tax Act 2025 — conducted electronically through the National Faceless Assessment Centre | Notices & Assessments | ☐ |
| `reassessmentNoticeSection` | Section 280 | Notice for income escaping assessment (reassessment) | Section 280 read with Section 279, Income Tax Act 2025, successors to Sections 148 and 147 of the 1961 Act | Notices & Assessments | ☐ |
| `appealFirstLevelWindow` | 30 days from the date the order is served | Time limit to file a first appeal | Income Tax Act 2025 — first appeal to the Joint Commissioner (Appeals) under Section 356, or to the Commissioner (Appeals) | Notices & Assessments | ☐ |
| `appealDisposalTimeline` | within one year from the end of the financial year in which the appeal is filed, where possible | Indicative timeline for a first appeal to be decided | Income Tax Act 2025 — a direction to the appellate authority, not a guarantee to the taxpayer | Notices & Assessments | ☐ |
| `newRegimeSlabs` | nil up to ₹4 lakh, 5% to ₹8 lakh, 10% to ₹12 lakh, 15% to ₹16 lakh, 20% to ₹20 lakh, 25% to ₹24 lakh and 30% above | Individual slab rates — new regime | Rates in force for the tax year; unchanged by the Union Budget 2026 | Tax Planning & Advisory | ☐ |
| `oldRegimeSlabs` | nil up to ₹2.5 lakh, 5% to ₹5 lakh, 20% to ₹10 lakh and 30% above, with a higher nil threshold at ages 60 and 80 | Individual slab rates — old regime | Rates in force for the tax year | Tax Planning & Advisory | ☐ |
| `standardDeductionNewRegime` | ₹75,000 | Standard deduction for salary and pension — new regime | Income Tax Act 2025 | Tax Planning & Advisory | ☐ |
| `standardDeductionOldRegime` | ₹50,000 | Standard deduction for salary — old regime | Income Tax Act 2025 | Tax Planning & Advisory | ☐ |
| `rebateSection` | Section 156 | Rebate for small taxpayers — governing section | Section 156, Income Tax Act 2025, successor to Section 87A of the 1961 Act | Tax Planning & Advisory | ☐ |
| `rebateNewRegime` | up to ₹60,000, taking tax to nil on taxable income up to ₹12 lakh | Rebate available under the new regime | Section 156, Income Tax Act 2025 | Tax Planning & Advisory | ☐ |
| `gstinLength` | 15 characters | Length of a GSTIN | Structural — state code, PAN, entity code, check digit | GST Registration | ☐ |
| `gstDocUploadLimit` | 100 KB per file, PDF or JPEG | GST portal document upload limit | GST portal operational limit | GST Registration | ☐ |
| `lutFormNumber` | Form GST RFD-11 | Form used to furnish a Letter of Undertaking (LUT) | Rule 96A(1), CGST Rules 2017 | LUT & Export Refunds | ☐ |
| `lutValidityPeriod` | one financial year (1 April to 31 March) | Validity period of an accepted LUT | GST portal practice under Rule 96A — no statutory carry-forward provision; a fresh LUT must be filed each financial year | LUT & Export Refunds | ☐ |
| `lutEligibilityThreshold` | ₹2.5 crore | Tax-evasion threshold above which a person is ineligible to furnish an LUT and must furnish a bond instead | Notification No. 37/2017-Central Tax, dated 04-10-2017 | LUT & Export Refunds | ☐ |
| `lutBankGuaranteeCap` | up to 15% of the bond amount | Bank guarantee normally required alongside an export bond for LUT-ineligible exporters | Circular No. 8/8/2017-GST | LUT & Export Refunds | ☐ |
| `lutGoodsExportWindow` | 3 months | Time limit to physically export goods from the date of the export invoice, under LUT/bond | Rule 96A(1)(a), CGST Rules 2017 | LUT & Export Refunds | ☐ |
| `lutServicesRealisationWindow` | 1 year | Time limit to realise payment for a services export from the date of the export invoice, under LUT/bond | Rule 96A(1)(b), CGST Rules 2017 | LUT & Export Refunds | ☐ |
| `lutPaymentWindow` | 15 days | Window to pay IGST plus interest after the goods-export or services-realisation deadline expires, before the LUT facility is deemed withdrawn | Rule 96A(1), CGST Rules 2017 | LUT & Export Refunds | ☐ |
| `lutOfficerResponseWindow` | 3 working days | Officer response window before an LUT application is deemed accepted | Circular No. 40/14/2018-GST | LUT & Export Refunds | ☐ |
| `iecFormApplication` | ANF-2A | IEC application form | Handbook of Procedures 2023, under the Foreign Trade Policy | IEC Registration | ☐ |
| `iecGovtFee` | ₹500 | Government fee for a fresh IEC application | DGFT fee schedule for IEC and related services | IEC Registration | ☐ |
| `iecOnePerPan` | one IEC per PAN | Limit on IEC issuance per PAN | DGFT policy — the IEC number is the business's PAN itself, following GST implementation | IEC Registration | ☐ |
| `iecValidity` | permanent, with no periodic renewal | Validity of an Import Export Code | DGFT policy — IEC made permanent, effective FY 2021-22 | IEC Registration | ☐ |
| `iecAnnualUpdateWindow` | 1 April to 30 June | Window to complete the mandatory annual IEC update | DGFT notification, effective FY 2021-22 | IEC Registration | ☐ |
| `iecDeactivationConsequence` | deactivated, and cannot be used for any import or export | Consequence of missing the annual IEC update window | DGFT notification, effective FY 2021-22 | IEC Registration | ☐ |
| `iecExemptCategories` | Central and State Government departments, and imports or exports for personal use unconnected with trade, manufacture or agriculture | Categories exempted from holding an IEC | Para 2.07, Handbook of Procedures, read with the Foreign Trade Policy | IEC Registration | ☐ |
| `iecProcessingTime` | 1 to 2 working days | Typical DGFT processing time for a fresh IEC application | DGFT portal operational timeline, not a statutory guarantee | IEC Registration | ☐ |
| `icegateAdCodeLength` | 14-digit | Length of an Authorised Dealer (AD) Code | Structural — issued by the RBI-authorised bank branch holding the exporter's/importer's current account | ICEGATE Registration | ☐ |
| `icegateAdCodeScope` | One registration is valid at every Indian customs port under the same IEC | Scope of AD Code registration on ICEGATE | ICEGATE 2.0 procedural change, superseding the earlier port-wise registration requirement | ICEGATE Registration | ☐ |
| `icegateGovtFee` | None — no government fee for ICEGATE or AD code registration itself | Government fee for ICEGATE and AD code registration | CBIC ICEGATE portal — no prescribed fee for this registration | ICEGATE Registration | ☐ |
| `icegateProcessingTime` | 3 to 4 working days | Typical ICEGATE role-registration approval time after submission | ICEGATE portal operational timeline, not a statutory guarantee | ICEGATE Registration | ☐ |
| `tmFormApplication` | TM-A | Trademark application form | Trade Marks Rules 2017 | Trademark Registration | ☐ |
| `tmClassesTotal` | 45 classes | Number of classes under the Nice Classification used for Indian trademark filing | Fourth Schedule, Trade Marks Rules 2017 | Trademark Registration | ☐ |
| `tmFeeStandardApplicant` | ₹4,500 per class | Government e-filing fee per class — individuals, sole proprietors, and MSME/DPIIT-startup applicants | First Schedule, Trade Marks Rules 2017 | Trademark Registration | ☐ |
| `tmFeeOtherApplicant` | ₹9,000 per class | Government e-filing fee per class — partnerships, LLPs and companies without qualifying MSME/startup status | First Schedule, Trade Marks Rules 2017 | Trademark Registration | ☐ |
| `tmFormPowerOfAttorney` | TM-48 | Power of Attorney form authorising an agent to file on the applicant's behalf | Trade Marks Rules 2017 | Trademark Registration | ☐ |
| `tmOppositionWindow` | 4-month opposition window | Window to file a notice of opposition after journal publication | Rule 42, Trade Marks Rules 2017, read with Section 21(1), Trade Marks Act 1999 | Trademark Registration | ☐ |
| `tmValidityPeriod` | 10 years from the date of filing | Duration of a trademark registration before renewal is due | Section 25(1), Trade Marks Act 1999 | Trademark Registration | ☐ |
| `tmRenewalGracePeriod` | a 6-month grace period | Grace period to restore a lapsed trademark registration after expiry | Section 25(3)–(4), Trade Marks Act 1999 | Trademark Registration | ☐ |
| `ngoDarpanCsr1Requirement` | cannot file Form CSR-1 with the Ministry of Corporate Affairs without a Darpan ID | Darpan ID as a precondition for MCA Form CSR-1 | MCA notification dated 22-01-2021, mandating CSR-1 registration for NGOs receiving CSR funds, effective 01-04-2021 | NGO Darpan Registration | ☐ |
| `ngoDarpanFcraRequirement` | requires a Darpan ID | Darpan ID as a precondition for FCRA registration, prior permission, renewal and annual return filing | Ministry of Home Affairs notice, 06-10-2017 ("Unique ID of NGOs receiving Foreign Contribution"), and subsequent FCRA portal directives | NGO Darpan Registration | ☐ |
| `ngoDarpanFee` | the portal charges no registration fee | Government fee for NGO Darpan registration | NITI Aayog / NGO-PS portal — no prescribed fee | NGO Darpan Registration | ☐ |
| `ngoDarpanVerificationTime` | 15 to 30 working days | Typical NITI Aayog verification time for an NGO Darpan application | NGO Darpan portal operational timeline, not a statutory guarantee | NGO Darpan Registration | ☐ |
| `trustGoverningLaw` | the Indian Trusts Act, 1882 | Statute governing a private trust | Indian Trusts Act, 1882 | Trust, Society & Section 8 | ☐ |
| `trustDeedRegistrationRule` | registration is compulsory once the trust holds immovable property | When a trust deed must be registered, and under what law | Section 17, Registration Act 1908, read with Section 5, Indian Trusts Act 1882 | Trust, Society & Section 8 | ☐ |
| `trustMinTrustees` | at least two trustees | Practical minimum number of trustees to register a trust | Indian Trusts Act, 1882, and standard sub-registrar practice | Trust, Society & Section 8 | ☐ |
| `tnSocietiesAct` | Tamil Nadu Societies Registration Act, 1975 | Statute governing society registration in Tamil Nadu | Tamil Nadu Act 27 of 1975 | Trust, Society & Section 8 | ☐ |
| `societyMinMembersTN` | at least 7 members | Minimum members to register a society in Tamil Nadu | Tamil Nadu Societies Registration Act, 1975 | Trust, Society & Section 8 | ☐ |
| `section8LicenceRoute` | the Section 8(1) licence to drop "Private Limited" from the name is now granted together with the Certificate of Incorporation through SPICe+, so a standalone Form INC-12 application is no longer filed for a fresh incorporation | How a Section 8 company's government licence is obtained | Section 8, Companies Act 2013, read with the current SPICe+ integrated incorporation process | Trust, Society & Section 8 | ☐ |
| `section8ProfitApplicationClause` | the memorandum, filed in Form INC-13, must carry a clause committing all income and profit to the company's stated objects, with no dividend to members | Section 8 company's mandatory profit-application clause | Section 8(1)(b)–(c), Companies Act 2013 | Trust, Society & Section 8 | ☐ |
| `section8DeclarationForms` | the INC-14 and INC-15 declarations are no longer separate e-forms — their content is now built into the consolidated INC-9 declaration filed with SPICe+ | Section 8 incorporation declarations, current filing mechanics | Current MCA SPICe+ filing structure | Trust, Society & Section 8 | ☐ |
| `epfRegistrationThreshold` | 20 or more employees | Employee count threshold for mandatory EPF registration | Section 1(3)(b), Employees' Provident Funds and Miscellaneous Provisions Act 1952 | PF & ESI Registration | ☐ |
| `epfWageCeiling` | ₹15,000 per month (basic wages plus dearness allowance) | Wage ceiling for compulsory EPF coverage of an individual employee | Section 6, EPF Act 1952, read with the EPF Scheme 1952 | PF & ESI Registration | ☐ |
| `epfRegistrationWindow` | 30 days from crossing the threshold | Window to register with EPFO once liable | Section 1(3), EPF Act 1952 | PF & ESI Registration | ☐ |
| `epfContributionRate` | 12% of basic wages and DA from both employer and employee | EPF contribution rate | Section 6, EPF Act 1952 | PF & ESI Registration | ☐ |
| `epfEcrDue` | 15th of the following month | EPF Electronic Challan-cum-Return (ECR) filing and payment due date | Employees' Provident Funds Scheme 1952 | PF & ESI Registration, Payroll Processing & Returns | ☐ |
| `epfVoluntaryCoverage` | voluntary coverage available below the 20-employee threshold, with the mutual consent of the employer and a majority of employees, granted by the Central PF Commissioner | Voluntary EPF coverage below the mandatory threshold | Section 1(4), EPF Act 1952 | PF & ESI Registration | ☐ |
| `epfNonRegistrationPenalty` | imprisonment up to 1 year, a fine up to ₹5,000, or both | Penalty for failing to register for EPF when liable | Section 14, EPF Act 1952 | PF & ESI Registration | ☐ |
| `esiRegistrationThreshold` | 10 or more employees | Employee count threshold for mandatory ESI registration | Section 1(5), ESI Act 1948, as extended to Tamil Nadu by state notification | PF & ESI Registration | ☐ |
| `esiWageCeiling` | ₹21,000 per month (₹25,000 for an employee with a disability) | Wage ceiling for compulsory ESI coverage of an individual employee | Rule 50, ESI (Central) Rules 1950 | PF & ESI Registration | ☐ |
| `esiRegistrationWindow` | 15 days from reaching the threshold | Window to register with ESIC once liable | ESI (General) Regulations 1950 | PF & ESI Registration | ☐ |
| `esiContributionRate` | 4% of gross wages in total — 3.25% employer, 0.75% employee | ESI contribution rate | Rule 51, ESI (Central) Rules 1950 | PF & ESI Registration | ☐ |
| `esiMonthlyContributionDue` | 15th of the following month | ESI monthly contribution payment due date | ESI (General) Regulations 1950 | PF & ESI Registration, Payroll Processing & Returns | ☐ |
| `esiHalfYearlyReturnDue` | 11 November for the April–September contribution period, 12 May for the October–March period | ESI half-yearly consolidated return due date | ESI (General) Regulations 1950 | Payroll Processing & Returns | ☐ |
| `esiNonRegistrationPenalty` | imprisonment up to 3 years (minimum 1 year for specified defaults) and a fine up to ₹10,000 | Penalty for failing to register for ESI when liable | Section 85, ESI Act 1948 | PF & ESI Registration | ☐ |
| `shramSuvidhaCommonRegistration` | a single "Registration for EPFO-ESIC" application on the Unified Shram Suvidha Portal | Common online registration mechanism for EPF and ESI | Unified Shram Suvidha Portal (USSP), Ministry of Labour and Employment | PF & ESI Registration | ☐ |
| `tnProfessionalTaxMechanism` | levied and collected by the local municipal body — in Salem, the Salem City Municipal Corporation — not the state government directly, deducted from salary and deposited half-yearly by 30 September and 31 March | Mechanism and due dates for Professional Tax on salaries in Tamil Nadu | Tamil Nadu District Municipalities Act 1920 (Chapter VI-A) and the Tamil Nadu Municipal Laws (Second Amendment) Act 1998, given effect through each local body's own council resolution | Payroll Processing & Returns | ☐ |
| `mgt7aApplicability` | One Person Companies and small companies file the abridged MGT-7A instead of the full MGT-7, within the same filing window | MGT-7A abridged annual return applicability | Rule 11(1), Companies (Management and Administration) Rules 2014, as inserted by the 2021 Amendment Rules with effect from 05-03-2021 | ROC & Annual Compliance | ☐ |
| `smallCompanyThreshold` | paid-up share capital up to ₹4 crore and turnover up to ₹40 crore | Small company classification threshold | Section 2(85), Companies Act 2013, as revised by the Companies (Specification of Definitions Details) Amendment Rules 2022, effective 15-09-2022 | ROC & Annual Compliance | ☐ |
| `dir3KycDeadline` | 30 September each year | DIR-3 KYC annual filing deadline | Rule 12A, Companies (Appointment and Qualification of Directors) Rules 2014 | ROC & Annual Compliance | ☐ |
| `dir3KycLateFee` | ₹5,000 flat fee per DIN, regardless of how late the filing is | Late filing fee for DIR-3 KYC | Rule 12A, Companies (Appointment and Qualification of Directors) Rules 2014 | ROC & Annual Compliance | ☐ |
| `rbiCreditInformationCompanies` | four | Number of RBI-licensed credit information companies operating in India | Credit Information Companies (Regulation) Act, 2005 — the four currently licensed are TransUnion CIBIL, Experian, Equifax and CRIF High Mark | Personal Finance & Debt Management | ☐ |
| `creditScoreRange` | 300–900 | Standard credit score range used by India's credit information companies | Industry-standard scoring range used by TransUnion CIBIL, Experian, Equifax and CRIF High Mark — not a statutory figure, but a consistent, checkable industry fact rather than something typed from memory. | Personal Finance & Debt Management | ☐ |

### Caveats already flagged in the source

- **`gstThresholdGoods`** — Tamil Nadu is a normal category state, so this is the figure that applies to Salem clients.
- **`gstRegApplyWindow`** — Apply within the window and registration is effective from the date liability arose; apply late and it is effective only from the date of grant.
- **`gstBiometricWindow`** — Miss it and the ARN is not generated at all — the application stalls rather than being rejected.
- **`gstRule14ADays`** — Optional scheme. Aadhaar-authenticated, algorithmic risk profiling.
- **`gstNonRegistrationPenalty`** — Back tax for the unregistered period plus interest is payable on top. Wilful evasion attracts a penalty equal to 100% of the tax evaded.
- **`gstr3bDueQuarterly`** — ⚠️ Category X states file by the 22nd, Category Y by the 24th. CONFIRM WHICH GROUP TAMIL NADU IS IN before publishing — research did not settle it and guessing would mislead local clients on their own deadline.
- **`pmt06Due`** — QRMP files returns quarterly but pays tax MONTHLY — the distinction clients most often get wrong.
- **`gstLateFee`** — Subject to a cap. Confirm the current cap, which has been revised by notification more than once.
- **`gstInterest`** — Computed daily from the due date to the date of payment.
- **`gstReturnTimeBar`** — Hard block, not a penalty — the period is permanently closed and the input credit in it is lost. This is the single most consequential thing a client with old pending returns needs to hear.
- **`gstDemandUnifiedLimitation`** — Longer than the old 3-year non-fraud limit, shorter than the old 5-year fraud limit. Applies to FY 2024-25 and later.
- **`gstAppealWindow`** — A further one month may be condoned for sufficient cause. Confirm the current condonation position.
- **`pvtLtdMinMembers`** — Directors must be individuals. One person may be both a director and a shareholder, so two people suffice.
- **`pvtLtdMaxShareholders`** — Employees holding shares under an ESOP are excluded from the count.
- **`companyMinCapital`** — Only authorised share capital must be declared. Clients still routinely believe ₹1 lakh is required.
- **`inc20aWindow`** — Until it is filed the company cannot legally commence business or borrow. The most commonly missed post-incorporation step.
- **`aoc4Window`** — ⚠️ Late-filing penalty NOT stated on the site: research returned conflicting figures (₹100/day vs ₹1,000/day, likely fee vs additional penalty). Confirm before publishing any amount.
- **`opcMandatoryConversion`** — An OPC may operate at any capital or turnover indefinitely, and convert voluntarily at any time with no waiting period.
- **`opcResidency`** — Reduced from 182 days. Non-resident Indian citizens may also incorporate an OPC.
- **`opcStructure`** — The nominee must be a natural person who is an Indian citizen and resident, and takes over on the member's death or incapacity.
- **`llpLateFee`** — The absence of a cap is the point — a forgotten LLP filing compounds indefinitely, unlike most company penalties.
- **`internalAuditTurnoverThreshold`** — Checked against turnover during the preceding financial year. Listed companies require internal audit regardless of any threshold.
- **`internalAuditBorrowingThreshold`** — Checked at any point during the preceding financial year, not just at year-end — a temporary spike still triggers it.
- **`booksRetentionCompanies`** — The income tax retention period is separate and currently under review given the Income Tax Act 2025 transition — see BLOCKERS.md §1. Do not state an income-tax-specific figure until that is resolved.
- **`gemEmdExemption`** — The Udyam certificate must be current at the time of bidding, and the registered business name must match the GeM seller name exactly — a mismatch is a common rejection reason.
- **`itcRefundTimeLimit`** — The portal does not enforce this limitation itself — filing within time is the taxpayer's own responsibility, and 'relevant date' is defined differently for different refund types.
- **`itcRefundProvisional`** — Applies to applications filed on or after 01-10-2025. Confirm the current turnaround for provisional sanction, which sources state inconsistently as 7 or 15 days.
- **`itcInvertedDutyRestriction`** — This restriction is the single most common reason an inverted-duty refund claim comes back lower than expected — clients assume all inputs qualify.
- **`udyamMicroLimit`** — Both conditions must be met. Older, now-superseded figures (₹1 crore / ₹5 crore) are still widely published — this is the single most commonly outdated MSME fact online.
- **`udyamReclassification`** — Crossing a threshold upward or downward triggers automatic reclassification — clients do not apply for it themselves.
- **`msmedDelayedInterest`** — Non-waivable by agreement, and not deductible as a business expense for the buyer under Section 23 of the same Act.
- **`dpiitTurnoverCap`** — Raised from the earlier ₹100 crore cap. Confirm before publishing — this is a very recent change (weeks before this content was written) and worth double-checking against the current notification.
- **`dpiitEligibleEntities`** — A sole proprietorship is NOT eligible for DPIIT recognition.
- **`cgtmseLimit`** — Doubled from ₹5 crore in a recent revision. For amounts above ₹10 crore, lenders may structure a hybrid facility with partial collateral on the excess.
- **`tdsPaymentDue`** — CONFIRM before publishing given the ongoing Income Tax Act 2025 transition, even though this specific date is not expected to have changed.
- **`advanceTaxInstalments`** — CONFIRM before publishing given the ongoing Income Tax Act 2025 transition, even though this schedule is not expected to have changed.
- **`itrDueDateNonAuditBusiness`** — This tier is NEW. The long-standing split was two-tier (July / October); it is now three-tier. Confirm against the current year's notifications before publishing.
- **`itrUpdatedReturnAdditionalTax`** — Confirm the exact slab boundaries (which delay period attracts which rate) before a client relies on this.
- **`itrLateFee`** — Reported as mandatory in nature under the 2025 Act, unlike its 1961 predecessor — confirm that characterisation with the CA.
- **`presumptiveTaxationSection`** — Confirm the turnover ceilings for each scheme separately before any leaf states them — they are deliberately not asserted here.
- **`appealDisposalTimeline`** — Word this as an aspiration on any page that states it. It is not enforceable by the appellant.
- **`newRegimeSlabs`** — Re-check every Finance Act. This is the single most frequently changed fact on the site.
- **`rebateNewRegime`** — The ₹12 lakh figure is taxable income AFTER the standard deduction, and the rebate does not extend to income taxed at special rates. Both caveats must survive into any page that states this.
- **`gstDocUploadLimit`** — Operational rather than statutory — verify against the portal, it changes without notification.
- **`lutBankGuaranteeCap`** — The jurisdictional Commissioner may waive or reduce this based on the exporter's track record.
- **`lutServicesRealisationWindow`** — ⚠️ CONFIRM CURRENT TEXT — distinct from RBI/FEMA's general export-realisation window, which was separately extended from 9 to 15 months in late 2025. No confirmation found that Rule 96A itself was amended to match; needs a current-text check before publishing.
- **`iecOnePerPan`** — Multiple IECs against the same PAN are not permitted; a business with an existing, even unused, IEC cannot apply for a second one.
- **`iecValidity`** — Not to be confused with the separate mandatory annual update requirement introduced the same year — permanence removed renewal, not the update obligation.
- **`iecAnnualUpdateWindow`** — At no charge. Required every year even if no details have changed.
- **`iecDeactivationConsequence`** — Reactivation is automatic and free once the overdue update is filed — there is no fresh application or fee.
- **`iecExemptCategories`** — The exemption does not extend to export of SCOMET (Special Chemicals, Organisms, Materials, Equipment and Technologies) items. Confirm against the current HBP edition — para numbering has shifted between FTP cycles.
- **`iecProcessingTime`** — Assumes the application and digital signature/Aadhaar authentication are in order and no clarification is sought.
- **`icegateAdCodeScope`** — IFSC code registration for receiving duty refunds and IGST credits must still be done separately at each port you actually export from. ⚠️ Customs circulars on this have moved more than once — confirm still current before publishing.
- **`icegateGovtFee`** — Banks and DSC issuers may charge their own processing fees; those are not government charges.
- **`icegateProcessingTime`** — Excludes the time to obtain the AD code letter from the bank, which is usually the longer step.
- **`tmFormApplication`** — Unified single/multi-class and collective-mark filing into one form; replaced the earlier multi-form system.
- **`tmClassesTotal`** — Classes 1–34 cover goods, 35–45 cover services.
- **`tmFeeStandardApplicant`** — Requires a valid Udyam registration or DPIIT recognition certificate at the time of filing to qualify. Paper filing costs more.
- **`tmOppositionWindow`** — Fixed at 4 months from the date of publication/re-advertisement in the Trade Marks Journal; the Registrar no longer has power to extend it (removed by the 2017 Rules).
- **`tmValidityPeriod`** — Renewable indefinitely — no cap on the number of renewals.
- **`tmRenewalGracePeriod`** — Restoration requires the prescribed form and a surcharge on top of the normal renewal fee. After this window closes the mark is removed from the register and the original filing date is lost.
- **`ngoDarpanCsr1Requirement`** — Form CSR-1 has a dedicated, mandatory Darpan ID field — the form cannot be submitted without it where the NGO is registered on the Darpan portal.
- **`ngoDarpanVerificationTime`** — ⚠️ Sources disagree — some cite 7–15 working days instead of 15–30. Confirm the current figure against the live portal before publishing.
- **`trustGoverningLaw`** — Governs private trusts specifically. A PUBLIC charitable trust is not comprehensively covered by this Act — see trustDeedRegistrationRule below for how one is actually set up where no state Public Trusts Act applies.
- **`trustDeedRegistrationRule`** — Most Indian states — Tamil Nadu among them — have no dedicated Public Trusts Act currently in force, so in their absence a public charitable trust is created the same way: a registered trust deed under the central Registration Act, 1908, at the Sub-Registrar's office. ⚠️ See trust-society-section8.js's review notes — confirm the Tamil Nadu Public Trusts Act, 2020 has not since been notified into force before relying on this.
- **`trustMinTrustees`** — The Act itself does not fix a number for a private trust; two is the number practitioners and registering offices treat as the working minimum, and one of the two may also be the settlor.
- **`tnSocietiesAct`** — Repeals the central Societies Registration Act, 1860 as it applied to Tamil Nadu (Section 53). A Salem-based society registers, and is regulated, under this state Act — not the central 1860 Act most national guides describe by default.
- **`section8LicenceRoute`** — Operational filing mechanics rather than a Companies Act provision — confirm against the current MCA portal before publishing, since portal filing structure changes without statutory notice. INC-12 remains the correct form/route for an EXISTING company converting to Section 8 status, which is a different scenario from a fresh incorporation.
- **`section8DeclarationForms`** — Operational filing mechanics, not a Companies Act provision — re-verify against the live MCA portal before publishing, it is revised without notice.
- **`epfRegistrationThreshold`** — Every person on the payroll counts toward this number, regardless of what they earn — coverage of individual employees is a separate question, governed by the wage ceiling. An establishment already covered stays covered even if headcount later falls below 20.
- **`epfWageCeiling`** — In force since 01-09-2014. ⚠️ A proposal to raise this to ₹25,000 has been reported (August 2026) but was not notified as law as of this writing — confirm before publishing given how recently this has moved.
- **`epfContributionRate`** — Of the employer's 12%, 8.33% (subject to the wage ceiling) is diverted to the Employees' Pension Scheme and the remainder to the EPF account itself, plus a separate small EDLI contribution — confirm the current admin-charge and EDLI split before publishing a full breakdown.
- **`epfVoluntaryCoverage`** — Coverage taken up voluntarily becomes permanent and cannot be backdated — it runs from the date of the application, not from an earlier point the employer wishes it had started.
- **`epfNonRegistrationPenalty`** — Repeated or continuing default attracts a higher penalty of up to 3 years' imprisonment. This is on top of the unpaid contributions, interest and damages owed for the whole unregistered period.
- **`esiRegistrationThreshold`** — Reduced from the original 20-employee threshold; some states still apply 20 for specific classes of establishment. In Tamil Nadu this extends beyond factories to shops, hotels, restaurants and similar non-factory establishments.
- **`esiWageCeiling`** — In force since 01-01-2017, unchanged since.
- **`esiContributionRate`** — Unchanged since the 01-07-2019 revision.
- **`esiHalfYearlyReturnDue`** — Filed on top of, not instead of, the monthly contribution payment — a business current on every monthly payment can still be in default for not filing this return.
- **`esiNonRegistrationPenalty`** — Damages of up to 100% of the arrears may additionally be levied under Section 85B, on top of the contributions and interest owed for the unregistered period.
- **`shramSuvidhaCommonRegistration`** — Both departments recognise the same Labour Identification Number (LIN) for the establishment afterward.
- **`tnProfessionalTaxMechanism`** — ⚠️ The half-yearly slab amounts (income band → tax) are set separately by each municipal corporation and are NOT stated on the site — research returned materially different figures even for two sources describing the same Greater Chennai Corporation slabs, and one source states Salem's own slab table differs from Chennai's. Confirm Salem's current slab notification directly with Salem City Municipal Corporation before publishing any rupee figure.
- **`mgt7aApplicability`** — Applicable for FY 2020-21 onwards. MGT-7A does not need certification by a practising company secretary and can be filed on directors' Digital Signature Certificates alone.
- **`smallCompanyThreshold`** — Both conditions must be met. Excludes holding companies, subsidiary companies, Section 8 companies and any company governed by a special Act. Classification is checked every year against that year's figures, not fixed at incorporation.
- **`dir3KycDeadline`** — Applies to every director holding a DIN as at 31 March of that financial year.
- **`dir3KycLateFee`** — The DIN is marked "Deactivated due to non-filing of DIR-3 KYC" until the form is filed with this fee — a director cannot sign any MCA filing while deactivated.
- **`rbiCreditInformationCompanies`** — Licence status can change; re-verify against RBI's current list of licensed CICs before publishing.

### Repealed provisions cited on the site

These are **not** claims that the site asserts as current law. Each is quoted in
order to state that it **no longer applies**, because competitors still publish
them as live. The question here is the opposite one: confirm each is still
repealed.

| Key | Former value | What it was | Repealed by | Cited on | Still repealed? |
|---|---|---|---|---|---|
| `opcRepealedConversionThresholds` | ₹50 lakh paid-up capital and ₹2 crore turnover | FORMER mandatory OPC conversion thresholds — repealed | Rule 6, Companies (Incorporation) Rules 2014, omitted by the Second Amendment Rules 2021 with effect from 01-04-2021 | One Person Company | ☐ |

---

## 2. Operational commitments — for ThinkOrange, not the CA

These are **our own turnaround promises**, not statutory facts. No CA can verify
them; only the firm can decide what it can honour on a bad week. They are on
CONTENT-PLAN.md §1.1's unconfirmed list, so each currently renders as a neutral
phrase instead of a number. Fill in the ones you are willing to commit to, in
`src/content/turnaround.js`, and leave the rest.

| Key | What it is | Currently renders as | Your commitment |
|---|---|---|---|
| `enquiryResponseTime` | Our own response time to a new enquiry — homepage CTA band sub-line | _We respond fast_ (unconfirmed) | ____________ |
| `gstRegDocumentReview` | Our own document collection and review time, GST registration | _Confirm with us_ (unconfirmed) | ____________ |
| `gstRegFilingAfterDocs` | Our own filing time once documents are complete, GST registration | _Confirm with us_ (unconfirmed) | ____________ |
| `gstReturnReconciliation` | Our own GSTR-2B / books reconciliation turnaround, monthly return filing | _Confirm with us_ (unconfirmed) | ____________ |
| `gstReturnFilingCutoff` | Date each month by which we need your data to guarantee an on-time return | _Confirm with us_ (unconfirmed) | ____________ |
| `gstNoticeInitialReview` | Our own turnaround to assess a notice and advise on position | _Confirm with us_ (unconfirmed) | ____________ |
| `incorporationDocPrep` | Our own document preparation turnaround, entity incorporation | _Confirm with us_ (unconfirmed) | ____________ |
| `incorporationNameStage` | Our own turnaround to prepare and submit a name reservation | _Confirm with us_ (unconfirmed) | ____________ |
| `bookkeepingMonthlyClose` | Our own monthly books-close turnaround after receiving data | _Confirm with us_ (unconfirmed) | ____________ |
| `auditFieldworkDuration` | Our own typical fieldwork duration, internal or specialised audit | _Confirm with us_ (unconfirmed) | ____________ |
| `itcRefundPrep` | Our own turnaround to prepare and file a refund application once documents are complete | _Confirm with us_ (unconfirmed) | ____________ |
| `loanCmaPrep` | Our own turnaround to prepare CMA data and projections for a loan application | _Confirm with us_ (unconfirmed) | ____________ |
| `dscIssuanceTurnaround` | Our own DSC issuance turnaround once documents and video verification are complete | _Confirm with us_ (unconfirmed) | ____________ |
| `lutFilingPrep` | Our own turnaround to check eligibility and prepare an LUT filing once documents are complete | _Confirm with us_ (unconfirmed) | ____________ |
| `lutAnnualRenewalPrep` | Our own turnaround to prepare and refile a client's LUT ahead of each new financial year | _Confirm with us_ (unconfirmed) | ____________ |
| `iecDocPrepTurnaround` | Our own document preparation and application-filing turnaround, IEC registration | _Confirm with us_ (unconfirmed) | ____________ |
| `iecFilingTurnaround` | Our own filing turnaround once IEC documents are complete | _Confirm with us_ (unconfirmed) | ____________ |
| `iecAnnualUpdateService` | Our own turnaround to file a client's mandatory annual IEC update, once instructed | _Confirm with us_ (unconfirmed) | ____________ |
| `icegateDocPrepTurnaround` | Our own document preparation and role-registration filing turnaround, ICEGATE registration | _Confirm with us_ (unconfirmed) | ____________ |
| `icegateBankCoordinationTurnaround` | Our own turnaround to coordinate with a client's bank on the AD code letter | _Confirm with us_ (unconfirmed) | ____________ |
| `tmSearchAndPrepTurnaround` | Our own trademark search and application preparation turnaround | _Confirm with us_ (unconfirmed) | ____________ |
| `tmFilingTurnaround` | Our own filing turnaround once the mark and classes are confirmed | _Confirm with us_ (unconfirmed) | ____________ |
| `ngoDarpanDocPrepTurnaround` | Our own document preparation turnaround, NGO Darpan registration | _Confirm with us_ (unconfirmed) | ____________ |
| `ngoDarpanFilingTurnaround` | Our own portal-filing turnaround once NGO Darpan documents are complete | _Confirm with us_ (unconfirmed) | ____________ |
| `nonprofitStructureAdvice` | Our own turnaround to advise which of trust, society or Section 8 company fits, and confirm the choice | _Confirm with us_ (unconfirmed) | ____________ |
| `nonprofitDocPrep` | Our own turnaround to draft the trust deed, society memorandum & rules, or Section 8 MOA/AOA | _Confirm with us_ (unconfirmed) | ____________ |
| `nonprofitRegistrationFiling` | Our own turnaround to file the registration once drafting/documents are complete — trust deed, society application, or SPICe+ Section 8 filing | _Confirm with us_ (unconfirmed) | ____________ |
| `pfEsiApplicabilityCheck` | Our own turnaround to assess EPF/ESI applicability and confirm the liability date | _Confirm with us_ (unconfirmed) | ____________ |
| `pfEsiDocPrep` | Our own document collection and review turnaround, EPF/ESI registration | _Confirm with us_ (unconfirmed) | ____________ |
| `payrollSetupReview` | Our own turnaround to review employee master data and set up payroll before the first live run | _Confirm with us_ (unconfirmed) | ____________ |
| `payrollMonthlyCutoff` | Date each month by which we need payroll inputs to guarantee an on-time run | _Confirm with us_ (unconfirmed) | ____________ |
| `payrollProcessingTurnaround` | Our own turnaround to process payroll and file EPF/ESI/PT/TDS once monthly inputs are received | _Confirm with us_ (unconfirmed) | ____________ |
| `rocCalendarSetup` | Our own turnaround to build a company or LLP's annual ROC filing calendar | _Confirm with us_ (unconfirmed) | ____________ |
| `rocFilingPrep` | Our own turnaround to prepare ROC annual filings once financials and registers are ready | _Confirm with us_ (unconfirmed) | ____________ |
| `itrDocumentReview` | Our own document collection and review time, income tax return filing | _Confirm with us_ (unconfirmed) | ____________ |
| `itrFilingAfterDocs` | Our own filing time once documents and the computation are agreed, ITR filing | _Confirm with us_ (unconfirmed) | ____________ |
| `tdsMonthlyCutoff` | Date each month by which we need payment data to deposit TDS on time | _Confirm with us_ (unconfirmed) | ____________ |
| `tdsQuarterlyStatementPrep` | Our own preparation time for a quarterly TDS statement | _Confirm with us_ (unconfirmed) | ____________ |
| `taxPlanningReviewSession` | Our own turnaround for a tax planning review and written recommendation | _Confirm with us_ (unconfirmed) | ____________ |
| `itNoticeInitialReview` | Our own first-read turnaround on an income tax notice | _Confirm with us_ (unconfirmed) | ____________ |
| `personalFinanceReview` | Our own turnaround to review a client's income, obligations and credit report, personal finance service | _Confirm with us_ (unconfirmed) | ____________ |
| `personalFinanceDocPrep` | Our own turnaround to prepare personal loan/mortgage documentation once the financial review is complete | _Confirm with us_ (unconfirmed) | ____________ |

---

## 3. Per-page review

| Page | Statutory claims | FAQs | Document groups | Fees | ✓ |
|---|---|---|---|---|---|
| GST Registration | 14 | 8 | 5 | On request ✓ | ☐ |
| GST Return Filing | 12 | 8 | 3 | On request ✓ | ☐ |
| GST Notices & Litigation | 12 | 8 | 3 | On request ✓ | ☐ |
| Private Limited Company | 7 | 8 | 3 | On request ✓ | ☐ |
| LLP Registration | 5 | 7 | 3 | On request ✓ | ☐ |
| One Person Company | 7 | 7 | 3 | On request ✓ | ☐ |
| Partnership Firm | 1 | 7 | 3 | On request ✓ | ☐ |
| Proprietorship | 3 | 7 | 3 | On request ✓ | ☐ |
| Bookkeeping & Accounting | 1 | 6 | 2 | On request ✓ | ☐ |
| Internal Audit | 2 | 6 | 2 | On request ✓ | ☐ |
| Specialised Audit | 0 | 5 | 3 | On request ✓ | ☐ |
| GeM Registration | 2 | 6 | 2 | On request ✓ | ☐ |
| Tender Documentation Support | 1 | 5 | 2 | On request ✓ | ☐ |
| ITC Refunds | 5 | 6 | 3 | On request ✓ | ☐ |
| MSME / Udyam Registration | 6 | 6 | 1 | On request ✓ | ☐ |
| Startup India (DPIIT) | 3 | 6 | 1 | On request ✓ | ☐ |
| Business Loan & Financing | 2 | 6 | 3 | On request ✓ | ☐ |
| LUT & Export Refunds | 8 | 8 | 3 | On request ✓ | ☐ |
| Trust, Society & Section 8 | 12 | 8 | 3 | On request ✓ | ☐ |
| IEC Registration | 8 | 7 | 4 | On request ✓ | ☐ |
| ICEGATE Registration | 4 | 7 | 2 | On request ✓ | ☐ |
| Trademark Registration | 8 | 7 | 3 | On request ✓ | ☐ |
| NGO Darpan Registration | 4 | 7 | 4 | On request ✓ | ☐ |
| PF & ESI Registration | 14 | 7 | 2 | On request ✓ | ☐ |
| Payroll Processing & Returns | 5 | 6 | 2 | On request ✓ | ☐ |
| ROC & Annual Compliance | 11 | 7 | 2 | On request ✓ | ☐ |
| Personal Finance & Debt Management | 2 | 8 | 3 | On request ✓ | ☐ |
| ITR Filing | 21 | 8 | 4 | On request ✓ | ☐ |
| TDS Compliance | 15 | 8 | 4 | On request ✓ | ☐ |
| Tax Planning & Advisory | 13 | 8 | 3 | On request ✓ | ☐ |
| Notices & Assessments | 11 | 8 | 4 | On request ✓ | ☐ |

### Page-specific notes

- **GST Registration** — Document lists per entity type also need CA confirmation — they are practice-based rather than a single statutory list, and the GST portal's requirements shift without notification.
- **GST Return Filing** — TWO ITEMS NEED SETTLING BEFORE PUBLICATION. (1) Whether Tamil Nadu is a QRMP Category X (22nd) or Category Y (24th) state — research did not settle it and the page currently states both. (2) The current cap on the GSTR-3B late fee, which has been revised by notification more than once. Also confirm the IMS description matches current portal behaviour.
- **GST Notices & Litigation** — HIGHEST-RISK PAGE ON THE SITE — a visitor may act on this while a reply window is running. Confirm specifically: (1) that Section 74A applies from FY 2024-25 and 73/74 still govern up to FY 2023-24, as stated; (2) the condonation position on the 3-month appeal window; (3) whether the GST Appellate Tribunal route should be described, which the page currently omits; (4) that nothing here reads as a guarantee of outcome. Also confirm this page complies with the advertising restrictions on your registrations, since litigation support is the most sensitive service to advertise.
- **Private Limited Company** — Deliberately omitted pending confirmation: (1) AOC-4 and MGT-7 late-filing penalty amounts — research returned conflicting figures (₹100/day vs ₹1,000/day, probably additional fee vs penalty); (2) AGM timing rules, including the first-AGM window; (3) the auditor appointment deadline; (4) DIR-3 KYC date; (5) MCA government fees, which vary with authorised capital. Confirm the two-month recency rule for director address proof, which is practice rather than a stated rule.
- **LLP Registration** — Deliberately omitted pending confirmation: the LLP audit turnover and contribution thresholds — the FAQ acknowledges the limits exist without stating figures, which is honest but should be completed once confirmed. Also confirm that Form 8 and Form 11 due dates are fixed calendar dates rather than derived from the financial year end, and confirm the uncapped nature of the ₹100/day fee, which is the strongest claim on the page.
- **One Person Company** — HIGH VALUE IF CORRECT, EMBARRASSING IF NOT — this page's main selling point is that competitors publish the superseded ₹50 lakh/₹2 crore conversion thresholds. Confirm specifically: (1) that mandatory conversion thresholds remain removed; (2) the 120-day residency test and NRI eligibility; (3) that OPCs are exempt from holding an AGM, as the compliance FAQ states; (4) the one-OPC-per-person restriction. If any of these have moved back, the page's angle collapses.
- **Partnership Firm** — Deliberately omitted pending confirmation: (1) the maximum number of partners, which the FAQ acknowledges without stating; (2) Tamil Nadu stamp duty rates for a partnership deed; (3) the income tax audit threshold for firms, which the FAQ explicitly defers because it depends on the new Income Tax Act 2025 — see BLOCKERS.md §1. Confirm the enforceability consequences of non-registration are stated accurately, as that is the page's central claim.
- **Proprietorship** — Lowest statutory density of the batch — deliberately, since most of the page is structural explanation rather than statutory claims. Confirm: (1) that Shop and Establishment registration is described correctly for Tamil Nadu; (2) the MSMED Act delayed-payment protection claim; (3) the taxation FAQ defers presumptive-scheme detail to the new Income Tax Act 2025, which is correct given BLOCKERS.md §1 but should be completed once unblocked.
- **Bookkeeping & Accounting** — Deliberately does not state an income-tax books-retention period — see BLOCKERS.md §1. The FAQ on payroll deliberately avoids specifics until the service scope is confirmed. Low statutory density is intentional; confirm nothing here implies a filing deadline that belongs on the GST or ITR pages instead.
- **Internal Audit** — Confirm the periodicity and qualification requirements stated in the FAQ against the current Companies (Accounts) Rules, and confirm whether any recent amendment has changed the ₹200 crore / ₹100 crore thresholds.
- **Specialised Audit** — No statutory citations by design — these are lender-defined and RBI-guidance-driven engagement types, not a single Act provision. Confirm the empanelment claim is accurate before publishing, and confirm the description of concurrent audit scope against current RBI guidance for banks, which is outside this firm's usual GST/company-law domain.
- **GeM Registration** — Confirm current GeM vendor assessment category list, which changes periodically and was not verifiable to a primary source in this research pass. Confirm the startup-specific tender provisions claim against current GeM policy before publishing, as this area has seen frequent portal-level changes.
- **Tender Documentation Support** — Confirm the EMD exemption applies uniformly across state and central e-tendering portals, not only GeM — this page generalises the GeM-sourced fact to government procurement more broadly, which should be checked against the specific portals ThinkOrange actually supports.
- **ITC Refunds** — HIGH STATUTORY DENSITY — confirm specifically: (1) the exact Rule 89(5) formula wording, which research returned with some inconsistency against Rule 89(4); (2) whether the 90% provisional sanction turnaround is 7 or 15 days, which sources stated differently; (3) that the October 2025 extension of provisional sanction to inverted duty claims is still in force. This page and gst-notices-litigation.js are the two most statutorily exposed pages on the site.
- **MSME / Udyam Registration** — The revised 01-04-2025 classification limits are the page's central claim — confirm these precisely, as they are recent enough that secondary sources may not all have updated. The 45-day/interest claim is the strongest selling point on the page; confirm the 'non-deductible for the buyer' detail specifically, as it was sourced from a single article.
- **Startup India (DPIIT)** — DELIBERATELY INCOMPLETE ON INCOME TAX — do not add 80-IAC or any specific exemption section/percentage until BLOCKERS.md §1 (Income Tax Act 2025 transition) is resolved. The eligibility criteria cited here are dated 04-02-2026 (G.S.R. 108(E)) and are recent enough to double-check against the live notification before publishing, since a page built around 'the criteria just changed' looks bad if it then states superseded figures itself.
- **Business Loan & Financing** — This page describes ThinkOrange's role as facilitation, not lending — confirm this framing is legally accurate and does not inadvertently suggest ThinkOrange acts as a loan agent requiring separate regulatory registration. Confirm the CGTMSE annual guarantee fee is not stated anywhere as a client-facing cost, since it is charged to the lender, not the borrower directly, and stating it without that context would mislead.
- **LUT & Export Refunds** — CONFIRM SPECIFICALLY: (1) whether Rule 96A(1)(b)'s services realisation window is still a flat 1 year, or has been amended to track RBI/FEMA's late-2025 extension of the general export-realisation period from 9 to 15 months — the two are legally distinct (CGST Rules vs FEMA regulations) and research found no direct evidence Rule 96A itself was amended, but this needs a current-text check, not an inference; (2) the ₹2.5 crore LUT-ineligibility threshold and the 15% bank-guarantee cap are both sourced to Notification 37/2017-Central Tax and Circular 8/8/2017-GST respectively — confirm neither has been superseded; (3) the 3-working-day deemed-approval window (Circular 40/14/2018-GST) is still current practice on the portal.
- **Trust, Society & Section 8** — HIGH-RISK ITEM FOR CA/CS SIGN-OFF, specifically: whether the Tamil Nadu Public Trusts Act, 2020 has actually been notified/brought into force — this page assumes it has NOT, and describes trust registration via a deed under the Registration Act 1908 accordingly. If it has since come into force, the trust half of this page needs rewriting around the state Act instead (registration authority, disqualification rules, and any Charity-Commissioner-equivalent role it creates). Also confirm: (1) whether INC-20A applies to a specific Section 8 company — it depends on whether that company has share capital, which varies, so this page deliberately does not assert an INC-20A window for Section 8 companies; (2) that INC-14/INC-15 declarations are genuinely folded into INC-9 on the current MCA portal, since portal mechanics change without notice; (3) the practical minimum-trustee figure for a trust, which is practice rather than a stated statutory number. Deliberately deferred, per BLOCKERS.md §1: any income-tax exemption/donor-benefit registration detail — no section number or form code appears anywhere on this page.
- **IEC Registration** — Document list for companies/LLPs (DSC vs Aadhaar signing) is practice-based and should be checked against the current DGFT portal flow, which has changed its signing options more than once. The IEC exemption list (Para 2.07, Handbook of Procedures) should be checked against the current HBP edition before publishing.
- **ICEGATE Registration** — The pan-India AD code registration rule (one registration valid at every port under the same IEC) reflects a recent ICEGATE 2.0 procedural change — confirm it is still current, and confirm the port-wise IFSC registration requirement for duty refunds against the live portal before publishing, since customs procedural circulars change without much notice.
- **Trademark Registration** — A registered trademark agent or IP attorney should confirm the current examination-to-publication timeline before it's quoted in any form on the site — sources disagree widely (a few months to well over a year), which is why this page deliberately avoids stating a specific figure for that stage. The counter-statement window and opposition evidence stages were researched but deliberately kept out of this leaf's own timeline table, since they only apply once a mark is actually opposed.
- **NGO Darpan Registration** — Sources disagree on the exact verification turnaround (some cite 7–15 working days, others 15–30) — confirm the current figure against the live NGO Darpan portal before publishing. The income-tax exemption / donor tax-benefit paragraph is deliberately generic with no section number or form code, pending BLOCKERS.md §1 (Income Tax Act 2025 recodification) — do not add a specific citation there until that blocker clears.
- **PF & ESI Registration** — Confirm the Tamil Nadu-specific ESI threshold (10 employees) against the current state notification, which can differ by class of establishment. Confirm the EPF wage ceiling figure given the reported proposal to raise it to ₹25,000 — not yet notified as of this writing, but worth re-checking close to publication. Confirm the exact EPF employer-contribution split (EPS/EDLI/admin charge) before quoting a full breakdown anywhere more detailed than the headline 12%.
- **Payroll Processing & Returns** — Deliberately states no Income Tax Act section number or TDS form name anywhere — see BLOCKERS.md §1. The Tamil Nadu Professional Tax slab table is deliberately NOT stated: research found materially different half-yearly slab figures even for the same Chennai corporation across two sources, and one source explicitly confirms Salem's own slab notification differs from Chennai's. Confirm Salem City Municipal Corporation's current slab table directly before publishing any rupee figure for Professional Tax.
- **ROC & Annual Compliance** — Deliberately does not state the AOC-4/MGT-7 late-filing penalty amount — private-limited-company.js already flags this as unconfirmed (conflicting ₹100/day vs ₹1,000/day figures found in research) and this leaf follows the same discipline rather than resolving it independently. Confirm the current small-company thresholds (₹4 crore / ₹40 crore, effective 15-09-2022) are still current, and confirm DIR-3 KYC's due date and fee against the current MCA rules before publishing.
- **Personal Finance & Debt Management** — This page is deliberately light on statutory citation — there is no single Personal Finance Act to cite against, so most of the page describes the service (what's included, how the process works) rather than the law. The two cited facts (four RBI-licensed credit bureaus, 300–900 score scale) should be re-verified against RBI's current CIC list, since a bureau's licence status can change. Confirm the framing throughout reads as documentation/structuring facilitation, not investment advice or debt settlement/negotiation — the FAQ on negotiating with creditors is written to draw that line explicitly and should get a compliance read given SEBI investment-adviser and debt-settlement-adjacent regulatory sensitivities.
- **ITR Filing** — FIRST PAGE WRITTEN AFTER THE INCOME TAX ACT 2025 TRANSITION — confirm before publishing: (1) the three-tier due date structure, and specifically that the 31 August tier for non-audit business cases is in force for the current tax year; (2) that the loss carry-forward consequence of late filing survives the re-codification as stated; (3) the exact slab structure of the additional tax on an updated return; (4) that this page's regime-comparison language cannot be read as a promise of a particular tax outcome. The page deliberately states no basic exemption amount, no presumptive turnover ceiling and no e-verification window — add them to statutory.js first if the CA wants them stated.
- **TDS Compliance** — Confirm before publishing: (1) every renumbered form (138 / 140 / 144 / 143 and certificates 130 / 131) against the Income-tax Rules 2026 as notified, not against a secondary summary; (2) that the deposit date and quarterly statement dates genuinely carried over unchanged; (3) the certificate issue window of 15 days from the statement due date; (4) the interest rate for late DEDUCTION, which this page deliberately does not state — only late deposit is stated. No rate table and no threshold amounts appear anywhere on this page by design; if the CA wants them, they go into statutory.js first, per payment code.
- **Tax Planning & Advisory** — Confirm before publishing: (1) the slab tables for BOTH regimes against the Finance Act in force for the current tax year — these change more often than anything else on the site; (2) both standard deduction figures; (3) the rebate amount and, critically, that this page's two caveats on it are correctly stated; (4) the advance tax instalment schedule, which carries a CONFIRM note in statutory.js from an earlier phase and has not been re-verified against the 2025 Act's own numbering. Also confirm the page reads as comparison rather than personalised financial advice — it deliberately names no investment product, gives no worked example and quantifies no saving, and that restraint should survive review. The regime-switching FAQ deliberately does not state the rule; if the CA wants it stated, it needs a statutory key.
- **Notices & Assessments** — SECOND-HIGHEST-RISK PAGE ON THE SITE — a visitor may act on it while a response window is running. Confirm specifically: (1) every renumbered section against the Act as passed, not a secondary summary; (2) the reassessment limitation periods, which this page deliberately does NOT state — it says only that they are longer and depend on the information relied on; (3) whether the first appeal lies to the Joint Commissioner (Appeals) under Section 356 or to the Commissioner (Appeals) in the cases this page's readers will typically face, since the page avoids naming the authority for that reason; (4) the pre-deposit position on a first appeal, stated here only as tax on the returned income; (5) that nothing here reads as a guarantee of outcome. The appeal FORM number is deliberately omitted — one secondary source reports Form 99 replacing Form 35 from April 2026 and that was not corroborated.

---

## 4. Beyond the numbers

These are not mechanically checkable and need a professional eye:

- **Document lists per entity type.** Practice-based rather than a single
  statutory list, and the GST portal's requirements change without
  notification. Confirm each grouping.
- **Procedural descriptions.** The order of steps, what triggers a query
  notice, and what happens on rejection.
- **Anything implying a guarantee.** Timelines are published as indicative.
  Confirm none of the wording reads as a commitment you cannot honour.
- **Advertising norms.** Confirm the whole site complies with the advertising
  restrictions applicable to your professional registrations.

---

## 5. Sources used

Where each value was researched from. Secondary sources — confirm against the
bare Act and Rules, not these.

- `gstThresholdGoods` — https://cleartax.in/s/gst-registration-limits-increased
- `gstThresholdServices` — https://cleartax.in/s/gst-registration-limits-increased
- `gstRegApplyWindow` — https://cleartax.in/s/cgst-rules-chapter-3-registration
- `gstRegStandardDays` — https://www.indiafilings.com/gst/gst-registration-approval-in-india-how-many-days
- `gstRegNoAadhaarDays` — https://www.indiafilings.com/gst/gst-registration-approval-in-india-how-many-days
- `gstBiometricWindow` — https://tax2win.in/guide/aadhaar-authentication-biometric-verification-gst-registration
- `gstRule14ADays` — https://www.taxmann.com/post/blog/gstn-introduces-simplified-gst-registration-scheme-under-rule-14a
- `gstNonRegistrationPenalty` — https://www.mastersindia.co/blog/penalty-for-not-registering-or-late-registering-under-gst/
- `gstFormApplication` — https://cleartax.in/s/cgst-rules-chapter-3-registration
- `gstFormQuery` — https://cleartax.in/s/cgst-rules-chapter-3-registration
- `gstFormQueryReply` — https://cleartax.in/s/cgst-rules-chapter-3-registration
- `gstFormCertificate` — https://cleartax.in/s/cgst-rules-chapter-3-registration
- `gstr1DueMonthly` — https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/
- `gstr3bDueMonthly` — https://cleartax.in/s/gstr-3b
- `gstr1DueQuarterly` — https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/
- `gstr3bDueQuarterly` — https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/
- `qrmpThreshold` — https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/
- `pmt06Due` — https://www.taxaj.com/learn/gst-return-filing-due-dates-2026/
- `gstr9Threshold` — https://www.registerkaro.in/post/gst-compliance-calendar-due-dates
- `gstr9cThreshold` — https://www.registerkaro.in/post/gst-compliance-calendar-due-dates
- `gstr9Due` — https://www.registerkaro.in/post/gst-compliance-calendar-due-dates
- `gstLateFee` — https://cleartax.in/s/gstr-3b
- `gstInterest` — https://thegstcalculator.in/tools/gst-interest-calculator
- `gstReturnTimeBar` — https://calcguru.in/gst-late-fee-interest-calculator/
- `gstDemandUnifiedLimitation` — https://cleartax.in/s/section-74a-of-cgst-act
- `gstDemandLegacyNonFraud` — https://taxguru.in/goods-and-service-tax/section-73-74-74a-new-unified-gst-demand-regime-fy-2024-25.html
- `gstDemandLegacyFraud` — https://taxguru.in/goods-and-service-tax/section-73-74-74a-new-unified-gst-demand-regime-fy-2024-25.html
- `gstFormScrutiny` — https://caalokkumar.com/gst-notice-demand-defence.html
- `gstFormScrutinyReply` — https://caalokkumar.com/gst-notice-demand-defence.html
- `gstFormPreNotice` — https://caalokkumar.com/gst-notice-demand-defence.html
- `gstFormShowCause` — https://caalokkumar.com/gst-notice-demand-defence.html
- `gstFormVoluntaryPayment` — https://caalokkumar.com/gst-notice-demand-defence.html
- `gstFormDemandOrder` — https://www.patronaccounting.com/blog/gst-demand-order-appeal-process
- `gstFormAppeal` — https://vakilsearch.com/article/gst-appeal-procedure-apl-01/
- `gstAppealWindow` — https://vakilsearch.com/article/gst-appeal-procedure-apl-01/
- `gstAppealPreDeposit` — https://unnathipartners.com/gst-apl-01-pre-deposit-filing-guide-2025/
- `pvtLtdMinMembers` — https://cleartax.in/s/characteristics-private-limited-company
- `pvtLtdMaxShareholders` — https://cleartax.in/s/characteristics-private-limited-company
- `companyMinCapital` — https://cleartax.in/s/characteristics-private-limited-company
- `spicePlusScope` — https://taxguru.in/company-law/private-limited-company-incorporation-process-via-spice-plus-faqs.html
- `inc20aWindow` — https://www.vjmglobal.com/feeds/blog/company-incorporation-checklist
- `aoc4Window` — https://datatracks.com/in/blog/understanding-aoc-4-and-mgt-7-filings/
- `mgt7Window` — https://datatracks.com/in/blog/understanding-aoc-4-and-mgt-7-filings/
- `opcMandatoryConversion` — https://restthecase.com/knowledge-bank/business-and-compliance/turnover-limit-for-one-person-company-in-india
- `opcResidency` — https://www.onlinelegalindia.com/blogs/amendments-to-one-person-company-compliance/
- `opcStructure` — https://www.patronaccounting.com/one-person-company-registration
- `llpMinPartners` — https://cleartax.in/s/llp-annual-filings
- `llpForm11Due` — https://cleartax.in/s/llp-annual-filings
- `llpForm8Due` — https://cleartax.in/s/llp-annual-filings
- `llpLateFee` — https://cleartax.in/s/llp-annual-filings
- `llpAgreementWindow` — https://taxguru.in/corporate-law/annual-filing-llp-form-8-form-11.html
- `partnershipStatute` — https://www.indiafilings.com/learn/documents-required-for-gst-registration
- `internalAuditTurnoverThreshold` — https://taxguru.in/company-law/internal-audit-companies-act-2013-thresholds-appointment-reporting-obligations.html
- `internalAuditBorrowingThreshold` — https://taxguru.in/company-law/internal-audit-companies-act-2013-thresholds-appointment-reporting-obligations.html
- `booksRetentionCompanies` — https://www.registerkaro.in/post/sec-128-of-companies-act-2013
- `gemEmdExemption` — https://www.tenderbook.in/blogs/gem-benefits-for-msmes-emd-exemptions-preferences-and-more
- `gemMsePriceMatching` — https://www.incorpx.io/blog/msme-benefits-government-tenders-procurement
- `itcRefundTimeLimit` — https://www.sansalegal.com/post/how-to-claim-a-gst-refund-in-india-eligibility-section-54-process-rfd-01-and-timelines
- `itcRefundFormApplication` — https://www.mastersindia.co/blog/section-54-gst-refund-process/
- `itcRefundAcknowledgement` — https://www.mastersindia.co/blog/section-54-gst-refund-process/
- `itcRefundProvisional` — https://www.mygstrefund.com/blog/90-percent-provisional-gst-refund-exporters-2025
- `itcInvertedDutyRestriction` — https://kmgcollp.com/inverted-duty-structure-under-gst/
- `udyamMicroLimit` — https://www.iifl.com/blogs/business-loan/msme-classification-2026-micro-small-medium-enterprise-criteria
- `udyamSmallLimit` — https://www.iifl.com/blogs/business-loan/msme-classification-2026-micro-small-medium-enterprise-criteria
- `udyamMediumLimit` — https://www.iifl.com/blogs/business-loan/msme-classification-2026-micro-small-medium-enterprise-criteria
- `udyamReclassification` — https://www.udyam.ltd/blog/msme-turnover-limit-2026
- `msmedPaymentWindow` — https://www.scconline.com/blog/post/2022/12/14/when-is-the-interest-rate-payable-under-section-16-of-the-msmed-act-2006-applicable/
- `msmedDelayedInterest` — https://nbassociates.net/section-16-of-msme-act/
- `dpiitAgeLimit` — https://www.registerkaro.in/post/startup-india-registration-eligibility
- `dpiitTurnoverCap` — https://www.registerkaro.in/post/startup-india-registration-eligibility
- `dpiitEligibleEntities` — https://www.registerkaro.in/post/startup-india-registration-eligibility
- `cgtmseLimit` — https://www.setubridgesolutions.co.in/blogs/cgtmse-10-crore-coverage-doubled-2026-msme-loans-update
- `cgtmseCoverage` — https://www.iifl.com/blogs/business-loan/collateral-free-msme-loan
- `tdsPaymentDue` — https://www.aiaccountant.com/blog/tds-filing-due-date
- `advanceTaxInstalments` — https://www.incometaxindia.gov.in/
- `incomeTaxAct2025Commencement` — https://www.caclubindia.com/articles/income-tax-act-2025-vs-1961-what-actually-changed-for-salaried-professionals-55022.asp
- `itrReturnSection` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrDueDateIndividuals` — https://tax2win.in/guide/section-263-income-tax-act-2025
- `itrDueDateNonAuditBusiness` — https://tax2win.in/guide/section-263-income-tax-act-2025
- `itrDueDateAudit` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrDueDateTransferPricing` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrBelatedWindow` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrRevisedWindow` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrUpdatedReturnWindow` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrUpdatedReturnAdditionalTax` — https://cleartax.in/s/section-263-income-tax-act-2025
- `itrDefectiveReturnProvision` — https://taxgarden.in/blog/income-tax-notices-types-reasons-how-to-respond-india
- `itrLateFee` — https://cleartax.in/s/section-428-income-tax-act-2025
- `itrLateFilingInterest` — https://bigyanmishra.com/interest-for-late-filing-of-income-tax-return/
- `advanceTaxShortfallInterest` — https://www.axismaxlife.com/blog/tax-savings/section-424
- `taxYearConcept` — https://www.caclubindia.com/articles/income-tax-act-2025-vs-1961-what-actually-changed-for-salaried-professionals-55022.asp
- `taxAuditSection` — https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html
- `taxAuditTurnoverThreshold` — https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html
- `taxAuditProfessionThreshold` — https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html
- `taxAuditReportDue` — https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html
- `presumptiveTaxationSection` — https://taxguru.in/income-tax/provisions-related-tax-audit-income-tax-act-2025-faqs.html
- `tdsSalarySection` — https://www.caclubindia.com/articles/old-vs-new-tds-sections-mapping-under-income-tax-act-2025-complete-guide-for-fy-202627-55160.asp
- `tdsNonSalarySection` — https://www.caclubindia.com/articles/old-vs-new-tds-sections-mapping-under-income-tax-act-2025-complete-guide-for-fy-202627-55160.asp
- `tdsComplianceSection` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `tdsFormSalaryStatement` — https://blog.saginfotech.com/tds-returns-forms-138-140-144-143
- `tdsFormNonSalaryStatement` — https://blog.saginfotech.com/tds-returns-forms-138-140-144-143
- `tdsFormNonResidentStatement` — https://blog.saginfotech.com/tds-returns-forms-138-140-144-143
- `tcsFormStatement` — https://blog.saginfotech.com/tds-returns-forms-138-140-144-143
- `tdsCertificateSalary` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `tdsCertificateNonSalary` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `tdsQuarterlyStatementDues` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `tdsCertificateIssueWindow` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `tdsLateStatementFee` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `tdsLateDepositInterest` — https://www.caclubindia.com/articles/tds-returns-under-the-income-tax-act-2025-forms-due-dates-and-filing-procedure-55948.asp
- `assessmentSection` — https://eztax.in/income-tax-act-2025/section-270
- `intimationOuterLimit` — https://eztax.in/income-tax-act-2025/section-270
- `scrutinyNoticeWindow` — https://eztax.in/income-tax-act-2025/section-270
- `inquiryBeforeAssessmentSection` — https://www.caclubindia.com/news/rectification-assessment-and-appeals-under-income-tax-act-2025-26723.asp
- `bestJudgmentAssessmentSection` — https://www.taxtmi.com/tmi_notes?id=2220
- `facelessAssessmentSection` — https://ai.jamku.app/incometax2025/act/273.html
- `reassessmentNoticeSection` — https://www.taxheal.com/types-of-assessment-in-income-tax-act-2025.html
- `appealFirstLevelWindow` — https://eztax.in/income-tax-act-2025/section-356
- `appealDisposalTimeline` — https://www.patronaccounting.com/blog/appeal-cit-a-itat-rules-2026
- `newRegimeSlabs` — https://cleartax.in/c/income-tax-slab-rates
- `oldRegimeSlabs` — https://cleartax.in/c/income-tax-slab-rates
- `standardDeductionNewRegime` — https://cleartax.in/c/income-tax-slab-rates
- `standardDeductionOldRegime` — https://cleartax.in/c/income-tax-slab-rates
- `rebateSection` — https://cleartax.in/s/income-tax-rebate-us-87a
- `rebateNewRegime` — https://cleartax.in/s/income-tax-rebate-us-87a
- `gstinLength` — https://cleartax.in/s/gst-registration-documents-checklist
- `gstDocUploadLimit` — https://cleartax.in/s/gst-registration-documents-checklist
- `lutFormNumber` — https://irisgst.com/form-rfd-11-used-for-furnishing-letter-of-undertaking-lut/
- `lutValidityPeriod` — https://www.indiafilings.com/learn/how-to-file-and-renew-your-lut
- `lutEligibilityThreshold` — https://www.lexology.com/library/detail.aspx?g=1e166b98-a660-4d4a-9631-927073b51ebf
- `lutBankGuaranteeCap` — https://cbic-gst.gov.in/pdf/Final_Master_circular_LUT_Bond_04102017.pdf
- `lutGoodsExportWindow` — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter10/rule96a_v1.00.html
- `lutServicesRealisationWindow` — https://www.caclubindia.com/articles/export-of-services-and-receipt-of-consideration-under-gst-50977.asp
- `lutPaymentWindow` — https://fintaxblog.com/rule-96a-of-cgst-rules-2017-refund-of-integrated-tax-paid-on-export-of-goods-or-services-under-bond-or-letter-of-undertaking/
- `lutOfficerResponseWindow` — https://cbic-gst.gov.in/pdf/circularno-40-cgst.pdf
- `iecFormApplication` — https://content.dgft.gov.in/Website/ANF-2A_0.pdf
- `iecGovtFee` — https://www.indiafilings.com/learn/revised-application-fee-for-iec-and-various-dgft-services
- `iecOnePerPan` — https://www.jparks.co/iec/are-iec-and-pan-number-the-same/
- `iecValidity` — https://ofinlegal.com/iec-renewal/
- `iecAnnualUpdateWindow` — https://www.jparks.co/iec/how-to-check-iec-renewal-status/
- `iecDeactivationConsequence` — https://www.jparks.co/iec/how-to-check-iec-renewal-status/
- `iecExemptCategories` — https://content.dgft.gov.in/Website/dgftprod/6978673f-9c59-4aac-a612-084df7b47e39/HBP2023_Chapter02.pdf
- `iecProcessingTime` — https://www.skydo.com/blog/iec-code-apply-online
- `icegateAdCodeLength` — https://www.skydo.com/blog/ad-code-registration
- `icegateAdCodeScope` — https://onpattison.com/news/2026/jan/26/iec-and-ad-code-registration-complete-guide-for-exporters-in-india/
- `icegateGovtFee` — https://www.skydo.com/blog/ad-code-registration
- `icegateProcessingTime` — https://cleartax.in/s/icegate-registration
- `tmFormApplication` — https://ipindia.gov.in/tm-rules-2017
- `tmClassesTotal` — https://www.intepat.com/blog/trademark-registration-fees-india
- `tmFeeStandardApplicant` — https://www.intepat.com/blog/trademark-registration-fees-india
- `tmFeeOtherApplicant` — https://www.intepat.com/blog/trademark-registration-fees-india
- `tmFormPowerOfAttorney` — https://www.mondaq.com/india/trademark/1612072/documents-required-for-trademark-registration
- `tmOppositionWindow` — https://www.legalserviceindia.com/legal/article-248-trademark-opposition-under-new-trademark-rule-2017.html
- `tmValidityPeriod` — https://ssrana.in/ip-laws/trademarks-in-india/trademark-renewal-in-india/
- `tmRenewalGracePeriod` — https://thelegalschool.in/blog/section-25-of-trademark-act
- `ngoDarpanCsr1Requirement` — https://www.india-briefing.com/news/navigate-indias-new-csr-1-requirements-essential-guide-for-businesses-38648.html/
- `ngoDarpanFcraRequirement` — https://fcraonline.nic.in/home/PDF_Doc/fc_notice_06102017.pdf
- `ngoDarpanFee` — https://www.registerkaro.in/post/ngo-darpan-registration
- `ngoDarpanVerificationTime` — https://www.incorpx.io/guide/how-to-apply-for-darpan-registration-certificate-2026-step-by-step-guide-for-ngos
- `trustGoverningLaw` — https://cleartax.in/s/indian-trusts-act
- `trustDeedRegistrationRule` — https://www.willjini.com/blog/indian-trusts-act-1882-registration-taxation/
- `trustMinTrustees` — https://enterslice.com/learning/trust-registration-indian-trust-act-1882/
- `tnSocietiesAct` — https://upload.indiacode.nic.in/showfile?actid=AC_TN_85_691_00002_00002_1549874708133&type=actfile&filename=tn_societies-registration-act-1975.pdf
- `societyMinMembersTN` — https://www.indiafilings.com/learn/society-registration-in-tamil-nadu
- `section8LicenceRoute` — https://vakilsearch.com/article/procedure-for-incorporation-of-a-section-8-company/
- `section8ProfitApplicationClause` — https://www.icsi.edu/Webmodules/Publications/FAQs_on_Section_8_Companies.pdf
- `section8DeclarationForms` — https://vakilsearch.com/article/procedure-for-incorporation-of-a-section-8-company/
- `epfRegistrationThreshold` — https://vakilsearch.com/article/epf-employer-registration-india-2026/
- `epfWageCeiling` — https://www.businesstoday.in/personal-finance/tax/story/epf-wage-ceiling-hike-to-rs25000-set-to-bring-millions-under-pension-net-what-it-means-546947-2026-08-03
- `epfRegistrationWindow` — https://vakilsearch.com/article/epf-employer-registration-india-2026/
- `epfContributionRate` — https://hrforest.in/epf-contribution/
- `epfEcrDue` — https://www.catrak.in/deadlines/pf-ecr
- `epfVoluntaryCoverage` — https://www.taxtmi.com/tmi_blog_details?id=302255
- `epfNonRegistrationPenalty` — https://www.aaptaxlaw.com/epf-act-1952/section-14-epf-act-1952-penalties-section-14-employees-provident-funds-miscellaneous-provisions-act-1952.html
- `esiRegistrationThreshold` — https://www.citehr.com/showthread.php?t=450399
- `esiWageCeiling` — https://salarybox.in/esi-applicability-2026-which-companies-must-register-under-esic-complete-guide-for-employers/
- `esiRegistrationWindow` — https://www.keka.com/compliance/forms/esi-registration
- `esiContributionRate` — https://tallysolutions.com/business-guides/esi-contribution-rate-2026-current-percentage-for-employer-employee/
- `esiMonthlyContributionDue` — https://www.indianhrm.com/guides/esi-payment-due-date
- `esiHalfYearlyReturnDue` — https://ezhrm.in/esi-return-filing-2026-hr-guide/
- `esiNonRegistrationPenalty` — https://www.patronaccounting.com/blog/esi-registration-compliance-rates-deadlines
- `shramSuvidhaCommonRegistration` — https://www.msmekipathshala.com/webkype/assets/pdf/Common%20Registration%20for%20EPFO%20&ESIC.pdf
- `tnProfessionalTaxMechanism` — https://www.greythr.com/wiki/acts/professional-tax-tamil-nadu/
- `mgt7aApplicability` — https://taxguru.in/company-law/form-mgt-7a-abridged-annual-return-small-company-opc.html
- `smallCompanyThreshold` — https://taxguru.in/company-law/definition-small-company-w-e-f-15th-september-2022.html
- `dir3KycDeadline` — https://www.patronaccounting.com/blog/dir-3-kyc-annual-filing-process-deadline-penalty-guide
- `dir3KycLateFee` — https://www.incorpx.io/blog/dir-3-kyc-penalty-din-deactivation
- `rbiCreditInformationCompanies` — https://www.paisabazaar.com/credit-score/credit-information-companies-india/
- `creditScoreRange` — https://www.paisabazaar.com/credit-score/credit-information-companies-india/

---

## 6. Defined but not yet used

In `statutory.js` but not referenced by any written page yet. Will come into use as the remaining leaves are written.

- `gstThresholdGoodsSpecial` — ₹20 lakh (GST registration threshold — goods, special category states)
- `gstThresholdServicesSpecial` — ₹10 lakh (GST registration threshold — services, special category states)
- `gstRule14AMonthlyCap` — ₹2.5 lakh (Rule 14A eligibility cap — monthly output tax liability on supplies to registered persons)

---

## Sign-off

| | Name | Date | Signature |
|---|---|---|---|
| Reviewed by (CA) | | | |
| Approved for publication | | | |

**Until this is signed, the site must not go live.** Unreviewed statutory
content on a compliance firm's own website is the single highest-consequence
risk in this build — see BUILD-PLAN.md §6.
