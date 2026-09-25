import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii, shadows, spacing } from '@/src/theme';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  icon?: IconName;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, variant = 'primary', size = 'md', icon, fullWidth, style, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const fg = isPrimary ? colors.onPrimary : colors.primary;

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        size === 'lg' ? styles.lg : styles.md,
        isPrimary ? styles.primary : styles.outline,
        pressed && (isPrimary ? styles.primaryPressed : styles.outlinePressed),
        pressed && styles.pressed,
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...rest}>
      <View style={styles.content}>
        {icon ? <Icon name={icon} size={20} color={fg} strokeWidth={2} /> : null}
        <AppText size={size === 'lg' ? 'xl' : 'lg'} weight="semibold" color={fg}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['6xl'],
  },
  md: { height: 50, borderRadius: radii['2xl'] },
  lg: { height: 54, borderRadius: radii['2xl'] },
  primary: { backgroundColor: colors.primary, ...shadows.primaryButton },
  primaryPressed: { backgroundColor: colors.primaryPressed },
  outline: {
    height: 46,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    paddingHorizontal: 22,
  },
  outlinePressed: { backgroundColor: colors.primarySoft },
  pressed: { transform: [{ scale: 0.98 }] },
  fullWidth: { alignSelf: 'stretch' },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
