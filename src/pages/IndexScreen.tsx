import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "./MainScreen"
import DetailScreen from "./DetailScreen"


export type ScreenStackParamList = {
    Main: undefined;
    Detail: { screenId: number };
  };
const Stack = createNativeStackNavigator<ScreenStackParamList>();

const IndexScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}
export default IndexScreen
