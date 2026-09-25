import { useLocalSearchParams } from 'expo-router';

import { TransactionFormScreen } from '@/src/features/transactions';

export default function TransactionFormRoute() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return <TransactionFormScreen transactionId={id} />;
}
