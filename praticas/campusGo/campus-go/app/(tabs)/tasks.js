import { View, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import PulseButton from '../../components/PulseButton';

export default function Tasks() {
  const handleCheckIn = async () => {
    const place = await getCurrentPlace();
    if (place) {
      Alert.alert('Check-in', `Estudei aqui: ${place.label}`);
    }
  };

  const handleComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Sucesso', 'Tarefa concluída');
  };

  return (
    <View style={styles.container}>
      <Button title="Nova Tarefa (Modal)" onPress={() => router.push('/new-task')} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Abrir Tarefa 42" onPress={() => router.push('/task/42')} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Estudei aqui" onPress={handleCheckIn} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Lembrar em 10 s" onPress={() => scheduleReminder('Voltar aos estudos!', 10)} />
      <View style={{ marginVertical: 10 }} />
      
      <PulseButton title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 20, justifyContent: 'center' } 
});