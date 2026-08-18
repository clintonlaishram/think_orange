// Local, explicit date formatting for rendered dates.
//
// ⚠️ NEVER format a rendered date with `toISOString()` — it converts to UTC
// first, so any IST date before 05:30 renders as the PREVIOUS day. The
// compliance calendar already carries this warning for the same reason
// (`formatDueDate` there); this is the editorial equivalent, kept separate
// because it formats a stored publish date rather than a computed deadline.
//
// Input is a plain "YYYY-MM-DD" string, parsed by hand rather than handed to
// `new Date(str)` — that constructor treats a bare date string as UTC midnight,
// which is the same off-by-one-day trap in a different disguise.
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatArticleDate(isoDate) {
  const [year, month, day] = String(isoDate).split("-").map(Number);
  if (!year || !month || !day) return "";
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
