import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
jest.mock('./../../hooks/useToast');
import LoginForm, {FORM_TYPE} from './LoginForm';
import useToast from './../../hooks/useToast';

jest.mock('../../hooks/useToast', () => jest.fn(() => ({show: jest.fn()})));

describe('LoginForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useToast.mockImplementation(() => ({show: mockShowToast}));
  });
  function renderLoginForm(formType = FORM_TYPE.email) {
    return render(<LoginForm type={formType} submit={mockHandleSubmit} />);
  }

  it('when redner screen', () => {
    const {getByPlaceholderText, getByText, rerender} = renderLoginForm(
      FORM_TYPE.email,
    );

    expect(getByPlaceholderText('이메일을 입력하세요.')).toBeTruthy();
    expect(getByPlaceholderText('비밀번호를 입력하세요.')).toBeTruthy();
    expect(getByText('인증하기')).toBeTruthy();

    rerender(<LoginForm type={FORM_TYPE.phone} submit={mockHandleSubmit} />);

    expect(getByPlaceholderText('전화번호를 입력하세요.')).toBeTruthy();
    expect(getByText('인증하기')).toBeTruthy();
  });

  describe('when press 인증하기 button', () => {
    it('when the value exist', () => {
      const {getByPlaceholderText, getByText} = renderLoginForm();
      const inputEmail = getByPlaceholderText('이메일을 입력하세요.');
      const inputPass = getByPlaceholderText('비밀번호를 입력하세요.');
      const submintBtn = getByText('인증하기');

      fireEvent.changeText(inputEmail, 'dongjo@zigbnag.com');
      fireEvent.changeText(inputPass, 'aaa112@$');
      fireEvent.press(submintBtn);

      expect(mockHandleSubmit).toBeCalledWith({
        email: 'dongjo@zigbnag.com',
        password: 'aaa112@$',
      });
    });
    it('when the value is not exist', () => {
      const {getByText} = renderLoginForm();
      const submintBtn = getByText('인증하기');

      fireEvent.press(submintBtn);

      expect(mockHandleSubmit).not.toBeCalled();
      expect(mockShowToast).toBeCalled();
    });
  });
});
