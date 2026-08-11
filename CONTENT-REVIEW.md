# Content Review Checklist — statutory claims

**Generated** by `npm run content:review` · **do not edit by hand**, edits are overwritten.
**Statutory values last researched** 10-08-2026
**Coverage** 17 of 21 service leaves written

---

## Why you are being asked to review this

Every factual claim this website makes about Indian tax law is listed below,
with its legal basis and the pages it appears on. The values were researched
from public sources on 10-08-2026 — **not** recalled from an AI model's training
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
| `pvtLtdMinMembers` | 2 directors and 2 shareholders | Minimum for a Private Limited Company | Section 149 and Section 3, Companies Act 2013 | Private Limited Company | ☐ |
| `pvtLtdMaxShareholders` | 200 | Maximum shareholders in a Private Limited Company | Section 2(68), Companies Act 2013 | Private Limited Company | ☐ |
| `companyMinCapital` | None — there is no minimum paid-up capital | Minimum paid-up capital for a company | Companies (Amendment) Act 2015, which removed the earlier requirement | Private Limited Company | ☐ |
| `spicePlusScope` | name reservation, DIN, incorporation, PAN and TAN in one application | What the SPICe+ form covers | Companies (Incorporation) Rules 2014, as amended | Private Limited Company, One Person Company | ☐ |
| `inc20aWindow` | 180 days from incorporation | Window to file INC-20A, the declaration of commencement of business | Section 10A, Companies Act 2013 | Private Limited Company, One Person Company | ☐ |
| `aoc4Window` | 30 days from the AGM | AOC-4 filing window — financial statements | Section 137, Companies Act 2013 | Private Limited Company, One Person Company, Compliance Calendar (AOC-4 (financial statements)) | ☐ |
| `mgt7Window` | 60 days from the AGM | MGT-7 filing window — annual return | Section 92, Companies Act 2013 | Private Limited Company, Compliance Calendar (MGT-7 (annual return)) | ☐ |
| `opcMandatoryConversion` | None — no turnover or capital level forces conversion | Mandatory OPC conversion threshold | Rule 7, Companies (Incorporation) Rules 2014, as amended by the Second Amendment Rules 2021 | One Person Company | ☐ |
| `opcResidency` | 120 days in India | Residency test for OPC eligibility | Rule 3, Companies (Incorporation) Rules 2014, as amended 2021 | One Person Company | ☐ |
| `opcStructure` | one member, one nominee and at least one director | Minimum structure of an OPC | Section 3(1)(c) and Rule 3, Companies Act 2013 | One Person Company | ☐ |
| `llpMinPartners` | 2 designated partners, at least one resident in India | Minimum for an LLP | Section 7, LLP Act 2008 | LLP Registration | ☐ |
| `llpForm11Due` | 30 May | LLP Form 11 annual return due date | Rule 25, LLP Rules 2009 | LLP Registration | ☐ |
| `llpForm8Due` | 30 October | LLP Form 8 statement of account and solvency due date | Rule 24, LLP Rules 2009 | LLP Registration | ☐ |
| `llpLateFee` | ₹100 per day, with no cap | Late fee for LLP Form 8 and Form 11 | LLP Act 2008 read with LLP Rules 2009 | LLP Registration | ☐ |
| `llpAgreementWindow` | 30 days from incorporation | Window to file the LLP agreement in Form 3 | Section 23, LLP Act 2008 | LLP Registration | ☐ |
| `partnershipStatute` | Indian Partnership Act, 1932 | Statute governing partnership firms | Indian Partnership Act, 1932 | Partnership Firm | ☐ |
| `internalAuditTurnoverThreshold` | ₹200 crore | Turnover above which internal audit is mandatory for a private company | Section 138, Companies Act 2013, read with Rule 13, Companies (Accounts) Rules 2014 | Internal Audit | ☐ |
| `internalAuditBorrowingThreshold` | ₹100 crore | Outstanding borrowings above which internal audit is mandatory for a private company | Section 138, Companies Act 2013, read with Rule 13, Companies (Accounts) Rules 2014 | Internal Audit | ☐ |
| `booksRetentionCompanies` | 8 financial years | Books of account retention period for a company | Section 128, Companies Act 2013 | Bookkeeping & Accounting | ☐ |
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
| `tdsPaymentDue` | 7th of the following month (30 April for March) | TDS payment due date | Calendar mechanic, historically stable — cite no section number pending BLOCKERS.md §1 | Compliance Calendar (TDS Payment (monthly)) | ☐ |
| `advanceTaxInstalments` | 15% by 15 June, 45% by 15 September, 75% by 15 December, 100% by 15 March | Advance tax instalment schedule | Calendar mechanic, historically stable — cite no section number pending BLOCKERS.md §1 | Compliance Calendar (Advance Tax — 1st instalment (15%)), Compliance Calendar (Advance Tax — 2nd instalment (45%)), Compliance Calendar (Advance Tax — 3rd instalment (75%)), Compliance Calendar (Advance Tax — 4th instalment (100%)) | ☐ |
| `gstinLength` | 15 characters | Length of a GSTIN | Structural — state code, PAN, entity code, check digit | GST Registration | ☐ |
| `gstDocUploadLimit` | 100 KB per file, PDF or JPEG | GST portal document upload limit | GST portal operational limit | GST Registration | ☐ |

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
- **`gstDocUploadLimit`** — Operational rather than statutory — verify against the portal, it changes without notification.

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
- `gstinLength` — https://cleartax.in/s/gst-registration-documents-checklist
- `gstDocUploadLimit` — https://cleartax.in/s/gst-registration-documents-checklist

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
