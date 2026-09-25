import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Card } from '@/src/components/ui/card';
import { formatMoney } from '@/src/lib/format';
import { colors, radii, spacing } from '@/src/theme';

import type { CategorySlice } from '../types';

import { DonutChart } from './donut-chart';

type CategorySpendingCardProps = {
  slices: CategorySlice[];
  total: number;
  periodLabel: string;
};

export function CategorySpendingCard({ slices, total, periodLabel }: CategorySpendingCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <AppText size="lg" weight="semibold">
          Chi tiêu theo danh mục
        </AppText>
        <AppText size="sm" color={colors.textMuted}>
          {periodLabel}
        </AppText>
      </View>
      <View style={styles.body}>
        <DonutChart
          segments={slices.map((s) => ({ key: s.key, color: s.color, value: s.amount }))}
          centerLabel="Tổng chi"
          centerValue={formatMoney(total)}
        />
        <View style={styles.legend}>
          {slices.map((slice) => (
            <View key={slice.key} style={styles.legendRow}>
              <View style={[styles.swatch, { backgroundColor: slice.color }]} />
              <AppText size="md" color={colors.textSecondary} numberOfLines={1} style={styles.legendName}>
                {slice.name}
              </AppText>
              <AppText size="md" weight="semibold" tabular>
                {`${slice.percent}%`}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing['2xl'],
  },
  body: { flexDirection: 'row', alignItems: 'center', gap: spacing['4xl'] },
  legend: { flex: 1, minWidth: 0, gap: 9 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  swatch: { width: 10, height: 10, borderRadius: radii.sm },
  legendName: { flex: 1 },
});
