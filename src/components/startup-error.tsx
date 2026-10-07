import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Button } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { colors, screenPadding, spacing } from '@/src/theme';

type StartupErrorProps = {
  message: string | null;
  onRetry: () => void;
};

/** Full-screen fallback when the session or the initial data load fails. */
export function StartupError({ message, onRetry }: StartupErrorProps) {
  return (
    <View style={styles.screen}>
      <Icon name="alertCircle" size={48} color={colors.error} strokeWidth={1.6} />
      <AppText size="2xl" weight="bold" align="center">
        Không thể tải dữ liệu
      </AppText>
      <AppText size="base" color={colors.textMuted} align="center">
        Kiểm tra kết nối mạng rồi thử lại.
      </AppText>
      {message ? (
        <AppText size="sm" color={colors.textSubtle} align="center">
          {message}
        </AppText>
      ) : null}
      <Button variant="outline" label="Thử lại" onPress={onRetry} style={styles.action} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: screenPadding,
    backgroundColor: colors.background,
  },
  action: { marginTop: spacing.lg },
});
