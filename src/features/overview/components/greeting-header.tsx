import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { IconButton } from '@/src/components/ui/icon-button';
import { colors, spacing } from '@/src/theme';

type GreetingHeaderProps = {
  greeting: string;
  name: string;
  initials: string;
  hasNotifications?: boolean;
  onPressNotifications?: () => void;
};

export function GreetingHeader({ greeting, name, initials, hasNotifications, onPressNotifications }: GreetingHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <AppText size="xl" weight="bold" color={colors.avatarText}>
          {initials}
        </AppText>
      </View>
      <View style={styles.text}>
        <AppText size="md" color={colors.textMuted}>
          {greeting}
        </AppText>
        <AppText size="3xl" weight="bold" style={styles.name}>
          {name}
        </AppText>
      </View>
      <IconButton
        icon="bell"
        accessibilityLabel="Thông báo"
        badge={hasNotifications}
        onPress={onPressNotifications}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, minWidth: 0 },
  name: { letterSpacing: -0.2 },
});
