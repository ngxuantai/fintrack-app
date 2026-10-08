import { categoryIcons } from '@/src/components/ui/icons';
import { categoryPalette } from '@/src/theme';

import { DEFAULT_CATEGORIES } from '../constants';
import type { Category, CategoryId } from '../types';

/** Built-in categories, shared by every user and never stored in Firestore. */
export const DEFAULT_CATEGORY_LIST: Category[] = DEFAULT_CATEGORIES.map((c, order) => ({
  id: c.id,
  type: c.type,
  name: c.name,
  color: categoryPalette[c.color],
  icon: categoryIcons[c.icon],
  order,
  isDefault: true,
  archived: false,
}));

const DEFAULT_IDS = new Set(DEFAULT_CATEGORY_LIST.map((c) => c.id));

export const isDefaultCategoryId = (id: CategoryId) => DEFAULT_IDS.has(id);

/** Defaults first (fixed order), then the user's own categories sorted by `order`. */
export function mergeCategories(custom: Category[]) {
  const own = custom.filter((c) => !isDefaultCategoryId(c.id)).sort((a, b) => a.order - b.order);
  const categories = [...DEFAULT_CATEGORY_LIST, ...own];
  return { categories, categoryById: Object.fromEntries(categories.map((c) => [c.id, c])) };
}

/** Neutral placeholder so a transaction whose category is missing still renders. */
export function resolveCategory(categoryById: Record<string, Category>, id: CategoryId): Category {
  return (
    categoryById[id] ?? {
      id,
      type: 'expense',
      name: 'Không rõ',
      color: categoryPalette.gray,
      icon: categoryIcons.dots,
      order: 0,
      isDefault: false,
      archived: true,
    }
  );
}
