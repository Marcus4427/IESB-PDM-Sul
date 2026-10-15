import React, { useState, useMemo } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { GlobalStyles } from '../constants/theme';
import DespesaItem from '../components/despesa/DespesaItem';
import DespesaSumario from '../components/despesa/DespesaSumario';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = GlobalStyles.colors[theme];

  const filteredExpenses = useMemo(() => {
    if (!debouncedSearch) return expenses;
    return expenses.filter(e => e.description.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [expenses, debouncedSearch]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.text }]}>Nenhuma despesa encontrada.</Text>
      <Text style={[styles.emptySub, { color: colors.text }]}>Toque no ícone de + para adicionar.</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput 
        style={[styles.searchInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Buscar despesa..."
        placeholderTextColor={colors.text}
        value={search}
        onChangeText={setSearch}
      />
      <DespesaSumario despesas={filteredExpenses} periodo="Total Filtrado" />
      <FlatList
        data={filteredExpenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DespesaItem {...item} />}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchInput: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 16 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, fontWeight: 'bold' },
  emptySub: { fontSize: 14, opacity: 0.7, marginTop: 8 }
});