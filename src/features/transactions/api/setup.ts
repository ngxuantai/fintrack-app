import { doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';

import { defaultDisplayName, seedMockData } from '@/config/firebase';
import { db } from '@/src/lib/firebase';

import { DEFAULT_CATEGORIES, WALLET_IDS } from '../constants';
import type { WalletId } from '../types';

import { applyTransaction, emptyDelta, writeMonthDeltas } from './aggregates';
import { createMockTransactions, MOCK_OPENING_BALANCES } from './mock-transactions';
import { toTransactionDoc } from './transactions-api';
import { categoryRef, transactionsCol, userRef } from './refs';

/**
 * First launch for this account: creates the profile, the default categories and,
 * when EXPO_PUBLIC_SEED_MOCK_DATA=true, the demo transactions — all in one batch.
 */
export async function ensureUserData(uid: string) {
  const snapshot = await getDoc(userRef(uid));
  if (snapshot.exists()) return;

  const batch = writeBatch(db);
  const now = serverTimestamp();

  DEFAULT_CATEGORIES.forEach(({ id, ...category }, order) => {
    batch.set(categoryRef(uid, id), { ...category, order, isDefault: true, archived: false, createdAt: now, updatedAt: now });
  });

  const balances = Object.fromEntries(WALLET_IDS.map((id) => [id, 0])) as Record<WalletId, number>;

  if (seedMockData) {
    const delta = emptyDelta();
    const seededAt = Date.now();
    createMockTransactions().forEach((draft, index) => {
      // Older seed rows get earlier timestamps so same-day order matches the seed list.
      batch.set(doc(transactionsCol(uid)), toTransactionDoc(draft, Timestamp.fromMillis(seededAt - index * 1000)));
      applyTransaction(delta, draft, 1);
    });
    for (const id of WALLET_IDS) balances[id] = MOCK_OPENING_BALANCES[id] + (delta.balances[id] ?? 0);
    writeMonthDeltas(batch, uid, delta);
  }

  batch.set(userRef(uid), { displayName: defaultDisplayName, currency: 'VND', balances, createdAt: now, updatedAt: now });
  await batch.commit();
}
