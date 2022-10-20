import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const BrickItem = ({title}: {title: string}) => (
  <Container>
    <Text>{title}</Text>
  </Container>
);
export default BrickItem;

const Container = styled(View)`
  background-color: '#f9c2ff';
  padding: 20px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
`;
