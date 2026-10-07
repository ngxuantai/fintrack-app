import { categoryPalette } from '@/src/theme';

import { CATEGORY_ICONS } from '../constants';
import type { Category, CategoryId } from '../types';

/** Neutral placeholder so a transaction whose category is missing still renders. */
export function resolveCategory(categoryById: Record<string, Category>, id: CategoryId): Category {
  return (
    categoryById[id] ?? {
      id,
      type: 'expense',
      name: 'Không rõ',
      color: categoryPalette.gray,
      icon: CATEGORY_ICONS.dots,
      order: 0,
      isDefault: false,
      archived: true,
    }
  );
}
