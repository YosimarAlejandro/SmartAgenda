import React, { useState, useContext } from 'react';
import { 
    View, 
    Image, 
    TextInput, 
    Text, 
    Dimensions, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native';
import { BtnTouch } from '../components/BtnTouch';
import Animated, { FadeInUp } from 'react-native-reanimated';
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar';
import { appThemes } from '../themes/appThemes';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const fontSizeClass = width > 100 ? 'text-xl' : 'text-lg';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const authContext = useContext(AuthContext);

    const handleLogin = async () => {
        if (!authContext) {
            console.error("AuthContext no está disponible");
            return;
        }

        const { login: authLogin } = authContext;
        
        // Validación simple
        if (!email || !password) {
          setErrorMessage("Por favor, ingrese email y contraseña.");
          return;
        }
        
        setLoading(true);
        setErrorMessage('');

        try {
            const res = await axios.post('http://127.0.0.1:5000/api/auth/login', {
                email,
                password,
            });

            // Llama a la función login del contexto de autenticación
            await authLogin(res.data.token);
            
            alert('Inicio de sesión exitoso');
            // Redirige a la pantalla de Perfil (asegúrate de que en tu TabNavigator la pantalla se llame "Perfil")
            navigation.replace("Tabs");
        } catch (error: any) {
            console.error("Error en login:", error?.response?.data || error.message);
            
            if (error.response?.status === 401) {
                setErrorMessage("Credenciales incorrectas");
            } else {
                setErrorMessage("Error al iniciar sesión, intenta más tarde");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={tw`flex-1 bg-white`}
        >
            <StatusBar style="light" />
            
            <Image
                style={tw`h-full w-full absolute`}       
                source={require('../assets/images/background.png')}
            />
            
            <View style={tw`flex-row justify-around w-full absolute`}>
                <Animated.Image 
                    entering={FadeInUp.delay(100).duration(1000).springify()}
                    style={appThemes.largeImagenube} 
                    source={require('../assets/images/nublado.png')} 
                />
                <Animated.Image 
                    entering={FadeInUp.delay(100).duration(1000).springify()}
                    style={appThemes.smallImagenube} 
                    source={require('../assets/images/nublado.png')} 
                />
            </View>

            <View style={tw`h-full w-full flex justify-around pt-40 pb-10`}>
                <View style={tw`flex items-center`}>
                    <Text style={tw`text-white font-bold ${fontSizeClass}`}>
                        Log In
                    </Text>
                </View>

                <View style={tw`flex items-center mx-4 space-y-4`}>
                    <View style={tw`bg-white/5 py-5 rounded-2xl px-5`}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={appThemes.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            style={appThemes.input}
                        />

                        <BtnTouch 
                            title={loading ? "Cargando..." : "Login"} 
                            action={handleLogin} 
                            background='#3b8eed' 
                          
                        />

                        {errorMessage ? (
                            <Text style={tw`text-red-500 text-center mt-3 font-bold`}>
                                {errorMessage}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
