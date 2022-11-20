import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import BasicInput, {InputType} from '../../components/atoms/BasicInput';
import BasicButton from '../../components/atoms/BasicButton';
import useLoginForm from '../../hooks/useLoginForm';
import useToast from '../../hooks/useToast';

const LoginForm: React.FC<Props> = props => {
  const {handleSubmit, type = FORM_TYPE.email} = props;
  const {show: toastShow} = useToast();
  const {email, password, phone, setEmail, setPassword, setPhone, validate} =
    useLoginForm();

  const onPressSubmitBtn = () => {
    try {
      if (!validate(type)) {
        return;
      }
      handleSubmit({email, password});
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
          <BasicInput
            text={email}
            setText={setEmail}
            placeholderText={'이메일을 입력하세요.'}
          />
          <BasicInput
            text={password}
            setText={setPassword}
            type={InputType.password}
            placeholderText={'비밀번호를 입력하세요.'}
          />
        </>
      ) : (
        <>
          <BasicInput
            text={phone}
            setText={setPhone}
            type={InputType.text}
            placeholderText={'전화번호를 입력하세요.'}
          />
        </>
      )}
      <BasicButton title="인증하기" onPress={onPressSubmitBtn} />
    </Container>
  );
};
export default LoginForm;

type Props = {
  type?: FORM_TYPE;
  handleSubmit({
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
