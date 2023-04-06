import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import BasicButton from '../../components/atoms/BasicButton';
import useToast from '../../hooks/useToast';
import LoginEmailForm from './LoginEmailForm';
import LoginPhoneForm from './LoginPhoneForm';

const LoginForm: React.FC<Props> = props => {
  const {submit, type = FORM_TYPE.email} = props;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      phone: '',
    },
  });
  const {show: toastShow} = useToast();

  const onSubmit = (data: FormData) => {
    try {
      submit({email: data.email, password: data.password});
    } catch (err) {
      if (typeof err === 'string') {
        return toastShow(err);
      }
      console.log(err);
    }
  };

  return (
    <Container>
      {type === FORM_TYPE.email ? (
        <LoginEmailForm control={control} errors={errors} />
      ) : (
        <LoginPhoneForm control={control} errors={errors} />
      )}
      <BasicButton title="인증하기" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
};
export default LoginForm;

type Props = {
  type?: FORM_TYPE;
  submit({
    email,
    password,
    phone,
  }: {
    email?: string;
    password?: string;
    phone?: string;
  }): void;
};
export enum FORM_TYPE {
  email = 'email',
  phone = 'phone',
}

export type FormData = {
  email: string;
  password: string;
  phone: string;
};

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
