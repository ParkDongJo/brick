import React, {Suspense} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {useSetRecoilState} from 'recoil';
import EmailPwdForm from './../../components/organisms/EmailPwdForm';
import UserDetailForm, {
  FormData as UserDetailFormData,
} from './../../components/organisms/UserDetailForm';
import {useForm} from 'react-hook-form';
import {Gender, Role} from '../../constants';
import useAuth, {AuthResponse} from './../../hooks/useAuth';
import BasicButton from '../../components/atoms/BasicButton';
import useToast from '../../hooks/useToast';
import {tokenAtom} from './../../store/atoms/auth';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import useQueries, {QUERY_KEY} from '../../hooks/useQueries';
import {createOne} from '../../lib/Firebase';
import useUser from '../../hooks/useUser';

const EmailSignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const setToken = useSetRecoilState(tokenAtom);
  const {show: showToast} = useToast();
  const {signUpEmail} = useAuth();
  const queryClient = useQueryClient();
  const {useMutaionUser, useQueryMe} = useQueries();
  const mutation = useMutaionUser(queryClient, createOne as MutationFunction);
  const {getUid} = useAuth();
  const {isLoading: isLoadingMe, data: me} = useQueryMe(QUERY_KEY.ME, getUid());
  const {createUser} = useUser(mutation);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      comment: '',
      role: Role.runner,
      gender: Gender.male,
      profileUrl: '',
    },
  });

  const submit = async (data: FormData) => {
    const {email, password} = data;
    if (!email || !password) {
      showToast('이메일과 비밀번호를 입력하세요.');
      return;
    }
    const resp: AuthResponse = await signUpEmail(email, password);
    if (!resp.isSuccess || !resp.data) {
      showToast(resp.msg);
      return;
    }
    const {name, comment, role, gender, profileUrl} = data;
    createUser(resp.data?.uid, {
      uid: resp.data?.uid,
      email,
      name,
      comment,
      role,
      profileUrl,
      gender,
      managers: [],
      runners: [],
    });
  };

  return (
    <Container>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        <EmailPwdForm control={control} errors={errors} />
        <UserDetailForm control={control} errors={errors} />
        <BasicButton title="가입하기" onPress={handleSubmit(submit)} />
      </Suspense>
    </Container>
  );
};
export default EmailSignupScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;

type FormData = {
  email: string;
  password: string;
} & UserDetailFormData;
