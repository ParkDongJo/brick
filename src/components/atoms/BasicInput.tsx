import React from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components';

const BasicInput: React.FC<Props> = ({
  text,
  onBlur,
  onChange,
  type = InputType.text,
  placeholderText,
}) => {
  return (
    <Container>
      <TextInput
        placeholder={placeholderText}
        onChangeText={onChange}
        onBlur={onBlur}
        value={text}
        secureTextEntry={type === InputType.password}
      />
    </Container>
  );
};
export default BasicInput;

type Props = {
  text: string;
  onBlur: () => void;
  onChange: (...event: any[]) => void;
  type?: InputType;
  placeholderText: string;
};
export enum InputType {
  text = 'text',
  password = 'password',
}

const Container = styled(View)`
  padding: 5px 10px;
  border-bottom: 1px solid #000;
`;
