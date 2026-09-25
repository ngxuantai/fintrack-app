/** Formats an integer with `.` thousands separators (Vietnamese style): 1234567 → "1.234.567". */
export function formatNumber(value: number) {
  return String(Math.round(Math.abs(value))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Formats an amount in VND: 55000 → "55.000 ₫". Sign is dropped. */
export function formatMoney(value: number) {
  return `${formatNumber(value)} ₫`;
}

/** Formats an amount with an explicit sign: +55.000 ₫ / −55.000 ₫. */
export function formatSignedMoney(value: number, sign: 'plus' | 'minus' = value >= 0 ? 'plus' : 'minus') {
  return `${sign === 'plus' ? '+' : '−'}${formatMoney(value)}`;
}

export const MASKED_MONEY = '••••••• ₫';

/** Lowercases and strips Vietnamese diacritics so search is accent-insensitive. */
export function normalizeSearch(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
}
