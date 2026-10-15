import React from 'react';
import { View, FlatList, Text, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { GlobalStyles } from '../constants/theme';
import DespesaItem from '../components/despesa/DespesaItem';
import DespesaSumario from '../components/despesa/DespesaSumario';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  

  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = GlobalStyles.colors[theme];


  const despesasRecentes = expenses.filter(e => {
    const hoje = new Date();
    const dataDespesa = new Date(e.date);
    const diferencaDias = (hoje - dataDespesa) / (1000 * 60 * 60 * 24);
    return diferencaDias <= 7;
  });

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.text }]}>Sem despesas recentes.</Text>
      <Text style={[styles.emptySub, { color: colors.text }]}>Adicione uma nova despesa no botão +.</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSumario despesas={despesasRecentes} periodo="Últimos 7 dias" />
      <FlatList 
        data={despesasRecentes} 
        keyExtractor={item => item.id} 
        renderItem={({item}) => <DespesaItem {...item} />} 
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, fontWeight: 'bold' },
  emptySub: { fontSize: 14, opacity: 0.7, marginTop: 8 }
});