import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Modal, KeyboardAvoidingView, ScrollView, Platform, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { GlobalStyles } from '../constants/theme';

const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const targetExpense = isEditing ? expenses.find(e => e.id === expenseId) : null;

  const [form, setForm] = useState({
    description: targetExpense?.description || '',
    amount: targetExpense?.amount.toString() || '',
    date: targetExpense?.date || new Date(),
    category: targetExpense?.category || ''
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);


  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = GlobalStyles.colors[theme];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa'
    });
  }, [navigation, isEditing]);

  const handleChange = (field, value) => {
    if (field === 'amount') {
      if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    }
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = (values) => {
    const newErrors = {};
    if (values.description.trim().length < 3) newErrors.description = 'Mínimo de 3 caracteres.';
    if (isNaN(parseFloat(values.amount)) || parseFloat(values.amount) <= 0) newErrors.amount = 'Valor deve ser maior que zero.';
    if (values.date > new Date()) newErrors.date = 'A data não pode ser futura.';
    if (!values.category) newErrors.category = 'Selecione uma categoria.';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const expenseData = { ...form, amount: parseFloat(form.amount) };

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        } 
      }
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
        
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }, errors.description && styles.inputError]} 
          value={form.description} 
          onChangeText={(val) => handleChange('description', val)} 
          placeholderTextColor={colors.text}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }, errors.amount && styles.inputError]} 
          value={form.amount} 
          onChangeText={(val) => handleChange('amount', val)} 
          keyboardType="decimal-pad" 
          placeholderTextColor={colors.text}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }, errors.date && styles.inputError]} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: colors.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display="default"
            onChange={(e, selected) => {
              setShowDatePicker(false);
              if (selected) handleChange('date', selected);
            }}
          />
        )}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }, errors.category && styles.inputError]} onPress={() => setShowCategoryModal(true)}>
          <Text style={{ color: colors.text }}>{form.category || 'Selecione uma categoria'}</Text>
        </Pressable>
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

        <Modal visible={showCategoryModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {CATEGORIES.map(cat => (
                <Pressable key={cat} style={styles.modalItem} onPress={() => { handleChange('category', cat); setShowCategoryModal(false); }}>
                  <Text style={styles.modalItemText}>{cat}</Text>
                </Pressable>
              ))}
              <Pressable style={styles.modalCloseBtn} onPress={() => setShowCategoryModal(false)}>
                <Text style={styles.modalCloseText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable style={[styles.btnSalvar, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.btnSalvarTexto}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable style={styles.btnExcluir} onPress={handleDelete}>
            <Text style={[styles.btnExcluirTexto, { color: colors.error }]}>Excluir Despesa</Text>
          </Pressable>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginTop: 16 },
  input: { padding: 12, borderRadius: 8, borderWidth: 1 },
  inputError: { borderColor: '#D32F2F', borderWidth: 1.5 },
  errorText: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
  btnSalvar: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 32 },
  btnSalvarTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  btnExcluir: { marginTop: 16, alignItems: 'center' },
  btnExcluirTexto: { fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFF', padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  modalItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  modalItemText: { fontSize: 16, textAlign: 'center', color: '#333' },
  modalCloseBtn: { marginTop: 16, padding: 16, backgroundColor: '#EEE', borderRadius: 8, alignItems: 'center' },
  modalCloseText: { fontWeight: 'bold', color: '#333' }
});