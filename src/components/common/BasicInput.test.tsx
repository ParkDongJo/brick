import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import BasicInput from './BasicInput';

describe('BasicInput', () => {
  const mockSetText = jest.fn();
  function renderBasicInput({text = '', placeholderText = '테스트'}) {
    return render(
      <BasicInput
        text={text}
        placeholderText={placeholderText}
        setText={mockSetText}
      />,
    );
  }

  it('when redner Input', () => {
    const placeholderText = '글자를 입력해주세요.';
    const screen = renderBasicInput({placeholderText});

    expect(screen.getByPlaceholderText('글자를 입력해주세요.')).toBeTruthy();
  });

  it('when change text', () => {
    const screen = renderBasicInput({});
    const input = screen.getByPlaceholderText('테스트');
    fireEvent.changeText(input, '안녕');

    expect(mockSetText).toBeCalledWith('안녕');
  });
});
