import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';
import styled from 'styled-components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './lib/TabNavigator';

const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <Container>
      <RecoilRoot>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <QueryClientProvider client={queryClient}>
            <TabNavigator />
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
