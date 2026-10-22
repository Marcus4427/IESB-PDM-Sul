import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: id })} style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}>
      <View>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.date}>{date.toLocaleDateString('pt-BR')}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.cat}>{category}</Text>
        <Text style={styles.amount}>R$ {parseFloat(amount).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  item: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 16, marginVertical: 8, borderRadius: 8, elevation: 3 },
  desc: { fontSize: 16, fontWeight: 'bold' }, date: { color: '#666', marginTop: 4 },
  cat: { fontSize: 12, backgroundColor: '#EEE', padding: 4, borderRadius: 4, overflow: 'hidden' }, amount: { fontSize: 16, fontWeight: 'bold', marginTop: 4 }
});