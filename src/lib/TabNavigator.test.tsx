import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {RecoilRoot} from 'recoil';
import TabNavigator from './TabNavigator';

describe('TabNavigator', () => {
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
