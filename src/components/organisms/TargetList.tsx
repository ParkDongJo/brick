import React from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import TargetRow from '../atoms/TargetRow';
import {Target} from '../../types';

const TargetList: React.FC<Props> = props => {
  const {datas} = props;

  return (
    <Container>
      {datas.length ? (
        <FlatList
          data={datas}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={target => target.id}
          renderItem={({item}: {item: Target}) => (
            <TargetRow data={item.title} onPress={() => {}} />
          )}
        />
      ) : (
        <Text>목표가 없습니다.</Text>
      )}
    </Container>
  );
};
export default TargetList;

type Props = {
  datas: Target[];
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
