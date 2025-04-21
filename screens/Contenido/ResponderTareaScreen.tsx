import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import MascotaVirtual from '../../components/MascotaVirtual';

const ResponderTareaScreen = ({ route, navigation }) => {
  const { tarea } = route.params;
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);
  const [tareaActual, setTareaActual] = useState(tarea);
  const [tareaRespondida, setTareaRespondida] = useState(false);
  const [siguienteTarea, setSiguienteTarea] = useState(null);
  const [mensajeMascota, setMensajeMascota] = useState('');
  const [emocionMascota, setEmocionMascota] = useState('feliz');
  const [mostrarMascota, setMostrarMascota] = useState(true);

  useEffect(() => {
    if (route.params?.tarea) {
      setTareaActual(route.params.tarea);
      setRespuesta('');
      setTareaRespondida(false);
      setMensajeMascota('¡Vamos! Lee con atención la pregunta 📖');
      setEmocionMascota('hablando');
    }
  }, [route.params?.tarea]);

  useEffect(() => {
    leerPregunta();
  }, [tareaActual]);

  const leerPregunta = () => {
    if (tareaActual?.pregunta) {
      Speech.speak(tareaActual.pregunta, {
        language: 'es-ES',
        rate: 0.9,
        pitch: 1.1,
      });
    }
  };

  const handleResponder = async () => {
    if (!respuesta.trim()) {
      alert('¡Error! Debes ingresar una respuesta');
      return;
    }

    setLoading(true);
    setEmocionMascota('hablando');
    setMensajeMascota('¡Estoy revisando tu respuesta! 🔍');

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(
        `http://127.0.0.1:5000/api/tarea/${tareaActual._id}/responder`,
        { respuesta },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('📤 Respuesta completa del backend:', res.data);

      const { mensaje, siguiente_dificultad, siguiente_tarea, correcto } = res.data;

      if (siguiente_tarea) setSiguienteTarea(siguiente_tarea);
      if (siguiente_dificultad) console.log('🎯 Siguiente dificultad sugerida:', siguiente_dificultad);

      setTareaRespondida(true);

      // Mascota reacciona según el resultado
      if (correcto) {
        setEmocionMascota('feliz');
        setMensajeMascota('¡Muy bien! 🎉 Sigue así');
      } else {
        setEmocionMascota('triste');
        setMensajeMascota('Ups, casi. ¡Intenta la siguiente! 💪');
      }

    } catch (error) {
      console.error('❌ Error al responder tarea:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('❌ Detalle del error:', error.response.data);
      }

      setEmocionMascota('triste');
      setMensajeMascota('¡Oh no! Hubo un problema 😔');

      alert('¡Error! Hubo un problema al enviar tu respuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {mostrarMascota && (
        <MascotaVirtual mensaje={mensajeMascota} emocion={emocionMascota} hablar />
      )}

      <Text style={styles.title}>Responder Tarea</Text>

      {tareaActual ? (
        <>
          <Text style={styles.question}>{tareaActual.pregunta}</Text>

          <TouchableOpacity onPress={leerPregunta} style={{ marginBottom: 10 }}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>🔊 Escuchar pregunta</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.question}>Cargando tarea...</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu respuesta"
        value={respuesta}
        onChangeText={setRespuesta}
      />

      <TouchableOpacity onPress={handleResponder} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar Respuesta</Text>}
      </TouchableOpacity>

      {tareaRespondida && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>¡Respuesta enviada con éxito!</Text>
          <Button
            title="Ir a la siguiente tarea"
            onPress={() => {
              if (siguienteTarea) {
                navigation.navigate('ResponderTareaScreen', { tarea: siguienteTarea });
              } else {
                alert('No hay más tareas por ahora 😊');
              }
            }}
          />
          <Button
            title="Volver al inicio"
            onPress={() => navigation.navigate('TareasScreen')}
            color="red"
          />
        </View>
      )}
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
  responseContainer: { marginTop: 20, alignItems: 'center' },
  responseText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
