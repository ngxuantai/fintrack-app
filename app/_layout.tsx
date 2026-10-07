import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { StartupError } from '@/src/components/startup-error';
import { ToastHost } from '@/src/components/toast';
import { useFinanceSync } from '@/src/features/transactions';
import { startSession, useSession } from '@/src/stores/session-store';
import { colors, fontAssets } from '@/src/theme';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const session = useSession((s) => s);
  const sync = useFinanceSync();

  useEffect(() => startSession(), []);

  const failed = session.status === 'error' || sync.status === 'error';
  const ready = (fontsLoaded || !!fontError) && (sync.status === 'ready' || failed);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  if (failed) {
    return (
      <StartupError
        message={session.error ?? sync.error}
        onRetry={session.status === 'error' ? startSession : sync.retry}
      />
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.content }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="transaction-form" options={{ presentation: 'modal' }} />
      </Stack>
      <ToastHost />
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { backgroundColor: colors.background },
});
