import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';
import styled from 'styled-components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import AppStackScreens from './lib/navigator/AppStackScreens';
import Toast from './components/atoms/Toast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1007017194525-6d90t4j2kjpj9vhi7a8o5dhm2krejq1v.apps.googleusercontent.com',
});

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const App: React.FC<Props> = () => {
  return (
    <Container>
      <RecoilRoot>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <QueryClientProvider client={queryClient}>
            <AppStackScreens />
            <Toast />
          </QueryClientProvider>
        </NavigationContainer>
      </RecoilRoot>
    </Container>
  );
};
export default App;

export type Props = {};

const Container = styled(SafeAreaView)`
  flex: 1;
`;
