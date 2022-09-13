import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "./../pages/MainScreen"
import DetailScreen from "./../pages/DetailScreen"

const Stack = createNativeStackNavigator<ScreenStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}
export default StackNavigator

export type ScreenStackParamList = {
    Main: undefined;
    Detail: { screenId: number };
};
