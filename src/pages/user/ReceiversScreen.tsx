import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UsersStackScreensParamList} from '../../lib/UsersStackScreens';
import {Receiver} from '../../store/atoms/receiver';
import useUser, {USER_QUERY_KEY} from '../../hooks/useUser';

const ReceiversScreen: React.FC<Props> = ({navigation}) => {
  const {useQueryUsers} = useUser();
  const {isLoading, data} = useQueryUsers(USER_QUERY_KEY.RECEIVERS);

  if (isLoading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }
  console.log('dongjo : ', data);
  return (
    <Container>
      <FlatList
        data={data}
        accessible={true}
        accessibilityRole={'list'}
        keyExtractor={receiver => receiver.id}
        renderItem={({item}: {item: Receiver}) => (
          <View accessible={true} accessibilityLabel={'listitem'}>
            <Text>{item.name}</Text>
            <Text>{item.comment}</Text>
            <Text>{item.email}</Text>
            <Image source={item.profileUrl} />
          </View>
        )}
      />
    </Container>
  );
};
export default ReceiversScreen;

type Props = {} & NativeStackScreenProps<
  UsersStackScreensParamList,
  'Receivers'
>;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
