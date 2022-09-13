import React from 'react';
import { Text, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './lib/TabNavigator';

const App: React.FC<Props> = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <TabNavigator />
    </NavigationContainer>
  );
};
export default App;

export type Props = {};

const linking = {
  prefixes: ['mbrick://', 'https://www.mbrick.com'],
  async getInitialURL() {
      const url = await Linking.getInitialURL();
      return url ? url : null;
  },
  subscribe(listener: (url: string) => void) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });
    return () => {
      linkingSubscription.remove();
    };
  },
  config: {
    screens: {
      Index: 'main',
      Special: 'special',
    },
  },
};
