import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radii, shadows, spacing } from '@/src/theme';

import { AppText } from './app-text';

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  /** Background of the active segment. Defaults to white (raised pill style). */
  activeColor?: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** `compact` = small pills (period switch); `stretch` = full-width segments (type switch). */
  size?: 'compact' | 'stretch';
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'compact',
}: SegmentedControlProps<T>) {
  const stretch = size === 'stretch';

  return (
    <View style={[styles.track, stretch ? styles.trackStretch : styles.trackCompact]}>
      {options.map((option) => {
        const active = option.value === value;
        const filled = active && option.activeColor;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[
              stretch ? styles.segmentStretch : styles.segmentCompact,
              active && (filled ? { backgroundColor: option.activeColor } : styles.segmentRaised),
            ]}>
            <AppText
              size={stretch ? 'lg' : 'md'}
              weight="semibold"
              color={filled ? colors.onPrimary : active ? colors.primary : colors.textMuted}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', backgroundColor: colors.surfaceSunken },
  trackCompact: { borderRadius: radii.lg, padding: 3, gap: spacing.xxs },
  trackStretch: { borderRadius: radii.xl, padding: spacing.xs, gap: spacing.xs },
  segmentCompact: {
    height: 32,
    paddingHorizontal: spacing['2xl'],
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentStretch: {
    flex: 1,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentRaised: { backgroundColor: colors.surface, ...shadows.segmentActive },
});
