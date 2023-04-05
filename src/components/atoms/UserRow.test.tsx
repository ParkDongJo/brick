import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import UserRow, {Props} from './UserRow';
import TestIds from '../../lib/TestIds';
import users from '../../../fixtures/users';

describe('UserRow', () => {
  const mockClickRowFn = jest.fn();
  const props = users[0];

  function renderUserRow({
    id,
    name,
    comment,
    email,
    profileUrl,
  }: Partial<Props>) {
    return render(
      <UserRow
        id={id}
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
    const name = getByText(props.name);
    const comment = getByText(props.comment);
    const email = getByText(props.email);

    expect(name).not.toBeNull();
    expect(comment).not.toBeNull();
    expect(email).not.toBeNull();
  });

  it('when press the user row', () => {
    const {getByTestId} = renderUserRow(props);
    fireEvent.press(getByTestId(`${TestIds.USERROW_TOUCH_ROW}-${props.id}`));

    expect(mockClickRowFn).toBeCalled();
  });
});
