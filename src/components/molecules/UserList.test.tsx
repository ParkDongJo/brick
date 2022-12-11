import React from 'react';
import {fireEvent, render, within} from '@testing-library/react-native';
import UserList from './UserList';
import receivers from '../../../fixtures/receivers';
import TestIds from '../../lib/TestIds';

describe('UserList', () => {
  const mockClickItemFn = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  function renderUserList({datas}) {
    return render(<UserList datas={datas} onClickItem={mockClickItemFn} />);
  }

  it('when render list', () => {
    const {getAllByText, getByRole} = renderUserList({datas: receivers});
    const name = getAllByText(receivers[0].name);
    const comment = getAllByText(receivers[0].comment);
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    expect(name).not.toBeNull();
    expect(comment).not.toBeNull();
    expect(getAllByLabelText('listitem')).toHaveLength(2);
  });

  it('when datas empty', () => {
    const {getByText} = renderUserList({datas: []});
    expect(getByText('User가 없습니다.')).not.toBeNull();
  });

  it('when click list item', () => {
    const {getByTestId} = renderUserList({datas: receivers});
    fireEvent.press(
      getByTestId(`${TestIds.USERROW_TOUCH_ROW}-${receivers[0].id}`),
    );

    expect(mockClickItemFn).toBeCalled();
  });
});
