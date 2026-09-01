// DSC FINDER — the two-question wizard that replaces five certificate pages.
//
// ⛔ 02-09-2026. This is the mechanism that makes one page work where five
// used to: instead of guessing which product page to open, a reader picks the
// portal they are actually dealing with and, where it matters, whose name the
// certificate is in. Structure and copy come from
// ThinkOrange_DSC_Hub_V7.html's own finder, which is the strongest idea in
// either reference document.
//
// ⚠️ RESULTS SELECT BY REFERENCE, they do not restate. A result names a
// `certificate` key and `DscFinder.jsx` resolves the label, the documents and
// the validity options out of `certificates.js` at render time. Copying a
// document list in here would fork it — a correction to a certificate's
// checklist would leave the finder confidently showing the superseded version.
// The only thing a result holds is what is specific to THAT portal: why this
// certificate, and the one thing worth knowing about that portal.
//
// ⚠️ `capacity` is what decides whether question two is asked at all:
//   "ask"  — both routes are real, so the reader chooses (GST, income tax…).
//   "ind" / "org" — the portal settles it, so question two is skipped rather
//                   than asked and then ignored. MCA is "ind" because
//                   directors sign as officers in their own name; EPFO is
//                   "org" because it validates against the establishment
//                   record and a personal certificate is rejected outright.
//   "none" — a route that is not a capacity question at all (foreign
//            national), which renders its own result directly.
//
// No fee, no timeline, no turnaround promise appears in any result. V7's own
// result cards carry "₹[X]" and "[X hrs]" placeholders; those are placeholders
// in the source, not facts, and none were carried over.

