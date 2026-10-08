import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  // Cálculo do total utilizando .reduce()
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0); 
  
  // Desafio Bônus: altera cor se ultrapassar R$ 200,00
  const isAcimaDoLimite = somaDespesas > 200; 

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, isAcimaDoLimite && styles.textoVermelho]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E6E6FA',
    borderRadius: 8,
    marginBottom: 16,
  },
  periodo: { fontSize: 16, color: '#5B3C88' },
  soma: { fontSize: 18, fontWeight: 'bold', color: '#5B3C88' },
  textoVermelho: { color: '#D32F2F' }, 
});