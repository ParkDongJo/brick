import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import EmailLogin from './EmailLoginScreen';
jest.mock('./../../hooks/useToast');
jest.mock('./../../hooks/useAuth');
import useToast from './../../hooks/useToast';
import useAuth from './../../hooks/useAuth';

describe('EmailLogin', () => {
  const mockShowToast = jest.fn();
  const mockSignInEmail = jest.fn();
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      signInEmail: mockSignInEmail,
    }));
    useToast.mockImplementation(() => ({show: mockShowToast}));
  });
  function renderEmailLogin() {
    return render(<EmailLogin />);
  }

  it('when redner screen', () => {
    const {getByPlaceholderText, getByText} = renderEmailLogin();

    expect(getByPlaceholderText('이메일을 입력하세요.')).toBeTruthy();
    expect(getByPlaceholderText('비밀번호를 입력하세요.')).toBeTruthy();
    expect(getByText('인증하기')).toBeTruthy();
  });

  it('when click submit btn', () => {
    const {getByText} = renderEmailLogin();
    fireEvent.press(getByText('인증하기'), {email: 'test', password: 'test'});

    expect(mockSignInEmail).toBeCalled();
    expect(mockShowToast).toBeCalled();
  });
});
