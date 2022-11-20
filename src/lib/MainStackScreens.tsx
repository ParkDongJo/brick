import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../pages/auth/LoginScreen';
import EmailLoginScreen from '../pages/auth/EmailLoginScreen';
import PhoneLoginScreen from '../pages/auth/PhoneLoginScreen';
import DetailScreen from '../pages/todo/DetailScreen';

const Stack = createNativeStackNavigator<TodosStackScreensParamList>();

const MainStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      {/* <Stack.Screen name="Index" component={TabNavigator} /> */}
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default MainStackScreens;

export type TodosStackScreensParamList = {
  Login: undefined;
  EmailLogin: undefined;
  PhoneLogin: undefined;
  Index: undefined;
  Detail: {screenId: 1};
};
