import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import LoginForm, {FORM_TYPE} from './../../components/molecules/LoginForm';

const PhoneLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const onSubmit = ({phone}) => {
    if (!phone) {
      return;
    }
  };
  return (
    <Container>
      <LoginForm type={FORM_TYPE.phone} handleSubmit={onSubmit} />
    </Container>
  );
};
export default PhoneLoginScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
