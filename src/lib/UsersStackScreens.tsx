import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReceiversScreen from '../pages/user/ReceiversScreen';
import ReceiverTodosScreen from '../pages/user/ReceiverTodosScreen';

const Stack = createNativeStackNavigator<UsersStackScreensParamList>();

const UsersStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Receivers" component={ReceiversScreen} />
      <Stack.Screen name="ReceiverTodos" component={ReceiverTodosScreen} />
    </Stack.Navigator>
  );
};
export default UsersStackScreens;

export type UsersStackScreensParamList = {
  Receivers: undefined;
  ReceiverTodos: undefined;
};
