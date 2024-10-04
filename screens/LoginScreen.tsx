import React, { useState } from 'react';
import { View, Image,TextInput, Text,StyleSheet,Dimensions } from 'react-native';
import { BtnTouch } from '../components/BtnTouch';
import Animated,{ FadeIn,FadeInUp,FadeOut } from 'react-native-reanimated'
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar'
import { appThemes } from '../themes/appThemes';
import axios from 'axios';

const { width } = Dimensions.get('window');
const fontSizeClass = width > 100 ? 'text-xl' : 'text-lg';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const login = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            alert('Login exitoso');
            navigation.navigate('Perfil');
        } catch (error) {
            console.error(error);
            alert('Error en el login');
            setErrorMessage("!Ups a ocurrido un error!");
           
        }
    };

    return (
        <View style={tw`bg-white h-full w-full`}>  
        <StatusBar style="light"/>
          <Image
            style={tw`h-full w-full absolute`}       
            source={require('../assets/images/background.png')}
          />
            {/* <Image
            style={tw`h-full w-full absolute`}       
            source={require('../assets/images/footer.png')}
          />
          Esta cosa no se si dejarla activenla y me dicen que opinan 😉*/}
    
          {/* luces o imagenes que se requieran en esta vaina, sp aqui puse unas lamparas pero la verdad nose que poner ayuda.😒  */}
          {/* <Text style={tw`text-black text-center mt-10`}>hola</Text>  */}
          <View style={tw`flex-row justify-around w-full absolute`}>
          <Animated.Image entering={FadeInUp.delay(100).duration(1000).springify()}
            style={appThemes.largeImagenube} 
            source={require('../assets/images/nublado.png')} 
          />
          {/* Imagen más pequeña */}
          <Animated.Image entering={FadeInUp.delay(100).duration(1000).springify()}
            style={appThemes.smallImagenube} 
            source={require('../assets/images/nublado.png')} 
          />
           </View>
           {/* titulo y los botones */}
           <View
           style={tw`h-full w-full flex justify-around pt-40 pb-10`} 
           >
            {/* titulo */}
            <View
              style={tw`flex items-center`}  
            >
                <Text style={tw`text-white font-bold ${fontSizeClass}`} >
          Log In
        </Text>
    
    
            </View>
            {/* Mis botonbes feos😊 */}
            <View
              style={tw`flex items-center mx-4 space-y-4`}  
            >
                <View
              style={tw`bg-white/5 py-5 rounded-2xl`}  
              >
                     <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={appThemes.input} />
                     <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={appThemes.input}/>
                     <BtnTouch title="Login" action={login} background='#3b8eed'/>
                     {/* Mira natan este es mi ternario si quieres modificalo para poner la animacion que te habia dicho, que quede chida😉 */}
                     {errorMessage ? (
                     <Text style={{ color: 'red', marginTop: 10,fontFamily:'bold', fontSize:15 }}>{errorMessage}</Text>
                     ) : null}
                     
                
    
             
            </View>
            </View>
           
           </View>
    
    
        </View>
        );
    };
    
    export default LoginScreen;
//     <Text
//     style={
//         appThemes.title
//     }
//     >Login</Text>
    