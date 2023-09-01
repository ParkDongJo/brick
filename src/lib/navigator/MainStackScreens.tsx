import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from '../../pages/todo/TodosScreen';
import TodoFormScreen from '../../pages/todo/TodoFormScreen';
import UsersScreen from '../../pages/user/UsersScreen';
import AddUserForm from '../../pages/user/AddUserFormScreen';
import UserFormScreen from '../../pages/user/UserFormScreen';
import ProfileScreen from '../../pages/my/ProfileScreen';
import TargetsScreen from '../../pages/todo/TargetsScreen';
import RunnerScreen from '../../pages/user/RunnerScreen';

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
        name="Users"
        component={UsersScreen}
        options={{
          headerShown: true,
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen
        name="AddUserForm"
        component={AddUserForm}
        options={{
          headerShown: true,
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen
        name="Targets"
        component={TargetsScreen}
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
      <Stack.Screen
        name="Runner"
        component={RunnerScreen}
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
  Targets: undefined;
  Todos: undefined;
  TodoForm: undefined;
  Users: undefined;
  UserForm: undefined;
  AddUserForm: undefined;
  Profile: undefined;
  Runner: undefined;
};
