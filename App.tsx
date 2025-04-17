import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import InicioScreen from './screens/InicioScreen';
import ResponderTareaScreen from './screens/Contenido/ResponderTareaScreen';
const Stack = createStackNavigator();
import { AuthProvider } from './context/AuthContext';
import MyTabs from './navigation/tabNavigator';

// // aqui mero si quieren hagan el stacknavigator el iran sabe como sehace si no haci dejenlo 
// screenOptions={{headerShown: false}}, esta opcion agrengenlo si quieren es para ocultar la flecha de la parte superior de las screens 
const App = () => {
    return (
        <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Inicio" component={InicioScreen}/>
                <Stack.Screen name="Tabs" component={MyTabs}/>
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ResponderTareaScreen" component={ResponderTareaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
    );
};

export default App;