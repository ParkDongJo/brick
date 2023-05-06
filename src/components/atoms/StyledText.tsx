import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const StyledText: React.FC<Props> = props => {
  const {
    text,
    fontSize = 18,
    color = 'black',
    bold = true,
    isLined = false,
  } = props;

  return (
    <Container fontSize={fontSize} color={color} bold={bold} isLined={isLined}>
      {text}
    </Container>
  );
};
export default StyledText;

type Props = StyleProps & {
  text: string;
};

type StyleProps = {
  color?: string;
  bold?: boolean;
  fontSize?: number;
  isLined?: boolean;
};

const Container = styled(Text)<StyleProps>`
  font-size: ${({fontSize}) => `${fontSize}px`};
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
  color: ${({color}) => color};
  line-height: ${({fontSize}) => `${fontSize}px`};
  text-decoration: ${({isLined}) => (isLined ? 'line-through' : 'none')};
`;
