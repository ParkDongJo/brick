import React from 'react';
import {FlatList, Text} from 'react-native';
import UserRow from '../../components/atoms/UserRow';
import {Receiver} from '../../store/atoms/receiver';

const UserList: React.FC<Props> = props => {
  const {datas, onClickItem} = props;
  const handleClickItem = (rowId: string) => {
    onClickItem(rowId);
  };

  return (
    <>
      {datas.length ? (
        <FlatList
          data={datas}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={data => data.id}
          renderItem={({item}: {item: Receiver}) => (
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
  datas: Receiver[];
  onClickItem(id: string): void;
};
