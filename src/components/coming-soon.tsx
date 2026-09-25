import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/src/components/ui/app-text';
import { Button } from '@/src/components/ui/button';
import { Icon, type IconName } from '@/src/components/ui/icon';
import { ScreenTitle } from '@/src/components/ui/screen-title';
import { colors, radii, screenPadding, spacing } from '@/src/theme';

type ComingSoonProps = {
  title: string;
  icon: IconName;
  headline: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

/** Placeholder screen for tabs that ship in a later phase. */
export function ComingSoon({ title, icon, headline, description, actionLabel, onAction }: ComingSoonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.lg }]}>
      <ScreenTitle>{title}</ScreenTitle>
      <View style={styles.body}>
        <View style={styles.illustration}>
          <Icon name={icon} size={52} color={colors.warning} strokeWidth={1.6} />
          <View style={styles.dot} />
        </View>
        <View style={styles.badge}>
          <AppText size="sm" weight="semibold" color={colors.badgeText}>
            Sắp ra mắt
          </AppText>
        </View>
        <AppText size="5xl" weight="bold" align="center">
          {headline}
        </AppText>
        <AppText size="base" color={colors.textMuted} align="center" style={styles.description}>
          {description}
        </AppText>
        <Button variant="outline" label={actionLabel} onPress={onAction} style={styles.action} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: screenPadding,
    paddingBottom: 84,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingBottom: 40,
  },
  illustration: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.warningSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  dot: {
    position: 'absolute',
    right: 6,
    top: 10,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    borderWidth: 3,
    borderColor: colors.background,
  },
  badge: {
    backgroundColor: colors.badgeBg,
    borderRadius: radii.full,
    paddingVertical: 5,
    paddingHorizontal: spacing.xl,
  },
  description: { lineHeight: 22, maxWidth: 290 },
  action: { marginTop: spacing.lg },
});
