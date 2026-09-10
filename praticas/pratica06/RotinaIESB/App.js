import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  tituloApp, 
  placeholderCompromisso, 
  botaoAdicionar, 
  tituloLista, 
  listaVazia 
} from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [compromissos, setCompromissos] = useState([]);
  const [textoInput, setTextoInput] = useState('');
  const [carregouInicial, setCarregouInicial] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (carregouInicial) {
      salvarDados(compromissos);
    }
  }, [compromissos, carregouInicial]);

  const carregarDados = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setCompromissos(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar sua rotina.');
    } finally {
      setCarregouInicial(true);
    }
  };

  const salvarDados = async (dados) => {
    try {
      const jsonValue = JSON.stringify(dados);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const handleAdd = () => {
    if (textoInput.trim() === '') {
      Alert.alert('Aviso', 'O compromisso não pode ser vazio!');
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoInput.trim(),
      criadoEm: new Date().toISOString(),
      concluido: false,
    };

    setCompromissos((prev) => [novoCompromisso, ...prev]);
    setTextoInput('');
  };

  const handleDelete = (id) => {
    setCompromissos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setCompromissos((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  };

  const pendentes = compromissos.filter(c => !c.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logo} 
          />
          <View>
            <Text style={styles.headerTitle}>{tituloApp}</Text>
            <Text style={styles.headerSubtitle}>{pendentes} pendentes</Text>
          </View>
        </View>

        <CompromissoInput 
          value={textoInput}
          onChangeText={setTextoInput}
          onAdd={handleAdd}
          labels={{ placeholderCompromisso, botaoAdicionar }}
        />

        <CompromissoList 
          itens={compromissos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          labels={{ tituloLista, listaVazia }}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
    backgroundColor: '#E0E0E0', 
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});