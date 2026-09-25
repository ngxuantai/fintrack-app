import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Button } from '@/src/components/ui/button';
import { colors, radii, shadows, spacing } from '@/src/theme';

export function TransactionsEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.container}>
      <EmptyIllustration />
      <AppText size="4xl" weight="bold" align="center">
        Chưa có giao dịch nào
      </AppText>
      <AppText size="base" color={colors.textMuted} align="center" style={styles.description}>
        Ghi lại khoản thu chi đầu tiên để bắt đầu theo dõi tài chính của bạn.
      </AppText>
      <Button icon="plus" label="Thêm giao dịch đầu tiên" onPress={onAdd} style={styles.button} />
    </View>
  );
}

export function NoMatchingTransactions() {
  return (
    <View style={styles.noResults}>
      <AppText size="lg" weight="semibold" align="center">
        Không có giao dịch phù hợp
      </AppText>
      <AppText size="md" color={colors.textMuted} align="center">
        Thử đổi bộ lọc hoặc từ khóa tìm kiếm.
      </AppText>
    </View>
  );
}

function EmptyIllustration() {
  return (
    <View style={illustration.frame}>
      <View style={illustration.blob} />
      <View style={illustration.receipt}>
        <View style={[illustration.line, illustration.lineAccent, { width: '60%' }]} />
        <View style={[illustration.line, { width: '90%' }]} />
        <View style={[illustration.line, { width: '75%' }]} />
        <View style={[illustration.line, { width: '45%' }]} />
      </View>
      <View style={illustration.coin}>
        <AppText size="2xl" weight="bold" color={colors.avatarText}>
          ₫
        </AppText>
      </View>
      <View style={[illustration.dot, illustration.dotPink]} />
      <View style={[illustration.dot, illustration.dotBlue]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 44, paddingHorizontal: spacing['3xl'], gap: spacing.lg },
  description: { lineHeight: 21, maxWidth: 280 },
  button: { marginTop: spacing.xl },
  noResults: { paddingVertical: 48, paddingHorizontal: spacing['5xl'], gap: spacing.sm },
});

const illustration = StyleSheet.create({
  frame: { width: 170, height: 150, marginBottom: spacing.md },
  blob: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 150,
    height: 130,
    borderRadius: 75,
    backgroundColor: colors.illustrationBg,
  },
  receipt: {
    position: 'absolute',
    left: 48,
    top: 20,
    width: 74,
    height: 100,
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.xl,
    gap: 9,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    transform: [{ rotate: '-6deg' }],
    ...shadows.illustration,
  },
  line: { height: 6, borderRadius: radii.xs, backgroundColor: colors.border },
  lineAccent: { backgroundColor: colors.illustrationLine },
  coin: {
    position: 'absolute',
    right: 26,
    bottom: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: colors.surface,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { position: 'absolute', borderRadius: 999 },
  dotPink: { left: 20, top: 34, width: 10, height: 10, backgroundColor: colors.accent },
  dotBlue: { right: 34, top: 14, width: 7, height: 7, backgroundColor: colors.primary },
});
