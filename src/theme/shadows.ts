import type { ViewStyle } from 'react-native';

export const shadows = {
  xs: {
    boxShadow: [{ offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(21,26,45,0.05)' }],
  },
  card: {
    boxShadow: [
      { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(21,26,45,0.04)' },
      { offsetX: 0, offsetY: 6, blurRadius: 20, color: 'rgba(21,26,45,0.04)' },
    ],
  },
  popover: {
    boxShadow: [{ offsetX: 0, offsetY: 12, blurRadius: 32, spreadDistance: -8, color: 'rgba(21,26,45,0.22)' }],
  },
  tabBar: {
    boxShadow: [{ offsetX: 0, offsetY: -4, blurRadius: 24, color: 'rgba(21,26,45,0.06)' }],
  },
  toast: {
    boxShadow: [{ offsetX: 0, offsetY: 12, blurRadius: 28, spreadDistance: -10, color: 'rgba(21,26,45,0.5)' }],
  },
  primaryButton: {
    boxShadow: [{ offsetX: 0, offsetY: 10, blurRadius: 20, spreadDistance: -12, color: 'rgba(62,91,242,0.8)' }],
  },
  fab: {
    boxShadow: [{ offsetX: 0, offsetY: 10, blurRadius: 20, spreadDistance: -8, color: 'rgba(62,91,242,0.75)' }],
  },
  balanceCard: {
    boxShadow: [{ offsetX: 0, offsetY: 12, blurRadius: 24, spreadDistance: -14, color: 'rgba(62,91,242,0.7)' }],
  },
  segmentActive: {
    boxShadow: [{ offsetX: 0, offsetY: 1, blurRadius: 3, color: 'rgba(21,26,45,0.1)' }],
  },
  illustration: {
    boxShadow: [{ offsetX: 0, offsetY: 10, blurRadius: 22, spreadDistance: -10, color: 'rgba(62,91,242,0.45)' }],
  },
} satisfies Record<string, ViewStyle>;
