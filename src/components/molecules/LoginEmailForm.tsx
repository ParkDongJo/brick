import React from 'react';
import {Text} from 'react-native';
import {Controller, Control, FieldErrors} from 'react-hook-form';
import BasicInput from '../../components/atoms/BasicInput';
import useLoginForm from '../../hooks/useLoginForm';
import {FormData} from './LoginForm';

const LoginEmailForm: React.FC<Props> = props => {
  const {control, errors} = props;
  const {emailPattern, pwdPattern} = useLoginForm();

  return (
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
      {errors.email && <Text>email is required.</Text>}
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
      {errors.password && <Text>password is required.</Text>}
    </>
  );
};
export default LoginEmailForm;

type Props = {
  control: Control<FormData, any>;
  errors: FieldErrors;
};
