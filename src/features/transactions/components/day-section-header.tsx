import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { formatRelativeDay } from '@/src/lib/date';
import { formatSignedMoney } from '@/src/lib/format';
import { colors, spacing } from '@/src/theme';

export function DaySectionHeader({ date, net }: { date: string; net: number }) {
  return (
    <View style={styles.header}>
      <AppText size="md" weight="semibold" color={colors.textSecondary}>
        {formatRelativeDay(date)}
      </AppText>
      <AppText size="md" color={colors.textMuted} tabular>
        {formatSignedMoney(net)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.background,
  },
});
