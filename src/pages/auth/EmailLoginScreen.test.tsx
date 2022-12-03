import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {RecoilRoot} from 'recoil';
jest.mock('@react-navigation/native');
import {useNavigation} from '@react-navigation/native';
import EmailLogin from './EmailLoginScreen';
import RecoilObserver from './../../store/RecoilObserver';
jest.mock('./../../hooks/useToast');
jest.mock('./../../hooks/useAuth');
import useToast from './../../hooks/useToast';
import useAuth from './../../hooks/useAuth';
import {tokenAtom} from './../../store/atoms/auth';

describe('EmailLogin', () => {
  const mockNavigate = jest.fn();
  const mockShowToast = jest.fn();
  const mockSignInEmail = jest.fn();
  const mockSetTokenFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockImplementation(() => ({
      navigate: mockNavigate,
    }));
    useAuth.mockImplementation(() => ({
      signInEmail: mockSignInEmail.mockReturnValue({
        isSuccess: true,
        data: {getIdToken: jest.fn().mockReturnValue('firebase_access_token')},
      }),
    }));
    useToast.mockImplementation(() => ({show: mockShowToast}));
  });

  function renderEmailLogin() {
    return render(
      <RecoilRoot>
        <RecoilObserver node={tokenAtom} mockFn={mockSetTokenFn} />
        <EmailLogin />
      </RecoilRoot>,
    );
  }

  it('when redner screen', () => {
    const {getByPlaceholderText, getByText} = renderEmailLogin();

    expect(getByPlaceholderText('이메일을 입력하세요.')).toBeTruthy();
    expect(getByPlaceholderText('비밀번호를 입력하세요.')).toBeTruthy();
    expect(getByText('인증하기')).toBeTruthy();
  });

  describe('when click submit btn', () => {
    it('when the value exist', async () => {
      const {getByPlaceholderText, getByText} = renderEmailLogin();
      const inputEmail = getByPlaceholderText('이메일을 입력하세요.');
      const inputPass = getByPlaceholderText('비밀번호를 입력하세요.');
      const submintBtn = getByText('인증하기');

      fireEvent.changeText(inputEmail, 'dongjo@zigbnag.com');
      fireEvent.changeText(inputPass, 'aaa112@$');
      fireEvent.press(submintBtn);

      await waitFor(() => {
        expect(mockSignInEmail).toBeCalledTimes(1);
        expect(mockSetTokenFn).toBeCalled();
        expect(mockNavigate).toBeCalled();
      });
    });

    it('when the value is not exist', () => {
      const {getByText} = renderEmailLogin();
      const submintBtn = getByText('인증하기');

      fireEvent.press(submintBtn);

      expect(mockSignInEmail).not.toBeCalled();
      expect(mockSetTokenFn).toBeCalled();
    });
  });
});
