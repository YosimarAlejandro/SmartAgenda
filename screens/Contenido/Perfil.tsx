import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Perfil = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simula una carga de datos
    const timer = setTimeout(() => {
      if (auth?.user) {
        setLoading(false);
      } else {
        setError("No se pudo cargar la información del usuario.");
        setLoading(false);
      }
    }, 1000); // Simula un retraso de 1 segundo

    return () => clearTimeout(timer);
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
});

export default Perfil;