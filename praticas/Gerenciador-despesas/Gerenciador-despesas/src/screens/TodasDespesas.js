import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

// Dados simulados com categorias[cite: 57]
const DUMMY_DESPESAS = [
  { id: 'e1', descricao: 'Tênis', valor: 250.00, data: '10/08/2026', categoria: 'Lazer' },
  { id: 'e2', descricao: 'Supermercado', valor: 150.50, data: '12/08/2026', categoria: 'Alimentação' },
  { id: 'e3', descricao: 'Uber', valor: 45.00, data: '15/08/2026', categoria: 'Transporte' },
];

const CATEGORIAS = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function TodasDespesas() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');

  // Filtra as despesas usando .filter() conforme seleção[cite: 57]
  const despesasFiltradas = DUMMY_DESPESAS.filter(despesa => {
    if (filtroAtivo === 'Todas') return true;
    return despesa.categoria === filtroAtivo;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        {CATEGORIAS.map((cat) => (
          <Pressable 
            key={cat} 
            style={[styles.filtroBadge, filtroAtivo === cat && styles.filtroBadgeAtivo]}
            onPress={() => setFiltroAtivo(cat)}
          >
            <Text style={[styles.filtroTexto, filtroAtivo === cat && styles.filtroTextoAtivo]}>{cat}</Text>
          </Pressable>
        ))}
      </View>
      <DespesaSaida despesas={despesasFiltradas} periodoNome="Total Acumulado" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  filtroContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 16, backgroundColor: '#FFF' },
  filtroBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#EEE' },
  filtroBadgeAtivo: { backgroundColor: '#5B3C88' },
  filtroTexto: { fontSize: 12, color: '#333' },
  filtroTextoAtivo: { color: '#FFF' },
});