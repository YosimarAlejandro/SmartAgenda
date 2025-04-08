// ResponderTareaScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResponderTareaScreen = ({ route, navigation }) => {
  const { tarea } = route.params;  // La tarea seleccionada
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResponder = async () => {
    if (!respuesta.trim()) {
      Alert.alert('Debes ingresar una respuesta');
      return;
    }
    setLoading(true);
    try {
      // Obtener el token almacenado
      const token = await AsyncStorage.getItem('token');

      // Realizar la petición para responder la tarea
      const res = await axios.post(
        `http://127.0.0.1:5000/api/tarea/${tarea._id}/responder`,
        { respuesta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Alert.alert('Resultado', res.data.mensaje);
      navigation.goBack(); // Regresa a la lista de tareas o a la pantalla anterior
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al enviar tu respuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responder Tarea</Text>
      <Text style={styles.question}>{tarea.pregunta}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu respuesta"
        value={respuesta}
        onChangeText={setRespuesta}
      />
      <TouchableOpacity onPress={handleResponder} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar Respuesta</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default ResponderTareaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  question: { fontSize: 18, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 16, borderRadius: 8 },
  button: { backgroundColor: 'dodgerblue', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
