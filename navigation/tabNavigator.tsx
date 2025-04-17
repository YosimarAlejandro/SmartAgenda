import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Perfil from '../screens/Contenido/Perfil';
import TareasScreen from '../screens/Contenido/TareasScreen';
import ResponderTareaScreen from '../screens/Contenido/ResponderTareaScreen';
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerShadowVisible: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TareasScreen') {
            iconName = 'calendar-month'; // Ícono para la pestaña Calendario
          } else if (route.name === 'Perfil') {
            iconName = 'account-circle'; // Ícono para la pestaña Perfil
          }

          return (
            <View style={focused ? styles.iconContainerActive : styles.iconContainerInactive}>
              <MaterialCommunityIcons name={iconName} size={size} color={focused ? 'dodgerblue' : color} />
            </View>
          );
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'dodgerblue',
          borderRadius: 40,
          height: 90,
        },
        tabBarShowLabel: false, 
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="TareasScreen" component={TareasScreen} />
      {/* <Tab.Screen name="ResponderTareaScreen" component={ResponderTareaScreen} /> */}
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainerActive: {
    backgroundColor: 'white', // Color de fondo blanco cuando está activo
    borderRadius: 25, // Hacer el fondo redondeado
    padding: 10, // Espaciado para dar forma de círculo
  },
  iconContainerInactive: {
    backgroundColor: 'transparent', 
    borderRadius: 25,
    padding: 10,
  },
});
