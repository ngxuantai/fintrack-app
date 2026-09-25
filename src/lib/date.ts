export const WEEKDAY_NAMES = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
export const WEEKDAY_SHORT_MON_FIRST = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Local date → "YYYY-MM-DD". */
export function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "YYYY-MM-DD" → local Date at midnight. */
export function fromISODate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** "YYYY-MM-DD" → "YYYY-MM". */
export function toMonthKey(iso: string) {
  return iso.slice(0, 7);
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** "25/09/2026" */
export function formatDayMonthYear(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** "25/09" */
export function formatDayMonth(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
}

/** "Hôm nay" / "Hôm qua" / "22/09/2026" */
export function formatRelativeDay(iso: string, today = new Date()) {
  if (iso === toISODate(today)) return 'Hôm nay';
  if (iso === toISODate(addDays(today, -1))) return 'Hôm qua';
  return formatDayMonthYear(fromISODate(iso));
}
