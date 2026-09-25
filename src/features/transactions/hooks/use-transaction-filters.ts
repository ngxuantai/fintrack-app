import { useMemo, useState } from 'react';

import { addMonths, toISODate, toMonthKey } from '@/src/lib/date';

import type { TypeFilter, WalletId } from '../types';
import { filterTransactions, groupByDay } from '../utils/filter-transactions';
import { sumByType } from '../utils/transaction';

import { useTransactions } from './use-transactions';

const MONTHS_TO_SHOW = 3;

export type MonthOption = { value: string; label: string; shortLabel: string };

function buildMonthOptions(today: Date): MonthOption[] {
  return Array.from({ length: MONTHS_TO_SHOW }, (_, i) => {
    const d = addMonths(today, -i);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    return { value: toMonthKey(toISODate(d)), label: `Tháng ${m}/${y}`, shortLabel: `T${m}/${y}` };
  });
}

export function useTransactionFilters() {
  const transactions = useTransactions();
  const monthOptions = useMemo(() => buildMonthOptions(new Date()), []);

  const [query, setQuery] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  const [walletId, setWalletId] = useState<WalletId | null>(null);
  const [month, setMonth] = useState(monthOptions[0].value);

  const filtered = useMemo(
    () => filterTransactions(transactions, { month, type, walletId, query }),
    [transactions, month, type, walletId, query],
  );
  const sections = useMemo(() => groupByDay(filtered), [filtered]);

  return {
    query,
    setQuery,
    type,
    setType,
    walletId,
    setWalletId,
    month,
    setMonth,
    monthOptions,
    sections,
    totalIncome: sumByType(filtered, 'income'),
    totalExpense: sumByType(filtered, 'expense'),
    /** No transactions at all (not just filtered out). */
    isEmpty: transactions.length === 0,
  };
}
