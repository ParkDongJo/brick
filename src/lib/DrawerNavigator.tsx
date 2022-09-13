import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from "./../lib/StackNavigator"
import AboutScreen from "./../pages/AboutScreen"

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen name="Main" component={StackNavigator} options={{ drawerLabel: 'MAIN' }} />
            <Drawer.Screen name="About" component={AboutScreen} options={{ drawerLabel: 'ABOUT' }} />
        </Drawer.Navigator>
    )
}
export default DrawerNavigator

export type DrawerParamList = {
    Main: undefined;
    About: undefined;
};
