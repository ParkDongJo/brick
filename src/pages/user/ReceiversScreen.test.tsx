import 'react-native';
import React from 'react';
import {fireEvent, render, within} from '@testing-library/react-native';
import {useQuery} from '@tanstack/react-query';
import ReceiversScreen, {Props} from './ReceiversScreen';
import receivers from '../../../fixtures/receivers';

jest.mock('@react-navigation/native');
jest.mock('@tanstack/react-query');

describe('ReceiversScreen', () => {
  const mockNavigate = jest.fn();
  let props = {navigation: {navigate: mockNavigate}};

  function renderReceiversScreen(temprops: Props) {
    return <ReceiversScreen {...temprops} />;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    useQuery.mockReturnValue({
      data: receivers,
      isLoading: false,
      error: {},
    });
  });

  it('when click item', async () => {
    const {getByRole} = render(renderReceiversScreen(props));
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    fireEvent.press(getAllByLabelText('listitem')[0]);

    expect(mockNavigate).toBeCalledWith('ReceiverTodos', {
      todos: receivers[0].todos,
    });
  });
});
