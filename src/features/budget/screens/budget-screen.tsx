import { router } from 'expo-router';

import { ComingSoon } from '@/src/components/coming-soon';

export function BudgetScreen() {
  return (
    <ComingSoon
      title="Ngân sách"
      icon="pie"
      headline="Ngân sách đang được hoàn thiện"
      description="Bạn sẽ sớm đặt được hạn mức chi tiêu cho từng danh mục và nhận cảnh báo khi sắp vượt."
      actionLabel="Về Tổng quan"
      onAction={() => router.navigate('/')}
    />
  );
}
