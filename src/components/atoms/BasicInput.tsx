import React, {Dispatch, SetStateAction} from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components';

const BasicInput: React.FC<Props> = ({text, setText, placeholderText}) => {
  const onChange = (newText: string) => {
    setText(newText);
  };
  return (
    <Container>
      <TextInput
        placeholder={placeholderText}
        onChangeText={onChange}
        defaultValue={text}
      />
    </Container>
  );
};
export default BasicInput;

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  placeholderText: string;
};

const Container = styled(View)`
  padding: 5px 10px;
  border-bottom: 1px solid #000;
`;
