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
import UserSections from '../../components/organisms/UserSections';
import datas from '../../../fixtures/datas';
import StatusBoard from '../../components/atoms/StatusBoard';
import ProfileImage from '../../components/atoms/ProfileImage';
import StyledText from '../../components/atoms/StyledText';

const RunnerScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryTodos} = useQueries();
  const [modalForCalendar, setModalForCalendar] = useState(false);
  const [modalForFilter, setModalForFilter] = useState(false);

  const {isLoading: isLoadingTodos, data: todos} = useQueryTodos(
    auth().currentUser?.uid,
  );

  const navigateToForm = () => {
    navigation.navigate('TodoForm');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Back"
        />
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
        <View style={{flex: 1, alignItems: 'center'}}>
          <ProfileImage avatar={'cat'} radius={30} />
          <StyledText text={'박동조'} fontSize={14} />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <StatusBoard />
        </View>
      </Head>
      <CalendarForWeek onPressHead={() => setModalForCalendar(true)} />
      <Body>
        <BodyHead>
          <FilterButton
            onPress={() => {
              setModalForFilter(true);
            }}
          />
          <FilterButton title={'추가'} icon={' +'} onPress={navigateToForm} />
        </BodyHead>
        <TodoList todos={datas.todos.key_user2['2023-04-06'] || []} />
      </Body>
      <AlertModal ref={modalRef} />
      <PageModal
        visible={modalForFilter}
        close={() => setModalForFilter(false)}>
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
      <PageModal
        visible={modalForCalendar}
        close={() => {
          setModalForCalendar(false);
        }}>
        <Calendar onPressDay={() => {}} />
      </PageModal>
    </Container>
  );
};
export default RunnerScreen;

type Props = {} & NativeStackScreenProps<MainStackScreensParamList, 'Runner'>;

const Container = styled(View)`
  flex: 1;
  height: 100%;
  background-color: #fff;
`;
const Head = styled(View)`
  padding: 20px 20px;
  flex-direction: row;
`;
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
const HeadRight = styled(View)`
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
`;
// const Body = styled(View)`
//   height: 100%;
//   flex-direction: column;
//   padding: 20px 5px;
// `;
