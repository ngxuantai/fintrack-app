import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/src/components/ui/app-text';
import { Icon, type IconName } from '@/src/components/ui/icon';
import { colors, radii, shadows, spacing } from '@/src/theme';

export type TabMeta = { label: string; icon: IconName };

type TabBarProps = BottomTabBarProps & {
  /** Label + icon per route name, in display order. */
  tabs: Record<string, TabMeta>;
  /** Handler for the raised "+" button in the middle. */
  onCenterPress: () => void;
  centerAccessibilityLabel: string;
};

/**
 * Floating tab bar with a raised action button in the middle.
 * Rendered absolutely, so scrollable screens must reserve `tabBarClearance` at the bottom.
 */
export function TabBar({ state, navigation, tabs, onCenterPress, centerAccessibilityLabel }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const routes = state.routes.filter((route) => tabs[route.name]);
  const middle = Math.ceil(routes.length / 2);

  const renderTab = (route: (typeof state.routes)[number]) => {
    const meta = tabs[route.name];
    const focused = state.routes[state.index]?.key === route.key;
    const color = focused ? colors.primary : colors.tabInactive;

    const onPress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
    };

    return (
      <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={meta.label}
        onPress={onPress}
        style={styles.tab}>
        <Icon name={meta.icon} size={24} color={color} />
        <AppText size="xs" weight="semibold" color={color}>
          {meta.label}
        </AppText>
      </Pressable>
    );
  };

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      {routes.slice(0, middle).map(renderTab)}
      <View style={styles.centerSlot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={centerAccessibilityLabel}
          onPress={onCenterPress}
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}>
          <Icon name="plus" size={26} color={colors.onPrimary} strokeWidth={2.2} />
        </Pressable>
      </View>
      {routes.slice(middle).map(renderTab)}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii['5xl'],
    borderTopRightRadius: radii['5xl'],
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    ...shadows.tabBar,
  },
  tab: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.xs,
  },
  centerSlot: { flex: 1, alignItems: 'center' },
  fab: {
    width: 60,
    height: 60,
    marginTop: -28,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: colors.surface,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
  },
  fabPressed: { backgroundColor: colors.primaryPressed },
});
