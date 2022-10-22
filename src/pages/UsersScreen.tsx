import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UsersStackScreensParamList} from '../lib/UsersStackScreens';

const UsersScreen: React.FC<Props> = () => {
  return (
    <Container>
      <Text>User List</Text>
    </Container>
  );
};
export default UsersScreen;

type Props = {} & NativeStackScreenProps<UsersStackScreensParamList>;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
