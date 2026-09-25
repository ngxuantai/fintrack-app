import { categoryPalette as p } from '@/src/theme';

import type { CategoryId } from '@/src/features/transactions';

import type { AnalyticsPeriod } from './types';

// UI-only phase: placeholder profile until auth is wired up.
export const MOCK_USER = { name: 'Minh Anh', initials: 'MA' };

export const PERIOD_OPTIONS: { value: AnalyticsPeriod; label: string }[] = [
  { value: 'week', label: 'Tuần' },
  { value: 'month', label: 'Tháng' },
  { value: 'year', label: 'Năm' },
];

/** Donut groups; expense categories not listed fall into "Khác". */
export const SPENDING_GROUPS: { key: string; name: string; color: string; categories: CategoryId[] }[] = [
  { key: 'food', name: 'Ăn uống', color: p.orange, categories: ['food'] },
  { key: 'move', name: 'Di chuyển', color: p.blue, categories: ['move'] },
  { key: 'shop', name: 'Mua sắm', color: p.pink, categories: ['shop'] },
  { key: 'bill', name: 'Hóa đơn', color: p.purple, categories: ['bill'] },
  { key: 'fun', name: 'Giải trí', color: p.yellowChart, categories: ['fun'] },
  { key: 'other', name: 'Khác', color: p.grayChart, categories: [] },
];

// Mock data for ranges the in-memory store doesn't cover yet.
export const MOCK_YEAR_SPENDING: Record<string, number> = {
  food: 21_600_000,
  move: 6_200_000,
  shop: 9_800_000,
  bill: 38_900_000,
  fun: 4_700_000,
  other: 7_400_000,
};

/** Income / expense (millions) for the 5 months before the current one, oldest first. */
export const MOCK_PREVIOUS_MONTHS: [income: number, expense: number][] = [
  [18.5, 12.1],
  [19.2, 14.8],
  [18.0, 11.6],
  [21.5, 16.2],
  [18.8, 13.4],
];
