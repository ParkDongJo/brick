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
import Calendar from '../../components/organisms/Calendar';
import FilterButton from '../../components/atoms/FilterButton';
import FilterSet from '../../components/organisms/FilterSet';
import datas from '../../../fixtures/datas';
import useCalendarStore from '../../store/useCalendarStore';
import TodoSections from '../../components/organisms/TodoSections';
import useTodo from '../../hooks/useTodo';

const TodosScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryTodos} = useQueries();
  const [selectedDate, setSelectedDate] = useCalendarStore(state => [
    state.selectedDate,
    state.setSelectedDate,
  ]);
  const [modalForCalendar, setModalForCalendar] = useState(false);
  const [modalForAddUser, setModalForAddUser] = useState(false);
  const [modalForUsers, setModalForUsers] = useState(false);
  const [modalForFilter, setModalForFilter] = useState(false);

  const {isLoading: isLoadingTodos, data: _todos} = useQueryTodos(
    auth().currentUser?.uid,
  );
  const {mergeTodoByTitle} = useTodo();

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
  const openModalForFilter = () => {
    setModalForFilter(true);
  };
  const closeModalForFilte = () => {
    setModalForFilter(false);
  };
  const openModalForUsers = () => {
    navigation.push('Users');
  };
  const navigateToForm = () => {
    navigation.navigate('TodoForm');
  };
  const onPressDayInCalendar = (date: string) => {
    setSelectedDate(date);
    closeModalForCalendar();
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
        <BodyHead>
          <FilterButton onPress={openModalForFilter} />
          <FilterButton title={'추가'} icon={' +'} onPress={navigateToForm} />
        </BodyHead>
        <TodoSections
          datas={mergeTodoByTitle(datas.todos.key_user2['2023-04-06'] || [])}
        />
      </Body>
      <AlertModal ref={modalRef} />
      <PageModal visible={modalForFilter} close={closeModalForFilte}>
        <FilterSet
          title={'정렬기준'}
          datas={[
            {title: '시간순', value: 0},
            {title: '중요도순', value: 1},
          ]}
          onSelect={() => {}}
        />
        <FilterSet
          title={'진행상황'}
          datas={[
            {title: '전체', value: 0},
            {title: '대기', value: 1},
            {title: '진행중', value: 2},
            {title: '완료', value: 3},
            {title: '확인', value: 4},
          ]}
          onSelect={() => {}}
        />
      </PageModal>
      <PageModal visible={modalForCalendar} close={closeModalForCalendar}>
        <Calendar onPressDay={onPressDayInCalendar} />
      </PageModal>
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
const BodyHead = styled(View)`
  padding: 0px 20px;
  flex-direction: row;
  background-color: #fff;
`;
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
