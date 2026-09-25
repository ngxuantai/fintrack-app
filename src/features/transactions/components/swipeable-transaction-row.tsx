import { memo, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ReanimatedSwipeable, { type SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

import { AppText } from '@/src/components/ui/app-text';
import { Icon, type IconName } from '@/src/components/ui/icon';
import { colors, radii, spacing } from '@/src/theme';

import type { Transaction } from '../types';

import { TransactionRow } from './transaction-row';

const ACTIONS_WIDTH = 140;

type SwipeableTransactionRowProps = {
  transaction: Transaction;
  isFirst: boolean;
  isLast: boolean;
  onPress: (tx: Transaction) => void;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
  /** Called when this row opens, so the list can close the previously open row. */
  onOpen: (methods: SwipeableMethods) => void;
};

/** Transaction row that reveals "Sửa" / "Xóa" when swiped left. */
export const SwipeableTransactionRow = memo(function SwipeableTransactionRow({
  transaction,
  isFirst,
  isLast,
  onPress,
  onEdit,
  onDelete,
  onOpen,
}: SwipeableTransactionRowProps) {
  const ref = useRef<SwipeableMethods>(null);

  const runAndClose = (action: (tx: Transaction) => void) => () => {
    ref.current?.close();
    action(transaction);
  };

  return (
    <View style={[styles.container, isFirst && styles.first, isLast && styles.last]}>
      <ReanimatedSwipeable
        ref={ref}
        friction={1.5}
        rightThreshold={60}
        overshootRight={false}
        onSwipeableWillOpen={() => ref.current && onOpen(ref.current)}
        renderRightActions={() => (
          <View style={styles.actions}>
            <SwipeAction icon="edit" label="Sửa" bg={colors.secondary} fg={colors.text} onPress={runAndClose(onEdit)} />
            <SwipeAction icon="trash" label="Xóa" bg={colors.expense} fg={colors.onPrimary} onPress={runAndClose(onDelete)} />
          </View>
        )}>
        <Pressable accessibilityRole="button" accessibilityHint="Vuốt trái để sửa hoặc xóa" onPress={() => onPress(transaction)}>
          <TransactionRow transaction={transaction} showDivider={!isFirst} />
        </Pressable>
      </ReanimatedSwipeable>
    </View>
  );
});

type SwipeActionProps = { icon: IconName; label: string; bg: string; fg: string; onPress: () => void };

function SwipeAction({ icon, label, bg, fg, onPress }: SwipeActionProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.action, { backgroundColor: bg }]}>
      <Icon name={icon} size={18} color={fg} />
      <AppText size="sm" weight="semibold" color={fg}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', backgroundColor: colors.surface },
  first: { borderTopLeftRadius: radii['3xl'], borderTopRightRadius: radii['3xl'] },
  last: { borderBottomLeftRadius: radii['3xl'], borderBottomRightRadius: radii['3xl'] },
  actions: { width: ACTIONS_WIDTH, flexDirection: 'row' },
  action: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
});
