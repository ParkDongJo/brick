import {useState} from 'react';
import {FORM_TYPE} from '../components/molecules/LoginForm';

const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const validateEmail = () => {
    if (!email) {
      return false;
    }
    return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g.test(
      email,
    );
  };
  const validatePassword = () => {
    if (!password) {
      return false;
    }
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/g.test(
      password,
    );
  };
  const validatePhone = () => {
    if (!phone) {
      return false;
    }
    return /^\d{3}-\d{3,4}-\d{4}$/g.test(phone);
  };
  const validate = (type: FORM_TYPE) => {
    return (
      {
        [FORM_TYPE.email]: () => {
          if (!validateEmail()) {
            throw '이메일을 다시 입력해주세요.';
          }
          if (!validatePassword()) {
            console.log('dongjo pass');
            throw '비밀번호를 다시 입력해주세요.';
          }
          return true;
        },
        [FORM_TYPE.phone]: () => {
          if (!validatePhone()) {
            throw '핸드폰 번호를 다시 입력해주세요.';
          }
          return true;
        },
      }[type]() || false
    );
  };
  return {
    email,
    password,
    phone,
    setEmail,
    setPassword,
    setPhone,
    validate,
    emailPattern:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g,
    pwdPattern:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/g,
    phonePattern: /^\d{3}-\d{3,4}-\d{4}$/g,
  };
};
export default useLoginForm;
