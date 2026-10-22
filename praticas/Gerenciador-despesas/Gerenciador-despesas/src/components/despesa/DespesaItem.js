import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function DespesaItem({ descricao, valor, data, categoria }) {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{data}</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <View style={styles.categoriaBadge}>
            <Text style={styles.categoriaTexto}>{categoria}</Text>
          </View>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  data: { fontSize: 14, color: '#666', marginTop: 4 },
  rightContainer: { alignItems: 'flex-end' },
  valor: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 4 },
  categoriaBadge: {
    backgroundColor: '#E0E0E0', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12, 
  },
  categoriaTexto: { fontSize: 12, color: '#333', fontWeight: 'bold' },
  pressed: { opacity: 0.7 },
});