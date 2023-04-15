import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import BasicButton from '../../components/atoms/BasicButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const onPressEmailLogin = () => {
    navigation.navigate('EmailLogin');
  };
  const onPressPhoneLogin = () => {
    navigation.navigate('PhoneLogin');
  };
  const onPressEmailSignup = () => {
    navigation.navigate('EmailSignup');
  };
  const onPressGoogle = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  };
  const onPressLogou = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onAuthStateChanged = user => {
    if (!user) {
      return;
    }
    navigation.navigate('Index');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <BasicButton title={'이메일로 로그인'} onPress={onPressEmailLogin} />
      <BasicButton title={'전화번호로 로그인'} onPress={onPressPhoneLogin} />
      <BasicButton title={'이메일 회원가입'} onPress={onPressEmailSignup} />
      <Button title="Google Sign-In" onPress={onPressGoogle} />
      <Button title="로그아웃" onPress={onPressLogou} />
    </Container>
  );
};
export default LoginScreen;

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
