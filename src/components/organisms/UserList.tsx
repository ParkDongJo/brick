import React from 'react';
import {FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import UserRow from '../../components/atoms/UserRow';
import {User} from '../../types';
import users from '../../../fixtures/users';

const UserList: React.FC<Props> = props => {
  const {datas, isHorizontal = true} = props;
  const navigation = useNavigation();

  const handleClickItem = (uid: string) => {
    navigation.navigate('Todos', {uid});
  };

  return (
    <>
      {users.length ? (
        <FlatList
          data={datas}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={data => data.uid}
          bounces={false}
          horizontal={isHorizontal}
          renderItem={({item}: {item: User}) => (
            <UserRow
              id={item.uid}
              name={item.name}
              comment={item.comment}
              email={item.email}
              profileUrl={item.profileUrl}
              avatar={item.avatar}
              role={item.role}
              onPress={() => handleClickItem(item.uid)}
            />
          )}
        />
      ) : (
        <Text>User가 없습니다.</Text>
      )}
    </>
  );
};
export default UserList;

type Props = {
  datas: User[];
  isHorizontal?: boolean;
};
