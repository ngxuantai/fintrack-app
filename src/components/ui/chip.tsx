import { Pressable, StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/src/theme';

import { AppText } from './app-text';

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  /**
   * `solid` – filled primary when selected (type filter).
   * `soft` – tinted primary with primary border when selected (wallet chips).
   * `pill` – soft, on a muted background (wallet picker in forms).
   */
  variant?: 'solid' | 'soft' | 'pill';
  size?: 'sm' | 'md';
};

export function Chip({ label, selected, onPress, variant = 'solid', size = 'md' }: ChipProps) {
  const palette = getPalette(variant, selected);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.base,
        size === 'md' ? styles.md : styles.sm,
        variant === 'pill' && styles.pill,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ]}>
      <AppText
        size={size === 'md' ? 'base' : 'md'}
        weight={size === 'md' ? 'semibold' : 'medium'}
        color={palette.fg}>
        {label}
      </AppText>
    </Pressable>
  );
}

function getPalette(variant: ChipProps['variant'], selected: boolean) {
  if (variant === 'solid') {
    return selected
      ? { bg: colors.primary, fg: colors.onPrimary, border: colors.primary }
      : { bg: colors.surface, fg: colors.text, border: colors.border };
  }
  if (variant === 'pill') {
    return selected
      ? { bg: colors.primarySoft, fg: colors.primary, border: colors.primary }
      : { bg: colors.background, fg: colors.textSecondary, border: colors.background };
  }
  return selected
    ? { bg: colors.primarySoft, fg: colors.primary, border: colors.primary }
    : { bg: colors.surface, fg: colors.textSecondary, border: colors.border };
}

const styles = StyleSheet.create({
  base: { borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  md: { height: 36, paddingHorizontal: spacing['3xl'], borderRadius: radii.lg },
  sm: { height: 32, paddingHorizontal: spacing.xl, borderRadius: radii.md },
  pill: { height: 34, borderWidth: 1.5 },
});