export const finderUses = [
  {
    key: "gst",
    label: "GST portal",
    desc: "Returns, registration, refunds, notices",
    icon: "receipt",
    capacity: "ask",
    results: {
      ind: {
        certificate: "class-3-individual",
        why:
          "For GST filing in your own name as a proprietor or individual. Encryption is not required on the GST portal, so a signature certificate is all you need — if you are being sold a combo purely for GST filing, you are paying for something you will not use.",
        note:
          "A certificate does not work until it is registered against your GSTIN under the authorised signatory profile. We do that step with you.",
      },
      org: {
        certificate: "class-3-organisation",
        why:
          "Companies and LLPs cannot file GST returns using an electronic verification code, so this certificate is mandatory rather than optional. It carries both your name and the entity name.",
        note:
          "The entity name on the certificate must match your GST registration exactly, and the certificate must be mapped to the GSTIN before it will work.",
      },
    },
  },
  {
    key: "mca",
    label: "MCA / ROC",
    desc: "AOC-4, MGT-7, incorporation, DIR-3 KYC",
    icon: "building",
    capacity: "ind",
    results: {
      ind: {
        certificate: "class-3-individual",
        why:
          "Directors and designated partners sign MCA forms in their own personal capacity as officers of the company. That means an Individual certificate in your own name is normally what you need — not the more expensive Organisation certificate.",
        note:
          "The PAN on your certificate must match the PAN in your DIN record, including spelling and initials. Mismatches here are the most common reason association fails on the MCA portal.",
      },
    },
  },
  {
    key: "itr",
    label: "Income tax",
    desc: "Return filing, audit cases, TDS",
    icon: "file",
    capacity: "ask",
    results: {
      ind: {
        certificate: "class-3-individual",
        why:
          "For filing your own return, or filing as a professional. Mandatory for audit cases and optional for most other individuals, though many prefer it to relying on a one-time password arriving in time.",
        note:
          "The same certificate also works for GST, MCA and trademark filings — you do not need a separate one for each.",
      },
      org: {
        certificate: "class-3-organisation",
        why:
          "For filing a company or LLP return where the signatory acts for the entity rather than personally.",
        note:
          "Companies must file with a certificate; the electronic verification code route is not available to them.",
      },
    },
  },
  {
    key: "tender",
    label: "GeM & e-tendering",
    desc: "Government bids and procurement",
    icon: "gavel",
    capacity: "ask",
    results: {
      ind: {
        certificate: "combo-dsc",
        why:
          "Tender portals require bids to be signed and encrypted before submission, which means a combo certificate. This one is in your own name, for bidding as a proprietor or individual contractor.",
        note:
          "Encryption cannot be added later. If you buy signature-only and find out on the closing day, the tender is lost rather than delayed — send us the tender document and we will confirm the requirement first.",
      },
      org: {
        certificate: "combo-dsc",
        why:
          "For bidding in a company or LLP name. Carries both signing and encryption, and the entity name that the portal validates against.",
        note:
          "The entity name must match your portal registration character for character. If you bid regularly, tell us your tender calendar and we will track certificate expiry against it.",
      },
    },
  },
  {
    key: "dgft",
    label: "DGFT / import–export",
    desc: "IEC, licences, export incentives",
    icon: "ship",
    capacity: "ask",
    results: {
      ind: {
        certificate: "dgft-iec",
        why:
          "For a proprietorship, the DGFT portal validates the certificate against the PAN in your IEC profile — so a Class 3 Individual certificate registered against that IEC works. You do not necessarily need a dedicated DGFT token, which is where a lot of exporters overspend.",
        note:
          "No IEC yet? An IEC application can be signed with an Aadhaar one-time password, so you may not need a certificate to get one.",
        link: { slug: "iec-registration", label: "We can handle the IEC too" },
      },
      org: {
        certificate: "dgft-iec",
        why:
          "For companies, LLPs and other entities, DGFT validates the organisation name on the certificate against the name in the PAN database linked to your IEC. A standard Class 3 Organisation certificate registered against the IEC works — a dedicated DGFT token is an option, not a requirement.",
        note:
          "Names must match exactly, and the certificate has to be registered against your IEC on the portal before DGFT will recognise it.",
        link: { slug: "iec-registration", label: "Need an IEC first?" },
      },
    },
  },
  {
    key: "customs",
    label: "ICEGATE / customs",
    desc: "Bills of entry, shipping bills, eSanchit",
    icon: "package",
    capacity: "org",
    results: {
      org: {
        certificate: "class-3-organisation",
        why:
          "For filing bills of entry, shipping bills and eSanchit document uploads. If you already hold a DGFT certificate, that is generally accepted on ICEGATE as well.",
        note:
          "The certificate must be registered against your ICEGATE account, and the entity name and IEC must match the customs record.",
        link: { slug: "icegate-registration", label: "ICEGATE registration" },
      },
    },
  },
  {
    key: "epfo",
    label: "EPFO / ESIC",
    desc: "Employer filings and claim approvals",
    icon: "users",
    capacity: "org",
    results: {
      org: {
        certificate: "class-3-organisation",
        why:
          "EPFO validates against the establishment record, so the certificate must carry both the signatory name and the entity name. A personal certificate will be rejected.",
        note:
          "If your authorised signatory changes, both the portal record and the certificate need updating before filings resume.",
      },
    },
  },
  {
    key: "trademark",
    label: "Trademark filing",
    desc: "IP India portal",
    icon: "badge",
    capacity: "ind",
    results: {
      ind: {
        certificate: "class-3-individual",
        why:
          "The IP India portal accepts an Individual certificate, whether you are filing as the applicant or as an agent.",
        note:
          "The same certificate covers income tax, GST and MCA filings — worth knowing before you buy a second one.",
        link: { slug: "trademark-registration", label: "Trademark registration" },
      },
    },
  },
  {
    key: "renewal",
    label: "Renewing or replacing",
    desc: "Expiring, lost, damaged or locked token",
    icon: "refresh",
    capacity: "none",
    result: {
      certificate: "dsc-renewal-reissue",
      why:
        "Renewal before expiry and replacement after loss, damage or expiry follow different paths, and which one you are on decides how much of the process repeats. Renewing while your current certificate is still valid usually reuses a working token and moves faster. Once it has lapsed it is treated as a brand-new application, full verification included, with no grace period.",
      note:
        "If your token is lost or stolen, tell us before anything else — the certificate on it can be used by whoever holds it until it is revoked, and revocation is immediate.",
    },
  },
  {
    key: "foreign",
    label: "I'm a foreign national",
    desc: "No Aadhaar — separate route",
    icon: "globe",
    capacity: "none",
    result: {
      // No `certificate` key: this is a verification ROUTE, not one of the five
      // certificates, so it carries its own checklist rather than resolving one.
      heading: "Class 3 certificate — passport route",
      why:
        "Aadhaar does not apply to you, so verification runs on your passport with attested supporting documents. The entire process can be completed from outside India — you will not need to travel, and the token is couriered to your address abroad.",
      documents: [
        "Scanned copy of your passport",
        "Address proof — driving licence, utility bill or bank statement, dated recently",
        "Passport-size photograph",
        "Email address and contact number",
        "An English translation for any document not in English",
        "Apostille where your country is party to the Hague Convention, otherwise attestation by the Indian Embassy or Consulate",
      ],
      note:
        "Confirm which attestation route applies before you start. Getting this wrong means doing it twice, and it is slow. If you are also signing for an Indian company, entity documents are needed as well — tell us which country you are applying from and what you will be signing, and we will confirm the route before you spend anything on it.",
    },
  },
];

export function finderUse(key) {
  return finderUses.find((use) => use.key === key);
}

/** Question two, asked only where `capacity` is "ask". */
export const finderCapacities = [
  {
    key: "ind",
    label: "In my own name",
    desc: "As an individual, professional or proprietor.",
  },
  {
    key: "org",
    label: "For a company, LLP or firm",
    desc: "Signing on behalf of a registered entity as its authorised person.",
  },
];
