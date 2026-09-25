import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { IconButton } from '@/src/components/ui/icon-button';
import { colors, spacing } from '@/src/theme';

export function SheetHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <View>
      <View style={styles.grabber} />
      <View style={styles.row}>
        <IconButton icon="close" accessibilityLabel="Đóng" size={40} iconSize={20} onPress={onClose} />
        <AppText size="2xl" weight="bold" align="center" style={styles.title} accessibilityRole="header">
          {title}
        </AppText>
        <View style={styles.spacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grabber: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.grabber,
    marginTop: spacing.md,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingHorizontal: spacing['3xl'],
  },
  title: { flex: 1 },
  spacer: { width: 40 },
});
