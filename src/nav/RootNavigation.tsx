import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WeatherDetailsScreen from '../screens/WeatherDetailsScreen';
import {RootStackParamList} from '../types/RootStackTypes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Weather" component={HomeScreen} />
        <RootStack.Screen name="Details" component={WeatherDetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
