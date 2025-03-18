import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Definir la interfaz del usuario
interface User {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para cargar el usuario desde el backend
  const loadUser = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token almacenado:', token);

      if (!token) {
        setUser(null);
        return;
      }

      const response = await axios.get('http://127.0.0.1:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Usuario autenticado:', response.data);
      setUser(response.data);
    } catch (error: any) {
      console.error('Error al cargar usuario:', error?.response?.data || error.message);
      setUser(null);

      // Si el token es inválido o ha expirado, lo eliminamos
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (token: string) => {
    try {
      console.log('Guardando token:', token);
      await AsyncStorage.setItem('token', token);

      // Cargar usuario después de iniciar sesión
      await loadUser();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  // Cargar el usuario cuando el componente se monte
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
