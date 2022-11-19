import React, {Dispatch, SetStateAction} from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components';

const BasicInput: React.FC<Props> = ({
  text,
  setText,
  type = InputType.text,
  placeholderText,
}) => {
  const onChange = (newText: string) => {
    setText(newText);
  };
  return (
    <Container>
      <TextInput
        placeholder={placeholderText}
        onChangeText={onChange}
        defaultValue={text}
        secureTextEntry={type === InputType.password}
      />
    </Container>
  );
};
export default BasicInput;

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
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
