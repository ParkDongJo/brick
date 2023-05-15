import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import StyledText from './StyledText';

const StatusBoard = () => {
  return (
    <Container>
      <Status>
        <StyledText text={'대기중'} />
        <BorderLine />
        <StyledText text={'5'} color={'#ccc'} bold={false} />
      </Status>
      <Status>
        <StyledText text={'진행중'} />
        <BorderLine />
        <StyledText text={'5'} color={'#ccc'} bold={false} />
      </Status>
      <Status>
        <StyledText text={'완료'} />
        <BorderLine />
        <StyledText text={'5'} color={'#ccc'} bold={false} />
      </Status>
      <Status>
        <StyledText text={'승인'} />
        <BorderLine />
        <StyledText text={'5'} color={'#ccc'} bold={false} />
      </Status>
    </Container>
  );
};
export default StatusBoard;

const Container = styled(View)`
  flex-direction: row;
  background-color: #fff;
`;
const Status = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;
const BorderLine = styled(View)`
  width: 80%;
  padding-top: 8px;
  margin-bottom: 8px;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
`;
