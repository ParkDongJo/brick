import React, {useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import HeaderScaleView from '../../components/organisms/HeaderScaleView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackScreensParamList} from '../../lib/navigator/MainStackScreens';
import ProfileImage from '../../components/atoms/ProfileImage';
import StyledText from '../../components/atoms/StyledText';
import Section from '../../components/atoms/Section';

const ProfileScreen: React.FC<Props> = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="<"
        />
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <Head>
        <ProfileImage avatar={'cat'} radius={40} />
        <HeadRight>
          <StyledText text={'박동조'} />
          <Text>dev@gmail.com</Text>
        </HeadRight>
      </Head>
      <Body>
        <Section title={'성별'} hasHead={false} onPress={() => {}}>
          <Text>{'남성'}</Text>
        </Section>
        <Section title={'역할'} hasHead={false} onPress={() => {}}>
          <Text>{'코치'}</Text>
        </Section>
        <Section title={'자기소개'} onPress={() => {}}>
          <Text>{'입력된 내용이 없습니다.'}</Text>
        </Section>
      </Body>
    </Container>
  );
};
export default ProfileScreen;

type Props = {} & NativeStackScreenProps<MainStackScreensParamList, 'Profile'>;

const Container = styled(View)`
  flex: 1;
  background-color: #ffffff;
`;
const Head = styled(View)`
  flex-direction: row;
  padding: 40px 20px;
`;
const HeadRight = styled(View)`
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
`;
const Body = styled(View)`
  height: 100%;
  flex-direction: column;
  padding: 20px 5px;
`;
