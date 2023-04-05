import React, {useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import useTodo from '../../hooks/useTodo';
import TestIds from '../../lib/TestIds';
import {Todo} from '../../store/atoms/todo';

const TodoRow: React.FC<Props> = ({datas, onPressCheck, onPressDelete}) => {
  const {title, memo, time, tags} = datas;
  const [isChecked, setIsChecked] = useState(false);
  const {convertTags} = useTodo();
  const handleClick = () => {
    setIsChecked(!isChecked);
    onPressCheck();
  };
  const handleClickDeleteBtn = (event: GestureResponderEvent) => {
    event?.preventDefault();
    onPressDelete();
  };
  return (
    <TouchableOpacity testID={TestIds.TODOROW_TOUCH_ROW} onPress={handleClick}>
      <Container accessible={true} accessibilityLabel={'listitem'}>
        <Left>
          <Text>{time}</Text>
        </Left>
        <Right>
          <Tag>{convertTags(tags)}</Tag>
          <Text>{title}</Text>
          <Text>{memo}</Text>
        </Right>
      </Container>
    </TouchableOpacity>
  );
};
export default TodoRow;

export type Props = {
  datas: Todo;
  onPressCheck(): void;
  onPressDelete(): void;
};

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  background-color: #fff;
`;
const Left = styled(View)`
  width: 100px;
  height: 100px;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;
const Right = styled(View)`
  flex-direction: column;
  justify-content: center;
`;
const Tag = styled(Text)`
  font-color: #eee;
  font-size: 10px;
  font-weight: bold;
`;
