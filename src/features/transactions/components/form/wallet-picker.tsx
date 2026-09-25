import { StyleSheet, View } from 'react-native';

import { Chip } from '@/src/components/ui/chip';
import { spacing } from '@/src/theme';

import { WALLET_IDS, WALLETS } from '../../constants';
import type { WalletId } from '../../types';

import { FormRow } from './form-row';

type WalletPickerProps = { value: WalletId; onChange: (id: WalletId) => void };

export function WalletPicker({ value, onChange }: WalletPickerProps) {
  return (
    <FormRow icon="wallet" label="Ví / Tài khoản" align="flex-start" gap={spacing.md}>
      <View style={styles.options}>
        {WALLET_IDS.map((id) => (
          <Chip key={id} variant="pill" size="sm" label={WALLETS[id]} selected={value === id} onPress={() => onChange(id)} />
        ))}
      </View>
    </FormRow>
  );
}

const styles = StyleSheet.create({
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
