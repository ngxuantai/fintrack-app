import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/src/components/ui/icon';
import { colors, fontFamily, fontSize, radii, shadows, spacing } from '@/src/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  filterOpen: boolean;
  filterActive: boolean;
  onToggleFilter: () => void;
};

export function SearchBar({ value, onChangeText, filterOpen, filterActive, onToggleFilter }: SearchBarProps) {
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <Icon name="search" size={20} color={colors.textMuted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Tìm giao dịch, ghi chú…"
          placeholderTextColor={colors.placeholder}
          returnKeyType="search"
          clearButtonMode="while-editing"
          style={styles.input}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Lọc theo ví"
        accessibilityState={{ expanded: filterOpen }}
        onPress={onToggleFilter}
        style={[styles.filter, filterOpen && styles.filterOpen]}>
        <Icon name="filter" size={20} color={filterOpen ? colors.onPrimary : colors.text} />
        {filterActive ? <View style={styles.dot} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.lg },
  field: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing['2xl'],
    backgroundColor: colors.surface,
    borderRadius: radii['2xl'],
    ...shadows.xs,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
    color: colors.text,
    paddingVertical: 0,
  },
  filter: {
    width: 48,
    height: 48,
    borderRadius: radii['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    ...shadows.xs,
  },
  filterOpen: { backgroundColor: colors.primary },
  dot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
});
