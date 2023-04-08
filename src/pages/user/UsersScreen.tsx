import React, {useState, useRef, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {MainStackScreensParamList} from '../../lib/navigator/MainStackScreens';
import AlertModal, {
  Handle as ModalHandle,
} from '../../components/organisms/AlertModal';
import {createOne} from '../../lib/Firebase';
import useQueries, {QUERY_KEY} from '../../hooks/useQueries';
import useUser from '../../hooks/useUser';
import UserList from '../../components/organisms/UserList';
import PageModal from '../../components/organisms/PageModal';
import EmailInput from '../../components/organisms/EmailInput';

const UsersScreen: React.FC<Props> = ({navigation}) => {
  const queryClient = useQueryClient();
  const {useQueryUsers, useQueryMe, useMutaionUser} = useQueries();
  const modalRef = useRef<ModalHandle>(null);
  const mutation = useMutaionUser(queryClient, createOne as MutationFunction);
  const {addUser, getUser} = useUser(mutation);
  const {isLoading: isLoadingMe, data: me} = useQueryMe(QUERY_KEY.ME);
  const {isLoading: isLoadingUsers, data: users} = useQueryUsers(
    QUERY_KEY.USERS,
  );
  const [visibleForModal, setVisibleForModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => console.log('Test')} title="Update count" />
      ),
    });
  }, [navigation]);

  const navigateToForm = () => {
    navigation.navigate('Todos');
  };

  if (isLoadingUsers) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <UserList datas={users || []} />
      <Bottom>
        <BottomButton title="추가하기" onPress={navigateToForm} />
      </Bottom>
      <AlertModal ref={modalRef} />
    </Container>
  );
};
export default UsersScreen;

type Props = {} & NativeStackScreenProps<MainStackScreensParamList, 'Users'>;

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
