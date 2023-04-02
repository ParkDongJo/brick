import React from 'react';
import {TextInput, View} from 'react-native';

const BasicInput: React.FC<Props> = ({
  text,
  mutiline = false,
  onBlur,
  onChange,
  onSubmitEditing,
  onKeyPress,
  type = InputType.text,
  placeholderText,
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholderText}
        mutiline={mutiline}
        onChangeText={onChange}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        onKeyPress={onKeyPress}
        value={text}
        returnKeyType="done"
        secureTextEntry={type === InputType.password}
      />
    </>
  );
};
export default BasicInput;

type Props = {
  text: string;
  mutiline?: boolean;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  onSubmitEditing?: (...event: any[]) => void;
  onKeyPress?: (...event: any[]) => void;
  type?: InputType;
  placeholderText: string;
};
export enum InputType {
  text = 'text',
  password = 'password',
}
