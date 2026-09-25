import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Card } from '@/src/components/ui/card';
import { TransactionRow, type Transaction } from '@/src/features/transactions';
import { colors, spacing } from '@/src/theme';

import { SectionHeader } from './section-header';

type RecentTransactionsProps = {
  transactions: Transaction[];
  onSeeAll: () => void;
};

export function RecentTransactions({ transactions, onSeeAll }: RecentTransactionsProps) {
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Giao dịch gần đây"
        right={
          <Pressable accessibilityRole="link" onPress={onSeeAll} hitSlop={8}>
            <AppText size="base" weight="semibold" color={colors.primary}>
              Xem tất cả
            </AppText>
          </Pressable>
        }
      />
      {transactions.length > 0 ? (
        <Card padded={false} style={styles.list}>
          {transactions.map((tx, index) => (
            <TransactionRow key={tx.id} transaction={tx} showDivider={index > 0} />
          ))}
        </Card>
      ) : (
        <Card style={styles.empty}>
          <AppText size="base" color={colors.textMuted} align="center">
            Chưa có giao dịch nào. Nhấn nút + để bắt đầu.
          </AppText>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.lg },
  list: { paddingVertical: spacing.xs },
  empty: { padding: 22 },
});
