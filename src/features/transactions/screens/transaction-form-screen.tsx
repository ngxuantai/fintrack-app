import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/src/components/ui/button';
import { SegmentedControl, type SegmentOption } from '@/src/components/ui/segmented-control';
import { colors, radii, screenPadding, spacing } from '@/src/theme';

import { AmountInput } from '../components/form/amount-input';
import { CategoryGrid } from '../components/form/category-grid';
import { DateField } from '../components/form/date-field';
import { FormDivider } from '../components/form/form-row';
import { NoteField } from '../components/form/note-field';
import { ReceiptAttachment } from '../components/form/receipt-attachment';
import { SheetHeader } from '../components/form/sheet-header';
import { WalletPicker } from '../components/form/wallet-picker';
import { useTransactionForm } from '../hooks/use-transaction-form';
import type { TransactionType } from '../types';

const TYPE_OPTIONS: SegmentOption<TransactionType>[] = [
  { value: 'expense', label: 'Chi tiêu', activeColor: colors.expense },
  { value: 'income', label: 'Thu nhập', activeColor: colors.income },
];

type TransactionFormScreenProps = {
  /** When set, the form edits that transaction instead of creating one. */
  transactionId?: string;
};

export function TransactionFormScreen({ transactionId }: TransactionFormScreenProps) {
  const insets = useSafeAreaInsets();
  const form = useTransactionForm(transactionId);
  const { values, errors } = form;
  const receiptName = `hoa-don-${values.date.slice(8, 10)}${values.date.slice(5, 7)}.jpg`;

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SheetHeader title={form.isEditing ? 'Sửa giao dịch' : 'Thêm giao dịch'} onClose={() => router.back()} />

      <View style={styles.segment}>
        <SegmentedControl size="stretch" options={TYPE_OPTIONS} value={values.type} onChange={form.setType} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <AmountInput type={values.type} value={values.amount} onChangeText={form.setAmount} error={errors.amount} />

        <CategoryGrid type={values.type} value={values.categoryId} onChange={form.setCategory} />

        <View style={styles.details}>
          <DateField value={values.date} onChange={form.setDate} />
          <FormDivider />
          <WalletPicker value={values.walletId} onChange={form.setWallet} />
          <FormDivider />
          <NoteField value={values.note} onChangeText={form.setNote} />
          <FormDivider />
          <ReceiptAttachment attached={values.hasReceipt} onToggle={form.toggleReceipt} fileName={receiptName} />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.xl) + spacing.xl }]}>
        <Button size="lg" label="Lưu giao dịch" onPress={form.submit} fullWidth />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  segment: { paddingTop: spacing['2xl'], paddingHorizontal: screenPadding },
  scroll: { flex: 1 },
  content: {
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['5xl'],
    paddingHorizontal: screenPadding,
    gap: spacing['2xl'],
  },
  details: {
    backgroundColor: colors.surface,
    borderRadius: radii['4xl'],
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing['3xl'],
  },
  footer: {
    paddingTop: spacing.xl,
    paddingHorizontal: screenPadding,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceSunken,
  },
});
