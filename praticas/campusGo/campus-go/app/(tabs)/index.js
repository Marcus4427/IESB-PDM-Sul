import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import * as api from '../../services/api';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();
  const [refreshing, setRefreshing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  const handleCreateNotice = async () => {
    setIsCreating(true);
    try {
      const response = await api.create('posts', { 
        title: 'Novo Aviso', 
        body: 'Este é um aviso de teste', 
        userId: 1 
      });
      Alert.alert('Sucesso', `Aviso criado com ID: ${response.id}`);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar o aviso.');
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  if (error) return (
    <View style={styles.center}>
      <Text style={{ marginBottom: 10 }}>Ocorreu um erro ao carregar os avisos.</Text>
      <Button title="Tentar novamente" onPress={reload} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Button 
          title={isCreating ? "A criar..." : "Criar aviso (Bónus)"} 
          onPress={handleCreateNotice} 
          disabled={isCreating}
        />
      </View>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum aviso encontrado.</Text>}
        renderItem={({ item }) => (
          <FadeIn>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          </FadeIn>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' }, card: { padding: 15, margin: 10, backgroundColor: '#FFF', borderRadius: 8, elevation: 2 }, title: { fontWeight: 'bold', marginBottom: 5, fontSize: 16, textTransform: 'capitalize' } });