import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon, type IconName } from '@/src/components/ui/icon';
import { colors, radii, spacing } from '@/src/theme';

type BalanceStatProps = {
  label: string;
  value: string;
  icon: IconName;
  iconColor: string;
};

/** Translucent tile inside the balance card (monthly income / expense). */
export function BalanceStat({ label, value, icon, iconColor }: BalanceStatProps) {
  return (
    <View style={styles.tile}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Icon name={icon} size={15} color={iconColor} strokeWidth={2.2} />
        </View>
        <AppText size="sm" color={colors.primaryTint}>
          {label}
        </AppText>
      </View>
      <AppText size="lg" weight="semibold" tabular color={colors.onPrimary} numberOfLines={1}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.whiteOverlay,
    borderRadius: radii['2xl'],
    padding: spacing.xl,
    gap: spacing.md,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
