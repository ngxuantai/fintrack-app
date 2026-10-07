import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/config/firebase';

const isFirstInit = getApps().length === 0;
export const firebaseApp = isFirstInit ? initializeApp(firebaseConfig) : getApp();

// initializeAuth may only run once per app (Fast Refresh re-evaluates this module).
export const auth: Auth = isFirstInit
  ? initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);
