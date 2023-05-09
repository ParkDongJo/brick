import React from 'react';
import {View, Pressable} from 'react-native';
import styled from 'styled-components';
import RadioButtons from './RadioButtons';
import StyledText from '../atoms/StyledText';

const FilterSet: React.FC<Props> = props => {
  const {title, datas, onSelect} = props;

  return (
    <Container>
      <StyledText text={title} />
      <BorderLine />
      <RadioButtons
        direct={'row'}
        itemStyle={itemStyle}
        defaultValue={1}
        datas={datas}
        onSelect={onSelect}
      />
    </Container>
  );
};
export default FilterSet;

type Props = {
  title: string;
  datas: {
    title: string;
    value: string | number;
  }[];
  onSelect: () => void;
};

const Container = styled(View)`
  padding: 20px 20px;
  background-color: #fff;
`;
const Button = styled(Pressable)``;
const BorderLine = styled(View)`
  padding-top: 15px;
  margin-bottom: 15px;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
`;

const itemStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 10,
  marginRight: 10,
  backgroundColor: '#eee',
  border: '1px solid #ccc',
};
