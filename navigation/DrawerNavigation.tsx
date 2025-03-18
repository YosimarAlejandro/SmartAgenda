// import React, { useContext } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { useWindowDimensions } from 'react-native';
// import { Calendario } from '../screens/Contenido/Calendario';


// export type RootStackParamsDrawer = {
//    Calendario:undefined;
// }

// const Drawer = createDrawerNavigator<RootStackParamsDrawer>();

// const Navigation = () => {

//     const { width }  = useWindowDimensions();

//     return(
//         <Drawer.Navigator
//             initialRouteName="Calendario"
//             screenOptions={{
//                 headerShown: true,
//                 drawerType: width >= 768 ? 'permanent' : 'front',
//                 //overlayColor: 'transparent',
//                 drawerPosition: "right",
//                 drawerStyle: {
//                     backgroundColor: 'rgba(238, 130, 238,0.8)',
//                     width: width * 0.7,
//                 },
//                 headerStyle: {
//                     height: 60,
//                 },
//             }}
//         >
//             <Drawer.Screen
//                 name="Calendario"
//                 options={{ title:"Calendario" }}
//                 component={ Calendario }
//             />
           
//         </Drawer.Navigator>
//     );
// }


// export const DrawerNavigator = () => {
// }

// navigation/DrawerNavigation.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './tabNavigator';
import InicioScreen from '../screens/InicioScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator>
     
      <Drawer.Screen name="Tabs" component={MyTabs} />
      {/* Agrega otras screens al Drawer si es necesario */}
    </Drawer.Navigator>
  );
}
export const DrawerNavigator = () => {
}
