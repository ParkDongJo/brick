import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../pages/auth/LoginScreen';
import EmailLoginScreen from '../../pages/auth/EmailLoginScreen';
import PhoneLoginScreen from '../../pages/auth/PhoneLoginScreen';
import MainStackScreens from './MainStackScreens';

const Stack = createNativeStackNavigator<MainStackScreensParamList>();

const AppStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      <Stack.Screen
        name="Index"
        options={{
          headerShown: false,
        }}
        component={MainStackScreens}
      />
    </Stack.Navigator>
  );
};
export default AppStackScreens;

export type MainStackScreensParamList = {
  Login: undefined;
  EmailLogin: undefined;
  PhoneLogin: undefined;
  Index: undefined;
};
