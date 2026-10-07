import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { devCredentials } from '@/config/firebase';
import { createStore } from '@/src/lib/create-store';
import { auth } from '@/src/lib/firebase';

type SessionState = {
  status: 'loading' | 'signedIn' | 'error';
  uid: string | null;
  error: string | null;
};

const store = createStore<SessionState>({ status: 'loading', uid: null, error: null });
let unsubscribe: (() => void) | undefined;

function fail(error: unknown) {
  store.setState({ status: 'error', uid: null, error: error instanceof Error ? error.message : String(error) });
}

/**
 * Personal-use phase: restores the persisted session, or signs in with the dev account from env.
 * Replace the auto sign-in with a login screen when the app opens up to other users.
 */
export function startSession() {
  unsubscribe?.();
  store.setState({ status: 'loading', error: null });

  unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      store.setState({ status: 'signedIn', uid: user.uid, error: null });
      return;
    }
    if (!devCredentials.email || !devCredentials.password) {
      fail(new Error('Missing EXPO_PUBLIC_DEV_EMAIL / EXPO_PUBLIC_DEV_PASSWORD in .env.local'));
      return;
    }
    signInWithEmailAndPassword(auth, devCredentials.email, devCredentials.password).catch(fail);
  });
}

/** uid of the signed-in user; data writes only happen after the session is ready. */
export function requireUid() {
  const { uid } = store.getState();
  if (!uid) throw new Error('No signed-in user');
  return uid;
}

export const useSession = <S>(selector: (s: SessionState) => S) => store.useStore(selector);
