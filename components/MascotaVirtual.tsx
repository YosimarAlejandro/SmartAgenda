// components/MascotaVirtual.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Speech from 'expo-speech';

const MascotaVirtual = ({ mensaje = '', emocion = 'feliz', hablar = false }) => {
  useEffect(() => {
    if (hablar && mensaje) {
      Speech.speak(mensaje, {
        language: 'es-ES',
        pitch: 1.1,
        rate: 0.95,
      });
    }
  }, [mensaje, hablar]);

  const getAnimacion = () => {
    switch (emocion) {
      case 'triste':
        return require('../assets/animaciones/triste.gif');
      case 'hablando':
        return require('../assets/animaciones/hablando.gif');
      case 'feliz':
      default:
        return require('../assets/animaciones/feliz.gif');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={getAnimacion()} style={styles.animacion} />
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
};

export default MascotaVirtual;

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 20 },
  animacion: { width: 150, height: 150 },
  mensaje: { fontSize: 16, marginTop: 8, textAlign: 'center' },
});
