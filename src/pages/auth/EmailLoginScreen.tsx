import React, {Suspense} from 'react';
import {useSetRecoilState} from 'recoil';
import {View, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import LoginForm, {FORM_TYPE} from './../../components/molecules/LoginForm';
import useAuth, {ResponseSignIn} from './../../hooks/useAuth';
import useToast from './../../hooks/useToast';
import {tokenAtom} from './../../store/atoms/auth';

const EmailLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const setToken = useSetRecoilState(tokenAtom);
  const {signInEmail} = useAuth();
  const {show: showToast} = useToast();
  const onSubmit = async ({email, password}) => {
    if (!email || !password) {
      showToast('이메일과 비밀번호를 입력하세요.');
      return;
    }
    const resp: ResponseSignIn = await signInEmail(email, password);
    if (!resp.isSuccess || !resp.data) {
      showToast(resp.msg);
      return;
    }

    const token = await resp.data.getIdToken();
    setToken(token);
    navigation.navigate('Index');
  };

  return (
    <Container>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        <LoginForm type={FORM_TYPE.email} handleSubmit={onSubmit} />
      </Suspense>
    </Container>
  );
};
export default EmailLoginScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
