import React from 'react';
import {FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import UserRow from '../../components/atoms/UserRow';
import {User} from '../../store/atoms/users';
import users from '../../../fixtures/users';

const UserList: React.FC<Props> = props => {
  const {datas} = props;
  const navigation = useNavigation();

  const handleClickItem = (userId: string) => {
    navigation.navigate('Todos', {userId});
  };

  return (
    <>
      {users.length ? (
        <FlatList
          data={datas}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={data => data.id}
          renderItem={({item}: {item: User}) => (
            <UserRow
              id={item.id}
              name={item.name}
              comment={item.comment}
              email={item.email}
              profileUrl={item.profileUrl}
              onPress={() => handleClickItem(item.id)}
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
};
