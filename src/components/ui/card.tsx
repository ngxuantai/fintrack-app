import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radii, shadows, spacing } from '@/src/theme';

type CardProps = ViewProps & {
  /** Inner padding; defaults to the design's 18px card padding. */
  padded?: boolean;
};

export function Card({ padded = true, style, ...rest }: CardProps) {
  return <View style={[styles.card, padded && styles.padded, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii['4xl'],
    ...shadows.card,
  },
  padded: { padding: spacing['4xl'] },
});
