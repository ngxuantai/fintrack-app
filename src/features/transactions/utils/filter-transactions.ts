import { toMonthKey } from '@/src/lib/date';
import { normalizeSearch } from '@/src/lib/format';

import { CATEGORIES } from '../constants';
import type { Transaction, TypeFilter, WalletId } from '../types';

import { signedAmount } from './transaction';

export type TransactionFilters = {
  month: string;
  type: TypeFilter;
  walletId: WalletId | null;
  query: string;
};

export function filterTransactions(list: Transaction[], filters: TransactionFilters) {
  const query = normalizeSearch(filters.query.trim());
  return list.filter((tx) => {
    if (toMonthKey(tx.date) !== filters.month) return false;
    if (filters.type !== 'all' && tx.type !== filters.type) return false;
    if (filters.walletId && tx.walletId !== filters.walletId) return false;
    if (query && !normalizeSearch(`${tx.note} ${CATEGORIES[tx.categoryId].name}`).includes(query)) return false;
    return true;
  });
}

export type TransactionDayGroup = {
  date: string;
  net: number;
  data: Transaction[];
};

/** Groups an already date-sorted list by day. */
export function groupByDay(list: Transaction[]): TransactionDayGroup[] {
  const groups: TransactionDayGroup[] = [];
  for (const tx of list) {
    let group = groups[groups.length - 1];
    if (!group || group.date !== tx.date) {
      group = { date: tx.date, net: 0, data: [] };
      groups.push(group);
    }
    group.data.push(tx);
    group.net += signedAmount(tx);
  }
  return groups;
}
