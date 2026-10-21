import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getCurrentPlace = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão Negada', 'Não podemos aceder à localização.');
    return null;
  }
  let location = await Location.getCurrentPositionAsync({});
  let address = await Location.reverseGeocodeAsync(location.coords);
  return { label: address[0] ? `${address[0].street}, ${address[0].city}` : 'Local desconhecido' };
};