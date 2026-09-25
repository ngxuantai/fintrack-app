import { addDays, toISODate } from '@/src/lib/date';

import type { CategoryId, Transaction, TransactionType, WalletId } from '../types';

/** Balance shown on the overview when using the mock data. */
export const MOCK_TOTAL_BALANCE = 42_680_000;

type SeedRow = [daysAgo: number, type: TransactionType, categoryId: CategoryId, amount: number, note: string, walletId: WalletId];

// Dates are relative to today so the demo data always looks fresh.
const SEED: SeedRow[] = [
  [0, 'expense', 'food', 55_000, 'Phở bò', 'cash'],
  [0, 'expense', 'move', 38_000, 'Grab đi làm', 'ewallet'],
  [0, 'expense', 'food', 49_000, 'Cà phê Highlands', 'ewallet'],
  [1, 'expense', 'bill', 620_000, 'Tiền điện', 'bank'],
  [1, 'income', 'refund', 120_000, 'Hoàn tiền Shopee', 'ewallet'],
  [1, 'expense', 'food', 45_000, 'Cơm tấm sườn', 'cash'],
  [2, 'expense', 'shop', 399_000, 'Áo thun Uniqlo', 'bank'],
  [2, 'expense', 'fun', 180_000, 'Xem phim CGV', 'ewallet'],
  [2, 'expense', 'move', 70_000, 'Đổ xăng', 'cash'],
  [3, 'expense', 'bill', 95_000, 'Tiền nước', 'bank'],
  [3, 'expense', 'bill', 220_000, 'Internet FPT', 'bank'],
  [3, 'expense', 'food', 50_000, 'Bún chả', 'cash'],
  [5, 'expense', 'shop', 486_000, 'Đi chợ WinMart', 'bank'],
  [5, 'income', 'side', 2_500_000, 'Thiết kế logo freelance', 'bank'],
  [7, 'expense', 'health', 350_000, 'Khám răng', 'cash'],
  [10, 'expense', 'fun', 250_000, 'Karaoke với bạn', 'cash'],
  [13, 'expense', 'edu', 1_200_000, 'Khóa học IELTS', 'bank'],
  [15, 'expense', 'food', 320_000, 'Lẩu cuối tuần', 'ewallet'],
  [20, 'expense', 'bill', 4_500_000, 'Tiền nhà', 'bank'],
  [20, 'income', 'salary', 18_000_000, 'Lương tháng này', 'bank'],
  [28, 'expense', 'shop', 890_000, "Giày Biti's", 'bank'],
  [51, 'expense', 'bill', 4_500_000, 'Tiền nhà', 'bank'],
  [51, 'income', 'salary', 18_000_000, 'Lương tháng trước', 'bank'],
];

export function createMockTransactions(today = new Date()): Transaction[] {
  return SEED.map(([daysAgo, type, categoryId, amount, note, walletId], index) => ({
    id: `seed-${index + 1}`,
    date: toISODate(addDays(today, -daysAgo)),
    type,
    categoryId,
    amount,
    note,
    walletId,
  }));
}
