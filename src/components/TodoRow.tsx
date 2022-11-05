import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import TestIds from '../lib/TestIds';

const Todo: React.FC<Props> = ({title, onPress}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(true);
    onPress();
  };
  return (
    <Container accessible={true} accessibilityLabel={'listitem'}>
      <TouchableOpacity
        testID={TestIds.TODOROW_CLICK_ROW}
        onPress={handleClick}>
        {isChecked && (
          <Icon testID={TestIds.TODOROW_SHOW_CHECKICON}>
            <Text>V</Text>
          </Icon>
        )}
        <Text>{title}</Text>
      </TouchableOpacity>
    </Container>
  );
};
export default Todo;

export type Props = {
  title: string;
  onPress(): void;
};

const Container = styled(View)`
  background-color: '#f9c2ff';
  padding: 20px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
`;
const Icon = styled(View)`
  justify-conten: start;
`;
