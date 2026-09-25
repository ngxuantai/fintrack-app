import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { colors, radii, spacing, withAlpha } from '@/src/theme';

import { CATEGORIES, CATEGORY_IDS_BY_TYPE } from '../../constants';
import type { CategoryId, TransactionType } from '../../types';
import { CategoryIcon } from '../category-icon';

type CategoryGridProps = {
  type: TransactionType;
  value: CategoryId;
  onChange: (id: CategoryId) => void;
  onAddCategory?: () => void;
};

const COLUMNS = 5;

export function CategoryGrid({ type, value, onChange, onAddCategory }: CategoryGridProps) {
  return (
    <View style={styles.card}>
      <AppText size="base" weight="semibold" style={styles.title}>
        Danh mục
      </AppText>
      <View style={styles.grid}>
        {CATEGORY_IDS_BY_TYPE[type].map((id) => {
          const selected = id === value;
          const color = CATEGORIES[id].color;
          return (
            <Pressable
              key={id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onChange(id)}
              style={styles.cell}>
              <View style={[styles.ring, selected && { borderColor: withAlpha(color, '55') }]}>
                <CategoryIcon categoryId={id} size={50} filled={selected} />
              </View>
              <AppText size="xs" weight={selected ? 'semibold' : 'regular'} numberOfLines={1}>
                {CATEGORIES[id].name}
              </AppText>
            </Pressable>
          );
        })}
        <Pressable accessibilityRole="button" onPress={onAddCategory} style={styles.cell}>
          <View style={styles.ring}>
            <View style={styles.add}>
              <Icon name="plus" size={20} color={colors.textMuted} strokeWidth={2} />
            </View>
          </View>
          <AppText size="xs" color={colors.textMuted}>
            Thêm
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii['4xl'],
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: { paddingHorizontal: spacing.sm, paddingBottom: spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing['2xl'] },
  cell: { width: `${100 / COLUMNS}%`, alignItems: 'center', gap: spacing.sm },
  // 3px gap + 2px ring (the selected "halo"); negative margin keeps it out of the layout.
  ring: { margin: -5, padding: 3, borderRadius: radii.full, borderWidth: 2, borderColor: 'transparent' },
  add: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderDashed,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
