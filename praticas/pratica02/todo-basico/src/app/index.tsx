import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
        Programação para Dispositivos Móveis
      </Text>
      <Text style={{ fontSize: 22, marginTop: 16, textAlign: 'center' }}>
        Olá, Marcus!
      </Text>
      <Text style={{ fontSize: 16, marginTop: 8, textAlign: 'center' }}>
        Meu segundo passo com Expo e React Native
      </Text>
    </View>
  );
}
