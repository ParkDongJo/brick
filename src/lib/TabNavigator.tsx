import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TodosStackScreens from './TodosStackScreens';
import UsersStackScreens from './UsersStackScreens';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Todos" component={TodosStackScreens} />
      <Tab.Screen name="Users" component={UsersStackScreens} />
    </Tab.Navigator>
  );
};
export default TabNavigator;

export type TabStackParamList = {
  Index: undefined;
  Profile: undefined;
};
