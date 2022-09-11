import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import IndexScreen from "./pages/IndexScreen"
import SpecialLScreen from './pages/SpecialScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type Props = {};
export type TabStackParamList = {
  Index: undefined;
  Special: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>()

const App: React.FC<Props> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Index" component={IndexScreen} />
        <Tab.Screen name="Special" component={SpecialLScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
