import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TodosStackScreens from './TodosStackScreens';
import SettingScreen from './../pages/SettingScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen
        name="Main"
        component={TodosStackScreens}
        options={{drawerLabel: 'MAIN'}}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{drawerLabel: 'SETTING'}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

export type DrawerParamList = {
  Main: undefined;
  Setting: undefined;
};
