import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import Map from '../components/Map';

const AboutScreen: React.FC = () => {
  return (
    <Container>
      <Map />
    </Container>
  );
};
export default AboutScreen;

const Container = styled(View)`
  flex: 1;
`;
