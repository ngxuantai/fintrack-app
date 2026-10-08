import { documentId, onSnapshot, query, where, type DocumentData, type DocumentSnapshot } from 'firebase/firestore';

import { addMonths, toISODate, toMonthKey } from '@/src/lib/date';
import { categoryPalette } from '@/src/theme';

import { CATEGORY_ICONS, SYNCED_MONTHS, WALLET_IDS } from '../constants';
import { financeStore } from '../stores/finance-store';
import type { Account, Category, MonthlyStats, Transaction, WalletId } from '../types';
import { mergeCategories } from '../utils/category';
import { sortByDateDesc } from '../utils/transaction';

import { categoriesCol, monthlyStatsCol, transactionsCol, userRef } from './refs';
import { ensureUserData } from './setup';

/** Stats the overview charts need: the cashflow bars (6 months) and the whole current year. */
const STATS_MONTHS = 6;

function toAccount(data: DocumentData | undefined): Account {
  const balances = {} as Record<WalletId, number>;
  for (const id of WALLET_IDS) balances[id] = data?.balances?.[id] ?? 0;
  return { displayName: data?.displayName ?? '', balances };
}

/** A user-created category; built-in defaults live in code, not Firestore. */
function toCategory(snap: DocumentSnapshot): Category {
  const d = snap.data() ?? {};
  return {
    id: snap.id,
    type: d.type,
    name: d.name ?? '',
    color: categoryPalette[d.color as keyof typeof categoryPalette] ?? categoryPalette.gray,
    icon: CATEGORY_ICONS[d.icon as keyof typeof CATEGORY_ICONS] ?? CATEGORY_ICONS.dots,
    order: d.order ?? 0,
    isDefault: false,
    archived: !!d.archived,
  };
}

function toTransaction(snap: DocumentSnapshot): Transaction {
  // A pending serverTimestamp() is null locally; "estimate" keeps fresh rows on top.
  const d = snap.data({ serverTimestamps: 'estimate' }) ?? {};
  return {
    id: snap.id,
    date: d.date,
    type: d.type,
    categoryId: d.categoryId,
    amount: d.amount,
    note: d.note ?? '',
    walletId: d.walletId,
    hasReceipt: !!d.hasReceipt,
    createdAt: d.createdAt?.toMillis?.() ?? Date.now(),
  };
}

function toMonthlyStats(snap: DocumentSnapshot): MonthlyStats {
  const d = snap.data() ?? {};
  return { month: snap.id, income: d.income ?? 0, expense: d.expense ?? 0, expenseByCategory: d.expenseByCategory ?? {} };
}

/**
 * Ensures the account exists, then mirrors it into `financeStore` with realtime listeners.
 * Returns a cleanup that detaches every listener.
 */
export function startFinanceSync(uid: string) {
  let active = true;
  const unsubscribers: (() => void)[] = [];
  const pending = new Set(['account', 'categories', 'transactions', 'stats']);

  const set = financeStore.setState;
  const loaded = (key: string) => {
    if (pending.delete(key) && pending.size === 0) set({ status: 'ready' });
  };
  const onError = (error: unknown) => {
    console.warn('[finance-sync]', error);
    if (active) set({ status: 'error', error: error instanceof Error ? error.message : String(error) });
  };

  set({ status: 'loading', error: null });

  ensureUserData(uid)
    .then(() => {
      if (!active) return;
      const today = new Date();
      const firstDay = toISODate(addMonths(today, 1 - SYNCED_MONTHS));
      const statsFrom = toMonthKey(toISODate(addMonths(today, 1 - STATS_MONTHS)));
      const yearStart = `${today.getFullYear()}-01`;
      const firstStatsMonth = statsFrom < yearStart ? statsFrom : yearStart;

      unsubscribers.push(
        onSnapshot(
          userRef(uid),
          (snap) => {
            set({ account: toAccount(snap.data()) });
            loaded('account');
          },
          onError,
        ),
        onSnapshot(
          categoriesCol(uid),
          (snap) => {
            // Older accounts still hold copies of the defaults; mergeCategories drops them.
            set(mergeCategories(snap.docs.map(toCategory)));
            loaded('categories');
          },
          onError,
        ),
        onSnapshot(
          query(transactionsCol(uid), where('date', '>=', firstDay)),
          (snap) => {
            set({ transactions: sortByDateDesc(snap.docs.map(toTransaction)) });
            loaded('transactions');
          },
          onError,
        ),
        onSnapshot(
          query(monthlyStatsCol(uid), where(documentId(), '>=', firstStatsMonth)),
          (snap) => {
            set({ monthlyStats: Object.fromEntries(snap.docs.map((d) => [d.id, toMonthlyStats(d)])) });
            loaded('stats');
          },
          onError,
        ),
      );
    })
    .catch(onError);

  return () => {
    active = false;
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  };
}
