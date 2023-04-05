import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTodosScreen from '../../pages/todo/TodosScreen';
import DetailScreen from '../../pages/todo/DetailScreen';
import TodoFormScreen from '../../pages/todo/TodoFormScreen';

const Stack = createNativeStackNavigator<TodosStackScreensParamList>();

const TodosStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTodos"
        options={{
          title: '',
        }}
        component={MyTodosScreen}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="TodoForm"
        options={{
          title: '',
        }}
        component={TodoFormScreen}
      />
    </Stack.Navigator>
  );
};
export default TodosStackScreens;

export type TodosStackScreensParamList = {
  MyTodos: undefined;
  Detail: {screenId: 1};
  TodoForm: undefined;
};
