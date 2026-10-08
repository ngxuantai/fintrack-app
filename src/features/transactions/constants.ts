import type { CategoryIconKey } from '@/src/components/ui/icons';

import type { CategoryColorKey, CategoryId, TransactionType, WalletId } from './types';

export type DefaultCategory = { id: CategoryId; type: TransactionType; name: string; color: CategoryColorKey; icon: CategoryIconKey };

/**
 * Built-in categories shared by every user, kept in code only (never written to Firestore).
 * Ids are referenced by stored transactions: never rename or remove one. Array order is display order.
 */
export const DEFAULT_CATEGORIES: DefaultCategory[] = [
  { id: 'food', type: 'expense', name: 'Ăn uống', color: 'orange', icon: 'food' },
  { id: 'move', type: 'expense', name: 'Di chuyển', color: 'blue', icon: 'move' },
  { id: 'shop', type: 'expense', name: 'Mua sắm', color: 'pink', icon: 'shop' },
  { id: 'bill', type: 'expense', name: 'Hóa đơn', color: 'purple', icon: 'bill' },
  { id: 'fun', type: 'expense', name: 'Giải trí', color: 'yellow', icon: 'fun' },
  { id: 'health', type: 'expense', name: 'Sức khỏe', color: 'teal', icon: 'health' },
  { id: 'edu', type: 'expense', name: 'Giáo dục', color: 'sky', icon: 'edu' },
  { id: 'other', type: 'expense', name: 'Khác', color: 'gray', icon: 'dots' },
  { id: 'salary', type: 'income', name: 'Lương', color: 'green', icon: 'salary' },
  { id: 'bonus', type: 'income', name: 'Thưởng', color: 'yellow', icon: 'bonus' },
  { id: 'invest', type: 'income', name: 'Đầu tư', color: 'blue', icon: 'invest' },
  { id: 'sell', type: 'income', name: 'Bán đồ', color: 'pink', icon: 'sell' },
  { id: 'gift', type: 'income', name: 'Được tặng', color: 'orange', icon: 'gift' },
  { id: 'side', type: 'income', name: 'Làm thêm', color: 'purple', icon: 'side' },
  { id: 'refund', type: 'income', name: 'Hoàn tiền', color: 'teal', icon: 'refund' },
  { id: 'iother', type: 'income', name: 'Khác', color: 'gray', icon: 'dots' },
];

export const WALLETS: Record<WalletId, string> = {
  cash: 'Tiền mặt',
  bank: 'Ngân hàng',
  ewallet: 'Ví điện tử',
};

export const WALLET_IDS = Object.keys(WALLETS) as WalletId[];

/** Months of transactions kept in sync (current month + the previous ones). */
export const SYNCED_MONTHS = 3;
