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

  it('when render Screen', () => {
    const {getAllByText, getByRole} = render(renderReceiversScreen(props));
    const name = getAllByText('charles');
    const comment = getAllByText('he is my freind');
    const profileImg = getByRole('image');
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    expect(name).not.toBeNull();
    expect(comment).not.toBeNull();
    expect(profileImg.props.src).not.toBeNull();
    expect(getAllByLabelText('listitem')).toHaveLength(2);
  });

  it('when click item', async () => {
    const {getByRole} = render(renderReceiversScreen(props));
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    fireEvent.press(getAllByLabelText('listitem')[0]);

    expect(mockNavigate).toBeCalled();
  });
});
