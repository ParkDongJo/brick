import React, {useRef, useLayoutEffect, useEffect, useState} from 'react';
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
import PageModal from '../../components/organisms/PageModal';
import CalendarForMonth from '../../components/templates/CalendarForMonth';
import EmailInput from '../../components/organisms/AddUser';
import UserSections from '../../components/organisms/UserSections';
import datas from '../../../fixtures/datas';

const TodosScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryTodos} = useQueries();
  const [modalForCalendar, setModalForCalendar] = useState(false);
  const [modalForAddUser, setModalForAddUser] = useState(false);
  const [modalForUsers, setModalForUsers] = useState(false);
  const {isLoading: isLoadingTodos, data: todos} = useQueryTodos(
    auth().currentUser?.uid,
  );

  const closeModalForCalendar = () => {
    setModalForCalendar(false);
  };
  const openModalForCalendar = () => {
    setModalForCalendar(true);
  };
  const closeModalForAddUser = () => {
    setModalForAddUser(false);
  };
  const openModalForAddUser = () => {
    setModalForAddUser(true);
  };
  const closeModalForUsers = () => {
    setModalForUsers(false);
  };
  const openModalForUsers = () => {
    navigation.push('Users');
  };
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
        <HorizontalList
          onPressAddBtn={openModalForAddUser}
          onPressAll={openModalForUsers}>
          <UserList datas={users || []} />
        </HorizontalList>
      </Head>
      <CalendarForWeek onPressHead={openModalForCalendar} />
      <Body>
        <TodoList todos={datas.todos.key_user2['2023-04-06'] || []} />
      </Body>
      <Bottom>
        <BottomButton title="추가하기" onPress={navigateToForm} />
      </Bottom>
      <AlertModal ref={modalRef} />
      <PageModal visible={modalForCalendar} close={closeModalForCalendar}>
        <CalendarForMonth />
      </PageModal>
      {/* <PageModal
        visible={modalForAddUser}
        hasHeader={false}
        close={closeModalForAddUser}>
        <EmailInput
          title={'추가할 사용자의 이메일 입력하세요.'}
          onCancel={closeModalForAddUser}
          onComplete={(email: string) => {
            openModalForAddUser();
          }}
        />
      </PageModal> */}
      {/* <PageModal visible={modalForUsers} close={closeModalForUsers}>
        <EmailInput
          title={'추가할 사용자의 이메일 입력하세요.'}
          onCancel={closeModalForUsers}
          onComplete={(email: string) => {
            openModalForAddUser();
          }}
        />
        <UserSections
          datas={[
            {
              title: '코치목록',
              data: users,
            },
            {
              title: '선수목록',
              data: users,
            },
            {
              title: '친구목록',
              data: users,
            },
          ]}
        />
      </PageModal> */}
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
