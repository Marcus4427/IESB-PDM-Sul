import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.5 });
  return !result.canceled ? result.assets[0].uri : null;
};

export const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão Negada', 'Precisamos de acesso à câmara.', [{ text: 'Cancelar' }, { text: 'Abrir ajustes', onPress: () => Linking.openSettings() }]);
    return null;
  }
  let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
  return !result.canceled ? result.assets[0].uri : null;
};