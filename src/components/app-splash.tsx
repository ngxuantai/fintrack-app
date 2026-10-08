import Constants from "expo-constants";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/src/components/ui/app-text";
import { colors, shadows, spacing } from "@/src/theme";

const LOGO_SIZE = 84;
const DOT_COUNT = 3;
const DOT_INTERVAL_MS = 400;

/**
 * Branded loading screen shown after the native splash, while the session and first data load.
 * The native splash (app.json → expo-splash-screen) only shows the logo; this adds the wordmark.
 */
export function AppSplash() {
  const insets = useSafeAreaInsets();
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActiveDot((i) => (i + 1) % DOT_COUNT),
      DOT_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Animated.View
      exiting={FadeOut.duration(250)}
      style={styles.screen}
    >
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />

      <View style={styles.center}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/splash-icon.png")}
            style={styles.logoImage}
          />
        </View>
        <AppText
          size="7xl"
          weight="bold"
          style={styles.wordmark}
        >
          fin
          <AppText
            size="7xl"
            weight="bold"
            color={colors.primary}
            style={styles.wordmark}
          >
            track
          </AppText>
        </AppText>
        <AppText
          size="base"
          color={colors.textMuted}
        >
          Theo dõi thu chi mỗi ngày
        </AppText>
      </View>

      <View style={[styles.footer, { bottom: insets.bottom + spacing["6xl"] }]}>
        <AppText
          size="sm"
          color={colors.textSubtle}
        >
          Phiên bản {Constants.expoConfig?.version}
        </AppText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: colors.background,
  },
  circleTop: { width: 280, height: 280, top: -80, right: -100 },
  circleBottom: { width: 320, height: 320, bottom: -140, left: -110 },
  center: { alignItems: "center", gap: spacing.md },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE * 0.23,
    marginBottom: spacing.md,
    ...shadows.splashLogo,
  },
  logoImage: { width: LOGO_SIZE, height: LOGO_SIZE },
  wordmark: { letterSpacing: -0.8 },
  footer: { position: "absolute", alignItems: "center", gap: spacing.xl },
  dots: { flexDirection: "row", gap: spacing.sm },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryTint,
  },
  dotActive: { backgroundColor: colors.primary },
});

