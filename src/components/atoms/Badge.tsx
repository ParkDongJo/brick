import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const Badge: React.FC<Props> = props => {
  const {label, color} = props;

  return (
    <Container color={color}>
      <Label color={color}>{label}</Label>
    </Container>
  );
};
export default Badge;

type Props = StyleProps & {
  label: string;
};
type StyleProps = {
  color: {text: Color; bg: Color};
};
export enum Color {
  yellow = 'yellow',
  red = 'red',
  blue = 'blue',
  white = 'white',
}
const Container = styled(View)<StyleProps>`
  padding: 2px 4px;
  border-radius: 20px;
  margin: 0px 2px;
  background-color: ${({color}) => color.bg};
`;
const Label = styled(Text)<StyleProps>`
  font-size: 14px;
  color: ${({color}) => color.text};
  background-color: ${({color}) => color.bg};
`;
