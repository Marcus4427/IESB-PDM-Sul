import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

export default function Profile() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      const uri = await AsyncStorage.getItem('@profile-photo');
      if (uri) setPhotoUri(uri);
    };
    loadPhoto();
  }, []);

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setPhotoUri(uri);
      await AsyncStorage.setItem('@profile-photo', uri);
    }
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      setPhotoUri(uri);
      await AsyncStorage.setItem('@profile-photo', uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        <Image 
          source={{ uri: photoUri || 'https://via.placeholder.com/150' }} 
          style={styles.avatar} 
        />
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Button title="Tirar Nova Foto" onPress={handleTakePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, avatar: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#DDD' } });