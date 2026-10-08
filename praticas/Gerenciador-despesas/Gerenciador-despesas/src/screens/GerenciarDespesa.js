import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState(''); 
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSalvar = () => {
    // Validação de preenchimento obrigatório[cite: 57]
    if (!descricao.trim() || !valor.trim() || !categoria) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione uma categoria.');
      return;
    }

    Alert.alert('Sucesso', 'Despesa salva com sucesso!');
    // Aqui iria a lógica para salvar no Context ou AsyncStorage
  };

  const handleValorChange = (texto) => {
    // Tratamento de valor com Regex para permitir até 2 casas decimais[cite: 57]
    const regex = /^\d*\.?\d{0,2}$/; 
    if (regex.test(texto)) {
      setValor(texto);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput 
        style={styles.input} 
        value={valor} 
        onChangeText={handleValorChange} 
        keyboardType="decimal-pad" 
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{data.toLocaleDateString('pt-BR')}</Text>
      </Pressable>
      
      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categoriaContainer}>
        {CATEGORIAS.map((cat) => (
          <Pressable 
            key={cat} 
            style={[styles.categoriaBtn, categoria === cat && styles.categoriaBtnAtivo]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={[styles.categoriaTexto, categoria === cat && styles.categoriaTextoAtivo]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.btnSalvar} onPress={handleSalvar}>
        <Text style={styles.btnSalvarTexto}>Salvar Despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F5F5F5' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD' },
  categoriaContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoriaBtn: { backgroundColor: '#E0E0E0', padding: 10, borderRadius: 8 },
  categoriaBtnAtivo: { backgroundColor: '#5B3C88' },
  categoriaTexto: { color: '#333' },
  categoriaTextoAtivo: { color: '#FFF' },
  btnSalvar: { backgroundColor: '#5B3C88', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 32 },
  btnSalvarTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});