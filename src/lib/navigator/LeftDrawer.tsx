import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import styled from 'styled-components';
import StyledText from '../../components/atoms/StyledText';

const LeftDrawer = ({navigation}) => {
  //   const navigation = useNavigation();
  return (
    <Container>
      <Head>
        <Text>LeftDrawer</Text>
      </Head>
      <Body>
        <PressableRow
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Icon>{'✅'}</Icon>
          <StyledText text="HOME" />
        </PressableRow>
        <PressableRow
          onPress={() => {
            navigation.closeDrawer();
            setTimeout(() => {
              navigation.navigate('Profile');
            }, 300);
          }}>
          <Icon>{'👤'}</Icon>
          <StyledText text="내 프로필" />
        </PressableRow>
        <PressableRow
          onPress={() => {
            navigation.closeDrawer();
            setTimeout(() => {
              navigation.navigate('Targets');
            }, 300);
          }}>
          <Icon>{'🎯'}</Icon>
          <StyledText text="목표관리" />
        </PressableRow>
      </Body>
      <Bottom />
    </Container>
  );
};
export default LeftDrawer;

const Container = styled(View)`
  width: 100%;
  padding: 20px;
`;

const Head = styled(View)`
  width: 100%;
  height: 50px;
`;
const Body = styled(View)`
  width: 100%;
  padding: 10px 0px;
  flex-direction: column;
`;
const PressableRow = styled(Pressable)`
  width: 100%;
  padding: 10px 0px;
  flex-direction: row;
  align-items: center;
`;
const Icon = styled(Text)`
  font-size: 20px;
  text-align: center;
  margin-right: 10px;
`;
const Bottom = styled(View)`
  width: 100%;
  height: 50px;
`;
