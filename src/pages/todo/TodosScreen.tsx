import React, {useRef, useLayoutEffect} from 'react';
import {View, Text, useWindowDimensions, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TodosStackScreensParamList} from '../../lib/TodosStackScreens';
import AlertModal, {
  Handle as ModalHandle,
} from '../../components/molecules/AlertModal';
import useQueries, {QUERY_KEY} from '../../hooks/useQueries';
import TodoList from '../../components/molecules/TodoList';

const MyTodosScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryTodos, useQueryReceivers} = useQueries();
  const {height, width} = useWindowDimensions();
  const {isLoading: isLoadingTodos, data: todos} = useQueryTodos();
  const {isLoading: isLoadingUsers, data: users} = useQueryReceivers(
    QUERY_KEY.RECEIVERS,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => console.log('Test')} title="Update count" />
      ),
    });
  }, [navigation]);

  const navigateToForm = () => {
    navigation.navigate('TodoForm');
  };

  if (isLoadingTodos && isLoadingUsers) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <TodoList todos={todos || []} />
      <Bottom>
        <BottomButton title="추가하기" onPress={navigateToForm} />
      </Bottom>
      <AlertModal ref={modalRef} />
    </Container>
  );
};
export default MyTodosScreen;

type Props = {} & NativeStackScreenProps<TodosStackScreensParamList, 'MyTodos'>;

const Container = styled(View)`
  flex: 1;
  height: 100%;
`;
const Bottom = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;
  padding: 5px 10px;
`;
const BottomButton = styled(Button)`
  height: 50
  alignItems: center
  justifyContent: center
`;
