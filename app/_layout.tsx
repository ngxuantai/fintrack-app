import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppSplash } from '@/src/components/app-splash';
import { StartupError } from '@/src/components/startup-error';
import { ToastHost } from '@/src/components/toast';
import { useFinanceSync } from '@/src/features/transactions';
import { startSession, useSession } from '@/src/stores/session-store';
import { colors, fontAssets } from '@/src/theme';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 200 });

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const session = useSession((s) => s);
  const sync = useFinanceSync();

  useEffect(() => startSession(), []);

  const fontsReady = fontsLoaded || !!fontError;
  const failed = session.status === 'error' || sync.status === 'error';
  const dataReady = sync.status === 'ready';

  // The native splash only waits for fonts; AppSplash covers the session + first data load.
  useEffect(() => {
    if (fontsReady) SplashScreen.hideAsync();
  }, [fontsReady]);

  if (!fontsReady) return null;

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
      {dataReady ? (
        <Stack screenOptions={{ headerShown: false, contentStyle: styles.content }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="transaction-form" options={{ presentation: 'modal' }} />
        </Stack>
      ) : null}
      <ToastHost />
      {dataReady ? null : <AppSplash />}
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { backgroundColor: colors.background },
});
