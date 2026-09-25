import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { formatNumber } from '@/src/lib/format';
import { colors, fontFamily, fontSize, radii, spacing } from '@/src/theme';

import type { TransactionType } from '../../types';

type AmountInputProps = {
  type: TransactionType;
  /** Digits only. */
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

// Approximate glyph widths at 46px bold, so the input hugs its content and "₫" sits right after it.
const DIGIT_WIDTH = 28;
const DOT_WIDTH = 12;

export function AmountInput({ type, value, onChangeText, error }: AmountInputProps) {
  const display = value ? formatNumber(parseInt(value, 10)) : '';
  const shown = display || '0';
  const digits = shown.replace(/\./g, '').length;
  const width = digits * DIGIT_WIDTH + (shown.length - digits) * DOT_WIDTH + 6;
  const color = value ? (type === 'expense' ? colors.expense : colors.income) : colors.amountPlaceholder;

  return (
    <View style={[styles.box, error ? styles.boxError : null]}>
      <AppText size="md" color={colors.textMuted}>
        {type === 'expense' ? 'Số tiền chi' : 'Số tiền thu'}
      </AppText>
      <View style={styles.row}>
        <TextInput
          value={display}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor={colors.amountPlaceholder}
          accessibilityLabel="Số tiền"
          style={[styles.input, { width, color }]}
        />
        <AppText size="6xl" weight="semibold" color={color}>
          ₫
        </AppText>
      </View>
      {error ? (
        <View style={styles.error} accessibilityLiveRegion="polite">
          <Icon name="alertCircle" size={16} color={colors.error} strokeWidth={2} />
          <AppText size="md" weight="medium" color={colors.error}>
            {error}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing['3xl'],
    borderRadius: radii['4xl'],
    borderWidth: 1.5,
    borderColor: colors.surface,
    backgroundColor: colors.surface,
  },
  boxError: { backgroundColor: colors.errorSoft, borderColor: colors.expense },
  row: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: spacing.sm, maxWidth: '100%' },
  input: {
    maxWidth: 280,
    padding: 0,
    textAlign: 'right',
    fontFamily: fontFamily.bold,
    fontSize: fontSize.display,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  error: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
