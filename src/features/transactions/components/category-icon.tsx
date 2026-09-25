import { StyleSheet, View } from 'react-native';

import { Icon } from '@/src/components/ui/icon';
import { colors, withAlpha } from '@/src/theme';

import { CATEGORIES } from '../constants';
import type { CategoryId } from '../types';

type CategoryIconProps = {
  categoryId: CategoryId;
  size?: number;
  /** Filled circle with white icon (selected state in the category grid). */
  filled?: boolean;
};

export function CategoryIcon({ categoryId, size = 42, filled }: CategoryIconProps) {
  const category = CATEGORIES[categoryId];
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: filled ? category.color : withAlpha(category.color, '1C'),
        },
      ]}>
      <Icon path={category.icon} size={size >= 50 ? 22 : 20} color={filled ? colors.onPrimary : category.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
