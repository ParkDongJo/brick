import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

const BorderSection: React.FC<Props> = props => {
  const {children} = props;

  return <Container>{children}</Container>;
};
export default BorderSection;

type Props = {
  children: React.ReactElement;
};

const Container = styled(View)`
  padding: 15px 20px;
  margin: 5px 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
