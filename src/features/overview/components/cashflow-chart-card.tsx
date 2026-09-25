import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Card } from '@/src/components/ui/card';
import { colors, spacing } from '@/src/theme';

import type { CashflowBar } from '../types';

const PLOT_HEIGHT = 130;
const MIN_BAR_HEIGHT = 3;
const AXIS_WIDTH = 34;

type CashflowChartCardProps = {
  bars: CashflowBar[];
  /** Axis max, in millions. */
  scale: number;
};

export function CashflowChartCard({ bars, scale }: CashflowChartCardProps) {
  const toHeight = (value: number) => Math.max(MIN_BAR_HEIGHT, Math.round((value / scale) * PLOT_HEIGHT));
  const gridLabels = [`${scale}tr`, `${scale / 2}tr`, '0'];

  return (
    <Card>
      <View style={styles.header}>
        <AppText size="lg" weight="semibold">
          Thu – chi 6 tháng
        </AppText>
        <View style={styles.legend}>
          <LegendDot color={colors.income} label="Thu" />
          <LegendDot color={colors.expenseChart} label="Chi" />
        </View>
      </View>

      <View style={styles.chart}>
        <View style={styles.grid} pointerEvents="none">
          {gridLabels.map((label) => (
            <View key={label} style={styles.gridRow}>
              <AppText size="2xs" color={colors.textSubtle} align="right" style={styles.gridLabel}>
                {label}
              </AppText>
              <View style={styles.gridLine} />
            </View>
          ))}
        </View>

        {bars.map((bar) => (
          <View key={bar.label} style={styles.column}>
            <View style={styles.barPair}>
              <View style={[styles.bar, { height: toHeight(bar.income), backgroundColor: colors.income }]} />
              <View style={[styles.bar, { height: toHeight(bar.expense), backgroundColor: colors.expenseChart }]} />
            </View>
            <AppText
              size="xs"
              weight={bar.current ? 'bold' : 'medium'}
              color={bar.current ? colors.text : colors.textSubtle}>
              {bar.label}
            </AppText>
          </View>
        ))}
      </View>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <AppText size="sm" color={colors.textMuted}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  legend: { flexDirection: 'row', gap: spacing.xl },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  chart: { height: 150, flexDirection: 'row', gap: spacing.xs, paddingLeft: AXIS_WIDTH },
  grid: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: PLOT_HEIGHT,
    justifyContent: 'space-between',
  },
  gridRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, height: 0 },
  gridLabel: { width: 28 },
  gridLine: { flex: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border },
  column: { flex: 1, alignItems: 'center', gap: spacing.md },
  barPair: { height: PLOT_HEIGHT, flexDirection: 'row', alignItems: 'flex-end', gap: spacing.xs },
  bar: { width: 10, borderRadius: 5 },
});
