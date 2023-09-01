import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useQueryClient,
  MutationFunction,
  focusManager,
} from '@tanstack/react-query';
import {MainStackScreensParamList} from '../../lib/navigator/MainStackScreens';
import AlertModal, {
  Handle as ModalHandle,
} from '../../components/organisms/AlertModal';
import {createOne} from '../../lib/Firebase';
import useQueries, {QUERY_KEY} from '../../hooks/useQueries';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';
import UserList from '../../components/organisms/UserList';
import PageModal from '../../components/organisms/PageModal';
import AddUser from '../../components/organisms/AddUser';
import UserSections from '../../components/organisms/UserSections';
import users from '../../../fixtures/users';
import RadioButtons from '../../components/organisms/RadioButtons';
import StyledText from '../../components/atoms/StyledText';

const UsersScreen: React.FC<Props> = ({navigation}) => {
  const queryClient = useQueryClient();
  const {useQueryUsers, useQueryMe, useMutaionUser} = useQueries();
  const modalRef = useRef<ModalHandle>(null);
  const mutation = useMutaionUser(queryClient, createOne as MutationFunction);
  const {addUser, getUsers} = useUser(mutation);
  const {getUid} = useAuth();
  const {isLoading: isLoadingMe, data: me} = useQueryMe(QUERY_KEY.ME, getUid());
  const {isLoading: isLoadingUsers, data: usersv2} = useQueryUsers(
    QUERY_KEY.USERS,
    getUid(),
  );

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

  const navigateToForm = () => {
    navigation.navigate('AddUserForm');
  };
  const addMyRunner = async (email: string) => {
    if (!me) {
      return;
    }
    const usersByEmail = await getUsers({
      field: 'email',
      operation: '==',
      value: email,
    });
    const user = usersByEmail[0];

    user.managers.push(me.uid);
    addUser(user);
    me.runners.push(user.uid);
    addUser(me);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching
      focusManager.setFocused(true);
    });
    return unsubscribe;
  }, [navigation]);

  if (isLoadingUsers || isLoadingMe) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
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
            title: '대기목록',
            data: users,
          },
        ]}
      />
      <Bottom>
        <BottomButton title="추가하기" onPress={navigateToForm} />
      </Bottom>
    </Container>
  );
};
export default UsersScreen;

type Props = {} & NativeStackScreenProps<MainStackScreensParamList, 'Users'>;

const Container = styled(View)`
  flex: 1;
  height: 100%;
  background-color: #fff;
`;

const Header = styled(View)`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
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
