import React, {useState} from 'react';
import {
  Button,
  GestureResponderEvent,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
// import {Badge, Color} from '@react-native-material/core';
import useTodo from '../../hooks/useTodo';
import TestIds from '../../lib/TestIds';
import {Todo} from '../../types';
import BorderSection from '../../components/atoms/BorderSection';
import Badge from '../../components/atoms/Badge';
import useIcon from '../../hooks/useIcon';
import StyledText from './StyledText';
import ProfileImage from '../../components/atoms/ProfileImage';

const TodoRow: React.FC<Props> = ({datas, onPressCheck, onPressDelete}) => {
  const {title, memo, time, tags, rank} = datas;
  const [isChecked, setIsChecked] = useState(false);
  const {convertTags} = useTodo();
  const {getIcon} = useIcon();
  const handleClick = () => {
    setIsChecked(!isChecked);
    onPressCheck();
  };
  const handleClickDeleteBtn = (event: GestureResponderEvent) => {
    event?.preventDefault();
    onPressDelete();
  };
  const getRankData = (value: number) => {
    return {
      1: {
        label: '급하다',
        color: {text: '#fff', bg: '#0052CC'},
        text: '가장 먼저 처리해봐요',
      },
      2: {
        label: '중요해',
        color: {text: '#fff', bg: '#0052CC'},
        text: '중요하지만 급하진 않아요',
      },
      3: {
        label: '오늘안에만',
        color: {text: '#fff', bg: '#0052CC'},
        text: '하면 좋지만, 중요하진 않아요',
      },
    }[value];
  };

  return (
    <BorderSection>
      <TouchableOpacity
        testID={TestIds.TODOROW_TOUCH_ROW}
        onPress={handleClick}>
        <Container accessible={true} accessibilityLabel={'listitem'}>
          <Left>
            <Head>
              <ProfileImage avatar={'rabit'} radius={15} />
              <Badge
                label={getRankData(rank)?.label || ''}
                color={getRankData(rank)?.color}
              />
              <Badge label={'40m'} color={{text: '#fff', bg: '#028759'}} />
            </Head>
            {/* <Icon>{getIcon('건강')}</Icon> */}
            <StyledText text={title} fontSize={24} isLined={false} />
          </Left>
          <Right>
            <StyledText text={'진행중'} color={'#808080'} fontSize={16} />
          </Right>
        </Container>
      </TouchableOpacity>
    </BorderSection>
  );
};
export default TodoRow;

export type Props = {
  datas: Todo;
  onPressCheck(): void;
  onPressDelete(): void;
};

const Container = styled(View)`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled(View)`
  font-size: 20px;
  font-weight: bold;
  align-items: flex-start;
`;
const Right = styled(View)`
  flex-direction: column;
  justify-content: center;
`;
const Head = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const Msg = styled(Text)`
  position: absolute;
  top: -10;
  right: 0;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 4px;
  color: red;
`;
