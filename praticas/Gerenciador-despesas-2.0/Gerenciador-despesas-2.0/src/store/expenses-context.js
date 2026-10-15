import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const ExpensesContext = createContext();

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      const upIndex = state.findIndex((e) => e.id === action.payload.id);
      const upExpenses = [...state];
      upExpenses[upIndex] = { ...upExpenses[upIndex], ...action.payload.data };
      return upExpenses;
    case 'DELETE':
      return state.filter((e) => e.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem('@expenses');
        if (storedExpenses) {
          const parsed = JSON.parse(storedExpenses).map(exp => ({
            ...exp,
            date: new Date(exp.date) // Recupera o objeto Date
          }));
          dispatch({ type: 'SET', payload: parsed });
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    async function saveExpenses() {
      if (isLoaded) {
        try {
          await AsyncStorage.setItem('@expenses', JSON.stringify(expensesState));
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível salvar os dados.');
        }
      }
    }
    saveExpenses();
  }, [expensesState, isLoaded]);

  const addExpense = (expenseData) => dispatch({ type: 'ADD', payload: { ...expenseData, id: Date.now().toString() } });
  const updateExpense = (id, expenseData) => dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  const deleteExpense = (id) => dispatch({ type: 'DELETE', payload: id });

  return (
    <ExpensesContext.Provider value={{ expenses: expensesState, addExpense, updateExpense, deleteExpense, isLoaded }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  return context;
}