import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components';
import TestIds from '../../lib/TestIds';
import {Role} from '../../constants';

const UserRow: React.FC<Props> = props => {
  const {id, name, role, avatar, onPress} = props;

  const profile = {
    ['cat']: require('./../../static/cat_icon.png'),
    ['rabit']: require('./../../static/rabit_icon.png'),
    ['mongkey']: require('./../../static/mongkey_icon.png'),
    ['panda']: require('./../../static/panda_icon.png'),
    ['pig']: require('./../../static/pig_icon.png'),
    ['cow']: require('./../../static/cow_icon.png'),
  }[avatar];

  const userRole = {
    manager: '코치',
    runner: '러너',
    viewer: '관전자',
  }[role];
  return (
    <Container accessible={true} accessibilityLabel={'listitem'}>
      <TouchableOpacity
        testID={`${TestIds.USERROW_TOUCH_ROW}-${id}`}
        onPress={onPress}>
        <ProfileImg source={profile} />
        <Text>{name}</Text>
        {/* <Text>{userRole}</Text> */}
        {/* <ProfileImg source={require(profileUrl)} resizeMode="stretch" /> */}
      </TouchableOpacity>
    </Container>
  );
};
export default UserRow;

type Props = {
  id: string;
  name: string;
  comment: string;
  email: string;
  profileUrl: string;
  avatar: string;
  role: Role;
  onPress(): void;
};
const Container = styled(View)`
  widht: 60px;
  height: 50px;
  items-align: center;
  margin: 10px;
  justify-content: center;
`;
const ProfileImg = styled(Image)`
  width: 40px;
  height: 40px;
`;
