import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import BasicButton from './BasicButton';

describe('BasicButton', () => {
  const mockPressFn = jest.fn();
  function renderBasicButton({title = '버튼'}) {
    return render(<BasicButton title={title} onPress={mockPressFn} />);
  }

  it('when render BasicButton', () => {
    const screen = renderBasicButton({title: '테스트'});
    expect(screen.getByText('테스트')).toBeTruthy();
  });

  it('when click', () => {
    const screen = renderBasicButton({});
    const button = screen.getByText('버튼');
    fireEvent.press(button);

    expect(mockPressFn).toBeCalledTimes(1);
  });
});
