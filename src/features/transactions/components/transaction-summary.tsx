import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { formatSignedMoney } from '@/src/lib/format';
import { colors, radii, shadows, spacing } from '@/src/theme';

type TransactionSummaryProps = {
  income: number;
  expense: number;
};

export function TransactionSummary({ income, expense }: TransactionSummaryProps) {
  return (
    <View style={styles.card}>
      <SummaryItem label="Tổng thu" value={formatSignedMoney(income, 'plus')} color={colors.income} />
      <View style={styles.separator} />
      <SummaryItem label="Tổng chi" value={formatSignedMoney(expense, 'minus')} color={colors.expense} />
    </View>
  );
}

function SummaryItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.item}>
      <AppText size="sm" color={colors.textMuted}>
        {label}
      </AppText>
      <AppText size="xl" weight="bold" tabular color={color} numberOfLines={1}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radii['2xl'],
    ...shadows.xs,
  },
  item: { flex: 1, paddingHorizontal: spacing['3xl'], gap: spacing.xxs },
  separator: { width: 1, backgroundColor: colors.dividerStrong },
});
