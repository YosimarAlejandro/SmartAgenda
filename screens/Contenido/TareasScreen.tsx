// TareasScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const TareasScreen = ({ navigation }) => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTareas = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/tarea/alltareas');
      setTareas(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ResponderTareaScreen', { tarea: item })}
    >
      <Text style={styles.itemTitle}>{item.pregunta}</Text>
      <Text style={styles.itemSubtitle}>Puntaje: {item.puntaje}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TareasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  itemContainer: { backgroundColor: '#f9f9f9', padding: 16, marginBottom: 8, borderRadius: 8 },
  itemTitle: { fontSize: 18, fontWeight: '600' },
  itemSubtitle: { fontSize: 16, color: '#666' },
});
