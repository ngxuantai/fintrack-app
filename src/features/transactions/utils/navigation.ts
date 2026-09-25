import { router } from 'expo-router';

/** Opens the add/edit transaction sheet. Pass an id to edit an existing transaction. */
export function openTransactionForm(id?: string) {
  router.push(id ? { pathname: '/transaction-form', params: { id } } : '/transaction-form');
}
