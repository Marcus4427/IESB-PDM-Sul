import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [metas, setMetas] = useState([]);
  const [textoInput, setTextoInput] = useState('');
  const [carregouInicial, setCarregouInicial] = useState(false);

  useEffect(() => {
    carregarMetas();
  }, []);

  useEffect(() => {
    if (carregouInicial) {
      salvarMetas(metas);
    }
  }, [metas, carregouInicial]);

  const carregarMetas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setMetas(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.');
    } finally {
      setCarregouInicial(true);
    }
  };

  const salvarMetas = async (metasParaSalvar) => {
    try {
      const jsonValue = JSON.stringify(metasParaSalvar);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar as metas.');
    }
  };

  const handleAdd = () => {
    if (textoInput.trim() === '') {
      Alert.alert('Aviso', 'A meta não pode ser vazia!');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoInput.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((prevMetas) => [novaMeta, ...prevMetas]);
    setTextoInput('');
  };

  const handleDelete = (id) => {
    setMetas((prevMetas) => prevMetas.filter((meta) => meta.id !== id));
  };

  const handleToggle = (id) => {
    setMetas((prevMetas) => 
      prevMetas.map((meta) => 
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  };

  const concluidas = metas.filter((m) => m.concluida).length;
  const pendentes = metas.length - concluidas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <Image 
            source={require('./assets/icon.png')} 
            style={styles.logo} 
          />
          <View>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.stats}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput 
          value={textoInput} 
          onChangeText={setTextoInput} 
          onAdd={handleAdd} 
        />

        <MetaList 
          metas={metas} 
          onDelete={handleDelete} 
          onToggle={handleToggle} 
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stats: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});