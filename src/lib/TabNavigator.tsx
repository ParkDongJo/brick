import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerNavigator from "./../lib/DrawerNavigator"
import SpecialLScreen from './../pages/SpecialScreen';

const Tab = createBottomTabNavigator<TabStackParamList>()

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Index" component={DrawerNavigator} />
      <Tab.Screen name="Special" component={SpecialLScreen} />
    </Tab.Navigator>
  );
}
export default TabNavigator;

export type TabStackParamList = {
  Index: undefined;
  Special: undefined;
};
