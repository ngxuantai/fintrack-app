import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import { AppText } from '@/src/components/ui/app-text';
import { colors, spacing } from '@/src/theme';

type DonutChartProps = {
  segments: { key: string; color: string; value: number }[];
  centerLabel: string;
  centerValue: string;
  size?: number;
  thickness?: number;
};

/** Gap between segments, in degrees (matches the white separators in the design). */
const GAP_DEG = 1.5;

export function DonutChart({ segments, centerLabel, centerValue, size = 140, thickness = 20 }: DonutChartProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const visible = segments.filter((s) => s.value > 0);
  const gap = visible.length > 1 ? GAP_DEG : 0;

  let startDeg = 0;
  const arcs = visible.map((segment) => {
    const deg = (segment.value / total) * 360;
    const length = (Math.max(deg - gap, 0) / 360) * circumference;
    const arc = { ...segment, length, rotation: startDeg - 90 };
    startDeg += deg;
    return arc;
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {total === 0 ? (
          <Circle cx={center} cy={center} r={radius} stroke={colors.chartEmpty} strokeWidth={thickness} fill="none" />
        ) : (
          arcs.map((arc) => (
            <G key={arc.key} rotation={arc.rotation} origin={`${center}, ${center}`}>
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={arc.color}
                strokeWidth={thickness}
                strokeDasharray={`${arc.length} ${circumference}`}
                fill="none"
              />
            </G>
          ))
        )}
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]} pointerEvents="none">
        <AppText size="xs" color={colors.textMuted}>
          {centerLabel}
        </AppText>
        <AppText size="md" weight="bold" tabular>
          {centerValue}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', gap: spacing.xxs },
});
