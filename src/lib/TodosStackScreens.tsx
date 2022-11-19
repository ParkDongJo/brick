import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from '../pages/todo/TodosScreen';
import DetailScreen from '../pages/todo/DetailScreen';

const Stack = createNativeStackNavigator<TodosStackScreensParamList>();

const TodosStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todos" component={TodosScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default TodosStackScreens;

export type TodosStackScreensParamList = {
  Todos: undefined;
  Detail: {screenId: 1};
};
