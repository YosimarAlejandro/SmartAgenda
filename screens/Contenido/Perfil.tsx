import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el progreso
  const [progress, setProgress] = useState<any[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);

  // Simulación de carga de datos del usuario
  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth?.user) {
        setLoading(false);
      } else {
        setError("No se pudo cargar la información del usuario.");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [auth?.user]);

  // Cargar el progreso del usuario
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Se obtiene el token de AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!auth?.user || !token) {
          setProgressLoading(false);
          return;
        }
        
        // Se llama al endpoint, usando el id del usuario obtenido del contexto
        const response = await axios.get(
          `http://127.0.0.1:5000/api/progreso/progreso/${auth.user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProgress(response.data); // Se asume que la respuesta es un arreglo
      } catch (err: any) {
        console.error("Error al cargar el progreso:", err?.response?.data || err.message);
      } finally {
        setProgressLoading(false);
      }
    };

    fetchProgress();
  }, [auth?.user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="dodgerblue" />
        <Text style={styles.text}>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {auth?.user ? (
        <>
          <Text style={styles.text}>Nombre: {auth.user.nombre}</Text>
          <Text style={styles.text}>Correo: {auth.user.email}</Text>
          <Text style={styles.text}>Teléfono: {auth.user.telefono || "No proporcionado"}</Text>
        </>
      ) : (
        <Text style={styles.text}>No hay usuario autenticado.</Text>
      )}

      <View style={{ marginTop: 30, width: "100%" }}>
        <Text style={styles.title}>Mi Progreso</Text>
        {progressLoading ? (
          <ActivityIndicator size="large" color="dodgerblue" />
        ) : progress.length === 0 ? (
          <Text style={styles.text}>No tienes progreso registrado.</Text>
        ) : (
          <FlatList
            data={progress}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.progressItem}>
                {/* Se asume que 'id_tarea' viene poblado con al menos el campo 'pregunta' */}
                <Text style={styles.text}>Tarea: {item.id_tarea?.pregunta || "Sin título"}</Text>
                <Text style={styles.text}>Puntaje: {item.puntaje}</Text>
                <Text style={styles.text}>
                  Fecha: {new Date(item.fecha_progreso).toLocaleString()}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "dodgerblue",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  progressItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
    width: "100%",
  },
});


export default Perfil;