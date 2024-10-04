import React from 'react'
import { View,Text,Button, ImageBackground,StyleSheet,Image,Dimensions} from 'react-native'
import { appThemes } from '../themes/appThemes'
import { BtnTouch } from '../components/BtnTouch'
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeIn,FadeInUp,FadeOut } from 'react-native-reanimated'
import tw from 'tailwind-react-native-classnames';
const { width } = Dimensions.get('window');
const fontSizeClass = width > 1000 ? 'text-xl' : 'text-lg';

export const InicioScreen = ({navigation}) => {
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
      <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()}
        style={appThemes.largeImage} 
        source={require('../assets/images/light.png')} 
      />
      {/* Imagen más pequeña */}
      <Animated.Image entering={FadeInUp.delay(200).duration(1000)}
        style={appThemes.smallImage} 
        source={require('../assets/images/light.png')} 
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
            <Text style={tw`text-white font-bold ${fontSizeClass}`}>
      ¡HELLO!
    </Text>


        </View>
        {/* Mis botonbes feos😊 */}
        <View
          style={tw`flex items-center mx-4 space-y-4`}  
        >
            <View
          style={tw`bg-black/5 py-5 rounded-2xl`}  
        >
           <BtnTouch title="Login" action={() => navigation.navigate('Login')} background='#3b8eed' />
    <BtnTouch title="Register" action={() => navigation.navigate('Register')} background='#3b8eed' />

         
        </View>
        </View>
       
       </View>


    </View>


    /* <Text
    style={
        appThemes.title
    }
    >
        Bienvenido a mi app
    </Text>
    <BtnTouch title="Login" action={() => navigation.navigate('Login')} background='purple' />
    <BtnTouch title="Register" action={() => navigation.navigate('Register')} background='purple' />

  </View> */
 

 
  )
}

export default InicioScreen;