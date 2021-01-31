import * as React from 'react';
import {Alert } from "react-native";
import { createDrawerNavigator,  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,} from '@react-navigation/drawer';

import { AntDesign } from '@expo/vector-icons'; 
import { Icon } from 'react-native-elements'
import Giris from "../screens/Giris"
import Splash from "../screens/Splash"
import Anasayfa from "../screens/Anasayfa"

import TabNavigation from './TabNavigator';

const Drawer = createDrawerNavigator();





export default function DrawerNavigator(props) {

  

  return (
      <Drawer.Navigator    drawerStyle={{
        backgroundColor: '#e19b84',
        width: 240,
      }}
      drawerContent={props =>  
        <CustomDrawerContent {...props}/>}>
          
        <Drawer.Screen name="Anasayfa" component={TabNavigation} options={{
          drawerLabel: 'Anasayfa',
          drawerIcon: ({ color, size }) => (
            <Icon
            name='home'
            type='feather'
            color='#634d4d'
          />
          ),
        }}/>
        <Drawer.Screen name="Splash" component={Splash} options={{
          drawerLabel: 'Splash',
          drawerIcon: ({ color, size }) => (
            <AntDesign name="team" size={24} color="#634d4d" />
          ),
        }}/>
        <Drawer.Screen name="Giris" component={Giris} options={{
          drawerLabel: 'Giris',
          drawerIcon: ({ color, size }) => (
            <AntDesign name="team" size={24} color="#634d4d" />
          ),
        }}/>

    
      </Drawer.Navigator>



  );
}