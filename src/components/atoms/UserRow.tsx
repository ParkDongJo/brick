import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import TestIds from '../../lib/TestIds';

const UserRow: React.FC<Props> = props => {
  const {id, name, comment, email, profileUrl, onPress} = props;
  return (
    <Container accessible={true} accessibilityLabel={'listitem'}>
      <TouchableOpacity
        testID={`${TestIds.USERROW_TOUCH_ROW}-${id}`}
        onPress={onPress}>
        <Text>{name}</Text>
        <Text>{comment}</Text>
        <Text>{email}</Text>
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
  onPress(): void;
};
const Container = styled(View)`
  background-color: '#f9c2ff';
  padding: 20px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
`;
const ProfileImg = styled(Image)`
  width: 80;
  height: 80;
`;
