import React from 'react';
import {FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import UserRow from '../../components/atoms/UserRow';
import {User} from '../../types';
import {Role} from '../../constants';
import users from '../../../fixtures/users';

const UserList: React.FC<Props> = props => {
  const {datas, isHorizontal = true} = props;
  const navigation = useNavigation();

  const handleClickItem = (user: User) => {
    console.log('dongjo ', user.role);
    const path: string = user.role === Role.manager ? 'Profile' : 'Runner';
    navigation.navigate(path as never, {uid: user.uid});
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
              onPress={() => handleClickItem(item)}
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
