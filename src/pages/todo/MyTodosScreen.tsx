import React, {useRef, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TodosStackScreensParamList} from '../../lib/TodosStackScreens';
import LogoTitle from '../../components/atoms/LogoTitle';
import AlertModal, {
  Handle as ModalHandle,
} from '../../components/atoms/AlertModal';
import useTodo from '../../hooks/useTodo';
import useUser, {USER_QUERY_KEY} from '../../hooks/useUser';
import TodoList from '../../components/molecules/TodoList';
import UserList from '../../components/molecules/UserList';
import TodoInput from '../../components/molecules/TodoInput';

const MyTodosScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryReceivers} = useUser();
  const {useQueryTodos} = useTodo();
  const {isLoading: isLoadingTodos, data: todos} = useQueryTodos();
  const {isLoading: isLoadingUsers, data: users} = useQueryReceivers(
    USER_QUERY_KEY.RECEIVERS,
  );

  const moveToReceiverTodos = (selectedId: string) => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: _props => <LogoTitle />,
      headerRight: () => (
        <Button onPress={() => console.log('Test')} title="Update count" />
      ),
    });
  }, [navigation]);

  if (isLoadingTodos && isLoadingUsers) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <TodoInput addTaskCallback={() => {}} />
      <UserList datas={users || []} onClickItem={moveToReceiverTodos} />
      <TodoList todos={todos || []} />
      <AlertModal ref={modalRef} />
    </Container>
  );
};
export default MyTodosScreen;

type Props = {} & NativeStackScreenProps<TodosStackScreensParamList, 'MyTodos'>;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
