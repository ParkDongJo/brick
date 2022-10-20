import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './../pages/MainScreen';
import TabNavigator from './../lib/TabNavigator';

const Stack = createNativeStackNavigator<ScreenStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Index" component={TabNavigator} />
    </Stack.Navigator>
  );
};
export default StackNavigator;

export type ScreenStackParamList = {
  Main: undefined;
  Profile: undefined;
};
