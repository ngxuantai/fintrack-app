import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
} from '@expo-google-fonts/be-vietnam-pro';

/** Font assets to load at startup with `useFonts`. */
export const fontAssets = {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
};

export const fontFamily = {
  regular: 'BeVietnamPro_400Regular',
  medium: 'BeVietnamPro_500Medium',
  semibold: 'BeVietnamPro_600SemiBold',
  bold: 'BeVietnamPro_700Bold',
} as const;

export type FontWeight = keyof typeof fontFamily;

export const fontSize = {
  '2xs': 10,
  xs: 11,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 16,
  '2xl': 17,
  '3xl': 18,
  '4xl': 19,
  '5xl': 20,
  '6xl': 26,
  '7xl': 32,
  display: 46,
} as const;

export type FontSize = keyof typeof fontSize;
