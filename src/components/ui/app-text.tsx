import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, fontFamily, fontSize, type FontSize, type FontWeight } from '@/src/theme';

export type AppTextProps = TextProps & {
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
  /** Tabular digits so amounts line up. */
  tabular?: boolean;
};

export function AppText({
  size = 'base',
  weight = 'regular',
  color = colors.text,
  align,
  tabular,
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[
        styles.base,
        { fontSize: fontSize[size], fontFamily: fontFamily[weight], color, textAlign: align },
        tabular && styles.tabular,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: { includeFontPadding: false },
  tabular: { fontVariant: ['tabular-nums'] },
});
