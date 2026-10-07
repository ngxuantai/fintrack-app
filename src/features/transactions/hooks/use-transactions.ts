import { useMemo } from 'react';

import { financeStore } from '../stores/finance-store';
import type { CategoryId, TransactionType } from '../types';
import { resolveCategory } from '../utils/category';

/** Synced transactions (see SYNCED_MONTHS), newest first. */
export function useTransactions() {
  return financeStore.useStore((s) => s.transactions);
}

export function useAccount() {
  return financeStore.useStore((s) => s.account);
}

export function useTotalBalance() {
  const account = useAccount();
  return useMemo(
    () => (account ? Object.values(account.balances).reduce((sum, value) => sum + value, 0) : 0),
    [account],
  );
}

/** Keyed by "YYYY-MM": the current year plus the last 6 months. */
export function useMonthlyStats() {
  return financeStore.useStore((s) => s.monthlyStats);
}

export function useCategoryMap() {
  return financeStore.useStore((s) => s.categoryById);
}

/** Categories offered in pickers: not archived, in display order. */
export function useActiveCategories(type: TransactionType) {
  const categories = financeStore.useStore((s) => s.categories);
  return useMemo(() => categories.filter((c) => c.type === type && !c.archived), [categories, type]);
}

/** Missing ids resolve to a neutral placeholder instead of crashing the row. */
export function useCategory(id: CategoryId) {
  const categoryById = useCategoryMap();
  return resolveCategory(categoryById, id);
}
