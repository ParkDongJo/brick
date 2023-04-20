import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from '../../pages/todo/TodosScreen';
import UserFormScreen from '../../pages/user/UserFormScreen';
import TodoFormScreen from '../../pages/todo/TodoFormScreen';
import ProfileScreen from '../../pages/my/ProfileScreen';

const Stack = createNativeStackNavigator<MainStackScreensParamList>();

const MainStackScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Todos'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Todos"
        component={TodosScreen}
        options={{
          headerShown: true,
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen
        name="TodoForm"
        component={TodoFormScreen}
        options={{
          headerShown: true,
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen
        name="UserForm"
        component={UserFormScreen}
        options={{
          headerShown: true,
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTintColor: '#FFF',
        }}
      />
    </Stack.Navigator>
  );
};
export default MainStackScreens;

export type MainStackScreensParamList = {
  Todos: undefined;
  TodoForm: undefined;
  UserForm: undefined;
  Profile: undefined;
};
