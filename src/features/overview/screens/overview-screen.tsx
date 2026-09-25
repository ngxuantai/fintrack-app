import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SegmentedControl } from '@/src/components/ui/segmented-control';
import { useTotalBalance } from '@/src/features/transactions';
import { colors, screenPadding, spacing, tabBarClearance } from '@/src/theme';

import { BalanceCard } from '../components/balance-card';
import { CashflowChartCard } from '../components/cashflow-chart-card';
import { CategorySpendingCard } from '../components/category-spending-card';
import { GreetingHeader } from '../components/greeting-header';
import { RecentTransactions } from '../components/recent-transactions';
import { SectionHeader } from '../components/section-header';
import { MOCK_USER, PERIOD_OPTIONS } from '../constants';
import { useOverviewStats } from '../hooks/use-overview-stats';
import type { AnalyticsPeriod } from '../types';
import { greetingFor } from '../utils/analytics';

const RECENT_COUNT = 5;

export function OverviewScreen() {
  const insets = useSafeAreaInsets();
  const [hidden, setHidden] = useState(false);
  const [period, setPeriod] = useState<AnalyticsPeriod>('month');
  const balance = useTotalBalance();
  const stats = useOverviewStats(period);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
      showsVerticalScrollIndicator={false}>
      <GreetingHeader
        greeting={greetingFor(stats.today)}
        name={MOCK_USER.name}
        initials={MOCK_USER.initials}
        hasNotifications
      />

      <BalanceCard
        balance={balance}
        monthIncome={stats.monthIncome}
        monthExpense={stats.monthExpense}
        hidden={hidden}
        onToggleHidden={() => setHidden((h) => !h)}
      />

      <SectionHeader
        title="Phân tích chi tiêu"
        right={<SegmentedControl options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />}
      />

      <CategorySpendingCard
        slices={stats.spending.slices}
        total={stats.spending.total}
        periodLabel={stats.spendingLabel}
      />

      <CashflowChartCard bars={stats.bars} scale={stats.barScale} />

      <RecentTransactions
        transactions={stats.transactions.slice(0, RECENT_COUNT)}
        onSeeAll={() => router.navigate('/transactions')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: screenPadding,
    paddingBottom: tabBarClearance,
    gap: spacing['4xl'],
  },
});
