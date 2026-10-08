import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesasRecentes() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Despesas Recentes</Text>
      {/* Aqui entrará a lógica de filtrar apenas os últimos 7 dias futuramente */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 18, fontWeight: 'bold' }
});