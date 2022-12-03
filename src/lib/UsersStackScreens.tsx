import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReceiversScreen from '../pages/user/ReceiversScreen';

const Stack = createNativeStackNavigator<UsersStackScreensParamList>();

const UsersStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Receivers" component={ReceiversScreen} />
    </Stack.Navigator>
  );
};
export default UsersStackScreens;

export type UsersStackScreensParamList = {
  Receivers: undefined;
};
