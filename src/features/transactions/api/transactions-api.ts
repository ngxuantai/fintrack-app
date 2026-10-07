import { doc, serverTimestamp, Timestamp, writeBatch, type WriteBatch } from 'firebase/firestore';

import { db } from '@/src/lib/firebase';
import { requireUid } from '@/src/stores/session-store';
import { showToast } from '@/src/stores/toast-store';

import type { Transaction, TransactionDraft } from '../types';

import { applyTransaction, emptyDelta, writeBalanceDelta, writeMonthDeltas, type AggregateDelta } from './aggregates';
import { transactionRef, transactionsCol } from './refs';

function transactionFields(draft: TransactionDraft) {
  return {
    type: draft.type,
    categoryId: draft.categoryId,
    walletId: draft.walletId,
    amount: draft.amount,
    date: draft.date,
    note: draft.note,
    hasReceipt: !!draft.hasReceipt,
    updatedAt: serverTimestamp(),
  };
}

export function toTransactionDoc(draft: TransactionDraft, createdAt: Timestamp | ReturnType<typeof serverTimestamp>) {
  return { ...transactionFields(draft), createdAt };
}

/**
 * Writes the transaction change together with its balance/stat increments in one batch.
 * Not awaited: the local cache updates the UI immediately, the server ack arrives later
 * (or once back online).
 */
function commit(uid: string, write: (batch: WriteBatch) => void, delta: AggregateDelta) {
  const batch = writeBatch(db);
  write(batch);
  writeBalanceDelta(batch, uid, delta);
  writeMonthDeltas(batch, uid, delta);
  batch.commit().catch((error) => {
    console.warn('[transactions] write failed', error);
    showToast('Không thể lưu thay đổi lên máy chủ');
  });
}

export function addTransaction(draft: TransactionDraft) {
  const uid = requireUid();
  const ref = doc(transactionsCol(uid));
  commit(uid, (b) => b.set(ref, toTransactionDoc(draft, serverTimestamp())), applyTransaction(emptyDelta(), draft, 1));
  return ref.id;
}

export function updateTransaction(previous: Transaction, draft: TransactionDraft) {
  const uid = requireUid();
  const delta = applyTransaction(applyTransaction(emptyDelta(), previous, -1), draft, 1);
  commit(uid, (b) => b.update(transactionRef(uid, previous.id), transactionFields(draft)), delta);
}

/** Deletes a transaction and returns a function that restores it (for "Hoàn tác"). */
export function deleteTransaction(tx: Transaction) {
  const uid = requireUid();
  commit(uid, (b) => b.delete(transactionRef(uid, tx.id)), applyTransaction(emptyDelta(), tx, -1));

  return () => {
    const restored = toTransactionDoc(tx, Timestamp.fromMillis(tx.createdAt));
    commit(uid, (b) => b.set(transactionRef(uid, tx.id), restored), applyTransaction(emptyDelta(), tx, 1));
  };
}
