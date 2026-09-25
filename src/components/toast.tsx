import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { hideToast, useToast } from '@/src/stores/toast-store';
import { colors, radii, screenPadding, shadows, spacing } from '@/src/theme';

/** Distance above the tab bar (tab bar height ≈ 60 + bottom inset). */
const OFFSET_ABOVE_TAB_BAR = 78;

/** Global toast host. Mount once near the root; trigger with `showToast()`. */
export function ToastHost() {
  const toast = useToast();
  const insets = useSafeAreaInsets();
  if (!toast) return null;

  return (
    <Animated.View
      key={toast.id}
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(150)}
      accessibilityLiveRegion="polite"
      style={[styles.toast, { bottom: OFFSET_ABOVE_TAB_BAR + Math.max(insets.bottom, spacing.md) }]}>
      <Icon name="check" size={20} color={colors.toastSuccess} strokeWidth={2.2} />
      <AppText size="base" color={colors.onPrimary} style={styles.message}>
        {toast.message}
      </AppText>
      {toast.actionLabel ? (
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => {
            toast.onAction?.();
            hideToast();
          }}>
          <AppText size="base" weight="semibold" color={colors.toastAction}>
            {toast.actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: screenPadding,
    right: screenPadding,
    zIndex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.toastBg,
    borderRadius: radii['2xl'],
    paddingVertical: spacing.xl,
    paddingLeft: spacing['3xl'],
    paddingRight: spacing['2xl'],
    ...shadows.toast,
  },
  message: { flex: 1 },
});
