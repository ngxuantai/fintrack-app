import type { LucideIcon } from '@/src/components/ui/icons';
import type { categoryPalette } from '@/src/theme';

export type TransactionType = 'expense' | 'income';

export type WalletId = 'cash' | 'bank' | 'ewallet';

/** Firestore doc id: the default ids ("food", "salary", …) or an auto id for user-created categories. */
export type CategoryId = string;

export type CategoryColorKey = keyof typeof categoryPalette;

/** Category as the UI uses it: color and icon already resolved from their stored keys. */
export type Category = {
  id: CategoryId;
  type: TransactionType;
  name: string;
  color: string;
  icon: LucideIcon;
  order: number;
  isDefault: boolean;
  /** Hidden from pickers but still used to render older transactions. */
  archived: boolean;
};

export type Transaction = {
  id: string;
  /** Local date, "YYYY-MM-DD". */
  date: string;
  type: TransactionType;
  categoryId: CategoryId;
  /** Positive amount in VND. */
  amount: number;
  note: string;
  walletId: WalletId;
  hasReceipt?: boolean;
  /** Epoch ms; orders transactions within the same day. */
  createdAt: number;
};

export type TransactionDraft = Omit<Transaction, 'id' | 'createdAt'>;

export type TypeFilter = 'all' | TransactionType;

export type Account = {
  displayName: string;
  balances: Record<WalletId, number>;
};

export type MonthlyStats = {
  /** "YYYY-MM" (the doc id). */
  month: string;
  income: number;
  expense: number;
  expenseByCategory: Record<CategoryId, number>;
};
