import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {useQuery} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';
jest.mock('@tanstack/react-query');
import TabNavigator from './TabNavigator';

describe('TabNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: {},
    });
  });

  function renderApp() {
    return (
      <RecoilRoot>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </RecoilRoot>
    );
  }
  test('should render title ', async () => {
    render(renderApp());
    const buttonText = screen.getByText('Move to Detail');
    await waitFor(async () => {
      expect(buttonText).toBeTruthy();
    });
  });

  test('when click on button, move to detail page', async () => {
    render(renderApp());
    const buttonText = screen.getByText('Move to Detail');
    fireEvent.press(buttonText);

    await waitFor(async () => {
      expect(screen.findByText('TEST')).toBeTruthy();
      expect(screen.getAllByText('ITEM')).toBeTruthy();
    });
  });
});
