import React from 'react';
import {View, Text, SectionList} from 'react-native';
import styled from 'styled-components';
import UserRow from '../atoms/UserRow';
import {User} from '../../types';

const UserSections: React.FC<Props> = props => {
  const {datas} = props;
  return (
    <Container>
      <SectionList
        sections={datas}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <UserRow
            id={item.uid}
            name={item.name}
            comment={item.comment}
            email={item.email}
            profileUrl={item.profileUrl}
            avatar={item.avatar}
            role={item.role}
            onPress={() => {}}
          />
        )}
        renderSectionHeader={({section: {title, data}}) => (
          <Head>
            <Text style={{fontSize: 15}}>{`${title} (${data.length})`}</Text>
          </Head>
        )}
      />
    </Container>
  );
};
export default UserSections;

type Props = {
  datas: {title: string; data: User[]};
};
const Container = styled(View)`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Head = styled(View)`
  width: 100%;
  height: 30px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
  background-color: #fff;
`;
const Body = styled(View)``;
