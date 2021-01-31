import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import {NavigationContainer} from '@react-navigation/native';


import Anasayfa from "../screens/Anasayfa"
import Aliskanliklar from "../screens/Aliskanliklar"
import Mood from "../screens/Mood"
import Hedefler from "../screens/Hedefler"
import Kitap from "../screens/Kitap"
import Film from "../screens/Film"


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{style:{backgroundColor:"orange", },inactiveTintColor:"white", activeTintColor:"red"}} >
        <Tab.Screen name="Anasayfa" component={Anasayfa}  options={{
          tabBarLabel: 'Anasayfa',
          color:"white",
          tabBarIcon: ({ color, size }) => (
            <Icon
            name='home'
            type='feather'
            color='white'
          />
          ),
        }} />
        <Tab.Screen name="Aliskanliklar" component={Aliskanliklar} options={{
          tabBarLabel: 'Aliskanliklar',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="drop" size={24} color="white" />
          ),
        }}/>
       <Tab.Screen name="Mood" component={Mood}  options={{
          tabBarLabel: 'Mood',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="running" size={24} color="white" />
          ),
        }} />
       <Tab.Screen name="Hedefler" component={Hedefler}  options={{
          tabBarLabel: 'Hedefler',
          tabBarIcon: ({ color, size }) => (
            <Icon
            name='moon'
            type='feather'
            color='white'
          />
          ),
        }}/>
            <Tab.Screen name="Kitap" component={Kitap}  options={{
          tabBarLabel: 'Kitap',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="running" size={24} color="white" />
          ),
        }} />
            <Tab.Screen name="Film" component={Film}  options={{
          tabBarLabel: 'Film',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="running" size={24} color="white" />
          ),
        }} />
      </Tab.Navigator>
      </NavigationContainer>
  );
}