import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
// import {Badge, Color} from '@react-native-material/core';
import TestIds from '../../lib/TestIds';
import BorderSection from '../../components/atoms/BorderSection';
import StyledText from './StyledText';

const TargetRow: React.FC<Props> = ({data, onPress}) => {
  const handleClick = () => {
    onPress();
  };

  return (
    <BorderSection>
      <TouchableOpacity
        testID={TestIds.TODOROW_TOUCH_ROW}
        onPress={handleClick}>
        <Container accessible={true} accessibilityLabel={'listitem'}>
          <StyledText text={data} />
        </Container>
      </TouchableOpacity>
    </BorderSection>
  );
};
export default TargetRow;

export type Props = {
  data: string;
  onPress(): void;
};

const Container = styled(View)`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
