import { collection, doc } from 'firebase/firestore';

import { db } from '@/src/lib/firebase';

// Data layout (all private to the signed-in user):
//   users/{uid}                      profile + per-wallet balances
//   users/{uid}/categories/{id}      categories (defaults keep ids like "food")
//   users/{uid}/transactions/{id}    transactions
//   users/{uid}/monthlyStats/{YYYY-MM}  income/expense totals per month, for charts

export const userRef = (uid: string) => doc(db, 'users', uid);
export const categoriesCol = (uid: string) => collection(db, 'users', uid, 'categories');
export const categoryRef = (uid: string, id: string) => doc(db, 'users', uid, 'categories', id);
export const transactionsCol = (uid: string) => collection(db, 'users', uid, 'transactions');
export const transactionRef = (uid: string, id: string) => doc(db, 'users', uid, 'transactions', id);
export const monthlyStatsCol = (uid: string) => collection(db, 'users', uid, 'monthlyStats');
export const monthlyStatsRef = (uid: string, month: string) => doc(db, 'users', uid, 'monthlyStats', month);
