import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DrawerNavigator from './../lib/DrawerNavigator';
import ProfileScreen from '../pages/ProfileScreen';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Index" component={DrawerNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigator;

export type TabStackParamList = {
  Index: undefined;
  Profile: undefined;
};
