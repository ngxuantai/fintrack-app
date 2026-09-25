import { Tabs } from 'expo-router';

import { TabBar, type TabMeta } from '@/src/components/navigation/tab-bar';
import { openTransactionForm } from '@/src/features/transactions';

const TABS: Record<string, TabMeta> = {
  index: { label: 'Tổng quan', icon: 'home' },
  transactions: { label: 'Giao dịch', icon: 'list' },
  budget: { label: 'Ngân sách', icon: 'pie' },
  profile: { label: 'Cá nhân', icon: 'user' },
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <TabBar
          {...props}
          tabs={TABS}
          onCenterPress={() => openTransactionForm()}
          centerAccessibilityLabel="Thêm giao dịch"
        />
      )}>
      <Tabs.Screen name="index" options={{ title: TABS.index.label }} />
      <Tabs.Screen name="transactions" options={{ title: TABS.transactions.label }} />
      <Tabs.Screen name="budget" options={{ title: TABS.budget.label }} />
      <Tabs.Screen name="profile" options={{ title: TABS.profile.label }} />
    </Tabs>
  );
}
