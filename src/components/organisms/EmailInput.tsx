import React from 'react';
import {View, Button, Text} from 'react-native';
import styled from 'styled-components';
import {Controller, useForm} from 'react-hook-form';
import BasicInput from '../atoms/BasicInput';
import useLoginForm from '../../hooks/useLoginForm';

const EmailInput: React.FC<Props> = props => {
  const {title, onCancel, onComplete} = props;
  const {emailPattern} = useLoginForm();

  const {
    control,
    handleSubmit,
    formState: {isLoading, errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const cancel = () => {
    onCancel();
  };
  const submit = ({email}: FormData) => {
    onComplete(email);
  };

  return (
    <>
      <Header>
        <Button title="취소" onPress={cancel} />
        <Button title="완료" onPress={handleSubmit(submit)} />
      </Header>
      <Text>{title}</Text>
      <Controller
        control={control}
        rules={{
          required: false,
          pattern: emailPattern,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <BasicInput
              text={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholderText={'이메일을 입력하세요.'}
              mutiline={false}
              onSubmitEditing={handleSubmit(submit)}
            />
          </>
        )}
        name="email"
      />
    </>
  );
};
export default EmailInput;

type Props = {
  title: string;
  onCancel: () => void;
  onComplete: (tags: string) => void;
};
type FormData = {
  email: string;
};

const Header = styled(View)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
`;
