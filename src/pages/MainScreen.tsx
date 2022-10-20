import React, {useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenStackParamList} from './../lib/StackNavigator';
import LogoTitle from './../components/LogoTitle';
import AlertModal, {
  Handle as ModalHandle,
} from '../components/modals/AlertModal';

const MainScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: _props => <LogoTitle />,
      headerRight: () => (
        <Button onPress={() => console.log('Test')} title="Update count" />
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <Text>Main Screen</Text>
      <Button
        title={'Move to Detail'}
        onPress={() => navigation.navigate('Detail', {screenId: 1})}
      />
      <Button
        title={'Move to Profile'}
        onPress={() => navigation.navigate('Profile')}
      />
      <AlertModal ref={modalRef} />
    </Container>
  );
};
export default MainScreen;

type Props = {} & NativeStackScreenProps<ScreenStackParamList, 'Main'>;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
