import { addDays, addMonths, formatDayMonth, toISODate, toMonthKey } from '@/src/lib/date';
import { categoryPalette } from '@/src/theme';

import { resolveCategory, sumByType, type Category, type MonthlyStats, type Transaction } from '@/src/features/transactions';

import { CASHFLOW_PREVIOUS_MONTHS, TOP_SPENDING_CATEGORIES } from '../constants';
import type { AnalyticsPeriod, CashflowBar, CategorySlice } from '../types';

export function periodLabel(period: AnalyticsPeriod, today: Date) {
  if (period === 'week') return `${formatDayMonth(addDays(today, -6))} – ${formatDayMonth(today)}`;
  if (period === 'month') return `Tháng ${today.getMonth() + 1}/${today.getFullYear()}`;
  return `Năm ${today.getFullYear()}`;
}

/** Expense per category: week/month from transactions, year from the monthly stats docs. */
function expenseByCategory(
  transactions: Transaction[],
  monthlyStats: Record<string, MonthlyStats>,
  period: AnalyticsPeriod,
  today: Date,
) {
  const totals: Record<string, number> = {};
  const add = (id: string, amount: number) => (totals[id] = (totals[id] ?? 0) + amount);

  if (period === 'year') {
    const year = String(today.getFullYear());
    for (const stats of Object.values(monthlyStats)) {
      if (!stats.month.startsWith(year)) continue;
      for (const [id, amount] of Object.entries(stats.expenseByCategory)) add(id, amount);
    }
    return totals;
  }

  const to = toISODate(today);
  const from = period === 'week' ? toISODate(addDays(today, -6)) : `${toMonthKey(to)}-01`;
  for (const tx of transactions) {
    if (tx.type === 'expense' && tx.date >= from && tx.date <= to) add(tx.categoryId, tx.amount);
  }
  return totals;
}

export function spendingByCategory(
  transactions: Transaction[],
  monthlyStats: Record<string, MonthlyStats>,
  categoryById: Record<string, Category>,
  period: AnalyticsPeriod,
  today: Date,
) {
  const ranked = Object.entries(expenseByCategory(transactions, monthlyStats, period, today))
    .filter(([, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);
  const total = ranked.reduce((sum, [, amount]) => sum + amount, 0);
  const percent = (amount: number) => (total ? Math.round((amount / total) * 100) : 0);

  // Only merge into "Khác" when that hides at least two categories.
  const shown = ranked.length > TOP_SPENDING_CATEGORIES + 1 ? ranked.slice(0, TOP_SPENDING_CATEGORIES) : ranked;
  const slices: CategorySlice[] = shown.map(([id, amount]) => {
    const category = resolveCategory(categoryById, id);
    return { key: id, name: category.name, color: category.color, amount, percent: percent(amount) };
  });

  const rest = ranked.slice(shown.length).reduce((sum, [, amount]) => sum + amount, 0);
  if (rest > 0) {
    slices.push({ key: '__rest', name: 'Khác', color: categoryPalette.grayChart, amount: rest, percent: percent(rest) });
  }
  return { total, slices };
}

export function monthTotals(transactions: Transaction[], today: Date) {
  const month = toMonthKey(toISODate(today));
  const inMonth = transactions.filter((tx) => toMonthKey(tx.date) === month);
  return { income: sumByType(inMonth, 'income'), expense: sumByType(inMonth, 'expense') };
}

export function cashflowBars(
  monthlyStats: Record<string, MonthlyStats>,
  current: { income: number; expense: number },
  today: Date,
): CashflowBar[] {
  const previous = Array.from({ length: CASHFLOW_PREVIOUS_MONTHS }, (_, i) => {
    const date = addMonths(today, i - CASHFLOW_PREVIOUS_MONTHS);
    const stats = monthlyStats[toMonthKey(toISODate(date))];
    return {
      label: `T${date.getMonth() + 1}`,
      income: (stats?.income ?? 0) / 1e6,
      expense: (stats?.expense ?? 0) / 1e6,
      current: false,
    };
  });
  return [
    ...previous,
    { label: `T${today.getMonth() + 1}`, income: current.income / 1e6, expense: current.expense / 1e6, current: true },
  ];
}

/** Axis max in millions, rounded up to 10 with a floor of 20. */
export function chartScale(bars: CashflowBar[]) {
  const max = Math.max(...bars.flatMap((b) => [b.income, b.expense]));
  return Math.max(20, Math.ceil(max / 10) * 10);
}

export function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 11) return 'Chào buổi sáng,';
  if (hour < 14) return 'Chào buổi trưa,';
  if (hour < 18) return 'Chào buổi chiều,';
  return 'Chào buổi tối,';
}

/** "Minh Anh" → "MA", "Lan" → "L". */
export function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}
