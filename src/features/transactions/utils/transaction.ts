import { formatSignedMoney } from '@/src/lib/format';

import { WALLETS } from '../constants';
import type { Transaction } from '../types';

/** Income counts as positive, expense as negative. */
export function signedAmount(tx: Pick<Transaction, 'type' | 'amount'>) {
  return tx.type === 'income' ? tx.amount : -tx.amount;
}

export function formatTransactionAmount(tx: Pick<Transaction, 'type' | 'amount'>) {
  return formatSignedMoney(tx.amount, tx.type === 'income' ? 'plus' : 'minus');
}

/** "Phở bò · Tiền mặt" or just the wallet name when there's no note. */
export function transactionSubtitle(tx: Pick<Transaction, 'note' | 'walletId'>) {
  const wallet = WALLETS[tx.walletId];
  return tx.note ? `${tx.note} · ${wallet}` : wallet;
}

/** Newest first; ties keep insertion order (newest added first). */
export function sortByDateDesc(list: Transaction[]) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function sumByType(list: Transaction[], type: Transaction['type']) {
  return list.reduce((total, tx) => (tx.type === type ? total + tx.amount : total), 0);
}
