import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Chip } from '@/src/components/ui/chip';
import { colors, spacing } from '@/src/theme';

import { WALLET_IDS, WALLETS } from '../constants';
import type { WalletId } from '../types';

type WalletFilterProps = {
  value: WalletId | null;
  onChange: (value: WalletId | null) => void;
};

export function WalletFilter({ value, onChange }: WalletFilterProps) {
  return (
    <View style={styles.row}>
      <AppText size="sm" color={colors.textMuted} style={styles.label}>
        Ví:
      </AppText>
      <Chip variant="soft" size="sm" label="Tất cả" selected={value === null} onPress={() => onChange(null)} />
      {WALLET_IDS.map((id) => (
        <Chip key={id} variant="soft" size="sm" label={WALLETS[id]} selected={value === id} onPress={() => onChange(id)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing.md },
  label: { marginRight: spacing.xxs },
});
