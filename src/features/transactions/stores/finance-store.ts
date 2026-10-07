import { createStore } from '@/src/lib/create-store';

import type { Account, Category, MonthlyStats, Transaction } from '../types';

type FinanceState = {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;
  account: Account | null;
  /** Sorted by `order`, archived included. */
  categories: Category[];
  categoryById: Record<string, Category>;
  /** Synced window only (see SYNCED_MONTHS), newest first. */
  transactions: Transaction[];
  monthlyStats: Record<string, MonthlyStats>;
};

/** Mirror of the user's Firestore data, filled by `startFinanceSync`. Writes go through `api/`. */
export const financeStore = createStore<FinanceState>({
  status: 'idle',
  error: null,
  account: null,
  categories: [],
  categoryById: {},
  transactions: [],
  monthlyStats: {},
});

export function getTransaction(id: string) {
  return financeStore.getState().transactions.find((tx) => tx.id === id);
}

export function getActiveCategories(type: Category['type']) {
  return financeStore.getState().categories.filter((c) => c.type === type && !c.archived);
}
