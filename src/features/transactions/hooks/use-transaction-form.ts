import { router } from 'expo-router';
import { useState } from 'react';

import { showToast } from '@/src/stores/toast-store';

import { CATEGORY_IDS_BY_TYPE } from '../constants';
import {
  emptyFormValues,
  formValuesFromTransaction,
  sanitizeAmount,
  toTransactionDraft,
  validateTransactionForm,
  type TransactionFormErrors,
  type TransactionFormValues,
} from '../schemas/transaction-form';
import { addTransaction, getTransaction, updateTransaction } from '../stores/transactions-store';
import type { TransactionType } from '../types';

export function useTransactionForm(editingId?: string) {
  const [editing] = useState(() => (editingId ? getTransaction(editingId) : undefined));
  const [values, setValues] = useState<TransactionFormValues>(() =>
    editing ? formValuesFromTransaction(editing) : emptyFormValues(),
  );
  const [errors, setErrors] = useState<TransactionFormErrors>({});

  const set = <K extends keyof TransactionFormValues>(key: K, value: TransactionFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const setType = (type: TransactionType) =>
    setValues((v) => {
      const ids = CATEGORY_IDS_BY_TYPE[type];
      return { ...v, type, categoryId: ids.includes(v.categoryId) ? v.categoryId : ids[0] };
    });

  const setAmount = (input: string) => {
    const amount = sanitizeAmount(input);
    set('amount', amount);
    if (errors.amount && amount) setErrors((e) => ({ ...e, amount: undefined }));
  };

  const submit = () => {
    const nextErrors = validateTransactionForm(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const draft = toTransactionDraft(values);
    if (editing) updateTransaction(editing.id, draft);
    else addTransaction(draft);

    router.back();
    showToast(editing ? 'Đã cập nhật giao dịch' : 'Đã lưu giao dịch');
  };

  return {
    isEditing: !!editing,
    values,
    errors,
    setType,
    setAmount,
    setCategory: (id: TransactionFormValues['categoryId']) => set('categoryId', id),
    setDate: (date: string) => set('date', date),
    setWallet: (id: TransactionFormValues['walletId']) => set('walletId', id),
    setNote: (note: string) => set('note', note),
    toggleReceipt: () => set('hasReceipt', !values.hasReceipt),
    submit,
  };
}
