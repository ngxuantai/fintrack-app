import { getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { defaultDisplayName } from '@/config/firebase';

import { WALLET_IDS } from '../constants';
import type { WalletId } from '../types';

import { userRef } from './refs';

/**
 * First launch for this account: creates the profile with zero balances.
 * Default categories are not stored: they live in code (DEFAULT_CATEGORIES).
 */
export async function ensureUserData(uid: string) {
  const snapshot = await getDoc(userRef(uid));
  if (snapshot.exists()) return;

  const balances = Object.fromEntries(WALLET_IDS.map((id) => [id, 0])) as Record<WalletId, number>;
  const now = serverTimestamp();
  await setDoc(userRef(uid), { displayName: defaultDisplayName, currency: 'VND', balances, createdAt: now, updatedAt: now });
}
