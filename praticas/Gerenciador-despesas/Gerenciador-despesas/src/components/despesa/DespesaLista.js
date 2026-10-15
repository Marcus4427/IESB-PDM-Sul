import React from 'react';
import { FlatList, Text } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  const renderItem = ({ item }) => (
    <DespesaItem {...item} />
  );

  if (despesas.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma despesa encontrada.</Text>;
  }

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}