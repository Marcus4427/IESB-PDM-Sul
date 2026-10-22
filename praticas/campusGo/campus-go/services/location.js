import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const getCurrentPlace = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos da sua localização para o check-in.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir Definições', onPress: () => Linking.openSettings() }
        ]
      );
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    if (geocode && geocode.length > 0) {
      const place = geocode[0];
      const rua = place.street || place.name || place.district || 'Rua desconhecida';
      const cidade = place.city || place.subregion || place.region || 'Cidade desconhecida';
      
      return { label: `${rua}, ${cidade}` };
    }
    return null;

  } catch (error) {
    Alert.alert('Erro', 'Falha ao obter localização. Verifique o GPS.');
    return null;
  }
};