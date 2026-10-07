import { increment, serverTimestamp, type WriteBatch } from 'firebase/firestore';

import { toMonthKey } from '@/src/lib/date';

import type { TransactionDraft, WalletId } from '../types';
import { signedAmount } from '../utils/transaction';

import { monthlyStatsRef, userRef } from './refs';

type MonthDelta = { income: number; expense: number; expenseByCategory: Record<string, number> };

/** Net change a set of transaction writes makes to wallet balances and monthly stats. */
export type AggregateDelta = {
  balances: Partial<Record<WalletId, number>>;
  months: Record<string, MonthDelta>;
};

export const emptyDelta = (): AggregateDelta => ({ balances: {}, months: {} });

/** Adds (sign 1) or removes (sign -1) a transaction's effect. */
export function applyTransaction(delta: AggregateDelta, tx: TransactionDraft, sign: 1 | -1) {
  delta.balances[tx.walletId] = (delta.balances[tx.walletId] ?? 0) + sign * signedAmount(tx);

  const month = (delta.months[toMonthKey(tx.date)] ??= { income: 0, expense: 0, expenseByCategory: {} });
  month[tx.type] += sign * tx.amount;
  if (tx.type === 'expense') {
    month.expenseByCategory[tx.categoryId] = (month.expenseByCategory[tx.categoryId] ?? 0) + sign * tx.amount;
  }
  return delta;
}

function increments(values: Record<string, number>) {
  const out: Record<string, ReturnType<typeof increment>> = {};
  for (const [key, value] of Object.entries(values)) if (value) out[key] = increment(value);
  return out;
}

export function writeBalanceDelta(batch: WriteBatch, uid: string, delta: AggregateDelta) {
  const balances = increments(delta.balances);
  if (Object.keys(balances).length === 0) return;
  batch.set(userRef(uid), { balances, updatedAt: serverTimestamp() }, { merge: true });
}

export function writeMonthDeltas(batch: WriteBatch, uid: string, delta: AggregateDelta) {
  for (const [month, m] of Object.entries(delta.months)) {
    const totals = increments({ income: m.income, expense: m.expense });
    const byCategory = increments(m.expenseByCategory);
    const hasByCategory = Object.keys(byCategory).length > 0;
    if (Object.keys(totals).length === 0 && !hasByCategory) continue;
    // An empty map in a merge write would replace the stored map, so only send it when non-empty.
    const fields = hasByCategory ? { ...totals, expenseByCategory: byCategory } : totals;
    batch.set(monthlyStatsRef(uid, month), { ...fields, updatedAt: serverTimestamp() }, { merge: true });
  }
}
