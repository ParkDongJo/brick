import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
jest.mock('@react-navigation/native');
import {useNavigation} from '@react-navigation/native';
import LoginScreen from './LoginScreen';

describe('LoginScreen ', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockImplementation(() => ({
      navigate: mockNavigate,
    }));
  });

  function renderLoginScreen() {
    return render(<LoginScreen />);
  }

  it('when render', () => {
    const {getByText} = renderLoginScreen();

    expect(getByText('이메일로 로그인')).toBeTruthy();
    expect(getByText('전화번호로 로그인')).toBeTruthy();
  });
  it('when press button for email login', () => {
    const {getByText} = renderLoginScreen();

    fireEvent.press(getByText('이메일로 로그인'));

    expect(mockNavigate).toBeCalledWith('EmailLogin');
  });
  it('when press button for phone login', () => {
    const {getByText} = renderLoginScreen();

    fireEvent.press(getByText('전화번호로 로그인'));

    expect(mockNavigate).toBeCalledWith('PhoneLogin');
  });
});
