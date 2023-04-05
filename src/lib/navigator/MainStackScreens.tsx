import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from '../../pages/todo/TodosScreen';
import UsersScreen from '../../pages/user/UsersScreen';
import TodoFormScreen from '../../pages/todo/TodoFormScreen';

const Stack = createNativeStackNavigator<MainStackScreensParamList>();

const MainStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName={'Users'}>
      <Stack.Screen
        name="Todos"
        options={{
          title: '',
        }}
        component={TodosScreen}
      />
      <Stack.Screen
        name="TodoForm"
        options={{
          title: '',
        }}
        component={TodoFormScreen}
      />
      <Stack.Screen
        name="Users"
        options={{
          title: '',
        }}
        component={UsersScreen}
      />
    </Stack.Navigator>
  );
};
export default MainStackScreens;

export type MainStackScreensParamList = {
  Todos: undefined;
  TodoForm: undefined;
  Users: undefined;
};
