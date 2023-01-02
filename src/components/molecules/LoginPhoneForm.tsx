import React from 'react';
import {Text} from 'react-native';
import {Controller, Control, FieldErrors} from 'react-hook-form';
import BasicInput from '../../components/atoms/BasicInput';
import useLoginForm from '../../hooks/useLoginForm';
import {FormData} from './LoginForm';

const LoginPhoneForm: React.FC<Props> = props => {
  const {control, errors} = props;
  const {phonePattern} = useLoginForm();

  return (
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
      {errors.phone && <Text>Phone is required.</Text>}
    </>
  );
};
export default LoginPhoneForm;

type Props = {
  control: Control<FormData, any>;
  errors: FieldErrors;
};
