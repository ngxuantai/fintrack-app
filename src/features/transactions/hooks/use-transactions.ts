import { useMemo } from 'react';

import { transactionsStore } from '../stores/transactions-store';
import { signedAmount, sortByDateDesc } from '../utils/transaction';

/** All transactions, newest first. */
export function useTransactions() {
  const transactions = transactionsStore.useStore((s) => s.transactions);
  return useMemo(() => sortByDateDesc(transactions), [transactions]);
}

export function useTotalBalance() {
  const transactions = transactionsStore.useStore((s) => s.transactions);
  const openingBalance = transactionsStore.useStore((s) => s.openingBalance);
  return useMemo(
    () => transactions.reduce((sum, tx) => sum + signedAmount(tx), openingBalance),
    [transactions, openingBalance],
  );
}
