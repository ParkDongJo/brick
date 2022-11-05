import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './lib/TabNavigator';

const App: React.FC<Props> = () => {
  return (
    <RecoilRoot>
      <SafeAreaView>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </RecoilRoot>
  );
};
export default App;

export type Props = {};

// const linking = {
//   prefixes: ['mbrick://', 'https://www.mbrick.com'],
//   async getInitialURL() {
//     const url = await Linking.getInitialURL();
//     return url ? url : null;
//   },
//   subscribe(listener: (url: string) => void) {
//     const linkingSubscription = Linking.addEventListener('url', ({url}) => {
//       listener(url);
//     });
//     return () => {
//       linkingSubscription.remove();
//     };
//   },
//   config: {
//     screens: {
//       Index: 'main',
//       Special: 'special',
//     },
//   },
// };
