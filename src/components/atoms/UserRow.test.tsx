import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import UserRow, {Props} from './UserRow';
import TestIds from '../../lib/TestIds';

describe('UserRow', () => {
  const mockClickRowFn = jest.fn();
  const props = {
    name: 'charles',
    comment: 'my friend',
    email: 'dongjo@gmail.com',
    profileUrl: './xxx',
  };

  function renderUserRow({name, comment, email, profileUrl}: Partial<Props>) {
    return render(
      <UserRow
        name={name}
        comment={comment}
        email={email}
        profileUrl={profileUrl}
        onPress={mockClickRowFn}
      />,
    );
  }

  it('when render row', () => {
    const {getByText} = renderUserRow(props);
    const name = getByText('charles');
    const comment = getByText('my friend');
    const email = getByText('dongjo@gmail.com');
    const profileUrl = getByText('./xxx');

    expect(name).not.toBeNull();
    expect(comment).not.toBeNull();
    expect(email).not.toBeNull();
    expect(profileUrl).not.toBeNull();
  });

  it('when press the user row', () => {
    const {getByTestId} = renderUserRow(props);
    fireEvent.press(getByTestId(TestIds.USERROW_TOUCH_ROW));

    expect(mockClickRowFn).toBeCalled();
  });
});
