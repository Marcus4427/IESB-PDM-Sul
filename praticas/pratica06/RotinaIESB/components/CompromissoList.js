import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, onToggle, labels }) {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Pressable 
        style={styles.itemContent} 
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: '#E0E0E0' }}
      >
        <Text style={[styles.itemText, item.concluido && styles.textConcluido]}>
          {item.texto}
        </Text>
      </Pressable>
      <Pressable 
        style={styles.deleteButton} 
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: '#FFCDD2', radius: 20 }}
      >
        <Text style={styles.deleteText}>X</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{labels.tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>{labels.listaVazia}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1, 
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  itemContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  textConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEbee',
  },
  deleteText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginTop: 20,
    fontStyle: 'italic',
  },
});