import { categoryPalette as p } from '@/src/theme';

import type { Category, CategoryId, ExpenseCategoryId, IncomeCategoryId, TransactionType, WalletId } from './types';

const DOTS_ICON =
  'M4 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM17 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z';

export const CATEGORIES: Record<CategoryId, Category> = {
  food: { id: 'food', name: 'Ăn uống', color: p.orange, icon: 'M4 3v7a3 3 0 0 0 3 3v8M10 3v7M7 3v4M17 21V3c-2 1-3 4-3 8h3' },
  move: {
    id: 'move',
    name: 'Di chuyển',
    color: p.blue,
    icon: 'M3 16v-4l2.2-5.2A2 2 0 0 1 7 5.5h10a2 2 0 0 1 1.8 1.3L21 12v4M3 12h18M9 17h6M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  shop: { id: 'shop', name: 'Mua sắm', color: p.pink, icon: 'M6 7h12l1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 7zM9 10V6a3 3 0 0 1 6 0v4' },
  bill: { id: 'bill', name: 'Hóa đơn', color: p.purple, icon: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6M9 16h3' },
  fun: {
    id: 'fun',
    name: 'Giải trí',
    color: p.yellow,
    icon: 'M6 11h4M8 9v4M15 12h.01M18 10h.01M7 6h10a4 4 0 0 1 4 4v3a4 4 0 0 1-7 2.6L13 15h-2l-1 .6A4 4 0 0 1 3 13v-3a4 4 0 0 1 4-4z',
  },
  health: { id: 'health', name: 'Sức khỏe', color: p.teal, icon: 'M3 12h4l2-5 4 10 2-5h6' },
  edu: { id: 'edu', name: 'Giáo dục', color: p.sky, icon: 'M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20M8 7h8' },
  other: { id: 'other', name: 'Khác', color: p.gray, icon: DOTS_ICON },
  salary: {
    id: 'salary',
    name: 'Lương',
    color: p.green,
    icon: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18',
  },
  bonus: {
    id: 'bonus',
    name: 'Thưởng',
    color: p.yellow,
    icon: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8S10.5 3 8 4s-1 4 4 4zM12 8s1.5-5 4-4 1 4-4 4z',
  },
  invest: { id: 'invest', name: 'Đầu tư', color: p.blue, icon: 'M3 17l6-6 4 4 8-8M15 7h6v6' },
  sell: { id: 'sell', name: 'Bán đồ', color: p.pink, icon: 'M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9zM8 8h.01' },
  gift: {
    id: 'gift',
    name: 'Được tặng',
    color: p.orange,
    icon: 'M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z',
  },
  side: { id: 'side', name: 'Làm thêm', color: p.purple, icon: 'M4 5h16v11H4zM2 19h20' },
  refund: { id: 'refund', name: 'Hoàn tiền', color: p.teal, icon: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5' },
  iother: { id: 'iother', name: 'Khác', color: p.gray, icon: DOTS_ICON },
};

export const EXPENSE_CATEGORY_IDS: ExpenseCategoryId[] = ['food', 'move', 'shop', 'bill', 'fun', 'health', 'edu', 'other'];
export const INCOME_CATEGORY_IDS: IncomeCategoryId[] = ['salary', 'bonus', 'invest', 'sell', 'gift', 'side', 'refund', 'iother'];

export const CATEGORY_IDS_BY_TYPE: Record<TransactionType, CategoryId[]> = {
  expense: EXPENSE_CATEGORY_IDS,
  income: INCOME_CATEGORY_IDS,
};

export const WALLETS: Record<WalletId, string> = {
  cash: 'Tiền mặt',
  bank: 'Ngân hàng',
  ewallet: 'Ví điện tử',
};

export const WALLET_IDS = Object.keys(WALLETS) as WalletId[];
