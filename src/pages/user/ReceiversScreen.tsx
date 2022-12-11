import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Receiver} from '../../store/atoms/receiver';
import {UsersStackScreensParamList} from '../../lib/UsersStackScreens';
import useUser, {USER_QUERY_KEY} from '../../hooks/useUser';
import UserList from '../../components/molecules/UserList';

const ReceiversScreen: React.FC<Props> = ({navigation}) => {
  const {useQueryReceivers} = useUser();
  const {isLoading, data} = useQueryReceivers(USER_QUERY_KEY.RECEIVERS);
  const moveToReceiverTodos = (selectedId: string) => {
    const todos =
      (data?.find(receiver => receiver.id === selectedId) as Receiver).todos ||
      [];
    navigation.navigate('ReceiverTodos', {todos});
  };
  if (isLoading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }
  return (
    <Container>
      <UserList datas={data || []} onClickItem={moveToReceiverTodos} />
    </Container>
  );
};
export default ReceiversScreen;

type Props = {} & NativeStackScreenProps<
  UsersStackScreensParamList,
  'Receivers'
>;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
