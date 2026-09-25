import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon, type IconName } from '@/src/components/ui/icon';
import { colors, radii, spacing } from '@/src/theme';

type FormRowProps = {
  icon: IconName;
  label: string;
  children: ReactNode;
  /** Content to the right (chevron…). */
  trailing?: ReactNode;
  align?: 'center' | 'flex-start';
  gap?: number;
};

/** Icon tile + small label + field, used inside the details card. */
export function FormRow({ icon, label, children, trailing, align = 'center', gap = 1 }: FormRowProps) {
  return (
    <View style={[styles.row, { alignItems: align }]}>
      <View style={styles.tile}>
        <Icon name={icon} size={20} color={colors.textSecondary} />
      </View>
      <View style={[styles.body, { gap }]}>
        <AppText size="sm" color={colors.textMuted}>
          {label}
        </AppText>
        {children}
      </View>
      {trailing}
    </View>
  );
}

export function FormDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.xl, paddingVertical: spacing.xl },
  tile: {
    width: 38,
    height: 38,
    borderRadius: radii.lg,
    backgroundColor: colors.iconTile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  divider: { height: 1, backgroundColor: colors.divider },
});
