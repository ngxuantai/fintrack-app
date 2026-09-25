import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, shadows } from '@/src/theme';

import { Icon, type IconName } from './icon';

type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  accessibilityLabel: string;
  size?: number;
  iconSize?: number;
  iconColor?: string;
  /** Shows the small pink notification dot. */
  badge?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Round white button with an icon (bell, close…). */
export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  size = 44,
  iconSize = 22,
  iconColor = colors.text,
  badge,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
        pressed && styles.pressed,
        style,
      ]}>
      <Icon name={icon} size={iconSize} color={iconColor} strokeWidth={size < 44 ? 2 : 1.8} />
      {badge ? <View style={styles.badge} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    ...shadows.xs,
  },
  pressed: { opacity: 0.7 },
  badge: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.surface,
  },
});
