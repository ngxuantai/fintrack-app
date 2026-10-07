import type { AnalyticsPeriod } from './types';

export const PERIOD_OPTIONS: { value: AnalyticsPeriod; label: string }[] = [
  { value: 'week', label: 'Tuần' },
  { value: 'month', label: 'Tháng' },
  { value: 'year', label: 'Năm' },
];

/** Donut shows the biggest categories; the rest are merged into "Khác". */
export const TOP_SPENDING_CATEGORIES = 5;

/** Cashflow chart: the current month plus this many before it. */
export const CASHFLOW_PREVIOUS_MONTHS = 5;
