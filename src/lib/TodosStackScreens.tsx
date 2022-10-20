import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../pages/MainScreen';
import DetailScreen from '../pages/DetailScreen';

const Stack = createNativeStackNavigator<TodosStackScreensParamList>();

const TodosStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default TodosStackScreens;

export type TodosStackScreensParamList = {
  Main: undefined;
  Detail: undefined;
};
