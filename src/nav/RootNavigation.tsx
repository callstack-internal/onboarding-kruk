import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const RootStack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Weather" component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
