import { router } from 'expo-router';

import { ComingSoon } from '@/src/components/coming-soon';

export function ProfileScreen() {
  return (
    <ComingSoon
      title="Cá nhân"
      icon="user"
      headline="Trang cá nhân sắp có"
      description="Quản lý hồ sơ, ví, danh mục và cài đặt bảo mật sẽ có trong bản cập nhật tới."
      actionLabel="Về Tổng quan"
      onAction={() => router.navigate('/')}
    />
  );
}
