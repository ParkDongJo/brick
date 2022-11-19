import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';
import styled from 'styled-components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import MainStackScreens from './lib/MainStackScreens';
import Toast from './components/atoms/Toast';

const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <Container>
      <RecoilRoot>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <QueryClientProvider client={queryClient}>
            <MainStackScreens />
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
