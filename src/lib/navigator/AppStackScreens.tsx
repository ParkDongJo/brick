import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../pages/auth/LoginScreen';
import EmailLoginScreen from '../../pages/auth/EmailLoginScreen';
import PhoneLoginScreen from '../../pages/auth/PhoneLoginScreen';
import EmailSignupScreen from '../../pages/auth/EmailSignupScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<MainStackScreensParamList>();

const AppStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
      <Stack.Screen name="EmailSignup" component={EmailSignupScreen} />
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      <Stack.Screen
        name="Index"
        options={{
          headerShown: false,
        }}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};
export default AppStackScreens;

export type MainStackScreensParamList = {
  Login: undefined;
  EmailLogin: undefined;
  EmailSignup: undefined;
  PhoneLogin: undefined;
  Index: undefined;
};
