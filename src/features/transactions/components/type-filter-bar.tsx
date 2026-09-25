import { StyleSheet, View } from 'react-native';

import { Chip } from '@/src/components/ui/chip';
import { spacing } from '@/src/theme';

import type { MonthOption } from '../hooks/use-transaction-filters';
import type { TypeFilter } from '../types';

import { MonthPicker } from './month-picker';

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'expense', label: 'Chi' },
  { value: 'income', label: 'Thu' },
];

type TypeFilterBarProps = {
  type: TypeFilter;
  onTypeChange: (type: TypeFilter) => void;
  month: string;
  monthOptions: MonthOption[];
  onMonthChange: (month: string) => void;
};

export function TypeFilterBar({ type, onTypeChange, month, monthOptions, onMonthChange }: TypeFilterBarProps) {
  return (
    <View style={styles.row}>
      {TYPE_OPTIONS.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={type === option.value}
          onPress={() => onTypeChange(option.value)}
        />
      ))}
      <View style={styles.spacer} />
      <MonthPicker options={monthOptions} value={month} onChange={onMonthChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  spacer: { flex: 1 },
});
