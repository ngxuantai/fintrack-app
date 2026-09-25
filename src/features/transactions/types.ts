export type TransactionType = 'expense' | 'income';

export type WalletId = 'cash' | 'bank' | 'ewallet';

export type ExpenseCategoryId = 'food' | 'move' | 'shop' | 'bill' | 'fun' | 'health' | 'edu' | 'other';
export type IncomeCategoryId = 'salary' | 'bonus' | 'invest' | 'sell' | 'gift' | 'side' | 'refund' | 'iother';
export type CategoryId = ExpenseCategoryId | IncomeCategoryId;

export type Category = {
  id: CategoryId;
  name: string;
  color: string;
  /** SVG path (24×24 viewBox). */
  icon: string;
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
};

export type TransactionDraft = Omit<Transaction, 'id'>;

export type TypeFilter = 'all' | TransactionType;
