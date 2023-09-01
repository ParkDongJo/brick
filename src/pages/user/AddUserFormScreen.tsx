import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackScreensParamList} from '../../lib/navigator/MainStackScreens';
import PageModal from '../../components/organisms/PageModal';
import RadioButtons from '../../components/organisms/RadioButtons';
import Section from '../../components/atoms/Section';
import {Role} from '../../constants';
import AddUser from '../../components/organisms/AddUser';
import StyledText from '../../components/atoms/StyledText';
import UserList from '../../components/organisms/UserList';
import users from '../../../fixtures/users';

const AddUserFormScreen: React.FC<Props> = ({navigation}) => {
  const [visibleForEmailModal, setVisibleForEmailModal] = useState(false);
  const [visibleForRoleModal, setVisibleForRoleModal] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {isLoading, errors},
  } = useForm({
    defaultValues: {
      email: '',
      role: '',
    },
  });

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

  const onClickAddButton = () => {
    setVisibleForModal(true);
  };

  const buttonTitle =
    getValues('role') === `${Role.manager}` ? '신청하기' : '영입하기';

  return (
    <Container>
      <Section title={'이메일'} onPress={() => setVisibleForEmailModal(true)}>
        <Text>{getValues('email') || '입력된 내용이 없습니다.'}</Text>
      </Section>
      <Section title={'역할'} onPress={() => setVisibleForRoleModal(true)}>
        <Text>{getValues('role') || '선택된 역할이 없습니다.'}</Text>
      </Section>
      <Bottom>
        <BottomButton title={buttonTitle} onPress={() => {}} />
      </Bottom>
      <PageModal
        visible={visibleForEmailModal}
        close={() => {
          setVisibleForEmailModal(false);
        }}>
        <AddUser onCancel={() => {}} onComplete={(email: string) => {}} />
        <UserList datas={users || []} isHorizontal={false} />
      </PageModal>
      <PageModal
        visible={visibleForRoleModal}
        close={() => {
          setVisibleForRoleModal(false);
        }}>
        <RadioButtons
          defaultValue={1}
          datas={[
            {title: '코치', value: 1},
            {title: '선수', value: 2},
          ]}
          onSelect={(role: number) => {}}
        />
      </PageModal>
    </Container>
  );
};
export default AddUserFormScreen;

type Props = {} & NativeStackScreenProps<
  MainStackScreensParamList,
  'AddUserForm'
>;

const Container = styled(View)`
  flex: 1;
  height: 100%;
  background-color: #fff;
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
