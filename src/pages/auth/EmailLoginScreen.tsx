import React, {Suspense} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import LoginForm, {FORM_TYPE} from './../../components/organisms/LoginForm';
import useAuth, {AuthResponse} from './../../hooks/useAuth';
import useToast from './../../hooks/useToast';
import useQueries, {QUERY_KEY} from '../../hooks/useQueries';
import {Role} from '../../constants';

const EmailLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const {signInEmail} = useAuth();
  const {show: showToast} = useToast();
  const {getUid} = useAuth();
  const {useQueryMe} = useQueries();
  const {isLoading: isLoadingMe, data: me} = useQueryMe(QUERY_KEY.ME, getUid());

  const onSubmit = async ({email, password}) => {
    if (!email || !password) {
      showToast('이메일과 비밀번호를 입력하세요.');
      return;
    }
    const resp: AuthResponse = await signInEmail(email, password);
    if (!resp.isSuccess || !resp.data) {
      showToast(resp.msg);
      return;
    }

    if (me?.role === Role.manager) {
      navigation.navigate('Index');
    } else {
      navigation.navigate('Index', {uid: me?.uid});
    }
  };

  return (
    <Container>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        <LoginForm type={FORM_TYPE.email} submit={onSubmit} />
      </Suspense>
    </Container>
  );
};
export default EmailLoginScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
