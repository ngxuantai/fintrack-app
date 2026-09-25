import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { formatMoney, MASKED_MONEY } from '@/src/lib/format';
import { colors, radii, shadows, spacing } from '@/src/theme';

import { BalanceStat } from './balance-stat';

type BalanceCardProps = {
  balance: number;
  monthIncome: number;
  monthExpense: number;
  hidden: boolean;
  onToggleHidden: () => void;
};

export function BalanceCard({ balance, monthIncome, monthExpense, hidden, onToggleHidden }: BalanceCardProps) {
  const show = (value: number) => (hidden ? MASKED_MONEY : formatMoney(value));

  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
        <View style={[styles.bubble, styles.bubbleLarge]} />
        <View style={[styles.bubble, styles.bubbleSmall]} />

        <View style={styles.header}>
          <AppText size="base" color={colors.primaryTint}>
            Tổng số dư
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Hiện số dư' : 'Ẩn số dư'}
            onPress={onToggleHidden}
            hitSlop={6}
            style={({ pressed }) => [styles.toggle, pressed && styles.togglePressed]}>
            <Icon name={hidden ? 'eyeOff' : 'eye'} size={20} color={colors.onPrimary} />
          </Pressable>
        </View>

        <AppText size="7xl" weight="bold" tabular color={colors.onPrimary} style={styles.balance}>
          {show(balance)}
        </AppText>

        <View style={styles.stats}>
          <BalanceStat label="Thu tháng này" value={show(monthIncome)} icon="arrowDownLeft" iconColor={colors.income} />
          <BalanceStat label="Chi tháng này" value={show(monthExpense)} icon="arrowUpRight" iconColor={colors.expense} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { borderRadius: radii['5xl'], ...shadows.balanceCard },
  card: {
    overflow: 'hidden',
    backgroundColor: colors.primary,
    borderRadius: radii['5xl'],
    padding: spacing['5xl'],
  },
  bubble: { position: 'absolute', borderRadius: 999 },
  bubbleLarge: { right: -50, top: -70, width: 190, height: 190, backgroundColor: colors.whiteBubble },
  bubbleSmall: { right: 60, top: -110, width: 170, height: 170, backgroundColor: colors.whiteBubbleFaint },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggle: {
    width: 36,
    height: 36,
    borderRadius: radii.lg,
    backgroundColor: colors.whiteOverlayStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePressed: { backgroundColor: colors.whiteOverlayPressed },
  balance: { letterSpacing: -0.6, marginTop: spacing.sm, marginBottom: spacing['4xl'] },
  stats: { flexDirection: 'row', gap: spacing.lg },
});
