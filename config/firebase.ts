import type { FirebaseOptions } from 'firebase/app';

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing env variable ${name}. Copy .env.example to .env.local and fill it in.`);
  return value;
}

// EXPO_PUBLIC_* must be read with static property access so Expo can inline them.
export const firebaseConfig: FirebaseOptions = {
  apiKey: required('EXPO_PUBLIC_FIREBASE_API_KEY', process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: required('EXPO_PUBLIC_FIREBASE_PROJECT_ID', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: required('EXPO_PUBLIC_FIREBASE_APP_ID', process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
};

/**
 * Personal-use phase: the app signs in automatically with this account (no login screen).
 * These values are bundled into the app — only use builds that stay on your own devices.
 */
export const devCredentials = {
  email: process.env.EXPO_PUBLIC_DEV_EMAIL ?? '',
  password: process.env.EXPO_PUBLIC_DEV_PASSWORD ?? '',
};

/** Display name written to the user profile on first launch. */
export const defaultDisplayName = process.env.EXPO_PUBLIC_DISPLAY_NAME || 'Bạn';
