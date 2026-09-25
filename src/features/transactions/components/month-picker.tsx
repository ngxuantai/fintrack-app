import { useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { colors, radii, shadows, spacing } from '@/src/theme';

import type { MonthOption } from '../hooks/use-transaction-filters';

type MonthPickerProps = {
  options: MonthOption[];
  value: string;
  onChange: (value: string) => void;
};

type Anchor = { top: number; right: number };

/** Month button with a dropdown menu anchored below it. */
export function MonthPicker({ options, value, onChange }: MonthPickerProps) {
  const buttonRef = useRef<View>(null);
  const { width } = useWindowDimensions();
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  const open = () => {
    buttonRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ top: y + h + spacing.sm, right: width - (x + w) });
    });
  };
  const close = () => setAnchor(null);

  return (
    <>
      <Pressable
        ref={buttonRef}
        accessibilityRole="button"
        accessibilityLabel={`Chọn tháng, đang chọn ${selected.label}`}
        onPress={open}
        style={styles.button}>
        <Icon name="calendar" size={16} color={colors.textMuted} />
        <AppText size="base" weight="semibold">
          {selected.shortLabel}
        </AppText>
        <Icon name="chevronDown" size={16} color={colors.textMuted} strokeWidth={2} />
      </Pressable>

      <Modal visible={anchor !== null} transparent animationType="fade" onRequestClose={close}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityLabel="Đóng" />
        {anchor ? (
          <View style={[styles.menu, anchor]}>
            {options.map((option) => {
              const active = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: active }}
                  onPress={() => {
                    onChange(option.value);
                    close();
                  }}
                  style={[styles.item, active && styles.itemActive]}>
                  <AppText size="base" weight={active ? 'semibold' : 'regular'} color={active ? colors.primary : colors.text}>
                    {option.label}
                  </AppText>
                  {active ? <Icon name="check" size={16} color={colors.primary} strokeWidth={2.2} /> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    paddingLeft: spacing.xl,
    paddingRight: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  menu: {
    position: 'absolute',
    width: 170,
    padding: spacing.sm,
    gap: spacing.xxs,
    backgroundColor: colors.surface,
    borderRadius: radii['2xl'],
    ...shadows.popover,
  },
  item: {
    height: 40,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemActive: { backgroundColor: colors.primarySoft },
});
