import React from 'react';
import {useSetRecoilState} from 'recoil';
import {View} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import LoginForm, {FORM_TYPE} from './../../components/molecules/LoginForm';
import useAuth, {ResponseSignIn} from './../../hooks/useAuth';
import useToast from './../../hooks/useToast';
import {tokenAtom} from './../../store/atoms/user';

const EmailLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const setToken = useSetRecoilState(tokenAtom);
  const {signInEmail} = useAuth();
  const {show: showToast} = useToast();
  const onSubmit = async ({email, password}) => {
    if (!email || !password) {
      return;
    }
    const resp: ResponseSignIn = await signInEmail(email, password);
    if (!resp.isSuccess || !resp.data) {
      showToast(resp.msg);
      return;
    }
    setToken(resp.data.getIdToken());
  };

  return (
    <Container>
      <LoginForm type={FORM_TYPE.email} handleSubmit={onSubmit} />
    </Container>
  );
};
export default EmailLoginScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
