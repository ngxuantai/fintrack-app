import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { colors, spacing } from '@/src/theme';

import { CATEGORIES } from '../constants';
import type { Transaction } from '../types';
import { formatTransactionAmount, transactionSubtitle } from '../utils/transaction';

import { CategoryIcon } from './category-icon';

type TransactionRowProps = {
  transaction: Transaction;
  /** Draws the hairline separator above the row. */
  showDivider?: boolean;
};

/** Presentational row: category icon, title/subtitle, signed amount. */
export const TransactionRow = memo(function TransactionRow({ transaction, showDivider }: TransactionRowProps) {
  const isIncome = transaction.type === 'income';

  return (
    <View style={[styles.row, showDivider && styles.divider]}>
      <CategoryIcon categoryId={transaction.categoryId} />
      <View style={styles.body}>
        <AppText size="lg" weight="semibold">
          {CATEGORIES[transaction.categoryId].name}
        </AppText>
        <AppText size="sm" color={colors.textMuted} numberOfLines={1} style={styles.subtitle}>
          {transactionSubtitle(transaction)}
        </AppText>
      </View>
      <AppText size="lg" weight="semibold" tabular color={isIncome ? colors.income : colors.expense}>
        {formatTransactionAmount(transaction)}
      </AppText>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing['3xl'],
    backgroundColor: colors.surface,
  },
  divider: { borderTopWidth: 1, borderTopColor: colors.divider },
  body: { flex: 1, minWidth: 0 },
  subtitle: { marginTop: spacing.xxs },
});
