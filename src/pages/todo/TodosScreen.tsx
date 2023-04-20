import React, {useRef, useLayoutEffect, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackScreensParamList} from '../../lib/navigator/MainStackScreens';
import AlertModal, {
  Handle as ModalHandle,
} from '../../components/organisms/AlertModal';
import useQueries from '../../hooks/useQueries';
import TodoList from '../../components/organisms/TodoList';
import UserList from '../../components/organisms/UserList';
import users from '../../../fixtures/users';
import {focusManager} from '@tanstack/react-query';
import HorizontalList from '../../components/hof/HorizontalList';
import auth from '@react-native-firebase/auth';
import CalendarForWeek from '../../components/templates/CalendarForWeek';

const TodosScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryTodos} = useQueries();
  const {isLoading: isLoadingTodos, data: todos} = useQueryTodos(
    auth().currentUser?.uid,
  );

  const navigateToForm = () => {
    navigation.navigate('TodoForm');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="Drawer" onPress={() => navigation.openDrawer()} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching
      focusManager.setFocused(true);
    });
    return unsubscribe;
  }, [navigation]);

  if (isLoadingTodos) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <HorizontalList onPressAddBtn={() => {}}>
          <UserList datas={users || []} />
        </HorizontalList>
      </Head>
      <CalendarForWeek />
      <Body>
        <TodoList todos={todos || []} />
      </Body>
      <Bottom>
        <BottomButton title="추가하기" onPress={navigateToForm} />
      </Bottom>
      <AlertModal ref={modalRef} />
    </Container>
  );
};
export default TodosScreen;

type Props = {} & NativeStackScreenProps<MainStackScreensParamList, 'Todos'>;

const Container = styled(View)`
  flex: 1;
  height: 100%;
`;
const Head = styled(View)``;
const Body = styled(View)`
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
