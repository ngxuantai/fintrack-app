import { useEffect, useState } from 'react';

import { useSession } from '@/src/stores/session-store';

import { startFinanceSync } from '../api/sync';
import { financeStore } from '../stores/finance-store';

/** Starts the Firestore sync once signed in; `retry` restarts it after an error. */
export function useFinanceSync() {
  const uid = useSession((s) => s.uid);
  const [attempt, setAttempt] = useState(0);
  const status = financeStore.useStore((s) => s.status);
  const error = financeStore.useStore((s) => s.error);

  useEffect(() => {
    if (!uid) return;
    return startFinanceSync(uid);
  }, [uid, attempt]);

  return { status, error, retry: () => setAttempt((n) => n + 1) };
}
