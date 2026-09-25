import { createStore } from '@/src/lib/create-store';

import { createMockTransactions, MOCK_TOTAL_BALANCE } from '../api/mock-transactions';
import type { Transaction, TransactionDraft } from '../types';
import { signedAmount } from '../utils/transaction';

type TransactionsState = {
  transactions: Transaction[];
  /** Balance before any tracked transaction, so total = opening + Σ signed amounts. */
  openingBalance: number;
};

function createInitialState(): TransactionsState {
  const transactions = createMockTransactions();
  const tracked = transactions.reduce((sum, tx) => sum + signedAmount(tx), 0);
  return { transactions, openingBalance: MOCK_TOTAL_BALANCE - tracked };
}

// UI-only phase: in-memory store seeded with mock data. Replace with API-backed queries later.
export const transactionsStore = createStore<TransactionsState>(createInitialState());

let nextId = 1;

export function addTransaction(draft: TransactionDraft) {
  const tx: Transaction = { ...draft, id: `local-${Date.now()}-${nextId++}` };
  transactionsStore.setState((s) => ({ transactions: [tx, ...s.transactions] }));
  return tx;
}

export function updateTransaction(id: string, draft: TransactionDraft) {
  transactionsStore.setState((s) => ({
    transactions: s.transactions.map((tx) => (tx.id === id ? { ...draft, id } : tx)),
  }));
}

/** Removes a transaction and returns a function that restores it (for "Hoàn tác"). */
export function deleteTransaction(id: string) {
  const { transactions } = transactionsStore.getState();
  const index = transactions.findIndex((tx) => tx.id === id);
  if (index < 0) return () => {};
  const removed = transactions[index];
  transactionsStore.setState({ transactions: transactions.filter((tx) => tx.id !== id) });

  return () => {
    transactionsStore.setState((s) => {
      const next = [...s.transactions];
      next.splice(Math.min(index, next.length), 0, removed);
      return { transactions: next };
    });
  };
}

export function getTransaction(id: string) {
  return transactionsStore.getState().transactions.find((tx) => tx.id === id);
}
