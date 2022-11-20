import React, {useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import TestIds from '../../lib/TestIds';

const Todo: React.FC<Props> = ({title, onPressCheck, onPressDelete}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
    onPressCheck();
  };
  const handleClickDeleteBtn = (event: GestureResponderEvent) => {
    event?.preventDefault();
    onPressDelete();
  };
  return (
    <Container accessible={true} accessibilityLabel={'listitem'}>
      <TouchableOpacity
        testID={TestIds.TODOROW_TOUCH_ROW}
        onPress={handleClick}>
        {isChecked && (
          <Icon testID={TestIds.TODOROW_SHOW_CHECKICON}>
            <Text>V</Text>
          </Icon>
        )}
        <Text>{title}</Text>
        <Button onPress={handleClickDeleteBtn} title={'삭제'} />
      </TouchableOpacity>
    </Container>
  );
};
export default Todo;

export type Props = {
  title: string;
  onPressCheck(): void;
  onPressDelete(): void;
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
