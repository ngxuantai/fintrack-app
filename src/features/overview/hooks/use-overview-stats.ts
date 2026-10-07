import { useMemo } from 'react';

import { useCategoryMap, useMonthlyStats, useTransactions } from '@/src/features/transactions';

import type { AnalyticsPeriod } from '../types';
import { cashflowBars, chartScale, monthTotals, periodLabel, spendingByCategory } from '../utils/analytics';

export function useOverviewStats(period: AnalyticsPeriod) {
  const transactions = useTransactions();
  const monthlyStats = useMonthlyStats();
  const categoryById = useCategoryMap();
  const today = useMemo(() => new Date(), []);

  const month = useMemo(() => monthTotals(transactions, today), [transactions, today]);
  const spending = useMemo(
    () => spendingByCategory(transactions, monthlyStats, categoryById, period, today),
    [transactions, monthlyStats, categoryById, period, today],
  );
  const bars = useMemo(() => cashflowBars(monthlyStats, month, today), [monthlyStats, month, today]);

  return {
    today,
    transactions,
    monthIncome: month.income,
    monthExpense: month.expense,
    spending,
    spendingLabel: periodLabel(period, today),
    bars,
    barScale: chartScale(bars),
  };
}
