import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import BasicButton from '../../components/atoms/BasicButton';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const moveToEmailLogin = () => {
    navigation.navigate('EmailLogin');
  };
  const moveToPhoneLogin = () => {
    navigation.navigate('PhoneLogin');
  };
  const moveToSignup = () => {
    navigation.navigate('EmailSignup');
  };
  return (
    <Container>
      <BasicButton title={'이메일로 로그인'} onPress={moveToEmailLogin} />
      <BasicButton title={'전화번호로 로그인'} onPress={moveToPhoneLogin} />
      <BasicButton title={'이메일 회원가입'} onPress={moveToSignup} />
    </Container>
  );
};
export default LoginScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
