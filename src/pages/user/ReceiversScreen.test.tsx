import 'react-native';
import React from 'react';
import {fireEvent, render, within} from '@testing-library/react-native';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import ReceiversScreen, {Props} from './ReceiversScreen';
import receivers from '../../../fixtures/receivers';

jest.mock('@react-navigation/native');
jest.mock('@tanstack/react-query');

describe('ReceiversScreen', () => {
  let props = {};
  const mockNavigate = jest.fn();

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
    useNavigation.mockImplementation(() => ({
      navigate: mockNavigate,
    }));
  });

  it('when click item', async () => {
    const {getByRole} = render(renderReceiversScreen(props));
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    fireEvent.press(getAllByLabelText('listitem')[0]);

    expect(mockNavigate).toBeCalledWith('ReceiverTodos');
  });
});
