import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../pages/auth/LoginScreen';
import EmailLoginScreen from '../../pages/auth/EmailLoginScreen';
import PhoneLoginScreen from '../../pages/auth/PhoneLoginScreen';
import TodosStackScreens from './TodosStackScreens';

const Stack = createNativeStackNavigator<TodosStackScreensParamList>();

const MainStackScreens = () => {
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
        component={TodosStackScreens}
      />
    </Stack.Navigator>
  );
};
export default MainStackScreens;

export type TodosStackScreensParamList = {
  Login: undefined;
  EmailLogin: undefined;
  PhoneLogin: undefined;
  Index: undefined;
};
