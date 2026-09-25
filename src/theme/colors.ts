export const colors = {
  primary: '#3E5BF2',
  primaryPressed: '#2F4BE0',
  primarySoft: '#EEF1FF',
  primaryTint: '#DCE3FF',
  secondary: '#FFB23F',
  accent: '#FF5C8A',

  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceMuted: '#FAFBFD',
  surfaceSunken: '#E9ECF4',
  iconTile: '#F1F3F9',

  text: '#151A2D',
  textSecondary: '#3A4058',
  textMuted: '#5F6781',
  textSubtle: '#8A91A8',
  textDisabled: '#C3C9D9',
  placeholder: '#A3AAC0',
  amountPlaceholder: '#B4BACB',
  tabInactive: '#6B7390',
  onPrimary: '#FFFFFF',

  income: '#0A8A4A',
  expense: '#D92D46',
  expenseChart: '#FF6B7D',
  error: '#C2213A',
  errorSoft: '#FFF1F3',

  border: '#E6E9F2',
  borderDashed: '#C3C9D9',
  divider: '#F0F2F7',
  dividerStrong: '#EEF0F5',
  grabber: '#D5DAE6',
  chartEmpty: '#EEF0F6',
  backdrop: 'rgba(21,26,45,0.42)',

  // Balance card overlays
  whiteOverlay: 'rgba(255,255,255,0.14)',
  whiteOverlayStrong: 'rgba(255,255,255,0.16)',
  whiteOverlayPressed: 'rgba(255,255,255,0.24)',
  whiteBubble: 'rgba(255,255,255,0.09)',
  whiteBubbleFaint: 'rgba(255,255,255,0.06)',

  // Avatar
  avatarBg: '#FFE3B8',
  avatarText: '#7A4B00',

  // Coming soon
  warningSoft: '#FFF1DC',
  warning: '#E08A00',
  badgeText: '#B0164E',
  badgeBg: '#FFE4EC',

  // Empty state illustration
  illustrationBg: '#E8ECFF',
  illustrationLine: '#C9D2FF',

  // Toast
  toastBg: '#151A2D',
  toastSuccess: '#5EE39A',
  toastAction: '#AFC0FF',
} as const;

/** Palette used by transaction categories and chart series. */
export const categoryPalette = {
  orange: '#FF7A2F',
  blue: '#3B82F6',
  pink: '#EC4899',
  purple: '#8B5CF6',
  yellow: '#E9A800',
  yellowChart: '#F5B400',
  teal: '#14B8A6',
  sky: '#0EA5E9',
  green: '#0A8A4A',
  gray: '#8A94AD',
  grayChart: '#A3ACC2',
} as const;

/** Appends an alpha channel (00–FF) to a #RRGGBB color. */
export function withAlpha(hex: string, alpha: string) {
  return `${hex}${alpha}`;
}
