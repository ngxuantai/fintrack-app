import { addDays, addMonths, formatDayMonth, toISODate, toMonthKey } from '@/src/lib/date';

import { sumByType, type Transaction } from '@/src/features/transactions';

import { MOCK_PREVIOUS_MONTHS, MOCK_YEAR_SPENDING, SPENDING_GROUPS } from '../constants';
import type { AnalyticsPeriod, CashflowBar, CategorySlice } from '../types';

export function periodLabel(period: AnalyticsPeriod, today: Date) {
  if (period === 'week') return `${formatDayMonth(addDays(today, -6))} – ${formatDayMonth(today)}`;
  if (period === 'month') return `Tháng ${today.getMonth() + 1}/${today.getFullYear()}`;
  return `Năm ${today.getFullYear()}`;
}

function groupKeyOf(tx: Transaction) {
  return SPENDING_GROUPS.find((g) => g.categories.includes(tx.categoryId))?.key ?? 'other';
}

export function spendingByGroup(transactions: Transaction[], period: AnalyticsPeriod, today: Date) {
  let totals: Record<string, number> = {};

  if (period === 'year') {
    totals = MOCK_YEAR_SPENDING;
  } else {
    const to = toISODate(today);
    const from = period === 'week' ? toISODate(addDays(today, -6)) : `${toMonthKey(to)}-01`;
    for (const tx of transactions) {
      if (tx.type !== 'expense' || tx.date < from || tx.date > to) continue;
      const key = groupKeyOf(tx);
      totals[key] = (totals[key] ?? 0) + tx.amount;
    }
  }

  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  const slices: CategorySlice[] = SPENDING_GROUPS.map((g) => {
    const amount = totals[g.key] ?? 0;
    return { key: g.key, name: g.name, color: g.color, amount, percent: total ? Math.round((amount / total) * 100) : 0 };
  });
  return { total, slices };
}

export function monthTotals(transactions: Transaction[], today: Date) {
  const month = toMonthKey(toISODate(today));
  const inMonth = transactions.filter((tx) => toMonthKey(tx.date) === month);
  return { income: sumByType(inMonth, 'income'), expense: sumByType(inMonth, 'expense') };
}

export function cashflowBars(current: { income: number; expense: number }, today: Date): CashflowBar[] {
  const previous = MOCK_PREVIOUS_MONTHS.map(([income, expense], i) => ({
    label: `T${addMonths(today, i - MOCK_PREVIOUS_MONTHS.length).getMonth() + 1}`,
    income,
    expense,
    current: false,
  }));
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
