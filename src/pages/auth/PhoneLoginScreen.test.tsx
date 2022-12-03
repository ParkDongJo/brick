import React from 'react';
import {render} from '@testing-library/react-native';
import {RecoilRoot} from 'recoil';
import RecoilObserver from './../../store/RecoilObserver';
import PhoneLoginScreen from './PhoneLoginScreen';
import {tokenAtom} from './../../store/atoms/auth';

// ios 셋팅 필요함
// android 셋팅 필요함

describe('PhoneScreen', () => {
  const mockSetTokenFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPhonLogin() {
    return render(
      <RecoilRoot>
        <RecoilObserver node={tokenAtom} mockFn={mockSetTokenFn} />
        <PhoneLoginScreen />
      </RecoilRoot>,
    );
  }

  it('when redner screen', () => {
    const {getByPlaceholderText, getByText} = renderPhonLogin();

    expect(getByPlaceholderText('전화번호를 입력하세요.')).toBeTruthy();
    expect(getByText('인증하기')).toBeTruthy();
  });
});
