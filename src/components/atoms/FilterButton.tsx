import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styled from 'styled-components';

const FilterButton: React.FC<Props> = props => {
  const {title = '필터', icon = '↓', onPress} = props;
  return (
    <Container>
      <SelectorBtn onPress={onPress}>
        <Text style={{fontSize: 16}}>{title}</Text>
        <Text style={{fontSize: 18}}>{` ${icon}`}</Text>
      </SelectorBtn>
    </Container>
  );
};
export default FilterButton;

type Props = {
  title?: string;
  icon?: string;
  onPress: () => void;
};

const Container = styled(View)`
  padding: 5px 0px;
  flex-direction: row;
  background-color: #fff;
  margin-right: 8px;
`;
const SelectorBtn = styled(Pressable)`
  padding: 6px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #f5f5f5;
`;
