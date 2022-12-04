import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTodosScreen from '../pages/todo/MyTodosScreen';
import DetailScreen from '../pages/todo/DetailScreen';

const Stack = createNativeStackNavigator<TodosStackScreensParamList>();

const TodosStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTodos" component={MyTodosScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default TodosStackScreens;

export type TodosStackScreensParamList = {
  MyTodos: undefined;
  Detail: {screenId: 1};
};
