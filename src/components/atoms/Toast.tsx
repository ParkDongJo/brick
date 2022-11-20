import React from 'react';
import {View, Animated, Text, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';
import useToast from '../../hooks/useToast';

const Toast: React.FC = () => {
  const {isShow, text, opacityAni} = useToast();

  return (
    <>
      {isShow ? (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Container>
            <Content style={{opacity: opacityAni}}>
              {React.isValidElement(text) ? text : <MainText>{text}</MainText>}
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};
export default Toast;

export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};

const Container = styled(View)`
  position: absolute;
  bottom: 50;
  left: 0;
  right: 0;
  elevation: 999;
  align-items: center;
  z-index: 10000;
  width: 100%;
`;
const Content = styled(Animated.View)`
  background-color: black;
  border-radius: 5;
  padding: 10px;
  color: #fff;
`;
const MainText = styled(Text)`
  color: white;
`;
