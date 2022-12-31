import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {useForm, Controller} from 'react-hook-form';
import BasicInput from '../../components/atoms/BasicInput';
import BasicButton from '../../components/atoms/BasicButton';
import useLoginForm from '../../hooks/useLoginForm';
import useToast from '../../hooks/useToast';

type FormData = {
  email: string;
  password: string;
  phone: string;
};

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
  const {emailPattern, pwdPattern, phonePattern, validate} = useLoginForm();

  const onSubmit = (data: FormData) => {
    try {
      if (!validate(type)) {
        return;
      }
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
        <>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: emailPattern,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <BasicInput
                text={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholderText={'이메일을 입력하세요.'}
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: pwdPattern,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <BasicInput
                text={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholderText={'비밀번호를 입력하세요.'}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
        </>
      ) : (
        <>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 11,
              pattern: phonePattern,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <BasicInput
                text={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholderText={'전화번호를 입력하세요.'}
              />
            )}
            name="phone"
          />
          {errors.phone && <Text>This is required.</Text>}
        </>
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

const Container = styled(View)`
  flex: 1;
  justify-contents: center;
`;
