import { StyleSheet, TextInput } from 'react-native';

import { colors, fontFamily, fontSize } from '@/src/theme';

import { FormRow } from './form-row';

type NoteFieldProps = { value: string; onChangeText: (text: string) => void };

export function NoteField({ value, onChangeText }: NoteFieldProps) {
  return (
    <FormRow icon="edit" label="Ghi chú">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Ví dụ: Phở bò với đồng nghiệp"
        placeholderTextColor={colors.placeholder}
        accessibilityLabel="Ghi chú"
        returnKeyType="done"
        style={styles.input}
      />
    </FormRow>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
    color: colors.text,
  },
});
