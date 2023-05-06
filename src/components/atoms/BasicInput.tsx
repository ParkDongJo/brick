import React from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components';

const BasicInput: React.FC<Props> = ({
  text,
  height,
  mutiline = false,
  type = InputType.text,
  placeholderText,
  onBlur,
  onChange,
  onSubmitEditing,
  onKeyPress,
}) => {
  return (
    <Input
      height={height}
      placeholder={placeholderText}
      multiline={mutiline}
      onChangeText={onChange}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      onKeyPress={onKeyPress}
      value={text}
      returnKeyType="done"
      secureTextEntry={type === InputType.password}
    />
  );
};
export default BasicInput;

type Props = {
  text: string;
  height?: number;
  mutiline?: boolean;
  type?: InputType;
  placeholderText: string;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  onSubmitEditing?: (...event: any[]) => void;
  onKeyPress?: (...event: any[]) => void;
};
export enum InputType {
  text = 'text',
  password = 'password',
}
const Container = styled(View)`
  width: 100%;
`;

const Input = styled(TextInput)<{height?: number}>`
  width: 100%;
  ${props => (props.height ? `height : ${props.height}px` : '')}
  padding: 10px 15px;
  border-radius: 10px;
  background-color: rgba(0, 0, 93, 0.04);\
  font-size: 16px;
`;
