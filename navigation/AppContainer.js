import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import GirisScreen from '../screens/Giris';
import SplashScreen from '../screens/Splash';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" headerMode="none">

        <Stack.Screen name="Splash"  component={SplashScreen} />
        <Stack.Screen name="Giris"  component={GirisScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default AppNavigationContainer;