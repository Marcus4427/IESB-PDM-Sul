import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const soma = despesas.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{periodo}</Text>
      <Text style={styles.valor}>R$ {soma.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#E6E6FA', borderRadius: 8, marginBottom: 16 },
  texto: { fontSize: 16, color: '#5B3C88' },
  valor: { fontSize: 18, fontWeight: 'bold', color: '#5B3C88' }
});