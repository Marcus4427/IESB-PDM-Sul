import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ExpensesContextProvider } from './src/store/expenses-context';


import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

import IconButton from './src/components/IconButton';
import { GlobalStyles } from './src/constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="add"
            size={26}
            color={GlobalStyles.colors.light.primary}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
        tabBarActiveTintColor: GlobalStyles.colors.light.primary,
      })}
    >
      <Tab.Screen 
        name="DespesasRecentes" 
        component={DespesasRecentes} 
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 12 }
        }}
      />
      <Tab.Screen 
        name="TodasDespesas" 
        component={TodasDespesas} 
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 12 }
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
  
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Despesas" 
            component={BottomTabScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="GerenciarDespesa" 
            component={GerenciarDespesa} 
            options={{ title: 'Gerenciar Despesa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}