import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTodosScreen from '../pages/todo/TodosScreen';
import DetailScreen from '../pages/todo/DetailScreen';
import AddFormScreen from '../pages/todo/AddFormScreen';

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
        name="AddForm"
        options={{
          title: '',
        }}
        component={AddFormScreen}
      />
    </Stack.Navigator>
  );
};
export default TodosStackScreens;

export type TodosStackScreensParamList = {
  MyTodos: undefined;
  Detail: {screenId: 1};
  AddForm: undefined;
};
