import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../pages/MainScreen';
import UserFormScreen from '../../pages/user/UserFormScreen';
import TodoFormScreen from '../../pages/todo/TodoFormScreen';
import ProfileScreen from '../../pages/my/ProfileScreen';

const Stack = createNativeStackNavigator<MainStackScreensParamList>();

const MainStackScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Main'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="TodoForm" component={TodoFormScreen} />
      <Stack.Screen name="UserForm" component={UserFormScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default MainStackScreens;

export type MainStackScreensParamList = {
  Main: undefined;
  TodoForm: undefined;
  UserForm: undefined;
  Profile: undefined;
};
