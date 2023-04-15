import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainStackScreens from './MainStackScreens';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main" screenOptions={{title: ''}}>
      <Drawer.Screen
        name="Main"
        component={MainStackScreens}
        options={{drawerLabel: 'HOME'}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

export type DrawerParamList = {
  Main: undefined;
  Profile: undefined;
};
