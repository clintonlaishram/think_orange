// PRACTICE TYPES — one list, two forms.
//
// ⛔ 03-09-2026. This lived privately inside `PartnerEnquiryForm.jsx` until the
// Buy Token order form needed the same question (Clinton: "added name, address,
// phone, email and Practice type"). Two copies of a list of professions is
// exactly the drift this repo extracts things to avoid — a category added for a
// partner would silently not exist for a buyer.
//
// ⚠️ It is deliberately the SAME list for both, including the trade entries
// ("Existing DSC reseller", "Token dealer"). A token buyer can be either, and
// splitting it into a "partner" list and a "buyer" list would put the two back
// on the drift path this extraction exists to end.
//
// Plain data with no imports, so it is safe anywhere — including `nav.js` and
// the Node scripts, unlike `content/dsc/icons.js`.
export const practiceTypes = [
  { value: "chartered-accountant", label: "Chartered Accountant" },
  { value: "company-secretary", label: "Company Secretary" },
  { value: "cost-accountant", label: "Cost Accountant" },
  { value: "tax-practitioner", label: "Tax Practitioner" },
  { value: "advocate", label: "Advocate" },
  { value: "consultant", label: "Business Consultant" },
  { value: "it-service-provider", label: "IT Service Provider" },
  { value: "existing-reseller", label: "Existing DSC reseller" },
  { value: "token-dealer", label: "Token dealer" },
  { value: "other", label: "Something else" },
];

export function practiceTypeLabel(value) {
  return practiceTypes.find((type) => type.value === value)?.label;
}
