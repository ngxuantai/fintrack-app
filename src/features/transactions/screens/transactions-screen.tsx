import { useCallback, useRef, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/src/components/ui/app-text';
import { ScreenTitle } from '@/src/components/ui/screen-title';
import { showToast } from '@/src/stores/toast-store';
import { colors, screenPadding, spacing, tabBarClearance } from '@/src/theme';

import { DaySectionHeader } from '../components/day-section-header';
import { SearchBar } from '../components/search-bar';
import { SwipeableTransactionRow } from '../components/swipeable-transaction-row';
import { TransactionSummary } from '../components/transaction-summary';
import { NoMatchingTransactions, TransactionsEmptyState } from '../components/transactions-empty-state';
import { TypeFilterBar } from '../components/type-filter-bar';
import { WalletFilter } from '../components/wallet-filter';
import { useTransactionFilters } from '../hooks/use-transaction-filters';
import { deleteTransaction } from '../stores/transactions-store';
import type { Transaction } from '../types';
import { openTransactionForm } from '../utils/navigation';

export function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const filters = useTransactionFilters();
  const [walletFilterOpen, setWalletFilterOpen] = useState(false);
  const openRow = useRef<SwipeableMethods | null>(null);

  const handleRowOpen = useCallback((methods: SwipeableMethods) => {
    if (openRow.current && openRow.current !== methods) openRow.current.close();
    openRow.current = methods;
  }, []);

  const handleEdit = useCallback((tx: Transaction) => openTransactionForm(tx.id), []);

  const handleDelete = useCallback((tx: Transaction) => {
    const restore = deleteTransaction(tx.id);
    showToast('Đã xóa giao dịch', { label: 'Hoàn tác', onPress: restore });
  }, []);

  const renderEmpty = () =>
    filters.isEmpty ? <TransactionsEmptyState onAdd={() => openTransactionForm()} /> : <NoMatchingTransactions />;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <ScreenTitle>Giao dịch</ScreenTitle>
        <SearchBar
          value={filters.query}
          onChangeText={filters.setQuery}
          filterOpen={walletFilterOpen}
          filterActive={filters.walletId !== null}
          onToggleFilter={() => setWalletFilterOpen((open) => !open)}
        />
        {walletFilterOpen ? <WalletFilter value={filters.walletId} onChange={filters.setWalletId} /> : null}
        <TypeFilterBar
          type={filters.type}
          onTypeChange={filters.setType}
          month={filters.month}
          monthOptions={filters.monthOptions}
          onMonthChange={filters.setMonth}
        />
        <TransactionSummary income={filters.totalIncome} expense={filters.totalExpense} />
      </View>

      <SectionList
        sections={filters.sections}
        keyExtractor={(tx) => tx.id}
        stickySectionHeadersEnabled
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section }) => <DaySectionHeader date={section.date} net={section.net} />}
        renderItem={({ item, index, section }) => (
          <SwipeableTransactionRow
            transaction={item}
            isFirst={index === 0}
            isLast={index === section.data.length - 1}
            onPress={handleEdit}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onOpen={handleRowOpen}
          />
        )}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          filters.sections.length > 0 ? (
            <AppText size="sm" color={colors.textSubtle} align="center" style={styles.hint}>
              Mẹo: vuốt trái trên một giao dịch để sửa hoặc xóa
            </AppText>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    paddingHorizontal: screenPadding,
    gap: spacing.xl,
  },
  listContent: { paddingHorizontal: screenPadding, paddingBottom: tabBarClearance },
  hint: { paddingTop: spacing['4xl'] },
});
