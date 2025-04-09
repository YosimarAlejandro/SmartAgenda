import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';

const TareasScreen = ({ navigation }) => {
  const [tareasPorBloque, setTareasPorBloque] = useState({});
  const [loading, setLoading] = useState(false);
  const [bloqueActivo, setBloqueActivo] = useState(null);
  const bloques = [1, 2, 3, 4, 5];

  const fetchTareasPorBloque = async () => {
    setLoading(true);
    try {
      const nuevasTareas = {};
      for (let bloque of bloques) {
        const response = await axios.get(`http://127.0.0.1:5000/api/tarea/tareas/bloque/${bloque}`);
        nuevasTareas[bloque] = response.data;
      }
      setTareasPorBloque(nuevasTareas);
    } catch (error) {
      console.error('Error al obtener las tareas por bloque:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTareasPorBloque();
  }, []);

  const toggleBloque = (bloque) => {
    setBloqueActivo((prev) => (prev === bloque ? null : bloque));
  };

  const renderTareasDeBloque = (bloque) => {
    const tareas = tareasPorBloque[bloque] || [];

    return (
      <View key={bloque} style={styles.bloqueContainer}>
        <TouchableOpacity onPress={() => toggleBloque(bloque)} style={styles.bloqueBoton}>
          <Text style={styles.bloqueTitulo}>Bloque {bloque}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={bloqueActivo !== bloque}>
          {tareas.map((tarea) => (
            <TouchableOpacity
              key={tarea._id}
              style={styles.tareaContainer}
              onPress={() => navigation.navigate('ResponderTareaScreen', { tarea })}
            >
              <Text style={styles.tareaPregunta}>{tarea.pregunta}</Text>
              <Text style={styles.tareaPuntaje}>Puntaje: {tarea.puntaje}</Text>
            </TouchableOpacity>
          ))}
        </Collapsible>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tareas por Bloque</Text>
      {bloques.map((bloque) => renderTareasDeBloque(bloque))}
    </ScrollView>
  );
};

export default TareasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  bloqueContainer: { marginBottom: 16 },
  bloqueBoton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  bloqueTitulo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tareaContainer: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 8, marginTop: 8 },
  tareaPregunta: { fontSize: 16, fontWeight: '600' },
  tareaPuntaje: { fontSize: 14, color: '#666' },
});
