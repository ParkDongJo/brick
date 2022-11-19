import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../pages/my/ProfileScreen';

const Stack = createNativeStackNavigator<UsersStackScreensParamList>();

const UsersStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default UsersStackScreens;

export type UsersStackScreensParamList = {
  Profile: undefined;
};
