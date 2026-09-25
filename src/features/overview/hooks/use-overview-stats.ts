import { useMemo } from 'react';

import { useTransactions } from '@/src/features/transactions';

import type { AnalyticsPeriod } from '../types';
import { cashflowBars, chartScale, monthTotals, periodLabel, spendingByGroup } from '../utils/analytics';

export function useOverviewStats(period: AnalyticsPeriod) {
  const transactions = useTransactions();
  const today = useMemo(() => new Date(), []);

  const month = useMemo(() => monthTotals(transactions, today), [transactions, today]);
  const spending = useMemo(() => spendingByGroup(transactions, period, today), [transactions, period, today]);
  const bars = useMemo(() => cashflowBars(month, today), [month, today]);

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
