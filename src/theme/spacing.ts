export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  '2xl': 14,
  '3xl': 16,
  '4xl': 18,
  '5xl': 20,
  '6xl': 24,
} as const;

/** Horizontal padding of every screen. */
export const screenPadding = spacing['5xl'];

/** Space reserved at the bottom of scrollable screens for the floating tab bar. */
export const tabBarClearance = 124;

export const radii = {
  xs: 3,
  sm: 4,
  md: 10,
  lg: 12,
  xl: 14,
  '2xl': 16,
  '3xl': 18,
  '4xl': 20,
  '5xl': 24,
  sheet: 28,
  full: 999,
} as const;
