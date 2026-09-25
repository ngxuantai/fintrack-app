import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { colors, radii, spacing } from '@/src/theme';

type ReceiptAttachmentProps = {
  attached: boolean;
  onToggle: () => void;
  // UI-only phase: placeholder file info until image picking is implemented.
  fileName?: string;
  fileSize?: string;
};

export function ReceiptAttachment({ attached, onToggle, fileName = 'hoa-don.jpg', fileSize = '1,2 MB' }: ReceiptAttachmentProps) {
  return (
    <View style={styles.container}>
      {attached ? (
        <View style={styles.file}>
          <View style={styles.thumb} />
          <View style={styles.fileText}>
            <AppText size="base" weight="medium" numberOfLines={1}>
              {fileName}
            </AppText>
            <AppText size="sm" color={colors.textMuted}>
              {fileSize}
            </AppText>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Xóa ảnh" onPress={onToggle} style={styles.remove}>
            <Icon name="close" size={16} color={colors.textMuted} strokeWidth={2} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={onToggle}
          style={({ pressed }) => [styles.attach, pressed && styles.attachPressed]}>
          <Icon name="camera" size={20} color={colors.textSecondary} />
          <AppText size="base" color={colors.textSecondary}>
            Đính kèm ảnh hóa đơn{' '}
            <AppText size="base" color={colors.textSubtle}>
              (tùy chọn)
            </AppText>
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: spacing.xl },
  attach: {
    height: 56,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderDashed,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  attachPressed: { borderColor: colors.primary },
  file: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceMuted,
  },
  // Placeholder thumbnail until real images are attached.
  thumb: { width: 44, height: 44, borderRadius: radii.md, backgroundColor: colors.border },
  fileText: { flex: 1 },
  remove: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
