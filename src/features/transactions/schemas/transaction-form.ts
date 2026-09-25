import { toISODate } from '@/src/lib/date';

import type { CategoryId, Transaction, TransactionDraft, TransactionType, WalletId } from '../types';

export type TransactionFormValues = {
  type: TransactionType;
  /** Digits only, no separators ("55000"). */
  amount: string;
  categoryId: CategoryId;
  /** "YYYY-MM-DD" */
  date: string;
  walletId: WalletId;
  note: string;
  hasReceipt: boolean;
};

export type TransactionFormErrors = Partial<Record<keyof TransactionFormValues, string>>;

export const MAX_AMOUNT_DIGITS = 11;

export function emptyFormValues(today = new Date()): TransactionFormValues {
  return {
    type: 'expense',
    amount: '',
    categoryId: 'food',
    date: toISODate(today),
    walletId: 'cash',
    note: '',
    hasReceipt: false,
  };
}

export function formValuesFromTransaction(tx: Transaction): TransactionFormValues {
  return {
    type: tx.type,
    amount: String(tx.amount),
    categoryId: tx.categoryId,
    date: tx.date,
    walletId: tx.walletId,
    note: tx.note,
    hasReceipt: !!tx.hasReceipt,
  };
}

/** Keeps digits only, drops leading zeros and caps the length. */
export function sanitizeAmount(input: string) {
  return input.replace(/\D/g, '').replace(/^0+/, '').slice(0, MAX_AMOUNT_DIGITS);
}

export function validateTransactionForm(values: TransactionFormValues): TransactionFormErrors {
  const errors: TransactionFormErrors = {};
  if (!parseInt(values.amount || '0', 10)) errors.amount = 'Vui lòng nhập số tiền giao dịch';
  return errors;
}

export function toTransactionDraft(values: TransactionFormValues): TransactionDraft {
  return {
    type: values.type,
    amount: parseInt(values.amount, 10),
    categoryId: values.categoryId,
    date: values.date,
    walletId: values.walletId,
    note: values.note.trim(),
    hasReceipt: values.hasReceipt,
  };
}
