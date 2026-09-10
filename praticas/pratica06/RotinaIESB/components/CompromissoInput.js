import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
        onPress={onAdd}
        android_ripple={{ color: '#0B79D0' }}
      >
        <Text style={styles.buttonText}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  button: {
    width: '27%',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonPressed: {
    backgroundColor: '#0B79D0',
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});