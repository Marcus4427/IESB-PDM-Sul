import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#5B3C88' }}>
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas', tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} /> }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso', tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
    </Tabs>
  );
}