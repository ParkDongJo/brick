import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainStackScreens from './MainStackScreens';
import LeftDrawer from './LeftDrawer';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{title: ''}}
      drawerContent={props => <LeftDrawer {...props} />}>
      <Drawer.Screen
        name="Main"
        component={MainStackScreens}
        options={{drawerLabel: 'HOME', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

export type DrawerParamList = {
  Main: undefined;
};
